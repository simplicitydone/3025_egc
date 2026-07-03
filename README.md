# Guitar Masterclass Guide (EGC)

Interactive reference for open chords, open tension forms, alternate tunings, jazz voicings, electric triads, and playable progressions. Live at https://egc.simplicity-is-art.com/ (port 3025 via `docker-compose`, nginx serving `dist/`).

## Features

- **Open** — song-key chord sets (G, D, E, C, A, B, F) with basic/advanced tiers
- **Tension** — the seven open-tension forms (open 1st/2nd strings, E/A keys) with a Korean study guide & glossary
- **Tunings** — DADGAD, Open D/G/C shapes
- **Barre** — drop-2/drop-3 matrices, upper structures, altered dominants
- **Electric** — triads, funk shells, ambient clusters
- **Examples** — progressions, licks, techniques
- **▶ audio** on every diagram — Karplus-Strong strum synthesis, tuning-aware

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

## Project layout

```
src/
  components/   # UI (ChordDiagram, tab views, TensionView)
  data/         # Chord database and groupings
  lib/          # Web Audio strum synthesis
  types/        # Shared TypeScript types
  test/         # Vitest tests
```

Chord data lives under `src/data/`. Edit `chords.ts` to add voicings, then wire them into `songKeys.ts`, `tension.ts`, `barre.ts`, or other group files. Fret arrays run low E → high e; tests enforce that each chord's `bassNote` matches its lowest sounding string (standard tuning).

## Deploy

`npm run build` regenerates `dist/`; the running `egc` nginx container serves it directly (volume mount), no restart needed.

## Requirements

- Node.js 20+
