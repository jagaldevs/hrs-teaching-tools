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
import type { Subject } from '../../games/types';

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
  /**
   * Optional subject tag. Used by the legacy subject filter and as a
   * fallback hint for the colour chip. Prefer `classId` when an item
   * belongs to a specific HRS class.
   */
  subject?: Subject;
  /**
   * Optional HRS class id (see src/data/classes.ts). When set, the item
   * appears only when the user picks this class in the SetupScreen. Items
   * with classId set are still tagged with subject for chip colouring.
   */
  classId?: string;
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
    // ====== VCE Software Development Units 3-4 (computing) ======
    // Unit 3 AOS 1: Programming
    { id: 'ss-tl-comp-1', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['The four stages of the VCAA problem-solving methodology are Analysis, Design, Development and Evaluation.', 'Encapsulation is one of the OOP principles.', 'Selection sort has an average time complexity of O(log n).'], lie: 2, explanation: 'Selection sort is O(n²) on average — not O(log n).' },
    { id: 'ss-tl-comp-2', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['A FOR loop is a form of iteration.', 'An IF…ELSE statement is a form of selection.', 'Binary search works correctly on unsorted data.'], lie: 2, explanation: 'Binary search requires the data to be sorted first.' },
    { id: 'ss-tl-comp-3', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['A CSV file separates values with commas.', 'An XML file uses nested opening and closing tags.', 'JPG is a standard primary data source for SQL queries.'], lie: 2, explanation: 'JPG is an image format, not a structured data source.' },
    { id: 'ss-tl-comp-4', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['camelCase typically begins with a lowercase letter (e.g. studentName).', 'Hungarian notation prefixes the variable with its data type.', 'snake_case uses hyphens as separators.'], lie: 2, explanation: 'snake_case uses underscores, not hyphens.' },
    { id: 'ss-tl-comp-5', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Integer is a numeric data type.', 'Boolean has exactly two possible values.', 'Floating-point types are designed primarily to store dates and times.'], lie: 2, explanation: 'Floating-point stores fractional numbers; date/time is its own type.' },
    { id: 'ss-tl-comp-6', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Validation checks data for reasonableness on input.', 'Verification checks data after entry against the source.', 'An existence check ensures the entered value is unique in the database.'], lie: 2, explanation: 'An existence (presence) check confirms a field is not empty — not uniqueness.' },
    { id: 'ss-tl-comp-7', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['A range check confirms data falls between a defined minimum and maximum.', 'A type check confirms data matches the expected data type.', 'Syntax errors are only ever detected at runtime.'], lie: 2, explanation: 'Syntax errors are detected at compile/parse time, before execution.' },
    { id: 'ss-tl-comp-8', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Quick sort has an average complexity of O(n log n).', 'Linear search has a complexity of O(n).', 'Binary search is generally slower than linear search on large sorted lists.'], lie: 2, explanation: 'Binary search is much faster — O(log n) vs O(n).' },
    { id: 'ss-tl-comp-9', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['A divide-by-zero error is a runtime error.', 'A missing semicolon is typically a syntax error.', 'A logic error always prevents the program from compiling.'], lie: 2, explanation: 'Logic errors compile fine — they produce incorrect output during execution.' },
    { id: 'ss-tl-comp-10', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Inheritance lets a subclass acquire members from a superclass.', 'Abstraction hides internal complexity, exposing essential features.', 'Encapsulation means every class member must be declared public.'], lie: 2, explanation: 'Encapsulation hides internal state — public would expose, not encapsulate.' },
    { id: 'ss-tl-comp-11', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['A 2D array is well suited to representing a chessboard.', 'A record can hold fields of different data types.', 'In a strongly-typed language, a 1D array typically holds elements of mixed data types.'], lie: 2, explanation: 'Arrays hold elements of the same type; records hold mixed types.' },
    { id: 'ss-tl-comp-12', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Breakpoints pause execution at a chosen line for inspection.', 'Internal documentation aids future maintenance of the code.', 'Test cases should only ever use valid input data.'], lie: 2, explanation: 'Good test cases include invalid and boundary data, not just valid inputs.' },
    { id: 'ss-tl-comp-13', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['IPO charts describe Inputs, Processes and Outputs of a module.', 'Pseudocode is language-independent.', 'A data dictionary primarily documents the user-interface colour scheme.'], lie: 2, explanation: 'A data dictionary documents each data element — name, type, size, validation, description.' },
    { id: 'ss-tl-comp-14', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Overflow, index-out-of-range and divide-by-zero are runtime errors.', 'Syntax errors prevent successful compilation.', 'Logic errors and syntax errors are exactly the same thing.'], lie: 2, explanation: 'They\'re distinct categories — logic errors compile fine but produce wrong output.' },
    { id: 'ss-tl-comp-15', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['AI code generators can speed up boilerplate writing.', 'Responsible AI use requires reviewing generated code for correctness.', 'AI-generated code is automatically free of intellectual property issues.'], lie: 2, explanation: 'AI-generated code can reproduce copyrighted training material — provenance must be considered.' },
    { id: 'ss-tl-comp-16', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Selection sort has an average complexity of O(n²).', 'Selection sort is generally faster than quick sort on large data sets.', 'Quick sort\'s worst-case complexity is O(n²).'], lie: 1, explanation: 'Quick sort (O(n log n) average) is faster than selection sort (O(n²)) on large data sets.' },
    { id: 'ss-tl-comp-17', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Common data source file formats studied include TXT, CSV and XML.', 'An XML file always uses commas as its only delimiter.', 'A CSV file is typically opened by spreadsheet software.'], lie: 1, explanation: 'XML uses nested tags, not commas — CSV is the comma-delimited format.' },
    { id: 'ss-tl-comp-18', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['A function typically returns a value; a procedure typically does not.', 'Methods are functions belonging to a class.', 'A constant can be reassigned a new value after declaration.'], lie: 2, explanation: 'Constants, by definition, cannot be reassigned after declaration.' },
    { id: 'ss-tl-comp-19', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Generalisation factors common features into a more general superclass.', 'Encapsulation bundles data with the methods that operate on it.', 'Abstraction and encapsulation are exactly the same OOP principle.'], lie: 2, explanation: 'They are distinct: abstraction hides complexity; encapsulation bundles + controls access.' },
    { id: 'ss-tl-comp-20', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['"private" restricts a member to its own class.', '"protected" exposes a member to subclasses.', '"public" is the most restrictive access modifier.'], lie: 2, explanation: '"public" is the most open; "private" is the most restrictive.' },
    // Unit 3 AOS 2: Analysis & Design
    { id: 'ss-tl-comp-21', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['A Gantt chart plots tasks on a timeline showing dependencies.', 'The critical path is the longest chain of dependent tasks.', 'A milestone is a tiny, inconsequential task with no project significance.'], lie: 2, explanation: 'A milestone marks a significant checkpoint or event in the project.' },
    { id: 'ss-tl-comp-22', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['The Privacy Act 1988 is a federal (Commonwealth) Act.', 'The Privacy and Data Protection Act 2014 is a Victorian Act.', 'The Copyright Act 1968 was passed by the United Nations.'], lie: 2, explanation: 'The Copyright Act 1968 is Australian (Cwlth), not a UN document.' },
    { id: 'ss-tl-comp-23', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['APP 11 covers the security of personal information.', 'Interviews are a method of collecting primary data.', 'Searching public online databases is classified as primary data collection.'], lie: 2, explanation: 'Data collected by others (databases, reports) is secondary; primary data is collected by the researcher.' },
    { id: 'ss-tl-comp-24', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['A context diagram is also called a Level 0 DFD.', 'A use case diagram includes actors and a system boundary.', 'The data dictionary is primarily a project-management tool.'], lie: 2, explanation: 'The data dictionary is a design/analysis tool that documents data elements.' },
    { id: 'ss-tl-comp-25', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Functional requirements describe what the system does.', 'Non-functional requirements describe quality attributes like usability and reliability.', 'Constraints and scope mean exactly the same thing.'], lie: 2, explanation: 'Constraints are limitations; scope is the boundary of what will/won\'t be addressed.' },
    { id: 'ss-tl-comp-26', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Differential backups copy changes since the last full backup.', 'Incremental backups copy changes since any prior backup.', 'Full backups deliberately skip the operating system files.'], lie: 2, explanation: 'A full backup copies the entire dataset, including OS files when configured.' },
    { id: 'ss-tl-comp-27', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Mood boards belong to the ideation phase.', 'Mock-ups belong to the detailed design phase.', 'Modern version-control systems were invented in 2020.'], lie: 2, explanation: 'Version control predates 2020 by decades — RCS (1982), CVS (1990), Subversion (2000), Git (2005).' },
    { id: 'ss-tl-comp-28', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['UX affordance refers to visual cues suggesting how an element can be used.', 'Interoperability is a UX characteristic in the study design.', '"Compilation" is listed as a UX characteristic.'], lie: 2, explanation: 'UX characteristics per the study design are affordance, interoperability, security and usability — not compilation.' },
    { id: 'ss-tl-comp-29', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Design principles include alignment, balance and contrast.', 'Pseudocode is appropriate for representing algorithmic logic.', 'Storyboards are exclusively used for film, never for software design.'], lie: 2, explanation: 'Storyboards are widely used in software UX design to map user flows.' },
    { id: 'ss-tl-comp-30', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['An SRS documents requirements, constraints, scope and user characteristics.', 'Surveys can collect data from a large sample efficiently.', 'An online survey is generally a more personal data-collection method than a face-to-face interview.'], lie: 2, explanation: 'Face-to-face interviews are far more personal than online surveys.' },
    { id: 'ss-tl-comp-31', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['A use case represents a unit of functionality from the user\'s perspective.', '«includes» in a use case diagram represents mandatory sub-behaviour.', '«extends» in a use case diagram represents class inheritance.'], lie: 2, explanation: '«extends» represents optional behaviour, not inheritance — inheritance is an OOP class relationship.' },
    { id: 'ss-tl-comp-32', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['A DFD shows processes, data stores, entities and data flows.', 'A context diagram represents the system as a single process.', 'A context diagram exposes every internal database table of the system.'], lie: 2, explanation: 'A context diagram deliberately abstracts internals — only external entities and the single process bubble appear.' },
    { id: 'ss-tl-comp-33', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['The brief documents the problem, proposed users and chosen programming language.', 'The project plan typically uses a Gantt chart.', 'The brief should be at least 50 pages long to be valid.'], lie: 2, explanation: 'A brief is short and scoping — typically one or two pages, not 50.' },
    { id: 'ss-tl-comp-34', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Naming conventions are part of file-management techniques.', 'Backups can be stored on local, external or cloud storage.', 'Securely disposing of obsolete data is irrelevant in educational settings.'], lie: 2, explanation: 'Secure disposal is a legal and ethical requirement in all settings, including education.' },
    { id: 'ss-tl-comp-35', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Brainstorming generates many ideas quickly.', 'Mind maps visually link related concepts.', 'Producing useful design sketches requires professional artistic training.'], lie: 2, explanation: 'Rough, low-fidelity sketches are an explicit study-design tool — no art training required.' },
    { id: 'ss-tl-comp-36', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Economic constraints include cost and time.', 'Technical constraints include processing speed and capacity.', 'Legal constraints only apply to international software projects.'], lie: 2, explanation: 'Legal constraints (copyright, privacy) apply to local Australian projects too.' },
    { id: 'ss-tl-comp-37', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Social constraints can include the level of expertise of users.', 'Usability constraints include accessibility.', 'The study design lists "fashion" as a category of constraint.'], lie: 2, explanation: 'The four constraint categories are economic, legal, social and technical — not fashion.' },
    { id: 'ss-tl-comp-38', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['An SRS should specify the technical environment.', 'An SRS should describe user characteristics.', 'An SRS does not need to address solution scope.'], lie: 2, explanation: 'Scope is one of the explicit required features of an SRS.' },
    { id: 'ss-tl-comp-39', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Observation is a primary data collection method.', 'Existing reports authored by others are an example of primary data.', 'Surveys can collect both quantitative and qualitative data.'], lie: 1, explanation: 'Reports authored by others are secondary data, not primary.' },
    { id: 'ss-tl-comp-40', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['APP 1 covers open and transparent management of personal information.', 'APP 6 covers the use or disclosure of personal information.', 'APP 11 specifically governs the funding of cybersecurity teams.'], lie: 2, explanation: 'APP 11 covers the security of personal information — not funding.' },
    // Unit 4 AOS 1: Development & Evaluation
    { id: 'ss-tl-comp-41', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Alpha testing is performed by developers and internal testers.', 'Beta testing is performed by potential end users.', 'Beta testing must always finish before alpha testing begins.'], lie: 2, explanation: 'Alpha precedes beta — alpha is internal, beta puts it in front of real users next.' },
    { id: 'ss-tl-comp-42', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['A "private" class member is visible within its own class.', 'A "protected" class member is visible to subclasses.', 'A "public" class member is the most restrictive access modifier.'], lie: 2, explanation: '"public" is the most permissive; "private" is the most restrictive.' },
    { id: 'ss-tl-comp-43', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['An API exposes functionality to be called by other software.', 'A library is a collection of reusable code.', 'Using a third-party library removes any need to test your own code.'], lie: 2, explanation: 'Integrating third-party code still requires testing of your own usage.' },
    { id: 'ss-tl-comp-44', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Code repositories support branching and merging.', 'Version control preserves project history.', 'Code repositories make programming languages compile faster.'], lie: 2, explanation: 'Code repositories store source — they don\'t change compiler speed.' },
    { id: 'ss-tl-comp-45', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['An evaluation strategy defines criteria, time frame and responsibility.', 'Evaluation criteria measure the efficiency and effectiveness of the solution.', 'Evaluation must be completed before any development begins.'], lie: 2, explanation: 'Evaluation comes after development in the methodology, though planning happens earlier.' },
    { id: 'ss-tl-comp-46', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Scope creep is a common cause of project plan failure.', 'Personnel changes can affect project timelines.', 'The total number of comments in the code is a recognised project plan effectiveness factor.'], lie: 2, explanation: 'The three factors named are scope creep, personnel changes and technical issues.' },
    { id: 'ss-tl-comp-47', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Beta test plans include test scenarios, observation and documentation of results.', 'Beta testing should be conducted in an environment similar to deployment.', 'Beta testers should always be the original developers themselves.'], lie: 2, explanation: 'Beta testers are potential end users — not the original developers (that would be alpha).' },
    { id: 'ss-tl-comp-48', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Commenting out code temporarily disables it during debugging.', 'Breakpoints pause program execution at chosen lines.', 'Both techniques permanently delete the affected code from the source file.'], lie: 2, explanation: 'Neither technique deletes code — both are temporary debugging aids.' },
    { id: 'ss-tl-comp-49', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Project journals/logs record progress and decisions over time.', 'Annotations on a project plan can explain deviations from the original schedule.', 'A project plan must never be modified once initially set.'], lie: 2, explanation: 'Project plans are living documents — they should be monitored and modified throughout.' },
    { id: 'ss-tl-comp-50', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Detailed internal documentation supports future maintenance.', 'User-centred design is a characteristic of effective solutions.', 'Clear, concise code is irrelevant as long as the program compiles.'], lie: 2, explanation: 'Clarity and conciseness are explicit characteristics of efficient and effective solutions.' },
    { id: 'ss-tl-comp-51', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Test data should exercise typical, boundary and invalid inputs.', 'A testing table compares expected and actual output for given test data.', 'Testing tables are forbidden from including pass/fail columns.'], lie: 2, explanation: 'Pass/fail or "matches expected?" columns are standard and expected.' },
    { id: 'ss-tl-comp-52', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['AI assistants can generate code suggestions from natural-language prompts.', 'Responsible AI use includes reviewing output for correctness and IP issues.', 'Code generated by AI never needs to be tested.'], lie: 2, explanation: 'AI-generated code must be tested like any other code — it can contain bugs and security flaws.' },
    { id: 'ss-tl-comp-53', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Validation typically occurs as data is input.', 'Verification confirms entered data matches the source.', 'Validation and verification mean exactly the same thing.'], lie: 2, explanation: 'They\'re distinct: validation = on input, reasonableness; verification = after entry, accuracy vs source.' },
    { id: 'ss-tl-comp-54', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Overflow is classed as a runtime error.', 'Index out of range is classed as a runtime error.', 'Range checking is a debugging technique used to inspect program state.'], lie: 2, explanation: 'Range checking is a validation technique, not a debugging technique.' },
    { id: 'ss-tl-comp-55', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Recording adjustments to tasks supports project transparency.', 'Annotating a project plan with reasons for change is good practice.', 'A project plan should be deleted as soon as it is created.'], lie: 2, explanation: 'The plan is referenced throughout the project — never deleted.' },
    { id: 'ss-tl-comp-56', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Efficient solutions minimise wasted time and effort.', 'Effective solutions meet their intended purpose.', 'A solution can be effective even when it fails to meet its requirements.'], lie: 2, explanation: 'Effectiveness, by definition, means meeting the intended requirements.' },
    { id: 'ss-tl-comp-57', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Beta testing helps identify usability issues from real users.', 'Beta test results can drive solution modifications.', 'Beta testers must be paid consultants only — never students or peers.'], lie: 2, explanation: 'The study design explicitly notes students can act as beta testers in a school context.' },
    // Unit 4 AOS 2: Cyber security — secure software development practices
    { id: 'ss-tl-comp-58', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['The Essential Eight is published by the Australian Cyber Security Centre.', 'Multi-factor authentication is one of the Essential Eight strategies.', 'The Essential Eight contains only three strategies.'], lie: 2, explanation: 'It\'s called the Essential Eight because it contains eight strategies.' },
    { id: 'ss-tl-comp-59', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Combining development, testing and production environments increases security risk.', 'Separated environments isolate failures and limit blast radius.', 'Separated environments require zero ongoing maintenance.'], lie: 2, explanation: 'Maintaining parity between environments is itself an ongoing cost.' },
    { id: 'ss-tl-comp-60', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Encryption at rest protects data stored on disk.', 'Encryption in transit protects data while travelling across networks.', 'Plaintext storage of sensitive data is a recommended security practice.'], lie: 2, explanation: 'Plaintext storage of sensitive data is what good security practice prevents.' },
    { id: 'ss-tl-comp-61', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Code review is a peer-based quality practice.', 'Code reviews can catch security flaws before merge.', 'Code reviews only check formatting, never logic or security.'], lie: 2, explanation: 'Code reviews cover correctness, security, design and maintainability — not just style.' },
    { id: 'ss-tl-comp-62', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Identity and Access Management enforces the principle of least privilege.', 'Shared admin passwords represent a security risk.', 'Granting every employee administrator rights improves overall security.'], lie: 2, explanation: 'Universal admin privileges violate least-privilege and dramatically increase risk.' },
    { id: 'ss-tl-comp-63', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['An insider threat can arise from a former employee retaining credentials.', 'A man-in-the-middle attack intercepts communications between two parties.', 'Malware is software designed to improve a system\'s performance.'], lie: 2, explanation: 'Malware is malicious software — designed to harm, disrupt or gain unauthorised access.' },
    { id: 'ss-tl-comp-64', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Threat modelling defines security requirements early in the process.', 'Threat modelling involves identifying and mitigating threats.', 'Threat modelling can be safely skipped if the development team is small.'], lie: 2, explanation: 'Team size doesn\'t reduce the value of threat modelling.' },
    { id: 'ss-tl-comp-65', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Patching software closes known vulnerabilities.', 'Unpatched software is a common attack vector for cyber criminals.', 'Patches typically degrade performance so much they should be avoided.'], lie: 2, explanation: 'Most patches close security holes with negligible performance impact and should be applied promptly.' },
    { id: 'ss-tl-comp-66', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['The Information Security Manual (ISM) is an Australian government publication.', 'The ISM includes guidance for software development environments.', 'The ISM is legally mandatory for every organisation worldwide.'], lie: 2, explanation: 'The ISM is mandatory for Australian government agencies and a reference for industry — not a worldwide legal requirement.' },
    { id: 'ss-tl-comp-67', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Onboarding training can reinforce secure coding practices from day one.', 'Risk management plans document risks, likelihood, impact and mitigations.', 'Onboarding training is irrelevant to software development.'], lie: 2, explanation: 'Training reduces the introduction of vulnerabilities and is an explicit improvement strategy.' },
    { id: 'ss-tl-comp-68', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['APIs can become security vulnerabilities if poorly authenticated.', 'Third-party software brings supply-chain risk.', 'Open-source software is automatically free of vulnerabilities.'], lie: 2, explanation: 'Open-source has vulnerabilities like any software — recall Log4Shell and Heartbleed.' },
    { id: 'ss-tl-comp-69', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['A "zero-day" vulnerability has no public patch at the time of exploitation.', 'Defence in depth layers multiple complementary security controls.', 'The principle of least privilege intentionally grants users more access than they need.'], lie: 2, explanation: 'Least privilege grants the minimum required access — not more.' },
    { id: 'ss-tl-comp-70', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['The CIA triad stands for Confidentiality, Integrity and Availability.', 'The Copyright Act 1968 (Cwlth) can protect original software code as a literary work.', 'The Privacy Act 1988 applies only to residents of Victoria.'], lie: 2, explanation: 'The Privacy Act 1988 is a Commonwealth Act applying nationwide, not Victoria-only.' },
    { id: 'ss-tl-comp-71', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Ethical use of AI in development considers the provenance of training data.', 'Generative AI can occasionally reproduce copyrighted material verbatim.', 'AI-generated code is always free of bias and security flaws.'], lie: 2, explanation: 'AI-generated code can carry bias from training data and contain insecure patterns.' },
    { id: 'ss-tl-comp-72', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Hashed passwords cannot be trivially reversed back into plaintext.', 'Storing passwords in plaintext is a serious security mistake.', 'Salting passwords before hashing makes them weaker.'], lie: 2, explanation: 'Salting strengthens hashed passwords by defeating precomputed rainbow tables.' },
    { id: 'ss-tl-comp-73', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Robust IAM is recognised as a security control.', 'Encryption is recognised as a security control.', 'Disabling all firewalls improves system security.'], lie: 2, explanation: 'Firewalls are a critical line of defence — disabling them removes that defence.' },
    { id: 'ss-tl-comp-74', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['Regular updates and patches are listed as a security control in the study design.', 'Combined development, testing and production environments are listed as a vulnerability.', 'Code review is listed as a vulnerability rather than a security control.'], lie: 2, explanation: 'Code review is a security control, not a vulnerability.' },
    { id: 'ss-tl-comp-75', subject: 'computing', classId: 'vce-software-development-3-4', statements: ['APP 11 (Cwlth) addresses the security of personal information.', 'IPP 4 (Vic) addresses data security.', 'Both APP 11 and IPP 4 require organisations to publish all personal data publicly.'], lie: 2, explanation: 'These principles do the opposite — they require protection of personal data, not public publication.' },
    // ====== VCE Sociology Units 3-4 (75 items, anchored to study design + 2025 exam) ======
    // Unit 3 AOS 1: Australian Indigenous cultures
    { id: 'ss-tl-soc-1', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Charles Wright Mills developed the concept of the sociological imagination in 1959.', 'Mills argued the imagination connects personal experience to wider social structures.', 'Mills classified social movements into four types: alternative, redemptive, reformative and revolutionary.'], lie: 2, explanation: 'The four types of social movement come from the broader sociological literature, not from Mills.' },
    { id: 'ss-tl-soc-2', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Material culture refers to physical artefacts like tools, clothing and artwork.', 'Non-material culture includes values, beliefs, norms and language.', 'Both material and non-material culture are intangible.'], lie: 2, explanation: 'Material culture is tangible by definition; non-material is intangible.' },
    { id: 'ss-tl-soc-3', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Ethnocentrism judges other cultures by the standards of one\'s own.', 'Cultural relativism understands a culture on its own terms.', 'Ethnocentrism and cultural relativism mean the same thing.'], lie: 2, explanation: 'They are opposing approaches — ethnocentrism imposes external standards; relativism uses internal ones.' },
    { id: 'ss-tl-soc-4', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Australian Indigenous cultures comprise many distinct nations and language groups.', 'There are over 250 Indigenous language groups in Australia.', 'All Australian Indigenous people share one single homogenous culture.'], lie: 2, explanation: 'VCAA explicitly identifies "one culture" as a public misconception. There are 250+ language groups.' },
    { id: 'ss-tl-soc-5', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Most Australian Indigenous people live in urban and regional areas.', 'A common public misconception is that they mainly live in arid regions.', 'It is accurate to say all Indigenous Australians live a traditional desert lifestyle.'], lie: 2, explanation: 'That claim is the misconception. Most live in urban/regional locations.' },
    { id: 'ss-tl-soc-6', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Terra nullius was the legal fiction that Australia was uninhabited prior to European arrival.', 'The Mabo decision (1992) overturned terra nullius.', 'Terra nullius is still part of Australian common law today.'], lie: 2, explanation: 'Mabo (1992) overturned terra nullius and recognised native title.' },
    { id: 'ss-tl-soc-7', subject: 'history', classId: 'vce-sociology-3-4', statements: ['The 2008 National Apology was delivered by Prime Minister Kevin Rudd.', 'The Apology addressed the wrongs done to the Stolen Generations.', 'The Apology was a form of practical reconciliation.'], lie: 2, explanation: 'The Apology is a SYMBOLIC act of reconciliation, not practical.' },
    { id: 'ss-tl-soc-8', subject: 'history', classId: 'vce-sociology-3-4', statements: ['The Closing the Gap policy targets measurable disparities in health, education and employment.', 'Closing the Gap is an example of practical reconciliation.', 'Closing the Gap is purely a symbolic gesture.'], lie: 2, explanation: 'Closing the Gap is the textbook example of PRACTICAL reconciliation — measurable outcomes and funded programs.' },
    { id: 'ss-tl-soc-9', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Protection-era policies established reserves and mission stations.', 'The assimilation policy contributed to the Stolen Generations.', 'The Northern Territory Intervention (NTER) was introduced in 1992.'], lie: 2, explanation: 'The NTER was introduced in 2007 by the Howard government.' },
    { id: 'ss-tl-soc-10', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Acknowledgement of Country can be given by any speaker.', 'Welcome to Country must be performed by a Traditional Owner.', 'The two terms mean exactly the same thing.'], lie: 2, explanation: 'They are distinct — Welcome is performed by Traditional Owners; Acknowledgement can be made by anyone.' },
    { id: 'ss-tl-soc-11', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Evan Willis identifies four facets of the sociological imagination: historical, cultural, structural and critical.', 'Mills coined the term in 1959.', 'Willis added a fifth facet called "algorithmic".'], lie: 2, explanation: 'There is no algorithmic facet. Willis names four facets only.' },
    { id: 'ss-tl-soc-12', subject: 'history', classId: 'vce-sociology-3-4', statements: ['The Uluru Statement from the Heart was issued in 2017.', 'It called for Voice, Treaty and Truth.', 'It was delivered by the federal government.'], lie: 2, explanation: 'The Uluru Statement was delivered by First Nations delegates, not the government.' },
    { id: 'ss-tl-soc-13', subject: 'history', classId: 'vce-sociology-3-4', statements: ['A boomerang is an example of material culture.', 'A Dreaming story is an example of non-material culture.', 'A boomerang and a Dreaming story belong to the same category of culture.'], lie: 2, explanation: 'They belong to opposite categories — material vs non-material.' },
    { id: 'ss-tl-soc-14', subject: 'history', classId: 'vce-sociology-3-4', statements: ['The Stolen Generations refers to Indigenous children forcibly removed from their families.', 'Removals occurred from the late 1800s to the 1970s under various assimilation-era policies.', 'The Stolen Generations is a recent post-2020 phenomenon.'], lie: 2, explanation: 'The Stolen Generations span roughly a century — late 1800s to 1970s.' },
    { id: 'ss-tl-soc-15', subject: 'history', classId: 'vce-sociology-3-4', statements: ['The 1967 referendum changed the Constitution to count Indigenous Australians in the census.', 'It gave the federal government power to legislate for Indigenous Australians.', 'It returned all Australian land to traditional owners.'], lie: 2, explanation: 'The 1967 referendum did NOT return land; it amended the Constitution.' },
    { id: 'ss-tl-soc-16', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Native title was recognised by the Mabo decision in 1992.', 'Native title is a legally recognised but limited form of land rights.', 'Native title gives Indigenous people freehold ownership of all Australian land.'], lie: 2, explanation: 'Native title is narrower than freehold — a recognised but limited form of land rights.' },
    { id: 'ss-tl-soc-17', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Wurundjeri Woi-Wurrung are the Traditional Owners of land in the Melbourne region.', 'Yorta Yorta and Larrakia are distinct Australian Indigenous nations.', 'All Australian Indigenous nations speak the same language.'], lie: 2, explanation: 'There are over 250 Indigenous language groups — far from one language.' },
    { id: 'ss-tl-soc-18', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Symbolic reconciliation includes speeches, acknowledgements and apologies.', 'Practical reconciliation includes funded programs targeting measurable outcomes.', 'Symbolic and practical reconciliation cannot coexist.'], lie: 2, explanation: 'They are complementary — many efforts include both symbolic and practical elements.' },

    // Unit 3 AOS 2: Ethnicity
    { id: 'ss-tl-soc-19', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Sociologists generally prefer "ethnicity" to "race" as an analytical category.', 'Ethnicity captures shared cultural heritage; race is based on visible physical traits.', 'Race has strong scientific validity as a biological category.'], lie: 2, explanation: 'Race lacks scientific validity as a biological category — a key reason sociologists prefer ethnicity.' },
    { id: 'ss-tl-soc-20', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Stuart Hall developed the theory of cultural hybridity.', 'Hybridity captures dual or multiple cultural identities.', 'Hall argued cultural identity is fixed at birth and unchangeable.'], lie: 2, explanation: 'Hall\'s hybridity emphasises FLUID identities, not fixed ones.' },
    { id: 'ss-tl-soc-21', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Multiculturalism became Australia\'s official policy in 1973.', 'It was introduced under the Whitlam government.', 'It replaced the policy of assimilation introduced in 1788.'], lie: 2, explanation: 'Assimilation was a 20th-century policy (1937+), not 1788. 1788 was European arrival.' },
    { id: 'ss-tl-soc-22', subject: 'history', classId: 'vce-sociology-3-4', statements: ['The White Australia Policy was enacted in 1901 at Federation.', 'It restricted non-European immigration.', 'It was officially in place until the late 1990s.'], lie: 2, explanation: 'The White Australia Policy was dismantled through the 1960s and 70s, not the 1990s.' },
    { id: 'ss-tl-soc-23', subject: 'history', classId: 'vce-sociology-3-4', statements: ['"Othering" defines individuals or groups as not fitting within the in-group\'s norms.', 'Othering can fuel prejudice and discrimination.', 'Othering is generally considered helpful for building belonging.'], lie: 2, explanation: 'Othering UNDERMINES belonging — it marks groups as outsiders.' },
    { id: 'ss-tl-soc-24', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Ethical methodology requires voluntary participation, informed consent, privacy and confidentiality of data.', 'The Australian Sociological Association (TASA) publishes these guidelines.', 'These principles are optional for sociological research.'], lie: 2, explanation: 'These principles are REQUIRED — not optional — for ethical sociological research.' },
    { id: 'ss-tl-soc-25', subject: 'history', classId: 'vce-sociology-3-4', statements: ['About 30% of Australians were born overseas.', 'About 50% have at least one parent born overseas.', 'Australia has one of the lowest overseas-born populations in the developed world.'], lie: 2, explanation: 'Australia has one of the HIGHEST overseas-born populations in the developed world.' },
    { id: 'ss-tl-soc-26', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Informed consent requires participants to be told the purpose, nature and implications of the study.', 'Privacy means participants\' identifying details are protected.', 'Confidentiality of data means information collected is freely shared with all interested parties.'], lie: 2, explanation: 'Confidentiality is the OPPOSITE — data isn\'t shared beyond the agreed scope.' },
    { id: 'ss-tl-soc-27', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Factors that may prevent belonging include hostile media representations.', 'Government policy and funding can enable or prevent belonging.', 'Cultural practices are irrelevant to whether minorities feel they belong.'], lie: 2, explanation: 'Responses to cultural practices are an explicit study-design factor in belonging.' },
    { id: 'ss-tl-soc-28', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Multiculturalism preserves and celebrates difference.', 'Assimilation absorbs minorities into the dominant culture.', 'Multiculturalism and assimilation mean the same thing.'], lie: 2, explanation: 'They are opposing policy approaches.' },
    { id: 'ss-tl-soc-29', subject: 'history', classId: 'vce-sociology-3-4', statements: ['"Diaspora" refers to communities living away from their ancestral homeland.', 'Diaspora communities typically maintain cultural ties to the homeland.', 'Diaspora is a synonym for ethnocentrism.'], lie: 2, explanation: 'Diaspora has nothing to do with ethnocentrism — they are unrelated concepts.' },
    { id: 'ss-tl-soc-30', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Cultural hybridity often emerges through migration and globalisation.', 'Stuart Hall is the theorist most associated with hybridity.', 'Cultural hybridity is a concept exclusive to Australian sociology.'], lie: 2, explanation: 'Hybridity is a global sociological concept, not Australia-specific.' },
    { id: 'ss-tl-soc-31', subject: 'history', classId: 'vce-sociology-3-4', statements: ['A second-generation Vietnamese-Australian who celebrates both Tết and Christmas illustrates cultural hybridity.', 'Hybridity is one of Stuart Hall\'s key contributions.', 'Hybridity always leads to total loss of heritage culture.'], lie: 2, explanation: 'Hybridity is about BLENDING, not erasure — heritage culture often persists alongside new influences.' },
    { id: 'ss-tl-soc-32', subject: 'history', classId: 'vce-sociology-3-4', statements: ['A way of conducting ethical research is to allow participants to withdraw at any time.', 'Another is to anonymise data before publication.', 'A third is to publish participants\' full names without their permission.'], lie: 2, explanation: 'Publishing names without permission violates privacy and confidentiality.' },
    { id: 'ss-tl-soc-33', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Multiculturalism replaced the White Australia Policy.', 'The Whitlam government formalised multiculturalism in 1973.', 'Multiculturalism was always Australia\'s policy from 1788 onwards.'], lie: 2, explanation: '1788 was the start of European invasion. Multiculturalism is a 20th-century policy.' },
    { id: 'ss-tl-soc-34', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Stereotyping is one factor that can fuel othering.', 'Media representations significantly shape public perception of ethnic groups.', 'Media has been shown to have no measurable effect on belonging.'], lie: 2, explanation: 'Media is a major factor in shaping belonging per the study design.' },
    { id: 'ss-tl-soc-35', subject: 'history', classId: 'vce-sociology-3-4', statements: ['How an ethnic group identifies ITSELF is a key sociological starting point.', 'Outsiders\' categories may not match the group\'s self-identification.', 'Sociologists should impose external categories without consulting the group.'], lie: 2, explanation: 'Imposing external categories without consultation is unethical and bad sociology.' },

    // Unit 4 AOS 1: Community
    { id: 'ss-tl-soc-36', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Ferdinand Tönnies wrote about Gemeinschaft and Gesellschaft.', 'Gemeinschaft describes traditional, close-knit community life.', 'Gesellschaft describes traditional rural community.'], lie: 2, explanation: 'Gesellschaft describes MODERN, urban, contractual society — the opposite of Gemeinschaft.' },
    { id: 'ss-tl-soc-37', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Michel Maffesoli developed the theory of neo-tribes.', 'Neo-tribes are postmodern groupings based on shared lifestyle and emotion.', 'Neo-tribes require geographical proximity to function.'], lie: 2, explanation: 'Neo-tribes can be geographically dispersed — they\'re based on shared interest/emotion, not location.' },
    { id: 'ss-tl-soc-38', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Tönnies argued society had shifted from Gemeinschaft towards Gesellschaft.', 'Maffesoli\'s neo-tribes describe postmodern community.', 'Tönnies and Maffesoli are the same theorist.'], lie: 2, explanation: 'They are different theorists with different periods and ideas.' },
    { id: 'ss-tl-soc-39', subject: 'history', classId: 'vce-sociology-3-4', statements: ['A "sense of community" requires active participation and emotional connection.', 'Different members of the same community may experience belonging differently.', 'Sense of community is identical for every member.'], lie: 2, explanation: 'Belonging varies across members — by age, residency, ethnicity, participation level.' },
    { id: 'ss-tl-soc-40', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Online fandoms are a clear example of Maffesoli\'s neo-tribes.', 'A medieval farming village exemplifies Tönnies\'s Gemeinschaft.', 'A modern busy CBD is also an example of Gemeinschaft.'], lie: 2, explanation: 'A modern busy CBD with anonymous, transactional interactions is Gesellschaft, not Gemeinschaft.' },
    { id: 'ss-tl-soc-41', subject: 'history', classId: 'vce-sociology-3-4', statements: ['ICT can enable new geographically dispersed communities.', 'ICT can also weaken local face-to-face ties.', 'ICT has no measurable effect on community life.'], lie: 2, explanation: 'ICT measurably reshapes community life — both enabling and eroding different kinds of ties.' },
    { id: 'ss-tl-soc-42', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Geographical characteristics influencing community include climate and landforms.', 'Built features (like community centres) also influence community.', 'Geography has no influence on the experience of community.'], lie: 2, explanation: 'Geography is one of VCAA\'s explicit influences on community.' },
    { id: 'ss-tl-soc-43', subject: 'history', classId: 'vce-sociology-3-4', statements: ['A community garden involves shared geography, shared activity and participation.', 'Sports clubs are classic communities of practice.', 'Communities of practice never foster belonging.'], lie: 2, explanation: 'Communities of practice are KNOWN to foster belonging through shared activity.' },
    { id: 'ss-tl-soc-44', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Tönnies wrote about modernisation shifting society from traditional to modern forms.', 'Gemeinschaft is based on kinship and shared values.', 'Gesellschaft is based on kinship and inherited roles.'], lie: 2, explanation: 'Gesellschaft is based on contracts and individualism — not kinship.' },
    { id: 'ss-tl-soc-45', subject: 'history', classId: 'vce-sociology-3-4', statements: ['A men\'s shed is an example of a community of practice fostering belonging.', 'A local council\'s funding decisions can shape community life.', 'Local council decisions are economic, not political, factors.'], lie: 2, explanation: 'Council decisions are POLITICAL factors per the study design.' },
    { id: 'ss-tl-soc-46', subject: 'history', classId: 'vce-sociology-3-4', statements: ['A music festival crowd that meets briefly each year is a neo-tribe.', 'Neo-tribes can be temporary and emotionally intense.', 'Neo-tribes always have permanent paid staff and infrastructure.'], lie: 2, explanation: 'Neo-tribes are typically informal and fluid — formal infrastructure isn\'t required.' },
    { id: 'ss-tl-soc-47', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Different individuals may experience belonging within the same community differently.', 'Length of residence, age and ethnicity can affect belonging.', 'Belonging is fully determined by geography alone.'], lie: 2, explanation: 'Belonging is subjective and multi-dimensional — geography is one factor among many.' },
    { id: 'ss-tl-soc-48', subject: 'history', classId: 'vce-sociology-3-4', statements: ['A community newsletter can support a sense of belonging.', 'A "third place" is a public informal gathering space between home and work.', 'A third place is typically a workplace meeting room.'], lie: 2, explanation: 'A "third place" is OUTSIDE work — public spaces like cafés, pubs, parks.' },
    { id: 'ss-tl-soc-49', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Modern people often belong to multiple communities simultaneously.', 'A person can belong to both a geographical community and several interest-based communities.', 'You can only ever belong to one community at a time.'], lie: 2, explanation: 'Multiple community memberships are the norm in modern life.' },
    { id: 'ss-tl-soc-50', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Tönnies\'s Gemeinschaft is associated with shared values and mutual obligation.', 'Maffesoli\'s neo-tribes are associated with shared lifestyle and emotion.', 'Both theories describe the exact same historical period.'], lie: 2, explanation: 'Tönnies wrote in the late 19th C about modernisation; Maffesoli wrote about postmodern fragmentation in the late 20th C.' },

    // Unit 4 AOS 2: Social movements and social change
    { id: 'ss-tl-soc-51', subject: 'history', classId: 'vce-sociology-3-4', statements: ['A social movement is an organised effort to achieve social change.', 'VCAA identifies four types of social movement: alternative, redemptive, reformative and revolutionary.', 'VCAA identifies five types of social movement.'], lie: 2, explanation: 'There are exactly four types.' },
    { id: 'ss-tl-soc-52', subject: 'history', classId: 'vce-sociology-3-4', statements: ['The four stages of a social movement are emergence, coalescence, bureaucratisation and decline.', 'These stages occur in that order.', 'The four stages can occur in any order.'], lie: 2, explanation: 'The order is fixed: emergence → coalescence → bureaucratisation → decline.' },
    { id: 'ss-tl-soc-53', subject: 'history', classId: 'vce-sociology-3-4', statements: ['VCAA identifies six forms of power: reward, coercive, referent, legitimate, expert and informational.', 'The opposition of a social movement can also use these forms of power.', 'There are only three forms of power per VCAA.'], lie: 2, explanation: 'There are SIX recognised forms.' },
    { id: 'ss-tl-soc-54', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Erica Chenoweth\'s research shows non-violent civil disobedience tends to succeed more often than violent action.', 'Her research found roughly a 2:1 success ratio in favour of non-violent campaigns.', 'Chenoweth concluded that violent action is always more effective.'], lie: 2, explanation: 'Chenoweth\'s finding is the opposite — non-violent action is more effective.' },
    { id: 'ss-tl-soc-55', subject: 'history', classId: 'vce-sociology-3-4', statements: ['An ALTERNATIVE movement seeks limited change in a limited population.', 'A REVOLUTIONARY movement seeks radical change across the whole society.', 'Alternative and revolutionary movements are the same thing.'], lie: 2, explanation: 'They are opposites on both scope (limited vs radical) and breadth (limited vs whole).' },
    { id: 'ss-tl-soc-56', subject: 'history', classId: 'vce-sociology-3-4', statements: ['A REDEMPTIVE movement seeks radical change within a limited population.', 'Alcoholics Anonymous is often cited as redemptive.', 'A REFORMATIVE movement also targets a limited population.'], lie: 2, explanation: 'Reformative movements target the WHOLE society — not a limited population.' },
    { id: 'ss-tl-soc-57', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Reward power offers incentives.', 'Coercive power uses force or threats.', 'Reward and coercive power mean the same thing.'], lie: 2, explanation: 'They are distinct — incentives vs threats.' },
    { id: 'ss-tl-soc-58', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Referent power flows from charisma.', 'Legitimate power flows from a recognised position of authority.', 'Expert power flows from charisma.'], lie: 2, explanation: 'Expert power flows from specialised knowledge — not charisma. That\'s referent power.' },
    { id: 'ss-tl-soc-59', subject: 'history', classId: 'vce-sociology-3-4', statements: ['A movement that achieves its goals may then enter decline through success.', 'Decline can also be caused by co-optation or repression.', 'Achieving goals is impossible for any social movement.'], lie: 2, explanation: 'Achieving goals is one explicit cause of decline.' },
    { id: 'ss-tl-soc-60', subject: 'history', classId: 'vce-sociology-3-4', statements: ['The first stage of a social movement is emergence.', 'Coalescence comes after emergence.', 'Bureaucratisation comes before emergence.'], lie: 2, explanation: 'Bureaucratisation is the third stage — emergence is first.' },
    { id: 'ss-tl-soc-61', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Mothers Against Drunk Driving is typically classified as an alternative movement.', 'Alcoholics Anonymous is typically classified as redemptive.', 'Both MADD and AA are revolutionary movements.'], lie: 2, explanation: 'Neither is revolutionary — they target limited populations, not whole-society overhaul.' },
    { id: 'ss-tl-soc-62', subject: 'history', classId: 'vce-sociology-3-4', statements: ['The Civil Rights Movement in the USA is often classified as reformative.', 'It is famous for using non-violent civil disobedience.', 'It used only violent tactics throughout its history.'], lie: 2, explanation: 'The Civil Rights Movement is renowned for its commitment to non-violence — sit-ins, freedom rides, marches.' },
    { id: 'ss-tl-soc-63', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Informational power involves controlling the narrative and messaging.', 'A social media campaign primarily uses informational power.', 'Informational power means using physical force.'], lie: 2, explanation: 'Physical force is coercive power. Informational power is about control of information.' },
    { id: 'ss-tl-soc-64', subject: 'history', classId: 'vce-sociology-3-4', statements: ['"Civil disobedience" means deliberately not complying with laws considered unjust.', 'It is typically a calculated, often public action.', 'Civil disobedience always involves violence.'], lie: 2, explanation: 'Civil disobedience is most commonly NON-violent.' },
    { id: 'ss-tl-soc-65', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Chenoweth\'s research is empirical, examining many historical movements.', 'Her finding informs claims that non-violent strategy is more effective.', 'Her work has been refuted by all modern research.'], lie: 2, explanation: 'Chenoweth\'s work is widely cited and remains a benchmark in the field.' },
    { id: 'ss-tl-soc-66', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Police using force to disperse a protest exemplifies coercive power.', 'A government minister banning a protest by official authority exemplifies legitimate power.', 'Both examples illustrate referent power.'], lie: 2, explanation: 'Neither is referent — referent power is charisma-based.' },
    { id: 'ss-tl-soc-67', subject: 'history', classId: 'vce-sociology-3-4', statements: ['A movement\'s opposition can use any of the six forms of power.', 'Co-optation absorbs a movement\'s goals into the mainstream, often softening them.', 'A movement always succeeds once it reaches bureaucratisation.'], lie: 2, explanation: 'Bureaucratisation doesn\'t guarantee success — many bureaucratised movements still decline.' },
    { id: 'ss-tl-soc-68', subject: 'history', classId: 'vce-sociology-3-4', statements: ['A grassroots campaign to save a local public pool is a typical alternative movement.', 'Such campaigns can move quickly through emergence, coalescence and decline (often as a success).', 'A pool-saving campaign is a revolutionary movement.'], lie: 2, explanation: 'A local pool campaign has limited scope and limited target population — alternative, not revolutionary.' },
    { id: 'ss-tl-soc-69', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Decline can result from achieving the movement\'s goals.', 'Decline can also result from internal collapse or external repression.', 'Decline always means the movement failed.'], lie: 2, explanation: 'Decline isn\'t always failure — success ends a movement too.' },
    { id: 'ss-tl-soc-70', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Social change refers to significant alteration in social structures, institutions or norms.', 'Social movements are one driver of social change.', 'Social change is identical to short-term fashion trends.'], lie: 2, explanation: 'Social change is structural — not the same as fleeting trends.' },
    { id: 'ss-tl-soc-71', subject: 'history', classId: 'vce-sociology-3-4', statements: ['The four TYPES of movement (alt/red/ref/rev) and the four STAGES (emergence/coalescence/bureaucratisation/decline) are two different classifications.', 'A single movement can be classified by both its type AND its current stage.', 'Types and stages are the same classification.'], lie: 2, explanation: 'They are two distinct frameworks per VCAA — easy to confuse.' },
    { id: 'ss-tl-soc-72', subject: 'history', classId: 'vce-sociology-3-4', statements: ['The Suffrage Movement is typically classified as reformative.', 'It sought legislative change (women\'s vote) across the whole society.', 'It targeted a limited population only.'], lie: 2, explanation: 'It targeted the whole society — reformative movements affect everyone.' },
    { id: 'ss-tl-soc-73', subject: 'history', classId: 'vce-sociology-3-4', statements: ['A movement that has hired full-time staff and set up offices is in the bureaucratisation stage.', 'Bureaucratisation is the third of the four stages.', 'Bureaucratisation is the first stage.'], lie: 2, explanation: 'Emergence is the first stage; bureaucratisation is the third.' },
    { id: 'ss-tl-soc-74', subject: 'history', classId: 'vce-sociology-3-4', statements: ['When climate scientists\' testimony shapes a climate movement, they are exercising expert power.', 'A charismatic activist drawing supporters exercises referent power.', 'Both expert and referent power are types of coercive power.'], lie: 2, explanation: 'Expert and referent are DISTINCT forms — neither is coercive.' },
    { id: 'ss-tl-soc-75', subject: 'history', classId: 'vce-sociology-3-4', statements: ['Per VCAA, students analysing a current social movement should consider its type, stage, use of power, opposition\'s power and influence on social change.', 'Chenoweth\'s research is the key reference for evaluating influence on change.', 'Stuart Hall\'s hybridity is the key reference for evaluating movement influence.'], lie: 2, explanation: 'Hall\'s hybridity is about ethnicity, not movement effectiveness. Chenoweth is the named reference.' },
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

