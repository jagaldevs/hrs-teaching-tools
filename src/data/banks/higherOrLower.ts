import type { Bank, HoLItem } from '../../games/types';

/**
 * Higher-or-Lower bank — Australian Curriculum V9 informed.
 *
 * Each item has a label + numeric value. Players see one value, then guess
 * whether the next is higher or lower. The bank is subject-keyed so a maths
 * round compares mathematical constants, a history round compares years, etc.
 *
 * Note: English isn't included because numeric comparison doesn't fit the
 * subject. The `general` bucket holds curriculum-light universal facts that
 * work for any class as warm-up.
 *
 * Coverage target: 4 streams × 5 subject buckets × ~15 items ≈ 300 items.
 */

// ============================================================
//  LOWER PRIMARY  (F – Year 2)
// ============================================================

const LOWER_GENERAL: HoLItem[] = [
  { id: 'lp-gen-days-week', label: 'Days in a week', value: 7 },
  { id: 'lp-gen-months-year', label: 'Months in a year', value: 12 },
  { id: 'lp-gen-sides-square', label: 'Sides of a square', value: 4 },
  { id: 'lp-gen-fingers-hand', label: 'Fingers on a hand', value: 5 },
  { id: 'lp-gen-legs-spider', label: 'Legs on a spider', value: 8 },
  { id: 'lp-gen-wheels-car', label: 'Wheels on a car', value: 4 },
  { id: 'lp-gen-wheels-bike', label: 'Wheels on a bike', value: 2 },
  { id: 'lp-gen-eyes', label: 'Eyes on a person', value: 2 },
  { id: 'lp-gen-days-january', label: 'Days in January', value: 31 },
  { id: 'lp-gen-soccer', label: 'Players on a soccer team', value: 11 },
  { id: 'lp-gen-colours-rainbow', label: 'Colours in a rainbow', value: 7 },
  { id: 'lp-gen-seasons', label: 'Seasons in a year', value: 4 },
  { id: 'lp-gen-letters-alphabet', label: 'Letters in the English alphabet', value: 26 },
];

const LOWER_MATHS: HoLItem[] = [
  { id: 'lp-m-sides-tri', label: 'Sides of a triangle', value: 3, acCode: 'AC9M1SP01' },
  { id: 'lp-m-sides-hex', label: 'Sides of a hexagon', value: 6, acCode: 'AC9M2SP01' },
  { id: 'lp-m-sides-oct', label: 'Sides of an octagon', value: 8, acCode: 'AC9M2SP01' },
  { id: 'lp-m-faces-cube', label: 'Faces on a cube', value: 6, acCode: 'AC9M2SP01' },
  { id: 'lp-m-corners-square', label: 'Corners on a square', value: 4, acCode: 'AC9M1SP01' },
  { id: 'lp-m-half-100', label: 'Half of 100', value: 50, acCode: 'AC9M2N05' },
  { id: 'lp-m-double-10', label: 'Double 10', value: 20, acCode: 'AC9M2N04' },
  { id: 'lp-m-half-20', label: 'Half of 20', value: 10, acCode: 'AC9M2N05' },
  { id: 'lp-m-cents-dollar', label: 'Cents in a dollar', value: 100, acCode: 'AC9M2N06' },
  { id: 'lp-m-tens-100', label: 'Tens that make 100', value: 10, acCode: 'AC9M2N01' },
  { id: 'lp-m-after-19', label: 'The number after 19', value: 20, acCode: 'AC9M1N03' },
  { id: 'lp-m-quarter-100', label: 'A quarter of 100', value: 25, acCode: 'AC9M2N05' },
];

const LOWER_HISTORY: HoLItem[] = [
  { id: 'lp-h-decade', label: 'Years in a decade', value: 10, acCode: 'AC9HS2K02' },
  { id: 'lp-h-century', label: 'Years in a century', value: 100, acCode: 'AC9HS2K02' },
  { id: 'lp-h-aus-day', label: 'Day of the month Australia Day is on', value: 26, acCode: 'AC9HS2K04' },
  { id: 'lp-h-anzac-day', label: 'Day of the month Anzac Day is on (April)', value: 25, acCode: 'AC9HS2K04' },
  { id: 'lp-h-jan', label: 'Month of the year for January', value: 1, acCode: 'AC9HSFK02' },
  { id: 'lp-h-dec', label: 'Month of the year for December', value: 12, acCode: 'AC9HSFK02' },
  { id: 'lp-h-naidoc-week', label: 'Days in NAIDOC Week', value: 7, acCode: 'AC9HS2K04' },
  { id: 'lp-h-first-fleet', label: 'Ships in the First Fleet (approx.)', value: 11, acCode: 'AC9HS2K01' },
];

