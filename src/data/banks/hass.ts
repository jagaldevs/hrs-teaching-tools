/**
 * HASS banks — events, figures, flags, landmarks, and Australian map locations.
 * All entries are stream-tagged so games can scale appropriately.
 */

import type { Stream } from '../../data/games';

// ---------- Timeline events ----------

export interface TimelineEvent {
  id: string;
  event: string;
  year: number;
}

/**
 * Timeline Order pulls 5-event subsets at random, so we want LOTS per stream.
 * Each set must be internally orderable by `year`.
 */
export const TIMELINE: Record<Stream, TimelineEvent[]> = {
  lower_primary: [
    { id: 'lp-tl-1', event: 'Babies become toddlers (1 year)', year: 1 },
    { id: 'lp-tl-2', event: 'Children start school (5 years)', year: 5 },
    { id: 'lp-tl-3', event: 'You become a teenager (13)', year: 13 },
    { id: 'lp-tl-4', event: 'You can vote (18)', year: 18 },
    { id: 'lp-tl-5', event: 'Most people retire (~65)', year: 65 },
  ],
  upper_primary: [
    { id: 'up-tl-1', event: 'Aboriginal peoples arrive in Australia', year: -65000 },
    { id: 'up-tl-2', event: 'Captain Cook lands at Botany Bay', year: 1770 },
    { id: 'up-tl-3', event: 'The First Fleet arrives', year: 1788 },
    { id: 'up-tl-4', event: 'Australian Federation', year: 1901 },
    { id: 'up-tl-5', event: 'Sydney Opera House opens', year: 1973 },
    { id: 'up-tl-6', event: 'Mabo decision recognises native title', year: 1992 },
    { id: 'up-tl-7', event: 'Sydney Olympics', year: 2000 },
    { id: 'up-tl-8', event: 'Eureka Stockade', year: 1854 },
    { id: 'up-tl-9', event: 'Gold discovered in Australia', year: 1851 },
    { id: 'up-tl-10', event: 'Women vote in federal elections (1902)', year: 1902 },
  ],
  middle_school: [
    { id: 'ms-tl-1', event: 'Fall of the Roman Empire', year: 476 },
    { id: 'ms-tl-2', event: 'Magna Carta signed', year: 1215 },
    { id: 'ms-tl-3', event: 'Black Death peaks in Europe', year: 1347 },
    { id: 'ms-tl-4', event: 'Columbus reaches the Americas', year: 1492 },
    { id: 'ms-tl-5', event: 'Industrial Revolution begins (~1760)', year: 1760 },
    { id: 'ms-tl-6', event: 'French Revolution begins', year: 1789 },
    { id: 'ms-tl-7', event: 'World War I begins', year: 1914 },
    { id: 'ms-tl-8', event: 'Gallipoli landing', year: 1915 },
    { id: 'ms-tl-9', event: 'World War II ends', year: 1945 },
    { id: 'ms-tl-10', event: 'Moon landing (Apollo 11)', year: 1969 },
    { id: 'ms-tl-11', event: 'Berlin Wall falls', year: 1989 },
  ],
  senior_school: [
    { id: 'ss-tl-1', event: 'Russian Revolution', year: 1917 },
    { id: 'ss-tl-2', event: 'Treaty of Versailles', year: 1919 },
    { id: 'ss-tl-3', event: 'Great Depression begins', year: 1929 },
    { id: 'ss-tl-4', event: 'Pearl Harbour attack', year: 1941 },
    { id: 'ss-tl-5', event: 'Universal Declaration of Human Rights', year: 1948 },
    { id: 'ss-tl-6', event: 'Cuban Missile Crisis', year: 1962 },
    { id: 'ss-tl-7', event: '1967 Referendum (Aboriginal census recognition)', year: 1967 },
    { id: 'ss-tl-8', event: 'Apollo 11 moon landing', year: 1969 },
    { id: 'ss-tl-9', event: 'Fall of Saigon', year: 1975 },
    { id: 'ss-tl-10', event: 'Apartheid ends in South Africa', year: 1991 },
    { id: 'ss-tl-11', event: 'Mabo decision', year: 1992 },
    { id: 'ss-tl-12', event: 'Apology to the Stolen Generations', year: 2008 },
    { id: 'ss-tl-13', event: 'Paris Agreement on climate', year: 2015 },
  ],
};

