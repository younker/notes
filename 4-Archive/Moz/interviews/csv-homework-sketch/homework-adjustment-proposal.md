@here tl;dr Given the recent adjustment to the position in addition to feedback
and outcome around the homework, I would like to propose we adjust it.

Long version: The homework, as it stands now, asks for alot of the candidate's
time and is prone to noisy boilerplate and/or generated code that tells us
little about our candidate. Over the last few candidates, we have ignored almost
all of the homework except for 2 major pieces:
- data storage/modeling and
- metric aggregations/rollup

Right now I am questioning how accurately it identifies the type of candidates
we want. I just had a follow-up phone screen with a candidate which I believe
addressed most aspects of the homework in an predictable/acceptable fashion.
That is to say they did not supply the most sexy, totally polished solutions but
given the time/complexity, their solutions demonstrating an understanding of the
problem, employed appropriate technologies and served as a good first iteration.
However, in that phone screen, the candidate was largely unable to answer what I
believe to be a rather simple CSV parsing question resulting in a no hire (or
rather do not bring them in for a loop) decision.

Given the above considerations, I believe we should look at changing the
homework so that it is more focused, less time-intensive and more revealing. To
do this, I would combine what I see as the core of the homework problem, the
metric rollup & storage, with the CSV parsing problem I provided the most recent
candidate; the question would go something like this:

For the provided CSVs:
- parse the results
- store the results
- provide metrics around the results

For me this cuts straight to the interesting portion that a mid-level dev should
be able to handle within 2-4 hours. Of course there is no offical spec around
CSVs so what we will give them will have some interesting parsing
characteristics.

Thoughts?

## Related

- [[Interviews MOC]]
