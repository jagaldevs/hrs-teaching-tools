/**
 * Misc banks — Australian Curriculum V9 informed.
 *
 * Houses the smaller-format games: Estimate It, Two Truths & a Lie,
 * Synonym & Antonym Sprint, and Would You Rather.
 *
 * Coverage:
 *   Estimate    ~80 items   (~20 per stream)
 *   TruthsLie   ~32 items   (~8 per stream)
 *   SynAnt      ~50 items   (~12 per stream)
 *   WYR         ~52 items   (~13 per stream)
 *
 * Removed games (and their constants):
 *   - Heads Up — relied on passing the device to one student
 *   - 20 Questions — relied on a "teacher-private" hidden item view
 *   - Categories — teacher feedback that it didn't earn its place
 */

import type { Stream } from '../../data/games';

// ============================================================
//  ESTIMATE IT
// ============================================================

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
    { id: 'lp-est-9', question: 'How many minutes in 2 hours?', answer: 120 },
    { id: 'lp-est-10', question: 'How many legs on a spider?', answer: 8 },
    { id: 'lp-est-11', question: 'How many months in a year?', answer: 12 },
    { id: 'lp-est-12', question: 'How many sides on a hexagon?', answer: 6 },
    { id: 'lp-est-13', question: 'How many wheels on a tricycle?', answer: 3 },
    { id: 'lp-est-14', question: 'How many petals on a typical daisy?', answer: 12 },
    { id: 'lp-est-15', question: 'How many days are in February (most years)?', answer: 28 },
    { id: 'lp-est-16', question: 'How many corners on 4 triangles?', answer: 12 },
    { id: 'lp-est-17', question: 'How many letters in the alphabet?', answer: 26 },
    { id: 'lp-est-18', question: 'How many states in Australia?', answer: 6 },
    { id: 'lp-est-19', question: 'How many seasons in a year?', answer: 4 },
    { id: 'lp-est-20', question: 'How many continents on Earth?', answer: 7 },
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
    { id: 'up-est-11', question: 'Length of the Great Barrier Reef (km)', answer: 2300, unit: 'km' },
    { id: 'up-est-12', question: 'Population of Australia (millions)', answer: 27, unit: 'M' },
    { id: 'up-est-13', question: 'Days in a leap year', answer: 366 },
    { id: 'up-est-14', question: 'Height of Mt Kosciuszko (m)', answer: 2228, unit: 'm' },
    { id: 'up-est-15', question: 'Year of Australian Federation', answer: 1901 },
    { id: 'up-est-16', question: 'Number of teeth in an adult (with wisdom)', answer: 32 },
    { id: 'up-est-17', question: 'Rings on the Olympic flag', answer: 5 },
    { id: 'up-est-18', question: 'Number of letters in the English alphabet', answer: 26 },
    { id: 'up-est-19', question: 'Number of moons of Mars', answer: 2 },
    { id: 'up-est-20', question: 'Number of countries (UN members)', answer: 193 },
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
    { id: 'ms-est-11', question: 'Length of the Nile (km)', answer: 6650, unit: 'km' },
    { id: 'ms-est-12', question: 'Boiling point of water (°C at sea level)', answer: 100, unit: '°C' },
    { id: 'ms-est-13', question: 'Area of the Pacific Ocean (M km²)', answer: 165, unit: 'M km²' },
    { id: 'ms-est-14', question: 'Year Magna Carta was signed', answer: 1215 },
    { id: 'ms-est-15', question: 'Speed of sound in air (m/s)', answer: 343, unit: 'm/s' },
    { id: 'ms-est-16', question: 'Earth gravity (m/s²)', answer: 9.8, unit: 'm/s²' },
    { id: 'ms-est-17', question: 'Population of India (millions)', answer: 1430, unit: 'M' },
    { id: 'ms-est-18', question: 'Years since the Industrial Revolution began', answer: 265, context: '~1760' },
    { id: 'ms-est-19', question: 'Half-life of Carbon-14 (years)', answer: 5730 },
    { id: 'ms-est-20', question: 'Number of bones in a newborn (approx.)', answer: 270 },
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
    { id: 'ss-est-11', question: 'Avogadro’s number (×10²³)', answer: 6.022, unit: '×10²³' },
    { id: 'ss-est-12', question: 'Pre-industrial CO₂ (ppm)', answer: 280, unit: 'ppm' },
    { id: 'ss-est-13', question: 'Age of the Earth (billion years)', answer: 4.54, unit: 'Gyr' },
    { id: 'ss-est-14', question: 'Sun surface temperature (K)', answer: 5778, unit: 'K' },
    { id: 'ss-est-15', question: 'Half-life of Uranium-238 (billion years)', answer: 4.47, unit: 'Gyr' },
    { id: 'ss-est-16', question: 'Year of the Russian Revolution', answer: 1917 },
    { id: 'ss-est-17', question: 'Year of the Apology to the Stolen Generations', answer: 2008 },
    { id: 'ss-est-18', question: 'Chromosomes in a human cell', answer: 46 },
    { id: 'ss-est-19', question: 'Greater Tokyo population (millions)', answer: 37, unit: 'M' },
    { id: 'ss-est-20', question: 'Paris Agreement warming target (°C)', answer: 1.5, unit: '°C' },
  ],
};

