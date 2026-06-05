# SL Facilities Needing Collection — King County (snapshot 2026-06-05)

65 Supported Living (`facility_type = 'SL'`) facilities in King County have never had a completed `wa.data_collection_runs` row. The collect pipeline does not exclude SL — they're just backlog. They will be picked up by the next `--before` run (all 65 are in the worklist for `ship facility collect all --before 2026-06-01`).

Linked from [[TODO#TODO]].

## Run them directly

```bash
cd ship && cut -f1 ../path/to/list.tsv \
  | xargs -n1 -P3 -I{} ./bin/ship facility collect all --facility {} --env prod --force
```

Or copy the `facility_id` column out of the table below.

## List

| facility_id | canonical_facility_id | facility_name | city |
|---|---|---|---|
| `bfa46767-303f-497f-9dab-0148cd395c67` | `251eff0f-8d15-4c04-b1f9-9fd71d334ab0` | Alpha Supported Living Services | Bothell |
| `513ec0a5-e966-422c-bc72-33830ba7f5e8` | `2ec46f70-3372-4a24-adcd-be1e4c8eb500` | Alpha Supported Living Services (Hallerlake) | Seattle |
| `e0fecc51-ae04-4419-8b9a-82c72351a46c` | `0dd293d4-13e6-49b5-af1d-1321023ad734` | Alpha Supported Living Services (Kelsey Creek) | Bellevue |
| `ca5e4935-11a2-4df7-ba33-e0d4b6b8566a` | `d5482ed2-e037-4221-bb45-15166dbdb8b5` | Alpha Supported Living Services (King) | Bothell |
| `e89a487c-f531-4928-80ac-bd251de3fa7c` | `ba4382ef-873c-4fed-8919-446a4b85a78c` | Alpha Supported Living Services (Mountain) | Issaquah |
| `6e4beeb4-4f6d-47f2-89b0-56a6d4a08484` | `8bce2106-8ce2-4297-947c-8435e14314d7` | Alpha Supported Living Services South Branch (King) | Bothell |
| `2c2280fe-7eb3-4856-a58c-d888b6e21f9a` | `47645f73-8ae4-48db-8f5b-353bc15f4fe2` | Alpha Supported Living Services (Wedgewood) | Seattle |
| `5e2b3c01-8e01-4fd5-98ac-1873cb365de3` | `c1a94aa0-068d-4479-acc0-0a1cae31a17a` | Ambitions of WA Inc (King County) | Mountlake Terrace |
| `86ce36ab-279e-460f-a076-84bdb5f135dc` | `3457189b-a0f6-4f43-aac5-9012e4727a75` | ARC of King County | Seattle |
| `de49276e-19f7-46f1-856f-b3a822f1e51e` | `cbc5160d-456a-4feb-a897-281d879c1338` | Banchero Disability Partners | Seattle |
| `ec56798e-6dca-487d-919f-ab4141810058` | `1a3735d9-cc29-47a8-a429-6fee4e7fbb44` | Bethesda Lutheran Communities | Renton |
| `483e31bd-e01f-495b-9d77-8d5c47b40af9` | `6fe3b842-b2d0-4695-86e9-c71d7ffecb90` | BETHESDA LUTHERAN COMMUNITIES INC | Renton |
| `6653dad7-8188-42f8-8675-31250fd127d2` | `cb1da203-14a0-4d46-95f7-cbd50f5f6aee` | BETHESDA LUTHERAN COMMUNITIES INC | Renton |
| `f5bb4ffd-bc18-4bc9-a955-07ad21d18cad` | `ddc14cb9-b855-4eb0-9dd2-6a70d5d10b89` | BETHESDA LUTHERAN COMMUNITIES INC | Renton |
| `172d119c-97e5-4365-bd9a-6cdbb6e5c5c5` | `34a415ed-c4a4-444c-a279-3583e5281922` | BETHESDA LUTHERAN COMMUNITIES INC | Renton |
| `09a2bfc1-7511-413a-ac1d-b71ef323ab14` | `b5b127f4-3373-44de-8b46-a02b822d91d6` | Beyond Horizon Supported Living PLLC | Federal Way |
| `720020c1-1b47-4cef-b43e-6f9a73b92423` | `10626247-b979-4274-8bc6-30e8a1c8f3bd` | Camelot Society | Mountlake Terrace |
| `a107c377-df2b-4509-8f3b-17160ed01cc7` | `a5cfc1e4-a113-42ac-ba40-87473c571cd4` | Caregivers NW (King) | Federal Way |
| `83907053-1a00-411f-9ab8-1d7f9d6d8fe8` | `4435c47b-2a87-4507-a0ff-a7b419d14087` | CASCADE COMMUNITY SERVICES LLC | Shoreline |
| `c042ae06-175d-4d0e-b53d-9bf55bfc8f8f` | `1b65d482-1e56-4036-a2e7-8ea24523d3a5` | Clear In Home Care, PLLC (King) | Seattle |
| `efb2715e-c52c-4d02-aaf1-0918a0998678` | `3840cf1e-a35c-49e2-939d-7df50a74ef0f` | Community Integrated Services Inc | Federal Way |
| `0552bddf-3e11-4c01-b218-c555ef82b3e4` | `0e5e2deb-d1c1-4550-bc8d-3a73714a98e7` | Community Integrated Services LLC (King) | Federal Way |
| `2724c71d-67e4-430f-90b7-7829703e680b` | `cfaff67c-437d-4128-aa0d-827fb7ebd8db` | Community Integrated Services LLC (King) | Federal Way |
| `7271141e-d3d3-4617-ac2a-ca028c1b31f9` | `be8eeb09-63d4-4f99-b52b-8bd5c6773b66` | COMMUNITY LIVING (KING COUNTY) | Yakima |
| `1e4dbdb4-0bf7-417c-abff-6a89398ce256` | `819b13de-0571-45b5-a4ab-55a10b7e53f0` | Destiny House Operations | Enumclaw |
| `6fd8d334-9dd8-4c11-a95d-390a37177485` | `4282a95b-1989-43f1-b738-7ae4bbcff07d` | Elitecare Supported Living Agency (King) | Tacoma |
| `5dfee1b2-a7b2-4368-989a-5cd7dcd82661` | `f7e7a151-ab5e-4302-8232-b8a063a8433c` | Friendship House | Enumclaw |
| `686e023e-c383-45b7-908d-c563ed0f355f` | `822a3b29-8f8a-4bc6-b10c-af1d36a5439c` | Greenwood Home | Seattle |
| `392c569a-b8be-4c06-af03-b0194688128a` | `37b33df2-1e86-465c-b022-4a4f30bdaac1` | Habilitation Services | Auburn |
| `b8e0d7d7-1ef4-463f-9bae-fc5f2765b358` | `75e4e6d7-a109-4b16-91dd-ebfc81e3a554` | Harmony Homes Living Services LLC | Tukwila |
| `718fc9f8-5f2e-4450-aae6-29fba29fe2dd` | `31c2c19f-d27f-4e23-922a-3bb50f882fb8` | Helping Hands for the Disabled | Bellevue |
| `3cd52f42-ab87-4b4b-9263-c8964068f9fd` | `5669d0c9-2ff3-44a3-bce0-8eaeda148fea` | Helping Hands for the Disabled | Burien |
| `a47a839d-f9dd-4699-8730-a049cacc34f9` | `636358b6-1803-4a68-bf3f-0fb51af85547` | Helping Hands for the Disabled | Bellevue |
| `a3da2cca-74ae-45ac-86c7-365f737922bd` | `cadc7ff1-c57e-4e20-b950-1fc401b912a2` | Hershey Housing | Vashon |
| `d24a018a-b697-40a5-b42e-16ef738f195e` | `e85456fd-6534-431b-9686-74dc1e84c7c6` | Inglewood Residential & Community Services | Kenmore |
| `fef53d49-3cf3-472d-ad01-9f6bce24e151` | `1b614de8-df61-4393-a755-1f38fb7f2180` | Inglewood Residential & Community Services | Kenmore |
| `fc1d0ebf-bbc9-45be-b840-f7cf4cf919f7` | `04f03557-2483-4a2c-972c-25a375c7e3e3` | Integrated Living Services | Seatac |
| `3bf6c6cc-cd61-4ecc-a8a9-73487548dcf3` | `ee102e47-f215-417a-810e-109517a5774b` | Integrated Living Services | Kent |
| `d02b0f7b-e48f-4b8c-8b5e-823cddfaeedc` | `a204679a-3bd2-4a09-b846-900b04a78b24` | Kam Kare LLC | Bellevue |
| `de5d096e-9eed-42d4-9bbf-a768de1bdce2` | `9471d7ff-bc06-4757-89dd-2713843b7f3c` | L'Arche Noah Sealth of Seattle | Seattle |
| `d645e604-3b06-480c-ad51-685cc7be2df0` | `7ae4ecc0-c7a0-44dd-8674-99efcd9296a7` | Life Skills Center | Auburn |
| `b32b1a3d-f403-4122-8da3-e3967d03d46c` | `0a384f47-e2aa-4fec-8132-26d59bbf4647` | Maksu, Inc. | Federal Way |
| `0889d567-ca36-4576-8b92-efdf86424b8d` | `2193e947-955d-4b94-9c89-6f70057966d0` | Nellie Goodhue Group Home | Seattle |
| `85e224dc-df2b-49be-bfd2-182c20bc0e38` | `78e19362-6e26-4906-aeae-05d7708d912d` | NELLIE GOODHUE GROUP HOMES | Seattle |
| `ac06a891-5532-4aec-b856-5aa62dd36ee4` | `c21ed268-a94e-489e-a044-13a5f3ffa566` | NELLIE GOODHUE GROUP HOMES | Seattle |
| `42c1d497-14ab-4f8c-b98c-3e4ca60b5a45` | `5e38c8e6-46c2-49c2-a242-9e768d3201c4` | Parkview Services | Seattle |
| `64b28206-e32f-4120-8caa-cf5e6db0137e` | `01fc9113-1794-41de-b5d3-5a40e4dbd305` | Parkview Services King | Shoreline |
| `cabcc2ac-c3c2-40a3-a227-e198d99f919e` | `577b97d3-b3e8-4269-8429-5b884949bc98` | PREMIER CARE SERVICES INC | Bellevue |
| `3d7a9c98-3a04-476d-9769-3b85fe05cd4f` | `994e0143-b269-4373-924f-d16d0f2e8ded` | Provail | Seattle |
| `98193731-66af-41ce-b08d-c38278e4d723` | `83035128-d1d5-4728-9aa2-26149f70cf8a` | Puget Sound Regional Services | Renton |
| `af0ed6b6-99b1-4968-97ad-52232b498873` | `236507e9-cf4a-42a4-bbe5-27b6f8931ea1` | REM Washington, LLC | Seattle |
| `f9d3e583-1893-4ec0-9eba-e77a491a170e` | `1f9cd726-befd-4a6f-b73d-4e3b2b29122e` | Res-Care Washington Inc (King County) | Seattle |
| `5dd57524-e1c5-450b-802c-3105fe97b2d0` | `85edd963-03b8-42f3-9e9c-0013f3c12e67` | SAILS Washington Inc | Lynnwood |
| `171b52a5-cfd5-4292-a74f-0807320777d2` | `f733cfe5-e3db-4c12-b65a-f24657ee1b27` | SAILS Washington Inc. (King) | Lynnwood |
| `913636c5-4e57-44ca-adcd-3db5f5e3e5e6` | `d713e6c2-9e9d-49b3-944b-ad2409a77fdc` | SAILS Washington Inc. (King) | Lynnwood |
| `81620eff-bea7-4a46-a228-7d6065f6f5b9` | `c2faa828-8350-41ef-a356-8d6f3d641db5` | Service Alternatives for Washington, Inc. King County | Coupeville |
| `b9cfaf6b-a95a-4f5e-b448-686d3e2b0781` | `e7bb082f-5d0d-4ce5-b566-5900540721cd` | Shamrock Living Services, LLC | Shoreline |
| `306bfbe9-1616-4f4b-999f-1f21cb4f7b80` | `97f0a0a3-8d64-41e7-842e-e35272c5abcd` | Shared Journeys | Shoreline |
| `f65038c1-e8a2-40d8-a2bd-f2cce99c29df` | `a90f2bc0-6d7a-42e9-aff6-ddf66b18fdb0` | SOLA Kent | Kent |
| `7e8d8046-101f-4145-a442-66c4bec97bb6` | `db359b3b-f9cb-4670-b4f5-af5488c131a4` | SOLA Seattle | Seattle |
| `e992e524-0e46-4198-ba5f-5eb53522aa88` | `78ec8750-e9d8-4319-ae6b-f1204898fa8b` | Tahoma Hills | Shoreline |
| `6ce17c73-1aee-4855-afce-7794a1cfcb2d` | `0c00b8b0-b92b-4156-a5b4-428d5aea3265` | THOMAS FREY (CARR KING COUNTY) | Kent |
| `f365abdc-d47d-49fe-9a87-7e8594226856` | `bd2f41fe-1bbe-457f-89a1-1c16f7cb3aa3` | Total Living Concept | Kent |
| `6c55bf11-16ca-489f-b69a-c284b7fdb0c3` | `0dfe36a5-0222-42ea-b3be-ffbdde241b39` | United Friends Group Home Assoc. | Seattle |
| `4b931c5c-7c66-44ce-856a-8fc68b558742` | `b7cf8a68-1bbb-48b4-bba9-337dc6137aa0` | Volunteers of America King County | Seattle |

## Notes

- Some address counties don't match facility-name labels (e.g. `COMMUNITY LIVING (KING COUNTY)` has city=Yakima; `SAILS Washington Inc. (King)` has city=Lynnwood/Snohomish). The query filters on `wa.facilities.facility_type='SL'` and `facility_status='OP'`, not on the location address county. These are SL facilities the state lists in King County's roster — the address may be the operator's HQ rather than the service-delivery site.
- `Service Alternatives for Washington, Inc. King County` has city=Coupeville (Island County). Same reason — likely HQ vs. site mismatch.
- Several entities (Bethesda Lutheran Communities, Helping Hands for the Disabled, NELLIE GOODHUE GROUP HOMES, SAILS Washington, Community Integrated Services) appear multiple times under nearly identical names with different canonical IDs. Treat each as a separate license/site; they're not duplicates from the previous canonical-dedup pass.
