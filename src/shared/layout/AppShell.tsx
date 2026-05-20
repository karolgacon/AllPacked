import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'
import {
  BellIcon,
  DashboardIcon,
  NewTripIcon,
  PackingListsIcon,
  StatsIcon,
} from '@/shared/components/icons'
import { Button } from '@/shared/components/ui'

type NavItem = {
  to: string
  label: string
  icon: typeof DashboardIcon
  matchPrefix?: string
}

const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  {
    to: '/new-trip/destination',
    label: 'New Trip',
    icon: NewTripIcon,
    matchPrefix: '/new-trip',
  },
  { to: '/packing-lists', label: 'Packing Lists', icon: PackingListsIcon },
  { to: '/stats', label: 'Stats', icon: StatsIcon },
]

function SidebarNavItem({ item }: { item: NavItem }) {
  const location = useLocation()
  const Icon = item.icon
  const isActive = item.matchPrefix
    ? location.pathname.startsWith(item.matchPrefix)
    : location.pathname === item.to

  return (
    <NavLink
      to={item.to}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        isActive
          ? 'bg-brand-primary/10 text-brand-primary'
          : 'text-brand-text hover:bg-brand-bg'
      }`}
    >
      <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-brand-primary' : 'text-slate-400'}`} />
      {item.label}
    </NavLink>
  )
}

function UserAvatar({ name, email }: { name?: string | null; email?: string | null }) {
  const initial = (name?.[0] ?? email?.[0] ?? 'U').toUpperCase()

  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
      {initial}
    </span>
  )
}

export function AppShell() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 shrink-0 flex-col border-r border-brand-border bg-white px-5 py-6">
        <div className="mb-8 px-1">
          <p className="text-xl font-bold tracking-tight text-slate-900">AllPacked</p>
          <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
            Stay Organized
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <SidebarNavItem key={item.to} item={item} />
          ))}
        </nav>

        <div className="mt-6 space-y-5 px-1">
          <Button type="button" onClick={() => navigate('/new-trip/destination')}>
            New Trip
          </Button>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-brand-bg hover:text-brand-text"
              aria-label="Notifications"
            >
              <BellIcon className="h-5 w-5" />
            </button>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `rounded-full ring-2 ring-transparent transition hover:ring-brand-primary/20 ${
                  isActive ? 'ring-brand-primary/30' : ''
                }`
              }
              aria-label="Profile"
            >
              <UserAvatar name={user?.displayName} email={user?.email} />
            </NavLink>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-app-canvas">
        <div className="mx-auto max-w-6xl p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
