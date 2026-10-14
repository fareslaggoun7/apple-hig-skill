#!/usr/bin/env python3
"""Audit submitted task evaluations and compute exact binomial upper bounds.

Statistical calculations are not proof of representative sampling, independent
review, guideline entailment, or universally best design. Python 3.10+ only.
"""
from __future__ import annotations

import argparse
from datetime import datetime
import json
import math
from pathlib import Path
import sys

from design_quality import PLATFORMS, artifact_path, checked_artifact, skill_fingerprint

CLIENTS = ('claude-chat', 'claude-code', 'codex')

ERROR_CATEGORIES = (
    'unsupported-source', 'wrong-platform', 'lost-qualifier', 'invented-number',
    'wrong-recommendation-force', 'unresolved-source-conflict', 'missing-critical-state',
    'inaccessible-primary-task', 'unverified-visual-or-sdk-claim', 'user-goal-failure',
)


def validate_parameters(trials, errors, confidence, target):
    if type(trials) is not int or type(errors) is not int or not 0 <= errors <= trials <= 1000000:
        raise ValueError('Require integer counts: 0 <= errors <= trials <= 1,000,000')
    if not math.isfinite(confidence) or not 0 < confidence < 1:
        raise ValueError('Confidence must be finite and between zero and one')
    if not math.isfinite(target) or not 0 < target < 1:
        raise ValueError('Target must be a finite error fraction between zero and one')


def upper_bound(trials, errors, confidence=0.95):
    """One-sided exact Clopper-Pearson upper bound, including nonzero errors."""
    validate_parameters(trials, errors, confidence, 0.0001)
    if not trials or errors == trials:
        return 1.0
    if errors == 0:
        return -math.expm1(math.log1p(-confidence) / trials)
    # Solve P_p(X <= errors) = 1-confidence. Log-space avoids underflow.
    # For p near 1, use the complementary tail when it has fewer terms.
    def log_sum(count, prob):
        log_term = trials * math.log1p(-prob)
        peak = log_term; total = 1.0
        increment = math.log(prob) - math.log1p(-prob)
        for index in range(1, count + 1):
            log_term += math.log(trials - index + 1) - math.log(index) + increment
            if log_term > peak:
                total = total * math.exp(peak - log_term) + 1.0; peak = log_term
            else:
                total += math.exp(log_term - peak)
        return peak + math.log(total)

    def cdf(prob):
        if prob <= 0: return 1.0
        if prob >= 1: return 0.0
        if errors <= trials - errors - 1:
            return math.exp(log_sum(errors, prob))
        return -math.expm1(min(0.0, log_sum(trials - errors - 1, 1 - prob)))

    low, high = errors / trials, 1.0
    for _ in range(60):
        midpoint = (low + high) / 2
        if cdf(midpoint) > 1 - confidence: low = midpoint
        else: high = midpoint
    return high


def estimate(trials, errors, confidence=0.95, target=0.0001):
    validate_parameters(trials, errors, confidence, target)
    bound = upper_bound(trials, errors, confidence)
    return {
        'trials': trials, 'errors': errors, 'confidence': confidence,
        'observed_error_fraction': errors / trials if trials else None,
        'target_error_fraction': target, 'target_error_percent': target * 100, 'upper_error_fraction': bound,
        'upper_error_percent': 100 * bound, 'bound_below_target': bound < target,
        'minimum_zero_error_trials': math.floor(math.log1p(-confidence) / math.log1p(-target)) + 1,
        'scope': 'Hypothetical independent Bernoulli trials; supplied counts are not empirical evidence.',
    }


def utc(value):
    if not isinstance(value, str) or not value.strip():
        raise ValueError('An actual timezone-aware UTC timestamp is required')
    parsed = datetime.fromisoformat(value.replace('Z', '+00:00'))
    if parsed.tzinfo is None or parsed.utcoffset().total_seconds() != 0:
        raise ValueError('Evaluation timestamps must include UTC timezone')
    return parsed


def json_lines(data):
    result = []
    for line in data.decode('utf-8').splitlines():
        if line.strip():
            item = json.loads(line)
            if not isinstance(item, dict): raise ValueError('JSONL records must be objects')
            result.append(item)
    return result


