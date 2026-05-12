import { RouterProvider } from 'react-router-dom'
import { appRouter } from '@/app/router'
import { BootstrapAnalytics } from '@/shared/analytics/BootstrapAnalytics'
import { AuthProvider } from '@/features/auth/AuthProvider'

export function App() {
  return (
    <>
      <BootstrapAnalytics />
      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>
    </>
  )
}
