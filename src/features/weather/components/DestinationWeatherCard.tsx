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
        d="M12 3v2M4.2 5.5l1.4 1.4M3 13h2m14 0h2M5.5 18.5l1.4-1.4M18.1 5.5 16.7 6.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 18a4 4 0 0 1 0-8 4.5 4.5 0 0 1 8.6-1.2A3.5 3.5 0 1 1 17 18H7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
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
    <div className="relative mx-auto w-full max-w-[248px] pt-1">
      <div className="rounded-xl border border-white/15 bg-slate-900/90 p-2.5 shadow-inner">
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
    <aside className="w-full max-w-[292px] shrink-0 rounded-2xl bg-[#0b1220] p-4 text-white shadow-lg">
      <MonitorPhoto
        imageUrl={imageUrl}
        alt={weather ? `View of ${weather.city}` : 'Destination preview'}
        gradientClass={gradientClass}
        onImageError={() => {
          if (weather?.imageUrl) setFailedImageUrl(weather.imageUrl)
        }}
      />

      <div className="mt-4 min-w-0 space-y-2">
        <div className="flex items-center gap-2 text-slate-300">
          <CloudSunIcon className="size-4 shrink-0 text-amber-300/90" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em]">
            Current Weather
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400" role="status" aria-live="polite">
            Loading weather…
          </p>
        ) : error ? (
          <p className="text-xs leading-relaxed text-amber-200/90">{error}</p>
        ) : weather ? (
          <>
            <p className="truncate text-[1.65rem] font-semibold leading-tight tracking-tight">
              {weather.displayCity}, {weather.temperature}
            </p>
            <p className="line-clamp-2 text-sm leading-snug text-slate-300">
              {weather.condition} • {weather.note}
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
