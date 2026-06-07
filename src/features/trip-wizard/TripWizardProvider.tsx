import { useMemo, useState, type ReactNode } from 'react'
import {
  TripWizardContext,
  initialTripWizardState,
  type TransportOption,
  type TripType,
  type TripWizardContextValue,
  type TripWizardState,
} from '@/features/trip-wizard/TripWizardContext'

type TripWizardProviderProps = {
  children: ReactNode
}

export function TripWizardProvider({ children }: TripWizardProviderProps) {
  const [wizard, setWizard] = useState<TripWizardState>(initialTripWizardState)

  const value = useMemo<TripWizardContextValue>(
    () => ({
      wizard,
      setDestination(destination) {
        setWizard((current) => ({ ...current, destination }))
      },
      setDates(dates) {
        setWizard((current) => ({
          ...current,
          dates: { ...current.dates, ...dates },
        }))
      },
      setTransport(transport: TransportOption) {
        setWizard((current) => ({ ...current, transport }))
      },
      setTripType(tripType: TripType) {
        setWizard((current) => ({
          ...current,
          activities: { ...current.activities, tripType },
        }))
      },
      toggleActivity(activity) {
        setWizard((current) => {
          const selected = current.activities.selected.includes(activity)
            ? current.activities.selected.filter((item) => item !== activity)
            : [...current.activities.selected, activity]

          return {
            ...current,
            activities: { ...current.activities, selected },
          }
        })
      },
      setActivities(selected) {
        setWizard((current) => ({
          ...current,
          activities: { ...current.activities, selected },
        }))
      },
      setOverview(overview) {
        setWizard((current) => ({
          ...current,
          overview: { ...current.overview, ...overview },
        }))
      },
      resetWizard() {
        setWizard(initialTripWizardState)
      },
    }),
    [wizard],
  )

  return (
    <TripWizardContext.Provider value={value}>
      {children}
    </TripWizardContext.Provider>
  )
}
