## Questions
- What is V1 and what is V-next?
  - filters?
    * vnext
  - CSV: sort/filters, take ordered collection of item_ids
    * vnext
- Quotas -- confirmed: no quotas
  - are we tracking any of this?
    * nope, maybe if we see abuse but let's try science first
  - if so, the report copy is `3,181 remaining in your plan`. Why not promote consistency across apps for quota reporting with something like `3,181 of 30,000 queries available until 10/24`
    * confirmed no quotas, possibly later
- Limits
  - lists per user / items per list
  * the same as what currently exists for kwe
  * limits are scoped to feature, 10 of each
- Sorting
  - will all sorting be done up front?
    * all up front
  - both asc and desc?
- What is the default list items order? Assumption is PA, DA, linking root domains, links to site (with yes ranking higher than no)
  * ^ is the proper sort order
- is the associated domain a domain or can it be a url (aka page) or subdomain. what does links to mean in that context? doe sit always link to the domain, subdomain, page, do they pick, what?
  * it can be fqdn, root domain or page (and has been renamed to `associated site` as a result)
- Campaign associations: what happens when we associate an existing list to a campaign? Do we overwrite the target_url? etc...
  * vnext
  * lists tied to a campaign cannot alter the associated site
- Link Lists Page:
  - why is the `target url` not in there?
  - is `creation date` useful?
  - `last refreshed` should be `last viewed` (we need to update the lists table to include this timestamp)
  * punt on last viewed. might be useful but who knows

## UI
- what does the Links, Inbound, Anchor text, etc pages look like?
- where/how are links added. Assumption: it will require bulk adds
  * CSV style, however we get it from the front (work out with UI), loop back with front
- what is the default view when a note exists?
  * in new mocks
- why "associated domain" and not URL?
  * naming to convey relationship, and it's not domain, it's "associated site"
- last refresh is meaningless and ignored
  * duly noted
- can the edit icon float right of the note? by placing it above the text it introduces a ton of dead space (unless that was the intent)
  * yes it can
- Associated Domain
  - what is the business reason around the name?
  - ~~the addition of a url is relevant across all links pages (inbound, gained, anchor, etc). Having it nested under list-specific links (settings, refresh list) components means the page will jump around (in ose, kwu & kwe) those elements are visually stationary~~
  - the "Associate a Domain" edit/button introduces alot of dead space and temporarily pushes the table around
  - do I really have to click "change" to get a text box to change the domain? As a power user, I would prefer altering the url be easier (via hotbutton ideally)
  * the edit will likely move to the settings button

- `add notes` should be singular unless we are going to support multiple notes per item with is technically more leg work
  * yes, singular. do not support multiple notes per item not formatting to allow bullet points or anything like that

## Settings

What other actions exist under settings? Assumptions include:
  - archive list?
    * nope, we delete
  - ... or just delete the list
    * delete!
  - rename list
    * yes
  - associate/dissociate list to campaign
    * vnext
  - alter list target? It could be done since we are doing this on-demand but the value seems questionable?
    * yes

`DELETE /listerine/api/:version/lists/:list_id`
  - response: `204 no content`
  - body: none

`PUT /listerine/api/:version/lists/:list_id`
- response: `204 no content`
- rename list:
  - body: `{name: string}`
  - validations: non-empty alphanumeric string
- campaign association:
  - body: `{campaign_id: int|null}`
  - validations: int or null

## Export CSV

`GET /listerine/api/:version/lists/:list_id.csv`
- response:
  - status: `200 OK`
  - body: same as 

**Note**
- was initially scoped as `POST` but to keep consistency with the pro app (and for simplicity sake) this was changed to `GET`. What is better?
  * GET
- We will need to include filters if/when we add them
  * vnext concerns
- the pro app does not persist sorting for CSV requests. It's my opinion we should but really it is likely irrelevant
- is there such a thing as historical CSVs? OSE has it but that was mostly out of necessity from load times
  * nope

## List Retrieve

`GET /listerine/api/:version/lists/:list_id`
- response:
  - status: `200 OK`
  - body:
    - `name`: string
    - `target_url`: string
    - `item_count`: int
    - `updated_at`: utc iso-8601
    - `items`: collection of items
      - `title`: string
      - `url`: string
      - `page_authority`: int
      - `domain_authority`: int
      - `linking_root_domains`: int
      - `links_to_site`: bool
      - `note`: string (question: what do we allow here? does the UI validate input, if so what)
- request
  - params:
    - ~~`sort`: (page_authority|domain_authority|linking_root_domains|links_to_site)~~
    - `page`: int
- validations
  - list belongs to account_id found in mozauth headers
  - list is active

## Delete icon
**Assumption**: This is bulk item delete

`PATCH /listerine/api/:version/lists/:list_id/delete-items`
- response: `204 no content`
- request
  - body: `{item_ids: [int]}`
- validations
  - all items are part of the same list
  - all items exist
  - list belongs to account_id found in mozauth headers
  - list is active

## Add To...
**Assumption**: This is bulk add items to another list (aka copy) and has nothing to do with campaigns

`PATCH /listerine/api/:version/lists/:list_id/copy-items
- response status: `204 no content`
- request
  - body: `{item_ids: [int]}`
  - validations
    - all items are part of the same list
    - all items exist
    - source & target list:
      - belong to account_id found in mozauth headers
      - is active


## More Actions
What's under "more actions"?
- ~~mv items to another list? Ineffecient given we have "Add to..." which I assume bulk adds items to another list~~
- ~~copy list (requires new name)~~
* mv was removed from KWE, only fn for cp

## Endpoints Not Accounted For in Mocks

`GET /listerine/api/:version/lists`
- retrieve all lists for an account
- request: nothing needed. we retrieve by the `account_id` provided via mozauth
- response
  - status: `200 OK`
  - body
    - lists
      - `name`: string
      - `target_url`: string
      - `item_count`: int
      - `updated_at`: utc iso-8601
- validations
  - account is active pro

`POST /listerine/api/:version/lists`
- Create new list
- request body:
  - `name`: string, required
  - `target_url`: string, required
  - `items`: collection, optional
    - `url`: string, required
    - `note`: string, optional
- response
  - status: `201 created`
  - body: same as GET list (see above)
- validations
  - account is active pro
  - list name is non-empty, alphanumeric
  - list does not already exist (unique constraint on db for account_id, name)
  - target_url is valid url
  - every item is valid

`POST /listerine/api/:version/lists/:list_id/items`
- Bulk list item create (add)
- request body:
  - `items`: collection of item data
    - `url`: string, required
    - `note`: string, optional
- response
  - status: `200 OK`
  - body: same as GET list (see above)
- validations: 
  - url is valid
  - note length is <= 200

`PUT /listerine/api/:version/lists/:list_id/items/:item_id`
- item update: we could expose `url` edits but there is limited use and introduces complexities
- request body:
  - note: string (required, can be null)
- response: `204 no content`

## Related

- [[Moz MOC]]
