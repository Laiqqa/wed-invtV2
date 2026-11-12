import fs from 'fs';

const SAMPLE_RATE = 44100;

function createWavBuffer(samplesLeft: Float32Array, samplesRight: Float32Array): Buffer {
  const numSamples = samplesLeft.length;
  const buffer = Buffer.alloc(44 + numSamples * 4);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 4, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(2, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 4, 28);
  buffer.writeUInt16LE(4, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 4, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
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

function applyReverb(samplesL: Float32Array, samplesR: Float32Array) {
  const delaySamples1 = Math.floor(SAMPLE_RATE * 0.05);
  const delaySamples2 = Math.floor(SAMPLE_RATE * 0.07);
  const feedback = 0.45;

  const outL = new Float32Array(samplesL.length);
  const outR = new Float32Array(samplesR.length);

  for (let i = 0; i < samplesL.length; i++) {
    const prev1 = i >= delaySamples1 ? outL[i - delaySamples1] * feedback : 0;
    const prev2 = i >= delaySamples2 ? outR[i - delaySamples2] * feedback : 0;

    outL[i] = samplesL[i] + prev1;
    outR[i] = samplesR[i] + prev2;
  }

  for (let i = 0; i < samplesL.length; i++) {
    samplesL[i] = samplesL[i] * 0.72 + outL[i] * 0.38;
    samplesR[i] = samplesR[i] * 0.72 + outR[i] * 0.38;
  }
}

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

  const leftGain = Math.cos(((pan + 1) * Math.PI) / 4) * velocity;
  const rightGain = Math.sin(((pan + 1) * Math.PI) / 4) * velocity;

  for (let i = startSample; i < endSample; i++) {
    const t = (i - startSample) / SAMPLE_RATE;
    const attack = Math.min(1, t / 0.008);
    const decay = Math.exp(-t * (1.6 + freq * 0.0014));
    const env = attack * decay;

    const h1 = Math.sin(2 * Math.PI * freq * t);
    const h2 = 0.48 * Math.sin(2 * Math.PI * freq * 2 * t) * Math.exp(-t * 2.2);
    const h3 = 0.24 * Math.sin(2 * Math.PI * freq * 3 * t) * Math.exp(-t * 3.8);
    const h4 = 0.12 * Math.sin(2 * Math.PI * freq * 4 * t) * Math.exp(-t * 5.5);
    const chorus = 0.16 * Math.sin(2 * Math.PI * (freq * 1.002) * t);

    const sample = (h1 + h2 + h3 + h4 + chorus) * env * 0.3;

    samplesL[i] += sample * leftGain;
    samplesR[i] += sample * rightGain;
  }
}

function addStringsPad(
  samplesL: Float32Array,
  samplesR: Float32Array,
  freq: number,
  startSec: number,
  durationSec: number,
  velocity: number = 0.38
) {
  const startSample = Math.floor(startSec * SAMPLE_RATE);
  const numSamples = Math.floor(durationSec * SAMPLE_RATE);
  const endSample = Math.min(samplesL.length, startSample + numSamples);

  for (let i = startSample; i < endSample; i++) {
    const t = (i - startSample) / SAMPLE_RATE;
    const attack = Math.min(1, t / 0.35);
    const release = Math.min(1, (durationSec - t) / 0.35);
    const env = attack * release;

    const vibrato = 1 + 0.004 * Math.sin(2 * Math.PI * 4.8 * t);
    const f = freq * vibrato;

    const s1 = Math.sin(2 * Math.PI * f * t);
    const s2 = 0.35 * Math.sin(2 * Math.PI * f * 2 * t);
    const s3 = 0.15 * Math.sin(2 * Math.PI * f * 3 * t);

    const sample = (s1 + s2 + s3) * env * velocity * 0.14;

    samplesL[i] += sample * 0.7;
    samplesR[i] += sample * 0.7;
  }
}

const N = {
  F1: 43.65, G1: 49.00, A1: 55.00, B1: 61.74,
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
};

console.log('Generating "Die With a Smile" (Lady Gaga & Bruno Mars)...');
const DURATION_DWAS = 44; // 44 seconds high fidelity loop
const dwasL = new Float32Array(SAMPLE_RATE * DURATION_DWAS);
const dwasR = new Float32Array(SAMPLE_RATE * DURATION_DWAS);

// BPM 78 -> beat = 60 / 78 = 0.769s
const beat = 60 / 78;

// Progression: Fmaj7 (F) -> G -> Em7 (E) -> Am7 (A)
const chordsDWAS = [
  { root: N.F2, bass: N.F3, p1: N.A3, p2: N.C4, p3: N.E4 }, // Fmaj7
  { root: N.G2, bass: N.G3, p1: N.B3, p2: N.D4, p3: N.G4 }, // G
  { root: N.E2, bass: N.E3, p1: N.G3, p2: N.B3, p3: N.E4 }, // Em7
  { root: N.A2, bass: N.A3, p1: N.C4, p2: N.E4, p3: N.G4 }, // Am7
  { root: N.F2, bass: N.F3, p1: N.A3, p2: N.C4, p3: N.E4 }, // Fmaj7
  { root: N.G2, bass: N.G3, p1: N.B3, p2: N.D4, p3: N.G4 }, // G
  { root: N.C2, bass: N.C3, p1: N.G3, p2: N.C4, p3: N.E4 }, // C
  { root: N.A2, bass: N.A3, p1: N.C4, p2: N.E4, p3: N.G4 }, // Am7
];

for (let bar = 0; bar < 11; bar++) {
  const ch = chordsDWAS[bar % chordsDWAS.length];
  const t0 = bar * 4 * beat;
  if (t0 >= DURATION_DWAS) break;

  addStringsPad(dwasL, dwasR, ch.root, t0, 4 * beat, 0.42);

  // Piano rhythm: Root on 1, chord on 1, 2, 3, 4 with syncopation
  addPianoNote(dwasL, dwasR, ch.root, t0, 3.2, 0.85, -0.4);
  addPianoNote(dwasL, dwasR, ch.bass, t0 + 0.04, 3.0, 0.8, -0.3);

  addPianoNote(dwasL, dwasR, ch.p1, t0 + beat * 0.5, 1.8, 0.65, 0.1);
  addPianoNote(dwasL, dwasR, ch.p2, t0 + beat * 1.0, 1.8, 0.7, 0.2);
  addPianoNote(dwasL, dwasR, ch.p3, t0 + beat * 1.5, 1.8, 0.7, 0.3);
  addPianoNote(dwasL, dwasR, ch.p2, t0 + beat * 2.0, 1.8, 0.65, 0.2);
  addPianoNote(dwasL, dwasR, ch.p1, t0 + beat * 2.5, 1.8, 0.65, 0.1);
  addPianoNote(dwasL, dwasR, ch.p3, t0 + beat * 3.0, 1.8, 0.75, 0.3);
  addPianoNote(dwasL, dwasR, ch.p2, t0 + beat * 3.5, 1.8, 0.65, 0.2);
}

// Melody: Iconic Chorus of "Die With a Smile"
// "If the world was ending, I'd wanna be next to you..."
const dwasMelody: [number, number, number][] = [
  // "If the world was ending..."
  [N.F4, 0 * beat + 1 * beat, 0.8],
  [N.G4, 0 * beat + 1.75 * beat, 0.8],
  [N.A4, 0 * beat + 2.5 * beat, 1.0],
  [N.G4, 0 * beat + 3.25 * beat, 0.9],
  [N.E4, 1 * beat + 0 * beat, 1.3],

  // "I'd wanna be next to you..."
  [N.D4, 1 * beat + 1.5 * beat, 0.8],
  [N.E4, 1 * beat + 2.25 * beat, 0.8],
  [N.F4, 1 * beat + 3.0 * beat, 0.9],
  [N.E4, 1 * beat + 3.5 * beat, 0.8],
  [N.C4, 2 * beat + 0 * beat, 1.4],

  // "If the party was over and our time on Earth was through..."
  [N.F4, 2 * beat + 1.5 * beat, 0.8],
  [N.G4, 2 * beat + 2.25 * beat, 0.8],
  [N.A4, 2 * beat + 3.0 * beat, 0.9],
  [N.B4, 2 * beat + 3.5 * beat, 0.9],
  [N.C5, 3 * beat + 0 * beat, 1.1],
  [N.B4, 3 * beat + 0.75 * beat, 0.9],
  [N.A4, 3 * beat + 1.5 * beat, 0.9],
  [N.G4, 3 * beat + 2.25 * beat, 0.9],
  [N.E4, 3 * beat + 3.0 * beat, 1.3],

  // "I'd wanna hold you just for a while and die with a smile..."
  [N.F4, 4 * beat + 0.5 * beat, 0.8],
  [N.G4, 4 * beat + 1.25 * beat, 0.8],
  [N.A4, 4 * beat + 2.0 * beat, 0.9],
  [N.B4, 4 * beat + 2.5 * beat, 0.9],
  [N.C5, 4 * beat + 3.0 * beat, 1.1],
  [N.B4, 5 * beat + 0 * beat, 0.9],
  [N.A4, 5 * beat + 0.75 * beat, 0.9],
  [N.G4, 5 * beat + 1.5 * beat, 0.9],
  [N.E4, 5 * beat + 2.25 * beat, 0.9],
  [N.D4, 5 * beat + 3.0 * beat, 0.9],
  [N.C4, 5 * beat + 3.5 * beat, 1.4],

  // "If the world was ending, I'd wanna be next to you..."
  [N.F4, 6 * beat + 1.0 * beat, 0.8],
  [N.G4, 6 * beat + 1.75 * beat, 0.8],
  [N.A4, 6 * beat + 2.5 * beat, 1.0],
  [N.G4, 6 * beat + 3.25 * beat, 0.9],
  [N.E4, 7 * beat + 0 * beat, 1.2],
  [N.D4, 7 * beat + 1.5 * beat, 0.8],
  [N.C4, 7 * beat + 2.25 * beat, 0.8],
  [N.D4, 7 * beat + 3.0 * beat, 0.9],
  [N.C4, 7 * beat + 3.75 * beat, 1.8],

  // Second cycle: Emotional Gaga / Bruno duet lift
  [N.F4, 8 * beat + 1.0 * beat, 0.8],
  [N.G4, 8 * beat + 1.75 * beat, 0.8],
  [N.A4, 8 * beat + 2.5 * beat, 1.0],
  [N.G4, 8 * beat + 3.25 * beat, 0.9],
  [N.E4, 9 * beat + 0 * beat, 1.3],
  [N.D4, 9 * beat + 1.5 * beat, 0.8],
  [N.E4, 9 * beat + 2.25 * beat, 0.8],
  [N.F4, 9 * beat + 3.0 * beat, 0.9],
  [N.E4, 9 * beat + 3.5 * beat, 0.8],
  [N.C4, 10 * beat + 0 * beat, 1.5],
];

for (const [freq, startT, dur] of dwasMelody) {
  if (startT + dur < DURATION_DWAS) {
    addPianoNote(dwasL, dwasR, freq, startT, dur, 0.95, 0.15);
  }
}

applyReverb(dwasL, dwasR);

const dwasBuffer = createWavBuffer(dwasL, dwasR);
fs.writeFileSync('public/audio/die-with-a-smile.wav', dwasBuffer);
fs.writeFileSync('public/audio/die-with-a-smile.mp3', dwasBuffer);
console.log('Saved public/audio/die-with-a-smile.wav and .mp3 (' + (dwasBuffer.length / 1024 / 1024).toFixed(2) + ' MB)');

