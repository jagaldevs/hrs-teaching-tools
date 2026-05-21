import type { Bank, MCQ } from '../../games/types';

/**
 * Multiple-choice question bank — Australian Curriculum V9 aligned.
 * Powers: Quick Quiz, Buzzer Round, and as a starter source for derived games.
 *
 * Streams:
 *   - lower_primary: Foundation–Year 2
 *   - upper_primary: Year 3–Year 6
 *   - middle_school: Year 7–Year 9
 *   - senior_school: Year 10–Year 12
 */

// ---------- LOWER PRIMARY (F–2) ----------

const LOWER_ENGLISH: MCQ[] = [
  { id: 'lp-e-1', q: 'Which word rhymes with "cat"?', choices: ['Dog', 'Hat', 'Fish', 'Sun'], answer: 1, acCode: 'AC9E1LA08' },
  { id: 'lp-e-2', q: 'Which letter comes after "M"?', choices: ['L', 'O', 'N', 'P'], answer: 2 },
  { id: 'lp-e-3', q: 'How many sounds are in the word "dog"?', choices: ['1', '2', '3', '4'], answer: 2, acCode: 'AC9EFLY07' },
  { id: 'lp-e-4', q: 'Which is a question?', choices: ['I like apples.', 'Run fast!', 'Where is my hat?', 'It is sunny.'], answer: 2 },
  { id: 'lp-e-5', q: 'Which word means the opposite of "big"?', choices: ['Large', 'Small', 'Tall', 'Wide'], answer: 1 },
  { id: 'lp-e-6', q: 'Which is the first letter of "elephant"?', choices: ['A', 'E', 'L', 'P'], answer: 1 },
  { id: 'lp-e-7', q: 'Which one is a noun (a thing)?', choices: ['Run', 'Happy', 'Apple', 'Quickly'], answer: 2 },
  { id: 'lp-e-8', q: 'What punctuation finishes a question?', choices: ['.', '!', '?', ','], answer: 2 },
  { id: 'lp-e-9', q: 'Which word starts with the same sound as "ship"?', choices: ['Shop', 'Sun', 'Hop', 'Top'], answer: 0 },
  { id: 'lp-e-10', q: 'How do you spell the colour of the sky on a sunny day?', choices: ['Bloo', 'Blue', 'Blu', 'Bluw'], answer: 1 },
  { id: 'lp-e-11', q: 'Which word means "small"?', choices: ['Tiny', 'Tall', 'Far', 'Loud'], answer: 0 },
  { id: 'lp-e-12', q: 'Which is correct?', choices: ['i like cats', 'I like cats.', 'I Like Cats', 'I like cats'], answer: 1 },
];

const LOWER_MATHS: MCQ[] = [
  { id: 'lp-m-1', q: 'What is 2 + 3?', choices: ['4', '5', '6', '7'], answer: 1, acCode: 'AC9M1N04' },
  { id: 'lp-m-2', q: 'How many sides does a triangle have?', choices: ['2', '3', '4', '5'], answer: 1, acCode: 'AC9M1SP01' },
  { id: 'lp-m-3', q: 'Which is bigger?', choices: ['7', '4', '2', '5'], answer: 0 },
  { id: 'lp-m-4', q: '10 − 6 = ?', choices: ['2', '3', '4', '5'], answer: 2 },
  { id: 'lp-m-5', q: 'What comes next: 2, 4, 6, ?', choices: ['7', '8', '9', '10'], answer: 1, acCode: 'AC9M1A01' },
  { id: 'lp-m-6', q: 'How many days are in one week?', choices: ['5', '6', '7', '10'], answer: 2 },
  { id: 'lp-m-7', q: 'A square has how many corners?', choices: ['3', '4', '5', '6'], answer: 1 },
  { id: 'lp-m-8', q: 'Which number is between 5 and 7?', choices: ['4', '6', '8', '9'], answer: 1 },
  { id: 'lp-m-9', q: 'If you have 3 apples and eat 1, how many are left?', choices: ['1', '2', '3', '4'], answer: 1 },
  { id: 'lp-m-10', q: 'What is half of 10?', choices: ['2', '4', '5', '6'], answer: 2 },
  { id: 'lp-m-11', q: 'Which shape is round?', choices: ['Square', 'Triangle', 'Circle', 'Rectangle'], answer: 2 },
  { id: 'lp-m-12', q: 'What time is shown when the long hand is on 12 and the short hand is on 3?', choices: ['12 o’clock', '3 o’clock', '6 o’clock', '9 o’clock'], answer: 1 },
];

