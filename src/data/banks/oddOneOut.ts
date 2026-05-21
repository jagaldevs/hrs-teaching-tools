import type { Bank, OddItem } from '../../games/types';

/**
 * Odd-one-out bank. Each item has 4 candidates and one outlier.
 * AC V9 aligned with brief explanations to support teacher debrief.
 */

const LOWER_ENGLISH: OddItem[] = [
  { id: 'lp-e-1', items: ['cat', 'hat', 'bat', 'dog'], outlier: 3, explanation: '"dog" doesn’t rhyme with the others.' },
  { id: 'lp-e-2', items: ['apple', 'banana', 'red', 'orange'], outlier: 2, explanation: '"red" is a colour, not a fruit.' },
  { id: 'lp-e-3', items: ['run', 'jump', 'happy', 'walk'], outlier: 2, explanation: '"happy" is a feeling, the others are actions.' },
  { id: 'lp-e-4', items: ['big', 'large', 'huge', 'tiny'], outlier: 3, explanation: '"tiny" means small.' },
  { id: 'lp-e-5', items: ['A', 'E', 'I', 'B'], outlier: 3, explanation: '"B" is a consonant.' },
  { id: 'lp-e-6', items: ['sing', 'shout', 'silent', 'speak'], outlier: 2, explanation: '"silent" means no sound.' },
];

const LOWER_MATHS: OddItem[] = [
  { id: 'lp-m-1', items: ['2', '4', '6', '7'], outlier: 3, explanation: '"7" is odd, the others are even.' },
  { id: 'lp-m-2', items: ['circle', 'square', 'triangle', 'apple'], outlier: 3, explanation: '"apple" isn’t a shape.' },
  { id: 'lp-m-3', items: ['10', '20', '15', '30'], outlier: 2, explanation: '"15" doesn’t end in 0.' },
  { id: 'lp-m-4', items: ['+', '−', '×', 'A'], outlier: 3, explanation: '"A" is a letter, not a maths sign.' },
  { id: 'lp-m-5', items: ['Monday', 'Tuesday', 'Friday', 'January'], outlier: 3, explanation: '"January" is a month.' },
];

const LOWER_HISTORY: OddItem[] = [
  { id: 'lp-h-1', items: ['Phone', 'Computer', 'TV', 'Candle'], outlier: 3, explanation: '"Candle" is from the past.' },
  { id: 'lp-h-2', items: ['Mum', 'Dad', 'Aunt', 'Friend'], outlier: 3, explanation: '"Friend" isn’t family.' },
  { id: 'lp-h-3', items: ['Easter', 'Birthday', 'Christmas', 'Tuesday'], outlier: 3, explanation: '"Tuesday" is a day, not a celebration.' },
];

const LOWER_GEOGRAPHY: OddItem[] = [
  { id: 'lp-g-1', items: ['River', 'Ocean', 'Lake', 'Forest'], outlier: 3, explanation: '"Forest" isn’t water.' },
  { id: 'lp-g-2', items: ['Sunny', 'Rainy', 'Stormy', 'Happy'], outlier: 3, explanation: '"Happy" isn’t weather.' },
  { id: 'lp-g-3', items: ['Kangaroo', 'Koala', 'Lion', 'Wombat'], outlier: 2, explanation: '"Lion" isn’t Australian.' },
];

// ---- UPPER PRIMARY ----

const UPPER_ENGLISH: OddItem[] = [
  { id: 'up-e-1', items: ['noun', 'verb', 'adjective', 'sentence'], outlier: 3, explanation: '"sentence" is bigger than a word class.' },
  { id: 'up-e-2', items: ['happy', 'joyful', 'cheerful', 'gloomy'], outlier: 3, explanation: '"gloomy" is an antonym.' },
  { id: 'up-e-3', items: ['simile', 'metaphor', 'paragraph', 'personification'], outlier: 2, explanation: '"paragraph" is a structural unit, the others are devices.' },
  { id: 'up-e-4', items: ['who', 'what', 'when', 'because'], outlier: 3, explanation: '"because" isn’t a question word.' },
  { id: 'up-e-5', items: ['novel', 'short story', 'poem', 'pencil'], outlier: 3, explanation: '"pencil" isn’t a text type.' },
];

