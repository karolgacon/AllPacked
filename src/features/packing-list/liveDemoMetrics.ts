import {
  demoStats,
  packingListTripToDashboardCard,
  packingListTrips as seedTrips,
  statsTopDestinations,
  type DemoTripCard,
  type PackingListTrip,
} from '@/shared/demo/appDemoData'

const SEED_PACKED_BASELINE = seedTrips.reduce((sum, trip) => sum + trip.packed, 0)

export type LiveDemoMetrics = {
  totalTrips: number
  totalTripsDelta: string
  itemsPacked: number
  itemsPackedNote: string
  packingEfficiency: number
  lastListEfficiency: number
  countriesVisited: number
  countriesNote: string
  avgItemsPerTrip: number
  weightLimitCompliance: number
  featuredTrip: PackingListTrip | undefined
  dashboardTrips: DemoTripCard[]
  topDestinations: Array<{
    name: string
    visits: number
    tag: 'LEISURE' | 'BUSINESS'
    green: boolean
  }>
}

function customTrips(trips: PackingListTrip[]) {
  return trips.filter((trip) => !seedTrips.some((seed) => seed.id === trip.id))
}

function countNewDestinations(trips: PackingListTrip[]) {
  const seedDestinations = new Set(seedTrips.map((trip) => trip.destination.toLowerCase()))

  return customTrips(trips).filter(
    (trip) => !seedDestinations.has(trip.destination.toLowerCase()),
  ).length
}

function efficiencyPercent(trip: PackingListTrip) {
  if (trip.total <= 0) return 0
  return Math.round((trip.packed / trip.total) * 100)
}

function featuredTripFrom(trips: PackingListTrip[]) {
  const created = customTrips(trips)
  if (created.length > 0) return created[0]

  return trips.find((trip) => trip.status === 'upcoming') ?? trips[0]
}

function lastListEfficiencyFrom(trips: PackingListTrip[]) {
  const featured = featuredTripFrom(trips)
  if (!featured) return demoStats.lastListEfficiency

  if (featured.packed > 0) return efficiencyPercent(featured)

  const withProgress = trips.find((trip) => trip.packed > 0)
  if (withProgress) return efficiencyPercent(withProgress)

  return efficiencyPercent(featured)
}

function buildTopDestinations(trips: PackingListTrip[]) {
  const counts = new Map<
    string,
    { name: string; visits: number; tag: 'LEISURE' | 'BUSINESS'; green: boolean }
  >()

  for (const destination of statsTopDestinations) {
    counts.set(destination.name.toLowerCase(), { ...destination })
  }

  for (const trip of customTrips(trips)) {
    const key = trip.destination.toLowerCase()
    const existing = counts.get(key)

    if (existing) {
      existing.visits += 1
      continue
    }

    counts.set(key, {
      name: trip.destination,
      visits: 1,
      tag: 'LEISURE',
      green: false,
    })
  }

  return [...counts.values()].sort((a, b) => b.visits - a.visits).slice(0, 5)
}

export function computeLiveDemoMetrics(trips: PackingListTrip[]): LiveDemoMetrics {
  const created = customTrips(trips)
  const currentPacked = trips.reduce((sum, trip) => sum + trip.packed, 0)
  const currentTotal = trips.reduce((sum, trip) => sum + trip.total, 0)
  const newDestinations = countNewDestinations(trips)
  const featuredTrip = featuredTripFrom(trips)

  const itemsPacked = demoStats.itemsPacked - SEED_PACKED_BASELINE + currentPacked
  const totalTrips = demoStats.totalTrips + created.length
  const packingEfficiency =
    currentTotal > 0
      ? Math.round((currentPacked / currentTotal) * 1000) / 10
      : demoStats.packingEfficiency

  const compliantTrips = trips.filter(
    (trip) => trip.luggageWeightKg <= trip.luggageMaxKg,
  ).length

  return {
    totalTrips,
    totalTripsDelta:
      created.length > 0
        ? `+${created.length} new list${created.length > 1 ? 's' : ''}`
        : demoStats.totalTripsDelta,
    itemsPacked,
    itemsPackedNote:
      currentPacked > SEED_PACKED_BASELINE
        ? `+${currentPacked - SEED_PACKED_BASELINE} from your lists`
        : demoStats.itemsPackedNote,
    packingEfficiency,
    lastListEfficiency: lastListEfficiencyFrom(trips),
    countriesVisited: demoStats.countriesVisited + newDestinations,
    countriesNote:
      newDestinations > 0
        ? `+${newDestinations} new this session`
        : '3 New this year',
    avgItemsPerTrip: trips.length > 0 ? Math.round(currentTotal / trips.length) : 0,
    weightLimitCompliance:
      trips.length > 0 ? Math.round((compliantTrips / trips.length) * 100) : 85,
    featuredTrip,
    dashboardTrips: trips.map(packingListTripToDashboardCard),
    topDestinations: buildTopDestinations(trips),
  }
}