const LOWER_GEOGRAPHY: HoLItem[] = [
  { id: 'lp-g-states', label: 'States in Australia', value: 6, acCode: 'AC9HS2K01' },
  { id: 'lp-g-territories', label: 'Australian territories', value: 2, acCode: 'AC9HS2K01' },
  { id: 'lp-g-oceans', label: 'Oceans on Earth', value: 5, acCode: 'AC9HS2K03' },
  { id: 'lp-g-continents', label: 'Continents on Earth', value: 7, acCode: 'AC9HS2K03' },
  { id: 'lp-g-poles', label: 'Earth’s poles', value: 2, acCode: 'AC9HS1S01' },
  { id: 'lp-g-compass-main', label: 'Main compass directions', value: 4, acCode: 'AC9HS1S01' },
  { id: 'lp-g-aus-cap-states', label: 'Australian capital cities (states + ACT)', value: 7, acCode: 'AC9HS2K01' },
  { id: 'lp-g-seasons-aus', label: 'Australian seasons', value: 4, acCode: 'AC9HS1K02' },
];

const LOWER_SCIENCE: HoLItem[] = [
  { id: 'lp-s-legs-spider', label: 'Legs on a spider', value: 8, acCode: 'AC9S2U01' },
  { id: 'lp-s-legs-insect', label: 'Legs on an insect', value: 6, acCode: 'AC9S2U01' },
  { id: 'lp-s-states-matter', label: 'Main states of matter', value: 3, acCode: 'AC9S5U02' },
  { id: 'lp-s-bones-leg', label: 'Bones in a finger (most fingers)', value: 3, acCode: 'AC9S4U01' },
  { id: 'lp-s-eyes-spider', label: 'Eyes on most spiders', value: 8, acCode: 'AC9S2U01' },
  { id: 'lp-s-sun-planets', label: 'Suns in our solar system', value: 1, acCode: 'AC9S5U03' },
  { id: 'lp-s-moon-earth', label: 'Moons orbiting Earth', value: 1, acCode: 'AC9S5U03' },
  { id: 'lp-s-arms-octopus', label: 'Arms on an octopus', value: 8, acCode: 'AC9S2U01' },
];

// ============================================================
//  UPPER PRIMARY  (Year 3 – Year 6)
// ============================================================

const UPPER_GENERAL: HoLItem[] = [
  { id: 'up-gen-pop-darwin', label: 'Population of Darwin (approx.)', value: 150000, context: 'NT capital' },
  { id: 'up-gen-pop-sydney', label: 'Population of Sydney (approx.)', value: 5400000 },
  { id: 'up-gen-pop-aus', label: 'Population of Australia (approx.)', value: 26000000 },
  { id: 'up-gen-states-aus', label: 'States in Australia', value: 6 },
  { id: 'up-gen-territories-aus', label: 'Territories in Australia', value: 2 },
  { id: 'up-gen-capitals-world', label: 'Capital cities of the world (approx.)', value: 195 },
  { id: 'up-gen-oceans', label: 'Oceans on Earth', value: 5 },
  { id: 'up-gen-continents', label: 'Continents on Earth', value: 7 },
  { id: 'up-gen-planets', label: 'Planets in our solar system', value: 8 },
  { id: 'up-gen-cricket', label: 'Players in a cricket team', value: 11 },
  { id: 'up-gen-afl', label: 'Players on an AFL team (on field)', value: 18 },
  { id: 'up-gen-rugby', label: 'Players in a rugby union team', value: 15 },
  { id: 'up-gen-olympic-rings', label: 'Rings on the Olympic flag', value: 5 },
];

