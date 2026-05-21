/**
 * Misc banks used by smaller games — keeps related content in one place.
 * Authored against the AC V9 with stream-appropriate complexity.
 */

import type { Stream } from '../../data/games';

// ---------- Estimate It ----------

export interface EstimateItem {
  id: string;
  question: string;
  answer: number;
  unit?: string;
  context?: string;
}

export const ESTIMATE: Record<Stream, EstimateItem[]> = {
  lower_primary: [
    { id: 'lp-est-1', question: 'How many seconds in a minute?', answer: 60 },
    { id: 'lp-est-2', question: 'How many days in a year?', answer: 365 },
    { id: 'lp-est-3', question: 'How many legs do 5 dogs have?', answer: 20 },
    { id: 'lp-est-4', question: 'How many wheels on 6 cars?', answer: 24 },
    { id: 'lp-est-5', question: 'How many fingers on 4 hands?', answer: 20 },
    { id: 'lp-est-6', question: 'How many hours in a day?', answer: 24 },
    { id: 'lp-est-7', question: 'How many sides on 3 squares?', answer: 12 },
    { id: 'lp-est-8', question: 'How many days in 2 weeks?', answer: 14 },
  ],
  upper_primary: [
    { id: 'up-est-1', question: 'Seconds in an hour', answer: 3600, unit: 's' },
    { id: 'up-est-2', question: 'Minutes in a day', answer: 1440, unit: 'min' },
    { id: 'up-est-3', question: 'States in Australia', answer: 6 },
    { id: 'up-est-4', question: 'Players on an AFL team (on field)', answer: 18 },
    { id: 'up-est-5', question: 'Capital cities of the world (approx.)', answer: 195 },
    { id: 'up-est-6', question: 'Length of Murray River (km)', answer: 2508, unit: 'km' },
    { id: 'up-est-7', question: 'Population of Darwin (approx., thousands)', answer: 150, unit: 'k' },
    { id: 'up-est-8', question: 'Bones in the adult human body', answer: 206 },
    { id: 'up-est-9', question: 'Elements in the periodic table', answer: 118 },
    { id: 'up-est-10', question: 'Olympic events (Summer 2024, approx.)', answer: 329 },
  ],
  middle_school: [
    { id: 'ms-est-1', question: 'Seconds in a week', answer: 604_800 },
    { id: 'ms-est-2', question: 'Year of Australian Federation', answer: 1901 },
    { id: 'ms-est-3', question: 'Height of Mt Everest (m)', answer: 8849, unit: 'm' },
    { id: 'ms-est-4', question: 'Population of China (millions)', answer: 1410, unit: 'M' },
    { id: 'ms-est-5', question: 'Speed of light (km/s)', answer: 299792, unit: 'km/s' },
    { id: 'ms-est-6', question: 'Distance to the Moon (km)', answer: 384400, unit: 'km' },
    { id: 'ms-est-7', question: 'Plays by Shakespeare (approx.)', answer: 39 },
    { id: 'ms-est-8', question: 'Year WWI ended', answer: 1918 },
    { id: 'ms-est-9', question: 'Atomic number of carbon', answer: 6 },
    { id: 'ms-est-10', question: 'Area of Australia (sq. km, millions)', answer: 7.69, unit: 'M km²' },
  ],
  senior_school: [
    { id: 'ss-est-1', question: 'Earth’s circumference (km)', answer: 40075, unit: 'km' },
    { id: 'ss-est-2', question: 'Age of universe (billion years)', answer: 13.8, unit: 'Gyr' },
    { id: 'ss-est-3', question: 'Population of India (billions)', answer: 1.43, unit: 'B' },
    { id: 'ss-est-4', question: 'Atmospheric CO₂ in 2024 (ppm)', answer: 422, unit: 'ppm' },
    { id: 'ss-est-5', question: 'Distance Earth to Sun (million km)', answer: 149.6, unit: 'M km' },
    { id: 'ss-est-6', question: 'Year of the Berlin Wall’s fall', answer: 1989 },
    { id: 'ss-est-7', question: 'Number of countries in UN', answer: 193 },
    { id: 'ss-est-8', question: 'Speed of sound at sea level (m/s)', answer: 343, unit: 'm/s' },
    { id: 'ss-est-9', question: 'GDP of Australia (US$, billions)', answer: 1700, unit: 'B USD' },
    { id: 'ss-est-10', question: 'Year of Mabo decision', answer: 1992 },
  ],
};

