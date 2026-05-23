#!/usr/bin/env python3
"""Restore files deleted by cleanup_graph.py from an audit JSON.

Usage:
  python3 restore_deleted_files.py <audit-file.json>
  python3 restore_deleted_files.py                 # uses most-recent delete-* audit
"""
import json
import sys
from pathlib import Path

VAULT = Path.home() / "Obsidian" / "notes"
AUDIT_DIR = VAULT / ".audit"


def main():
  if len(sys.argv) >= 2:
    audit_path = Path(sys.argv[1])
  else:
    audits = sorted(AUDIT_DIR.glob("delete-*.json"))
    if not audits:
      print("No delete audit files found in .audit/", file=sys.stderr)
      sys.exit(1)
    audit_path = audits[-1]
    print(f"Using most-recent audit: {audit_path}", file=sys.stderr)

  audit = json.loads(audit_path.read_text())
  print(f"Restoring from: {audit['operation']} ({audit['timestamp']})", file=sys.stderr)

  restored = 0
  already_present = 0
  for entry in audit["files"]:
    p = VAULT / entry["path"]
    if p.exists():
      already_present += 1
      continue
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(entry["content"])
    restored += 1

  print(f"Restored {restored} files ({already_present} already exist - skipped)", file=sys.stderr)


if __name__ == "__main__":
  main()