const UPPER_MATHS: HoLItem[] = [
  { id: 'up-m-deg-circle', label: 'Degrees in a full circle', value: 360, acCode: 'AC9M5M03' },
  { id: 'up-m-deg-straight', label: 'Degrees in a straight angle', value: 180, acCode: 'AC9M5M03' },
  { id: 'up-m-deg-right', label: 'Degrees in a right angle', value: 90, acCode: 'AC9M5M03' },
  { id: 'up-m-min-hour', label: 'Minutes in an hour', value: 60, acCode: 'AC9M4M03' },
  { id: 'up-m-sec-min', label: 'Seconds in a minute', value: 60, acCode: 'AC9M4M03' },
  { id: 'up-m-mm-cm', label: 'Millimetres in a centimetre', value: 10, acCode: 'AC9M5M01' },
  { id: 'up-m-cm-m', label: 'Centimetres in a metre', value: 100, acCode: 'AC9M5M01' },
  { id: 'up-m-m-km', label: 'Metres in a kilometre', value: 1000, acCode: 'AC9M5M01' },
  { id: 'up-m-mL-L', label: 'Millilitres in a litre', value: 1000, acCode: 'AC9M5M01' },
  { id: 'up-m-g-kg', label: 'Grams in a kilogram', value: 1000, acCode: 'AC9M5M01' },
  { id: 'up-m-7x8', label: '7 × 8', value: 56, acCode: 'AC9M4N06' },
  { id: 'up-m-9x9', label: '9 × 9', value: 81, acCode: 'AC9M4N06' },
  { id: 'up-m-12x12', label: '12 × 12', value: 144, acCode: 'AC9M4N06' },
  { id: 'up-m-primes-under-10', label: 'Prime numbers less than 10', value: 4, context: '2, 3, 5, 7', acCode: 'AC9M6N02' },
];

const UPPER_HISTORY: HoLItem[] = [
  { id: 'up-h-cook', label: 'Year Cook reached Botany Bay', value: 1770, acCode: 'AC9HS4K01' },
  { id: 'up-h-first-fleet', label: 'Year the First Fleet arrived', value: 1788, acCode: 'AC9HS5K01' },
  { id: 'up-h-eureka', label: 'Year of the Eureka Stockade', value: 1854, acCode: 'AC9HS5K02' },
  { id: 'up-h-gold', label: 'Year gold was first discovered in Australia', value: 1851, acCode: 'AC9HS5K02' },
  { id: 'up-h-federation', label: 'Year of Australian Federation', value: 1901, acCode: 'AC9HS6K01' },
  { id: 'up-h-gallipoli', label: 'Year of the Gallipoli landing', value: 1915, acCode: 'AC9HS6K02' },
  { id: 'up-h-referendum', label: 'Year of the 1967 referendum', value: 1967, acCode: 'AC9HS6K03' },
  { id: 'up-h-mabo', label: 'Year of the Mabo decision', value: 1992, acCode: 'AC9HS6K03' },
  { id: 'up-h-apology', label: 'Year of the Apology to the Stolen Generations', value: 2008, acCode: 'AC9HS6K03' },
  { id: 'up-h-fns-years', label: 'Years First Nations peoples have lived in Australia (at least)', value: 60000, context: 'AC V9 figure', acCode: 'AC9HS4K02' },
  { id: 'up-h-pyramid-giza', label: 'Approx. year (BCE) the Great Pyramid was built', value: 2560, acCode: 'AC9HS6K04' },
  { id: 'up-h-rome-founded', label: 'Approx. year (BCE) Rome was traditionally founded', value: 753, acCode: 'AC9HS6K04' },
  { id: 'up-h-aus-capital', label: 'Year Canberra became the federal capital', value: 1927, acCode: 'AC9HS6K01' },
  { id: 'up-h-pm-first', label: 'Number of PMs Australia has had (approx.)', value: 31, context: 'as of 2024', acCode: 'AC9HS6K01' },
];

const UPPER_GEOGRAPHY: HoLItem[] = [
  { id: 'up-g-states', label: 'States in Australia', value: 6, acCode: 'AC9HS4K04' },
  { id: 'up-g-territories', label: 'Australian territories', value: 2, acCode: 'AC9HS4K04' },
  { id: 'up-g-aus-area', label: 'Approx. area of Australia (M km²)', value: 7.7, unit: 'M km²', acCode: 'AC9HS4K04' },
  { id: 'up-g-murray-length', label: 'Length of the Murray River (km)', value: 2508, unit: 'km', acCode: 'AC9HS5K05' },
  { id: 'up-g-reef-length', label: 'Length of Great Barrier Reef (km)', value: 2300, unit: 'km', acCode: 'AC9HS5K05' },
  { id: 'up-g-kosciuszko', label: 'Height of Mt Kosciuszko (m)', value: 2228, unit: 'm', acCode: 'AC9HS5K05' },
  { id: 'up-g-pop-melb', label: 'Population of Melbourne (approx.)', value: 5200000, acCode: 'AC9HS4K04' },
  { id: 'up-g-pop-syd', label: 'Population of Sydney (approx.)', value: 5400000, acCode: 'AC9HS4K04' },
  { id: 'up-g-pop-perth', label: 'Population of Perth (approx.)', value: 2200000, acCode: 'AC9HS4K04' },
  { id: 'up-g-pop-brisbane', label: 'Population of Brisbane (approx.)', value: 2700000, acCode: 'AC9HS4K04' },
  { id: 'up-g-pop-darwin', label: 'Population of Darwin (approx.)', value: 150000, acCode: 'AC9HS4K04' },
  { id: 'up-g-pop-canberra', label: 'Population of Canberra (approx.)', value: 470000, acCode: 'AC9HS4K04' },
  { id: 'up-g-oceans', label: 'Oceans on Earth', value: 5, acCode: 'AC9HS6K06' },
  { id: 'up-g-continents', label: 'Continents on Earth', value: 7, acCode: 'AC9HS6K06' },
];

