---
name: phs-news-report
description: Draft a Petoskey High School (PHS) news/result email for reporters, formatted for the Traverse City Record-Eagle prep roundup. Gathers the result, score, scorers/leaders, and a coach quote, then produces a ready-to-send To/Subject/Body. Use when the user wants to "report the score", "send results to the paper", "write the Record-Eagle email", "prep roundup", "send PHS news to a reporter", or after a PHS game.
---

# PHS News Report

Turns a game result into an email the Record-Eagle sports desk can paste with
minimal reformatting. Same-day reporting, win or lose. Default team is
[[PHS]] boys soccer (Petoskey Northmen), coach Jason Younker, but the format
works for any sport.

## Recipient

- **To:** `sports@record-eagle.com`
  - The AD's relayed letter wrote `resports@record-eagle.com`. That looks like a
    typo. Confirm the address with the user on the first send; the public desk
    address is `sports@record-eagle.com`. Phone fallback: 231-933-1410.
- **When:** the same day as the event, win or lose. Say so if it is being sent late.
- Contact who relayed the format: James Cook, Record-Eagle, 231-392-4421.

## Format the paper wants

Match this shape so the editor reformats less (from the sample they provided):

```
<Headline: subject + verb + result, e.g. "Petoskey edges Cadillac at home">
<Lead paragraph: who won, the score, opponent, any context (season opener,
 conference, comeback). One or two sentences.>
"<A coach quote, one or two sentences.>" Petoskey coach Jason Younker said.
<Northmen leaders: name stat, stat; name stat; ... semicolon-separated.>
```

Rules:
- Reference the team by school in the lead ("Petoskey"), by nickname for the
  leaders line ("Northmen leaders:").
- Attribution reads `Petoskey coach Jason Younker said.` (school + "coach" + name).
- Include as much pertinent info as possible: final score, opponent, record after
  the game, home/away, tournament/conference context.
- Leaders line uses the sport's box-score vocabulary. Soccer: goals, assists,
  saves, shutout/clean sheet, e.g. `Northmen leaders: Sam Rue 2 goals, 1 assist;
  Eli Dettmer 1 goal; keeper Jack Poe 6 saves (shutout).`
- Plain dashes, no em dashes. No invented facts. If a stat or quote is missing,
  leave it out rather than guess.

## Workflow

1. **Collect the facts.** Ask only for what is missing. Needed:
   - Sport and level (varsity/JV), date, home or away.
   - Opponent, final score, result (win/loss/tie).
   - Record after the game, if tracked.
   - Context: season opener, conference game, tournament, comeback, etc.
   - Leaders: scorers with goals/assists, goalkeeper saves, shutout.
   - A coach quote (one or two sentences). If the user has not given one, ask for
     it or offer to draft one for them to approve. Do not fabricate a quote and
     present it as said.

2. **Draft the email.** Fill `template.md`. Keep the lead tight, put the quote
   after the lead, end with the leaders line.

3. **Output for sending.** Print `To:`, `Subject:`, and the body ready to copy.
   - Subject: `<Sport> roundup: Petoskey <result> <opponent> <MM/DD>`
     e.g. `Boys soccer: Petoskey def. Cadillac 3-1, 8/26`.
   - Remind the user to send it the same day.

4. **File a copy (optional).** If the user wants a record, save the body to
   `1-Projects/PHS Soccer Fall 26/Record-Eagle/<date> vs <opponent>.md` and link
   it from the season hub. Ask before writing.

## Notes

- Other sports the desk takes by email: football, volleyball, swimming. Same format.
- Cross country / golf / tennis have their own channels (athletic.net, MHSAA Golf
  app, tennisreporting.com); a reminder email still helps but is not the main path.
- See [[template.md]] in this folder for the fill-in shell and a worked example.
