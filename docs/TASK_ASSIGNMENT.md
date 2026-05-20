# Podział zadań — 3 osoby (AllPacked)

Zrównoważony plan pracy na podstawie aktualnego kodu, dokumentacji w `docs/` oraz wymagań z checklisty projektu i prototypów Figma.

---

## Stan wyjściowy (co już jest)

| Obszar | Status |
|--------|--------|
| Routing wszystkich ekranów | Gotowe |
| Firebase (email, Google, guardy) | Gotowe (do dopracowania UI/UX) |
| GA + Hotjar | Gotowe technicznie |
| `Button`, `Input`, `Card` | Gotowe |
| Widoki Figma | Większość to **placeholdery** |
| Deploy + README ze screenami | **Do zrobienia przez zespół** |

Szacunkowo **~70% fundamentu** jest gotowe — zostaje **~30% pracy wizualnej/logiki biznesowej** + wspólne domknięcie.

---

## Zasada równowagi

Każda osoba dostaje:

- **~3–4 pełne ekrany** (lub 1 spójny moduł = 5 kroków kreatora),
- **współdziałanie w komponentach shared** (krótkie, na start),
- **część obowiązków końcowych** (deploy / dokumentacja).

Szacowany czas na osobę: **~25–40 h** (zależnie od tempa i szczegółowości Figmy).

---

## Osoba 1 — Platforma, auth, dashboard i wspólne UI

**Gałąź:** `dev_<nazwisko>` (np. `dev_gacon`)  
**Obszar:** `src/features/auth`, `src/shared/components/ui`, `src/shared/layout`, strony auth, `DashboardPage`

### Sprint 1 (tydzień 1) — odblokowanie zespołu

| # | Zadanie | Pliki / zakres | Szac. |
|---|---------|----------------|-------|
| 1.1 | Dopięcie **Login** wg Figmy (layout, „Forgot?”, OR CONTINUE WITH, link do rejestracji) | `LoginPage.tsx` | 4h |
| 1.2 | Dopięcie **Register** wg Figmy | `RegisterPage.tsx` | 3h |
| 1.3 | Shared: **SectionHeader** (tytuł + opis) | `shared/components/ui/` | 2h |
| 1.4 | Shared: **EmptyState**, **LoadingState**, **ErrorState** | `shared/components/ui/` | 4h |
| 1.5 | **AppShell** + **AuthShell** pod design system (kolory `#1A237E`, `#F5F9FF`, sidebar) | `AppShell.tsx`, `AuthShell.tsx` | 4h |

### Sprint 2

| # | Zadanie | Pliki | Szac. |
|---|---------|-------|-------|
| 2.1 | **Dashboard** (welcome, KPI, recent trips, CTA „Create New Packing List”) | `DashboardPage.tsx` + ewent. `features/dashboard/` | 7h |
| 2.2 | **Profile** (Figma: dane, preferencje transport/klimat, ustawienia konta, pojemność walizki) | `ProfilePage.tsx` + ewent. `features/profile/` | 8h |
| 2.3 | Lepsze komunikaty błędów auth (user-friendly zamiast surowego Firebase) | `firebaseAuth` / strony auth | 2h |
| 2.4 | Code review PR od osób 2 i 3 (spójność `Button`/`Input`/`Card`) | — | 2h |

### Sprint 3 — wspólne domknięcie

| # | Zadanie | Szac. |
|---|---------|-------|
| 3.1 | Weryfikacja auth na deploy (HTTPS, Google login) | 2h |
| 3.2 | Screeny do README: Login, Register, Dashboard, Profile | 1h |
| 3.3 | Udział w QA całej aplikacji | 2h |

**Razem osoba 1:** ~41 h

---

## Osoba 2 — Kreator podróży (wizard)

**Gałąź:** `dev_<nazwisko>` (np. `dev_kaczowka`)  
**Obszar:** `src/pages/new-trip/*`, `src/features/trip-wizard/`

Największy **spójny moduł logiczny** — 5 ekranów, jeden kontekst stanu.

### Sprint 1

| # | Zadanie | Pliki | Szac. |
|---|---------|-------|-------|
| 2.1 | **TripWizardContext** (destination, dates, transport, activities, overview) + hook `useTripWizard` | `features/trip-wizard/` | 5h |
| 2.2 | Komponent **WizardStepper** (Destination → Dates → Transport → Activities) | `features/trip-wizard/components/` | 3h |
| 2.3 | **Destination** (miasto, quick selection Paris/NY/Bali, panel pogody) | `NewTripDestinationPage.tsx` | 5h |

### Sprint 2

| # | Zadanie | Szac. |
|---|---------|-------|
| 2.4 | **Dates** (kalendarz, trip summary, tip sezonowy) | 6h |
| 2.5 | **Transport** (karty Train/Plane/Car, selected state) | 4h |
| 2.6 | **Activities** (trip type + multi-select aktywności) | 5h |
| 2.7 | **Overview** (podsumowanie, pogoda, finalize trip) | 5h |
| 2.8 | Nawigacja Cancel / Go Back / Next Step między krokami | 2h |