const UPPER_SCIENCE: HoLItem[] = [
  { id: 'up-s-planets', label: 'Planets in our solar system', value: 8, acCode: 'AC9S5U03' },
  { id: 'up-s-moons-jupiter', label: 'Confirmed moons of Jupiter (approx.)', value: 95, acCode: 'AC9S5U03' },
  { id: 'up-s-moons-saturn', label: 'Confirmed moons of Saturn (approx.)', value: 146, acCode: 'AC9S5U03' },
  { id: 'up-s-earth-orbit-days', label: 'Days Earth takes to orbit the Sun', value: 365, acCode: 'AC9S5U03' },
  { id: 'up-s-moon-days', label: 'Days the Moon takes to orbit Earth (approx.)', value: 28, acCode: 'AC9S5U03' },
  { id: 'up-s-water-boil', label: 'Boiling point of water (°C, sea level)', value: 100, unit: '°C', acCode: 'AC9S5U02' },
  { id: 'up-s-water-freeze', label: 'Freezing point of water (°C)', value: 0, unit: '°C', acCode: 'AC9S5U02' },
  { id: 'up-s-bones-adult', label: 'Bones in the adult human body', value: 206, acCode: 'AC9S4U01' },
  { id: 'up-s-bones-baby', label: 'Bones in a newborn baby (approx.)', value: 270, acCode: 'AC9S4U01' },
  { id: 'up-s-teeth-adult', label: 'Teeth in an adult human (incl. wisdom)', value: 32, acCode: 'AC9S4U01' },
  { id: 'up-s-chambers-heart', label: 'Chambers in the human heart', value: 4, acCode: 'AC9S4U01' },
  { id: 'up-s-mercury-distance', label: 'Mercury’s distance from Sun (million km)', value: 58, unit: 'M km', acCode: 'AC9S5U03' },
  { id: 'up-s-earth-distance', label: 'Earth’s distance from Sun (million km)', value: 150, unit: 'M km', acCode: 'AC9S5U03' },
];

// ============================================================
//  MIDDLE SCHOOL  (Year 7 – Year 9)
// ============================================================

const MIDDLE_GENERAL: HoLItem[] = [
  { id: 'ms-gen-elements', label: 'Elements in the periodic table', value: 118 },
  { id: 'ms-gen-countries', label: 'Number of countries (UN members)', value: 193 },
  { id: 'ms-gen-time-zones', label: 'Time zones in the world', value: 24 },
  { id: 'ms-gen-pop-china', label: 'Population of China (billions)', value: 1.41, unit: 'B' },
  { id: 'ms-gen-pop-india', label: 'Population of India (billions)', value: 1.43, unit: 'B' },
  { id: 'ms-gen-pop-usa', label: 'Population of the USA (millions)', value: 335, unit: 'M' },
  { id: 'ms-gen-olympics-years', label: 'Years between Summer Olympic Games', value: 4 },
  { id: 'ms-gen-football-min', label: 'Minutes in a football (soccer) match', value: 90 },
];

const MIDDLE_MATHS: HoLItem[] = [
  { id: 'ms-m-pi', label: 'π to 2 decimal places', value: 3.14, acCode: 'AC9M9M01' },
  { id: 'ms-m-sqrt2', label: '√2 to 2 decimal places', value: 1.41, acCode: 'AC9M8N02' },
  { id: 'ms-m-e', label: 'e to 2 decimal places', value: 2.72, acCode: 'AC9M9N01' },
  { id: 'ms-m-deg-circle', label: 'Degrees in a full circle', value: 360, acCode: 'AC9M7SP02' },
  { id: 'ms-m-deg-tri', label: 'Sum of interior angles in a triangle (°)', value: 180, acCode: 'AC9M7SP02' },
  { id: 'ms-m-deg-quad', label: 'Sum of interior angles in a quadrilateral (°)', value: 360, acCode: 'AC9M7SP02' },
  { id: 'ms-m-deg-pent', label: 'Sum of interior angles in a pentagon (°)', value: 540, acCode: 'AC9M7SP02' },
  { id: 'ms-m-square-12', label: '12²', value: 144, acCode: 'AC9M7N04' },
  { id: 'ms-m-cube-5', label: '5³', value: 125, acCode: 'AC9M8N02' },
  { id: 'ms-m-primes-under-20', label: 'Prime numbers less than 20', value: 8, context: '2,3,5,7,11,13,17,19', acCode: 'AC9M7N04' },
  { id: 'ms-m-factors-12', label: 'Factors of 12', value: 6, context: '1,2,3,4,6,12', acCode: 'AC9M7N04' },
  { id: 'ms-m-perms-3', label: 'Permutations of 3 objects (3!)', value: 6, acCode: 'AC9M8P01' },
  { id: 'ms-m-five-prob', label: 'Sides on a standard die', value: 6, acCode: 'AC9M7P01' },
];