// ---------- Flags (Unicode emoji to keep this offline + lightweight) ----------

export interface FlagItem {
  id: string;
  flag: string;
  name: string;
  /** Three distractor names for MCQ generation. */
  distractors: string[];
}

export const FLAGS: Record<Stream, FlagItem[]> = {
  lower_primary: [
    { id: 'lp-fl-1', flag: '🇦🇺', name: 'Australia', distractors: ['New Zealand', 'United Kingdom', 'United States'] },
    { id: 'lp-fl-2', flag: '🇳🇿', name: 'New Zealand', distractors: ['Australia', 'United Kingdom', 'Canada'] },
    { id: 'lp-fl-3', flag: '🇯🇵', name: 'Japan', distractors: ['South Korea', 'China', 'Vietnam'] },
    { id: 'lp-fl-4', flag: '🇺🇸', name: 'United States', distractors: ['United Kingdom', 'Canada', 'Mexico'] },
    { id: 'lp-fl-5', flag: '🇨🇦', name: 'Canada', distractors: ['United States', 'United Kingdom', 'Australia'] },
  ],
  upper_primary: [
    { id: 'up-fl-1', flag: '🇮🇩', name: 'Indonesia', distractors: ['Malaysia', 'Thailand', 'Philippines'] },
    { id: 'up-fl-2', flag: '🇨🇳', name: 'China', distractors: ['Japan', 'South Korea', 'Vietnam'] },
    { id: 'up-fl-3', flag: '🇫🇷', name: 'France', distractors: ['Italy', 'Spain', 'Germany'] },
    { id: 'up-fl-4', flag: '🇩🇪', name: 'Germany', distractors: ['Belgium', 'Italy', 'France'] },
    { id: 'up-fl-5', flag: '🇮🇹', name: 'Italy', distractors: ['Ireland', 'Mexico', 'France'] },
    { id: 'up-fl-6', flag: '🇧🇷', name: 'Brazil', distractors: ['Argentina', 'Mexico', 'Colombia'] },
    { id: 'up-fl-7', flag: '🇮🇳', name: 'India', distractors: ['Pakistan', 'Bangladesh', 'Sri Lanka'] },
    { id: 'up-fl-8', flag: '🇹🇭', name: 'Thailand', distractors: ['Vietnam', 'Cambodia', 'Laos'] },
  ],
  middle_school: [
    { id: 'ms-fl-1', flag: '🇰🇷', name: 'South Korea', distractors: ['North Korea', 'Japan', 'Vietnam'] },
    { id: 'ms-fl-2', flag: '🇻🇳', name: 'Vietnam', distractors: ['China', 'Singapore', 'Cambodia'] },
    { id: 'ms-fl-3', flag: '🇿🇦', name: 'South Africa', distractors: ['Nigeria', 'Kenya', 'Ghana'] },
    { id: 'ms-fl-4', flag: '🇰🇪', name: 'Kenya', distractors: ['Uganda', 'Tanzania', 'Nigeria'] },
    { id: 'ms-fl-5', flag: '🇲🇽', name: 'Mexico', distractors: ['Italy', 'Brazil', 'Argentina'] },
    { id: 'ms-fl-6', flag: '🇹🇷', name: 'Turkey', distractors: ['Tunisia', 'Algeria', 'Pakistan'] },
    { id: 'ms-fl-7', flag: '🇸🇪', name: 'Sweden', distractors: ['Finland', 'Norway', 'Denmark'] },
    { id: 'ms-fl-8', flag: '🇪🇬', name: 'Egypt', distractors: ['Iraq', 'Syria', 'Saudi Arabia'] },
    { id: 'ms-fl-9', flag: '🇬🇷', name: 'Greece', distractors: ['Argentina', 'Israel', 'Uruguay'] },
    { id: 'ms-fl-10', flag: '🇸🇬', name: 'Singapore', distractors: ['Indonesia', 'Vietnam', 'Malaysia'] },
  ],
  senior_school: [
    { id: 'ss-fl-1', flag: '🇲🇲', name: 'Myanmar', distractors: ['Thailand', 'Laos', 'Cambodia'] },
    { id: 'ss-fl-2', flag: '🇵🇰', name: 'Pakistan', distractors: ['Bangladesh', 'India', 'Sri Lanka'] },
    { id: 'ss-fl-3', flag: '🇦🇷', name: 'Argentina', distractors: ['Uruguay', 'Greece', 'Chile'] },
    { id: 'ss-fl-4', flag: '🇨🇱', name: 'Chile', distractors: ['Peru', 'Brazil', 'Ecuador'] },
    { id: 'ss-fl-5', flag: '🇨🇴', name: 'Colombia', distractors: ['Venezuela', 'Ecuador', 'Peru'] },
    { id: 'ss-fl-6', flag: '🇮🇪', name: 'Ireland', distractors: ['Italy', 'Ivory Coast', 'India'] },
    { id: 'ss-fl-7', flag: '🇵🇱', name: 'Poland', distractors: ['Indonesia', 'Monaco', 'Czech Republic'] },
    { id: 'ss-fl-8', flag: '🇳🇴', name: 'Norway', distractors: ['Iceland', 'Denmark', 'Sweden'] },
    { id: 'ss-fl-9', flag: '🇲🇾', name: 'Malaysia', distractors: ['Singapore', 'Indonesia', 'United States'] },
    { id: 'ss-fl-10', flag: '🇿🇲', name: 'Zambia', distractors: ['Zimbabwe', 'Mozambique', 'Botswana'] },
    { id: 'ss-fl-11', flag: '🇮🇸', name: 'Iceland', distractors: ['Norway', 'Finland', 'Estonia'] },
    { id: 'ss-fl-12', flag: '🇳🇬', name: 'Nigeria', distractors: ['Niger', 'Senegal', 'Ghana'] },
  ],
};

