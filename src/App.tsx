import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { ChordGroupView, KeyChordView } from './components/ChordViews'
import { ExamplesView } from './components/ExamplesView'
import { SearchView } from './components/SearchView'
import { TensionView } from './components/TensionView'
import { loadAppData } from './data/provider'
import { decodeUrlState, encodeUrlState } from './lib/urlState'
import type { AppData, Chord, KeyChord, KeyGroup, Tab } from './types/chord'
import { TABS } from './types/chord'

export default function App() {
  const [data, setData] = useState<AppData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    loadAppData()
      .then((d) => {
        if (!cancelled) setData(d)
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e))
      })
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  if (error) {
    return (
      <div className="app-container app-status">
        <h1>🎸</h1>
        <p className="app-status__message">Could not load the chord database.</p>
        <p className="app-status__detail">{error}</p>
        <button
          type="button"
          className="key-tab-btn"
          onClick={() => {
            setError(null)
            setReloadKey((k) => k + 1)
          }}
        >
          Retry
        </button>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="app-container app-status" aria-busy="true">
        <h1>🎸</h1>
        <p className="app-status__message">Loading chord library…</p>
      </div>
    )
  }

  return <LoadedApp data={data} />
}

interface KeySelection {
  idx: number
  chord: KeyChord
}

interface GroupSelection {
  idx: number
  chord: Chord
}

function resolveKeySelection(groups: KeyGroup[], group?: number, chord?: string): KeySelection {
  const idx = group !== undefined && group >= 0 && group < groups.length ? group : 0
  const found = chord ? groups[idx].chords.find((kc) => kc.chord.name === chord) : undefined
  return { idx, chord: found ?? groups[idx].chords[0] }
}

function resolveGroupSelection(
  groups: { chords: Chord[] }[],
  group?: number,
  chord?: string,
): GroupSelection {
  const idx = group !== undefined && group >= 0 && group < groups.length ? group : 0
  const found = chord ? groups[idx].chords.find((c) => c.name === chord) : undefined
  return { idx, chord: found ?? groups[idx].chords[0] }
}

