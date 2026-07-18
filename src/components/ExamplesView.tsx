import type { Move } from '../types/chord'
import { useLang } from '../lib/lang'
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
  const { lang } = useLang()
  return (
    <>
      <h3 className={`move-section__heading ${VARIANT_CLASS[variant]}`}>{title}</h3>
      <div className="techniques-grid">
        {moves.map((move, i) => (
          <div key={`${idPrefix}-${move.title}`} className="technique-card">
            <h3 className={`technique-card__title ${VARIANT_CLASS[variant]}`}>
              {lang === 'kr' && move.titleKr ? move.titleKr : move.title}
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
              <strong>{lang === 'kr' ? '맥락:' : 'Context:'}</strong>{' '}
              {lang === 'kr' && move.descriptionKr ? move.descriptionKr : move.description}
            </p>
            <p>
              <strong>{lang === 'kr' ? '동작:' : 'Action:'}</strong>{' '}
              {lang === 'kr' && move.howToKr ? move.howToKr : move.howTo}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

interface ExamplesViewProps {
  progressions: Move[]
  licks: Move[]
  techniques: Move[]
}

export function ExamplesView({ progressions, licks, techniques }: ExamplesViewProps) {
  const { lang } = useLang()
  return (
    <div className="techniques-view">
      <h2>
        {lang === 'kr' ? '예제 (진행 · 릭 · 테크닉)' : 'Examples (Progressions, Licks & Techniques)'}
      </h2>
      <MoveSection
        title={lang === 'kr' ? '시그니처 코드 진행' : 'Signature Progressions'}
        moves={progressions}
        variant="progression"
        idPrefix="prog"
      />
      <MoveSection
        title={lang === 'kr' ? '스케일 릭 & CAGED 무브먼트' : 'Scale Licks & CAGED Movements'}
        moves={licks}
        variant="lick"
        idPrefix="lick"
      />
      <MoveSection
        title={lang === 'kr' ? '실전 연주 테크닉' : 'Practical Playable Techniques'}
        moves={techniques}
        variant="technique"
        idPrefix="tech"
      />
    </div>
  )
}
