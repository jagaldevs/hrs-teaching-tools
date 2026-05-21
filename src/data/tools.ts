import {
  Bell,
  UsersRound,
  Trophy,
  Award,
  Crown,
  PieChart,
  Grid3X3,
  Layers,
  Sparkles,
  MoveRight,
  Hash,
  Columns3,
  TrendingUp,
  Ruler,
  Calculator,
  AlignVerticalSpaceAround,
  Atom,
  Globe2,
  GitBranch,
  Dice5,
  CircleDollarSign,
  Loader,
  WandSparkles,
  Flame,
  Disc3,
  HelpCircle,
  Vote,
  Type,
  AudioLines,
  Bookmark,
  SpellCheck,
  PenLine,
  Plus,
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
    description: 'Generate fair groups by size or count, with options to balance and lock pairs.',
    icon: UsersRound,
  },
  {
    id: 'group-score-board',
    name: 'Group Score Board',
    category: 'classroom',
    description: 'Live points board for team activities. Custom team names and colours.',
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
    description: 'Single or double elimination brackets for classroom competitions.',
    icon: Crown,
  },
  {
    id: 'polling',
    name: 'Polling / Voting',
    category: 'classroom',
    description: 'Run a quick A/B/C/D poll. Students answer on devices via short code, no accounts.',
    icon: Vote,
  },

  // ---------------- TEACHING AIDS ----------------
  {
    id: 'fraction-tool',
    name: 'Fraction Tool',
    category: 'teaching-aids',
    description: 'Visualise fractions as circles, bars and on a number line.',
    icon: PieChart,
  },
  {
    id: 'hundreds-chart',
    name: 'Hundreds Chart',
    category: 'teaching-aids',
    description: 'Interactive 1–100 grid for counting patterns, primes and skip counting.',
    icon: Grid3X3,
  },
  {
    id: 'mab-blocks',
    name: 'MAB Blocks',
    category: 'teaching-aids',
    description: 'Drag base-10 blocks to model place value and operations.',
    icon: Layers,
  },
  {
    id: 'story-starters',
    name: 'Story Starters',
    category: 'teaching-aids',
    description: 'Genre-tagged prompts to kick off narrative writing across all year levels.',
    icon: Sparkles,
  },
  {
    id: 'number-line',
    name: 'Number Line',
    category: 'teaching-aids',
    description: 'Customisable number line — integers, decimals, fractions, negative ranges.',
    icon: MoveRight,
  },
  {
    id: 'abacus',
    name: 'Abacus',
    category: 'teaching-aids',
    description: 'On-screen abacus for early number sense and operation modelling.',
    icon: Hash,
  },
  {
    id: 'fraction-wall',
    name: 'Fraction Wall',
    category: 'teaching-aids',
    description: 'Stacked fraction strips for comparing and finding equivalents.',
    icon: Columns3,
  },
  {
    id: 'cartesian-plane',
    name: 'Cartesian Plane',
    category: 'teaching-aids',
    description: 'Plot points, draw lines and explore transformations on a configurable grid.',
    icon: TrendingUp,
  },
  {
    id: 'ruler-protractor',
    name: 'Ruler & Protractor',
    category: 'teaching-aids',
    description: 'On-screen instruments that snap to a projected page or worked example.',
    icon: Ruler,
  },
  {
    id: 'place-value-chart',
    name: 'Place Value Chart',
    category: 'teaching-aids',
    description: 'Drag digits into columns from thousandths through millions.',
    icon: Calculator,
  },
  {
    id: 'ten-frame',
    name: 'Ten Frame & Rekenrek',
    category: 'teaching-aids',
    description: 'Build numbers visually with counters and beads — core Lower Primary aid.',
    icon: AlignVerticalSpaceAround,
  },
  {
    id: 'periodic-table',
    name: 'Periodic Table',
    category: 'teaching-aids',
    description: 'Interactive table with electron configuration, group highlights and isotope data.',
    icon: Atom,
  },
  {
    id: 'world-map',
    name: 'World Map',
    category: 'teaching-aids',
    description: 'Clickable continents and major regions with facts. Companion to the Map Pin game.',
    icon: Globe2,
  },
  {
    id: 'timeline-builder',
    name: 'Timeline Builder',
    category: 'teaching-aids',
    description: 'Drag events onto a scrollable timeline. Reusable across History and Civics.',
    icon: GitBranch,
  },

  // ---------------- RANDOMISERS ----------------
  {
    id: 'dice-roller',
    name: 'Dice Roller',
    category: 'randomisers',
    description: 'Roll 1–10 dice with custom faces. d4 through d20 supported.',
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
    description: 'Class roster shuffler with "fair mode" so the same student is never picked twice.',
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
    id: 'team-buzzer',
    name: 'Team Buzzers',
    category: 'randomisers',
    description: '2–6 colour buzzers with first-press lockout — great for quiz rounds.',
    icon: Bell,
  },
  {
    id: 'question-generator',
    name: 'Question Generator',
    category: 'randomisers',
    description: 'Pull a random question from any AC V9-tagged bank, filtered by stream and subject.',
    icon: HelpCircle,
  },

  // ---------------- LITERACY ----------------
  {
    id: 'word-builder',
    name: 'Word Builder',
    category: 'literacy',
    description: 'Drag letter tiles to build, segment and blend words. Phonics-friendly.',
    icon: Type,
  },
  {
    id: 'phonics-sound-wall',
    name: 'Phonics Sound Wall',
    category: 'literacy',
    description: 'AC V9 phonics chart — vowels, consonants and digraphs, with audio.',
    icon: AudioLines,
  },
  {
    id: 'sight-words',
    name: 'Sight Word Flashcards',
    category: 'literacy',
    description: 'Magic 100/200/300 flashcards with progress tracking per student.',
    icon: Bookmark,
  },
  {
    id: 'spelling-test',
    name: 'Spelling Test Runner',
    category: 'literacy',
    description: 'Reads each word aloud at a set pace. Students type or write — auto-marks typed answers.',
    icon: SpellCheck,
  },
  {
    id: 'sentence-builder',
    name: 'Sentence Builder',
    category: 'literacy',
    description: 'Drag word cards to construct grammatically correct sentences.',
    icon: PenLine,
  },

  // ---------------- NUMERACY ----------------
  {
    id: 'number-bonds',
    name: 'Number Bonds',
    category: 'numeracy',
    description: 'Friends of 10, 20 and 100 with adaptive difficulty.',
    icon: Plus,
  },
  {
    id: 'fdp-converter',
    name: 'Fraction / Decimal / % Converter',
    category: 'numeracy',
    description: 'Live converter — type any value and see all three representations.',
    icon: Percent,
  },
];

export function toolsByCategory(categoryId: CategoryId): Tool[] {
  return TOOLS.filter((t) => t.category === categoryId);
}

export function findTool(id: string): Tool | undefined {
  return TOOLS.find((t) => t.id === id);
}
