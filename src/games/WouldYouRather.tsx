import { useState } from 'react';
import { ChevronRight, RotateCcw, Vote } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { WYR, type WouldYouRather as WYRItem } from '../data/banks/misc';
import { shuffle } from '../tools/rng/util';
import common from '../tools/common.module.css';
import styles from './WouldYouRather.module.css';

type Phase = 'setup' | 'playing';

interface Votes {
  a: number;
  b: number;
}

export function WouldYouRather() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [items, setItems] = useState<WYRItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [votes, setVotes] = useState<Votes>({ a: 0, b: 0 });
  const [revealed, setRevealed] = useState(false);

  const current = items[idx];
  const total = votes.a + votes.b;
  const pctA = total > 0 ? Math.round((votes.a / total) * 100) : 0;

  function start(sel: SetupSelections) {
    const picked = shuffle(WYR[sel.stream] ?? []).slice(0, sel.count);
    setItems(picked);
    setIdx(0);
    setVotes({ a: 0, b: 0 });
    setRevealed(false);
    setPhase('playing');
  }

  function tally(side: 'a' | 'b', delta = 1) {
    setVotes((v) => ({ ...v, [side]: Math.max(0, v[side] + delta) }));
  }

  function next() {
    if (idx + 1 >= items.length) {
      setPhase('setup');
      return;
    }
    setIdx((i) => i + 1);
    setVotes({ a: 0, b: 0 });
    setRevealed(false);
  }

  return (
    <GameShell
      title="Would You Rather"
      description="Class debates a dilemma. Tally votes with the buttons, reveal results to spark discussion."
    >
      {phase === 'setup' && (
        <SetupScreen storageKey="wyr" showSubject={false} onStart={start} />
      )}

      {phase === 'playing' && current && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>Dilemma {idx + 1} / {items.length}</span>
            {current.topic && <span className={styles.chip}>{current.topic}</span>}
          </div>

          <h2 className={`font-display ${styles.prompt}`}>Would you rather…</h2>

          <div className={styles.cards}>
            <div className={styles.card} data-side="a">
              <span className={styles.cardLetter}>A</span>
              <p className={`font-display ${styles.cardText}`}>{current.a}</p>
              <button type="button" className={`${common.btn} ${common.btnPrimary} ${styles.voteBtn}`} onClick={() => tally('a')}>
                <Vote size={14} /> Vote A
              </button>
              {revealed && (
                <>
                  <span className={styles.voteNum}>{votes.a}</span>
                  <span className={styles.votePct}>{pctA}%</span>
                </>
              )}
            </div>

            <div className={styles.vs}>or</div>

            <div className={styles.card} data-side="b">
              <span className={styles.cardLetter}>B</span>
              <p className={`font-display ${styles.cardText}`}>{current.b}</p>
              <button type="button" className={`${common.btn} ${common.btnPrimary} ${styles.voteBtn}`} onClick={() => tally('b')}>
                <Vote size={14} /> Vote B
              </button>
              {revealed && (
                <>
                  <span className={styles.voteNum}>{votes.b}</span>
                  <span className={styles.votePct}>{100 - pctA}%</span>
                </>
              )}
            </div>
          </div>

          {revealed && (
            <div className={styles.bar}>
              <div className={styles.barA} style={{ width: `${pctA}%` }} />
              <div className={styles.barB} style={{ width: `${100 - pctA}%` }} />
            </div>
          )}

          <div className={common.controlRow}>
            <button type="button" className={common.btn} onClick={() => setVotes({ a: 0, b: 0 })}>
              <RotateCcw size={14} /> Reset votes
            </button>
            <button type="button" className={common.btn} onClick={() => setRevealed(true)} disabled={total === 0 || revealed}>
              Reveal results
            </button>
            <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={next}>
              {idx + 1 >= items.length ? 'Finish' : 'Next dilemma'}
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </GameShell>
  );
}