// ---------- Two Truths & a Lie ----------

export interface TruthsLieItem {
  id: string;
  /** Three statements — exactly one is false. */
  statements: [string, string, string];
  /** Index of the lie (0-2). */
  lie: 0 | 1 | 2;
  explanation: string;
}

export const TRUTHS: Record<Stream, TruthsLieItem[]> = {
  lower_primary: [
    {
      id: 'lp-tl-1',
      statements: ['Spiders have 8 legs.', 'A square has 4 sides.', 'Fish breathe air with lungs.'],
      lie: 2,
      explanation: 'Fish breathe through gills, not lungs.',
    },
    {
      id: 'lp-tl-2',
      statements: ['The sun rises in the east.', 'Bees make honey.', 'Penguins can fly.'],
      lie: 2,
      explanation: 'Penguins can’t fly — they swim.',
    },
    {
      id: 'lp-tl-3',
      statements: ['Tomatoes are a fruit.', 'Cats have 9 lives.', 'Australia is a country.'],
      lie: 1,
      explanation: 'Cats only have one life — but they’re sneaky.',
    },
  ],
  upper_primary: [
    {
      id: 'up-tl-1',
      statements: ['Sound travels faster in water than in air.', 'The Great Wall of China is visible from the Moon with the naked eye.', 'Light from the Sun takes about 8 minutes to reach Earth.'],
      lie: 1,
      explanation: 'It’s a myth. The Great Wall is not visible from the Moon with the naked eye.',
    },
    {
      id: 'up-tl-2',
      statements: ['Australia became a federation in 1901.', 'Captain Cook landed at Botany Bay in 1770.', 'The First Fleet arrived in Australia in 1820.'],
      lie: 2,
      explanation: 'The First Fleet arrived in 1788.',
    },
    {
      id: 'up-tl-3',
      statements: ['Mercury is the closest planet to the Sun.', 'Saturn has rings.', 'There are 9 planets in our solar system.'],
      lie: 2,
      explanation: 'There are 8 planets — Pluto was reclassified in 2006.',
    },
    {
      id: 'up-tl-4',
      statements: ['Kangaroos are marsupials.', 'Australia has 6 states.', 'Sydney is the capital of Australia.'],
      lie: 2,
      explanation: 'Canberra is the capital of Australia.',
    },
  ],
  middle_school: [
    {
      id: 'ms-tl-1',
      statements: ['The Pacific is the largest ocean.', 'Mt Everest is the tallest mountain above sea level.', 'The Amazon is the longest river.'],
      lie: 2,
      explanation: 'The Nile is generally considered the longest river (though some say Amazon — it’s close).',
    },
    {
      id: 'ms-tl-2',
      statements: ['William Shakespeare wrote Hamlet.', 'Albert Einstein won the Nobel Prize for his theory of general relativity.', 'The Eiffel Tower was built for the 1889 World’s Fair.'],
      lie: 1,
      explanation: 'Einstein won the 1921 Nobel for the photoelectric effect, not general relativity.',
    },
    {
      id: 'ms-tl-3',
      statements: ['DNA stands for Deoxyribonucleic Acid.', 'The mitochondria is the powerhouse of the cell.', 'Diamonds are made of iron.'],
      lie: 2,
      explanation: 'Diamonds are made of carbon.',
    },
  ],
  senior_school: [
    {
      id: 'ss-tl-1',
      statements: ['The Berlin Wall fell in 1989.', 'The Russian Revolution was in 1917.', 'Australia gained independence in 1788.'],
      lie: 2,
      explanation: 'Australia federated in 1901; full legislative independence came later.',
    },
    {
      id: 'ss-tl-2',
      statements: ['π is an irrational number.', 'The square root of 2 is rational.', 'e is approximately 2.718.'],
      lie: 1,
      explanation: '√2 is irrational, famously proven by the ancient Greeks.',
    },
    {
      id: 'ss-tl-3',
      statements: ['Hamlet, Macbeth, and Othello are all tragedies by Shakespeare.', 'The Great Gatsby was written by Hemingway.', 'James Joyce wrote Ulysses.'],
      lie: 1,
      explanation: 'The Great Gatsby was written by F. Scott Fitzgerald.',
    },
  ],
};