const MIDDLE_HISTORY: HoLItem[] = [
  { id: 'ms-h-ww1-start', label: 'Year WWI began', value: 1914, acCode: 'AC9HH9K02' },
  { id: 'ms-h-ww1-end', label: 'Year WWI ended', value: 1918, acCode: 'AC9HH9K02' },
  { id: 'ms-h-ww2-start', label: 'Year WWII began', value: 1939, acCode: 'AC9HH10K01' },
  { id: 'ms-h-ww2-end', label: 'Year WWII ended', value: 1945, acCode: 'AC9HH10K01' },
  { id: 'ms-h-rome-fell', label: 'Year the Western Roman Empire fell (AD)', value: 476, acCode: 'AC9HH7K01' },
  { id: 'ms-h-magna-carta', label: 'Year Magna Carta was signed', value: 1215, acCode: 'AC9HH8K01' },
  { id: 'ms-h-hastings', label: 'Year of the Battle of Hastings', value: 1066, acCode: 'AC9HH8K01' },
  { id: 'ms-h-columbus', label: 'Year Columbus reached the Americas', value: 1492, acCode: 'AC9HH8K01' },
  { id: 'ms-h-black-death', label: 'Year the Black Death reached Europe', value: 1347, acCode: 'AC9HH8K01' },
  { id: 'ms-h-french-rev', label: 'Year the French Revolution began', value: 1789, acCode: 'AC9HH9K01' },
  { id: 'ms-h-industrial', label: 'Approx. start year of the Industrial Revolution', value: 1760, acCode: 'AC9HH9K01' },
  { id: 'ms-h-cook', label: 'Year Cook reached Australia’s east coast', value: 1770, acCode: 'AC9HH9K04' },
  { id: 'ms-h-fleet', label: 'Year the First Fleet arrived', value: 1788, acCode: 'AC9HH9K04' },
  { id: 'ms-h-federation', label: 'Year of Australian Federation', value: 1901, acCode: 'AC9HH9K04' },
];

const MIDDLE_GEOGRAPHY: HoLItem[] = [
  { id: 'ms-g-pop-china', label: 'Population of China (billions)', value: 1.41, unit: 'B', acCode: 'AC9HG9K02' },
  { id: 'ms-g-pop-india', label: 'Population of India (billions)', value: 1.43, unit: 'B', acCode: 'AC9HG9K02' },
  { id: 'ms-g-pop-aus', label: 'Population of Australia (millions)', value: 27, unit: 'M', acCode: 'AC9HG9K02' },
  { id: 'ms-g-pop-indo', label: 'Population of Indonesia (millions)', value: 280, unit: 'M', acCode: 'AC9HG8K02' },
  { id: 'ms-g-pop-png', label: 'Population of Papua New Guinea (millions)', value: 10, unit: 'M', acCode: 'AC9HG8K02' },
  { id: 'ms-g-pop-tokyo', label: 'Population of Greater Tokyo (millions)', value: 37, unit: 'M', acCode: 'AC9HG9K02' },
  { id: 'ms-g-area-russia', label: 'Area of Russia (M km²)', value: 17.1, unit: 'M km²', acCode: 'AC9HG8K02' },
  { id: 'ms-g-area-china', label: 'Area of China (M km²)', value: 9.6, unit: 'M km²', acCode: 'AC9HG8K02' },
  { id: 'ms-g-area-canada', label: 'Area of Canada (M km²)', value: 10.0, unit: 'M km²', acCode: 'AC9HG8K02' },
  { id: 'ms-g-everest', label: 'Height of Mt Everest (m)', value: 8849, unit: 'm', acCode: 'AC9HG8K02' },
  { id: 'ms-g-k2', label: 'Height of K2 (m)', value: 8611, unit: 'm', acCode: 'AC9HG8K02' },
  { id: 'ms-g-nile', label: 'Length of the Nile (km)', value: 6650, unit: 'km', acCode: 'AC9HG8K02' },
  { id: 'ms-g-amazon-length', label: 'Length of the Amazon (km)', value: 6400, unit: 'km', acCode: 'AC9HG8K02' },
  { id: 'ms-g-pacific-area', label: 'Pacific Ocean area (M km²)', value: 165, unit: 'M km²', acCode: 'AC9HG8K02' },
];

