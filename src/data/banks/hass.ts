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
    { id: 'lp-tl-1', event: 'Babies become toddlers (1 year)', year: 1 },
    { id: 'lp-tl-2', event: 'Children start school (5 years)', year: 5 },
    { id: 'lp-tl-3', event: 'You become a teenager (13)', year: 13 },
    { id: 'lp-tl-4', event: 'You can vote (18)', year: 18 },
    { id: 'lp-tl-5', event: 'Most people retire (~65)', year: 65 },
    { id: 'lp-tl-6', event: 'Candles invented (~3000 BCE)', year: -3000, acCode: 'AC9HS2K02' },
    { id: 'lp-tl-7', event: 'First cars sold to the public (1886)', year: 1886, acCode: 'AC9HS2K02' },
    { id: 'lp-tl-8', event: 'First telephones (1876)', year: 1876, acCode: 'AC9HS2K02' },
    { id: 'lp-tl-9', event: 'Television invented (1927)', year: 1927, acCode: 'AC9HS2K02' },
    { id: 'lp-tl-10', event: 'First smartphones (2007)', year: 2007, acCode: 'AC9HS2K02' },
    { id: 'lp-tl-11', event: 'Sydney Harbour Bridge opens (1932)', year: 1932 },
    { id: 'lp-tl-12', event: 'Sydney Opera House opens (1973)', year: 1973 },
  ],

  // ----- Upper Primary -----
  // Y3-6 HASS spans Australian colonies, Federation, world ancient
  // civilisations. Larger pool so 5-event rounds vary widely.
  upper_primary: [
    { id: 'up-tl-1', event: 'Aboriginal peoples arrive in Australia (60,000+ years ago)', year: -60000, acCode: 'AC9HS4K02' },
    { id: 'up-tl-2', event: 'Great Pyramid of Giza built (~2560 BCE)', year: -2560, acCode: 'AC9HS6K04' },
    { id: 'up-tl-3', event: 'First Olympic Games (776 BCE)', year: -776, acCode: 'AC9HS6K04' },
    { id: 'up-tl-4', event: 'Roman Empire founded (27 BCE)', year: -27, acCode: 'AC9HS6K04' },
    { id: 'up-tl-5', event: 'Marco Polo travels to China (1271)', year: 1271, acCode: 'AC9HS6K04' },
    { id: 'up-tl-6', event: 'Columbus reaches the Americas (1492)', year: 1492, acCode: 'AC9HS6K04' },
    { id: 'up-tl-7', event: 'Dutch Janszoon first sights Australia (1606)', year: 1606, acCode: 'AC9HS4K01' },
    { id: 'up-tl-8', event: 'Captain Cook lands at Botany Bay (1770)', year: 1770, acCode: 'AC9HS4K01' },
    { id: 'up-tl-9', event: 'The First Fleet arrives at Sydney Cove (1788)', year: 1788, acCode: 'AC9HS5K01' },
    { id: 'up-tl-10', event: 'Melbourne is founded (1835)', year: 1835, acCode: 'AC9HS5K02' },
    { id: 'up-tl-11', event: 'Gold first discovered in Australia (1851)', year: 1851, acCode: 'AC9HS5K02' },
    { id: 'up-tl-12', event: 'Eureka Stockade (1854)', year: 1854, acCode: 'AC9HS5K02' },
    { id: 'up-tl-13', event: 'Last convict ship arrives in Australia (1868)', year: 1868, acCode: 'AC9HS5K01' },
    { id: 'up-tl-14', event: 'Australian Federation (1901)', year: 1901, acCode: 'AC9HS6K01' },
    { id: 'up-tl-15', event: 'Women vote in federal elections (1902)', year: 1902, acCode: 'AC9HS6K01' },
    { id: 'up-tl-16', event: 'Gallipoli landing (1915)', year: 1915, acCode: 'AC9HS6K02' },
    { id: 'up-tl-17', event: 'Canberra becomes the capital (1927)', year: 1927, acCode: 'AC9HS6K01' },
    { id: 'up-tl-18', event: 'Sydney Harbour Bridge opens (1932)', year: 1932 },
    { id: 'up-tl-19', event: 'Darwin bombed by Japan (1942)', year: 1942, acCode: 'AC9HS6K02' },
    { id: 'up-tl-20', event: 'Snowy Mountains Scheme begins (1949)', year: 1949 },
    { id: 'up-tl-21', event: 'Melbourne Olympics (1956)', year: 1956 },
    { id: 'up-tl-22', event: '1967 Referendum (Aboriginal recognition)', year: 1967, acCode: 'AC9HS6K03' },
    { id: 'up-tl-23', event: 'Sydney Opera House opens (1973)', year: 1973 },
    { id: 'up-tl-24', event: 'Mabo decision (1992)', year: 1992, acCode: 'AC9HS6K03' },
    { id: 'up-tl-25', event: 'Sydney Olympics (2000)', year: 2000 },
    { id: 'up-tl-26', event: 'Apology to the Stolen Generations (2008)', year: 2008, acCode: 'AC9HS6K03' },
  ],

  // ----- Middle School -----
  // Y7-9 sweeps Ancient World, Medieval, Industrial Revolution, WWI.
  middle_school: [
    { id: 'ms-tl-1', event: 'Egypt unified under one pharaoh (~3100 BCE)', year: -3100, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-2', event: 'Great Pyramid built (~2560 BCE)', year: -2560, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-3', event: 'Code of Hammurabi (~1750 BCE)', year: -1750, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-4', event: 'First Olympic Games (776 BCE)', year: -776, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-5', event: 'Foundation of Rome (753 BCE, traditional)', year: -753, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-6', event: 'Battle of Marathon (490 BCE)', year: -490, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-7', event: 'Qin unifies China (221 BCE)', year: -221, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-8', event: 'Julius Caesar assassinated (44 BCE)', year: -44, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-9', event: 'Eruption of Vesuvius destroys Pompeii (79 AD)', year: 79, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-10', event: 'Fall of Western Roman Empire (476)', year: 476, acCode: 'AC9HH7K01' },
    { id: 'ms-tl-11', event: 'Hijra — Muhammad migrates to Medina (622)', year: 622, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-12', event: 'Charlemagne crowned Emperor (800)', year: 800, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-13', event: 'Norman Conquest of England (1066)', year: 1066, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-14', event: 'Genghis Khan unites the Mongols (1206)', year: 1206, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-15', event: 'Magna Carta signed (1215)', year: 1215, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-16', event: 'Black Death reaches Europe (1347)', year: 1347, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-17', event: 'Fall of Constantinople (1453)', year: 1453, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-18', event: 'Columbus reaches the Americas (1492)', year: 1492, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-19', event: 'Martin Luther begins the Reformation (1517)', year: 1517, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-20', event: 'Newton publishes Principia (1687)', year: 1687, acCode: 'AC9HH8K01' },
    { id: 'ms-tl-21', event: 'Watt steam engine (1769)', year: 1769, acCode: 'AC9HH9K01' },
    { id: 'ms-tl-22', event: 'American Declaration of Independence (1776)', year: 1776, acCode: 'AC9HH9K01' },
    { id: 'ms-tl-23', event: 'French Revolution begins (1789)', year: 1789, acCode: 'AC9HH9K01' },
    { id: 'ms-tl-24', event: 'First steam railway opens (1825)', year: 1825, acCode: 'AC9HH9K01' },
    { id: 'ms-tl-25', event: 'Darwin publishes Origin of Species (1859)', year: 1859, acCode: 'AC9HH9K01' },
    { id: 'ms-tl-26', event: 'Telephone patented (1876)', year: 1876, acCode: 'AC9HH9K01' },
    { id: 'ms-tl-27', event: 'Wright Brothers first powered flight (1903)', year: 1903, acCode: 'AC9HH9K02' },
    { id: 'ms-tl-28', event: 'World War I begins (1914)', year: 1914, acCode: 'AC9HH9K02' },
    { id: 'ms-tl-29', event: 'Russian Revolution (1917)', year: 1917, acCode: 'AC9HH9K03' },
    { id: 'ms-tl-30', event: 'World War I ends — Armistice (1918)', year: 1918, acCode: 'AC9HH9K02' },
  ],

  // ----- Senior School -----
  // Y10-12 covers WWII through to contemporary world. Detailed enough to
  // form coherent Modern History rounds.
  senior_school: [
    { id: 'ss-tl-1', event: 'Russian Revolution (1917)', year: 1917, acCode: 'AC9HH10K02' },
    { id: 'ss-tl-2', event: 'Treaty of Versailles (1919)', year: 1919, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-3', event: 'Wall Street Crash — Great Depression begins (1929)', year: 1929, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-4', event: 'Hitler becomes Chancellor of Germany (1933)', year: 1933, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-5', event: 'Spanish Civil War begins (1936)', year: 1936, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-6', event: 'World War II begins (1939)', year: 1939, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-7', event: 'Pearl Harbor attacked (1941)', year: 1941, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-8', event: 'D-Day — Normandy landings (1944)', year: 1944, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-9', event: 'Hiroshima atomic bomb (1945)', year: 1945, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-10', event: 'United Nations founded (1945)', year: 1945, acCode: 'AC9HH10K01' },
    { id: 'ss-tl-11', event: 'Indian independence and partition (1947)', year: 1947, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-12', event: 'State of Israel founded (1948)', year: 1948, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-13', event: 'Universal Declaration of Human Rights adopted (1948)', year: 1948, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-14', event: 'People’s Republic of China founded (1949)', year: 1949, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-15', event: 'Korean War begins (1950)', year: 1950, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-16', event: 'Sputnik launches the Space Race (1957)', year: 1957, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-17', event: 'Cuban Missile Crisis (1962)', year: 1962, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-18', event: 'MLK "I Have a Dream" speech (1963)', year: 1963, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-19', event: '1967 Referendum (Australia)', year: 1967, acCode: 'AC9HH10K04' },
    { id: 'ss-tl-20', event: 'Apollo 11 Moon landing (1969)', year: 1969, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-21', event: 'OPEC oil shock (1973)', year: 1973, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-22', event: 'Whitlam government dismissed (1975)', year: 1975, acCode: 'AC9HH10K04' },
    { id: 'ss-tl-23', event: 'Fall of Saigon — Vietnam War ends (1975)', year: 1975, acCode: 'AC9HH10K02' },
    { id: 'ss-tl-24', event: 'Iranian Revolution (1979)', year: 1979, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-25', event: 'Berlin Wall falls (1989)', year: 1989, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-26', event: 'Tiananmen Square protests (1989)', year: 1989, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-27', event: 'USSR dissolved (1991)', year: 1991, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-28', event: 'Apartheid officially ends in South Africa (1991)', year: 1991, acCode: 'AC9HH10K04' },
    { id: 'ss-tl-29', event: 'Mabo decision (1992)', year: 1992, acCode: 'AC9HH10K04' },
    { id: 'ss-tl-30', event: 'Mandela elected President of South Africa (1994)', year: 1994, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-31', event: 'Kyoto Protocol adopted (1997)', year: 1997, acCode: 'AC9HG10K03' },
    { id: 'ss-tl-32', event: '9/11 attacks (2001)', year: 2001, acCode: 'AC9HH10K03' },
    { id: 'ss-tl-33', event: 'Apology to the Stolen Generations (2008)', year: 2008, acCode: 'AC9HH10K04' },
    { id: 'ss-tl-34', event: 'Paris Agreement on climate (2015)', year: 2015, acCode: 'AC9HG10K03' },
    { id: 'ss-tl-35', event: 'COVID-19 declared a pandemic (2020)', year: 2020, acCode: 'AC9HH10K03' },
  ],
};

// ============================================================
//  FLAGS
// ============================================================

export interface FlagItem {
  id: string;
  flag: string;
  name: string;
  /** Three distractor names for MCQ generation. */
  distractors: string[];
}

export const FLAGS: Record<Stream, FlagItem[]> = {
  // ----- Lower Primary -----
  // Familiar countries from kids' TV, sport, family heritage.
  lower_primary: [
    { id: 'lp-fl-1', flag: '🇦🇺', name: 'Australia', distractors: ['New Zealand', 'United Kingdom', 'United States'] },
    { id: 'lp-fl-2', flag: '🇳🇿', name: 'New Zealand', distractors: ['Australia', 'United Kingdom', 'Canada'] },
    { id: 'lp-fl-3', flag: '🇯🇵', name: 'Japan', distractors: ['South Korea', 'China', 'Vietnam'] },
    { id: 'lp-fl-4', flag: '🇺🇸', name: 'United States', distractors: ['United Kingdom', 'Canada', 'Mexico'] },
    { id: 'lp-fl-5', flag: '🇨🇦', name: 'Canada', distractors: ['United States', 'United Kingdom', 'Australia'] },
    { id: 'lp-fl-6', flag: '🇬🇧', name: 'United Kingdom', distractors: ['Australia', 'New Zealand', 'United States'] },
    { id: 'lp-fl-7', flag: '🇨🇳', name: 'China', distractors: ['Japan', 'South Korea', 'Vietnam'] },
    { id: 'lp-fl-8', flag: '🇫🇷', name: 'France', distractors: ['Italy', 'Spain', 'Germany'] },
    { id: 'lp-fl-9', flag: '🇮🇹', name: 'Italy', distractors: ['France', 'Spain', 'Germany'] },
    { id: 'lp-fl-10', flag: '🇲🇽', name: 'Mexico', distractors: ['Spain', 'Italy', 'Brazil'] },
  ],

  // ----- Upper Primary -----
  // Australia's neighbours + major world economies.
  upper_primary: [
    { id: 'up-fl-1', flag: '🇮🇩', name: 'Indonesia', distractors: ['Malaysia', 'Thailand', 'Philippines'] },
    { id: 'up-fl-2', flag: '🇨🇳', name: 'China', distractors: ['Japan', 'South Korea', 'Vietnam'] },
    { id: 'up-fl-3', flag: '🇫🇷', name: 'France', distractors: ['Italy', 'Spain', 'Germany'] },
    { id: 'up-fl-4', flag: '🇩🇪', name: 'Germany', distractors: ['Belgium', 'Italy', 'France'] },
    { id: 'up-fl-5', flag: '🇮🇹', name: 'Italy', distractors: ['Ireland', 'Mexico', 'France'] },
    { id: 'up-fl-6', flag: '🇧🇷', name: 'Brazil', distractors: ['Argentina', 'Mexico', 'Colombia'] },
    { id: 'up-fl-7', flag: '🇮🇳', name: 'India', distractors: ['Pakistan', 'Bangladesh', 'Sri Lanka'] },
    { id: 'up-fl-8', flag: '🇹🇭', name: 'Thailand', distractors: ['Vietnam', 'Cambodia', 'Laos'] },
    { id: 'up-fl-9', flag: '🇵🇭', name: 'Philippines', distractors: ['Indonesia', 'Vietnam', 'Malaysia'] },
    { id: 'up-fl-10', flag: '🇰🇷', name: 'South Korea', distractors: ['North Korea', 'Japan', 'Vietnam'] },
    { id: 'up-fl-11', flag: '🇪🇸', name: 'Spain', distractors: ['Portugal', 'France', 'Italy'] },
    { id: 'up-fl-12', flag: '🇲🇾', name: 'Malaysia', distractors: ['Singapore', 'Indonesia', 'Thailand'] },
    { id: 'up-fl-13', flag: '🇿🇦', name: 'South Africa', distractors: ['Nigeria', 'Kenya', 'Egypt'] },
    { id: 'up-fl-14', flag: '🇨🇭', name: 'Switzerland', distractors: ['Denmark', 'Austria', 'Liechtenstein'] },
    { id: 'up-fl-15', flag: '🇷🇺', name: 'Russia', distractors: ['Serbia', 'Slovakia', 'Croatia'] },
  ],

  // ----- Middle School -----
  // ASEAN, BRICS, G20-adjacent nations.
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
    { id: 'ms-fl-11', flag: '🇮🇱', name: 'Israel', distractors: ['Greece', 'Argentina', 'Uruguay'] },
    { id: 'ms-fl-12', flag: '🇸🇦', name: 'Saudi Arabia', distractors: ['Iraq', 'Syria', 'UAE'] },
    { id: 'ms-fl-13', flag: '🇰🇭', name: 'Cambodia', distractors: ['Laos', 'Vietnam', 'Thailand'] },
    { id: 'ms-fl-14', flag: '🇳🇱', name: 'Netherlands', distractors: ['Luxembourg', 'Russia', 'France'] },
    { id: 'ms-fl-15', flag: '🇧🇩', name: 'Bangladesh', distractors: ['India', 'Pakistan', 'Sri Lanka'] },
  ],

  // ----- Senior School -----
  // Less obvious flags requiring strategic geographic knowledge.
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
    { id: 'ss-fl-13', flag: '🇪🇹', name: 'Ethiopia', distractors: ['Bolivia', 'Lithuania', 'Cameroon'] },
    { id: 'ss-fl-14', flag: '🇨🇿', name: 'Czech Republic', distractors: ['Russia', 'Slovenia', 'Croatia'] },
    { id: 'ss-fl-15', flag: '🇺🇦', name: 'Ukraine', distractors: ['Sweden', 'Belgium', 'Estonia'] },
  ],
};

