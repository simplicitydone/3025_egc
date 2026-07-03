// Bootstrap db/egc.sqlite from the legacy data modules (scripts/legacy-data/).
// This is a one-time migration tool kept for provenance; after seeding, the
// SQLite file is the canonical store — edit it directly, then run export-db.mjs.
import { DatabaseSync } from 'node:sqlite'
import { readFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { RAW_CHORDS } from './legacy-data/chords.mjs'
import { SONG_KEYS } from './legacy-data/songKeys.mjs'
import { TUNING_KEYS } from './legacy-data/tunings.mjs'
import { BARRE_CHORDS } from './legacy-data/barre.mjs'
import { ELECTRIC_CHORDS } from './legacy-data/electric.mjs'
import { TENSION_FORMS, TENSION_QUIZ, TENSION_GLOSSARY } from './legacy-data/tension.mjs'
import { LICKS, SIGNATURE_MOVES, TECHNIQUES } from './legacy-data/examples.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DB_PATH = path.join(ROOT, 'db', 'egc.sqlite')

// Open-string MIDI notes, strings 6 -> 1 (was hardcoded in src/lib/audio.ts).
const TUNING_MIDI = {
  standard: [40, 45, 50, 55, 59, 64],
  DADGAD: [38, 45, 50, 55, 57, 62],
  'Open D': [38, 45, 50, 54, 57, 62],
  'Open G': [38, 43, 50, 55, 59, 62],
  'Open C': [36, 43, 48, 55, 60, 64],
}

rmSync(DB_PATH, { force: true })
const db = new DatabaseSync(DB_PATH)
db.exec('PRAGMA foreign_keys = ON')
db.exec(readFileSync(path.join(ROOT, 'db', 'schema.sql'), 'utf8'))

const insChord = db.prepare(
  'INSERT INTO chords (name, tier, sub_category, frets, fingers, root_string, bass_note, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
)
for (const [name, c] of Object.entries(RAW_CHORDS)) {
  insChord.run(
    name, c.tier, c.subCategory ?? null,
    JSON.stringify(c.frets), JSON.stringify(c.fingers),
    c.rootString, c.bassNote, c.description ?? null,
  )
}

const insKeyGroup = db.prepare(
  'INSERT INTO key_groups (section, key_name, is_priority, position) VALUES (?, ?, ?, ?) RETURNING id',
)
const insKeyChord = db.prepare(
  'INSERT INTO key_group_chords (group_id, chord_name, nashville, position) VALUES (?, ?, ?, ?)',
)
function seedKeySection(section, groups) {
  groups.forEach((g, gi) => {
    const { id } = insKeyGroup.get(section, g.keyName, g.isPriority ? 1 : 0, gi)
    g.chords.forEach((kc, ci) => insKeyChord.run(id, kc.chord.name, kc.nashville, ci))
  })
}
seedKeySection('open', SONG_KEYS)
seedKeySection('tunings', TUNING_KEYS)

const insGroup = db.prepare(
  'INSERT INTO chord_groups (section, group_name, usage_label, name_kr, description, position) VALUES (?, ?, ?, ?, ?, ?) RETURNING id',
)
const insGroupChord = db.prepare(
  'INSERT INTO chord_group_chords (group_id, chord_name, position) VALUES (?, ?, ?)',
)
BARRE_CHORDS.forEach((g, gi) => {
  const { id } = insGroup.get('barre', g.groupName, g.usageLabel, null, g.description, gi)
  g.chords.forEach((c, ci) => insGroupChord.run(id, c.name, ci))
})
ELECTRIC_CHORDS.forEach((g, gi) => {
  const { id } = insGroup.get('electric', g.groupName, null, null, g.description, gi)
  g.chords.forEach((c, ci) => insGroupChord.run(id, c.name, ci))
})
TENSION_FORMS.forEach((g, gi) => {
  const { id } = insGroup.get('tension', g.formName, null, g.formKr, g.description, gi)
  g.chords.forEach((c, ci) => insGroupChord.run(id, c.name, ci))
})

const insMove = db.prepare(
  'INSERT INTO moves (kind, title, category, example, description, how_to, position) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id',
)
const insMoveChord = db.prepare(
  'INSERT INTO move_chords (move_id, chord_name, position) VALUES (?, ?, ?)',
)
function seedMoves(kind, moves) {
  moves.forEach((m, mi) => {
    const { id } = insMove.get(kind, m.title, m.category, m.example, m.description, m.howTo, mi)
    m.sequence.forEach((c, ci) => insMoveChord.run(id, c.name, ci))
  })
}
seedMoves('progression', SIGNATURE_MOVES)
seedMoves('lick', LICKS)
seedMoves('technique', TECHNIQUES)

const insQuiz = db.prepare('INSERT INTO quiz_items (question, answer, position) VALUES (?, ?, ?)')
TENSION_QUIZ.forEach((q, i) => insQuiz.run(q.question, q.answer, i))

const insGloss = db.prepare('INSERT INTO glossary_items (term, definition, position) VALUES (?, ?, ?)')
TENSION_GLOSSARY.forEach((g, i) => insGloss.run(g.term, g.definition, i))

const insTuning = db.prepare('INSERT INTO tunings (name, midi_notes) VALUES (?, ?)')
for (const [name, midi] of Object.entries(TUNING_MIDI)) {
  insTuning.run(name, JSON.stringify(midi))
}

db.prepare('INSERT INTO meta (key, value) VALUES (?, ?)').run('schema_version', '1')

const counts = {}
for (const t of ['chords', 'key_groups', 'key_group_chords', 'chord_groups', 'chord_group_chords', 'moves', 'move_chords', 'quiz_items', 'glossary_items', 'tunings']) {
  counts[t] = db.prepare(`SELECT COUNT(*) AS n FROM ${t}`).get().n
}
db.close()
console.log('Seeded', DB_PATH)
console.table(counts)
