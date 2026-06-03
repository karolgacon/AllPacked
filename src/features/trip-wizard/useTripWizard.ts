import { useContext } from 'react'
import { TripWizardContext } from '@/features/trip-wizard/TripWizardContext'

export function useTripWizard() {
  const context = useContext(TripWizardContext)

  if (!context) {
    throw new Error('useTripWizard must be used inside TripWizardProvider')
  }

  return context
}