// ============================================================
//  LANDMARKS
// ============================================================

export interface LandmarkItem {
  id: string;
  description: string;
  /** Emoji clue paired with description for visual flavour. */
  emoji: string;
  name: string;
  distractors: string[];
}

export const LANDMARKS: Record<Stream, LandmarkItem[]> = {
  // ----- Lower Primary -----
  lower_primary: [
    { id: 'lp-lm-1', description: 'A famous shell-shaped building beside Sydney Harbour.', emoji: '🎭', name: 'Sydney Opera House', distractors: ['Eiffel Tower', 'Big Ben', 'Statue of Liberty'] },
    { id: 'lp-lm-2', description: 'A huge red rock in central Australia, sacred to Aboriginal peoples.', emoji: '🪨', name: 'Uluru', distractors: ['Mt Kosciuszko', 'Great Barrier Reef', 'Twelve Apostles'] },
    { id: 'lp-lm-3', description: 'The world’s largest coral reef, off the coast of Queensland.', emoji: '🐠', name: 'Great Barrier Reef', distractors: ['Uluru', 'Sydney Harbour Bridge', 'Bondi Beach'] },
    { id: 'lp-lm-4', description: 'A famous arched steel bridge in Sydney, nicknamed "the coathanger".', emoji: '🌉', name: 'Sydney Harbour Bridge', distractors: ['Story Bridge', 'Westgate Bridge', 'Bolte Bridge'] },
    { id: 'lp-lm-5', description: 'A row of dramatic limestone stacks rising from the sea in Victoria.', emoji: '🪨', name: 'Twelve Apostles', distractors: ['Great Wall', 'Twelve Tribes', 'Wave Rock'] },
    { id: 'lp-lm-6', description: 'A world-famous Sydney beach with golden sand.', emoji: '🏖️', name: 'Bondi Beach', distractors: ['Manly Beach', 'St Kilda Beach', 'Surfers Paradise'] },
    { id: 'lp-lm-7', description: 'Australia’s highest mainland mountain, in NSW.', emoji: '⛰️', name: 'Mt Kosciuszko', distractors: ['Uluru', 'Mt Everest', 'Mt Beauty'] },
    { id: 'lp-lm-8', description: 'Tropical wetlands and rock art in Australia’s Top End.', emoji: '🐊', name: 'Kakadu', distractors: ['Daintree', 'Tasmania', 'Outback Queensland'] },
  ],

  // ----- Upper Primary -----
  upper_primary: [
    { id: 'up-lm-1', description: 'An iron tower in Paris built for the 1889 World’s Fair.', emoji: '🗼', name: 'Eiffel Tower', distractors: ['Big Ben', 'Tower Bridge', 'Burj Khalifa'] },
    { id: 'up-lm-2', description: 'A statue gifted by France, holding a torch in New York Harbour.', emoji: '🗽', name: 'Statue of Liberty', distractors: ['Christ the Redeemer', 'Statue of Unity', 'Sphinx'] },
    { id: 'up-lm-3', description: 'Ancient stone tombs built for Egyptian pharaohs.', emoji: '🔺', name: 'Pyramids of Giza', distractors: ['Aztec ruins', 'Stonehenge', 'Great Wall'] },
    { id: 'up-lm-4', description: 'A massive defensive wall stretching across northern China.', emoji: '🧱', name: 'Great Wall of China', distractors: ['Berlin Wall', 'Hadrian’s Wall', 'Pyramids'] },
    { id: 'up-lm-5', description: 'A famous clock tower beside the UK Parliament in London.', emoji: '🕰️', name: 'Big Ben', distractors: ['Tower Bridge', 'Eiffel Tower', 'Westminster Abbey'] },
    { id: 'up-lm-6', description: 'A circle of ancient standing stones on Salisbury Plain.', emoji: '🪨', name: 'Stonehenge', distractors: ['Acropolis', 'Petra', 'Easter Island'] },
    { id: 'up-lm-7', description: 'A massive crouching stone lion-bodied figure beside the pyramids.', emoji: '🦁', name: 'Great Sphinx of Giza', distractors: ['Stonehenge', 'Sphinx of Naxos', 'Easter Island moai'] },
    { id: 'up-lm-8', description: 'A vast canyon carved by a river in the southwestern USA.', emoji: '🏞️', name: 'Grand Canyon', distractors: ['Bryce Canyon', 'Death Valley', 'Yosemite'] },
    { id: 'up-lm-9', description: 'Iconic gum-leaf-eating, eucalyptus-forested mountains west of Sydney.', emoji: '⛰️', name: 'Blue Mountains', distractors: ['Snowy Mountains', 'Flinders Ranges', 'Glasshouse Mountains'] },
    { id: 'up-lm-10', description: 'The Hellenic temple complex atop a hill in central Athens.', emoji: '🏛️', name: 'Acropolis', distractors: ['Pantheon', 'Colosseum', 'Roman Forum'] },
    { id: 'up-lm-11', description: 'The Roman amphitheatre famous for gladiator games.', emoji: '🏟️', name: 'Colosseum', distractors: ['Acropolis', 'Pantheon', 'Forum'] },
    { id: 'up-lm-12', description: 'Australia’s longest river, flowing through three states.', emoji: '🚣', name: 'Murray River', distractors: ['Darling River', 'Yarra River', 'Snowy River'] },
  ],

  // ----- Middle School -----
  middle_school: [
    { id: 'ms-lm-1', description: 'An ancient temple on a hill above Athens, Greece.', emoji: '🏛️', name: 'Acropolis', distractors: ['Colosseum', 'Pantheon', 'Forum'] },
    { id: 'ms-lm-2', description: 'A Roman amphitheatre famous for gladiator fights.', emoji: '🏟️', name: 'Colosseum', distractors: ['Acropolis', 'Forum Romanum', 'Pantheon'] },
    { id: 'ms-lm-3', description: 'An Incan citadel high in the Peruvian Andes.', emoji: '🏔️', name: 'Machu Picchu', distractors: ['Chichen Itza', 'Petra', 'Angkor Wat'] },
    { id: 'ms-lm-4', description: 'A vast Cambodian temple complex, the largest religious monument on Earth.', emoji: '🛕', name: 'Angkor Wat', distractors: ['Borobudur', 'Taj Mahal', 'Forbidden City'] },
    { id: 'ms-lm-5', description: 'A white marble mausoleum in India, built for love.', emoji: '🕌', name: 'Taj Mahal', distractors: ['Red Fort', 'Lotus Temple', 'Borobudur'] },
    { id: 'ms-lm-6', description: 'The tallest building in the world, in Dubai.', emoji: '🏙️', name: 'Burj Khalifa', distractors: ['Shanghai Tower', 'Empire State Building', 'Petronas Towers'] },
    { id: 'ms-lm-7', description: 'A rose-red city carved into rock cliffs in Jordan.', emoji: '🏜️', name: 'Petra', distractors: ['Persepolis', 'Palmyra', 'Babylon'] },
    { id: 'ms-lm-8', description: 'The deepest valley in the world, between Tibet and India.', emoji: '🏔️', name: 'Yarlung Tsangpo Canyon', distractors: ['Grand Canyon', 'Copper Canyon', 'Bryce Canyon'] },
    { id: 'ms-lm-9', description: 'The Forbidden City — Chinese imperial palace complex in Beijing.', emoji: '🏯', name: 'Forbidden City', distractors: ['Imperial Palace Tokyo', 'Summer Palace', 'Buckingham Palace'] },
    { id: 'ms-lm-10', description: 'The largest active volcano on Earth, in Hawaii.', emoji: '🌋', name: 'Mauna Loa', distractors: ['Vesuvius', 'Etna', 'Fuji'] },
    { id: 'ms-lm-11', description: 'A 19th-century Romanesque monastery on a French island.', emoji: '🏰', name: 'Mont Saint-Michel', distractors: ['Edinburgh Castle', 'Versailles', 'Neuschwanstein'] },
    { id: 'ms-lm-12', description: 'The world’s largest desert (Antarctica aside) — in northern Africa.', emoji: '🏜️', name: 'Sahara Desert', distractors: ['Gobi Desert', 'Atacama Desert', 'Arabian Desert'] },
  ],

  // ----- Senior School -----
  senior_school: [
    { id: 'ss-lm-1', description: 'A Brazilian Art Deco statue of Christ atop Corcovado Mountain.', emoji: '✝️', name: 'Christ the Redeemer', distractors: ['Sugarloaf Mountain', 'Maracana', 'Easter Island moai'] },
    { id: 'ss-lm-2', description: 'The official Russian fortress and seat of power in Moscow.', emoji: '🏰', name: 'Kremlin', distractors: ['Hermitage', 'Red Square', 'Winter Palace'] },
    { id: 'ss-lm-3', description: 'Iconic stone heads on a remote Pacific island.', emoji: '🗿', name: 'Easter Island moai', distractors: ['Stonehenge', 'Angkor', 'Borobudur'] },
    { id: 'ss-lm-4', description: 'A vast UNESCO site of Mayan ruins in Mexico.', emoji: '🛕', name: 'Chichen Itza', distractors: ['Tikal', 'Machu Picchu', 'Teotihuacan'] },
    { id: 'ss-lm-5', description: 'A glass-and-steel pyramid in the courtyard of the Louvre, Paris.', emoji: '🔺', name: 'Louvre Pyramid', distractors: ['Eiffel Tower', 'Arc de Triomphe', 'Sacré-Cœur'] },
    { id: 'ss-lm-6', description: 'A sacred Buddhist temple in central Java.', emoji: '🛕', name: 'Borobudur', distractors: ['Angkor Wat', 'Shwedagon Pagoda', 'Taj Mahal'] },
    { id: 'ss-lm-7', description: 'A salt flat in Bolivia so flat the sky reflects on it.', emoji: '🪞', name: 'Salar de Uyuni', distractors: ['Atacama Desert', 'Lake Titicaca', 'Iguazu Falls'] },
    { id: 'ss-lm-8', description: 'The world’s tallest waterfall, in Venezuela.', emoji: '💧', name: 'Angel Falls', distractors: ['Iguazu Falls', 'Niagara Falls', 'Victoria Falls'] },
    { id: 'ss-lm-9', description: 'A vast geological scar in central Australia, second-largest meteorite crater.', emoji: '🪨', name: 'Wolfe Creek Crater', distractors: ['Lake Eyre', 'Devils Marbles', 'Bungle Bungles'] },
    { id: 'ss-lm-10', description: 'A 1991 modernist museum on the Spanish coast designed by Frank Gehry.', emoji: '🏛️', name: 'Guggenheim Bilbao', distractors: ['Sagrada Familia', 'Tate Modern', 'Pompidou Centre'] },
    { id: 'ss-lm-11', description: 'The seat of Australia’s federal parliament since 1988.', emoji: '🏛️', name: 'Parliament House (Canberra)', distractors: ['Old Parliament House', 'Government House', 'War Memorial'] },
    { id: 'ss-lm-12', description: 'The world’s largest particle accelerator, beneath the Franco-Swiss border.', emoji: '⚛️', name: 'CERN Large Hadron Collider', distractors: ['ITER', 'Fermilab', 'Wendelstein 7-X'] },
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

// ============================================================
//  MAP PIN — Australian states/territories
// ============================================================

export interface MapItem {
  id: string;
  /** Region key matched against the SVG paths in the Australia map. */
  region: 'NSW' | 'VIC' | 'QLD' | 'SA' | 'WA' | 'TAS' | 'NT' | 'ACT';
  /** Question text — "Click NSW" or "Where is Darwin?" */
  prompt: string;
  hint?: string;
}

export const MAP_AUSTRALIA: MapItem[] = [
  // ----- States & territories direct -----
  { id: 'm-nsw', region: 'NSW', prompt: 'Click on New South Wales (NSW)' },
  { id: 'm-vic', region: 'VIC', prompt: 'Click on Victoria (VIC)' },
  { id: 'm-qld', region: 'QLD', prompt: 'Click on Queensland (QLD)' },
  { id: 'm-sa', region: 'SA', prompt: 'Click on South Australia (SA)' },
  { id: 'm-wa', region: 'WA', prompt: 'Click on Western Australia (WA)' },
  { id: 'm-tas', region: 'TAS', prompt: 'Click on Tasmania (TAS)' },
  { id: 'm-nt', region: 'NT', prompt: 'Click on the Northern Territory (NT)' },
  { id: 'm-act', region: 'ACT', prompt: 'Click on the Australian Capital Territory (ACT)' },

  // ----- Capital cities -----
  { id: 'c-darwin', region: 'NT', prompt: 'Which state or territory contains Darwin?', hint: 'Top End' },
  { id: 'c-sydney', region: 'NSW', prompt: 'Which state contains Sydney?' },
  { id: 'c-melbourne', region: 'VIC', prompt: 'Which state contains Melbourne?' },
  { id: 'c-brisbane', region: 'QLD', prompt: 'Which state contains Brisbane?' },
  { id: 'c-perth', region: 'WA', prompt: 'Which state contains Perth?' },
  { id: 'c-adelaide', region: 'SA', prompt: 'Which state contains Adelaide?' },
  { id: 'c-hobart', region: 'TAS', prompt: 'Which state contains Hobart?' },
  { id: 'c-canberra', region: 'ACT', prompt: 'Which territory contains Canberra?' },

  // ----- Landmarks -----
  { id: 'l-uluru', region: 'NT', prompt: 'In which state/territory is Uluru?', hint: 'The Red Centre' },
  { id: 'l-reef', region: 'QLD', prompt: 'Off which state lies the Great Barrier Reef?' },
  { id: 'l-blue-mountains', region: 'NSW', prompt: 'In which state are the Blue Mountains?' },
  { id: 'l-twelve-apostles', region: 'VIC', prompt: 'Off which state’s coast are the Twelve Apostles?' },
  { id: 'l-mona', region: 'TAS', prompt: 'In which state is MONA (the Museum of Old and New Art)?' },
  { id: 'l-kakadu', region: 'NT', prompt: 'Which state/territory contains Kakadu National Park?', hint: 'Top End' },
  { id: 'l-kosciuszko', region: 'NSW', prompt: 'In which state is Mt Kosciuszko (mainland Australia’s highest peak)?' },
  { id: 'l-flinders', region: 'SA', prompt: 'Which state contains the Flinders Ranges?' },
  { id: 'l-margaret-river', region: 'WA', prompt: 'In which state is the Margaret River wine region?' },
  { id: 'l-cradle-mountain', region: 'TAS', prompt: 'In which state is Cradle Mountain?' },
  { id: 'l-great-ocean-rd', region: 'VIC', prompt: 'In which state is the Great Ocean Road?' },

  // ----- Other notable features -----
  { id: 'l-snowy', region: 'NSW', prompt: 'Which state contains most of the Snowy Mountains?' },
  { id: 'l-ningaloo', region: 'WA', prompt: 'Which state is home to Ningaloo Reef?' },
  { id: 'l-katherine', region: 'NT', prompt: 'In which territory is Katherine Gorge (Nitmiluk)?' },
  { id: 'l-glasshouse', region: 'QLD', prompt: 'Which state contains the Glasshouse Mountains?' },
  { id: 'l-barossa', region: 'SA', prompt: 'In which state is the Barossa Valley wine region?' },
];
