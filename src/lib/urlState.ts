import type { Tab } from '../types/chord'
import { TABS } from '../types/chord'

// Shareable view state carried in the URL hash, e.g.
//   #tension?g=4&c=Cmaj7%2FE%20(Form%205)
// g = group/key/form index within the tab, c = chord name.

export interface UrlState {
  tab: Tab
  group?: number
  chord?: string
}

export function encodeUrlState(state: UrlState): string {
  const params = new URLSearchParams()
  if (state.group !== undefined) params.set('g', String(state.group))
  if (state.chord !== undefined) params.set('c', state.chord)
  const query = params.toString()
  return `#${state.tab}${query ? `?${query}` : ''}`
}

export function decodeUrlState(hash: string): UrlState | null {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash
  if (!raw) return null
  const [tabPart, queryPart] = raw.split('?', 2)
  const tab = TABS.find((t) => t === tabPart)
  if (!tab) return null
  const params = new URLSearchParams(queryPart ?? '')
  const g = params.get('g')
  const group = g !== null && /^\d+$/.test(g) ? Number(g) : undefined
  const chord = params.get('c') ?? undefined
  return { tab, ...(group !== undefined ? { group } : {}), ...(chord ? { chord } : {}) }
}
