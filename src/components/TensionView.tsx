import type { Chord, GlossaryItem, QuizItem, TensionForm } from '../types/chord'
import { ChordGroupView } from './ChordViews'

interface TensionViewProps {
  forms: TensionForm[]
  quiz: QuizItem[]
  glossary: GlossaryItem[]
  selectedFormIdx: number
  onFormChange: (i: number) => void
  selectedChord: Chord
  onSelectChord: (chord: Chord) => void
}

export function TensionView({
  forms,
  quiz,
  glossary,
  selectedFormIdx,
  onFormChange,
  selectedChord,
  onSelectChord,
}: TensionViewProps) {
  const activeForm = forms[selectedFormIdx]

  return (
    <div className="chords-view">
      <h2>Open Tension Chords · 오픈 텐션 코드</h2>

      <div className="tension-intro">
        <p className="tension-intro__lead">
          Keep strings <strong>1 &amp; 2 open</strong> (E and B) and slide the fretted
          shape along the neck. The ringing open strings become built-in tensions
          (add9, #11, 13…) — a rich, three-dimensional sound with almost no extra
          effort. Most at home in the keys of <strong>E</strong> and <strong>A</strong>,
          but welcome anywhere the notes agree.
        </p>
        <p className="tension-intro__tip">
          Don&apos;t memorize the long names — remember each grip as{' '}
          <em>&ldquo;use this instead of F / F# / G…&rdquo;</em> and let your ears lead.
        </p>
      </div>

      <div className="key-tabs">
        {forms.map((f, i) => (
          <button
            key={f.formName}
            type="button"
            className={`key-tab-btn ${selectedFormIdx === i ? 'active' : ''}`}
            onClick={() => onFormChange(i)}
          >
            {f.formName.split(' · ')[0]}
          </button>
        ))}
      </div>

      <ChordGroupView
        title={`${activeForm.formName} — ${activeForm.formKr}`}
        description={activeForm.description}
        chords={activeForm.chords}
        selected={selectedChord}
        onSelect={onSelectChord}
      />

      <div className="study-guide">
        <h3 className="study-guide__heading">Study Guide · 학습 확인 퀴즈</h3>
        <div className="study-guide__quiz">
          {quiz.map((item, i) => (
            <details key={i} className="quiz-item">
              <summary>
                <span className="quiz-item__num">Q{i + 1}.</span> {item.question}
              </summary>
              <p className="quiz-item__answer">{item.answer}</p>
            </details>
          ))}
        </div>

        <h3 className="study-guide__heading">Glossary · 핵심 용어</h3>
        <dl className="glossary">
          {glossary.map((g) => (
            <div key={g.term} className="glossary__entry">
              <dt>{g.term}</dt>
              <dd>{g.definition}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
