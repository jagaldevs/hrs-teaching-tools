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

