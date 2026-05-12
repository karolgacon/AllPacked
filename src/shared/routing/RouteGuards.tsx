import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'

export function PrivateRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <p className="p-6 text-sm text-slate-500">Checking session...</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export function PublicOnlyRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <p className="p-6 text-sm text-slate-500">Loading...</p>
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
