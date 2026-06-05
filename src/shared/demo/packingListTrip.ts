import { activeTrip, activeTripPeriodLabel } from './appDemoData'

/** @deprecated Use `activeTrip` from `appDemoData` — kept for imports. */
export const packingListDemoTrip = {
  name: activeTrip.name,
  destination: activeTrip.destination,
  startDate: activeTrip.startDate,
  endDate: activeTrip.endDate,
  periodLabel: activeTripPeriodLabel,
} as const