const MIDDLE_SCIENCE: HoLItem[] = [
  { id: 'ms-s-elements', label: 'Elements in the periodic table', value: 118, acCode: 'AC9S8U02' },
  { id: 'ms-s-noble-gases', label: 'Noble gases in the periodic table', value: 6, acCode: 'AC9S8U02' },
  { id: 'ms-s-water-boil', label: 'Boiling point of water (°C)', value: 100, unit: '°C', acCode: 'AC9S7U02' },
  { id: 'ms-s-abs-zero', label: 'Absolute zero (°C)', value: -273, unit: '°C', acCode: 'AC9S8U03' },
  { id: 'ms-s-light-speed', label: 'Speed of light (km/s, thousands)', value: 300, unit: 'k km/s', acCode: 'AC9S9U02' },
  { id: 'ms-s-sound-air', label: 'Speed of sound in air (m/s)', value: 343, unit: 'm/s', acCode: 'AC9S7U03' },
  { id: 'ms-s-gravity', label: 'Earth gravity (m/s²)', value: 9.8, unit: 'm/s²', acCode: 'AC9S9U02' },
  { id: 'ms-s-au-distance', label: '1 Astronomical Unit (million km)', value: 150, unit: 'M km', acCode: 'AC9S7U04' },
  { id: 'ms-s-earth-age', label: 'Age of the Earth (billion years)', value: 4.5, unit: 'Gyr', acCode: 'AC9S9U03' },
  { id: 'ms-s-universe-age', label: 'Age of the universe (billion years)', value: 13.8, unit: 'Gyr', acCode: 'AC9S7U04' },
  { id: 'ms-s-human-cells', label: 'Cells in a human body (trillions)', value: 37, unit: 'T', acCode: 'AC9S8U01' },
  { id: 'ms-s-dna-bases', label: 'Base pairs in human DNA (billions)', value: 3.2, unit: 'B', acCode: 'AC9S8U01' },
  { id: 'ms-s-bones-adult', label: 'Bones in the adult human body', value: 206, acCode: 'AC9S8U01' },
  { id: 'ms-s-richter', label: 'Richter scale maximum (approx., open-ended)', value: 9.5, context: '1960 Valdivia', acCode: 'AC9S9U03' },
];

// ============================================================
//  SENIOR SCHOOL  (Year 10 – Year 12)
// ============================================================

const SENIOR_GENERAL: HoLItem[] = [
  { id: 'ss-gen-gdp-aus', label: 'Australia GDP (US$, trillions)', value: 1.7, unit: 'T USD' },
  { id: 'ss-gen-gdp-us', label: 'USA GDP (US$, trillions)', value: 27, unit: 'T USD' },
  { id: 'ss-gen-gdp-china', label: 'China GDP (US$, trillions)', value: 17, unit: 'T USD' },
  { id: 'ss-gen-megacity', label: 'Population threshold for a megacity (millions)', value: 10, unit: 'M' },
  { id: 'ss-gen-un-members', label: 'UN member states', value: 193 },
  { id: 'ss-gen-eu-members', label: 'EU member states', value: 27 },
  { id: 'ss-gen-asean', label: 'ASEAN member states', value: 10 },
  { id: 'ss-gen-co2-now', label: 'Atmospheric CO₂ in 2024 (ppm)', value: 422, unit: 'ppm' },
  { id: 'ss-gen-co2-pre', label: 'Pre-industrial atmospheric CO₂ (ppm)', value: 280, unit: 'ppm' },
];

