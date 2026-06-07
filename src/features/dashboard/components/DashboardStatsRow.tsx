import type { LiveDemoMetrics } from '@/features/packing-list'
import { StatCard } from '@/shared/components'

function PlaneIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  )
}

function BoxIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  )
}

export function DashboardStatsRow({ metrics }: { metrics: LiveDemoMetrics }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard
        label="Total Trips"
        value={String(metrics.totalTrips)}
        note={metrics.totalTripsDelta}
        noteClassName="font-medium text-brand-success"
        icon={<PlaneIcon />}
      />
      <StatCard
        label="Items Packed"
        value={String(metrics.itemsPacked)}
        note={metrics.itemsPackedNote}
        icon={<BoxIcon />}
      />
      <StatCard
        label="Packing Efficiency"
        value={`${metrics.packingEfficiency}%`}
        icon={<BoltIcon />}
        footer={
          <div className="h-2 overflow-hidden rounded-full bg-brand-bg">
            <div
              className="h-2 rounded-full bg-brand-primary"
              style={{ width: `${metrics.packingEfficiency}%` }}
            />
          </div>
        }
      />
    </div>
  )
}
