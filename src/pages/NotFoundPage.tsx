import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui'
import { Link } from 'react-router-dom'
import { Card, SectionHeader } from '@/shared/components/ui'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-app-canvas p-6">
      <Card className="w-full max-w-md space-y-4">
        <SectionHeader as="h1" title="404 — Page not found" subtitle="The page you are looking for does not exist." />
        <Link to="/dashboard" className="inline-block text-sm font-semibold text-brand-primary hover:text-brand-primary-hover">
          Go to dashboard
        </Link>
      </Card>
    </div>
  )
}
