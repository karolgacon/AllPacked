import { type InputHTMLAttributes, type ReactNode } from 'react'

type InputFieldProps = {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onRightIconClick?: () => void
  rightIconLabel?: string
} & InputHTMLAttributes<HTMLInputElement>

export function InputField({
  leftIcon,
  rightIcon,
  onRightIconClick,
  rightIconLabel,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className="relative">
      {leftIcon ? (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-text">
          {leftIcon}
        </span>
      ) : null}
      <input
        className={`w-full rounded-xl border border-brand-border bg-white py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 ${leftIcon ? 'pl-10' : 'px-3'} ${rightIcon ? 'pr-10' : leftIcon ? 'pr-3' : ''} ${className ?? ''}`.trim()}
        {...props}
      />
      {rightIcon ? (
        onRightIconClick ? (
          <button
            type="button"
            aria-label={rightIconLabel}
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text hover:text-slate-600"
          >
            {rightIcon}
          </button>
        ) : (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-text">
            {rightIcon}
          </span>
        )
      ) : null}
    </div>
  )
}
