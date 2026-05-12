# AllPacked Design System

Single source of truth for UI consistency across the team.

## 0) Figma Matching Policy

- Goal is visual and structural fidelity, not 1:1 pixel-perfect copy.
- Match first: layout hierarchy, section order, CTA priority, spacing rhythm.
- Allowed tolerance:
  - spacing: +/- 4px
  - font size: +/- 1px
  - radius: +/- 2px
- If a Figma value conflicts with accessibility (contrast/readability), prioritize accessibility and note this in PR.

## 1) Brand Foundation

- Product: **AllPacked - Virtual Packing Assistant**
- Style direction: clean dashboard UI, high readability, low cognitive load
- UX rule: each screen must expose one primary action

## 2) Colors

Use these values consistently (mapped from project document + Figma intent).

- `--color-primary-900`: `#1A237E` (main titles, key labels)
- `--color-primary-600`: `#2196F3` (primary buttons, active nav)
- `--color-primary-700`: `#1976D2` (button hover)
- `--color-primary-100`: `#BBDEFB` (secondary backgrounds)
- `--color-bg`: `#F5F9FF` (app background)
- `--color-accent`: `#00BCD4` (stats accents, highlights)
- `--color-success`: `#43A047` (packed/success states)
- `--color-warning`: `#E53935` (errors, over-weight alerts)
- `--color-text-main`: `#0F172A`
- `--color-text-muted`: `#455A64`
- `--color-border`: `#CBD5E1`

## 3) Typography

- Font stack: `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif`
- Headings:
  - `h1`: 32px / semibold
  - `h2`: 24px / semibold
  - `h3`: 20px / semibold
- Body:
  - default: 16px / regular
  - secondary/help: 14px / regular
- Tiny labels: 12px / medium (for hints and metadata)

## 4) Spacing and Layout

- Base spacing unit: `4px`
- Preferred spacing scale: `4, 8, 12, 16, 24, 32, 40`
- Card radius: `16px` (`rounded-2xl`)
- Input/button radius: `12px` (`rounded-xl`)
- Main content max width: `max-w-7xl`
- Sidebar width: `w-64`

## 5) Component Contracts

- **Buttons**
  - Primary: filled blue (`bg-blue-600`, hover `bg-blue-700`, white text)
  - Secondary: border + neutral background
  - Danger: red background (`#E53935`), only destructive actions
- **Inputs**
  - Height minimum: `40px`
  - Border: subtle gray, clear focus state
  - Error state: red border + red helper text
- **Cards**
  - Always include: title, short context text, optional action footer
- **Lists/Rows**
  - Keep row spacing consistent (`gap-2` or `gap-3`)
- **Badges/Status**
  - Success -> green
  - Warning/error -> red
  - Info/neutral -> blue or gray

## 5.1) Required Reusable Components (must be shared)

To avoid duplicated implementations, these should be shared in `src/shared`:

- `Button`
- `Input`
- `Card`
- `SectionHeader` (title + subtitle)
- `EmptyState`
- `LoadingState`
- `ErrorState`

If a page creates one of these locally, move it to shared in the same PR.

## 6) Accessibility Rules

- Minimum contrast close to WCAG AA for text and actions
- Every form field has label or clear placeholder + helper/error message
- Interactive elements need visible focus style
- Keyboard navigation must work on auth + wizard + list views

## 7) Screen Template Rule

Each page must follow this shape:

1. Page title + one-line context
2. Main content area (card/grid/sections)
3. Optional right panel (weather/weight/tips)
4. Primary action visible without scrolling on desktop

## 8) Definition of Done for UI

- View matches Figma hierarchy and intent
- Uses shared colors/spacing/typography from this file
- Works on mobile and desktop
- No ad-hoc styling that breaks consistency
- Uses shared reusable components where applicable (no duplicate button/input/card variants)
