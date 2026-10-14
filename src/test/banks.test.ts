/**
 * Structural integrity of every content bank. These catch authoring slips
 * that tsc can't: duplicate ids, answer indexes out of range, repeated
 * choices (the old `up-h-12` had '1788' twice), orphaned class keys.
 *
 * Quality heuristics (obvious-answer tells, position balance) live in
 * `npm run audit:content`, not here — they need human judgement.
 */
import { describe, expect, it } from 'vitest';
import { MCQ_BANK } from '../data/banks/mcq';
import { ODD_BANK } from '../data/banks/oddOneOut';
import { ESTIMATE, SYN_ANT, TRUTHS, WYR } from '../data/banks/misc';
import { TIMELINE, WHO_AM_I } from '../data/banks/hass';
import { STORY_STARTERS } from '../data/banks/stories';
import { HRS_CLASSES } from '../data/classes';
import type { Bank } from '../games/types';

const CLASS_IDS = new Set(HRS_CLASSES.map((c) => c.id));

function allItems<Q>(bank: Bank<Q>): Q[] {
  return [
    ...Object.values(bank.byStreamSubject).flatMap((bySubject) => Object.values(bySubject ?? {}).flat()),
    ...Object.values(bank.byClass ?? {}).flat(),
  ] as Q[];
}

function duplicates(ids: string[]): string[] {
  const seen = new Set<string>();
  return ids.filter((id) => (seen.has(id) ? true : (seen.add(id), false)));
}

/**
 * Choices that appear more than once in one item. Case-sensitive on
 * purpose: capitalisation questions (lp-e-12) differ only by case.
 */
function repeated(choices: readonly string[]): string[] {
  return duplicates(choices.map((c) => c.trim()));
}

describe('MCQ bank (Quick Quiz, Question Generator)', () => {
  const items = allItems(MCQ_BANK);

  it('has unique ids', () => {
    expect(duplicates(items.map((q) => q.id))).toEqual([]);
  });

  it.each(items.map((q) => [q.id, q] as const))('%s is well-formed', (_id, q) => {
    expect(q.q.trim()).not.toBe('');
    expect(q.choices).toHaveLength(4);
    expect(q.answer).toBeGreaterThanOrEqual(0);
    expect(q.answer).toBeLessThan(q.choices.length);
    expect(repeated(q.choices)).toEqual([]);
  });

  it('keys anchored content by real class ids', () => {
    for (const id of Object.keys(MCQ_BANK.byClass ?? {})) expect(CLASS_IDS).toContain(id);
  });
});

describe('Odd One Out bank', () => {
  const items = allItems(ODD_BANK);

  it('has unique ids', () => {
    expect(duplicates(items.map((o) => o.id))).toEqual([]);
  });

  it.each(items.map((o) => [o.id, o] as const))('%s is well-formed', (_id, o) => {
    expect(o.outlier).toBeGreaterThanOrEqual(0);
    expect(o.outlier).toBeLessThan(4);
    expect(repeated(o.items)).toEqual([]);
  });

  it('keys anchored content by real class ids', () => {
    for (const id of Object.keys(ODD_BANK.byClass ?? {})) expect(CLASS_IDS).toContain(id);
  });
});

describe('Two Truths and a Lie bank', () => {
  const items = Object.values(TRUTHS).flat();

  it('has unique ids', () => {
    expect(duplicates(items.map((t) => t.id))).toEqual([]);
  });

  it.each(items.map((t) => [t.id, t] as const))('%s is well-formed', (_id, t) => {
    expect(t.statements).toHaveLength(3);
    expect([0, 1, 2]).toContain(t.lie);
    expect(repeated(t.statements)).toEqual([]);
  });

  it('tags class items with real class ids', () => {
    for (const t of items) if (t.classId) expect(CLASS_IDS).toContain(t.classId);
  });
});

describe('anchored flag', () => {
  it('matches the classes that actually have anchored MCQs', () => {
    const flagged = HRS_CLASSES.filter((c) => c.anchored).map((c) => c.id).sort();
    const withContent = Object.keys(MCQ_BANK.byClass ?? {})
      .filter((id) => (MCQ_BANK.byClass?.[id]?.length ?? 0) > 0)
      .sort();
    expect(flagged).toEqual(withContent);
  });
});

describe('other banks', () => {
  it('Synonym & Antonym items are well-formed', () => {
    const items = Object.values(SYN_ANT).flat();
    expect(duplicates(items.map((s) => s.id))).toEqual([]);
    for (const s of items) {
      expect(s.answer, s.id).toBeGreaterThanOrEqual(0);
      expect(s.answer, s.id).toBeLessThan(4);
      expect(repeated(s.choices), s.id).toEqual([]);
    }
  });

  it('Estimate It answers are finite numbers', () => {
    const items = Object.values(ESTIMATE).flat();
    expect(duplicates(items.map((e) => e.id))).toEqual([]);
    for (const e of items) expect(Number.isFinite(e.answer), e.id).toBe(true);
  });

  it('Timeline streams have unique ids and enough events for a round', () => {
    // Same-year events (e.g. 1945: Hiroshima, UN founded) are fine:
    // TimelineOrder's reveal() stable-sorts the player's own order, so
    // tied events are accepted in either order.
    for (const [stream, events] of Object.entries(TIMELINE)) {
      expect(duplicates(events.map((e) => e.id)), stream).toEqual([]);
      expect(events.length, stream).toBeGreaterThanOrEqual(5);
    }
  });

  it('Timeline events do not give away their year', () => {
    // 2026-07-12: every event used to end in "(1901)" etc.
    for (const e of Object.values(TIMELINE).flat()) {
      expect(e.event, e.id).not.toContain(String(Math.abs(e.year)));
    }
  });

  it('Who Am I? figures have five clues and unique ids', () => {
    const items = Object.values(WHO_AM_I).flat();
    expect(duplicates(items.map((w) => w.id))).toEqual([]);
    for (const w of items) expect(w.clues, w.id).toHaveLength(5);
  });

  it('Would You Rather and Story Starter ids are unique', () => {
    expect(duplicates(Object.values(WYR).flat().map((w) => w.id))).toEqual([]);
    expect(duplicates(STORY_STARTERS.map((s) => s.id))).toEqual([]);
  });
});
