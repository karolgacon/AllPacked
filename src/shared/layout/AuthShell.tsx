import { Outlet } from 'react-router-dom'

export function AuthShell() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <Outlet />
      </section>
    </main>
  )
}
