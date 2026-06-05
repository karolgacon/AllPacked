import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'
import { getUserDisplayName } from '@/features/auth/userDisplayName'
import { DashboardHero } from '@/features/dashboard/components/DashboardHero'
import { DashboardStatsRow } from '@/features/dashboard/components/DashboardStatsRow'
import { StartPlanningCard, TripCard } from '@/features/dashboard/components/TripCard'
import { dashboardTrips } from '@/shared/demo/dashboardMock'

export function DashboardPage() {
  const { user } = useAuth()
  const firstName = getUserDisplayName(user)

  return (
    <div className="space-y-8">
      <DashboardHero firstName={firstName} />
      <DashboardStatsRow />

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-brand-navy">Recent Trips</h2>
          <Link
            to="/packing-lists"
            className="text-sm font-semibold text-brand-primary hover:text-brand-primary-hover"
          >
            View all trips
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dashboardTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
          <StartPlanningCard />
        </div>
      </section>
    </div>
  )
}
