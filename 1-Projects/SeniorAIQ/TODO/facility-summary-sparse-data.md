# Facility Summary: Handle Sparse Data Honestly

Facility cab748bc (Heartlinks Adult Family Home, 6 beds) got this summary:

> "top-performing facility distinguished by its quality ratings in the top 10%
> and particularly strong location advantages... above-average brand reputation"

Reality: only location_score=95 exists. No regulatory, no reviews, no property, no
operator. The composite was 95 due to the zero-weight category bug (now fixed), but
even after that fix the summarizer needs to handle sparse data better.

## Root cause

The prompt (prompts.go) sends the model a composite band ("top 10%") and category
highlights. When most categories are NULL, the model only sees one highlight but still
gets a high composite band and fabricates positive claims about missing dimensions.

The system prompt says "handle missing sections honestly" but doesn't instruct the
model to explicitly flag data sparsity or adjust its framing when coverage is low.

## What to change

### 1. Add data coverage signal to the prompt (prompts.go buildPrompt)

Count how many of the 5 weighted categories have scores. If fewer than 3, prepend a
DATA COVERAGE line to the prompt:

    DATA COVERAGE: limited -- only 1 of 5 scoring categories have data (location).
    The composite score reflects only the available data and should be interpreted
    with caution. State this limitation clearly in the summary.

This gives the model an explicit instruction rather than hoping it infers sparsity
from missing sections.

### 2. Update system prompt to handle low-coverage facilities

Add a paragraph to systemPrompt:

    When DATA COVERAGE is flagged as limited, the summary MUST open by stating that
    data for this facility is limited. Do not describe the facility as "top-performing"
    or use superlatives when most scoring categories lack data. Instead, describe what
    data IS available and note what is missing. Frame the composite score as preliminary
    or based on limited information.

### 3. Add facility metadata to the prompt

The prompt currently doesn't include basic facility facts. Add:

    FACILITY TYPE: Adult Family Home
    LICENSED BEDS: 6

This lets the model write useful context even when scoring data is sparse ("This is a
6-bed adult family home...").

### 4. Consider the bed count for review context

Now that the reviews calculator scores all facilities regardless of bed count, small
facilities with very few reviews will get a reviews score. The prompt should include
the review count and average rating so the model can frame them appropriately
("Based on 3 available reviews..." rather than "consistently highlight...").

## Files to change

- agents/pkg/facilitysummarizer/prompts.go -- buildPrompt, systemPrompt, categoryHighlights
- agents/pkg/facilitysummarizer/inputs.go -- add FacilityType and BedCount to SummaryInputs
- agents/pkg/facilitysummarizer/loader.go -- populate FacilityType and BedCount from query
- db/queries/scores.sql -- add facility_type and licensed_bed_count to GetFacilityScoreWithOwner
- Regenerate sqlc after query change

## Verify

After changes, re-summarize Heartlinks and other sparse-data facilities. The summary
should:
- State that data is limited
- Not use superlatives or "top 10%" framing
- Mention what data IS available (e.g. location score, bed count)
- Note what data is missing (no inspections, no reviews, no operator)