const LOWER_HISTORY: MCQ[] = [
  { id: 'lp-h-1', q: 'Which is from a long time ago?', choices: ['Smartphone', 'Television', 'Steam train', 'Computer'], answer: 2 },
  { id: 'lp-h-2', q: 'Who lives in your family?', choices: ['Only teachers', 'Only friends', 'Parents, brothers and sisters', 'Only animals'], answer: 2 },
  { id: 'lp-h-3', q: 'What do we celebrate on a birthday?', choices: ['The day school finishes', 'The day someone was born', 'The first day of winter', 'A holiday'], answer: 1 },
  { id: 'lp-h-4', q: 'What did people use before light bulbs?', choices: ['Glow sticks', 'Candles', 'Solar lamps', 'Torches'], answer: 1 },
  { id: 'lp-h-5', q: 'Which is older?', choices: ['A grandparent', 'A baby', 'A toddler', 'A teenager'], answer: 0 },
  { id: 'lp-h-6', q: 'What do museums show us?', choices: ['Future events', 'Things from the past', 'Tomorrow’s weather', 'New games only'], answer: 1 },
  { id: 'lp-h-7', q: 'Long ago, how did people send messages over long distances?', choices: ['Email', 'Letters', 'Text messages', 'Video calls'], answer: 1 },
  { id: 'lp-h-8', q: 'Which holiday celebrates the start of a new year?', choices: ['Easter', 'New Year’s Day', 'Mother’s Day', 'Anzac Day'], answer: 1 },
  { id: 'lp-h-9', q: 'What is a family tree?', choices: ['A real tree in the garden', 'A picture showing your relatives', 'A type of fruit', 'A holiday'], answer: 1 },
  { id: 'lp-h-10', q: 'How did children travel to school 100 years ago?', choices: ['By car', 'On a plane', 'By walking or horse', 'By spaceship'], answer: 2 },
];

const LOWER_GEOGRAPHY: MCQ[] = [
  { id: 'lp-g-1', q: 'Which country do we live in?', choices: ['Australia', 'New Zealand', 'France', 'Japan'], answer: 0, acCode: 'AC9HS1K03' },
  { id: 'lp-g-2', q: 'What is the weather like in winter?', choices: ['Hot', 'Cold', 'Sunny only', 'Stormy only'], answer: 1 },
  { id: 'lp-g-3', q: 'Where does the sun rise?', choices: ['East', 'West', 'North', 'South'], answer: 0 },
  { id: 'lp-g-4', q: 'Which season has the longest days?', choices: ['Summer', 'Winter', 'Autumn', 'Spring'], answer: 0 },
  { id: 'lp-g-5', q: 'What lives in the ocean?', choices: ['Cows', 'Fish', 'Lions', 'Birds only'], answer: 1 },
  { id: 'lp-g-6', q: 'Which is bigger?', choices: ['A pond', 'A puddle', 'An ocean', 'A bath'], answer: 2 },
  { id: 'lp-g-7', q: 'Where do we find the Top End?', choices: ['Tasmania', 'Northern Territory', 'Victoria', 'South Australia'], answer: 1 },
  { id: 'lp-g-8', q: 'What kind of weather brings water from the sky?', choices: ['Sunny', 'Rainy', 'Snowy only', 'Windy only'], answer: 1 },
  { id: 'lp-g-9', q: 'What helps us find our way?', choices: ['A toy', 'A map', 'A pillow', 'A spoon'], answer: 1 },
  { id: 'lp-g-10', q: 'Which animal is native to Australia?', choices: ['Tiger', 'Kangaroo', 'Polar bear', 'Elephant'], answer: 1 },
];

// ---------- UPPER PRIMARY (3–6) ----------

