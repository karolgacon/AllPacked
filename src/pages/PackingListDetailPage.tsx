import { useState, type FormEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  countCheckedItems,
  countPackingItems,
  exportPackingListToPdf,
  getPackingListTrip,
  usePackingListDetail,
  calculateCheckedLuggageWeightKg,
} from '@/features/packing-list'
import { PackingListWeatherPanel } from '@/features/weather'
import { formatTripPeriod } from '@/features/weather/formatTripPeriod'
import { Button, EmptyState, ErrorState } from '@/shared/components/ui'

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

function ArrowLeftIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const CUSTOM_CATEGORY_ID = 'custom'

export function PackingListDetailPage() {
  const { tripId } = useParams<{ tripId: string }>()
  const trip = tripId ? getPackingListTrip(tripId) : undefined

  if (!trip || !tripId) {
    return <Navigate to="/packing-lists" replace />
  }

  return <PackingListDetailContent key={trip.id} tripId={tripId} trip={trip} />
}

function PackingListDetailContent({
  tripId,
  trip,
}: {
  tripId: string
  trip: NonNullable<ReturnType<typeof getPackingListTrip>>
}) {
  const { categories, toggleItem, addItem } = usePackingListDetail(tripId)
  const [isError] = useState(false)
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(() => new Set())
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItemLabel, setNewItemLabel] = useState('')
  const [newItemCategoryId, setNewItemCategoryId] = useState(
    categories[0]?.id ?? CUSTOM_CATEGORY_ID,
  )

  const categoryOptions =
    categories.some((category) => category.id === CUSTOM_CATEGORY_ID) || categories.length === 0
      ? categories.length > 0
        ? categories
        : [{ id: CUSTOM_CATEGORY_ID, name: 'Custom items', items: [] }]
      : [
          ...categories,
          { id: CUSTOM_CATEGORY_ID, name: 'Custom items', items: [] },
        ]

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(categoryId)) next.delete(categoryId)
      else next.add(categoryId)
      return next
    })
  }

  const openAddForm = () => {
    setNewItemCategoryId(categories[0]?.id ?? CUSTOM_CATEGORY_ID)
    setShowAddForm(true)
  }

  const handleAddItem = (event?: FormEvent) => {
    event?.preventDefault()
    if (!newItemLabel.trim()) return

    const added = addItem(newItemLabel, newItemCategoryId)
    if (!added) return

    setNewItemLabel('')
    setShowAddForm(false)
    setCollapsedCategories((prev) => {
      const next = new Set(prev)
      next.delete(newItemCategoryId)
      return next
    })
  }

  const totalItems = countPackingItems(categories)
  const checkedItems = countCheckedItems(categories)
  const progress = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0
  const luggageWeightKg = calculateCheckedLuggageWeightKg(categories)
  const isOverWeight = luggageWeightKg > trip.luggageMaxKg
  const weightPercent = Math.min(
    100,
    Math.round((luggageWeightKg / trip.luggageMaxKg) * 100),
  )
  const tripPeriodLabel =
    formatTripPeriod(trip.startDate, trip.endDate) ?? trip.shortDateRange

  const handleExportPdf = () => {
    exportPackingListToPdf({
      trip,
      categories,
      periodLabel: tripPeriodLabel,
    })
  }

  if (isError) {
    return (
      <ErrorState
        message="Could not load the packing list. Please try again."
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <div className="space-y-6">
      <Link
        to="/packing-lists"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition hover:text-brand-primary-hover"
      >
        <ArrowLeftIcon />
        All packing lists
      </Link>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)_minmax(0,1.2fr)]">
        <div className="space-y-4">
          <PackingListWeatherPanel
            destination={trip.destination}
            startDate={trip.startDate}
            endDate={trip.endDate}
          />

          <div className="rounded-2xl border border-[#E6E8F3] bg-white p-4 shadow-sm">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[#999999]">
              Quick Actions
            </p>
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleExportPdf}
                className="flex w-full items-center gap-3 text-left text-sm text-[#0F172A] hover:text-blue-600"
              >
                <span className="text-[#999999]">
                  <DocumentIcon />
                </span>
                Export to PDF
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-3 text-left text-sm text-[#0F172A] hover:text-blue-600"
              >
                <span className="text-[#999999]">
                  <ShareIcon />
                </span>
                Share Trip
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h1 className="text-base font-bold text-[#0F172A]">{trip.name}</h1>
                <p className="mt-0.5 text-xs text-[#999999]">{tripPeriodLabel}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#999999]">
                  {checkedItems}/{totalItems} items
                </p>
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

          {totalItems === 0 && !showAddForm ? (
            <EmptyState
              title="No items in this list yet"
              description="Start by adding items to your packing list."
              action={
                <Button fullWidth={false} type="button" onClick={openAddForm}>
                  Add Item
                </Button>
              }
            />
          ) : (
            <>
              {categories.map((cat) => {
                const catChecked = cat.items.filter((i) => i.checked).length
                const catTotal = cat.items.length
                const isCollapsed = collapsedCategories.has(cat.id)

                return (
                  <div key={cat.id} className="rounded-2xl border border-[#E6E8F3] bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      aria-expanded={!isCollapsed}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <ChevronDownIcon
                          className={`h-4 w-4 flex-shrink-0 text-[#999999] transition-transform ${
                            isCollapsed ? '-rotate-90' : ''
                          }`}
                        />
                        <h2 className="truncate text-sm font-bold text-[#0F172A]">{cat.name}</h2>
                      </span>
                      <span className="flex-shrink-0 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-600">
                        {catChecked}/{catTotal} Items
                      </span>
                    </button>
                    {!isCollapsed ? (
                      <ul className="space-y-2 border-t border-[#E6E8F3] px-4 py-3">
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
                    ) : null}
                  </div>
                )
              })}
            </>
          )}

          {showAddForm ? (
            <form
              onSubmit={handleAddItem}
              className="space-y-3 rounded-2xl border border-blue-200 bg-blue-50/40 p-4"
            >
              <p className="text-sm font-semibold text-[#0F172A]">Add new item</p>
              <input
                type="text"
                value={newItemLabel}
                onChange={(event) => setNewItemLabel(event.target.value)}
                placeholder="Item name, e.g. Sun hat"
                className="h-10 w-full rounded-xl border border-[#E6E8F3] bg-white px-3 text-sm text-[#0F172A] outline-none focus:border-blue-400"
                autoFocus
              />
              <label className="block text-xs font-medium text-[#999999]">
                Category
                <select
                  value={newItemCategoryId}
                  onChange={(event) => setNewItemCategoryId(event.target.value)}
                  className="mt-1 h-10 w-full rounded-xl border border-[#E6E8F3] bg-white px-3 text-sm text-[#0F172A] outline-none focus:border-blue-400"
                >
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex gap-2">
                <Button fullWidth={false} type="submit">
                  Add Item
                </Button>
                <Button
                  fullWidth={false}
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowAddForm(false)
                    setNewItemLabel('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={openAddForm}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#E6E8F3] py-3 text-sm text-[#999999] hover:border-blue-400 hover:text-blue-600"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-xs font-bold leading-none">
                +
              </div>
              Add New Item
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#E6E8F3] bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-[#0F172A]">Luggage Weight</p>
              <span className="text-[#999999]">
                <PlaneIcon />
              </span>
            </div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-[#999999]">0kg</span>
              <span className="text-xs font-semibold text-red-500">{trip.luggageMaxKg}kg MAX</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-[#E6E8F3]">
              <div
                className={`h-3 rounded-full ${
                  isOverWeight
                    ? 'bg-gradient-to-r from-blue-500 to-red-500'
                    : 'bg-brand-primary'
                }`}
                style={{ width: `${weightPercent}%` }}
              />
            </div>
            <p
              className={`mt-4 text-4xl font-bold ${
                isOverWeight ? 'text-red-500' : 'text-brand-primary'
              }`}
            >
              {luggageWeightKg} kg
            </p>
            {isOverWeight ? (
              <>
                <div className="mb-4 mt-1">
                  <span className="inline-flex items-center gap-1 rounded-md bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                    OVER LIMIT
                  </span>
                </div>
                <p className="mb-2 text-xs font-semibold text-[#0F172A]">Recommended adjustments:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-xs text-[#999999]">
                    <span className="text-[#999999]">
                      <InfoIcon />
                    </span>
                    Move heavy electronics to carry-on
                  </li>
                  <li className="flex items-start gap-2 text-xs text-[#999999]">
                    <span className="text-[#999999]">
                      <InfoIcon />
                    </span>
                    Consider wearing your heaviest shoes
                  </li>
                </ul>
              </>
            ) : (
              <p className="mt-2 text-xs text-brand-text">
                Within your {trip.luggageMaxKg}kg allowance.
              </p>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#E6E8F3] shadow-sm">
            <div className="relative h-36">
              <img
                src={trip.imageUrl}
                alt={trip.imageAlt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-xs text-white/80">Next Destination</p>
                <p className="text-sm font-bold text-white">{trip.nextDestinationLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
