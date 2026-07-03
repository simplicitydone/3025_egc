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

export interface TensionForm {
  formName: string
  formKr: string
  description: string
  chords: Chord[]
}

export interface QuizItem {
  question: string
  answer: string
}

export interface GlossaryItem {
  term: string
  definition: string
}

export type Tab = 'open' | 'tension' | 'tunings' | 'barre' | 'electric' | 'examples'

export const TABS: Tab[] = ['open', 'tension', 'tunings', 'barre', 'electric', 'examples']

// ---- Runtime data (fetched from /db.json, exported from db/egc.sqlite) ----

export interface DbChord {
  tier: 'Basic' | 'Advanced'
  subCategory?: string
  frets: string[]
  fingers: string[]
  rootString: number
  bassNote: string
  description?: string
}

export interface DbJson {
  schemaVersion: number
  chords: Record<string, DbChord>
  songKeys: { keyName: string; isPriority?: boolean; chords: { chord: string; nashville: string }[] }[]
  tuningKeys: { keyName: string; isPriority?: boolean; chords: { chord: string; nashville: string }[] }[]
  barreGroups: { groupName: string; usageLabel: string; description: string; chords: string[] }[]
  electricGroups: { groupName: string; description: string; chords: string[] }[]
  tensionForms: { groupName: string; formKr: string; description: string; chords: string[] }[]
  moves: {
    progressions: DbMove[]
    licks: DbMove[]
    techniques: DbMove[]
  }
  quiz: QuizItem[]
  glossary: GlossaryItem[]
  tunings: Record<string, number[]>
}

export interface DbMove {
  title: string
  category: string
  example: string
  description: string
  howTo: string
  sequence: string[]
}

export interface AppData {
  schemaVersion: number
  chordLibrary: Record<string, Chord>
  songKeys: KeyGroup[]
  tuningKeys: KeyGroup[]
  barreGroups: BarreGroup[]
  electricGroups: ElectricGroup[]
  tensionForms: TensionForm[]
  progressions: Move[]
  licks: Move[]
  techniques: Move[]
  quiz: QuizItem[]
  glossary: GlossaryItem[]
  tunings: Record<string, number[]>
}
