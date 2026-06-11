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
<img width="2559" height="1388" alt="image" src="https://github.com/user-attachments/assets/ec580f10-bc37-4b5c-a79f-2c0e1b90822e" />

---

### Rejestracja

Formularz rejestracji z imieniem, e-mailiem, hasłem i potwierdzeniem hasła.
<img width="2559" height="1398" alt="image" src="https://github.com/user-attachments/assets/0ccad905-1ad4-44fe-bea9-3a1fbac5fe65" />

---

### Dashboard

Strona główna po zalogowaniu — baner z przyciskiem tworzenia listy, statystyki i karty ostatnich podróży.
<img width="2539" height="1384" alt="image" src="https://github.com/user-attachments/assets/bb7fb112-024d-4330-8da9-563a810e735c" />

---

### Kreator podróży — wybór destynacji

Pierwszy krok planowania podróży — pole na wpisanie miejsca i szybkie propozycje destynacji.
<img width="2551" height="1393" alt="image" src="https://github.com/user-attachments/assets/5da6f696-b724-4273-848b-8fd238769c23" />

---

### Kreator podróży — podsumowanie

Podsumowanie wybranej podróży z datami, transportem, aktywnościami i przyciskiem **Finalize Trip**.
<img width="2559" height="1395" alt="image" src="https://github.com/user-attachments/assets/6b23df29-69e0-4407-aca0-44733d33ba58" />

---

### Listy pakowania

Widok ze wszystkimi podróżami — karty z postępem pakowania i opcją rozpoczęcia nowego planu.
<img width="2555" height="1396" alt="image" src="https://github.com/user-attachments/assets/a2b85189-99d8-4a5b-9549-d4bb513a5190" />

---

### Szczegóły listy pakowania

Lista rzeczy do spakowania w kategoriach, możliwość odhaczania pozycji, panel pogody i wagi bagażu.
<img width="2537" height="1393" alt="image" src="https://github.com/user-attachments/assets/8bd99584-f2ad-4bf0-bc7b-4da26d5798a2" />

---

### Statystyki

Ekran ze statystykami podróży — liczba wyjazdów, spakowane przedmioty, wykresy i top destynacje.
<img width="2558" height="1395" alt="image" src="https://github.com/user-attachments/assets/0f5db34c-1215-492c-8fd0-415f6368103e" />

---

### Profil

Profil użytkownika z danymi konta, preferencjami podróży i ustawieniami.
<img width="2557" height="1390" alt="image" src="https://github.com/user-attachments/assets/80f77d83-8177-40f0-b529-bfd7373caca7" />

---

### Google Analytics

Widok GA4 Realtime z aktywnym użytkownikiem i listą odwiedzanych stron aplikacji.
<img width="2555" height="1388" alt="image" src="https://github.com/user-attachments/assets/9e6b8ca9-fb9e-4134-9455-c339a68634a2" />
<img width="2559" height="1380" alt="image" src="https://github.com/user-attachments/assets/9ddaab84-aca8-4418-a8cb-ef88b788c863" />

---

### Hotjar

Panel Hotjar z nagraniem sesji użytkownika korzystającego z aplikacji.
<img width="2554" height="1395" alt="image" src="https://github.com/user-attachments/assets/80f532ce-cc2a-4874-964a-194934c69f11" />
<img width="2556" height="1393" alt="image" src="https://github.com/user-attachments/assets/e459d351-b23d-4db6-b217-e71af76c4481" />
<img width="2552" height="1387" alt="image" src="https://github.com/user-attachments/assets/cdb175c1-ecd6-4353-81c7-22c02fcdea4a" />

---

### Aplikacja na produkcji

Działająca aplikacja pod adresem Railway — np. dashboard po zalogowaniu.
<img width="2540" height="1533" alt="image" src="https://github.com/user-attachments/assets/a89ac0d0-b684-4a92-a36b-bdfab16f846c" />

---

## Zespół

Projekt realizowany zespołowo w ramach przedmiotu TPF.
