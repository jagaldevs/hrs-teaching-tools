import type { Stream } from '../../data/games';

/**
 * Sentence-building bank. Sentences are stream-scaled in length and complexity.
 * The Sentence Builder game tokenises each sentence on whitespace.
 */

export const SENTENCES: Record<Stream, string[]> = {
  lower_primary: [
    'The cat sat on the mat.',
    'My dog likes to run.',
    'I can see a bird.',
    'We play in the park.',
    'The sun is hot today.',
    'She has a red ball.',
    'He went to school.',
    'My mum is at home.',
    'I like to read books.',
    'The fish swims in water.',
    'Birds can fly high.',
    'We eat lunch at noon.',
  ],
  upper_primary: [
    'My brother and I went to the beach yesterday.',
    'The tall tree behind our house is over a hundred years old.',
    'Australian kangaroos are found in many parts of the country.',
    'I enjoy reading books about space and astronauts.',
    'After dinner we played a board game together.',
    'The rainforest is home to many unique creatures.',
    'Our class is learning about Aboriginal Dreaming stories.',
    'Captain Cook landed at Botany Bay in 1770.',
    'The Murray River is the longest river in Australia.',
    'Photosynthesis helps plants make their own food.',
  ],
  middle_school: [
    'Despite the heavy rain, the students completed their cross-country run.',
    'Shakespeare wrote many of his famous plays during the late sixteenth century.',
    'The Industrial Revolution transformed European societies during the 1700s and 1800s.',
    'Although she was nervous, Maya delivered her speech with confidence.',
    'Photosynthesis converts sunlight into chemical energy stored in glucose molecules.',
    'The Great Barrier Reef supports thousands of marine species along the Queensland coast.',
    'Pythagoras discovered that the square of the hypotenuse equals the sum of the other two sides.',
    'Indigenous Australians have been custodians of this land for over sixty thousand years.',
  ],
  senior_school: [
    'Although the protagonist initially resists change, his transformation forms the heart of the narrative.',
    'The Treaty of Versailles, signed in 1919, imposed harsh penalties on Germany after the First World War.',
    'Economic globalisation has fundamentally reshaped the way nations trade, communicate and compete.',
    'Existentialist philosophers argued that meaning is something each individual must construct for themselves.',
    'The Mabo decision overturned the legal fiction of terra nullius and reshaped Australian property law.',
    'Quantum mechanics challenges our intuitive understanding of how particles behave at subatomic scales.',
  ],
};
