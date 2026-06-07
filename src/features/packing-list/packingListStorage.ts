import {
  packingListTrips as seedTrips,
  type PackingListTrip,
} from '@/shared/demo/appDemoData'
import { packingListCategoriesByTripId } from '@/shared/demo/packingListDemoContent'
import type { PackingListCategory, StoredPackingList } from './types'
import {
  countCheckedItems,
  countPackingItems,
} from './generatePackingList'
import {
  calculateCheckedLuggageWeightKg,
  normalizeCategoryWeights,
} from './itemWeights'

const STORAGE_KEY = 'allpacked-packing-lists'

type PackingListStore = {
  lists: Record<string, StoredPackingList>
}

function loadStore(): PackingListStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { lists: {} }

    const parsed = JSON.parse(raw) as PackingListStore
    if (!parsed.lists || typeof parsed.lists !== 'object') {
      return { lists: {} }
    }

    return parsed
  } catch {
    return { lists: {} }
  }
}

function saveStore(store: PackingListStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  window.dispatchEvent(new Event('allpacked-packing-lists-updated'))
}

function syncTripCounts(trip: PackingListTrip, categories: PackingListCategory[]): PackingListTrip {
  const normalized = normalizeCategoryWeights(categories)
  const total = countPackingItems(normalized)
  const packed = countCheckedItems(normalized)
  const luggageWeightKg = calculateCheckedLuggageWeightKg(normalized)

  return {
    ...trip,
    total,
    packed,
    luggageWeightKg,
    status: packed === total && total > 0 ? 'completed' : trip.status === 'completed' ? 'completed' : 'upcoming',
    statusLabel:
      packed === total && total > 0
        ? 'Completed'
        : trip.statusLabel === 'Completed'
          ? 'Completed'
          : trip.statusLabel,
  }
}

export function savePackingList(list: StoredPackingList) {
  const store = loadStore()
  const categories = normalizeCategoryWeights(list.categories)
  store.lists[list.trip.id] = {
    ...list,
    categories,
    trip: syncTripCounts(list.trip, categories),
  }
  saveStore(store)
}

export function getStoredPackingList(tripId: string): StoredPackingList | undefined {
  return loadStore().lists[tripId]
}

export function getPackingListTrip(tripId: string): PackingListTrip | undefined {
  const stored = getStoredPackingList(tripId)
  if (stored) return stored.trip

  const seedTrip = seedTrips.find((trip) => trip.id === tripId)
  if (!seedTrip) return undefined

  const categories = normalizeCategoryWeights(packingListCategoriesByTripId[tripId] ?? [])
  return syncTripCounts(seedTrip, categories)
}

export function getPackingListCategories(tripId: string): PackingListCategory[] {
  const stored = getStoredPackingList(tripId)
  if (stored) return normalizeCategoryWeights(stored.categories)

  return normalizeCategoryWeights(packingListCategoriesByTripId[tripId] ?? [])
}

export function updatePackingListCategories(
  tripId: string,
  categories: PackingListCategory[],
) {
  const store = loadStore()
  const existing = store.lists[tripId]
  const seedTrip = seedTrips.find((trip) => trip.id === tripId)
  const normalized = normalizeCategoryWeights(categories)

  if (existing) {
    store.lists[tripId] = {
      ...existing,
      categories: normalized,
      trip: syncTripCounts(existing.trip, normalized),
    }
    saveStore(store)
    return
  }

  if (seedTrip) {
    store.lists[tripId] = {
      trip: syncTripCounts(seedTrip, normalized),
      categories: normalized,
      createdAt: new Date().toISOString(),
    }
    saveStore(store)
  }
}

export function listAllPackingListTrips(): PackingListTrip[] {
  const store = loadStore()
  const merged = new Map<string, PackingListTrip>()

  for (const trip of seedTrips) {
    const stored = store.lists[trip.id]
    if (stored) {
      merged.set(trip.id, stored.trip)
      continue
    }

    const categories = normalizeCategoryWeights(packingListCategoriesByTripId[trip.id] ?? [])
    merged.set(trip.id, syncTripCounts(trip, categories))
  }

  for (const list of Object.values(store.lists)) {
    if (!seedTrips.some((trip) => trip.id === list.trip.id)) {
      merged.set(list.trip.id, list.trip)
    }
  }

  const customTrips = Object.values(store.lists)
    .filter((list) => !seedTrips.some((trip) => trip.id === list.trip.id))
    .map((list) => list.trip)
    .sort((a, b) => b.id.localeCompare(a.id))

  return [...customTrips, ...seedTrips.map((trip) => merged.get(trip.id)!)]
}
