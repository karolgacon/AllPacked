import { FirebaseError } from 'firebase/app'

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled. Contact support if you need help.',
  'auth/user-not-found': 'No account found with this email. Check the address or sign up.',
  'auth/wrong-password': 'Incorrect password. Try again or reset your password.',
  'auth/invalid-credential': 'Incorrect email or password. Please try again.',
  'auth/email-already-in-use': 'An account with this email already exists. Try signing in.',
  'auth/weak-password': 'Choose a stronger password (at least 6 characters).',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/popup-closed-by-user': 'Sign-in was cancelled. Try again when you are ready.',
  'auth/popup-blocked':
    'The sign-in popup was blocked. Allow pop-ups for this site or try again.',
  'auth/unauthorized-domain':
    'This domain is not authorized in Firebase. Add your Railway URL under Authentication → Settings → Authorized domains.',
  'auth/operation-not-allowed':
    'Google sign-in is disabled in Firebase. Enable it under Authentication → Sign-in method → Google.',
  'auth/account-exists-with-different-credential':
    'An account already exists with the same email but a different sign-in method.',
}

export function getAuthErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof FirebaseError) {
    return AUTH_ERROR_MESSAGES[error.code] ?? `${fallback} (${error.code})`
  }

  if (error instanceof Error && error.message.includes('Firebase is not configured')) {
    return 'Firebase is not configured on this deployment. Set VITE_FIREBASE_* in Railway and redeploy.'
  }

  return fallback
}