function LoadedApp({ data }: { data: AppData }) {
  const initial = useMemo(() => {
    const fromHash = decodeUrlState(window.location.hash)
    return {
      tab: fromHash?.tab ?? ('open' as Tab),
      open: resolveKeySelection(
        data.songKeys,
        fromHash?.tab === 'open' ? fromHash.group : undefined,
        fromHash?.tab === 'open' ? fromHash.chord : undefined,
      ),
      tunings: resolveKeySelection(
        data.tuningKeys,
        fromHash?.tab === 'tunings' ? fromHash.group : undefined,
        fromHash?.tab === 'tunings' ? fromHash.chord : undefined,
      ),
      barre: resolveGroupSelection(
        data.barreGroups,
        fromHash?.tab === 'barre' ? fromHash.group : undefined,
        fromHash?.tab === 'barre' ? fromHash.chord : undefined,
      ),
      electric: resolveGroupSelection(
        data.electricGroups,
        fromHash?.tab === 'electric' ? fromHash.group : undefined,
        fromHash?.tab === 'electric' ? fromHash.chord : undefined,
      ),
      tension: resolveGroupSelection(
        data.tensionForms,
        fromHash?.tab === 'tension' ? fromHash.group : undefined,
        fromHash?.tab === 'tension' ? fromHash.chord : undefined,
      ),
    }
  }, [data])

  const [tab, setTab] = useState<Tab>(initial.tab)
  const [query, setQuery] = useState('')

  const [openSel, setOpenSel] = useState<KeySelection>(initial.open)
  const [tuningSel, setTuningSel] = useState<KeySelection>(initial.tunings)
  const [barreSel, setBarreSel] = useState<GroupSelection>(initial.barre)
  const [elecSel, setElecSel] = useState<GroupSelection>(initial.electric)
  const [tensionSel, setTensionSel] = useState<GroupSelection>(initial.tension)

  const activeKey = data.songKeys[openSel.idx]
  const activeTuning = data.tuningKeys[tuningSel.idx]
  const activeBarre = data.barreGroups[barreSel.idx]
  const activeElecGroup = data.electricGroups[elecSel.idx]

  // Keep the URL hash shareable: it always encodes the active tab's selection.
  useEffect(() => {
    const state =
      tab === 'open'
        ? { tab, group: openSel.idx, chord: openSel.chord.chord.name }
        : tab === 'tunings'
          ? { tab, group: tuningSel.idx, chord: tuningSel.chord.chord.name }
          : tab === 'barre'
            ? { tab, group: barreSel.idx, chord: barreSel.chord.name }
            : tab === 'electric'
              ? { tab, group: elecSel.idx, chord: elecSel.chord.name }
              : tab === 'tension'
                ? { tab, group: tensionSel.idx, chord: tensionSel.chord.name }
                : { tab }
    history.replaceState(null, '', encodeUrlState(state))
  }, [tab, openSel, tuningSel, barreSel, elecSel, tensionSel])

  // Apply manual hash edits (paste a shared link into the same session).
  useEffect(() => {
    const onHashChange = () => {
      const s = decodeUrlState(window.location.hash)
      if (!s) return
      setTab(s.tab)
      if (s.tab === 'open') setOpenSel(resolveKeySelection(data.songKeys, s.group, s.chord))
      if (s.tab === 'tunings') setTuningSel(resolveKeySelection(data.tuningKeys, s.group, s.chord))
      if (s.tab === 'barre') setBarreSel(resolveGroupSelection(data.barreGroups, s.group, s.chord))
      if (s.tab === 'electric') setElecSel(resolveGroupSelection(data.electricGroups, s.group, s.chord))
      if (s.tab === 'tension') setTensionSel(resolveGroupSelection(data.tensionForms, s.group, s.chord))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [data])

  const searching = query.trim().length > 0

  return (
    <div className="app-container">
      <header className="header">
        <h1>🎸 Essential Guitar Chords</h1>
      </header>
      <div className="main-tabs" role="tablist" aria-label="Main sections">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t && !searching}
            className={`main-tab-btn ${tab === t && !searching ? 'active' : ''}`}
            onClick={() => {
              setQuery('')
              setTab(t)
            }}
          >
            {t.toUpperCase()}
          </button>
        ))}
        <input
          type="search"
          className="tab-search"
          placeholder="Search chords…"
          aria-label="Search all chords by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {searching ? (
        <main className="main-content">
          <SearchView library={data.chordLibrary} query={query.trim()} />
        </main>
      ) : (
        <main className="main-content">
          {tab === 'open' && (
            <div className="chords-view">
              <h2>Select Key (⭐ = Top 4 Priority)</h2>
              <div className="key-tabs">
                {data.songKeys.map((k, i) => (
                  <button
                    key={k.keyName}
                    type="button"
                    className={`key-tab-btn ${openSel.idx === i ? 'active' : ''}`}
                    onClick={() => setOpenSel({ idx: i, chord: data.songKeys[i].chords[0] })}
                  >
                    {k.isPriority ? '⭐ ' : ''}
                    {k.keyName}
                  </button>
                ))}
              </div>
              <KeyChordView
                title={`${activeKey.keyName} Chords`}
                chords={activeKey.chords}
                selected={openSel.chord}
                onSelect={(kc) => setOpenSel({ idx: openSel.idx, chord: kc })}
                showTiers
              />
            </div>
          )}

          {tab === 'tension' && (
            <TensionView
              forms={data.tensionForms}
              quiz={data.quiz}
              glossary={data.glossary}
              selectedFormIdx={tensionSel.idx}
              onFormChange={(i) =>
                setTensionSel({ idx: i, chord: data.tensionForms[i].chords[0] })
              }
              selectedChord={tensionSel.chord}
              onSelectChord={(c) => setTensionSel({ idx: tensionSel.idx, chord: c })}
            />
          )}

          {tab === 'tunings' && (
            <div className="chords-view">
              <h2>Alternate Tunings</h2>
              <div className="key-tabs">
                {data.tuningKeys.map((k, i) => (
                  <button
                    key={k.keyName}
                    type="button"
                    className={`key-tab-btn ${tuningSel.idx === i ? 'active' : ''}`}
                    onClick={() => setTuningSel({ idx: i, chord: data.tuningKeys[i].chords[0] })}
                  >
                    {k.keyName}
                  </button>
                ))}
              </div>
              <KeyChordView
                title={`${activeTuning.keyName} Chords`}
                chords={activeTuning.chords}
                selected={tuningSel.chord}
                onSelect={(kc) => setTuningSel({ idx: tuningSel.idx, chord: kc })}
                openStrings={data.tunings[activeTuning.keyName]}
              />
            </div>
          )}

          {tab === 'barre' && (
            <div className="chords-view">
              <h2>Drop Matrices & Upper Structures</h2>
              <div className="key-tabs">
                {data.barreGroups.map((g, i) => (
                  <button
                    key={g.groupName}
                    type="button"
                    className={`key-tab-btn ${barreSel.idx === i ? 'active' : ''}`}
                    onClick={() => setBarreSel({ idx: i, chord: data.barreGroups[i].chords[0] })}
                  >
                    {g.groupName.replace(' Matrix', '').replace(' 4 Strings', '')}
                  </button>
                ))}
              </div>
              <ChordGroupView
                title={activeBarre.usageLabel}
                description={activeBarre.description}
                chords={activeBarre.chords}
                selected={barreSel.chord}
                onSelect={(c) => setBarreSel({ idx: barreSel.idx, chord: c })}
              />
            </div>
          )}

          {tab === 'electric' && (
            <div className="chords-view">
              <h2>Electric Triads & Clusters</h2>
              <div className="key-tabs">
                {data.electricGroups.map((g, i) => (
                  <button
                    key={g.groupName}
                    type="button"
                    className={`key-tab-btn ${elecSel.idx === i ? 'active' : ''}`}
                    onClick={() => setElecSel({ idx: i, chord: data.electricGroups[i].chords[0] })}
                  >
                    {g.groupName}
                  </button>
                ))}
              </div>
              <ChordGroupView
                title={activeElecGroup.groupName}
                description={activeElecGroup.description}
                chords={activeElecGroup.chords}
                selected={elecSel.chord}
                onSelect={(c) => setElecSel({ idx: elecSel.idx, chord: c })}
              />
            </div>
          )}

          {tab === 'examples' && (
            <ExamplesView
              progressions={data.progressions}
              licks={data.licks}
              techniques={data.techniques}
            />
          )}
        </main>
      )}

      <footer className="app-footer">
        <span>
          Chord data: <code>db/egc.sqlite</code> · schema v{data.schemaVersion} ·{' '}
          {Object.keys(data.chordLibrary).length} voicings
        </span>
        <a href="https://github.com/simplicitydone/3025_egc" target="_blank" rel="noreferrer">
          Source
        </a>
      </footer>
    </div>
  )
}
