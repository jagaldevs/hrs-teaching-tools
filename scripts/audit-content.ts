/**
 * Content rigour audit — the onboard-class SKILL's rigour rules as one command.
 *
 *   npm run audit:content                      # every bank
 *   npm run audit:content -- --class y8-humanities
 *   npm run audit:content -- --strict          # exit 1 on any finding
 *
 * Heuristics, not hard rules: each finding needs a human look (a correct
 * answer of "Only the class that declares it" is legitimate). Structural
 * problems — bad indexes, duplicate ids/choices — are `npm test`'s job.
 *
 * Checks
 *   MCQ  only-just   a distractor starts "Only …"/"Just …" (the tell is
 *                    that the one comprehensive option is right)
 *   MCQ  em-dash     only the correct option carries an " — " gloss
 *   MCQ  length      correct option > 2.5× the longest distractor
 *   MCQ  dup-stem    the same question text twice in one pool
 *   TL   absolute    the lie uses always/never/only/all/every/none and
 *                    neither truth does
 *   all  positional  an explanation refers to option order ("respectively",
 *                    "statement 2", "option B") — the games shuffle options
 *                    at round start, so those references will be wrong
 *
 * Answer *position* in the data no longer matters (see shuffleOptions in
 * src/games/bankUtils.ts), so there's no position-balance check.
 */
import { MCQ_BANK } from '../src/data/banks/mcq';
import { ODD_BANK } from '../src/data/banks/oddOneOut';
import { TRUTHS, type TruthsLieItem } from '../src/data/banks/misc';
import type { Bank, MCQ } from '../src/games/types';

const args = process.argv.slice(2);
const onlyClass = args.includes('--class') ? args[args.indexOf('--class') + 1] : undefined;
const strict = args.includes('--strict');

const LENGTH_RATIO = 2.5;
const ABSOLUTE = /\b(always|never|only|all|every|none|no one|nobody)\b/i;
const POSITIONAL =
  /\b(respectively|(option|choice|answer|statement) [a-d1-4]\b|(first|second|third|fourth|last) (option|choice|statement))/i;

interface Finding { pool: string; id: string; check: string; detail: string }
const findings: Finding[] = [];

/** Named pools: one per anchored class, one per generic stream × subject. */
function pools<Q>(bank: Bank<Q>): [string, Q[]][] {
  const out: [string, Q[]][] = Object.entries(bank.byClass ?? {}).map(([k, v]) => [k, v ?? []]);
  for (const [stream, bySubject] of Object.entries(bank.byStreamSubject))
    for (const [subject, list] of Object.entries(bySubject ?? {})) out.push([`${stream}/${subject}`, list ?? []]);
  return onlyClass ? out.filter(([name]) => name === onlyClass) : out;
}

function checkExplanation(pool: string, id: string, explanation: string | undefined) {
  const m = explanation?.match(POSITIONAL);
  if (m) findings.push({ pool, id, check: 'positional', detail: `"…${m[0]}…" in explanation` });
}

// ---- MCQ ---------------------------------------------------------------
for (const [pool, items] of pools<MCQ>(MCQ_BANK)) {
  const stems = new Map<string, string>();
  for (const q of items) {
    const correct = q.choices[q.answer] ?? '';
    const wrong = q.choices.filter((_, i) => i !== q.answer);

    const oj = wrong.find((c) => /^(only|just) /i.test(c));
    if (oj) findings.push({ pool, id: q.id, check: 'only-just', detail: `distractor "${oj}"` });

    if (correct.includes(' — ') && !wrong.some((c) => c.includes(' — ')))
      findings.push({ pool, id: q.id, check: 'em-dash', detail: `"${correct}"` });

    const ratio = correct.length / Math.max(1, ...wrong.map((c) => c.length));
    if (ratio > LENGTH_RATIO)
      findings.push({ pool, id: q.id, check: 'length', detail: `${ratio.toFixed(1)}× "${correct}"` });

    const stem = q.q.trim().toLowerCase();
    if (stems.has(stem)) findings.push({ pool, id: q.id, check: 'dup-stem', detail: `same as ${stems.get(stem)}` });
    else stems.set(stem, q.id);

    checkExplanation(pool, q.id, q.explanation);
  }
}

// ---- Odd One Out ---------------------------------------------------------
for (const [pool, items] of pools(ODD_BANK)) for (const o of items) checkExplanation(pool, o.id, o.explanation);

// ---- Two Truths and a Lie ------------------------------------------------
const tlPools = new Map<string, TruthsLieItem[]>();
for (const [stream, items] of Object.entries(TRUTHS))
  for (const t of items) {
    const key = t.classId ?? `${stream}/generic`;
    tlPools.set(key, [...(tlPools.get(key) ?? []), t]);
  }
for (const [pool, items] of tlPools) {
  if (onlyClass && pool !== onlyClass) continue;
  for (const t of items) {
    const lie = t.statements[t.lie]!;
    const truths = t.statements.filter((_, i) => i !== t.lie);
    if (ABSOLUTE.test(lie) && !truths.some((s) => ABSOLUTE.test(s)))
      findings.push({ pool, id: t.id, check: 'absolute', detail: `lie "${lie}"` });
    checkExplanation(pool, t.id, t.explanation);
  }
}

// ---- Report --------------------------------------------------------------
console.log(`\nContent audit${onlyClass ? ` — ${onlyClass}` : ''}: ${findings.length} finding(s)\n`);
const byCheck = new Map<string, Finding[]>();
for (const f of findings) byCheck.set(f.check, [...(byCheck.get(f.check) ?? []), f]);
for (const [check, list] of byCheck) {
  console.log(`  ${check} (${list.length})`);
  for (const f of list) console.log(`    ${f.pool.padEnd(26)} ${f.id.padEnd(16)} ${f.detail}`);
}
if (findings.length === 0) console.log('  none — clean');
console.log('');

if (strict && findings.length > 0) process.exit(1);
