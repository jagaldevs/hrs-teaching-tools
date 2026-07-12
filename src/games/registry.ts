import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

/**
 * Game registry. Same pattern as tools — add an entry to expose a real game.
 * Games without a registry entry render the placeholder.
 *
 * IDs must match those in src/data/games.ts so the BrainBreaks dashboard
 * links land on the right component.
 */
export const GAME_COMPONENTS: Record<string, LazyExoticComponent<ComponentType>> = {
  // Quick & energetic
  'quick-quiz': lazy(() => import('./QuickQuiz').then((m) => ({ default: m.QuickQuiz }))),
  'odd-one-out': lazy(() => import('./OddOneOut').then((m) => ({ default: m.OddOneOut }))),
  'two-truths-one-lie': lazy(() => import('./TwoTruthsLie').then((m) => ({ default: m.TwoTruthsLie }))),

  // Word & language
  'anagram-race': lazy(() => import('./AnagramRace').then((m) => ({ default: m.AnagramRace }))),
  'word-chain': lazy(() => import('./WordChain').then((m) => ({ default: m.WordChain }))),
  'synonym-antonym': lazy(() => import('./SynonymSprint').then((m) => ({ default: m.SynonymSprint }))),
  'define-it': lazy(() => import('./DefineIt').then((m) => ({ default: m.DefineIt }))),

  // Number & logic
  'mental-maths-ladder': lazy(() => import('./MentalMathsLadder').then((m) => ({ default: m.MentalMathsLadder }))),
  'pattern-next': lazy(() => import('./PatternNext').then((m) => ({ default: m.PatternNext }))),
  'estimate-it': lazy(() => import('./EstimateIt').then((m) => ({ default: m.EstimateIt }))),
  codebreaker: lazy(() => import('./Codebreaker').then((m) => ({ default: m.Codebreaker }))),

  // History & Geography
  'timeline-order': lazy(() => import('./TimelineOrder').then((m) => ({ default: m.TimelineOrder }))),
  'flag-flash': lazy(() => import('./FlagFlash').then((m) => ({ default: m.FlagFlash }))),
  'who-am-i': lazy(() => import('./WhoAmI').then((m) => ({ default: m.WhoAmI }))),

  // Whole-class energiser
  'would-you-rather': lazy(() => import('./WouldYouRather').then((m) => ({ default: m.WouldYouRather }))),
};