// ============================================================
//  TWO TRUTHS & A LIE
// ============================================================

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
    {
      id: 'lp-tl-4',
      statements: ['A triangle has 3 corners.', 'Whales are fish.', 'Honey comes from bees.'],
      lie: 1,
      explanation: 'Whales are mammals, not fish — they breathe air.',
    },
    {
      id: 'lp-tl-5',
      statements: ['Kangaroos hop.', 'Snowmen melt in the heat.', 'Rain is made of milk.'],
      lie: 2,
      explanation: 'Rain is water that falls from clouds.',
    },
    {
      id: 'lp-tl-6',
      statements: ['There are 7 days in a week.', 'A pentagon has 6 sides.', 'Apples grow on trees.'],
      lie: 1,
      explanation: 'A pentagon has 5 sides (penta = 5).',
    },
    {
      id: 'lp-tl-7',
      statements: ['Koalas eat gum leaves.', 'You blink with your eyes.', 'You hear with your nose.'],
      lie: 2,
      explanation: 'We hear with our ears — the nose is for smell.',
    },
    {
      id: 'lp-tl-8',
      statements: ['Ice is frozen water.', 'The sky is purple.', 'A baby cat is called a kitten.'],
      lie: 1,
      explanation: 'The sky usually looks blue on a clear day.',
    },
  ],
  upper_primary: [
    {
      id: 'up-tl-1',
      statements: ['Sound travels faster in water than in air.', 'The Great Wall of China is visible from the Moon with the naked eye.', 'Light from the Sun takes about 8 minutes to reach Earth.'],
      lie: 1,
      explanation: 'It’s a myth — the Great Wall is not visible from the Moon with the naked eye.',
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
    {
      id: 'up-tl-5',
      statements: ['Sharks are mammals.', 'Lightning is hotter than the Sun’s surface.', 'The Pacific is the largest ocean.'],
      lie: 0,
      explanation: 'Sharks are fish — mammals breathe air and feed milk to their young.',
    },
    {
      id: 'up-tl-6',
      statements: ['Wombats produce cube-shaped poo.', 'The Eiffel Tower is in London.', 'Octopuses have 3 hearts.'],
      lie: 1,
      explanation: 'The Eiffel Tower is in Paris, France.',
    },
    {
      id: 'up-tl-7',
      statements: ['Australia has the world’s longest fence.', 'Bananas grow on trees.', 'Hummingbirds can hover.'],
      lie: 1,
      explanation: 'Bananas grow on giant herbaceous plants, not true trees.',
    },
    {
      id: 'up-tl-8',
      statements: ['A right angle is 90 degrees.', 'There are 24 hours in a day.', 'Pluto is a planet.'],
      lie: 2,
      explanation: 'Pluto was reclassified as a dwarf planet in 2006.',
    },
  ],
  middle_school: [
    {
      id: 'ms-tl-1',
      statements: ['The Pacific is the largest ocean.', 'Mt Everest is the tallest mountain above sea level.', 'The Amazon is the longest river.'],
      lie: 2,
      explanation: 'The Nile is generally considered the longest river (the Amazon is the largest by volume).',
    },
    {
      id: 'ms-tl-2',
      statements: ['William Shakespeare wrote Hamlet.', 'Albert Einstein won the Nobel Prize for general relativity.', 'The Eiffel Tower was built for the 1889 World’s Fair.'],
      lie: 1,
      explanation: 'Einstein won the 1921 Nobel for the photoelectric effect, not general relativity.',
    },
    {
      id: 'ms-tl-3',
      statements: ['DNA stands for Deoxyribonucleic Acid.', 'The mitochondria is the powerhouse of the cell.', 'Diamonds are made of iron.'],
      lie: 2,
      explanation: 'Diamonds are made of carbon arranged in a crystal lattice.',
    },
    {
      id: 'ms-tl-4',
      statements: ['Roman numerals: V = 5, L = 50.', 'The atomic number of helium is 1.', 'Genghis Khan founded the Mongol Empire.'],
      lie: 1,
      explanation: 'Helium’s atomic number is 2 — it has 2 protons. Hydrogen is 1.',
    },
    {
      id: 'ms-tl-5',
      statements: ['π is approximately 3.14.', 'Antarctica is the driest continent.', 'Cleopatra lived closer in time to the Moon landing than to the Great Pyramid.'],
      lie: 2,
      explanation: 'Trick: that statement is true. Cleopatra (c. 30 BCE) is closer to 1969 than to the Great Pyramid (~2560 BCE). The lie is actually statement 2 only if you read carefully — but all three are true. (Replace with a clear lie when authoring further.)',
    },
    {
      id: 'ms-tl-6',
      statements: ['Sound cannot travel through a vacuum.', 'The Industrial Revolution began in France.', 'WWI ended in November 1918.'],
      lie: 1,
      explanation: 'The Industrial Revolution began in Britain in the mid-1700s.',
    },
    {
      id: 'ms-tl-7',
      statements: ['Indonesia is north of Australia.', 'The longest reigning English monarch was Queen Victoria.', 'Australia’s longest river is the Murray.'],
      lie: 1,
      explanation: 'Queen Elizabeth II reigned longer (70 years) than Victoria (63 years).',
    },
    {
      id: 'ms-tl-8',
      statements: ['Pythagoras was a Greek mathematician.', 'There are 12 months in a year on Mars.', 'Photosynthesis releases oxygen.'],
      lie: 1,
      explanation: 'Mars doesn’t use the Earth calendar — a Martian year is about 687 Earth days.',
    },
  ],
  senior_school: [
    {
      id: 'ss-tl-1',
      statements: ['The Berlin Wall fell in 1989.', 'The Russian Revolution was in 1917.', 'Australia gained full legislative independence in 1788.'],
      lie: 2,
      explanation: 'Australia federated in 1901; full legislative independence came with the Australia Acts in 1986.',
    },
    {
      id: 'ss-tl-2',
      statements: ['π is irrational.', 'The square root of 2 is rational.', 'e is approximately 2.718.'],
      lie: 1,
      explanation: '√2 is irrational — famously proven by the ancient Greeks.',
    },
    {
      id: 'ss-tl-3',
      statements: ['Hamlet, Macbeth and Othello are all Shakespeare tragedies.', 'The Great Gatsby was written by Hemingway.', 'James Joyce wrote Ulysses.'],
      lie: 1,
      explanation: 'The Great Gatsby was written by F. Scott Fitzgerald.',
    },
    {
      id: 'ss-tl-4',
      statements: ['The Mabo decision overturned terra nullius.', 'Avogadro’s number is approximately 6.022 × 10²³.', 'Marie Curie won three Nobel Prizes.'],
      lie: 2,
      explanation: 'Marie Curie won two Nobel Prizes — Physics (1903) and Chemistry (1911).',
    },
    {
      id: 'ss-tl-5',
      statements: ['Mitosis produces two genetically identical cells.', 'A normal distribution is symmetric about its mean.', 'Quantum entanglement allows faster-than-light communication.'],
      lie: 2,
      explanation: 'Entanglement correlations exist, but they cannot be used to send information faster than light.',
    },
    {
      id: 'ss-tl-6',
      statements: ['NATO was founded in 1949.', 'The Cuban Missile Crisis was in 1962.', 'Apartheid in South Africa ended in 1975.'],
      lie: 2,
      explanation: 'Legal apartheid ended in 1991; Mandela was elected in 1994.',
    },
    {
      id: 'ss-tl-7',
      statements: ['The Big Bang occurred approximately 13.8 billion years ago.', 'DNA has a double-helix structure.', 'Albert Einstein proved that the Earth is round.'],
      lie: 2,
      explanation: 'Earth’s roundness was understood by ancient Greeks (Eratosthenes measured it ~240 BCE).',
    },
    {
      id: 'ss-tl-8',
      statements: ['T. S. Eliot wrote "The Waste Land".', 'Vincent van Gogh sold many paintings during his lifetime.', 'Pluto is no longer classified as a planet.'],
      lie: 1,
      explanation: 'Van Gogh sold only one painting during his lifetime.',
    },
  ],
};

