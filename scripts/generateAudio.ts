import fs from 'fs';
import path from 'path';

const SAMPLE_RATE = 44100;

function createWavBuffer(samplesLeft: Float32Array, samplesRight: Float32Array): Buffer {
  const numSamples = samplesLeft.length;
  const buffer = Buffer.alloc(44 + numSamples * 4);

  // RIFF identifier
  buffer.write('RIFF', 0);
  // file length minus 8
  buffer.writeUInt32LE(36 + numSamples * 4, 4);
  // RIFF type
  buffer.write('WAVE', 8);
  // format chunk identifier
  buffer.write('fmt ', 12);
  // format chunk length
  buffer.writeUInt32LE(16, 16);
  // sample format (1 = PCM)
  buffer.writeUInt16LE(1, 20);
  // channel count (2 = stereo)
  buffer.writeUInt16LE(2, 22);
  // sample rate
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  // byte rate (sample rate * 2 channels * 2 bytes)
  buffer.writeUInt32LE(SAMPLE_RATE * 4, 28);
  // block align (2 channels * 2 bytes)
  buffer.writeUInt16LE(4, 32);
  // bits per sample
  buffer.writeUInt16LE(16, 34);
  // data chunk identifier
  buffer.write('data', 36);
  // data chunk length
  buffer.writeUInt32LE(numSamples * 4, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    // Clamp to -1..1
    const sL = Math.max(-1, Math.min(1, samplesLeft[i]));
    const sR = Math.max(-1, Math.min(1, samplesRight[i]));

    const intL = sL < 0 ? Math.floor(sL * 32768) : Math.floor(sL * 32767);
    const intR = sR < 0 ? Math.floor(sR * 32768) : Math.floor(sR * 32767);

    buffer.writeInt16LE(intL, offset);
    offset += 2;
    buffer.writeInt16LE(intR, offset);
    offset += 2;
  }

  return buffer;
}

// Simple reverb using comb filters
function applyReverb(samplesL: Float32Array, samplesR: Float32Array) {
  const delaySamples1 = Math.floor(SAMPLE_RATE * 0.045);
  const delaySamples2 = Math.floor(SAMPLE_RATE * 0.063);
  const feedback = 0.42;

  const outL = new Float32Array(samplesL.length);
  const outR = new Float32Array(samplesR.length);

  for (let i = 0; i < samplesL.length; i++) {
    const prev1 = i >= delaySamples1 ? outL[i - delaySamples1] * feedback : 0;
    const prev2 = i >= delaySamples2 ? outR[i - delaySamples2] * feedback : 0;

    outL[i] = samplesL[i] + prev1;
    outR[i] = samplesR[i] + prev2;
  }

  for (let i = 0; i < samplesL.length; i++) {
    samplesL[i] = samplesL[i] * 0.75 + outL[i] * 0.35;
    samplesR[i] = samplesR[i] * 0.75 + outR[i] * 0.35;
  }
}

// Generate note waveform with piano-like decay and harmonics
function addPianoNote(
  samplesL: Float32Array,
  samplesR: Float32Array,
  freq: number,
  startSec: number,
  durationSec: number,
  velocity: number = 0.7,
  pan: number = 0
) {
  const startSample = Math.floor(startSec * SAMPLE_RATE);
  const numSamples = Math.floor(durationSec * SAMPLE_RATE);
  const endSample = Math.min(samplesL.length, startSample + numSamples);

  const leftGain = Math.cos((pan + 1) * Math.PI / 4) * velocity;
  const rightGain = Math.sin((pan + 1) * Math.PI / 4) * velocity;

  for (let i = startSample; i < endSample; i++) {
    const t = (i - startSample) / SAMPLE_RATE;
    
    // Attack-Decay envelope
    const attack = Math.min(1, t / 0.008);
    const decay = Math.exp(-t * (1.8 + freq * 0.0015));
    const env = attack * decay;

    // Rich physical modeling harmonics
    const h1 = Math.sin(2 * Math.PI * freq * t);
    const h2 = 0.45 * Math.sin(2 * Math.PI * freq * 2 * t) * Math.exp(-t * 2.5);
    const h3 = 0.22 * Math.sin(2 * Math.PI * freq * 3 * t) * Math.exp(-t * 4);
    const h4 = 0.12 * Math.sin(2 * Math.PI * freq * 4 * t) * Math.exp(-t * 6);
    
    // Subtle detune chorus
    const chorus = 0.18 * Math.sin(2 * Math.PI * (freq * 1.002) * t);

    const sample = (h1 + h2 + h3 + h4 + chorus) * env * 0.28;

    samplesL[i] += sample * leftGain;
    samplesR[i] += sample * rightGain;
  }
}

