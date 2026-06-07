import type { TransportOption, TripType } from './TripWizardContext'

export const quickDestinations = [
  {
    label: 'Paris',
    value: 'Paris, France',
    summary: 'Mild spring weather, museums and evening walks.',
  },
  {
    label: 'Tokyo',
    value: 'Tokyo, Japan',
    summary: 'Urban exploration, temples and reliable transit.',
  },
  {
    label: 'Warsaw',
    value: 'Warsaw, Poland',
    summary: 'City walks, museums and cooler evening layers.',
  },
] as const

export const transportOptions: Array<{
  id: Exclude<TransportOption, ''>
  title: string
  description: string
  meta: string
}> = [
  {
    id: 'plane',
    title: 'Plane',
    description: 'Fast and convenient for long distance travel.',
    meta: 'Carry-on rules and liquids limit included.',
  },
  {
    id: 'train',
    title: 'Train',
    description: 'Scenic and sustainable transit across regions.',
    meta: 'Comfort kit and compact luggage suggested.',
  },
  {
    id: 'car',
    title: 'Car',
    description: 'Maximum flexibility and personal pace.',
    meta: 'Road kit, chargers and layered storage included.',
  },
]

export const tripTypeOptions: Array<{
  id: Exclude<TripType, ''>
  label: string
  description: string
}> = [
  { id: 'business', label: 'Business', description: 'Polished essentials and documents.' },
  { id: 'leisure', label: 'Leisure', description: 'Comfort, photos and flexible outfits.' },
  { id: 'adventure', label: 'Adventure', description: 'Outdoor gear and durable layers.' },
]

export const activityOptions = [
  { id: 'hiking', label: 'Hiking' },
  { id: 'dining', label: 'Dining' },
  { id: 'sightseeing', label: 'Sightseeing' },
  { id: 'swimming', label: 'Swimming' },
  { id: 'photo', label: 'Photo' },
  { id: 'nightlife', label: 'Nightlife' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'fitness', label: 'Fitness' },
] as const
