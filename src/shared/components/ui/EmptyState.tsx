import type { ReactNode } from 'react'

type EmptyStateProps = {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-slate-200/90 bg-white px-6 py-12 text-center shadow-[0_1px_2px_rgba(15,23,42,0.06),0_4px_16px_rgba(15,23,42,0.06)] ${className ?? ''}`.trim()}
    >
      {icon ? (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-bg text-brand-primary">
          {icon}
        </div>
      ) : null}
      <h3 className="text-lg font-semibold text-brand-navy">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-brand-text">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
