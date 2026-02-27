# Sportify_1

Monorepo for Sportify MVP with web (`client`), backend (`server`), mobile (`mobile`), and AI microservice (`ai-service`).

## Current Implementation Status (Done)

### 1) Environment & Tooling
- Flutter installed and configured globally on Windows.
- `flutter doctor -v` completed with no issues.
- Runtime pin files added:
  - `.nvmrc` → `20`
  - `.python-version` → `3.11`
- Docker Compose scaffold added for local infra.

### 2) Git/GitHub Setup
- Repository initialized and pushed to GitHub.
- Remote configured: `origin -> https://github.com/Dhrruv222/Sportify_1.git`
- `main` branch active and tracking remote.
- Nested `client` gitlink/submodule issue fixed so `client` files are now tracked normally.

### 3) Prisma + Supabase (Server)
- Prisma v7 config aligned to `prisma.config.ts` datasource usage.
- `schema.prisma` updated to Prisma v7-compatible datasource format (no `url`/`directUrl` inside schema datasource block).
- Connection string troubleshooting completed (URL encoding and pooler format issues addressed).
- Migration successfully created and applied:
  - `server/prisma/migrations/20260225204740_init_supabase_cloud/migration.sql`
- Prisma Studio verified as runnable.

### 4) AI Service Scaffold (FastAPI)
- `ai-service` folder created.
- Python virtual environment created under `ai-service/venv`.
- Dependencies installed in venv: `fastapi`, `uvicorn`, `openai`, `requests`.
- Clean `ai-service/requirements.txt` generated from local venv.
- Health endpoint scaffold added in `ai-service/main.py`.

### 5) Environment Templates
- Env template(s) started for AI service:
  - `ai-service/.env.example`
- Backup env workflow used during DB URL fixes (`.env.bak`) and excluded from commits via `.gitignore` updates.

### 6) Handoff/Scaffolding Files
- Backend service scaffolding added under:
  - `server/src/services/index.ts`
  - `server/src/services/handoffs.ts`

---

## Repository Structure

- `client/` → Next.js frontend
- `server/` → Node.js + Prisma backend
- `mobile/` → Flutter app
- `ai-service/` → FastAPI microservice
- `docker-compose.yml` → local service orchestration scaffold

---

## Verified Commands (So Far)

### Flutter
- `flutter --version`
- `flutter doctor -v`

### Prisma
- `npx prisma validate`
- `npx prisma migrate dev --name init_supabase_cloud`
- `npx prisma studio`

### AI Service
- `./venv/Scripts/python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000` (PowerShell equivalent path used on Windows)

---

## In Progress / Next Roadmap Focus (Dev 2)

1. Finalize all 6 Dev 2 handoff functions with exact signatures and stable mock responses.
2. Expand Prisma schema to full roadmap table sequence and migration plan.
3. Implement FIT-Pass module (plans, subscribe, QR generation/check-in).
4. Build Company HR module endpoints.
5. Implement AI scoring endpoint in FastAPI and integrate from server.
6. Add news ingestion pipeline (BullMQ + scraper + locale feed query).
7. Set up CI/CD + staging infra checks (Railway/Sentry/Redis/S3).

---

## Notes
- Keep secrets out of git; use `.env` locally and `.env.example` for shared templates.
- Use encoded passwords in Postgres URLs when special characters are present.
- Keep migration announcements coordinated before applying shared/staging DB changes.