// ---------- Synonyms & Antonyms ----------

export interface SynAntItem {
  id: string;
  word: string;
  /** "synonym" or "antonym" — what is being asked. */
  mode: 'synonym' | 'antonym';
  choices: [string, string, string, string];
  /** Index of correct answer. */
  answer: number;
}

export const SYN_ANT: Record<Stream, SynAntItem[]> = {
  lower_primary: [
    { id: 'lp-sa-1', word: 'big', mode: 'synonym', choices: ['large', 'small', 'short', 'sad'], answer: 0 },
    { id: 'lp-sa-2', word: 'happy', mode: 'antonym', choices: ['joyful', 'sad', 'kind', 'fast'], answer: 1 },
    { id: 'lp-sa-3', word: 'hot', mode: 'antonym', choices: ['warm', 'cool', 'cold', 'wet'], answer: 2 },
    { id: 'lp-sa-4', word: 'fast', mode: 'synonym', choices: ['slow', 'quick', 'late', 'old'], answer: 1 },
  ],
  upper_primary: [
    { id: 'up-sa-1', word: 'enormous', mode: 'synonym', choices: ['tiny', 'huge', 'narrow', 'short'], answer: 1 },
    { id: 'up-sa-2', word: 'ancient', mode: 'antonym', choices: ['old', 'modern', 'wise', 'forgotten'], answer: 1 },
    { id: 'up-sa-3', word: 'brave', mode: 'synonym', choices: ['kind', 'cowardly', 'courageous', 'gentle'], answer: 2 },
    { id: 'up-sa-4', word: 'common', mode: 'antonym', choices: ['rare', 'usual', 'simple', 'small'], answer: 0 },
    { id: 'up-sa-5', word: 'allow', mode: 'synonym', choices: ['stop', 'permit', 'refuse', 'order'], answer: 1 },
    { id: 'up-sa-6', word: 'gloomy', mode: 'antonym', choices: ['cheerful', 'dark', 'cold', 'distant'], answer: 0 },
  ],
  middle_school: [
    { id: 'ms-sa-1', word: 'meticulous', mode: 'synonym', choices: ['careless', 'thorough', 'fast', 'cheerful'], answer: 1 },
    { id: 'ms-sa-2', word: 'benevolent', mode: 'antonym', choices: ['kind', 'cruel', 'wealthy', 'modest'], answer: 1 },
    { id: 'ms-sa-3', word: 'reluctant', mode: 'synonym', choices: ['eager', 'unwilling', 'quick', 'tired'], answer: 1 },
    { id: 'ms-sa-4', word: 'transparent', mode: 'antonym', choices: ['clear', 'opaque', 'thin', 'visible'], answer: 1 },
    { id: 'ms-sa-5', word: 'futile', mode: 'synonym', choices: ['useful', 'pointless', 'gentle', 'modern'], answer: 1 },
    { id: 'ms-sa-6', word: 'ample', mode: 'antonym', choices: ['plentiful', 'scarce', 'generous', 'wide'], answer: 1 },
  ],
  senior_school: [
    { id: 'ss-sa-1', word: 'ephemeral', mode: 'synonym', choices: ['permanent', 'fleeting', 'sacred', 'forgotten'], answer: 1 },
    { id: 'ss-sa-2', word: 'ubiquitous', mode: 'antonym', choices: ['everywhere', 'rare', 'powerful', 'gentle'], answer: 1 },
    { id: 'ss-sa-3', word: 'pragmatic', mode: 'synonym', choices: ['idealistic', 'practical', 'theoretical', 'naive'], answer: 1 },
    { id: 'ss-sa-4', word: 'verbose', mode: 'antonym', choices: ['talkative', 'concise', 'sincere', 'fluent'], answer: 1 },
    { id: 'ss-sa-5', word: 'esoteric', mode: 'synonym', choices: ['common', 'obscure', 'colourful', 'modern'], answer: 1 },
    { id: 'ss-sa-6', word: 'conspicuous', mode: 'antonym', choices: ['obvious', 'inconspicuous', 'striking', 'loud'], answer: 1 },
  ],
};