// ---------- Landmarks (descriptions instead of images) ----------

export interface LandmarkItem {
  id: string;
  description: string;
  /** Emoji clue paired with description for visual flavour. */
  emoji: string;
  name: string;
  distractors: string[];
}

export const LANDMARKS: Record<Stream, LandmarkItem[]> = {
  lower_primary: [
    { id: 'lp-lm-1', description: 'A famous shell-shaped building beside Sydney Harbour.', emoji: '🎭', name: 'Sydney Opera House', distractors: ['Eiffel Tower', 'Big Ben', 'Statue of Liberty'] },
    { id: 'lp-lm-2', description: 'A huge red rock in central Australia, sacred to Aboriginal peoples.', emoji: '🪨', name: 'Uluru', distractors: ['Mt Kosciuszko', 'Great Barrier Reef', 'Twelve Apostles'] },
    { id: 'lp-lm-3', description: 'The world’s largest coral reef, off the coast of Queensland.', emoji: '🐠', name: 'Great Barrier Reef', distractors: ['Uluru', 'Sydney Harbour Bridge', 'Bondi Beach'] },
    { id: 'lp-lm-4', description: 'A famous arched steel bridge in Sydney, nicknamed "the coathanger".', emoji: '🌉', name: 'Sydney Harbour Bridge', distractors: ['Story Bridge', 'Westgate Bridge', 'Bolte Bridge'] },
  ],
  upper_primary: [
    { id: 'up-lm-1', description: 'An iron tower in Paris built for the 1889 World’s Fair.', emoji: '🗼', name: 'Eiffel Tower', distractors: ['Big Ben', 'Tower Bridge', 'Burj Khalifa'] },
    { id: 'up-lm-2', description: 'A statue gifted by France, holding a torch in New York Harbour.', emoji: '🗽', name: 'Statue of Liberty', distractors: ['Christ the Redeemer', 'Statue of Unity', 'Sphinx'] },
    { id: 'up-lm-3', description: 'Ancient stone tombs built for Egyptian pharaohs.', emoji: '🔺', name: 'Pyramids of Giza', distractors: ['Aztec ruins', 'Stonehenge', 'Great Wall'] },
    { id: 'up-lm-4', description: 'A massive defensive wall stretching across northern China.', emoji: '🧱', name: 'Great Wall of China', distractors: ['Berlin Wall', 'Hadrian’s Wall', 'Pyramids'] },
    { id: 'up-lm-5', description: 'A famous clock tower beside the UK Parliament in London.', emoji: '🕰️', name: 'Big Ben', distractors: ['Tower Bridge', 'Eiffel Tower', 'Westminster Abbey'] },
    { id: 'up-lm-6', description: 'A circle of ancient standing stones on Salisbury Plain.', emoji: '🪨', name: 'Stonehenge', distractors: ['Acropolis', 'Petra', 'Easter Island'] },
  ],
  middle_school: [
    { id: 'ms-lm-1', description: 'An ancient temple on a hill above Athens, Greece.', emoji: '🏛️', name: 'Acropolis', distractors: ['Colosseum', 'Pantheon', 'Parthenon hill'] },
    { id: 'ms-lm-2', description: 'A Roman amphitheatre famous for gladiator fights.', emoji: '🏟️', name: 'Colosseum', distractors: ['Acropolis', 'Forum Romanum', 'Pantheon'] },
    { id: 'ms-lm-3', description: 'An Incan citadel high in the Peruvian Andes.', emoji: '🏔️', name: 'Machu Picchu', distractors: ['Chichen Itza', 'Petra', 'Angkor Wat'] },
    { id: 'ms-lm-4', description: 'A vast Cambodian temple complex, the largest religious monument on Earth.', emoji: '🛕', name: 'Angkor Wat', distractors: ['Borobudur', 'Taj Mahal', 'Forbidden City'] },
    { id: 'ms-lm-5', description: 'A white marble mausoleum in India, built for love.', emoji: '🕌', name: 'Taj Mahal', distractors: ['Red Fort', 'Lotus Temple', 'Borobudur'] },
    { id: 'ms-lm-6', description: 'The tallest building in the world, in Dubai.', emoji: '🏙️', name: 'Burj Khalifa', distractors: ['Shanghai Tower', 'Empire State Building', 'Petronas Towers'] },
    { id: 'ms-lm-7', description: 'A rose-red city carved into rock cliffs in Jordan.', emoji: '🏜️', name: 'Petra', distractors: ['Persepolis', 'Palmyra', 'Babylon'] },
  ],
  senior_school: [
    { id: 'ss-lm-1', description: 'A Brazilian Art Deco statue of Christ atop Corcovado Mountain.', emoji: '✝️', name: 'Christ the Redeemer', distractors: ['Sugarloaf Mountain', 'Maracana', 'Easter Island moai'] },
    { id: 'ss-lm-2', description: 'The official Russian fortress and seat of power in Moscow.', emoji: '🏰', name: 'Kremlin', distractors: ['Hermitage', 'Red Square', 'Winter Palace'] },
    { id: 'ss-lm-3', description: 'Iconic stone heads on a remote Pacific island.', emoji: '🗿', name: 'Easter Island moai', distractors: ['Stonehenge', 'Angkor', 'Borobudur'] },
    { id: 'ss-lm-4', description: 'A vast UNESCO site of Mayan ruins in Mexico.', emoji: '🛕', name: 'Chichen Itza', distractors: ['Tikal', 'Machu Picchu', 'Teotihuacan'] },
    { id: 'ss-lm-5', description: 'A glass-and-steel pyramid in the courtyard of the Louvre, Paris.', emoji: '🔺', name: 'Louvre Pyramid', distractors: ['Eiffel Tower', 'Arc de Triomphe', 'Sacré-Cœur'] },
    { id: 'ss-lm-6', description: 'A sacred Buddhist temple in central Java.', emoji: '🛕', name: 'Borobudur', distractors: ['Angkor Wat', 'Shwedagon Pagoda', 'Taj Mahal'] },
    { id: 'ss-lm-7', description: 'The deepest canyon on land, in the southwestern US.', emoji: '🏞️', name: 'Grand Canyon', distractors: ['Bryce Canyon', 'Yosemite', 'Death Valley'] },
  ],
};

