import { useCallback, useEffect, useMemo, useState } from 'react'
import type { PackingListTrip } from '@/shared/demo/appDemoData'
import { computeLiveDemoMetrics } from './liveDemoMetrics'
import { listAllPackingListTrips } from './packingListStorage'

export function usePackingLists() {
  const [trips, setTrips] = useState<PackingListTrip[]>(() => listAllPackingListTrips())

  const refresh = useCallback(() => {
    setTrips(listAllPackingListTrips())
  }, [])

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'allpacked-packing-lists') {
        refresh()
      }
    }

    const onPackingListsUpdated = () => {
      refresh()
    }

    window.addEventListener('storage', onStorage)
    window.addEventListener('allpacked-packing-lists-updated', onPackingListsUpdated)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('allpacked-packing-lists-updated', onPackingListsUpdated)
    }
  }, [refresh])

  const metrics = useMemo(() => computeLiveDemoMetrics(trips), [trips])

  return { trips, metrics, refresh }
}
