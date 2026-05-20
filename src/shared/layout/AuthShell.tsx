import { Outlet } from 'react-router-dom'
import { SuitcaseWatermark } from '@/shared/components/icons'

export function AuthShell() {
  return (
    <main className="auth-page-bg relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute -bottom-8 -right-4 select-none opacity-90 sm:right-8"
        aria-hidden
      >
        <SuitcaseWatermark className="h-48 w-40 sm:h-64 sm:w-52" />
      </div>
      <div
        className="pointer-events-none absolute bottom-32 right-24 hidden h-32 w-28 opacity-30 lg:block"
        aria-hidden
      >
        <SuitcaseWatermark className="h-full w-full scale-75" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <section className="w-full max-w-[560px] rounded-2xl border border-slate-200/80 bg-white p-9 shadow-2xl shadow-brand-primary/10 sm:p-11">
          <Outlet />
        </section>
      </div>
    </main>
  )
}
