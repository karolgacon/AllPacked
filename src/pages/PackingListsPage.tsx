import { useState } from 'react'
import { Button, EmptyState, ErrorState } from '@/shared/components/ui'

type Item = { id: string; label: string; checked: boolean }
type Category = { id: string; name: string; items: Item[] }

const initialCategories: Category[] = [
  {
    id: 'clothing',
    name: 'Clothing',
    items: [
      { id: 'c1', label: 'Linen Shirts (3)', checked: true },
      { id: 'c2', label: 'Light Jacket', checked: false },
      { id: 'c3', label: 'Walking Shoes', checked: true },
    ],
  },
  {
    id: 'tech',
    name: 'Tech & Gear',
    items: [
      { id: 't1', label: 'Universal Power Adapter', checked: false },
      { id: 't2', label: 'Noise Cancelling Headphones', checked: true },
    ],
  },
]

// ── Icons ────────────────────────────────────────────────────────────────────

function CloudIcon() {
  return (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

function PlaneIcon() {
  return (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function PackingListsPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [isError] = useState(false)

  function toggleItem(categoryId: string, itemId: string) {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item,
              ),
            }
          : cat,
      ),
    )
  }

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0)
  const checkedItems = categories.reduce(
    (sum, cat) => sum + cat.items.filter((i) => i.checked).length,
    0,
  )
  const progress = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0

  // ── Early return for error ────────────────────────────────────────────────

  if (isError) {
    return (
      <ErrorState
        message="Could not load the packing list. Please try again."
        onRetry={() => window.location.reload()}
      />
    )
  }

  // ── Main layout ────────────────────────────────────────────────────────────

  return (
    <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 1.8fr 1.2fr' }}>

      {/* ── Left column ── */}
      <div className="space-y-4">

        {/* Weather */}
        <div className="rounded-2xl border border-[#E6E8F3] bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-[#999999]">
            <CloudIcon />
            <span className="text-sm font-semibold text-[#0F172A]">Weather: Tokyo</span>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-[#999999]">Today</span>
            <span className="text-sm font-bold text-[#0F172A]">22°C / 14°C</span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-900">
            Mostly Sunny – Pack Light Jackets
          </p>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-[#E6E8F3] bg-white p-4 shadow-sm">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[#999999]">
            Quick Actions
          </p>
          <div className="space-y-3">
            <button
              type="button"

              className="flex w-full items-center gap-3 text-left text-sm text-[#0F172A] hover:text-blue-600"
            >
              <span className="text-[#999999]"><DocumentIcon /></span>
              Export to PDF
            </button>
            <button
              type="button"

              className="flex w-full items-center gap-3 text-left text-sm text-[#0F172A] hover:text-blue-600"
            >
              <span className="text-[#999999]"><ShareIcon /></span>
              Share Trip
            </button>
          </div>
        </div>
      </div>

      {/* ── Middle column ── */}
      <div className="space-y-6">

        {/* Trip header — no card */}
        <div>
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h1 className="text-base font-bold text-[#0F172A]">Japan Spring Tour</h1>
              <p className="mt-0.5 text-xs text-[#999999]">April 12 – April 24, 2024</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#999999]">Completion</p>
              <p className="text-2xl font-bold leading-tight text-blue-600">{progress}%</p>
            </div>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E6E8F3]">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Empty state or category list */}
        {totalItems === 0 ? (
          <EmptyState
            title="No packing lists yet"
            description="Start by adding items to your packing list."
            action={
              <Button>
                Create New List
              </Button>
            }
          />
        ) : (
          <>
            {categories.map((cat) => {
              const catChecked = cat.items.filter((i) => i.checked).length
              const catTotal = cat.items.length
              return (
                <div key={cat.id}>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-[#0F172A]">{cat.name}</h2>
                    <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-600">
                      {catChecked}/{catTotal} Items
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item.id}>
                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E6E8F3] bg-white p-4 shadow-sm">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={item.checked}
                            onChange={() => toggleItem(cat.id, item.id)}
                          />
                          {item.checked ? (
                            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                              <CheckIcon />
                            </div>
                          ) : (
                            <div className="h-5 w-5 flex-shrink-0 rounded-full border-2 border-slate-300 bg-white" />
                          )}
                          <span
                            className={`text-sm ${
                              item.checked ? 'text-[#999999] line-through' : 'text-[#0F172A]'
                            }`}
                          >
                            {item.label}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}

            {/* Add New Item */}
            <button
              type="button"

              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#E6E8F3] py-3 text-sm text-[#999999] hover:border-blue-400 hover:text-blue-600"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-xs font-bold leading-none">
                +
              </div>
              Add New Item
            </button>
          </>
        )}
      </div>

      {/* ── Right column ── */}
      <div className="space-y-4">

        {/* Luggage Weight */}
        <div className="rounded-2xl border border-[#E6E8F3] bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-[#0F172A]">Luggage Weight</p>
            <span className="text-[#999999]"><PlaneIcon /></span>
          </div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-[#999999]">0kg</span>
            <span className="text-xs font-semibold text-red-500">23kg MAX</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[#E6E8F3]">
            <div className="h-3 w-full rounded-full bg-gradient-to-r from-blue-500 to-red-500" />
          </div>
          <p className="mt-4 text-4xl font-bold text-red-500">24.2 kg</p>
          <div className="mb-4 mt-1">
            <span className="inline-flex items-center gap-1 rounded-md bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
              OVER LIMIT
            </span>
          </div>
          <p className="mb-2 text-xs font-semibold text-[#0F172A]">Recommended adjustments:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-xs text-[#999999]">
              <span className="text-[#999999]"><InfoIcon /></span>
              Move heavy electronics to carry-on
            </li>
            <li className="flex items-start gap-2 text-xs text-[#999999]">
              <span className="text-[#999999]"><InfoIcon /></span>
              Consider wearing your heaviest shoes
            </li>
          </ul>
        </div>

        {/* Next Destination */}
        <div className="overflow-hidden rounded-2xl border border-[#E6E8F3] shadow-sm">
          <div className="relative h-36">
            <img
              src="https://picsum.photos/seed/kyoto/400/200"
              alt="Kyoto District"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <p className="text-xs text-white/80">Next Destination</p>
              <p className="text-sm font-bold text-white">Kyoto District</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
