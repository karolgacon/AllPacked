import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui'

function ArrowLeft({ className }: { className?: string }) {
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

function ArrowRight({ className }: { className?: string }) {
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

type WizardNavigationProps = {
  backTo?: string
  nextTo?: string
  nextLabel?: string
  disabled?: boolean
  onNext?: () => void
}

export function WizardNavigation({
  backTo,
  nextTo,
  nextLabel = 'Next Step',
  disabled = false,
  onNext,
}: WizardNavigationProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(backTo ?? '/dashboard')
  }

  const handleNext = () => {
    onNext?.()
    if (nextTo) navigate(nextTo)
  }

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Button
        type="button"
        variant="secondary"
        fullWidth={false}
        className="inline-flex h-11 items-center justify-center gap-2 px-5"
        onClick={handleBack}
      >
        <ArrowLeft className="size-4" />
        {backTo ? 'Go Back' : 'Cancel'}
      </Button>
      <Button
        type="button"
        fullWidth={false}
        className="inline-flex h-11 items-center justify-center gap-2 px-5"
        disabled={disabled}
        onClick={handleNext}
      >
        {nextLabel}
        <ArrowRight className="size-4" />
      </Button>
    </div>
  )
}
