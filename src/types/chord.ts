export interface Chord {
  name: string
  frets: string[]
  fingers: string[]
  rootString: number
  bassNote: string
  description?: string
  tier: 'Basic' | 'Advanced'
  subCategory?: string
}

export interface KeyChord {
  chord: Chord
  nashville: string
}

export interface KeyGroup {
  keyName: string
  isPriority?: boolean
  chords: KeyChord[]
}

export interface BarreGroup {
  groupName: string
  usageLabel: string
  description: string
  chords: Chord[]
}

export interface ElectricGroup {
  groupName: string
  description: string
  chords: Chord[]
}

export interface Move {
  title: string
  category: string
  example: string
  sequence: Chord[]
  description: string
  howTo: string
}

export type Tab = 'open' | 'tunings' | 'barre' | 'electric' | 'examples'

export const TABS: Tab[] = ['open', 'tunings', 'barre', 'electric', 'examples']
