import { getApp, getApps, initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import { env, isFirebaseConfigured } from '@/shared/config/env'

const firebaseAuth = isFirebaseConfigured
  ? getAuth(
      getApps().length > 0
        ? getApp()
        : initializeApp({
            apiKey: env.firebase.apiKey,
            authDomain: env.firebase.authDomain,
            projectId: env.firebase.projectId,
            storageBucket: env.firebase.storageBucket,
            messagingSenderId: env.firebase.messagingSenderId,
            appId: env.firebase.appId,
          }),
    )
  : null

function requireAuth() {
  if (!firebaseAuth) {
    throw new Error(
      'Firebase is not configured. Fill all VITE_FIREBASE_* values in .env.',
    )
  }

  return firebaseAuth
}

export const firebaseAuthService = {
  onAuthStateChanged(callback: (user: User | null) => void) {
    if (!firebaseAuth) {
      callback(null)
      return () => undefined
    }

    return onAuthStateChanged(firebaseAuth, callback)
  },
  async signIn(email: string, password: string) {
    const auth = requireAuth()
    return signInWithEmailAndPassword(auth, email, password)
  },
  async signUp(email: string, password: string) {
    const auth = requireAuth()
    return createUserWithEmailAndPassword(auth, email, password)
  },
  async signInWithGoogle() {
    const auth = requireAuth()
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    return signInWithPopup(auth, provider)
  },
  async signInWithApple() {
    const auth = requireAuth()
    const provider = new OAuthProvider('apple.com')
    provider.addScope('email')
    provider.addScope('name')
    return signInWithPopup(auth, provider)
  },
  async sendPasswordResetEmail(email: string) {
    const auth = requireAuth()
    return sendPasswordResetEmail(auth, email)
  },
  async signOut() {
    const auth = requireAuth()
    return signOut(auth)
  },
}
