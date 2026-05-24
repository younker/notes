- Overview Endpoints
  - GET api/v2/keyword/analysis;keyword;fields=pd da title url rank;count=3
  - GET api/v2/keyword/volume;keyword
  - GET api/v2/keyword/suggestions;keyword;n=5
  - GET api/v2/keyword/mentions/frequency;keyword
  - GET api/v2/keyword/mentions/posts;keyword

- Analysis
  - GET api/v2/keyword/volume;keyword
  - GET api/v2/keyword/analysis;keyword (difficulty, opportunity, serp analysis)
  - GET api/v1/socials

- Refresh Analysis
  - PUT api/v2/keyword/analysis;keyword

- Suggestions
  - GET api/v2/keyword/suggestions;keyword
  - GET api/v2/keyword/volume;keyword

- Lists
  - GET api/v2/keyword/lists;account_id

- List
  - GET api/v2/keyword/list;list_id

- Create List
  - POST api/v2/keyword/list;account_id;keyword

- Update List
  - PUT api/v2/keyword/list;list_id;setting=value
    - add keyword
    - alter state (active|inactive)

## Related

- [[Moz MOC]]
