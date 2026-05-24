## Keyword Lists Process Overview

#### Create List

- From `Drake`:

**POST** `http://ose-api/keyword-lists/create:account_id:title,[keyword:engine:lang]`

- We then need to persist this in `Barbosa`. Here is a very rough table sketch:

```
keyword_lists table
  id
  account_id
  keyword_list_state_id
  title
  created_at
  last_update

keyword_list_items table
  id
  keyword_list_id
  engine_id
  keyword
  lang (?)

keyword_list_state table
  id
  descr [active|inactive]

engines table
  id
  descr [google|bing|yahoo|?]
```

#### Keyword Lists Process Outline

- From `Drake`:

**GET** `http://ose-api/keyword-lists:account_id:state?`

with response:

```json
[
  {
    "id": 1,
    "title": "Hipsters R Us",
    "keyword_count": 67,
    "last_update": "2015-06-17T12:10:59.367Z",
  },
  {
    "id": 2,
    "title": "Miniature Horses Incorporated",
    "keyword_count": 83,
    "last_update": "2015-05-28T10:00:37.328Z"
  }  
]
```

**Note**: We could also return the list details if they are cached in barbosa. If not, we could eager load and return back a token for that interaction.

At this point, render out the 'Keyword Lists' view and make `n` number of calls for details on each list:

**GET** `http://ose-api/keyword-list-details:list_id`

In `Barbosa`, we either have the details in cache or we need to retrieve it from KEAPI:

**GET** `http://kwd-explorer-api/keyword-details:[keyword:engine:lang]`

With response:

```json
[
  {
    "keyword": "flannel",
    "engine": {
      "name": "google",
      "lang": "en"
    },
    "volume": 10000,
    "difficulty": 56,
    "opportunity": 60,
    "last_update": "2015-06-17T12:10:59.367Z"
  }
]
```

**Note**: Or, since most of the keywords will be for a given `engine:lang`, do something like `engine:lang=>[keywords]` with the query params.

In Barbosa, we now would need to iterate over the response calculating:
- buckets for: (list page)
  - volume
  - difficulty
  - opportunity

- the total number of:
  - keywords
  - expired serps
  - location biased keywords
  - different search `engine:lang` pairs

- averages for
  - difficulty
  - opportunity

Now store list summary metrics in redis. The metrics would need to be recalculated when:
  - a serp is refreshed or
  - a keyword is added/removed from list

Response to Drake's request should look something like:

```json
{
  "expired_serps": 3,
  "keyword_count": 67,
  "loc_biased": 30,
  "volume": [10,12,14,15,34,23,36,23,35,12,13,1,41,12,15,16,13,6,2,1],
  "difficulty": [4,8,12,8,12,34,2,4,2,1],
  "opportunity": [12,13,45,13,76,34,12,3,87,34],
  "engine_count": 2
}
```

- `volume`: 20 elements (aka buckets), each reflecting volume range of 1k
- `difficulty`: 0-100 with 10 elements (increments of 10)
- `opportunity`: same as difficulty

**Note**: See `20150624-keyword-list-options.md` for ideas on alternative response structures.

## Related

- [[Moz MOC]]
