"""Platform-aware design plans and evidence-contract checks (not certification)."""
from __future__ import annotations

import hashlib
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path
import re

import hig

PLATFORMS = ('ios', 'ipados', 'macos', 'tvos', 'visionos', 'watchos')
FOUNDATIONS = ('design-principles', 'accessibility', 'layout', 'typography', 'color', 'motion', 'privacy', 'writing')
PLATFORM_TOPICS = {
    'ios': ('gestures', 'tab-bars', 'sheets'),
    'ipados': ('multitasking', 'sidebars', 'split-views', 'keyboards', 'pointing-devices'),
    'macos': ('windows', 'the-menu-bar', 'toolbars', 'keyboards', 'pointing-devices'),
    'tvos': ('focus-and-selection', 'remotes'),
    'visionos': ('spatial-layout', 'eyes', 'immersive-experiences'),
    'watchos': ('digital-crown', 'complications'),
}
CHECKS = (
    'primary-task', 'navigation-and-recovery', 'accessibility-and-input',
    'text-and-layout', 'appearance-and-contrast', 'states-and-feedback',
    'privacy-and-permissions', 'motion-and-interruption', 'platform-runtime',
    'source-semantic-review',
)
CHECK_DESCRIPTIONS = {
    'primary-task': 'Complete the primary task; explain hierarchy, labels, and the chosen native pattern.',
    'navigation-and-recovery': 'Test back, dismissal, cancellation, undo, interruption, and recovery where applicable.',
    'accessibility-and-input': 'Test relevant assistive technology, keyboard/focus, input alternatives, and accessible names.',
    'text-and-layout': 'Check large text, narrow/resized windows, long/localized content, RTL, and safe regions as applicable.',
    'appearance-and-contrast': 'Inspect relevant light/dark and increased-contrast appearances against the actual background.',
    'states-and-feedback': 'Check loading, empty, error, unavailable, success, selection, and pressed states where applicable.',
    'privacy-and-permissions': 'Check least disclosure, permission timing, denial, and sensitive surfaces where applicable.',
    'motion-and-interruption': 'Check purposeful feedback, interruption, reduced motion, and spatial comfort where applicable.',
    'platform-runtime': 'Run the relevant platform/runtime; record OS, device/window, input, and what was actually tested.',
    'source-semantic-review': 'Read cited sections in full context; review force, scope, units, omissions, conflicts, and SDK claims.',
}


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def applicable(page, platform):
    if page['slug'] in {'designing-for-' + p for p in PLATFORMS}:
        return page['slug'] == 'designing-for-' + platform
    return not page['supported_platforms'] or platform in page['supported_platforms']


def skill_fingerprint():
    """Bind distributable skill files, excluding interpreter caches/runtime work."""
    digest = hashlib.sha256()
    for path in sorted(hig.BASE.rglob('*'), key=lambda p: p.relative_to(hig.BASE).as_posix()):
        if not path.is_file() or '__pycache__' in path.parts or path.suffix == '.pyc':
            continue
        relative = path.relative_to(hig.BASE)
        if relative.parts[0] == 'work':
            continue
        name = relative.as_posix().encode()
        data = path.read_bytes()
        digest.update(len(name).to_bytes(8, 'big') + name)
        digest.update(len(data).to_bytes(8, 'big') + data)
    return digest.hexdigest()


def plan(platform, goal, minimum_os='unspecified', surface='native', topics=()):
    catalog = hig.load_catalog()
    selected = list(dict.fromkeys(('designing-for-' + platform,) + FOUNDATIONS + PLATFORM_TOPICS[platform] + tuple(topics)))
    sources = []
    for slug in selected:
        page = hig.resolve(catalog, slug)
        if not applicable(page, platform):
            raise ValueError(f'{slug} has no {platform} applicability in the snapshot; inspect current platform guidance instead')
        sources.append({
            'id': slug, 'topic': slug, 'section': page['evidence_sections'][0],
            'url': page['url'] + ('#' + page['evidence_sections'][0] if page['evidence_sections'][0] != 'Overview' else ''),
            'verification': 'snapshot', 'snapshot_date': catalog['snapshot_date'],
            'evidence_file': None, 'evidence_sha256': None,
        })
    return {
        'schema_version': 1, 'skill_sha256': skill_fingerprint(),
        'context': {'platform': platform, 'minimum_os': minimum_os, 'surface': surface,
                    'goal': goal, 'users': [], 'inputs': [], 'constraints': []},
        'sources': sources, 'decisions': [],
        'checks': [{'id': key, 'status': 'not-run', 'evidence': '', 'reason': '',
                    'instruction': CHECK_DESCRIPTIONS[key]} for key in CHECKS],
        'issues': [],
        'instructions': 'Select applicable topics/sections; fill context and decisions; preserve source scope and force. '
                        'Capture live sections for consequential Apple claims. Mark real checks honestly. '
                        'This is an unfinished plan, not a quality result. See references/design-playbook.md.',
    }


