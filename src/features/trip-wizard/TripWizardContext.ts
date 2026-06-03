import { createContext } from 'react'

export type DestinationOption = 'Paris' | 'New York' | 'Bali' | 'Kyoto'
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
  setOverview: (overview: Partial<TripWizardState['overview']>) => void
  resetWizard: () => void
}

export const initialTripWizardState: TripWizardState = {
  destination: 'Kyoto, Japan',
  dates: {
    startDate: '2024-04-12',
    endDate: '2024-04-24',
  },
  transport: '',
  activities: {
    tripType: '',
    selected: [],
  },
  overview: {
    notes: '',
    isFinalized: false,
  },
}

export const TripWizardContext = createContext<TripWizardContextValue | null>(null)