// ---------- Would You Rather ----------

export interface WouldYouRather {
  id: string;
  a: string;
  b: string;
  topic?: string;
}

export const WYR: Record<Stream, WouldYouRather[]> = {
  lower_primary: [
    { id: 'lp-wyr-1', a: 'Be able to fly', b: 'Be invisible' },
    { id: 'lp-wyr-2', a: 'Have a pet dragon', b: 'Have a pet unicorn' },
    { id: 'lp-wyr-3', a: 'Eat only sweet food', b: 'Eat only savoury food' },
    { id: 'lp-wyr-4', a: 'Live in a castle', b: 'Live in a treehouse' },
    { id: 'lp-wyr-5', a: 'Be super strong', b: 'Be super fast' },
  ],
  upper_primary: [
    { id: 'up-wyr-1', a: 'Time-travel to the past', b: 'Time-travel to the future', topic: 'History' },
    { id: 'up-wyr-2', a: 'Read minds', b: 'Understand any language' },
    { id: 'up-wyr-3', a: 'Explore the deep ocean', b: 'Explore deep space', topic: 'Science' },
    { id: 'up-wyr-4', a: 'Always know what time it is', b: 'Always know which direction is north' },
    { id: 'up-wyr-5', a: 'Be famous for inventing something', b: 'Be famous for discovering something', topic: 'Ethics' },
  ],
  middle_school: [
    { id: 'ms-wyr-1', a: 'Live with no internet for a year', b: 'Live with no music for a year', topic: 'Ethics' },
    { id: 'ms-wyr-2', a: 'Always tell the truth', b: 'Always be told the truth', topic: 'Ethics' },
    { id: 'ms-wyr-3', a: 'Be a leader in a small group', b: 'Be a follower in a large group' },
    { id: 'ms-wyr-4', a: 'Solve climate change', b: 'End world hunger', topic: 'Civics' },
    { id: 'ms-wyr-5', a: 'Live somewhere with extreme heat', b: 'Live somewhere with extreme cold', topic: 'Geography' },
  ],
  senior_school: [
    { id: 'ss-wyr-1', a: 'Have unlimited free time', b: 'Have unlimited money', topic: 'Ethics' },
    { id: 'ss-wyr-2', a: 'Know how the universe began', b: 'Know how it will end', topic: 'Philosophy' },
    { id: 'ss-wyr-3', a: 'Eliminate one human emotion forever', b: 'Add a new one to humanity', topic: 'Ethics' },
    { id: 'ss-wyr-4', a: 'Live under a benevolent dictatorship', b: 'Live in a chaotic democracy', topic: 'Civics' },
    { id: 'ss-wyr-5', a: 'Discover an Earth-like exoplanet', b: 'Cure an incurable disease', topic: 'Science' },
  ],
};

// ---------- Heads Up themed words ----------

export interface HeadsUpCategory {
  id: string;
  name: string;
  words: string[];
}