const UPPER_ENGLISH: MCQ[] = [
  { id: 'up-e-1', q: 'Which is a verb?', choices: ['Quickly', 'Run', 'Happy', 'Yellow'], answer: 1, acCode: 'AC9E3LA03' },
  { id: 'up-e-2', q: 'A synonym for "happy" is:', choices: ['Sad', 'Joyful', 'Tired', 'Angry'], answer: 1 },
  { id: 'up-e-3', q: 'Which is a compound word?', choices: ['Running', 'Sunshine', 'Quickly', 'Beautiful'], answer: 1 },
  { id: 'up-e-4', q: 'Which sentence uses a simile?', choices: ['She runs fast.', 'She is a star.', 'She runs like the wind.', 'She is running.'], answer: 2, acCode: 'AC9E5LE03' },
  { id: 'up-e-5', q: 'What is the plural of "child"?', choices: ['Childs', 'Childes', 'Children', 'Childrens'], answer: 2 },
  { id: 'up-e-6', q: 'Which word is an adjective?', choices: ['Sing', 'Loudly', 'Loud', 'Song'], answer: 2 },
  { id: 'up-e-7', q: 'Which is the correct contraction for "do not"?', choices: ['Do’nt', 'Don’t', 'Dont’', 'Donot'], answer: 1 },
  { id: 'up-e-8', q: 'Which means "to make smaller"?', choices: ['Expand', 'Reduce', 'Inflate', 'Magnify'], answer: 1 },
  { id: 'up-e-9', q: '"The wind whispered through the trees." This uses:', choices: ['Simile', 'Metaphor', 'Personification', 'Onomatopoeia'], answer: 2 },
  { id: 'up-e-10', q: 'Which is correctly punctuated?', choices: ['"Hello," she said.', '"Hello she said."', 'Hello, she said', '"Hello", she said'], answer: 0 },
  { id: 'up-e-11', q: 'A "stanza" is a part of a:', choices: ['Story', 'Poem', 'Letter', 'Report'], answer: 1 },
  { id: 'up-e-12', q: 'The prefix "un-" means:', choices: ['Again', 'Not', 'Before', 'After'], answer: 1 },
];

const UPPER_MATHS: MCQ[] = [
  { id: 'up-m-1', q: '6 × 7 = ?', choices: ['36', '42', '48', '54'], answer: 1, acCode: 'AC9M4N06' },
  { id: 'up-m-2', q: 'Which fraction is equivalent to 1/2?', choices: ['2/3', '3/6', '4/9', '5/12'], answer: 1, acCode: 'AC9M5N04' },
  { id: 'up-m-3', q: 'What is 25% of 80?', choices: ['10', '15', '20', '25'], answer: 2 },
  { id: 'up-m-4', q: 'A right angle measures:', choices: ['45°', '90°', '120°', '180°'], answer: 1, acCode: 'AC9M5M03' },
  { id: 'up-m-5', q: 'How many minutes in 1.5 hours?', choices: ['60', '75', '90', '120'], answer: 2 },
  { id: 'up-m-6', q: '0.25 as a fraction is:', choices: ['1/2', '1/3', '1/4', '1/5'], answer: 2 },
  { id: 'up-m-7', q: 'The area of a 5cm × 3cm rectangle is:', choices: ['8 cm²', '15 cm²', '16 cm²', '30 cm²'], answer: 1 },
  { id: 'up-m-8', q: 'Which is a prime number?', choices: ['4', '6', '9', '11'], answer: 3 },
  { id: 'up-m-9', q: 'The next number in 5, 10, 20, 40, ?', choices: ['50', '60', '70', '80'], answer: 3 },
  { id: 'up-m-10', q: '3/4 + 1/4 = ?', choices: ['1/2', '4/4 (or 1)', '4/8', '2/4'], answer: 1 },
  { id: 'up-m-11', q: 'Which has the longest perimeter?', choices: ['4cm square', '3×6 rectangle', '5cm equilateral triangle', '2×8 rectangle'], answer: 3 },
  { id: 'up-m-12', q: 'Mean of 4, 6, 8, 10:', choices: ['6', '7', '8', '9'], answer: 1, acCode: 'AC9M6ST01' },
];

