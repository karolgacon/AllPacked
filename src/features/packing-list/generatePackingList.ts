import type { TripWizardState } from '@/features/trip-wizard'
import { activeTrip, type PackingListTrip } from '@/shared/demo/appDemoData'
import { estimateItemWeightKg } from './itemWeights'
import type { PackingListCategory, WeatherPackingContext } from './types'

let itemCounter = 0

function nextItemId(prefix: string, label: string) {
  itemCounter += 1
  const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24)
  return `${prefix}-${slug}-${itemCounter}`
}

function addCategory(
  categories: PackingListCategory[],
  id: string,
  name: string,
  labels: string[],
) {
  if (labels.length === 0) return

  const unique = [...new Set(labels)]
  categories.push({
    id,
    name,
    items: unique.map((label) => ({
      id: nextItemId(id, label),
      label,
      checked: false,
      weightKg: estimateItemWeightKg(label),
    })),
  })
}

function durationNights(startDate: string, endDate: string) {
  if (!startDate || !endDate) return 1
  const start = new Date(`${startDate}T12:00:00`).getTime()
  const end = new Date(`${endDate}T12:00:00`).getTime()
  return Math.max(1, Math.round((end - start) / 86_400_000))
}

function formatShortDateRange(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T12:00:00`)
  const end = new Date(`${endDate}T12:00:00`)
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  return `${start.toLocaleDateString('en-US', opts)} - ${end.toLocaleDateString('en-US', opts)}`
}

function statusLabelForStart(startDate: string) {
  const start = new Date(`${startDate}T12:00:00`)
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  const diff = Math.ceil((start.getTime() - today.getTime()) / 86_400_000)

  if (diff < 0) return 'In progress'
  if (diff === 0) return 'Starts today'
  if (diff === 1) return 'In 1 day'
  return `In ${diff} days`
}

function destinationLabel(destination: string) {
  return destination.split(',')[0]?.trim() || destination
}

function weatherItems(context?: WeatherPackingContext): string[] {
  const blob = `${context?.condition ?? ''} ${context?.note ?? ''} ${context?.temperatureRange ?? ''}`.toLowerCase()
  const items: string[] = []

  if (/rain|shower|storm|drizzle/.test(blob)) {
    items.push('Compact umbrella', 'Waterproof jacket')
  }
  if (/cold|snow|frost|freezing/.test(blob) || /\b(0|1[0-4])c\b/.test(blob)) {
    items.push('Warm sweater', 'Gloves & scarf')
  }
  if (/sun|warm|hot|clear|mild/.test(blob)) {
    items.push('Sunscreen SPF 30+', 'Sunglasses', 'Breathable t-shirts')
  }
  if (items.length === 0) {
    items.push('Versatile layers', 'Light jacket')
  }

  return items
}

function tripTypeItems(tripType: TripWizardState['activities']['tripType']): string[] {
  switch (tripType) {
    case 'business':
      return ['Laptop & charger', 'Business casual outfit', 'Notebook & pen', 'Portable steamer']
    case 'adventure':
      return ['Daypack', 'Reusable water bottle', 'Quick-dry towel', 'Basic first-aid kit']
    case 'leisure':
      return ['Comfortable walking shoes', 'Casual day outfits', 'Reusable shopping tote']
    default:
      return ['Comfortable day outfit']
  }
}

const activityItems: Record<string, string[]> = {
  hiking: ['Hiking boots', 'Trail snacks', 'Blister plasters'],
  dining: ['Smart casual dinner outfit', 'Small crossbody bag'],
  sightseeing: ['Comfortable sneakers', 'Portable power bank', 'City guide / maps'],
  swimming: ['Swimwear', 'Flip flops', 'Microfiber towel'],
  photo: ['Camera / phone gimbal', 'Extra memory card', 'Lens cleaning cloth'],
  nightlife: ['Evening outfit', 'Light jacket for late hours'],
  shopping: ['Foldable tote bag', 'Reusable shopping bag'],
  fitness: ['Workout clothes', 'Gym shoes', 'Resistance bands'],
}

function transportItems(transport: TripWizardState['transport']): string[] {
  switch (transport) {
    case 'plane':
      return ['Travel-size toiletries (100ml)', 'Neck pillow', 'Eye mask & earplugs']
    case 'train':
      return ['Snacks for the journey', 'Entertainment / e-reader', 'Compact blanket']
    case 'car':
      return ['Car phone mount', 'Road trip snacks', 'Printed directions backup']
    default:
      return ['Reusable water bottle']
  }
}

export function generatePackingCategories(
  wizard: TripWizardState,
  context?: WeatherPackingContext,
): PackingListCategory[] {
  itemCounter = 0
  const categories: PackingListCategory[] = []
  const nights = durationNights(wizard.dates.startDate, wizard.dates.endDate)

  addCategory(categories, 'essentials', 'Essentials', [
    'Passport / ID',
    'Wallet & cards',
    'Phone & charger',
    'Travel insurance details',
    'Medications',
  ])

  addCategory(categories, 'clothing', 'Clothing & weather', [
    ...weatherItems(context),
    nights >= 5 ? 'Travel-size laundry sheets' : 'Extra underwear & socks',
    'Sleepwear',
  ])

  addCategory(categories, 'trip-type', 'Trip style', tripTypeItems(wizard.activities.tripType))

  const activityLabels = wizard.activities.selected.flatMap(
    (id) => activityItems[id] ?? [],
  )
  addCategory(categories, 'activities', 'Activities', activityLabels)

  addCategory(categories, 'transport', 'Transport', transportItems(wizard.transport))

  if (wizard.overview.notes.trim()) {
    addCategory(categories, 'notes', 'Your notes', [wizard.overview.notes.trim()])
  }

  return categories
}

export function countPackingItems(categories: PackingListCategory[]) {
  return categories.reduce((sum, category) => sum + category.items.length, 0)
}

export function countCheckedItems(categories: PackingListCategory[]) {
  return categories.reduce(
    (sum, category) => sum + category.items.filter((item) => item.checked).length,
    0,
  )
}

export function buildTripFromWizard(
  wizard: TripWizardState,
  context?: WeatherPackingContext,
): { trip: PackingListTrip; categories: PackingListCategory[] } {
  const categories = generatePackingCategories(wizard, context)
  const total = countPackingItems(categories)
  const destination = wizard.destination.trim() || 'New destination'
  const id = `trip-${Date.now()}`

  const trip: PackingListTrip = {
    id,
    name: `${destinationLabel(destination)} Trip`,
    destination,
    startDate: wizard.dates.startDate,
    endDate: wizard.dates.endDate,
    shortDateRange: formatShortDateRange(wizard.dates.startDate, wizard.dates.endDate),
    packed: 0,
    total,
    status: 'upcoming',
    statusLabel: statusLabelForStart(wizard.dates.startDate),
    imageUrl: context?.imageUrl ?? activeTrip.imageUrl,
    imageAlt: destination,
    nextDestinationLabel: destinationLabel(destination),
    luggageWeightKg: 0,
    luggageMaxKg: 23,
  }

  return { trip, categories }
}
