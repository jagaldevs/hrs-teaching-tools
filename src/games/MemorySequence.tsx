import { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Trophy } from 'lucide-react';
import { GameShell } from './GameShell';
import { randomInt } from '../tools/rng/util';
import { chimeTick, chimeComplete } from '../tools/chime';
import common from '../tools/common.module.css';
import styles from './MemorySequence.module.css';

type Phase = 'idle' | 'showing' | 'awaiting' | 'gameover';

interface Tile {
  id: number;
  label: string;
  colour: string;
}

const TILES: Tile[] = [
  { id: 0, label: '●', colour: '#E6007E' },
  { id: 1, label: '■', colour: '#0EA5E9' },
  { id: 2, label: '▲', colour: '#10B981' },
  { id: 3, label: '★', colour: '#F59E0B' },
  { id: 4, label: '◆', colour: '#A855F7' },
  { id: 5, label: '✚', colour: '#EF4444' },
];

export function MemorySequence() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [sequence, setSequence] = useState<number[]>([]);
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [playerIdx, setPlayerIdx] = useState(0);
  const [round, setRound] = useState(0);
  const playTimerRef = useRef<number | null>(null);

  function clearTimers() {
    if (playTimerRef.current != null) {
      window.clearTimeout(playTimerRef.current);
      playTimerRef.current = null;
    }
  }

  const playSequence = useCallback((seq: number[]) => {
    setPhase('showing');
    setActiveTile(null);
    let i = 0;
    const tick = () => {
      if (i >= seq.length) {
        setActiveTile(null);
        setPhase('awaiting');
        setPlayerIdx(0);
        return;
      }
      setActiveTile(seq[i]!);
      chimeTick();
      playTimerRef.current = window.setTimeout(() => {
        setActiveTile(null);
        playTimerRef.current = window.setTimeout(() => {
          i++;
          tick();
        }, 180);
      }, 500);
    };
    tick();
  }, []);

  function start() {
    clearTimers();
    const first = [randomInt(TILES.length)];
    setSequence(first);
    setRound(1);
    setPhase('showing');
    window.setTimeout(() => playSequence(first), 400);
  }

  function press(id: number) {
    if (phase !== 'awaiting') return;
    const expected = sequence[playerIdx]!;
    if (id !== expected) {
      clearTimers();
      chimeComplete();
      setPhase('gameover');
      return;
    }
    setActiveTile(id);
    chimeTick();
    window.setTimeout(() => setActiveTile(null), 180);

    if (playerIdx + 1 === sequence.length) {
      // round won — extend
      const next = [...sequence, randomInt(TILES.length)];
      setSequence(next);
      setRound((r) => r + 1);
      setPhase('showing');
      window.setTimeout(() => playSequence(next), 700);
    } else {
      setPlayerIdx((i) => i + 1);
    }
  }

  useEffect(() => {
    return clearTimers;
  }, []);

  return (
    <GameShell
      title="Memory Sequence"
      description="Watch the sequence, then repeat it. Each correct round adds one more tile."
    >
      {(phase === 'idle' || phase === 'gameover') && (
        <div className={styles.startCard}>
          {phase === 'gameover' ? (
            <>
              <Trophy size={36} className={styles.trophy} />
              <p className="eyebrow">Round reached</p>
              <span className={`font-display ${styles.bigNum}`}>{round}</span>
            </>
          ) : (
            <>
              <p className="eyebrow">Ready?</p>
              <h2 className={`font-display ${styles.startTitle}`}>Watch the sequence</h2>
              <p className={styles.startNote}>
                Tiles will light up in order. Repeat the sequence in the same order to advance.
              </p>
            </>
          )}
          <button
            type="button"
            className={`${common.btn} ${common.btnPrimary}`}
            onClick={start}
          >
            <Play size={14} /> {phase === 'gameover' ? 'Play again' : 'Start'}
          </button>
        </div>
      )}

      {(phase === 'showing' || phase === 'awaiting') && (
        <>
          <div className={styles.statusRow}>
            <span className={styles.chip}>Round {round}</span>
            <span className={styles.chip} data-live={phase === 'showing'}>
              {phase === 'showing' ? 'Watching…' : 'Your turn'}
            </span>
          </div>
          <div className={styles.grid}>
            {TILES.map((t) => (
              <button
                key={t.id}
                type="button"
                className={styles.tile}
                style={{ background: t.colour }}
                data-active={activeTile === t.id}
                onClick={() => press(t.id)}
                disabled={phase !== 'awaiting'}
                aria-label={`Tile ${t.id + 1}`}
              >
                <span className={styles.glyph}>{t.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </GameShell>
  );
}
