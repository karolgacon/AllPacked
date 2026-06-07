import { Card, Input } from '@/shared/components/ui'
import { useTripWizard, WizardNavigation, WizardStepper } from '@/features/trip-wizard'
import { DestinationWeatherCard, useDestinationWeather } from '@/features/weather'
import { newTripInfoCards } from '@/shared/demo/appDemoData'
import { quickDestinations } from '@/features/trip-wizard/tripWizardData'

type IconProps = {
  className?: string
}

function QuickArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 14.5 14.5 7M9 7h5.5v5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function InfoIcon({ name, className }: { name: string; className?: string }) {
  if (name === 'advice') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 18h6M10 22h4M8 14.5a6 6 0 1 1 8 0c-.8.7-1.2 1.4-1.2 2H9.2c0-.6-.4-1.3-1.2-2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'inventory') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 7h12l-1 14H7L6 7ZM10 11v6M14 11v6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12a8 8 0 1 0 2.3-5.7M4 5v5h5M12 8v5l3 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function weatherQueryFromDestination(destination: string) {
  return destination.split(',')[0]?.trim() ?? destination
}

export function NewTripDestinationPage() {
  const { wizard, setDestination } = useTripWizard()
  const { weather, loading, error } = useDestinationWeather(
    weatherQueryFromDestination(wizard.destination),
  )
  const canContinue = wizard.destination.trim().length > 1

  return (
    <div className="flex w-full flex-col gap-8">
      <WizardStepper activeStep="destination" />

      <Card className="mx-auto min-h-0 w-full max-w-[896px] border-brand-border p-5 sm:p-8 lg:min-h-[400px] lg:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,448px)_320px] lg:items-center lg:justify-between">
          <div className="w-full max-w-[448px] space-y-7">
            <header>
              <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
                Where are you heading?
              </h1>
              <p className="mt-2 text-base text-brand-text">
                Tell us your destination to help us suggest the best items to pack.
              </p>
            </header>

            <div className="space-y-4">
              <label
                htmlFor="destination"
                className="block text-sm font-semibold text-brand-navy"
              >
                City or Country
              </label>
              <div className="relative">
                <span
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-text"
                  aria-hidden="true"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="m21 21-4.3-4.3M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <Input
                  id="destination"
                  value={wizard.destination}
                  onChange={(event) => setDestination(event.target.value)}
                  placeholder="e.g. Kyoto, Japan"
                  className="h-11 w-full max-w-md pl-12 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-brand-navy">Quick Selection</p>
              <div className="flex flex-wrap gap-3">
                {quickDestinations.map((option) => {
                  const isSelected =
                    wizard.destination.toLowerCase() === option.value.toLowerCase()

                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setDestination(option.value)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-primary/20 ${
                        isSelected
                          ? 'border-brand-primary bg-brand-bg text-brand-primary'
                          : 'border-brand-border bg-white text-slate-700 hover:border-brand-primary hover:bg-brand-bg'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <QuickArrowIcon className="size-3.5" />
                        {option.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <WizardNavigation nextTo="/new-trip/dates" disabled={!canContinue} />
          </div>

          <div className="flex justify-center lg:justify-end">
            <DestinationWeatherCard weather={weather} loading={loading} error={error} />
          </div>
        </div>
      </Card>

      <section className="mx-auto grid w-full max-w-[896px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        {newTripInfoCards.map((card) => (
          <article
            key={card.title}
            className="flex min-h-[90px] gap-4 rounded-lg bg-brand-bg p-5"
          >
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${card.iconClassName}`}
              aria-hidden="true"
            >
              <InfoIcon name={card.icon} className="size-5" />
            </span>
            <div>
              <h2 className="text-xl font-semibold leading-none text-slate-950">
                {card.title}
              </h2>
              <p className="mt-1 text-sm leading-5 text-brand-text">{card.text}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
