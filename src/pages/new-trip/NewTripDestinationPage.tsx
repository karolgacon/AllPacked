import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input } from '@/shared/components/ui'
import { useTripWizard, WizardStepper } from '@/features/trip-wizard'

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

const weatherByDestination: Record<
  string,
  {
    city: string
    temperature: string
    condition: string
    note: string
    imageClass: string
  }
> = {
  Paris: {
    city: 'Paris',
    temperature: '16\u00b0C',
    condition: 'Mild',
    note: 'Pack layers and comfortable shoes.',
    imageClass: 'from-sky-300 via-blue-500 to-slate-900',
  },
  'New York': {
    city: 'New York',
    temperature: '21\u00b0C',
    condition: 'Clear',
    note: 'Great weather for city walking.',
    imageClass: 'from-cyan-300 via-indigo-500 to-slate-950',
  },
  Bali: {
    city: 'Bali',
    temperature: '29\u00b0C',
    condition: 'Humid',
    note: 'Bring light clothes and sunscreen.',
    imageClass: 'from-emerald-300 via-teal-500 to-slate-900',
  },
  Kyoto: {
    city: 'Kyoto',
    temperature: '18\u00b0C',
    condition: 'Partly Cloudy',
    note: 'Perfect for walking.',
    imageClass: 'from-orange-300 via-slate-700 to-slate-950',
  },
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

  const weather = useMemo(() => {
    const matchedDestination = Object.keys(weatherByDestination).find((city) =>
      wizard.destination.toLowerCase().includes(city.toLowerCase()),
    )

    return weatherByDestination[matchedDestination ?? 'Kyoto']
  }, [wizard.destination])

  const canContinue = wizard.destination.trim().length > 1

  return (
    <div className="mx-auto flex w-full max-w-[896px] flex-col gap-8">
      <WizardStepper activeStep="destination" />

      <Card className="min-h-[400px] border-blue-100 p-10">
        <div className="grid gap-8 lg:grid-cols-[360px_292px] lg:items-center lg:justify-between">
          <div className="space-y-7">
            <header>
              <h1 className="text-3xl font-semibold text-slate-950">
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
                  className="h-11 max-w-[292px] pl-12 text-sm"
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

            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
              >
                <ArrowLeft className="size-5" />
                Cancel
              </button>
              <Button
                type="button"
                className="h-11 sm:w-[136px]"
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

          <aside className="h-[264px] w-full overflow-hidden rounded-xl bg-slate-950 p-3 text-white shadow-sm lg:w-[292px]">
            <div
              className={`relative h-[154px] rounded-lg bg-gradient-to-br ${weather.imageClass}`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.25)_0_1px,transparent_1px_34px)] opacity-40" />
              <div className="absolute inset-x-8 bottom-8 h-16 rounded-t-lg border border-white/40 bg-black/20" />
              <div className="absolute inset-x-12 bottom-12 h-20 rounded-t-md border border-white/40 bg-black/20" />
            </div>

            <div className="mt-4 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">
                Current Weather
              </p>
              <p className="text-2xl font-semibold">
                {weather.city}, {weather.temperature}
              </p>
              <p className="text-sm text-slate-300">
                {weather.condition} - {weather.note}
              </p>
            </div>
          </aside>
        </div>
      </Card>

      <section className="grid gap-5 md:grid-cols-3">
        {infoCards.map((card) => (
          <article
            key={card.title}
            className="flex h-[90px] gap-4 rounded-lg bg-[#f3f7ff] p-5"
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
