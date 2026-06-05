import { Link } from 'react-router-dom'
import { Bus, CalendarDays, MapPin, Sparkles } from './WizardStepperIcons'

type WizardStep = {
  label: string
  path: string
  icon: typeof MapPin
}

type WizardStepperProps = {
  activeStep: 'destination' | 'dates' | 'transport' | 'activities'
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
      className="flex min-h-[88px] w-full items-center overflow-x-auto pb-1 sm:min-h-[100px] sm:overflow-visible sm:pb-0"
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
                  className={`absolute right-1/2 top-5 h-px w-full ${
                    isComplete || isActive ? 'bg-blue-600' : 'bg-slate-300'
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
                      ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                      : isComplete
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-300 bg-slate-200 text-slate-600'
                  }`}
                >
                  <Icon className="size-5" />
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isActive ? 'text-blue-700' : 'text-slate-600'
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
