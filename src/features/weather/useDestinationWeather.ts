import { useEffect, useState } from 'react'
import type { DestinationWeather } from './types'
import { fetchDestinationWeather } from './weatherApi'

type UseDestinationWeatherResult = {
  weather: DestinationWeather | null
  loading: boolean
  error: string | null
}

export function useDestinationWeather(destination: string): UseDestinationWeatherResult {
  const [weather, setWeather] = useState<DestinationWeather | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const query = destination.trim()
    let cancelled = false
    const debounceMs = query.length < 2 ? 0 : 450

    const timer = window.setTimeout(() => {
      if (cancelled) return

      if (query.length < 2) {
        setWeather(null)
        setLoading(false)
        setError(null)
        return
      }

      void (async () => {
        setLoading(true)
        setError(null)

        try {
          const result = await fetchDestinationWeather(query)
          if (cancelled) return

          if (result) {
            setWeather(result)
          } else {
            setWeather(null)
            setError('Location not found. Try a city or country name.')
          }
        } catch {
          if (!cancelled) {
            setWeather(null)
            setError('Could not load weather. Check your connection.')
          }
        } finally {
          if (!cancelled) {
            setLoading(false)
          }
        }
      })()
    }, debounceMs)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [destination])

  return { weather, loading, error }
}