def evaluate(protocol, records, root):
    """Fail closed on inadequate evidence; count missing/disputed results as errors."""
    problems = []
    confidence, target = protocol.get('confidence', 0.95), protocol.get('target_error_fraction', 0.0001)
    validate_parameters(0, 0, confidence, target)
    if protocol.get('schema_version') != 1 or protocol.get('metric') != 'task-result-with-any-material-error':
        problems.append('Require schema 1 and task-result-with-any-material-error metric')
    if protocol.get('sampling', {}).get('method') != 'independent-representative-task-sampling':
        problems.append('Regression/challenge cases do not establish representative independent sampling')
    if not protocol.get('sampling', {}).get('population_definition') or not protocol.get('sampling', {}).get('independence_justification'):
        problems.append('Document the population and justify independence/correlation handling')
    if protocol.get('skill_sha256') != skill_fingerprint():
        problems.append('Protocol must bind the exact installed skill revision')
    reviewers = protocol.get('reviewers', [])
    approved = {r.get('id') for r in reviewers if isinstance(r.get('id'), str) and r['id'].strip()
                and r.get('qualified') is True and r.get('independent_of_author_and_runner') is True}
    excluded = set(protocol.get('authors_and_runners', []))
    if not excluded or any(not isinstance(identity, str) or not identity.strip() for identity in excluded):
        problems.append('Record author/runner identities so self-review can be excluded')
    approved -= excluded
    if len(approved) < 2:
        problems.append('At least two qualified reviewers independent of author and runner are required')
    try:
        registered = utc(protocol.get('registered_at_utc', ''))
        registry = json_lines(checked_artifact(root, protocol.get('selected_trials_file'), protocol.get('selected_trials_sha256')))
        checked_artifact(root, protocol.get('registration_evidence_file'), protocol.get('registration_evidence_sha256'))
    except (OSError, ValueError, TypeError, AttributeError) as exc:
        problems.append('Preregistration/selected-trial evidence unavailable: ' + str(exc))
        registry = []; registered = None

    by_id, response_hashes = {}, set()
    for row in records:
        tid = row.get('trial_id')
        if not isinstance(tid, str) or not tid or tid in by_id:
            problems.append('Trial results must have unique nonempty IDs'); continue
        by_id[tid] = row
    selected_ids, prompt_hashes = set(), set()
    evaluated, failed, missing, disputed = 0, 0, 0, 0
    strata = {}
    for selected in registry:
        tid = selected.get('trial_id')
        if not isinstance(tid, str) or not tid or tid in selected_ids:
            problems.append('Selected trial registry contains missing or duplicate IDs'); continue
        selected_ids.add(tid)
        prompt_hash = selected.get('prompt_sha256')
        if prompt_hash in prompt_hashes:
            problems.append('Repeated task inputs cannot inflate independent sample size')
        prompt_hashes.add(prompt_hash)
        row = by_id.get(tid)
        if row is None:
            failed += 1; missing += 1; continue
        error = False
        try:
            if row.get('skill_sha256') != protocol.get('skill_sha256'):
                raise ValueError('Result skill revision differs from the protocol')
            if registered is None or utc(row.get('run_at_utc', '')) <= registered:
                raise ValueError('A trial must run after documented preregistration')
            for key in ('platform', 'client', 'model', 'model_settings', 'minimum_os'):
                if key not in row or row[key] != selected.get(key):
                    raise ValueError('Result differs from its registered context: ' + key)
            if any(not isinstance(row[key], str) or not row[key].strip() for key in ('model', 'minimum_os')):
                raise ValueError('Actual model and OS scope must be recorded')
            if row['platform'] not in PLATFORMS or row['client'] not in CLIENTS or not isinstance(row['model_settings'], dict):
                raise ValueError('Platform/client/settings context is unrecognized')
            if row.get('prompt_sha256') != prompt_hash:
                raise ValueError('Task input differs from its registered input')
            checked_artifact(root, row.get('prompt_file'), prompt_hash)
            response = checked_artifact(root, row.get('response_file'), row.get('response_sha256'))
            if not response.strip(): raise ValueError('Empty task output')
            if row['response_sha256'] in response_hashes:
                raise ValueError('Repeated outputs cannot inflate independent sample size')
            response_hashes.add(row['response_sha256'])
            reviews = row.get('reviews', [])
            identities = {r.get('reviewer_id') for r in reviews}
            if len(reviews) < 2 or len(identities) != len(reviews) or not identities.issubset(approved):
                raise ValueError('Need distinct approved independent reviews')
            judgments = []
            for review in reviews:
                categories = review.get('error_categories')
                if not isinstance(categories, list) or any(c not in ERROR_CATEGORIES for c in categories):
                    raise ValueError('Review error categories are missing or unknown')
                if review.get('full_output_and_sources_reviewed') is not True:
                    raise ValueError('Review must cover the full output and applicable official evidence')
                checked_artifact(root, review.get('evidence_file'), review.get('evidence_sha256'))
                judgments.append(bool(categories) or review.get('ambiguous') is not False)
            error = any(judgments)
            if len(set(judgments)) > 1: disputed += 1
            evaluated += 1
            stratum = row['platform'] + '/' + row['client'] + '/' + row['model']
            strata[stratum] = strata.get(stratum, 0) + 1
        except (OSError, ValueError, TypeError, KeyError, AttributeError) as exc:
            problems.append(f'{tid}: {exc}'); error = True
        failed += int(error)
    if set(by_id) - selected_ids:
        problems.append('Unregistered trial results were supplied')
    if not registry:
        problems.append('No registered empirical trials are available')
    stats = estimate(len(selected_ids), failed, confidence, target)
    stats['scope'] = 'Complete task results in the submitted registered population; missing or ambiguous results count as failures.'
    return {
        'schema_version': 1, 'protocol_id': protocol.get('id'),
        'status': 'bounded-target-supported-conditionally' if not problems and stats['bound_below_target'] else 'not-established',
        'evidence_admissible': not problems, 'statistical_target_met': not problems and stats['bound_below_target'],
        'statistics': stats, 'reviewed_trials': evaluated, 'missing_trials': missing,
        'review_disagreements': disputed, 'strata': strata, 'evidence_problems': problems,
        'limitations': 'Code checks integrity and declared review metadata, not reviewer identity, genuine preregistration, '
                      'representative sampling, source entailment, native behavior, or globally best design. '
                      'Independent audit must establish those premises. Pooling platforms does not prove a bound for each platform. '
                      'This evidence applies only to the registered skill/model/client/OS population; it is not a universal guarantee.',
    }


