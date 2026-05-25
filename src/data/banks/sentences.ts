import type { Stream } from '../../data/games';
import type { Subject } from '../../games/types';

/**
 * Sentence-building bank. Each sentence is stream-scaled in length/complexity
 * and optionally tagged with one AC V9 subject. The Sentence Builder tool
 * tokenises each sentence on whitespace.
 *
 * Sentences without a subject tag are treated as general and appear when no
 * subject filter is active.
 */

export interface SentenceEntry {
  text: string;
  subject?: Subject;
}

export const SENTENCES: Record<Stream, SentenceEntry[]> = {
  lower_primary: [
    { text: 'The cat sat on the mat.' },
    { text: 'My dog likes to run.' },
    { text: 'I can see a bird.', subject: 'science' },
    { text: 'We play in the park.' },
    { text: 'The sun is hot today.', subject: 'science' },
    { text: 'She has a red ball.' },
    { text: 'He went to school.' },
    { text: 'My mum is at home.' },
    { text: 'I like to read books.', subject: 'english' },
    { text: 'The fish swims in water.', subject: 'science' },
    { text: 'Birds can fly high.', subject: 'science' },
    { text: 'We eat lunch at noon.' },
    // Subject-tagged additions
    { text: 'A circle has no corners.', subject: 'maths' },
    { text: 'Two plus three is five.', subject: 'maths' },
    { text: 'Long ago people lived in caves.', subject: 'history' },
    { text: 'My family came from far away.', subject: 'history' },
    { text: 'The map shows where we live.', subject: 'geography' },
    { text: 'North is the way the arrow points.', subject: 'geography' },
    { text: 'Caterpillars become butterflies.', subject: 'science' },
    { text: 'A noun is a naming word.', subject: 'english' },
  ],
  upper_primary: [
    { text: 'My brother and I went to the beach yesterday.' },
    { text: 'The tall tree behind our house is over a hundred years old.', subject: 'science' },
    { text: 'Australian kangaroos are found in many parts of the country.', subject: 'geography' },
    { text: 'I enjoy reading books about space and astronauts.', subject: 'science' },
    { text: 'After dinner we played a board game together.' },
    { text: 'The rainforest is home to many unique creatures.', subject: 'science' },
    { text: 'Our class is learning about Aboriginal Dreaming stories.', subject: 'history' },
    { text: 'Captain Cook landed at Botany Bay in 1770.', subject: 'history' },
    { text: 'The Murray River is the longest river in Australia.', subject: 'geography' },
    { text: 'Photosynthesis helps plants make their own food.', subject: 'science' },
    // Subject-tagged additions
    { text: 'A simile compares two things using "like" or "as".', subject: 'english' },
    { text: 'The author used vivid adjectives to describe the storm.', subject: 'english' },
    { text: 'Three quarters is the same as seventy-five percent.', subject: 'maths' },
    { text: 'A right angle measures exactly ninety degrees.', subject: 'maths' },
    { text: 'Australia became a federation on the first of January 1901.', subject: 'history' },
    { text: 'The Great Barrier Reef lies off the coast of Queensland.', subject: 'geography' },
    { text: 'Magnets attract objects made of iron and steel.', subject: 'science' },
  ],
  middle_school: [
    { text: 'Despite the heavy rain, the students completed their cross-country run.' },
    { text: 'Shakespeare wrote many of his famous plays during the late sixteenth century.', subject: 'english' },
    { text: 'The Industrial Revolution transformed European societies during the 1700s and 1800s.', subject: 'history' },
    { text: 'Although she was nervous, Maya delivered her speech with confidence.', subject: 'english' },
    { text: 'Photosynthesis converts sunlight into chemical energy stored in glucose molecules.', subject: 'science' },
    { text: 'The Great Barrier Reef supports thousands of marine species along the Queensland coast.', subject: 'geography' },
    { text: 'Pythagoras discovered that the square of the hypotenuse equals the sum of the other two sides.', subject: 'maths' },
    { text: 'Indigenous Australians have been custodians of this land for over sixty thousand years.', subject: 'history' },
    // Subject-tagged additions
    { text: 'Solving a linear equation requires isolating the variable on one side.', subject: 'maths' },
    { text: 'Algebraic expressions use letters to represent unknown numbers.', subject: 'maths' },
    { text: 'A persuasive essay relies on a strong thesis statement.', subject: 'english' },
    { text: 'World War One began in 1914 after the assassination of Archduke Ferdinand.', subject: 'history' },
    { text: 'The tropics lie between the Tropic of Cancer and the Tropic of Capricorn.', subject: 'geography' },
    { text: 'Ecosystems balance producers, consumers and decomposers.', subject: 'science' },
  ],
  senior_school: [
    { text: 'Although the protagonist initially resists change, his transformation forms the heart of the narrative.', subject: 'english' },
    { text: 'The Treaty of Versailles, signed in 1919, imposed harsh penalties on Germany after the First World War.', subject: 'history' },
    { text: 'Economic globalisation has fundamentally reshaped the way nations trade, communicate and compete.', subject: 'geography' },
    { text: 'Existentialist philosophers argued that meaning is something each individual must construct for themselves.' },
    { text: 'The Mabo decision overturned the legal fiction of terra nullius and reshaped Australian property law.', subject: 'history' },
    { text: 'Quantum mechanics challenges our intuitive understanding of how particles behave at subatomic scales.', subject: 'science' },
    // Subject-tagged additions
    { text: 'The derivative of a function measures the instantaneous rate of change at a given point.', subject: 'maths' },
    { text: 'A bildungsroman traces the protagonist’s moral and psychological growth from youth to maturity.', subject: 'english' },
    { text: 'The Cold War shaped global politics from the late 1940s through to 1991.', subject: 'history' },
    { text: 'Climate change is driving shifts in ecosystems and ocean currents around the world.', subject: 'geography' },
  ],
};

/** Filter sentences by stream and optional subject filter. */
export function pickSentences(
  stream: Stream,
  subjects: Subject[],
): SentenceEntry[] {
  const list = SENTENCES[stream] ?? [];
  if (subjects.length === 0) return list;
  return list.filter((s) => s.subject && subjects.includes(s.subject));
}
