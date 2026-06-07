import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'
import { getUserFullName } from '@/features/auth/userDisplayName'
import {
  type ClimatePreference,
  type TransportPreference,
} from '@/features/profile/profilePreferences'
import { useProfilePreferences } from '@/features/profile/useProfilePreferences'
import { usePackingLists } from '@/features/packing-list'
import { Button, Card } from '@/shared/components/ui'

function buildProfileStats(metrics: ReturnType<typeof usePackingLists>['metrics']) {
  return [
    { label: 'Total Trips', value: String(metrics.totalTrips), icon: 'plane' as const },
    { label: 'Countries', value: String(metrics.countriesVisited), icon: 'globe' as const },
    { label: 'Items Packed', value: String(metrics.itemsPacked), icon: 'bag' as const },
  ]
}

function ProfileStatIcon({ type }: { type: 'plane' | 'globe' | 'bag' }) {
  if (type === 'plane') {
    return (
      <svg className="size-5 text-brand-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>
    )
  }
  if (type === 'globe') {
    return (
      <svg className="size-5 text-brand-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
  }
  return (
    <svg className="size-5 text-brand-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 2h12v6H6zM4 8h16v12H4z" />
      <path d="M10 12h4" strokeLinecap="round" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg className="size-4 shrink-0 text-brand-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

type PreferenceOption<T extends string> = {
  id: T
  label: string
  icon?: ReactNode
}

const transportOptions: PreferenceOption<TransportPreference>[] = [
  { id: 'plane', label: 'Plane', icon: <ProfileStatIcon type="plane" /> },
  { id: 'train', label: 'Train' },
  { id: 'car', label: 'Car' },
]

const climateOptions: PreferenceOption<ClimatePreference>[] = [
  { id: 'cold', label: 'Cold', icon: <span aria-hidden="true">❄️</span> },
  { id: 'warm', label: 'Warm', icon: <span aria-hidden="true">☀️</span> },
  { id: 'tropical', label: 'Tropical', icon: <span aria-hidden="true">🌴</span> },
]

function PreferenceToggleGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: PreferenceOption<T>[]
  value: T
  onChange: (next: T) => void
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option.id === value
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                selected
                  ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                  : 'border-brand-border bg-white text-brand-text hover:border-brand-primary/30'
              }`}
            >
              {option.icon}
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ProfilePage() {
  const { user, signOutUser } = useAuth()
  const navigate = useNavigate()
  const { preferences, saved, updatePreferences, setTransport, setClimate, persistPreferences } =
    useProfilePreferences()
  const { metrics } = usePackingLists()
  const [editing, setEditing] = useState(false)
  const [locationDraft, setLocationDraft] = useState(preferences.location)

  const profileStats = buildProfileStats(metrics)
  const suitcaseUsedKg = metrics.featuredTrip?.luggageWeightKg ?? preferences.suitcaseUsedKg
  const suitcaseMaxKg = metrics.featuredTrip?.luggageMaxKg ?? preferences.suitcaseMaxKg

  const fullName = getUserFullName(user)
  const initial = fullName.charAt(0).toUpperCase()
  const suitcasePercent = Math.min(
    100,
    Math.round((suitcaseUsedKg / suitcaseMaxKg) * 100),
  )

  const startEditing = () => {
    setLocationDraft(preferences.location)
    setEditing(true)
  }

  const cancelEditing = () => {
    setLocationDraft(preferences.location)
    setEditing(false)
  }

  const applyLocationEdit = () => {
    updatePreferences({ location: locationDraft.trim() || preferences.location })
    setEditing(false)
  }

  return (
    <div className="space-y-6">
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xl font-semibold text-white">
              {initial}
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold text-brand-navy">{fullName}</h1>
              {editing ? (
                <div className="mt-2 flex max-w-xs items-center gap-2">
                  <MapPinIcon />
                  <input
                    type="text"
                    value={locationDraft}
                    onChange={(event) => setLocationDraft(event.target.value)}
                    className="h-9 w-full rounded-lg border border-brand-border px-3 text-sm text-slate-800 outline-none focus:border-brand-primary"
                    placeholder="City, State"
                  />
                </div>
              ) : (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-brand-text">
                  <MapPinIcon />
                  {preferences.location}
                </p>
              )}
            </div>
          </div>

          {editing ? (
            <div className="flex gap-2">
              <Button type="button" variant="secondary" fullWidth={false} onClick={cancelEditing}>
                Cancel
              </Button>
              <Button type="button" fullWidth={false} onClick={applyLocationEdit}>
                Done
              </Button>
            </div>
          ) : (
            <Button type="button" variant="secondary" fullWidth={false} onClick={startEditing}>
              Edit Profile
            </Button>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {profileStats.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-4 p-5">
            <ProfileStatIcon type={stat.icon} />
            <div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-text">
                {stat.label}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Card className="space-y-6 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-brand-navy">Travel Preferences</h2>
            <PreferenceToggleGroup
              label="Preferred Transport"
              options={transportOptions}
              value={preferences.transport}
              onChange={setTransport}
            />
            <PreferenceToggleGroup
              label="Target Climates"
              options={climateOptions}
              value={preferences.climate}
              onChange={setClimate}
            />
          </Card>

          <Card className="flex flex-col items-center bg-brand-bg/60 p-8 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-brand-text">
              <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Z" />
                <circle cx="12" cy="11" r="2" />
              </svg>
            </span>
            <h2 className="mt-4 text-lg font-semibold text-brand-navy">Future Destinations</h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-brand-text">
              Start pinning your next adventures to see personalized packing recommendations.
            </p>
            <Button
              type="button"
              variant="secondary"
              className="mt-5"
              fullWidth={false}
              onClick={() => navigate('/new-trip/destination')}
            >
              Add Destination
            </Button>
          </Card>
        </div>

        <Card className="space-y-5 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-brand-navy">Account Settings</h2>

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-text">
              Email Address
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-slate-800">{user?.email ?? '—'}</p>
              <button type="button" className="text-sm font-semibold text-brand-primary">
                Change
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-text">Password</p>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm tracking-widest text-slate-800">••••••••••••</p>
              <button
                type="button"
                className="text-sm font-semibold text-brand-primary"
                onClick={() => navigate('/forgot-password')}
              >
                Change
              </button>
            </div>
          </div>

          <div className="space-y-2 border-t border-brand-border pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-800">{suitcasePercent}% Full</span>
              <span className="text-brand-text">
                Used {suitcaseUsedKg}kg / {suitcaseMaxKg}kg
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-brand-bg">
              <div
                className="h-2.5 rounded-full bg-gradient-to-r from-brand-primary via-amber-400 to-brand-danger"
                style={{ width: `${suitcasePercent}%` }}
              />
            </div>
            <p className="text-xs leading-relaxed text-brand-text">
              Optimized for Delta Airlines standard checked baggage allowance.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button type="button" onClick={persistPreferences}>
              {saved ? 'Changes Saved' : 'Save Changes'}
            </Button>
            <button
              type="button"
              className="w-full text-center text-sm font-semibold text-brand-danger transition hover:underline"
              onClick={() => {
                window.alert('Account deletion is not available in this demo build.')
              }}
            >
              Delete Account
            </button>
            <Button
              type="button"
              variant="secondary"
              onClick={async () => {
                await signOutUser()
                navigate('/login')
              }}
            >
              Log out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
