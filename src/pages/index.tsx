import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { useAuth } from '@/features/auth/useAuth'

const pageCard =
  'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3'

type PlaceholderPageProps = {
  title: string
  description: string
}

function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className={pageCard}>
      <h1 className="text-2xl font-bold text-blue-900">{title}</h1>
      <p className="text-slate-600">{description}</p>
      <p className="text-xs text-slate-400">
        Team note: replace this placeholder with final Figma implementation.
      </p>
    </section>
  )
}

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
      <input
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
      />
      <input
        type="password"
        required
        minLength={6}
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'Signing in...' : 'Sign In'}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={handleGoogleSignIn}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Continue with Google
      </button>
      <p className="text-sm text-slate-500">
        New here? <Link to="/register">Create account</Link>
      </p>
    </form>
  )
}

export function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setPending(true)

    try {
      await signUp(email, password)
      navigate('/dashboard')
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message)
      } else {
        setError('Unexpected error while registering.')
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-blue-900">Join AllPacked</h1>
      <p className="text-sm text-slate-600">
        Create account to save your packing lists.
      </p>
      <input
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
      />
      <input
        type="password"
        required
        minLength={6}
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
      />
      <input
        type="password"
        required
        minLength={6}
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'Creating account...' : 'Create account'}
      </button>
      <p className="text-sm text-slate-500">
        Already have account? <Link to="/login">Back to sign in</Link>
      </p>
    </form>
  )
}

export function DashboardPage() {
  return (
    <PlaceholderPage
      title="Dashboard"
      description="Main dashboard and trip snapshots."
    />
  )
}

export function NewTripDestinationPage() {
  return (
    <PlaceholderPage
      title="New Trip - Destination"
      description="Step 1 of wizard: destination and quick weather hints."
    />
  )
}

export function NewTripDatesPage() {
  return (
    <PlaceholderPage
      title="New Trip - Dates"
      description="Step 2 of wizard: travel window and trip summary."
    />
  )
}

export function NewTripTransportPage() {
  return (
    <PlaceholderPage
      title="New Trip - Transport"
      description="Step 3 of wizard: transport and luggage constraints."
    />
  )
}

export function NewTripActivitiesPage() {
  return (
    <PlaceholderPage
      title="New Trip - Activities"
      description="Step 4 of wizard: trip type and activity preferences."
    />
  )
}

export function NewTripOverviewPage() {
  return (
    <PlaceholderPage
      title="New Trip - Overview"
      description="Final wizard step: weather, selected activities and finalize."
    />
  )
}

export function PackingListsPage() {
  return (
    <PlaceholderPage
      title="Packing Lists"
      description="Checklist view with categories and completion tracking."
    />
  )
}

export function StatsPage() {
  return (
    <PlaceholderPage
      title="Travel Statistics"
      description="Trips analytics, top destinations and packing efficiency."
    />
  )
}

export function ProfilePage() {
  return (
    <PlaceholderPage
      title="Profile"
      description="User profile, preferences and account settings."
    />
  )
}

export function NotFoundPage() {
  return (
    <section className={pageCard}>
      <h1 className="text-2xl font-bold text-blue-900">404 - Page not found</h1>
      <Link to="/dashboard" className="text-blue-600 hover:underline">
        Go to dashboard
      </Link>
    </section>
  )
}
