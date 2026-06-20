import type { Chord } from '../types/chord';

export const RAW_CHORDS: Record<string, Omit<Chord, 'name'>> = {
  // ==========================================
  // OPEN SECTION: KEY OF G
  // ==========================================
  // Basic
  'G Major': { tier: 'Basic', subCategory: 'Standard', frets: ['3', '2', '0', '0', '3', '3'], fingers: ['2', '1', '', '', '3', '4'], rootString: 6, bassNote: 'G' },
  'A Minor 7': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '0', '2', '0', '1', '0'], fingers: ['', '', '2', '', '1', ''], rootString: 5, bassNote: 'A' },
  'G/B': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '2', '0', '0', '3', '3'], fingers: ['', '1', '', '', '3', '4'], rootString: 5, bassNote: 'B' },
  'C add9': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '3', '2', '0', '3', '3'], fingers: ['', '2', '1', '', '3', '4'], rootString: 5, bassNote: 'C' },
  'D sus4': { tier: 'Basic', subCategory: 'Standard', frets: ['X', 'X', '0', '2', '3', '3'], fingers: ['', '', '', '1', '3', '4'], rootString: 4, bassNote: 'D' },
  'D/F#': { tier: 'Basic', subCategory: 'Standard', frets: ['2', 'X', '0', '2', '3', '2'], fingers: ['1', '', '', '2', '4', '3'], rootString: 6, bassNote: 'F#' },
  'E Minor 7': { tier: 'Basic', subCategory: 'Standard', frets: ['0', '2', '2', '0', '3', '3'], fingers: ['', '1', '2', '', '3', '4'], rootString: 6, bassNote: 'E' },
  // Advanced: High Drone Ecosystem (G)
  'G (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['X', '10', '9', '0', '8', '0'], fingers: ['', '3', '2', '', '1', ''], rootString: 5, bassNote: 'G', description: 'I chord up high.' },
  'Am11 (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['X', '12', '10', '0', '10', '0'], fingers: ['', '3', '1', '', '2', ''], rootString: 5, bassNote: 'A', description: 'ii chord up high.' },
  'Cmaj7 (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['8', 'X', '9', '0', '8', '0'], fingers: ['1', '', '3', '', '2', ''], rootString: 6, bassNote: 'C', description: 'IV chord up high.' },
  'Dadd4 (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['10', 'X', '11', '0', '10', '0'], fingers: ['1', '', '3', '', '2', ''], rootString: 6, bassNote: 'D', description: 'V chord up high.' },
  'Em7 (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['12', 'X', '12', '0', '12', '0'], fingers: ['1', '', '2', '', '3', ''], rootString: 6, bassNote: 'E', description: 'vi chord up high.' },
  // Advanced: Extensions (G)
  'Gmaj9': { tier: 'Advanced', subCategory: 'Extensions', frets: ['3', 'X', '4', '2', '3', 'X'], fingers: ['2', '', '4', '1', '3', ''], rootString: 6, bassNote: 'G', description: 'Jazzy I chord.' },
  'C6/9': { tier: 'Advanced', subCategory: 'Extensions', frets: ['X', '3', '2', '2', '3', '0'], fingers: ['', '2', '1', '1', '3', ''], rootString: 5, bassNote: 'C', description: 'Lush John Mayer style IV chord.' },
  'B7': { tier: 'Advanced', subCategory: 'Altered', frets: ['X', '2', '1', '2', '0', '2'], fingers: ['', '2', '1', '3', '', '4'], rootString: 5, bassNote: 'B', description: 'Secondary dominant (V of vi).' },

  // ==========================================
  // OPEN SECTION: KEY OF D
  // ==========================================
  // Basic
  'D Major': { tier: 'Basic', subCategory: 'Standard', frets: ['X', 'X', '0', '2', '3', '2'], fingers: ['', '', '', '1', '3', '2'], rootString: 4, bassNote: 'D' },
  'E Minor 7 (Open)': { tier: 'Basic', subCategory: 'Standard', frets: ['0', '2', '0', '0', '0', '0'], fingers: ['', '1', '', '', '', ''], rootString: 6, bassNote: 'E' },
  'F# Minor 7 (Open)': { tier: 'Basic', subCategory: 'Standard', frets: ['2', 'X', '2', '2', '0', '0'], fingers: ['1', '', '2', '3', '', ''], rootString: 6, bassNote: 'F#' },
  'G Major (D Key)': { tier: 'Basic', subCategory: 'Standard', frets: ['3', '2', '0', '0', '3', '3'], fingers: ['2', '1', '', '', '3', '4'], rootString: 6, bassNote: 'G' },
  'A sus4': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '0', '2', '2', '3', '0'], fingers: ['', '', '1', '2', '3', ''], rootString: 5, bassNote: 'A' },
  'B Minor 7 (Open)': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '2', '0', '2', '0', '2'], fingers: ['', '1', '', '2', '', '3'], rootString: 5, bassNote: 'B' },
  // Advanced: High Drone Ecosystem (D)
  'D (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['X', '5', '4', '0', '3', '0'], fingers: ['', '3', '2', '', '1', ''], rootString: 5, bassNote: 'D', description: 'I chord cinematic.' },
  'Em11 (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['X', '7', '5', '0', '5', '0'], fingers: ['', '3', '1', '', '2', ''], rootString: 5, bassNote: 'E', description: 'ii chord cinematic.' },
  'G (High Drone - D Key)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['X', '10', '9', '0', '8', '0'], fingers: ['', '3', '2', '', '1', ''], rootString: 5, bassNote: 'G', description: 'IV chord cinematic.' },
  'A (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['X', '0', '7', '6', '5', '0'], fingers: ['', '', '3', '2', '1', ''], rootString: 5, bassNote: 'A', description: 'V chord cinematic.' },
  'Bm11 (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['7', 'X', '7', '7', '0', '0'], fingers: ['1', '', '2', '3', '', ''], rootString: 6, bassNote: 'B', description: 'vi chord cinematic.' },
  // Advanced: Extensions (D)
  'Dmaj9': { tier: 'Advanced', subCategory: 'Extensions', frets: ['X', 'X', '0', '2', '2', '0'], fingers: ['', '', '', '1', '2', ''], rootString: 4, bassNote: 'D' },
  'Gmaj7#11': { tier: 'Advanced', subCategory: 'Extensions', frets: ['3', 'X', '4', '4', '2', '0'], fingers: ['2', '', '3', '4', '1', ''], rootString: 6, bassNote: 'G', description: 'Lydian dream chord.' },

  // ==========================================
  // OPEN SECTION: KEY OF E
  // ==========================================
  // Basic
  'E Major': { tier: 'Basic', subCategory: 'Standard', frets: ['0', '2', '2', '1', '0', '0'], fingers: ['', '2', '3', '1', '', ''], rootString: 6, bassNote: 'E' },
  'F# m11 (Open)': { tier: 'Basic', subCategory: 'Standard', frets: ['2', '4', '4', '2', '0', '0'], fingers: ['1', '3', '4', '1', '', ''], rootString: 6, bassNote: 'F#' },
  'E/G#': { tier: 'Basic', subCategory: 'Standard', frets: ['4', 'X', '2', '4', '0', '0'], fingers: ['4', '', '1', '3', '', ''], rootString: 6, bassNote: 'G#' },
  'A 2': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '0', '2', '2', '0', '0'], fingers: ['', '', '1', '2', '', ''], rootString: 5, bassNote: 'A' },
  'B sus4': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '2', '4', '4', '0', '0'], fingers: ['', '1', '3', '4', '', ''], rootString: 5, bassNote: 'B' },
  'C# Minor 7': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '4', '6', '6', '0', '0'], fingers: ['', '1', '3', '4', '', ''], rootString: 5, bassNote: 'C#' },
  // Advanced: High Drone Ecosystem (E)
  'E5 (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['0', '7', '9', '9', '0', '0'], fingers: ['', '1', '3', '4', '', ''], rootString: 6, bassNote: 'E', description: 'Massive I chord.' },
  'F#m11 (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['X', '9', '11', '11', '0', '0'], fingers: ['', '1', '3', '4', '', ''], rootString: 5, bassNote: 'F#', description: 'Massive ii chord.' },
  'A2 (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['X', '0', '7', '6', '0', '0'], fingers: ['', '', '2', '1', '', ''], rootString: 5, bassNote: 'A', description: 'Massive IV chord.' },
  'Badd4 (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['7', 'X', '9', '8', '0', '0'], fingers: ['1', '', '3', '2', '', ''], rootString: 6, bassNote: 'B', description: 'Massive V chord.' },
  'C#m7 (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['9', 'X', '11', '9', '0', '0'], fingers: ['1', '', '3', '1', '', ''], rootString: 6, bassNote: 'C#', description: 'Massive vi chord.' },
  // Advanced: Extensions (E)
  'Emaj9': { tier: 'Advanced', subCategory: 'Extensions', frets: ['0', '2', '4', '1', '0', '0'], fingers: ['', '2', '4', '1', '', ''], rootString: 6, bassNote: 'E' },

  // ==========================================
  // OPEN SECTION: KEY OF C
  // ==========================================
  // Basic
  'C Major': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '3', '2', '0', '1', '0'], fingers: ['', '3', '2', '', '1', ''], rootString: 5, bassNote: 'C' },
  'D Minor 7': { tier: 'Basic', subCategory: 'Standard', frets: ['X', 'X', '0', '2', '1', '1'], fingers: ['', '', '', '2', '1', '1'], rootString: 4, bassNote: 'D' },
  'C/E': { tier: 'Basic', subCategory: 'Standard', frets: ['0', '3', '2', '0', '1', '0'], fingers: ['', '3', '2', '', '1', ''], rootString: 6, bassNote: 'E' },
  'F Maj 7': { tier: 'Basic', subCategory: 'Standard', frets: ['X', 'X', '3', '2', '1', '0'], fingers: ['', '', '3', '2', '1', ''], rootString: 4, bassNote: 'F' },
  'Am7 (C Key)': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '0', '2', '0', '1', '0'], fingers: ['', '', '2', '', '1', ''], rootString: 5, bassNote: 'A' },
  // Advanced: High Drone (C)
  'C (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['8', 'X', '10', '9', '8', '8'], fingers: ['1', '', '3', '2', '1', '1'], rootString: 6, bassNote: 'C' }, // Barre
  'Dm11 (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['10', 'X', '10', '10', '8', 'X'], fingers: ['2', '', '3', '4', '1', ''], rootString: 6, bassNote: 'D' },
  'Am11 (High Drone - C Key)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['X', '0', '5', '5', '3', '0'], fingers: ['', '', '3', '4', '1', ''], rootString: 5, bassNote: 'A' },
  // Advanced: Altered/Jazz
  'F Minor (Borrowed)': { tier: 'Advanced', subCategory: 'Altered', frets: ['1', '3', '3', '1', '1', '1'], fingers: ['1', '3', '4', '1', '1', '1'], rootString: 6, bassNote: 'F' },
  'C#dim7': { tier: 'Advanced', subCategory: 'Altered', frets: ['X', '4', '5', '3', '5', 'X'], fingers: ['', '2', '3', '1', '4', ''], rootString: 5, bassNote: 'C#' },
  'Am(maj7)': { tier: 'Advanced', subCategory: 'Altered', frets: ['X', '0', '2', '1', '1', '0'], fingers: ['', '', '2', '1', '1', ''], rootString: 5, bassNote: 'A' },

  // ==========================================
  // JAZZ & BARRE: THE COMPLETE MATRIX
  // ==========================================
  // Drop 2: Top 4 Strings (D-G-B-e)
  'Cmaj7 (D2 Top Root)': { tier: 'Advanced', subCategory: 'Drop-2 (Top)', frets: ['X', 'X', '10', '9', '8', '7'], fingers: ['', '', '4', '3', '2', '1'], rootString: 4, bassNote: 'C' },
  'Cmaj7 (D2 Top 1st)': { tier: 'Advanced', subCategory: 'Drop-2 (Top)', frets: ['X', 'X', '2', '4', '1', '3'], fingers: ['', '', '2', '4', '1', '3'], rootString: 3, bassNote: 'E' },
  'Cmaj7 (D2 Top 2nd)': { tier: 'Advanced', subCategory: 'Drop-2 (Top)', frets: ['X', 'X', '5', '5', '5', '7'], fingers: ['', '', '1', '1', '1', '3'], rootString: 2, bassNote: 'G' },
  'Cmaj7 (D2 Top 3rd)': { tier: 'Advanced', subCategory: 'Drop-2 (Top)', frets: ['X', 'X', '9', '9', '8', '8'], fingers: ['', '', '2', '3', '1', '1'], rootString: 1, bassNote: 'B' },
  // Drop 2: Middle 4 Strings (A-D-G-B) - THE MISSING SECTION
  'Cmaj7 (D2 Mid Root)': { tier: 'Advanced', subCategory: 'Drop-2 (Mid)', frets: ['X', '3', '5', '4', '5', 'X'], fingers: ['', '1', '3', '2', '4', ''], rootString: 5, bassNote: 'C' },
  'Cmaj7 (D2 Mid 1st)': { tier: 'Advanced', subCategory: 'Drop-2 (Mid)', frets: ['X', '7', '9', '9', '8', 'X'], fingers: ['', '1', '3', '4', '2', ''], rootString: 5, bassNote: 'E' },
  'Cmaj7 (D2 Mid 2nd)': { tier: 'Advanced', subCategory: 'Drop-2 (Mid)', frets: ['X', '10', '10', '9', '12', 'X'], fingers: ['', '2', '2', '1', '4', ''], rootString: 5, bassNote: 'G' },
  'Cmaj7 (D2 Mid 3rd)': { tier: 'Advanced', subCategory: 'Drop-2 (Mid)', frets: ['X', '14', '14', '12', '13', 'X'], fingers: ['', '3', '4', '1', '2', ''], rootString: 5, bassNote: 'B' },
  // Drop 3: 6-4-3-2 Strings
  'Gmaj7 (D3 Root)': { tier: 'Advanced', subCategory: 'Drop-3', frets: ['3', 'X', '4', '4', '3', 'X'], fingers: ['1', '', '3', '4', '2', ''], rootString: 6, bassNote: 'G' },
  'Gmaj7 (D3 1st)': { tier: 'Advanced', subCategory: 'Drop-3', frets: ['7', 'X', '5', '7', '7', 'X'], fingers: ['2', '', '1', '3', '4', ''], rootString: 6, bassNote: 'B' },
  'Gmaj7 (D3 2nd)': { tier: 'Advanced', subCategory: 'Drop-3', frets: ['10', 'X', '9', '11', '12', 'X'], fingers: ['2', '', '1', '3', '4', ''], rootString: 6, bassNote: 'D' },
  'Gmaj7 (D3 3rd)': { tier: 'Advanced', subCategory: 'Drop-3', frets: ['14', 'X', '12', '14', '15', 'X'], fingers: ['2', '', '1', '3', '4', ''], rootString: 6, bassNote: 'F#' },
  // Drop 2: Low 4 Strings (E-A-D-G)
  'Cmaj7 (D2 Low Root)': { tier: 'Advanced', subCategory: 'Drop-2 (Low)', frets: ['8', '10', '9', '9', 'X', 'X'], fingers: ['1', '3', '2', '2', '', ''], rootString: 6, bassNote: 'C' },
  'Cmaj7 (D2 Low 1st)': { tier: 'Advanced', subCategory: 'Drop-2 (Low)', frets: ['12', '14', '10', '12', 'X', 'X'], fingers: ['2', '4', '1', '3', '', ''], rootString: 6, bassNote: 'E' },
  'Cmaj7 (D2 Low 2nd)': { tier: 'Advanced', subCategory: 'Drop-2 (Low)', frets: ['3', '3', '2', '4', 'X', 'X'], fingers: ['2', '3', '1', '4', '', ''], rootString: 6, bassNote: 'G' },
  'Cmaj7 (D2 Low 3rd)': { tier: 'Advanced', subCategory: 'Drop-2 (Low)', frets: ['7', '7', '5', '5', 'X', 'X'], fingers: ['3', '4', '1', '1', '', ''], rootString: 6, bassNote: 'B' },
  // Minor Drop 2: Middle 4 Strings (A-D-G-B)
  'Cm7 (D2 Mid Root)': { tier: 'Advanced', subCategory: 'Drop-2 Minor', frets: ['X', '3', '5', '3', '4', 'X'], fingers: ['', '1', '3', '1', '2', ''], rootString: 5, bassNote: 'C' },
  'Cm7 (D2 Mid 1st)': { tier: 'Advanced', subCategory: 'Drop-2 Minor', frets: ['X', '6', '8', '5', '8', 'X'], fingers: ['', '2', '4', '1', '4', ''], rootString: 5, bassNote: 'Eb' },
  'Cm7 (D2 Mid 2nd)': { tier: 'Advanced', subCategory: 'Drop-2 Minor', frets: ['X', '10', '10', '8', '11', 'X'], fingers: ['', '2', '3', '1', '4', ''], rootString: 5, bassNote: 'G' },
  'Cm7 (D2 Mid 3rd)': { tier: 'Advanced', subCategory: 'Drop-2 Minor', frets: ['X', '13', '13', '12', '13', 'X'], fingers: ['', '2', '3', '1', '4', ''], rootString: 5, bassNote: 'Bb' },
  // Minor Drop 3: 6-4-3-2 Strings
  'Gm7 (D3 Root)': { tier: 'Advanced', subCategory: 'Drop-3 Minor', frets: ['3', 'X', '3', '3', '3', 'X'], fingers: ['1', '', '1', '1', '1', ''], rootString: 6, bassNote: 'G' },
  'Gm7 (D3 1st)': { tier: 'Advanced', subCategory: 'Drop-3 Minor', frets: ['6', 'X', '5', '7', '6', 'X'], fingers: ['2', '', '1', '4', '3', ''], rootString: 6, bassNote: 'Bb' },
  'Gm7 (D3 2nd)': { tier: 'Advanced', subCategory: 'Drop-3 Minor', frets: ['10', 'X', '8', '10', '11', 'X'], fingers: ['3', '', '1', '2', '4', ''], rootString: 6, bassNote: 'D' },
  'Gm7 (D3 3rd)': { tier: 'Advanced', subCategory: 'Drop-3 Minor', frets: ['13', 'X', '12', '12', '11', 'X'], fingers: ['3', '', '2', '2', '1', ''], rootString: 6, bassNote: 'F' },
  // Altered / Extensions
  'G13': { tier: 'Advanced', subCategory: 'Extensions', frets: ['3', 'X', '3', '4', '5', 'X'], fingers: ['1', '', '2', '3', '4', ''], rootString: 6, bassNote: 'G' },
  'E7#9': { tier: 'Advanced', subCategory: 'Altered', frets: ['X', '7', '6', '7', '8', 'X'], fingers: ['', '2', '1', '3', '4', ''], rootString: 5, bassNote: 'E' },
  'E7b9': { tier: 'Advanced', subCategory: 'Altered', frets: ['X', '7', '6', '7', '6', 'X'], fingers: ['', '2', '1', '3', '1', ''], rootString: 5, bassNote: 'E', description: 'Classic jazz resolution.' },
  'E7#5#9': { tier: 'Advanced', subCategory: 'Altered', frets: ['X', '7', '6', '7', '8', '8'], fingers: ['', '2', '1', '3', '4', '4'], rootString: 5, bassNote: 'E' },
  'B m7b5': { tier: 'Advanced', subCategory: 'Jazz', frets: ['X', '2', '3', '2', '3', 'X'], fingers: ['', '1', '3', '2', '4', ''], rootString: 5, bassNote: 'B', description: 'Half-diminished ii chord.' },
  // Rootless Upper Structures
  'Gmaj7 (Play Bm)': { tier: 'Advanced', subCategory: 'Upper Structure', frets: ['X', 'X', 'X', '7', '7', '7'], fingers: ['', '', '', '1', '1', '1'], rootString: 3, bassNote: 'B', description: 'Bm triad over G bass.' },
  'Cmaj9 (Play Em7)': { tier: 'Advanced', subCategory: 'Upper Structure', frets: ['X', 'X', '2', '4', '3', '3'], fingers: ['', '', '1', '3', '2', '2'], rootString: 3, bassNote: 'E', description: 'Em7 over C bass.' },

  // ==========================================
  // ELECTRIC SPREAD TRIADS & DOUBLE STOPS
  // ==========================================
  'G Maj (Top Root)': { tier: 'Basic', subCategory: 'Triads', frets: ['X','X','X','12','12','15'], fingers: ['','','','1','1','4'], rootString: 3, bassNote: 'G' },
  'G Maj (Top 1st)': { tier: 'Basic', subCategory: 'Triads', frets: ['X','X','X','4','3','3'], fingers: ['','','','2','1','1'], rootString: 1, bassNote: 'B' },
  'G Maj (Top 2nd)': { tier: 'Basic', subCategory: 'Triads', frets: ['X','X','X','7','8','7'], fingers: ['','','','1','2','1'], rootString: 2, bassNote: 'D' },
  'C Maj (Mid Root)': { tier: 'Basic', subCategory: 'Triads', frets: ['X','X','10','9','8','X'], fingers: ['','','3','2','1',''], rootString: 4, bassNote: 'C' },
  'C Maj (Mid 1st)': { tier: 'Basic', subCategory: 'Triads', frets: ['X','X','2','0','1','X'], fingers: ['','','2','','1',''], rootString: 2, bassNote: 'E' },
  'C Maj (Mid 2nd)': { tier: 'Basic', subCategory: 'Triads', frets: ['X','X','5','5','5','X'], fingers: ['','','1','1','1',''], rootString: 3, bassNote: 'G' },
  // Low Triads (A-D-G strings)
  'F Maj (Low Root)': { tier: 'Basic', subCategory: 'Triads', frets: ['X','8','7','5','X','X'], fingers: ['','3','2','1','',''], rootString: 5, bassNote: 'F' },
  'F Maj (Low 1st)': { tier: 'Basic', subCategory: 'Triads', frets: ['X','12','10','10','X','X'], fingers: ['','3','1','1','',''], rootString: 4, bassNote: 'A' },
  'F Maj (Low 2nd)': { tier: 'Basic', subCategory: 'Triads', frets: ['X','3','3','2','X','X'], fingers: ['','2','3','1','',''], rootString: 3, bassNote: 'C' },
  // The missing Spread Triads (Eric Johnson / Frusciante style)
  'G Spread (Root)': { tier: 'Advanced', subCategory: 'Spread Triad', frets: ['3', 'X', '0', '4', 'X', 'X'], fingers: ['1', '', 'O', '3', '', ''], rootString: 6, bassNote: 'G', description: 'Root - 5th - 10th.' },
  'G Spread (1st Inv)': { tier: 'Advanced', subCategory: 'Spread Triad', frets: ['7', 'X', '5', '7', 'X', 'X'], fingers: ['2', '', '1', '3', '', ''], rootString: 6, bassNote: 'B' },
  'G Spread (2nd Inv)': { tier: 'Advanced', subCategory: 'Spread Triad', frets: ['10', 'X', '9', '12', 'X', 'X'], fingers: ['2', '', '1', '4', '', ''], rootString: 6, bassNote: 'D' },
  // Double Stops & Clusters
  '4ths Double Stop': { tier: 'Basic', subCategory: 'Double Stop', frets: ['X','X','X','7','7','X'], fingers: ['','','','1','1',''], rootString: 3, bassNote: 'D' },
  '3rds Double Stop': { tier: 'Basic', subCategory: 'Double Stop', frets: ['X','X','5','4','X','X'], fingers: ['','','2','1','',''], rootString: 4, bassNote: 'G' },
  'D add9 (Cluster)': { tier: 'Advanced', subCategory: 'Ambient', frets: ['X', 'X', '0', '9', '7', '0'], fingers: ['', '', '', '3', '1', ''], rootString: 4, bassNote: 'D' },

  // --- ELECTRIC EXPANSION ---
  // Minor Triads
  'G Min (Top Root)': { tier: 'Basic', subCategory: 'Triads', frets: ['X', 'X', 'X', '12', '11', '10'], fingers: ['', '', '', '3', '2', '1'], rootString: 3, bassNote: 'G' },
  'G Min (Top 1st)': { tier: 'Basic', subCategory: 'Triads', frets: ['X', 'X', 'X', '3', '3', '3'], fingers: ['', '', '', '1', '1', '1'], rootString: 1, bassNote: 'Bb' },
  'G Min (Top 2nd)': { tier: 'Basic', subCategory: 'Triads', frets: ['X', 'X', 'X', '7', '8', '6'], fingers: ['', '', '', '2', '3', '1'], rootString: 2, bassNote: 'D' },
  'C Min (Mid Root)': { tier: 'Basic', subCategory: 'Triads', frets: ['X', 'X', '10', '8', '8', 'X'], fingers: ['', '', '3', '1', '1', ''], rootString: 4, bassNote: 'C' },
  'C Min (Mid 1st)': { tier: 'Basic', subCategory: 'Triads', frets: ['X', 'X', '1', '0', '1', 'X'], fingers: ['', '', '2', '', '3', ''], rootString: 2, bassNote: 'Eb' },
  'C Min (Mid 2nd)': { tier: 'Basic', subCategory: 'Triads', frets: ['X', 'X', '5', '5', '4', 'X'], fingers: ['', '', '2', '3', '1', ''], rootString: 3, bassNote: 'G' },
  // Diminished Triads
  'B Dim (Mid Root)': { tier: 'Advanced', subCategory: 'Triads', frets: ['X', 'X', '9', '7', '6', 'X'], fingers: ['', '', '4', '2', '1', ''], rootString: 4, bassNote: 'B' },
  'B Dim (Mid 1st)': { tier: 'Advanced', subCategory: 'Triads', frets: ['X', 'X', '12', '10', '12', 'X'], fingers: ['', '', '3', '1', '4', ''], rootString: 2, bassNote: 'D' },
  'B Dim (Mid 2nd)': { tier: 'Advanced', subCategory: 'Triads', frets: ['X', 'X', '3', '4', '3', 'X'], fingers: ['', '', '1', '2', '1', ''], rootString: 3, bassNote: 'F' },
  // Deep Triads (E-A-D)
  'C Maj (Deep Root)': { tier: 'Basic', subCategory: 'Triads', frets: ['8', '7', '5', 'X', 'X', 'X'], fingers: ['4', '3', '1', '', '', ''], rootString: 6, bassNote: 'C' },
  'C Maj (Deep 1st)': { tier: 'Basic', subCategory: 'Triads', frets: ['12', '10', '10', 'X', 'X', 'X'], fingers: ['3', '1', '1', '', '', ''], rootString: 4, bassNote: 'E' },
  'C Maj (Deep 2nd)': { tier: 'Basic', subCategory: 'Triads', frets: ['3', '3', '2', 'X', 'X', 'X'], fingers: ['2', '3', '1', '', '', ''], rootString: 5, bassNote: 'G' },
  // Funk Shells (3rd & 7th)
  'Dm7 (Funk Shell)': { tier: 'Advanced', subCategory: 'Shell', frets: ['X', 'X', '3', '5', 'X', 'X'], fingers: ['', '', '1', '3', '', ''], rootString: 4, bassNote: 'F', description: 'Rootless 3rd & 7th' },
  'G7 (Funk Shell)': { tier: 'Advanced', subCategory: 'Shell', frets: ['X', 'X', '3', '4', 'X', 'X'], fingers: ['', '', '1', '2', '', ''], rootString: 4, bassNote: 'F', description: 'Rootless 7th & 3rd' },
  'Cmaj7 (Funk Shell)': { tier: 'Advanced', subCategory: 'Shell', frets: ['X', 'X', '2', '4', 'X', 'X'], fingers: ['', '', '1', '3', '', ''], rootString: 4, bassNote: 'E', description: 'Rootless 3rd & 7th' },
  // Ambient Clusters & Wide 5ths
  'Cadd9 (Pad)': { tier: 'Advanced', subCategory: 'Ambient', frets: ['X', '3', '5', '5', '3', 'X'], fingers: ['', '1', '3', '4', '1', ''], rootString: 5, bassNote: 'C', description: 'Dense stacked 2nd' },
  'Emaj9 (Cluster)': { tier: 'Advanced', subCategory: 'Ambient', frets: ['X', 'X', '4', '4', '4', '4'], fingers: ['', '', '1', '1', '1', '1'], rootString: 4, bassNote: 'F#', description: 'Barre cluster' },
  'G5 (Wide Arena)': { tier: 'Advanced', subCategory: 'Wide 5th', frets: ['3', 'X', 'X', '0', '3', 'X'], fingers: ['1', '', '', 'O', '4', ''], rootString: 6, bassNote: 'G', description: 'Massive open 5th' },
  'C5 (Wide Arena)': { tier: 'Advanced', subCategory: 'Wide 5th', frets: ['8', 'X', 'X', '5', '8', 'X'], fingers: ['3', '', '', '1', '4', ''], rootString: 6, bassNote: 'C', description: 'Massive open 5th' },
  
  // Missing / Inherited
  'C/D': { tier: 'Advanced', subCategory: 'Standard', frets: ['X', 'X', '0', '0', '1', '0'], fingers: ['', '', '', '', '1', ''], rootString: 4, bassNote: 'D' },
  'G/A': { tier: 'Advanced', subCategory: 'Standard', frets: ['X', '0', '0', '0', '0', '3'], fingers: ['', '', '', '', '', '3'], rootString: 5, bassNote: 'A' },
  'A/B': { tier: 'Advanced', subCategory: 'Standard', frets: ['X', '2', '2', '2', '2', '0'], fingers: ['', '1', '2', '3', '4', ''], rootString: 5, bassNote: 'B' },
  'A13 (Play Gmaj7)': { tier: 'Advanced', subCategory: 'Upper Structure', frets: ['X', 'X', '5', '7', '7', '7'], fingers: ['', '', '1', '3', '4', '4'], rootString: 3, bassNote: 'G' },
  'Am6': { tier: 'Advanced', subCategory: 'Altered', frets: ['X', '0', '2', '2', '1', '2'], fingers: ['', '', '2', '3', '1', '4'], rootString: 5, bassNote: 'A' },
  'C/G': { tier: 'Advanced', subCategory: 'Standard', frets: ['3', '3', '2', '0', '1', '0'], fingers: ['3', '4', '2', '', '1', ''], rootString: 6, bassNote: 'G' },
  'F/G': { tier: 'Advanced', subCategory: 'Standard', frets: ['3', 'X', '3', '2', '1', 'X'], fingers: ['3', '', '4', '2', '1', ''], rootString: 6, bassNote: 'G' },

  // ==========================================
  // OPEN SECTION: RESTORED KEYS (A, B, F, DADGAD)
  // ==========================================
  // KEY OF A
  'A Major (Std)': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '0', '2', '2', '2', '0'], fingers: ['', '', '1', '2', '3', ''], rootString: 5, bassNote: 'A' },
  'B Minor 11': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '2', '0', '2', '3', '0'], fingers: ['', '1', '', '2', '3', ''], rootString: 5, bassNote: 'B' },
  'A/C#': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '4', '2', '2', '2', '0'], fingers: ['', '3', '1', '1', '1', ''], rootString: 5, bassNote: 'C#' },
  'D Major 9': { tier: 'Basic', subCategory: 'Standard', frets: ['X', 'X', '0', '2', '2', '0'], fingers: ['', '', '', '1', '2', ''], rootString: 4, bassNote: 'D' },
  'F# Minor 11': { tier: 'Basic', subCategory: 'Standard', frets: ['2', 'X', '2', '2', '0', '0'], fingers: ['1', '', '2', '3', '', ''], rootString: 6, bassNote: 'F#' },
  'A2 (High Drone - A Key)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['X', '0', '7', '6', '0', '0'], fingers: ['', '', '2', '1', '', ''], rootString: 5, bassNote: 'A', description: 'Massive I chord.' },
  'Dmaj7 (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['X', '5', '7', '6', '0', '0'], fingers: ['', '1', '3', '2', '', ''], rootString: 5, bassNote: 'D', description: 'Massive IV chord.' },
  'E (High Drone - A Key)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['0', '7', '9', '9', '0', '0'], fingers: ['', '1', '3', '4', '', ''], rootString: 6, bassNote: 'E', description: 'Massive V chord.' },
  
  // KEY OF B
  'B Major': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '2', '4', '4', '4', '2'], fingers: ['', '1', '2', '3', '4', '1'], rootString: 5, bassNote: 'B' },
  'B sus4 (Open)': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '2', '4', '4', '0', '0'], fingers: ['', '1', '3', '4', '', ''], rootString: 5, bassNote: 'B' },
  'E Major 7 (Open)': { tier: 'Basic', subCategory: 'Standard', frets: ['0', '2', '1', '1', '0', '0'], fingers: ['', '3', '1', '2', '', ''], rootString: 6, bassNote: 'E' },
  'F# Major': { tier: 'Basic', subCategory: 'Standard', frets: ['2', '4', '4', '3', '2', '2'], fingers: ['1', '3', '4', '2', '1', '1'], rootString: 6, bassNote: 'F#' },
  'G# Minor 7': { tier: 'Basic', subCategory: 'Standard', frets: ['4', 'X', '4', '4', '4', 'X'], fingers: ['1', '', '2', '3', '4', ''], rootString: 6, bassNote: 'G#' },
  'B5 (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['7', '9', '9', '8', '0', '0'], fingers: ['1', '3', '4', '2', '', ''], rootString: 6, bassNote: 'B', description: 'Massive I chord.' },
  'Emaj9 (High Drone)': { tier: 'Advanced', subCategory: 'High Drone', frets: ['0', '7', '9', '8', '7', '0'], fingers: ['', '2', '4', '3', '1', ''], rootString: 6, bassNote: 'E', description: 'Massive IV chord.' },

  // KEY OF F (THUMB)
  'Fmaj7 (Thumb)': { tier: 'Basic', subCategory: 'Standard', frets: ['1', 'X', '3', '2', '1', '0'], fingers: ['T', '', '3', '2', '1', ''], rootString: 6, bassNote: 'F', description: 'Hendrix style thumb root.' },
  'Gm7 (Open)': { tier: 'Basic', subCategory: 'Standard', frets: ['3', 'X', '3', '3', '3', '0'], fingers: ['T', '', '1', '1', '1', ''], rootString: 6, bassNote: 'G' },
  'Bb2 (Open)': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '1', '3', '3', '1', '1'], fingers: ['', '1', '3', '4', '1', '1'], rootString: 5, bassNote: 'Bb' },

  // DADGAD
  'D (DADGAD)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['0', '0', '0', '2', '0', '0'], fingers: ['', '', '', '1', '', ''], rootString: 6, bassNote: 'D' },
  'Em (DADGAD)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['2', '2', '0', '0', '0', '0'], fingers: ['1', '2', '', '', '', ''], rootString: 6, bassNote: 'E' },
  'F#m (DADGAD)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['4', '4', '0', '2', '0', '0'], fingers: ['2', '3', '', '1', '', ''], rootString: 6, bassNote: 'F#' },
  'G (DADGAD)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['5', '5', '0', '4', '0', '0'], fingers: ['2', '3', '', '1', '', ''], rootString: 6, bassNote: 'G' },
  'A (DADGAD)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['7', '7', '0', '6', '0', '0'], fingers: ['2', '3', '', '1', '', ''], rootString: 6, bassNote: 'A' },
  'Bm (DADGAD)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['9', '9', '0', '7', '0', '0'], fingers: ['2', '3', '', '1', '', ''], rootString: 6, bassNote: 'B' },

  // OPEN D TUNING
  'D (Open D)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['0', '0', '0', '0', '0', '0'], fingers: ['', '', '', '', '', ''], rootString: 6, bassNote: 'D' },
  'Em (Open D)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['2', '2', '2', '1', '2', '2'], fingers: ['1', '1', '1', '2', '1', '1'], rootString: 6, bassNote: 'E' },
  'F#m (Open D)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['4', '4', '4', '3', '4', '4'], fingers: ['1', '1', '1', '2', '1', '1'], rootString: 6, bassNote: 'F#' },
  'G (Open D)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['5', '5', '5', '5', '5', '5'], fingers: ['1', '1', '1', '1', '1', '1'], rootString: 6, bassNote: 'G' },
  'A (Open D)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['7', '7', '7', '7', '7', '7'], fingers: ['1', '1', '1', '1', '1', '1'], rootString: 6, bassNote: 'A' },
  'Bm (Open D)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['9', '9', '9', '8', '9', '9'], fingers: ['1', '1', '1', '2', '1', '1'], rootString: 6, bassNote: 'B' },

  // --- FINAL MASTERCLASS ADDITIONS ---
  // Open Tunings
  'G (Open G)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['0', '0', '0', '0', '0', '0'], fingers: ['', '', '', '', '', ''], rootString: 5, bassNote: 'G' },
  'C (Open G)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['5', '5', '5', '5', '5', '5'], fingers: ['1', '1', '1', '1', '1', '1'], rootString: 5, bassNote: 'C' },
  'D (Open G)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['7', '7', '7', '7', '7', '7'], fingers: ['1', '1', '1', '1', '1', '1'], rootString: 5, bassNote: 'D' },
  'C (Open C)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['0', '0', '0', '0', '0', '0'], fingers: ['', '', '', '', '', ''], rootString: 6, bassNote: 'C' },
  'F (Open C)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['5', '5', '5', '5', '5', '5'], fingers: ['1', '1', '1', '1', '1', '1'], rootString: 6, bassNote: 'F' },
  'G (Open C)': { tier: 'Basic', subCategory: 'Alternate Tuning', frets: ['7', '7', '7', '7', '7', '7'], fingers: ['1', '1', '1', '1', '1', '1'], rootString: 6, bassNote: 'G' },
  'E7 (Acoustic Blues)': { tier: 'Advanced', subCategory: 'Blues', frets: ['0', '2', '0', '1', '3', '0'], fingers: ['', '2', '', '1', '4', ''], rootString: 6, bassNote: 'E', description: 'Classic delta blues dominant' },
  'Edim7 (Slide)': { tier: 'Advanced', subCategory: 'Blues', frets: ['X', '1', '2', '0', '2', '0'], fingers: ['', '1', '2', '', '3', ''], rootString: 5, bassNote: 'Bb', description: 'Acoustic passing diminished' },
  
  // Dominant 7th Matrices (Drop 2 Mid)
  'G7 (D2 Mid Root)': { tier: 'Advanced', subCategory: 'Drop-2 Dominant', frets: ['X', '10', '12', '10', '12', 'X'], fingers: ['', '1', '3', '1', '4', ''], rootString: 5, bassNote: 'G' },
  'G7 (D2 Mid 1st)': { tier: 'Advanced', subCategory: 'Drop-2 Dominant', frets: ['X', '2', '3', '0', '3', 'X'], fingers: ['', '2', '3', '', '4', ''], rootString: 5, bassNote: 'B' },
  'G7 (D2 Mid 2nd)': { tier: 'Advanced', subCategory: 'Drop-2 Dominant', frets: ['X', '5', '5', '4', '6', 'X'], fingers: ['', '2', '3', '1', '4', ''], rootString: 5, bassNote: 'D' },
  'G7 (D2 Mid 3rd)': { tier: 'Advanced', subCategory: 'Drop-2 Dominant', frets: ['X', '8', '9', '7', '8', 'X'], fingers: ['', '2', '3', '1', '4', ''], rootString: 5, bassNote: 'F' },
  
  // m7b5 Matrices (Drop 2 Mid)
  'Bm7b5 (D2 Mid Root)': { tier: 'Advanced', subCategory: 'Half-Diminished', frets: ['X', '2', '3', '2', '3', 'X'], fingers: ['', '1', '3', '2', '4', ''], rootString: 5, bassNote: 'B' },
  'Bm7b5 (D2 Mid 1st)': { tier: 'Advanced', subCategory: 'Half-Diminished', frets: ['X', '5', '7', '4', '6', 'X'], fingers: ['', '2', '4', '1', '3', ''], rootString: 5, bassNote: 'D' },
  'Bm7b5 (D2 Mid 2nd)': { tier: 'Advanced', subCategory: 'Half-Diminished', frets: ['X', '8', '9', '7', '10', 'X'], fingers: ['', '2', '3', '1', '4', ''], rootString: 5, bassNote: 'F' },
  'Bm7b5 (D2 Mid 3rd)': { tier: 'Advanced', subCategory: 'Half-Diminished', frets: ['X', '12', '12', '10', '12', 'X'], fingers: ['', '2', '3', '1', '4', ''], rootString: 5, bassNote: 'A' },
  
  // Fully Diminished Symmetrical
  'Co7 (Root)': { tier: 'Advanced', subCategory: 'Diminished', frets: ['X', '3', '4', '2', '4', 'X'], fingers: ['', '2', '3', '1', '4', ''], rootString: 5, bassNote: 'C' },
  'Co7 (+3 frets)': { tier: 'Advanced', subCategory: 'Diminished', frets: ['X', '6', '7', '5', '7', 'X'], fingers: ['', '2', '3', '1', '4', ''], rootString: 5, bassNote: 'Eb', description: 'Exact same shape, up a minor 3rd' },
  'Co7 (+6 frets)': { tier: 'Advanced', subCategory: 'Diminished', frets: ['X', '9', '10', '8', '10', 'X'], fingers: ['', '2', '3', '1', '4', ''], rootString: 5, bassNote: 'Gb', description: 'Exact same shape, up a tritone' },

  // Quartal & Drop 2&4
  'Quartal (A-D-G)': { tier: 'Advanced', subCategory: 'Quartal', frets: ['X', '5', '5', '5', 'X', 'X'], fingers: ['', '1', '1', '1', '', ''], rootString: 5, bassNote: 'D', description: 'Stacked perfect 4ths' },
  'Quartal (D-G-B)': { tier: 'Advanced', subCategory: 'Quartal', frets: ['X', 'X', '5', '5', '6', 'X'], fingers: ['', '', '1', '1', '2', ''], rootString: 4, bassNote: 'G', description: 'McCoy Tyner style' },
  'Cmaj7 (Drop 2&4)': { tier: 'Advanced', subCategory: 'Drop-2&4', frets: ['8', 'X', '5', '4', '5', 'X'], fingers: ['4', '', '2', '1', '3', ''], rootString: 6, bassNote: 'C', description: 'Eric Johnson wide spread' },

  // 6ths Double Stops & Augmented
  'G 6ths (Root)': { tier: 'Basic', subCategory: 'Double Stop', frets: ['X', 'X', '5', 'X', '3', 'X'], fingers: ['', '', '3', '', '1', ''], rootString: 3, bassNote: 'G', description: 'Country/R&B staple' },
  'G 6ths (1st Inv)': { tier: 'Basic', subCategory: 'Double Stop', frets: ['X', 'X', '9', 'X', '8', 'X'], fingers: ['', '', '3', '', '2', ''], rootString: 3, bassNote: 'B' },
  'Gaug (Mid)': { tier: 'Advanced', subCategory: 'Triads', frets: ['X', 'X', '5', '4', '4', 'X'], fingers: ['', '', '3', '1', '2', ''], rootString: 4, bassNote: 'G', description: 'Gospel passing chord (G to C)' },
  'C Min (Deep Root)': { tier: 'Basic', subCategory: 'Triads', frets: ['8', '6', '5', 'X', 'X', 'X'], fingers: ['4', '2', '1', '', '', ''], rootString: 6, bassNote: 'C' },
  
  // Hendrix Box
  'Am (Hendrix Box)': { tier: 'Advanced', subCategory: 'Embellishment', frets: ['5', 'X', '5', '5', '5', '5'], fingers: ['T', '', '1', '1', '1', '1'], rootString: 6, bassNote: 'A', description: 'Thumb root allows pinky embellishments' },

  // --- FUNDAMENTAL OPEN CHORDS ---
  'Am (Open)': { tier: 'Basic', subCategory: 'Standard', frets: ['X', '0', '2', '2', '1', '0'], fingers: ['', '', '2', '3', '1', ''], rootString: 5, bassNote: 'A' },
  'Dm (Open)': { tier: 'Basic', subCategory: 'Standard', frets: ['X', 'X', '0', '2', '3', '1'], fingers: ['', '', '', '2', '3', '1'], rootString: 4, bassNote: 'D' },
  'Em (Open)': { tier: 'Basic', subCategory: 'Standard', frets: ['0', '2', '2', '0', '0', '0'], fingers: ['', '1', '2', '', '', ''], rootString: 6, bassNote: 'E' },
  'A7 (Open)': { tier: 'Basic', subCategory: 'Dominant', frets: ['X', '0', '2', '0', '2', '0'], fingers: ['', '', '1', '', '2', ''], rootString: 5, bassNote: 'A', description: 'Essential blues/folk dominant' },
  'C7 (Open)': { tier: 'Basic', subCategory: 'Dominant', frets: ['X', '3', '2', '3', '1', '0'], fingers: ['', '3', '2', '4', '1', ''], rootString: 5, bassNote: 'C', description: 'Essential blues/folk dominant' },
  'D7 (Open)': { tier: 'Basic', subCategory: 'Dominant', frets: ['X', 'X', '0', '2', '1', '2'], fingers: ['', '', '', '2', '1', '3'], rootString: 4, bassNote: 'D', description: 'Essential blues/folk dominant' },
  'E7 (Open)': { tier: 'Basic', subCategory: 'Dominant', frets: ['0', '2', '0', '1', '0', '0'], fingers: ['', '2', '', '1', '', ''], rootString: 6, bassNote: 'E', description: 'Essential blues/folk dominant' },
  'G7 (Open)': { tier: 'Basic', subCategory: 'Dominant', frets: ['3', '2', '0', '0', '0', '1'], fingers: ['3', '2', '', '', '', '1'], rootString: 6, bassNote: 'G', description: 'Essential blues/folk dominant' },
  'Amaj7 (Open)': { tier: 'Advanced', subCategory: 'Extensions', frets: ['X', '0', '2', '1', '2', '0'], fingers: ['', '', '2', '1', '3', ''], rootString: 5, bassNote: 'A' },
  'Dmaj7 (Open)': { tier: 'Advanced', subCategory: 'Extensions', frets: ['X', 'X', '0', '2', '2', '2'], fingers: ['', '', '', '1', '1', '1'], rootString: 4, bassNote: 'D' }

};

export const CHORD_LIBRARY: Record<string, Chord> = Object.fromEntries(
  Object.entries(RAW_CHORDS).map(([name, data]) => [name, { ...data, name }])
);
