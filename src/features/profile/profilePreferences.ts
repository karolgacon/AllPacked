const STORAGE_KEY = 'allpacked-profile-preferences'

export type TransportPreference = 'plane' | 'train' | 'car'
export type ClimatePreference = 'cold' | 'warm' | 'tropical'

export type ProfilePreferences = {
  location: string
  transport: TransportPreference
  climate: ClimatePreference
  suitcaseUsedKg: number
  suitcaseMaxKg: number
}

import { demoUser } from '@/shared/demo/appDemoData'

export const defaultProfilePreferences: ProfilePreferences = {
  location: demoUser.homeLocation,
  transport: 'plane',
  climate: 'warm',
  suitcaseUsedKg: 18.5,
  suitcaseMaxKg: 23,
}

export function loadProfilePreferences(): ProfilePreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultProfilePreferences }

    const parsed = JSON.parse(raw) as Partial<ProfilePreferences>
    return {
      location:
        typeof parsed.location === 'string'
          ? parsed.location
          : defaultProfilePreferences.location,
      transport:
        parsed.transport === 'plane' ||
        parsed.transport === 'train' ||
        parsed.transport === 'car'
          ? parsed.transport
          : defaultProfilePreferences.transport,
      climate:
        parsed.climate === 'cold' ||
        parsed.climate === 'warm' ||
        parsed.climate === 'tropical'
          ? parsed.climate
          : defaultProfilePreferences.climate,
      suitcaseUsedKg:
        typeof parsed.suitcaseUsedKg === 'number'
          ? parsed.suitcaseUsedKg
          : defaultProfilePreferences.suitcaseUsedKg,
      suitcaseMaxKg:
        typeof parsed.suitcaseMaxKg === 'number'
          ? parsed.suitcaseMaxKg
          : defaultProfilePreferences.suitcaseMaxKg,
    }
  } catch {
    return { ...defaultProfilePreferences }
  }
}

export function saveProfilePreferences(preferences: ProfilePreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
}
