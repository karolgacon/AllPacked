import type { ReactNode } from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3'

type SectionHeaderProps = {
  title: string
  subtitle?: string
  /** Right-side slot, e.g. primary CTA button */
  action?: ReactNode
  className?: string
  as?: HeadingLevel
}

const headingClass: Record<HeadingLevel, string> = {
  h1: 'text-3xl font-semibold tracking-tight text-brand-navy',
  h2: 'text-2xl font-semibold tracking-tight text-brand-navy',
  h3: 'text-xl font-semibold tracking-tight text-brand-navy',
}

export function SectionHeader({
  title,
  subtitle,
  action,
  className,
  as = 'h1',
}: SectionHeaderProps) {
  const Heading = as

  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between ${className ?? ''}`.trim()}
    >
      <div className="min-w-0 space-y-1">
        <Heading className={headingClass[as]}>{title}</Heading>
        {subtitle ? <p className="text-sm leading-relaxed text-brand-text">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
