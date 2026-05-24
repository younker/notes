## Sprint Tasks
- Overview Endpoints: 2 Options each
  1. No Sockets: simple request/response
    - GET api/v2/keyword/analysis;keyword;fields=pd da title url rank;count=3
    - GET api/v2/keyword/volume;keyword
    - GET api/v2/keyword/suggestions;keyword;n=5
    - GET api/v2/keyword/mentions/frequency;keyword
    - GET api/v2/keyword/mentions/posts;keyword
  2. Sockets: open connection and feed data as we get it
    - GET api/v2/keyword/overview:keyword
- Analysis
  1. No Sockets
    - GET api/v2/keyword/volume;keyword
    - GET api/v2/keyword/analysis;keyword (difficulty, opportunity, serp analysis)
    - GET api/v1/socials
  2. Sockets
    - GET api/v2/keyword/analysis;keyword
- Refresh Analysis
  - PUT api/v2/keyword/analysis;keyword
- Suggestions
  1. No Sockets
    - GET api/v2/keyword/suggestions;keyword
    - GET api/v2/keyword/volume;keyword
  2. Sockets
    - GET api/v2/keyword/suggestions
- Lists
  - GET api/v2/keyword/lists;account_id
- Create List
  - POST api/v2/keyword/list;account_id;keyword
- Update List
  - PUT api/v2/keyword/list;list_id;setting=value
    - add keyword
    - alter state (active|inactive)
- List
  - GET api/v2/keyword/list;list_id

* Does not include Exports

## Related

- [[Moz MOC]]
