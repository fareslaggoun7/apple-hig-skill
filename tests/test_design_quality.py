"""Adversarial evidence-contract regression tests; not a semantic benchmark."""
import copy
from datetime import datetime, timedelta, timezone
import hashlib
import io
import json
from pathlib import Path
import shutil
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'skills/apple-hig/scripts'))
import assurance
import design_quality as quality
import hig


def write_json(path, value):
    data = (json.dumps(value, ensure_ascii=False, indent=2) + '\n').encode()
    path.write_bytes(data)
    return hashlib.sha256(data).hexdigest()


class DesignEvidenceTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(); self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        record = quality.plan('ios', 'Edit a note', 'synthetic test OS', topics=('buttons',))
        record['context'].update(users=['Fixture user'], inputs=['touch'])
        source = next(s for s in record['sources'] if s['id'] == 'buttons')
        record['sources'] = [source]
        self.fetched = {
            'url': 'https://developer.apple.com/design/human-interface-guidelines/buttons',
            'canonical_path': '/design/human-interface-guidelines/buttons',
            'section': 'Best-practices', 'truncated': False, 'unhandled_node_types': [],
            'retrieved_at_utc': datetime.now(timezone.utc).isoformat(), 'live_sha256': 'a' * 64,
            'semantic_match': True, 'selected_block_count': 1,
            'snapshot_sha256': hig.resolve(hig.load_catalog(), 'buttons')['sha256'],
            'blocks': [{'sections': ['Best-practices'], 'text': 'Synthetic integrity fixture; not authoritative semantic gold.'}],
        }
        source.update(verification='live', evidence_file='source.json')
        source['evidence_sha256'] = write_json(self.root / 'source.json', self.fetched)
        record['decisions'] = [{
            'id': 'save', 'kind': 'apple-guidance', 'statement': 'Give the save action a clear label.',
            'rationale': 'Make the action discoverable.', 'user_impact': 'The user can save their note.',
            'scope': 'Fixture task', 'implementation_evidence': 'Synthetic test artifact',
            'review': 'reviewed', 'source_ids': ['buttons'], 'force': 'recommends', 'qualifiers_reviewed': True,
        }]
        for item in record['checks']:
            item.update(status='pass', evidence='Synthetic contract fixture; not a real device test.')
        self.record = record

    def result(self): return quality.check(self.record, self.root)

    def alter_source(self, **changes):
        self.fetched.update(changes)
        self.record['sources'][0]['evidence_sha256'] = write_json(self.root / 'source.json', self.fetched)

    def test_complete_record_checks_integrity_without_certifying_semantics(self):
        result = self.result()
        self.assertTrue(result['ready_for_human_review'])
        self.assertFalse(result['certification'])
        self.assertIn('Not measured', result['semantic_accuracy'])

    def test_malformed_decision_text_cannot_crash_or_clear_the_record(self):
        self.record['decisions'][0]['statement'] = 44
        self.assertFalse(self.result()['ready_for_human_review'])

    def test_all_six_platform_plans_are_unfinished_not_false_successes(self):
        for platform in quality.PLATFORMS:
            with self.subTest(platform=platform):
                record = quality.plan(platform, 'Complete the primary task')
                result = quality.check(record, self.root)
                self.assertTrue(result['contract_valid'], result)
                self.assertFalse(result['ready_for_human_review'])
                self.assertIn('designing-for-' + platform, {s['topic'] for s in record['sources']})

    def test_unknown_anchor_and_nonofficial_url_are_rejected(self):
        for field, value in [('section', 'Invented-rule'), ('url', 'https://example.com/buttons')]:
            with self.subTest(field=field):
                original = copy.deepcopy(self.record)
                self.record['sources'][0][field] = value
                self.assertFalse(self.result()['contract_valid']); self.record = original

    def test_wrong_platform_guidance_is_rejected(self):
        self.record['context']['platform'] = 'macos'
        source = self.record['sources'][0]
        page = hig.resolve(hig.load_catalog(), 'activity-views')
        source.update(topic='activity-views', section='Overview', url=page['url'], verification='snapshot')
        self.assertTrue(any('excludes' in e for e in self.result()['errors']))
        with self.assertRaises(ValueError): quality.plan('ios', 'Edit', topics=('designing-for-macos',))

    def test_numeric_snapshot_claims_cannot_be_cleared_by_snapshot_option(self):
        source = self.record['sources'][0]; source['verification'] = 'snapshot'
        self.record['decisions'][0]['statement'] = 'The required target is 44 pixels on every platform.'
        result = quality.check(self.record, self.root, allow_snapshot=True)
        self.assertFalse(result['ready_for_human_review'])
        self.assertTrue(any('numeric' in b for b in result['blockers']))

    def test_general_snapshot_is_qualified_and_requires_explicit_option(self):
        self.record['sources'][0]['verification'] = 'snapshot'
        self.assertFalse(self.result()['ready_for_human_review'])
        result = quality.check(self.record, self.root, allow_snapshot=True)
        self.assertTrue(result['ready_for_human_review'])
        self.assertTrue(result['warnings'])

    def test_mutated_evidence_bytes_are_rejected(self):
        (self.root / 'source.json').write_text('changed after review', encoding='utf-8')
        self.assertTrue(any('SHA-256' in e for e in self.result()['errors']))

    def test_wrong_topic_identity_and_wrong_section_are_rejected(self):
        for changes in [{'canonical_path': '/design/human-interface-guidelines/alerts'}, {'section': 'Role'}]:
            with self.subTest(changes=changes):
                saved = copy.deepcopy(self.fetched); self.alter_source(**changes)
                self.assertFalse(self.result()['contract_valid']); self.alter_source(**saved)

    def test_empty_truncated_unknown_or_partial_source_is_rejected(self):
        for changes in [{'truncated': True}, {'blocks': []}, {'unhandled_node_types': ['new-node']},
                        {'selected_block_count': 2}, {'blocks': [{'sections': ['Role'], 'text': 'wrong section'}]}]:
            with self.subTest(changes=changes):
                saved = copy.deepcopy(self.fetched); self.alter_source(**changes)
                self.assertFalse(self.result()['contract_valid']); self.alter_source(**saved)

    def test_stale_future_or_changed_sources_block_readiness(self):
        for changes in [{'retrieved_at_utc': (datetime.now(timezone.utc)-timedelta(days=8)).isoformat()},
                        {'retrieved_at_utc': (datetime.now(timezone.utc)+timedelta(days=1)).isoformat()},
                        {'semantic_match': False}]:
            with self.subTest(changes=changes):
                saved = copy.deepcopy(self.fetched); self.alter_source(**changes)
                self.assertFalse(self.result()['ready_for_human_review']); self.alter_source(**saved)

    def test_missing_check_evidence_and_omitted_core_review_block_readiness(self):
        for status in ('pass', 'not-applicable', 'fail', 'not-run'):
            with self.subTest(status=status):
                item = self.record['checks'][0]; item.update(status=status, evidence='', reason='Skipped')
                self.assertFalse(self.result()['ready_for_human_review'])

    def test_unresolved_findings_and_qualifiers_block_readiness(self):
        self.record['issues'] = [{'severity': 'material', 'description': 'Cancellation loses edits.'}]
        self.assertFalse(self.result()['ready_for_human_review'])
        self.record['issues'] = []; self.record['decisions'][0]['qualifiers_reviewed'] = False
        self.assertFalse(self.result()['ready_for_human_review'])

    def test_sdk_contract_is_not_cleared_by_hig_evidence(self):
        self.record['decisions'][0]['kind'] = 'sdk-contract'
        self.assertFalse(self.result()['ready_for_human_review'])

    def test_explicit_apple_rule_cannot_be_hidden_as_an_original_design_choice(self):
        self.record['decisions'][0].update(kind='design-choice', statement='Apple requires a minimum of 44 CSS pixels everywhere.')
        self.assertFalse(self.result()['contract_valid'])

    def test_ungrounded_original_choices_do_not_clear_a_hig_design_record(self):
        self.record['decisions'][0]['kind'] = 'design-choice'
        self.assertFalse(self.result()['ready_for_human_review'])

    def test_unavailable_runtime_is_not_inapplicability(self):
        item = next(c for c in self.record['checks'] if c['id'] == 'platform-runtime')
        item.update(status='not-applicable', reason='No Mac is available')
        self.assertFalse(self.result()['ready_for_human_review'])

    def test_record_from_another_skill_revision_is_rejected(self):
        self.record['skill_sha256'] = '0' * 64
        self.assertFalse(self.result()['contract_valid'])

    def test_runtime_work_records_do_not_change_the_skill_fingerprint(self):
        copied = self.root / 'skill'
        shutil.copytree(hig.BASE, copied, ignore=shutil.ignore_patterns('__pycache__'))
        with patch.object(hig, 'BASE', copied):
            before = quality.skill_fingerprint()
            work = copied / 'work'; work.mkdir()
            (work / 'record.json').write_text('Generated runtime artifact', encoding='utf-8')
            self.assertEqual(quality.skill_fingerprint(), before)
            (copied / 'SKILL.md').write_text('Changed skill instructions', encoding='utf-8')
            self.assertNotEqual(quality.skill_fingerprint(), before)

    def test_evidence_paths_cannot_escape_record_directory(self):
        for name in ('../outside.json', str((self.root / 'source.json').resolve())):
            with self.subTest(name=name):
                self.record['sources'][0]['evidence_file'] = name
                self.assertFalse(self.result()['contract_valid'])

    def test_retrieval_rejects_another_official_topic_identity(self):
        doc = {'metadata': {'title': 'Alerts'}, 'identifier': {'url': 'doc://com.apple.HIG/design/human-interface-guidelines/alerts'}}
        class Opener:
            def open(self, request, timeout): return io.BytesIO(json.dumps(doc).encode())
        with patch.object(hig.urllib.request, 'build_opener', return_value=Opener()):
            with self.assertRaisesRegex(ValueError, 'does not match'):
                hig.retrieve('/design/human-interface-guidelines/buttons')

    def test_known_games_conflict_points_to_the_actual_display_section(self):
        text = (hig.BASE / 'references/evidence-and-quality.md').read_text(encoding='utf-8')
        self.assertIn('games#Look-stunning-on-every-display', text)
        self.assertNotIn('games#Enable-intuitive-interactions', text)

    def test_challenge_cases_cover_platforms_without_claiming_independent_gold(self):
        data = json.loads((ROOT / 'evaluations/design-cases.json').read_text(encoding='utf-8'))
        self.assertFalse(data['independent_empirical_evidence'])
        self.assertEqual(len(data['cases']), 30)
        self.assertEqual(len({c['id'] for c in data['cases']}), 30)
        self.assertEqual({c['platform'] for c in data['cases']}, set(quality.PLATFORMS))
        for case in data['cases']:
            self.assertTrue(case['prompt']); self.assertTrue(case['review_for'])
            for slug in case['topics']: hig.resolve(hig.load_catalog(), slug)

    def test_source_snapshot_dates_are_consistent_with_the_gallery(self):
        catalog = hig.load_catalog();date = catalog['snapshot_date']
        skill = (hig.BASE / 'SKILL.md').read_text(encoding='utf-8')
        self.assertIn('snapshot-date: "' + date + '"', skill)
        for group in ('getting-started','foundations','patterns','components','inputs','technologies'):
            self.assertIn('English HIG snapshot: ' + date + '.', (hig.BASE/'references'/(group+'.md')).read_text(encoding='utf-8'))
        gallery = json.loads((ROOT/'examples/gallery/catalog.json').read_text(encoding='utf-8'))
        self.assertEqual(gallery['snapshot'], date)

    def test_changed_source_cards_retain_scope_and_point_to_reviewed_sections(self):
        catalog = hig.load_catalog()
        page = hig.resolve(catalog, 'widgets')
        self.assertIn('Apple-HomeView', page['evidence_sections'])
        self.assertIn('Apple-HomeView', page['source_anchors'])
        self.assertIn('household', hig.card(page))
        self.assertIn('Creating-Live-Activity-layouts', hig.resolve(catalog, 'live-activities')['evidence_sections'])
        self.assertIn('limited-width', hig.card(hig.resolve(catalog, 'live-activities')))
        self.assertIn('before driving', hig.card(hig.resolve(catalog, 'carplay')))


class AssuranceTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(); self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        def artifact(name, text):
            data = text.encode(); (self.root / name).write_bytes(data)
            return hashlib.sha256(data).hexdigest()
        prompt_hash = artifact('prompt.txt', 'Synthetic regression input, not empirical design evidence.')
        response_hash = artifact('response.txt', 'Synthetic regression output, not an independently assessed answer.')
        selected = {'trial_id': 'fixture-1', 'prompt_sha256': prompt_hash, 'platform': 'ios', 'client': 'codex',
                    'model': 'synthetic-test-model', 'model_settings': {}, 'minimum_os': 'synthetic-test-os'}
        registry_hash = artifact('selected.jsonl', json.dumps(selected) + '\n')
        self.protocol = {
            'schema_version': 1, 'id': 'synthetic-unit-fixture', 'metric': 'task-result-with-any-material-error',
            'confidence': 0.95, 'target_error_fraction': 0.0001, 'skill_sha256': quality.skill_fingerprint(),
            'registered_at_utc': (datetime.now(timezone.utc)-timedelta(days=1)).isoformat(),
            'sampling': {'method': 'independent-representative-task-sampling', 'population_definition': 'synthetic test',
                         'independence_justification': 'synthetic fixture only; not an actual study'},
            'authors_and_runners': ['author'],
            'reviewers': [{'id': rid, 'qualified': True, 'independent_of_author_and_runner': True} for rid in ('a', 'b')],
            'selected_trials_file': 'selected.jsonl', 'selected_trials_sha256': registry_hash,
            'registration_evidence_file': 'registration.txt', 'registration_evidence_sha256': artifact('registration.txt', 'Synthetic registration fixture'),
        }
        self.row = {**selected, 'skill_sha256': self.protocol['skill_sha256'], 'run_at_utc': datetime.now(timezone.utc).isoformat(),
                    'prompt_file': 'prompt.txt', 'response_file': 'response.txt', 'response_sha256': response_hash, 'reviews': []}
        for rid in ('a', 'b'):
            self.row['reviews'].append({'reviewer_id': rid, 'full_output_and_sources_reviewed': True, 'ambiguous': False,
                                       'error_categories': [], 'evidence_file': rid + '.txt',
                                       'evidence_sha256': artifact(rid + '.txt', 'Synthetic review ' + rid)})

    def result(self, rows=None): return assurance.evaluate(self.protocol, [self.row] if rows is None else rows, self.root)

    def test_zero_error_sample_boundary_and_hypothetical_label(self):
        self.assertFalse(assurance.estimate(29955, 0)['bound_below_target'])
        result = assurance.estimate(29956, 0)
        self.assertTrue(result['bound_below_target']); self.assertEqual(result['minimum_zero_error_trials'], 29956)
        self.assertIn('Hypothetical', result['scope'])

    def test_nonzero_error_bounds_match_analytic_small_samples(self):
        self.assertAlmostEqual(assurance.upper_bound(2, 1), .95 ** .5, places=12)
        self.assertAlmostEqual(assurance.upper_bound(3, 2), .95 ** (1/3), places=12)
        self.assertAlmostEqual(assurance.upper_bound(1, 0), .95, places=12)
        self.assertEqual(assurance.upper_bound(0, 0), 1)
        self.assertEqual(assurance.upper_bound(4, 4), 1)
        self.assertGreater(assurance.upper_bound(29956, 1), .0001)

    def test_invalid_counts_and_nan_are_rejected(self):
        for args in [(-1, 0, .95, .0001), (10, 11, .95, .0001), (True, 0, .95, .0001),
                     (10, 0, float('nan'), .0001), (10, 0, .95, 0)]:
            with self.subTest(args=args):
                with self.assertRaises(ValueError): assurance.estimate(*args)

    def test_one_complete_fixture_does_not_establish_target(self):
        result = self.result()
        self.assertTrue(result['evidence_admissible'], result)
        self.assertFalse(result['statistical_target_met'])
        self.assertEqual(result['statistics']['trials'], 1)

    def test_missing_selected_outputs_count_as_errors(self):
        result = self.result([])
        self.assertEqual(result['statistics']['errors'], 1); self.assertEqual(result['missing_trials'], 1)
        self.assertFalse(result['statistical_target_met'])

    def test_disagreements_and_ambiguity_count_as_task_errors(self):
        self.row['reviews'][0]['error_categories'] = ['wrong-platform']
        result = self.result(); self.assertEqual(result['statistics']['errors'], 1)
        self.assertEqual(result['review_disagreements'], 1)
        self.row['reviews'][0]['error_categories'] = []; self.row['reviews'][0]['ambiguous'] = True
        self.assertEqual(self.result()['statistics']['errors'], 1)

    def test_self_review_duplicate_reviewers_and_missing_artifacts_are_inadmissible(self):
        for mutation in ('self', 'duplicate', 'artifact'):
            with self.subTest(mutation=mutation):
                saved = copy.deepcopy(self.row)
                if mutation == 'self': self.row['reviews'][0]['reviewer_id'] = 'author'
                if mutation == 'duplicate': self.row['reviews'][0]['reviewer_id'] = 'b'
                if mutation == 'artifact': self.row['reviews'][0]['evidence_file'] = 'missing.txt'
                self.assertFalse(self.result()['evidence_admissible']); self.row = saved

    def test_duplicate_and_unregistered_results_cannot_inflate_counts(self):
        self.assertFalse(self.result([self.row, self.row])['evidence_admissible'])
        other = {**self.row, 'trial_id': 'unregistered'}
        self.assertFalse(self.result([self.row, other])['evidence_admissible'])

    def test_output_mutation_and_revision_mismatch_are_inadmissible(self):
        self.row['skill_sha256'] = '0' * 64
        self.assertFalse(self.result()['evidence_admissible'])
        self.row['skill_sha256'] = self.protocol['skill_sha256']
        (self.root / 'response.txt').write_text('Changed output', encoding='utf-8')
        self.assertFalse(self.result()['evidence_admissible'])

    def test_challenge_cases_do_not_qualify_as_probability_sample(self):
        self.protocol['sampling']['method'] = 'authored-regression-cases'
        self.assertFalse(self.result()['evidence_admissible'])

    def test_trial_before_registration_is_inadmissible(self):
        self.row['run_at_utc'] = (datetime.now(timezone.utc)-timedelta(days=2)).isoformat()
        self.assertFalse(self.result()['evidence_admissible'])

    def test_published_baseline_has_no_empirical_trials_or_proof(self):
        protocol = json.loads((ROOT / 'evaluations/protocol.template.json').read_text(encoding='utf-8'))
        result = assurance.evaluate(protocol, [], ROOT / 'evaluations')
        published = json.loads((ROOT / 'evaluations/current-report.json').read_text(encoding='utf-8'))
        self.assertEqual(result, published, 'Regenerate the public assurance baseline after scorer changes')
        self.assertEqual(result['statistics']['trials'], 0)
        self.assertIsNone(result['statistics']['observed_error_fraction'])
        self.assertFalse(result['statistical_target_met'])


if __name__ == '__main__': unittest.main()
