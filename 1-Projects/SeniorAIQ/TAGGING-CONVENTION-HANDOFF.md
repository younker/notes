# Tagging Convention Change — Handoff Summary

## Context

This is a multi-repo workspace at `/Users/younker/projects/`:

- `~/projects/` — parent repo (its own `.git`), tracks `ship` and `ship-ui` as gitlinks (submodules)
- `~/projects/ship/` — Go backend, own git repo
- `~/projects/ship-ui/` — SvelteKit frontend, own git repo
- `~/projects/.planning/` — **canonical** GSD planning directory (MILESTONES.md, ROADMAP.md, STATE.md, PROJECT.md)
- `~/projects/ship/.planning/` and `~/projects/ship-ui/.planning/` — legacy local planning dirs from before the unified setup; effectively vestigial

## The problem being solved

Tag history was inconsistent because there was no single source of truth for milestone version numbers:

- ship-ui local tags: `v1.0`–`v1.4` (with patches), `v1.8`–`v1.11`, then a jump to `v3.7`
- ship local tags: only `v3.7`
- `~/projects` tags: `v1.0`–`v1.6`, `v2.1`, `v3.7`, `v3.8`

The jumps and gaps happened because `/gsd:complete-milestone` would sometimes be invoked from a sub-repo and infer the next version from `git tag -l` in that sub-repo, missing the global counter. v3.7 ended up tagged in both sub-repos; v3.8 ended up tagged only in `~/projects`. No consistent rule.

## What's already working (don't re-derive)

`gsd-tools.cjs` already calls `findProjectRoot()` (in `~/.claude/get-shit-done/bin/lib/core.cjs`) on every command except a small skip list. When invoked from `~/projects/ship-ui`, it walks up, finds `~/projects/.planning/`, applies a heuristic (parent has `.planning/`, current dir has its own `.git`), and resolves `project_root` to `/Users/younker/projects`. Verified by running `node ~/.claude/get-shit-done/bin/gsd-tools.cjs init execute-phase 1` from ship-ui — output includes `"project_root": "/Users/younker/projects"`.

This means: milestone state, archives, ROADMAP edits, MILESTONES.md updates, etc. all already touch the global planning regardless of which sub-repo Claude is running from. **The path-resolution layer is fine.** The only thing not honoring this is the raw `git tag` shell call in the workflow's `git_tag` step, which runs in cwd.

## The new convention (the rule to follow)

1. **Single source of truth for the milestone counter:** `~/projects/.planning/MILESTONES.md`. Latest entry is the most recent shipped version. Next milestone = next number in that sequence. **Never** infer the next version from `git tag -l` in any repo.

2. **Tags live only on the parent repo (`~/projects`).** Sub-repos (`ship`, `ship-ui`) do not get new milestone tags. The parent's commit at tag time captures both sub-repo SHAs via the submodule pointers, which is the canonical record of "what shipped in this milestone."

3. **A repo's local tag history is irrelevant to versioning.** Existing `v1.x` tags in ship-ui and the orphan `v3.7` in ship/ship-ui are vestigial. Don't continue those sequences. Don't try to clean them up either — leave as historical record.

4. **Tags will have gaps in sub-repos** (because they don't get tagged at all) but be contiguous in `~/projects`.

## What needs to be implemented

User has confirmed they want this approach but **has not yet picked option 1 vs 2 vs 3** for which repo(s) get tagged. The recommendation made was **option 1 (parent only)** and the user is expected to confirm. Implementation steps once confirmed:

1. **Update `~/.claude/get-shit-done/workflows/complete-milestone.md`:**
   - In the `git_tag` step (~line 649): change `git tag -a v[X.Y] -m "..."` to `git -C "$PROJECT_ROOT" tag -a v[X.Y] -m "..."` so the tag always lands on the parent repo regardless of cwd.
   - In the `verify_readiness` step: read the latest version from `~/projects/.planning/MILESTONES.md` (parse `## v` headers, take highest) and either auto-suggest the next version or validate the user-provided one against it. Surface a warning if the user passes a version that isn't the next in sequence.
   - In `git_commit_milestone`: ensure the milestone-completion commit also goes to `$PROJECT_ROOT`, not the sub-repo cwd.
   - `$PROJECT_ROOT` should be obtained from `gsd-tools init execute-phase 1` output (it already includes `"project_root"`).

2. **Add a short convention note to `~/projects/CLAUDE.md`** (the parent-level CLAUDE.md, not the per-repo ones) so future Claude sessions know:
   - Where the milestone counter lives
   - That tags go on `~/projects` only
   - That `git tag -l` in sub-repos must not be used to determine the next version

3. **Do NOT modify** the existing legacy tags in any repo. Do not modify `~/projects/ship-ui/.planning/` or `~/projects/ship/.planning/`. They're vestigial but harmless.

## Current state at handoff

- Today's UI work (review cards 2x2 grid in ship-ui, commit `fb0b29d`) is committed to ship-ui's `main` but **not pushed**, **not tagged**, and intentionally will not be tagged. User explicitly said "leave it there." It may or may not get folded into the next milestone's submodule pointer bump in `~/projects`.
- v3.8 (Facility Summaries) is shipped and tagged on `~/projects` only.
- `~/projects/.planning/STATE.md` shows `status: milestone_complete`, `milestone: null`. User says they "just started a new milestone in the ~/projects directory" but no `REQUIREMENTS.md` exists yet — they're presumably mid-`/gsd:new-milestone` (questioning phase).
- The next milestone version, when it ships, will be `v3.9` based on the global counter.

## Files to read first

- `~/.claude/get-shit-done/workflows/complete-milestone.md` — the workflow being modified
- `~/.claude/get-shit-done/bin/lib/core.cjs` lines 40–111 — `findProjectRoot()` (don't change, just understand)
- `~/.claude/get-shit-done/bin/gsd-tools.cjs` lines 195–205 — where `findProjectRoot()` is invoked
- `~/projects/.planning/MILESTONES.md` — the global counter; latest entry is `## v3.8 Facility Summaries (Shipped: 2026-04-11)`
- `~/projects/.planning/STATE.md` — current planning state

## Open question for user

Confirm option 1 (tag parent only — recommended) vs option 2 (tag participating sub-repos only) vs option 3 (tag all three). Implementation differs at the `git_tag` step depending on the answer.
