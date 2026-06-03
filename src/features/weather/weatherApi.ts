import { fetchLocationImageUrl } from './locationImageApi'
import type { DestinationWeather } from './types'
import {
  buildCurrentWeatherResult,
  fetchCurrentForecast,
  geocodeDestination,
} from './weatherApi.shared'

export async function fetchDestinationWeather(
  query: string,
): Promise<DestinationWeather | null> {
  const location = await geocodeDestination(query)
  if (!location) {
    return null
  }

  const [forecastData, imageUrl] = await Promise.all([
    fetchCurrentForecast(location.latitude, location.longitude),
    fetchLocationImageUrl(
      location.name,
      location.country,
      location.latitude,
      location.longitude,
    ),
  ])

  return buildCurrentWeatherResult(location, forecastData, imageUrl)
}
