import type { BarreGroup } from '../types/chord';
import { CHORD_LIBRARY } from './chords';

export const BARRE_CHORDS: BarreGroup[] = [
  { groupName: 'Drop-2 Matrix (Low 4 Strings)', usageLabel: 'Rhythm Bed', description: 'Muddy but necessary for completing the cycle. Strings E-A-D-G.', chords: [CHORD_LIBRARY['Cmaj7 (D2 Low Root)'], CHORD_LIBRARY['Cmaj7 (D2 Low 1st)'], CHORD_LIBRARY['Cmaj7 (D2 Low 2nd)'], CHORD_LIBRARY['Cmaj7 (D2 Low 3rd)']] },
  { groupName: 'Drop-2 Matrix (Mid 4 Strings)', usageLabel: 'Essential R&B', description: 'The absolute workhorse for comping. Strings A-D-G-B.', chords: [CHORD_LIBRARY['Cmaj7 (D2 Mid Root)'], CHORD_LIBRARY['Cmaj7 (D2 Mid 1st)'], CHORD_LIBRARY['Cmaj7 (D2 Mid 2nd)'], CHORD_LIBRARY['Cmaj7 (D2 Mid 3rd)']] },
  { groupName: 'Drop-2 Matrix (Top 4 Strings)', usageLabel: 'Modern Soul', description: 'High register. Cuts through the mix. Strings D-G-B-e.', chords: [CHORD_LIBRARY['Cmaj7 (D2 Top Root)'], CHORD_LIBRARY['Cmaj7 (D2 Top 1st)'], CHORD_LIBRARY['Cmaj7 (D2 Top 2nd)'], CHORD_LIBRARY['Cmaj7 (D2 Top 3rd)']] },
  { groupName: 'Minor Drop-2 (Mid 4 Strings)', usageLabel: 'Jazz Comping', description: 'The essential minor 7th inversions.', chords: [CHORD_LIBRARY['Cm7 (D2 Mid Root)'], CHORD_LIBRARY['Cm7 (D2 Mid 1st)'], CHORD_LIBRARY['Cm7 (D2 Mid 2nd)'], CHORD_LIBRARY['Cm7 (D2 Mid 3rd)']] },
  { groupName: 'Drop-3 Matrix', usageLabel: 'Real Jazz Mastery', description: 'Thick traditional jazz sound. Root on 6th string.', chords: [CHORD_LIBRARY['Gmaj7 (D3 Root)'], CHORD_LIBRARY['Gmaj7 (D3 1st)'], CHORD_LIBRARY['Gmaj7 (D3 2nd)'], CHORD_LIBRARY['Gmaj7 (D3 3rd)']] },
  { groupName: 'Minor Drop-3 Matrix', usageLabel: 'Thick Minor Comping', description: 'Thick minor 7th inversions.', chords: [CHORD_LIBRARY['Gm7 (D3 Root)'], CHORD_LIBRARY['Gm7 (D3 1st)'], CHORD_LIBRARY['Gm7 (D3 2nd)'], CHORD_LIBRARY['Gm7 (D3 3rd)']] },
  { groupName: 'Rootless Upper Structures', usageLabel: 'Neo-Soul Secret', description: 'Play triads over a bass note to form lush extensions.', chords: [CHORD_LIBRARY['Gmaj7 (Play Bm)'], CHORD_LIBRARY['Cmaj9 (Play Em7)'], CHORD_LIBRARY['A13 (Play Gmaj7)']] },
  { groupName: 'Altered Dominant Family', usageLabel: 'Tension', description: 'Must-know chords for resolving to minor keys.', chords: [CHORD_LIBRARY['E7#9'], CHORD_LIBRARY['E7b9'], CHORD_LIBRARY['E7#5#9'], CHORD_LIBRARY['B m7b5']] }
];