export const HEADS_UP: HeadsUpCategory[] = [
  {
    id: 'animals',
    name: 'Animals',
    words: ['Kangaroo', 'Penguin', 'Elephant', 'Octopus', 'Crocodile', 'Koala', 'Dolphin', 'Hippopotamus', 'Tiger', 'Frog', 'Shark', 'Camel', 'Platypus', 'Eagle', 'Wombat'],
  },
  {
    id: 'foods',
    name: 'Foods',
    words: ['Pizza', 'Sushi', 'Lasagne', 'Pavlova', 'Curry', 'Salad', 'Pancake', 'Burger', 'Vegemite', 'Smoothie', 'Tacos', 'Spring roll', 'Lamington', 'Croissant', 'Dumpling'],
  },
  {
    id: 'sports',
    name: 'Sports',
    words: ['Cricket', 'AFL', 'Rugby', 'Soccer', 'Tennis', 'Basketball', 'Swimming', 'Archery', 'Surfing', 'Netball', 'Hockey', 'Athletics', 'Gymnastics', 'Cycling', 'Skiing'],
  },
  {
    id: 'movies',
    name: 'Movies & Shows',
    words: ['Bluey', 'Frozen', 'Toy Story', 'Star Wars', 'Harry Potter', 'Spider-Man', 'Lion King', 'Avatar', 'Finding Nemo', 'Encanto', 'Minions', 'Shrek', 'Inside Out', 'Moana'],
  },
  {
    id: 'jobs',
    name: 'Jobs',
    words: ['Doctor', 'Teacher', 'Pilot', 'Chef', 'Farmer', 'Vet', 'Astronaut', 'Plumber', 'Engineer', 'Artist', 'Firefighter', 'Lawyer', 'Scientist', 'Builder', 'Journalist'],
  },
  {
    id: 'places',
    name: 'Places',
    words: ['Beach', 'Library', 'Hospital', 'Airport', 'Zoo', 'Museum', 'Park', 'School', 'Restaurant', 'Cinema', 'Shopping centre', 'Train station', 'Stadium', 'Pool', 'Farm'],
  },
];

// ---------- 20 Questions item bank ----------

export interface TwentyQItem {
  id: string;
  item: string;
  category: string;
}

export const TWENTY_Q: TwentyQItem[] = [
  { id: 'tq-1', item: 'Kangaroo', category: 'Animal' },
  { id: 'tq-2', item: 'Pizza', category: 'Food' },
  { id: 'tq-3', item: 'Sydney Opera House', category: 'Landmark' },
  { id: 'tq-4', item: 'Bicycle', category: 'Object' },
  { id: 'tq-5', item: 'Albert Einstein', category: 'Person' },
  { id: 'tq-6', item: 'Eiffel Tower', category: 'Landmark' },
  { id: 'tq-7', item: 'Elephant', category: 'Animal' },
  { id: 'tq-8', item: 'Computer', category: 'Object' },
  { id: 'tq-9', item: 'Australia', category: 'Place' },
  { id: 'tq-10', item: 'Watermelon', category: 'Food' },
  { id: 'tq-11', item: 'Aeroplane', category: 'Object' },
  { id: 'tq-12', item: 'Tasmania', category: 'Place' },
  { id: 'tq-13', item: 'William Shakespeare', category: 'Person' },
  { id: 'tq-14', item: 'Pyramids of Giza', category: 'Landmark' },
  { id: 'tq-15', item: 'Octopus', category: 'Animal' },
  { id: 'tq-16', item: 'Toaster', category: 'Object' },
  { id: 'tq-17', item: 'Mount Everest', category: 'Place' },
  { id: 'tq-18', item: 'Banana', category: 'Food' },
  { id: 'tq-19', item: 'Marie Curie', category: 'Person' },
  { id: 'tq-20', item: 'Great Barrier Reef', category: 'Landmark' },
];

// ---------- Categories (Scattergories) ----------

export const CATEGORY_LISTS: { id: string; label: string }[] = [
  { id: 'animal', label: 'Animal' },
  { id: 'food', label: 'Food' },
  { id: 'country', label: 'Country' },
  { id: 'sport', label: 'Sport' },
  { id: 'verb', label: 'Verb (action)' },
  { id: 'name', label: 'First name' },
  { id: 'object', label: 'Object in a kitchen' },
  { id: 'job', label: 'Job' },
  { id: 'movie', label: 'Movie' },
  { id: 'colour', label: 'Colour' },
  { id: 'fruit', label: 'Fruit or veg' },
  { id: 'subject', label: 'School subject' },
];
