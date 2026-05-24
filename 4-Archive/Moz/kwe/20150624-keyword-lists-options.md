## Barbosa Response Options

#### Keyword Lists

**GET** `//ose-api/v2/keyword-lists:account_id`

#### Option A:

```json
{
  "lists": [
    {
      "id": 1,
      "updated_at": "2015-06-17T12:10:59.367Z",
      "title": "Hipsters R Us",
      "engine": {
        "count": 2
      },
      "keyword": {
        "count": 67,
        "loc_biased": 30
      },
      "volume": {
        "min": 100000,
        "max": 200000,
        "ave_min":  5000,
        "ave_max": 10000
      },
      "serps": {
        "expired": 3
      },
      "difficulty": {
        "score": 56
      },
      "opportunity": {
        "score": 60
      }
    }
  ]
}
```

#### Option B:

```json
{
  "lists": [
    {
      "id": 1,
      "updated_at": "2015-06-17T12:10:59.367Z",
      "title": "Hipsters R Us",
      "engine": 2,
      "keywords": 67,
      "biased_keywords": 30,
      "volume": [10000, 20000],
      "volume_ave": [5000, 10000],
      "expired_serps": 3,
      "difficulty": 56,
      "opportunity": 60
    }
  ]
}
```

#### Keyword List

**GET** `http://ose-api/keyword-list:list_id`

#### Option A
```json
{
  "volume": {
    "buckets": [10,12,14,15,34,23,36,23,35,12,13,1,41,12,15,16,13,6,2,1]
  },
  "difficulty": {
    "buckets": [4,8,12,8,12,34,2,4,2,1]
  },
  "opportunity": {
    "buckets": [12,13,45,13,76,34,12,3,87,34]
  },
  "keyword": {
    "count": 67,
    "loc_biased": 30
  },
  "serps": {
    "expired": 3
  },
  "engine": {
    "count": 2
  },
  "keywords": [
    {
      "id": 1,
      "keyword": "flannel",
      "engine": {
        "lang": "en",
        "name": "google"
      },
      "volume": {
        "min": 10000,
        "max": 20000
      },
      "difficulty": {
        "score": 85
      },
      "opportunity": {
        "score": 8
      },
      "serp": {
        "updated_at": "2015-06-17T12:10:59.367Z"
      }
    }
  ]
}
```

#### Option B
```json
{
  "expired_serps": 3,
  "keyword_count": 67,
  "loc_biased": 30,
  "volume": [10,12,14,15,34,23,36,23,35,12,13,1,41,12,15,16,13,6,2,1],
  "difficulty": [4,8,12,8,12,34,2,4,2,1],
  "opportunity": [12,13,45,13,76,34,12,3,87,34],
  "engine_count": 2,
  "keywords": [
    {
      "id": 1,
      "keyword": "flannel",
      "engine": "google",
      "lang": "en",
      "volume": [10000,20000],
      "difficulty": 85,
      "opportunity": 8,
      "updated_at": "2015-06-17T12:10:59.367Z"
    }
  ]
}
```

## Related

- [[Moz MOC]]
