import { createContext } from 'react'
import { activeTrip } from '@/shared/demo/appDemoData'

export type DestinationOption = 'Paris' | 'Tokyo' | 'Warsaw' | 'Kyoto'
export type TransportOption = 'plane' | 'train' | 'car' | ''
export type TripType = 'business' | 'leisure' | 'adventure' | ''

export type TripWizardState = {
  destination: string
  dates: {
    startDate: string
    endDate: string
  }
  transport: TransportOption
  activities: {
    tripType: TripType
    selected: string[]
  }
  overview: {
    notes: string
    isFinalized: boolean
  }
}

export type TripWizardContextValue = {
  wizard: TripWizardState
  setDestination: (destination: string) => void
  setDates: (dates: Partial<TripWizardState['dates']>) => void
  setTransport: (transport: TransportOption) => void
  setTripType: (tripType: TripType) => void
  toggleActivity: (activity: string) => void
  setActivities: (activities: string[]) => void
  setOverview: (overview: Partial<TripWizardState['overview']>) => void
  resetWizard: () => void
}

function formatIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function buildInitialDates() {
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  const start = addDays(today, 3)
  const end = addDays(start, 4)

  return {
    startDate: formatIsoDate(start),
    endDate: formatIsoDate(end),
  }
}

const initialDates = buildInitialDates()

export const initialTripWizardState: TripWizardState = {
  destination: activeTrip.destination,
  dates: {
    startDate: initialDates.startDate,
    endDate: initialDates.endDate,
  },
  transport: 'plane',
  activities: {
    tripType: 'leisure',
    selected: ['hiking', 'sightseeing'],
  },
  overview: {
    notes: '',
    isFinalized: false,
  },
}

export const TripWizardContext = createContext<TripWizardContextValue | null>(null)
