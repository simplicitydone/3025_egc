// Render db/egc.sqlite to public/db.json — the artifact the frontend fetches.
// Run after any DB edit: node scripts/export-db.mjs (or npm run db:export).
import { DatabaseSync } from 'node:sqlite'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const db = new DatabaseSync(path.join(ROOT, 'db', 'egc.sqlite'), { readOnly: true })

const chords = {}
for (const r of db.prepare('SELECT * FROM chords ORDER BY rowid').all()) {
  chords[r.name] = {
    tier: r.tier,
    ...(r.sub_category ? { subCategory: r.sub_category } : {}),
    frets: JSON.parse(r.frets),
    fingers: JSON.parse(r.fingers),
    rootString: r.root_string,
    bassNote: r.bass_note,
    ...(r.description ? { description: r.description } : {}),
    ...(r.description_kr ? { descriptionKr: r.description_kr } : {}),
  }
}

function keySection(section) {
  return db
    .prepare('SELECT * FROM key_groups WHERE section = ? ORDER BY position')
    .all(section)
    .map((g) => ({
      keyName: g.key_name,
      ...(g.is_priority ? { isPriority: true } : {}),
      chords: db
        .prepare('SELECT chord_name, nashville FROM key_group_chords WHERE group_id = ? ORDER BY position')
        .all(g.id)
        .map((c) => ({ chord: c.chord_name, nashville: c.nashville })),
    }))
}

function groupSection(section, extra) {
  return db
    .prepare('SELECT * FROM chord_groups WHERE section = ? ORDER BY position')
    .all(section)
    .map((g) => ({
      groupName: g.group_name,
      ...extra(g),
      description: g.description,
      ...(g.description_kr ? { descriptionKr: g.description_kr } : {}),
      chords: db
        .prepare('SELECT chord_name FROM chord_group_chords WHERE group_id = ? ORDER BY position')
        .all(g.id)
        .map((c) => c.chord_name),
    }))
}

function movesOf(kind) {
  return db
    .prepare('SELECT * FROM moves WHERE kind = ? ORDER BY position')
    .all(kind)
    .map((m) => ({
      title: m.title,
      ...(m.title_kr ? { titleKr: m.title_kr } : {}),
      category: m.category,
      example: m.example,
      description: m.description,
      ...(m.description_kr ? { descriptionKr: m.description_kr } : {}),
      howTo: m.how_to,
      ...(m.how_to_kr ? { howToKr: m.how_to_kr } : {}),
      sequence: db
        .prepare('SELECT chord_name FROM move_chords WHERE move_id = ? ORDER BY position')
        .all(m.id)
        .map((c) => c.chord_name),
    }))
}

const tunings = {}
for (const t of db.prepare('SELECT * FROM tunings ORDER BY name').all()) {
  tunings[t.name] = JSON.parse(t.midi_notes)
}

const data = {
  schemaVersion: Number(db.prepare("SELECT value FROM meta WHERE key = 'schema_version'").get().value),
  chords,
  songKeys: keySection('open'),
  tuningKeys: keySection('tunings'),
  barreGroups: groupSection('barre', (g) => ({
    usageLabel: g.usage_label,
    ...(g.usage_label_kr ? { usageLabelKr: g.usage_label_kr } : {}),
  })),
  electricGroups: groupSection('electric', () => ({})),
  tensionForms: groupSection('tension', (g) => ({ formKr: g.name_kr })),
  moves: {
    progressions: movesOf('progression'),
    licks: movesOf('lick'),
    techniques: movesOf('technique'),
  },
  // The study guide is bilingual: *_en columns are the English side, the
  // original (renamed *_kr) columns keep the Korean lecture content.
  quiz: db.prepare('SELECT question_en, answer_en, question_kr, answer_kr FROM quiz_items ORDER BY position').all()
    .map((q) => ({ question: q.question_en, answer: q.answer_en, questionKr: q.question_kr, answerKr: q.answer_kr })),
  glossary: db.prepare('SELECT term_en, definition_en, term_kr, definition_kr FROM glossary_items ORDER BY position').all()
    .map((g) => ({ term: g.term_en, definition: g.definition_en, termKr: g.term_kr, definitionKr: g.definition_kr })),
  tunings,
}

db.close()
const out = path.join(ROOT, 'public', 'db.json')
writeFileSync(out, JSON.stringify(data, null, 1) + '\n')
console.log('Exported', out, '—', Object.keys(chords).length, 'chords')
