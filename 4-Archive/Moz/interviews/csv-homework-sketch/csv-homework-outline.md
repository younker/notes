## Summary

Develop a proof-of-concept demonstrating the ability to download and parse the
provided CSVs storing the following data:
  - `keyword`: the term
  - `locale`: the language-COUNTRY tuple respresenting the keyword's location
  - `difficulty`: a calculated metric representing how difficult it is to rank
    for this term
  - `minimum volume`: volume is calculated in ranges. this value represents the
    lower boundary of that range for the month identified by the `date analyzed`
  - `maximum volume`: see min volume above
  - `date analyzed`: the iso-8601 date which the metrics and other information
    was calculated

How you store this data is up to you and the only current requirement is that
our customers can generate a report of all keywords seen by a given date (or
range if possible).

### About the CSVs

Each CSV is generated from different applications or even external tools. As
such, the format of the CSVs are as follows:

- `meta section` (optional): The meta section is a non-standard CSV addition
  used by many of Moz's tools to communicate additional information about the
  dataset. For example, one of the CSVs uses the meta section to communicate the
  total number of items in the CSV along with the average keyword difficulty.
  For our purposes, this section should be ignored.
- `header` (required): The header describes the data in the body
- `body` (optional): The comma-delimited values described by the `header`. This
  section is optional as some CSV requests will have no data.

### Data Assumptions

The CSVs involved in this exercise are small. However, you should build it
keeping the following estimates for the final product in mind.

  - ~50 CSVs parsed every minute
  - CSV body size will range from 0 to 100,000 and average in size around 3,000

### Suggestions

To the extent it is possible, please employ your normal workflow as you move
through this exercise. For example, if you use git/github, use it as you would
for a new repo making the commits you normally would as you prepare to either
merge, submit a pull request, tag, etc. Another example would be how your
development process.

#### CSV #1

The focus here is on the basics; can they parse a well-formed CSV. There are no
extra spaces or newlines and all data is present and valid. This should be a
simple parse.

#### CSV #1

```
Keyword,Locale,Difficulty,Date Analyzed
hipster,en-US,62,2016-02-11T12:18:06+00:00
beard,en-US,51,2016-02-05T01:00:45+00:00
```

#### CSV #2

For this CSV we introduce a moz-specific, non-standard meta section and a
trailing newline. This section is to be ignored and the interesting part is how
they go about ignoring it. All values from CSV #1 are here with some additional
ones and the CSV is well-formed with all data is present and valid.

```
# -------------------------------------
List Name,Hip Seattle
Total Keywords,4
Total Volume Range,30301 - 300000
Average Volume Range,33100 - 165000
Average Keyword Difficulty,50
Average Organic CTR,73
Average Priority,83
Last Updated,2016-03-17T18:28:18+00:00
Export Date,2016-03-17T19:20:59+00:00
# -------------------------------------
Keyword,Locale,Min Volume,Max Volume,Difficulty,Organic CTR,Importance,Priority,Date Analyzed
hipster,en-US,118001,300000,66,64,3,84,2016-03-17T18:28:06+00:00
beard,en-US,30301,70800,51,94,3,86,2016-03-17T18:28:08+00:00
plaid,en-US,30301,70800,42,100,3,86,2016-03-17T18:28:14+00:00
whiskey,es-ES,30301,70800,41,33,3,78,2016-03-17T18:28:18+00:00

```

#### CSV #3

This CSV introduces some problems including:
  - the meta section delimeters are longer
  - we renamed `Locale` to `Country`
  - a newline between the meta section and the header
  - altered column order (eg `Date Analyzed` is now the first col)
  - `Volume` is now a double dot delimited "range" which they will need to parse
  - one of the dates is malformed, the other has an offset

```
# --------------------------------------------------        
Keyword Hip Seattle
Suggestion Type Mix of sources (default)      
Filters None
Volume Minimum  33100
Volume Maximum  165000
Export Date 2018-05-01      
# --------------------------------------------------        
        
Date Analyzed, Keyword,Locale,Relevance,Volume Range,Difficulty
2016-03-15T11:28:06+07:00,hipster,en-US,7,118001..300000,66
2016-13-17T18:18:08+00:00,craft beer,en-US,8,30301..70800,51

```

## Related

- [[Interviews MOC]]