### Sprint 3

| # | Zadanie | Szac. |
|---|---------|-------|
| 3.1 | Test pełnego flow kreatora end-to-end | 2h |
| 3.2 | Screeny README: 5 kroków kreatora | 1h |
| 3.3 | QA + poprawki po review | 2h |

**Razem osoba 2:** ~40 h

---

## Osoba 3 — Widoki danych i domknięcie projektu

**Gałąź:** `dev_<nazwisko>` (np. `dev_jakala`)  
**Obszar:** `PackingListsPage`, `StatsPage`, `NotFoundPage`

### Sprint 1

| # | Zadanie | Szac. |
|---|---------|-------|
| 3.1 | **NotFound** (404) — szybki, spójny z design system | 1h |
| 3.2 | Start **Packing Lists** (szkielet layoutu + kategorie) | 3h |

### Sprint 2

| # | Zadanie | Szac. |
|---|---------|-------|
| 3.3 | Dokończenie **Packing Lists** (postęp %, waga, quick actions, stany UI) | 7h |
| 3.4 | **Stats** (KPI, wykresy/mock chart, top destinations, pro tip) | 8h |

### Sprint 3

| # | Zadanie | Szac. |
|---|---------|-------|
| 3.5 | **Deploy** (Vercel/Netlify/Railway) + env na produkcji | 4h |
| 3.6 | Screeny README: Packing Lists, Stats, 404 | 1h |
| 3.7 | Screeny **GA Realtime** + **Hotjar** (wymaganie zaliczenia) | 2h |
| 3.8 | Aktualizacja README — sekcja Evidence / screenshots | 2h |
| 3.9 | QA całej aplikacji | 2h |

**Razem osoba 3:** ~30 h (+ deploy/docs — uzupełnia czas do ~37 h łącznie z obowiązkami końcowymi)

---

## Wspólne zadania (wszyscy)

| Zadanie | Kiedy |
|---------|-------|
| Przeczytać `TEAM_ONBOARDING.md`, `DESIGN_SYSTEM.md`, `SCREEN_DOD_CHECKLIST.md` | Dzień 1 |
| Gałąź `dev_<nazwisko>` + commity po każdym ukończonym bloku UI | Ciągle |
| PR z checklistą + screen desktop + mobile | Po każdym ekranie |
| `npm run lint` + `npm run build` przed merge do `main` | Każdy PR |
| 15 min daily sync (blokery, reuse komponentów) | Codziennie |

### Kolejność merge (mniej konfliktów)

1. Osoba 1 → shared UI + layout + dashboard  
2. Osoba 2 → wizard  
3. Osoba 3 → packing lists + stats views  
4. Wspólnie → deploy + README  

---

## Mapowanie: Figma → osoba

| Ekran Figma | Osoba |
|-------------|-------|
| Login / Register | **1** |
| Dashboard | **1** |
| Packing list (checklist + waga) | **3** |
| Profile | **1** |
| Stats | **3** |
| Wizard: Destination, Dates, Transport, Activities, Overview | **2** |
| 404 | **3** |

---

## Checklist zaliczenia — podział dowodów

| Wymaganie | Odpowiedzialność |
|-----------|------------------|
| Odwzorowanie prototypu | Wszyscy (własne ekrany) |
| Routing + pages | Już jest |
| Komponenty reużywalne | **Osoba 1** (dopina shared) |
| Firebase auth | **Osoba 1** (utrzymanie) |
| Hotjar | **Osoba 3** (screeny z panelu) |
| Google Analytics | **Osoba 3** (screeny Realtime) |
| Deploy | **Osoba 3** (lead) |
| README ze screenami | **Osoba 3** (składa), **1** i **2** dostarczają swoje |

---

## Powiązane dokumenty

- `docs/TEAM_PLAN.md` — role i git flow  
- `docs/TEAM_ONBOARDING.md` — start od zera  
- `docs/DESIGN_SYSTEM.md` — kolory, komponenty  
- `docs/PAGE_DEVELOPMENT_GUIDE.md` — jak pisać strony  
- `docs/SCREEN_DOD_CHECKLIST.md` — kiedy ekran jest „gotowy”  
- `docs/REQUIREMENTS_COVERAGE.md` — mapa wymagań projektu  

---

## Werdykt

Szkielet spełnia założenia projektu technicznie; do zaliczenia brakuje głównie:

1. finalnych widoków z Figmy (wg `SCREEN_DOD_CHECKLIST.md`),  
2. deploy na HTTPS,  
3. README z dowodami (app + GA + Hotjar).

Podział jest zbliżony czasowo: osoba 1 — auth, dashboard, profile i shared UI; osoba 2 — wizard (5 kroków); osoba 3 — packing lists, stats, 404 oraz lead deploy i dokumentacja zaliczeniowa.