const UPPER_MATHS: OddItem[] = [
  { id: 'up-m-1', items: ['parallelogram', 'rhombus', 'trapezium', 'circle'], outlier: 3, explanation: '"circle" isn’t a quadrilateral.' },
  { id: 'up-m-2', items: ['2', '3', '5', '9'], outlier: 3, explanation: '"9" is not prime.' },
  { id: 'up-m-3', items: ['1/2', '2/4', '3/6', '2/5'], outlier: 3, explanation: '"2/5" isn’t equivalent to a half.' },
  { id: 'up-m-4', items: ['kilogram', 'metre', 'litre', 'second'], outlier: 3, explanation: '"second" measures time, not amount of stuff.' },
  { id: 'up-m-5', items: ['100', '1,000', '10,000', '1,500'], outlier: 3, explanation: '"1,500" isn’t a power of 10.' },
];

const UPPER_HISTORY: OddItem[] = [
  { id: 'up-h-1', items: ['Egypt', 'Rome', 'Greece', 'Australia'], outlier: 3, explanation: '"Australia" isn’t an ancient civilisation.' },
  { id: 'up-h-2', items: ['1788', '1901', '1850', '2050'], outlier: 3, explanation: '"2050" is in the future.' },
  { id: 'up-h-3', items: ['Cook', 'Phillip', 'Banks', 'Bradman'], outlier: 3, explanation: '"Bradman" is a cricketer, not a colonial figure.' },
];

const UPPER_GEOGRAPHY: OddItem[] = [
  { id: 'up-g-1', items: ['Sydney', 'Melbourne', 'Auckland', 'Brisbane'], outlier: 2, explanation: '"Auckland" is in New Zealand.' },
  { id: 'up-g-2', items: ['Murray', 'Darling', 'Nile', 'Yarra'], outlier: 2, explanation: '"Nile" is not Australian.' },
  { id: 'up-g-3', items: ['Asia', 'Africa', 'Europe', 'Pacific'], outlier: 3, explanation: '"Pacific" is an ocean, not a continent.' },
];

// ---- MIDDLE SCHOOL ----

const MIDDLE_ENGLISH: OddItem[] = [
  { id: 'ms-e-1', items: ['simile', 'metaphor', 'hyperbole', 'syllable'], outlier: 3, explanation: '"syllable" is a sound unit, not a literary device.' },
  { id: 'ms-e-2', items: ['protagonist', 'antagonist', 'narrator', 'paragraph'], outlier: 3, explanation: '"paragraph" isn’t a character role.' },
  { id: 'ms-e-3', items: ['comma', 'colon', 'noun', 'semicolon'], outlier: 2, explanation: '"noun" isn’t punctuation.' },
  { id: 'ms-e-4', items: ['Macbeth', 'Hamlet', 'Othello', 'Frankenstein'], outlier: 3, explanation: '"Frankenstein" is Shelley, not Shakespeare.' },
  { id: 'ms-e-5', items: ['stanza', 'verse', 'rhyme', 'chapter'], outlier: 3, explanation: '"chapter" is a prose unit.' },
];

const MIDDLE_MATHS: OddItem[] = [
  { id: 'ms-m-1', items: ['π', '√2', 'e', '4'], outlier: 3, explanation: '"4" is rational; the others are irrational.' },
  { id: 'ms-m-2', items: ['3, 5, 7', '11, 13, 17', '2, 4, 6', '19, 23, 29'], outlier: 2, explanation: '"2, 4, 6" are even, the others are primes.' },
  { id: 'ms-m-3', items: ['linear', 'quadratic', 'cubic', 'isosceles'], outlier: 3, explanation: '"isosceles" is a triangle, not a polynomial type.' },
  { id: 'ms-m-4', items: ['cm', 'kg', 'mm', 'km'], outlier: 1, explanation: '"kg" is mass; others are length.' },
  { id: 'ms-m-5', items: ['sin', 'cos', 'tan', 'log'], outlier: 3, explanation: '"log" isn’t a trig function.' },
];

const MIDDLE_HISTORY: OddItem[] = [
  { id: 'ms-h-1', items: ['Hitler', 'Stalin', 'Mussolini', 'Churchill'], outlier: 3, explanation: '"Churchill" was Allied.' },
  { id: 'ms-h-2', items: ['1914', '1918', '1939', '1453'], outlier: 3, explanation: '"1453" is medieval; others are 20th century.' },
  { id: 'ms-h-3', items: ['Sparta', 'Athens', 'Thebes', 'Rome'], outlier: 3, explanation: '"Rome" isn’t a Greek city-state.' },
];

