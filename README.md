# Essential Guitar Chords (EGC)

Interactive reference for open chords, open tension forms, alternate tunings, jazz voicings, electric triads, and playable progressions. Live at https://egc.simplicity-is-art.com/ (port 3025 via `docker-compose`, nginx serving `dist/`).

## Features

- **Open** — song-key chord sets (G, D, E, C, A, B, F) with basic/advanced tiers
- **Tension** — the seven open-tension forms (open 1st/2nd strings, E/A keys) with a Korean study guide & glossary
- **Tunings** — DADGAD, Open D/G/C shapes
- **Barre** — drop-2/drop-3 matrices, upper structures, altered dominants
- **Electric** — triads, funk shells, ambient clusters
- **Examples** — progressions, licks, techniques
- **▶ audio** on every diagram — Karplus-Strong strum synthesis, tuning-aware
- **Search** — filter all 218 voicings by name from the sticky bar
- **Shareable URLs** — hash encodes tab/group/chord (e.g. `#tension?g=4&c=Cmaj7%2FE…`)
- **Note labels** — every diagram shows its sounding notes, tuning-aware
- **PWA** — installable, works offline (service worker + manifest)
- **nginx** — gzip, immutable hashed assets, no-cache for `index.html`/`db.json`/`sw.js`

## Stack

- React 19 + TypeScript
- Vite 8

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (usually http://localhost:5173) |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run db:export` | Render `db/egc.sqlite` → `public/db.json` |
| `npm run db:seed` | Rebuild the SQLite DB from `scripts/legacy-data/` (bootstrap only) |

## Project layout

```
db/
  egc.sqlite    # ⭐ canonical database — all chords & lesson content
  schema.sql    # schema reference
public/
  db.json       # generated export the app fetches at runtime
scripts/
  export-db.mjs # sqlite → public/db.json
  seed-db.mjs   # bootstrap sqlite from legacy-data/ (historic)
  legacy-data/  # frozen pre-DB data modules (seed source)
src/
  components/   # UI (ChordDiagram, tab views, TensionView)
  data/         # provider.ts — fetches db.json, resolves references
  lib/          # Web Audio strum synthesis, chord validation
  types/        # Shared TypeScript types
  test/         # Vitest tests (validate the db.json export)
```

## Data workflow (DB is the source of truth)

The frontend contains **no chord data**. All content lives in `db/egc.sqlite`
(chords, key groups, tension forms, barre/electric groups, example moves,
quiz, glossary, tuning MIDI notes). To change data:

1. Edit the SQLite file with any tool, e.g.
   `sqlite3 db/egc.sqlite "UPDATE chords SET description='...' WHERE name='G Major'"`
   (or a GUI like DB Browser for SQLite)
2. `npm run db:export` — regenerates `public/db.json`
3. `npm run build` — ships it (tests validate the export automatically)

Fret arrays run low E → high e ('X' = muted); tests enforce that each chord's
`bassNote` matches its lowest sounding string (standard tuning) and that
tension-form voicings keep strings 1–2 open. A frontend rewrite can't lose
data: the DB and its JSON export live outside `src/`.

## Deploy

`npm run build` regenerates `dist/` (bundle + `db.json` + `sw.js`); the running
`egc` nginx container serves it directly (volume mount), no restart needed.
Changing `nginx.conf` or `docker-compose.yml` requires `docker compose up -d`.
If the service-worker logic in `public/sw.js` changes, bump its `CACHE` version
constant so clients drop the old cache.

## Requirements

- Node.js 20+
