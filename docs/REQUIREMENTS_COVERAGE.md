# Requirements Coverage Matrix

Mapping project checklist to current frontend skeleton state.

## 1) Core checklist mapping

- **Faithful prototype implementation**
  - Status: **In progress**
  - Covered by: route skeleton + design system + team workflow docs
  - Remaining: final pixel/UI implementation of each Figma view

- **Every prototype screen available in React Router**
  - Status: **Covered**
  - Implemented routes:
    - `/login`, `/register`
    - `/dashboard`
    - `/new-trip/destination`
    - `/new-trip/dates`
    - `/new-trip/transport`
    - `/new-trip/activities`
    - `/new-trip/overview`
    - `/packing-lists`
    - `/stats`
    - `/profile`
    - fallback `*` (404)

- **Views separated into pages folder**
  - Status: **Covered**
  - Current route views exported from `src/pages`

- **Reusable components extracted**
  - Status: **Covered**
  - Shared UI in `src/shared/components/` (ui, auth, trip, stats, icons)
  - Barrel export: `src/shared/components/index.ts`

- **Styling and visual consistency**
  - Status: **Partially covered**
  - Design rules documented in `docs/DESIGN_SYSTEM.md`
  - Remaining: apply final Figma styles per view

- **Working authentication (Firebase)**
  - Status: **Covered**
  - Email/password login/register, Google sign-in, logout, protected routes

- **Hotjar integration**
  - Status: **Covered**
  - Bootstrap initialization in main app layer

- **Google Analytics integration**
  - Status: **Covered**
  - Initialization + pageview tracking on route changes

- **Deploy application**
  - Status: **Ready** (config in repo; deploy via Railway dashboard or CLI)
  - Files: `Dockerfile`, `Caddyfile`, `railway.toml`
  - Remaining: run deploy, set `VITE_*` variables, add public URL to README

- **README + screenshots (app + GA + Hotjar)**
  - Status: **Pending**
  - Must be completed after final UI and deployment

## 2) Team readiness verdict

Current skeleton is suitable for 3-person parallel development:

- route ownership can be split safely
- shared standards are documented
- analytics/auth baseline is implemented
- clear docs exist for workflow and quality checks

## 3) Final submission risks to control

1. Inconsistent UI if components are not reused.
2. Route changes without coordination causing merge conflicts.
3. Missing required evidence screenshots in final README.
4. Deploy done too late to verify analytics on HTTPS.
