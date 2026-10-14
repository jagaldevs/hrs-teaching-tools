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
      statements: ['Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramid.', 'Antarctica is the driest continent.', 'The Great Wall of China is visible from the Moon with the naked eye.'],
      lie: 2,
      explanation: 'A popular myth — the Wall is far too narrow to see from the Moon. The Cleopatra fact is true: she lived c. 30 BCE, about 2,500 years after the Great Pyramid (~2560 BCE) and 2,000 years before 1969.',
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
    // ── Year 7 Humanities (HRS-anchored) — Deep Time History checkpoint batch ──
    {
      id: 'y7-tl-hum-1',
      subject: 'history',
      classId: 'y7-humanities',
      statements: ['Aboriginal culture is at least 65,000 years old.', 'Sahul once linked Australia, Tasmania and New Guinea.', 'Radiocarbon dating works best on solid granite rock.'],
      lie: 2,
      explanation: 'Radiocarbon dating works on once-living material, not solid rock. The other two statements are true.',
    },
    {
      id: 'y7-tl-hum-2',
      subject: 'history',
      classId: 'y7-humanities',
      statements: ['Budj Bim is located in the Northern Territory.', 'Budj Bim has ancient channels for trapping eels.', 'Budj Bim was World Heritage listed in 2019.'],
      lie: 0,
      explanation: 'Budj Bim is in Victoria, about 80 km from Port Fairy — not the Northern Territory.',
    },
    {
      id: 'y7-tl-hum-3',
      subject: 'history',
      classId: 'y7-humanities',
      statements: ['Kilo annum (ka) means one thousand years.', 'Before present (BP) counts years forward into the future.', 'Mega annum (ma) means one million years.'],
      lie: 1,
      explanation: 'BP counts years backward from the present, not forward into the future.',
    },
    {
      id: 'y7-tl-hum-4',
      subject: 'history',
      classId: 'y7-humanities',
      statements: ['The Pleistocene was an ice age.', 'The Holocene covers roughly the last 10,000 years.', 'The Holocene came before the Pleistocene.'],
      lie: 2,
      explanation: 'The Pleistocene came first; the Holocene is the warmer period that followed it.',
    },
    {
      id: 'y7-tl-hum-5',
      subject: 'history',
      classId: 'y7-humanities',
      statements: ['The Lake Mungo remains are made of solid gold.', 'Lake Mungo is in the Willandra Lakes region.', 'Willandra Lakes was World Heritage listed in 1981.'],
      lie: 0,
      explanation: 'The Lake Mungo remains are ancient human remains, not gold objects.',
    },
    {
      id: 'y7-tl-hum-6',
      subject: 'history',
      classId: 'y7-humanities',
      statements: ['Sea levels rose around 18,000 years ago.', 'The sea-level rise added a quarter more land to Australia.', 'Melting polar ice caused the sea-level rise.'],
      lie: 1,
      explanation: 'The rising seas submerged about a quarter of Australia’s land — they did not add land.',
    },
    {
      id: 'y7-tl-hum-7',
      subject: 'history',
      classId: 'y7-humanities',
      statements: ['The Dreaming includes Creation stories.', 'Elders pass on knowledge and lore.', 'Kinship is a type of hunting weapon.'],
      lie: 2,
      explanation: 'Kinship is a social system of roles and relationships, not a weapon.',
    },
    {
      id: 'y7-tl-hum-8',
      subject: 'history',
      classId: 'y7-humanities',
      statements: ['Megafauna lived at the same time as the dinosaurs.', 'Megafauna were giant animals.', 'Rock art shows people living alongside megafauna.'],
      lie: 0,
      explanation: 'Megafauna lived alongside early humans, tens of millions of years after the dinosaurs.',
    },
    {
      id: 'y7-tl-hum-9',
      subject: 'history',
      classId: 'y7-humanities',
      statements: ['Archaeologists study physical remains like bones and tools.', 'A history documentary made in 2024 is a primary source.', 'Historians use both written and oral sources.'],
      lie: 1,
      explanation: 'A documentary made in 2024 is a secondary source; primary sources come from the time being studied.',
    },
    {
      id: 'y7-tl-hum-10',
      subject: 'history',
      classId: 'y7-humanities',
      statements: ['First Nations peoples were many nations with many languages.', 'First Nations peoples managed land and water sustainably.', 'First Nations peoples arrived in Australia about 500 years ago.'],
      lie: 2,
      explanation: 'First Nations peoples have lived in Australia for at least 65,000 years, not 500.',
    },
    {
      id: 'y7-tl-hum-11',
      subject: 'history',
      classId: 'y7-humanities',
      statements: ['Relative dating gives the exact calendar year of an object.', 'Stratigraphy studies layers of rock and soil.', 'Deeper rock layers are usually older than those above.'],
      lie: 0,
      explanation: 'Relative dating only gives an order (older or younger); absolute dating gives an exact age.',
    },
    {
      id: 'y7-tl-hum-12',
      subject: 'history',
      classId: 'y7-humanities',
      statements: ['Homo sapiens is the name for modern humans.', 'Humans evolved directly from modern chimpanzees.', 'Bipedalism means walking upright on two legs.'],
      lie: 1,
      explanation: 'Humans and modern chimpanzees share a common ancestor — humans did not descend from living chimps.',
    },
    { id: 'y7-tl-hum-13', subject: 'history', classId: 'y7-humanities', statements: ['The pyramids were palaces where pharaohs lived.', 'The Nile flooded each year and left behind fertile silt.', 'Hieroglyphics was the picture-writing of ancient Egypt.'], lie: 0, explanation: 'The pyramids were tombs, not palaces.' },
    { id: 'y7-tl-hum-14', subject: 'history', classId: 'y7-humanities', statements: ['Canopic jars held organs during mummification.', 'Ordinary workers received the same elaborate mummification as pharaohs.', 'The Book of the Dead held spells for the afterlife.'], lie: 1, explanation: 'Elaborate mummification was mainly for the wealthy, not everyone.' },
    { id: 'y7-tl-hum-15', subject: 'history', classId: 'y7-humanities', statements: ['Ramses II ruled Egypt for about 66 years.', 'The Treaty of Kadesh was one of the first known peace treaties.', 'Ramses II built the Great Pyramid of Giza.'], lie: 2, explanation: 'The Giza pyramids were built in the Old Kingdom, long before Ramses II.' },
    { id: 'y7-tl-hum-16', subject: 'history', classId: 'y7-humanities', statements: ['Hatshepsut was a male pharaoh.', 'Tutankhamun’s tomb was found nearly intact.', 'Imhotep is credited with designing the first pyramid.'], lie: 0, explanation: 'Hatshepsut was a woman who ruled as pharaoh.' },
    { id: 'y7-tl-hum-17', subject: 'history', classId: 'y7-humanities', statements: ['The pharaoh was seen as both king and god.', 'Scribes in ancient Egypt could not read or write.', 'The vizier helped the pharaoh govern Egypt.'], lie: 1, explanation: 'Scribes were trained specifically to read and write.' },
    { id: 'y7-tl-hum-18', subject: 'history', classId: 'y7-humanities', statements: ['The Nile Delta was fertile farmland.', 'Cataracts were rocky rapids on the Nile.', 'The desert around Egypt made it easy for enemies to invade.'], lie: 2, explanation: 'The deserts acted as natural barriers that protected Egypt from invaders.' },
    { id: 'y7-tl-hum-19', subject: 'history', classId: 'y7-humanities', statements: ['Ancient Greece was a single united country.', 'Greece was made up of many city-states.', 'Athens is famous for its early democracy.'], lie: 0, explanation: 'Greece was many independent city-states, not one united country.' },
    { id: 'y7-tl-hum-20', subject: 'history', classId: 'y7-humanities', statements: ['A hoplite was a Greek foot soldier.', 'A trireme was a type of land chariot.', 'A phalanx was a formation of soldiers.'], lie: 1, explanation: 'A trireme was a warship rowed by three banks of oars, not a chariot.' },
    { id: 'y7-tl-hum-21', subject: 'history', classId: 'y7-humanities', statements: ['In Athens, only male citizens could vote.', 'Women in ancient Greece were non-citizens.', 'Enslaved people in Greece were allowed to vote.'], lie: 2, explanation: 'Enslaved people could not vote; only free male citizens could.' },
    { id: 'y7-tl-hum-22', subject: 'history', classId: 'y7-humanities', statements: ['Leonidas was a leader from Athens.', 'Sparta was known for its military training.', 'The Iliad reflects Greek heroic ideals.'], lie: 0, explanation: 'Leonidas was a Spartan king, not from Athens.' },
    { id: 'y7-tl-hum-23', subject: 'history', classId: 'y7-humanities', statements: ['Greece’s mountains made land travel difficult.', 'Ancient Greece had no access to the sea.', 'The Aegean Sea borders Greece.'], lie: 1, explanation: 'Greece was surrounded by seas and relied on them for trade and travel.' },
    { id: 'y7-tl-hum-24', subject: 'history', classId: 'y7-humanities', statements: ['Rome moved from kings, to a republic, to emperors.', 'Augustus was the first Roman emperor.', 'Julius Caesar was the first Roman emperor.'], lie: 2, explanation: 'Julius Caesar was never emperor; Augustus was the first.' },
    { id: 'y7-tl-hum-25', subject: 'history', classId: 'y7-humanities', statements: ['Plebeians were enslaved people.', 'Patricians were the wealthy upper class.', 'A legion was a large unit of the Roman army.'], lie: 0, explanation: 'Plebeians were free common citizens, not enslaved people.' },
    { id: 'y7-tl-hum-26', subject: 'history', classId: 'y7-humanities', statements: ['The Tiber River ran through Rome.', 'Rome banned the religions of the peoples it conquered.', 'Some Roman leaders were declared gods after death.'], lie: 1, explanation: 'Rome usually tolerated and even adopted the religions of conquered peoples.' },
    { id: 'y7-tl-hum-27', subject: 'history', classId: 'y7-humanities', statements: ['Roman women were technically citizens.', 'Via Romana meant the Roman way of life.', 'Via Romana was a famous Roman road.'], lie: 2, explanation: 'Via Romana referred to Roman values and customs, not a road.' },
    { id: 'y7-tl-hum-28', subject: 'history', classId: 'y7-humanities', statements: ['Rome was ruled by emperors from its very beginning.', 'The Roman army was known for its discipline.', 'Rome grew from villages into a huge empire.'], lie: 0, explanation: 'Rome had kings and then a republic before it had emperors.' },
    { id: 'y7-tl-hum-29', subject: 'history', classId: 'y7-humanities', statements: ['A dynasty is a ruling family across generations.', 'The Mandate of Heaven was decided by a public vote.', 'Confucius taught the importance of order and respect.'], lie: 1, explanation: 'The Mandate of Heaven was divine approval to rule, not a vote.' },
    { id: 'y7-tl-hum-30', subject: 'history', classId: 'y7-humanities', statements: ['Buddhism came to China from India.', 'Daoism was more religious than Confucianism.', 'Confucianism worshipped many war gods.'], lie: 2, explanation: 'The course describes Confucianism as about behaviour, not the worship of war gods.' },
    { id: 'y7-tl-hum-31', subject: 'history', classId: 'y7-humanities', statements: ['The Himalayas made trade with neighbours easy.', 'Ancient China lay on the eastern side of Asia.', 'Elders were greatly respected in ancient China.'], lie: 0, explanation: 'The Himalayas limited China’s contact with others rather than easing trade.' },
    { id: 'y7-tl-hum-32', subject: 'history', classId: 'y7-humanities', statements: ['Qin Shi Huang was an early Chinese emperor.', 'Wu Zetian was a Roman general.', 'Confucius lived from 551 to 479 BCE.'], lie: 1, explanation: 'Wu Zetian was a Chinese ruler, not a Roman general.' },
    { id: 'y7-tl-hum-33', subject: 'history', classId: 'y7-humanities', statements: ['The Mandate of Heaven could be lost by a ruler.', 'A dynasty could rise and later fall.', 'A dynasty means a single ruler for just one day.'], lie: 2, explanation: 'A dynasty is a ruling family across generations, not one ruler for a day.' },
    { id: 'y7-tl-hum-34', subject: 'history', classId: 'y7-humanities', statements: ['A modern textbook is a primary source.', 'A diary written at the time is a primary source.', 'Historians check a source’s origin and purpose.'], lie: 0, explanation: 'A modern textbook is a secondary source, not a primary one.' },
    { id: 'y7-tl-hum-35', subject: 'history', classId: 'y7-humanities', statements: ['Primary sources come from the time being studied.', 'Primary sources are completely reliable and free of bias.', 'Secondary sources are made later by researchers.'], lie: 1, explanation: 'Primary sources can still be biased, so they are not always reliable.' },
    { id: 'y7-tl-hum-36', subject: 'history', classId: 'y7-humanities', statements: ['Chronology means ordering events in time.', 'Significance is about how important something is.', 'Contestability means historians share one fixed interpretation.'], lie: 2, explanation: 'Contestability means historians can interpret the same evidence differently.' },
    { id: 'y7-tl-hum-37', subject: 'geography', classId: 'y7-humanities', statements: ['BOLTSS is used to build a timeline.', 'BOLTSS lists the features of a map.', 'A legend explains a map’s symbols.'], lie: 0, explanation: 'BOLTSS lists the parts of a map, not a timeline.' },
    { id: 'y7-tl-hum-38', subject: 'geography', classId: 'y7-humanities', statements: ['PQE helps describe patterns in data.', 'The "P" in PQE stands for "purpose".', 'The "E" in PQE stands for "exception".'], lie: 1, explanation: 'The "P" in PQE stands for Pattern, not purpose.' },
    { id: 'y7-tl-hum-39', subject: 'geography', classId: 'y7-humanities', statements: ['A compass shows direction on a map.', 'Scale relates map distance to real distance.', 'A map’s legend shows which way is north.'], lie: 2, explanation: 'Orientation (a north arrow) shows direction; the legend explains symbols.' },
    { id: 'y7-tl-hum-40', subject: 'geography', classId: 'y7-humanities', statements: ['Water is a non-renewable resource.', 'The water cycle replenishes water.', 'Groundwater is stored in soil and rock.'], lie: 0, explanation: 'Water is renewable — the water cycle keeps replenishing it.' },
    { id: 'y7-tl-hum-41', subject: 'geography', classId: 'y7-humanities', statements: ['Evaporation turns liquid water into vapour.', 'Condensation turns liquid water into vapour.', 'Precipitation falls as rain, hail or snow.'], lie: 1, explanation: 'Condensation is vapour turning back into liquid, not the reverse.' },
    { id: 'y7-tl-hum-42', subject: 'geography', classId: 'y7-humanities', statements: ['Desalination removes salt from seawater.', 'Water recycling reuses treated water.', 'Desalination is cheap and used everywhere.'], lie: 2, explanation: 'Desalination is expensive and energy-intensive, so it is not used everywhere.' },
    { id: 'y7-tl-hum-43', subject: 'geography', classId: 'y7-humanities', statements: ['Water scarcity happens just in places with low rainfall.', 'Population growth can contribute to water scarcity.', 'The unit studied the water crisis in Iran.'], lie: 0, explanation: 'Scarcity also comes from wasteful use, growth and old infrastructure, not just low rainfall.' },
    { id: 'y7-tl-hum-44', subject: 'geography', classId: 'y7-humanities', statements: ['First Nations peoples value water spiritually.', 'First Nations peoples value water just as a practical resource.', 'Swimming is a recreational use of water.'], lie: 1, explanation: 'First Nations peoples value water spiritually and artistically, not only for washing.' },
    { id: 'y7-tl-hum-45', subject: 'geography', classId: 'y7-humanities', statements: ['Objective liveability measures use numbers.', 'Subjective liveability measures are personal opinions.', 'Objective and subjective measures are the same thing.'], lie: 2, explanation: 'Objective measures are numerical; subjective ones are opinion-based — they differ.' },
    { id: 'y7-tl-hum-46', subject: 'geography', classId: 'y7-humanities', statements: ['The biggest cities are the most liveable places.', 'Melbourne is used as a liveability case study.', 'Safety and healthcare are liveability factors.'], lie: 0, explanation: 'The biggest cities are not automatically the most liveable.' },
    { id: 'y7-tl-hum-47', subject: 'geography', classId: 'y7-humanities', statements: ['A 20-minute neighbourhood is about a 20-minute walk.', 'A 20-minute neighbourhood means a 20-minute drive.', 'Living locally reduces the need to travel far.'], lie: 1, explanation: 'The plan is based on a 20-minute return walk, not a drive.' },
    { id: 'y7-tl-hum-48', subject: 'geography', classId: 'y7-humanities', statements: ['Traffic congestion can lower a city’s liveability.', 'Sustainability includes social and economic needs.', 'Sustainability is about the environment and nothing else.'], lie: 2, explanation: 'Sustainability balances social, economic and environmental needs.' },
    { id: 'y7-tl-hum-49', subject: 'geography', classId: 'y7-humanities', statements: ['Rural areas are automatically unliveable.', 'Remote areas are far from cities and services.', 'People value different things in a place.'], lie: 0, explanation: 'Rural areas are not automatically unliveable — they can have other valued qualities.' },
    { id: 'y7-tl-hum-50', subject: 'history', classId: 'y7-humanities', statements: ['The Nile gave Egypt water and fertile soil.', 'Egypt had no deserts around it.', 'Papyrus was used as a writing material.'], lie: 1, explanation: 'Egypt was surrounded by deserts, which protected it.' },
    { id: 'y7-tl-hum-51', subject: 'history', classId: 'y7-humanities', statements: ['Egyptians worshipped over 2,000 gods.', 'Horus was linked to kingship and protection.', 'Egyptians worshipped a single main god.'], lie: 2, explanation: 'Egyptians were polytheistic, worshipping many gods.' },
    { id: 'y7-tl-hum-52', subject: 'history', classId: 'y7-humanities', statements: ['The Peloponnesian Wars were fought against Egypt.', 'The Peloponnesian Wars were between Greek city-states.', 'Greek city-states sometimes united against Persia.'], lie: 0, explanation: 'The Peloponnesian Wars were between Greek city-states such as Athens and Sparta.' },
    { id: 'y7-tl-hum-53', subject: 'history', classId: 'y7-humanities', statements: ['Pericles was an Athenian leader.', 'Pericles was a king of Sparta.', 'Significance judges why a person matters in history.'], lie: 1, explanation: 'Pericles was a leading statesman of Athens, not Sparta.' },
    { id: 'y7-tl-hum-54', subject: 'history', classId: 'y7-humanities', statements: ['Rome’s three periods were regal, republican and imperial.', 'The Mediterranean Sea helped Roman trade.', 'Roman society lasted for about 50 years in total.'], lie: 2, explanation: 'Roman society lasted around 1,300 years.' },
    { id: 'y7-tl-hum-55', subject: 'history', classId: 'y7-humanities', statements: ['A legion was a single Roman soldier.', 'Siege warfare involved attacking fortified places.', 'Patricians were Rome’s aristocracy.'], lie: 0, explanation: 'A legion was a large army unit, not a single soldier.' },
    { id: 'y7-tl-hum-56', subject: 'history', classId: 'y7-humanities', statements: ['Confucius was a philosopher and teacher.', 'Buddhism first began in ancient China.', 'Daoism began in China.'], lie: 1, explanation: 'Buddhism began in India and later spread to China.' },
    { id: 'y7-tl-hum-57', subject: 'history', classId: 'y7-humanities', statements: ['Ancient Chinese society had a strict hierarchy.', 'Confucius stressed respect and social order.', 'Ancient China had a flat society with equal ranks.'], lie: 2, explanation: 'Chinese society was strongly hierarchical, reinforced by Confucian ideas.' },
    { id: 'y7-tl-hum-58', subject: 'history', classId: 'y7-humanities', statements: ['Sahul once included Antarctica.', 'Sahul linked Australia, Tasmania and New Guinea.', 'Lower sea levels created the landmass of Sahul.'], lie: 0, explanation: 'Sahul never included Antarctica; it joined Australia, Tasmania and New Guinea.' },
    { id: 'y7-tl-hum-59', subject: 'history', classId: 'y7-humanities', statements: ['Budj Bim is located in Victoria.', 'Budj Bim is a modern shopping centre.', 'Budj Bim shows First Nations eel farming.'], lie: 1, explanation: 'Budj Bim is an ancient cultural landscape, not a modern shopping centre.' },
    { id: 'y7-tl-hum-60', subject: 'history', classId: 'y7-humanities', statements: ['Kinship organises roles and relationships.', 'Elders pass on knowledge and lore.', 'Totems are a kind of Egyptian jewellery.'], lie: 2, explanation: 'Totems are First Nations natural symbols of identity, not Egyptian jewellery.' },
    { id: 'y7-tl-hum-61', subject: 'history', classId: 'y7-humanities', statements: ['The Dreaming is about the dreams people have while asleep.', 'The Dreaming includes Creation stories.', 'Country includes land, water and spiritual connection.'], lie: 0, explanation: 'The Dreaming is about Creation stories and ongoing knowledge, not sleeping dreams.' },
    { id: 'y7-tl-hum-62', subject: 'history', classId: 'y7-humanities', statements: ['An archaeologist studies physical remains.', 'A historian avoids using written sources.', 'Evidence supports a historian’s conclusions.'], lie: 1, explanation: 'Historians rely heavily on written and oral sources.' },
    { id: 'y7-tl-hum-63', subject: 'history', classId: 'y7-humanities', statements: ['Perspective is a person’s point of view.', 'Empathy means understanding past people’s feelings.', 'Empathy means memorising a list of dates.'], lie: 2, explanation: 'Historical empathy is understanding past people’s thoughts and feelings, not memorising dates.' },
    { id: 'y7-tl-hum-64', subject: 'geography', classId: 'y7-humanities', statements: ['Runoff is water that rises up into the sky.', 'Runoff flows over land into rivers and seas.', 'River flooding is a type of water hazard.'], lie: 0, explanation: 'Runoff flows across the land; water rising into the sky is evaporation.' },
    { id: 'y7-tl-hum-65', subject: 'geography', classId: 'y7-humanities', statements: ['Continuous resources like sunlight are always available.', 'Renewable and continuous resources are exactly the same.', 'Water is a renewable resource.'], lie: 1, explanation: 'Continuous resources are always available, while renewable ones replenish but can vary.' },
    { id: 'y7-tl-hum-66', subject: 'geography', classId: 'y7-humanities', statements: ['Infrastructure includes roads and power supplies.', 'Climate affects how liveable a place is.', 'Liveability means the same thing to each person.'], lie: 2, explanation: 'Liveability varies with people’s age, income, culture and values.' },
    { id: 'y7-tl-hum-67', subject: 'geography', classId: 'y7-humanities', statements: ['Urban areas are empty deserts.', 'Urban areas are cities and built-up towns.', 'Remote areas are far from services.'], lie: 0, explanation: 'Urban areas are cities and towns, not empty deserts.' },
    { id: 'y7-tl-hum-68', subject: 'geography', classId: 'y7-humanities', statements: ['A grid reference describes a location on a map.', 'A map’s scale shows who drew the map.', 'Orientation shows which way is north.'], lie: 1, explanation: 'Scale relates map distance to real distance; the source shows who made the map.' },
    { id: 'y7-tl-hum-69', subject: 'geography', classId: 'y7-humanities', statements: ['SPICESS lists key geographical concepts.', 'Interconnection links places and people.', 'SPICESS is a way of dating fossils.'], lie: 2, explanation: 'SPICESS is a set of geographical concepts, not a dating method.' },
    { id: 'y7-tl-hum-70', subject: 'history', classId: 'y7-humanities', statements: ['The Colosseum is located in ancient Egypt.', 'The pyramids are in Egypt.', 'The Parthenon is in Greece.'], lie: 0, explanation: 'The Colosseum is in Rome, not Egypt.' },
    { id: 'y7-tl-hum-71', subject: 'history', classId: 'y7-humanities', statements: ['Confucius came from China.', 'Julius Caesar came from Greece.', 'Ramses II came from Egypt.'], lie: 1, explanation: 'Julius Caesar was Roman, not Greek.' },
    { id: 'y7-tl-hum-72', subject: 'history', classId: 'y7-humanities', statements: ['A trireme is a Greek warship.', 'A chariot was used in ancient battles.', 'A canopic jar is a type of Greek warship.'], lie: 2, explanation: 'A canopic jar is an Egyptian container for organs, not a warship.' },
    { id: 'y7-tl-hum-73', subject: 'history', classId: 'y7-humanities', statements: ['BCE dates get smaller the further back you go.', '500 BCE is older than 200 BCE.', 'CE dates come after BCE dates.'], lie: 0, explanation: 'BCE dates get larger the further back you go — 500 BCE is older than 200 BCE.' },
    { id: 'y7-tl-hum-74', subject: 'history', classId: 'y7-humanities', statements: ['Historians order events using chronology.', 'A timeline shows the weather each day.', 'Timelines help show cause and consequence.'], lie: 1, explanation: 'Timelines show events in time order, not daily weather.' },
    { id: 'y7-tl-hum-75', subject: 'geography', classId: 'y7-humanities', statements: ['Water can be used to make energy in a dam.', 'Desalination removes salt from seawater.', 'Water is made in factories.'], lie: 2, explanation: 'Water is a natural resource cycled through the environment, not manufactured in factories.' },
    // ── Year 8 Humanities (HRS-anchored) — Medieval Europe, Japan under the Shoguns, skills, landscapes/coasts, cities ──
    { id: 'y8-tl-hum-1', subject: 'history', classId: 'y8-humanities', statements: ['Under feudalism, a lord granted land to a vassal in return for loyalty.', 'Peasants were the largest group in medieval society.', 'Serfs could be bought and sold like personal property.'], lie: 2, explanation: 'Serfs were bound to the manor, not owned as property — the key difference from slavery. The other two are true.' },
    { id: 'y8-tl-hum-2', subject: 'history', classId: 'y8-humanities', statements: ['The monarch sat at the top of the feudal hierarchy.', 'Knights ranked above the nobles who granted their fiefs.', 'Serfs worked the land on a lord’s manor.'], lie: 1, explanation: 'Knights ranked below the nobles — the order ran monarch, nobles and church officials, knights, then peasants.' },
    { id: 'y8-tl-hum-3', subject: 'history', classId: 'y8-humanities', statements: ['The tithe was a voluntary donation to the Church.', 'Excommunication cut a person off from the church community.', 'Canon law was laid down by papal pronouncements.'], lie: 0, explanation: 'The tithe was a required one-tenth of produce or earnings, not a voluntary gift.' },
    { id: 'y8-tl-hum-4', subject: 'history', classId: 'y8-humanities', statements: ['Trial by ordeal used painful tests read as God’s judgement.', 'Criminals could claim sanctuary inside a church.', 'Heresy was the crime of betraying the king.'], lie: 2, explanation: 'Heresy clashed with Church teaching; betraying the king was treason.' },
    { id: 'y8-tl-hum-5', subject: 'history', classId: 'y8-humanities', statements: ['Boys trained as pages and squires before becoming knights.', 'Chivalry was the code of conduct for peasants.', 'Castles were centres of power and defence.'], lie: 1, explanation: 'Chivalry was the knights’ code of loyal, honourable conduct — peasants were not bound by it.' },
    { id: 'y8-tl-hum-6', subject: 'history', classId: 'y8-humanities', statements: ['The First Crusade (1096–1099) failed to take Jerusalem.', 'Pope Urban II called for the First Crusade.', 'The Crusades were fought over control of the Holy Land.'], lie: 0, explanation: 'The First Crusade succeeded — Christians took Jerusalem, making it the most successful Crusade.' },
    { id: 'y8-tl-hum-7', subject: 'history', classId: 'y8-humanities', statements: ['People from many social classes joined the Crusades.', 'The Crusades ran from 1096 to 1291.', 'The Crusades permanently ended trade between Europe and the East.'], lie: 2, explanation: 'The Crusades increased contact and trade between Europe and the East.' },
    { id: 'y8-tl-hum-8', subject: 'history', classId: 'y8-humanities', statements: ['The Black Death killed about one-third of Europe’s population.', 'The Black Death was confined to Europe alone.', 'The plague spread along trade routes.'], lie: 1, explanation: 'The pandemic moved through Asia, Europe and Africa.' },
    { id: 'y8-tl-hum-9', subject: 'history', classId: 'y8-humanities', statements: ['Buboes were the doctors who treated plague victims.', 'The Black Death reached Europe in 1347.', 'Flagellants whipped themselves seeking God’s forgiveness.'], lie: 0, explanation: 'Buboes were the swellings of bubonic plague — a symptom, not a person.' },
    { id: 'y8-tl-hum-10', subject: 'history', classId: 'y8-humanities', statements: ['The Black Death weakened the feudal system.', 'Yersinia pestis is the bacterium behind the plague.', 'The Black Death strengthened trust in the Catholic Church.'], lie: 2, explanation: 'The Church’s failure to stop the plague weakened its legitimacy.' },
    { id: 'y8-tl-hum-11', subject: 'history', classId: 'y8-humanities', statements: ['Feudalism developed after the Western Roman Empire fell.', 'Feudalism was invented by Pope Urban II.', 'A fief was usually a grant of land.'], lie: 1, explanation: 'Feudalism grew out of the collapse of Roman order in the 5th century; Urban II came centuries later and called the First Crusade.' },
    { id: 'y8-tl-hum-12', subject: 'history', classId: 'y8-humanities', statements: ['Medieval punishments were kept hidden from the public.', 'The stocks and pillory shamed offenders in public.', 'Banishment expelled criminals from their community.'], lie: 0, explanation: 'Punishment was often deliberately public, to shame offenders and warn onlookers.' },
    { id: 'y8-tl-hum-13', subject: 'history', classId: 'y8-humanities', statements: ['The Church collected one-tenth of earnings as the tithe.', 'Christianity was the dominant religion of medieval Europe.', 'The medieval Church owned no land of its own.'], lie: 2, explanation: 'The Church was one of medieval Europe’s greatest landholders — a source of its economic power.' },
    { id: 'y8-tl-hum-14', subject: 'history', classId: 'y8-humanities', statements: ['The plague took bubonic, pneumonic and septicemic forms.', 'Medieval doctors cured the plague with antibiotics.', 'People at the time blamed bad air for the plague.'], lie: 1, explanation: 'Antibiotics did not exist — people relied on religious rituals, folk remedies and quarantine.' },
    { id: 'y8-tl-hum-15', subject: 'history', classId: 'y8-humanities', statements: ['A vassal owed loyalty and service to his lord.', 'Serfs could leave the manor freely to find new work.', 'Manors included farmland worked by serfs.'], lie: 1, explanation: 'Serfs were bound to the manor and could not simply leave.' },
    { id: 'y8-tl-hum-16', subject: 'history', classId: 'y8-humanities', statements: ['Witchcraft accusations were treated as harmless fun.', 'Religion shaped medieval law and order.', 'Treason was a crime against the crown.'], lie: 0, explanation: 'Witchcraft was prosecuted as a serious religious crime.' },
    { id: 'y8-tl-hum-17', subject: 'history', classId: 'y8-humanities', statements: ['Castle sieges used weapons like trebuchets.', 'The code of chivalry guided knightly conduct.', 'Knights were forbidden from owning land.'], lie: 2, explanation: 'Knights typically received fiefs — land — in exchange for their service.' },
    { id: 'y8-tl-hum-18', subject: 'history', classId: 'y8-humanities', statements: ['Japan is an archipelago of over 3000 islands.', 'Most of Japan’s land is flat and easy to farm.', 'Japan sits on the earthquake-prone Ring of Fire.'], lie: 1, explanation: 'About 75% of Japan is mountainous; only around 15% can be farmed.' },
    { id: 'y8-tl-hum-19', subject: 'history', classId: 'y8-humanities', statements: ['The four main islands of Japan include Okinawa.', 'About 75% of Japan is covered by mountains.', 'Early communities settled in coastal plains and river valleys.'], lie: 0, explanation: 'The four main islands are Honshu, Shikoku, Kyushu and Hokkaido.' },
    { id: 'y8-tl-hum-20', subject: 'history', classId: 'y8-humanities', statements: ['Shinto kami are spirits linked to nature and ancestors.', 'The imperial family claimed descent from Amaterasu.', 'Amaterasu is the Shinto god of thunder.'], lie: 2, explanation: 'Amaterasu is the sun goddess — the claimed ancestor of the imperial line.' },
    { id: 'y8-tl-hum-21', subject: 'history', classId: 'y8-humanities', statements: ['Buddhism reached Japan from Korea and China around 552 CE.', 'Japan adopted Buddhism after conquering Korea.', 'Japan adapted Chinese characters into its writing.'], lie: 1, explanation: 'Buddhism arrived through peaceful contact and trade with Korea and China, not conquest.' },
    { id: 'y8-tl-hum-22', subject: 'history', classId: 'y8-humanities', statements: ['Nara became Japan’s first permanent capital in 1600.', 'Nara’s layout copied the Chinese capital Chang’an.', 'Todai-ji housed a massive bronze Buddha.'], lie: 0, explanation: 'Nara became the first permanent capital in 710 CE; 1600 is the Battle of Sekigahara.' },
    { id: 'y8-tl-hum-23', subject: 'history', classId: 'y8-humanities', statements: ['The Heian period began when the capital moved in 794.', 'Heian-kyo is modern Kyoto.', 'The capital moved to Heian-kyo to escape constant flooding.'], lie: 2, explanation: 'The move aimed to reduce the political influence of Nara’s Buddhist monasteries.' },
    { id: 'y8-tl-hum-24', subject: 'history', classId: 'y8-humanities', statements: ['Murasaki Shikibu wrote The Tale of Genji around 1008.', 'The Tale of Genji is a battle epic about the Genpei War.', 'The kana script helped Japanese literature flourish.'], lie: 1, explanation: 'Genji depicts Heian court life; the Genpei War epic is The Tale of the Heike.' },
    { id: 'y8-tl-hum-25', subject: 'history', classId: 'y8-humanities', statements: ['The Fujiwara clan ruled Japan by taking the throne as emperors.', 'Fujiwara no Yoshifusa became the first non-imperial regent in 858.', 'The Fujiwara used marriage politics to control the court.'], lie: 0, explanation: 'The Fujiwara never took the throne — they ruled as regents behind it.' },
    { id: 'y8-tl-hum-26', subject: 'history', classId: 'y8-humanities', statements: ['The Genpei War (1180–1185) was a civil war between the Taira and Minamoto.', 'The Battle of Dan-no-ura was fought at sea.', 'The Taira clan won the Genpei War.'], lie: 2, explanation: 'The Minamoto won — Dan-no-ura destroyed Taira power.' },
    { id: 'y8-tl-hum-27', subject: 'history', classId: 'y8-humanities', statements: ['Yoritomo received the title Sei-i Taishogun in 1192.', 'Yoritomo crowned himself Emperor of Japan.', 'The Kamakura Shogunate was Japan’s first military government.'], lie: 1, explanation: 'Yoritomo ruled on the emperor’s behalf as shogun — he never became emperor.' },
    { id: 'y8-tl-hum-28', subject: 'history', classId: 'y8-humanities', statements: ['Under the shoguns, the emperor commanded Japan’s armies.', 'The emperor remained a ceremonial and spiritual figurehead.', 'Shogun means a military commander ruling on the emperor’s behalf.'], lie: 0, explanation: 'Military power belonged to the shogun; the emperor’s role was symbolic.' },
    { id: 'y8-tl-hum-29', subject: 'history', classId: 'y8-humanities', statements: ['Daimyo were powerful lords who served the shogun.', 'Samurai served their daimyo under the code of bushido.', 'Merchants held the highest official rank in Tokugawa society.'], lie: 2, explanation: 'Merchants officially ranked lowest of the four classes, however rich they became.' },
    { id: 'y8-tl-hum-30', subject: 'history', classId: 'y8-humanities', statements: ['Bushido demanded loyalty even to the point of death.', 'Bushido banned samurai from reading and writing poetry.', 'A dishonoured samurai might perform seppuku.'], lie: 1, explanation: 'Samurai were expected to be educated — in writing, poetry and philosophy as well as war.' },
    { id: 'y8-tl-hum-31', subject: 'history', classId: 'y8-humanities', statements: ['A ronin was a samurai promoted to daimyo.', 'The Tale of the Heike was passed down orally by Buddhist monks.', 'Samurai are often compared with European knights.'], lie: 0, explanation: 'A ronin was a masterless samurai — no promotion involved.' },
    { id: 'y8-tl-hum-32', subject: 'history', classId: 'y8-humanities', statements: ['Tokugawa Ieyasu won the Battle of Sekigahara in 1600.', 'Ieyasu became shogun in 1603.', 'Ieyasu abolished the samurai class.'], lie: 2, explanation: 'The samurai class continued right through the Tokugawa era; its decline came much later.' },
    { id: 'y8-tl-hum-33', subject: 'history', classId: 'y8-humanities', statements: ['Sakoku isolated Japan from most of the world (1633–1853).', 'Under sakoku, any foreigner could settle freely in Japan.', 'Sankin-kotai made daimyo attend the shogun in alternate periods.'], lie: 1, explanation: 'Sakoku forbade foreigners entering Japan — on penalty of death.' },
    { id: 'y8-tl-hum-34', subject: 'history', classId: 'y8-humanities', statements: ['Edo is the old name for Kyoto.', 'Kabuki theatre and ukiyo-e prints flourished in the Edo period.', 'The Tokugawa era brought over 250 years of stability.'], lie: 0, explanation: 'Edo is the old name for Tokyo; Kyoto was Heian-kyo.' },
    { id: 'y8-tl-hum-35', subject: 'history', classId: 'y8-humanities', statements: ['An American fleet’s arrival helped end Japan’s isolation.', 'The Meiji Restoration returned power to the emperor in 1868.', 'The Meiji era deepened Japan’s isolation from the West.'], lie: 2, explanation: 'Meiji Japan did the opposite — it pursued westernisation and modernisation.' },
    { id: 'y8-tl-hum-36', subject: 'history', classId: 'y8-humanities', statements: ['The rigid Tokugawa class system blocked social mobility.', 'The shogunate collapsed because of a failed rice harvest.', 'After 1868 Japan modernised rapidly.'], lie: 1, explanation: 'The fall combined long-term internal pressures with the external shock of the American fleet — not a harvest.' },
    { id: 'y8-tl-hum-37', subject: 'history', classId: 'y8-humanities', statements: ['A primary source comes from the time being studied.', 'A modern documentary about the Black Death is a primary source.', 'Historians question sources to gather evidence.'], lie: 1, explanation: 'A modern documentary is a secondary source — made long after the events.' },
    { id: 'y8-tl-hum-38', subject: 'history', classId: 'y8-humanities', statements: ['Continuity and change looks at what persists as well as what changes.', 'Empathy means understanding the past from the perspective of the time.', 'An event is historically significant simply because it is famous.'], lie: 2, explanation: 'Significance requires deep, lasting consequences or revealing insight — not just fame.' },
    { id: 'y8-tl-hum-39', subject: 'geography', classId: 'y8-humanities', statements: ['Weathering breaks rocks down in place.', 'Erosion moves weathered material to new places.', 'Deposition is the process of rock breaking apart.'], lie: 2, explanation: 'Deposition is sediment settling when wind or water loses energy — weathering is the breaking apart.' },
    { id: 'y8-tl-hum-40', subject: 'geography', classId: 'y8-humanities', statements: ['Deserts are defined by their high temperatures.', 'Cold deserts occur near the polar circles.', 'Deserts cover about a third of Earth’s land.'], lie: 0, explanation: 'Deserts are defined by very low rainfall, not heat — which is why cold deserts exist.' },
    { id: 'y8-tl-hum-41', subject: 'geography', classId: 'y8-humanities', statements: ['Karst landscapes form as acidic water dissolves limestone.', 'Sinkholes are formed by ocean waves.', 'Stalactites are found in karst caves.'], lie: 1, explanation: 'Sinkholes form when rock below the surface erodes away and the land above collapses.' },
    { id: 'y8-tl-hum-42', subject: 'geography', classId: 'y8-humanities', statements: ['Tropical rainforests get at least 1500 mm of rain a year.', 'Rainforests hold 50–70% of Earth’s species.', 'Rainforests cover about half of Earth’s surface.'], lie: 2, explanation: 'Rainforests cover only about 6% of the surface — yet hold most of its species.' },
    { id: 'y8-tl-hum-43', subject: 'geography', classId: 'y8-humanities', statements: ['Physical weathering changes a rock’s chemical makeup.', 'Freezing water in cracks can split rocks.', 'Tree roots cause biological weathering.'], lie: 0, explanation: 'Physical weathering breaks rock without changing its chemistry — chemical weathering does that.' },
    { id: 'y8-tl-hum-44', subject: 'geography', classId: 'y8-humanities', statements: ['Mountains form where tectonic plates push against each other.', 'Riverine land is too infertile for farming.', 'Human landscapes are also called cultural landscapes.'], lie: 1, explanation: 'Riverine land is rich and fertile — excellent for agriculture.' },
    { id: 'y8-tl-hum-45', subject: 'geography', classId: 'y8-humanities', statements: ['A landform is an individual surface feature.', 'Landscapes combine natural and cultural layers over time.', 'Landscape and landform are two words for one idea.'], lie: 2, explanation: 'A landform is one feature; a landscape is the wider area those features build.' },
    { id: 'y8-tl-hum-46', subject: 'geography', classId: 'y8-humanities', statements: ['Swash and backwash are types of tides.', 'Swash runs up the beach after a wave breaks.', 'Backwash returns water to the sea.'], lie: 0, explanation: 'Swash and backwash are wave movements on the beach face, not tides.' },
    { id: 'y8-tl-hum-47', subject: 'geography', classId: 'y8-humanities', statements: ['Constructive waves occur mainly in violent storms.', 'Constructive waves build up beaches.', 'Destructive waves have backwash stronger than swash.'], lie: 0, explanation: 'Constructive waves operate in calm weather; storms bring destructive waves.' },
    { id: 'y8-tl-hum-48', subject: 'geography', classId: 'y8-humanities', statements: ['Longshore drift carries sand straight out to deep water.', 'Longshore drift moves sediment in a zigzag along the beach.', 'Prevailing winds set the angle waves approach the shore.'], lie: 0, explanation: 'Drift shifts material along the coast, not out to sea.' },
    { id: 'y8-tl-hum-49', subject: 'geography', classId: 'y8-humanities', statements: ['A cave can erode through a headland to form an arch.', 'A collapsed arch leaves a stack.', 'A stump eventually grows back into a stack.'], lie: 2, explanation: 'Erosion only wears landforms down — the sequence runs cave, arch, stack, stump.' },
    { id: 'y8-tl-hum-50', subject: 'geography', classId: 'y8-humanities', statements: ['Bays form where softer rock erodes faster.', 'Headlands are made of the softest rock on the coast.', 'Wave-cut platforms are visible at low tide.'], lie: 1, explanation: 'Headlands are the harder rock left behind as soft rock wears into bays.' },
    { id: 'y8-tl-hum-51', subject: 'geography', classId: 'y8-humanities', statements: ['Spits are ridges of solid rock joined to the coast.', 'A tombolo connects an island to the mainland.', 'Lagoons can form behind bars and spits.'], lie: 0, explanation: 'Spits are sand ridges built by longshore drift, not solid rock.' },
    { id: 'y8-tl-hum-52', subject: 'geography', classId: 'y8-humanities', statements: ['Sand dunes are built by wind-blown sand.', 'Plants like Spinifex hold dunes in place.', 'Removing dune plants makes dunes more stable.'], lie: 2, explanation: 'Without vegetation, dunes become blowout dunes and migrate inland.' },
    { id: 'y8-tl-hum-53', subject: 'geography', classId: 'y8-humanities', statements: ['Groynes are built at right angles to the beach.', 'Groynes speed up longshore drift along the coast.', 'Groynes can starve down-drift beaches of sand.'], lie: 1, explanation: 'Groynes interrupt longshore drift, trapping sand on the up-drift side.' },
    { id: 'y8-tl-hum-54', subject: 'geography', classId: 'y8-humanities', statements: ['Sea walls absorb wave energy better than beaches.', 'Wave scouring can undermine a sea wall’s base.', 'Rip rap uses boulders to absorb wave energy.'], lie: 0, explanation: 'Beaches absorb energy; sea walls reflect and concentrate it — a key weakness.' },
    { id: 'y8-tl-hum-55', subject: 'geography', classId: 'y8-humanities', statements: ['Beach nourishment adds dredged sand to eroding beaches.', 'One severe storm can strip a nourished beach.', 'Beach nourishment is a permanent one-off fix.'], lie: 2, explanation: 'Nourishment must be repeated — storms can remove the expensive sand.' },
    { id: 'y8-tl-hum-56', subject: 'geography', classId: 'y8-humanities', statements: ['Hard engineering uses heavy human-made structures.', 'Soft engineering is usually more expensive than hard.', 'Managed retreat moves development back from the coast.'], lie: 1, explanation: 'Soft engineering is usually cheaper and more sustainable than hard structures.' },
    { id: 'y8-tl-hum-57', subject: 'geography', classId: 'y8-humanities', statements: ['Training walls are built to trap sand on beaches.', 'Training walls direct river flow at river mouths.', 'The Tweed River walls blocked sand flowing to the Gold Coast.'], lie: 0, explanation: 'Training walls manage river flow for navigation; groynes are the sand-trapping structures.' },
    { id: 'y8-tl-hum-58', subject: 'geography', classId: 'y8-humanities', statements: ['Darwin Harbour has mangroves, mudflats and seagrass meadows.', 'The Larrakia people are Darwin’s Traditional Owners.', 'Darwin Harbour is closed to shipping and industry.'], lie: 2, explanation: 'Shipping, defence, tourism and fishing all depend on the harbour — that is why values compete there.' },
    { id: 'y8-tl-hum-59', subject: 'geography', classId: 'y8-humanities', statements: ['A landscape can hold spiritual and economic value at once.', 'Aesthetic value refers to income from tourism.', 'Environmental value covers ecosystems and habitats.'], lie: 1, explanation: 'Aesthetic value is about beauty and feeling; income is economic value.' },
    { id: 'y8-tl-hum-60', subject: 'geography', classId: 'y8-humanities', statements: ['The coast is where two rivers meet.', 'Wind and waves are the main forces shaping coasts.', 'Coastal landforms are either erosional or depositional.'], lie: 0, explanation: 'The coast is where a land mass meets the sea.' },
    { id: 'y8-tl-hum-61', subject: 'geography', classId: 'y8-humanities', statements: ['Urbanisation is a rising share of people living in cities.', 'A megacity has over ten million people.', 'Most future urban growth is expected in Europe.'], lie: 2, explanation: 'The fastest urban growth to 2050 is expected in Africa and Asia.' },
    { id: 'y8-tl-hum-62', subject: 'geography', classId: 'y8-humanities', statements: ['New York was the world’s largest city in 2021.', 'Tokyo topped 37 million people by 2021.', 'There were 34 megacities by 2021.'], lie: 0, explanation: 'New York led in 1950; by 2021 Tokyo was the largest city on Earth.' },
    { id: 'y8-tl-hum-63', subject: 'geography', classId: 'y8-humanities', statements: ['The CBD is a city’s commercial core.', 'Residential zones are the smallest part of a city.', 'Industrial zones sit near transport links.'], lie: 1, explanation: 'Residential zones are typically the largest area of any city.' },
    { id: 'y8-tl-hum-64', subject: 'geography', classId: 'y8-humanities', statements: ['High land prices push CBD buildings upward.', 'Green zones support native plants and animals.', 'Industrial zones are usually placed beside schools.'], lie: 2, explanation: 'Industry is kept near transport links and away from residential areas.' },
    { id: 'y8-tl-hum-65', subject: 'geography', classId: 'y8-humanities', statements: ['The Multiple Nuclei Model says cities keep a single centre.', 'Harris and Ullman proposed the Multiple Nuclei Model in 1945.', 'Melbourne’s CBD has the postcode 3000.'], lie: 0, explanation: 'The model argues key activities scatter into several smaller centres over time.' },
    { id: 'y8-tl-hum-66', subject: 'geography', classId: 'y8-humanities', statements: ['Push factors drive people away from home regions.', 'Better jobs in cities are a push factor.', 'Drought is an environmental migration factor.'], lie: 1, explanation: 'Better jobs pull people toward a destination — a pull factor.' },
    { id: 'y8-tl-hum-67', subject: 'geography', classId: 'y8-humanities', statements: ['To emigrate is to leave your country to live elsewhere.', 'Internal migration happens within one country.', 'Immigrate and emigrate are interchangeable terms.'], lie: 2, explanation: 'Emigrate is to leave a country; immigrate is to arrive in one.' },
    { id: 'y8-tl-hum-68', subject: 'geography', classId: 'y8-humanities', statements: ['Gentrification means buildings falling into disrepair.', 'Detroit’s decay followed manufacturing decline.', 'Urban sprawl spreads cities outward at low density.'], lie: 0, explanation: 'Gentrification is wealthier arrivals improving a poorer area — decay is the disrepair.' },
    { id: 'y8-tl-hum-69', subject: 'geography', classId: 'y8-humanities', statements: ['Gentrification can displace existing residents.', 'Urban renewal means abandoning unused land forever.', 'Melbourne is the unit’s example of urban sprawl.'], lie: 1, explanation: 'Urban renewal redevelops unused city land — the opposite of abandoning it.' },
    { id: 'y8-tl-hum-70', subject: 'geography', classId: 'y8-humanities', statements: ['PQE stands for Pattern, Quantification, Exception.', 'Quantifying means backing a pattern with numbers.', 'An exception is a mistake made by the mapmaker.'], lie: 2, explanation: 'An exception is a real trend that sits outside the main pattern.' },
    { id: 'y8-tl-hum-71', subject: 'geography', classId: 'y8-humanities', statements: ['SALTS is the checklist for drawing field sketches.', 'SALTS covers Scale, Axis, Legend, Title and Source.', 'BOLTSS is the map checklist.'], lie: 0, explanation: 'SALTS is for constructing graphs; sketches follow their own six steps.' },
    { id: 'y8-tl-hum-72', subject: 'geography', classId: 'y8-humanities', statements: ['Oblique aerial photos are taken at an angle.', 'Vertical aerial photos make distance measurement unreliable.', 'Satellite images track change in land cover over time.'], lie: 1, explanation: 'Vertical photos have near-uniform scale, making distance measurement accurate.' },
    { id: 'y8-tl-hum-73', subject: 'geography', classId: 'y8-humanities', statements: ['Quantitative data is recorded as numbers.', 'Qualitative data is recorded in words.', 'The statement "Uluru is 3.6 km long" is qualitative data.'], lie: 2, explanation: 'A measured length is quantitative — numbers, not description.' },
    { id: 'y8-tl-hum-74', subject: 'geography', classId: 'y8-humanities', statements: ['The Equator is a line of longitude.', 'The Prime Meridian sits at 0 degrees longitude.', 'The Tropics of Cancer and Capricorn are latitude lines.'], lie: 0, explanation: 'The Equator is 0 degrees latitude — it circles Earth’s middle.' },
    { id: 'y8-tl-hum-75', subject: 'geography', classId: 'y8-humanities', statements: ['In a field sketch the horizon sits about one-third from the top.', 'Field sketches are complete without labels or a date.', 'Earth has five oceans, including the Southern Ocean.'], lie: 1, explanation: 'Sketches finish with labels for key features plus the location and date.' },
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
    // ====== VCE Sociology Units 3-4 (75 items, anchored to study design + 2025 exam) ======




    // ====== Year 10 Mathematics (HRS, y10-maths) ======
    // 75 Two-Truths items distributed across the 9 topics (Surds,
    // Algebra/Linear, Quadratics, Probability, Parabolas, Statistics,
    // Indices/Exp/Log, Polynomials, Trig). Each tagged classId =
    // 'y10-maths' so the TwoTruthsLie game filters to this class.
    { id: 'y10-tl-math-1', subject: 'maths', classId: 'y10-maths', statements: ['Every rational number can be written as a fraction of integers.', 'The set of irrational numbers includes π and √2.', 'Every decimal number is rational.'], lie: 2, explanation: 'Non-terminating, non-repeating decimals (like π) are irrational.' },
    { id: 'y10-tl-math-2', subject: 'maths', classId: 'y10-maths', statements: ['√50 simplifies to 5√2.', '√72 simplifies to 6√2.', '√24 simplifies to 4√6.'], lie: 2, explanation: '√24 = √(4 × 6) = 2√6, not 4√6.' },
    { id: 'y10-tl-math-3', subject: 'maths', classId: 'y10-maths', statements: ['2√3 + 5√3 = 7√3.', '√8 + √2 = √10.', '√50 − √18 = 2√2.'], lie: 1, explanation: 'Unlike surds cannot be combined under one radical. √8 = 2√2 and √2 = √2, so √8 + √2 = 3√2, not √10.' },
    { id: 'y10-tl-math-4', subject: 'maths', classId: 'y10-maths', statements: ['Multiplying √a by √b gives √(ab).', '√7 × √7 equals 7.', '√2 × √8 is irrational.'], lie: 2, explanation: '√2 × √8 = √16 = 4, which is rational — a product of surds can be rational.' },
    { id: 'y10-tl-math-5', subject: 'maths', classId: 'y10-maths', statements: ['To rationalise 1/√5, multiply top and bottom by √5.', 'The denominator after rationalising 1/√5 is 5.', 'Rationalising the denominator changes the value of the expression.'], lie: 2, explanation: 'Multiplying by √5/√5 is multiplying by 1, so the value is unchanged.' },
    { id: 'y10-tl-math-6', subject: 'maths', classId: 'y10-maths', statements: ['Pythagoras\' theorem applies to ANY triangle as long as two sides are known.', 'The hypotenuse is the longest side of a right triangle.', 'In a 3-4-5 triangle, the side of length 5 is the hypotenuse.'], lie: 0, explanation: 'Pythagoras\' theorem applies ONLY to right-angled triangles. For other triangles, the cosine rule is needed.' },
    { id: 'y10-tl-math-7', subject: 'maths', classId: 'y10-maths', statements: ['Perimeter is measured in linear units like cm.', 'Area is measured in square units like cm².', 'Volume is measured in square units like cm².'], lie: 2, explanation: 'Volume is measured in CUBIC units (cm³), not square units.' },
    { id: 'y10-tl-math-8', subject: 'maths', classId: 'y10-maths', statements: ['A cube has 6 identical square faces.', 'The surface area of a sphere is 4πr².', 'The volume of a sphere is πr³.'], lie: 2, explanation: 'Sphere volume is (4/3)πr³, not πr³.' },
    { id: 'y10-tl-math-9', subject: 'maths', classId: 'y10-maths', statements: ['A cone\'s lateral surface area is πrℓ, where ℓ is the slant height.', 'A cone\'s volume is ⅓πr²h, where h is the vertical height.', 'A cone with radius 3 cm and vertical height 4 cm has slant height 4 cm.'], lie: 2, explanation: 'Slant height comes from Pythagoras: ℓ² = h² + r² = 16 + 9, so ℓ = 5 cm.' },
    { id: 'y10-tl-math-10', subject: 'maths', classId: 'y10-maths', statements: ['1 m² equals 10 000 cm².', '1 m³ equals 1 000 cm³.', '1 km equals 1 000 m.'], lie: 1, explanation: '1 m³ = (100 cm)³ = 1 000 000 cm³ — one million, not one thousand.' },
    { id: 'y10-tl-math-11', subject: 'maths', classId: 'y10-maths', statements: ['Combining like terms 3a + 5b − a + 2b gives 2a + 7b.', 'Expanding −3(2x − 5) gives −6x + 15.', 'Expanding (x − 4)² gives x² − 16.'], lie: 2, explanation: '(x − 4)² = x² − 8x + 16. Forgetting the middle term is a classic error.' },
    { id: 'y10-tl-math-12', subject: 'maths', classId: 'y10-maths', statements: ['The HCF of 6x + 9 is 3, giving 3(2x + 3).', 'The HCF of 12y² − 8y is 4y, giving 4y(3y − 2).', '10x² + 15x fully factorises to 5(2x² + 3x).'], lie: 2, explanation: 'The HCF is 5x, so the full factorisation is 5x(2x + 3); 5(2x² + 3x) still has a common x inside the bracket.' },
    { id: 'y10-tl-math-13', subject: 'maths', classId: 'y10-maths', statements: ['Dividing both sides of an inequality by a positive number keeps the direction.', 'Multiplying both sides by a negative number reverses the inequality direction.', 'Adding the same number to both sides reverses the direction.'], lie: 2, explanation: 'Addition or subtraction never changes inequality direction; only multiply/divide by NEGATIVE does.' },
    { id: 'y10-tl-math-14', subject: 'maths', classId: 'y10-maths', statements: ['Gradient = rise / run.', 'In y = mx + c, m is the gradient and c is the y-intercept.', 'Gradient is calculated as run / rise.'], lie: 2, explanation: 'Gradient is rise / run; inverting is a classic error.' },
    { id: 'y10-tl-math-15', subject: 'maths', classId: 'y10-maths', statements: ['Parallel lines have EQUAL gradients.', 'Perpendicular gradients multiply to give −1.', 'The line x = 2 has a gradient of zero.'], lie: 2, explanation: 'x = 2 is vertical: run = 0, so its gradient is UNDEFINED. Horizontal lines such as y = 2 have gradient zero.' },
    { id: 'y10-tl-math-16', subject: 'maths', classId: 'y10-maths', statements: ['A horizontal line through (4, 5) has equation y = 5.', 'A vertical line through (3, 7) has equation x = 3.', 'A horizontal line through (2, −6) has equation x = 2.'], lie: 2, explanation: 'A horizontal line has equation y = constant; a vertical line has equation x = constant.' },
    { id: 'y10-tl-math-17', subject: 'maths', classId: 'y10-maths', statements: ['The midpoint of (2, 4) and (8, 10) is (5, 7).', 'The distance from (1, 2) to (4, 6) is 5.', 'The distance between two points is computed by adding the differences in x and y.'], lie: 2, explanation: 'Distance uses √((Δx)² + (Δy)²) — the Pythagorean form, not sum.' },
    { id: 'y10-tl-math-18', subject: 'maths', classId: 'y10-maths', statements: ['Simultaneous equations can be solved by substitution.', 'Simultaneous equations can be solved by elimination.', 'Two parallel lines with different y-intercepts give exactly one solution.'], lie: 2, explanation: 'Parallel lines with different intercepts never meet, so there is no solution. Two linear equations have one solution, none, or infinitely many.' },
    { id: 'y10-tl-math-19', subject: 'maths', classId: 'y10-maths', statements: ['x = 5 satisfies 3x + 7 = 22.', 'x = 5 satisfies 5x − 8 = 2x + 7.', 'x = 5 satisfies x² − 25 = 1.'], lie: 2, explanation: 'x² − 25 at x = 5 gives 0, not 1.' },
    { id: 'y10-tl-math-20', subject: 'maths', classId: 'y10-maths', statements: ['Cancelling factors in algebraic fractions requires identifying common FACTORS, not common TERMS.', '(x + 3)/(x² + 3x) simplifies to 1/x by cancelling (x + 3).', '(x + 3)/(x + 6) simplifies to 1/2 by cancelling the 3 and 6.'], lie: 2, explanation: 'Terms cannot be cancelled — only factors of the entire numerator and denominator.' },
    { id: 'y10-tl-math-21', subject: 'maths', classId: 'y10-maths', statements: ['(x + 3)(x + 5) expands to x² + 8x + 15.', '(2x + 3)(2x − 3) equals 4x² − 9.', '(a + b)² equals a² + b².'], lie: 2, explanation: '(a + b)² = a² + 2ab + b². Forgetting the middle term is a common error.' },
    { id: 'y10-tl-math-22', subject: 'maths', classId: 'y10-maths', statements: ['x² − 9 factorises to (x − 3)(x + 3).', 'x² + 9 cannot be factorised over the real integers.', 'x² + 4 factorises to (x − 2)(x + 2).'], lie: 2, explanation: 'x² + 4 is a SUM of squares; it cannot be factorised over the integers/reals.' },
    { id: 'y10-tl-math-23', subject: 'maths', classId: 'y10-maths', statements: ['The Null Factor Law: if ab = 0, then a = 0 or b = 0.', 'NFL applies after setting the equation equal to zero.', 'NFL can be applied directly to ab = 12.'], lie: 2, explanation: 'NFL requires one side to be ZERO. For ab = 12 you must rearrange first or use other methods.' },
    { id: 'y10-tl-math-24', subject: 'maths', classId: 'y10-maths', statements: ['The discriminant is Δ = b² − 4ac.', 'If Δ > 0, the quadratic has two distinct real roots.', 'If Δ = 0, the quadratic has no real roots.'], lie: 2, explanation: 'Δ = 0 gives ONE repeated real root; Δ < 0 gives no real roots.' },
    { id: 'y10-tl-math-25', subject: 'maths', classId: 'y10-maths', statements: ['Solving x² = 16 gives x = ±4.', 'Solving (x − 1)² = 9 gives x = 4 or x = −2.', 'Solving x² − 9 = 0 gives x = 9 or x = −9.'], lie: 2, explanation: 'x² = 9, so x = ±√9 = ±3, not ±9.' },
    { id: 'y10-tl-math-26', subject: 'maths', classId: 'y10-maths', statements: ['The quadratic formula gives x = (−b ± √(b² − 4ac))/(2a).', 'For x² + 2x + 5 = 0, the quadratic formula gives two real solutions.', 'The quadratic formula can be used on any quadratic in standard form.'], lie: 1, explanation: 'Here Δ = b² − 4ac = 4 − 20 = −16 < 0, so the formula gives no real solutions.' },
    { id: 'y10-tl-math-27', subject: 'maths', classId: 'y10-maths', statements: ['Negative roots are rejected in contextual length problems.', 'A quadratic modelling projectile height can have two valid t-values.', 'If a rectangle\'s width w satisfies w² + 2w − 15 = 0, the width could be −5 cm.'], lie: 2, explanation: '(w + 5)(w − 3) = 0 gives w = 3 or w = −5, but a length cannot be negative, so the width is 3 cm.' },
    { id: 'y10-tl-math-28', subject: 'maths', classId: 'y10-maths', statements: ['(2x − 1)(x + 3) factors a non-monic quadratic.', 'Completing the square turns x² + bx into (x + b/2)² − (b/2)².', 'x² + 4 factorises as (x + 2)(x − 2).'], lie: 2, explanation: '(x + 2)(x − 2) = x² − 4. A sum of squares such as x² + 4 cannot be factorised over the integers.' },
    { id: 'y10-tl-math-29', subject: 'maths', classId: 'y10-maths', statements: ['Common factoring is always the first step before other factorisation methods.', 'Difference of two squares: a² − b² = (a − b)(a + b).', 'Sum of two squares (a² + b²) always factorises over the integers.'], lie: 2, explanation: 'Sum of squares does NOT factor over the integers (or even the reals).' },
    { id: 'y10-tl-math-30', subject: 'maths', classId: 'y10-maths', statements: ['Roots, zeroes and x-intercepts of a polynomial all refer to the same thing.', 'A quadratic with a positive discriminant has two real roots.', 'Setting up a quadratic equation from a word problem is always optional.'], lie: 2, explanation: 'Setting up the equation is required — without it the problem cannot be solved.' },
    { id: 'y10-tl-math-31', subject: 'maths', classId: 'y10-maths', statements: ['Probabilities lie between 0 and 1 inclusive.', 'A probability of 1 means the event is certain.', 'A probability of −0.2 indicates a "negative likelihood".'], lie: 2, explanation: 'Probabilities can never be negative. A value below 0 indicates an error in calculation.' },
    { id: 'y10-tl-math-32', subject: 'maths', classId: 'y10-maths', statements: ['Mutually exclusive events have no overlap.', 'For mutually exclusive events, P(A or B) = P(A) + P(B).', 'On one roll of a die, rolling a 1 and rolling a 6 are independent events.'], lie: 2, explanation: 'They are mutually exclusive: P(1 and 6) = 0, but P(1) × P(6) = 1/36, so they are not independent — one happening rules the other out.' },
    { id: 'y10-tl-math-33', subject: 'maths', classId: 'y10-maths', statements: ['The addition rule subtracts the overlap: P(A ∪ B) = P(A) + P(B) − P(A ∩ B).', 'Independent events satisfy P(A ∩ B) = P(A) × P(B).', 'Conditional probability P(A | B) uses the original sample space.'], lie: 2, explanation: 'P(A | B) restricts the sample space to B; that changes the denominator.' },
    { id: 'y10-tl-math-34', subject: 'maths', classId: 'y10-maths', statements: ['Drawing two cards WITHOUT replacement creates dependent events.', 'Drawing two cards WITH replacement creates independent events.', 'A tree diagram is best for displaying single-event probabilities.'], lie: 2, explanation: 'Tree diagrams are best for sequential / multi-step experiments, not single events.' },
    { id: 'y10-tl-math-35', subject: 'maths', classId: 'y10-maths', statements: ['Two-step experiments can be displayed using a tree diagram or an array.', 'The complement of A has P(A′) = 1 − P(A).', 'In probability, AND and OR mean exactly the same thing.'], lie: 2, explanation: 'AND = intersection (multiply for independent); OR = union (add with overlap correction).' },
    { id: 'y10-tl-math-36', subject: 'maths', classId: 'y10-maths', statements: ['A Venn diagram shows intersection and union of sets.', 'When finding P(A ∪ B) from a Venn diagram, the overlap is counted twice.', 'P(at least one) = 1 − P(none).'], lie: 1, explanation: 'The overlap is counted ONCE — that is why the addition rule subtracts P(A ∩ B).' },
    { id: 'y10-tl-math-37', subject: 'maths', classId: 'y10-maths', statements: ['The multiplication principle: m × n outcomes for two independent choices.', '5! equals 120.', 'In a normal probability calculation, double-counting overlaps gives a total below zero.'], lie: 2, explanation: 'Double-counting overlaps inflates the total ABOVE 1, not below zero.' },
    { id: 'y10-tl-math-38', subject: 'maths', classId: 'y10-maths', statements: ['A parabola in turning-point form y = a(x − h)² + k has vertex (h, k).', 'A negative a opens the parabola downward.', 'Increasing |a| makes the parabola wider.'], lie: 2, explanation: 'Increasing |a| makes the parabola NARROWER (steeper); 0 < |a| < 1 makes it wider.' },
    { id: 'y10-tl-math-39', subject: 'maths', classId: 'y10-maths', statements: ['The axis of symmetry of y = (x + 4)² − 1 is x = −4.', 'A parabola has at most two x-intercepts.', 'The parabola y = x² + 3 crosses the x-axis twice.'], lie: 2, explanation: 'x² + 3 is at least 3 for every x, so the graph stays above the x-axis and has no x-intercepts (Δ = −12 < 0).' },
    { id: 'y10-tl-math-40', subject: 'maths', classId: 'y10-maths', statements: ['Completing the square converts y = x² + bx + c to vertex form.', 'The number of x-intercepts is determined by the discriminant.', 'The graph of y = x² − 6x + 9 has two x-intercepts.'], lie: 2, explanation: 'y = (x − 3)², so Δ = 36 − 36 = 0 and the graph touches the x-axis once, at x = 3.' },
    { id: 'y10-tl-math-41', subject: 'maths', classId: 'y10-maths', statements: ['A line can intersect a parabola in 0, 1 or 2 points.', 'A horizontal line intersecting a parabola at the vertex touches only once.', 'A line can intersect a parabola at 3 distinct points.'], lie: 2, explanation: 'Substituting line and parabola gives a quadratic, which has at most 2 solutions.' },
    { id: 'y10-tl-math-42', subject: 'maths', classId: 'y10-maths', statements: ['Gradient of a graph is its rate of change.', 'On a distance-time graph, a steeper slope means greater speed.', 'A horizontal segment on a distance-time graph means the object is accelerating.'], lie: 2, explanation: 'Horizontal segment = zero rate of change = stopped, not accelerating.' },
    { id: 'y10-tl-math-43', subject: 'maths', classId: 'y10-maths', statements: ['Average rate of change between two points is the slope of the secant line.', 'Instantaneous rate of change at a point is the slope of the tangent.', 'For y = x², the average rate of change from x = 0 to x = 2 is 4.'], lie: 2, explanation: 'Average rate of change = (4 − 0)/(2 − 0) = 2. The 4 is the change in y, not the rate.' },
    { id: 'y10-tl-math-44', subject: 'maths', classId: 'y10-maths', statements: ['A distance-time graph plots distance against time.', 'A distance-time graph IS a picture of the physical path travelled.', 'A horizontal segment on a distance-time graph means the object is stationary.'], lie: 1, explanation: 'A distance-time graph plots distance vs time — it is NOT a literal map of the path.' },
    { id: 'y10-tl-math-45', subject: 'maths', classId: 'y10-maths', statements: ['Translation, reflection and dilation are graph transformations.', 'The turning point of y = (x − 1)² + 4 is (1, 4).', 'y = (2x)² is y = x² dilated vertically by a factor of 2.'], lie: 2, explanation: '(2x)² = 4x², so it is a vertical dilation by factor 4 — or, equivalently, a horizontal dilation by factor ½.' },
    { id: 'y10-tl-math-46', subject: 'maths', classId: 'y10-maths', statements: ['Mean, median and mode are measures of central tendency.', 'Range and IQR measure spread.', 'The line inside the box of a box plot marks the mean.'], lie: 2, explanation: 'That line is the median. A box plot shows the five-number summary (min, Q1, median, Q3, max); the mean is not shown.' },
    { id: 'y10-tl-math-47', subject: 'maths', classId: 'y10-maths', statements: ['The five-number summary contains min, Q1, median, Q3, max.', 'IQR = Q3 − Q1.', 'IQR is sensitive to outliers.'], lie: 2, explanation: 'IQR uses only the middle 50% of data, so it is RESISTANT to outliers.' },
    { id: 'y10-tl-math-48', subject: 'maths', classId: 'y10-maths', statements: ['The standard outlier rule flags values beyond Q1 − 1.5×IQR or Q3 + 1.5×IQR.', 'Standard deviation measures spread about the mean.', 'A small standard deviation means the mean is small.'], lie: 2, explanation: 'SD describes spread, not magnitude. Data can cluster tightly around any mean.' },
    { id: 'y10-tl-math-49', subject: 'maths', classId: 'y10-maths', statements: ['Bivariate data has two variables per observation.', 'Scatter plots display bivariate data.', 'Correlation between X and Y proves X causes Y.'], lie: 2, explanation: 'Correlation does NOT prove causation. Confounders may explain the link.' },
    { id: 'y10-tl-math-50', subject: 'maths', classId: 'y10-maths', statements: ['Interpolation is predicting WITHIN the data range.', 'Extrapolation is predicting OUTSIDE the data range.', 'Extrapolation is generally more reliable than interpolation.'], lie: 2, explanation: 'Extrapolation is LESS reliable; the linear model may not hold outside the data.' },
    { id: 'y10-tl-math-51', subject: 'maths', classId: 'y10-maths', statements: ['A line of best fit models the trend of bivariate data.', 'Strength, direction and linearity describe a correlation.', 'A correlation coefficient near 0 indicates a strong linear relationship.'], lie: 2, explanation: 'A coefficient near 0 indicates WEAK or no linear relationship.' },
    { id: 'y10-tl-math-52', subject: 'maths', classId: 'y10-maths', statements: ['Mean uses all data values; median uses the middle.', 'The mean is more sensitive to outliers than the median.', 'The mean and median always give exactly the same value.'], lie: 2, explanation: 'They coincide for symmetric distributions but differ otherwise — especially with outliers.' },
    { id: 'y10-tl-math-53', subject: 'maths', classId: 'y10-maths', statements: ['Categorical data can be displayed in a two-way table.', 'A taller box on a box plot means greater spread in the middle 50%.', 'Quartiles can be calculated from unsorted data.'], lie: 2, explanation: 'Data MUST be sorted before quartiles are computed.' },
    { id: 'y10-tl-math-54', subject: 'maths', classId: 'y10-maths', statements: ['Index law: aᵐ × aⁿ = aᵐ⁺ⁿ.', 'Index law: (aᵐ)ⁿ = aᵐⁿ.', 'Index law: aᵐ + aⁿ = aᵐ⁺ⁿ.'], lie: 2, explanation: 'Addition is NOT an index law; you cannot combine aᵐ + aⁿ into a single power.' },
    { id: 'y10-tl-math-55', subject: 'maths', classId: 'y10-maths', statements: ['a⁰ = 1 for any non-zero base.', '2⁻³ = 1/8.', 'A negative index makes the number negative.'], lie: 2, explanation: 'A negative index gives the RECIPROCAL, not a negative number.' },
    { id: 'y10-tl-math-56', subject: 'maths', classId: 'y10-maths', statements: ['8^(1/3) = 2.', '4^(3/2) = 8.', 'x^(1/2) equals x divided by 2.'], lie: 2, explanation: 'x^(1/2) equals √x (square root), not x/2.' },
    { id: 'y10-tl-math-57', subject: 'maths', classId: 'y10-maths', statements: ['Compound interest formula: A = P(1 + r)ⁿ.', 'Exponential decay has base 0 < b < 1.', 'Exponential growth has base 0 < b < 1.'], lie: 2, explanation: 'Exponential growth requires base > 1; decay uses 0 < base < 1.' },
    { id: 'y10-tl-math-58', subject: 'maths', classId: 'y10-maths', statements: ['log₂ 8 = 3 because 2³ = 8.', 'log₁₀ 1 = 0 for any positive base.', 'log of a negative number is well-defined in the real numbers.'], lie: 2, explanation: 'Logarithms of negative numbers are NOT defined in the real numbers.' },
    { id: 'y10-tl-math-59', subject: 'maths', classId: 'y10-maths', statements: ['log_a(xy) = log_a x + log_a y.', 'log_a(x/y) = log_a x − log_a y.', 'log_a(xⁿ) = (log_a x)ⁿ.'], lie: 2, explanation: 'log_a(xⁿ) = n × log_a x — the exponent comes out as a multiplier, not as a power.' },
    { id: 'y10-tl-math-60', subject: 'maths', classId: 'y10-maths', statements: ['The Richter scale is logarithmic.', 'The pH scale is logarithmic.', 'The kilogram scale is logarithmic.'], lie: 2, explanation: 'The kilogram scale is linear — 1 kg + 1 kg = 2 kg.' },
    { id: 'y10-tl-math-61', subject: 'maths', classId: 'y10-maths', statements: ['Exponential and logarithmic functions are inverses.', 'y = 2ˣ has a horizontal asymptote at y = 0.', 'y = (1/2)ˣ exhibits exponential growth.'], lie: 2, explanation: 'y = (1/2)ˣ has base < 1, so it represents DECAY, not growth.' },
    { id: 'y10-tl-math-62', subject: 'maths', classId: 'y10-maths', statements: ['A function maps each input to exactly one output.', 'f(x) is read as "f of x".', 'f(x) means f multiplied by x.'], lie: 2, explanation: 'f(x) is function notation, NOT multiplication.' },
    { id: 'y10-tl-math-63', subject: 'maths', classId: 'y10-maths', statements: ['The degree of a polynomial is the highest exponent.', 'A cubic polynomial has degree 3.', 'A polynomial with degree 0 is called quadratic.'], lie: 2, explanation: 'Degree 0 is a constant polynomial; degree 2 is quadratic.' },
    { id: 'y10-tl-math-64', subject: 'maths', classId: 'y10-maths', statements: ['The factor theorem: (x − a) is a factor of p(x) when p(a) = 0.', 'The remainder theorem: dividing p(x) by (x − a) gives remainder p(a).', 'Dividing x³ − 2x + 1 by (x − 1) leaves remainder 1.'], lie: 2, explanation: 'By the remainder theorem the remainder is p(1) = 1 − 2 + 1 = 0, so (x − 1) is a factor. Both theorems work for polynomials of any degree.' },
    { id: 'y10-tl-math-65', subject: 'maths', classId: 'y10-maths', statements: ['A cubic equation has at most 3 real roots.', 'y = 1/x is a hyperbola.', 'The asymptotes of y = 1/x are x = 1 and y = 1.'], lie: 2, explanation: 'The asymptotes of y = 1/x are x = 0 and y = 0.' },
    { id: 'y10-tl-math-66', subject: 'maths', classId: 'y10-maths', statements: ['The domain of f(x) = 1/x is all real x except x = 0.', 'Translating y = x³ by "right 2, up 1" gives y = (x − 2)³ + 1.', 'The graph of y = x³ is a parabola.'], lie: 2, explanation: 'y = x³ is a CUBIC with point symmetry, not a parabola.' },
    { id: 'y10-tl-math-67', subject: 'maths', classId: 'y10-maths', statements: ['Quartic polynomials have degree 4.', 'Adding (x² + 5x + 6) and (x² − 3x + 1) gives 2x² + 2x + 7.', 'A constant term has degree equal to the polynomial\'s degree.'], lie: 2, explanation: 'A constant term has degree 0 regardless of the polynomial\'s degree.' },
    { id: 'y10-tl-math-68', subject: 'maths', classId: 'y10-maths', statements: ['Roots of a polynomial are where p(x) = 0.', 'A polynomial of degree n has at most n real roots.', 'A polynomial of degree n has at least n real roots.'], lie: 2, explanation: 'A degree-n polynomial has AT MOST n real roots; some may have fewer (e.g. x² + 1 has 0).' },
    { id: 'y10-tl-math-69', subject: 'maths', classId: 'y10-maths', statements: ['SOH CAH TOA links sin/cos/tan to opposite/adjacent/hypotenuse.', 'sin θ = opposite / hypotenuse.', 'tan θ = adjacent / opposite.'], lie: 2, explanation: 'tan θ = opposite / adjacent (TOA), not adjacent / opposite.' },
    { id: 'y10-tl-math-70', subject: 'maths', classId: 'y10-maths', statements: ['tan 45° = 1 exactly.', 'sin 90° = 1.', 'cos 0° = 0.'], lie: 2, explanation: 'cos 0° = 1 (adjacent = hypotenuse at 0°).' },
    { id: 'y10-tl-math-71', subject: 'maths', classId: 'y10-maths', statements: ['To find an unknown side given a side and an angle, use a forward trig ratio.', 'To find an unknown angle given two sides, use an inverse trig function.', 'sin⁻¹ and 1/sin are the same operation.'], lie: 2, explanation: 'sin⁻¹ is the INVERSE function (also called arcsin); 1/sin is the reciprocal (cosec).' },
    { id: 'y10-tl-math-72', subject: 'maths', classId: 'y10-maths', statements: ['Bearings are measured clockwise from North.', 'A bearing of 090° points East.', 'A bearing of 360° points South.'], lie: 2, explanation: 'A bearing of 360° (or 000°) points back to North.' },
    { id: 'y10-tl-math-73', subject: 'maths', classId: 'y10-maths', statements: ['Angle of elevation is measured up from the horizontal.', 'Angle of depression is measured down from the horizontal.', 'Elevation and depression are measured from the vertical.'], lie: 2, explanation: 'Both are measured from the HORIZONTAL line of sight.' },
    { id: 'y10-tl-math-74', subject: 'maths', classId: 'y10-maths', statements: ['In a 3D cuboid, a right triangle can be formed by a space diagonal, an edge, and a face diagonal.', 'The space diagonal acts as the hypotenuse in that triangle.', 'Trigonometry cannot be applied in 3D contexts.'], lie: 2, explanation: 'Trigonometry CAN be applied in 3D — that is a major part of the Y10 trig curriculum.' },
    { id: 'y10-tl-math-75', subject: 'maths', classId: 'y10-maths', statements: ['The hypotenuse is always opposite the right angle in a right triangle.', 'Labelling opposite and adjacent depends on the reference angle.', 'The hypotenuse is always the shortest side.'], lie: 2, explanation: 'The hypotenuse is the LONGEST side of a right triangle, not the shortest.' },
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

