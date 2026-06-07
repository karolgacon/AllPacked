import { Link } from 'react-router-dom'

import { StartPlanningCard, TripCard } from '@/shared/components'

import { usePackingLists } from '@/features/packing-list'

import { SectionHeader } from '@/shared/components/ui'

export function PackingListsPage() {
  const { metrics } = usePackingLists()



  return (

    <div className="space-y-6">

      <SectionHeader

        title="Packing Lists"

        subtitle="Choose a trip to view and manage your packing list."

      />



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
    </div>

  )

}


