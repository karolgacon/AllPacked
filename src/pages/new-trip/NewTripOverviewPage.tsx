import { useMemo } from 'react'
import { Button, Card } from '@/shared/components/ui'
import {
  useTripWizard,
  WizardNavigation,
  type TransportOption,
} from '@/features/trip-wizard'
import {
  CalendarIcon,
  CarIcon,
  CheckIcon,
  PlaneIcon,
  SparkIcon,
  TrainIcon,
} from '@/features/trip-wizard/components/WizardIcons'
import {
  activityOptions,
  transportOptions,
  tripTypeOptions,
} from '@/features/trip-wizard/tripWizardData'
import { formatTripPeriod, useTripWeather } from '@/features/weather'
import { activeTrip } from '@/shared/demo/appDemoData'

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function dateFromIso(dateIso: string) {
  return new Date(`${dateIso}T12:00:00`)
}

function durationNights(startDate: string, endDate: string) {
  if (!startDate || !endDate) return 0
  const start = dateFromIso(startDate).getTime()
  const end = dateFromIso(endDate).getTime()
  return Math.max(1, Math.round((end - start) / 86_400_000))
}

function destinationQuery(destination: string) {
  return destination.split(',')[0]?.trim() ?? destination
}

function labelForActivity(id: string) {
  return activityOptions.find((activity) => activity.id === id)?.label ?? id
}

function forecastErrorMessage(error: string) {
  if (error.toLowerCase().includes('forecast is available')) {
    return 'Forecast will update closer to departure.'
  }

  return error
}

const transportIcons: Record<Exclude<TransportOption, ''>, typeof PlaneIcon> = {
  plane: PlaneIcon,
  train: TrainIcon,
  car: CarIcon,
}

