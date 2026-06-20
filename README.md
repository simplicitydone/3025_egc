# Guitar Masterclass Guide

Interactive reference for open chords, alternate tunings, jazz voicings, electric triads, and playable progressions.

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
  components/   # UI (ChordDiagram, tab views)
  data/         # Chord database and groupings
  types/        # Shared TypeScript types
  test/         # Vitest tests
```

Chord data lives under `src/data/`. Edit `chords.ts` to add voicings, then wire them into `songKeys.ts`, `barre.ts`, or other group files.

## Requirements

- Node.js 20+