const UPPER_HISTORY: MCQ[] = [
  { id: 'up-h-1', q: 'Aboriginal and Torres Strait Islander peoples have lived in Australia for at least:', choices: ['200 years', '2,000 years', '60,000 years', '500 years'], answer: 2 },
  { id: 'up-h-2', q: 'Captain James Cook landed at Botany Bay in:', choices: ['1492', '1770', '1788', '1901'], answer: 1 },
  { id: 'up-h-3', q: 'The First Fleet arrived in:', choices: ['1788', '1770', '1800', '1825'], answer: 0 },
  { id: 'up-h-4', q: 'Australia became a federation in:', choices: ['1788', '1850', '1901', '1945'], answer: 2 },
  { id: 'up-h-5', q: 'The Eureka Stockade was a:', choices: ['Military fort', 'Goldfields uprising', 'Cricket ground', 'Type of ship'], answer: 1 },
  { id: 'up-h-6', q: 'Which ancient civilisation built the pyramids?', choices: ['Romans', 'Greeks', 'Egyptians', 'Chinese'], answer: 2 },
  { id: 'up-h-7', q: 'What was the Silk Road?', choices: ['A type of cloth', 'A trading route', 'A river in China', 'A famous bridge'], answer: 1 },
  { id: 'up-h-8', q: 'A "primary source" is:', choices: ['A second-hand account', 'A story made up later', 'Original evidence from the time', 'A modern textbook'], answer: 2 },
  { id: 'up-h-9', q: 'Anzac Day commemorates the landing at:', choices: ['Normandy', 'Gallipoli', 'Singapore', 'Tobruk'], answer: 1 },
  { id: 'up-h-10', q: 'Who were the first peoples to invent writing?', choices: ['Romans', 'Vikings', 'Sumerians', 'Aztecs'], answer: 2 },
];

const UPPER_GEOGRAPHY: MCQ[] = [
  { id: 'up-g-1', q: 'The capital of Australia is:', choices: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], answer: 2 },
  { id: 'up-g-2', q: 'How many states are in Australia?', choices: ['5', '6', '7', '8'], answer: 1 },
  { id: 'up-g-3', q: 'The longest river in Australia is the:', choices: ['Yarra', 'Murray', 'Swan', 'Brisbane'], answer: 1 },
  { id: 'up-g-4', q: 'Darwin is the capital of:', choices: ['Queensland', 'Western Australia', 'Northern Territory', 'South Australia'], answer: 2 },
  { id: 'up-g-5', q: 'Which continent is Australia part of?', choices: ['Asia', 'Oceania', 'Africa', 'Europe'], answer: 1 },
  { id: 'up-g-6', q: 'The Great Barrier Reef is found off the coast of:', choices: ['Tasmania', 'Western Australia', 'Queensland', 'Victoria'], answer: 2 },
  { id: 'up-g-7', q: 'A "tropical" climate is:', choices: ['Cold and dry', 'Hot and humid', 'Mild and rainy', 'Snowy'], answer: 1 },
  { id: 'up-g-8', q: 'Which is the largest ocean?', choices: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], answer: 2 },
  { id: 'up-g-9', q: 'Mount Everest is in which continent?', choices: ['Africa', 'Asia', 'Europe', 'South America'], answer: 1 },
  { id: 'up-g-10', q: 'Indonesia is to Australia’s:', choices: ['South', 'East', 'North', 'West'], answer: 2 },
];

// ---------- MIDDLE SCHOOL (7–9) ----------

