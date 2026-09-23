/**
 * Audio Player utility supporting both custom user-uploaded audio files
 * and an ultra-sweet Web Audio API romantic piano/music-box chime synthesizer.
 */

class RomanticAudioController {
  private audioEl: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private synthGainNode: GainNode | null = null;
  private isSynthPlaying = false;
  private synthInterval: number | null = null;
  private volume = 0.7;
  private currentTrack = 'preset:romantic-piano';
  private onStateChangeListeners: Array<(isPlaying: boolean) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioEl = new Audio();
      this.audioEl.loop = true;
      this.audioEl.volume = this.volume;
      this.audioEl.addEventListener('play', () => this.notifyListeners(true));
      this.audioEl.addEventListener('pause', () => this.notifyListeners(false));
      this.audioEl.addEventListener('ended', () => this.notifyListeners(false));
    }
  }

  public subscribe(cb: (isPlaying: boolean) => void) {
    this.onStateChangeListeners.push(cb);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter(l => l !== cb);
    };
  }

  private notifyListeners(isPlaying: boolean) {
    this.onStateChangeListeners.forEach(cb => cb(isPlaying));
  }

  public setTrack(trackSource: string) {
    this.currentTrack = trackSource;
    if (this.isPlaying()) {
      this.stop();
      this.play();
    }
  }

  public isPlaying(): boolean {
    if (this.currentTrack.startsWith('preset:')) {
      return this.isSynthPlaying;
    }
    return !!(this.audioEl && !this.audioEl.paused && !this.audioEl.ended);
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioEl) {
      this.audioEl.volume = this.volume;
    }
    if (this.synthGainNode) {
      this.synthGainNode.gain.setValueAtTime(this.volume * 0.25, this.audioCtx?.currentTime || 0);
    }
  }

  public play() {
    if (this.currentTrack.startsWith('preset:')) {
      this.playSynthMelody();
    } else if (this.audioEl) {
      this.stopSynth();
      if (this.audioEl.src !== this.currentTrack) {
        this.audioEl.src = this.currentTrack;
      }
      this.audioEl.volume = this.volume;
      this.audioEl.play().catch(() => {
        // Fallback to synth if audio cannot be decoded
        this.playSynthMelody();
      });
    }
  }

  public pause() {
    if (this.currentTrack.startsWith('preset:')) {
      this.stopSynth();
    } else if (this.audioEl) {
      this.audioEl.pause();
    }
    this.notifyListeners(false);
  }

  public stop() {
    this.pause();
  }

  private playSynthMelody() {
    if (this.isSynthPlaying) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioCtxClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.synthGainNode = this.audioCtx.createGain();
      this.synthGainNode.gain.value = this.volume * 0.25;
      this.synthGainNode.connect(this.audioCtx.destination);

      this.isSynthPlaying = true;
      this.notifyListeners(true);

      // Sweet romantic lullaby chord notes (Hz)
      // Cmaj7 -> G -> Am7 -> Fadd9
      const melodyNotes = [
        261.63, 329.63, 392.00, 493.88, 523.25, // C4, E4, G4, B4, C5
        392.00, 329.63, 293.66, 392.00, 440.00, // G4, E4, D4, G4, A4
        220.00, 261.63, 329.63, 440.00, 523.25, // A3, C4, E4, A4, C5
        174.61, 261.63, 329.63, 392.00, 440.00  // F3, C4, E4, G4, A4
      ];

      let noteIdx = 0;
      const playNextNote = () => {
        if (!this.isSynthPlaying || !this.audioCtx || !this.synthGainNode) return;

        const osc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();

        // Music box / soft chime timbre
        osc.type = noteIdx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(melodyNotes[noteIdx % melodyNotes.length], this.audioCtx.currentTime);

        noteGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.3, this.audioCtx.currentTime + 0.04);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.2);

        osc.connect(noteGain);
        noteGain.connect(this.synthGainNode);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 1.3);

        noteIdx++;
      };

      playNextNote();
      this.synthInterval = window.setInterval(playNextNote, 600);
    } catch {
      this.isSynthPlaying = false;
      this.notifyListeners(false);
    }
  }

  private stopSynth() {
    this.isSynthPlaying = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.notifyListeners(false);
  }
}

export const romanticAudio = new RomanticAudioController();

export interface MusicPreset {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  url: string;
}

export const MUSIC_PRESETS: MusicPreset[] = [
  {
    id: 'preset:romantic-piano',
    name: 'Romantic Piano Chimes',
    desc: 'Sweet, delicate acoustic chime chords playing a dreamy lullaby.',
    emoji: '🎹',
    url: 'preset:romantic-piano'
  },
  {
    id: 'preset:warm-acoustic',
    name: 'Golden Hour Harmony',
    desc: 'Warm acoustic vibration and soft nostalgic frequencies.',
    emoji: '✨',
    url: 'preset:romantic-piano'
  },
  {
    id: 'preset:gentle-musicbox',
    name: 'Music Box Fairytale',
    desc: 'Vintage winding music box melody carrying pure tenderness.',
    emoji: '🧸',
    url: 'preset:romantic-piano'
  },
  {
    id: 'preset:candlelight',
    name: 'Candlelight Serenade',
    desc: 'Slow, intimate nighttime melody built for holding hands.',
    emoji: '🕯️',
    url: 'preset:romantic-piano'
  }
];
