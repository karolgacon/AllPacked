import { useTripWeather } from '../useTripWeather'

function CloudIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  )
}

type PackingListWeatherPanelProps = {
  destination: string
  startDate: string
  endDate: string
}

export function PackingListWeatherPanel({
  destination,
  startDate,
  endDate,
}: PackingListWeatherPanelProps) {
  const { weather, loading, error } = useTripWeather(destination, startDate, endDate)

  return (
    <div className="rounded-2xl border border-[#E6E8F3] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-[#999999]">
        <CloudIcon />
        <span className="text-sm font-semibold text-[#0F172A]">
          {loading
            ? 'Weather…'
            : weather
              ? `Weather: ${weather.displayCity}`
              : 'Weather'}
        </span>
      </div>

      {error ? (
        <p className="text-xs leading-relaxed text-amber-700">{error}</p>
      ) : loading ? (
        <p className="text-xs text-[#999999]" role="status" aria-live="polite">
          Loading forecast for your trip…
        </p>
      ) : weather ? (
        <>
          {weather.periodLabel ? (
            <p className="mb-2 text-xs text-[#999999]">{weather.periodLabel}</p>
          ) : null}
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-[#999999]">Expected high</span>
            <span className="text-sm font-bold text-[#0F172A]">{weather.temperature}</span>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-[#999999]">High / low on trip</span>
            <span className="text-xs font-medium text-[#0F172A]">
              {weather.temperatureRange}
            </span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-900">
            {weather.condition} – {weather.note}
          </p>
        </>
      ) : null}
    </div>
  )
}
