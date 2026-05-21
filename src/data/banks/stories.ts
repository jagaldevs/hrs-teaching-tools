export type StoryGenre =
  | 'adventure'
  | 'mystery'
  | 'fantasy'
  | 'sci-fi'
  | 'realistic'
  | 'historical'
  | 'humorous';

export interface StoryStarter {
  id: string;
  genre: StoryGenre;
  /** Year-band heuristic — used to filter complexity. */
  band: 'primary' | 'secondary';
  text: string;
}

export const GENRES: { id: StoryGenre; label: string; emoji: string }[] = [
  { id: 'adventure', label: 'Adventure', emoji: '🗺️' },
  { id: 'mystery', label: 'Mystery', emoji: '🔍' },
  { id: 'fantasy', label: 'Fantasy', emoji: '🐉' },
  { id: 'sci-fi', label: 'Sci-Fi', emoji: '🚀' },
  { id: 'realistic', label: 'Realistic', emoji: '🏙️' },
  { id: 'historical', label: 'Historical', emoji: '🏰' },
  { id: 'humorous', label: 'Humorous', emoji: '😂' },
];

export const STORY_STARTERS: StoryStarter[] = [
  // Adventure
  { id: 'a1', genre: 'adventure', band: 'primary', text: 'The map in your school library showed an island that nobody had ever seen before…' },
  { id: 'a2', genre: 'adventure', band: 'primary', text: 'You wake up in a hot air balloon, drifting over a jungle.' },
  { id: 'a3', genre: 'adventure', band: 'primary', text: 'The cave behind the waterfall had a tunnel that didn’t stop.' },
  { id: 'a4', genre: 'adventure', band: 'secondary', text: 'Three days into the trek, the storm cut off the only way back.' },
  { id: 'a5', genre: 'adventure', band: 'secondary', text: 'The compass needle wouldn’t stop spinning. North no longer existed.' },

  // Mystery
  { id: 'm1', genre: 'mystery', band: 'primary', text: 'Every night, exactly one cupcake was missing from the kitchen.' },
  { id: 'm2', genre: 'mystery', band: 'primary', text: 'The new student knew everyone’s name on the first day. How?' },
  { id: 'm3', genre: 'mystery', band: 'secondary', text: 'The security camera footage skipped twenty-one seconds. Only twenty-one seconds.' },
  { id: 'm4', genre: 'mystery', band: 'secondary', text: 'Every Monday at 7:14 a.m., the same letter appears under your front door.' },

  // Fantasy
  { id: 'f1', genre: 'fantasy', band: 'primary', text: 'A baby dragon followed you home from the park.' },
  { id: 'f2', genre: 'fantasy', band: 'primary', text: 'You discover you can talk to one (and only one) kind of animal.' },
  { id: 'f3', genre: 'fantasy', band: 'secondary', text: 'You inherit a key, but the lock won’t exist for another hundred years.' },
  { id: 'f4', genre: 'fantasy', band: 'secondary', text: 'Magic became real overnight — but only for people born after 2010.' },

  // Sci-Fi
  { id: 's1', genre: 'sci-fi', band: 'primary', text: 'A robot arrives at your front door asking for a name.' },
  { id: 's2', genre: 'sci-fi', band: 'primary', text: 'A small spaceship lands in your backyard. It is the size of a microwave.' },
  { id: 's3', genre: 'sci-fi', band: 'secondary', text: 'Earth received a signal. It was a perfect copy of one we sent in 1972.' },
  { id: 's4', genre: 'sci-fi', band: 'secondary', text: 'The new mind-link technology had one side effect nobody warned you about.' },

  // Realistic
  { id: 'r1', genre: 'realistic', band: 'primary', text: 'On the bus that morning, you sat next to someone who would change your year.' },
  { id: 'r2', genre: 'realistic', band: 'primary', text: 'You overhear a conversation that wasn’t meant for you.' },
  { id: 'r3', genre: 'realistic', band: 'secondary', text: 'The letter said you’d been accepted — but you don’t remember applying.' },
  { id: 'r4', genre: 'realistic', band: 'secondary', text: 'Your grandmother handed you a notebook from 1968 and said, “Read this when you’re ready.”' },

  // Historical
  { id: 'h1', genre: 'historical', band: 'primary', text: 'You are a child in 1850, watching gold rush wagons roll past your house.' },
  { id: 'h2', genre: 'historical', band: 'secondary', text: 'It is 1788 and you are a young marine on the First Fleet, watching land approach for the first time.' },
  { id: 'h3', genre: 'historical', band: 'secondary', text: 'You are seventeen in 1942, packing a single bag, leaving the city for the country.' },
  { id: 'h4', genre: 'historical', band: 'secondary', text: 'A letter dated 1915 arrives at your address — addressed to you — in your handwriting.' },

  // Humorous
  { id: 'hu1', genre: 'humorous', band: 'primary', text: 'Your pet starts giving you (surprisingly good) life advice.' },
  { id: 'hu2', genre: 'humorous', band: 'primary', text: 'The vending machine has started dispensing prophecies instead of chips.' },
  { id: 'hu3', genre: 'humorous', band: 'secondary', text: 'Your reflection winks at you. You did not wink first.' },
  { id: 'hu4', genre: 'humorous', band: 'secondary', text: 'Auto-correct has begun making decisions for you. Big ones.' },
];