def artifact_path(root, name):
    if not isinstance(name, str) or not name or Path(name).is_absolute():
        raise ValueError('Evidence files must be nonempty relative paths inside the record directory')
    path = (root / name).resolve()
    if not path.is_relative_to(root.resolve()) or not path.is_file():
        raise ValueError('Evidence file is missing or outside the record directory: ' + name)
    return path


def checked_artifact(root, name, expected_hash):
    path = artifact_path(root, name)
    data = path.read_bytes()
    if not isinstance(expected_hash, str) or not re.fullmatch(r'[0-9a-f]{64}', expected_hash):
        raise ValueError('Evidence SHA-256 is missing or malformed')
    if sha256(data) != expected_hash:
        raise ValueError('Evidence bytes do not match their SHA-256: ' + name)
    return data


def check(record, root, allow_snapshot=False):
    """Validate recorded evidence and completeness; cannot judge prose entailment."""
    errors, blockers, warnings = [], [], []
    catalog = hig.load_catalog()
    if record.get('schema_version') != 1:
        errors.append('Unsupported design record schema')
    if record.get('skill_sha256') != skill_fingerprint():
        errors.append('Design record is not bound to the current installed skill')
    context = record.get('context', {})
    if not isinstance(context, dict):
        context = {}; errors.append('Context must be an object')
    platform = context.get('platform')
    if platform not in PLATFORMS:
        errors.append('A supported target platform is required')
    if context.get('surface') not in ('native', 'web-adaptation'):
        errors.append('Surface must be native or web-adaptation')
    for key in ('goal', 'minimum_os'):
        if not isinstance(context.get(key), str) or not context[key].strip() or context[key] == 'unspecified':
            blockers.append('Design context is missing: ' + key)
    for key in ('users', 'inputs'):
        if not isinstance(context.get(key), list) or not context[key] or any(not isinstance(v, str) or not v.strip() for v in context[key]):
            blockers.append('Design context is missing: ' + key)

    def entries(key):
        value = record.get(key)
        if not isinstance(value, list) or any(not isinstance(item, dict) for item in value):
            errors.append(key + ' must be an array of objects'); return []
        return value

    sources = {}
    for source in entries('sources'):
        sid = source.get('id')
        try:
            if not isinstance(sid, str) or not sid.strip() or sid in sources:
                raise ValueError('Source IDs must be nonempty and unique')
            page = hig.resolve(catalog, source.get('topic', ''))
            section = source.get('section')
            if section != 'Overview' and section not in page['source_anchors']:
                raise ValueError('Unknown official section anchor')
            expected_url = page['url'] + ('#' + section if section != 'Overview' else '')
            if source.get('url') != expected_url:
                raise ValueError('Source URL must match the topic and exact section')
            if not applicable(page, platform):
                raise ValueError('Source page/platform profile excludes the target platform')
            if source.get('verification') == 'live':
                fetched = json.loads(checked_artifact(root, source.get('evidence_file'), source.get('evidence_sha256')))
                if fetched.get('url') != page['url'] or fetched.get('canonical_path') != page['path'] or fetched.get('section') != section:
                    raise ValueError('Fetched evidence belongs to a different topic or section')
                if fetched.get('snapshot_sha256') != page['sha256'] or type(fetched.get('semantic_match')) is not bool:
                    raise ValueError('Fetched evidence lacks the current snapshot comparison')
                if fetched.get('truncated') is not False or fetched.get('unhandled_node_types') != [] or not fetched.get('blocks'):
                    raise ValueError('Live section is truncated, empty, or contains unhandled nodes')
                if not fetched.get('retrieved_at_utc') or not re.fullmatch(r'[0-9a-f]{64}', fetched.get('live_sha256', '')):
                    raise ValueError('Live retrieval date or source fingerprint is missing')
                retrieved = datetime.fromisoformat(fetched['retrieved_at_utc'].replace('Z', '+00:00'))
                if retrieved.tzinfo is None:
                    raise ValueError('Live evidence requires a timezone-aware retrieval date')
                age = datetime.now(timezone.utc) - retrieved
                if age < -timedelta(minutes=5) or age > timedelta(days=7):
                    blockers.append(sid + ': live evidence is future-dated or older than the seven-day review window')
                blocks = fetched['blocks']
                if not isinstance(blocks, list) or fetched.get('selected_block_count') != len(blocks):
                    raise ValueError('Live evidence does not contain every selected block')
                if any(not isinstance(b, dict) or ('text' not in b and 'table' not in b) or
                       (section != 'Overview' and section not in b.get('sections', [])) for b in blocks):
                    raise ValueError('Live evidence blocks do not belong to the selected section')
                if fetched.get('semantic_match') is False:
                    blockers.append(f'{sid}: official content drift requires a source review and updated snapshot')
            elif source.get('verification') == 'snapshot':
                if source.get('snapshot_date') != catalog['snapshot_date']:
                    raise ValueError('Snapshot date does not match the installed catalog')
                warnings.append(sid + ': dated snapshot; current source not verified')
            else:
                raise ValueError('Source verification must be live or snapshot')
            sources[sid] = source
        except (OSError, ValueError, TypeError, KeyError, AttributeError) as exc:
            errors.append(f'Source {sid}: {exc}')

    decisions = entries('decisions')
    if not decisions:
        blockers.append('No implemented or proposed design decisions are recorded')
    elif not any(decision.get('kind') == 'apple-guidance' for decision in decisions):
        blockers.append('No source-guided Apple design decision is recorded')
    seen = set()
    for decision in decisions:
        did = decision.get('id')
        statement = decision.get('statement') if isinstance(decision.get('statement'), str) else ''
        if not isinstance(did, str) or not did.strip() or did in seen:
            errors.append('Decision IDs must be nonempty and unique')
        else:
            seen.add(did)
        for key in ('statement', 'rationale', 'user_impact', 'scope', 'implementation_evidence'):
            if not isinstance(decision.get(key), str) or not decision[key].strip():
                blockers.append(f'{did}: missing {key}')
        kind = decision.get('kind')
        if kind not in ('apple-guidance', 'design-choice', 'sdk-contract'):
            errors.append(f'{did}: unknown decision kind')
        if kind == 'design-choice' and re.search(r'\b(?:Apple|HIG)\b[^\n]*(?:requir|recommend|mandat|minimum)', statement, re.IGNORECASE):
            errors.append(f'{did}: an explicit Apple rule attribution cannot be classified only as an original design choice')
        if decision.get('review') != 'reviewed':
            blockers.append(f'{did}: semantic review is pending or conflicted')
        if kind == 'sdk-contract':
            blockers.append(f'{did}: SDK claims need separate official API evidence; this HIG checker cannot verify them')
        if kind == 'apple-guidance':
            refs = decision.get('source_ids')
            if not isinstance(refs, list) or not refs or any(not isinstance(s, str) or s not in sources for s in refs):
                errors.append(f'{did}: Apple guidance needs valid exact-section source IDs')
                continue
            exact = decision.get('exact_value') is True or bool(re.search(r'\d', statement))
            for sid in refs:
                if sources[sid]['verification'] != 'live' and (exact or not allow_snapshot):
                    blockers.append(f'{did}: current full-context evidence required for ' + ('numeric/version-sensitive claims' if exact else 'consequential Apple guidance'))
            if decision.get('force') not in ('requires', 'recommends', 'permits', 'describes'):
                blockers.append(f'{did}: record the original recommendation force')
            if decision.get('qualifiers_reviewed') is not True:
                blockers.append(f'{did}: platform, table/tab, exception, and version qualifiers must be reviewed')

    checks = {}
    for item in entries('checks'):
        cid = item.get('id')
        if cid not in CHECKS or cid in checks:
            errors.append('Unknown or duplicate check ID: ' + str(cid)); continue
        checks[cid] = item
        status = item.get('status')
        if status == 'pass':
            if not isinstance(item.get('evidence'), str) or not item['evidence'].strip():
                blockers.append(cid + ': a pass needs actual test/review evidence')
        elif status == 'not-applicable':
            if not isinstance(item.get('reason'), str) or not item['reason'].strip():
                blockers.append(cid + ': explain why this check does not apply')
            if cid in ('primary-task', 'source-semantic-review', 'accessibility-and-input', 'platform-runtime'):
                blockers.append(cid + ': this core review cannot be omitted')
        elif status in ('not-run', 'fail'):
            blockers.append(cid + ': ' + status)
        else:
            errors.append(cid + ': invalid check status')
    blockers.extend('Missing review check: ' + key for key in CHECKS if key not in checks)
    for issue in entries('issues'):
        if issue.get('severity') not in ('blocking', 'material', 'minor') or not isinstance(issue.get('description'), str) or not issue['description'].strip():
            errors.append('Issues need severity and description')
        elif issue['severity'] in ('blocking', 'material'):
            blockers.append('Unresolved issue: ' + issue['description'])
    return {
        'schema_version': 1, 'contract_valid': not errors,
        'ready_for_human_review': not errors and not blockers,
        'errors': errors, 'blockers': blockers, 'warnings': warnings,
        'semantic_accuracy': 'Not measured. Matching URLs, hashes, and declared review results do not prove entailment or native behavior.',
        'certification': False,
    }
