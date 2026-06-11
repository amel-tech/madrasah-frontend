export type MeetingPlatformId = 'google-meet' | 'zoom' | 'jitsi' | 'unknown'

export interface MeetingPlatform {
  id: MeetingPlatformId
  label: string
  /** Brand color for buttons/badges. */
  color: string
  /** Soft tint of the brand color for backgrounds. */
  soft: string
}

const PLATFORMS: Record<Exclude<MeetingPlatformId, 'unknown'>, MeetingPlatform> = {
  'google-meet': { id: 'google-meet', label: 'Google Meet', color: '#00897b', soft: '#e6f4f1' },
  zoom: { id: 'zoom', label: 'Zoom', color: '#2d8cff', soft: '#e9f2ff' },
  jitsi: { id: 'jitsi', label: 'Jitsi Meet', color: '#1d6fb8', soft: '#e7f0f9' },
}

const UNKNOWN_PLATFORM: MeetingPlatform = {
  id: 'unknown',
  label: '',
  color: '#64748b',
  soft: '#f1f5f9',
}

const matchesHost = (hostname: string, domain: string): boolean =>
  hostname === domain || hostname.endsWith(`.${domain}`)

/**
 * Resolve the meeting platform from a meeting URL — there is no manual
 * platform picker anywhere in the product; the URL is the single source
 * of truth. Unrecognized or malformed URLs resolve to `unknown` (the
 * caller decides the fallback label).
 */
export const resolveMeetingPlatform = (url: string | null | undefined): MeetingPlatform => {
  if (!url) return UNKNOWN_PLATFORM
  let hostname: string
  try {
    hostname = new URL(url.includes('://') ? url : `https://${url}`).hostname.toLowerCase()
  } catch {
    return UNKNOWN_PLATFORM
  }
  if (matchesHost(hostname, 'meet.google.com')) return PLATFORMS['google-meet']
  if (matchesHost(hostname, 'zoom.us')) return PLATFORMS.zoom
  if (matchesHost(hostname, 'jit.si') || matchesHost(hostname, 'meet.jit.si')) return PLATFORMS.jitsi
  return UNKNOWN_PLATFORM
}
