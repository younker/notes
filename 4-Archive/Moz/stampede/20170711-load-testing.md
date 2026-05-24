## Takeaway

For this round of testing I pulled ~600k unique urls from the Barbosa db. Each request was made through Barbosa and had the following characteristics:
  - 1 primary, 2 secondary subjects
  - result range was the first 100 results
  - sort by primary rank / reverse false
  - timeout: 60s

Stampede showed little to no signs of stress.

Barbosa connections were quickly soaked up and resulted in 503s. Increasing the number of api instances solved this issue.

Feedstore timeouts persisted across medium to high levels of concurrency. These failures would come in bursts, usually lasting only a few seconds.

Availability was mostly pretty good (high 90s) until we went beyond 85 concurrent users. However, failures existed even at lower concurrency rates (ie 98% at 50 concurrent users).

Running persisted tests over long periods of time did not result in increased failures. This is important as it demonstrated the stampede's resilience once memory was exhausted.

## Details


Initially Barbosa was responsible for about 1/3 of the failures, surfaced as 503s. I doubled the api instances (from 6 to 12) and those went away. The failures were simply a result of connections being soaked up with requests. As feedstore slowed down, connections stayed open longer which exacerbated the problem.

Feedstore timeouts seem to be the largest point of failure, surfacing as 500 responses. Our initial timeout was 5s; we have since bumped that to 10.


## Additional Info
- Bubble graph showing results: https://jsfiddle.net/younker/uxbgvn8o/2/

- Barbosa (grafana)
  - api: http://grafana.roger.dal.moz.com:3000/dashboard/db/rogeros-container-metrics?var-task=moz-explorer_barbosa_2.0.1_api&var-env=prod&from=1499741867178&to=1499758635239

- Feedstore (grafana)
  - activity: http://grafana.roger.dal.moz.com:3000/dashboard/db/moz-explorer-feedstore-production?from=1499741723633&to=1499757960771&var-env=prod&var-task=moz-explorer_feedstore
  - api: http://grafana.roger.dal.moz.com:3000/dashboard/db/rogeros-container-metrics?var-task=moz-kwe_feedstore_feedstore-api&var-env=prod&from=1499741843709&to=1499757973170
  - redis: http://grafana.roger.dal.moz.com:3000/dashboard/db/rogeros-container-metrics?var-task=redis_moz-explorer_feedstore&var-env=prod&from=1499741867178&to=1499758635239

- Siege
  - POST file snippet
  ```
  URL=https://moz.com/explorer/api/2.0.1/site/rankings POST
  ${URL} {"result_range":[0,99],"sort":{"by":"primary_rank","reverse":false},"subjects":{"primary":{"scope":"domain","target":"www.inc.com"},"secondaries":[{"scope":"domain","target":"www.cleverism.com"},{"scope":"domain","target":"edwardlowe.org"}]},"timeout_in_ms":60000}
  ${URL} {"result_range":[0,99],"sort":{"by":"primary_rank","reverse":false},"subjects":{"primary":{"scope":"domain","target":"www.entrepreneur.com"},"secondaries":[{"scope":"domain","target":"en.wikipedia.org"},{"scope":"domain","target":"www.mckinsey.com"}]},"timeout_in_ms":60000}
  ```
  - Command:
  ```
  siege --internet --log=barbosa.log --time=600S --concurrent=150 -f rankings-for-3subjects -H 'stampede-max-keywords:100000' -H 'Content-Type: application/json'  
  ```
  - Log file
  ```
  Date & Time,  Trans,  Elap Time,  Data Trans,  Resp Time,  Trans Rate,  Throughput,  Concurrent,    OKAY,   Failed
  2017-07-11 02:57:41,    198,       9.32,           0,       0.22,       21.24,        0.00,        4.59,       0,       0
  2017-07-11 02:58:25,     48,       9.45,           1,       1.64,        5.08,        0.11,        8.35,      48,       0
  2017-07-11 03:02:37,   1697,     179.82,          39,       9.84,        9.44,        0.22,       92.82,    1697,     391
  2017-07-11 03:39:36,   1642,     179.54,          39,      10.32,        9.15,        0.22,       94.34,    1642,     106
  2017-07-11 04:31:56,   1662,     179.15,          40,       7.55,        9.28,        0.22,       70.05,    1662,      25
  2017-07-11 05:30:40,   4914,     539.14,         119,       7.92,        9.11,        0.22,       72.19,    4914,      18
  2017-07-11 05:59:21,  13020,    1496.89,         320,      11.16,        8.70,        0.21,       97.10,   13020,     798
  2017-07-11 06:04:39,    498,      51.79,          11,      10.89,        9.62,        0.21,      104.69,     498,    1051
  2017-07-11 06:13:38,   3072,     333.15,          74,       8.30,        9.22,        0.22,       76.56,    3072,      19
  2017-07-11 06:22:56,    276,      31.42,           6,       7.56,        8.78,        0.19,       66.38,     276,     228
  ```

## Related

- [[Moz MOC]]
- [[stampede-data-structures]]
