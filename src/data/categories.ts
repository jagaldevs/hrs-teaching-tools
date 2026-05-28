import {
  Users,
  Dices,
  Feather,
  Calculator,
  FlaskConical,
  type LucideIcon,
} from 'lucide-react';

export type CategoryId =
  | 'classroom'
  | 'randomisers'
  | 'literacy'
  | 'numeracy'
  | 'science';

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
    id: 'literacy',
    name: 'Literacy',
    description: 'Reading, writing and language tools aligned to AC V9.',
    icon: Feather,
  },
  {
    id: 'numeracy',
    name: 'Numeracy',
    description: 'Number sense, fluency and reasoning — visualisers, manipulatives and converters.',
    icon: Calculator,
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Interactive references and explorables for science teaching.',
    icon: FlaskConical,
  },
];
