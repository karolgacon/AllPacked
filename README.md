# AllPacked — aplikacja do planowania podróży i list pakowania

Aplikacja webowa (React + TypeScript) zrealizowana na podstawie prototypu Figma. Umożliwia logowanie użytkownika, planowanie podróży, generowanie list pakowania, podgląd statystyk oraz zarządzanie profilem.

**Zespół:** projekt zespołowy TPF  
**Repozytorium:** ten katalog  
**Produkcja (deploy):** `[WKLEJ URL — np. https://allpacked.vercel.app]`

---

## Spis treści

1. [Wymagania projektu — checklist](#1-wymagania-projektu--checklist)
2. [Tech stack](#2-tech-stack)
3. [Uruchomienie lokalne](#3-uruchomienie-lokalne)
4. [Konfiguracja środowiska](#4-konfiguracja-środowiska)
5. [Ekrany aplikacji — screeny](#5-ekrany-aplikacji--screeny)
6. [Routing (React Router)](#6-routing-react-router)
7. [Firebase Authentication](#7-firebase-authentication)
8. [Google Analytics](#8-google-analytics)
9. [Hotjar](#9-hotjar)
10. [Deploy aplikacji](#10-deploy-aplikacji)
11. [Struktura projektu](#11-struktura-projektu)
12. [Komponenty wielokrotnego użytku](#12-komponenty-wielokrotnego-użytku)
13. [Dokumentacja zespołowa](#13-dokumentacja-zespołowa)

---

## 1) Wymagania projektu — checklist

Poniższa tabela mapuje wymagania z **PROJEKT — CHECKLISTA** na implementację w tym repozytorium.

| Wymaganie | Status | Gdzie w projekcie |
|-----------|--------|-------------------|
| Odwzorowanie prototypu / makiety | ✅ | Ekrany w `src/pages/`, layout w `src/shared/layout/`, komponenty w `src/features/` |
| Każdy ekran dostępny przez React Router | ✅ | `src/app/router.tsx` |
| Widoki w folderze `pages/` | ✅ | `src/pages/` |
| Powtarzalne komponenty UI | ✅ | `src/shared/components/` — ui, auth, trip, stats, icons |
| Stylowanie (spójne, czytelne) | ✅ | Tailwind CSS — `src/index.css`, `docs/DESIGN_SYSTEM.md` |
| Logowanie Firebase | ✅ | `src/features/auth/`, chronione trasy w `src/shared/routing/RouteGuards.tsx` |
| Hotjar | ✅ | `src/shared/analytics/BootstrapAnalytics.tsx` |
| Google Analytics (pageview przy zmianie trasy) | ✅ | `BootstrapAnalytics.tsx` + `src/shared/analytics/PageViewTracker.tsx` |
| Deploy aplikacji | ⬜ | `Dockerfile`, `Caddyfile`, `railway.toml` — sekcja [Deploy](#10-deploy-aplikacji-railway) |
| README ze screenami (app + GA + Hotjar) | ⬜ | Sekcje [5](#5-ekrany-aplikacji--screeny), [8](#8-google-analytics), [9](#9-hotjar) — **wklej pliki PNG** |

**Dodatki (plus z checklisty):** chronione trasy (`PrivateRoute`), zagnieżdżony routing (auth / app shell / wizard), wspólny layout (`AppShell`, `AuthShell`), strona 404 (`NotFoundPage`).

---

## 2) Tech stack

- **React 19** + **TypeScript**
- **Vite** — bundler i dev server
- **React Router 7** — routing SPA
- **Tailwind CSS 4** — jedyna metoda stylowania
- **Firebase Authentication** — logowanie e-mail/hasło, Google, reset hasła
- **react-ga4** — Google Analytics 4
- **@hotjar/browser** — Hotjar

---

## 3) Uruchomienie lokalne

```bash
npm install
cp .env.example .env   # Windows: copy .env.example .env
# Uzupełnij .env — patrz sekcja 4
npm run dev
```

Aplikacja domyślnie: `http://localhost:5173`

**Build produkcyjny:**

```bash
npm run build
npm run preview
```

**Lint:**

```bash
npm run lint
```

---

## 4) Konfiguracja środowiska

Skopiuj `.env.example` → `.env` i uzupełnij wartości.

| Zmienna | Opis |
|---------|------|
| `VITE_FIREBASE_*` | Konfiguracja web app z Firebase Console |
| `VITE_GA_MEASUREMENT_ID` | ID pomiaru GA4 (`G-XXXXXXXXXX`) |
| `VITE_HOTJAR_SITE_ID` | Site ID z panelu Hotjar |
| `VITE_HOTJAR_VERSION` | Wersja skryptu Hotjar (domyślnie `6`) |
| `VITE_ENABLE_ANALYTICS` | `true` — włącza GA i Hotjar; `false` — wyłącza lokalnie |

**Lokalnie:** możesz zostawić `VITE_ENABLE_ANALYTICS=false`, aby nie wysyłać zdarzeń podczas developmentu.

**Produkcja / oddanie projektu:** ustaw `VITE_ENABLE_ANALYTICS=true` oraz poprawne ID w panelu hostingu (Vercel, Netlify, Railway itd.).

Szczegółowa instrukcja analytics: [`docs/ANALYTICS_SETUP.md`](docs/ANALYTICS_SETUP.md)

---

## 5) Ekrany aplikacji — screeny

Wszystkie ekrany z prototypu są zaimplementowane. Poniżej lista tras wraz z **miejscami na screeny**.

Screeny zapisuj w folderze: **`docs/screenshots/`**  
Po dodaniu plików zamień ścieżki w README (z `[WKLEJ]` na rzeczywiste nazwy plików).

---

### 5.1 Autoryzacja

#### Login — `/login`

> **[WKLEJ SCREEN]**  
> **Plik:** `docs/screenshots/01-login.png`  
> **Co sfotografować:** pełny ekran logowania — formularz e-mail/hasło, przycisk Google, linki Register / Forgot password. Widok desktop (1920px) lub mobile.

![Login — WKLEJ: docs/screenshots/01-login.png](docs/screenshots/01-login.png)

#### Rejestracja — `/register`

> **[WKLEJ SCREEN]**  
> **Plik:** `docs/screenshots/02-register.png`  
> **Co sfotografować:** formularz rejestracji z polami imię, e-mail, hasło, potwierdzenie hasła.

![Register — WKLEJ: docs/screenshots/02-register.png](docs/screenshots/02-register.png)

#### Reset hasła — `/forgot-password`

> **[WKLEJ SCREEN]**  
> **Plik:** `docs/screenshots/03-forgot-password.png`  
> **Co sfotografować:** ekran „Forgot password” z polem e-mail i przyciskiem wysyłki.

![Forgot password — WKLEJ: docs/screenshots/03-forgot-password.png](docs/screenshots/03-forgot-password.png)

---

### 5.2 Dashboard — `/dashboard`

> **[WKLEJ SCREEN]**  
> **Plik:** `docs/screenshots/04-dashboard.png`  
> **Co sfotografować:** hero z przyciskiem „Create New Packing List”, wiersz statystyk (Total Trips, Items Packed, Packing Efficiency), sekcja Recent Trips z kartami podróży, widoczne menu boczne z profilem.

![Dashboard — WKLEJ: docs/screenshots/04-dashboard.png](docs/screenshots/04-dashboard.png)

---

### 5.3 Planowanie podróży (wizard) — `/new-trip/*`

> **[WKLEJ SCREEN]**  
> **Plik:** `docs/screenshots/05-new-trip-destination.png`  
> **Co sfotografować:** krok 1 — wybór destynacji (Destination).

![New Trip — Destination — WKLEJ: docs/screenshots/05-new-trip-destination.png](docs/screenshots/05-new-trip-destination.png)

> **[WKLEJ SCREEN]**  
> **Plik:** `docs/screenshots/06-new-trip-overview.png`  
> **Co sfotografować:** ekran podsumowania (Overview) z przyciskiem **Finalize Trip** — najlepiej z wypełnionymi danymi i pogodą.

![New Trip — Overview — WKLEJ: docs/screenshots/06-new-trip-overview.png](docs/screenshots/06-new-trip-overview.png)

*(Opcjonalnie dodatkowe screeny kroków: `07-dates.png`, `08-transport.png`, `09-activities.png`.)*

---

### 5.4 Listy pakowania

#### Indeks — `/packing-lists`

> **[WKLEJ SCREEN]**  
> **Plik:** `docs/screenshots/10-packing-lists.png`  
> **Co sfotografować:** siatka kart podróży + karta „Start planning”.

![Packing Lists — WKLEJ: docs/screenshots/10-packing-lists.png](docs/screenshots/10-packing-lists.png)

#### Szczegóły listy — `/packing-lists/:tripId`

> **[WKLEJ SCREEN]**  
> **Plik:** `docs/screenshots/11-packing-list-detail.png`  
> **Co sfotografować:** widok 3-kolumnowy — pogoda, lista z kategoriami (np. Clothing & weather), panel wagi bagażu, kilka zaznaczonych checkboxów.

![Packing List Detail — WKLEJ: docs/screenshots/11-packing-list-detail.png](docs/screenshots/11-packing-list-detail.png)

---

### 5.5 Statystyki (raporty) — `/stats`

> **[WKLEJ SCREEN]**  
> **Plik:** `docs/screenshots/12-stats.png`  
> **Co sfotografować:** nagłówek „Travel Statistics”, karty KPI, wykres „Trips per Month”, sekcje Packing Habits i Top Destinations.

![Stats — WKLEJ: docs/screenshots/12-stats.png](docs/screenshots/12-stats.png)

---

### 5.6 Profil — `/profile`

> **[WKLEJ SCREEN]**  
> **Plik:** `docs/screenshots/13-profile.png`  
> **Co sfotografować:** nagłówek z awatarem i lokalizacją, statystyki użytkownika, preferencje podróży, sekcja Account Settings z wagą walizki.

![Profile — WKLEJ: docs/screenshots/13-profile.png](docs/screenshots/13-profile.png)

---

### 5.7 Strona 404 — dowolna nieistniejąca trasa

> **[WKLEJ SCREEN]**  
> **Plik:** `docs/screenshots/14-not-found.png`  
> **Co sfotografować:** ekran błędu 404 po wejściu na np. `/nie-istnieje`.

![404 — WKLEJ: docs/screenshots/14-not-found.png](docs/screenshots/14-not-found.png)

---

## 6) Routing (React Router)

Konfiguracja: `src/app/router.tsx`

| Trasa | Komponent strony | Dostęp |
|-------|------------------|--------|
| `/login` | `LoginPage` | publiczny |
| `/register` | `RegisterPage` | publiczny |
| `/forgot-password` | `ForgotPasswordPage` | publiczny |
| `/` | przekierowanie → `/dashboard` | po zalogowaniu |
| `/dashboard` | `DashboardPage` | po zalogowaniu |
| `/new-trip/destination` | `NewTripDestinationPage` | po zalogowaniu |
| `/new-trip/dates` | `NewTripDatesPage` | po zalogowaniu |
| `/new-trip/transport` | `NewTripTransportPage` | po zalogowaniu |
| `/new-trip/activities` | `NewTripActivitiesPage` | po zalogowaniu |
| `/new-trip/overview` | `NewTripOverviewPage` | po zalogowaniu |
| `/packing-lists` | `PackingListsPage` | po zalogowaniu |
| `/packing-lists/:tripId` | `PackingListDetailPage` | po zalogowaniu |
| `/stats` | `StatsPage` | po zalogowaniu |
| `/profile` | `ProfilePage` | po zalogowaniu |
| `*` | `NotFoundPage` | fallback 404 |

Nawigacja odbywa się bez przeładowania strony (SPA). Trasy chronione: `PrivateRoute` w `src/shared/routing/RouteGuards.tsx`.

---

## 7) Firebase Authentication

### Konfiguracja (jednorazowo)

1. Utwórz projekt w [Firebase Console](https://console.firebase.google.com/).
2. Dodaj aplikację **Web** i skopiuj config do `.env` (`VITE_FIREBASE_*`).
3. **Authentication → Sign-in method:** włącz **Email/Password** i **Google**.
4. **Authentication → Settings → Authorized domains:** dodaj `localhost` oraz domenę produkcyjną po deployu.

### Implementacja w kodzie

| Element | Plik |
|---------|------|
| `initializeApp` + `getAuth` | `src/features/auth/firebaseAuth.ts` |
| Formularz logowania | `src/pages/LoginPage.tsx` |
| Rejestracja | `src/pages/RegisterPage.tsx` |
| Reset hasła | `src/pages/ForgotPasswordPage.tsx` |
| Wylogowanie | `src/pages/ProfilePage.tsx` |
| Chronione trasy | `src/shared/routing/RouteGuards.tsx` |

### Test akceptacyjny

1. Zarejestruj konto na `/register`.
2. Zaloguj się na `/login` (e-mail lub Google).
3. Sprawdź przekierowanie na `/dashboard`.
4. Wejdź na `/profile` — widoczne imię i e-mail.
5. Wyloguj się z profilu — powrót do `/login`.
6. Wejdź na `/dashboard` bez sesji — przekierowanie na `/login`.

> **[WKLEJ SCREEN — opcjonalnie]**  
> **Plik:** `docs/screenshots/15-firebase-auth-users.png`  
> **Co sfotografować:** Firebase Console → Authentication → Users z co najmniej jednym testowym kontem (można zacenzurować e-mail).

![Firebase Auth Users — WKLEJ: docs/screenshots/15-firebase-auth-users.png](docs/screenshots/15-firebase-auth-users.png)

---

## 8) Google Analytics

### Integracja

- Inicjalizacja: `ReactGA.initialize()` w `src/shared/analytics/BootstrapAnalytics.tsx`
- Pageview przy zmianie trasy: `src/shared/analytics/PageViewTracker.tsx` (nasłuch `useLocation`)

Wymaga: `VITE_ENABLE_ANALYTICS=true` oraz `VITE_GA_MEASUREMENT_ID=G-...`

### Weryfikacja

1. Uruchom aplikację z włączonym analytics.
2. Przejdź między trasami: `/dashboard` → `/stats` → `/packing-lists`.
3. Otwórz **Google Analytics 4 → Reports → Realtime**.

> **[WKLEJ SCREEN — WYMAGANE]**  
> **Plik:** `docs/screenshots/16-google-analytics-realtime.png`  
> **Co sfotografować:** widok **GA4 Realtime** z co najmniej 1 aktywnym użytkownikiem i widocznymi odsłonami stron (`/dashboard`, `/stats` itd.). Data i nazwa property muszą być czytelne.

![Google Analytics Realtime — WKLEJ: docs/screenshots/16-google-analytics-realtime.png](docs/screenshots/16-google-analytics-realtime.png)

> **[WKLEJ SCREEN — opcjonalnie]**  
> **Plik:** `docs/screenshots/17-google-analytics-pages.png`  
> **Co sfotografować:** raport **Pages and screens** (lub Events) z listą odwiedzonych ścieżek aplikacji.

![GA Pages — WKLEJ: docs/screenshots/17-google-analytics-pages.png](docs/screenshots/17-google-analytics-pages.png)

---

## 9) Hotjar

### Integracja

- Pakiet: `@hotjar/browser`
- Inicjalizacja: `Hotjar.init(siteId, version)` w `src/shared/analytics/BootstrapAnalytics.tsx`

Wymaga: `VITE_ENABLE_ANALYTICS=true` oraz `VITE_HOTJAR_SITE_ID=...`

### Weryfikacja

1. W panelu Hotjar dodaj URL aplikacji (localhost lub produkcja).
2. Uruchom aplikację, klikaj po ekranach przez ~1 minutę.
3. W Hotjar sprawdź **Verify installation** lub **Recordings**.

> **[WKLEJ SCREEN — WYMAGANE]**  
> **Plik:** `docs/screenshots/18-hotjar-installation.png`  
> **Co sfotografować:** panel Hotjar z potwierdzeniem **Tracking code installed** / **Receiving data** dla Waszej domeny.

![Hotjar installation — WKLEJ: docs/screenshots/18-hotjar-installation.png](docs/screenshots/18-hotjar-installation.png)

> **[WKLEJ SCREEN — WYMAGANE]**  
> **Plik:** `docs/screenshots/19-hotjar-recording.png`  
> **Co sfotografować:** lista **Recordings** (lub Heatmap) z co najmniej jedną sesją na aplikacji AllPacked — widać miniaturę / czas trwania / URL.

![Hotjar recordings — WKLEJ: docs/screenshots/19-hotjar-recording.png](docs/screenshots/19-hotjar-recording.png)

---

## 10) Deploy aplikacji (Railway)

Projekt jest skonfigurowany pod **Railway** z Dockerfile + Caddy (oficjalna rekomendacja dla React SPA z React Router).

Pliki deployu w repozytorium:

| Plik | Rola |
|------|------|
| `Dockerfile` | build Vite → serwowanie `dist/` przez Caddy |
| `Caddyfile` | SPA fallback (`try_files` → `index.html`), port `$PORT` |
| `railway.toml` | healthcheck `/health`, builder Docker |
| `.dockerignore` | m.in. wyklucza `.env` z obrazu |

### Krok 1 — Railway + GitHub

1. Załóż konto na [railway.com](https://railway.com/) (możesz przez GitHub).
2. **New Project** → **Deploy from GitHub repo**.
3. Wybierz repozytorium `karolgacon/AllPacked` (lub fork).
4. Railway wykryje `Dockerfile` i uruchomi build automatycznie.

### Krok 2 — zmienne środowiskowe (WAŻNE)

Vite wstawia `VITE_*` **w czasie buildu**. Ustaw zmienne w Railway **przed** deployem (lub zrób **Redeploy** po ich dodaniu):

**Railway → Service → Variables → Raw Editor** — wklej (z własnymi wartościami):

```env
VITE_APP_NAME=AllPacked
VITE_ENABLE_ANALYTICS=true
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_GA_MEASUREMENT_ID=G-...
VITE_HOTJAR_SITE_ID=...
VITE_HOTJAR_VERSION=6
```

Bez tych zmiennych build przejdzie, ale Firebase i analytics nie zadziałają na produkcji.

### Krok 3 — publiczny URL

1. Railway → Service → **Settings** → **Networking**.
2. Kliknij **Generate Domain** (np. `allpacked-production.up.railway.app`).
3. Skopiuj URL i wklej:
   - na górze tego README (linia **Produkcja**),
   - poniżej w sekcji **Publiczny URL**.

**Publiczny URL aplikacji:** `[WKLEJ URL PRODUKCYJNY — np. https://allpacked-production.up.railway.app]`

### Krok 4 — Firebase, GA, Hotjar po deployu

1. **Firebase Console** → Authentication → Authorized domains → dodaj domenę Railway (bez `https://`).
2. **Google Analytics** → Admin → Web stream → dodaj URL produkcyjny.
3. **Hotjar** → Site settings → dodaj ten sam URL.

### Krok 5 — deploy z CLI (alternatywa)

```bash
npm i -g @railway/cli
railway login
cd AllPacked
railway init          # nowy projekt lub link do istniejącego
railway variables set VITE_ENABLE_ANALYTICS=true  # + pozostałe VITE_*
railway up            # upload + build + deploy
railway domain        # wygeneruj publiczny URL
```

### Weryfikacja deployu

- [ ] Build w Railway: status **Success**
- [ ] `/login` i `/dashboard` działają (routing SPA — odświeżenie strony nie daje 404)
- [ ] Logowanie Firebase działa na domenie Railway
- [ ] GA Realtime / Hotjar widzą ruch z produkcji

> **[WKLEJ SCREEN — WYMAGANE]**  
> **Plik:** `docs/screenshots/20-deploy-live.png`  
> **Co sfotografować:** działająca aplikacja pod adresem Railway — np. Dashboard po zalogowaniu (w pasku adresu widać `*.up.railway.app`).

![Deploy — live app — WKLEJ: docs/screenshots/20-deploy-live.png](docs/screenshots/20-deploy-live.png)

> **[WKLEJ SCREEN — opcjonalnie]**  
> **Plik:** `docs/screenshots/21-deploy-dashboard-hosting.png`  
> **Co sfotografować:** panel Railway z udanym deploymentem (status Success + Generated Domain).

![Hosting dashboard — WKLEJ: docs/screenshots/21-deploy-dashboard-hosting.png](docs/screenshots/21-deploy-dashboard-hosting.png)

### Inne hostingi (opcjonalnie)

- [Vercel](https://vercel.com/) — framework: Vite, output: `dist`
- [Netlify](https://www.netlify.com/) — build: `npm run build`, publish: `dist`

---

## 11) Struktura projektu

```text
src/
  app/                    # App, router (createBrowserRouter)
  pages/                  # ekrany przypisane do tras (Figma views)
  features/
    auth/                 # Firebase Authentication (logika)
    dashboard/            # komponenty specyficzne dla dashboardu (Hero, StatsRow)
    packing-list/         # generowanie list, localStorage, waga
    profile/              # preferencje użytkownika
    trip-wizard/          # kreator nowej podróży
    weather/              # pogoda na liście / w wizardzie
  shared/
    analytics/            # GA4 + Hotjar bootstrap, PageViewTracker
    components/           # komponenty wielokrotnego użytku (patrz sekcja 12)
      ui/                 # Button, Card, Input, EmptyState, …
      auth/               # AuthBrand, AuthHeading, AuthFooter, …
      trip/               # TripCard, StartPlanningCard
      stats/              # StatCard (karta KPI)
      icons/              # ikony SVG
      index.ts            # wspólny export
    layout/               # AppShell, AuthShell, PageContainer
    routing/              # PrivateRoute, PublicOnlyRoute
    demo/                 # dane demo (seed trips)
docs/
  screenshots/            # screeny do README (wklej pliki PNG tutaj)
  DESIGN_SYSTEM.md
  ANALYTICS_SETUP.md
  REQUIREMENTS_COVERAGE.md
```

---

## 12) Komponenty wielokrotnego użytku

Wszystkie współdzielone komponenty UI są w **`src/shared/components/`**. Import z jednego miejsca:

```tsx
import { Button, TripCard, StatCard, AuthHeading } from '@/shared/components'
```

### Podstawowe UI (`shared/components/ui/`)

| Komponent | Plik | Użycie |
|-----------|------|--------|
| `Button` | `ui/Button.tsx` | formularze, CTA, wizard |
| `Card` | `ui/Card.tsx` | profile, karty, wizard |
| `Input` / `InputField` | `ui/Input.tsx`, `ui/InputField.tsx` | auth, formularze |
| `SectionHeader` | `ui/SectionHeader.tsx` | nagłówki sekcji stron |
| `EmptyState` / `ErrorState` / `LoadingState` | `ui/` | stany pustej listy, błędu, ładowania |

### Auth (`shared/components/auth/`)

| Komponent | Plik | Użycie |
|-----------|------|--------|
| `AuthBrand` | `auth/AuthLayoutParts.tsx` | logo na ekranach logowania |
| `AuthHeading` | `auth/AuthLayoutParts.tsx` | tytuł + opis (login, register) |
| `AuthFieldLabel` | `auth/AuthLayoutParts.tsx` | etykiety pól formularza |
| `AuthDivider` | `auth/AuthLayoutParts.tsx` | separator „Or continue with” |
| `AuthFooter` | `auth/AuthLayoutParts.tsx` | linki Register / Login |

### Trip (`shared/components/trip/`)

| Komponent | Plik | Użycie |
|-----------|------|--------|
| `TripCard` | `trip/TripCard.tsx` | dashboard, packing lists |
| `StartPlanningCard` | `trip/TripCard.tsx` | dashboard, packing lists |

### Stats (`shared/components/stats/`)

| Komponent | Plik | Użycie |
|-----------|------|--------|
| `StatCard` | `stats/StatCard.tsx` | karta KPI (dashboard, możliwe rozszerzenie na stats) |

### Ikony (`shared/components/icons/`)

Wspólne ikony SVG: `MailIcon`, `GoogleIcon`, `DashboardIcon`, `BellIcon` itd.

### Komponenty specyficzne dla feature (nie przenoszone)

Te komponenty są powiązane z jednym ekranem / flow i zostają w `features/`:

| Komponent | Ścieżka | Użycie |
|-----------|---------|--------|
| `DashboardHero` | `features/dashboard/components/` | tylko dashboard |
| `DashboardStatsRow` | `features/dashboard/components/` | tylko dashboard |
| `WizardStepper` / `WizardNavigation` | `features/trip-wizard/components/` | kreator podróży |
| `PackingListWeatherPanel` | `features/weather/components/` | lista pakowania |
| `AppShell` / `AuthShell` | `shared/layout/` | layout aplikacji |

Stylowanie wyłącznie przez **Tailwind CSS** — bez inline CSS poza wartościami dynamicznymi (np. szerokość paska postępu).

---

## 13) Dokumentacja zespołowa

| Dokument | Opis |
|----------|------|
| [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) | Kolory, typografia, komponenty |
| [`docs/ANALYTICS_SETUP.md`](docs/ANALYTICS_SETUP.md) | GA4 + Hotjar krok po kroku |
| [`docs/REQUIREMENTS_COVERAGE.md`](docs/REQUIREMENTS_COVERAGE.md) | Mapowanie wymagań |
| [`docs/SCREEN_DOD_CHECKLIST.md`](docs/SCREEN_DOD_CHECKLIST.md) | Definition of Done ekranu |
| [`docs/TEAM_PLAN.md`](docs/TEAM_PLAN.md) | Git flow zespołu |
| [`docs/TASK_ASSIGNMENT.md`](docs/TASK_ASSIGNMENT.md) | Podział zadań |

---

## Checklist przed oddaniem projektu

- [ ] Wszystkie screeny w `docs/screenshots/` wklejone (sekcje 5, 8, 9, 10)
- [ ] URL produkcyjny uzupełniony na górze README i w sekcji Deploy
- [ ] Firebase działa na produkcji (logowanie, rejestracja, logout)
- [ ] `VITE_ENABLE_ANALYTICS=true` na produkcji
- [ ] GA4 Realtime pokazuje ruch z deployu
- [ ] Hotjar nagrywa sesje z deployu
- [ ] `npm run build` i `npm run lint` przechodzą bez błędów
