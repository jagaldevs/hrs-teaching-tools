import type { Stream } from '../games';

/**
 * Timeline presets for the Timeline Builder tool.
 *
 * Presets are grouped by AC V9 stream so teachers can find an age-appropriate
 * starting point. Each event has an optional note that surfaces both as a
 * tooltip on the timeline marker and underneath the event in the list view.
 *
 * Authoring notes:
 *   - Lower primary timelines stay within living/recent memory and emphasise
 *     concrete, visible Australian landmarks and inventions (AC V9 HASS F–Y2).
 *   - Upper primary timelines cover Australia's pre-Federation colonies,
 *     First Nations history and nation-building (AC V9 HASS Y3–Y6).
 *   - Middle school timelines span Ancient, Medieval/Early Modern and Industry
 *     → WWII to mirror the Y7–Y10 World History sequence.
 *   - Senior timelines cover the 20th century in depth plus civil rights and
 *     modern Australia in the world (AC V9 Modern History electives).
 */

export interface TimelineEvent {
  id: string;
  year: number;
  label: string;
  note?: string;
}

export interface TimelinePreset {
  id: string;
  label: string;
  /** Stream this preset is authored for. `null` = applies to any stream. */
  stream: Stream | null;
  rangeStart: number;
  rangeEnd: number;
  events: TimelineEvent[];
}