def matrix(study, root):
    """Assess all 18 cohorts separately with Bonferroni simultaneous coverage.

Read actual protocol/record artifacts, not caller-supplied passing summaries.
The statistical conclusion remains conditional on independently audited premises.
"""
    if not isinstance(study, dict) or study.get('schema_version') != 1:
        raise ValueError('Require a schema-1 study object')
    confidence = study.get('family_confidence', 0.95)
    target = study.get('target_error_fraction', 0.0001)
    validate_parameters(0, 0, confidence, target)
    expected = {(client, platform) for client in CLIENTS for platform in PLATFORMS}
    cohorts = study.get('cohorts')
    if not isinstance(cohorts, list) or any(not isinstance(c, dict) for c in cohorts):
        raise ValueError('Cohorts must be an array of objects')
    pairs = [(c.get('client'), c.get('platform')) for c in cohorts]
    if len(pairs) != len(expected) or set(pairs) != expected:
        raise ValueError('Study must contain each of the 18 client/platform pairs exactly once')
    per_confidence = 1 - (1 - confidence) / len(expected)
    validate_parameters(0, 0, per_confidence, target)
    minimum = estimate(0, 0, per_confidence, target)['minimum_zero_error_trials']
    global_problems = []
    if study.get('skill_sha256') != skill_fingerprint():
        global_problems.append('The study is not bound to the current installed skill revision')
    registered = None
    try:
        registered = utc(study.get('registered_at_utc'))
        checked_artifact(root, study.get('registration_evidence_file'), study.get('registration_evidence_sha256'))
    except (OSError, ValueError, TypeError, AttributeError) as exc:
        global_problems.append('Study preregistration evidence unavailable: ' + str(exc))
    assessed = []
    for cohort in cohorts:
        problems = []
        context = {key: cohort.get(key) for key in ('client', 'platform', 'model', 'model_settings', 'minimum_os')}
        if any(not isinstance(context[key], str) or not context[key].strip() for key in ('model', 'minimum_os')) or not isinstance(context['model_settings'], dict):
            problems.append('Actual model/settings and deployment OS are not pinned')
        result = None
        if not cohort.get('protocol_file') or not cohort.get('records_file'):
            problems.append('Preregistered protocol and independently reviewed task records are unavailable')
        else:
            try:
                protocol = json.loads(checked_artifact(root, cohort['protocol_file'], cohort.get('protocol_sha256')))
                records = json_lines(checked_artifact(root, cohort['records_file'], cohort.get('records_sha256')))
                protocol_root = artifact_path(root, cohort['protocol_file']).parent
                if not isinstance(protocol, dict): raise ValueError('Protocol must be an object')
                if protocol.get('skill_sha256') != study.get('skill_sha256'):
                    raise ValueError('Protocol skill revision differs from the study')
                if registered is None or utc(protocol.get('registered_at_utc')) < registered:
                    raise ValueError('Cohort protocol must be registered after the overall study')
                pc = protocol.get('confidence', 0.95); pt = protocol.get('target_error_fraction', 0.0001)
                validate_parameters(0, 0, pc, pt)
                if pc < per_confidence or pt > target:
                    raise ValueError('Protocol confidence/target does not meet the simultaneous study requirement')
                registry = json_lines(checked_artifact(protocol_root, protocol.get('selected_trials_file'), protocol.get('selected_trials_sha256')))
                if any(any(row.get(key) != value for key, value in context.items()) for row in registry):
                    raise ValueError('Registered trial context differs from the designated cohort')
                result = evaluate(protocol, records, protocol_root)
                problems.extend(result['evidence_problems'])
            except (OSError, ValueError, TypeError, KeyError, AttributeError) as exc:
                problems.append('Cohort artifacts invalid: ' + str(exc))
        stats = result['statistics'] if result else estimate(0, 0, per_confidence, target)
        if not result:
            stats['scope'] = 'No qualifying empirical observations supplied for this cohort; this is an evidence requirement.'
        established = not global_problems and not problems and result is not None and result['statistical_target_met'] is True
        assessed.append({
            **context, 'status': 'bounded-target-supported-conditionally' if established else 'not-established',
            'statistical_target_met': established, 'statistics': stats,
            'reviewed_trials': result['reviewed_trials'] if result else 0,
            'missing_trials': result['missing_trials'] if result else 0,
            'evidence_problems': problems,
        })
    supported = not global_problems and all(c['statistical_target_met'] for c in assessed)
    return {
        'schema_version': 1, 'study_id': study.get('id'),
        'status': 'all-cohorts-supported-conditionally' if supported else 'not-established',
        'statistical_target_met': supported, 'family_confidence': confidence,
        'target_error_fraction': target, 'target_error_percent': target * 100,
        'method': 'Bonferroni one-sided exact binomial bounds; no pooling',
        'cohort_count': len(expected), 'required_per_cohort_confidence': per_confidence,
        'minimum_zero_error_independent_trials_per_cohort': minimum,
        'minimum_zero_error_independent_trials_total': minimum * len(expected),
        'empirical_trials': sum(c['statistics']['trials'] for c in assessed),
        'reviewed_trials': sum(c['reviewed_trials'] for c in assessed),
        'supported_cohorts': sum(c['statistical_target_met'] for c in assessed),
        'evidence_problems': global_problems, 'cohorts': assessed,
        'limitations': 'Conditional on genuine preregistration, representative sampling, independent trials within each cohort, '
                      'and qualified independent source/runtime review. Bonferroni does not require independence between cohorts. '
                      'Counts/calculations and passing software checks are not empirical semantic proof. '
                      'This cannot establish universally best designs or performance for untested models, OS versions, or future sources.',
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest='command', required=True)
    item = commands.add_parser('estimate', help='Hypothetical sample-size calculation; no empirical proof')
    item.add_argument('--trials', type=int, required=True); item.add_argument('--errors', type=int, required=True)
    item.add_argument('--confidence', type=float, default=0.95); item.add_argument('--target', type=float, default=0.0001)
    item = commands.add_parser('evaluate')
    item.add_argument('--protocol', type=Path, required=True); item.add_argument('--records', type=Path, required=True)
    item.add_argument('--output', type=Path)
    item = commands.add_parser('matrix', help='Assess all three clients and six platforms with simultaneous bounds')
    item.add_argument('--study', type=Path, required=True); item.add_argument('--output', type=Path)
    args = parser.parse_args()
    if args.command == 'estimate':
        result = estimate(args.trials, args.errors, args.confidence, args.target)
    elif args.command == 'evaluate':
        protocol = json.loads(args.protocol.read_text(encoding='utf-8'))
        result = evaluate(protocol, json_lines(args.records.read_bytes()), args.protocol.resolve().parent)
    else:
        study = json.loads(args.study.read_text(encoding='utf-8'))
        result = matrix(study, args.study.resolve().parent)
    if getattr(args, 'output', None):
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 2 if args.command in ('evaluate', 'matrix') and not result['statistical_target_met'] else 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (OSError, ValueError, TypeError, KeyError, AttributeError) as exc:
        print('Assurance evidence invalid: ' + str(exc), file=sys.stderr); sys.exit(1)