const MIDDLE_ENGLISH: MCQ[] = [
  { id: 'ms-e-1', q: 'Which is a metaphor?', choices: ['He runs like a cheetah.', 'Time is a thief.', 'The clock ticked loudly.', 'She is faster than him.'], answer: 1 },
  { id: 'ms-e-2', q: 'Iambic pentameter has how many syllables per line?', choices: ['8', '10', '12', '14'], answer: 1 },
  { id: 'ms-e-3', q: 'A "protagonist" is the:', choices: ['Villain', 'Main character', 'Narrator only', 'Setting'], answer: 1 },
  { id: 'ms-e-4', q: 'Shakespeare wrote primarily in which century?', choices: ['14th', '16th–17th', '18th', '19th'], answer: 1 },
  { id: 'ms-e-5', q: 'Which is alliteration?', choices: ['Buzz of bees', 'Sally sells seashells', 'Cold as ice', 'Time flies'], answer: 1 },
  { id: 'ms-e-6', q: '"Bittersweet" is an example of:', choices: ['Hyperbole', 'Oxymoron', 'Personification', 'Pun'], answer: 1 },
  { id: 'ms-e-7', q: 'Persuasive writing aims to:', choices: ['Entertain only', 'Describe a place', 'Convince the reader', 'Give instructions'], answer: 2 },
  { id: 'ms-e-8', q: 'The first-person pronoun is:', choices: ['You', 'I', 'He', 'They'], answer: 1 },
  { id: 'ms-e-9', q: 'A "sonnet" has how many lines?', choices: ['10', '12', '14', '16'], answer: 2 },
  { id: 'ms-e-10', q: 'Which is an example of pathos?', choices: ['Statistics in an argument', 'Appealing to readers’ emotions', 'Citing an expert', 'Use of bullet points'], answer: 1 },
  { id: 'ms-e-11', q: '"He could eat a horse." This is:', choices: ['Simile', 'Hyperbole', 'Metaphor', 'Pun'], answer: 1 },
  { id: 'ms-e-12', q: 'The author of "Macbeth" is:', choices: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'George Orwell'], answer: 1 },
];

const MIDDLE_MATHS: MCQ[] = [
  { id: 'ms-m-1', q: 'Solve for x: 2x + 5 = 17', choices: ['4', '5', '6', '7'], answer: 2, acCode: 'AC9M7A02' },
  { id: 'ms-m-2', q: 'Pythagoras: if a = 3, b = 4, then c = ?', choices: ['5', '6', '7', '12'], answer: 0, acCode: 'AC9M9M03' },
  { id: 'ms-m-3', q: '15% of 200 = ?', choices: ['20', '25', '30', '35'], answer: 2 },
  { id: 'ms-m-4', q: 'The slope of y = 3x + 2 is:', choices: ['2', '3', '5', '−3'], answer: 1 },
  { id: 'ms-m-5', q: '−5 × −4 = ?', choices: ['−20', '20', '−9', '9'], answer: 1 },
  { id: 'ms-m-6', q: 'Probability of rolling a 6 on a fair die:', choices: ['1/2', '1/3', '1/6', '1/12'], answer: 2 },
  { id: 'ms-m-7', q: 'Simplify: 3(x + 4)', choices: ['3x + 4', '3x + 12', 'x + 12', '3x + 7'], answer: 1 },
  { id: 'ms-m-8', q: 'The mean of 4, 6, 8, 12, 20:', choices: ['8', '10', '12', '14'], answer: 1 },
  { id: 'ms-m-9', q: 'Volume of a cube with side 4cm:', choices: ['16 cm³', '32 cm³', '48 cm³', '64 cm³'], answer: 3 },
  { id: 'ms-m-10', q: 'Which is irrational?', choices: ['0.5', '√2', '7', '−3/4'], answer: 1 },
  { id: 'ms-m-11', q: 'Solve: x² = 49, x = ?', choices: ['±7', '7 only', '24.5', '±6'], answer: 0 },
  { id: 'ms-m-12', q: '3:5 simplified is the same as:', choices: ['6:15', '6:10', '9:20', '15:25'], answer: 3 },
];