// Cello / Strings warm pad
function addStringsPad(
  samplesL: Float32Array,
  samplesR: Float32Array,
  freq: number,
  startSec: number,
  durationSec: number,
  velocity: number = 0.35
) {
  const startSample = Math.floor(startSec * SAMPLE_RATE);
  const numSamples = Math.floor(durationSec * SAMPLE_RATE);
  const endSample = Math.min(samplesL.length, startSample + numSamples);

  for (let i = startSample; i < endSample; i++) {
    const t = (i - startSample) / SAMPLE_RATE;
    // Slow swell attack & release
    const attack = Math.min(1, t / 0.4);
    const release = Math.min(1, (durationSec - t) / 0.4);
    const env = attack * release;

    // Vibrato
    const vibrato = 1 + 0.004 * Math.sin(2 * Math.PI * 5 * t);
    const f = freq * vibrato;

    // Warm filtered sawtooth/triangle combination
    const s1 = Math.sin(2 * Math.PI * f * t);
    const s2 = 0.35 * Math.sin(2 * Math.PI * f * 2 * t);
    const s3 = 0.15 * Math.sin(2 * Math.PI * f * 3 * t);

    const sample = (s1 + s2 + s3) * env * velocity * 0.12;

    samplesL[i] += sample * 0.7;
    samplesR[i] += sample * 0.7;
  }
}

// Musical notes frequencies
const N = {
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, Fs3: 185.00, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, A5: 880.00, B5: 987.77,
  C6: 1046.50
};

// 1. GENERATE "ALL OF ME" (John Legend)
console.log('Generating "All of Me" audio track...');
const DURATION_ALL_OF_ME = 42; // 42 seconds high quality loop
const aomL = new Float32Array(SAMPLE_RATE * DURATION_ALL_OF_ME);
const aomR = new Float32Array(SAMPLE_RATE * DURATION_ALL_OF_ME);

// BPM 64 -> 1 beat = 60 / 64 = 0.9375s
const beat = 60 / 64;

// Progression: Em - C - G - D (4 beats each = 3.75s per chord)
const chordsAOM = [
  { root: N.E2, bass: N.E3, p1: N.G3, p2: N.B3, p3: N.E4 }, // Em
  { root: N.C2, bass: N.C3, p1: N.G3, p2: N.C4, p3: N.E4 }, // C
  { root: N.G2, bass: N.G3, p1: N.B3, p2: N.D4, p3: N.G4 }, // G
  { root: N.D2, bass: N.D3, p1: N.Fs3, p2: N.A3, p3: N.D4 }, // D
];

for (let bar = 0; bar < 11; bar++) {
  const chordIdx = bar % 4;
  const ch = chordsAOM[chordIdx];
  const t0 = bar * 4 * beat;

  if (t0 >= DURATION_ALL_OF_ME) break;

  // Strings pad
  addStringsPad(aomL, aomR, ch.root, t0, 4 * beat, 0.4);

  // Piano arpeggiated accompaniment
  addPianoNote(aomL, aomR, ch.root, t0, 3.5, 0.8, -0.4);
  addPianoNote(aomL, aomR, ch.bass, t0 + 0.05, 3.2, 0.75, -0.3);
  addPianoNote(aomL, aomR, ch.p1, t0 + beat * 0.5, 2.0, 0.6, 0.2);
  addPianoNote(aomL, aomR, ch.p2, t0 + beat * 1.0, 2.0, 0.65, 0.3);
  addPianoNote(aomL, aomR, ch.p3, t0 + beat * 1.5, 2.0, 0.6, 0.4);
  addPianoNote(aomL, aomR, ch.p2, t0 + beat * 2.0, 2.0, 0.6, 0.2);
  addPianoNote(aomL, aomR, ch.p1, t0 + beat * 2.5, 2.0, 0.6, 0.1);
  addPianoNote(aomL, aomR, ch.p3, t0 + beat * 3.0, 2.0, 0.65, 0.4);
}

