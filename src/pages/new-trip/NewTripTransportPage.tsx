import { Card } from '@/shared/components/ui'
import { useTripWizard, WizardNavigation, WizardStepper, type TransportOption } from '@/features/trip-wizard'
import { CarIcon, CheckCircleIcon, PlaneIcon, TrainIcon } from '@/features/trip-wizard/components/WizardIcons'
import { transportOptions } from '@/features/trip-wizard/tripWizardData'

const optionIcons: Record<Exclude<TransportOption, ''>, typeof PlaneIcon> = {
  plane: PlaneIcon,
  train: TrainIcon,
  car: CarIcon,
}

export function NewTripTransportPage() {
  const { wizard, setTransport } = useTripWizard()
  const canContinue = Boolean(wizard.transport)

  return (
    <div className="flex w-full flex-col gap-8">
      <WizardStepper activeStep="transport" />

      <header className="text-center">
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
          How are you getting there?
        </h1>
        <p className="mt-2 text-sm text-brand-text">
          Choose your primary mode of transportation for this trip.
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-3">
        {transportOptions.map((option) => {
          const isSelected = wizard.transport === option.id
          const Icon = optionIcons[option.id]

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setTransport(option.id)}
              className={`min-h-[300px] rounded-2xl border bg-white p-7 text-center shadow-[0_1px_2px_rgba(15,23,42,0.06),0_4px_16px_rgba(15,23,42,0.06)] transition focus:outline-none focus:ring-2 focus:ring-brand-primary/30 ${
                isSelected
                  ? 'border-brand-primary shadow-[0_12px_28px_rgba(0,89,187,0.18)]'
                  : 'border-slate-200 hover:border-brand-primary/50 hover:-translate-y-0.5'
              }`}
              aria-pressed={isSelected}
            >
              <span
                className={`mx-auto flex size-16 items-center justify-center rounded-full ${
                  isSelected ? 'bg-brand-primary/15 text-brand-primary' : 'bg-slate-100 text-brand-text'
                }`}
              >
                <Icon className={isSelected && option.id === 'plane' ? 'size-10' : 'size-8'} />
              </span>
              <span className="mt-8 block text-lg font-semibold text-brand-navy">
                {option.title}
              </span>
              <span className="mx-auto mt-3 block max-w-[210px] text-sm leading-relaxed text-brand-text">
                {option.description}
              </span>
              <span className="mx-auto mt-3 block max-w-[220px] text-xs leading-relaxed text-slate-400">
                {option.meta}
              </span>
              <span
                className={`mt-9 inline-flex h-8 items-center justify-center rounded-full border px-5 text-xs font-semibold ${
                  isSelected
                    ? 'border-brand-primary bg-brand-bg text-brand-primary'
                    : 'border-slate-300 text-slate-600'
                }`}
              >
                {isSelected ? (
                  <span className="inline-flex items-center gap-2">
                    <CheckCircleIcon className="size-4" />
                    SELECTED
                  </span>
                ) : (
                  'Select'
                )}
              </span>
            </button>
          )
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)]">
        <Card className="relative min-h-[260px] overflow-hidden p-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(239,245,251,0.25),transparent_28%),linear-gradient(135deg,#c8d6e8_0%,#111827_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
          <div className="relative flex h-full min-h-[260px] flex-col justify-end p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
              AllPacked
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Your journey begins</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">
              Prepare for an effortless travel experience with AllPacked.
            </p>
          </div>
        </Card>

        <div className="rounded-2xl bg-brand-primary p-7 text-white shadow-[0_12px_30px_rgba(0,89,187,0.25)]">
          <div className="flex size-11 items-center justify-center rounded-full border border-white/30">
            <PlaneIcon className="size-6" />
          </div>
          <h2 className="mt-16 text-2xl font-semibold">Packing Tip</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Traveling by air? Remember to pack liquids in containers under 100ml and keep electronics easily accessible for security screening.
          </p>
        </div>
      </section>

      <WizardNavigation
        backTo="/new-trip/dates"
        nextTo="/new-trip/activities"
        disabled={!canContinue}
      />
    </div>
  )
}
