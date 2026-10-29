# Switch Extraction Tasks to Haiku Model

**Status:** Backlog
**Date:** 2026-05-12
**Context:** AWS cost analysis -- Bedrock costs growing fastest ($65 in first 12 days of May)

## Problem

All 4 Bedrock callsites use Claude Sonnet 4.5, but two are structured extraction tasks
with clear rubrics that don't need Sonnet's writing quality:

- **Inspection Scorer** (`agents/pkg/inspections/`) -- extracts severity scores from OCR text.
  Largest per-call cost due to 150K char input limit.
- **Operator Research** (`agents/pkg/opersearch/`) -- identifies operator name and facility
  sub-types from web search results.

## Proposed Change

Switch model ID from `us.anthropic.claude-sonnet-4-5-20250929-v1:0` to Haiku for these
two packages. Keep Sonnet for facility summarizer and review summarizer where writing
quality matters.

## Expected Savings

Haiku is 4-20x cheaper depending on input/output ratio:
- Input: $0.80/M tokens (Haiku) vs $3/M (Sonnet)
- Output: $4/M tokens (Haiku) vs $15/M (Sonnet)

Inspection scorer is the biggest win -- largest payloads, pure extraction task.

## Validation

Run both models on a sample of 20 inspection reports and 20 operator lookups. Compare
structured output quality. If Haiku scores match Sonnet within acceptable tolerance,
ship the change.
