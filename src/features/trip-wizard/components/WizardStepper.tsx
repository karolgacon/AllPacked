import { Link } from 'react-router-dom'
import { Bus, CalendarDays, MapPin, Sparkles } from './WizardStepperIcons'

type WizardStep = {
  label: string
  path: string
  icon: typeof MapPin
}

type WizardStepperProps = {
  activeStep: 'destination' | 'dates' | 'transport' | 'activities' | 'overview'
}

const steps: WizardStep[] = [
  { label: 'Destination', path: '/new-trip/destination', icon: MapPin },
  { label: 'Dates', path: '/new-trip/dates', icon: CalendarDays },
  { label: 'Transport', path: '/new-trip/transport', icon: Bus },
  { label: 'Activities', path: '/new-trip/activities', icon: Sparkles },
]

export function WizardStepper({ activeStep }: WizardStepperProps) {
  const activeIndex = steps.findIndex(
    (step) => step.label.toLowerCase() === activeStep,
  )

  return (
    <nav
      aria-label="Trip wizard progress"
      className="mx-auto flex min-h-[72px] w-full max-w-[866px] items-center overflow-x-auto pb-1 sm:min-h-[84px] sm:overflow-visible sm:pb-0"
    >
      <ol className="grid w-full min-w-[320px] grid-cols-4 items-start sm:min-w-0">
        {steps.map((step, index) => {
          const isActive = index === activeIndex
          const isComplete = index < activeIndex
          const Icon = step.icon

          return (
            <li key={step.path} className="relative flex flex-col items-center">
              {index > 0 ? (
                <span
                  className={`absolute right-1/2 top-5 h-0.5 w-full ${
                    isComplete || isActive ? 'bg-brand-primary' : 'bg-slate-300'
                  }`}
                  aria-hidden="true"
                />
              ) : null}

              <Link
                to={step.path}
                aria-current={isActive ? 'step' : undefined}
                className="group relative z-10 flex flex-col items-center gap-2 text-center"
              >
                <span
                  className={`flex size-10 items-center justify-center rounded-full border transition ${
                    isActive
                      ? 'border-brand-primary bg-brand-primary text-white shadow-sm'
                      : isComplete
                        ? 'border-brand-primary bg-brand-bg text-brand-primary'
                        : 'border-slate-300 bg-slate-200 text-slate-600'
                  }`}
                >
                  <Icon className="size-5" />
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isActive ? 'text-brand-primary' : 'text-slate-600'
                  }`}
                >
                  {step.label}
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