const MIDDLE_GEOGRAPHY: OddItem[] = [
  { id: 'ms-g-1', items: ['tundra', 'desert', 'savanna', 'cumulus'], outlier: 3, explanation: '"cumulus" is a cloud type.' },
  { id: 'ms-g-2', items: ['Andes', 'Himalayas', 'Alps', 'Sahara'], outlier: 3, explanation: '"Sahara" is a desert.' },
  { id: 'ms-g-3', items: ['Nile', 'Amazon', 'Ganges', 'Everest'], outlier: 3, explanation: '"Everest" is a mountain.' },
];

// ---- SENIOR SCHOOL ----

const SENIOR_ENGLISH: OddItem[] = [
  { id: 'ss-e-1', items: ['logos', 'pathos', 'ethos', 'thesis'], outlier: 3, explanation: '"thesis" isn’t a rhetorical appeal.' },
  { id: 'ss-e-2', items: ['Joyce', 'Woolf', 'Faulkner', 'Spielberg'], outlier: 3, explanation: '"Spielberg" is a filmmaker.' },
  { id: 'ss-e-3', items: ['epic', 'sonnet', 'ode', 'novella'], outlier: 3, explanation: '"novella" is prose; others are poetic forms.' },
  { id: 'ss-e-4', items: ['catharsis', 'hubris', 'hamartia', 'iambic'], outlier: 3, explanation: '"iambic" is a metre, not a tragic concept.' },
];

const SENIOR_MATHS: OddItem[] = [
  { id: 'ss-m-1', items: ['derivative', 'integral', 'limit', 'matrix'], outlier: 3, explanation: '"matrix" is from linear algebra, not calculus.' },
  { id: 'ss-m-2', items: ['e', 'π', 'φ', '√4'], outlier: 3, explanation: '"√4 = 2" is rational; others are irrational.' },
  { id: 'ss-m-3', items: ['mean', 'median', 'mode', 'matrix'], outlier: 3, explanation: '"matrix" isn’t a measure of central tendency.' },
  { id: 'ss-m-4', items: ['vector', 'scalar', 'tensor', 'triangle'], outlier: 3, explanation: '"triangle" isn’t a quantity type.' },
];

const SENIOR_HISTORY: OddItem[] = [
  { id: 'ss-h-1', items: ['Hitler', 'Mussolini', 'Stalin', 'Roosevelt'], outlier: 3, explanation: '"Roosevelt" wasn’t Axis or USSR.' },
  { id: 'ss-h-2', items: ['Treaty of Versailles', 'Treaty of Tordesillas', 'Yalta Conference', 'Potsdam Conference'], outlier: 1, explanation: '"Tordesillas" is from 1494.' },
  { id: 'ss-h-3', items: ['Mandela', 'Gandhi', 'King', 'Edison'], outlier: 3, explanation: '"Edison" was an inventor, not a civil-rights figure.' },
];

const SENIOR_GEOGRAPHY: OddItem[] = [
  { id: 'ss-g-1', items: ['Paris Agreement', 'Kyoto Protocol', 'Montreal Protocol', 'Geneva Convention'], outlier: 3, explanation: '"Geneva Convention" is a humanitarian-law treaty.' },
  { id: 'ss-g-2', items: ['ENSO', 'IOD', 'NAO', 'GDP'], outlier: 3, explanation: '"GDP" is economic.' },
  { id: 'ss-g-3', items: ['lithosphere', 'biosphere', 'hydrosphere', 'photosphere'], outlier: 3, explanation: '"photosphere" is part of the Sun.' },
];

export const ODD_BANK: Bank<OddItem> = {
  byStreamSubject: {
    lower_primary: { english: LOWER_ENGLISH, maths: LOWER_MATHS, history: LOWER_HISTORY, geography: LOWER_GEOGRAPHY },
    upper_primary: { english: UPPER_ENGLISH, maths: UPPER_MATHS, history: UPPER_HISTORY, geography: UPPER_GEOGRAPHY },
    middle_school: { english: MIDDLE_ENGLISH, maths: MIDDLE_MATHS, history: MIDDLE_HISTORY, geography: MIDDLE_GEOGRAPHY },
    senior_school: { english: SENIOR_ENGLISH, maths: SENIOR_MATHS, history: SENIOR_HISTORY, geography: SENIOR_GEOGRAPHY },
  },
};
