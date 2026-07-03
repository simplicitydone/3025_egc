import { describe, expect, it } from 'vitest'
import rawDb from '../../public/db.json'
import { buildAppData } from '../data/provider'
import { chordMidiNotes } from '../lib/audio'
import { bassNoteMatchesShape, isValidChordShape } from '../lib/validate'
import type { DbJson } from '../types/chord'

// The exported database is the artifact the app actually loads — test that.
const data = buildAppData(rawDb as unknown as DbJson)

describe('database export (public/db.json)', () => {
  it('builds without dangling chord references', () => {
    // buildAppData throws on unknown chord names; reaching here means all
    // 250+ references in keys, groups, forms, and moves resolved.
    expect(Object.keys(data.chordLibrary).length).toBeGreaterThan(100)
  })

  it('assigns each chord its dictionary key as name and a valid shape', () => {
    for (const [name, chord] of Object.entries(data.chordLibrary)) {
      expect(chord.name).toBe(name)
      expect(isValidChordShape(chord), name).toBe(true)
    }
  })

  it('ships all five tunings with six open strings each', () => {
    expect(Object.keys(data.tunings)).toHaveLength(5)
    for (const midi of Object.values(data.tunings)) {
      expect(midi).toHaveLength(6)
    }
    expect(data.tunings.standard).toEqual([40, 45, 50, 55, 59, 64])
  })
})

describe('group data integrity', () => {
  it('includes chords in every song key and tuning key', () => {
    expect(data.songKeys.length).toBeGreaterThan(5)
    for (const key of [...data.songKeys, ...data.tuningKeys]) {
      expect(key.chords.length).toBeGreaterThan(0)
    }
  })

  it('includes chords in barre and electric groups', () => {
    for (const group of [...data.barreGroups, ...data.electricGroups]) {
      expect(group.chords.length).toBeGreaterThan(0)
    }
  })

  it('includes chord sequences in all example moves', () => {
    const moves = [...data.progressions, ...data.licks, ...data.techniques]
    expect(moves.length).toBeGreaterThan(15)
    for (const move of moves) {
      expect(move.sequence.length).toBeGreaterThan(0)
      for (const chord of move.sequence) {
        expect(isValidChordShape(chord)).toBe(true)
      }
    }
  })
})

describe('open tension forms', () => {
  it('provides all seven forms with valid chords', () => {
    expect(data.tensionForms).toHaveLength(7)
    for (const form of data.tensionForms) {
      expect(form.chords.length).toBeGreaterThan(0)
      for (const chord of form.chords) {
        expect(isValidChordShape(chord)).toBe(true)
      }
    }
  })

  it('keeps strings 1 and 2 open in every tension voicing', () => {
    for (const form of data.tensionForms) {
      for (const chord of form.chords) {
        expect(chord.frets[4]).toBe('0')
        expect(chord.frets[5]).toBe('0')
      }
    }
  })

  it('ships the study guide content', () => {
    expect(data.quiz).toHaveLength(10)
    expect(data.glossary.length).toBeGreaterThanOrEqual(8)
  })
})

describe('musical integrity (standard tuning)', () => {
  it('bassNote matches the lowest sounding string for every standard-tuning chord', () => {
    for (const chord of Object.values(data.chordLibrary)) {
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
    // DADGAD shapes resolve against the DADGAD open strings from the DB
    expect(chordMidiNotes(['0', '0', '0', '2', '0', '0'], data.tunings.DADGAD)).toEqual([
      38, 45, 50, 57, 57, 62,
    ])
  })
})

describe('provider error handling', () => {
  it('throws loudly on dangling chord references', () => {
    const broken = JSON.parse(JSON.stringify(rawDb)) as DbJson
    broken.songKeys[0].chords[0].chord = 'No Such Chord'
    expect(() => buildAppData(broken)).toThrow(/No Such Chord/)
  })
})
