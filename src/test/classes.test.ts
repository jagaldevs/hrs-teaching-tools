/**
 * End-to-end content wiring: for every class a teacher can pick, the
 * class-anchored games must serve a full round of on-subject content.
 * This is the check that would have caught Health & PE serving science
 * questions and Year 9 Humanities never seeing geography.
 */
import { describe, expect, it } from 'vitest';
import { MCQ_BANK } from '../data/banks/mcq';
import { ODD_BANK } from '../data/banks/oddOneOut';
import { TRUTHS } from '../data/banks/misc';
import { GAMES } from '../data/games';
import { BAND_TO_STREAM, HRS_CLASSES, YEAR_BANDS, classesForBand, isSelectable } from '../data/classes';
import { classPool, pickFromClass } from '../games/bankUtils';

const ROUND = 15; // largest count option on the SetupScreen
const selectable = HRS_CLASSES.filter(isSelectable);

describe('class picker', () => {
  it('offers at least one class in every year band', () => {
    for (const band of YEAR_BANDS) expect(classesForBand(band.id).length, band.id).toBeGreaterThan(0);
  });

  it('hides classes with nothing to serve', () => {
    const hidden = HRS_CLASSES.filter((c) => !isSelectable(c));
    for (const c of hidden) {
      expect(classPool(MCQ_BANK, c.id), c.id).toEqual([]);
    }
  });

  it('every game supports at least one band', () => {
    for (const g of GAMES) {
      const bands = YEAR_BANDS.filter((b) => g.streams.includes(BAND_TO_STREAM[b.id]));
      expect(bands.length, g.id).toBeGreaterThan(0);
    }
  });
});

describe.each([
  ['Quick Quiz (MCQ)', MCQ_BANK],
  ['Odd One Out', ODD_BANK],
] as const)('%s', (_name, bank) => {
  it.each(selectable.map((c) => [c.id, c] as const))('%s serves a full on-subject round', (_id, c) => {
    const { items, subjects } = pickFromClass(bank as typeof MCQ_BANK, c.id, ROUND);
    const allowed = c.backfillSubjects ?? [c.subject];
    expect(items.length).toBeGreaterThanOrEqual(Math.min(ROUND, classPool(bank as typeof MCQ_BANK, c.id).length));
    expect(items.length).toBeGreaterThan(0);
    for (const s of subjects) expect(allowed).toContain(s);
    // No question twice in one round.
    expect(new Set(items.map((i) => i.id)).size).toBe(items.length);
  });
});

describe('anchored classes', () => {
  const anchored = HRS_CLASSES.filter((c) => c.anchored);

  it.each(anchored.map((c) => [c.id, c] as const))('%s serves only its own items', (_id, c) => {
    const own = new Set((MCQ_BANK.byClass?.[c.id] ?? []).map((q) => q.id));
    const { items } = pickFromClass(MCQ_BANK, c.id, ROUND);
    for (const q of items) expect(own).toContain(q.id);
  });

  it.each(anchored.map((c) => [c.id, c] as const))('%s has a full Two Truths round', (_id, c) => {
    const own = TRUTHS[c.legacyStream!].filter((t) => t.classId === c.id);
    expect(own.length).toBeGreaterThanOrEqual(ROUND);
  });
});