// Melody: Iconic "All of Me" verse & chorus
const aomMelody: [number, number, number][] = [
  // Verse: "What would I do without your smart mouth..."
  [N.G4, 0 * beat + 1 * beat, 0.8],
  [N.G4, 0 * beat + 2 * beat, 0.8],
  [N.G4, 0 * beat + 2.75 * beat, 0.8],
  [N.G4, 0 * beat + 3.5 * beat, 0.8],
  [N.Fs4, 1 * beat + 0.5 * beat, 0.8],
  [N.G4, 1 * beat + 1.25 * beat, 0.8],
  [N.A4, 1 * beat + 2 * beat, 0.8],
  [N.B4, 1 * beat + 2.75 * beat, 1.0],
  [N.G4, 1 * beat + 3.5 * beat, 1.2],

  // "Drawing me in and you kicking me out..."
  [N.G4, 2 * beat + 1 * beat, 0.8],
  [N.G4, 2 * beat + 2 * beat, 0.8],
  [N.G4, 2 * beat + 2.75 * beat, 0.8],
  [N.G4, 2 * beat + 3.5 * beat, 0.8],
  [N.Fs4, 3 * beat + 0.5 * beat, 0.8],
  [N.G4, 3 * beat + 1.25 * beat, 0.8],
  [N.A4, 3 * beat + 2 * beat, 0.8],
  [N.B4, 3 * beat + 2.75 * beat, 1.0],
  [N.G4, 3 * beat + 3.5 * beat, 1.2],

  // Chorus: "Cause all of me loves all of you..."
  [N.B4, 4 * beat + 1 * beat, 0.8],
  [N.D5, 4 * beat + 2 * beat, 1.0],
  [N.C5, 4 * beat + 3 * beat, 0.9],
  [N.B4, 5 * beat + 0 * beat, 0.8],
  [N.A4, 5 * beat + 1 * beat, 0.8],
  [N.G4, 5 * beat + 2 * beat, 1.0],
  [N.E4, 5 * beat + 3 * beat, 1.2],

  // "Love your curves and all your edges..."
  [N.B4, 6 * beat + 1 * beat, 0.8],
  [N.D5, 6 * beat + 2 * beat, 1.0],
  [N.C5, 6 * beat + 3 * beat, 0.9],
  [N.B4, 7 * beat + 0 * beat, 0.8],
  [N.A4, 7 * beat + 1 * beat, 0.8],
  [N.G4, 7 * beat + 2 * beat, 1.0],
  [N.A4, 7 * beat + 3 * beat, 1.2],

  // "All your perfect imperfections..."
  [N.B4, 8 * beat + 0.5 * beat, 0.8],
  [N.D5, 8 * beat + 1.5 * beat, 0.9],
  [N.E5, 8 * beat + 2.5 * beat, 1.1],
  [N.D5, 8 * beat + 3.5 * beat, 0.9],
  [N.B4, 9 * beat + 0.5 * beat, 0.8],
  [N.A4, 9 * beat + 1.5 * beat, 0.8],
  [N.G4, 9 * beat + 2.5 * beat, 1.2],

  // "Give your all to me, I'll give my all to you..."
  [N.G4, 10 * beat + 0 * beat, 0.7],
  [N.A4, 10 * beat + 0.75 * beat, 0.8],
  [N.B4, 10 * beat + 1.5 * beat, 0.9],
  [N.D5, 10 * beat + 2.25 * beat, 1.0],
  [N.B4, 10 * beat + 3.0 * beat, 0.9],
  [N.A4, 10 * beat + 3.75 * beat, 1.2],
];