const SENIOR_MATHS: HoLItem[] = [
  { id: 'ss-m-pi-4', label: 'π to 4 decimal places', value: 3.1416, acCode: 'AC9M10A03' },
  { id: 'ss-m-e-4', label: 'e to 4 decimal places', value: 2.7183, acCode: 'AC9M10A04' },
  { id: 'ss-m-phi', label: 'Golden ratio φ to 3 decimal places', value: 1.618, acCode: 'AC9M10A04' },
  { id: 'ss-m-sqrt3', label: '√3 to 3 decimal places', value: 1.732, acCode: 'AC9M10A04' },
  { id: 'ss-m-fac-6', label: '6!', value: 720, acCode: 'AC9M10P01' },
  { id: 'ss-m-fac-10', label: '10!', value: 3628800, acCode: 'AC9M10P01' },
  { id: 'ss-m-sin-30', label: 'sin(30°) × 2', value: 1, acCode: 'AC9M10A03' },
  { id: 'ss-m-log-1000', label: 'log₁₀(1000)', value: 3, acCode: 'AC9M10A03' },
  { id: 'ss-m-ln-e', label: 'ln(e)', value: 1, acCode: 'AC9M10A03' },
  { id: 'ss-m-binom-2-of-3', label: 'C(3,2) — choose 2 from 3', value: 3, acCode: 'AC9M10P01' },
  { id: 'ss-m-normal-sd1', label: '% of normal distribution within 1 SD', value: 68, unit: '%', acCode: 'AC9M10ST02' },
  { id: 'ss-m-normal-sd2', label: '% of normal distribution within 2 SD', value: 95, unit: '%', acCode: 'AC9M10ST02' },
  { id: 'ss-m-normal-sd3', label: '% of normal distribution within 3 SD', value: 99.7, unit: '%', acCode: 'AC9M10ST02' },
];

const SENIOR_HISTORY: HoLItem[] = [
  { id: 'ss-h-russian-rev', label: 'Year of the Russian Revolution', value: 1917, acCode: 'AC9HH10K02' },
  { id: 'ss-h-versailles', label: 'Year of the Treaty of Versailles', value: 1919, acCode: 'AC9HH10K01' },
  { id: 'ss-h-wall-fall', label: 'Year the Berlin Wall fell', value: 1989, acCode: 'AC9HH10K03' },
  { id: 'ss-h-cuban', label: 'Year of the Cuban Missile Crisis', value: 1962, acCode: 'AC9HH10K03' },
  { id: 'ss-h-apollo', label: 'Year of the Apollo 11 Moon landing', value: 1969, acCode: 'AC9HH10K02' },
  { id: 'ss-h-mabo', label: 'Year of the Mabo decision', value: 1992, acCode: 'AC9HH10K04' },
  { id: 'ss-h-apology', label: 'Year of the Apology to the Stolen Generations', value: 2008, acCode: 'AC9HH10K04' },
  { id: 'ss-h-referendum', label: 'Year of the 1967 referendum', value: 1967, acCode: 'AC9HH10K04' },
  { id: 'ss-h-vietnam-end', label: 'Year Vietnam War ended', value: 1975, acCode: 'AC9HH10K02' },
  { id: 'ss-h-prc', label: 'Year the PRC was founded', value: 1949, acCode: 'AC9HH10K03' },
  { id: 'ss-h-india-ind', label: 'Year of Indian independence', value: 1947, acCode: 'AC9HH10K03' },
  { id: 'ss-h-apartheid-end', label: 'Year apartheid officially ended', value: 1991, acCode: 'AC9HH10K04' },
  { id: 'ss-h-dismissal', label: 'Year of the Whitlam dismissal', value: 1975, acCode: 'AC9HH10K04' },
  { id: 'ss-h-pearl', label: 'Year of the Pearl Harbor attack', value: 1941, acCode: 'AC9HH10K01' },
];

const SENIOR_GEOGRAPHY: HoLItem[] = [
  { id: 'ss-g-co2-now', label: 'Atmospheric CO₂ in 2024 (ppm)', value: 422, unit: 'ppm', acCode: 'AC9HG10K03' },
  { id: 'ss-g-co2-pre', label: 'Pre-industrial CO₂ (ppm)', value: 280, unit: 'ppm', acCode: 'AC9HG10K03' },
  { id: 'ss-g-warming', label: 'Warming since pre-industrial (°C, approx.)', value: 1.2, unit: '°C', acCode: 'AC9HG10K03' },
  { id: 'ss-g-paris-target', label: 'Paris Agreement primary warming target (°C)', value: 1.5, unit: '°C', acCode: 'AC9HG10K03' },
  { id: 'ss-g-megacity-pop', label: 'Megacity population threshold (millions)', value: 10, unit: 'M', acCode: 'AC9HG10K01' },
  { id: 'ss-g-pop-world', label: 'World population (billions)', value: 8.1, unit: 'B', acCode: 'AC9HG10K01' },
  { id: 'ss-g-urban-share', label: '% of world population living in cities (approx.)', value: 56, unit: '%', acCode: 'AC9HG10K01' },
  { id: 'ss-g-pop-tokyo', label: 'Greater Tokyo population (millions)', value: 37, unit: 'M', acCode: 'AC9HG10K01' },
  { id: 'ss-g-pop-delhi', label: 'Greater Delhi population (millions)', value: 33, unit: 'M', acCode: 'AC9HG10K01' },
  { id: 'ss-g-aus-iron-rank', label: 'Australia’s world rank in iron ore exports', value: 1, acCode: 'AC9HG10K01' },
  { id: 'ss-g-aus-emissions', label: 'Australia annual CO₂ emissions (Mt)', value: 380, unit: 'Mt', acCode: 'AC9HG10K03' },
  { id: 'ss-g-china-emissions', label: 'China annual CO₂ emissions (Gt)', value: 11.4, unit: 'Gt', acCode: 'AC9HG10K03' },
  { id: 'ss-g-eu-emissions', label: 'EU annual CO₂ emissions (Gt)', value: 2.6, unit: 'Gt', acCode: 'AC9HG10K03' },
  { id: 'ss-g-glacier-loss', label: 'Annual glacier mass loss (Gt approx.)', value: 270, unit: 'Gt', acCode: 'AC9HG10K03' },
];

