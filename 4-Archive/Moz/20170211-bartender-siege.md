3 minutes at 100 req/sec we averaged 5.15 seconds per analysis (min: 0.02, max: 16.67) which is on par with current analysis resp times. We will want to go with 9-12x more workers and api instances and more if we start seeing more than 100 req/sec. However, at that rate, redis cpu peaked around 120% so we might need another cpu or two.


        Date & Time,  Trans,  Elap Time,  Data Trans,  Resp Time,  Trans Rate,  Throughput,  Concurrent,    OKAY,   Failed, Speke API, Speke Mem/CPU, Speke Workers, Worker Mem/CPU, notes
2017-02-11 22:36:37,     44,      59.31,           0,      11.59,        0.74,        0.00,        8.60,      44,        0,         1,       512/0.2,             4,        256/0.1,
2017-02-11 22:39:27,     71,      59.48,           0,       7.37,        1.19,        0.00,        8.79,      70,        1,         2,       512/0.2,             8,        256/0.1,
2017-02-11 23:00:07,     71,      59.12,           0,       7.44,        1.20,        0.00,        8.93,      71,        0,         2,       512/0.2,            16,        128/0.1,
2017-02-11 23:09:09,     50,      59.98,           0,       8.81,        0.83,        0.00,        7.34,      50,        0,         2,       256/0.1,             8,        128/0.1,
2017-02-11 23:13:22,     73,      59.66,           0,       7.00,        1.22,        0.00,        8.57,      73,        0,         2,       256/0.1,            16,        128/0.1,
2017-02-11 23:30:05,    157,      59.33,           0,       6.79,        2.65,        0.00,       17.96,     156,        1,         4,       256/0.1,            32,        128/0.1,
2017-02-11 23:35:09,    162,      59.74,           1,       6.59,        2.71,        0.02,       17.87,     162,        0,         6,       256/0.2,            32,        128/0.1,
2017-02-11 23:37:39,    174,      59.47,           1,       6.21,        2.93,        0.02,       18.16,     174,        0,         8,       256/0.2,            32,        128/0.1,
2017-02-11 23:43:41,    139,      59.07,           0,       7.71,        2.35,        0.00,       18.15,     139,        0,         8,       256/0.2,            32,        128/0.1, fresh urls file -> +1 second to resp time
2017-02-11 23:51:52,    375,      59.88,           2,       7.31,        6.26,        0.03,       45.76,     375,        0,         8,       256/0.2,            32,        128/0.1, concurrency 20 -> 50
2017-02-12 08:14:36,    462,      59.74,           3,      11.04,        7.73,        0.05,       85.35,     461,        1,         8,       256/0.2,            32,        128/0.1, 100 concurrent, moved to rogeros instance. the real issue was bartender refusing connections
2017-02-12 08:19:52,    399,      59.61,           2,      12.42,        6.69,        0.03,       83.14,     399,        0,         8,       256/0.2,            32,        128/0.1, bartender instances 1 -> 10
2017-02-12 08:23:36,    746,      59.53,           4,       6.91,       12.53,        0.07,       86.62,     746,        0,         8,       256/0.2,            64,        128/0.1,
2017-02-12 08:30:49,   3129,     179.80,          20,       5.15,       17.40,        0.11,       89.69,    3128,        0,         8,       256/0.2,            96,        128/0.1, redis cpu was up around 120%, min: 0.02, max: 16.76

#### Grafana
- [redis instance](http://grafana.roger.dal.moz.com:3000/dashboard/db/rogeros-container-metrics?var-task=redis_moz-kwe_speke&var-env=stage&from=1486878428936&to=1486889228936)
- [workers](http://grafana.roger.dal.moz.com:3000/dashboard/db/rogeros-container-metrics?var-task=moz-kwe_speke_0.0.1_worker&var-env=stage&from=1486878511007&to=1486889311007)
- [api](http://grafana.roger.dal.moz.com:3000/dashboard/db/rogeros-container-metrics?var-task=moz-kwe_speke_0.0.1_api&var-env=stage&from=1486878565998&to=1486889365998)

#### Mozstash
- [bartender](http://mozstash.dal.moz.com/#dashboard/temp/8SuYt3r_TtqMXgIi3Olnww)
- [speke](http://mozstash.dal.moz.com/#dashboard/temp/Vtxy-WWjRqCposla-aLX-w)

#### Pull Requests
- https://github.com/seomoz/roger-cli/pull/405
- https://github.com/seomoz/roger-cli/pull/404
- https://github.com/seomoz/bartender/pull/62

## Related

- [[Moz MOC]]
