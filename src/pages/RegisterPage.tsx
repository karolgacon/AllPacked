import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'
import { getAuthErrorMessage } from '@/features/auth/authErrors'
import {
  AuthBrand,
  AuthDivider,
  AuthFieldLabel,
  AuthFooter,
  AuthHeading,
} from '@/features/auth/components/AuthLayoutParts'
import {
  EyeIcon,
  EyeOffIcon,
  GoogleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from '@/shared/components/icons'
import { Button, InputField } from '@/shared/components/ui'

export function RegisterPage() {
  const { signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!firstName.trim()) {
      setError('Please enter your first name.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setPending(true)

    try {
      await signUp(email, password, firstName.trim())
      navigate('/dashboard')
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Unexpected error while registering.'))
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
        title="Join AllPacked"
        subtitle="Create your account and start building smarter packing lists for every trip."
      />

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <AuthFieldLabel htmlFor="register-first-name">First name</AuthFieldLabel>
          <InputField
            id="register-first-name"
            type="text"
            required
            autoComplete="given-name"
            placeholder="Alex"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            leftIcon={<UserIcon />}
          />
        </div>

        <div className="space-y-1.5">
          <AuthFieldLabel htmlFor="register-email">Email address</AuthFieldLabel>
          <InputField
            id="register-email"
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
          <AuthFieldLabel htmlFor="register-password">Password</AuthFieldLabel>
          <InputField
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="Min. 6 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            leftIcon={<LockIcon />}
            rightIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
            onRightIconClick={() => setShowPassword((v) => !v)}
            rightIconLabel={showPassword ? 'Hide password' : 'Show password'}
          />
        </div>

        <div className="space-y-1.5">
          <AuthFieldLabel htmlFor="register-confirm">Confirm password</AuthFieldLabel>
          <InputField
            id="register-confirm"
            type={showConfirm ? 'text' : 'password'}
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            leftIcon={<LockIcon />}
            rightIcon={showConfirm ? <EyeOffIcon /> : <EyeIcon />}
            onRightIconClick={() => setShowConfirm((v) => !v)}
            rightIconLabel={showConfirm ? 'Hide password' : 'Show password'}
          />
        </div>

        {error ? <p className="text-sm text-brand-danger">{error}</p> : null}

        <Button type="submit" disabled={pending} className="py-2.5">
          {pending ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <AuthDivider />

      <p className="text-center text-xs text-brand-text">
        Google will use the name from your account when available.
      </p>

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
        text="Already have an account?"
        linkText="Sign in"
        linkTo="/login"
      />
    </div>
  )
}
