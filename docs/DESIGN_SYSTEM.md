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

- Product: **AllPacked — Virtual Packing Assistant**
- Style direction: clean dashboard UI, high readability, low cognitive load
- UX rule: each screen must expose one primary action
- Styling system: **Tailwind CSS v4** with design tokens in `src/index.css` (`@theme`)

## 2) Colors

All tokens are defined in `src/index.css` and exposed as Tailwind utilities (e.g. `text-brand-primary`, `bg-app-canvas`).

| Token | Hex | Tailwind utility | Usage |
|-------|-----|------------------|-------|
| `brand-primary` | `#0059BB` | `bg-brand-primary`, `text-brand-primary` | Primary buttons, logo links, active accents |
| `brand-primary-hover` | `#004A99` | `hover:bg-brand-primary-hover` | Primary button hover |
| `brand-navy` | `#002E5C` | `text-brand-navy` | Page headings, deep accents |
| `brand-sky` | `#B3D1EE` | `bg-brand-sky` | Light highlights, icon backgrounds |
| `brand-bg` | `#EFF5FB` | `bg-brand-bg` | Soft blue tint (nav hover, secondary surfaces) |
| `brand-accent` | `#0077CC` | `text-brand-accent` | Secondary blue accent |
| `brand-success` | `#43A047` | `text-brand-success` | Success / packed states |
| `brand-danger` | `#E53935` | `text-brand-danger` | Errors, destructive alerts |
| `brand-text` | `#455A64` | `text-brand-text` | Body text, labels, subtitles |
| `brand-border` | `#D8E3EF` | `border-brand-border` | Input borders, dividers |
| `app-canvas` | `#F0F2F5` | `bg-app-canvas` | Logged-in app main background |

### Background rules (Figma)

| Context | Class / pattern | Notes |
|---------|-----------------|-------|
| Auth pages (login, register) | `.auth-page-bg` | Radial gradient from top-left + suitcase watermark |
| Logged-in app | `bg-app-canvas` | **Flat neutral gray — no gradient** |
| Sidebar | `bg-white` | Fixed left column, `w-64` |
| Content cards | `bg-white` + shadow | White panels on gray canvas for contrast |

Do **not** use hardcoded Tailwind blues (`blue-600`, `blue-900`) or legacy Material colors (`#2196F3`, `#1976D2`). Always use brand tokens.

## 3) Typography

- Font stack: `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` (set in `index.css`)
- Headings:
  - `h1`: 32px / semibold — `text-3xl font-semibold text-brand-navy` (`SectionHeader` default)
  - `h2`: 24px / semibold — `text-2xl font-semibold text-brand-navy`
  - `h3`: 20px / semibold — `text-xl font-semibold text-brand-navy`
- Body:
  - default: 16px / regular
  - secondary/help: 14px / regular — `text-sm text-brand-text`
- Tiny labels (auth forms): 11px / semibold uppercase — `text-[11px] font-semibold uppercase tracking-wider text-brand-text`

## 4) Spacing and Layout

- Base spacing unit: `4px`
- Preferred spacing scale: `4, 8, 12, 16, 24, 32, 40`
- Card radius: `16px` (`rounded-2xl`)
- Input/button radius: `12px` (`rounded-xl`)
- Auth card max width: `560px`
- App main content max width: `max-w-6xl` (inside `AppShell`)
- Sidebar width: `w-64`

### App shell (`src/shared/layout/AppShell.tsx`)

- Left sidebar: logo, nav with icons, bottom **New Trip** CTA, bell + profile avatar
- Active nav item: `bg-brand-primary/10 text-brand-primary` (light blue tint, not solid fill)
- Inactive nav item: `text-brand-text` with gray icon
- Main area: `bg-app-canvas`, content in white `Card` components

### Auth shell (`src/shared/layout/AuthShell.tsx`)

- Centered white card on gradient background
- Card: `max-w-[560px]`, white, rounded, subtle shadow

## 5) Component Contracts

### Buttons (`Button`)

- **Primary**: `bg-brand-primary text-white hover:bg-brand-primary-hover`, full width by default
- **Secondary**: `border border-brand-border bg-white text-slate-700 hover:bg-brand-bg`
- Props: `variant`, `fullWidth`, standard button HTML attributes

### Inputs

- **`Input`**: basic text field
- **`InputField`**: input with optional left/right icons (mail, lock, eye toggle)
- Height: ~40px (`py-2.5`)
- Border: `border-brand-border`, focus: `focus:border-brand-primary focus:ring-brand-primary/20`
- Auth labels: use `AuthFieldLabel` from `features/auth/components/AuthLayoutParts.tsx`

### Cards (`Card`)

- White background on app canvas: `bg-white rounded-2xl border border-slate-200/90`
- Shadow: `shadow-[0_1px_2px_rgba(15,23,42,0.06),0_4px_16px_rgba(15,23,42,0.06)]`
- Padding: `p-6` default

### Section header (`SectionHeader`)

- Props: `title`, `subtitle?`, `action?` (right-side CTA slot), `as?` (`h1` | `h2` | `h3`)
- Use at top of every app page (outside `Card`)

### State components

- **`EmptyState`**: icon, title, description, optional action — white card on canvas
- **`LoadingState`**: spinner + message, `role="status"`
- **`ErrorState`**: white card, red title, optional retry button

### Auth layout parts (`features/auth/components/AuthLayoutParts.tsx`)

- `AuthBrand`, `AuthHeading`, `AuthFieldLabel`, `AuthDivider`, `AuthFooter`
- Use only on auth routes (`/login`, `/register`, `/forgot-password`)

### Icons (`src/shared/components/icons/index.tsx`)

Shared SVG icons: `MailIcon`, `LockIcon`, `EyeIcon`, `EyeOffIcon`, `GoogleIcon`, nav icons (`DashboardIcon`, `NewTripIcon`, `PackingListsIcon`, `StatsIcon`, `BellIcon`), `SuitcaseWatermark`.

## 5.1) Required Reusable Components (must be shared)

Implemented in `src/shared/components/ui/`:

- `Button`
- `Input`
- `InputField`
- `Card`
- `SectionHeader`
- `EmptyState`
- `LoadingState`
- `ErrorState`

Layouts in `src/shared/layout/`:

- `AppShell` — logged-in app
- `AuthShell` — public auth pages

If a page creates a duplicate of any of these locally, move it to shared in the same PR.

## 6) Accessibility Rules

- Minimum contrast close to WCAG AA for text and actions
- Every form field has label or clear placeholder + helper/error message
- Interactive elements need visible focus style
- Keyboard navigation must work on auth + wizard + list views
- Icon-only buttons require `aria-label` (e.g. password visibility toggle, notifications)

## 7) Screen Template Rule

Each **logged-in** page must follow this shape:

1. `SectionHeader` — title + one-line context (+ optional primary CTA in `action`)
2. Main content — white `Card`(s) or grid of cards on `app-canvas` background
3. Optional side panel (weather, trip summary, tips) — separate white card
4. Primary action visible without scrolling on desktop

Auth pages use `AuthBrand` + `AuthHeading` instead of `SectionHeader`.

## 8) Definition of Done for UI

- View matches Figma hierarchy and intent
- Uses brand tokens and shared components from this file
- Auth pages use gradient; app pages use flat `app-canvas` (no gradient)
- Works on mobile and desktop
- No ad-hoc styling that breaks consistency (no raw `blue-*` classes)
- Uses shared reusable components where applicable (no duplicate button/input/card variants)
