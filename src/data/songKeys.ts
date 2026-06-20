import type { KeyGroup } from '../types/chord';
import { CHORD_LIBRARY } from './chords';

export const SONG_KEYS: KeyGroup[] = [
  { keyName: 'Key of G', isPriority: true, chords: [
    { chord: CHORD_LIBRARY['G Major'], nashville: 'I' }, { chord: CHORD_LIBRARY['A Minor 7'], nashville: 'ii' }, { chord: CHORD_LIBRARY['G/B'], nashville: 'I/3' }, { chord: CHORD_LIBRARY['C add9'], nashville: 'IV' }, { chord: CHORD_LIBRARY['D sus4'], nashville: 'V' }, { chord: CHORD_LIBRARY['D/F#'], nashville: 'V/7' }, { chord: CHORD_LIBRARY['E Minor 7'], nashville: 'vi' },
    { chord: CHORD_LIBRARY['G (High Drone)'], nashville: 'I (High)' }, { chord: CHORD_LIBRARY['Am11 (High Drone)'], nashville: 'ii (High)' }, { chord: CHORD_LIBRARY['Cmaj7 (High Drone)'], nashville: 'IV (High)' }, { chord: CHORD_LIBRARY['Dadd4 (High Drone)'], nashville: 'V (High)' }, { chord: CHORD_LIBRARY['Em7 (High Drone)'], nashville: 'vi (High)' },
    { chord: CHORD_LIBRARY['C/D'], nashville: 'IV/V' }, { chord: CHORD_LIBRARY['Gmaj9'], nashville: 'I (Maj9)' }, { chord: CHORD_LIBRARY['C6/9'], nashville: 'IV (6/9)' }, { chord: CHORD_LIBRARY['B7'], nashville: 'V/vi' }
  ]},
  { keyName: 'Key of D', isPriority: true, chords: [
    { chord: CHORD_LIBRARY['D Major'], nashville: 'I' }, { chord: CHORD_LIBRARY['E Minor 7 (Open)'], nashville: 'ii' }, { chord: CHORD_LIBRARY['D/F#'], nashville: 'I/3' }, { chord: CHORD_LIBRARY['G Major (D Key)'], nashville: 'IV' }, { chord: CHORD_LIBRARY['A sus4'], nashville: 'V' }, { chord: CHORD_LIBRARY['B Minor 7 (Open)'], nashville: 'vi' },
    { chord: CHORD_LIBRARY['D (High Drone)'], nashville: 'I (High)' }, { chord: CHORD_LIBRARY['Em11 (High Drone)'], nashville: 'ii (High)' }, { chord: CHORD_LIBRARY['G (High Drone - D Key)'], nashville: 'IV (High)' }, { chord: CHORD_LIBRARY['A (High Drone)'], nashville: 'V (High)' }, { chord: CHORD_LIBRARY['Bm11 (High Drone)'], nashville: 'vi (High)' },
    { chord: CHORD_LIBRARY['G/A'], nashville: 'IV/V' }, { chord: CHORD_LIBRARY['Dmaj9'], nashville: 'I (Maj9)' }, { chord: CHORD_LIBRARY['Gmaj7#11'], nashville: 'IV (#11)' }, { chord: CHORD_LIBRARY['Dmaj7 (Open)'], nashville: 'I (Maj7)' }
  ]},
  { keyName: 'Key of E', isPriority: true, chords: [
    { chord: CHORD_LIBRARY['E Major'], nashville: 'I' }, { chord: CHORD_LIBRARY['F# m11 (Open)'], nashville: 'ii' }, { chord: CHORD_LIBRARY['E/G#'], nashville: 'I/3' }, { chord: CHORD_LIBRARY['A 2'], nashville: 'IV' }, { chord: CHORD_LIBRARY['B sus4'], nashville: 'V' }, { chord: CHORD_LIBRARY['C# Minor 7'], nashville: 'vi' },
    { chord: CHORD_LIBRARY['E5 (High Drone)'], nashville: 'I (High)' }, { chord: CHORD_LIBRARY['F#m11 (High Drone)'], nashville: 'ii (High)' }, { chord: CHORD_LIBRARY['A2 (High Drone)'], nashville: 'IV (High)' }, { chord: CHORD_LIBRARY['Badd4 (High Drone)'], nashville: 'V (High)' }, { chord: CHORD_LIBRARY['C#m7 (High Drone)'], nashville: 'vi (High)' },
    { chord: CHORD_LIBRARY['A/B'], nashville: 'IV/V' }, { chord: CHORD_LIBRARY['Emaj9'], nashville: 'I (Maj9)' }
  ]},
  { keyName: 'Key of C', isPriority: true, chords: [
    { chord: CHORD_LIBRARY['C Major'], nashville: 'I' }, { chord: CHORD_LIBRARY['D Minor 7'], nashville: 'ii' }, { chord: CHORD_LIBRARY['C/E'], nashville: 'I/3' }, { chord: CHORD_LIBRARY['F Maj 7'], nashville: 'IV' }, { chord: CHORD_LIBRARY['Am7 (C Key)'], nashville: 'vi' },
    { chord: CHORD_LIBRARY['C (High Drone)'], nashville: 'I (High)' }, { chord: CHORD_LIBRARY['Dm11 (High Drone)'], nashville: 'ii (High)' }, { chord: CHORD_LIBRARY['Am11 (High Drone - C Key)'], nashville: 'vi (High)' },
    { chord: CHORD_LIBRARY['F Minor (Borrowed)'], nashville: 'iv' }, { chord: CHORD_LIBRARY['C#dim7'], nashville: '#Idim7' }, { chord: CHORD_LIBRARY['C7 (Open)'], nashville: 'I7' }
  ]},
  { keyName: 'Key of A', chords: [
    { chord: CHORD_LIBRARY['A Major (Std)'], nashville: 'I' }, { chord: CHORD_LIBRARY['B Minor 11'], nashville: 'ii' }, { chord: CHORD_LIBRARY['A/C#'], nashville: 'I/3' }, { chord: CHORD_LIBRARY['D Major 9'], nashville: 'IV' }, { chord: CHORD_LIBRARY['F# Minor 11'], nashville: 'vi' },
    { chord: CHORD_LIBRARY['A2 (High Drone - A Key)'], nashville: 'I (High)' }, { chord: CHORD_LIBRARY['Dmaj7 (High Drone)'], nashville: 'IV (High)' }, { chord: CHORD_LIBRARY['E (High Drone - A Key)'], nashville: 'V (High)' }, { chord: CHORD_LIBRARY['Amaj7 (Open)'], nashville: 'I (Maj7)' }
  ]},
  { keyName: 'Key of B', chords: [
    { chord: CHORD_LIBRARY['B Major'], nashville: 'I' }, { chord: CHORD_LIBRARY['B sus4 (Open)'], nashville: 'I (sus)' }, { chord: CHORD_LIBRARY['E Major 7 (Open)'], nashville: 'IV' }, { chord: CHORD_LIBRARY['F# Major'], nashville: 'V' }, { chord: CHORD_LIBRARY['G# Minor 7'], nashville: 'vi' },
    { chord: CHORD_LIBRARY['B5 (High Drone)'], nashville: 'I (High)' }, { chord: CHORD_LIBRARY['Emaj9 (High Drone)'], nashville: 'IV (High)' }
  ]},
  { keyName: 'Key of F (Thumb)', chords: [
    { chord: CHORD_LIBRARY['Fmaj7 (Thumb)'], nashville: 'I' }, { chord: CHORD_LIBRARY['Gm7 (Open)'], nashville: 'ii' }, { chord: CHORD_LIBRARY['Bb2 (Open)'], nashville: 'IV' }
  ]},
  { keyName: 'Foundational Minors', chords: [
    { chord: CHORD_LIBRARY['Am (Open)'], nashville: 'Am' }, { chord: CHORD_LIBRARY['Dm (Open)'], nashville: 'Dm' }, { chord: CHORD_LIBRARY['Em (Open)'], nashville: 'Em' }
  ]},
  { keyName: 'Open Dominant 7ths', chords: [
    { chord: CHORD_LIBRARY['A7 (Open)'], nashville: 'A7' }, { chord: CHORD_LIBRARY['C7 (Open)'], nashville: 'C7' }, { chord: CHORD_LIBRARY['D7 (Open)'], nashville: 'D7' }, { chord: CHORD_LIBRARY['E7 (Open)'], nashville: 'E7' }, { chord: CHORD_LIBRARY['G7 (Open)'], nashville: 'G7' }
  ]},
  { keyName: 'Acoustic Blues/Slide', chords: [
    { chord: CHORD_LIBRARY['E7 (Acoustic Blues)'], nashville: 'I7' }, { chord: CHORD_LIBRARY['Edim7 (Slide)'], nashville: '#Idim7' }
  ]}
];
