import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

/**
 * Tool registry: maps tool id → lazy-loaded component.
 *
 * Adding a tool:
 *  1. Build the component under src/tools/<category>/<Name>.tsx
 *  2. Add an entry here using lazy(() => import('./<category>/<Name>'))
 *  3. The /tool/:id route picks it up automatically. No router edits needed.
 *
 * Tools without a registry entry render the ToolPlaceholder "coming soon" page.
 */
export const TOOL_COMPONENTS: Record<string, LazyExoticComponent<ComponentType>> = {
  // ---------- Classroom Management ----------
  'my-classes': lazy(() => import('./classes/MyClasses').then((m) => ({ default: m.MyClasses }))),
  'random-group-maker': lazy(() => import('./rng/RandomGroupMaker').then((m) => ({ default: m.RandomGroupMaker }))),
  'group-score-board': lazy(() => import('./classroom/GroupScoreBoard').then((m) => ({ default: m.GroupScoreBoard }))),
  'marble-jar-reward': lazy(() => import('./classroom/MarbleJar').then((m) => ({ default: m.MarbleJar }))),
  tournaments: lazy(() => import('./classroom/Tournaments').then((m) => ({ default: m.Tournaments }))),
  polling: lazy(() => import('./classroom/Polling').then((m) => ({ default: m.Polling }))),

  // ---------- Randomisers ----------
  'dice-roller': lazy(() => import('./rng/DiceRoller').then((m) => ({ default: m.DiceRoller }))),
  'flip-coin': lazy(() => import('./rng/FlipCoin').then((m) => ({ default: m.FlipCoin }))),
  'number-spinner': lazy(() => import('./rng/NumberSpinner').then((m) => ({ default: m.NumberSpinner }))),
  'name-picker': lazy(() => import('./rng/NamePicker').then((m) => ({ default: m.NamePicker }))),
  'custom-spinner': lazy(() => import('./rng/CustomSpinner').then((m) => ({ default: m.CustomSpinner }))),
  'group-name-generator': lazy(() => import('./rng/GroupNameGenerator').then((m) => ({ default: m.GroupNameGenerator }))),
  'question-generator': lazy(() => import('./rng/QuestionGenerator').then((m) => ({ default: m.QuestionGenerator }))),

  // ---------- Literacy ----------
  'story-starters': lazy(() => import('./literacy/StoryStarters').then((m) => ({ default: m.StoryStarters }))),
  'word-builder': lazy(() => import('./literacy/WordBuilder').then((m) => ({ default: m.WordBuilder }))),
  'sight-words': lazy(() => import('./literacy/SightWords').then((m) => ({ default: m.SightWords }))),
  'spelling-test': lazy(() => import('./literacy/SpellingTest').then((m) => ({ default: m.SpellingTest }))),
  'sentence-builder': lazy(() => import('./literacy/SentenceBuilder').then((m) => ({ default: m.SentenceBuilder }))),

  // ---------- Numeracy ----------
  'fraction-tool': lazy(() => import('./numeracy/FractionTool').then((m) => ({ default: m.FractionTool }))),
  'hundreds-chart': lazy(() => import('./numeracy/HundredsChart').then((m) => ({ default: m.HundredsChart }))),
  'mab-blocks': lazy(() => import('./numeracy/MABBlocks').then((m) => ({ default: m.MABBlocks }))),
  'fraction-wall': lazy(() => import('./numeracy/FractionWall').then((m) => ({ default: m.FractionWall }))),
  'cartesian-plane': lazy(() => import('./numeracy/CartesianPlane').then((m) => ({ default: m.CartesianPlane }))),
  'place-value-chart': lazy(() => import('./numeracy/PlaceValueChart').then((m) => ({ default: m.PlaceValueChart }))),
  'fdp-converter': lazy(() => import('./numeracy/FDPConverter').then((m) => ({ default: m.FDPConverter }))),

  // ---------- Science ----------
  'periodic-table': lazy(() => import('./science/PeriodicTable').then((m) => ({ default: m.PeriodicTable }))),
};

export function hasComponent(id: string): boolean {
  return id in TOOL_COMPONENTS;
}
