import { describe, expect, it } from 'vitest'
import { BARRE_CHORDS } from '../data/barre'
import { CHORD_LIBRARY, RAW_CHORDS } from '../data/chords'
import { ELECTRIC_CHORDS } from '../data/electric'
import { LICKS, SIGNATURE_MOVES, TECHNIQUES } from '../data/examples'
import { SONG_KEYS } from '../data/songKeys'
import { TENSION_FORMS, TENSION_GLOSSARY, TENSION_QUIZ } from '../data/tension'
import { TUNING_KEYS } from '../data/tunings'
import {
  bassNoteMatchesShape,
  collectReferencedChordNames,
  getMissingLibraryEntries,
  isValidChordShape,
} from '../data/validateChords'
import { chordMidiNotes } from '../lib/audio'

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

describe('open tension forms', () => {
  it('provides all seven forms with valid chords', () => {
    expect(TENSION_FORMS).toHaveLength(7)
    for (const form of TENSION_FORMS) {
      expect(form.chords.length).toBeGreaterThan(0)
      for (const chord of form.chords) {
        expect(chord).toBeDefined()
        expect(isValidChordShape(chord)).toBe(true)
      }
    }
  })

  it('keeps strings 1 and 2 open in every tension voicing', () => {
    for (const form of TENSION_FORMS) {
      for (const chord of form.chords) {
        expect(chord.frets[4]).toBe('0')
        expect(chord.frets[5]).toBe('0')
      }
    }
  })

  it('ships the study guide content', () => {
    expect(TENSION_QUIZ).toHaveLength(10)
    expect(TENSION_GLOSSARY.length).toBeGreaterThanOrEqual(8)
  })
})

describe('musical integrity (standard tuning)', () => {
  it('bassNote matches the lowest sounding string for every standard-tuning chord', () => {
    for (const chord of Object.values(CHORD_LIBRARY)) {
      if (chord.subCategory === 'Alternate Tuning') continue
      expect(bassNoteMatchesShape(chord), chord.name).toBe(true)
    }
  })

  it('computes strum pitches from fret shapes', () => {
    // E major 022100 → E2 B2 E3 G#3 B3 E4
    expect(chordMidiNotes(['0', '2', '2', '1', '0', '0'])).toEqual([
      40, 47, 52, 56, 59, 64,
    ])
    // Muted strings are skipped
    expect(chordMidiNotes(['X', '3', '2', '0', '1', '0'])).toEqual([
      48, 52, 55, 60, 64,
    ])
    // DADGAD shapes resolve against the DADGAD open strings
    expect(chordMidiNotes(['0', '0', '0', '2', '0', '0'], 'DADGAD')).toEqual([
      38, 45, 50, 57, 57, 62,
    ])
  })
})
