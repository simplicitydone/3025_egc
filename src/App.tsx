import { useState } from 'react';
import './App.css';

interface Chord {
  name: string;
  frets: string[]; 
  fingers: string[]; 
  rootString: number; 
  bassNote: string;
  description?: string;
  tier: 'Basic' | 'Advanced';
  subCategory?: string; // 'Standard', 'High Drone', 'Extensions', 'Altered', 'Drop-2', 'Spread Triad'
}

interface KeyChord {
  chord: Chord;
  nashville: string;
}

interface KeyGroup {
  keyName: string;
  isPriority?: boolean;
  chords: KeyChord[];
}

interface BarreGroup {
  groupName: string;
  usageLabel: string;
  description: string;
  chords: Chord[];
}

interface ElectricGroup {
  groupName: string;
  description: string;
  chords: Chord[];
}

interface Move {
  title: string;
  category: string;
  example: string;
  sequence: Chord[];
  description: string;
  howTo: string;
}

// === THE 100% EXHAUSTIVE MASTER DATABASE ===
const RAW_CHORDS: Record<string, Omit<Chord, 'name'>> = {
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
  '3rds Double Stop': { tier: 'Basic', subCategory: 'Double Stop', frets: ['X','X','5','4','X','X'], fingers: ['','','2','1',''], rootString: 4, bassNote: 'G' },
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

const CHORD_LIBRARY: Record<string, Chord> = Object.fromEntries(
  Object.entries(RAW_CHORDS).map(([name, data]) => [name, { ...data, name }])
);

// === DATA STRUCTURES FOR UI MAPPING ===
const SONG_KEYS: KeyGroup[] = [
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

const TUNING_KEYS: KeyGroup[] = [
  { keyName: 'DADGAD', chords: [
    { chord: CHORD_LIBRARY['D (DADGAD)'], nashville: 'I' }, { chord: CHORD_LIBRARY['Em (DADGAD)'], nashville: 'ii' }, { chord: CHORD_LIBRARY['F#m (DADGAD)'], nashville: 'iii' }, { chord: CHORD_LIBRARY['G (DADGAD)'], nashville: 'IV' }, { chord: CHORD_LIBRARY['A (DADGAD)'], nashville: 'V' }, { chord: CHORD_LIBRARY['Bm (DADGAD)'], nashville: 'vi' }
  ]},
  { keyName: 'Open D', chords: [
    { chord: CHORD_LIBRARY['D (Open D)'], nashville: 'I' }, { chord: CHORD_LIBRARY['Em (Open D)'], nashville: 'ii' }, { chord: CHORD_LIBRARY['F#m (Open D)'], nashville: 'iii' }, { chord: CHORD_LIBRARY['G (Open D)'], nashville: 'IV' }, { chord: CHORD_LIBRARY['A (Open D)'], nashville: 'V' }, { chord: CHORD_LIBRARY['Bm (Open D)'], nashville: 'vi' }
  ]},
  { keyName: 'Open G', chords: [
    { chord: CHORD_LIBRARY['G (Open G)'], nashville: 'I' }, { chord: CHORD_LIBRARY['C (Open G)'], nashville: 'IV' }, { chord: CHORD_LIBRARY['D (Open G)'], nashville: 'V' }
  ]},
  { keyName: 'Open C', chords: [
    { chord: CHORD_LIBRARY['C (Open C)'], nashville: 'I' }, { chord: CHORD_LIBRARY['F (Open C)'], nashville: 'IV' }, { chord: CHORD_LIBRARY['G (Open C)'], nashville: 'V' }
  ]}
];

const BARRE_CHORDS: BarreGroup[] = [
  { groupName: 'Drop-2 Matrix (Low 4 Strings)', usageLabel: 'Rhythm Bed', description: 'Muddy but necessary for completing the cycle. Strings E-A-D-G.', chords: [CHORD_LIBRARY['Cmaj7 (D2 Low Root)'], CHORD_LIBRARY['Cmaj7 (D2 Low 1st)'], CHORD_LIBRARY['Cmaj7 (D2 Low 2nd)'], CHORD_LIBRARY['Cmaj7 (D2 Low 3rd)']] },
  { groupName: 'Drop-2 Matrix (Mid 4 Strings)', usageLabel: 'Essential R&B', description: 'The absolute workhorse for comping. Strings A-D-G-B.', chords: [CHORD_LIBRARY['Cmaj7 (D2 Mid Root)'], CHORD_LIBRARY['Cmaj7 (D2 Mid 1st)'], CHORD_LIBRARY['Cmaj7 (D2 Mid 2nd)'], CHORD_LIBRARY['Cmaj7 (D2 Mid 3rd)']] },
  { groupName: 'Drop-2 Matrix (Top 4 Strings)', usageLabel: 'Modern Soul', description: 'High register. Cuts through the mix. Strings D-G-B-e.', chords: [CHORD_LIBRARY['Cmaj7 (D2 Top Root)'], CHORD_LIBRARY['Cmaj7 (D2 Top 1st)'], CHORD_LIBRARY['Cmaj7 (D2 Top 2nd)'], CHORD_LIBRARY['Cmaj7 (D2 Top 3rd)']] },
  { groupName: 'Minor Drop-2 (Mid 4 Strings)', usageLabel: 'Jazz Comping', description: 'The essential minor 7th inversions.', chords: [CHORD_LIBRARY['Cm7 (D2 Mid Root)'], CHORD_LIBRARY['Cm7 (D2 Mid 1st)'], CHORD_LIBRARY['Cm7 (D2 Mid 2nd)'], CHORD_LIBRARY['Cm7 (D2 Mid 3rd)']] },
  { groupName: 'Drop-3 Matrix', usageLabel: 'Real Jazz Mastery', description: 'Thick traditional jazz sound. Root on 6th string.', chords: [CHORD_LIBRARY['Gmaj7 (D3 Root)'], CHORD_LIBRARY['Gmaj7 (D3 1st)'], CHORD_LIBRARY['Gmaj7 (D3 2nd)'], CHORD_LIBRARY['Gmaj7 (D3 3rd)']] },
  { groupName: 'Minor Drop-3 Matrix', usageLabel: 'Thick Minor Comping', description: 'Thick minor 7th inversions.', chords: [CHORD_LIBRARY['Gm7 (D3 Root)'], CHORD_LIBRARY['Gm7 (D3 1st)'], CHORD_LIBRARY['Gm7 (D3 2nd)'], CHORD_LIBRARY['Gm7 (D3 3rd)']] },
  { groupName: 'Rootless Upper Structures', usageLabel: 'Neo-Soul Secret', description: 'Play triads over a bass note to form lush extensions.', chords: [CHORD_LIBRARY['Gmaj7 (Play Bm)'], CHORD_LIBRARY['Cmaj9 (Play Em7)'], CHORD_LIBRARY['A13 (Play Gmaj7)']] },
  { groupName: 'Altered Dominant Family', usageLabel: 'Tension', description: 'Must-know chords for resolving to minor keys.', chords: [CHORD_LIBRARY['E7#9'], CHORD_LIBRARY['E7b9'], CHORD_LIBRARY['E7#5#9'], CHORD_LIBRARY['B m7b5']] }
];

const ELECTRIC_CHORDS: ElectricGroup[] = [
  { groupName: 'Spread Triads', description: 'Eric Johnson / Frusciante style. Spanning across skipped strings.', chords: [CHORD_LIBRARY['G Spread (Root)'], CHORD_LIBRARY['G Spread (1st Inv)'], CHORD_LIBRARY['G Spread (2nd Inv)']] },
  { groupName: 'Top Triads (Maj & Min)', description: 'G-B-e strings. Essential for R&B accompaniment.', chords: [CHORD_LIBRARY['G Maj (Top Root)'], CHORD_LIBRARY['G Maj (Top 1st)'], CHORD_LIBRARY['G Maj (Top 2nd)'], CHORD_LIBRARY['G Min (Top Root)'], CHORD_LIBRARY['G Min (Top 1st)'], CHORD_LIBRARY['G Min (Top 2nd)']] },
  { groupName: 'Middle Triads (Maj & Min)', description: 'D-G-B strings. Warmer rhythmic bed.', chords: [CHORD_LIBRARY['C Maj (Mid Root)'], CHORD_LIBRARY['C Maj (Mid 1st)'], CHORD_LIBRARY['C Maj (Mid 2nd)'], CHORD_LIBRARY['C Min (Mid Root)'], CHORD_LIBRARY['C Min (Mid 1st)'], CHORD_LIBRARY['C Min (Mid 2nd)']] },
  { groupName: 'Low Triads (E-A-D)', description: 'The absolute lowest rhythmic foundation. Replaces the bass player.', chords: [CHORD_LIBRARY['C Maj (Deep Root)'], CHORD_LIBRARY['C Maj (Deep 1st)'], CHORD_LIBRARY['C Maj (Deep 2nd)']] },
  { groupName: 'Diminished Triads', description: 'Gospel and Neo-Soul passing chords.', chords: [CHORD_LIBRARY['B Dim (Mid Root)'], CHORD_LIBRARY['B Dim (Mid 1st)'], CHORD_LIBRARY['B Dim (Mid 2nd)']] },
  { groupName: 'Funk Shells (3rd & 7th)', description: 'Rootless 2-note voicings for Cory Wong style funk comping.', chords: [CHORD_LIBRARY['Dm7 (Funk Shell)'], CHORD_LIBRARY['G7 (Funk Shell)'], CHORD_LIBRARY['Cmaj7 (Funk Shell)']] },
  { groupName: 'Wide Arena Power Chords', description: 'Massive 5ths that span multiple skipped strings.', chords: [CHORD_LIBRARY['G5 (Wide Arena)'], CHORD_LIBRARY['C5 (Wide Arena)']] },
  { groupName: 'Ambient Clusters', description: 'Dense stacked 2nds for volume swells and heavy reverb pads.', chords: [CHORD_LIBRARY['Cadd9 (Pad)'], CHORD_LIBRARY['Emaj9 (Cluster)'], CHORD_LIBRARY['D add9 (Cluster)']] },
  { groupName: 'Double Stops', description: 'Groove basics.', chords: [CHORD_LIBRARY['4ths Double Stop']] }
];

const SIGNATURE_MOVES: Move[] = [
  { title: 'The 1-5-6-4 Anthem (Pop/Rock)', category: 'Key of G', example: 'G Major → D/F# → Em7 → C add9', sequence: [CHORD_LIBRARY['G Major'], CHORD_LIBRARY['D/F#'], CHORD_LIBRARY['E Minor 7'], CHORD_LIBRARY['C add9']], description: 'The most common chord progression.', howTo: 'Anchor ring and pinky fingers.' },
  { title: 'The "Holy Slide" (I to IV)', category: 'Worship', example: 'E5 (Holy) → A2 (High)', sequence: [CHORD_LIBRARY['E5 (High Drone)'], CHORD_LIBRARY['A2 (High Drone)']], description: 'Cinematic atmospheric transition.', howTo: 'Slide from 7th fret to open.' },
  { title: 'The Borrowed "Minor 4"', category: 'Modal Interchange', example: 'C Major → F Maj 7 → F Minor → C Major', sequence: [CHORD_LIBRARY['C Major'], CHORD_LIBRARY['F Maj 7'], CHORD_LIBRARY['F Minor (Borrowed)'], CHORD_LIBRARY['C Major']], description: 'Emotional nostalgic pull.', howTo: 'Barre the 1st fret for Fm.' },
  { title: 'The Line Cliche', category: 'Chromatic', example: 'Am → Am(maj7) → Am7 → Am6', sequence: [CHORD_LIBRARY['A Minor 7'], CHORD_LIBRARY['Am(maj7)'], CHORD_LIBRARY['Am7 (C Key)'], CHORD_LIBRARY['Am6']], description: 'Descending inner line.', howTo: 'Walk the A down half-steps.' },
  { title: 'ii-V-I Minor Turnaround', category: 'Jazz / R&B', example: 'Bm7b5 → E7b9 → Am11', sequence: [CHORD_LIBRARY['B m7b5'], CHORD_LIBRARY['E7b9'], CHORD_LIBRARY['A Minor 7']], description: 'The classic minor resolution.', howTo: 'Focus on the altered notes pulling to the minor root.' },
  { title: 'Pedal Point Rhythm', category: 'Electric', example: 'C/G → F/G → C/G', sequence: [CHORD_LIBRARY['C/G'], CHORD_LIBRARY['F/G'], CHORD_LIBRARY['C/G']], description: 'Keeping a static bass note.', howTo: 'Hold the G bass note while shifting triads.' },
  { title: 'The Gospel Walk-Up', category: 'Soul / Gospel', example: 'C → Dm7 → C/E → Fmaj7', sequence: [CHORD_LIBRARY['C Major'], CHORD_LIBRARY['D Minor 7'], CHORD_LIBRARY['C/E'], CHORD_LIBRARY['F Maj 7']], description: 'Classic 1-2-3-4 bass climb.', howTo: 'Keep the progression moving smoothly by anticipating the bass notes.' },
  { title: 'Neo-Soul Turnaround', category: 'R&B', example: 'Cmaj9 → Bm7b5 → E7#9 → Am11', sequence: [CHORD_LIBRARY['Cmaj9 (Play Em7)'], CHORD_LIBRARY['Bm7b5 (D2 Mid Root)'], CHORD_LIBRARY['E7#9'], CHORD_LIBRARY['Am11 (High Drone - C Key)']], description: 'Thick, rootless extensions resolving to minor.', howTo: 'Use the rootless Cmaj9 to stay out of the way, then create heavy tension with E7#9.' }
];

const LICKS: Move[] = [
  { title: 'Pentatonic Fall', category: 'E Minor', example: 'e|--3p0-- B|--3p0--', sequence: [CHORD_LIBRARY['E Minor 7']], description: 'Classic rock descending run.', howTo: 'Pull-off from 3rd to open.' },
  { title: 'Triad Climb', category: 'CAGED', example: 'Open C → A-Shape → E-Shape', sequence: [CHORD_LIBRARY['C Major'], CHORD_LIBRARY['C Maj (Mid Root)'], CHORD_LIBRARY['Cmaj7 (D2 Top Root)']], description: 'CAGED triad movement.', howTo: 'Move up string sets.' },
  { title: 'Chord Tone Targeting', category: 'Voice Leading', example: 'Dm7 → G7 (target the B)', sequence: [CHORD_LIBRARY['D Minor 7'], CHORD_LIBRARY['G13']], description: 'Landing on the 3rd of the next chord.', howTo: 'Play a D minor line, ending exactly on the B note when G hits.' },
  { title: 'Acoustic Blues Turnaround', category: 'Blues', example: 'E7 → Edim7 → E7', sequence: [CHORD_LIBRARY['E7 (Acoustic Blues)'], CHORD_LIBRARY['Edim7 (Slide)'], CHORD_LIBRARY['E7 (Acoustic Blues)']], description: 'Swampy delta blues filler.', howTo: 'Slide the diminished shape up and back down.' },
  { title: 'Country 6ths Glide', category: 'Country / R&B', example: 'G 6ths Root → 1st Inv', sequence: [CHORD_LIBRARY['G 6ths (Root)'], CHORD_LIBRARY['G 6ths (1st Inv)']], description: 'Classic Steve Cropper / Nashville slide.', howTo: 'Pluck the G and high-E strings together, sliding between inversions.' }
];

const TECHNIQUES: Move[] = [
  { title: 'Hybrid Picking', category: 'Right Hand', example: 'Pluck Root (Pick) → Snap Top (Fingers)', sequence: [CHORD_LIBRARY['G Maj (Top Root)'], CHORD_LIBRARY['G Maj (Top 1st)']], description: 'The absolute foundation of modern electric accompaniment.', howTo: 'Hold the pick with thumb/index. Pluck the G string with the pick, and simultaneously snap the B and e strings with your middle and ring fingers.' },
  { title: 'Volume Swells', category: 'Ambient', example: 'Vol 0 → Strike Chord → Vol 10', sequence: [CHORD_LIBRARY['D add9 (Cluster)']], description: 'Creates a synth-pad like wash of sound.', howTo: 'Wrap your pinky around the volume knob. Strike the cluster with the volume at zero, then slowly roll the pinky up.' },
  { title: 'Dynamic Palm Muting', category: 'Rhythm', example: 'Muted 8ths → Open Accents', sequence: [CHORD_LIBRARY['E5 (High Drone)']], description: 'Controlling the energy of a building section.', howTo: 'Rest the fleshy side of your picking hand lightly against the bridge saddles. Lift off slightly on the downbeats.' },
  { title: 'Systematic Arpeggiation', category: 'Texture', example: 'Rake Down → Move Shape → Rake Up', sequence: [CHORD_LIBRARY['Cmaj7 (D2 Top Root)'], CHORD_LIBRARY['Cmaj7 (D2 Top 1st)']], description: 'Turning static chords into flowing textures.', howTo: 'Do not strum. Let the pick fall through each string individually, maintaining a steady 16th-note subdivision.' },
  { title: 'Neo-Soul Double Stop Slide', category: 'R&B / Soul', example: 'Slide into the 3rd/5th', sequence: [CHORD_LIBRARY['3rds Double Stop'], CHORD_LIBRARY['4ths Double Stop']], description: 'The classic slippery R&B filler.', howTo: 'Barre the double stop one fret below the target, pick once, and instantly slide up into pitch.' },
  { title: 'Travis Picking', category: 'Fingerstyle', example: 'Alternating Bass', sequence: [CHORD_LIBRARY['C Major'], CHORD_LIBRARY['G/B']], description: 'The foundation of folk acoustic.', howTo: 'Keep the thumb bouncing between the A and D strings while the fingers pick syncopated melody notes.' },
  { title: '16th Note Funk Struts', category: 'Rhythm', example: 'Constant Motion', sequence: [CHORD_LIBRARY['Dm7 (Funk Shell)'], CHORD_LIBRARY['G7 (Funk Shell)']], description: 'Cory Wong style pocket playing.', howTo: 'Right hand never stops moving in 16ths. Use the fretting hand to choke the chord for percussive "chucks".' }
];

// === REACT COMPONENTS ===

function ChordDiagram({ chord }: { chord: Chord }) {
  if (!chord) return null;
  const strings = [6, 5, 4, 3, 2, 1];
  const activeFrets = chord.frets.map(f => parseInt(f)).filter(f => !isNaN(f) && f > 0);
  const minFret = activeFrets.length > 0 ? Math.min(...activeFrets) : 1;
  const startFret = minFret > 2 ? minFret - 1 : 1;
  return (
    <div className="chord-diagram">
      <div className="chord-header"><h3>{chord.name}</h3><p>Root: {chord.bassNote}</p></div>
      <div className="fretboard" style={{width: '90px'}}>
        <div className="nut-row">{strings.map((str, i) => (<div key={i} className={`nut-cell ${chord.rootString === str ? 'is-root' : ''}`}>{chord.frets[i] === 'X' ? '✕' : (chord.frets[i] === '0' ? '○' : '')}</div>))}</div>
        {startFret > 1 && <div className="fret-marker-label" style={{fontSize: '0.7rem'}}>{startFret}fr</div>}
        <div className={`frets-grid ${startFret === 1 ? 'has-nut' : 'no-nut'}`}>{Array.from({ length: 6 }).map((_, i) => (<div key={i} className="fret-row" style={{height: '20px'}}>{strings.map((str, si) => (<div key={si} className="fret-cell"><div className="string-line"></div>{chord.frets[si] === (startFret + i).toString() && (<div className={`finger-dot ${chord.rootString === str ? 'root-dot' : ''}`}>{chord.fingers[si]}</div>)}</div>))}</div>))}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<'open'|'tunings'|'barre'|'electric'|'examples'>('open');

  const [selectedKeyIdx, setSelectedKeyIdx] = useState(0);
  const activeKey = SONG_KEYS[selectedKeyIdx];
  const [selectedOpenChord, setSelectedOpenChord] = useState<KeyChord>(activeKey.chords[0]);

  const [selectedTuningIdx, setSelectedTuningIdx] = useState(0);
  const activeTuning = TUNING_KEYS[selectedTuningIdx];
  const [selectedTuningChord, setSelectedTuningChord] = useState<KeyChord>(activeTuning.chords[0]);

  const [selectedBarreIdx, setSelectedBarreIdx] = useState(0);
  const activeBarre = BARRE_CHORDS[selectedBarreIdx];
  const [selectedBarreChord, setSelectedBarreChord] = useState<Chord>(activeBarre.chords[0]);

  const [selectedElecGroupIdx, setSelectedElecGroupIdx] = useState(0);
  const activeElecGroup = ELECTRIC_CHORDS[selectedElecGroupIdx];
  const [selectedElecChord, setSelectedElecChord] = useState<Chord>(activeElecGroup.chords[0]);

  const handleKeyChange = (i: number) => { setSelectedKeyIdx(i); setSelectedOpenChord(SONG_KEYS[i].chords[0]); };
  const handleTuningChange = (i: number) => { setSelectedTuningIdx(i); setSelectedTuningChord(TUNING_KEYS[i].chords[0]); };
  const handleBarreChange = (i: number) => { setSelectedBarreIdx(i); setSelectedBarreChord(BARRE_CHORDS[i].chords[0]); };
  const handleElecGroupChange = (i: number) => { setSelectedElecGroupIdx(i); setSelectedElecChord(ELECTRIC_CHORDS[i].chords[0]); };

  const basicChords = activeKey.chords.filter(c => c.chord.tier === 'Basic');
  const advancedChords = activeKey.chords.filter(c => c.chord.tier === 'Advanced');

  return (
    <div className="app-container">
      <header className="header">
        <h1>🎸 100% Masterclass Guitar Guide</h1>
        <div className="main-tabs">{['open','tunings','barre','electric','examples'].map(t => (<button key={t} className={`main-tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t as any)}>{t.toUpperCase()}</button>))}</div>
      </header>

      <main className="main-content">
        {tab === 'open' && (
          <div className="chords-view">
            <h2>Select Key (⭐ = Top 4 Priority)</h2>
            <div className="key-tabs">{SONG_KEYS.map((k, i) => (<button key={i} className={`key-tab-btn ${selectedKeyIdx === i ? 'active' : ''}`} onClick={() => handleKeyChange(i)}>{k.isPriority ? '⭐ ' : ''}{k.keyName}</button>))}</div>
            <div className="chords-section">
              <div className="chord-selector">
                <h3>{activeKey.keyName} Chords</h3>
                
                {basicChords.length > 0 && (
                  <div className="chord-category">
                    <h3 style={{color: 'var(--accent-color)', fontSize: '0.9rem'}}>BASICS (MOST USED)</h3>
                    <div className="chord-buttons">{basicChords.map((kc, i) => (<button key={i} className={`chord-btn ${selectedOpenChord.chord.name === kc.chord.name ? 'active' : ''}`} onClick={() => setSelectedOpenChord(kc)}><span className="nashville-badge">{kc.nashville}</span> {kc.chord.name}</button>))}</div>
                  </div>
                )}
                
                {advancedChords.length > 0 && (
                  <div className="chord-category" style={{marginTop: '1.5rem'}}>
                    <h3 style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>ADVANCED (HIGH / ALTERED / EXTENDED)</h3>
                    <div className="chord-buttons">{advancedChords.map((kc, i) => (<button key={i} className={`chord-btn alternative ${selectedOpenChord.chord.name === kc.chord.name ? 'active' : ''}`} onClick={() => setSelectedOpenChord(kc)}><span className="nashville-badge">{kc.nashville}</span> {kc.chord.name}</button>))}</div>
                  </div>
                )}

              </div>
              <div className="chord-display">
                <ChordDiagram chord={selectedOpenChord.chord} />
                <p className="chord-desc">{selectedOpenChord.chord.description}</p>
                {selectedOpenChord.chord.subCategory && <span className="badge" style={{background: 'var(--border-color)', color: '#ccc', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', marginTop: '1rem'}}>{selectedOpenChord.chord.subCategory}</span>}
              </div>
            </div>
          </div>
        )}

                {tab === 'tunings' && (
          <div className="chords-view">
            <h2>Alternate Tunings</h2>
            <div className="key-tabs">{TUNING_KEYS.map((k, i) => (<button key={i} className={`key-tab-btn ${selectedTuningIdx === i ? 'active' : ''}`} onClick={() => handleTuningChange(i)}>{k.keyName}</button>))}</div>
            <div className="chords-section">
              <div className="chord-selector">
                <h3>{activeTuning.keyName} Chords</h3>
                <div className="chord-category">
                  <div className="chord-buttons">{activeTuning.chords.map((kc, i) => (<button key={i} className={`chord-btn ${selectedTuningChord.chord.name === kc.chord.name ? 'active' : ''}`} onClick={() => setSelectedTuningChord(kc)}><span className="nashville-badge">{kc.nashville}</span> {kc.chord.name}</button>))}</div>
                </div>
              </div>
              <div className="chord-display">
                <ChordDiagram chord={selectedTuningChord.chord} />
                <p className="chord-desc">{selectedTuningChord.chord.description}</p>
                {selectedTuningChord.chord.subCategory && <span className="badge" style={{background: 'var(--border-color)', color: '#ccc', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', marginTop: '1rem'}}>{selectedTuningChord.chord.subCategory}</span>}
              </div>
            </div>
          </div>
        )}

        {tab === 'barre' && (
          <div className="chords-view">
            <h2>Drop Matrices & Upper Structures</h2>
            <div className="key-tabs">{BARRE_CHORDS.map((g, i) => (<button key={i} className={`key-tab-btn ${selectedBarreIdx === i ? 'active' : ''}`} onClick={() => handleBarreChange(i)}>{g.groupName.split('(')[0]}</button>))}</div>
            <div className="chords-section">
              <div className="chord-selector"><h3>{activeBarre.usageLabel}</h3><p>{activeBarre.description}</p><div className="chord-buttons">{activeBarre.chords.map((c, i) => (<button key={i} className={`chord-btn ${selectedBarreChord.name === c.name ? 'active' : ''}`} onClick={() => setSelectedBarreChord(c)}>{c.name}</button>))}</div></div>
              <div className="chord-display"><ChordDiagram chord={selectedBarreChord} /><p className="chord-desc">{selectedBarreChord.description}</p></div>
            </div>
          </div>
        )}

        {tab === 'electric' && (
          <div className="chords-view">
            <h2>Electric Triads & Clusters</h2>
            <div className="key-tabs">{ELECTRIC_CHORDS.map((g, i) => (<button key={i} className={`key-tab-btn ${selectedElecGroupIdx === i ? 'active' : ''}`} onClick={() => handleElecGroupChange(i)}>{g.groupName}</button>))}</div>
            <div className="chords-section">
              <div className="chord-selector"><h3>{activeElecGroup.groupName}</h3><p>{activeElecGroup.description}</p><div className="chord-buttons">{activeElecGroup.chords.map((c, i) => (<button key={i} className={`chord-btn ${selectedElecChord.name === c.name ? 'active' : ''}`} onClick={() => setSelectedElecChord(c)}>{c.name}</button>))}</div></div>
              <div className="chord-display"><ChordDiagram chord={selectedElecChord} /><p className="chord-desc">{selectedElecChord.description}</p></div>
            </div>
          </div>
        )}

                {tab === 'examples' && (
          <div className="techniques-view">
            <h2>Masterclass Examples (Progressions, Licks & Techniques)</h2>
            
            <h3 style={{marginTop: '2rem', color: 'var(--accent-color)', paddingBottom: '1rem', borderBottom: '1px solid #333'}}>Signature Progressions</h3>
            <div className="techniques-grid">
              {SIGNATURE_MOVES.map((move, i) => (
                <div key={'prog-'+i} className="technique-card">
                  <h3 style={{color: 'var(--text-color)'}}>{move.title}</h3>
                  <div className="example-box">
                    <span className="chord-sequence">{move.example}</span>
                    <div className="sequence-visualizer" style={{display: 'flex', gap: '1rem', marginTop: '1rem', overflowX: 'auto'}}>
                      {move.sequence.map((chord, idx) => (chord && <ChordDiagram key={'p-c-'+i+'-'+idx} chord={chord} />))}
                    </div>
                  </div>
                  <p><strong>Context:</strong> {move.description}</p>
                  <p><strong>Action:</strong> {move.howTo}</p>
                </div>
              ))}
            </div>

            <h3 style={{marginTop: '3rem', color: '#ffaa00', paddingBottom: '1rem', borderBottom: '1px solid #333'}}>Scale Licks & CAGED Movements</h3>
            <div className="techniques-grid">
              {LICKS.map((move, i) => (
                <div key={'lick-'+i} className="technique-card">
                  <h3 style={{color: '#ffaa00'}}>{move.title}</h3>
                  <div className="example-box" style={{backgroundColor: 'rgba(255, 170, 0, 0.05)', borderColor: 'rgba(255, 170, 0, 0.2)'}}>
                    <span className="chord-sequence" style={{color: '#ffaa00'}}>{move.example}</span>
                    <div className="sequence-visualizer" style={{display: 'flex', gap: '1rem', marginTop: '1rem', overflowX: 'auto'}}>
                      {move.sequence.map((chord, idx) => (chord && <ChordDiagram key={'l-c-'+i+'-'+idx} chord={chord} />))}
                    </div>
                  </div>
                  <p><strong>Context:</strong> {move.description}</p>
                  <p><strong>Action:</strong> {move.howTo}</p>
                </div>
              ))}
            </div>

            <h3 style={{marginTop: '3rem', color: '#00ddff', paddingBottom: '1rem', borderBottom: '1px solid #333'}}>Practical Playable Techniques</h3>
            <div className="techniques-grid">
              {TECHNIQUES.map((move, i) => (
                <div key={'tech-'+i} className="technique-card">
                  <h3 style={{color: '#00ddff'}}>{move.title}</h3>
                  <div className="example-box" style={{backgroundColor: 'rgba(0, 221, 255, 0.05)', borderColor: 'rgba(0, 221, 255, 0.2)'}}>
                    <span className="chord-sequence" style={{color: '#00ddff'}}>{move.example}</span>
                    <div className="sequence-visualizer" style={{display: 'flex', gap: '1rem', marginTop: '1rem', overflowX: 'auto'}}>
                      {move.sequence.map((chord, idx) => (chord && <ChordDiagram key={'t-c-'+i+'-'+idx} chord={chord} />))}
                    </div>
                  </div>
                  <p><strong>Context:</strong> {move.description}</p>
                  <p><strong>Action:</strong> {move.howTo}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}