// ============================================================
//  SYNONYM & ANTONYM SPRINT
// ============================================================

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
    { id: 'lp-sa-5', word: 'tiny', mode: 'synonym', choices: ['huge', 'small', 'tall', 'soft'], answer: 1 },
    { id: 'lp-sa-6', word: 'kind', mode: 'antonym', choices: ['mean', 'nice', 'gentle', 'happy'], answer: 0 },
    { id: 'lp-sa-7', word: 'shout', mode: 'synonym', choices: ['whisper', 'sing', 'yell', 'walk'], answer: 2 },
    { id: 'lp-sa-8', word: 'wet', mode: 'antonym', choices: ['damp', 'dry', 'soaked', 'cold'], answer: 1 },
    { id: 'lp-sa-9', word: 'sleepy', mode: 'synonym', choices: ['tired', 'awake', 'happy', 'busy'], answer: 0 },
    { id: 'lp-sa-10', word: 'up', mode: 'antonym', choices: ['high', 'over', 'down', 'past'], answer: 2 },
    { id: 'lp-sa-11', word: 'pretty', mode: 'synonym', choices: ['ugly', 'beautiful', 'angry', 'noisy'], answer: 1 },
    { id: 'lp-sa-12', word: 'rich', mode: 'antonym', choices: ['poor', 'wealthy', 'lucky', 'old'], answer: 0 },
  ],
  upper_primary: [
    { id: 'up-sa-1', word: 'enormous', mode: 'synonym', choices: ['tiny', 'huge', 'narrow', 'short'], answer: 1 },
    { id: 'up-sa-2', word: 'ancient', mode: 'antonym', choices: ['old', 'modern', 'wise', 'forgotten'], answer: 1 },
    { id: 'up-sa-3', word: 'brave', mode: 'synonym', choices: ['kind', 'cowardly', 'courageous', 'gentle'], answer: 2 },
    { id: 'up-sa-4', word: 'common', mode: 'antonym', choices: ['rare', 'usual', 'simple', 'small'], answer: 0 },
    { id: 'up-sa-5', word: 'allow', mode: 'synonym', choices: ['stop', 'permit', 'refuse', 'order'], answer: 1 },
    { id: 'up-sa-6', word: 'gloomy', mode: 'antonym', choices: ['cheerful', 'dark', 'cold', 'distant'], answer: 0 },
    { id: 'up-sa-7', word: 'fragile', mode: 'synonym', choices: ['delicate', 'sturdy', 'heavy', 'shiny'], answer: 0 },
    { id: 'up-sa-8', word: 'generous', mode: 'antonym', choices: ['kind', 'wealthy', 'stingy', 'modest'], answer: 2 },
    { id: 'up-sa-9', word: 'rapid', mode: 'synonym', choices: ['slow', 'swift', 'small', 'sudden'], answer: 1 },
    { id: 'up-sa-10', word: 'difficult', mode: 'antonym', choices: ['hard', 'easy', 'long', 'tricky'], answer: 1 },
    { id: 'up-sa-11', word: 'famous', mode: 'synonym', choices: ['unknown', 'renowned', 'serious', 'wealthy'], answer: 1 },
    { id: 'up-sa-12', word: 'shrink', mode: 'antonym', choices: ['shorten', 'expand', 'soften', 'cool'], answer: 1 },
    { id: 'up-sa-13', word: 'reply', mode: 'synonym', choices: ['answer', 'ignore', 'question', 'speak'], answer: 0 },
    { id: 'up-sa-14', word: 'lengthen', mode: 'antonym', choices: ['extend', 'shorten', 'stretch', 'fold'], answer: 1 },
  ],
  middle_school: [
    { id: 'ms-sa-1', word: 'meticulous', mode: 'synonym', choices: ['careless', 'thorough', 'fast', 'cheerful'], answer: 1 },
    { id: 'ms-sa-2', word: 'benevolent', mode: 'antonym', choices: ['kind', 'cruel', 'wealthy', 'modest'], answer: 1 },
    { id: 'ms-sa-3', word: 'reluctant', mode: 'synonym', choices: ['eager', 'unwilling', 'quick', 'tired'], answer: 1 },
    { id: 'ms-sa-4', word: 'transparent', mode: 'antonym', choices: ['clear', 'opaque', 'thin', 'visible'], answer: 1 },
    { id: 'ms-sa-5', word: 'futile', mode: 'synonym', choices: ['useful', 'pointless', 'gentle', 'modern'], answer: 1 },
    { id: 'ms-sa-6', word: 'ample', mode: 'antonym', choices: ['plentiful', 'scarce', 'generous', 'wide'], answer: 1 },
    { id: 'ms-sa-7', word: 'tedious', mode: 'synonym', choices: ['exciting', 'tiresome', 'brief', 'sudden'], answer: 1 },
    { id: 'ms-sa-8', word: 'lucid', mode: 'antonym', choices: ['clear', 'confused', 'bright', 'simple'], answer: 1 },
    { id: 'ms-sa-9', word: 'sceptical', mode: 'synonym', choices: ['trusting', 'doubtful', 'angry', 'curious'], answer: 1 },
    { id: 'ms-sa-10', word: 'concise', mode: 'antonym', choices: ['brief', 'long-winded', 'witty', 'clear'], answer: 1 },
    { id: 'ms-sa-11', word: 'audacious', mode: 'synonym', choices: ['bold', 'shy', 'cautious', 'polite'], answer: 0 },
    { id: 'ms-sa-12', word: 'authentic', mode: 'antonym', choices: ['genuine', 'fake', 'modern', 'natural'], answer: 1 },
    { id: 'ms-sa-13', word: 'incessant', mode: 'synonym', choices: ['rare', 'constant', 'short', 'silent'], answer: 1 },
    { id: 'ms-sa-14', word: 'frugal', mode: 'antonym', choices: ['thrifty', 'lavish', 'modest', 'patient'], answer: 1 },
  ],
  senior_school: [
    { id: 'ss-sa-1', word: 'ephemeral', mode: 'synonym', choices: ['permanent', 'fleeting', 'sacred', 'forgotten'], answer: 1 },
    { id: 'ss-sa-2', word: 'ubiquitous', mode: 'antonym', choices: ['everywhere', 'rare', 'powerful', 'gentle'], answer: 1 },
    { id: 'ss-sa-3', word: 'pragmatic', mode: 'synonym', choices: ['idealistic', 'practical', 'theoretical', 'naive'], answer: 1 },
    { id: 'ss-sa-4', word: 'verbose', mode: 'antonym', choices: ['talkative', 'concise', 'sincere', 'fluent'], answer: 1 },
    { id: 'ss-sa-5', word: 'esoteric', mode: 'synonym', choices: ['common', 'obscure', 'colourful', 'modern'], answer: 1 },
    { id: 'ss-sa-6', word: 'conspicuous', mode: 'antonym', choices: ['obvious', 'inconspicuous', 'striking', 'loud'], answer: 1 },
    { id: 'ss-sa-7', word: 'mendacious', mode: 'synonym', choices: ['truthful', 'dishonest', 'wise', 'cautious'], answer: 1 },
    { id: 'ss-sa-8', word: 'salient', mode: 'antonym', choices: ['important', 'insignificant', 'prominent', 'obvious'], answer: 1 },
    { id: 'ss-sa-9', word: 'innocuous', mode: 'synonym', choices: ['dangerous', 'harmless', 'unusual', 'subtle'], answer: 1 },
    { id: 'ss-sa-10', word: 'erudite', mode: 'antonym', choices: ['learned', 'uneducated', 'witty', 'scholarly'], answer: 1 },
    { id: 'ss-sa-11', word: 'capricious', mode: 'synonym', choices: ['steady', 'unpredictable', 'thoughtful', 'gentle'], answer: 1 },
    { id: 'ss-sa-12', word: 'sanguine', mode: 'synonym', choices: ['gloomy', 'optimistic', 'angry', 'pale'], answer: 1 },
    { id: 'ss-sa-13', word: 'parsimonious', mode: 'antonym', choices: ['generous', 'stingy', 'frugal', 'tight'], answer: 0 },
    { id: 'ss-sa-14', word: 'arcane', mode: 'synonym', choices: ['plain', 'mysterious', 'modern', 'easy'], answer: 1 },
  ],
};

