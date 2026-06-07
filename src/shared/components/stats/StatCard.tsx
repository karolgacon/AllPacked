import type { ReactNode } from 'react'
import { Card } from '@/shared/components/ui'

type StatCardProps = {
  label: string
  value: string
  note?: string
  noteClassName?: string
  icon: ReactNode
  footer?: ReactNode
}

export function StatCard({
  label,
  value,
  note,
  noteClassName,
  icon,
  footer,
}: StatCardProps) {
  return (
    <Card className="flex flex-col p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-text">
          {label}
        </p>
        <span className="text-brand-primary">{icon}</span>
      </div>
      <p className="text-3xl font-bold tracking-tight text-slate-900">{value}</p>
      {note ? (
        <p className={`mt-1 text-xs ${noteClassName ?? 'text-brand-text'}`}>{note}</p>
      ) : null}
      {footer ? <div className="mt-3">{footer}</div> : null}
    </Card>
  )
}
