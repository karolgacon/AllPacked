import { useCallback, useState } from 'react'
import {
  loadProfilePreferences,
  saveProfilePreferences,
  type ClimatePreference,
  type ProfilePreferences,
  type TransportPreference,
} from './profilePreferences'

export function useProfilePreferences() {
  const [preferences, setPreferences] = useState<ProfilePreferences>(() =>
    loadProfilePreferences(),
  )
  const [saved, setSaved] = useState(false)

  const updatePreferences = useCallback((patch: Partial<ProfilePreferences>) => {
    setPreferences((current) => ({ ...current, ...patch }))
    setSaved(false)
  }, [])

  const setTransport = useCallback((transport: TransportPreference) => {
    updatePreferences({ transport })
  }, [updatePreferences])

  const setClimate = useCallback((climate: ClimatePreference) => {
    updatePreferences({ climate })
  }, [updatePreferences])

  const persistPreferences = useCallback(() => {
    saveProfilePreferences(preferences)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }, [preferences])

  return {
    preferences,
    saved,
    updatePreferences,
    setTransport,
    setClimate,
    persistPreferences,
  }
}