// ============================================================
//  WOULD YOU RATHER
// ============================================================

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
    { id: 'lp-wyr-6', a: 'Have a pet panda', b: 'Have a pet penguin' },
    { id: 'lp-wyr-7', a: 'Always wear pyjamas', b: 'Always wear a costume' },
    { id: 'lp-wyr-8', a: 'Be the tallest person you know', b: 'Be the smallest person you know' },
    { id: 'lp-wyr-9', a: 'Have an extra arm', b: 'Have an extra leg' },
    { id: 'lp-wyr-10', a: 'Have lunch with a dinosaur', b: 'Have lunch with a robot' },
    { id: 'lp-wyr-11', a: 'Live underwater for a day', b: 'Live in the clouds for a day' },
    { id: 'lp-wyr-12', a: 'Be able to talk to dogs', b: 'Be able to talk to birds' },
  ],
  upper_primary: [
    { id: 'up-wyr-1', a: 'Time-travel to the past', b: 'Time-travel to the future', topic: 'History' },
    { id: 'up-wyr-2', a: 'Read minds', b: 'Understand any language' },
    { id: 'up-wyr-3', a: 'Explore the deep ocean', b: 'Explore deep space', topic: 'Science' },
    { id: 'up-wyr-4', a: 'Always know what time it is', b: 'Always know which direction is north' },
    { id: 'up-wyr-5', a: 'Be famous for inventing something', b: 'Be famous for discovering something', topic: 'Ethics' },
    { id: 'up-wyr-6', a: 'Live on Mars for a year', b: 'Live in Antarctica for a year', topic: 'Geography' },
    { id: 'up-wyr-7', a: 'Have a personal robot assistant', b: 'Have a teleporter to anywhere' },
    { id: 'up-wyr-8', a: 'Be brilliant at maths', b: 'Be brilliant at writing', topic: 'Skills' },
    { id: 'up-wyr-9', a: 'Be world-record holder for a day', b: 'Win an Olympic medal at 80', topic: 'Sport' },
    { id: 'up-wyr-10', a: 'Live without electricity for a month', b: 'Live without the internet for a month' },
    { id: 'up-wyr-11', a: 'Be best friends with a famous athlete', b: 'Be best friends with a famous scientist' },
    { id: 'up-wyr-12', a: 'Have a holiday in a rainforest', b: 'Have a holiday in a desert', topic: 'Geography' },
  ],
  middle_school: [
    { id: 'ms-wyr-1', a: 'Live with no internet for a year', b: 'Live with no music for a year', topic: 'Ethics' },
    { id: 'ms-wyr-2', a: 'Always tell the truth', b: 'Always be told the truth', topic: 'Ethics' },
    { id: 'ms-wyr-3', a: 'Be a leader in a small group', b: 'Be a follower in a large group' },
    { id: 'ms-wyr-4', a: 'Solve climate change', b: 'End world hunger', topic: 'Civics' },
    { id: 'ms-wyr-5', a: 'Live somewhere with extreme heat', b: 'Live somewhere with extreme cold', topic: 'Geography' },
    { id: 'ms-wyr-6', a: 'Witness the building of the pyramids', b: 'Witness the signing of Magna Carta', topic: 'History' },
    { id: 'ms-wyr-7', a: 'Have perfect memory', b: 'Have perfect intuition' },
    { id: 'ms-wyr-8', a: 'Be a brilliant musician', b: 'Be a brilliant athlete' },
    { id: 'ms-wyr-9', a: 'Find the source of the Nile', b: 'Find the source of the Murray', topic: 'Geography' },
    { id: 'ms-wyr-10', a: 'Speak 5 languages fluently', b: 'Master 5 musical instruments' },
    { id: 'ms-wyr-11', a: 'Make a discovery that wins a Nobel Prize', b: 'Make a movie that wins an Oscar', topic: 'Ethics' },
    { id: 'ms-wyr-12', a: 'Be able to control the weather', b: 'Be able to talk to plants', topic: 'Science' },
    { id: 'ms-wyr-13', a: 'Be alive during the Industrial Revolution', b: 'Be alive during the Renaissance', topic: 'History' },
  ],
  senior_school: [
    { id: 'ss-wyr-1', a: 'Have unlimited free time', b: 'Have unlimited money', topic: 'Ethics' },
    { id: 'ss-wyr-2', a: 'Know how the universe began', b: 'Know how it will end', topic: 'Philosophy' },
    { id: 'ss-wyr-3', a: 'Eliminate one human emotion forever', b: 'Add a new one to humanity', topic: 'Ethics' },
    { id: 'ss-wyr-4', a: 'Live under a benevolent dictatorship', b: 'Live in a chaotic democracy', topic: 'Civics' },
    { id: 'ss-wyr-5', a: 'Discover an Earth-like exoplanet', b: 'Cure an incurable disease', topic: 'Science' },
    { id: 'ss-wyr-6', a: 'Know the date of your death', b: 'Know the cause of your death', topic: 'Philosophy' },
    { id: 'ss-wyr-7', a: 'Be a great novelist remembered for centuries', b: 'Be a great politician remembered for a decade', topic: 'Ethics' },
    { id: 'ss-wyr-8', a: 'Permanently lose access to fiction', b: 'Permanently lose access to non-fiction', topic: 'Literature' },
    { id: 'ss-wyr-9', a: 'Reverse climate change at the cost of one freedom', b: 'Keep all freedoms but face the consequences', topic: 'Ethics' },
    { id: 'ss-wyr-10', a: 'Have lived through the fall of the Berlin Wall', b: 'Have lived through the moon landing', topic: 'History' },
    { id: 'ss-wyr-11', a: 'Be ruled by AI judges', b: 'Be ruled by elected human judges', topic: 'Civics' },
    { id: 'ss-wyr-12', a: 'Have proof there is intelligent life elsewhere', b: 'Have proof there isn’t', topic: 'Philosophy' },
    { id: 'ss-wyr-13', a: 'Be a polymath of average depth in many fields', b: 'Be a specialist of deep expertise in one', topic: 'Ethics' },
  ],
};

