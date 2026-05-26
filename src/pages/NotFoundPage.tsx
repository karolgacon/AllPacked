import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="text-9xl font-bold text-blue-900">404</span>
        <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
        <p className="text-sm text-slate-600">
          The page you're looking for doesn't exist.
        </p>
        <Button
          className="w-auto px-8"
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}
