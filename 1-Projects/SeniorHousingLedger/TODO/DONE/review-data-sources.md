# Expand Review Data Sources

## Problem

We currently only collect 5 Google reviews per facility. This is too small a sample to produce meaningful review scores. The limited data set skews scoring and doesn't reflect the actual sentiment around a facility.

## Investigation

- What other review sources exist for senior housing facilities? (Yelp, Caring.com, A Place for Mom, SeniorAdvisor.com, Medicare.gov, etc.)
- Which sources have APIs or scrapable data?
- How many reviews do these sources typically have per facility?
- How would additional sources integrate with the existing review scoring model?
- Which are free and which are pay?
- How do we normalize scores across various sites? For example, google ratings are out of 5 stars. What about a site that is 10 stars? 

## Priority

Prioritize data sources which:
1. Have an API to retrieve the data
2. Are free
3. Have data similar to what we currently pull

## Goal

Identify and prioritize additional review data sources to supplement Google reviews, giving a more representative picture of each facility.
