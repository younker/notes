The blog page has a `+page.server.ts` that fetches from the API on every request. The SvelteKit Node server running in ECS calls `http://api.ship.internal/api/blogs`, and that connection is timing out — the 30-50 seconds is a classic TCP SYN timeout.

The landing page loads instantly because it has no server-side data fetching.

There's also a config mismatch making this worse:

1. **Dockerfile** (line 10) bakes `PRIVATE_API_URL=http://api.ship.internal` at build time via `$env/static/private`
2. **ECS task definition** (`ecs.tf:449-450`) sets `PRIVATE_API_URL=https://api.senioraiq.com` at runtime

Since the code uses `$env/static/private` (Vite replaces at build time), the **ECS runtime value is ignored**. The baked-in URL is `http://api.ship.internal` (HTTP, port 80).

But the security group (`vpc.tf:281-289`) only allows ECS egress to the ALB on **port 443** (HTTPS). There's no egress rule for port 80, so the HTTP request hangs until TCP timeout.

## Fix Options

### Option A — Use `$env/dynamic/private` (recommended)

Switch to dynamic env so the ECS runtime value (`https://api.senioraiq.com`) is used:

- Change all `import { PRIVATE_API_URL } from '$env/static/private'` to `import { PRIVATE_API_URL } from '$env/dynamic/private'`
- Remove `ENV PRIVATE_API_URL` from the Dockerfile build stage (it's not needed at build time)

This is the cleaner fix — it lets you manage the URL via the ECS task definition without rebuilding the Docker image.

### Option B — Change the Dockerfile to use HTTPS

- Change Dockerfile line 10 to `ENV PRIVATE_API_URL=https://api.ship.internal`
- Add an HTTPS listener rule on the ALB for `Host: api.ship.internal`
