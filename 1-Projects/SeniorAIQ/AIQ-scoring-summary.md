SeniorAIQ -- Platform Overview
===============================


Who We Are
----------

SeniorAIQ (senioraiq.com) is a senior housing intelligence platform
focused on Washington State. We aggregate publicly available data about
senior living facilities, score them on a transparent 0-100 scale, and
make the results freely accessible so families can compare facilities
side by side.

Every number on the site traces back to a specific public data source,
and the full breakdown is available for any facility.


The Problem We're Solving
-------------------------

Choosing a senior living facility is one of the most important decisions
a family will make, and the information available to them is fragmented,
incomplete, and often misleading.

Here's what typically happens: a family Googles "assisted living near
me," gets a list of places with star ratings, reads some reviews, and
schedules tours at the ones that look nice. That's usually the extent of
the research.

What they're missing:

- State inspection reports exist for every licensed facility in
  Washington, published as PDFs on the DSHS website. These contain
  detailed findings from trained inspectors -- specific violations,
  severity levels, and whether the facility corrected the issues. Almost
  nobody reads them.

- The same facility can have a 4.5 on one review platform and a 3.0 on
  another. Each site attracts different people with different
  motivations for writing reviews. If you only check one, you're seeing
  one self-selected perspective.

- A 5-star rating from 3 reviews looks identical to a 5-star rating
  from 200 reviews in search results, but one is statistically
  meaningless.

- Secretary of State filings show who actually owns each facility, when
  the entity was formed, and where it's headquartered. Some facilities
  are run by local nonprofits that have been operating since the 1940s.
  Others are owned by investment vehicles incorporated six months ago in
  another state. Most families never learn which one they're looking at.

- County property records, business entity filings, and proximity to
  critical services like hospitals are all publicly available but
  scattered across different government websites.

Nobody has time to piece all of this together, especially not someone
who just found out their parent needs care in the next few weeks.

SeniorAIQ exists to do that work. We collect every piece of publicly
available data, combine it into a single comparable score, and make the
full breakdown available for free.


What SeniorAIQ.com Does
-----------------------

The website provides several things to families and researchers:

FACILITY SEARCH -- The homepage lets you search for senior housing
facilities by county. Results are sortable and show each facility's
composite score, star ratings, and basic details. You can filter by
facility type and other criteria.

FACILITY DETAIL PAGES -- Every facility has its own page showing:

  - A composite quality score (0-100) with a color-coded badge
  - An AI-generated plain-language summary highlighting strengths and
    weaknesses (up to three pros and three cons)
  - Star ratings aggregated across multiple review platforms
  - Individual reviews from Google, Caring.com, A Place for Mom, and
    SeniorAdvisor
  - Inspection history with severity and response scores for each report,
    AI-generated concern summaries, and links to the original PDF
  - Contact information, address, and an embedded Google Map
  - Owner and operator details including entity type, headquarters
    location, and how long they've been in business

BLOG -- We publish data-driven articles analyzing senior housing trends.
Examples include scoring every inspection report in King County, showing
how the same facility gets different ratings across review platforms,
investigating who actually owns facilities, and explaining how the
composite score is calculated. The blog is meant to educate families on
what data exists and what it means.

SEO AND STRUCTURED DATA -- Facility pages include structured data so
search engines can surface facility information directly. The site
generates an RSS feed and sitemap automatically.


Where Our Data Comes From
-------------------------

Everything we use is publicly available. We pull from five categories
of data sources:

1. REGULATORY INSPECTIONS -- Washington's Department of Social and
   Health Services (DSHS) inspects every licensed assisted living
   facility and publishes the results as PDFs. We download and analyze
   every inspection report. For skilled nursing facilities (SNFs), we
   pull from the federal Centers for Medicare & Medicaid Services (CMS)
   provider dataset since SNFs in Washington are regulated by the
   Department of Health rather than DSHS.

2. CUSTOMER REVIEWS -- We collect reviews from four platforms: Google,
   Caring.com, A Place for Mom (APFM), and SeniorAdvisor. Each platform
   attracts different reviewers, so aggregating across all of them
   produces a more complete picture than any single source.

3. OPERATOR AND BUSINESS ENTITY DATA -- We identify who actually runs
   each facility (the licensed operator) and cross-reference it against
   Washington Secretary of State business filings to determine entity
   type, incorporation date, and headquarters location.

4. PROPERTY DATA -- County assessor records provide assessed property
   values, which serve as a proxy for building quality and investment
   level.

5. LOCATION PROXIMITY -- We measure the distance from each facility to
   the nearest hospital, pharmacy, grocery store, and park.


How We Score Facilities
-----------------------

