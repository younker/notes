# Add Deduplication to Inspection Scorer

**Status:** Backlog
**Date:** 2026-05-12
**Context:** AWS cost analysis -- inspection scorer has no dedup, can re-score identical reports

## Problem

The inspection scorer (`agents/pkg/inspections/`) calls Bedrock for every report during
collection runs with no check for whether that report was already scored. These are the
most expensive Bedrock calls (up to 150K chars of OCR text per report).

The facility summarizer already solves this with SHA256 input hashing in
`agents/pkg/facilitysummarizer/inputs.go` -- the same pattern should apply here.

## Proposed Change

1. Add an `input_hash` column to the inspection scores table
2. Before calling Bedrock, hash the OCR text and compare against stored hash
3. Skip Bedrock call if hash matches (report content unchanged)

## Files

- `agents/pkg/inspections/scorer.go` -- add hash check before Bedrock call
- `db/migrations/` -- add input_hash column
- `db/queries/` -- update queries for hash lookup/storage