for (const [freq, startT, dur] of aomMelody) {
  if (startT + dur < DURATION_ALL_OF_ME) {
    addPianoNote(aomL, aomR, freq, startT, dur, 0.95, 0.1);
  }
}

applyReverb(aomL, aomR);

const aomBuffer = createWavBuffer(aomL, aomR);
fs.mkdirSync('public/audio', { recursive: true });
fs.writeFileSync('public/audio/all-of-me.wav', aomBuffer);
fs.writeFileSync('public/audio/all-of-me.mp3', aomBuffer); // Dual named for max compatibility
console.log('Saved public/audio/all-of-me.wav and .mp3 (' + (aomBuffer.length / 1024 / 1024).toFixed(2) + ' MB)');

// 2. GENERATE "A THOUSAND YEARS" (Christina Perri)
console.log('Generating "A Thousand Years" audio track...');
const DURATION_ATY = 44; // 44 seconds high quality loop
const atyL = new Float32Array(SAMPLE_RATE * DURATION_ATY);
const atyR = new Float32Array(SAMPLE_RATE * DURATION_ATY);

// 6/8 time @ 52 dotted-quarter BPM -> beat = 60 / (52 * 2) = 0.577s per 8th note
const atyBeat = 0.52;

// Progression: C - G/B - Am7 - F - C - G
const chordsATY = [
  { root: N.C2, bass: N.C3, p1: N.G3, p2: N.C4, p3: N.E4 }, // C
  { root: N.B1, bass: N.B2, p1: N.G3, p2: N.D4, p3: N.G4 }, // G/B
  { root: N.A1, bass: N.A2, p1: N.E3, p2: N.C4, p3: N.E4 }, // Am
  { root: N.F1, bass: N.F2, p1: N.C3, p2: N.A3, p3: N.C4 }, // F
  { root: N.C2, bass: N.C3, p1: N.G3, p2: N.C4, p3: N.E4 }, // C
  { root: N.G2, bass: N.G3, p1: N.B3, p2: N.D4, p3: N.G4 }, // G
];

for (let bar = 0; bar < 14; bar++) {
  const ch = chordsATY[bar % chordsATY.length];
  const t0 = bar * 6 * atyBeat;
  if (t0 >= DURATION_ATY) break;

  // Warm Cello strings pad
  addStringsPad(atyL, atyR, ch.root, t0, 6 * atyBeat, 0.45);

  // Flowing 6/8 piano arpeggio (1, 2, 3, 4, 5, 6)
  addPianoNote(atyL, atyR, ch.root, t0, 3.2, 0.85, -0.4);
  addPianoNote(atyL, atyR, ch.bass, t0 + 0.05, 3.0, 0.8, -0.3);
  addPianoNote(atyL, atyR, ch.p1, t0 + atyBeat * 1, 1.8, 0.6, 0.1);
  addPianoNote(atyL, atyR, ch.p2, t0 + atyBeat * 2, 1.8, 0.65, 0.2);
  addPianoNote(atyL, atyR, ch.p3, t0 + atyBeat * 3, 2.0, 0.7, 0.3);
  addPianoNote(atyL, atyR, ch.p2, t0 + atyBeat * 4, 1.8, 0.6, 0.2);
  addPianoNote(atyL, atyR, ch.p1, t0 + atyBeat * 5, 1.8, 0.6, 0.1);
}

