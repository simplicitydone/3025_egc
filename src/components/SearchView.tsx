import { useMemo, useState } from 'react'
import type { Chord } from '../types/chord'
import { useLang } from '../lib/lang'
import { ChordGroupView } from './ChordViews'

const MAX_RESULTS = 60

interface SearchViewProps {
  library: Record<string, Chord>
  query: string
}

export function SearchView({ library, query }: SearchViewProps) {
  const { lang } = useLang()
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
        <h2>{lang === 'kr' ? '검색' : 'Search'}</h2>
        <p className="search-empty">
          {lang === 'kr' ? (
            <>
              <strong>“{query}”</strong>에 맞는 코드가 없습니다. 루트 음(C, F#…)이나
              코드 성질(maj7, sus4, add9…)로 검색해 보세요.
            </>
          ) : (
            <>
              No chords match <strong>“{query}”</strong>. Try a root note (C, F#…) or a
              quality (maj7, sus4, add9…).
            </>
          )}
        </p>
      </div>
    )
  }

  const plus = matches.length === MAX_RESULTS ? '+' : ''
  return (
    <div className="chords-view">
      <h2>{lang === 'kr' ? '검색' : 'Search'}</h2>
      <ChordGroupView
        title={
          lang === 'kr'
            ? `“${query}” 검색 결과 ${matches.length}${plus}개`
            : `${matches.length}${plus} match${matches.length === 1 ? '' : 'es'} for “${query}”`
        }
        description={
          lang === 'kr'
            ? '라이브러리의 모든 보이싱을 이름으로 검색합니다.'
            : 'Searching every voicing in the library by name.'
        }
        chords={matches}
        selected={selected}
        onSelect={setPicked}
      />
    </div>
  )
}
