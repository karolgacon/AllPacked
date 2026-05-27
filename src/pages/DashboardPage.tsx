import { useAuth } from '@/features/auth/useAuth'
import { getUserDisplayName } from '@/features/auth/userDisplayName'
import { Card, SectionHeader } from '@/shared/components/ui'

export function DashboardPage() {
  const { user } = useAuth()
  const firstName = getUserDisplayName(user)

  return (
    <div className="space-y-6">
      <SectionHeader
        title={`Welcome back, ${firstName}`}
        subtitle="Your trips and packing progress at a glance."
      />

      <Card className="py-14 text-center">
        <h3 className="text-lg font-semibold text-brand-navy">Coming soon</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-brand-text">
          Replace this placeholder with the final Figma dashboard implementation.
        </p>
      </Card>
    </div>
  )
}
