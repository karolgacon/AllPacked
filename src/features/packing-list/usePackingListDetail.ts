import { useCallback, useState } from 'react'
import { estimateItemWeightKg } from './itemWeights'
import {
  getPackingListCategories,
  getPackingListTrip,
  updatePackingListCategories,
} from './packingListStorage'
import type { PackingListCategory, PackingListItem } from './types'

const CUSTOM_CATEGORY_ID = 'custom'

function ensureCustomCategory(categories: PackingListCategory[]) {
  if (categories.some((category) => category.id === CUSTOM_CATEGORY_ID)) {
    return categories
  }

  return [
    ...categories,
    {
      id: CUSTOM_CATEGORY_ID,
      name: 'Custom items',
      items: [],
    },
  ]
}

function createItem(label: string): PackingListItem {
  const trimmed = label.trim()
  return {
    id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    label: trimmed,
    checked: false,
    weightKg: estimateItemWeightKg(trimmed),
  }
}

export function usePackingListDetail(tripId: string | undefined) {
  const trip = tripId ? getPackingListTrip(tripId) : undefined
  const [categories, setCategories] = useState<PackingListCategory[]>(() =>
    tripId ? getPackingListCategories(tripId) : [],
  )

  const persistCategories = useCallback(
    (next: PackingListCategory[]) => {
      if (!tripId) return next
      updatePackingListCategories(tripId, next)
      return next
    },
    [tripId],
  )

  const toggleItem = useCallback(
    (categoryId: string, itemId: string) => {
      if (!tripId) return

      setCategories((prev) =>
        persistCategories(
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
        ),
      )
    },
    [persistCategories, tripId],
  )

  const addItem = useCallback(
    (label: string, categoryId?: string) => {
      if (!tripId || !label.trim()) return false

      const targetCategoryId = categoryId ?? CUSTOM_CATEGORY_ID

      setCategories((prev) => {
        const withCustom = ensureCustomCategory(prev)
        const targetExists = withCustom.some((category) => category.id === targetCategoryId)
        const resolvedCategoryId = targetExists ? targetCategoryId : CUSTOM_CATEGORY_ID

        return persistCategories(
          withCustom.map((category) =>
            category.id === resolvedCategoryId
              ? { ...category, items: [...category.items, createItem(label)] }
              : category,
          ),
        )
      })

      return true
    },
    [persistCategories, tripId],
  )

  return { trip, categories, toggleItem, addItem }
}
