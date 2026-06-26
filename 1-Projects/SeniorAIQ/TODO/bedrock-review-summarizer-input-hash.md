# Add Input Hashing to Review Summarizer

**Status:** Backlog
**Date:** 2026-05-12
**Context:** AWS cost analysis -- review summarizer has no way to detect data changes

## Problem

The review summarizer (`agents/pkg/summarizer/`) only checks "does a summary row exist?"
before deciding whether to call Bedrock. It has no input hashing, so:

- If reviews change but a summary row exists, the old summary is never regenerated
- If regenerated with `--force`, it re-summarizes identical reviews unnecessarily
- No invalidation mechanism like facility_summaries.is_stale

The facility summarizer already solves this with SHA256 input hashing and an `is_stale`
flag -- the same pattern should apply here.

## Proposed Change

1. Add `input_hash` and `is_stale` columns to `wa.review_summaries`
2. Hash review texts before calling Bedrock, compare against stored hash
3. Add database trigger to set `is_stale = TRUE` when reviews change
4. Skip Bedrock call if hash matches

## Files

- `agents/pkg/summarizer/summarizer.go` -- add hash check
- `db/migrations/` -- add columns + trigger
- `db/queries/` -- update queries
