import clsx from 'clsx'
import type { ReactNode } from 'react'

/** Max content width for logged-in app pages (1400px). */
export const PAGE_CONTENT_MAX_WIDTH = 'max-w-[1200px]'

type PageContainerProps = {
  children: ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={clsx('mx-auto min-w-0 w-full', PAGE_CONTENT_MAX_WIDTH, className)}>
      {children}
    </div>
  )
}
