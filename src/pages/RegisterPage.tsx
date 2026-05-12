import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { useAuth } from '@/features/auth/useAuth'
import { Button, Input } from '@/shared/components/ui'

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
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Input
        type="password"
        required
        minLength={6}
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? 'Creating account...' : 'Create account'}
      </Button>
      <p className="text-sm text-slate-500">
        Already have account? <Link to="/login">Back to sign in</Link>
      </p>
    </form>
  )
}
