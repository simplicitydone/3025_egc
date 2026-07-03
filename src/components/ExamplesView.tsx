import { LICKS, SIGNATURE_MOVES, TECHNIQUES } from '../data/examples'
import type { Move } from '../types/chord'
import { ChordDiagram } from './ChordDiagram'

interface MoveSectionProps {
  title: string
  moves: Move[]
  variant: 'progression' | 'lick' | 'technique'
  idPrefix: string
}

const VARIANT_CLASS: Record<MoveSectionProps['variant'], string> = {
  progression: 'move-section--progression',
  lick: 'move-section--lick',
  technique: 'move-section--technique',
}

export function MoveSection({ title, moves, variant, idPrefix }: MoveSectionProps) {
  return (
    <>
      <h3 className={`move-section__heading ${VARIANT_CLASS[variant]}`}>{title}</h3>
      <div className="techniques-grid">
        {moves.map((move, i) => (
          <div key={`${idPrefix}-${move.title}`} className="technique-card">
            <h3 className={`technique-card__title ${VARIANT_CLASS[variant]}`}>
              {move.title}
            </h3>
            <div className={`example-box example-box--${variant}`}>
              <span className={`chord-sequence chord-sequence--${variant}`}>
                {move.example}
              </span>
              <div className="sequence-visualizer">
                {move.sequence.map((chord, idx) => (
                  <ChordDiagram key={`${idPrefix}-c-${i}-${idx}`} chord={chord} />
                ))}
              </div>
            </div>
            <p>
              <strong>Context:</strong> {move.description}
            </p>
            <p>
              <strong>Action:</strong> {move.howTo}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export function ExamplesView() {
  return (
    <div className="techniques-view">
      <h2>Masterclass Examples (Progressions, Licks & Techniques)</h2>
      <MoveSection
        title="Signature Progressions"
        moves={SIGNATURE_MOVES}
        variant="progression"
        idPrefix="prog"
      />
      <MoveSection
        title="Scale Licks & CAGED Movements"
        moves={LICKS}
        variant="lick"
        idPrefix="lick"
      />
      <MoveSection
        title="Practical Playable Techniques"
        moves={TECHNIQUES}
        variant="technique"
        idPrefix="tech"
      />
    </div>
  )
}