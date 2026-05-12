# Analytics Setup (Firebase + GA4 + Hotjar)

This guide configures complete tracking for AllPacked frontend.

## 1) What is already done in code

- Google Analytics initialization and pageview tracking are implemented.
- Hotjar initialization is implemented.
- Tracking runs only when `VITE_ENABLE_ANALYTICS=true`.

## 2) Google Analytics via Firebase (recommended path)

Yes, you can set GA4 from Firebase.

1. Open Firebase Console -> your project.
2. Go to **Project settings**.
3. Find **Integrations** or **Google Analytics** section.
4. Link Firebase project with Google Analytics account (create new GA account if needed).
5. After linking, open Google Analytics and find your **Measurement ID** (format `G-XXXXXXXXXX`):
   - Admin -> Data Streams -> Web stream -> Measurement ID.
6. Put this into `.env`:
   - `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
7. Set tracking switch:
   - `VITE_ENABLE_ANALYTICS=true`

## 3) Hotjar setup

1. Create account/project at [Hotjar](https://www.hotjar.com/).
2. Add your site URL (for dev you can use localhost environment, for prod use deployed URL).
3. Copy your **Site ID** from Hotjar settings.
4. Put into `.env`:
   - `VITE_HOTJAR_SITE_ID=<your_site_id>`
   - `VITE_HOTJAR_VERSION=6`
5. Keep:
   - `VITE_ENABLE_ANALYTICS=true`

If your panel gives you a direct script tag (like `https://t.contentsquare.net/...`),
you can also set:

- `VITE_CONTENTSQUARE_SCRIPT_URL=https://t.contentsquare.net/uxa/b034a75e8fd65.js`

## 4) Example `.env` (analytics part)

```env
VITE_ENABLE_ANALYTICS=true
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_HOTJAR_SITE_ID=1234567
VITE_HOTJAR_VERSION=6
VITE_CONTENTSQUARE_SCRIPT_URL=https://t.contentsquare.net/uxa/your-id.js
```

## 5) Local verification checklist

1. Restart app after `.env` changes:
   - `npm run dev`
2. Open app and navigate between routes (`/dashboard`, `/stats`, etc.).
3. Verify GA:
   - GA4 -> Reports -> Realtime (you should see active user + page changes).
4. Verify Hotjar:
   - Hotjar -> Verify installation / incoming events.
   - After a few minutes, check if recordings/heatmap data starts appearing.

## 6) Production setup checklist

1. Add production domain in:
   - Firebase authorized domains (auth),
   - GA web stream,
   - Hotjar site settings.
2. Configure production env vars on hosting platform (Vercel/Netlify/Firebase Hosting/etc.).
3. Deploy.
4. Repeat realtime verification in production.

## 7) Common issues

- No GA events:
  - `VITE_ENABLE_ANALYTICS` is still `false`,
  - wrong `G-...` ID,
  - app not restarted after env change.
- No Hotjar:
  - invalid site ID,
  - adblock blocking scripts during local tests.
- Works on localhost but not on deploy:
  - missing environment variables in hosting dashboard.
