import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { useAuth } from '@/features/auth/useAuth'
import { AuthBrand, AuthFieldLabel, AuthHeading } from '@/features/auth/components/AuthLayoutParts'
import { MailIcon } from '@/shared/components/icons'
import { Button, InputField } from '@/shared/components/ui'

export function ForgotPasswordPage() {
  const { sendPasswordResetEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setPending(true)

    try {
      await sendPasswordResetEmail(email)
      setMessage('Check your inbox for a reset link.')
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message)
      } else {
        setError('Could not send reset email.')
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="space-y-7">
      <AuthBrand />
      <AuthHeading
        title="Reset password"
        subtitle="Enter the email for your account. We will send you a link to choose a new password."
      />
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <AuthFieldLabel htmlFor="forgot-email">Email address</AuthFieldLabel>
          <InputField
            id="forgot-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            leftIcon={<MailIcon />}
          />
        </div>
        {error ? <p className="text-sm text-brand-danger">{error}</p> : null}
        {message ? <p className="text-sm text-brand-success">{message}</p> : null}
        <Button type="submit" disabled={pending} className="py-2.5">
          {pending ? 'Sending…' : 'Send reset link'}
        </Button>
      </form>
      <p className="border-t border-brand-border pt-6 text-center text-sm text-brand-text">
        <Link to="/login" className="font-semibold text-brand-primary hover:text-brand-primary-hover">
          Back to sign in
        </Link>
      </p>
    </div>
  )
}
