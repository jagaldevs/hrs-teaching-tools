import { useState } from 'react';
import { CircleDollarSign, RotateCcw } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { randomInt } from './util';
import common from '../common.module.css';
import styles from './FlipCoin.module.css';

type Side = 'heads' | 'tails';

export function FlipCoin() {
  const [result, setResult] = useState<Side | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [tally, setTally] = useState({ heads: 0, tails: 0 });
  const [flips, setFlips] = useState(0);

  function flip() {
    setFlipping(true);
    setResult(null);
    window.setTimeout(() => {
      const r: Side = randomInt(2) === 0 ? 'heads' : 'tails';
      setResult(r);
      setFlipping(false);
      setTally((t) => ({ ...t, [r]: t[r] + 1 }));
      setFlips((n) => n + 1);
    }, 1100);
  }

  function reset() {
    setResult(null);
    setTally({ heads: 0, tails: 0 });
    setFlips(0);
  }

  const headsPct = flips > 0 ? Math.round((tally.heads / flips) * 100) : 0;

  return (
    <ToolShell
      eyebrow="Randomisers"
      title="Flip Coin"
      description="Animated flip with tally over multiple flips — useful for probability lessons."
    >
      <div className={styles.coin} data-flipping={flipping} data-side={result ?? 'heads'}>
        <div className={`${styles.face} ${styles.heads}`}>H</div>
        <div className={`${styles.face} ${styles.tails}`}>T</div>
      </div>

      <p className={styles.result}>
        {flipping ? '…' : result ? (result === 'heads' ? 'Heads' : 'Tails') : 'Press flip to begin'}
      </p>

      <div className={common.controlRow}>
        <button
          type="button"
          className={`${common.btn} ${common.btnPrimary}`}
          onClick={flip}
          disabled={flipping}
        >
          <CircleDollarSign size={14} /> Flip
        </button>
        <button type="button" className={common.btn} onClick={reset} disabled={flipping}>
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {flips > 0 && (
        <div className={styles.tally}>
          <div className={styles.tallyRow}>
            <span className={common.labelText}>Heads</span>
            <span className={styles.tallyNum}>{tally.heads}</span>
            <span className={styles.tallyPct}>{headsPct}%</span>
          </div>
          <div className={styles.tallyBar}>
            <div className={styles.tallyFill} style={{ width: `${headsPct}%` }} />
          </div>
          <div className={styles.tallyRow}>
            <span className={common.labelText}>Tails</span>
            <span className={styles.tallyNum}>{tally.tails}</span>
            <span className={styles.tallyPct}>{100 - headsPct}%</span>
          </div>
          <p className={styles.tallyTotal}>Total flips: {flips}</p>
        </div>
      )}
    </ToolShell>
  );
}
