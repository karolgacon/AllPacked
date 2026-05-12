type OptionalEnv = string | undefined

const toBool = (value: OptionalEnv) => value === 'true'
const hasValue = (value: OptionalEnv) => Boolean(value && value.trim().length > 0)

export const env = {
  appName: import.meta.env.VITE_APP_NAME ?? 'AllPacked',
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  hotjarSiteId: import.meta.env.VITE_HOTJAR_SITE_ID,
  hotjarVersion: Number(import.meta.env.VITE_HOTJAR_VERSION ?? '6'),
  contentsquareScriptUrl: import.meta.env.VITE_CONTENTSQUARE_SCRIPT_URL,
  enableAnalytics: toBool(import.meta.env.VITE_ENABLE_ANALYTICS),
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  },
}

export const isFirebaseConfigured =
  hasValue(env.firebase.apiKey) &&
  hasValue(env.firebase.authDomain) &&
  hasValue(env.firebase.projectId) &&
  hasValue(env.firebase.storageBucket) &&
  hasValue(env.firebase.messagingSenderId) &&
  hasValue(env.firebase.appId)
