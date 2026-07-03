// Karplus-Strong plucked-string synthesis for chord playback.
// Fret arrays are ordered string 6 (low) → string 1 (high), matching Chord.frets.

// MIDI note numbers of the open strings 6 → 1, per tuning group name.
const TUNINGS: Record<string, number[]> = {
  standard: [40, 45, 50, 55, 59, 64], // E2 A2 D3 G3 B3 E4
  DADGAD: [38, 45, 50, 55, 57, 62], // D2 A2 D3 G3 A3 D4
  'Open D': [38, 45, 50, 54, 57, 62], // D2 A2 D3 F#3 A3 D4
  'Open G': [38, 43, 50, 55, 59, 62], // D2 G2 D3 G3 B3 D4
  'Open C': [36, 43, 48, 55, 60, 64], // C2 G2 C3 G3 C4 E4
}

const STRUM_INTERVAL = 0.055
const NOTE_SECONDS = 2.4
const NOTE_GAIN = 0.16

let ctx: AudioContext | null = null

function getContext(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext()
  }
  return ctx
}

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12)
}

function pluckBuffer(audio: AudioContext, freq: number): AudioBuffer {
  const sampleRate = audio.sampleRate
  const length = Math.floor(sampleRate * NOTE_SECONDS)
  const buffer = audio.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)
  const period = Math.max(2, Math.round(sampleRate / freq))

  for (let i = 0; i < period; i++) {
    data[i] = Math.random() * 2 - 1
  }
  // Averaging two delayed samples low-passes the loop, giving the natural decay.
  for (let i = period; i < length; i++) {
    data[i] = 0.996 * 0.5 * (data[i - period] + data[i - period + 1])
  }
  return buffer
}

export function chordMidiNotes(frets: string[], tuningName = 'standard'): number[] {
  const open = TUNINGS[tuningName] ?? TUNINGS.standard
  const notes: number[] = []
  frets.forEach((f, i) => {
    const fret = parseInt(f, 10)
    if (Number.isNaN(fret)) return // muted 'X'
    notes.push(open[i] + fret)
  })
  return notes
}

export function strumChord(frets: string[], tuningName = 'standard'): void {
  const audio = getContext()
  if (audio.state === 'suspended') {
    void audio.resume()
  }
  const start = audio.currentTime + 0.02
  chordMidiNotes(frets, tuningName).forEach((midi, order) => {
    const source = audio.createBufferSource()
    source.buffer = pluckBuffer(audio, midiToFreq(midi))
    const gain = audio.createGain()
    gain.gain.value = NOTE_GAIN
    source.connect(gain)
    gain.connect(audio.destination)
    source.start(start + order * STRUM_INTERVAL)
  })
}