// ---------- Who Am I? (progressive clues) ----------

export interface WhoAmIFigure {
  id: string;
  name: string;
  /** Clues from vaguest → most specific. Player guesses earlier = more points. */
  clues: [string, string, string, string, string];
  alternateNames?: string[];
}

export const WHO_AM_I: Record<Stream, WhoAmIFigure[]> = {
  upper_primary: [
    {
      id: 'up-who-1',
      name: 'William Shakespeare',
      clues: [
        'I lived in the 1500s and 1600s.',
        'I was born in England.',
        'I wrote plays for the stage.',
        'My plays include Romeo and Juliet.',
        'My most famous tragedies are Hamlet, Macbeth and Othello.',
      ],
    },
    {
      id: 'up-who-2',
      name: 'Cathy Freeman',
      clues: [
        'I am Australian.',
        'I am known for running fast.',
        'I won an Olympic gold medal.',
        'I won at the Sydney 2000 Olympics.',
        'I’m a proud Aboriginal Australian who lit the cauldron in Sydney.',
        ],
      alternateNames: ['Catherine Freeman'],
    },
    {
      id: 'up-who-3',
      name: 'Captain James Cook',
      clues: [
        'I was born in the 1700s.',
        'I was a sailor and explorer.',
        'I worked for Britain’s Royal Navy.',
        'I led voyages to the Pacific.',
        'I landed at Botany Bay in 1770.',
      ],
      alternateNames: ['Cook', 'James Cook'],
    },
  ],
  middle_school: [
    {
      id: 'ms-who-1',
      name: 'Albert Einstein',
      clues: [
        'I was born in Germany in 1879.',
        'I was a physicist.',
        'I won the Nobel Prize in 1921.',
        'My most famous equation is E=mc².',
        'I developed the theories of special and general relativity.',
      ],
      alternateNames: ['Einstein'],
    },
    {
      id: 'ms-who-2',
      name: 'Mahatma Gandhi',
      clues: [
        'I was born in India in 1869.',
        'I trained as a lawyer in London.',
        'I led peaceful protests against unfair laws.',
        'I championed non-violent civil disobedience.',
        'I led India to independence from British rule.',
      ],
      alternateNames: ['Gandhi'],
    },
    {
      id: 'ms-who-3',
      name: 'Marie Curie',
      clues: [
        'I was born in Poland in the 1800s.',
        'I worked in Paris.',
        'I won the Nobel Prize twice — in different sciences.',
        'I discovered two new elements.',
        'I discovered polonium and radium and pioneered research on radioactivity.',
      ],
      alternateNames: ['Curie'],
    },
  ],
  senior_school: [
    {
      id: 'ss-who-1',
      name: 'Nelson Mandela',
      clues: [
        'I was born in South Africa in 1918.',
        'I trained as a lawyer.',
        'I was imprisoned for 27 years for fighting injustice.',
        'I became the first democratically elected president of my country.',
        'I led the end of apartheid in South Africa.',
      ],
      alternateNames: ['Mandela'],
    },
    {
      id: 'ss-who-2',
      name: 'Eddie Mabo',
      clues: [
        'I was born in the Torres Strait.',
        'I worked as a gardener and labourer.',
        'I challenged Australian land law.',
        'My court case in 1992 changed Australian property law.',
        'My case overturned the doctrine of terra nullius.',
      ],
      alternateNames: ['Mabo'],
    },
    {
      id: 'ss-who-3',
      name: 'Ada Lovelace',
      clues: [
        'I was born in England in 1815.',
        'I worked alongside Charles Babbage.',
        'I wrote about a mechanical computing machine.',
        'I’m often called the world’s first computer programmer.',
        'I wrote an algorithm for Babbage’s Analytical Engine.',
      ],
      alternateNames: ['Lovelace'],
    },
  ],
  lower_primary: [
    {
      id: 'lp-who-1',
      name: 'Santa Claus',
      clues: [
        'I have a long white beard.',
        'I wear red and white.',
        'I have lots of reindeer.',
        'I travel in a flying sleigh.',
        'I deliver presents on Christmas Eve.',
      ],
      alternateNames: ['Father Christmas'],
    },
    {
      id: 'lp-who-2',
      name: 'Bluey',
      clues: [
        'I am from an Australian TV show.',
        'I am a six-year-old dog.',
        'I am a Blue Heeler.',
        'My little sister is Bingo.',
        'My mum is Chilli and my dad is Bandit.',
      ],
    },
  ],
};

