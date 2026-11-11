/**
 * Robust Hybrid Audio Engine
 * 1. Plays local/remote audio file (All of Me / A Thousand Years) if placed in public/audio.
 * 2. Gracefully falls back to high-fidelity acoustic Web Audio API synthesizer
 *    tuned with the iconic chord progressions:
 *    - Side A: "All of Me" - John Legend (Em - C - G - D)
 *    - Side B: "A Thousand Years" - Christina Perri (C - G/B - Am7 - Fmaj7)
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private audioElement: HTMLAudioElement | null = null;
  private isUsingAudioElement: boolean = false;
  private currentTrackId: string = 'song-all-of-me';

  // Iconic chord progressions
  private songChords: Record<string, number[][]> = {
    // "All of Me" - John Legend (Em - C - G - D)
    'song-all-of-me': [
      [164.81, 196.00, 246.94, 329.63, 392.00], // Em
      [130.81, 196.00, 261.63, 329.63, 392.00], // C
      [196.00, 246.94, 293.66, 392.00, 493.88], // G
      [146.83, 220.00, 293.66, 369.99, 440.00], // D
    ],
    // "A Thousand Years" - Christina Perri (C - G/B - Am7 - Fmaj7)
    'song-a-thousand-years': [
      [130.81, 196.00, 261.63, 329.63, 523.25], // C
      [123.47, 196.00, 246.94, 293.66, 392.00], // G/B
      [110.00, 164.81, 220.00, 261.63, 329.63], // Am7
      [174.61, 220.00, 261.63, 349.23, 440.00], // Fmaj7
    ],
  };

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
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
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);

      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.16);
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
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1100;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

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
  public startMusic(audioSrc?: string, trackId: string = 'song-all-of-me') {
    if (this.isPlaying) return;
    this.playNeedleDrop();
    this.isPlaying = true;
    this.currentTrackId = trackId;

    // Check if an audio file is specified and playable
    if (audioSrc) {
      if (this.audioElement) {
        this.audioElement.pause();
      }
      this.audioElement = new Audio(audioSrc);
      this.audioElement.loop = true;
      this.audioElement.volume = 0.55;

      this.audioElement.addEventListener('error', () => {
        // Fall back to synth if file not found
        this.isUsingAudioElement = false;
        this.startSynth();
      });

      this.audioElement.play()
        .then(() => {
          this.isUsingAudioElement = true;
        })
        .catch(() => {
          // Fall back to synth on policy or 404
          this.isUsingAudioElement = false;
          this.startSynth();
        });
      return;
    }

    this.startSynth();
  }

  private startSynth() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    // Smooth fade in
    this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.24, this.ctx.currentTime + 1.6);

    this.currentStep = 0;
    this.scheduleNotes();
  }

  private scheduleNotes = () => {
    if (!this.isPlaying || !this.ctx || !this.masterGain || this.isUsingAudioElement) return;

    const chords = this.songChords[this.currentTrackId] || this.songChords['song-all-of-me'];
    const chord = chords[Math.floor(this.currentStep / 4) % chords.length];
    const noteFreq = chord[this.currentStep % chord.length];

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm grand piano / Rhodes acoustic timbre
    osc.type = 'sine';
    osc.frequency.setValueAtTime(noteFreq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, now);

    // Flowing piano / acoustic envelope
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.2, now + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + 1.35);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.4);

    this.currentStep++;
    this.timerId = window.setTimeout(this.scheduleNotes, 520);
  };

  /**
   * Stop music
   */
  public stopMusic() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.audioElement && this.isUsingAudioElement) {
      this.audioElement.pause();
    }

    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
    }
  }

  public toggleMusic(audioSrc?: string, trackId?: string): boolean {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic(audioSrc, trackId);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const soundEngine = new AudioEngine();
