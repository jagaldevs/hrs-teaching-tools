import {
  Zap,
  CircleSlash2,
  ArrowUpDown,
  HelpCircle,
  Bell,
  Shuffle,
  Link2,
  ArrowLeftRight,
  Mic2,
  BookA,
  ListOrdered,
  Calculator,
  Equal,
  Sparkles,
  Scale,
  KeyRound,
  GitBranch,
  MapPin,
  Flag,
  Eye,
  Mountain,
  UserSquare2,
  Scale3d,
  Brain,
  MessageCircleQuestion,
  type LucideIcon,
} from 'lucide-react';

export type Stream = 'lower_primary' | 'upper_primary' | 'middle_school' | 'senior_school';

export const STREAMS: { id: Stream; label: string; years: string }[] = [
  { id: 'lower_primary', label: 'Lower Primary', years: 'Foundation – Year 2' },
  { id: 'upper_primary', label: 'Upper Primary', years: 'Year 3 – Year 6' },
  { id: 'middle_school', label: 'Middle School', years: 'Year 7 – Year 9' },
  { id: 'senior_school', label: 'Senior School', years: 'Year 10 – Year 12' },
];

export type GameGroup = 'rapid' | 'language' | 'logic' | 'hass' | 'whole-class';

export const GAME_GROUPS: { id: GameGroup; label: string; description: string }[] = [
  { id: 'rapid', label: 'Quick & Energetic', description: '90 seconds to 3 minutes — perfect lesson openers and brain breaks.' },
  { id: 'language', label: 'Word & Language', description: 'Vocabulary, spelling and English skills made playful.' },
  { id: 'logic', label: 'Number & Logic', description: 'Maths fluency and problem-solving under gentle pressure.' },
  { id: 'hass', label: 'History & Geography', description: 'HASS knowledge through maps, timelines and clues.' },
  { id: 'whole-class', label: 'Whole-Class Energiser', description: 'Get everyone moving, talking and laughing.' },
];

export interface Game {
  id: string;
  name: string;
  group: GameGroup;
  description: string;
  icon: LucideIcon;
  streams: Stream[];
  subjects: ('english' | 'maths' | 'history' | 'geography' | 'science' | 'general')[];
  durationMin: number;
}

const ALL_STREAMS: Stream[] = ['lower_primary', 'upper_primary', 'middle_school', 'senior_school'];

