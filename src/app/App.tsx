import { RouterProvider } from 'react-router-dom'
import { appRouter } from '@/app/router'
import { BootstrapAnalytics } from '@/shared/analytics/BootstrapAnalytics'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { TripWizardProvider } from '@/features/trip-wizard'

export function App() {
  return (
    <>
      <BootstrapAnalytics />
      <AuthProvider>
        <TripWizardProvider>
          <RouterProvider router={appRouter} />
        </TripWizardProvider>
      </AuthProvider>
    </>
  )
}
