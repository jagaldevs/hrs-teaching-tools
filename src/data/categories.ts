import {
  Users,
  BookOpen,
  Dices,
  Feather,
  Calculator,
  type LucideIcon,
} from 'lucide-react';

export type CategoryId =
  | 'classroom'
  | 'teaching-aids'
  | 'randomisers'
  | 'literacy'
  | 'numeracy';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: LucideIcon;
}

export const CATEGORIES: Category[] = [
  {
    id: 'classroom',
    name: 'Classroom Management',
    description: 'Organise students, teams and routines.',
    icon: Users,
  },
  {
    id: 'randomisers',
    name: 'Randomisers',
    description: 'Fair, fast, and frictionless picks.',
    icon: Dices,
  },
  {
    id: 'teaching-aids',
    name: 'Teaching Aids',
    description: 'Visual aids and explorables for any subject.',
    icon: BookOpen,
  },
  {
    id: 'literacy',
    name: 'Literacy',
    description: 'Reading, writing and language tools aligned to AC V9.',
    icon: Feather,
  },
  {
    id: 'numeracy',
    name: 'Numeracy',
    description: 'Number sense, fluency and reasoning.',
    icon: Calculator,
  },
];