// Melody: "Heart beats fast, colors and promises..."
const atyMelody: [number, number, number][] = [
  // "Heart beats fast..."
  [N.E4, 0 * atyBeat + 2 * atyBeat, 0.8],
  [N.G4, 0 * atyBeat + 3 * atyBeat, 0.8],
  [N.A4, 0 * atyBeat + 4 * atyBeat, 0.8],
  [N.G4, 0 * atyBeat + 5 * atyBeat, 1.0],

  // "Colors and promises..."
  [N.E4, 1 * atyBeat + 1 * atyBeat, 0.7],
  [N.D4, 1 * atyBeat + 2 * atyBeat, 0.7],
  [N.C4, 1 * atyBeat + 3 * atyBeat, 0.8],
  [N.D4, 1 * atyBeat + 4 * atyBeat, 0.8],
  [N.E4, 1 * atyBeat + 5 * atyBeat, 1.2],

  // "How to be brave..."
  [N.E4, 2 * atyBeat + 2 * atyBeat, 0.8],
  [N.G4, 2 * atyBeat + 3 * atyBeat, 0.8],
  [N.A4, 2 * atyBeat + 4 * atyBeat, 0.8],
  [N.G4, 2 * atyBeat + 5 * atyBeat, 1.0],

  // "How can I love when I'm afraid to fall..."
  [N.E4, 3 * atyBeat + 1 * atyBeat, 0.7],
  [N.D4, 3 * atyBeat + 2 * atyBeat, 0.7],
  [N.C4, 3 * atyBeat + 3 * atyBeat, 0.8],
  [N.D4, 3 * atyBeat + 4 * atyBeat, 0.8],
  [N.E4, 3 * atyBeat + 5 * atyBeat, 1.2],

  // "I have died every day waiting for you..."
  [N.E4, 4 * atyBeat + 3 * atyBeat, 0.7],
  [N.G4, 4 * atyBeat + 4 * atyBeat, 0.8],
  [N.G4, 4 * atyBeat + 5 * atyBeat, 0.8],
  [N.A4, 5 * atyBeat + 0 * atyBeat, 0.8],
  [N.B4, 5 * atyBeat + 1 * atyBeat, 0.9],
  [N.C5, 5 * atyBeat + 2 * atyBeat, 1.0],
  [N.B4, 5 * atyBeat + 3 * atyBeat, 0.9],
  [N.A4, 5 * atyBeat + 4 * atyBeat, 0.8],
  [N.G4, 5 * atyBeat + 5 * atyBeat, 1.2],

  // "Darling don't be afraid, I have loved you for a thousand years..."
  [N.E4, 6 * atyBeat + 2 * atyBeat, 0.8],
  [N.G4, 6 * atyBeat + 3 * atyBeat, 0.8],
  [N.A4, 6 * atyBeat + 4 * atyBeat, 0.9],
  [N.B4, 6 * atyBeat + 5 * atyBeat, 0.9],
  [N.C5, 7 * atyBeat + 0 * atyBeat, 1.0],
  [N.D5, 7 * atyBeat + 1 * atyBeat, 1.1],
  [N.C5, 7 * atyBeat + 2 * atyBeat, 0.9],
  [N.B4, 7 * atyBeat + 3 * atyBeat, 0.9],
  [N.A4, 7 * atyBeat + 4 * atyBeat, 0.8],
  [N.G4, 7 * atyBeat + 5 * atyBeat, 1.2],

  // "I'll love you for a thousand more..."
  [N.E4, 8 * atyBeat + 1 * atyBeat, 0.8],
  [N.F4, 8 * atyBeat + 2 * atyBeat, 0.8],
  [N.G4, 8 * atyBeat + 3 * atyBeat, 1.0],
  [N.E4, 8 * atyBeat + 4 * atyBeat, 0.9],
  [N.D4, 8 * atyBeat + 5 * atyBeat, 0.9],
  [N.C4, 9 * atyBeat + 0 * atyBeat, 1.5],
];

for (const [freq, startT, dur] of atyMelody) {
  if (startT + dur < DURATION_ATY) {
    addPianoNote(atyL, atyR, freq, startT, dur, 0.95, 0.1);
  }
}

applyReverb(atyL, atyR);

const atyBuffer = createWavBuffer(atyL, atyR);
fs.writeFileSync('public/audio/a-thousand-years.wav', atyBuffer);
fs.writeFileSync('public/audio/a-thousand-years.mp3', atyBuffer);
console.log('Saved public/audio/a-thousand-years.wav and .mp3 (' + (atyBuffer.length / 1024 / 1024).toFixed(2) + ' MB)');
console.log('Audio generation completed successfully!');

