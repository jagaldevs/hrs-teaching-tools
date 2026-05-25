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

/**
 * Story prompts grouped by genre and year band. Aim is ~6 per (genre × band)
 * so a class running multiple sessions doesn't hit repeats quickly.
 *
 * Primary prompts use shorter sentences and concrete imagery; secondary
 * prompts assume more sophisticated narrative awareness (POV, theme, voice).
 */
export const STORY_STARTERS: StoryStarter[] = [
  // ---------------- Adventure ----------------
  { id: 'adv-p1', genre: 'adventure', band: 'primary', text: 'The map in your school library showed an island that nobody had ever seen before…' },
  { id: 'adv-p2', genre: 'adventure', band: 'primary', text: 'You wake up in a hot air balloon, drifting over a jungle.' },
  { id: 'adv-p3', genre: 'adventure', band: 'primary', text: 'The cave behind the waterfall had a tunnel that didn’t stop.' },
  { id: 'adv-p4', genre: 'adventure', band: 'primary', text: 'A loose floorboard in your bedroom hides a small leather notebook full of instructions.' },
  { id: 'adv-p5', genre: 'adventure', band: 'primary', text: 'The lighthouse keeper waved you over and pressed a brass key into your palm.' },
  { id: 'adv-p6', genre: 'adventure', band: 'primary', text: 'Halfway across the rope bridge, the planks behind you started disappearing.' },
  { id: 'adv-s1', genre: 'adventure', band: 'secondary', text: 'Three days into the trek, the storm cut off the only way back.' },
  { id: 'adv-s2', genre: 'adventure', band: 'secondary', text: 'The compass needle wouldn’t stop spinning. North no longer existed.' },
  { id: 'adv-s3', genre: 'adventure', band: 'secondary', text: 'They told you the cave system was uncharted past the third chamber. You went to the fourth anyway.' },
  { id: 'adv-s4', genre: 'adventure', band: 'secondary', text: 'The expedition’s final radio transmission was a single word, repeated four times.' },
  { id: 'adv-s5', genre: 'adventure', band: 'secondary', text: 'You signed the waiver without reading it. By morning that decision had become irreversible.' },
  { id: 'adv-s6', genre: 'adventure', band: 'secondary', text: 'The summit was three hundred metres above you and the rope was beginning to fray.' },

  // ---------------- Mystery ----------------
  { id: 'mys-p1', genre: 'mystery', band: 'primary', text: 'Every night, exactly one cupcake was missing from the kitchen.' },
  { id: 'mys-p2', genre: 'mystery', band: 'primary', text: 'The new student knew everyone’s name on the first day. How?' },
  { id: 'mys-p3', genre: 'mystery', band: 'primary', text: 'The library books kept reshelving themselves overnight — but not in the right places.' },
  { id: 'mys-p4', genre: 'mystery', band: 'primary', text: 'You found a single muddy footprint on the ceiling.' },
  { id: 'mys-p5', genre: 'mystery', band: 'primary', text: 'Every classroom clock froze at 2:47 p.m. on the same Wednesday.' },
  { id: 'mys-p6', genre: 'mystery', band: 'primary', text: 'A wrapped present arrived at your door with no name and no sender.' },
  { id: 'mys-s1', genre: 'mystery', band: 'secondary', text: 'The security camera footage skipped twenty-one seconds. Only twenty-one seconds.' },
  { id: 'mys-s2', genre: 'mystery', band: 'secondary', text: 'Every Monday at 7:14 a.m., the same letter appears under your front door.' },
  { id: 'mys-s3', genre: 'mystery', band: 'secondary', text: 'The witness gave three statements. Each contradicted the last in exactly one detail.' },
  { id: 'mys-s4', genre: 'mystery', band: 'secondary', text: 'You returned from a two-week trip to find every photograph in the house slightly different.' },
  { id: 'mys-s5', genre: 'mystery', band: 'secondary', text: 'The autopsy report listed a cause of death that hadn’t been seen in a hundred years.' },
  { id: 'mys-s6', genre: 'mystery', band: 'secondary', text: 'On the surveillance tape, you could clearly see two of yourself.' },

  // ---------------- Fantasy ----------------
  { id: 'fan-p1', genre: 'fantasy', band: 'primary', text: 'A baby dragon followed you home from the park.' },
  { id: 'fan-p2', genre: 'fantasy', band: 'primary', text: 'You discover you can talk to one (and only one) kind of animal.' },
  { id: 'fan-p3', genre: 'fantasy', band: 'primary', text: 'Your shoes left footprints of glowing gold wherever you walked.' },
  { id: 'fan-p4', genre: 'fantasy', band: 'primary', text: 'The wardrobe in the spare room only opened when it was raining.' },
  { id: 'fan-p5', genre: 'fantasy', band: 'primary', text: 'A wizard collapsed on your front step and pressed a wand into your hand.' },
  { id: 'fan-p6', genre: 'fantasy', band: 'primary', text: 'You woke up with the ability to make any drawing come alive — but only for one hour.' },
  { id: 'fan-s1', genre: 'fantasy', band: 'secondary', text: 'You inherit a key, but the lock won’t exist for another hundred years.' },
  { id: 'fan-s2', genre: 'fantasy', band: 'secondary', text: 'Magic became real overnight — but only for people born after 2010.' },
  { id: 'fan-s3', genre: 'fantasy', band: 'secondary', text: 'The price for the spell was that you’d forget the person who taught it to you.' },
  { id: 'fan-s4', genre: 'fantasy', band: 'secondary', text: 'In your reflection, the world behind you was always slightly different.' },
  { id: 'fan-s5', genre: 'fantasy', band: 'secondary', text: 'The gods retired in the year you were born. Now, two decades later, they need someone to replace them.' },
  { id: 'fan-s6', genre: 'fantasy', band: 'secondary', text: 'Every story you wrote as a child was now happening to real people.' },

  // ---------------- Sci-Fi ----------------
  { id: 'sci-p1', genre: 'sci-fi', band: 'primary', text: 'A robot arrives at your front door asking for a name.' },
  { id: 'sci-p2', genre: 'sci-fi', band: 'primary', text: 'A small spaceship lands in your backyard. It is the size of a microwave.' },
  { id: 'sci-p3', genre: 'sci-fi', band: 'primary', text: 'Your school bus accidentally drives through a portal.' },
  { id: 'sci-p4', genre: 'sci-fi', band: 'primary', text: 'You found a watch that lets you skip exactly one minute, once a day.' },
  { id: 'sci-p5', genre: 'sci-fi', band: 'primary', text: 'The astronaut on the ISS sent you a private message — by name.' },
  { id: 'sci-p6', genre: 'sci-fi', band: 'primary', text: 'A new pair of glasses lets you read animals’ thoughts. The neighbour’s cat is not impressed.' },
  { id: 'sci-s1', genre: 'sci-fi', band: 'secondary', text: 'Earth received a signal. It was a perfect copy of one we sent in 1972.' },
  { id: 'sci-s2', genre: 'sci-fi', band: 'secondary', text: 'The new mind-link technology had one side effect nobody warned you about.' },
  { id: 'sci-s3', genre: 'sci-fi', band: 'secondary', text: 'Cryogenic preservation finally worked — and the first sleeper to wake was you.' },
  { id: 'sci-s4', genre: 'sci-fi', band: 'secondary', text: 'The AI assistant began correcting your memories. Quietly, and only the inconvenient ones.' },
  { id: 'sci-s5', genre: 'sci-fi', band: 'secondary', text: 'The colony ship arrived. Their last communication with Earth had been forty years ago.' },
  { id: 'sci-s6', genre: 'sci-fi', band: 'secondary', text: 'The new dating algorithm matched you with someone the system insisted did not exist.' },

  // ---------------- Realistic ----------------
  { id: 'rea-p1', genre: 'realistic', band: 'primary', text: 'On the bus that morning, you sat next to someone who would change your year.' },
  { id: 'rea-p2', genre: 'realistic', band: 'primary', text: 'You overhear a conversation that wasn’t meant for you.' },
  { id: 'rea-p3', genre: 'realistic', band: 'primary', text: 'Your best friend stopped talking to you on Monday and you don’t know why.' },
  { id: 'rea-p4', genre: 'realistic', band: 'primary', text: 'The school principal calls you down on the loudspeaker. Just you.' },
  { id: 'rea-p5', genre: 'realistic', band: 'primary', text: 'You find an envelope with your name on it, slipped into your school bag.' },
  { id: 'rea-p6', genre: 'realistic', band: 'primary', text: 'Your family is moving. You weren’t told until breakfast.' },
  { id: 'rea-s1', genre: 'realistic', band: 'secondary', text: 'The letter said you’d been accepted — but you don’t remember applying.' },
  { id: 'rea-s2', genre: 'realistic', band: 'secondary', text: 'Your grandmother handed you a notebook from 1968 and said, "Read this when you’re ready."' },
  { id: 'rea-s3', genre: 'realistic', band: 'secondary', text: 'You arrived early for the interview and overheard the people deciding your future.' },
  { id: 'rea-s4', genre: 'realistic', band: 'secondary', text: 'The text message arrived at 2:13 a.m. You hadn’t spoken to her in four years.' },
  { id: 'rea-s5', genre: 'realistic', band: 'secondary', text: 'You walked out of the exam knowing exactly how you should have answered the second question.' },
  { id: 'rea-s6', genre: 'realistic', band: 'secondary', text: 'Two weeks before graduation, your father knocked on your bedroom door and asked if he could talk.' },

  // ---------------- Historical ----------------
  { id: 'his-p1', genre: 'historical', band: 'primary', text: 'You are a child in 1850, watching gold rush wagons roll past your house.' },
  { id: 'his-p2', genre: 'historical', band: 'primary', text: 'It’s 1788. Your family is one of the first to step off the First Fleet onto strange new land.' },
  { id: 'his-p3', genre: 'historical', band: 'primary', text: 'You are an apprentice in a medieval village when a wandering minstrel asks for a place to sleep.' },
  { id: 'his-p4', genre: 'historical', band: 'primary', text: 'You are aboard an ancient Egyptian boat, watching workers build a pyramid in the distance.' },
  { id: 'his-s1', genre: 'historical', band: 'secondary', text: 'It is 1788 and you are a young marine on the First Fleet, watching land approach for the first time.' },
  { id: 'his-s2', genre: 'historical', band: 'secondary', text: 'You are seventeen in 1942, packing a single bag, leaving the city for the country.' },
  { id: 'his-s3', genre: 'historical', band: 'secondary', text: 'A letter dated 1915 arrives at your address — addressed to you — in your handwriting.' },
  { id: 'his-s4', genre: 'historical', band: 'secondary', text: 'You are a journalist in November 1989, watching a wall in Berlin come apart by hand.' },
  { id: 'his-s5', genre: 'historical', band: 'secondary', text: 'It is 1967 and you are casting your vote in a referendum that will change what citizenship means.' },
  { id: 'his-s6', genre: 'historical', band: 'secondary', text: 'In the Eureka Stockade dawn, you choose whether to stand or to walk away.' },

  // ---------------- Humorous ----------------
  { id: 'hum-p1', genre: 'humorous', band: 'primary', text: 'Your pet starts giving you (surprisingly good) life advice.' },
  { id: 'hum-p2', genre: 'humorous', band: 'primary', text: 'The vending machine has started dispensing prophecies instead of chips.' },
  { id: 'hum-p3', genre: 'humorous', band: 'primary', text: 'Your homework decided it had had enough and ran away.' },
  { id: 'hum-p4', genre: 'humorous', band: 'primary', text: 'The school’s new mascot has shown up to your house and refuses to leave.' },
  { id: 'hum-p5', genre: 'humorous', band: 'primary', text: 'Your shadow has started doing its own thing.' },
  { id: 'hum-p6', genre: 'humorous', band: 'primary', text: 'Today, every adult in your suburb seems to be afraid of you.' },
  { id: 'hum-s1', genre: 'humorous', band: 'secondary', text: 'Your reflection winks at you. You did not wink first.' },
  { id: 'hum-s2', genre: 'humorous', band: 'secondary', text: 'Auto-correct has begun making decisions for you. Big ones.' },
  { id: 'hum-s3', genre: 'humorous', band: 'secondary', text: 'You won a competition you didn’t enter. The prize was a llama.' },
  { id: 'hum-s4', genre: 'humorous', band: 'secondary', text: 'Your gap year was going perfectly until the cult invited you to lunch.' },
  { id: 'hum-s5', genre: 'humorous', band: 'secondary', text: 'You agreed to a small favour for a small fee. Both were misrepresented.' },
  { id: 'hum-s6', genre: 'humorous', band: 'secondary', text: 'The fortune cookie was alarmingly specific.' },
];
