type LoadingStateProps = {
  message?: string
  className?: string
}

export function LoadingState({ message = 'Loading…', className }: LoadingStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 py-12 ${className ?? ''}`.trim()}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-brand-border border-t-brand-primary"
        aria-hidden
      />
      <p className="text-sm text-brand-text">{message}</p>
    </div>
  )
}
