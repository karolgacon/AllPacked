import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'
import { getUserFullName } from '@/features/auth/userDisplayName'
import { Button, Card, SectionHeader } from '@/shared/components/ui'

export function ProfilePage() {
  const { user, signOutUser } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Profile"
        subtitle="User profile, preferences and account settings."
      />

      <Card className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-text">Name</p>
            <p className="mt-1 text-sm text-slate-800">{getUserFullName(user)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-text">Email</p>
            <p className="mt-1 text-sm text-slate-800">{user?.email ?? '—'}</p>
          </div>
        </div>

        <p className="text-sm text-brand-text">
          Profile settings and preferences will be implemented here.
        </p>

        <Button
          type="button"
          variant="secondary"
          onClick={async () => {
            await signOutUser()
            navigate('/login')
          }}
        >
          Log out
        </Button>
      </Card>
    </div>
  )
}
