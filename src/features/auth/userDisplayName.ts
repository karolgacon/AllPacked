import { getAdditionalUserInfo, updateProfile, type User, type UserCredential } from 'firebase/auth'

/** First name or full display name for greetings (e.g. dashboard). */
export function getUserDisplayName(user: User | null | undefined): string {
  const name = user?.displayName?.trim()
  if (name) {
    return name.split(/\s+/)[0] ?? name
  }

  const emailLocal = user?.email?.split('@')[0]?.trim()
  if (emailLocal) {
    return emailLocal.charAt(0).toUpperCase() + emailLocal.slice(1)
  }

  return 'Traveler'
}

/** Full display name for profile. */
export function getUserFullName(user: User | null | undefined): string {
  const name = user?.displayName?.trim()
  if (name) return name

  const emailLocal = user?.email?.split('@')[0]?.trim()
  if (emailLocal) {
    return emailLocal.charAt(0).toUpperCase() + emailLocal.slice(1)
  }

  return '—'
}

function parseNameFromOAuthProfile(profile: unknown): string | null {
  if (!profile || typeof profile !== 'object') return null

  const record = profile as Record<string, unknown>

  if (typeof record.name === 'string' && record.name.trim()) {
    return record.name.trim()
  }

  if (record.name && typeof record.name === 'object') {
    const nested = record.name as { firstName?: string; lastName?: string }
    const parts = [nested.firstName, nested.lastName].filter(
      (part): part is string => typeof part === 'string' && part.trim().length > 0,
    )
    if (parts.length > 0) return parts.join(' ')
  }

  const given =
    typeof record.given_name === 'string'
      ? record.given_name
      : typeof record.firstName === 'string'
        ? record.firstName
        : undefined
  const family =
    typeof record.family_name === 'string'
      ? record.family_name
      : typeof record.lastName === 'string'
        ? record.lastName
        : undefined

  const parts = [given, family].filter(
    (part): part is string => typeof part === 'string' && part.trim().length > 0,
  )
  if (parts.length > 0) return parts.join(' ')

  return null
}

/** OAuth providers may return name once — persist it to Firebase profile when missing. */
export async function applyOAuthDisplayName(result: UserCredential): Promise<void> {
  const { user } = result
  if (user.displayName?.trim()) return

  const additional = getAdditionalUserInfo(result)
  const fromProfile = parseNameFromOAuthProfile(additional?.profile)

  if (fromProfile) {
    await updateProfile(user, { displayName: fromProfile })
  }
}

export async function setUserDisplayName(user: User, displayName: string): Promise<void> {
  const trimmed = displayName.trim()
  if (!trimmed) return
  await updateProfile(user, { displayName: trimmed })
}
