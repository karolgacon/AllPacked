# AllPacked - Team Plan (3 people)

## Team Roles

- **Person A - Auth + Foundation**
  - Build final `/login` and `/register`
  - Integrate Firebase Authentication (email/password + logout)
  - Deliver protected routes polish and auth error states

- **Person B - Trip Wizard**
  - Build `/new-trip/destination`
  - Build `/new-trip/dates`
  - Build `/new-trip/transport`
  - Build `/new-trip/activities`
  - Build `/new-trip/overview`
  - Keep one shared form state across wizard steps

- **Person C - Dashboard + Data Views**
  - Build `/dashboard`
  - Build `/packing-lists`
  - Build `/stats`
  - Build `/profile`
  - Build 404 fallback

## Workflow Rules

1. Every person works only in assigned folders/components unless agreed in chat.
2. Required branch strategy:
   - Main branch: `main`
   - Personal development branches: `dev_<surname>`
   - Optional short-lived task branch from personal dev branch: `feat/<route-or-module>`
3. Naming convention:
   - Components: `PascalCase`
   - Hooks: `useXxx`
4. Pull request checklist:
   - [ ] Route works from sidebar/menu
   - [ ] Matches Figma hierarchy
   - [ ] Responsive at mobile + desktop
   - [ ] No lint errors
   - [ ] Screenshot attached

## Git Collaboration Flow (mandatory)

1. Create `dev_<surname>` once and keep it long-lived.
2. Daily work happens on:
   - `dev_<surname>` directly, or
   - `feat/...` branch created from `dev_<surname>`.
3. Commit frequently (small logical commits, at least after each completed UI block).
4. Before opening merge request:
   - update your branch from `main`,
   - resolve conflicts locally,
   - run `npm run lint` and `npm run build`.
5. Merge order:
   - `feat/...` -> `dev_<surname>` (if feature branch used)
   - `dev_<surname>` -> `main` via PR/review
6. Never push unfinished breaking code to `main`.

## Suggested Sprint Board

### Sprint 1 - Core Navigation & Layout
- Shared layout (`AppShell`, sidebar, spacing system)
- Auth shell and route guards
- Basic placeholders replaced with true sections

### Sprint 2 - Figma View Implementation
- Each person implements assigned views with reusable shared components
- Keep one source of truth for design tokens/colors

### Sprint 3 - Integrations & Finalization
- Firebase auth finish
- Google Analytics + Hotjar with real IDs
- QA pass, deploy, and README evidence screenshots

## Merge Strategy

- Daily sync (15 min): blockers + naming consistency + component reuse check
- Merge order:
  1. shared/layout PRs
  2. auth/wizard PRs
  3. dashboard/data PRs
- Before merge to `main`: run `npm run build` and `npm run lint`
