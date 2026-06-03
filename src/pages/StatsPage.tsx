import { useState } from 'react'

type FilterPeriod = 'last12' | 'allTime' | 'custom'

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const TRIP_DATA = [1, 0, 2, 1, 3, 2, 1, 2, 1, 0, 1, 0]
const ACTIVE_MONTH = 4

const BAR_W = 28

const DONUT_R = 44
const DONUT_CX = 60
const DONUT_CY = 60
const DONUT_SW = 14

const TOP_DESTINATIONS = [
  { name: 'Tokyo, Japan', visits: 4, tag: 'BUSINESS', green: true },
  { name: 'London, UK', visits: 3, tag: 'LEISURE', green: false },
  { name: 'Paris, France', visits: 2, tag: 'LEISURE', green: false },
]

// ── Icons ────────────────────────────────────────────────────────────────────

function PlaneSmIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function BoxIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  )
}

function CheckSquareIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

function CompassIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

function DotsMenuIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  )
}

function InfoCircleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function TrendUpIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function StatsPage() {
  const [filter, setFilter] = useState<FilterPeriod>('last12')

  const filterLabels: Record<FilterPeriod, string> = {
    last12: 'Last 12 Months',
    allTime: 'All Time',
    custom: 'Custom',
  }

  return (
    <div className="space-y-6">

      {/* ── Header + filter tabs ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Travel Statistics</h1>
          <p className="mt-1 text-sm text-[#999999]">
            Analyze your journey patterns and packing performance.
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-[#E6E8F3] bg-white p-1 text-sm shadow-sm">
          {(['last12', 'allTime', 'custom'] as FilterPeriod[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition ${
                filter === id
                  ? 'bg-slate-800 text-white'
                  : 'text-[#999999] hover:text-[#0F172A]'
              }`}
            >
              {id === 'custom' && <CalendarIcon />}
              {filterLabels[id]}
            </button>
          ))}
        </div>
      </div>

      {/* ── KPI cards ── */}
      <div className="grid grid-cols-4 gap-5">

        {/* Total Trips */}
        <div className="rounded-2xl border border-[#E6E8F3] bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <PlaneSmIcon />
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-[#999999]">
            Total Trips
          </p>
          <p className="mt-1 text-3xl font-bold text-[#0F172A]">12</p>
          <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-500">
            <TrendUpIcon />
            +20% vs last year
          </div>
        </div>

        {/* Countries Visited */}
        <div className="rounded-2xl border border-[#E6E8F3] bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <GlobeIcon />
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-[#999999]">
            Countries Visited
          </p>
          <p className="mt-1 text-3xl font-bold text-[#0F172A]">8</p>
          <p className="mt-1 text-xs text-[#999999]">3 New this year</p>
        </div>

        {/* Total Items Packed */}
        <div className="rounded-2xl border border-[#E6E8F3] bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
            <BoxIcon />
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-[#999999]">
            Total Items Packed
          </p>
          <p className="mt-1 text-3xl font-bold text-[#0F172A]">1,245</p>
          <p className="mt-1 text-xs text-[#999999]">Avg. 103 items/trip</p>
        </div>

        {/* Packing Efficiency */}
        <div className="rounded-2xl border border-[#E6E8F3] bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <CheckSquareIcon />
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-[#999999]">
            Packing Efficiency
          </p>
          <p className="mt-1 text-3xl font-bold text-[#0F172A]">94%</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#E6E8F3]">
            <div className="h-1.5 rounded-full bg-green-500" style={{ width: '94%' }} />
          </div>
        </div>
      </div>

      {/* ── Charts row: Trips per Month (3/5) + Luggage donut (2/5) ── */}
      <div className="grid grid-cols-5 gap-5">

        {/* Trips per Month */}
        <div className="col-span-3 flex flex-col rounded-2xl border border-[#E6E8F3] bg-white p-5 shadow-sm">
          <div className="mb-4 flex shrink-0 items-center justify-between">
            <h2 className="text-base font-semibold text-[#0F172A]">Trips per Month</h2>
            <button type="button" className="text-[#999999] hover:text-[#0F172A]">
              <DotsMenuIcon />
            </button>
          </div>
          <div className="min-h-0 flex-1">
          <svg
            viewBox="0 0 696 222"
            className="h-full w-full"
            preserveAspectRatio="none"
            aria-label="Trips per month bar chart"
          >
          <g transform="translate(0, 12)">
            {/* Y-axis vertical rule */}
            <line x1="36" y1="0" x2="36" y2="180" stroke="#E6E8F3" strokeWidth="1" />

            {/* Horizontal grid lines + Y-axis labels (0–5) */}
            {[0, 1, 2, 3, 4, 5].map((v) => {
              const gy = 180 - (v / 5) * 180
              return (
                <g key={v}>
                  <line x1="36" y1={gy} x2="696" y2={gy} stroke="#F1F5F9" strokeWidth="1" />
                  <text
                    x="28"
                    y={gy + 4}
                    textAnchor="end"
                    fontSize="10"
                    fill="#999999"
                  >
                    {v}
                  </text>
                </g>
              )
            })}

            {/* Bars */}
            {TRIP_DATA.map((val, i) => {
              const barH = (val / 5) * 180
              const bx = 36 + i * 55 + (55 - BAR_W) / 2
              return (
                <rect
                  key={i}
                  x={bx}
                  y={180 - barH}
                  width={BAR_W}
                  height={barH}
                  rx="5"
                  fill={i === ACTIVE_MONTH ? '#2563EB' : '#DBEAFE'}
                />
              )
            })}

            {/* Month labels */}
            {MONTHS.map((m, i) => (
              <text
                key={m}
                x={36 + i * 55 + 27.5}
                y="202"
                textAnchor="middle"
                fontSize="11"
                fontWeight={i === ACTIVE_MONTH ? '700' : '400'}
                fill={i === ACTIVE_MONTH ? '#0F172A' : '#999999'}
              >
                {m}
              </text>
            ))}
          </g>
          </svg>
          </div>
        </div>

        {/* Luggage donut */}
        <div className="col-span-2 rounded-2xl border border-[#E6E8F3] bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#0F172A]">Luggage</h2>
            <button type="button" className="text-[#999999] hover:text-[#0F172A]">
              <InfoCircleIcon />
            </button>
          </div>
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 120 120" className="h-44 w-44" aria-label="Luggage volume donut chart">
              <circle
                cx={DONUT_CX}
                cy={DONUT_CY}
                r={DONUT_R}
                fill="none"
                stroke="#7C2D12"
                strokeWidth={DONUT_SW}
              />
              <text
                x={DONUT_CX}
                y={DONUT_CY - 4}
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#0F172A"
              >
                100%
              </text>
              <text
                x={DONUT_CX}
                y={DONUT_CY + 12}
                textAnchor="middle"
                fontSize="7"
                fill="#999999"
                letterSpacing="0.5"
              >
                TOTAL VOLUME
              </text>
            </svg>
            <div className="mt-1 grid grid-cols-2 gap-x-8 gap-y-2">
              {[
                { color: '#2563EB', label: '60% Clothing' },
                { color: '#93C5FD', label: '20% Tech' },
                { color: '#7C2D12', label: '15% Toiletries' },
                { color: '#CBD5E1', label: '5% Other' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-[#999999]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom row: Packing Habits + Top Destinations ── */}
      <div className="grid grid-cols-2 gap-5">

        {/* Packing Habits */}
        <div className="rounded-2xl border border-[#E6E8F3] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-blue-600"><WrenchIcon /></span>
            <h2 className="text-base font-semibold text-[#0F172A]">Packing Habits</h2>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-[#0F172A]">Weight Limit Compliance</span>
            <span className="text-sm font-bold text-[#0F172A]">85%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E6E8F3]">
            <div className="h-2 rounded-full bg-blue-600" style={{ width: '85%' }} />
          </div>
          <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3">
            <p className="text-xs leading-relaxed text-blue-700">
              <span className="font-semibold">Pro Tip:</span> On your last 3 business trips, you
              exceeded the limit by an average of 1.2kg. Try reducing tech cables.
            </p>
          </div>
        </div>

        {/* Top Destinations */}
        <div className="rounded-2xl border border-[#E6E8F3] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-blue-600"><CompassIcon /></span>
              <h2 className="text-base font-semibold text-[#0F172A]">Top Destinations</h2>
            </div>
            <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              View Map
            </button>
          </div>
          <ul className="space-y-4">
            {TOP_DESTINATIONS.map((dest, i) => (
              <li key={dest.name} className="flex items-center gap-3">
                <span className="w-4 text-sm text-[#999999]">{i + 1}</span>
                <span className="flex-1 text-sm font-medium text-[#0F172A]">{dest.name}</span>
                <span className="text-sm text-[#999999]">{dest.visits} Visits</span>
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                    dest.green
                      ? 'bg-green-50 text-green-600'
                      : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  {dest.tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
