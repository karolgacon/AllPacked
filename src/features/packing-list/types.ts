import type { PackingListTrip } from '@/shared/demo/appDemoData'

export type PackingListItem = {
  id: string
  label: string
  checked: boolean
  weightKg?: number
}

export type PackingListCategory = {
  id: string
  name: string
  items: PackingListItem[]
}

export type StoredPackingList = {
  trip: PackingListTrip
  categories: PackingListCategory[]
  createdAt: string
}

export type WeatherPackingContext = {
  condition?: string
  note?: string
  temperatureRange?: string
  imageUrl?: string | null
}
