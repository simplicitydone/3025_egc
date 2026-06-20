import type { ElectricGroup } from '../types/chord';
import { CHORD_LIBRARY } from './chords';

export const ELECTRIC_CHORDS: ElectricGroup[] = [
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
