import { useState } from 'react';
import { Dices, Plus, Minus } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { randomInt } from './util';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './DiceRoller.module.css';

type DieType = 4 | 6 | 8 | 10 | 12 | 20;
const DIE_TYPES: DieType[] = [4, 6, 8, 10, 12, 20];

interface DieResult {
  sides: DieType;
  value: number;
}

export function DiceRoller() {
  const [sides, setSides] = usePersistedState<DieType>('dice.sides', 6);
  const [count, setCount] = usePersistedState<number>('dice.count', 2);
  const [results, setResults] = useState<DieResult[]>([]);
  const [rolling, setRolling] = useState(false);

  function roll() {
    setRolling(true);
    // Animate by churning values briefly before settling
    const ticks = 8;
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setResults(
        Array.from({ length: count }, () => ({ sides, value: randomInt(sides) + 1 })),
      );
      if (i >= ticks) {
        window.clearInterval(id);
        setRolling(false);
      }
    }, 60);
  }

  const total = results.reduce((s, r) => s + r.value, 0);

  return (
    <ToolShell
      eyebrow="Randomisers"
      title="Dice Roller"
      description="Roll any combination of dice. Crypto-strong randomness."
    >
      <div className={styles.row}>
        {results.length === 0
          ? Array.from({ length: count }).map((_, i) => (
              <Die key={i} sides={sides} value={null} rolling={false} />
            ))
          : results.map((r, i) => (
              <Die key={i} sides={r.sides} value={r.value} rolling={rolling} />
            ))}
      </div>

      {results.length > 0 && (
        <div className={styles.total}>
          <span className={common.labelText}>Total</span>
          <span className={`font-display ${styles.totalNum}`}>{total}</span>
        </div>
      )}

      <div className={common.controlRow}>
        <button
          type="button"
          className={`${common.btn} ${common.btnPrimary}`}
          onClick={roll}
          disabled={rolling || count < 1}
        >
          <Dices size={14} /> Roll
        </button>
      </div>

      <section className={styles.controls}>
        <div className={styles.field}>
          <p className={common.labelText}>Die type</p>
          <div className={styles.dieRow}>
            {DIE_TYPES.map((d) => (
              <button
                key={d}
                type="button"
                className={`${common.btn} ${styles.dieBtn}`}
                data-active={d === sides}
                onClick={() => setSides(d)}
                disabled={rolling}
              >
                d{d}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.field}>
          <p className={common.labelText}>Quantity</p>
          <div className={styles.counter}>
            <button
              type="button"
              className={common.btn}
              onClick={() => setCount(Math.max(1, count - 1))}
              disabled={rolling || count <= 1}
            >
              <Minus size={14} />
            </button>
            <span className={styles.countNum}>{count}</span>
            <button
              type="button"
              className={common.btn}
              onClick={() => setCount(Math.min(20, count + 1))}
              disabled={rolling || count >= 20}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </section>
    </ToolShell>
  );
}

function Die({ sides, value, rolling }: { sides: DieType; value: number | null; rolling: boolean }) {
  return (
    <div className={styles.die} data-rolling={rolling}>
      <span className={styles.dieSides}>d{sides}</span>
      <span className={styles.dieValue}>{value ?? '—'}</span>
    </div>
  );
}
