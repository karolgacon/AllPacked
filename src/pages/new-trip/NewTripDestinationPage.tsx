import { useNavigate } from 'react-router-dom'
import { Button, Card, Input } from '@/shared/components/ui'
import { useTripWizard, WizardStepper } from '@/features/trip-wizard'
import { DestinationWeatherCard, useDestinationWeather } from '@/features/weather'

const quickDestinations = ['Paris', 'New York', 'Bali']

type IconProps = {
  className?: string
}

function ArrowLeft({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 12H5M11 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowRight({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TrendUp({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m4 15 5-5 4 4 7-7M15 7h5v5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const infoCards = [
  {
    title: 'Recent',
    text: 'Last trip to London was 3 months ago.',
    icon: 'recent',
    iconClassName: 'bg-[#dbeafe] text-blue-700',
  },
  {
    title: 'Advice',
    text: 'Japan requires a travel adapter (Type A/B).',
    icon: 'advice',
    iconClassName: 'bg-[#ffddc7] text-orange-700',
  },
  {
    title: 'Inventory',
    text: 'You have 24 essential items pre-saved.',
    icon: 'inventory',
    iconClassName: 'bg-[#dbeafe] text-blue-700',
  },
]

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

export function NewTripDestinationPage() {
  const navigate = useNavigate()
  const { wizard, setDestination } = useTripWizard()
  const { weather, loading, error } = useDestinationWeather(wizard.destination)

  const canContinue = wizard.destination.trim().length > 1

  return (
    <div className="flex w-full flex-col gap-8">
      <WizardStepper activeStep="destination" />

      <Card className="min-h-0 border-blue-100 p-5 sm:p-8 lg:min-h-[400px] lg:p-10">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,max-content)_1fr] xl:items-center">
          <div className="w-full max-w-md space-y-7">
            <header>
              <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
                Where are you heading?
              </h1>
              <p className="mt-2 text-base text-slate-600">
                Tell us your destination to help us suggest the best items to pack.
              </p>
            </header>

            <div className="space-y-4">
              <label
                htmlFor="destination"
                className="block text-sm font-semibold text-blue-900"
              >
                City or Country
              </label>
              <div className="relative">
                <span
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
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
                  className="h-11 w-full max-w-md pl-12 text-sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-blue-900">Quick Selection</p>
              <div className="flex flex-wrap gap-3">
                {quickDestinations.map((city) => {
                  const isSelected = wizard.destination
                    .toLowerCase()
                    .includes(city.toLowerCase())

                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setDestination(city)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <TrendUp className="size-3.5" />
                        {city}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
              >
                <ArrowLeft className="size-5" />
                Cancel
              </button>
              <Button
                type="button"
                fullWidth={false}
                className="h-11 shrink-0 px-5"
                disabled={!canContinue}
                onClick={() => navigate('/new-trip/dates')}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  Next Step
                  <ArrowRight className="size-5" />
                </span>
              </Button>
            </div>
          </div>

          <div className="flex justify-center xl:pl-25 xl:pr-4">
            <DestinationWeatherCard weather={weather} loading={loading} error={error} />
          </div>
        </div>
      </Card>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        {infoCards.map((card) => (
          <article
            key={card.title}
            className="flex min-h-[90px] gap-4 rounded-lg bg-[#f3f7ff] p-5"
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
              <p className="mt-1 text-sm leading-5 text-slate-600">{card.text}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
