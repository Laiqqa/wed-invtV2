/**
 * Robust Hybrid Audio Engine
 * 1. Plays local/remote audio file (All of Me / A Thousand Years) with high-fidelity WAV/MP3.
 * 2. Unlocks AudioContext & HTMLAudioElement immediately upon user gesture.
 * 3. Gracefully falls back to high-fidelity acoustic Web Audio API synthesizer
 *    with recognizable melodies and rich chords if audio elements are restricted:
 *    - Side A: "All of Me" - John Legend (Em - C - G - D)
 *    - Side B: "A Thousand Years" - Christina Perri (C - G/B - Am7 - Fmaj7)
 */

type AudioSubscriber = (state: { isPlaying: boolean; trackId: string; volume: number }) => void;

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private audioElement: HTMLAudioElement | null = null;
  private isUsingAudioElement: boolean = false;
  private currentTrackId: string = 'song-die-with-a-smile';
  private volume: number = 0.75;
  private subscribers: Set<AudioSubscriber> = new Set();
  private hasUnlocked: boolean = false;

  constructor() {
    // Proactively attach user gesture unlock listeners
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.unlockContext();
        if (this.hasUnlocked) {
          window.removeEventListener('pointerdown', unlock);
          window.removeEventListener('keydown', unlock);
          window.removeEventListener('touchstart', unlock);
        }
      };
      window.addEventListener('pointerdown', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
      window.addEventListener('touchstart', unlock, { passive: true });
    }
  }

  public subscribe(cb: AudioSubscriber): () => void {
    this.subscribers.add(cb);
    cb({ isPlaying: this.isPlaying, trackId: this.currentTrackId, volume: this.volume });
    return () => {
      this.subscribers.delete(cb);
    };
  }

  private notify() {
    for (const cb of this.subscribers) {
      cb({ isPlaying: this.isPlaying, trackId: this.currentTrackId, volume: this.volume });
    }
  }

  public unlockContext() {
    try {
      this.initContext();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.hasUnlocked = true;
    } catch {
      // Ignore
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Sound effect: Wax seal snap / paper unfold
   */
  public playWaxSealSnap() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.16);

      gain.gain.setValueAtTime(0.55 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.17);
    } catch {
      // AudioContext policy
    }
  }

  /**
   * Sound effect: Vinyl needle drop and subtle crackle
   */
  public playNeedleDrop() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.15);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
    } catch {
      // Ignore
    }
  }

  /**
   * Start music with support for audio files or romantic acoustic synthesizer
   */
  public startMusic(audioSrc?: string, trackId: string = 'song-die-with-a-smile') {
    this.unlockContext();
    this.currentTrackId = trackId;

    // Stop any active synth before starting new playback
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    }

    // Check if an audio file is specified
    if (audioSrc) {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      }

      const audio = new Audio();
      audio.src = audioSrc;
      audio.loop = true;
      audio.volume = this.volume;
      this.audioElement = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.isUsingAudioElement = true;
            this.notify();
          })
          .catch((err) => {
            console.warn('Audio playback fallback to synth:', err);
            // Fall back immediately to Web Audio synth
            this.isUsingAudioElement = false;
            this.startSynth();
          });
      }
      return;
    }

    this.startSynth();
  }

  /**
   * Full acoustic grand piano & warm strings synthesizer fallback
   */
  private startSynth() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;
    this.isUsingAudioElement = false;

    // Smooth audible volume
    this.masterGain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.8);

    this.currentStep = 0;
    this.scheduleNotes();
    this.notify();
  }

  // Musical note table (frequencies in Hz)
  private readonly notes: Record<string, number> = {
    F1: 43.65, G1: 49.00, A1: 55.00, B1: 61.74,
    C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
    C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, Fs3: 185.00, G3: 196.00, A3: 220.00, B3: 246.94,
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.00, A4: 440.00, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, A5: 880.00, B5: 987.77,
  };

  // Polyphonic pattern sequences: [Chords], [Melody Notes]
  private scheduleNotes = () => {
    if (!this.isPlaying || !this.ctx || !this.masterGain || this.isUsingAudioElement) return;

    const isDieWithASmile = this.currentTrackId === 'song-die-with-a-smile';

    // "Die With a Smile" - Lady Gaga & Bruno Mars (Fmaj7 - G - Em7 - Am7)
    const chordProgressionDieWithASmile = [
      { bass: this.notes.F2, chord: [this.notes.A3, this.notes.C4, this.notes.E4], mel: this.notes.F4 },
      { bass: this.notes.G2, chord: [this.notes.B3, this.notes.D4, this.notes.G4], mel: this.notes.G4 },
      { bass: this.notes.E2, chord: [this.notes.G3, this.notes.B3, this.notes.E4], mel: this.notes.A4 },
      { bass: this.notes.A2, chord: [this.notes.C4, this.notes.E4, this.notes.G4], mel: this.notes.G4 },
      { bass: this.notes.F2, chord: [this.notes.A3, this.notes.C4, this.notes.E4], mel: this.notes.E4 },
      { bass: this.notes.G2, chord: [this.notes.B3, this.notes.D4, this.notes.G4], mel: this.notes.D4 },
      { bass: this.notes.C2, chord: [this.notes.G3, this.notes.C4, this.notes.E4], mel: this.notes.C4 },
      { bass: this.notes.A2, chord: [this.notes.C4, this.notes.E4, this.notes.G4], mel: this.notes.C5 },
    ];

    // "A Thousand Years" - Christina Perri
    const chordProgressionAThousandYears = [
      { bass: this.notes.C3, chord: [this.notes.G3, this.notes.C4, this.notes.E4], mel: this.notes.E4 },
      { bass: this.notes.B2, chord: [this.notes.G3, this.notes.D4, this.notes.G4], mel: this.notes.G4 },
      { bass: this.notes.A2, chord: [this.notes.E3, this.notes.C4, this.notes.E4], mel: this.notes.A4 },
      { bass: this.notes.G2, chord: [this.notes.D3, this.notes.B3, this.notes.D4], mel: this.notes.G4 },
      { bass: this.notes.C3, chord: [this.notes.G3, this.notes.C4, this.notes.E4], mel: this.notes.C5 },
      { bass: this.notes.B2, chord: [this.notes.G3, this.notes.D4, this.notes.G4], mel: this.notes.B4 },
      { bass: this.notes.A2, chord: [this.notes.E3, this.notes.C4, this.notes.E4], mel: this.notes.A4 },
      { bass: this.notes.G2, chord: [this.notes.D3, this.notes.B3, this.notes.D4], mel: this.notes.G4 },
    ];

    const currentSequence = isDieWithASmile ? chordProgressionDieWithASmile : chordProgressionAThousandYears;
    const step = currentSequence[this.currentStep % currentSequence.length];

    const now = this.ctx.currentTime;

    // 1. Play Bass Note (Warm fundamental + second harmonic)
    this.playTone(step.bass, now, 1.8, 0.45, 'triangle');

    // 2. Play Arpeggiated Chord
    step.chord.forEach((note, idx) => {
      this.playTone(note, now + idx * 0.12, 1.4, 0.35, 'sine');
    });

    // 3. Play Clear Singing Lead Melody
    this.playTone(step.mel, now + 0.18, 1.6, 0.55, 'triangle');

    this.currentStep++;
    const stepDelay = isDieWithASmile ? 760 : 850;
    this.timerId = window.setTimeout(this.scheduleNotes, stepDelay);
  };

  private playTone(freq: number, startTime: number, duration: number, gainLevel: number, type: OscillatorType) {
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const overtone = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(freq * 2, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, startTime);

      // Natural acoustic piano ADSR envelope
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(gainLevel * this.volume, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(filter);
      overtone.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      overtone.start(startTime);
      osc.stop(startTime + duration + 0.05);
      overtone.stop(startTime + duration + 0.05);
    } catch {
      // Ignore
    }
  }

  /**
   * Stop music
   */
  public stopMusic() {
    this.isPlaying = false;

    if (this.audioElement) {
      this.audioElement.pause();
    }

    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
    }

    this.notify();
  }

  public toggleMusic(audioSrc?: string, trackId?: string): boolean {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic(audioSrc, trackId || this.currentTrackId);
      return true;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrackId(): string {
    return this.currentTrackId;
  }
}

export const soundEngine = new AudioEngine();
