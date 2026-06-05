import { useEffect, useState } from 'react'
import type { DestinationWeather } from './types'
import { fetchTripWeather } from './tripWeatherApi'

type UseTripWeatherResult = {
  weather: DestinationWeather | null
  loading: boolean
  error: string | null
}

export function useTripWeather(
  destination: string,
  startDate: string,
  endDate: string,
): UseTripWeatherResult {
  const [weather, setWeather] = useState<DestinationWeather | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const destinationQuery = destination.trim()
    const start = startDate.trim()
    let cancelled = false
    const debounceMs = destinationQuery.length < 2 || !start ? 0 : 450

    const timer = window.setTimeout(() => {
      if (cancelled) return

      if (destinationQuery.length < 2 || !start) {
        setWeather(null)
        setLoading(false)
        setError(
          start
            ? null
            : 'Set trip dates in New Trip to see weather for your travel window.',
        )
        return
      }

      void (async () => {
        setLoading(true)
        setError(null)

        try {
          const result = await fetchTripWeather(destinationQuery, start, endDate)
          if (cancelled) return

          if (result) {
            setWeather(result)
          } else {
            setWeather(null)
            setError('Location not found. Try a city or country name.')
          }
        } catch (caught) {
          if (!cancelled) {
            setWeather(null)
            setError(
              caught instanceof Error
                ? caught.message
                : 'Could not load trip weather. Check your connection.',
            )
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
  }, [destination, startDate, endDate])

  return { weather, loading, error }
}
