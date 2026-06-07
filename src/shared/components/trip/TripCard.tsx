import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { DemoTripCard } from '@/shared/demo/appDemoData'

type TripCardProps = {
  trip: DemoTripCard
}

function CalendarIcon() {
  return (
    <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function TripCard({ trip }: TripCardProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const progress = trip.total > 0 ? Math.round((trip.packed / trip.total) * 100) : 0
  const isComplete = trip.status === 'completed'
  const barColor = isComplete ? 'bg-brand-success' : 'bg-brand-primary'

  return (
    <article className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
      <div className="relative h-40 bg-gradient-to-br from-sky-200 via-brand-sky to-brand-primary sm:h-44">
        {!imageFailed ? (
          <img
            src={trip.imageUrl}
            alt={trip.imageAlt}
            className="size-full object-cover"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : null}
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${
            isComplete
              ? 'bg-white text-brand-success'
              : 'bg-white text-brand-primary'
          }`}
        >
          {trip.statusLabel}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{trip.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-brand-text">
            <CalendarIcon />
            {trip.dateRange}
          </p>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-brand-text">
              {trip.packed}/{trip.total} items packed
            </span>
            <span className="font-semibold text-slate-800">{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-brand-bg">
            <div
              className={`h-2 rounded-full transition-all ${barColor}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </article>
  )
}

export function StartPlanningCard() {
  return (
    <Link
      to="/new-trip/destination"
      className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-border bg-white p-6 text-center transition hover:border-brand-primary/40 hover:bg-brand-bg/50"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-brand-bg text-2xl font-light text-brand-primary">
        +
      </span>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">Start Planning</h3>
      <p className="mt-2 max-w-[200px] text-sm leading-relaxed text-brand-text">
        Create a new list for your next destination.
      </p>
    </Link>
  )
}
