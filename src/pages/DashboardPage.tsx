import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'
import { getUserDisplayName } from '@/features/auth/userDisplayName'
import { usePackingLists } from '@/features/packing-list'
import { DashboardHero } from '@/features/dashboard/components/DashboardHero'
import { DashboardStatsRow } from '@/features/dashboard/components/DashboardStatsRow'
import { StartPlanningCard, TripCard } from '@/shared/components'

export function DashboardPage() {
  const { user } = useAuth()
  const { metrics } = usePackingLists()
  const firstName = getUserDisplayName(user)

  return (
    <div className="space-y-8">
      <DashboardHero firstName={firstName} lastListEfficiency={metrics.lastListEfficiency} />
      <DashboardStatsRow metrics={metrics} />

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
          {metrics.dashboardTrips.map((trip) => (
            <Link
              key={trip.id}
              to={`/packing-lists/${trip.id}`}
              className="block rounded-2xl transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              <TripCard trip={trip} />
            </Link>
          ))}
          <StartPlanningCard />
        </div>
      </section>
    </div>
  )
}
