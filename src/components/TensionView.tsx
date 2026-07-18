import type { Chord, GlossaryItem, QuizItem, TensionForm } from '../types/chord'
import { useLang } from '../lib/lang'
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
  const { lang } = useLang()
  const activeForm = forms[selectedFormIdx]

  return (
    <div className="chords-view">
      <h2>{lang === 'kr' ? '오픈 텐션 코드' : 'Open Tension Chords'}</h2>

      <div className="tension-intro">
        {lang === 'kr' ? (
          <p className="tension-intro__lead">
            <strong>1·2번 줄을 개방</strong>(E와 B)한 채로 잡은 모양을 넥 위에서
            이동한다. 계속 울리는 개방현이 코드에 내장된 텐션(add9, #11, 13…)이
            되어, 거의 힘들이지 않고 풍부하고 입체적인 사운드를 얻는다.{' '}
            <strong>E</strong> 키와 <strong>A</strong> 키에서 가장 잘 어울리지만,
            음이 어울리는 곳이라면 어디서든 환영이다.
          </p>
        ) : (
          <p className="tension-intro__lead">
            Keep strings <strong>1 &amp; 2 open</strong> (E and B) and slide the fretted
            shape along the neck. The ringing open strings become built-in tensions
            (add9, #11, 13…) — a rich, three-dimensional sound with almost no extra
            effort. Most at home in the keys of <strong>E</strong> and <strong>A</strong>,
            but welcome anywhere the notes agree.
          </p>
        )}
        {lang === 'kr' ? (
          <p className="tension-intro__tip">
            긴 코드 이름을 외우려 하지 말자 — 각 그립을{' '}
            <em>&ldquo;F / F# / G… 대신 쓰는 코드&rdquo;</em>로 기억하고 귀를 따라가면
            된다.
          </p>
        ) : (
          <p className="tension-intro__tip">
            Don&apos;t memorize the long names — remember each grip as{' '}
            <em>&ldquo;use this instead of F / F# / G…&rdquo;</em> and let your ears lead.
          </p>
        )}
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
        title={lang === 'kr' ? activeForm.formKr : activeForm.formName}
        description={
          lang === 'kr' && activeForm.descriptionKr
            ? activeForm.descriptionKr
            : activeForm.description
        }
        chords={activeForm.chords}
        selected={selectedChord}
        onSelect={onSelectChord}
      />

      <div className="study-guide">
        <h3 className="study-guide__heading">
          {lang === 'kr' ? '학습 확인 퀴즈' : 'Study Guide'}
        </h3>
        <div className="study-guide__quiz">
          {quiz.map((item, i) => (
            <details key={i} className="quiz-item">
              <summary>
                <span className="quiz-item__num">Q{i + 1}.</span>{' '}
                {lang === 'kr' ? item.questionKr : item.question}
              </summary>
              <p className="quiz-item__answer">{lang === 'kr' ? item.answerKr : item.answer}</p>
            </details>
          ))}
        </div>

        <h3 className="study-guide__heading">{lang === 'kr' ? '핵심 용어' : 'Glossary'}</h3>
        <dl className="glossary">
          {glossary.map((g) => (
            <div key={g.term} className="glossary__entry">
              <dt>{lang === 'kr' ? g.termKr : g.term}</dt>
              <dd>{lang === 'kr' ? g.definitionKr : g.definition}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
