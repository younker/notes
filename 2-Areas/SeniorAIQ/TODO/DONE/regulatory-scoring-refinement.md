# Regulatory Scoring Refinement

## Problem

Two issues with how regulatory data affects facility scores:

### 1. Fire inspections are overweighted

Fire inspections are an annual requirement and relatively low-severity. They currently affect the regulatory score at the same level as more serious operational issues (medication errors, resident safety, bedding, etc.). Annual routine inspections should carry less weight than operational findings.

### 2. Informal dispute resolution letters double-counted

`informal_dispute_resolution_letters` are being scored as standalone issues, but they are actually responses to issues already captured in `investigations` reports. The issue is counted twice: once in the investigation and once in the dispute resolution letter. These letters should only factor into a "response" score, not be treated as separate negative findings.

## Investigation

- How are fire inspection findings currently weighted in the regulatory score?
- What severity levels exist and how are they assigned?
- How do we distinguish routine annual inspections from substantive operational findings?
- How are `informal_dispute_resolution_letters` currently scored?
- What is the relationship between investigations and dispute resolution letters in the data?
- What operational categories (meds, bedding, resident safety) should be prioritized?

## Goal

- Lower the scoring weight for routine fire inspection findings
- Reclassify `informal_dispute_resolution_letters` so they only contribute to a response/remediation score, not as independent negative findings
- Prioritize operational issues (medication, resident safety, etc.) over routine compliance checks
