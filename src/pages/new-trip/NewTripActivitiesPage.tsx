import { Card } from '@/shared/components/ui'
import { useTripWizard, WizardNavigation, WizardStepper } from '@/features/trip-wizard'
import {
  AdventureIcon,
  BusinessIcon,
  CheckCircleIcon,
  CheckIcon,
  DiningIcon,
  FitnessIcon,
  HikingIcon,
  LeisureIcon,
  NightlifeIcon,
  PhotoIcon,
  ShoppingIcon,
  SightseeingIcon,
  SparkIcon,
  SwimmingIcon,
} from '@/features/trip-wizard/components/WizardIcons'
import { activityOptions, tripTypeOptions } from '@/features/trip-wizard/tripWizardData'

const activityIcons = {
  hiking: HikingIcon,
  dining: DiningIcon,
  sightseeing: SightseeingIcon,
  swimming: SwimmingIcon,
  photo: PhotoIcon,
  nightlife: NightlifeIcon,
  shopping: ShoppingIcon,
  fitness: FitnessIcon,
} as const

const tripTypeIcons = {
  business: BusinessIcon,
  leisure: LeisureIcon,
  adventure: AdventureIcon,
} as const

function ActivityGlyph({ id }: { id: keyof typeof activityIcons }) {
  const Icon = activityIcons[id]

  return (
    <span className="flex size-11 items-center justify-center text-current">
      <Icon className="size-7" />
    </span>
  )
}

export function NewTripActivitiesPage() {
  const { wizard, setTripType, toggleActivity } = useTripWizard()
  const canContinue = Boolean(wizard.activities.tripType && wizard.activities.selected.length > 0)

  return (
    <div className="flex w-full flex-col gap-8">
      <WizardStepper activeStep="activities" />

      <Card className="relative min-h-[220px] overflow-hidden p-0">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,#111827_0%,rgba(17,24,39,0.78)_42%,rgba(17,24,39,0.1)_100%),radial-gradient(circle_at_78%_20%,rgba(179,209,238,0.7),transparent_26%)]" />
        <div className="relative flex min-h-[220px] items-end p-7 sm:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
              Plan builder
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white">What's the plan?</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
              Pick the purpose and activities so AllPacked can recommend the right gear.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <Card className="p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-950">Trip Type</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-text">
            Select the primary purpose of your travel to tailor your packing lists.
          </p>

          <div className="mt-6 space-y-3">
            {tripTypeOptions.map((option) => {
              const isSelected = wizard.activities.tripType === option.id
              const TripTypeIcon = tripTypeIcons[option.id]

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setTripType(option.id)}
                  className={`flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-brand-primary/20 ${
                    isSelected
                      ? 'border-brand-primary bg-brand-bg text-brand-primary'
                      : 'border-brand-border bg-white text-slate-700 hover:border-brand-primary/60 hover:bg-brand-bg'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <TripTypeIcon className="size-5 shrink-0" />
                    <span className="min-w-0">
                      <span className="block font-semibold">{option.label}</span>
                      <span className="mt-0.5 block text-xs text-brand-text">
                        {option.description}
                      </span>
                    </span>
                  </span>
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                      isSelected ? 'border-brand-primary bg-brand-primary text-white' : 'border-slate-300'
                    }`}
                  >
                    {isSelected ? <CheckIcon className="size-3.5" /> : null}
                  </span>
                </button>
              )
            })}
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-slate-950">Activities</h2>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-text">
              Multiple choice
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {activityOptions.map((activity) => {
              const isSelected = wizard.activities.selected.includes(activity.id)

              return (
                <button
                  key={activity.id}
                  type="button"
                  onClick={() => toggleActivity(activity.id)}
                  className={`flex min-h-[116px] flex-col items-center justify-center gap-3 rounded-xl border px-3 py-5 text-center transition focus:outline-none focus:ring-2 focus:ring-brand-primary/20 ${
                    isSelected
                      ? 'border-brand-primary bg-white text-brand-primary shadow-[0_8px_22px_rgba(0,89,187,0.12)]'
                      : 'border-brand-border bg-white text-slate-700 hover:border-brand-primary/60 hover:bg-brand-bg'
                  }`}
                  aria-pressed={isSelected}
                >
                  <ActivityGlyph id={activity.id} />
                  <span className="font-semibold">{activity.label}</span>
                  {isSelected ? (
                    <span className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-primary">
                      <CheckCircleIcon className="size-4" />
                      Selected
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-xl border border-brand-border bg-brand-bg p-4 text-sm text-brand-text">
            <SparkIcon className="mt-0.5 size-5 shrink-0 text-brand-primary" />
            <p>
              We'll add essentials before gear and fine-tune later based on your selections.
            </p>
          </div>
        </Card>
      </div>

      <WizardNavigation
        backTo="/new-trip/transport"
        nextTo="/new-trip/overview"
        disabled={!canContinue}
      />
    </div>
  )
}