const MIDDLE_HISTORY: MCQ[] = [
  { id: 'ms-h-1', q: 'The Roman Empire fell in approximately:', choices: ['476 AD', '1066 AD', '1492 AD', '800 AD'], answer: 0 },
  { id: 'ms-h-2', q: 'The Black Death peaked in Europe in the:', choices: ['1100s', '1300s', '1500s', '1700s'], answer: 1 },
  { id: 'ms-h-3', q: 'The Industrial Revolution began in:', choices: ['France', 'Germany', 'Britain', 'United States'], answer: 2 },
  { id: 'ms-h-4', q: 'World War I began in:', choices: ['1912', '1914', '1916', '1918'], answer: 1 },
  { id: 'ms-h-5', q: 'The Gallipoli Campaign was in:', choices: ['1914', '1915', '1916', '1918'], answer: 1 },
  { id: 'ms-h-6', q: 'Who led India to independence using non-violence?', choices: ['Nehru', 'Mandela', 'Gandhi', 'Bose'], answer: 2 },
  { id: 'ms-h-7', q: 'The Magna Carta was signed in:', choices: ['1066', '1215', '1492', '1666'], answer: 1 },
  { id: 'ms-h-8', q: 'Pharaohs ruled which ancient civilisation?', choices: ['Greece', 'Rome', 'Egypt', 'Persia'], answer: 2 },
  { id: 'ms-h-9', q: 'The democracy concept originated in:', choices: ['Rome', 'Athens', 'Babylon', 'Persia'], answer: 1 },
  { id: 'ms-h-10', q: 'The Stolen Generations refers to:', choices: ['Gold rush thieves', 'Removal of Aboriginal children from families', 'Lost colonial documents', 'Convicts who escaped'], answer: 1 },
];

