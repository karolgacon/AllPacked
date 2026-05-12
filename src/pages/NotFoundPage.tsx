import { Link } from 'react-router-dom'
import { Card } from '@/shared/components/ui'

export function NotFoundPage() {
  return (
    <Card className="space-y-3">
      <h1 className="text-2xl font-bold text-blue-900">404 - Page not found</h1>
      <Link to="/dashboard" className="text-blue-600 hover:underline">
        Go to dashboard
      </Link>
    </Card>
  )
}