// ---------- Map Pin: Australian states ----------

export interface MapItem {
  id: string;
  /** Region key matched against the SVG paths in the Australia map. */
  region: 'NSW' | 'VIC' | 'QLD' | 'SA' | 'WA' | 'TAS' | 'NT' | 'ACT';
  /** Question text — "Click NSW" or "Where is Darwin?" */
  prompt: string;
  hint?: string;
}

export const MAP_AUSTRALIA: MapItem[] = [
  { id: 'm-nsw', region: 'NSW', prompt: 'Click on New South Wales (NSW)' },
  { id: 'm-vic', region: 'VIC', prompt: 'Click on Victoria (VIC)' },
  { id: 'm-qld', region: 'QLD', prompt: 'Click on Queensland (QLD)' },
  { id: 'm-sa', region: 'SA', prompt: 'Click on South Australia (SA)' },
  { id: 'm-wa', region: 'WA', prompt: 'Click on Western Australia (WA)' },
  { id: 'm-tas', region: 'TAS', prompt: 'Click on Tasmania (TAS)' },
  { id: 'm-nt', region: 'NT', prompt: 'Click on the Northern Territory (NT)' },
  { id: 'm-act', region: 'ACT', prompt: 'Click on the Australian Capital Territory (ACT)' },

  { id: 'c-darwin', region: 'NT', prompt: 'Which state or territory contains Darwin?', hint: 'Top End' },
  { id: 'c-sydney', region: 'NSW', prompt: 'Which state contains Sydney?' },
  { id: 'c-melbourne', region: 'VIC', prompt: 'Which state contains Melbourne?' },
  { id: 'c-brisbane', region: 'QLD', prompt: 'Which state contains Brisbane?' },
  { id: 'c-perth', region: 'WA', prompt: 'Which state contains Perth?' },
  { id: 'c-adelaide', region: 'SA', prompt: 'Which state contains Adelaide?' },
  { id: 'c-hobart', region: 'TAS', prompt: 'Which state contains Hobart?' },
  { id: 'c-canberra', region: 'ACT', prompt: 'Which territory contains Canberra?' },

  { id: 'l-uluru', region: 'NT', prompt: 'In which state/territory is Uluru?', hint: 'The red centre' },
  { id: 'l-reef', region: 'QLD', prompt: 'Off which state lies the Great Barrier Reef?' },
  { id: 'l-blueMountains', region: 'NSW', prompt: 'In which state are the Blue Mountains?' },
  { id: 'l-twelveApostles', region: 'VIC', prompt: 'Off which state’s coast are the Twelve Apostles?' },
  { id: 'l-mona', region: 'TAS', prompt: 'In which state is MONA (the Museum of Old and New Art)?' },
];
