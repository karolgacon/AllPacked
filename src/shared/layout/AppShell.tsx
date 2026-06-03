import { useEffect, useState } from 'react'
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
import { PageContainer } from '@/shared/layout/PageContainer'

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

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SidebarNavItem({
  item,
  onNavigate,
}: {
  item: NavItem
  onNavigate?: () => void
}) {
  const location = useLocation()
  const Icon = item.icon
  const isActive = item.matchPrefix
    ? location.pathname.startsWith(item.matchPrefix)
    : location.pathname === item.to

  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
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

function HeaderActions({
  userName,
  userEmail,
}: {
  userName?: string | null
  userEmail?: string | null
}) {
  return (
    <div className="flex items-center gap-0.5">
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
          `rounded-full p-0.5 ring-2 ring-transparent transition hover:ring-brand-primary/20 ${
            isActive ? 'ring-brand-primary/30' : ''
          }`
        }
        aria-label="Profile"
      >
        <UserAvatar name={userName} email={userEmail} />
      </NavLink>
    </div>
  )
}

export function AppShell() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setMenuOpen(false), 0)
    return () => window.clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-brand-border bg-white px-4 lg:hidden">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-slate-700 transition hover:bg-brand-bg"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
          <p className="truncate text-lg font-bold tracking-tight text-slate-900">AllPacked</p>
        </div>
        <HeaderActions userName={user?.displayName} userEmail={user?.email} />
      </header>

      {menuOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}

      <aside
        id="mobile-nav"
        className={`fixed bottom-0 left-0 top-14 z-50 flex w-[min(100%,280px)] flex-col border-r border-brand-border bg-white px-4 py-4 shadow-xl transition-transform duration-200 ease-out lg:static lg:top-auto lg:z-auto lg:min-h-screen lg:w-64 lg:shrink-0 lg:translate-x-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-6 lg:shadow-none ${
          menuOpen
            ? 'translate-x-0'
            : 'pointer-events-none -translate-x-full invisible lg:visible lg:pointer-events-auto'
        } lg:visible lg:flex`}
        aria-hidden={!menuOpen}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="mb-6 hidden px-1 lg:block">
            <p className="text-xl font-bold tracking-tight text-slate-900">AllPacked</p>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
              Stay Organized
            </p>
          </div>

          <nav className="flex flex-1 flex-col gap-1">
            {navItems.map((item) => (
              <SidebarNavItem key={item.to} item={item} onNavigate={closeMenu} />
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-5 border-t border-brand-border pt-5 lg:mt-auto">
            <Button type="button" className="w-full" onClick={() => navigate('/new-trip/destination')}>
              New Trip
            </Button>
            <div className="hidden items-center justify-between lg:flex">
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
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-auto bg-app-canvas">
        <PageContainer className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </PageContainer>
      </main>
    </div>
  )
}
