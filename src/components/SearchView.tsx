import { useMemo, useState } from 'react'
import type { Chord } from '../types/chord'
import { ChordGroupView } from './ChordViews'

const MAX_RESULTS = 60

interface SearchViewProps {
  library: Record<string, Chord>
  query: string
}

export function SearchView({ library, query }: SearchViewProps) {
  const matches = useMemo(() => {
    const q = query.toLowerCase()
    return Object.values(library)
      .filter((c) => c.name.toLowerCase().includes(q))
      .sort((a, b) => {
        // names that start with the query first, then alphabetical
        const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1
        const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1
        return aStarts - bStarts || a.name.localeCompare(b.name)
      })
      .slice(0, MAX_RESULTS)
  }, [library, query])

  const [picked, setPicked] = useState<Chord | null>(null)
  const selected = picked && matches.includes(picked) ? picked : matches[0]

  if (matches.length === 0) {
    return (
      <div className="chords-view">
        <h2>Search</h2>
        <p className="search-empty">
          No chords match <strong>“{query}”</strong>. Try a root note (C, F#…) or a
          quality (maj7, sus4, add9…).
        </p>
      </div>
    )
  }

  return (
    <div className="chords-view">
      <h2>Search</h2>
      <ChordGroupView
        title={`${matches.length}${matches.length === MAX_RESULTS ? '+' : ''} match${matches.length === 1 ? '' : 'es'} for “${query}”`}
        description="Searching every voicing in the library by name."
        chords={matches}
        selected={selected}
        onSelect={setPicked}
      />
    </div>
  )
}
