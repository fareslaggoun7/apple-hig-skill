"""Synthetic matrix-logic tests; none are independent model evaluations."""
import copy
from datetime import datetime, timedelta, timezone
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'skills/apple-hig/scripts'))
import assurance
import design_quality


class StudyMatrixTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(); self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.study = json.loads((ROOT / 'evaluations/study-matrix.json').read_text(encoding='utf-8'))
        self.study['skill_sha256'] = design_quality.skill_fingerprint()
        self.study['registered_at_utc'] = (datetime.now(timezone.utc)-timedelta(days=2)).isoformat()
        self.study['registration_evidence_file'] = 'study-registration.txt'
        self.study['registration_evidence_sha256'] = self.write('study-registration.txt', b'Synthetic study-registration fixture')
        for cohort in self.study['cohorts']:
            cohort.update(model='synthetic-model', model_settings={}, minimum_os='synthetic-os')

    def write(self, name, data):
        if isinstance(data, str): data = data.encode()
        path = self.root / name; path.parent.mkdir(parents=True, exist_ok=True); path.write_bytes(data)
        return hashlib.sha256(data).hexdigest()

    def attach(self, cohort, confidence=None, changes=None):
        context = {key: cohort[key] for key in ('client', 'platform', 'model', 'model_settings', 'minimum_os')}
        if changes: context.update(changes)
        registry = 'registry.jsonl'
        registry_hash = self.write(registry, json.dumps({'trial_id': 'synthetic-only', **context}) + '\n')
        protocol = {
            'skill_sha256': self.study['skill_sha256'],
            'registered_at_utc': (datetime.now(timezone.utc)-timedelta(days=1)).isoformat(),
            'confidence': confidence if confidence is not None else 1-(1-.95)/18,
            'target_error_fraction': .0001,
            'selected_trials_file': registry, 'selected_trials_sha256': registry_hash,
        }
        name = cohort['client'] + '-' + cohort['platform'] + '-protocol.json'
        cohort.update(protocol_file=name, protocol_sha256=self.write(name, json.dumps(protocol)),
                      records_file='records.jsonl', records_sha256=self.write('records.jsonl', ''))
        return protocol

    def simulated_assessment(self, supported=True, trials=58859):
        # Simulates the trusted evaluator's return value to isolate orchestration.
        # This fixture is not exposed as empirical data or a real benchmark.
        stats = assurance.estimate(trials, 0, 1-(1-.95)/18)
        return {'statistics': stats, 'evidence_problems': [], 'statistical_target_met': supported,
                'reviewed_trials': trials, 'missing_trials': 0}

    def test_public_matrix_is_complete_but_has_no_empirical_support(self):
        study = json.loads((ROOT / 'evaluations/study-matrix.json').read_text(encoding='utf-8'))
        result = assurance.matrix(study, ROOT / 'evaluations')
        published = json.loads((ROOT / 'evaluations/matrix-report.json').read_text(encoding='utf-8'))
        self.assertEqual(result, published)
        self.assertEqual(result['cohort_count'], 18)
        self.assertEqual(result['empirical_trials'], 0)
        self.assertEqual(result['supported_cohorts'], 0)
        self.assertFalse(result['statistical_target_met'])

    def test_missing_duplicate_and_unknown_cohorts_are_rejected(self):
        for mutation in ('missing', 'duplicate', 'unknown'):
            study = copy.deepcopy(self.study)
            if mutation == 'missing': study['cohorts'].pop()
            if mutation == 'duplicate': study['cohorts'][-1] = copy.deepcopy(study['cohorts'][0])
            if mutation == 'unknown': study['cohorts'][0]['client'] = 'other-client'
            with self.subTest(mutation=mutation):
                with self.assertRaises(ValueError): assurance.matrix(study, self.root)

    def test_simultaneous_zero_error_boundary_uses_18_way_correction(self):
        result = assurance.matrix(self.study, self.root)
        confidence = result['required_per_cohort_confidence']
        self.assertAlmostEqual(confidence, 1-.05/18)
        self.assertEqual(result['minimum_zero_error_independent_trials_per_cohort'], 58859)
        self.assertEqual(result['minimum_zero_error_independent_trials_total'], 1059462)
        self.assertGreaterEqual(assurance.upper_bound(58858, 0, confidence), .0001)
        self.assertLess(assurance.upper_bound(58859, 0, confidence), .0001)

    def test_marginal_95_percent_protocol_does_not_establish_joint_95_percent(self):
        self.attach(self.study['cohorts'][0], confidence=.95)
        result = assurance.matrix(self.study, self.root)
        self.assertTrue(any('simultaneous' in p for p in result['cohorts'][0]['evidence_problems']))
        self.assertFalse(result['statistical_target_met'])

    def test_cohort_cannot_weaken_the_requested_error_threshold(self):
        cohort = self.study['cohorts'][0]; protocol = self.attach(cohort)
        protocol['target_error_fraction'] = .001
        cohort['protocol_sha256'] = self.write(cohort['protocol_file'], json.dumps(protocol))
        result = assurance.matrix(self.study, self.root)
        self.assertTrue(any('simultaneous study requirement' in p for p in result['cohorts'][0]['evidence_problems']))
        self.assertFalse(result['statistical_target_met'])

    def test_wrong_platform_or_model_registry_cannot_be_pooled_into_a_cohort(self):
        for changes in ({'platform': 'watchos'}, {'model': 'different-model'}):
            with self.subTest(changes=changes):
                self.attach(self.study['cohorts'][0], changes=changes)
                result = assurance.matrix(self.study, self.root)
                self.assertTrue(any('designated cohort' in p for p in result['cohorts'][0]['evidence_problems']))

    def test_changed_protocol_bytes_and_escaping_paths_are_rejected(self):
        cohort = self.study['cohorts'][0]; self.attach(cohort)
        (self.root / cohort['protocol_file']).write_text('Changed after binding', encoding='utf-8')
        result = assurance.matrix(self.study, self.root)
        self.assertTrue(any('SHA-256' in p for p in result['cohorts'][0]['evidence_problems']))
        cohort['protocol_file'] = '../outside.json'
        result = assurance.matrix(self.study, self.root)
        self.assertTrue(any('outside' in p for p in result['cohorts'][0]['evidence_problems']))

    def test_absent_global_preregistration_blocks_every_cohort(self):
        self.study['registered_at_utc'] = None
        result = assurance.matrix(self.study, self.root)
        self.assertTrue(result['evidence_problems'])
        self.assertEqual(result['supported_cohorts'], 0)

    def test_cohort_cannot_precede_overall_study_registration(self):
        cohort = self.study['cohorts'][0]; protocol = self.attach(cohort)
        protocol['registered_at_utc'] = (datetime.now(timezone.utc)-timedelta(days=3)).isoformat()
        cohort['protocol_sha256'] = self.write(cohort['protocol_file'], json.dumps(protocol))
        result = assurance.matrix(self.study, self.root)
        self.assertTrue(any('after the overall study' in p for p in result['cohorts'][0]['evidence_problems']))

    def test_single_supported_cohort_never_clears_the_18_cohort_claim(self):
        self.attach(self.study['cohorts'][0])
        with patch.object(assurance, 'evaluate', return_value=self.simulated_assessment()):
            result = assurance.matrix(self.study, self.root)
        self.assertEqual(result['supported_cohorts'], 1)
        self.assertFalse(result['statistical_target_met'])

    def test_all_18_need_support_even_when_pooled_counts_are_large(self):
        # Reuse synthetic context within each attachment, while giving each
        # cohort its own registered bytes, so the scope gate remains exercised.
        for cohort in self.study['cohorts']:
            context = {key: cohort[key] for key in ('client', 'platform', 'model', 'model_settings', 'minimum_os')}
            registry = cohort['client'] + '-' + cohort['platform'] + '-registry.jsonl'
            registry_hash = self.write(registry, json.dumps({'trial_id': 'synthetic-only', **context}) + '\n')
            protocol = self.attach(cohort)
            protocol.update(selected_trials_file=registry, selected_trials_sha256=registry_hash)
            cohort['protocol_sha256'] = self.write(cohort['protocol_file'], json.dumps(protocol))
        assessments = [self.simulated_assessment(trials=60000) for _ in range(17)] + [self.simulated_assessment(False, 1)]
        with patch.object(assurance, 'evaluate', side_effect=assessments):
            result = assurance.matrix(self.study, self.root)
        self.assertEqual(result['supported_cohorts'], 17)
        self.assertGreater(result['empirical_trials'], 1000000)
        self.assertFalse(result['statistical_target_met'])
        with patch.object(assurance, 'evaluate', return_value=self.simulated_assessment()):
            result = assurance.matrix(self.study, self.root)
        self.assertTrue(result['statistical_target_met'])
        self.assertIn('conditionally', result['status'])

    def test_unknown_models_block_even_a_simulated_passing_assessment(self):
        self.study['cohorts'][0]['model'] = None; self.attach(self.study['cohorts'][0])
        with patch.object(assurance, 'evaluate', return_value=self.simulated_assessment()):
            result = assurance.matrix(self.study, self.root)
        self.assertFalse(result['cohorts'][0]['statistical_target_met'])

    def test_cli_reports_unestablished_and_exits_two(self):
        result = subprocess.run([sys.executable, str(ROOT / 'skills/apple-hig/scripts/assurance.py'),
                                 'matrix', '--study', str(ROOT / 'evaluations/study-matrix.json')],
                                stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        self.assertEqual(result.returncode, 2, result.stderr)
        self.assertFalse(json.loads(result.stdout)['statistical_target_met'])


if __name__ == '__main__': unittest.main()
