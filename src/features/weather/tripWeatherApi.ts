import { fetchLocationImageUrl } from './locationImageApi'
import { formatTripPeriod } from './formatTripPeriod'
import type { DestinationWeather } from './types'
import {
  buildWeatherResult,
  geocodeDestination,
  type DailyWeatherSeries,
} from './weatherApi.shared'

const FORECAST_API = 'https://api.open-meteo.com/v1/forecast'
const ARCHIVE_API = 'https://archive-api.open-meteo.com/v1/archive'
const FORECAST_HORIZON_DAYS = 16

type DailyApiResponse = {
  daily?: DailyWeatherSeries
}

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10)
}

function normalizeTripDates(startDate: string, endDate: string): { start: string; end: string } | null {
  const start = startDate.trim()
  if (!start) return null

  const end = endDate.trim() || start
  if (start > end) return { start: end, end: start }
  return { start, end }
}

async function fetchHistoricalDaily(
  latitude: number,
  longitude: number,
  start: string,
  end: string,
): Promise<DailyWeatherSeries> {
  const url = new URL(ARCHIVE_API)
  url.searchParams.set('latitude', String(latitude))
  url.searchParams.set('longitude', String(longitude))
  url.searchParams.set('start_date', start)
  url.searchParams.set('end_date', end)
  url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,weather_code')
  url.searchParams.set('timezone', 'auto')

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Historical weather request failed')
  }

  const data = (await response.json()) as DailyApiResponse
  if (!data.daily?.temperature_2m_max.length) {
    throw new Error('No historical weather for these dates')
  }

  return data.daily
}

async function fetchForecastDaily(
  latitude: number,
  longitude: number,
  start: string,
  end: string,
): Promise<DailyWeatherSeries> {
  const url = new URL(FORECAST_API)
  url.searchParams.set('latitude', String(latitude))
  url.searchParams.set('longitude', String(longitude))
  url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,weather_code')
  url.searchParams.set('timezone', 'auto')
  url.searchParams.set('start_date', start)
  url.searchParams.set('end_date', end)

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Forecast weather request failed')
  }

  const data = (await response.json()) as DailyApiResponse
  if (!data.daily?.temperature_2m_max.length) {
    throw new Error('No forecast weather for these dates')
  }

  return data.daily
}

function daysUntil(dateIso: string): number {
  const target = new Date(`${dateIso}T12:00:00`).getTime()
  const today = new Date(`${todayIsoDate()}T12:00:00`).getTime()
  return Math.round((target - today) / 86_400_000)
}

export async function fetchTripWeather(
  query: string,
  startDate: string,
  endDate: string,
): Promise<DestinationWeather | null> {
  const dates = normalizeTripDates(startDate, endDate)
  if (!dates) return null

  const location = await geocodeDestination(query)
  if (!location) return null

  const today = todayIsoDate()
  let daily: DailyWeatherSeries

  if (dates.end < today) {
    daily = await fetchHistoricalDaily(
      location.latitude,
      location.longitude,
      dates.start,
      dates.end,
    )
  } else if (daysUntil(dates.start) > FORECAST_HORIZON_DAYS) {
    throw new Error(
      `Forecast is available up to ${FORECAST_HORIZON_DAYS} days ahead. Choose dates closer to today.`,
    )
  } else {
    const forecastStart = dates.start < today ? today : dates.start
    daily = await fetchForecastDaily(
      location.latitude,
      location.longitude,
      forecastStart,
      dates.end,
    )
  }

  const imageUrl = await fetchLocationImageUrl(
    location.name,
    location.country,
    location.latitude,
    location.longitude,
  )

  const periodLabel = formatTripPeriod(dates.start, dates.end) ?? undefined

  return buildWeatherResult(location, daily, imageUrl, periodLabel)
}
