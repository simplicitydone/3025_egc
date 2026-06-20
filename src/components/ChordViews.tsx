import type { Chord, KeyChord } from '../types/chord'
import { ChordDiagram } from './ChordDiagram'

function ChordDisplay({ chord }: { chord: Chord }) {
  return (
    <div className="chord-display">
      <ChordDiagram chord={chord} />
      {chord.description && <p className="chord-desc">{chord.description}</p>}
      {chord.subCategory && (
        <span className="badge chord-subcategory">{chord.subCategory}</span>
      )}
    </div>
  )
}

interface KeyChordViewProps {
  title: string
  subtitle?: string
  chords: KeyChord[]
  selected: KeyChord
  onSelect: (chord: KeyChord) => void
  showTiers?: boolean
}

export function KeyChordView({
  title,
  subtitle,
  chords,
  selected,
  onSelect,
  showTiers = false,
}: KeyChordViewProps) {
  const basicChords = showTiers ? chords.filter((c) => c.chord.tier === 'Basic') : chords
  const advancedChords = showTiers
    ? chords.filter((c) => c.chord.tier === 'Advanced')
    : []

  return (
    <div className="chords-section">
      <div className="chord-selector">
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}

        {showTiers && basicChords.length > 0 && (
          <div className="chord-category">
            <h3 className="chord-category__title chord-category__title--basic">
              BASICS (MOST USED)
            </h3>
            <div className="chord-buttons">
              {basicChords.map((kc) => (
                <button
                  key={kc.chord.name}
                  type="button"
                  className={`chord-btn ${selected.chord.name === kc.chord.name ? 'active' : ''}`}
                  onClick={() => onSelect(kc)}
                >
                  <span className="nashville-badge">{kc.nashville}</span> {kc.chord.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {showTiers && advancedChords.length > 0 && (
          <div className="chord-category chord-category--advanced">
            <h3 className="chord-category__title chord-category__title--advanced">
              ADVANCED (HIGH / ALTERED / EXTENDED)
            </h3>
            <div className="chord-buttons">
              {advancedChords.map((kc) => (
                <button
                  key={kc.chord.name}
                  type="button"
                  className={`chord-btn alternative ${selected.chord.name === kc.chord.name ? 'active' : ''}`}
                  onClick={() => onSelect(kc)}
                >
                  <span className="nashville-badge">{kc.nashville}</span> {kc.chord.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {!showTiers && (
          <div className="chord-category">
            <div className="chord-buttons">
              {chords.map((kc) => (
                <button
                  key={kc.chord.name}
                  type="button"
                  className={`chord-btn ${selected.chord.name === kc.chord.name ? 'active' : ''}`}
                  onClick={() => onSelect(kc)}
                >
                  <span className="nashville-badge">{kc.nashville}</span> {kc.chord.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <ChordDisplay chord={selected.chord} />
    </div>
  )
}

interface ChordGroupViewProps {
  title: string
  description: string
  chords: Chord[]
  selected: Chord
  onSelect: (chord: Chord) => void
}

export function ChordGroupView({
  title,
  description,
  chords,
  selected,
  onSelect,
}: ChordGroupViewProps) {
  return (
    <div className="chords-section">
      <div className="chord-selector">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="chord-buttons">
          {chords.map((c) => (
            <button
              key={c.name}
              type="button"
              className={`chord-btn ${selected.name === c.name ? 'active' : ''}`}
              onClick={() => onSelect(c)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
      <ChordDisplay chord={selected} />
    </div>
  )
}
