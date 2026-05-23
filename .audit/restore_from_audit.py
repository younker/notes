#!/usr/bin/env python3
"""Restore tags from an audit JSON produced by remove_contact_tag.py.

Usage:
  python3 restore_from_audit.py <audit-file.json>
  python3 restore_from_audit.py                 # uses most-recent audit in .audit/
"""
import json
import re
import sys
from pathlib import Path
import yaml

VAULT = Path.home() / "Obsidian" / "notes"
AUDIT_DIR = VAULT / ".audit"
FM = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)


def main():
  if len(sys.argv) >= 2:
    audit_path = Path(sys.argv[1])
  else:
    audits = sorted(AUDIT_DIR.glob("*.json"))
    if not audits:
      print("No audit files found in .audit/", file=sys.stderr)
      sys.exit(1)
    audit_path = audits[-1]
    print(f"Using most-recent audit: {audit_path}", file=sys.stderr)

  audit = json.loads(audit_path.read_text())
  print(f"Restoring from: {audit['operation']} ({audit['timestamp']})", file=sys.stderr)
  print(f"Tag to restore: #{audit['tag_removed']}", file=sys.stderr)

  restored = 0
  missing = 0
  for entry in audit["files"]:
    p = VAULT / entry["path"]
    if not p.exists():
      missing += 1
      continue
    text = p.read_text()
    m = FM.match(text)
    if not m:
      continue
    fm = yaml.safe_load(m.group(1)) or {}
    body = text[m.end():]
    fm["tags"] = list(entry["tags_before"])
    yaml_str = yaml.safe_dump(fm, sort_keys=False, allow_unicode=True,
                              default_flow_style=False, width=10000)
    p.write_text(f"---\n{yaml_str}---\n{body}")
    restored += 1

  print(f"Restored {restored} notes ({missing} files no longer exist)", file=sys.stderr)


if __name__ == "__main__":
  main()
