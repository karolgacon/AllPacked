import type { PackingListCategory } from '@/features/packing-list/types'

export type { PackingListCategory, PackingListItem } from '@/features/packing-list/types'

export const packingListCategoriesByTripId: Record<string, PackingListCategory[]> = {
  'japan-spring': [
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
  ],
  paris: [
    {
      id: 'clothing',
      name: 'Clothing',
      items: [
        { id: 'c1', label: 'Evening Outfit', checked: true },
        { id: 'c2', label: 'Comfortable Sneakers', checked: true },
      ],
    },
    {
      id: 'essentials',
      name: 'Essentials',
      items: [
        { id: 'e1', label: 'Travel Documents', checked: true },
        { id: 'e2', label: 'Portable Charger', checked: true },
      ],
    },
  ],
}
