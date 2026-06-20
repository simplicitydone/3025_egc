import { useState } from 'react'
import './App.css'
import { ChordGroupView, KeyChordView } from './components/ChordViews'
import { ExamplesView } from './components/ExamplesView'
import { BARRE_CHORDS } from './data/barre'
import { ELECTRIC_CHORDS } from './data/electric'
import { SONG_KEYS } from './data/songKeys'
import { TUNING_KEYS } from './data/tunings'
import type { Chord, KeyChord, Tab } from './types/chord'
import { TABS } from './types/chord'

export default function App() {
  const [tab, setTab] = useState<Tab>('open')

  const [selectedKeyIdx, setSelectedKeyIdx] = useState(0)
  const activeKey = SONG_KEYS[selectedKeyIdx]
  const [selectedOpenChord, setSelectedOpenChord] = useState<KeyChord>(activeKey.chords[0])

  const [selectedTuningIdx, setSelectedTuningIdx] = useState(0)
  const activeTuning = TUNING_KEYS[selectedTuningIdx]
  const [selectedTuningChord, setSelectedTuningChord] = useState<KeyChord>(
    activeTuning.chords[0],
  )

  const [selectedBarreIdx, setSelectedBarreIdx] = useState(0)
  const activeBarre = BARRE_CHORDS[selectedBarreIdx]
  const [selectedBarreChord, setSelectedBarreChord] = useState<Chord>(activeBarre.chords[0])

  const [selectedElecGroupIdx, setSelectedElecGroupIdx] = useState(0)
  const activeElecGroup = ELECTRIC_CHORDS[selectedElecGroupIdx]
  const [selectedElecChord, setSelectedElecChord] = useState<Chord>(activeElecGroup.chords[0])

  const handleKeyChange = (i: number) => {
    setSelectedKeyIdx(i)
    setSelectedOpenChord(SONG_KEYS[i].chords[0])
  }

  const handleTuningChange = (i: number) => {
    setSelectedTuningIdx(i)
    setSelectedTuningChord(TUNING_KEYS[i].chords[0])
  }

  const handleBarreChange = (i: number) => {
    setSelectedBarreIdx(i)
    setSelectedBarreChord(BARRE_CHORDS[i].chords[0])
  }

  const handleElecGroupChange = (i: number) => {
    setSelectedElecGroupIdx(i)
    setSelectedElecChord(ELECTRIC_CHORDS[i].chords[0])
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>🎸 100% Masterclass Guitar Guide</h1>
        <div className="main-tabs" role="tablist" aria-label="Main sections">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              className={`main-tab-btn ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <main className="main-content">
        {tab === 'open' && (
          <div className="chords-view">
            <h2>Select Key (⭐ = Top 4 Priority)</h2>
            <div className="key-tabs">
              {SONG_KEYS.map((k, i) => (
                <button
                  key={k.keyName}
                  type="button"
                  className={`key-tab-btn ${selectedKeyIdx === i ? 'active' : ''}`}
                  onClick={() => handleKeyChange(i)}
                >
                  {k.isPriority ? '⭐ ' : ''}
                  {k.keyName}
                </button>
              ))}
            </div>
            <KeyChordView
              title={`${activeKey.keyName} Chords`}
              chords={activeKey.chords}
              selected={selectedOpenChord}
              onSelect={setSelectedOpenChord}
              showTiers
            />
          </div>
        )}

        {tab === 'tunings' && (
          <div className="chords-view">
            <h2>Alternate Tunings</h2>
            <div className="key-tabs">
              {TUNING_KEYS.map((k, i) => (
                <button
                  key={k.keyName}
                  type="button"
                  className={`key-tab-btn ${selectedTuningIdx === i ? 'active' : ''}`}
                  onClick={() => handleTuningChange(i)}
                >
                  {k.keyName}
                </button>
              ))}
            </div>
            <KeyChordView
              title={`${activeTuning.keyName} Chords`}
              chords={activeTuning.chords}
              selected={selectedTuningChord}
              onSelect={setSelectedTuningChord}
            />
          </div>
        )}

        {tab === 'barre' && (
          <div className="chords-view">
            <h2>Drop Matrices & Upper Structures</h2>
            <div className="key-tabs">
              {BARRE_CHORDS.map((g, i) => (
                <button
                  key={g.groupName}
                  type="button"
                  className={`key-tab-btn ${selectedBarreIdx === i ? 'active' : ''}`}
                  onClick={() => handleBarreChange(i)}
                >
                  {g.groupName.split('(')[0]}
                </button>
              ))}
            </div>
            <ChordGroupView
              title={activeBarre.usageLabel}
              description={activeBarre.description}
              chords={activeBarre.chords}
              selected={selectedBarreChord}
              onSelect={setSelectedBarreChord}
            />
          </div>
        )}

        {tab === 'electric' && (
          <div className="chords-view">
            <h2>Electric Triads & Clusters</h2>
            <div className="key-tabs">
              {ELECTRIC_CHORDS.map((g, i) => (
                <button
                  key={g.groupName}
                  type="button"
                  className={`key-tab-btn ${selectedElecGroupIdx === i ? 'active' : ''}`}
                  onClick={() => handleElecGroupChange(i)}
                >
                  {g.groupName}
                </button>
              ))}
            </div>
            <ChordGroupView
              title={activeElecGroup.groupName}
              description={activeElecGroup.description}
              chords={activeElecGroup.chords}
              selected={selectedElecChord}
              onSelect={setSelectedElecChord}
            />
          </div>
        )}

        {tab === 'examples' && <ExamplesView />}
      </main>
    </div>
  )
}
