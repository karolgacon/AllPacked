# AllPacked

Aplikacja do planowania podróży i list pakowania — projekt zespołowy na TPF (React + TypeScript).

**Link do aplikacji:** https://allpacked-production.up.railway.app  
**Repo:** https://github.com/karolgacon/AllPacked

---

## O projekcie

AllPacked to front-endowa aplikacja zrobiona na podstawie prototypu z Figmy. Użytkownik może się zalogować, zaplanować podróż (wizard), wygenerować listę pakowania, odhaczać spakowane rzeczy i podejrzeć statystyki.

**Technologie:** React, TypeScript, Vite, React Router, Tailwind CSS, Firebase Auth, Google Analytics (react-ga4), Hotjar (@hotjar/browser).

---

## Jak uruchomić lokalnie

```bash
npm install
copy .env.example .env   # uzupełnij wartości z Firebase / GA / Hotjar
npm run dev
```

Aplikacja startuje na `http://localhost:5173`.

Build: `npm run build`  
Lint: `npm run lint`

---

## Wymagania z checklisty projektu

| Wymaganie | Jak to zrobiliśmy |
|-----------|-------------------|
| Odwzorowanie prototypu | Ekrany w `src/pages/` według Figmy (login, dashboard, wizard, listy, stats, profil) |
| Routing (React Router) | `src/app/router.tsx` — każdy ekran ma trasę, jest też 404 |
| Widoki w `pages/` | Wszystkie strony w `src/pages/` |
| Komponenty reużywalne | `src/shared/components/` (Button, Card, TripCard, AuthHeading itd.) |
| Stylowanie | Tailwind CSS |
| Logowanie Firebase | Email/hasło + Google, chronione trasy (`PrivateRoute`) |
| Hotjar | `src/shared/analytics/BootstrapAnalytics.tsx` |
| Google Analytics | GA4 + śledzenie pageview przy zmianie trasy (`PageViewTracker`) |
| Deploy | Railway — `Dockerfile` + `Caddyfile` |
| README ze screenami | Poniżej — sekcja **Screeny** |

**Dodatkowo:** zagnieżdżony routing, wspólny layout (`AppShell`), strona 404.

---

## Trasy w aplikacji

| Trasa | Ekran |
|-------|-------|
| `/login` | Logowanie |
| `/register` | Rejestracja |
| `/forgot-password` | Reset hasła |
| `/dashboard` | Dashboard |
| `/new-trip/destination` … `/overview` | Kreator podróży (5 kroków) |
| `/packing-lists` | Lista podróży |
| `/packing-lists/:tripId` | Szczegóły listy pakowania |
| `/stats` | Statystyki |
| `/profile` | Profil |
| `*` | Strona 404 |

Router: `src/app/router.tsx`

---

## Firebase

1. Projekt w [Firebase Console](https://console.firebase.google.com/)
2. Włączone: **Email/Password** i **Google**
3. W **Authorized domains** dodane: `localhost` + `allpacked-production.up.railway.app`
4. Klucze w `.env` (`VITE_FIREBASE_*`) i na Railway (Variables → Redeploy po zmianie)

Kod auth: `src/features/auth/`

---

## Google Analytics i Hotjar

- Inicjalizacja: `src/shared/analytics/BootstrapAnalytics.tsx`
- Pageview przy zmianie strony: `src/shared/analytics/PageViewTracker.tsx`
- Na produkcji: `VITE_ENABLE_ANALYTICS=true` + ID w zmiennych Railway

---

## Deploy (Railway)

1. Połączenie repo z GitHubem na [railway.com](https://railway.com/)
2. Ustawienie zmiennych `VITE_*` w **Variables** (te same co w `.env`)
3. **Networking → Generate Domain** (port **8080**)
4. Redeploy po każdej zmianie zmiennych środowiskowych

---

## Struktura projektu (skrót)

```
src/
  pages/          # ekrany (routing)
  features/       # logika (auth, packing-list, trip-wizard…)
  shared/
    components/   # komponenty współdzielone
    layout/       # AppShell, AuthShell
    analytics/    # GA + Hotjar
```

---

## Screeny

### Login

Formularz logowania z polem e-mail i hasłem, przyciskiem Google oraz linkami do rejestracji i resetu hasła.
---

### Rejestracja

Formularz rejestracji z imieniem, e-mailiem, hasłem i potwierdzeniem hasła.

---

### Dashboard

Strona główna po zalogowaniu — baner z przyciskiem tworzenia listy, statystyki i karty ostatnich podróży.

---

### Kreator podróży — wybór destynacji

Pierwszy krok planowania podróży — pole na wpisanie miejsca i szybkie propozycje destynacji.

---

### Kreator podróży — podsumowanie

Podsumowanie wybranej podróży z datami, transportem, aktywnościami i przyciskiem **Finalize Trip**.

---

### Listy pakowania

Widok ze wszystkimi podróżami — karty z postępem pakowania i opcją rozpoczęcia nowego planu.

---

### Szczegóły listy pakowania

Lista rzeczy do spakowania w kategoriach, możliwość odhaczania pozycji, panel pogody i wagi bagażu.

---

### Statystyki

Ekran ze statystykami podróży — liczba wyjazdów, spakowane przedmioty, wykresy i top destynacje.

---

### Profil

Profil użytkownika z danymi konta, preferencjami podróży i ustawieniami.

---

### Google Analytics

Widok GA4 Realtime z aktywnym użytkownikiem i listą odwiedzanych stron aplikacji.

---

### Hotjar

Panel Hotjar z nagraniem sesji użytkownika korzystającego z aplikacji.

---

### Aplikacja na produkcji

Działająca aplikacja pod adresem Railway — np. dashboard po zalogowaniu.

---

## Zespół

Projekt realizowany zespołowo w ramach przedmiotu TPF.
