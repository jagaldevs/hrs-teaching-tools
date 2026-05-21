import { useState } from 'react';
import { Check, X as XIcon, ChevronRight, Lightbulb } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { MAP_AUSTRALIA, type MapItem } from '../data/banks/hass';
import { shuffle } from '../tools/rng/util';
import { chimeTick } from '../tools/chime';
import { AustraliaMap, type AusRegion } from './AustraliaMap';
import common from '../tools/common.module.css';
import styles from './MapPin.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Round {
  items: MapItem[];
}

export function MapPin() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupSelections | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<AusRegion | null>(null);
  const [score, setScore] = useState(0);
  const [hint, setHint] = useState(false);

  function start(sel: SetupSelections) {
    const items = shuffle(MAP_AUSTRALIA).slice(0, sel.count);
    setSetup(sel);
    setRound({ items });
    setIdx(0);
    setPicked(null);
    setScore(0);
    setHint(false);
    setPhase('playing');
  }

  function answer(region: AusRegion) {
    if (picked !== null || !round) return;
    setPicked(region);
    if (region === round.items[idx]!.region) {
      setScore((s) => s + (hint ? 0.5 : 1));
      chimeTick();
    }
  }

  function next() {
    if (!round) return;
    if (idx + 1 >= round.items.length) {
      setPhase('result');
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
      setHint(false);
    }
  }

  const current = round?.items[idx];
  const isCorrect = picked !== null && current && picked === current.region;

  return (
    <GameShell
      title="Map Pin"
      description="Click the state or territory that matches the prompt."
    >
      {phase === 'setup' && (
        <SetupScreen storageKey="mappin" showSubject={false} onStart={start} />
      )}

      {phase === 'playing' && current && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>{idx + 1} / {round!.items.length}</span>
            <span className={styles.chip}>Score · {score}</span>
            {hint && <span className={styles.chip}>Hint shown</span>}
          </div>

          <p className={`font-display ${styles.prompt}`}>{current.prompt}</p>

          <AustraliaMap
            highlighted={picked}
            correctRegion={picked !== null ? current.region : null}
            hint={hint ? current.region : null}
            onPick={answer}
            disabled={picked !== null}
          />

          <div className={common.controlRow}>
            {!hint && picked === null && current.hint && (
              <button type="button" className={common.btn} onClick={() => setHint(true)}>
                <Lightbulb size={14} /> Hint (½ point)
              </button>
            )}
            {picked !== null && (
              <button
                type="button"
                className={`${common.btn} ${common.btnPrimary}`}
                onClick={next}
                autoFocus
              >
                {idx + 1 >= round!.items.length ? 'See results' : 'Next prompt'}
                <ChevronRight size={14} />
              </button>
            )}
          </div>

          {picked !== null && (
            <div className={styles.feedback} data-correct={isCorrect}>
              {isCorrect ? <Check size={18} /> : <XIcon size={18} />}
              <span>
                {isCorrect ? 'Correct!' : `That was ${picked}. The answer was ${current.region}.`}
              </span>
              {current.hint && <span className={styles.fact}>{current.hint}</span>}
            </div>
          )}
        </div>
      )}

      {phase === 'result' && setup && (
        <ResultScreen
          score={Math.round(score * 10) / 10}
          total={setup.count}
          onPlayAgain={() => setPhase('setup')}
        />
      )}
    </GameShell>
  );
}
