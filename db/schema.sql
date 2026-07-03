-- EGC canonical database schema.
-- The SQLite file db/egc.sqlite is the single source of truth for all chord
-- and lesson content. The frontend never embeds data: scripts/export-db.mjs
-- renders this DB to public/db.json, which the app fetches at runtime.

CREATE TABLE chords (
  name        TEXT PRIMARY KEY,
  tier        TEXT NOT NULL CHECK (tier IN ('Basic', 'Advanced')),
  sub_category TEXT,
  frets       TEXT NOT NULL,  -- JSON array of 6 entries, low E -> high e ('X' = muted)
  fingers     TEXT NOT NULL,  -- JSON array of 6 entries ('', '1'-'4', 'T', 'O')
  root_string INTEGER NOT NULL CHECK (root_string BETWEEN 1 AND 6),
  bass_note   TEXT NOT NULL,
  description TEXT
);

-- Key-based chord sets: the OPEN tab (section 'open') and TUNINGS tab ('tunings').
CREATE TABLE key_groups (
  id          INTEGER PRIMARY KEY,
  section     TEXT NOT NULL CHECK (section IN ('open', 'tunings')),
  key_name    TEXT NOT NULL,
  is_priority INTEGER NOT NULL DEFAULT 0,
  position    INTEGER NOT NULL
);

CREATE TABLE key_group_chords (
  group_id    INTEGER NOT NULL REFERENCES key_groups(id),
  chord_name  TEXT NOT NULL REFERENCES chords(name),
  nashville   TEXT NOT NULL,
  position    INTEGER NOT NULL,
  PRIMARY KEY (group_id, position)
);

-- Grouped chord collections: BARRE ('barre'), ELECTRIC ('electric'),
-- and the open tension forms ('tension').
CREATE TABLE chord_groups (
  id          INTEGER PRIMARY KEY,
  section     TEXT NOT NULL CHECK (section IN ('barre', 'electric', 'tension')),
  group_name  TEXT NOT NULL,
  usage_label TEXT,           -- barre only
  name_kr     TEXT,           -- tension only (form name from the Korean guide)
  description TEXT NOT NULL,
  position    INTEGER NOT NULL
);

CREATE TABLE chord_group_chords (
  group_id    INTEGER NOT NULL REFERENCES chord_groups(id),
  chord_name  TEXT NOT NULL REFERENCES chords(name),
  position    INTEGER NOT NULL,
  PRIMARY KEY (group_id, position)
);

-- EXAMPLES tab: progressions, licks, techniques.
CREATE TABLE moves (
  id          INTEGER PRIMARY KEY,
  kind        TEXT NOT NULL CHECK (kind IN ('progression', 'lick', 'technique')),
  title       TEXT NOT NULL,
  category    TEXT NOT NULL,
  example     TEXT NOT NULL,
  description TEXT NOT NULL,
  how_to      TEXT NOT NULL,
  position    INTEGER NOT NULL
);

CREATE TABLE move_chords (
  move_id     INTEGER NOT NULL REFERENCES moves(id),
  chord_name  TEXT NOT NULL REFERENCES chords(name),
  position    INTEGER NOT NULL,
  PRIMARY KEY (move_id, position)
);

-- Open tension study guide (Korean quiz + glossary).
CREATE TABLE quiz_items (
  id        INTEGER PRIMARY KEY,
  question  TEXT NOT NULL,
  answer    TEXT NOT NULL,
  position  INTEGER NOT NULL
);

CREATE TABLE glossary_items (
  id         INTEGER PRIMARY KEY,
  term       TEXT NOT NULL,
  definition TEXT NOT NULL,
  position   INTEGER NOT NULL
);

-- Open-string MIDI notes per tuning (strings 6 -> 1), used for audio playback.
CREATE TABLE tunings (
  name       TEXT PRIMARY KEY,
  midi_notes TEXT NOT NULL    -- JSON array of 6 MIDI note numbers
);

-- Schema/meta versioning for the exporter.
CREATE TABLE meta (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
