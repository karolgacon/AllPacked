import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'
import { getAuthErrorMessage } from '@/features/auth/authErrors'
import {
  AuthBrand,
  AuthDivider,
  AuthFieldLabel,
  AuthFooter,
  AuthHeading,
} from '@/shared/components'
import { EyeIcon, EyeOffIcon, GoogleIcon, LockIcon, MailIcon } from '@/shared/components/icons'
import { Button, InputField } from '@/shared/components/ui'

export function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
      setError(getAuthErrorMessage(err, 'Unexpected error while signing in.'))
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
      setError(getAuthErrorMessage(err, 'Unexpected error while signing in with Google.'))
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="space-y-7">
      <AuthBrand />
      <AuthHeading
        title="Welcome back"
        subtitle="Your organized journey begins with a single step. Let's get you ready."
      />

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <AuthFieldLabel htmlFor="login-email">Email address</AuthFieldLabel>
          <InputField
            id="login-email"
            type="email"
            required
            autoComplete="email"
            placeholder="alex@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            leftIcon={<MailIcon />}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <AuthFieldLabel htmlFor="login-password">Password</AuthFieldLabel>
            <Link
              to="/forgot-password"
              className="text-[11px] font-semibold uppercase tracking-wider text-brand-primary hover:text-brand-primary-hover"
            >
              Forgot?
            </Link>
          </div>
          <InputField
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            required
            minLength={6}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            leftIcon={<LockIcon />}
            rightIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
            onRightIconClick={() => setShowPassword((v) => !v)}
            rightIconLabel={showPassword ? 'Hide password' : 'Show password'}
          />
        </div>

        {error ? <p className="text-sm text-brand-danger">{error}</p> : null}

        <Button type="submit" disabled={pending} className="py-2.5">
          {pending ? 'Signing in…' : 'Sign In'}
        </Button>
      </form>

      <AuthDivider />

      <Button
        type="button"
        variant="secondary"
        disabled={pending}
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-2 py-2.5"
      >
        <GoogleIcon />
        Google
      </Button>

      <AuthFooter
        text="Don't have an account?"
        linkText="Join AllPacked"
        linkTo="/register"
      />
    </div>
  )
}
