import { describe, expect, it } from 'vitest'
import { midiNoteName } from '../lib/audio'
import { decodeUrlState, encodeUrlState } from '../lib/urlState'

describe('url state codec', () => {
  it('round-trips tab + group + chord, including awkward chord names', () => {
    const cases = [
      { tab: 'open' as const, group: 2, chord: 'E Major' },
      { tab: 'tension' as const, group: 4, chord: 'Cmaj7/E (Form 5)' },
      { tab: 'barre' as const, group: 0, chord: 'E7#9' },
      { tab: 'tunings' as const, group: 1, chord: 'F#m (Open D)' },
      { tab: 'examples' as const },
    ]
    for (const state of cases) {
      expect(decodeUrlState(encodeUrlState(state))).toEqual(state)
    }
  })

  it('rejects unknown tabs and tolerates malformed params', () => {
    expect(decodeUrlState('')).toBeNull()
    expect(decodeUrlState('#')).toBeNull()
    expect(decodeUrlState('#nonsense')).toBeNull()
    expect(decodeUrlState('#open?g=notanumber')).toEqual({ tab: 'open' })
    expect(decodeUrlState('#open?g=3')).toEqual({ tab: 'open', group: 3 })
  })
})

describe('midiNoteName', () => {
  it('names standard-tuning open strings', () => {
    expect([40, 45, 50, 55, 59, 64].map(midiNoteName)).toEqual(['E', 'A', 'D', 'G', 'B', 'E'])
  })

  it('handles accidentals', () => {
    expect(midiNoteName(61)).toBe('C#')
    expect(midiNoteName(46)).toBe('A#')
  })
})
