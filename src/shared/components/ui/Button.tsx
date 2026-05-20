import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = {
  children: ReactNode
  variant?: ButtonVariant
  /** When false, button does not stretch to full width (e.g. grid of social buttons). Default true. */
  fullWidth?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const baseClass =
  'rounded-xl px-4 py-2 font-medium transition disabled:cursor-not-allowed disabled:opacity-60'

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-brand-primary text-white hover:bg-brand-primary-hover',
  secondary: 'border border-brand-border bg-white text-slate-700 hover:bg-brand-bg',
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = true,
  className,
  ...props
}: ButtonProps) {
  const widthClass = fullWidth ? 'w-full' : ''
  return (
    <button
      className={`${baseClass} ${widthClass} ${variantClass[variant]} ${className ?? ''}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
