import type { Chord } from '../types/chord'

const STRINGS = [6, 5, 4, 3, 2, 1] as const

export function ChordDiagram({ chord }: { chord: Chord }) {
  const activeFrets = chord.frets
    .map((f) => parseInt(f, 10))
    .filter((f) => !Number.isNaN(f) && f > 0)
  const minFret = activeFrets.length > 0 ? Math.min(...activeFrets) : 1
  const startFret = minFret > 2 ? minFret - 1 : 1

  return (
    <div className="chord-diagram">
      <div className="chord-header">
        <h3>{chord.name}</h3>
        <p>Root: {chord.bassNote}</p>
      </div>
      <div className="fretboard fretboard--compact">
        <div className="nut-row">
          {STRINGS.map((str, i) => (
            <div
              key={str}
              className={`nut-cell ${chord.rootString === str ? 'is-root' : ''}`}
            >
              {chord.frets[i] === 'X' ? '✕' : chord.frets[i] === '0' ? '○' : ''}
            </div>
          ))}
        </div>
        {startFret > 1 && (
          <div className="fret-marker-label fret-marker-label--compact">
            {startFret}fr
          </div>
        )}
        <div className={`frets-grid ${startFret === 1 ? 'has-nut' : 'no-nut'}`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="fret-row fret-row--compact">
              {STRINGS.map((str, si) => (
                <div key={str} className="fret-cell">
                  <div className="string-line" />
                  {chord.frets[si] === (startFret + i).toString() && (
                    <div
                      className={`finger-dot ${chord.rootString === str ? 'root-dot' : ''}`}
                    >
                      {chord.fingers[si]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