export function NewTripOverviewPage() {
  const { wizard, setOverview } = useTripWizard()
  const { weather, loading, error } = useTripWeather(
    destinationQuery(wizard.destination),
    wizard.dates.startDate,
    wizard.dates.endDate,
  )

  const periodLabel =
    formatTripPeriod(wizard.dates.startDate, wizard.dates.endDate) ?? 'Dates not selected'
  const nights = durationNights(wizard.dates.startDate, wizard.dates.endDate)
  const transport = transportOptions.find((option) => option.id === wizard.transport)
  const tripType = tripTypeOptions.find((option) => option.id === wizard.activities.tripType)
  const activityLabels = useMemo(
    () => wizard.activities.selected.map(labelForActivity),
    [wizard.activities.selected],
  )
  const readiness = wizard.overview.isFinalized ? 100 : 0
  const TransportIcon = wizard.transport ? transportIcons[wizard.transport] : PlaneIcon
  const heroImage = weather?.imageUrl ?? activeTrip.imageUrl

  return (
    <div className="flex w-full flex-col gap-7">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary">
          Final Review
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-950 sm:text-3xl">
          Your trip overview
        </h1>
        <p className="mt-2 text-sm text-brand-text">
          Review your route, timing, travel style and weather before creating the packing list.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <Card className="overflow-hidden p-0">
            <div className="relative min-h-[290px] overflow-hidden bg-slate-950">
              <img
                src={heroImage}
                alt={weather ? `View of ${weather.city}` : activeTrip.imageAlt}
                className="absolute inset-0 size-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/10" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="max-w-xl text-white">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/75 ring-1 ring-white/20">
                    <MapPinIcon className="size-4" />
                    Destination locked
                  </span>
                  <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {wizard.destination || 'Choose a destination'}
                  </h2>
                  <p className="mt-3 flex items-center gap-2 text-sm text-white/80">
                    <CalendarIcon className="size-4" />
                    {periodLabel}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
              <div className="rounded-xl border border-brand-border bg-brand-bg p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-text">
                  Duration
                </p>
                <p className="mt-2 text-2xl font-semibold text-brand-navy">
                  {nights} {nights === 1 ? 'night' : 'nights'}
                </p>
              </div>
              <div className="rounded-xl border border-brand-border bg-brand-bg p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-text">
                  Travel type
                </p>
                <p className="mt-2 text-2xl font-semibold text-brand-navy">
                  {tripType?.label ?? 'Not set'}
                </p>
              </div>
              <div className="rounded-xl border border-brand-border bg-brand-bg p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-text">
                  Activities
                </p>
                <p className="mt-2 text-2xl font-semibold text-brand-navy">
                  {activityLabels.length}
                </p>
              </div>
            </div>
          </Card>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="p-5">
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-bg text-brand-primary">
                  <TransportIcon className="size-7" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-text">
                    Transport
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-brand-navy">
                    {transport?.title ?? 'Not selected'}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-brand-text">
                    {transport?.meta ?? 'Select a transport method to tune packing rules.'}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-bg text-brand-primary">
                  <SunIcon className="size-7" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-text">
                    Climate
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-brand-navy">
                    {weather?.condition ?? 'Forecast pending'}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-brand-text">
                    {weather?.temperatureRange ?? (error ? forecastErrorMessage(error) : 'Weather will appear after dates and destination are set.')}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-5 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-text">
                  Packing focus
                </p>
                <h2 className="mt-2 text-xl font-semibold text-brand-navy">
                  {tripType?.description ?? 'Choose a trip type to tailor recommendations.'}
                </h2>
              </div>
              <span className="text-sm font-semibold text-brand-primary">
                {activityLabels.length} selected
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {activityLabels.length > 0 ? (
                activityLabels.map((activity) => (
                  <span
                    key={activity}
                    className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                  >
                    <SparkIcon className="size-4 text-brand-primary" />
                    {activity}
                  </span>
                ))
              ) : (
                <span className="rounded-xl border border-dashed border-brand-border px-4 py-3 text-sm text-brand-text">
                  No activities selected yet.
                </span>
              )}
            </div>
          </Card>
        </div>

        <aside className="flex flex-col gap-5">
          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Trip Forecast</h2>
                <p className="mt-1 text-sm text-brand-text">{periodLabel}</p>
              </div>
              <SunIcon className="size-8 text-brand-primary" />
            </div>

            {loading ? (
              <p className="mt-8 text-sm text-brand-text" role="status" aria-live="polite">
                Loading forecast...
              </p>
            ) : error ? (
              <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-800">
                {forecastErrorMessage(error)}
              </div>
            ) : (
              <>
                <p className="mt-8 text-5xl font-semibold tracking-tight text-slate-950">
                  {weather?.temperature ?? '15C'}
                </p>
                <p className="mt-2 text-sm font-medium text-brand-text">
                  {weather?.condition ?? 'Mostly sunny'}
                </p>
                <dl className="mt-7 space-y-4 border-t border-brand-border pt-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-brand-text">Expected range</dt>
                    <dd className="font-semibold text-slate-950">
                      {weather?.temperatureRange ?? '18C / 14C'}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-brand-text">Packing note</dt>
                    <dd className="max-w-[150px] text-right font-semibold text-slate-950">
                      {weather?.note ?? 'Pack flexible layers'}
                    </dd>
                  </div>
                </dl>
              </>
            )}
          </Card>

          <div className="rounded-2xl bg-brand-primary p-6 text-white shadow-[0_12px_30px_rgba(0,89,187,0.25)]">
            <h2 className="text-xl font-semibold">Ready to pack?</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              We generated a custom packing plan for your {nights}-night trip.
            </p>
            <div className="mt-8">
              <div className="flex items-center justify-between text-xs font-semibold text-white/80">
                <span>Packing readiness</span>
                <span>{readiness}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/25">
                <div
                  className="h-2 rounded-full bg-white transition-all"
                  style={{ width: `${readiness}%` }}
                />
              </div>
            </div>
            <Button
              type="button"
              variant="secondary"
              className="mt-8 inline-flex h-11 items-center justify-center gap-2"
              onClick={() => setOverview({ isFinalized: true })}
            >
              {wizard.overview.isFinalized ? 'Trip Finalized' : 'Finalize Trip'}
              <CheckIcon className="size-4" />
            </Button>
          </div>

          <Card className="p-5">
            <p className="text-sm font-semibold text-brand-navy">Traveler Tip</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-text">
              Keep one small day bag ready for documents, chargers and weather layers.
            </p>
          </Card>
        </aside>
      </div>

      <WizardNavigation
        backTo="/new-trip/activities"
        nextLabel="Finalize Trip"
        onNext={() => setOverview({ isFinalized: true })}
      />
    </div>
  )
}
