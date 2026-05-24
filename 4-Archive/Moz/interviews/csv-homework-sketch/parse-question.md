Write a parser that returns the total number of data rows in a given CSV.

Assumptions: Each CSV you parse will have
- an optional meta section containing random data about the CSV which:
  - will be the first section in a file
  - will start and end with a delimiter row
  - each delimiter row will start with a hash, whitespace and then at least 50 dashes
- required header row which represents the data below it
  - the header is the first row in the file or the first row after the meta section
- optional (0 or more) data rows


CSV Example #1

```
# --------------------------------------------------        
Keyword ynkr.org      
Suggestion Type Mix of sources (default)      
Filters None
Volume Minimum  n/a     
Volume Maximum  n/a     
Export Date 2018-05-01      
# --------------------------------------------------        
        
        
Keyword,Relevancy,Min,Volume,Max Volume  
ynkr.org,5,n/a,n/a 
ynkr,2,n/a,n/a 

```

CSV Example #2

```
Keyword, Min Volume, Max Volume, Difficulty, Rank, Top Ranking URL
moz, 11501, 30300, 73, 1, https://moz.com/
moz local, 4301, 6500, 66, 1, https://moz.com/products/local
```

## Related

- [[Interviews MOC]]
