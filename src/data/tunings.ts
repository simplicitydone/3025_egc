import type { KeyGroup } from '../types/chord';
import { CHORD_LIBRARY } from './chords';

export const TUNING_KEYS: KeyGroup[] = [
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
