"""Regenerate the human-readable StaqUI inventory from the maintained catalog."""
from pathlib import Path
import json
root = Path(__file__).resolve().parent.parent
items = json.loads((root / 'apps/docs/lib/catalog.json').read_text())
lines = ['# StaqUI component inventory', '', 'The maintained catalog describes the public components, implementation notes, and accessibility behavior. API tables are generated from TypeScript exports.', '']
for c in items:
    lines += [f'## {c["name"]} — {c["category"]}', '', c['description'], '', 'Implementation: ' + c['adaptation'], '', 'Accessibility: ' + c['accessibility'], '', f'Runnable example: `packages/ui/examples/{c["slug"]}.tsx`.', '']
(root / 'research/INVENTORY.md').write_text('\n'.join(lines))
print(f'Inventory: {len(items)} components')
