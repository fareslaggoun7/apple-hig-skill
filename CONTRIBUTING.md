# Contributing

Prefer small, source-backed changes. Describe the affected platform and task, cite the applicable official section, and preserve recommendation strength and source conflicts. Do not add unsupported measurements or availability claims.

For source updates, use `refresh`, read the changed official content, and update cards with their catalog fingerprints. Keep summaries concise and original; do not contribute copied Apple articles or official artwork. Original examples and diagrams should be marked as educational illustrations.

Run `python -m unittest discover -s tests -v`, `python skills/apple-hig/scripts/hig.py audit`, and `python tools/package.py`. Commit updated distribution files with skill changes. Live source checks are optional during ordinary documentation work but necessary when asserting a fresh source revision.

Issues should include the topic slug, source URL/section, expected decision, observed behavior, platform context, and relevant helper output. Remove personal paths, credentials, and private app content before posting. Tests validate package behavior and structure; they do not establish a numerical interpretation error rate.

The illustrations can be rebuilt with `python tools/build_assets.py` after installing Pillow as an optional development dependency. Pillow is not needed to use the skill.
