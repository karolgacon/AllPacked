import { formatTripPeriod } from '@/features/weather/formatTripPeriod'

/** Single source of truth for front-end demo content (no backend). */
export const demoUser = {
  homeLocation: 'Seattle, WA',
} as const

export const demoStats = {
  totalTrips: 12,
  totalTripsDelta: '+2 from last month',
  countriesVisited: 18,
  itemsPacked: 458,
  itemsPackedNote: '+24 this month',
  packingEfficiency: 94.2,
  lastListEfficiency: 98,
} as const

export const activeTrip = {
  id: 'japan-spring',
  name: 'Japan Spring Tour',
  destination: 'Kyoto, Japan',
  destinationCity: 'Kyoto',
  startDate: '2024-04-12',
  endDate: '2024-04-24',
  packed: 32,
  total: 45,
  statusLabel: 'In 4 Days',
  nextDestinationLabel: 'Kyoto District',
  imageUrl:
    'https://commons.wikimedia.org/wiki/Special:FilePath/KyotoFushimiInariLarge.jpg?width=640',
  imageAlt: 'Fushimi Inari, Kyoto, Japan',
} as const

export const activeTripPeriodLabel =
  formatTripPeriod(activeTrip.startDate, activeTrip.endDate) ?? 'April 12 – April 24, 2024'

export const activeTripShortDateRange = 'Apr 12 - Apr 24'

export const activeTripProgressPercent = Math.round(
  (activeTrip.packed / activeTrip.total) * 100,
)

export const newTripQuickDestinations = [
  { label: 'Kyoto', value: activeTrip.destination },
  { label: 'Paris', value: 'Paris, France' },
  { label: 'Tokyo', value: 'Tokyo, Japan' },
  { label: 'Warsaw', value: 'Warsaw, Poland' },
] as const

export const newTripInfoCards = [
  {
    title: 'Recent',
    text: 'Last trip to Paris was in September.',
    icon: 'recent',
    iconClassName: 'bg-[#dbeafe] text-blue-700',
  },
  {
    title: 'Advice',
    text: 'Japan requires a travel adapter (Type A/B).',
    icon: 'advice',
    iconClassName: 'bg-[#ffddc7] text-orange-700',
  },
  {
    title: 'Inventory',
    text: 'You have 24 essential items pre-saved.',
    icon: 'inventory',
    iconClassName: 'bg-[#dbeafe] text-blue-700',
  },
] as const

export type DemoTripCard = {
  id: string
  title: string
  dateRange: string
  packed: number
  total: number
  status: 'upcoming' | 'completed'
  statusLabel: string
  imageUrl: string
  imageAlt: string
}

export type PackingListTrip = {
  id: string
  name: string
  destination: string
  startDate: string
  endDate: string
  shortDateRange: string
  packed: number
  total: number
  status: 'upcoming' | 'completed'
  statusLabel: string
  imageUrl: string
  imageAlt: string
  nextDestinationLabel: string
  luggageWeightKg: number
  luggageMaxKg: number
}

export const packingListTrips: PackingListTrip[] = [
  {
    id: activeTrip.id,
    name: activeTrip.name,
    destination: activeTrip.destination,
    startDate: activeTrip.startDate,
    endDate: activeTrip.endDate,
    shortDateRange: activeTripShortDateRange,
    packed: activeTrip.packed,
    total: activeTrip.total,
    status: 'upcoming',
    statusLabel: activeTrip.statusLabel,
    imageUrl: activeTrip.imageUrl,
    imageAlt: activeTrip.imageAlt,
    nextDestinationLabel: activeTrip.nextDestinationLabel,
    luggageWeightKg: 24.2,
    luggageMaxKg: 23,
  },
  {
    id: 'paris',
    name: 'Paris Getaway',
    destination: 'Paris, France',
    startDate: '2024-09-15',
    endDate: '2024-09-20',
    shortDateRange: 'Sep 15 - Sep 20',
    packed: 28,
    total: 28,
    status: 'completed',
    statusLabel: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=640&q=80',
    imageAlt: 'Paris, France',
    nextDestinationLabel: 'Le Marais',
    luggageWeightKg: 18.5,
    luggageMaxKg: 23,
  },
]

export function packingListTripToDashboardCard(trip: PackingListTrip): DemoTripCard {
  return {
    id: trip.id,
    title: trip.name,
    dateRange: trip.shortDateRange,
    packed: trip.packed,
    total: trip.total,
    status: trip.status,
    statusLabel: trip.statusLabel,
    imageUrl: trip.imageUrl,
    imageAlt: trip.imageAlt,
  }
}

export const dashboardRecentTrips: DemoTripCard[] = packingListTrips.map(
  packingListTripToDashboardCard,
)

export const statsTopDestinations = [
  { name: 'Kyoto, Japan', visits: 4, tag: 'LEISURE' as const, green: true },
  { name: 'Paris, France', visits: 2, tag: 'LEISURE' as const, green: false },
  { name: 'London, UK', visits: 3, tag: 'BUSINESS' as const, green: false },
]
