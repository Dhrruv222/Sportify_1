# Copilot Master Context — Sportify MVP (Current Monorepo)

## Role
You are an expert full-stack AI coding assistant helping finalize Sportify MVP in this exact stack:
- Web: Next.js App Router in `client/`
- Backend: Node.js + Express + Prisma in `server/` (CommonJS JavaScript, not TypeScript-first backend)
- Mobile: Flutter in `mobile/`
- AI Microservice: FastAPI in `ai-service/`
- Root scripts/utilities in `scripts/`

Your goal is to implement roadmap items with minimal, production-safe changes that match existing architecture and coding style.

---

## Hard Boundaries (Do Not Break)
1. Do not rename existing top-level folders (`client`, `server`, `mobile`, `ai-service`, `scripts`).
2. Do not introduce a new framework or re-architecture.
3. For backend, preserve current CommonJS style (`require/module.exports`) unless a file is already ESM/TS.
4. Do not hardcode secrets or environment values.
5. Prefer extending existing modules/routes over creating parallel duplicate patterns.

---

## Coding Standards

### Web (`client/`)
- Use Next.js App Router conventions.
- Default to Server Components; use `"use client"` only when required for hooks/events/browser APIs.
- Use TypeScript strict patterns where applicable.
- Use Tailwind (mobile-first).
- Keep AR support with native RTL (`dir="rtl"`), avoid heavy custom RTL overrides.
- Forms: `react-hook-form` + `zod` schemas aligned to backend payload shape.
- Data fetching: `axios` + `@tanstack/react-query` for client-side data flows.
- Add loading and error states for async views.

### Backend (`server/`)
- Preserve existing route versioning and prefixes (current APIs are under `/api/v1/...` and health under `/api/...`).
- Respect existing modules: auth, fitpass, company, news, social, users, profiles.
- Validate input using current validation middleware + schema patterns.
- Keep BullMQ/inline fallback behavior compatible with current env controls (`REDIS_URL` etc.).
- Any change must keep `npm run lint -w server` and `npm run test -w server` passing.

### AI Service (`ai-service/`)
- Keep FastAPI route contracts stable (`/health`, `/internal/scout-score`).
- Preserve internal API key check behavior.
- Maintain fallback scoring behavior when OpenAI path fails (if fallback enabled).
- Ensure pytest coverage remains green (`python -m pytest ai-service/tests -q`).

### Mobile (`mobile/`)
- Flutter 3.x + Riverpod.
- Keep UI and networking layers cleanly separated.
- Use `dio` for HTTP, align DTOs with backend response shape.

---

## API Contract Guidance (Current Project)
Prefer these existing backend route families:
- Auth: `/api/v1/auth/...`
- Profiles: `/api/v1/profile/...` and `/api/v1/users/...`
- Social: `/api/v1/social/...`
- FitPass: `/api/v1/fitpass/...`
- Company: `/api/v1/company/...`
- News: `/api/v1/news/...`
- Health: `/api/health`, `/api/health/ready`

Before adding a new endpoint, check whether an existing route/module already supports the use case.

---

## Execution Rules for Every Task
1. Read relevant existing files first.
2. Implement smallest viable change.
3. Reuse existing utilities, middleware, and schema patterns.
4. Add/adjust tests only where the project already has adjacent test patterns.
5. Run targeted validation commands after code changes.
6. Summarize:
   - what changed
   - why
   - validation run + result
   - any follow-up needed

---

## Definition of Done
A task is done only if:
- Behavior works with existing architecture.
- No regressions in touched module tests.
- Async UI has loading/error handling.
- Form schemas match backend expectations.
- Responsive behavior is mobile-first.
- No secret leakage or hardcoded environment values.
- For deployment-impacting backend changes, readiness behavior remains coherent (`/api/health/ready`).

---

## Priority Focus (Current)
1. Frontend integration with deployed backend APIs.
2. Company/FitPass/news UX completion in web and mobile.
3. AI service + backend integration verification.
4. Operational stability (BullMQ, readiness, internal endpoint security).
