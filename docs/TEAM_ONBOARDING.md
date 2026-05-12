# Team Onboarding (from clone to first PR)

Use this checklist when a teammate starts working on the project.

## 1) Local setup

1. Clone repository.
2. Install dependencies:
   - `npm install`
3. Prepare environment:
   - copy `.env.example` -> `.env`
   - fill Firebase and analytics values (or ask teammate for test values)
4. Run app:
   - `npm run dev`
5. Quick quality check:
   - `npm run lint`
   - `npm run build`

## 2) Git setup for this project

1. Start from `main`.
2. Create personal branch:
   - `dev_<surname>`
3. Optional task branch from personal branch:
   - `feat/<route-or-module>`
4. Never commit directly to `main`.

## 3) What to read before coding

1. `docs/DESIGN_SYSTEM.md`
2. `docs/PAGE_DEVELOPMENT_GUIDE.md`
3. `docs/TEAM_PLAN.md`
4. `docs/REQUIREMENTS_COVERAGE.md`

## 4) First implementation task

1. Pick one assigned route.
2. Implement in dedicated `src/pages/...` file.
3. Reuse shared UI from `src/shared/components/ui`.
4. Keep route contract unchanged unless team agrees.

## 5) Before opening PR

1. Sync with `main`.
2. Resolve conflicts.
3. Run:
   - `npm run lint`
   - `npm run build`
4. Add screenshots (desktop + mobile) and Figma frame reference.

## 6) Common mistakes to avoid

- Duplicating shared components (Button/Input/Card variants).
- Changing route paths without team notice.
- Mixing inconsistent spacing/colors versus design system.
- Leaving TODOs without noting them in PR description.
