# AllPacked Frontend Skeleton

Structured React frontend scaffold for a 3-person team working in parallel on Figma views.

## 1) Tech Stack

- React + TypeScript + Vite
- React Router (all views routed)
- Tailwind CSS (single styling system)
- Firebase package ready to integrate auth
- Google Analytics + Hotjar bootstrap

## 2) Run Project

```bash
npm install
npm run dev
```

## 3) Environment Setup

1. Copy `.env.example` to `.env`.
2. Fill analytics and Firebase keys.
3. Keep `VITE_ENABLE_ANALYTICS=false` on local dev if you do not want tracking events.

## 4) Firebase Authentication Setup (step by step)

1. Create project in [Firebase Console](https://console.firebase.google.com/).
2. Add **Web App** to the project.
3. In Firebase, open **Authentication -> Sign-in method** and enable:
   - **Email/Password**
   - **Google** (set public app name + support email)
4. In **Authentication -> Settings -> Authorized domains**, ensure your dev domain is present:
   - `localhost`
5. Copy web config values into `.env`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
6. Restart dev server: `npm run dev`.
7. Test flow:
   - register at `/register` (with first name)
   - login at `/login`
   - login with Google (name from Google account when available)
   - verify redirect to `/dashboard` — greeting uses first name
   - profile at `/profile` shows name and email
   - logout from profile page

If `.env` is not complete, auth actions will show a clear Firebase configuration error.

## 5) Routing Coverage (from Figma)

- `/login`
- `/register`
- `/dashboard`
- `/new-trip/destination`
- `/new-trip/dates`
- `/new-trip/transport`
- `/new-trip/activities`
- `/new-trip/overview`
- `/packing-lists`
- `/stats`
- `/profile`
- `*` -> 404 fallback

## 6) Team Working Model (3 members)

- Balanced task split (3 people): `docs/TASK_ASSIGNMENT.md`
- Sprint workflow and git flow: `docs/TEAM_PLAN.md`

## 7) Shared Standards

- Visual and component standard: `docs/DESIGN_SYSTEM.md`
- Page implementation workflow: `docs/PAGE_DEVELOPMENT_GUIDE.md`
- New teammate onboarding: `docs/TEAM_ONBOARDING.md`
- Screen Definition of Done checklist: `docs/SCREEN_DOD_CHECKLIST.md`
- Analytics and Hotjar setup: `docs/ANALYTICS_SETUP.md`
- Requirement-to-implementation matrix: `docs/REQUIREMENTS_COVERAGE.md`

## 8) Folder Structure

```text
src/
  app/           # app bootstrap + router
  features/      # business slices (auth, trip wizard, etc.)
  pages/         # route-level screens (Figma views)
  shared/        # shared layouts, analytics, config
```

## 9) Development Rules

- One page/view per branch or small feature branch.
- No inline hardcoded styles outside Tailwind utility usage.
- Keep route components in `pages`, reusable logic/components in `features` or `shared`.
- PR should include screenshot(s) of implemented view and checklist of done routes.

## 10) Git Branch Rules (group requirement)

- Main branch: `main`
- Each teammate keeps personal development branch: `dev_<surname>`
- Team implements in parallel on personal branches
- Commit progress systematically (small, logical commits)
- Merge flow:
  - optional `feat/...` -> `dev_<surname>`
  - `dev_<surname>` -> `main` (reviewed merge)
