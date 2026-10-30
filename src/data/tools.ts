import {
  UsersRound,
  Trophy,
  Award,
  Crown,
  PieChart,
  Grid3X3,
  Layers,
  Sparkles,
  Columns3,
  TrendingUp,
  Calculator,
  Atom,
  Dice5,
  CircleDollarSign,
  Loader,
  WandSparkles,
  Flame,
  Disc3,
  HelpCircle,
  Vote,
  Type,
  Bookmark,
  SpellCheck,
  PenLine,
  Percent,
  type LucideIcon,
} from 'lucide-react';
import type { CategoryId } from './categories';

export interface Tool {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  longDescription?: string;
  icon: LucideIcon;
  studentFacing?: boolean;
  tags?: string[];
  status?: 'ready' | 'coming-soon';
}

export const TOOLS: Tool[] = [
  // ---------------- CLASSROOM MANAGEMENT ----------------
  {
    id: 'random-group-maker',
    name: 'Random Group Maker',
    category: 'classroom',
    description: 'Random groups from your class list, by number of groups or group size. Leftover students are spread evenly.',
    icon: UsersRound,
  },
  {
    id: 'group-score-board',
    name: 'Group Score Board',
    category: 'classroom',
    description: 'Live points board for team activities, with editable team names.',
    icon: Trophy,
  },
  {
    id: 'marble-jar-reward',
    name: 'Marble Jar Reward',
    category: 'classroom',
    description: 'Whole-class reward jar with satisfying drop animation and goal tracking.',
    icon: Award,
  },
  {
    id: 'tournaments',
    name: 'Tournaments',
    category: 'classroom',
    description: 'Single-elimination brackets for classroom competitions, with automatic byes.',
    icon: Crown,
  },
  {
    id: 'polling',
    name: 'Polling / Voting',
    category: 'classroom',
    description: 'Show a question with up to six options, tally a show of hands, then reveal the result.',
    icon: Vote,
  },

  // ---------------- RANDOMISERS ----------------
  {
    id: 'dice-roller',
    name: 'Dice Roller',
    category: 'randomisers',
    description: 'Roll up to 20 dice at once, from d4 to d20.',
    icon: Dice5,
  },
  {
    id: 'flip-coin',
    name: 'Flip Coin',
    category: 'randomisers',
    description: 'Animated coin flip with tally over multiple flips for probability lessons.',
    icon: CircleDollarSign,
  },
  {
    id: 'number-spinner',
    name: 'Number Spinner',
    category: 'randomisers',
    description: 'Spin a wheel of numbers within any range you set.',
    icon: Loader,
  },
  {
    id: 'group-name-generator',
    name: 'Group Name Generator',
    category: 'randomisers',
    description: 'Generate fun, age-appropriate team names. Curated lists by year level.',
    icon: WandSparkles,
  },
  {
    id: 'name-picker',
    name: 'Name Picker',
    category: 'randomisers',
    description: 'Random student picker with "fair mode": nobody is picked twice until everyone has had a turn.',
    icon: Flame,
  },
  {
    id: 'custom-spinner',
    name: 'Custom Spinner',
    category: 'randomisers',
    description: 'Teacher-defined spinner with named wedges and weighted segments.',
    icon: Disc3,
  },
  {
    id: 'question-generator',
    name: 'Question Generator',
    category: 'randomisers',
    description: 'Pull a random multiple-choice question for your class from the Brain Breaks question banks.',
    icon: HelpCircle,
  },

  // ---------------- LITERACY ----------------
  {
    id: 'story-starters',
    name: 'Story Starters',
    category: 'literacy',
    description: 'Genre-tagged prompts to kick off narrative writing across all year levels.',
    icon: Sparkles,
  },
  {
    id: 'word-builder',
    name: 'Word Builder',
    category: 'literacy',
    description: 'Tap letter tiles to build words, then hear them read aloud. Phonics-friendly.',
    icon: Type,
  },
  {
    id: 'sight-words',
    name: 'Sight Word Flashcards',
    category: 'literacy',
    description: 'Magic 100/200/300 flashcards. Mark words as known or for practice; progress saves on this device.',
    icon: Bookmark,
  },
  {
    id: 'spelling-test',
    name: 'Spelling Test Runner',
    category: 'literacy',
    description: 'Reads each word aloud at a set pace while students write their answers, with an answer key at the end.',
    icon: SpellCheck,
  },
  {
    id: 'sentence-builder',
    name: 'Sentence Builder',
    category: 'literacy',
    description: 'Tap word cards in order to build grammatically correct sentences.',
    icon: PenLine,
  },

  // ---------------- NUMERACY ----------------
  {
    id: 'fraction-tool',
    name: 'Fraction Tool',
    category: 'numeracy',
    description: 'Visualise fractions as circles, bars and on a number line.',
    icon: PieChart,
  },
  {
    id: 'hundreds-chart',
    name: 'Hundreds Chart',
    category: 'numeracy',
    description: 'Interactive 1–100 grid for counting patterns, primes and skip counting.',
    icon: Grid3X3,
  },
  {
    id: 'mab-blocks',
    name: 'MAB Blocks',
    category: 'numeracy',
    description: 'Base-10 blocks: build a number, or break one into thousands, hundreds, tens and ones.',
    icon: Layers,
  },
  {
    id: 'fraction-wall',
    name: 'Fraction Wall',
    category: 'numeracy',
    description: 'Stacked fraction strips for comparing and finding equivalents.',
    icon: Columns3,
  },
  {
    id: 'cartesian-plane',
    name: 'Cartesian Plane',
    category: 'numeracy',
    description: 'Plot points and join them with lines, on a choice of grid sizes.',
    icon: TrendingUp,
  },
  {
    id: 'place-value-chart',
    name: 'Place Value Chart',
    category: 'numeracy',
    description: 'Set the digit in each column, from thousandths to millions, and watch the number update.',
    icon: Calculator,
  },
  {
    id: 'fdp-converter',
    name: 'Fraction / Decimal / % Converter',
    category: 'numeracy',
    description: 'Live converter — type any value and see all three representations.',
    icon: Percent,
  },

  // ---------------- SCIENCE ----------------
  {
    id: 'periodic-table',
    name: 'Periodic Table',
    category: 'science',
    description: 'Interactive table with atomic mass, electron configuration and element-family highlights.',
    icon: Atom,
  },
];

export function toolsByCategory(categoryId: CategoryId): Tool[] {
  return TOOLS.filter((t) => t.category === categoryId);
}

export function findTool(id: string): Tool | undefined {
  return TOOLS.find((t) => t.id === id);
}
