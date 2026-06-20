import { describe, expect, it } from 'vitest'
import { BARRE_CHORDS } from '../data/barre'
import { CHORD_LIBRARY, RAW_CHORDS } from '../data/chords'
import { ELECTRIC_CHORDS } from '../data/electric'
import { LICKS, SIGNATURE_MOVES, TECHNIQUES } from '../data/examples'
import { SONG_KEYS } from '../data/songKeys'
import { TUNING_KEYS } from '../data/tunings'
import {
  collectReferencedChordNames,
  getMissingLibraryEntries,
  isValidChordShape,
} from '../data/validateChords'

describe('CHORD_LIBRARY', () => {
  it('builds named chords from raw data', () => {
    expect(Object.keys(RAW_CHORDS).length).toBeGreaterThan(100)
    expect(Object.keys(CHORD_LIBRARY)).toHaveLength(Object.keys(RAW_CHORDS).length)
  })

  it('assigns each chord its dictionary key as name', () => {
    for (const [name, chord] of Object.entries(CHORD_LIBRARY)) {
      expect(chord.name).toBe(name)
      expect(isValidChordShape(chord)).toBe(true)
    }
  })
})

describe('chord references', () => {
  it('has no missing library entries in UI data', () => {
    expect(getMissingLibraryEntries()).toEqual([])
  })

  it('references a large chord vocabulary', () => {
    expect(collectReferencedChordNames().length).toBeGreaterThan(50)
  })
})

describe('group data integrity', () => {
  it('includes chords in every song key', () => {
    for (const key of SONG_KEYS) {
      expect(key.chords.length).toBeGreaterThan(0)
    }
  })

  it('includes chords in tuning, barre, and electric groups', () => {
    for (const key of TUNING_KEYS) {
      expect(key.chords.length).toBeGreaterThan(0)
    }
    for (const group of BARRE_CHORDS) {
      expect(group.chords.length).toBeGreaterThan(0)
    }
    for (const group of ELECTRIC_CHORDS) {
      expect(group.chords.length).toBeGreaterThan(0)
    }
  })

  it('includes chord sequences in examples', () => {
    for (const move of [...SIGNATURE_MOVES, ...LICKS, ...TECHNIQUES]) {
      expect(move.sequence.length).toBeGreaterThan(0)
      for (const chord of move.sequence) {
        expect(isValidChordShape(chord)).toBe(true)
      }
    }
  })
})
