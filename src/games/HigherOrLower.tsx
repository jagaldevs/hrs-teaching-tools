import { useState } from 'react';
import { ArrowUp, ArrowDown, Check, X as XIcon, RotateCcw } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { HOL_BANK } from '../data/banks/higherOrLower';
import { pickFromBank } from './bankUtils';
import type { HoLItem } from './types';
import common from '../tools/common.module.css';
import styles from './HigherOrLower.module.css';

type Phase = 'setup' | 'playing' | 'gameover';

interface Round {
  items: HoLItem[];
}

function formatValue(item: HoLItem, hidden: boolean): string {
  if (hidden) return '?';
  const v = item.value;
  const formatted = v >= 1000 ? v.toLocaleString() : `${v}`;
  return item.unit ? `${formatted} ${item.unit}` : formatted;
}

export function HigherOrLower() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [round, setRound] = useState<Round | null>(null);
  const [position, setPosition] = useState(0); // index of the "anchor" item; next is position+1
  const [score, setScore] = useState(0);
  const [revealedNext, setRevealedNext] = useState(false);
  const [lastChoice, setLastChoice] = useState<'higher' | 'lower' | null>(null);

  function start(sel: SetupSelections) {
    // HoL bank is subject-keyed (general / maths / history / geography / science).
    // 'mix' draws across all subjects for a varied chain; selecting a single
    // subject narrows the round to that domain (e.g. all history years).
    const pulled = pickFromBank(HOL_BANK, sel.stream, sel.subject, Math.max(15, sel.count + 5));
    if (pulled.items.length < 2) return;
    setRound({ items: pulled.items });
    setPosition(0);
    setScore(0);
    setRevealedNext(false);
    setLastChoice(null);
    setPhase('playing');
  }

  function guess(direction: 'higher' | 'lower') {
    if (!round || revealedNext) return;
    setLastChoice(direction);
    setRevealedNext(true);
    const a = round.items[position]!.value;
    const b = round.items[position + 1]!.value;
    const correct = direction === 'higher' ? b > a : b < a;
    if (correct) setScore((s) => s + 1);
  }

  function continueChain() {
    if (!round) return;
    const wasCorrect =
      lastChoice === 'higher'
        ? round.items[position + 1]!.value > round.items[position]!.value
        : round.items[position + 1]!.value < round.items[position]!.value;

    if (!wasCorrect) {
      setPhase('gameover');
      return;
    }

    // Slide forward; if we run out of items, just end on a high note
    if (position + 2 >= round.items.length) {
      setPhase('gameover');
      return;
    }
    setPosition((p) => p + 1);
    setRevealedNext(false);
    setLastChoice(null);
  }

  return (
    <GameShell
      title="Higher or Lower"
      description="Will the next value be higher or lower? Chain correct guesses for the high score."
    >
      {phase === 'setup' && (
        <SetupScreen
          storageKey="higherlower"
          countOptions={[10, 15, 20]}
          onStart={start}
        />
      )}

      {phase === 'playing' && round && (
        <PlayingArea
          anchor={round.items[position]!}
          next={round.items[position + 1]!}
          revealed={revealedNext}
          choice={lastChoice}
          score={score}
          chain={position + 1}
          onGuess={guess}
          onContinue={continueChain}
        />
      )}

      {phase === 'gameover' && (
        <ResultScreen
          score={score}
          // Total = how far you got in the chain (correct streak + the one that ended it,
          // or the full chain if the run completed without a wrong answer).
          total={Math.max(score + 1, round ? round.items.length - 1 : score + 1)}
          onPlayAgain={() => setPhase('setup')}
          breakdown={[
            { label: 'Streak', value: score },
            { label: 'Longest possible (this round)', value: round ? round.items.length - 1 : 0 },
          ]}
        />
      )}
    </GameShell>
  );
}

interface PlayingProps {
  anchor: HoLItem;
  next: HoLItem;
  revealed: boolean;
  choice: 'higher' | 'lower' | null;
  score: number;
  chain: number;
  onGuess: (d: 'higher' | 'lower') => void;
  onContinue: () => void;
}

function PlayingArea({ anchor, next, revealed, choice, score, chain, onGuess, onContinue }: PlayingProps) {
  const wasCorrect =
    revealed &&
    (choice === 'higher' ? next.value > anchor.value : choice === 'lower' ? next.value < anchor.value : false);

  return (
    <div className={styles.playing}>
      <div className={styles.header}>
        <span className={styles.scoreBadge}>Streak · {score}</span>
        <span className={styles.scoreBadge}>Round {chain}</span>
      </div>

      <div className={styles.cards}>
        <div className={styles.card} data-role="anchor">
          <span className={styles.cardLabel}>{anchor.label}</span>
          <span className={`font-display ${styles.cardValue}`}>{formatValue(anchor, false)}</span>
          {anchor.context && <span className={styles.cardContext}>{anchor.context}</span>}
        </div>

        <div className={styles.vs}>vs</div>

        <div
          className={styles.card}
          data-role="next"
          data-revealed={revealed}
          data-correct={wasCorrect}
        >
          <span className={styles.cardLabel}>{next.label}</span>
          <span className={`font-display ${styles.cardValue}`}>
            {formatValue(next, !revealed)}
          </span>
          {revealed && next.context && <span className={styles.cardContext}>{next.context}</span>}
        </div>
      </div>

      {!revealed ? (
        <div className={styles.choiceRow}>
          <button
            type="button"
            className={`${common.btn} ${styles.choiceBtn}`}
            onClick={() => onGuess('higher')}
          >
            <ArrowUp size={20} /> Higher
          </button>
          <button
            type="button"
            className={`${common.btn} ${styles.choiceBtn}`}
            onClick={() => onGuess('lower')}
          >
            <ArrowDown size={20} /> Lower
          </button>
        </div>
      ) : (
        <div className={styles.feedback} data-correct={wasCorrect}>
          {wasCorrect ? <Check size={18} /> : <XIcon size={18} />}
          <span>{wasCorrect ? 'Correct — keep going!' : `Game over. Your streak: ${score}.`}</span>
          <button
            type="button"
            className={`${common.btn} ${common.btnPrimary} ${styles.nextBtn}`}
            onClick={onContinue}
            autoFocus
          >
            {wasCorrect ? 'Next round' : <>
              <RotateCcw size={14} /> See results
            </>}
          </button>
        </div>
      )}
    </div>
  );
}
