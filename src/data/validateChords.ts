import type { Chord } from '../types/chord'
import { BARRE_CHORDS } from './barre'
import { CHORD_LIBRARY } from './chords'
import { ELECTRIC_CHORDS } from './electric'
import { LICKS, SIGNATURE_MOVES, TECHNIQUES } from './examples'
import { SONG_KEYS } from './songKeys'
import { TUNING_KEYS } from './tunings'

const FINGER_PATTERN = /^(\d+|T|O|)$/

export function isValidChordShape(chord: Chord): boolean {
  return (
    chord.frets.length === 6 &&
    chord.fingers.length === 6 &&
    chord.frets.every((f) => /^(X|\d+)$/.test(f)) &&
    chord.fingers.every((f) => FINGER_PATTERN.test(f)) &&
    chord.rootString >= 1 &&
    chord.rootString <= 6 &&
    chord.bassNote.length > 0 &&
    chord.name.length > 0
  )
}

export function collectReferencedChordNames(): string[] {
  const names = new Set<string>()

  for (const key of [...SONG_KEYS, ...TUNING_KEYS]) {
    for (const { chord } of key.chords) {
      names.add(chord.name)
    }
  }

  for (const group of [...BARRE_CHORDS, ...ELECTRIC_CHORDS]) {
    for (const chord of group.chords) {
      names.add(chord.name)
    }
  }

  for (const move of [...SIGNATURE_MOVES, ...LICKS, ...TECHNIQUES]) {
    for (const chord of move.sequence) {
      names.add(chord.name)
    }
  }

  return [...names]
}

export function getMissingLibraryEntries(): string[] {
  const libraryNames = new Set(Object.keys(CHORD_LIBRARY))
  return collectReferencedChordNames().filter((name) => !libraryNames.has(name))
}
