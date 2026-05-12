import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/new-trip/destination', label: 'New Trip' },
  { to: '/packing-lists', label: 'Packing Lists' },
  { to: '/stats', label: 'Stats' },
  { to: '/profile', label: 'Profile' },
]

export function AppShell() {
  const { signOutUser, user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="w-64 border-r border-slate-200 bg-white p-6">
          <p className="text-lg font-bold text-blue-900">AllPacked</p>
          <p className="mb-8 text-xs uppercase tracking-wide text-slate-500">
            Stay Organized
          </p>
          <p className="mb-6 text-xs text-slate-500">{user?.email}</p>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={async () => {
              await signOutUser()
              navigate('/login')
            }}
            className="mt-8 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            Logout
          </button>
        </aside>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
