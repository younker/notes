# Enable Bedrock Prompt Caching

**Status:** Backlog
**Date:** 2026-05-12
**Context:** AWS cost analysis -- system prompts repeated identically on every call in batch runs

## Problem

All 4 Bedrock callsites send large system prompts on every invocation:

- Facility summarizer: ~1200 words system prompt, repeated per facility in batch
- Review summarizer: ~300 words
- Inspection scorer: ~400 words
- Operator research: ~200 words + hardcoded operator reference list

During batch runs (e.g., `ship facility summarize` processing 100+ facilities), the
identical system prompt is sent and billed at full input token price every time.

## Proposed Change

Enable Bedrock prompt caching for Claude models. Cached prompt prefixes cost 90% less
after the first call. The system prompt is the ideal cache target -- identical across
all calls within a batch.

Facility summarizer benefits most: largest system prompt, highest batch volume.

## Bedrock Prompt Caching

- Supported for Anthropic models on Bedrock
- Cache persists for 5 minutes of inactivity
- Cached tokens billed at 10% of input rate
- Requires adding cache_control breakpoint to message structure

## Files

- `agents/pkg/facilitysummarizer/facilitysummarizer.go` -- add cache_control to system message
- `agents/pkg/summarizer/summarizer.go` -- same
- `agents/pkg/inspections/scorer.go` -- same
- `agents/pkg/opersearch/researcher.go` -- same
- Shared Bedrock client code if it exists
