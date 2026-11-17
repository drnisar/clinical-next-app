# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A clinic / hospital management app built with Next.js 15 App Router, React 18, Prisma on MongoDB, and NextAuth v4. It follows a patient from registration through appointment, consultation (OPD notes and prescriptions), admission, OT (surgery) notes, and discharge slip. It is deployed on Vercel.

## Commands

```bash
npm run dev                                  # dev server on :3000
npm run build                                # prisma generate && next build
npm run lint                                 # next lint (ESLint 9 flat config)
npm test                                     # vitest run (all tests, as in CI)
npm run test:watch                           # vitest watch mode
npx vitest run tests/api/admission.test.ts   # one file
npx vitest run -t "admits the patient"       # tests whose name matches
npx prisma generate                          # regenerate client after editing prisma/schema.prisma
```

CI (`.github/workflows/test.yml`) runs `npm install` then `npm test` on Node 22. It does not run lint or build.

Environment variables (in `.env*`, which git ignores): `DATABASE_URL` (MongoDB, used by both Prisma and the raw Mongo client), `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.

## Architecture

### Data layer
- `prisma/schema.prisma` is the source of truth. The datasource is MongoDB, and IDs are `@db.ObjectId` strings with model-specific names (`registration_id`, `consultation_id`, `admission_id`, `ot_id`, …), not `id`. `Registration` is the patient record that the other clinical models hang off. Model names keep their odd casing (`Admission_Discharge` → `prisma.admission_Discharge`).
- The Prisma client is generated to `generated/prisma/` (not `@prisma/client`) and **is committed**. Import types from `@/generated/prisma`. A rebuild changes the files under `generated/`, so don't commit those changes by accident.
- Always use the singleton `prisma` from `@/lib/prisma`. `prisma/client.ts` is an older, non-singleton duplicate. `schema.sql` is not used.
- `lib/db.ts` is a separate raw `MongoClient`, used only by the NextAuth MongoDB adapter.

### Auth
- `middleware.ts` guards `/dashboard/*` and `/api/*` with a NextAuth JWT check. API calls without a token get a 401 JSON response, and pages redirect to `/auth/signin`. Only `/api/auth/*` (NextAuth and `/api/auth/register`) is public.
- `lib/auth.ts` sets up Google and email/password credentials (bcryptjs, `User` model) with JWT sessions. Access is limited to a hard-coded `ALLOWED_EMAILS` allowlist, which both providers check.
- The middleware does not cover server actions, so each one must check for itself: `if (!(await getServerSession(authOptions))) return UNAUTHORIZED;` (see `app/actions/registration.ts`).

### Request/mutation patterns
- **Server components** (`app/dashboard/**/page.tsx`) query Prisma directly and pass the data to client components. In Next 15, `params` is a `Promise` and must be awaited.
- **Route handlers** in `app/api/<resource>/route.ts` and `[id]/route.ts` validate with Zod (shared schemas in `app/validationSchemas.ts`; some actions define their own), call Prisma, then `revalidatePath`/`revalidateTag`. Multi-model writes such as admission plus bed location use `prisma.$transaction`.
- **Client components** call those routes with axios or `fetch`, and use TanStack Query in some places. Forms use react-hook-form with zod resolvers.
- **Server actions** live in `app/actions/` and return `{ success, message, data, errors }`.
- `app/api/notes` proxies an external HMIS server (the HMIS notes pages).

### UI / state
- The UI uses Radix Themes plus Tailwind (shadcn config in `components.json`). The rich-text editors are TipTap and SimpleMDE. Tables are built with TanStack Table and DataTables.
- Zustand stores (`*Store.ts` next to features, plus `app/store/`) hold client-side lists and filters. A `*StoreInitializer` client component seeds a store from data that a server component fetched.
- Code for each feature sits next to its route: `app/dashboard/<feature>/_components/`. Shared dashboard pieces are in `app/dashboard/_components/`.

## Tests

- Vitest runs in the `node` environment, picks up `tests/**/*.test.ts`, uses the `@` alias for the repo root, and has `mockReset: true`. There is no real database or auth in tests.
- `tests/setup.ts` sets dummy env vars, stubs `next/cache`, and silences `console`.
- To test a route, mock Prisma with `vi.mock("@/lib/prisma", async () => ({ prisma: (await import("../helpers/prisma")).prismaMock }))`, then call the exported `GET`/`POST`/… directly. Build requests with `jsonRequest()` and route params with `params()` from `tests/helpers/request.ts`. If a route uses a model that `tests/helpers/prisma.ts` doesn't cover, add it there.
- Project subagents in `.claude/agents/` (`unit-test-writer`, `test-runner`, `api-security-tester`, `e2e-tester`) hold more testing conventions.
