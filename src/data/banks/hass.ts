/**
 * HASS bank — Australian Curriculum V9 aligned.
 *
 * Houses Timeline events, Flags, Landmarks, Who Am I? figures and the
 * Australian map locations. All stream-tagged so games can scale difficulty.
 *
 * Coverage target (Phase 4):
 *   Timeline   ~100 events  (10 / 25 / 30 / 35 per stream)
 *   Flags      ~55 flags    (10 / 15 / 15 / 15 per stream)
 *   Landmarks  ~44 items    (8 / 12 / 12 / 12 per stream)
 *   Who Am I?  ~22 figures  (4 / 6 / 6 / 6 per stream, scientists added)
 *   MapAus     ~30 prompts  (states + capitals + landmarks + features)
 */

import type { Stream } from '../../data/games';

// ============================================================
//  TIMELINE EVENTS
// ============================================================

export interface TimelineEvent {
  id: string;
  event: string;
  year: number;
  /** Optional AC V9 code linking to the descriptor that justifies the event. */
  acCode?: string;
}

/**
 * Timeline Order pulls 5-event subsets at random. Each set is internally
 * orderable by `year`. Negative years = BCE.
 */
export const TIMELINE: Record<Stream, TimelineEvent[]> = {
  // ----- Lower Primary -----
  // F-2 HASS focuses on personal & family history and "things from long ago
  // vs now". We mix age milestones with simple invention dates kids can
  // grasp (years measured against personal experience).
  lower_primary: [
    { id: 'lp-tl-1', event: 'Babies become toddlers', year: 1 },
    { id: 'lp-tl-2', event: 'Children start school', year: 5 },
    { id: 'lp-tl-3', event: 'You become a teenager', year: 13 },
    { id: 'lp-tl-4', event: 'You can vote', year: 18 },
    { id: 'lp-tl-5', event: 'Most people retire', year: 65 },
    { id: 'lp-tl-6', event: 'Candles invented', year: -3000, acCode: 'AC9HS2K02' },
    { id: 'lp-tl-7', event: 'First cars sold to the public', year: 1886, acCode: 'AC9HS2K02' },
    { id: 'lp-tl-8', event: 'First telephones', year: 1876, acCode: 'AC9HS2K02' },
    { id: 'lp-tl-9', event: 'Television invented', year: 1927, acCode: 'AC9HS2K02' },
    { id: 'lp-tl-10', event: 'First smartphones', year: 2007, acCode: 'AC9HS2K02' },
    { id: 'lp-tl-11', event: 'Sydney Harbour Bridge opens', year: 1932 },
    { id: 'lp-tl-12', event: 'Sydney Opera House opens', year: 1973 },
  ],

  // ----- Upper Primary -----
  // Y3-6 HASS spans Australian colonies, Federation, world ancient
  // civilisations. Larger pool so 5-event rounds vary widely.
  upper_primary: [
    { id: 'up-tl-1', event: 'Aboriginal peoples arrive in Australia', year: -60000, acCode: 'AC9HS4K02' },
    { id: 'up-tl-2', event: 'Great Pyramid of Giza built', year: -2560, acCode: 'AC9HS6K04' },
    { id: 'up-tl-3', event: 'First Olympic Games', year: -776, acCode: 'AC9HS6K04' },
    { id: 'up-tl-4', event: 'Roman Empire founded', year: -27, acCode: 'AC9HS6K04' },
    { id: 'up-tl-5', event: 'Marco Polo travels to China', year: 1271, acCode: 'AC9HS6K04' },
    { id: 'up-tl-6', event: 'Columbus reaches the Americas', year: 1492, acCode: 'AC9HS6K04' },
    { id: 'up-tl-7', event: 'Dutch Janszoon first sights Australia', year: 1606, acCode: 'AC9HS4K01' },
    { id: 'up-tl-8', event: 'Captain Cook lands at Botany Bay', year: 1770, acCode: 'AC9HS4K01' },
    { id: 'up-tl-9', event: 'The First Fleet arrives at Sydney Cove', year: 1788, acCode: 'AC9HS5K01' },
    { id: 'up-tl-10', event: 'Melbourne is founded', year: 1835, acCode: 'AC9HS5K02' },
    { id: 'up-tl-11', event: 'Gold first discovered in Australia', year: 1851, acCode: 'AC9HS5K02' },
    { id: 'up-tl-12', event: 'Eureka Stockade', year: 1854, acCode: 'AC9HS5K02' },
    { id: 'up-tl-13', event: 'Last convict ship arrives in Australia', year: 1868, acCode: 'AC9HS5K01' },
    { id: 'up-tl-14', event: 'Australian Federation', year: 1901, acCode: 'AC9HS6K01' },
    { id: 'up-tl-15', event: 'Women vote in federal elections', year: 1902, acCode: 'AC9HS6K01' },
    { id: 'up-tl-16', event: 'Gallipoli landing', year: 1915, acCode: 'AC9HS6K02' },
    { id: 'up-tl-17', event: 'Canberra becomes the capital', year: 1927, acCode: 'AC9HS6K01' },
    { id: 'up-tl-18', event: 'Sydney Harbour Bridge opens', year: 1932 },
    { id: 'up-tl-19', event: 'Darwin bombed by Japan', year: 1942, acCode: 'AC9HS6K02' },
    { id: 'up-tl-20', event: 'Snowy Mountains Scheme begins', year: 1949 },
    { id: 'up-tl-21', event: 'Melbourne Olympics', year: 1956 },
    { id: 'up-tl-22', event: 'Referendum on Aboriginal recognition', year: 1967, acCode: 'AC9HS6K03' },
    { id: 'up-tl-23', event: 'Sydney Opera House opens', year: 1973 },
    { id: 'up-tl-24', event: 'Mabo decision', year: 1992, acCode: 'AC9HS6K03' },
    { id: 'up-tl-25', event: 'Sydney Olympics', year: 2000 },
    { id: 'up-tl-26', event: 'Apology to the Stolen Generations', year: 2008, acCode: 'AC9HS6K03' },
  ],

  // ----- Middle School -----
  // Y7-9 sweeps Ancient World, Medieval, Industrial Revolution, WWI.
  middle_school: [
    { id: 'ms-tl-1', event: 'Egypt unified under one pharaoh', year: -3100, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-2', event: 'Great Pyramid built', year: -2560, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-3', event: 'Code of Hammurabi', year: -1750, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-4', event: 'First Olympic Games', year: -776, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-5', event: 'Foundation of Rome (traditional date)', year: -753, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-6', event: 'Battle of Marathon', year: -490, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-7', event: 'Qin unifies China', year: -221, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-8', event: 'Julius Caesar assassinated', year: -44, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-9', event: 'Eruption of Vesuvius destroys Pompeii', year: 79, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-10', event: 'Fall of Western Roman Empire', year: 476, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-11', event: 'Hijra — Muhammad migrates to Medina', year: 622, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-12', event: 'Charlemagne crowned Emperor', year: 800, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-13', event: 'Norman Conquest of England', year: 1066, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-14', event: 'Genghis Khan unites the Mongols', year: 1206, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-15', event: 'Magna Carta signed', year: 1215, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-16', event: 'Black Death reaches Europe', year: 1347, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-17', event: 'Fall of Constantinople', year: 1453, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-18', event: 'Columbus reaches the Americas', year: 1492, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-19', event: 'Martin Luther begins the Reformation', year: 1517, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-20', event: 'Newton publishes Principia', year: 1687, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-21', event: 'Watt steam engine', year: 1769, acCode: 'AC9HH9K01' },
    { id: 'ms-tl-22', event: 'American Declaration of Independence', year: 1776, acCode: 'AC9HH9K01' },
    { id: 'ms-tl-23', event: 'French Revolution begins', year: 1789, acCode: 'AC9HH9K01' },
    { id: 'ms-tl-24', event: 'First steam railway opens', year: 1825, acCode: 'AC9HH9K01' },
    { id: 'ms-tl-25', event: 'Darwin publishes Origin of Species', year: 1859, acCode: 'AC9HH9K01' },
    { id: 'ms-tl-26', event: 'Telephone patented', year: 1876, acCode: 'AC9HH9K01' },
    { id: 'ms-tl-27', event: 'Wright Brothers first powered flight', year: 1903, acCode: 'AC9HH9K02' },
    { id: 'ms-tl-28', event: 'World War I begins', year: 1914, acCode: 'AC9HH9K02' },
    { id: 'ms-tl-29', event: 'Russian Revolution', year: 1917, acCode: 'AC9HH9K03' },
    { id: 'ms-tl-30', event: 'World War I ends — Armistice', year: 1918, acCode: 'AC9HH9K02' },
  ],

  // ----- Senior School -----
  // Y10-12 covers WWII through to contemporary world. Detailed enough to
  // form coherent Modern History rounds.
  senior_school: [
    { id: 'ss-tl-1', event: 'Russian Revolution', year: 1917, acCode: 'AC9HH10K02' },
    { id: 'ss-tl-2', event: 'Treaty of Versailles', year: 1919, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-3', event: 'Wall Street Crash — Great Depression begins', year: 1929, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-4', event: 'Hitler becomes Chancellor of Germany', year: 1933, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-5', event: 'Spanish Civil War begins', year: 1936, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-6', event: 'World War II begins', year: 1939, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-7', event: 'Pearl Harbor attacked', year: 1941, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-8', event: 'D-Day — Normandy landings', year: 1944, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-9', event: 'Hiroshima atomic bomb', year: 1945, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-10', event: 'United Nations founded', year: 1945, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-11', event: 'Indian independence and partition', year: 1947, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-12', event: 'State of Israel founded', year: 1948, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-13', event: 'Universal Declaration of Human Rights adopted', year: 1948, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-14', event: 'People’s Republic of China founded', year: 1949, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-15', event: 'Korean War begins', year: 1950, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-16', event: 'Sputnik launches the Space Race', year: 1957, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-17', event: 'Cuban Missile Crisis', year: 1962, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-18', event: 'MLK "I Have a Dream" speech', year: 1963, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-19', event: 'Australian referendum on Aboriginal recognition', year: 1967, acCode: 'AC9HH10K04' },
    { id: 'ss-tl-20', event: 'Apollo 11 Moon landing', year: 1969, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-21', event: 'OPEC oil shock', year: 1973, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-22', event: 'Whitlam government dismissed', year: 1975, acCode: 'AC9HH10K04' },
    { id: 'ss-tl-23', event: 'Fall of Saigon — Vietnam War ends', year: 1975, acCode: 'AC9HH10K02' },
    { id: 'ss-tl-24', event: 'Iranian Revolution', year: 1979, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-25', event: 'Berlin Wall falls', year: 1989, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-26', event: 'Tiananmen Square protests', year: 1989, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-27', event: 'USSR dissolved', year: 1991, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-28', event: 'Apartheid officially ends in South Africa', year: 1991, acCode: 'AC9HH10K04' },
    { id: 'ss-tl-29', event: 'Mabo decision', year: 1992, acCode: 'AC9HH10K04' },
    { id: 'ss-tl-30', event: 'Mandela elected President of South Africa', year: 1994, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-31', event: 'Kyoto Protocol adopted', year: 1997, acCode: 'AC9HG10K03' },
    { id: 'ss-tl-32', event: '9/11 attacks', year: 2001, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-33', event: 'Apology to the Stolen Generations', year: 2008, acCode: 'AC9HH10K04' },
    { id: 'ss-tl-34', event: 'Paris Agreement on climate', year: 2015, acCode: 'AC9HG10K03' },
    { id: 'ss-tl-35', event: 'COVID-19 declared a pandemic', year: 2020, acCode: 'AC9HH10K03' },
  ],
};

// ============================================================
//  WHO AM I?
// ============================================================

export interface WhoAmIFigure {
  id: string;
  name: string;
  /** Clues from vaguest → most specific. Player guesses earlier = more points. */
  clues: [string, string, string, string, string];
  alternateNames?: string[];
}

export const WHO_AM_I: Record<Stream, WhoAmIFigure[]> = {
  // ----- Lower Primary -----
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
    {
      id: 'lp-who-3',
      name: 'Steve Irwin',
      clues: [
        'I was Australian.',
        'I loved wild animals.',
        'I always said "Crikey!"',
        'I ran a zoo in Queensland with my family.',
        'I was famous as "The Crocodile Hunter".',
      ],
    },
    {
      id: 'lp-who-4',
      name: 'A kangaroo',
      clues: [
        'I am an animal.',
        'I have two big back legs.',
        'I hop instead of running.',
        'I carry my baby in a pouch.',
        'I appear on the Australian coat of arms.',
      ],
    },
  ],

  // ----- Upper Primary -----
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
    {
      id: 'up-who-4',
      name: 'Isaac Newton',
      clues: [
        'I lived in the 1600s and 1700s.',
        'I was an English scientist and mathematician.',
        'A famous story says I sat under a tree.',
        'I developed three laws of motion.',
        'I explained why apples — and planets — fall the way they do.',
      ],
      alternateNames: ['Newton'],
    },
    {
      id: 'up-who-5',
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
      id: 'up-who-6',
      name: 'Albert Einstein',
      clues: [
        'I was born in Germany in 1879.',
        'I had famously wild hair.',
        'I was a physicist.',
        'My most famous equation is E=mc².',
        'I developed the theories of relativity.',
      ],
      alternateNames: ['Einstein'],
    },
  ],

  // ----- Middle School -----
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
    {
      id: 'ms-who-4',
      name: 'Charles Darwin',
      clues: [
        'I was born in England in 1809.',
        'I sailed around the world on HMS Beagle.',
        'I visited the Galápagos Islands and studied finches.',
        'I proposed a theory that changed biology forever.',
        'I wrote "On the Origin of Species" in 1859.',
      ],
      alternateNames: ['Darwin'],
    },
    {
      id: 'ms-who-5',
      name: 'Cleopatra',
      clues: [
        'I was born in Egypt in 69 BCE.',
        'I was the last pharaoh of my kingdom.',
        'I spoke many languages and ran a vast empire.',
        'I formed alliances with Julius Caesar and Mark Antony.',
        'My reign ended when Rome conquered Egypt.',
      ],
    },
    {
      id: 'ms-who-6',
      name: 'Galileo Galilei',
      clues: [
        'I was born in Italy in 1564.',
        'I was an astronomer and physicist.',
        'I improved the telescope.',
        'I discovered four of Jupiter’s moons.',
        'I argued that Earth orbits the Sun — and got in serious trouble for it.',
      ],
      alternateNames: ['Galileo'],
    },
  ],

  // ----- Senior School -----
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
    {
      id: 'ss-who-4',
      name: 'Rosalind Franklin',
      clues: [
        'I was born in London in 1920.',
        'I was a chemist and X-ray crystallographer.',
        'My work was essential to understanding the structure of life.',
        'My "Photo 51" was the key image.',
        'I helped reveal the double-helix structure of DNA.',
      ],
      alternateNames: ['Franklin'],
    },
    {
      id: 'ss-who-5',
      name: 'Martin Luther King Jr.',
      clues: [
        'I was born in the USA in 1929.',
        'I was a Baptist minister.',
        'I led non-violent civil rights campaigns.',
        'I won the Nobel Peace Prize in 1964.',
        'I gave the "I Have a Dream" speech in 1963.',
      ],
      alternateNames: ['MLK', 'Martin Luther King'],
    },
    {
      id: 'ss-who-6',
      name: 'Stephen Hawking',
      clues: [
        'I was born in Oxford in 1942.',
        'I was a theoretical physicist.',
        'I had motor neurone disease for most of my career.',
        'My bestselling book is "A Brief History of Time".',
        'I worked on black holes and proposed Hawking radiation.',
      ],
      alternateNames: ['Hawking'],
    },
  ],
};