Every facility receives a composite score from 0 to 100. A score of 50
means the facility meets the standard for that category. Scores are on
an absolute scale -- a 50 means it cleared the bar, not that it's
average relative to its neighbors.

The composite is built from six weighted categories:

  Regulatory compliance     30%
  Customer reviews          25%
  Operator quality          15%
  Location                  15%
  Property                  10%
  Ownership                  5%

Here's what each one measures:

REGULATORY (30%) -- The heaviest factor. Each inspection report is
scored on two dimensions: how serious were the findings, and how well
did the facility respond? A facility with minor findings that it fixes
quickly scores much higher than one with serious findings and poor
follow-through. Enforcement actions and investigations carry more weight
than routine fire inspections.

REVIEWS (25%) -- Ratings from Google and three other review platforms
are combined. The score accounts for the actual star rating, the number
of reviews (more reviews means a more reliable signal, with diminishing
returns), and how recent the reviews are.

OPERATOR (15%) -- This evaluates the entity running the facility across
five signals: how their other facilities score across their portfolio,
whether they're local or headquartered far away, their enforcement
history per facility, how long they've been operating, and their size.
Mid-size operators (2-15 facilities) tend to perform best -- single-
facility operators lack cross-portfolio learning, while very large
chains can have management distance issues.

LOCATION (15%) -- Proximity to four types of services that matter to
senior residents: hospitals (weighted heaviest since access to acute
care is critical), pharmacies, grocery stores, and parks. Each service
has an ideal and maximum useful distance.

PROPERTY (10%) -- Assessed property value compared to the county median.
A higher assessed value suggests a newer, better-maintained, or larger
building.

OWNERSHIP (5%) -- The type of entity that owns the property (nonprofit,
individual, LLC, corporation, REIT, etc.) and whether it's based in the
US. Nonprofits score highest because their mission tends to prioritize
care. REITs score lowest because the investment structure distances
ownership from care delivery.

MISSING DATA -- When data isn't available for a facility in a given
category, that category's weight redistributes proportionally across the
categories that do have data. A facility is never penalized for a data
gap. It is scored on whatever information exists.


How We Process the Data
-----------------------

Data collection runs through automated pipelines. At a high level:

- Inspection reports are collected from the DSHS website, downloaded as
  PDFs, and stored. AI reads each report and assigns two scores
  following a detailed rubric: event severity (how serious was the
  finding) and response quality (how well did the facility address it).
  The AI interprets the source document but never determines the final
  facility score -- the scoring math is entirely rule-based.

- Reviews are collected from each platform and stored with their
  original ratings, review text, dates, and author names.

- Operator data comes from two sources: DSHS inspection report cover
  pages (for assisted living facilities) and the CMS provider dataset
  (for skilled nursing facilities). Operators are matched against
  Secretary of State business records.

- Property data is pulled from county assessor records.

- Location distances are calculated using Google Places data.

After collection, the scoring engine runs each category calculator
independently, then combines them into the composite. Every score
includes a full audit trail that records exactly which inputs produced
which numbers.

Each facility also gets an AI-generated plain-language summary. The AI
never sees the raw composite number -- it receives qualitative labels
like "top 10%" or "below average" instead, to keep the summaries
grounded in description rather than fixated on specific scores. These
summaries automatically regenerate when the underlying data changes.


A Key Principle: Transparency
-----------------------------

All scoring is deterministic and auditable. The scoring rules are fixed
and explainable -- there is no black box. AI assists with reading and
interpreting documents (like inspection report PDFs) and generating
plain-language summaries, but it never makes scoring decisions. The math
is rule-based, the weights are published, and the audit trail for every
facility shows exactly how its score was calculated.

The score reflects what the public data says.


Current Coverage
----------------

The platform covers Washington State, with the deepest data in King
County and Yakima County. Regulatory data and reviews have the broadest
coverage statewide. Operator data is collected from both DSHS (assisted
living) and CMS (skilled nursing). Property and location data are still
being expanded to additional counties.

Facility types covered include assisted living facilities (ALFs), adult
family homes (AFHs), and skilled nursing facilities (SNFs).

Across King County's scored assisted living facilities, the median
composite score is 76, with scores ranging from 56 to 89. Most
facilities cluster in the 75-84 range.


What the Score Doesn't Measure
------------------------------

The composite score is a starting point, not a final answer. It can't
capture staff warmth, food quality, the feel of a community, or whether
a specific resident will thrive there. A facility scoring 70 might be
the right choice for a particular memory care situation.

What it does is surface patterns that are invisible during a facility
tour. A facility with enforcement actions, low reviews across platforms,
and an owner incorporated six months ago in another state tells a
different story from one with clean inspections, consistent reviews, and
a local nonprofit that has been operating for decades. The score
reflects those differences, and the breakdown shows exactly why.
