import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { useAuth } from '@/features/auth/useAuth'
import { Button, Input } from '@/shared/components/ui'

export function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setPending(true)

    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message)
      } else {
        setError('Unexpected error while signing in.')
      }
    } finally {
      setPending(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setPending(true)

    try {
      await signInWithGoogle()
      navigate('/dashboard')
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message)
      } else {
        setError('Unexpected error while signing in with Google.')
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-blue-900">Welcome back</h1>
      <p className="text-sm text-slate-600">Sign in to start packing smarter.</p>
      <Input
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        type="password"
        required
        minLength={6}
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? 'Signing in...' : 'Sign In'}
      </Button>
      <Button
        type="button"
        variant="secondary"
        disabled={pending}
        onClick={handleGoogleSignIn}
      >
        Continue with Google
      </Button>
      <p className="text-sm text-slate-500">
        New here? <Link to="/register">Create account</Link>
      </p>
    </form>
  )
}
