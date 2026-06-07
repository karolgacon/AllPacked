import type { PackingListCategory, PackingListItem } from './types'

const exactWeightsKg: Record<string, number> = {
  'Passport / ID': 0.05,
  'Wallet & cards': 0.15,
  'Phone & charger': 0.35,
  'Travel insurance details': 0.02,
  Medications: 0.2,
  'Compact umbrella': 0.35,
  'Waterproof jacket': 0.9,
  'Warm sweater': 0.5,
  'Gloves & scarf': 0.25,
  'Sunscreen SPF 30+': 0.2,
  Sunglasses: 0.05,
  'Breathable t-shirts': 0.45,
  'Versatile layers': 0.6,
  'Light jacket': 0.7,
  'Extra underwear & socks': 0.3,
  'Travel-size laundry sheets': 0.1,
  Sleepwear: 0.35,
  'Laptop & charger': 2.2,
  'Business casual outfit': 1.5,
  'Notebook & pen': 0.3,
  'Portable steamer': 0.8,
  Daypack: 0.85,
  'Reusable water bottle': 0.35,
  'Quick-dry towel': 0.25,
  'Basic first-aid kit': 0.4,
  'Comfortable walking shoes': 1.0,
  'Casual day outfits': 1.2,
  'Reusable shopping tote': 0.12,
  'Comfortable day outfit': 0.9,
  'Hiking boots': 1.8,
  'Trail snacks': 0.4,
  'Blister plasters': 0.05,
  'Smart casual dinner outfit': 1.1,
  'Small crossbody bag': 0.35,
  'Comfortable sneakers': 1.1,
  'Portable power bank': 0.35,
  'City guide / maps': 0.25,
  Swimwear: 0.15,
  'Flip flops': 0.25,
  'Microfiber towel': 0.18,
  'Camera / phone gimbal': 0.9,
  'Extra memory card': 0.01,
  'Lens cleaning cloth': 0.02,
  'Evening outfit': 1.4,
  'Light jacket for late hours': 0.65,
  'Foldable tote bag': 0.08,
  'Reusable shopping bag': 0.06,
  'Workout clothes': 0.55,
  'Gym shoes': 0.95,
  'Resistance bands': 0.2,
  'Travel-size toiletries (100ml)': 0.45,
  'Neck pillow': 0.35,
  'Eye mask & earplugs': 0.05,
  'Snacks for the journey': 0.5,
  'Entertainment / e-reader': 0.4,
  'Compact blanket': 0.55,
  'Car phone mount': 0.15,
  'Road trip snacks': 0.6,
  'Printed directions backup': 0.02,
  'Linen Shirts (3)': 0.75,
  'Light Jacket': 0.7,
  'Walking Shoes': 1.15,
  'Universal Power Adapter': 0.18,
  'Noise Cancelling Headphones': 0.32,
  'Evening Outfit': 1.5,
  'Comfortable Sneakers': 1.05,
  'Travel Documents': 0.08,
  'Portable Charger': 0.28,
}

const keywordWeights: Array<{ pattern: RegExp; weightKg: number }> = [
  { pattern: /laptop|macbook/i, weightKg: 2.0 },
  { pattern: /boots|shoes|sneakers|footwear/i, weightKg: 1.1 },
  { pattern: /jacket|coat|parka/i, weightKg: 0.85 },
  { pattern: /shirt|blouse|top/i, weightKg: 0.35 },
  { pattern: /outfit|dress|suit|trousers|pants/i, weightKg: 1.2 },
  { pattern: /headphones|earbuds/i, weightKg: 0.3 },
  { pattern: /charger|adapter|power bank/i, weightKg: 0.25 },
  { pattern: /camera|gimbal|lens/i, weightKg: 0.9 },
  { pattern: /towel|blanket/i, weightKg: 0.3 },
  { pattern: /umbrella/i, weightKg: 0.35 },
  { pattern: /passport|document|wallet|id/i, weightKg: 0.08 },
  { pattern: /toiletries|sunscreen|shampoo/i, weightKg: 0.35 },
  { pattern: /snack|food/i, weightKg: 0.4 },
  { pattern: /backpack|daypack|bag/i, weightKg: 0.7 },
  { pattern: /bottle/i, weightKg: 0.35 },
  { pattern: /medication|medicine|first-aid/i, weightKg: 0.2 },
  { pattern: /sleepwear|pajama/i, weightKg: 0.35 },
  { pattern: /sock|underwear/i, weightKg: 0.15 },
]

export function estimateItemWeightKg(label: string): number {
  const exact = exactWeightsKg[label]
  if (exact != null) return exact

  const match = keywordWeights.find(({ pattern }) => pattern.test(label))
  if (match) return match.weightKg

  return 0.25
}

export function withItemWeight(item: PackingListItem): PackingListItem {
  if (typeof item.weightKg === 'number') return item

  return {
    ...item,
    weightKg: estimateItemWeightKg(item.label),
  }
}

export function normalizeCategoryWeights(
  categories: PackingListCategory[],
): PackingListCategory[] {
  return categories.map((category) => ({
    ...category,
    items: category.items.map(withItemWeight),
  }))
}

export function calculateCheckedLuggageWeightKg(categories: PackingListCategory[]): number {
  const total = categories.reduce(
    (sum, category) =>
      sum +
      category.items.reduce((itemSum, item) => {
        if (!item.checked) return itemSum
        const weight = item.weightKg ?? estimateItemWeightKg(item.label)
        return itemSum + weight
      }, 0),
    0,
  )

  return Math.round(total * 10) / 10
}

export function calculateTotalLuggageWeightKg(categories: PackingListCategory[]): number {
  const total = categories.reduce(
    (sum, category) =>
      sum +
      category.items.reduce(
        (itemSum, item) => itemSum + (item.weightKg ?? estimateItemWeightKg(item.label)),
        0,
      ),
    0,
  )

  return Math.round(total * 10) / 10
}