const SENIOR_SCIENCE: HoLItem[] = [
  { id: 'ss-s-light-speed', label: 'Speed of light (km/s)', value: 299792, unit: 'km/s', acCode: 'AC9S10U02' },
  { id: 'ss-s-planck', label: 'Planck constant (×10⁻³⁴ J·s)', value: 6.626, unit: '×10⁻³⁴ J·s', acCode: 'AC9S10U02' },
  { id: 'ss-s-avogadro', label: 'Avogadro’s number (×10²³)', value: 6.022, unit: '×10²³', acCode: 'AC9S10U02' },
  { id: 'ss-s-earth-age', label: 'Age of the Earth (billion years)', value: 4.54, unit: 'Gyr', acCode: 'AC9S10U03' },
  { id: 'ss-s-universe-age', label: 'Age of the universe (billion years)', value: 13.8, unit: 'Gyr', acCode: 'AC9S10U04' },
  { id: 'ss-s-sun-mass', label: 'Sun mass (×10³⁰ kg)', value: 1.989, unit: '×10³⁰ kg', acCode: 'AC9S10U04' },
  { id: 'ss-s-electron-mass', label: 'Electron mass (×10⁻³¹ kg)', value: 9.11, unit: '×10⁻³¹ kg', acCode: 'AC9S10U02' },
  { id: 'ss-s-proton-mass', label: 'Proton mass (×10⁻²⁷ kg)', value: 1.673, unit: '×10⁻²⁷ kg', acCode: 'AC9S10U02' },
  { id: 'ss-s-genes-human', label: 'Estimated protein-coding genes in humans', value: 20000, acCode: 'AC9S10U01' },
  { id: 'ss-s-chromosomes', label: 'Chromosomes in a human cell', value: 46, acCode: 'AC9S10U01' },
  { id: 'ss-s-half-life-c14', label: 'Half-life of Carbon-14 (years)', value: 5730, acCode: 'AC9S10U02' },
  { id: 'ss-s-half-life-u238', label: 'Half-life of Uranium-238 (billion years)', value: 4.47, unit: 'Gyr', acCode: 'AC9S10U02' },
  { id: 'ss-s-sun-temp', label: 'Sun surface temperature (K)', value: 5778, unit: 'K', acCode: 'AC9S10U04' },
  { id: 'ss-s-pH-water', label: 'pH of pure water', value: 7, acCode: 'AC9S10U02' },
];

export const HOL_BANK: Bank<HoLItem> = {
  byStreamSubject: {
    lower_primary: {
      general: LOWER_GENERAL,
      maths: LOWER_MATHS,
      history: LOWER_HISTORY,
      geography: LOWER_GEOGRAPHY,
      science: LOWER_SCIENCE,
    },
    upper_primary: {
      general: UPPER_GENERAL,
      maths: UPPER_MATHS,
      history: UPPER_HISTORY,
      geography: UPPER_GEOGRAPHY,
      science: UPPER_SCIENCE,
    },
    middle_school: {
      general: MIDDLE_GENERAL,
      maths: MIDDLE_MATHS,
      history: MIDDLE_HISTORY,
      geography: MIDDLE_GEOGRAPHY,
      science: MIDDLE_SCIENCE,
    },
    senior_school: {
      general: SENIOR_GENERAL,
      maths: SENIOR_MATHS,
      history: SENIOR_HISTORY,
      geography: SENIOR_GEOGRAPHY,
      science: SENIOR_SCIENCE,
    },
  },
};
