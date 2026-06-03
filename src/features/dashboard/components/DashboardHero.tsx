import { Link } from 'react-router-dom'
import heroImage from '@/assets/hero.jpg'
import { dashboardStats } from '@/shared/demo/dashboardMock'

type DashboardHeroProps = {
  firstName: string
}

function PlusCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" strokeLinecap="round" />
    </svg>
  )
}

export function DashboardHero({ firstName }: DashboardHeroProps) {
  return (
    <section className="relative min-h-[260px] overflow-hidden rounded-2xl bg-brand-primary sm:min-h-[280px]">
      <div className="absolute inset-y-0 right-0 left-[46%] z-0 overflow-hidden sm:left-[54%] lg:left-[56%]">
        <img
          src={heroImage}
          alt=""
          className="size-full min-h-full min-w-full origin-right scale-105 object-cover object-right"
          aria-hidden="true"
        />
      </div>

      <div
        className="absolute inset-0 z-[1] bg-gradient-to-r from-brand-primary from-0% via-brand-primary via-[48%] to-brand-primary/70 to-100% sm:via-[54%] sm:to-brand-primary/65"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[260px] flex-col justify-center px-6 py-8 sm:min-h-[280px] sm:px-8 sm:py-10">
        <div className="max-w-lg space-y-4">
          <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
            Welcome back, {firstName}
          </span>
          <h1 className="text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
            Where are you heading next?
          </h1>
          <p className="text-sm leading-relaxed text-white/90 sm:text-base">
            Your last list was packed with {dashboardStats.lastListEfficiency}% efficiency.
            Let&apos;s keep the streak going for your next adventure.
          </p>
          <Link
            to="/new-trip/destination"
            className="inline-flex h-10 items-center gap-2.5 rounded-full bg-white py-2 pl-2.5 pr-5 text-sm font-medium text-brand-primary transition hover:bg-white/95"
          >
            <PlusCircleIcon className="size-5 shrink-0" />
            Create New Packing List
          </Link>
        </div>
      </div>
    </section>
  )
}
