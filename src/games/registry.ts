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
  'higher-or-lower': lazy(() => import('./HigherOrLower').then((m) => ({ default: m.HigherOrLower }))),
  'two-truths-one-lie': lazy(() => import('./TwoTruthsLie').then((m) => ({ default: m.TwoTruthsLie }))),
  'buzzer-round': lazy(() => import('./BuzzerRound').then((m) => ({ default: m.BuzzerRound }))),

  // Word & language
  'anagram-race': lazy(() => import('./AnagramRace').then((m) => ({ default: m.AnagramRace }))),
  'word-chain': lazy(() => import('./WordChain').then((m) => ({ default: m.WordChain }))),
  'synonym-antonym': lazy(() => import('./SynonymSprint').then((m) => ({ default: m.SynonymSprint }))),
  'spelling-bee': lazy(() => import('./SpellingBee').then((m) => ({ default: m.SpellingBee }))),
  'define-it': lazy(() => import('./DefineIt').then((m) => ({ default: m.DefineIt }))),
  categories: lazy(() => import('./Categories').then((m) => ({ default: m.Categories }))),

  // Number & logic
  'mental-maths-ladder': lazy(() => import('./MentalMathsLadder').then((m) => ({ default: m.MentalMathsLadder }))),
  'equation-match': lazy(() => import('./EquationMatch').then((m) => ({ default: m.EquationMatch }))),
  'pattern-next': lazy(() => import('./PatternNext').then((m) => ({ default: m.PatternNext }))),
  'estimate-it': lazy(() => import('./EstimateIt').then((m) => ({ default: m.EstimateIt }))),
  codebreaker: lazy(() => import('./Codebreaker').then((m) => ({ default: m.Codebreaker }))),

  // History & Geography
  'timeline-order': lazy(() => import('./TimelineOrder').then((m) => ({ default: m.TimelineOrder }))),
  'map-pin': lazy(() => import('./MapPin').then((m) => ({ default: m.MapPin }))),
  'flag-flash': lazy(() => import('./FlagFlash').then((m) => ({ default: m.FlagFlash }))),
  'who-am-i': lazy(() => import('./WhoAmI').then((m) => ({ default: m.WhoAmI }))),
  'landmark-snap': lazy(() => import('./LandmarkSnap').then((m) => ({ default: m.LandmarkSnap }))),

  // Whole-class energiser
  'heads-up': lazy(() => import('./HeadsUp').then((m) => ({ default: m.HeadsUp }))),
  'would-you-rather': lazy(() => import('./WouldYouRather').then((m) => ({ default: m.WouldYouRather }))),
  'memory-sequence': lazy(() => import('./MemorySequence').then((m) => ({ default: m.MemorySequence }))),
  'twenty-questions': lazy(() => import('./TwentyQuestions').then((m) => ({ default: m.TwentyQuestions }))),
};
