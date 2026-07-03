import type { Chord } from '../types/chord'
import { chordMidiNotes } from './audio'

const FINGER_PATTERN = /^(\d+|T|O|)$/

const PITCH_CLASS: Record<string, number> = {
  C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5,
  'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
}

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

// Standard-tuning integrity check: the written bassNote must be the pitch class
// of the lowest sounding string — string order, not absolute pitch, since drone
// voicings can ring an inner open string below the fretted bass string.
// (Not applicable to alternate-tuning shapes.)
export function bassNoteMatchesShape(chord: Chord): boolean {
  const midis = chordMidiNotes(chord.frets)
  const expected = PITCH_CLASS[chord.bassNote]
  if (midis.length === 0 || expected === undefined) return false
  return midis[0] % 12 === expected
}
