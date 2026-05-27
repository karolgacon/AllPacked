import { Button } from './Button'

type ErrorStateProps = {
  title?: string
  message: string
  onRetry?: () => void
  retryLabel?: string
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try again',
  className,
}: ErrorStateProps) {
  return (
    <div
      className={`rounded-2xl border border-brand-danger/30 bg-white px-6 py-8 text-center shadow-[0_1px_2px_rgba(15,23,42,0.06),0_4px_16px_rgba(15,23,42,0.06)] ${className ?? ''}`.trim()}
      role="alert"
    >
      <h3 className="text-lg font-semibold text-brand-danger">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-text">{message}</p>
      {onRetry ? (
        <div className="mt-4 flex justify-center">
          <Button variant="secondary" fullWidth={false} onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
