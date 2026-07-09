# Admin action API — facility.recollect + facility.rescore triggers

#ship/todo

Wire the admin console's visual-only action buttons ("Re-run scoring", per-category "Run collector", "Re-run stale collectors") to real backend triggers.

## Pattern (already scaffolded)

The JSON-RPC scaffold and the reference command already exist in `ship/web`:
- `pkg/rpc` — JSON-RPC 2.0 dispatch core (`Registry`/`Dispatch`), reusable by a future MCP driver.
- `POST /admin/rpc` (admin-gated) — the programmatic front door.
- `blog.setPublished` is the reference: **one driver-agnostic command, two front doors** (RPC method + htmx console button, both calling the same service method).

Follow that pattern:
- Add a driver-agnostic jobs/command service: `Rescore(canonicalID)` and `Recollect(canonicalID, category)`.
- Expose as JSON-RPC `facility.rescore` / `facility.recollect` in `rpcRegistry()`.
- Wire the console buttons via htmx, same as the blog publish toggle.

## Building blocks that already exist

- **Scoring, single facility:** `scoring/cmd/scorer-lambda` and CLI `ship facility score --facility <uuid>`.
- **Collection agents:** reviews / assessor / location agents already accept `opts.FacilityID` for single-facility runs.

## BLOCKER — decide first

Invocation mechanism is undecided. The agents' Lambda deploy (`infrastructure/terraform/lambda.tf` `aws_lambda_function.agents`) is **commented out** and there are no SQS trigger queues. Decide **Lambda `Invoke` vs SQS enqueue vs EventBridge** before wiring the command service.

## Design notes

- **Async:** collection/scoring are long-running → the command should **enqueue and return "accepted"**, not block. The console already renders per-category **freshness (`collected_at`)**, so completion shows up there. Consider a small `jobs` table for explicit status.
- **Guardrails:** already admin-gated via `RequireAdmin`; add **debounce/idempotency + rate-limit** so re-collects can't be spammed.
- **MCP alignment:** because these are JSON-RPC methods over a shared command service, a future MCP driver can expose the same commands as tools with no rework.
