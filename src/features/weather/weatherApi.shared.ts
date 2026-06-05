import type { DestinationWeather } from './types'

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search'

export type GeocodedLocation = {
  name: string
  country?: string
  latitude: number
  longitude: number
}

type GeocodingResponse = {
  results?: GeocodedLocation[]
}

export type DailyWeatherSeries = {
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  weather_code: number[]
}

type ForecastResponse = {
  current?: {
    temperature_2m: number
    weather_code: number
  }
  daily?: DailyWeatherSeries
}

export function weatherCodeToCondition(code: number): string {
  if (code === 0) return 'Clear'
  if (code <= 3) return 'Partly Cloudy'
  if (code <= 48) return 'Foggy'
  if (code <= 57) return 'Drizzle'
  if (code <= 67) return 'Rain'
  if (code <= 77) return 'Snow'
  if (code <= 82) return 'Showers'
  if (code <= 86) return 'Snow Showers'
  if (code <= 99) return 'Thunderstorm'
  return 'Variable'
}

export function weatherCodeToGradient(code: number): string {
  if (code === 0) return 'from-cyan-300 via-indigo-500 to-slate-950'
  if (code <= 3) return 'from-orange-300 via-slate-700 to-slate-950'
  if (code <= 48) return 'from-slate-400 via-slate-600 to-slate-950'
  if (code <= 67) return 'from-sky-300 via-blue-500 to-slate-900'
  if (code <= 77) return 'from-slate-200 via-blue-300 to-slate-900'
  if (code <= 86) return 'from-slate-200 via-blue-300 to-slate-900'
  return 'from-violet-400 via-indigo-600 to-slate-950'
}

function temperatureToPackingNote(celsius: number): string {
  if (celsius < 5) return 'Pack warm layers and a waterproof jacket.'
  if (celsius < 15) return 'Pack layers and comfortable shoes.'
  if (celsius < 25) return 'Perfect for walking.'
  return 'Bring light clothes and sunscreen.'
}

export async function geocodeDestination(query: string): Promise<GeocodedLocation | null> {
  const geoUrl = new URL(GEOCODING_API)
  geoUrl.searchParams.set('name', query.trim())
  geoUrl.searchParams.set('count', '1')
  geoUrl.searchParams.set('language', 'en')
  geoUrl.searchParams.set('format', 'json')

  const geoResponse = await fetch(geoUrl)
  if (!geoResponse.ok) {
    throw new Error('Geocoding request failed')
  }

  const geoData = (await geoResponse.json()) as GeocodingResponse
  return geoData.results?.[0] ?? null
}

function aggregateDailySeries(daily: DailyWeatherSeries) {
  const tripHigh = Math.round(Math.max(...daily.temperature_2m_max))
  const tripLow = Math.round(Math.min(...daily.temperature_2m_min))
  const avgHigh =
    daily.temperature_2m_max.reduce((sum, value) => sum + value, 0) /
    daily.temperature_2m_max.length
  const midIndex = Math.floor(daily.weather_code.length / 2)

  return {
    tripHigh,
    tripLow,
    avgHigh,
    weatherCode: daily.weather_code[midIndex] ?? daily.weather_code[0],
  }
}

export function buildWeatherResult(
  location: GeocodedLocation,
  daily: DailyWeatherSeries,
  imageUrl: string | null,
  periodLabel?: string,
): DestinationWeather {
  const { tripHigh, tripLow, avgHigh, weatherCode } = aggregateDailySeries(daily)
  const cityLabel = location.country
    ? `${location.name}, ${location.country}`
    : location.name

  return {
    displayCity: location.name,
    city: cityLabel,
    temperature: `${tripHigh}\u00b0C`,
    temperatureRange: `${tripHigh}\u00b0C / ${tripLow}\u00b0C`,
    condition: weatherCodeToCondition(weatherCode),
    note: temperatureToPackingNote(avgHigh),
    imageClass: weatherCodeToGradient(weatherCode),
    imageUrl,
    periodLabel,
  }
}

export async function fetchCurrentForecast(
  latitude: number,
  longitude: number,
): Promise<ForecastResponse> {
  const forecastUrl = new URL('https://api.open-meteo.com/v1/forecast')
  forecastUrl.searchParams.set('latitude', String(latitude))
  forecastUrl.searchParams.set('longitude', String(longitude))
  forecastUrl.searchParams.set('current', 'temperature_2m,weather_code')
  forecastUrl.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min')
  forecastUrl.searchParams.set('forecast_days', '1')
  forecastUrl.searchParams.set('timezone', 'auto')

  const forecastResponse = await fetch(forecastUrl)
  if (!forecastResponse.ok) {
    throw new Error('Weather request failed')
  }

  return (await forecastResponse.json()) as ForecastResponse
}

export function buildCurrentWeatherResult(
  location: GeocodedLocation,
  forecastData: ForecastResponse,
  imageUrl: string | null,
): DestinationWeather {
  const current = forecastData.current
  if (!current) {
    throw new Error('Weather data unavailable')
  }

  const cityLabel = location.country
    ? `${location.name}, ${location.country}`
    : location.name
  const roundedTemp = Math.round(current.temperature_2m)
  const dailyMax = forecastData.daily?.temperature_2m_max[0]
  const dailyMin = forecastData.daily?.temperature_2m_min[0]
  const temperatureRange =
    dailyMax !== undefined && dailyMin !== undefined
      ? `${Math.round(dailyMax)}\u00b0C / ${Math.round(dailyMin)}\u00b0C`
      : `${roundedTemp}\u00b0C`

  return {
    displayCity: location.name,
    city: cityLabel,
    temperature: `${roundedTemp}\u00b0C`,
    temperatureRange,
    condition: weatherCodeToCondition(current.weather_code),
    note: temperatureToPackingNote(roundedTemp),
    imageClass: weatherCodeToGradient(current.weather_code),
    imageUrl,
  }
}
