/**
 * Audio chime utility — single shared AudioContext.
 * No dependency on external audio files; synthesised so it works offline.
 */

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (ctx) return ctx;
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();
    return ctx;
  } catch {
    return null;
  }
}

interface Tone {
  freq: number;
  durationMs: number;
  startOffsetMs?: number;
  type?: OscillatorType;
  gain?: number;
}

function playTone(tone: Tone) {
  const audio = getContext();
  if (!audio) return;
  if (audio.state === 'suspended') audio.resume().catch(() => {});

  const now = audio.currentTime + (tone.startOffsetMs ?? 0) / 1000;
  const osc = audio.createOscillator();
  const gain = audio.createGain();

  osc.type = tone.type ?? 'sine';
  osc.frequency.setValueAtTime(tone.freq, now);

  const peak = tone.gain ?? 0.18;
  const dur = tone.durationMs / 1000;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(peak, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

  osc.connect(gain).connect(audio.destination);
  osc.start(now);
  osc.stop(now + dur + 0.02);
}

/** Single soft "ding" — useful as a generic notification. */
export function chime() {
  playTone({ freq: 880, durationMs: 600, type: 'sine' });
  playTone({ freq: 1320, durationMs: 600, startOffsetMs: 60, type: 'sine', gain: 0.12 });
}

/** Two ascending notes — countdown finished. */
export function chimeComplete() {
  playTone({ freq: 660, durationMs: 220, type: 'sine' });
  playTone({ freq: 990, durationMs: 500, startOffsetMs: 180, type: 'sine' });
}

/** Three quick chirps — lesson stage transitioning. */
export function chimeTransition() {
  playTone({ freq: 1100, durationMs: 120, type: 'triangle', gain: 0.14 });
  playTone({ freq: 1100, durationMs: 120, startOffsetMs: 160, type: 'triangle', gain: 0.14 });
  playTone({ freq: 1320, durationMs: 220, startOffsetMs: 320, type: 'triangle', gain: 0.16 });
}

/** Single short blip — soft "warning" (e.g. 5 minutes remaining). */
export function chimeWarning() {
  playTone({ freq: 520, durationMs: 200, type: 'square', gain: 0.1 });
}

/** Short tick — for stopwatch laps. */
export function chimeTick() {
  playTone({ freq: 1500, durationMs: 60, type: 'square', gain: 0.08 });
}
