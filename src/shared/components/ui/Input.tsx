import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-xl border border-slate-300 px-3 py-2 text-sm ${className ?? ''}`.trim()}
      {...props}
    />
  )
}