export const TIMELINE_PRESETS: TimelinePreset[] = [
  // ---------------- Lower Primary ----------------
  {
    id: 'lp-australian-icons',
    label: 'Australian icons & symbols',
    stream: 'lower_primary',
    rangeStart: 1850,
    rangeEnd: 2025,
    events: [
      { id: 'lp-icons-1', year: 1854, label: 'Eureka flag flies', note: 'Miners on the Victorian goldfields raise the Southern Cross flag.' },
      { id: 'lp-icons-2', year: 1901, label: 'Australian flag chosen', note: 'A national flag competition pulls in over 30,000 entries.' },
      { id: 'lp-icons-3', year: 1908, label: 'Coat of arms granted', note: 'Kangaroo and emu — animals that don’t step backwards.' },
      { id: 'lp-icons-4', year: 1932, label: 'Sydney Harbour Bridge opens', note: 'The “Coathanger” is finished after eight years of work.' },
      { id: 'lp-icons-5', year: 1973, label: 'Sydney Opera House opens', note: 'Queen Elizabeth II opens the white-sailed concert hall.' },
      { id: 'lp-icons-6', year: 1984, label: 'Advance Australia Fair chosen', note: 'Voted in as the new national anthem.' },
      { id: 'lp-icons-7', year: 1995, label: 'Aboriginal flag proclaimed', note: 'Officially recognised as a flag of Australia.' },
      { id: 'lp-icons-8', year: 2000, label: 'Sydney Olympics', note: 'Cathy Freeman lights the cauldron and wins 400 m gold.' },
    ],
  },
  {
    id: 'lp-school-then-now',
    label: 'School then & now',
    stream: 'lower_primary',
    rangeStart: 1900,
    rangeEnd: 2025,
    events: [
      { id: 'lp-school-1', year: 1900, label: 'Slate boards', note: 'Children wrote on slate with chalk and rubbed it out with a cloth.' },
      { id: 'lp-school-2', year: 1920, label: 'Ink pens', note: 'Pens were dipped in inkwells built into the desks.' },
      { id: 'lp-school-3', year: 1950, label: 'School radio lessons', note: 'Country kids learned by radio through the ABC.' },
      { id: 'lp-school-4', year: 1980, label: 'Cassette tapes & overhead projectors', note: 'Listening centres and roll-down projector screens.' },
      { id: 'lp-school-5', year: 1995, label: 'First school computers', note: 'A handful of computers shared between every classroom.' },
      { id: 'lp-school-6', year: 2010, label: 'Interactive whiteboards', note: 'Touchscreens replace chalkboards in many rooms.' },
      { id: 'lp-school-7', year: 2020, label: 'Learning at home', note: 'Many students learned from home during the pandemic.' },
      { id: 'lp-school-8', year: 2024, label: 'AI helpers', note: 'Smart assistants start to appear in classrooms.' },
    ],
  },
  {
    id: 'lp-aussie-inventions',
    label: 'Aussie inventions',
    stream: 'lower_primary',
    rangeStart: 1850,
    rangeEnd: 2025,
    events: [
      { id: 'lp-inv-1', year: 1879, label: 'Refrigerator', note: 'James Harrison’s ice machine kept food cold.' },
      { id: 'lp-inv-2', year: 1906, label: 'Surf reel', note: 'The reel for life-saving on Sydney beaches.' },
      { id: 'lp-inv-3', year: 1926, label: 'Vegemite', note: 'A salty spread made from leftover brewer’s yeast.' },
      { id: 'lp-inv-4', year: 1928, label: 'Royal Flying Doctor Service', note: 'Bringing doctors to the outback by plane.' },
      { id: 'lp-inv-5', year: 1965, label: 'Black box flight recorder', note: 'Invented by David Warren to help understand plane crashes.' },
      { id: 'lp-inv-6', year: 1992, label: 'Wi-Fi technology', note: 'CSIRO scientists develop the key Wi-Fi patent.' },
      { id: 'lp-inv-7', year: 1999, label: 'Cochlear implant', note: 'Australian-made hearing implant helps people hear.' },
      { id: 'lp-inv-8', year: 2014, label: 'Solar paint', note: 'Australian researchers make paint that turns sunlight into power.' },
    ],
  },

  // ---------------- Upper Primary ----------------
  {
    id: 'up-first-nations',
    label: 'First Nations & first contact',
    stream: 'upper_primary',
    rangeStart: 1600,
    rangeEnd: 2025,
    events: [
      { id: 'up-fn-1', year: 1606, label: 'Janszoon reaches Cape York', note: 'Dutch captain Willem Janszoon makes the first recorded European landing.' },
      { id: 'up-fn-2', year: 1770, label: 'Cook claims east coast', note: 'James Cook charts the east coast and claims it for Britain.' },
      { id: 'up-fn-3', year: 1788, label: 'First Fleet arrives', note: 'Eleven British ships establish a penal colony at Sydney Cove.' },
      { id: 'up-fn-4', year: 1838, label: 'Myall Creek massacre', note: 'A turning point: colonists are convicted for killing Aboriginal people.' },
      { id: 'up-fn-5', year: 1869, label: 'Stolen Generations begins', note: 'Victorian law allows Aboriginal children to be removed from families.' },
      { id: 'up-fn-6', year: 1967, label: 'Referendum success', note: '90% of Australians vote to count Aboriginal people in the census.' },
      { id: 'up-fn-7', year: 1972, label: 'Tent Embassy', note: 'Aboriginal activists set up the Tent Embassy outside Parliament.' },
      { id: 'up-fn-8', year: 1992, label: 'Mabo decision', note: 'High Court rejects terra nullius and recognises native title.' },
      { id: 'up-fn-9', year: 2008, label: 'Apology to Stolen Generations', note: 'PM Kevin Rudd says “Sorry” in Parliament.' },
      { id: 'up-fn-10', year: 2017, label: 'Uluru Statement from the Heart', note: 'First Nations leaders call for a Voice to Parliament.' },
    ],
  },
  {
    id: 'up-colonies',
    label: 'Australian colonies (1788–1901)',
    stream: 'upper_primary',
    rangeStart: 1780,
    rangeEnd: 1910,
    events: [
      { id: 'up-col-1', year: 1788, label: 'First Fleet arrives', note: 'Penal colony established at Sydney Cove.' },
      { id: 'up-col-2', year: 1803, label: 'Hobart founded', note: 'Second British colony established in Van Diemen’s Land.' },
      { id: 'up-col-3', year: 1813, label: 'Blue Mountains crossed', note: 'Blaxland, Lawson and Wentworth find a path west.' },
      { id: 'up-col-4', year: 1829, label: 'Swan River Colony', note: 'Perth established as a free colony.' },
      { id: 'up-col-5', year: 1835, label: 'Melbourne founded', note: 'John Batman “buys” land from the Wurundjeri.' },
      { id: 'up-col-6', year: 1851, label: 'Gold discovered', note: 'Rushes in NSW and Victoria triple the population in ten years.' },
      { id: 'up-col-7', year: 1854, label: 'Eureka Stockade', note: 'Miners revolt against the gold licence; a step toward democracy.' },
      { id: 'up-col-8', year: 1856, label: 'Secret ballot introduced', note: 'Victoria pioneers what becomes the “Australian ballot” worldwide.' },
      { id: 'up-col-9', year: 1868, label: 'Last convicts arrive', note: 'The final convict ship docks in Western Australia.' },
      { id: 'up-col-10', year: 1880, label: 'Ned Kelly captured', note: 'Bushranger Ned Kelly taken at Glenrowan.' },
      { id: 'up-col-11', year: 1901, label: 'Federation', note: 'Six colonies become the Commonwealth of Australia.' },
    ],
  },
  {
    id: 'up-federation-to-now',
    label: 'Federation to today',
    stream: 'upper_primary',
    rangeStart: 1900,
    rangeEnd: 2025,
    events: [
      { id: 'up-fed-1', year: 1901, label: 'Federation', note: 'The Commonwealth of Australia comes into being on 1 January.' },
      { id: 'up-fed-2', year: 1902, label: 'Women vote federally', note: 'Australia becomes the second country (after NZ) to give women the vote.' },
      { id: 'up-fed-3', year: 1915, label: 'Gallipoli landing', note: 'ANZACs land at Gallipoli on 25 April.' },
      { id: 'up-fed-4', year: 1927, label: 'Canberra opens', note: 'Parliament moves from Melbourne to the new capital.' },
      { id: 'up-fed-5', year: 1942, label: 'Darwin bombed', note: 'Japanese aircraft attack northern Australia during WWII.' },
      { id: 'up-fed-6', year: 1956, label: 'Melbourne Olympics', note: 'First Olympic Games held in the Southern Hemisphere.' },
      { id: 'up-fed-7', year: 1967, label: 'Referendum', note: 'Australians vote to count Aboriginal people in the census.' },
      { id: 'up-fed-8', year: 1975, label: 'The Dismissal', note: 'Governor-General sacks PM Gough Whitlam.' },
      { id: 'up-fed-9', year: 1992, label: 'Mabo decision', note: 'High Court recognises native title.' },
      { id: 'up-fed-10', year: 2000, label: 'Sydney Olympics', note: 'Australia hosts the Games of the new millennium.' },
      { id: 'up-fed-11', year: 2008, label: 'Apology', note: 'PM Rudd apologises to the Stolen Generations.' },
      { id: 'up-fed-12', year: 2020, label: 'COVID-19 pandemic', note: 'Borders close; Australians work and learn from home.' },
    ],
  },

  // ---------------- Middle School ----------------
  {
    id: 'ms-ancient-world',
    label: 'Ancient world',
    stream: 'middle_school',
    rangeStart: -3500,
    rangeEnd: 500,
    events: [
      { id: 'ms-anc-1', year: -3100, label: 'Egypt unified', note: 'Upper and Lower Egypt united; hieroglyphic writing develops.' },
      { id: 'ms-anc-2', year: -2560, label: 'Great Pyramid built', note: 'Pyramid of Khufu rises at Giza.' },
      { id: 'ms-anc-3', year: -1750, label: 'Code of Hammurabi', note: 'Babylonian king publishes one of the earliest written law codes.' },
      { id: 'ms-anc-4', year: -776, label: 'First Olympic Games', note: 'Held at Olympia in honour of Zeus.' },
      { id: 'ms-anc-5', year: -753, label: 'Rome founded', note: 'Traditional date for the founding of the city.' },
      { id: 'ms-anc-6', year: -509, label: 'Roman Republic begins', note: 'Last Tarquin king is expelled.' },
      { id: 'ms-anc-7', year: -490, label: 'Battle of Marathon', note: 'Athenians defeat the Persian invasion.' },
      { id: 'ms-anc-8', year: -336, label: 'Alexander becomes king', note: 'Begins conquests that stretch from Greece to India.' },
      { id: 'ms-anc-9', year: -221, label: 'Qin unifies China', note: 'First Emperor standardises script, currency and measures.' },
      { id: 'ms-anc-10', year: -44, label: 'Caesar assassinated', note: 'Stabbed on the Ides of March, ending republican Rome.' },
      { id: 'ms-anc-11', year: -27, label: 'Augustus first emperor', note: 'Pax Romana begins.' },
      { id: 'ms-anc-12', year: 79, label: 'Vesuvius erupts', note: 'Pompeii and Herculaneum buried in ash.' },
      { id: 'ms-anc-13', year: 313, label: 'Edict of Milan', note: 'Christianity legalised in the Roman Empire.' },
      { id: 'ms-anc-14', year: 476, label: 'Fall of Western Rome', note: 'Romulus Augustulus deposed; the western empire ends.' },
    ],
  },
  {
    id: 'ms-medieval-modern',
    label: 'Medieval & early modern',
    stream: 'middle_school',
    rangeStart: 500,
    rangeEnd: 1750,
    events: [
      { id: 'ms-med-1', year: 622, label: 'Hijra', note: 'Muhammad migrates from Mecca to Medina; Islamic calendar begins.' },
      { id: 'ms-med-2', year: 793, label: 'Viking raid at Lindisfarne', note: 'Considered the start of the Viking Age in Britain.' },
      { id: 'ms-med-3', year: 800, label: 'Charlemagne crowned', note: 'Crowned Emperor of the Romans by Pope Leo III.' },
      { id: 'ms-med-4', year: 1066, label: 'Norman Conquest', note: 'William of Normandy wins the Battle of Hastings.' },
      { id: 'ms-med-5', year: 1206, label: 'Genghis Khan unites Mongols', note: 'Beginning of the largest contiguous empire in history.' },
      { id: 'ms-med-6', year: 1215, label: 'Magna Carta', note: 'English barons force King John to limit royal power.' },
      { id: 'ms-med-7', year: 1271, label: 'Marco Polo sets out', note: 'Venetian merchant travels the Silk Road to China.' },
      { id: 'ms-med-8', year: 1347, label: 'Black Death reaches Europe', note: 'Bubonic plague kills perhaps a third of Europe’s people.' },
      { id: 'ms-med-9', year: 1453, label: 'Fall of Constantinople', note: 'Ottoman conquest ends the Byzantine Empire.' },
      { id: 'ms-med-10', year: 1492, label: 'Columbus reaches Americas', note: 'Spanish-funded voyage begins European colonisation of the Americas.' },
      { id: 'ms-med-11', year: 1517, label: 'Reformation', note: 'Martin Luther posts his Ninety-five Theses.' },
      { id: 'ms-med-12', year: 1543, label: 'Heliocentric model', note: 'Copernicus argues the Earth orbits the Sun.' },
      { id: 'ms-med-13', year: 1605, label: 'Gunpowder Plot', note: 'Guy Fawkes caught beneath the English Parliament.' },
      { id: 'ms-med-14', year: 1687, label: 'Newton’s Principia', note: 'Laws of motion and universal gravitation published.' },
    ],
  },
  {
    id: 'ms-industry-to-wwii',
    label: 'Industry, war & modern world',
    stream: 'middle_school',
    rangeStart: 1750,
    rangeEnd: 2000,
    events: [
      { id: 'ms-ind-1', year: 1769, label: 'Watt steam engine', note: 'Improved steam engine launches the Industrial Revolution.' },
      { id: 'ms-ind-2', year: 1789, label: 'French Revolution', note: 'Storming of the Bastille on 14 July.' },
      { id: 'ms-ind-3', year: 1825, label: 'First public railway', note: 'Stockton & Darlington Railway opens in England.' },
      { id: 'ms-ind-4', year: 1859, label: 'On the Origin of Species', note: 'Darwin publishes his theory of evolution by natural selection.' },
      { id: 'ms-ind-5', year: 1876, label: 'Telephone patented', note: 'Alexander Graham Bell’s talking machine.' },
      { id: 'ms-ind-6', year: 1903, label: 'First powered flight', note: 'Wright Brothers fly for 12 seconds at Kitty Hawk.' },
      { id: 'ms-ind-7', year: 1914, label: 'WWI begins', note: 'Assassination of Archduke Franz Ferdinand triggers war.' },
      { id: 'ms-ind-8', year: 1917, label: 'Russian Revolution', note: 'Bolsheviks overthrow the Tsar; Soviet Union takes shape.' },
      { id: 'ms-ind-9', year: 1929, label: 'Wall Street crash', note: 'Start of the Great Depression.' },
      { id: 'ms-ind-10', year: 1939, label: 'WWII begins', note: 'Germany invades Poland; Britain and France declare war.' },
      { id: 'ms-ind-11', year: 1945, label: 'WWII ends', note: 'Atomic bombs dropped on Hiroshima and Nagasaki; Japan surrenders.' },
      { id: 'ms-ind-12', year: 1969, label: 'Apollo 11 Moon landing', note: 'Neil Armstrong and Buzz Aldrin walk on the Moon.' },
      { id: 'ms-ind-13', year: 1989, label: 'Berlin Wall falls', note: 'Symbolic end of the Cold War divide in Europe.' },
      { id: 'ms-ind-14', year: 1991, label: 'USSR dissolved', note: 'Soviet Union breaks into fifteen republics.' },
    ],
  },

  // ---------------- Senior ----------------
  {
    id: 'ss-c20',
    label: 'The 20th century',
    stream: 'senior_school',
    rangeStart: 1900,
    rangeEnd: 2000,
    events: [
      { id: 'ss-c20-1', year: 1905, label: 'Einstein’s annus mirabilis', note: 'Special relativity, the photoelectric effect and Brownian motion published.' },
      { id: 'ss-c20-2', year: 1914, label: 'WWI begins' },
      { id: 'ss-c20-3', year: 1917, label: 'Russian Revolution', note: 'Bolsheviks seize power in October.' },
      { id: 'ss-c20-4', year: 1918, label: 'WWI ends' },
      { id: 'ss-c20-5', year: 1929, label: 'Wall Street crash', note: 'Triggers the Great Depression.' },
      { id: 'ss-c20-6', year: 1939, label: 'WWII begins' },
      { id: 'ss-c20-7', year: 1945, label: 'WWII ends', note: 'United Nations founded later that year.' },
      { id: 'ss-c20-8', year: 1947, label: 'Indian independence', note: 'Partition of India and Pakistan.' },
      { id: 'ss-c20-9', year: 1948, label: 'UDHR signed', note: 'Universal Declaration of Human Rights adopted by the UN.' },
      { id: 'ss-c20-10', year: 1949, label: 'PRC founded', note: 'Mao Zedong proclaims the People’s Republic of China.' },
      { id: 'ss-c20-11', year: 1957, label: 'Sputnik launched', note: 'First artificial satellite; the Space Race begins.' },
      { id: 'ss-c20-12', year: 1962, label: 'Cuban Missile Crisis', note: 'The Cold War’s closest brush with nuclear war.' },
      { id: 'ss-c20-13', year: 1969, label: 'Apollo 11 Moon landing' },
      { id: 'ss-c20-14', year: 1973, label: 'OPEC oil shock', note: 'Global recession and the end of cheap oil.' },
      { id: 'ss-c20-15', year: 1989, label: 'Berlin Wall falls' },
      { id: 'ss-c20-16', year: 1991, label: 'USSR dissolves' },
      { id: 'ss-c20-17', year: 1994, label: 'Mandela elected', note: 'First multi-racial elections in South Africa.' },
    ],
  },
  {
    id: 'ss-civil-rights',
    label: 'Civil rights & social change',
    stream: 'senior_school',
    rangeStart: 1890,
    rangeEnd: 2025,
    events: [
      { id: 'ss-cr-1', year: 1893, label: 'NZ women vote', note: 'New Zealand the first self-governing country to grant women suffrage.' },
      { id: 'ss-cr-2', year: 1902, label: 'White Australian women vote federally', note: 'Aboriginal women excluded until 1962.' },
      { id: 'ss-cr-3', year: 1948, label: 'UDHR adopted', note: 'Universal Declaration of Human Rights.' },
      { id: 'ss-cr-4', year: 1955, label: 'Rosa Parks arrested', note: 'Sparks the Montgomery Bus Boycott.' },
      { id: 'ss-cr-5', year: 1962, label: 'Indigenous Australians vote', note: 'Commonwealth Electoral Act amended.' },
      { id: 'ss-cr-6', year: 1963, label: '“I Have a Dream”', note: 'Martin Luther King Jr at the March on Washington.' },
      { id: 'ss-cr-7', year: 1965, label: 'Voting Rights Act (US)' },
      { id: 'ss-cr-8', year: 1967, label: 'Australian referendum', note: 'Aboriginal people counted in the census.' },
      { id: 'ss-cr-9', year: 1975, label: 'Racial Discrimination Act (Aus)' },
      { id: 'ss-cr-10', year: 1984, label: 'Sex Discrimination Act (Aus)' },
      { id: 'ss-cr-11', year: 1992, label: 'Mabo decision', note: 'High Court overturns terra nullius.' },
      { id: 'ss-cr-12', year: 2008, label: 'Apology to Stolen Generations' },
      { id: 'ss-cr-13', year: 2017, label: 'Marriage equality (Aus)', note: 'Postal survey backs same-sex marriage; law passed in December.' },
      { id: 'ss-cr-14', year: 2017, label: 'Uluru Statement', note: 'First Nations leaders call for Voice, Treaty, Truth.' },
      { id: 'ss-cr-15', year: 2023, label: 'Voice referendum', note: 'Proposed constitutional Voice to Parliament not approved.' },
    ],
  },
  {
    id: 'ss-modern-australia',
    label: 'Modern Australia in the world',
    stream: 'senior_school',
    rangeStart: 1945,
    rangeEnd: 2025,
    events: [
      { id: 'ss-ma-1', year: 1945, label: 'UN founded', note: 'Australia is a founding member.' },
      { id: 'ss-ma-2', year: 1947, label: 'Snowy Mountains Scheme begins', note: 'Massive post-war hydro-electric project.' },
      { id: 'ss-ma-3', year: 1951, label: 'ANZUS Treaty', note: 'Security pact with the United States and New Zealand.' },
      { id: 'ss-ma-4', year: 1962, label: 'Vietnam advisers deployed' },
      { id: 'ss-ma-5', year: 1972, label: 'China recognised', note: 'Whitlam government opens diplomatic relations with the PRC.' },
      { id: 'ss-ma-6', year: 1973, label: 'White Australia Policy ends', note: 'Whitlam government removes race-based migration.' },
      { id: 'ss-ma-7', year: 1975, label: 'Vietnam withdrawal complete' },
      { id: 'ss-ma-8', year: 1983, label: 'America’s Cup won', note: 'Australia II ends the New York Yacht Club’s 132-year run.' },
      { id: 'ss-ma-9', year: 1992, label: 'Native Title Act passed' },
      { id: 'ss-ma-10', year: 1999, label: 'INTERFET in East Timor', note: 'Australia leads UN peacekeeping intervention.' },
      { id: 'ss-ma-11', year: 2001, label: 'Tampa affair & 9/11', note: 'Border policy and the War on Terror reshape Australian politics.' },
      { id: 'ss-ma-12', year: 2014, label: 'China FTA signed' },
      { id: 'ss-ma-13', year: 2020, label: 'COVID-19 pandemic', note: 'National Cabinet formed; borders close.' },
      { id: 'ss-ma-14', year: 2021, label: 'AUKUS announced', note: 'Trilateral security partnership with US and UK.' },
    ],
  },

  // ---------------- Blank ----------------
  {
    id: 'blank',
    label: 'Blank timeline',
    stream: null,
    rangeStart: 0,
    rangeEnd: 2025,
    events: [],
  },
];

export const STREAM_LABELS: Record<Stream, string> = {
  lower_primary: 'Lower Primary',
  upper_primary: 'Upper Primary',
  middle_school: 'Middle School',
  senior_school: 'Senior School',
};
