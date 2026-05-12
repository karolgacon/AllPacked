# Screen Definition of Done (DoD)

Use this checklist before marking any screen as complete.

## Global rule

A screen is "done" only if all sections below are satisfied.

## 1) Route and navigation

- [ ] Route exists and matches agreed path.
- [ ] Screen is reachable from app navigation or clear CTA flow.
- [ ] No full-page reload during navigation (SPA behavior).
- [ ] Back/next navigation works as expected (especially in wizard screens).

## 2) Figma alignment

- [ ] Section order matches Figma frame.
- [ ] Main CTA is in expected position and visual priority.
- [ ] Key UI blocks from frame are present (header, cards, actions, helpers).
- [ ] Spacing/typography/colors follow `docs/DESIGN_SYSTEM.md`.

## 3) UI consistency

- [ ] Shared UI components are used (`Button`, `Input`, `Card`, etc.).
- [ ] No duplicated local variant of existing shared component.
- [ ] Empty/loading/error state exists where needed.
- [ ] Mobile and desktop layouts are both checked.

## 4) Accessibility and UX

- [ ] Inputs/buttons are keyboard reachable.
- [ ] Labels/placeholders/error messages are clear and readable.
- [ ] Contrast is acceptable for text and actions.
- [ ] Interactive states exist (hover/focus/disabled where relevant).

## 5) Data and state behavior

- [ ] State updates correctly (forms, toggles, selections, filters).
- [ ] Validation errors are handled and visible to user.
- [ ] No uncaught runtime errors in console during normal flow.
- [ ] Auth-protected screens remain behind route guard.

## 6) Code quality

- [ ] Screen code is in dedicated `src/pages/...` file.
- [ ] Reusable logic/components extracted to `src/features` or `src/shared`.
- [ ] No hardcoded secrets/API keys.
- [ ] Naming follows project conventions.

## 7) PR readiness

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] PR includes desktop and mobile screenshots.
- [ ] PR description references implemented Figma frame(s).
- [ ] Any remaining TODO is explicitly listed.

## 8) Project requirement evidence

For final submission, ensure these evidences are collected:

- [ ] At least one screenshot per implemented screen.
- [ ] Google Analytics realtime/report screenshot(s).
- [ ] Hotjar/ContentSquare installation or recordings screenshot(s).
- [ ] Final README updated with evidence section.
