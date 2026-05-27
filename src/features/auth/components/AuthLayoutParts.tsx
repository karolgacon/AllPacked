import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function AuthBrand() {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold tracking-tight text-brand-primary">AllPacked</p>
    </div>
  )
}

type AuthHeadingProps = {
  title: string
  subtitle: string
}

export function AuthHeading({ title, subtitle }: AuthHeadingProps) {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
      <p className="text-sm leading-relaxed text-brand-text">{subtitle}</p>
    </div>
  )
}

export function AuthFieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[11px] font-semibold uppercase tracking-wider text-brand-text"
    >
      {children}
    </label>
  )
}

export function AuthDivider() {
  return (
    <div className="relative py-1">
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <span className="w-full border-t border-brand-border" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-[11px] font-semibold uppercase tracking-wider text-brand-text">
          Or continue with
        </span>
      </div>
    </div>
  )
}

type AuthFooterProps = {
  text: string
  linkText: string
  linkTo: string
}

export function AuthFooter({ text, linkText, linkTo }: AuthFooterProps) {
  return (
    <div className="border-t border-brand-border pt-6">
      <p className="text-center text-sm text-brand-text">
        {text}{' '}
        <Link to={linkTo} className="font-semibold text-brand-primary hover:text-brand-primary-hover">
          {linkText}
        </Link>
      </p>
    </div>
  )
}
