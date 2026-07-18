import type {
  AppData,
  BarreGroup,
  Chord,
  DbJson,
  DbMove,
  ElectricGroup,
  KeyGroup,
  Move,
  TensionForm,
} from '../types/chord'

// Build the typed, reference-resolved app data from the raw db.json payload.
// Throws on dangling chord references so a bad export fails loudly.
export function buildAppData(raw: DbJson): AppData {
  const chordLibrary: Record<string, Chord> = Object.fromEntries(
    Object.entries(raw.chords).map(([name, c]) => [name, { ...c, name }]),
  )

  const resolve = (name: string, context: string): Chord => {
    const chord = chordLibrary[name]
    if (!chord) {
      throw new Error(`db.json references unknown chord '${name}' in ${context}`)
    }
    return chord
  }

  const keyGroups = (
    groups: DbJson['songKeys'],
    context: string,
  ): KeyGroup[] =>
    groups.map((g) => ({
      keyName: g.keyName,
      ...(g.isPriority ? { isPriority: true } : {}),
      chords: g.chords.map((c) => ({
        chord: resolve(c.chord, `${context}/${g.keyName}`),
        nashville: c.nashville,
      })),
    }))

  const barreGroups: BarreGroup[] = raw.barreGroups.map((g) => ({
    groupName: g.groupName,
    usageLabel: g.usageLabel,
    usageLabelKr: g.usageLabelKr,
    description: g.description,
    descriptionKr: g.descriptionKr,
    chords: g.chords.map((c) => resolve(c, `barre/${g.groupName}`)),
  }))

  const electricGroups: ElectricGroup[] = raw.electricGroups.map((g) => ({
    groupName: g.groupName,
    description: g.description,
    descriptionKr: g.descriptionKr,
    chords: g.chords.map((c) => resolve(c, `electric/${g.groupName}`)),
  }))

  const tensionForms: TensionForm[] = raw.tensionForms.map((g) => ({
    formName: g.groupName,
    formKr: g.formKr,
    description: g.description,
    descriptionKr: g.descriptionKr,
    chords: g.chords.map((c) => resolve(c, `tension/${g.groupName}`)),
  }))

  const moves = (list: DbMove[], context: string): Move[] =>
    list.map((m) => ({
      title: m.title,
      titleKr: m.titleKr,
      category: m.category,
      example: m.example,
      description: m.description,
      descriptionKr: m.descriptionKr,
      howTo: m.howTo,
      howToKr: m.howToKr,
      sequence: m.sequence.map((c) => resolve(c, `${context}/${m.title}`)),
    }))

  return {
    schemaVersion: raw.schemaVersion,
    chordLibrary,
    songKeys: keyGroups(raw.songKeys, 'open'),
    tuningKeys: keyGroups(raw.tuningKeys, 'tunings'),
    barreGroups,
    electricGroups,
    tensionForms,
    progressions: moves(raw.moves.progressions, 'progressions'),
    licks: moves(raw.moves.licks, 'licks'),
    techniques: moves(raw.moves.techniques, 'techniques'),
    quiz: raw.quiz,
    glossary: raw.glossary,
    tunings: raw.tunings,
  }
}

export async function loadAppData(): Promise<AppData> {
  const res = await fetch('/db.json', { cache: 'no-cache' })
  if (!res.ok) {
    throw new Error(`Failed to load chord database (${res.status})`)
  }
  return buildAppData((await res.json()) as DbJson)
}
