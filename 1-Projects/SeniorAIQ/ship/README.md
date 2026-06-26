# SHIP - Senior Housing Intelligence Platform

## Development Setup

### Prerequisites

- Docker and Docker Compose
- `.env` file in `ship/` (copy from `ship/.env.example`)

### Start All Services

```bash
./dev.sh start
```

This starts:
- **Backend** (`ship/`): PostgreSQL, Redis, Go API on http://localhost:8080
- **Frontend** (`ship-ui/`): SvelteKit dev server on http://localhost:5173

### Other Commands

```bash
./dev.sh stop        # stop all containers
./dev.sh restart     # stop then rebuild and restart everything
./dev.sh logs api    # tail backend logs
./dev.sh logs ui     # tail frontend logs
```

### Run Services Independently

Each service has its own `docker-compose.yml` and can run on its own:

```bash
# Backend only (postgres + redis + Go API)
cd ship && docker compose up --build -d

# Frontend only (SvelteKit dev server)
cd ship-ui && docker compose up -d
```

### Rebuilding After Code Changes

**Go backend** -- the API is built inside Docker, so rebuild the container:

```bash
./dev.sh restart
# or
cd ship && docker compose up --build -d
```

**SvelteKit frontend** -- source files are volume-mounted, so changes hot-reload automatically. No rebuild needed.

### Environment Variables

The backend reads from `ship/.env`. Key variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `SES_MOCK` | Set to `true` to log OTP codes instead of sending email | No |
| `SES_FROM_EMAIL` | Verified SES sender address | Yes (unless SES_MOCK=true) |
| `AWS_REGION` | AWS region | Yes |
| `AWS_ACCESS_KEY_ID` | AWS credentials for SES | Yes (unless SES_MOCK=true) |
| `AWS_SECRET_ACCESS_KEY` | AWS credentials for SES | Yes (unless SES_MOCK=true) |
| `GITHUB_TOKEN` | GitHub API token for blog content management | No (content service disabled without it) |

### Database Migrations

Migrations in `ship/db/migrations/` are automatically applied when the PostgreSQL container starts for the first time (mounted to `/docker-entrypoint-initdb.d`).

To apply new migrations to an existing database:

```bash
cd ship && make db-migrate
```
