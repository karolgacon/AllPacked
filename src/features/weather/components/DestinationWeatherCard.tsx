import { useState } from 'react'
import type { DestinationWeather } from '../types'

const PLACEHOLDER_GRADIENT = 'from-orange-300 via-slate-700 to-slate-950'

type DestinationWeatherCardProps = {
  weather: DestinationWeather | null
  loading: boolean
  error: string | null
}

function CloudSunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v2.2M4.2 5.2l1.6 1.6M2.8 13h2.4m13.6 0h2.4M5.8 18.9l-1.6 1.6M18.2 6.8l1.6-1.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M7 18.5a4.2 4.2 0 0 1 .1-8.4 4.8 4.8 0 0 1 9.1-1.3A3.9 3.9 0 1 1 17 18.5H7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function parseCelsius(temperature: string): number | null {
  const match = temperature.match(/-?\d+/)
  return match ? Number(match[0]) : null
}

function weatherAdvice(condition: string, temperature: string): string {
  const normalized = condition.toLowerCase()
  const celsius = parseCelsius(temperature)

  if (normalized.includes('rain') || normalized.includes('drizzle') || normalized.includes('shower')) {
    return "Don't forget your coat."
  }

  if (normalized.includes('snow')) {
    return 'Pack warm boots and gloves.'
  }

  if (normalized.includes('thunder')) {
    return 'Keep a compact umbrella handy.'
  }

  if (normalized.includes('fog')) {
    return 'Plan extra time for getting around.'
  }

  if (normalized.includes('clear')) {
    return 'Bring sunglasses and sunscreen.'
  }

  if (normalized.includes('cloud')) {
    if (celsius !== null && celsius > 18) {
      return 'Comfortable weather for walking.'
    }

    return 'Take a light jacket for the day.'
  }

  if (celsius !== null && celsius > 18) {
    return 'Comfortable weather for walking.'
  }

  return 'Pack one flexible extra layer.'
}

function MonitorPhoto({
  imageUrl,
  alt,
  gradientClass,
  onImageError,
}: {
  imageUrl: string | null
  alt: string
  gradientClass: string
  onImageError: () => void
}) {
  const showPhoto = Boolean(imageUrl)

  return (
    <div className="relative mx-auto w-full max-w-[276px] pt-1">
      <div className="rounded-xl border border-white/15 bg-slate-900/90 p-3 shadow-inner">
        <div className="overflow-hidden rounded-lg border border-white/20 bg-slate-800">
          <div className="relative aspect-[16/10] w-full">
            {showPhoto && imageUrl ? (
              <img
                src={imageUrl}
                alt={alt}
                className="size-full object-cover"
                loading="lazy"
                onError={onImageError}
              />
            ) : (
              <div
                className={`size-full bg-gradient-to-br ${gradientClass}`}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
      <div
        className="mx-auto mt-1 h-1.5 w-14 rounded-b-md bg-slate-700/90"
        aria-hidden="true"
      />
      <div
        className="mx-auto -mt-px h-1 w-24 rounded-b-lg bg-slate-800/80"
        aria-hidden="true"
      />
    </div>
  )
}

export function DestinationWeatherCard({
  weather,
  loading,
  error,
}: DestinationWeatherCardProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null)
  const gradientClass = weather?.imageClass ?? PLACEHOLDER_GRADIENT
  const imageUrl =
    weather?.imageUrl && failedImageUrl !== weather.imageUrl ? weather.imageUrl : null

  return (
    <aside className="w-full max-w-[320px] shrink-0 rounded-2xl bg-[#0b1220] p-5 text-white shadow-lg">
      <MonitorPhoto
        imageUrl={imageUrl}
        alt={weather ? `View of ${weather.city}` : 'Destination preview'}
        gradientClass={gradientClass}
        onImageError={() => {
          if (weather?.imageUrl) setFailedImageUrl(weather.imageUrl)
        }}
      />

      <div className="mt-5 min-w-0 space-y-2.5">
        <div className="flex items-center gap-3 text-slate-300">
          <CloudSunIcon className="size-8 shrink-0 text-amber-300" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em]">
            Current Weather
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400" role="status" aria-live="polite">
            Loading weather...
          </p>
        ) : error ? (
          <p className="text-xs leading-relaxed text-amber-200/90">{error}</p>
        ) : weather ? (
          <>
            <p className="truncate text-[1.9rem] font-semibold leading-tight tracking-tight">
              {weather.displayCity}, {weather.temperature}
            </p>
            <p className="line-clamp-2 text-[0.95rem] leading-snug text-slate-300">
              {weather.condition} - {weatherAdvice(weather.condition, weather.temperature)}
            </p>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-slate-400">
            Enter a destination to see live weather.
          </p>
        )}
      </div>
    </aside>
  )
}
