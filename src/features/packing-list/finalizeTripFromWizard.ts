import type { TripWizardState } from '@/features/trip-wizard'
import { buildTripFromWizard } from './generatePackingList'
import { savePackingList } from './packingListStorage'
import type { WeatherPackingContext } from './types'

export function finalizeTripFromWizard(
  wizard: TripWizardState,
  context?: WeatherPackingContext,
) {
  const { trip, categories } = buildTripFromWizard(wizard, context)

  savePackingList({
    trip,
    categories,
    createdAt: new Date().toISOString(),
  })

  return trip
}
