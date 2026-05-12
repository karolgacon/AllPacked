# Page Development Guide (Team)

How each teammate should implement new pages so code and UI stay consistent.

## 1) Before You Start a Page

1. Pick one route from the board (no duplicate ownership).
2. Work from your personal branch: `dev_<surname>`.
3. Optional: create task branch from it: `feat/<route-name>`.
4. Keep `main` protected for reviewed merges only.
5. Synchronize your `dev_<surname>` with `main` regularly.
6. Read:
   - `docs/DESIGN_SYSTEM.md`
   - `docs/TEAM_PLAN.md`
7. Confirm required data/state for that screen in team chat.

## 2) File Placement Rules

- Route-level screen component: `src/pages/`
- Reusable feature-specific blocks: `src/features/<feature-name>/`
- Truly shared blocks/layout/helpers: `src/shared/`
- Do not put business logic directly in `AppShell` or router.

### Recommended page split rule

- If a page exceeds ~150 lines, split it:
  - view shell in `pages`
  - reusable blocks in `features/<area>/components`
  - API/state logic in `features/<area>/hooks` or `features/<area>/services`

## 3) Page Implementation Checklist

For every page:

1. Replace placeholder in `src/pages/index.tsx` (or split to dedicated file if page grows).
2. Keep a clear structure:
   - `header` section (title + subtitle)
   - `content` section(s)
   - `action` section (buttons/navigation)
3. Reuse existing utility classes and style rules from design system.
4. Add empty/loading/error UI states when page consumes async data.
5. Keep text labels in one tone/style (English, concise, action-oriented).

## 4) Code Quality Rules

- Use typed props/interfaces for reusable components.
- Keep component functions short; extract complex pieces.
- Avoid copy-paste blocks; extract repeated UI to reusable components.
- No direct `window.location.assign`; use React Router navigation.
- No hardcoded secrets or API keys in code.
- Keep all user-facing text in English (project convention).
- Prefer composition over deeply nested conditional JSX.

## 4.1) Route Contract Rules (critical)

- Do not rename existing routes without team approval.
- Every new route must be linked from navigation or via explicit CTA.
- Keep fallback 404 route untouched.
- Public routes: login/register only.
- Protected app routes must stay behind auth guard.

## 5) Pull Request Rules

Each PR must contain:

- [ ] One clear feature scope
- [ ] Screenshot(s): desktop + mobile
- [ ] Route tested manually
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Brief note: what was reused vs newly created
- [ ] Reference to Figma frame(s) implemented
- [ ] Mention if any planned TODO remains

### Commit message convention

- `feat: ...` for new screens/features
- `fix: ...` for bug fixes
- `refactor: ...` for code cleanup without behavior changes
- `docs: ...` for docs-only updates

### Commit frequency rule

- Commit systematically, not in one large batch.
- Minimum expectation: one commit per meaningful progress chunk
  (e.g., layout complete, form complete, responsive pass complete).

## 6) Review Rules (for teammates)

When reviewing, check:

1. Visual consistency with `docs/DESIGN_SYSTEM.md`
2. Correct folder and naming conventions
3. Router path is unchanged unless intentionally discussed
4. No regressions in auth flow/guards/layout

## 7) Daily Collaboration Loop (15 min)

- What was finished yesterday?
- What page is in progress now?
- Any reusable component discovered that others should use?
- Any naming/styling mismatch to align today?

## 8) Conflict Prevention Checklist

Before opening PR, check:

1. Did I create any duplicate component that already exists in `shared`?
2. Did I introduce a different shade/font/spacing than design system?
3. Did I modify route paths used by other teammates?
4. Did I change shared layout behavior without team notice?
