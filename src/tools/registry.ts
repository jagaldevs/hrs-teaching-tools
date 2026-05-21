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
  // ---------- Randomisers ----------
  'dice-roller': lazy(() => import('./rng/DiceRoller').then((m) => ({ default: m.DiceRoller }))),
  'flip-coin': lazy(() => import('./rng/FlipCoin').then((m) => ({ default: m.FlipCoin }))),
  'number-spinner': lazy(() => import('./rng/NumberSpinner').then((m) => ({ default: m.NumberSpinner }))),
  'name-picker': lazy(() => import('./rng/NamePicker').then((m) => ({ default: m.NamePicker }))),
  'custom-spinner': lazy(() => import('./rng/CustomSpinner').then((m) => ({ default: m.CustomSpinner }))),
  'group-name-generator': lazy(() => import('./rng/GroupNameGenerator').then((m) => ({ default: m.GroupNameGenerator }))),
  'team-buzzer': lazy(() => import('./rng/TeamBuzzers').then((m) => ({ default: m.TeamBuzzers }))),
  'question-generator': lazy(() => import('./rng/QuestionGenerator').then((m) => ({ default: m.QuestionGenerator }))),

  // ---------- Classroom Management ----------
  'random-group-maker': lazy(() => import('./rng/RandomGroupMaker').then((m) => ({ default: m.RandomGroupMaker }))),
  'marble-jar-reward': lazy(() => import('./classroom/MarbleJar').then((m) => ({ default: m.MarbleJar }))),
  'group-score-board': lazy(() => import('./classroom/GroupScoreBoard').then((m) => ({ default: m.GroupScoreBoard }))),
  polling: lazy(() => import('./classroom/Polling').then((m) => ({ default: m.Polling }))),
  tournaments: lazy(() => import('./classroom/Tournaments').then((m) => ({ default: m.Tournaments }))),

  // ---------- Literacy ----------
  'spelling-test': lazy(() => import('./literacy/SpellingTest').then((m) => ({ default: m.SpellingTest }))),
  'phonics-sound-wall': lazy(() => import('./literacy/PhonicsSoundWall').then((m) => ({ default: m.PhonicsSoundWall }))),
  'sight-words': lazy(() => import('./literacy/SightWords').then((m) => ({ default: m.SightWords }))),
  'word-builder': lazy(() => import('./literacy/WordBuilder').then((m) => ({ default: m.WordBuilder }))),
  'sentence-builder': lazy(() => import('./literacy/SentenceBuilder').then((m) => ({ default: m.SentenceBuilder }))),

  // ---------- Numeracy ----------
  'number-bonds': lazy(() => import('./numeracy/NumberBonds').then((m) => ({ default: m.NumberBonds }))),
  'fdp-converter': lazy(() => import('./numeracy/FDPConverter').then((m) => ({ default: m.FDPConverter }))),

  // ---------- Teaching Aids ----------
  'story-starters': lazy(() => import('./teaching-aids/StoryStarters').then((m) => ({ default: m.StoryStarters }))),
  'hundreds-chart': lazy(() => import('./teaching-aids/HundredsChart').then((m) => ({ default: m.HundredsChart }))),
  'ten-frame': lazy(() => import('./teaching-aids/TenFrame').then((m) => ({ default: m.TenFrame }))),
  'fraction-wall': lazy(() => import('./teaching-aids/FractionWall').then((m) => ({ default: m.FractionWall }))),
  'number-line': lazy(() => import('./teaching-aids/NumberLine').then((m) => ({ default: m.NumberLine }))),
  'periodic-table': lazy(() => import('./teaching-aids/PeriodicTable').then((m) => ({ default: m.PeriodicTable }))),
  'place-value-chart': lazy(() => import('./teaching-aids/PlaceValueChart').then((m) => ({ default: m.PlaceValueChart }))),
  abacus: lazy(() => import('./teaching-aids/Abacus').then((m) => ({ default: m.Abacus }))),
  'fraction-tool': lazy(() => import('./teaching-aids/FractionTool').then((m) => ({ default: m.FractionTool }))),
  'mab-blocks': lazy(() => import('./teaching-aids/MABBlocks').then((m) => ({ default: m.MABBlocks }))),
  'cartesian-plane': lazy(() => import('./teaching-aids/CartesianPlane').then((m) => ({ default: m.CartesianPlane }))),
  'ruler-protractor': lazy(() => import('./teaching-aids/RulerProtractor').then((m) => ({ default: m.RulerProtractor }))),
  'world-map': lazy(() => import('./teaching-aids/WorldMap').then((m) => ({ default: m.WorldMap }))),
  'timeline-builder': lazy(() => import('./teaching-aids/TimelineBuilder').then((m) => ({ default: m.TimelineBuilder }))),
};

export function hasComponent(id: string): boolean {
  return id in TOOL_COMPONENTS;
}
