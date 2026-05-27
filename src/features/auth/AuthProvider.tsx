import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { User } from 'firebase/auth'
import { firebaseAuthService } from '@/features/auth/firebaseAuth'
import { AuthContext, type AuthContextValue } from '@/features/auth/AuthContext'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = firebaseAuthService.onAuthStateChanged((nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      async signIn(email, password) {
        await firebaseAuthService.signIn(email, password)
      },
      async signInWithGoogle() {
        await firebaseAuthService.signInWithGoogle()
      },
      async signUp(email, password, displayName) {
        await firebaseAuthService.signUp(email, password, displayName)
      },
      async sendPasswordResetEmail(email) {
        await firebaseAuthService.sendPasswordResetEmail(email)
      },
      async signOutUser() {
        await firebaseAuthService.signOut()
      },
    }),
    [loading, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