export const GAMES: Game[] = [
  // -------- Quick & energetic --------
  {
    id: 'quick-quiz',
    name: 'Quick Quiz',
    group: 'rapid',
    description: 'Multiple-choice questions across English, Maths, History, Geography and Science. AC V9-aligned.',
    icon: Zap,
    streams: ALL_STREAMS,
    subjects: ['english', 'maths', 'history', 'geography', 'science'],
    durationMin: 3,
  },
  {
    id: 'odd-one-out',
    name: 'Odd One Out',
    group: 'rapid',
    description: 'Four items, one outlier. Tag the misfit and justify why.',
    icon: CircleSlash2,
    streams: ALL_STREAMS,
    subjects: ['english', 'maths', 'history', 'geography', 'science'],
    durationMin: 2,
  },
  {
    id: 'higher-or-lower',
    name: 'Higher or Lower',
    group: 'rapid',
    description: 'Numbers, years, populations, scientific constants — students predict the next reveal. Filter by subject for themed rounds.',
    icon: ArrowUpDown,
    streams: ALL_STREAMS,
    subjects: ['maths', 'history', 'geography', 'science', 'general'],
    durationMin: 3,
  },
  {
    id: 'two-truths-one-lie',
    name: 'Two Truths and a Lie',
    group: 'rapid',
    description: 'Three statements appear. Class debates which is the falsehood.',
    icon: HelpCircle,
    streams: ['upper_primary', 'middle_school', 'senior_school'],
    subjects: ['history', 'science', 'geography'],
    durationMin: 3,
  },
  {
    id: 'buzzer-round',
    name: 'Buzzer Round',
    group: 'rapid',
    description: 'Teams race to buzz on AC V9 questions across all five subjects. Teacher controls the round.',
    icon: Bell,
    streams: ALL_STREAMS,
    subjects: ['english', 'maths', 'history', 'geography', 'science'],
    durationMin: 5,
  },

  // -------- Word & language --------
  {
    id: 'anagram-race',
    name: 'Anagram Race',
    group: 'language',
    description: 'Unscramble words against the clock. Vocabulary scales per stream.',
    icon: Shuffle,
    streams: ALL_STREAMS,
    subjects: ['english'],
    durationMin: 3,
  },
  {
    id: 'word-chain',
    name: 'Word Chain',
    group: 'language',
    description: 'Each word starts with the last letter of the previous. Themed categories.',
    icon: Link2,
    streams: ALL_STREAMS,
    subjects: ['english'],
    durationMin: 4,
  },
  {
    id: 'synonym-antonym',
    name: 'Synonym & Antonym Sprint',
    group: 'language',
    description: 'Pick the matching synonym or antonym before time runs out.',
    icon: ArrowLeftRight,
    streams: ['upper_primary', 'middle_school', 'senior_school'],
    subjects: ['english'],
    durationMin: 2,
  },
  {
    id: 'spelling-bee',
    name: 'Spelling Bee',
    group: 'language',
    description: 'Text-to-speech reads the word. Students type or write — auto-marked.',
    icon: Mic2,
    streams: ALL_STREAMS,
    subjects: ['english'],
    durationMin: 5,
  },
  {
    id: 'define-it',
    name: 'Define It',
    group: 'language',
    description: 'Guess the word from its definition. Letters reveal one at a time as hints.',
    icon: BookA,
    streams: ['upper_primary', 'middle_school', 'senior_school'],
    subjects: ['english'],
    durationMin: 3,
  },
  {
    id: 'categories',
    name: 'Categories',
    group: 'language',
    description: 'Random letter plus five categories. Sixty seconds to list one item per category.',
    icon: ListOrdered,
    streams: ['upper_primary', 'middle_school', 'senior_school'],
    subjects: ['general'],
    durationMin: 3,
  },

  // -------- Number & logic --------
  {
    id: 'mental-maths-ladder',
    name: 'Mental Maths Ladder',
    group: 'logic',
    description: 'Questions get harder until the class misses. How high can they climb?',
    icon: Calculator,
    streams: ALL_STREAMS,
    subjects: ['maths'],
    durationMin: 4,
  },
  {
    id: 'equation-match',
    name: 'Equation Match',
    group: 'logic',
    description: 'Drag expressions onto their matching results. Beat the clock.',
    icon: Equal,
    streams: ['upper_primary', 'middle_school', 'senior_school'],
    subjects: ['maths'],
    durationMin: 3,
  },
  {
    id: 'pattern-next',
    name: 'Pattern Next',
    group: 'logic',
    description: 'Spot the rule. What comes next in the sequence?',
    icon: Sparkles,
    streams: ALL_STREAMS,
    subjects: ['maths'],
    durationMin: 2,
  },
  {
    id: 'estimate-it',
    name: 'Estimate It',
    group: 'logic',
    description: 'Closest answer wins. How many seconds in a week? How wide is the Top End?',
    icon: Scale,
    streams: ALL_STREAMS,
    subjects: ['maths', 'science', 'geography'],
    durationMin: 3,
  },
  {
    id: 'codebreaker',
    name: 'Codebreaker',
    group: 'logic',
    description: 'Caesar and substitution ciphers, scaling from primary patterns to senior cryptography.',
    icon: KeyRound,
    streams: ['upper_primary', 'middle_school', 'senior_school'],
    subjects: ['maths', 'english'],
    durationMin: 5,
  },

  // -------- History & Geography --------
  {
    id: 'timeline-order',
    name: 'Timeline Order',
    group: 'hass',
    description: 'Drag five events into chronological order. Streams cover Australian and world history.',
    icon: GitBranch,
    streams: ['upper_primary', 'middle_school', 'senior_school'],
    subjects: ['history'],
    durationMin: 3,
  },
  {
    id: 'map-pin',
    name: 'Map Pin',
    group: 'hass',
    description: 'Click the country, state or capital on an interactive map.',
    icon: MapPin,
    streams: ALL_STREAMS,
    subjects: ['geography'],
    durationMin: 3,
  },
  {
    id: 'flag-flash',
    name: 'Flag Flash',
    group: 'hass',
    description: 'Identify the flag. Lower Primary starts with Australian states; Senior reaches ASEAN and G20.',
    icon: Flag,
    streams: ALL_STREAMS,
    subjects: ['geography'],
    durationMin: 2,
  },
  {
    id: 'who-am-i',
    name: 'Who Am I?',
    group: 'hass',
    description: 'Clues reveal one at a time — guess the historical figure for fewer points the longer it takes.',
    icon: UserSquare2,
    streams: ['upper_primary', 'middle_school', 'senior_school'],
    subjects: ['history'],
    durationMin: 4,
  },
  {
    id: 'landmark-snap',
    name: 'Landmark Snap',
    group: 'hass',
    description: 'Identify the landmark, biome or landform from a single image.',
    icon: Mountain,
    streams: ALL_STREAMS,
    subjects: ['geography'],
    durationMin: 3,
  },

  // -------- Whole-class energiser --------
  {
    id: 'heads-up',
    name: 'Heads Up',
    group: 'whole-class',
    description: 'A word appears behind one student; the class gives clues until they guess.',
    icon: Eye,
    streams: ALL_STREAMS,
    subjects: ['general'],
    durationMin: 5,
  },
  {
    id: 'would-you-rather',
    name: 'Would You Rather',
    group: 'whole-class',
    description: 'Ethical and curriculum-tied dilemmas to spark class debate.',
    icon: Scale3d,
    streams: ['upper_primary', 'middle_school', 'senior_school'],
    subjects: ['history', 'english', 'general'],
    durationMin: 5,
  },
  {
    id: 'memory-sequence',
    name: 'Memory Sequence',
    group: 'whole-class',
    description: 'Simon-style — tiles are curriculum items (elements, prepositions, prime numbers).',
    icon: Brain,
    streams: ALL_STREAMS,
    subjects: ['general'],
    durationMin: 3,
  },
  {
    id: 'twenty-questions',
    name: '20 Questions',
    group: 'whole-class',
    description: 'Class narrows down a hidden curriculum item with yes/no questions.',
    icon: MessageCircleQuestion,
    streams: ALL_STREAMS,
    subjects: ['general'],
    durationMin: 6,
  },
];

export function gamesByGroup(group: GameGroup): Game[] {
  return GAMES.filter((g) => g.group === group);
}

export function findGame(id: string): Game | undefined {
  return GAMES.find((g) => g.id === id);
}