const MIDDLE_GEOGRAPHY: MCQ[] = [
  { id: 'ms-g-1', q: 'The Tropic of Capricorn passes through:', choices: ['Sydney', 'Brisbane', 'Rockhampton', 'Hobart'], answer: 2 },
  { id: 'ms-g-2', q: 'Which biome covers most of central Australia?', choices: ['Tropical rainforest', 'Desert', 'Tundra', 'Temperate forest'], answer: 1 },
  { id: 'ms-g-3', q: 'The largest country by area is:', choices: ['China', 'USA', 'Russia', 'Canada'], answer: 2 },
  { id: 'ms-g-4', q: 'Tectonic plates moving apart create:', choices: ['Mountains', 'Volcanoes only', 'Rift valleys', 'Glaciers'], answer: 2 },
  { id: 'ms-g-5', q: 'The Amazon rainforest is mostly in:', choices: ['Africa', 'Brazil', 'India', 'Indonesia'], answer: 1 },
  { id: 'ms-g-6', q: 'Urbanisation means:', choices: ['Decline of cities', 'Movement to cities', 'Building national parks', 'Migration to farms'], answer: 1 },
  { id: 'ms-g-7', q: 'The most populous country in 2024 is:', choices: ['China', 'India', 'USA', 'Indonesia'], answer: 1 },
  { id: 'ms-g-8', q: 'The Pacific "Ring of Fire" is known for:', choices: ['Fireworks', 'Volcanoes and earthquakes', 'Tropical storms', 'Oil reserves'], answer: 1 },
  { id: 'ms-g-9', q: 'A drainage basin is also called a:', choices: ['Catchment', 'Levee', 'Plateau', 'Delta'], answer: 0 },
  { id: 'ms-g-10', q: 'Which gas is the main cause of human-driven climate change?', choices: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Helium'], answer: 1 },
];

// ---------- SENIOR SCHOOL (10–12) ----------

const SENIOR_ENGLISH: MCQ[] = [
  { id: 'ss-e-1', q: 'A "bildungsroman" is a story about:', choices: ['A detective', 'Coming of age', 'A war', 'A romance only'], answer: 1 },
  { id: 'ss-e-2', q: 'Aristotle’s three rhetorical appeals are:', choices: ['Logos, pathos, ethos', 'Story, plot, theme', 'Hero, villain, helper', 'Past, present, future'], answer: 0 },
  { id: 'ss-e-3', q: '"The Great Gatsby" was written by:', choices: ['Hemingway', 'Fitzgerald', 'Faulkner', 'Steinbeck'], answer: 1 },
  { id: 'ss-e-4', q: 'A "synecdoche" is when:', choices: ['Two opposites combine', 'A part represents the whole', 'Two ideas contrast', 'A word imitates a sound'], answer: 1 },
  { id: 'ss-e-5', q: '"Stream of consciousness" is associated with:', choices: ['Hemingway', 'Joyce', 'Tolkien', 'Twain'], answer: 1 },
  { id: 'ss-e-6', q: 'The "unreliable narrator" technique means:', choices: ['The plot is wrong', 'The narrator’s account may be distorted', 'No narrator is present', 'The story is non-fiction'], answer: 1 },
  { id: 'ss-e-7', q: 'A "denouement" is the:', choices: ['Opening conflict', 'Climax', 'Resolution', 'Setting'], answer: 2 },
  { id: 'ss-e-8', q: '"Beware the ides of March" appears in:', choices: ['Hamlet', 'Macbeth', 'Julius Caesar', 'Othello'], answer: 2 },
  { id: 'ss-e-9', q: 'Modernist literature largely emerged in the:', choices: ['1700s', '1800s', 'Early 1900s', '1980s'], answer: 2 },
  { id: 'ss-e-10', q: '"Ad hominem" is a fallacy that:', choices: ['Cites tradition', 'Attacks the person, not the argument', 'Uses circular reasoning', 'Presents false dichotomy'], answer: 1 },
  { id: 'ss-e-11', q: 'The "tragic flaw" is also called:', choices: ['Hubris', 'Hamartia', 'Catharsis', 'Pathos'], answer: 1 },
  { id: 'ss-e-12', q: 'A "thesis statement" should be:', choices: ['A question', 'A specific arguable claim', 'A summary of the topic', 'A neutral fact'], answer: 1 },
];

const SENIOR_MATHS: MCQ[] = [
  { id: 'ss-m-1', q: 'Derivative of x³:', choices: ['x²', '3x²', '3x', 'x³/3'], answer: 1 },
  { id: 'ss-m-2', q: 'sin(90°) = ?', choices: ['0', '0.5', '1', '√2/2'], answer: 2 },
  { id: 'ss-m-3', q: 'Quadratic formula solves: ax² + bx + c = 0, x = ?', choices: ['(−b ± √(b²−4ac)) / 2a', '−b / a', 'b² − 4ac', 'c / (a + b)'], answer: 0 },
  { id: 'ss-m-4', q: 'log₁₀(1000) = ?', choices: ['1', '2', '3', '10'], answer: 2 },
  { id: 'ss-m-5', q: 'Integral of 2x dx:', choices: ['x² + C', '2 + C', 'x + C', 'x²/2 + C'], answer: 0 },
  { id: 'ss-m-6', q: 'Probability of two independent events both occurring:', choices: ['P(A) + P(B)', 'P(A) × P(B)', 'P(A) − P(B)', 'P(A)/P(B)'], answer: 1 },
  { id: 'ss-m-7', q: 'cos²(θ) + sin²(θ) = ?', choices: ['0', 'θ', '1', '2'], answer: 2 },
  { id: 'ss-m-8', q: 'For y = e^x, dy/dx = ?', choices: ['x', '1', 'e^x', 'ln(x)'], answer: 2 },
  { id: 'ss-m-9', q: 'Number of permutations of 5 items:', choices: ['25', '120', '60', '720'], answer: 1 },
  { id: 'ss-m-10', q: 'Standard deviation measures:', choices: ['The mean', 'The spread of data', 'The mode', 'The maximum'], answer: 1 },
  { id: 'ss-m-11', q: 'A vector in 3D has how many components?', choices: ['1', '2', '3', '4'], answer: 2 },
  { id: 'ss-m-12', q: 'The complex number i is defined by:', choices: ['i = 1', 'i = −1', 'i² = −1', 'i² = 1'], answer: 2 },
];

const SENIOR_HISTORY: MCQ[] = [
  { id: 'ss-h-1', q: 'The Russian Revolution occurred in:', choices: ['1905', '1917', '1929', '1945'], answer: 1 },
  { id: 'ss-h-2', q: 'The Treaty of Versailles ended:', choices: ['World War I', 'World War II', 'The Cold War', 'The Vietnam War'], answer: 0 },
  { id: 'ss-h-3', q: 'The Cold War was primarily between:', choices: ['USA & UK', 'USSR & China', 'USA & USSR', 'France & Germany'], answer: 2 },
  { id: 'ss-h-4', q: 'The Berlin Wall fell in:', choices: ['1969', '1979', '1989', '1999'], answer: 2 },
  { id: 'ss-h-5', q: 'Apartheid in South Africa officially ended in:', choices: ['1976', '1985', '1991', '2001'], answer: 2 },
  { id: 'ss-h-6', q: 'The 1967 Australian referendum recognised:', choices: ['Capital change', 'Aboriginal people in the census', 'Decimal currency', 'New national anthem'], answer: 1 },
  { id: 'ss-h-7', q: 'The Mabo decision (1992) overturned the doctrine of:', choices: ['Terra nullius', 'Eminent domain', 'Habeas corpus', 'Res judicata'], answer: 0 },
  { id: 'ss-h-8', q: 'The Universal Declaration of Human Rights was adopted in:', choices: ['1918', '1945', '1948', '1968'], answer: 2 },
  { id: 'ss-h-9', q: 'The Vietnam War for Australia largely ended in:', choices: ['1965', '1972', '1975', '1980'], answer: 1 },
  { id: 'ss-h-10', q: 'Decolonisation in Africa peaked during the:', choices: ['1920s', '1940s', '1960s', '1980s'], answer: 2 },
];

const SENIOR_GEOGRAPHY: MCQ[] = [
  { id: 'ss-g-1', q: 'The carbon cycle moves carbon between:', choices: ['Only the atmosphere and oceans', 'Atmosphere, biosphere, hydrosphere and geosphere', 'Only the biosphere', 'Only the hydrosphere'], answer: 1 },
  { id: 'ss-g-2', q: 'Demographic transition theory describes changes in:', choices: ['Climate', 'Birth and death rates', 'Plate tectonics', 'Currency'], answer: 1 },
  { id: 'ss-g-3', q: 'A "megacity" has a population over:', choices: ['1 million', '5 million', '10 million', '50 million'], answer: 2 },
  { id: 'ss-g-4', q: 'Eutrophication is caused mainly by:', choices: ['Drought', 'Nutrient runoff', 'Earthquakes', 'Salt water'], answer: 1 },
  { id: 'ss-g-5', q: 'OPEC mainly produces:', choices: ['Coffee', 'Oil', 'Grain', 'Steel'], answer: 1 },
  { id: 'ss-g-6', q: 'The 2015 Paris Agreement targets keeping warming below:', choices: ['1°C', '1.5°C', '3°C', '5°C'], answer: 1 },
  { id: 'ss-g-7', q: 'ENSO refers to:', choices: ['El Nino – Southern Oscillation', 'European North Sea Org.', 'Equatorial Northern Sky Object', 'East-North Stratospheric Outflow'], answer: 0 },
  { id: 'ss-g-8', q: 'Which is a "developed" economy by World Bank classification?', choices: ['India', 'Indonesia', 'Australia', 'Vietnam'], answer: 2 },
  { id: 'ss-g-9', q: 'Coral bleaching is mainly driven by:', choices: ['Boat traffic', 'Ocean warming', 'Tides', 'Salinity drops'], answer: 1 },
  { id: 'ss-g-10', q: 'A "primary industry" is one that:', choices: ['Manufactures goods', 'Extracts raw materials', 'Provides services', 'Builds software'], answer: 1 },
];

export const MCQ_BANK: Bank<MCQ> = {
  byStreamSubject: {
    lower_primary: {
      english: LOWER_ENGLISH,
      maths: LOWER_MATHS,
      history: LOWER_HISTORY,
      geography: LOWER_GEOGRAPHY,
    },
    upper_primary: {
      english: UPPER_ENGLISH,
      maths: UPPER_MATHS,
      history: UPPER_HISTORY,
      geography: UPPER_GEOGRAPHY,
    },
    middle_school: {
      english: MIDDLE_ENGLISH,
      maths: MIDDLE_MATHS,
      history: MIDDLE_HISTORY,
      geography: MIDDLE_GEOGRAPHY,
    },
    senior_school: {
      english: SENIOR_ENGLISH,
      maths: SENIOR_MATHS,
      history: SENIOR_HISTORY,
      geography: SENIOR_GEOGRAPHY,
    },
  },
};
