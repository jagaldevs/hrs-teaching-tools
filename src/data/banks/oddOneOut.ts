import type { Bank, OddItem } from '../../games/types';

/**
 * Odd-One-Out bank — Australian Curriculum V9 aligned.
 *
 * Four candidates, one outlier. Each item carries an `explanation` for the
 * teacher debrief; many also carry an `acCode` linking to the AC V9
 * descriptor that justifies the grouping.
 *
 * Coverage target: 4 streams × 5 subjects × ~15 items = ~300 items.
 *
 * Strand prefix legend (F–10): see mcq.ts header for the full table.
 */

// ============================================================
//  LOWER PRIMARY  (F – Year 2)
// ============================================================

const LOWER_ENGLISH: OddItem[] = [
  { id: 'lp-e-1', items: ['cat', 'hat', 'bat', 'dog'], outlier: 3, explanation: '"dog" doesn’t rhyme with the others.', acCode: 'AC9E1LA08' },
  { id: 'lp-e-2', items: ['apple', 'banana', 'red', 'orange'], outlier: 2, explanation: '"red" is a colour; the others are fruits.', acCode: 'AC9E1LA09' },
  { id: 'lp-e-3', items: ['run', 'jump', 'happy', 'walk'], outlier: 2, explanation: '"happy" is an adjective; the others are verbs.', acCode: 'AC9E2LA03' },
  { id: 'lp-e-4', items: ['big', 'large', 'huge', 'tiny'], outlier: 3, explanation: '"tiny" is an antonym; the others are synonyms for big.', acCode: 'AC9E2LA09' },
  { id: 'lp-e-5', items: ['A', 'E', 'I', 'B'], outlier: 3, explanation: '"B" is a consonant; the others are vowels.', acCode: 'AC9EFLY07' },
  { id: 'lp-e-6', items: ['sing', 'shout', 'silent', 'speak'], outlier: 2, explanation: '"silent" means no sound; the others involve speaking.', acCode: 'AC9E1LA09' },
  { id: 'lp-e-7', items: ['cats', 'dogs', 'mice', 'pigs'], outlier: 2, explanation: '"mice" is an irregular plural; the others add -s.', acCode: 'AC9E1LA08' },
  { id: 'lp-e-8', items: ['ship', 'shop', 'fish', 'tap'], outlier: 3, explanation: '"tap" doesn’t contain the "sh" digraph.', acCode: 'AC9E1LY07' },
  { id: 'lp-e-9', items: ['?', '!', '.', 'x'], outlier: 3, explanation: '"x" is a letter; the others are punctuation marks.', acCode: 'AC9E1LA08' },
  { id: 'lp-e-10', items: ['went', 'ran', 'jumped', 'jumps'], outlier: 3, explanation: '"jumps" is present tense; the others are past tense.', acCode: 'AC9E2LA04' },
  { id: 'lp-e-11', items: ['Sydney', 'Tom', 'apple', 'Wednesday'], outlier: 2, explanation: '"apple" is a common noun; the others are proper nouns (need capitals).', acCode: 'AC9E1LA04' },
  { id: 'lp-e-12', items: ['book', 'page', 'chapter', 'pencil'], outlier: 3, explanation: '"pencil" isn’t part of a book.', acCode: 'AC9EFLY03' },
  { id: 'lp-e-13', items: ['who', 'what', 'when', 'and'], outlier: 3, explanation: '"and" isn’t a question word.', acCode: 'AC9E2LA04' },
  { id: 'lp-e-14', items: ['cried', 'laughed', 'smiled', 'sat'], outlier: 0, explanation: '"cried" expresses sadness; the others express happiness or neutrality.', acCode: 'AC9E2LE02' },
  { id: 'lp-e-15', items: ['author', 'illustrator', 'reader', 'pizza'], outlier: 3, explanation: '"pizza" has nothing to do with making a book.', acCode: 'AC9EFLY03' },
];

const LOWER_MATHS: OddItem[] = [
  { id: 'lp-m-1', items: ['2', '4', '6', '7'], outlier: 3, explanation: '"7" is odd; the others are even.', acCode: 'AC9M1N02' },
  { id: 'lp-m-2', items: ['circle', 'square', 'triangle', 'apple'], outlier: 3, explanation: '"apple" isn’t a shape.', acCode: 'AC9M1SP01' },
  { id: 'lp-m-3', items: ['10', '20', '15', '30'], outlier: 2, explanation: '"15" doesn’t end in 0 — not a multiple of 10.', acCode: 'AC9M2N01' },
  { id: 'lp-m-4', items: ['+', '−', '×', 'A'], outlier: 3, explanation: '"A" is a letter, not an operator.', acCode: 'AC9M1N04' },
  { id: 'lp-m-5', items: ['Monday', 'Tuesday', 'Friday', 'January'], outlier: 3, explanation: '"January" is a month; the others are days.', acCode: 'AC9M1M03' },
  { id: 'lp-m-6', items: ['cube', 'sphere', 'cone', 'square'], outlier: 3, explanation: '"square" is 2D; the others are 3D.', acCode: 'AC9M2SP01' },
  { id: 'lp-m-7', items: ['1', '3', '5', '6'], outlier: 3, explanation: '"6" is even; the others are odd.', acCode: 'AC9M1N02' },
  { id: 'lp-m-8', items: ['5c', '10c', '50c', '$1'], outlier: 3, explanation: '"$1" is a dollar; the others are cent coins.', acCode: 'AC9M2N06' },
  { id: 'lp-m-9', items: ['heavy', 'light', 'short', 'mass'], outlier: 2, explanation: '"short" describes length; the others describe mass.', acCode: 'AC9M1M01' },
  { id: 'lp-m-10', items: ['triangle', 'square', 'hexagon', 'cylinder'], outlier: 3, explanation: '"cylinder" is a 3D shape.', acCode: 'AC9M2SP01' },
  { id: 'lp-m-11', items: ['half', 'quarter', 'whole', 'plus'], outlier: 3, explanation: '"plus" is an operation; the others are fractions of one.', acCode: 'AC9M2N05' },
  { id: 'lp-m-12', items: ['clock', 'watch', 'calendar', 'cup'], outlier: 3, explanation: '"cup" doesn’t measure time.', acCode: 'AC9M1M03' },
  { id: 'lp-m-13', items: ['2 + 2', '1 + 3', '4', '3 + 0'], outlier: 3, explanation: '"3 + 0 = 3" — the others all equal 4.', acCode: 'AC9M1N04' },
  { id: 'lp-m-14', items: ['centimetre', 'metre', 'kilogram', 'kilometre'], outlier: 2, explanation: '"kilogram" measures mass; the others measure length.', acCode: 'AC9M2M01' },
  { id: 'lp-m-15', items: ['skip count by 2', '0, 2, 4, 6', '0, 5, 10, 15', '2, 4, 6, 8'], outlier: 2, explanation: '"0, 5, 10, 15" skip counts by 5, not 2.', acCode: 'AC9M2A01' },
];

const LOWER_HISTORY: OddItem[] = [
  { id: 'lp-h-1', items: ['phone', 'computer', 'TV', 'candle'], outlier: 3, explanation: '"candle" is much older than the rest.', acCode: 'AC9HS2K02' },
  { id: 'lp-h-2', items: ['mum', 'dad', 'aunt', 'friend'], outlier: 3, explanation: '"friend" isn’t a family relationship.', acCode: 'AC9HSFK01' },
  { id: 'lp-h-3', items: ['Easter', 'Birthday', 'Christmas', 'Tuesday'], outlier: 3, explanation: '"Tuesday" is a day, not a celebration.', acCode: 'AC9HSFK02' },
  { id: 'lp-h-4', items: ['letter', 'email', 'text', 'video call'], outlier: 0, explanation: '"letter" is the only non-digital way to send a message.', acCode: 'AC9HS2K02' },
  { id: 'lp-h-5', items: ['great-grandparent', 'grandparent', 'parent', 'photo'], outlier: 3, explanation: '"photo" isn’t a family member.', acCode: 'AC9HSFK01' },
  { id: 'lp-h-6', items: ['horse and cart', 'steam train', 'electric car', 'walking'], outlier: 2, explanation: '"electric car" is modern; the others are historical or always available.', acCode: 'AC9HS2K02' },
  { id: 'lp-h-7', items: ['NAIDOC Week', 'Australia Day', 'Anzac Day', 'Today'], outlier: 3, explanation: '"Today" isn’t a national commemoration.', acCode: 'AC9HS2K04' },
  { id: 'lp-h-8', items: ['museum', 'library', 'photo album', 'spaceship'], outlier: 3, explanation: '"spaceship" doesn’t hold history.', acCode: 'AC9HS2K01' },
  { id: 'lp-h-9', items: ['decade', 'century', 'year', 'kilometre'], outlier: 3, explanation: '"kilometre" measures distance, not time.', acCode: 'AC9HS2K02' },
  { id: 'lp-h-10', items: ['ice box', 'wood stove', 'gas lamp', 'smart fridge'], outlier: 3, explanation: '"smart fridge" is modern; the others are from the past.', acCode: 'AC9HS2K02' },
  { id: 'lp-h-11', items: ['family tree', 'memory box', 'old photo', 'tomorrow'], outlier: 3, explanation: '"tomorrow" is the future, not the past.', acCode: 'AC9HSFK02' },
  { id: 'lp-h-12', items: ['Aboriginal song', 'Aboriginal dance', 'Aboriginal art', 'TV show'], outlier: 3, explanation: 'The others are traditional First Nations ways of sharing stories.', acCode: 'AC9HS1K03' },
];

const LOWER_GEOGRAPHY: OddItem[] = [
  { id: 'lp-g-1', items: ['river', 'ocean', 'lake', 'forest'], outlier: 3, explanation: '"forest" isn’t a body of water.', acCode: 'AC9HS1K02' },
  { id: 'lp-g-2', items: ['sunny', 'rainy', 'stormy', 'happy'], outlier: 3, explanation: '"happy" isn’t weather.', acCode: 'AC9HS1K02' },
  { id: 'lp-g-3', items: ['kangaroo', 'koala', 'lion', 'wombat'], outlier: 2, explanation: '"lion" isn’t native to Australia.', acCode: 'AC9HS1K02' },
  { id: 'lp-g-4', items: ['Sydney', 'Melbourne', 'Tokyo', 'Brisbane'], outlier: 2, explanation: '"Tokyo" isn’t in Australia.', acCode: 'AC9HS2K01' },
  { id: 'lp-g-5', items: ['North', 'South', 'East', 'Down'], outlier: 3, explanation: '"Down" isn’t a compass direction.', acCode: 'AC9HS1S01' },
  { id: 'lp-g-6', items: ['summer', 'winter', 'spring', 'morning'], outlier: 3, explanation: '"morning" is a time of day; the others are seasons.', acCode: 'AC9HS1K02' },
  { id: 'lp-g-7', items: ['NSW', 'Queensland', 'Victoria', 'New Zealand'], outlier: 3, explanation: '"New Zealand" is a separate country.', acCode: 'AC9HS2K01' },
  { id: 'lp-g-8', items: ['mountain', 'hill', 'valley', 'cake'], outlier: 3, explanation: '"cake" isn’t a landform.', acCode: 'AC9HS1K02' },
  { id: 'lp-g-9', items: ['map', 'globe', 'compass', 'spoon'], outlier: 3, explanation: '"spoon" isn’t a geography tool.', acCode: 'AC9HS1S01' },
  { id: 'lp-g-10', items: ['desert', 'rainforest', 'reef', 'classroom'], outlier: 3, explanation: '"classroom" isn’t a natural environment.', acCode: 'AC9HS2K01' },
  { id: 'lp-g-11', items: ['Indonesia', 'Papua New Guinea', 'France', 'New Zealand'], outlier: 2, explanation: '"France" isn’t a neighbour of Australia.', acCode: 'AC9HS2K01' },
  { id: 'lp-g-12', items: ['crab', 'starfish', 'shell', 'shoe'], outlier: 3, explanation: '"shoe" isn’t found in a rockpool.', acCode: 'AC9HS1K02' },
];

const LOWER_SCIENCE: OddItem[] = [
  { id: 'lp-s-1', items: ['dog', 'tree', 'rock', 'bird'], outlier: 2, explanation: '"rock" isn’t a living thing.', acCode: 'AC9S1U01' },
  { id: 'lp-s-2', items: ['sun', 'moon', 'star', 'cloud'], outlier: 3, explanation: '"cloud" isn’t in space.', acCode: 'AC9SFU03' },
  { id: 'lp-s-3', items: ['eyes', 'ears', 'nose', 'shoes'], outlier: 3, explanation: '"shoes" aren’t a body part.', acCode: 'AC9SFU01' },
  { id: 'lp-s-4', items: ['ice', 'water', 'steam', 'sand'], outlier: 3, explanation: '"sand" isn’t a form of water.', acCode: 'AC9S2U02' },
  { id: 'lp-s-5', items: ['fish', 'shark', 'dolphin', 'kangaroo'], outlier: 3, explanation: '"kangaroo" doesn’t live in the ocean.', acCode: 'AC9S1U01' },
  { id: 'lp-s-6', items: ['bee', 'butterfly', 'spider', 'fly'], outlier: 2, explanation: '"spider" is an arachnid (8 legs); the others are insects (6 legs).', acCode: 'AC9S2U01' },
  { id: 'lp-s-7', items: ['windy', 'rainy', 'sunny', 'birthday'], outlier: 3, explanation: '"birthday" isn’t a type of weather.', acCode: 'AC9S1U03' },
  { id: 'lp-s-8', items: ['plant', 'animal', 'fungus', 'plastic'], outlier: 3, explanation: '"plastic" isn’t alive.', acCode: 'AC9S1U01' },
  { id: 'lp-s-9', items: ['oxygen', 'carbon dioxide', 'air', 'dirt'], outlier: 3, explanation: '"dirt" is a solid; the others are gases.', acCode: 'AC9S1U01' },
  { id: 'lp-s-10', items: ['caterpillar', 'cocoon', 'butterfly', 'snake'], outlier: 3, explanation: '"snake" isn’t part of the butterfly life cycle.', acCode: 'AC9S2U01' },
  { id: 'lp-s-11', items: ['rock', 'soil', 'leaf', 'sand'], outlier: 2, explanation: '"leaf" comes from a living plant; the others are non-living.', acCode: 'AC9S1U01' },
  { id: 'lp-s-12', items: ['shadow', 'light', 'mirror', 'sound'], outlier: 3, explanation: '"sound" relates to hearing; the others relate to light.', acCode: 'AC9SFU03' },
  { id: 'lp-s-13', items: ['kitten', 'puppy', 'foal', 'tree'], outlier: 3, explanation: '"tree" isn’t a baby animal.', acCode: 'AC9S2U01' },
  { id: 'lp-s-14', items: ['summer', 'winter', 'evaporation', 'spring'], outlier: 2, explanation: '"evaporation" is a process, not a season.', acCode: 'AC9S2U02' },
  { id: 'lp-s-15', items: ['oak', 'gum tree', 'wattle', 'whale'], outlier: 3, explanation: '"whale" is an animal; the others are plants.', acCode: 'AC9S1U01' },
];

// ============================================================
//  UPPER PRIMARY  (Year 3 – Year 6)
// ============================================================

const UPPER_ENGLISH: OddItem[] = [
  { id: 'up-e-1', items: ['noun', 'verb', 'adjective', 'sentence'], outlier: 3, explanation: '"sentence" is a structural unit; the others are word classes.', acCode: 'AC9E3LA03' },
  { id: 'up-e-2', items: ['happy', 'joyful', 'cheerful', 'gloomy'], outlier: 3, explanation: '"gloomy" is an antonym; the others are synonyms.', acCode: 'AC9E5LA09' },
  { id: 'up-e-3', items: ['simile', 'metaphor', 'paragraph', 'personification'], outlier: 2, explanation: '"paragraph" is structural; the others are figurative devices.', acCode: 'AC9E5LE03' },
  { id: 'up-e-4', items: ['who', 'what', 'when', 'because'], outlier: 3, explanation: '"because" is a conjunction; the others are question words.', acCode: 'AC9E4LA03' },
  { id: 'up-e-5', items: ['novel', 'short story', 'poem', 'pencil'], outlier: 3, explanation: '"pencil" isn’t a text type.', acCode: 'AC9E5LE01' },
  { id: 'up-e-6', items: ['quickly', 'loudly', 'happily', 'tall'], outlier: 3, explanation: '"tall" is an adjective; the others are adverbs.', acCode: 'AC9E4LA03' },
  { id: 'up-e-7', items: ['Sydney', 'November', 'apple', 'James'], outlier: 2, explanation: '"apple" is a common noun; the others are proper nouns.', acCode: 'AC9E3LA04' },
  { id: 'up-e-8', items: ['un-', 're-', 'dis-', '-ness'], outlier: 3, explanation: '"-ness" is a suffix; the others are prefixes.', acCode: 'AC9E4LA08' },
  { id: 'up-e-9', items: ['mice', 'children', 'feet', 'cats'], outlier: 3, explanation: '"cats" is a regular plural; the others are irregular.', acCode: 'AC9E3LA08' },
  { id: 'up-e-10', items: ['stanza', 'verse', 'rhyme', 'chapter'], outlier: 3, explanation: '"chapter" belongs to prose; the others to poetry.', acCode: 'AC9E5LE04' },
  { id: 'up-e-11', items: ['fact', 'opinion', 'statistic', 'evidence'], outlier: 1, explanation: '"opinion" is subjective; the others are verifiable.', acCode: 'AC9E6LY06' },
  { id: 'up-e-12', items: ['protagonist', 'antagonist', 'setting', 'narrator'], outlier: 2, explanation: '"setting" is the place/time; the others are people.', acCode: 'AC9E5LE02' },
  { id: 'up-e-13', items: ['Roald Dahl', 'Jackie French', 'JK Rowling', 'JS Bach'], outlier: 3, explanation: '"JS Bach" was a composer; the others wrote children’s fiction.', acCode: 'AC9E5LE01' },
  { id: 'up-e-14', items: ['comma', 'apostrophe', 'colon', 'noun'], outlier: 3, explanation: '"noun" isn’t punctuation.', acCode: 'AC9E5LA08' },
  { id: 'up-e-15', items: ['recount', 'narrative', 'report', 'spelling'], outlier: 3, explanation: '"spelling" is a skill; the others are text types.', acCode: 'AC9E5LY06' },
];

const UPPER_MATHS: OddItem[] = [
  { id: 'up-m-1', items: ['parallelogram', 'rhombus', 'trapezium', 'circle'], outlier: 3, explanation: '"circle" isn’t a quadrilateral.', acCode: 'AC9M5SP01' },
  { id: 'up-m-2', items: ['2', '3', '5', '9'], outlier: 3, explanation: '"9" is not prime (9 = 3 × 3).', acCode: 'AC9M6N02' },
  { id: 'up-m-3', items: ['1/2', '2/4', '3/6', '2/5'], outlier: 3, explanation: '"2/5" isn’t equivalent to a half.', acCode: 'AC9M5N04' },
  { id: 'up-m-4', items: ['kilogram', 'metre', 'litre', 'second'], outlier: 3, explanation: '"second" measures time; the others measure mass/length/volume.', acCode: 'AC9M5M01' },
  { id: 'up-m-5', items: ['100', '1,000', '10,000', '1,500'], outlier: 3, explanation: '"1,500" isn’t a power of 10.', acCode: 'AC9M5N02' },
  { id: 'up-m-6', items: ['mean', 'median', 'mode', 'sum'], outlier: 3, explanation: '"sum" is a total; the others are measures of central tendency.', acCode: 'AC9M6ST01' },
  { id: 'up-m-7', items: ['acute', 'obtuse', 'reflex', 'square'], outlier: 3, explanation: '"square" is a shape; the others classify angles.', acCode: 'AC9M5M03' },
  { id: 'up-m-8', items: ['triangle', 'pentagon', 'hexagon', 'cylinder'], outlier: 3, explanation: '"cylinder" is 3D; the others are 2D polygons.', acCode: 'AC9M5SP01' },
  { id: 'up-m-9', items: ['12 ÷ 4', '6 − 3', '15 ÷ 5', '9 ÷ 3'], outlier: 1, explanation: '"6 − 3" is subtraction; the others all equal 3 through division.', acCode: 'AC9M4N06' },
  { id: 'up-m-10', items: ['0.1', '1/10', '10%', '10'], outlier: 3, explanation: '"10" is ten wholes; the others all equal one tenth.', acCode: 'AC9M5N05' },
  { id: 'up-m-11', items: ['mm', 'cm', 'km', 'kg'], outlier: 3, explanation: '"kg" is mass; the others are length.', acCode: 'AC9M5M01' },
  { id: 'up-m-12', items: ['90°', '180°', '360°', '45°'], outlier: 3, explanation: '"45°" isn’t a whole-, half- or right-angle turn.', acCode: 'AC9M5M03' },
  { id: 'up-m-13', items: ['perimeter', 'area', 'volume', 'angle'], outlier: 3, explanation: '"angle" isn’t a measure of size/space.', acCode: 'AC9M5M02' },
  { id: 'up-m-14', items: ['probable', 'likely', 'certain', 'square'], outlier: 3, explanation: '"square" isn’t a chance term.', acCode: 'AC9M5P01' },
  { id: 'up-m-15', items: ['1/2', '0.5', '50%', '5%'], outlier: 3, explanation: '"5%" equals 0.05, not a half.', acCode: 'AC9M6N05' },
];

const UPPER_HISTORY: OddItem[] = [
  { id: 'up-h-1', items: ['Egypt', 'Rome', 'Greece', 'Australia'], outlier: 3, explanation: '"Australia" isn’t an ancient civilisation.', acCode: 'AC9HS6K04' },
  { id: 'up-h-2', items: ['1788', '1901', '1850', '2050'], outlier: 3, explanation: '"2050" is in the future.', acCode: 'AC9HS6K01' },
  { id: 'up-h-3', items: ['Cook', 'Phillip', 'Banks', 'Bradman'], outlier: 3, explanation: '"Bradman" was a 20th-century cricketer.', acCode: 'AC9HS5K01' },
  { id: 'up-h-4', items: ['First Fleet', 'Gold Rush', 'Eureka', 'Apollo 11'], outlier: 3, explanation: '"Apollo 11" wasn’t an Australian colonial event.', acCode: 'AC9HS5K02' },
  { id: 'up-h-5', items: ['hieroglyphs', 'cuneiform', 'alphabet', 'algebra'], outlier: 3, explanation: '"algebra" isn’t an ancient writing system.', acCode: 'AC9HS6K04' },
  { id: 'up-h-6', items: ['Federation', 'Mabo decision', 'Apology', 'iPhone launch'], outlier: 3, explanation: '"iPhone launch" isn’t Australian history.', acCode: 'AC9HS6K03' },
  { id: 'up-h-7', items: ['Captain Cook', 'Janszoon', 'Tasman', 'Newton'], outlier: 3, explanation: '"Newton" was a scientist, not an explorer of Australia.', acCode: 'AC9HS5K01' },
  { id: 'up-h-8', items: ['primary source', 'secondary source', 'evidence', 'imagination'], outlier: 3, explanation: '"imagination" isn’t a type of historical source.', acCode: 'AC9HS5S03' },
  { id: 'up-h-9', items: ['Anzac Day', 'Reconciliation Week', 'Australia Day', 'Halloween'], outlier: 3, explanation: '"Halloween" isn’t an Australian national observance.', acCode: 'AC9HS6K02' },
  { id: 'up-h-10', items: ['Pharaoh', 'Emperor', 'Pope', 'Prime Minister'], outlier: 3, explanation: '"Prime Minister" is a modern democratic title.', acCode: 'AC9HS6K04' },
  { id: 'up-h-11', items: ['NSW', 'Victoria', 'Tasmania', 'Hawaii'], outlier: 3, explanation: '"Hawaii" wasn’t an Australian colony.', acCode: 'AC9HS6K01' },
  { id: 'up-h-12', items: ['Stolen Generations', 'White Australia Policy', 'Apology', 'Federation Cup'], outlier: 3, explanation: '"Federation Cup" is a sporting trophy.', acCode: 'AC9HS6K03' },
];

const UPPER_GEOGRAPHY: OddItem[] = [
  { id: 'up-g-1', items: ['Sydney', 'Melbourne', 'Auckland', 'Brisbane'], outlier: 2, explanation: '"Auckland" is in New Zealand.', acCode: 'AC9HS4K04' },
  { id: 'up-g-2', items: ['Murray', 'Darling', 'Nile', 'Yarra'], outlier: 2, explanation: '"Nile" isn’t Australian.', acCode: 'AC9HS5K05' },
  { id: 'up-g-3', items: ['Asia', 'Africa', 'Europe', 'Pacific'], outlier: 3, explanation: '"Pacific" is an ocean, not a continent.', acCode: 'AC9HS6K06' },
  { id: 'up-g-4', items: ['NSW', 'NT', 'ACT', 'NZ'], outlier: 3, explanation: '"NZ" is a separate country.', acCode: 'AC9HS4K04' },
  { id: 'up-g-5', items: ['rainforest', 'desert', 'tundra', 'cathedral'], outlier: 3, explanation: '"cathedral" is a building, not a biome.', acCode: 'AC9HS5K05' },
  { id: 'up-g-6', items: ['Canberra', 'Wellington', 'Tokyo', 'Bondi'], outlier: 3, explanation: '"Bondi" is a beach suburb, not a capital city.', acCode: 'AC9HS6K06' },
  { id: 'up-g-7', items: ['Indonesia', 'Papua New Guinea', 'Singapore', 'Norway'], outlier: 3, explanation: '"Norway" isn’t in our region of the world.', acCode: 'AC9HS6K06' },
  { id: 'up-g-8', items: ['Pacific', 'Atlantic', 'Indian', 'Tasman'], outlier: 3, explanation: '"Tasman" is a sea, not one of the five oceans.', acCode: 'AC9HS6K06' },
  { id: 'up-g-9', items: ['Murray-Darling Basin', 'Lake Eyre', 'Great Artesian Basin', 'Eiffel Tower'], outlier: 3, explanation: '"Eiffel Tower" isn’t Australian.', acCode: 'AC9HS5K05' },
  { id: 'up-g-10', items: ['contour', 'scale', 'legend', 'engine'], outlier: 3, explanation: '"engine" isn’t a feature of a map.', acCode: 'AC9HS5S02' },
  { id: 'up-g-11', items: ['North', 'East', 'NE', 'BBQ'], outlier: 3, explanation: '"BBQ" isn’t a compass direction.', acCode: 'AC9HS5S02' },
  { id: 'up-g-12', items: ['Uluru', 'Kakadu', 'Daintree', 'Disneyland'], outlier: 3, explanation: '"Disneyland" isn’t in Australia or natural.', acCode: 'AC9HS4K02' },
];

const UPPER_SCIENCE: OddItem[] = [
  { id: 'up-s-1', items: ['solid', 'liquid', 'gas', 'energy'], outlier: 3, explanation: '"energy" isn’t a state of matter.', acCode: 'AC9S5U02' },
  { id: 'up-s-2', items: ['Mercury', 'Venus', 'Earth', 'Sun'], outlier: 3, explanation: '"Sun" is a star, not a planet.', acCode: 'AC9S5U03' },
  { id: 'up-s-3', items: ['herbivore', 'carnivore', 'omnivore', 'predator'], outlier: 3, explanation: '"predator" describes hunting role; the others describe diet.', acCode: 'AC9S5U01' },
  { id: 'up-s-4', items: ['oxygen', 'hydrogen', 'helium', 'iron'], outlier: 3, explanation: '"iron" is a solid metal; the others are gases.', acCode: 'AC9S6U02' },
  { id: 'up-s-5', items: ['friction', 'gravity', 'magnetism', 'volume'], outlier: 3, explanation: '"volume" measures space; the others are forces.', acCode: 'AC9S4U02' },
  { id: 'up-s-6', items: ['kangaroo', 'koala', 'wombat', 'shark'], outlier: 3, explanation: '"shark" isn’t a marsupial.', acCode: 'AC9S5U01' },
  { id: 'up-s-7', items: ['solar', 'wind', 'hydro', 'coal'], outlier: 3, explanation: '"coal" is non-renewable; the others are renewable.', acCode: 'AC9S6U03' },
  { id: 'up-s-8', items: ['photosynthesis', 'respiration', 'evaporation', 'painting'], outlier: 3, explanation: '"painting" isn’t a natural process.', acCode: 'AC9S5U01' },
  { id: 'up-s-9', items: ['heart', 'lungs', 'liver', 'pencil'], outlier: 3, explanation: '"pencil" isn’t an organ.', acCode: 'AC9S4U01' },
  { id: 'up-s-10', items: ['evaporation', 'condensation', 'precipitation', 'gravity'], outlier: 3, explanation: '"gravity" isn’t a step in the water cycle.', acCode: 'AC9S4U03' },
  { id: 'up-s-11', items: ['igneous', 'sedimentary', 'metamorphic', 'magnetic'], outlier: 3, explanation: '"magnetic" isn’t a rock category.', acCode: 'AC9S6U03' },
  { id: 'up-s-12', items: ['Mercury', 'Venus', 'Mars', 'Pluto'], outlier: 3, explanation: '"Pluto" is now classified as a dwarf planet.', acCode: 'AC9S5U03' },
  { id: 'up-s-13', items: ['producer', 'consumer', 'decomposer', 'predator'], outlier: 3, explanation: '"predator" describes behaviour; the others are food-chain roles.', acCode: 'AC9S5U01' },
  { id: 'up-s-14', items: ['sound', 'light', 'heat', 'mass'], outlier: 3, explanation: '"mass" is a property of matter, not a form of energy.', acCode: 'AC9S5U02' },
  { id: 'up-s-15', items: ['fur', 'feathers', 'scales', 'wheels'], outlier: 3, explanation: '"wheels" aren’t a natural body covering.', acCode: 'AC9S5U01' },
];

// ============================================================
//  MIDDLE SCHOOL  (Year 7 – Year 9)
// ============================================================

const MIDDLE_ENGLISH: OddItem[] = [
  { id: 'ms-e-1', items: ['simile', 'metaphor', 'hyperbole', 'syllable'], outlier: 3, explanation: '"syllable" is a phonological unit; the others are figurative devices.', acCode: 'AC9E7LE05' },
  { id: 'ms-e-2', items: ['protagonist', 'antagonist', 'narrator', 'paragraph'], outlier: 3, explanation: '"paragraph" isn’t a character role.', acCode: 'AC9E7LE02' },
  { id: 'ms-e-3', items: ['comma', 'colon', 'noun', 'semicolon'], outlier: 2, explanation: '"noun" isn’t punctuation.', acCode: 'AC9E8LA08' },
  { id: 'ms-e-4', items: ['Macbeth', 'Hamlet', 'Othello', 'Frankenstein'], outlier: 3, explanation: '"Frankenstein" is by Mary Shelley; the others are Shakespeare tragedies.', acCode: 'AC9E9LE01' },
  { id: 'ms-e-5', items: ['stanza', 'verse', 'rhyme', 'chapter'], outlier: 3, explanation: '"chapter" is a prose unit; the others are poetic.', acCode: 'AC9E9LE04' },
  { id: 'ms-e-6', items: ['noun', 'verb', 'adjective', 'paragraph'], outlier: 3, explanation: '"paragraph" is a textual structure; the others are word classes.', acCode: 'AC9E7LA03' },
  { id: 'ms-e-7', items: ['ethos', 'pathos', 'logos', 'narrator'], outlier: 3, explanation: '"narrator" isn’t a rhetorical appeal.', acCode: 'AC9E9LA01' },
  { id: 'ms-e-8', items: ['conflict', 'climax', 'resolution', 'gerund'], outlier: 3, explanation: '"gerund" is a noun form; the others are plot stages.', acCode: 'AC9E8LE02' },
  { id: 'ms-e-9', items: ['Dickens', 'Bronte', 'Austen', 'Spielberg'], outlier: 3, explanation: '"Spielberg" is a filmmaker; the others are 19th-century novelists.', acCode: 'AC9E9LE01' },
  { id: 'ms-e-10', items: ['novel', 'short story', 'novella', 'sonnet'], outlier: 3, explanation: '"sonnet" is a poem; the others are prose fiction.', acCode: 'AC9E9LE04' },
  { id: 'ms-e-11', items: ['active voice', 'passive voice', 'second person', 'imagery'], outlier: 3, explanation: '"imagery" is a literary device; the others describe sentence form.', acCode: 'AC9E8LA03' },
  { id: 'ms-e-12', items: ['onomatopoeia', 'alliteration', 'assonance', 'syllabus'], outlier: 3, explanation: '"syllabus" isn’t a sound device.', acCode: 'AC9E7LE05' },
  { id: 'ms-e-13', items: ['adverb', 'adjective', 'preposition', 'paragraph'], outlier: 3, explanation: '"paragraph" isn’t a word class.', acCode: 'AC9E7LA03' },
  { id: 'ms-e-14', items: ['comedy', 'tragedy', 'romance', 'epilogue'], outlier: 3, explanation: '"epilogue" is a structural part; the others are genres.', acCode: 'AC9E9LE03' },
  { id: 'ms-e-15', items: ['exposition', 'rising action', 'climax', 'metaphor'], outlier: 3, explanation: '"metaphor" is a device; the others are stages of narrative structure.', acCode: 'AC9E8LE02' },
];

const MIDDLE_MATHS: OddItem[] = [
  { id: 'ms-m-1', items: ['π', '√2', 'e', '4'], outlier: 3, explanation: '"4" is rational; the others are irrational.', acCode: 'AC9M8N02' },
  { id: 'ms-m-2', items: ['3, 5, 7', '11, 13, 17', '2, 4, 6', '19, 23, 29'], outlier: 2, explanation: '"2, 4, 6" are even; the others are primes.', acCode: 'AC9M7N04' },
  { id: 'ms-m-3', items: ['linear', 'quadratic', 'cubic', 'isosceles'], outlier: 3, explanation: '"isosceles" is a triangle; the others classify polynomials.', acCode: 'AC9M9A01' },
  { id: 'ms-m-4', items: ['cm', 'kg', 'mm', 'km'], outlier: 1, explanation: '"kg" is mass; the others are length.', acCode: 'AC9M7M01' },
  { id: 'ms-m-5', items: ['sin', 'cos', 'tan', 'log'], outlier: 3, explanation: '"log" is a logarithm; the others are trig ratios.', acCode: 'AC9M9M03' },
  { id: 'ms-m-6', items: ['mean', 'median', 'mode', 'range'], outlier: 3, explanation: '"range" measures spread; the others measure central tendency.', acCode: 'AC9M7ST01' },
  { id: 'ms-m-7', items: ['rhombus', 'square', 'rectangle', 'triangle'], outlier: 3, explanation: '"triangle" isn’t a quadrilateral.', acCode: 'AC9M7SP01' },
  { id: 'ms-m-8', items: ['equilateral', 'isosceles', 'scalene', 'parallelogram'], outlier: 3, explanation: '"parallelogram" is a quadrilateral; the others classify triangles.', acCode: 'AC9M7SP01' },
  { id: 'ms-m-9', items: ['1/2', '0.5', '50%', '5'], outlier: 3, explanation: '"5" is five wholes; the others equal one half.', acCode: 'AC9M7N02' },
  { id: 'ms-m-10', items: ['hypotenuse', 'opposite', 'adjacent', 'perimeter'], outlier: 3, explanation: '"perimeter" is a measurement; the others are triangle sides.', acCode: 'AC9M9M03' },
  { id: 'ms-m-11', items: ['x²', 'x + 2', '2x', '√x'], outlier: 0, explanation: '"x²" is quadratic; the others are linear or radical (degree 1 or ½).', acCode: 'AC9M9A01' },
  { id: 'ms-m-12', items: ['perimeter', 'area', 'volume', 'mass'], outlier: 3, explanation: '"mass" isn’t a measure of size/space.', acCode: 'AC9M7M02' },
  { id: 'ms-m-13', items: ['acute', 'obtuse', 'reflex', 'pentagon'], outlier: 3, explanation: '"pentagon" is a shape; the others are angle classifications.', acCode: 'AC9M7SP02' },
  { id: 'ms-m-14', items: ['ratio', 'proportion', 'rate', 'centimetre'], outlier: 3, explanation: '"centimetre" is a length unit; the others compare quantities.', acCode: 'AC9M7N09' },
  { id: 'ms-m-15', items: ['x-axis', 'y-axis', 'origin', 'hypotenuse'], outlier: 3, explanation: '"hypotenuse" is a triangle side; the others are Cartesian features.', acCode: 'AC9M8A02' },
];

const MIDDLE_HISTORY: OddItem[] = [
  { id: 'ms-h-1', items: ['Hitler', 'Stalin', 'Mussolini', 'Churchill'], outlier: 3, explanation: '"Churchill" led the Allies; the others led Axis or USSR.', acCode: 'AC9HH10K01' },
  { id: 'ms-h-2', items: ['1914', '1918', '1939', '1453'], outlier: 3, explanation: '"1453" is medieval (fall of Constantinople); the others are 20th-century war years.', acCode: 'AC9HH9K02' },
  { id: 'ms-h-3', items: ['Sparta', 'Athens', 'Thebes', 'Rome'], outlier: 3, explanation: '"Rome" isn’t a Greek city-state.', acCode: 'AC9HH7K01' },
  { id: 'ms-h-4', items: ['Magna Carta', 'Renaissance', 'Black Death', 'Smartphone'], outlier: 3, explanation: '"Smartphone" isn’t medieval/early modern.', acCode: 'AC9HH8K01' },
  { id: 'ms-h-5', items: ['Egypt', 'Mesopotamia', 'Indus Valley', 'Antarctica'], outlier: 3, explanation: '"Antarctica" wasn’t an ancient civilisation site.', acCode: 'AC9HH7K01' },
  { id: 'ms-h-6', items: ['Caesar', 'Augustus', 'Nero', 'Napoleon'], outlier: 3, explanation: '"Napoleon" was French, not Roman.', acCode: 'AC9HH7K01' },
  { id: 'ms-h-7', items: ['knight', 'serf', 'lord', 'astronaut'], outlier: 3, explanation: '"astronaut" isn’t a feudal role.', acCode: 'AC9HH8K01' },
  { id: 'ms-h-8', items: ['Gallipoli', 'Somme', 'Verdun', 'Berlin Wall'], outlier: 3, explanation: '"Berlin Wall" was Cold War; the others were WWI battles.', acCode: 'AC9HH9K02' },
  { id: 'ms-h-9', items: ['Columbus', 'Marco Polo', 'Magellan', 'Edison'], outlier: 3, explanation: '"Edison" was an inventor, not an explorer.', acCode: 'AC9HH8K01' },
  { id: 'ms-h-10', items: ['Federation 1901', 'Eureka 1854', 'First Fleet 1788', 'Moon landing 1969'], outlier: 3, explanation: '"Moon landing" isn’t Australian history.', acCode: 'AC9HH9K04' },
  { id: 'ms-h-11', items: ['Industrial Revolution', 'French Revolution', 'American Revolution', 'Quiet Revolution'], outlier: 3, explanation: '"Quiet Revolution" (Québec 1960s) is a niche later term.', acCode: 'AC9HH9K01' },
  { id: 'ms-h-12', items: ['Gandhi', 'Mandela', 'Lincoln', 'Einstein'], outlier: 3, explanation: '"Einstein" was a scientist; the others led liberation movements.', acCode: 'AC9HH10K03' },
];

const MIDDLE_GEOGRAPHY: OddItem[] = [
  { id: 'ms-g-1', items: ['tundra', 'desert', 'savanna', 'cumulus'], outlier: 3, explanation: '"cumulus" is a cloud type, not a biome.', acCode: 'AC9HG7K03' },
  { id: 'ms-g-2', items: ['Andes', 'Himalayas', 'Alps', 'Sahara'], outlier: 3, explanation: '"Sahara" is a desert.', acCode: 'AC9HG8K02' },
  { id: 'ms-g-3', items: ['Nile', 'Amazon', 'Ganges', 'Everest'], outlier: 3, explanation: '"Everest" is a mountain.', acCode: 'AC9HG8K02' },
  { id: 'ms-g-4', items: ['convergent', 'divergent', 'transform', 'equilateral'], outlier: 3, explanation: '"equilateral" is a triangle; the others are tectonic boundaries.', acCode: 'AC9HG8K03' },
  { id: 'ms-g-5', items: ['biotic', 'abiotic', 'biome', 'gigabyte'], outlier: 3, explanation: '"gigabyte" is a data unit, not a geographic term.', acCode: 'AC9HG7K03' },
  { id: 'ms-g-6', items: ['rural', 'urban', 'suburban', 'planetary'], outlier: 3, explanation: '"planetary" isn’t a settlement type.', acCode: 'AC9HG9K02' },
  { id: 'ms-g-7', items: ['Tasman', 'Coral', 'Arafura', 'Mediterranean'], outlier: 3, explanation: '"Mediterranean" isn’t around Australia.', acCode: 'AC9HG8K02' },
  { id: 'ms-g-8', items: ['drought', 'flood', 'bushfire', 'opera'], outlier: 3, explanation: '"opera" isn’t a natural hazard.', acCode: 'AC9HG8K03' },
  { id: 'ms-g-9', items: ['migration', 'urbanisation', 'industrialisation', 'photosynthesis'], outlier: 3, explanation: '"photosynthesis" is biology, not human geography.', acCode: 'AC9HG9K02' },
  { id: 'ms-g-10', items: ['compass', 'satellite', 'GPS', 'telescope'], outlier: 3, explanation: '"telescope" is for astronomy, not navigation.', acCode: 'AC9HG7S02' },
  { id: 'ms-g-11', items: ['Murray', 'Darling', 'Snowy', 'Thames'], outlier: 3, explanation: '"Thames" is English; the others are Australian.', acCode: 'AC9HG7K02' },
  { id: 'ms-g-12', items: ['birth rate', 'death rate', 'life expectancy', 'square root'], outlier: 3, explanation: '"square root" is a maths term, not a demographic measure.', acCode: 'AC9HG9K02' },
];

const MIDDLE_SCIENCE: OddItem[] = [
  { id: 'ms-s-1', items: ['element', 'compound', 'mixture', 'sentence'], outlier: 3, explanation: '"sentence" isn’t a substance classification.', acCode: 'AC9S8U02' },
  { id: 'ms-s-2', items: ['nucleus', 'mitochondria', 'cell wall', 'pixel'], outlier: 3, explanation: '"pixel" is from digital screens, not biology.', acCode: 'AC9S8U01' },
  { id: 'ms-s-3', items: ['gravity', 'friction', 'magnetism', 'volume'], outlier: 3, explanation: '"volume" measures space; the others are forces.', acCode: 'AC9S9U02' },
  { id: 'ms-s-4', items: ['proton', 'neutron', 'electron', 'photon'], outlier: 3, explanation: '"photon" is light energy; the others are particles in atoms.', acCode: 'AC9S8U02' },
  { id: 'ms-s-5', items: ['acid', 'base', 'salt', 'magnet'], outlier: 3, explanation: '"magnet" isn’t a chemistry category.', acCode: 'AC9S9U02' },
  { id: 'ms-s-6', items: ['Mercury', 'Venus', 'Pluto', 'Jupiter'], outlier: 2, explanation: '"Pluto" is now a dwarf planet.', acCode: 'AC9S7U04' },
  { id: 'ms-s-7', items: ['DNA', 'RNA', 'chromosome', 'voltage'], outlier: 3, explanation: '"voltage" is electrical; the others are genetic.', acCode: 'AC9S8U01' },
  { id: 'ms-s-8', items: ['Newton', 'Pascal', 'Joule', 'Metre'], outlier: 3, explanation: '"Metre" is a unit of length; the others are derived units (force, pressure, energy).', acCode: 'AC9S8U03' },
  { id: 'ms-s-9', items: ['igneous', 'sedimentary', 'metamorphic', 'metallic'], outlier: 3, explanation: '"metallic" describes bonding, not rock types.', acCode: 'AC9S9U03' },
  { id: 'ms-s-10', items: ['mitosis', 'meiosis', 'photosynthesis', 'cell division'], outlier: 2, explanation: '"photosynthesis" makes food; the others involve cell division.', acCode: 'AC9S9U01' },
  { id: 'ms-s-11', items: ['solid', 'liquid', 'gas', 'pressure'], outlier: 3, explanation: '"pressure" isn’t a state of matter.', acCode: 'AC9S7U02' },
  { id: 'ms-s-12', items: ['conduction', 'convection', 'radiation', 'evaporation'], outlier: 3, explanation: '"evaporation" is a phase change; the others are heat-transfer methods.', acCode: 'AC9S7U02' },
  { id: 'ms-s-13', items: ['herbivore', 'carnivore', 'producer', 'predator'], outlier: 2, explanation: '"producer" makes its own food (plants); the others consume.', acCode: 'AC9S7U01' },
  { id: 'ms-s-14', items: ['kilogram', 'kelvin', 'second', 'pixel'], outlier: 3, explanation: '"pixel" isn’t an SI base unit.', acCode: 'AC9S8U03' },
  { id: 'ms-s-15', items: ['hypothesis', 'experiment', 'observation', 'opinion'], outlier: 3, explanation: '"opinion" isn’t part of the scientific method.', acCode: 'AC9S7I02' },
];

// ============================================================
//  SENIOR SCHOOL  (Year 10 – Year 12)
// ============================================================

const SENIOR_ENGLISH: OddItem[] = [
  { id: 'ss-e-1', items: ['logos', 'pathos', 'ethos', 'thesis'], outlier: 3, explanation: '"thesis" is an argument statement; the others are Aristotelian appeals.', acCode: 'AC9E10LA01' },
  { id: 'ss-e-2', items: ['Joyce', 'Woolf', 'Faulkner', 'Spielberg'], outlier: 3, explanation: '"Spielberg" is a filmmaker; the others are modernist novelists.', acCode: 'AC9E10LE03' },
  { id: 'ss-e-3', items: ['epic', 'sonnet', 'ode', 'novella'], outlier: 3, explanation: '"novella" is prose; the others are poetic forms.', acCode: 'AC9E10LE04' },
  { id: 'ss-e-4', items: ['catharsis', 'hubris', 'hamartia', 'iambic'], outlier: 3, explanation: '"iambic" is metre; the others are Aristotelian tragedy concepts.', acCode: 'AC9E10LE04' },
  { id: 'ss-e-5', items: ['Atwood', 'Orwell', 'Huxley', 'Hemingway'], outlier: 3, explanation: '"Hemingway" wrote realism; the others are dystopian.', acCode: 'AC9E10LE02' },
  { id: 'ss-e-6', items: ['allegory', 'allusion', 'metaphor', 'plot'], outlier: 3, explanation: '"plot" is a structural element; the others are figurative devices.', acCode: 'AC9E10LE05' },
  { id: 'ss-e-7', items: ['Romanticism', 'Modernism', 'Postmodernism', 'Capitalism'], outlier: 3, explanation: '"Capitalism" is economic; the others are literary periods/movements.', acCode: 'AC9E10LE03' },
  { id: 'ss-e-8', items: ['first person', 'third person omniscient', 'third person limited', 'past tense'], outlier: 3, explanation: '"past tense" is verb form, not point of view.', acCode: 'AC9E10LE02' },
  { id: 'ss-e-9', items: ['Macbeth', 'Othello', 'King Lear', 'Frankenstein'], outlier: 3, explanation: '"Frankenstein" is Shelley; the others are Shakespeare tragedies.', acCode: 'AC9E10LE01' },
  { id: 'ss-e-10', items: ['ad hominem', 'straw man', 'red herring', 'pathos'], outlier: 3, explanation: '"pathos" is an appeal; the others are logical fallacies.', acCode: 'AC9E10LA01' },
  { id: 'ss-e-11', items: ['blank verse', 'free verse', 'iambic pentameter', 'haiku'], outlier: 3, explanation: '"haiku" is a short Japanese fixed form; the others relate to English-language verse rhythm.', acCode: 'AC9E10LE04' },
  { id: 'ss-e-12', items: ['protagonist', 'antagonist', 'foil', 'epilogue'], outlier: 3, explanation: '"epilogue" is structural; the others are character types.', acCode: 'AC9E10LE02' },
  { id: 'ss-e-13', items: ['T.S. Eliot', 'Sylvia Plath', 'Pablo Picasso', 'W.B. Yeats'], outlier: 2, explanation: '"Picasso" was a painter; the others were poets.', acCode: 'AC9E10LE01' },
  { id: 'ss-e-14', items: ['feminist', 'Marxist', 'postcolonial', 'periodic'], outlier: 3, explanation: '"periodic" relates to chemistry; the others are critical lenses.', acCode: 'AC9E10LE05' },
  { id: 'ss-e-15', items: ['exposition', 'climax', 'denouement', 'syllabus'], outlier: 3, explanation: '"syllabus" isn’t a narrative stage.', acCode: 'AC9E10LE02' },
];

const SENIOR_MATHS: OddItem[] = [
  { id: 'ss-m-1', items: ['derivative', 'integral', 'limit', 'matrix'], outlier: 3, explanation: '"matrix" is from linear algebra; the others are calculus concepts.', acCode: 'AC9M10A05' },
  { id: 'ss-m-2', items: ['e', 'π', 'φ', '√4'], outlier: 3, explanation: '"√4 = 2" is rational; the others are irrational.', acCode: 'AC9M10A04' },
  { id: 'ss-m-3', items: ['mean', 'median', 'mode', 'matrix'], outlier: 3, explanation: '"matrix" isn’t a measure of central tendency.', acCode: 'AC9M10ST01' },
  { id: 'ss-m-4', items: ['vector', 'scalar', 'tensor', 'triangle'], outlier: 3, explanation: '"triangle" is a shape; the others are quantity types.', acCode: 'AC9M10A05' },
  { id: 'ss-m-5', items: ['sin', 'cos', 'tan', 'logarithm'], outlier: 3, explanation: '"logarithm" inverts exponentiation; the others are trigonometric ratios.', acCode: 'AC9M10A03' },
  { id: 'ss-m-6', items: ['differentiation', 'integration', 'substitution', 'reflection'], outlier: 3, explanation: '"reflection" is a geometric transformation; the others are calculus operations.', acCode: 'AC9M10A05' },
  { id: 'ss-m-7', items: ['standard deviation', 'variance', 'range', 'gradient'], outlier: 3, explanation: '"gradient" measures slope; the others measure spread.', acCode: 'AC9M10ST02' },
  { id: 'ss-m-8', items: ['parabola', 'ellipse', 'hyperbola', 'rhombus'], outlier: 3, explanation: '"rhombus" is a quadrilateral; the others are conic sections.', acCode: 'AC9M10A03' },
  { id: 'ss-m-9', items: ['mutually exclusive', 'independent', 'complementary', 'congruent'], outlier: 3, explanation: '"congruent" is geometry; the others describe probability events.', acCode: 'AC9M10P01' },
  { id: 'ss-m-10', items: ['Pythagoras', 'Newton', 'Leibniz', 'Shakespeare'], outlier: 3, explanation: '"Shakespeare" was a playwright; the others were mathematicians.', acCode: 'AC9M10A05' },
  { id: 'ss-m-11', items: ['x³', 'x²', 'x', 'sin(x)'], outlier: 3, explanation: '"sin(x)" is transcendental; the others are power functions.', acCode: 'AC9M10A01' },
  { id: 'ss-m-12', items: ['arithmetic sequence', 'geometric sequence', 'Fibonacci', 'array'], outlier: 3, explanation: '"array" is a programming/storage term; the others are number sequences.', acCode: 'AC9M10A04' },
  { id: 'ss-m-13', items: ['domain', 'range', 'function', 'protractor'], outlier: 3, explanation: '"protractor" is a measuring tool, not a function concept.', acCode: 'AC9M10A02' },
  { id: 'ss-m-14', items: ['complex', 'real', 'rational', 'sequential'], outlier: 3, explanation: '"sequential" describes ordering; the others classify numbers.', acCode: 'AC9M10A04' },
  { id: 'ss-m-15', items: ['null hypothesis', 'p-value', 'confidence interval', 'isometric'], outlier: 3, explanation: '"isometric" relates to geometry/exercise; the others are statistics terms.', acCode: 'AC9M10ST02' },
];

const SENIOR_HISTORY: OddItem[] = [
  { id: 'ss-h-1', items: ['Hitler', 'Mussolini', 'Stalin', 'Roosevelt'], outlier: 3, explanation: '"Roosevelt" led the Allies; the others led totalitarian regimes.', acCode: 'AC9HH10K01' },
  { id: 'ss-h-2', items: ['Treaty of Versailles', 'Treaty of Tordesillas', 'Yalta Conference', 'Potsdam Conference'], outlier: 1, explanation: '"Tordesillas" is from 1494; the others are 20th-century WWI/WWII events.', acCode: 'AC9HH10K01' },
  { id: 'ss-h-3', items: ['Mandela', 'Gandhi', 'King', 'Edison'], outlier: 3, explanation: '"Edison" was an inventor; the others led civil-rights movements.', acCode: 'AC9HH10K03' },
  { id: 'ss-h-4', items: ['Mabo', 'Wik', 'Stolen Generations', 'Eurovision'], outlier: 3, explanation: '"Eurovision" isn’t Australian history.', acCode: 'AC9HH10K04' },
  { id: 'ss-h-5', items: ['Cuban Missile Crisis', 'Berlin Wall', 'Vietnam War', 'WWI armistice'], outlier: 3, explanation: '"WWI armistice" (1918) predates the Cold War.', acCode: 'AC9HH10K03' },
  { id: 'ss-h-6', items: ['NATO', 'Warsaw Pact', 'UN', 'CSIRO'], outlier: 3, explanation: '"CSIRO" is an Australian research agency, not a Cold War body.', acCode: 'AC9HH10K03' },
  { id: 'ss-h-7', items: ['Holocaust', 'Apartheid', 'Stolen Generations', 'Renaissance'], outlier: 3, explanation: '"Renaissance" was a positive cultural revival; the others were systemic injustices.', acCode: 'AC9HH10K01' },
  { id: 'ss-h-8', items: ['Whitlam', 'Menzies', 'Hawke', 'Mandela'], outlier: 3, explanation: '"Mandela" was South African; the others were Australian PMs.', acCode: 'AC9HH10K04' },
  { id: 'ss-h-9', items: ['Pearl Harbor', 'D-Day', 'Battle of Britain', 'Federation'], outlier: 3, explanation: '"Federation" (1901) wasn’t a WWII event.', acCode: 'AC9HH10K01' },
  { id: 'ss-h-10', items: ['Tet Offensive', 'My Lai', 'Saigon', 'Tiananmen'], outlier: 3, explanation: '"Tiananmen" (1989) was Chinese, not Vietnam War.', acCode: 'AC9HH10K02' },
  { id: 'ss-h-11', items: ['Berlin Wall', 'Iron Curtain', 'NATO', 'Industrial Revolution'], outlier: 3, explanation: '"Industrial Revolution" predates the Cold War.', acCode: 'AC9HH10K03' },
  { id: 'ss-h-12', items: ['Apology 2008', 'Mabo 1992', 'Wik 1996', 'WWII end 1945'], outlier: 3, explanation: '"WWII end" isn’t a First Nations milestone.', acCode: 'AC9HH10K04' },
];

const SENIOR_GEOGRAPHY: OddItem[] = [
  { id: 'ss-g-1', items: ['Paris Agreement', 'Kyoto Protocol', 'Montreal Protocol', 'Geneva Convention'], outlier: 3, explanation: '"Geneva Convention" is humanitarian law, not climate.', acCode: 'AC9HG10K03' },
  { id: 'ss-g-2', items: ['ENSO', 'IOD', 'NAO', 'GDP'], outlier: 3, explanation: '"GDP" is economic; the others are climate oscillations.', acCode: 'AC9HG10K02' },
  { id: 'ss-g-3', items: ['lithosphere', 'biosphere', 'hydrosphere', 'photosphere'], outlier: 3, explanation: '"photosphere" is part of the Sun; the others are Earth systems.', acCode: 'AC9HG10K02' },
  { id: 'ss-g-4', items: ['urbanisation', 'globalisation', 'industrialisation', 'photosynthesis'], outlier: 3, explanation: '"photosynthesis" is biology; the others are global human processes.', acCode: 'AC9HG10K01' },
  { id: 'ss-g-5', items: ['birth rate', 'fertility rate', 'life expectancy', 'isobar'], outlier: 3, explanation: '"isobar" is a pressure line on a map.', acCode: 'AC9HG10K01' },
  { id: 'ss-g-6', items: ['drought', 'flood', 'cyclone', 'eclipse'], outlier: 3, explanation: '"eclipse" is astronomical, not a natural hazard.', acCode: 'AC9HG10K03' },
  { id: 'ss-g-7', items: ['Tokyo', 'Delhi', 'São Paulo', 'Hobart'], outlier: 3, explanation: '"Hobart" isn’t a megacity (10M+).', acCode: 'AC9HG10K01' },
  { id: 'ss-g-8', items: ['GIS', 'GPS', 'GDP', 'remote sensing'], outlier: 2, explanation: '"GDP" is economic; the others are spatial/geographic tools.', acCode: 'AC9HG10S02' },
  { id: 'ss-g-9', items: ['rural-urban migration', 'urban heat island', 'Anthropocene', 'isosceles'], outlier: 3, explanation: '"isosceles" is geometry; the others are geographic concepts.', acCode: 'AC9HG10K01' },
  { id: 'ss-g-10', items: ['Great Barrier Reef', 'Kakadu', 'Daintree', 'Eiffel Tower'], outlier: 3, explanation: '"Eiffel Tower" isn’t Australian.', acCode: 'AC9HG10K02' },
  { id: 'ss-g-11', items: ['primary', 'secondary', 'tertiary', 'spherical'], outlier: 3, explanation: '"spherical" is shape; the others classify industries.', acCode: 'AC9HG10K01' },
  { id: 'ss-g-12', items: ['Gini', 'HDI', 'GDP per capita', 'Richter'], outlier: 3, explanation: '"Richter" measures earthquake magnitude; the others measure development.', acCode: 'AC9HG10K01' },
];

const SENIOR_SCIENCE: OddItem[] = [
  { id: 'ss-s-1', items: ['mitochondria', 'ribosome', 'chloroplast', 'algorithm'], outlier: 3, explanation: '"algorithm" is computing; the others are cell organelles.', acCode: 'AC9S10U01' },
  { id: 'ss-s-2', items: ['ionic bond', 'covalent bond', 'metallic bond', 'pH bond'], outlier: 3, explanation: '"pH bond" isn’t a chemical bond type.', acCode: 'AC9S10U02' },
  { id: 'ss-s-3', items: ['Newton’s 1st law', 'Newton’s 2nd law', 'Newton’s 3rd law', 'Murphy’s law'], outlier: 3, explanation: '"Murphy’s law" is a humorous saying, not physics.', acCode: 'AC9S10U02' },
  { id: 'ss-s-4', items: ['Big Bang', 'Hubble’s Law', 'redshift', 'Doppler effect'], outlier: 3, explanation: 'All four are related — but "Doppler effect" applies to sound and light generally, not just cosmology.', acCode: 'AC9S10U04' },
  { id: 'ss-s-5', items: ['DNA', 'RNA', 'mitosis', 'velocity'], outlier: 3, explanation: '"velocity" is physics; the others are molecular biology.', acCode: 'AC9S10U01' },
  { id: 'ss-s-6', items: ['acid', 'base', 'buffer', 'matrix'], outlier: 3, explanation: '"matrix" is from maths/biology, not pH chemistry.', acCode: 'AC9S10U02' },
  { id: 'ss-s-7', items: ['proton', 'neutron', 'electron', 'photon'], outlier: 3, explanation: '"photon" carries electromagnetic energy; the others are subatomic particles in atoms.', acCode: 'AC9S10U02' },
  { id: 'ss-s-8', items: ['kinetic', 'potential', 'thermal', 'cellular'], outlier: 3, explanation: '"cellular" is biological; the others are forms of energy.', acCode: 'AC9S10U02' },
  { id: 'ss-s-9', items: ['voltage', 'current', 'resistance', 'pressure'], outlier: 3, explanation: '"pressure" is mechanical; the others are electrical quantities.', acCode: 'AC9S10U02' },
  { id: 'ss-s-10', items: ['natural selection', 'genetic drift', 'mutation', 'osmosis'], outlier: 3, explanation: '"osmosis" is a transport process; the others drive evolution.', acCode: 'AC9S10U01' },
  { id: 'ss-s-11', items: ['Hubble', 'Hawking', 'Sagan', 'Picasso'], outlier: 3, explanation: '"Picasso" was a painter; the others were astrophysicists/cosmologists.', acCode: 'AC9S10U04' },
  { id: 'ss-s-12', items: ['evaporation', 'condensation', 'sublimation', 'fission'], outlier: 3, explanation: '"fission" is nuclear; the others are phase changes.', acCode: 'AC9S10U02' },
  { id: 'ss-s-13', items: ['catalyst', 'reactant', 'product', 'magnet'], outlier: 3, explanation: '"magnet" isn’t a chemical-reaction term.', acCode: 'AC9S10U02' },
  { id: 'ss-s-14', items: ['mitosis', 'meiosis', 'gamete', 'enzyme'], outlier: 3, explanation: '"enzyme" is a biological catalyst; the others relate to cell division.', acCode: 'AC9S10U01' },
  { id: 'ss-s-15', items: ['Kepler', 'Galileo', 'Copernicus', 'Mendel'], outlier: 3, explanation: '"Mendel" pioneered genetics; the others were astronomers.', acCode: 'AC9S10U04' },
];

// ============================================================
//  SENIOR — COMPUTING  (VCE Software Development Units 3–4)
//  Anchored to VCAA Applied Computing Study Design 2025–2028.
// ============================================================
const SENIOR_COMPUTING: OddItem[] = [
  // -- Unit 3 AOS 1: Programming --
  { id: 'ss-comp-1', items: ['abstraction', 'encapsulation', 'inheritance', 'iteration'], outlier: 3, explanation: '"iteration" is a control structure; the others are OOP principles.' },
  { id: 'ss-comp-2', items: ['sequence', 'selection', 'iteration', 'encapsulation'], outlier: 3, explanation: '"encapsulation" is an OOP principle; the others are control structures.' },
  { id: 'ss-comp-3', items: ['integer', 'string', 'Boolean', 'array'], outlier: 3, explanation: '"array" is a data structure; the others are primitive data types.' },
  { id: 'ss-comp-4', items: ['1D array', '2D array', 'record', 'breakpoint'], outlier: 3, explanation: '"breakpoint" is a debugging tool; the others are data structures.' },
  { id: 'ss-comp-5', items: ['TXT', 'CSV', 'XML', 'JPG'], outlier: 3, explanation: '"JPG" is an image format; the others are data-source file formats.' },
  { id: 'ss-comp-6', items: ['Hungarian notation', 'camelCase', 'snake_case', 'pseudocode'], outlier: 3, explanation: '"pseudocode" is a design tool; the others are naming conventions.' },
  { id: 'ss-comp-7', items: ['existence check', 'type check', 'range check', 'binary search'], outlier: 3, explanation: '"binary search" is a search algorithm; the others are validation techniques.' },
  { id: 'ss-comp-8', items: ['selection sort', 'quick sort', 'merge sort', 'linear search'], outlier: 3, explanation: '"linear search" is a search; the others are sorting algorithms.' },
  { id: 'ss-comp-9', items: ['linear search', 'binary search', 'sequential search', 'bubble sort'], outlier: 3, explanation: '"bubble sort" is a sort; the others are searches.' },
  { id: 'ss-comp-10', items: ['syntax error', 'logic error', 'runtime error', 'permission error'], outlier: 3, explanation: '"permission error" isn\'t a VCAA category; the three errors recognised are syntax, logic and runtime.' },
  { id: 'ss-comp-11', items: ['overflow', 'index out of range', 'divide by zero', 'missing semicolon'], outlier: 3, explanation: '"missing semicolon" is a syntax error; the others are runtime errors.' },
  { id: 'ss-comp-12', items: ['breakpoint', 'debugging statement', 'testing table', 'mood board'], outlier: 3, explanation: '"mood board" is an ideation tool; the others are debugging/testing techniques.' },
  { id: 'ss-comp-13', items: ['IPO chart', 'data dictionary', 'pseudocode', 'Gantt chart'], outlier: 3, explanation: '"Gantt chart" is a project-management tool; the others are software design tools.' },
  { id: 'ss-comp-14', items: ['FOR', 'WHILE', 'REPEAT...UNTIL', 'IF...ELSE'], outlier: 3, explanation: '"IF...ELSE" is selection; the others are iteration constructs.' },
  { id: 'ss-comp-15', items: ['variable', 'constant', 'function', 'compiler'], outlier: 3, explanation: '"compiler" is a tool; the others are language constructs you write.' },
  { id: 'ss-comp-16', items: ['class', 'object', 'method', 'process'], outlier: 3, explanation: '"process" is OS terminology; the others are OOP constructs.' },
  { id: 'ss-comp-17', items: ['integer', 'floating point', 'date/time', 'JSON'], outlier: 3, explanation: '"JSON" is a data format; the others are numeric/temporal data types.' },
  { id: 'ss-comp-18', items: ['public', 'protected', 'private', 'parallel'], outlier: 3, explanation: '"parallel" isn\'t an access modifier.' },
  { id: 'ss-comp-19', items: ['= (assignment)', '== (equality)', '> (greater than)', '+ (addition)'], outlier: 3, explanation: '"+" is arithmetic; the others are assignment/comparison operators.' },
  { id: 'ss-comp-20', items: ['AND', 'OR', 'NOT', 'WHILE'], outlier: 3, explanation: '"WHILE" is iteration; the others are logical operators.' },
  { id: 'ss-comp-21', items: ['camelCase', 'snake_case', 'PascalCase', 'binary'], outlier: 3, explanation: '"binary" is a number system; the others are naming/case conventions.' },
  { id: 'ss-comp-22', items: ['comment', 'docstring', 'placeholder stub', 'compiler flag'], outlier: 3, explanation: '"compiler flag" is a build option; the others are internal documentation.' },
  { id: 'ss-comp-23', items: ['function', 'method', 'procedure', 'attribute'], outlier: 3, explanation: '"attribute" is data; the others are callable code units.' },
  { id: 'ss-comp-24', items: ['analysis', 'design', 'development', 'deployment'], outlier: 3, explanation: '"deployment" isn\'t in the VCAA four-stage methodology — the four stages are analysis, design, development and evaluation.' },
  { id: 'ss-comp-25', items: ['low-code platforms', 'AI code generators', 'automated debugging', 'magnetic tape'], outlier: 3, explanation: '"magnetic tape" isn\'t a current programming trend; the others are emerging programming trends.' },

  // -- Unit 3 AOS 2: Analysis & Design --
  { id: 'ss-comp-26', items: ['task identification', 'sequencing', 'time allocation', 'compiling'], outlier: 3, explanation: '"compiling" is build-time; the others are Gantt/project-management features.' },
  { id: 'ss-comp-27', items: ['milestone', 'dependency', 'critical path', 'array'], outlier: 3, explanation: '"array" is a data structure; the others are project-management terms.' },
  { id: 'ss-comp-28', items: ['interview', 'survey', 'observation', 'mock-up'], outlier: 3, explanation: '"mock-up" is a design tool; the others are data-collection methods.' },
  { id: 'ss-comp-29', items: ['functional requirement', 'non-functional requirement', 'constraint', 'iteration'], outlier: 3, explanation: '"iteration" is a control structure; the others are analysis artefacts.' },
  { id: 'ss-comp-30', items: ['economic', 'legal', 'social', 'syntactic'], outlier: 3, explanation: '"syntactic" isn\'t a study-design constraint category; the four categories are economic, legal, social and technical.' },
  { id: 'ss-comp-31', items: ['context diagram', 'data flow diagram', 'use case diagram', 'Venn diagram'], outlier: 3, explanation: '"Venn diagram" is a maths tool; the others are analytical tools for software analysis.' },
  { id: 'ss-comp-32', items: ['actor', 'use case', 'system boundary', 'database'], outlier: 3, explanation: '"database" isn\'t a use-case-diagram element; the other three are.' },
  { id: 'ss-comp-33', items: ['process', 'entity', 'data store', 'class'], outlier: 3, explanation: '"class" is OOP; the other three are DFD components.' },
  { id: 'ss-comp-34', items: ['requirements', 'constraints', 'scope', 'colour scheme'], outlier: 3, explanation: '"colour scheme" isn\'t a typical SRS section; the other three are.' },
  { id: 'ss-comp-35', items: ['full backup', 'incremental backup', 'differential backup', 'parallel backup'], outlier: 3, explanation: '"parallel backup" isn\'t a recognised backup type — full, incremental and differential are.' },
  { id: 'ss-comp-36', items: ['naming conventions', 'version control', 'backups', 'profiling'], outlier: 3, explanation: '"profiling" is performance analysis; the others are file-management techniques.' },
  { id: 'ss-comp-37', items: ['mood board', 'brainstorming', 'mind map', 'data dictionary'], outlier: 3, explanation: '"data dictionary" is a detailed design tool; the others are ideation tools.' },
  { id: 'ss-comp-38', items: ['data dictionary', 'mock-up', 'IPO chart', 'mood board'], outlier: 3, explanation: '"mood board" is ideation; the others are detailed design tools.' },
  { id: 'ss-comp-39', items: ['affordance', 'interoperability', 'usability', 'compilation'], outlier: 3, explanation: '"compilation" is a build step; the others are UX characteristics.' },
  { id: 'ss-comp-40', items: ['alignment', 'balance', 'contrast', 'recursion'], outlier: 3, explanation: '"recursion" is a programming technique; the others are design principles.' },
  { id: 'ss-comp-41', items: ['Copyright Act 1968', 'Privacy Act 1988', 'Privacy and Data Protection Act 2014', 'Magna Carta'], outlier: 3, explanation: '"Magna Carta" isn\'t a current Australian act; the others are study-design legal references.' },
  { id: 'ss-comp-42', items: ['APP 1', 'APP 6', 'APP 11', 'APP 99'], outlier: 3, explanation: 'There are 13 Australian Privacy Principles (APP 1–13); APP 99 doesn\'t exist.' },
  { id: 'ss-comp-43', items: ['brief', 'project plan', 'SRS', 'unit test'], outlier: 3, explanation: '"unit test" is a development artefact; the others are analysis/planning artefacts.' },
  { id: 'ss-comp-44', items: ['problem outline', 'proposed users', 'programming language', 'compiler flags'], outlier: 3, explanation: '"compiler flags" don\'t belong in a brief; the other three do.' },
  { id: 'ss-comp-45', items: ['sketches', 'annotations', 'mood boards', 'pseudocode'], outlier: 3, explanation: '"pseudocode" is a design tool; the others are ideation outputs.' },

  // -- Unit 4 AOS 1: Development & Evaluation --
  { id: 'ss-comp-46', items: ['user-centred design', 'clear concise code', 'detailed internal documentation', 'shortest possible variable names'], outlier: 3, explanation: 'Cryptic short names hurt readability; the others are characteristics of efficient/effective solutions.' },
  { id: 'ss-comp-47', items: ['public', 'protected', 'private', 'pseudo'], outlier: 3, explanation: '"pseudo" isn\'t an access modifier.' },
  { id: 'ss-comp-48', items: ['code repository', 'API', 'library', 'mood board'], outlier: 3, explanation: '"mood board" is design ideation; the others are dev-time tools/approaches.' },
  { id: 'ss-comp-49', items: ['breakpoint', 'commenting out code', 'test case', 'sketch'], outlier: 3, explanation: '"sketch" is ideation; the others are debugging/alpha-testing techniques.' },
  { id: 'ss-comp-50', items: ['alpha testing', 'beta testing', 'unit testing', 'colour testing'], outlier: 3, explanation: '"colour testing" isn\'t a software testing category; the other three are.' },
  { id: 'ss-comp-51', items: ['test plan', 'test scenarios', 'observation', 'salary review'], outlier: 3, explanation: '"salary review" isn\'t a beta-testing element; the other three are.' },
  { id: 'ss-comp-52', items: ['criteria', 'time frame', 'responsibility', 'colour palette'], outlier: 3, explanation: '"colour palette" isn\'t an evaluation-strategy feature; the other three are.' },
  { id: 'ss-comp-53', items: ['scope creep', 'personnel changes', 'technical issues', 'sunny weather'], outlier: 3, explanation: 'Weather isn\'t a recognised project-plan effectiveness factor.' },
  { id: 'ss-comp-54', items: ['Gantt chart', 'project journal', 'log', 'compiler'], outlier: 3, explanation: '"compiler" is a build tool; the others are progress-recording tools.' },
  { id: 'ss-comp-55', items: ['typical input', 'boundary input', 'invalid input', 'random emoji'], outlier: 3, explanation: 'Random emoji isn\'t a recognised test-data category; the other three are.' },
  { id: 'ss-comp-56', items: ['accessibility', 'maintainability', 'reliability', 'syntax'], outlier: 3, explanation: '"syntax" is a programming concept; the others are non-functional quality attributes.' },
  { id: 'ss-comp-57', items: ['adjust tasks', 'adjust timeframes', 'annotate project plan', 'rename project file'], outlier: 3, explanation: 'Renaming the file is admin; the others are recognised progress-recording techniques.' },
  { id: 'ss-comp-58', items: ['evaluate efficiency', 'evaluate effectiveness', 'assess the project plan', 'rewrite the brief'], outlier: 3, explanation: 'Rewriting the brief isn\'t part of the evaluation stage.' },
  { id: 'ss-comp-59', items: ['version control', 'code repository', 'branch', 'inheritance'], outlier: 3, explanation: '"inheritance" is an OOP concept; the others are source-management terms.' },
  { id: 'ss-comp-60', items: ['observation', 'documentation of results', 'test scenarios', 'colour grading'], outlier: 3, explanation: '"colour grading" is a film term; the others are beta-testing strategy elements.' },

  // -- Unit 4 AOS 2: Cyber security: secure dev practices --
  { id: 'ss-comp-61', items: ['malware', 'unpatched software', 'man-in-the-middle attack', 'firewall'], outlier: 3, explanation: '"firewall" is a security control; the others are threats/vulnerabilities.' },
  { id: 'ss-comp-62', items: ['version control', 'encryption', 'code review', 'phishing'], outlier: 3, explanation: '"phishing" is an attack; the others are security controls.' },
  { id: 'ss-comp-63', items: ['virus', 'worm', 'ransomware', 'JSON'], outlier: 3, explanation: '"JSON" is a data format; the others are malware types.' },
  { id: 'ss-comp-64', items: ['define security requirements', 'identify threats', 'mitigate threats', 'launch marketing'], outlier: 3, explanation: 'Marketing isn\'t a threat-modelling step; the other three are.' },
  { id: 'ss-comp-65', items: ['Essential Eight', 'Information Security Manual', 'AI Ethics Principles', 'Periodic Table'], outlier: 3, explanation: 'The Periodic Table is chemistry; the others are cyber-relevant Australian frameworks.' },
  { id: 'ss-comp-66', items: ['insider threat', 'man-in-the-middle', 'supply-chain attack', 'syntax error'], outlier: 3, explanation: '"syntax error" is a coding bug, not a security threat.' },
  { id: 'ss-comp-67', items: ['confidentiality', 'integrity', 'availability', 'verbosity'], outlier: 3, explanation: '"verbosity" isn\'t a CIA triad element; the other three are the foundations of infosec.' },
  { id: 'ss-comp-68', items: ['separated environments', 'patching', 'code review', 'shared admin password'], outlier: 3, explanation: 'A shared admin password is poor practice; the others are good security controls.' },
  { id: 'ss-comp-69', items: ['MFA', 'least privilege', 'patching', 'colour theme'], outlier: 3, explanation: 'Colour theme isn\'t a security control; the other three are.' },
  { id: 'ss-comp-70', items: ['Copyright Act 1968', 'Essential Eight', 'ISM', 'AC9MA10'], outlier: 3, explanation: '"AC9MA10" is an Australian Curriculum maths code; the others are cyber-security legal/framework references.' },
  { id: 'ss-comp-71', items: ['onboarding training', 'risk management plan', 'code review', 'colour palette'], outlier: 3, explanation: 'Colour palette isn\'t a secure-dev improvement strategy; the others are.' },
  { id: 'ss-comp-72', items: ['encryption at rest', 'encryption in transit', 'hashed passwords', 'plaintext storage'], outlier: 3, explanation: 'Plaintext storage is exactly what good security avoids; the others are protective practices.' },
  { id: 'ss-comp-73', items: ['intellectual property', 'copyright', 'AI ethics', 'compile time'], outlier: 3, explanation: '"compile time" is a build concept; the others are ethical/legal concerns in secure development.' },
  { id: 'ss-comp-74', items: ['development environment', 'testing environment', 'production environment', 'fashion environment'], outlier: 3, explanation: 'Fashion isn\'t a software environment; the other three are the separated dev/test/prod tiers.' },
  { id: 'ss-comp-75', items: ['APP 11 (security)', 'APP 6 (use/disclosure)', 'IPP 4 (security)', 'TCP/IP'], outlier: 3, explanation: '"TCP/IP" is a networking protocol; the others are privacy-principle references.' },
];

// ============================================================
//  SENIOR — SOCIOLOGY (VCE Sociology Units 3–4)
//  Anchored to VCAA Sociology Study Design 2024.
// ============================================================
const SENIOR_SOCIOLOGY: OddItem[] = [
  // -- Unit 3 AOS 1: Indigenous cultures --
  { id: 'ss-soc-1', items: ['Charles Wright Mills', 'Evan Willis', 'Stuart Hall', 'Erica Chenoweth'], outlier: 3, explanation: '"Chenoweth" is the social-movements theorist; the others are most associated with the sociological imagination and culture.' },
  { id: 'ss-soc-2', items: ['Tools', 'Clothing', 'Artworks', 'Beliefs'], outlier: 3, explanation: '"Beliefs" are non-material culture; the others are material.' },
  { id: 'ss-soc-3', items: ['Values', 'Language', 'Norms', 'Pottery'], outlier: 3, explanation: '"Pottery" is material culture; the others are non-material.' },
  { id: 'ss-soc-4', items: ['Wurundjeri', 'Yorta Yorta', 'Larrakia', 'Vietnamese'], outlier: 3, explanation: '"Vietnamese" is an ethnic group; the others are Australian Indigenous nations.' },
  { id: 'ss-soc-5', items: ['Protection', 'Segregation', 'Assimilation', 'Reconciliation'], outlier: 3, explanation: '"Reconciliation" is a contemporary process; the others are suppression-era government policies.' },
  { id: 'ss-soc-6', items: ['Mabo decision', 'The Apology', 'Uluru Statement', 'The Intervention'], outlier: 3, explanation: '"The Intervention" (NTER) is a suppression-era policy; the others are reconciliation milestones.' },
  { id: 'ss-soc-7', items: ['Acknowledgement of Country', 'Welcome to Country', 'The Apology', 'Closing the Gap'], outlier: 3, explanation: '"Closing the Gap" is practical reconciliation; the others are symbolic.' },
  { id: 'ss-soc-8', items: ['Terra nullius', 'One Indigenous culture', 'Arid-areas-only', 'Cultural diversity'], outlier: 3, explanation: '"Cultural diversity" is a fact; the others are public misconceptions VCAA identifies.' },
  { id: 'ss-soc-9', items: ['Stolen Generations', 'Mission stations', 'Forced removal', 'Native title'], outlier: 3, explanation: '"Native title" is a contemporary legal recognition; the others are products of suppression-era policy.' },
  { id: 'ss-soc-10', items: ['Ethnocentric', 'Culturally relativist', 'Symbolic', 'Practical'], outlier: 0, explanation: '"Ethnocentric" is the only term in that pair; the other three connect to reconciliation or representation analysis differently — VCAA pairs ethnocentric vs culturally relativist; symbolic vs practical reconciliation.' },
  { id: 'ss-soc-11', items: ['1788', '1901', '1992', '2008'], outlier: 0, explanation: '1788 is European arrival; the others are reconciliation milestones (Federation, Mabo, Apology).' },
  { id: 'ss-soc-12', items: ['Songlines', 'Dreaming stories', 'Language', 'Boomerangs'], outlier: 3, explanation: '"Boomerangs" are material culture; the others are non-material.' },
  { id: 'ss-soc-13', items: ['Sociological imagination', 'Historical facet', 'Cultural facet', 'Algorithmic facet'], outlier: 3, explanation: '"Algorithmic" is not one of Evan Willis\'s four facets. Willis names historical, cultural, structural and critical.' },
  { id: 'ss-soc-14', items: ['Truth telling', 'The Apology', 'Acknowledgement of Country', 'Government funding for Indigenous health'], outlier: 3, explanation: '"Funding for health" is practical reconciliation; the others are symbolic.' },
  { id: 'ss-soc-15', items: ['Mills', 'Willis', 'Keating', 'Tönnies'], outlier: 3, explanation: '"Tönnies" is the community theorist; the others connect to the sociological imagination or symbolic reconciliation.' },
  { id: 'ss-soc-16', items: ['Protection', 'Assimilation', 'Integration', 'Multiculturalism'], outlier: 3, explanation: '"Multiculturalism" celebrates diversity; the others are suppression-era policies.' },
  { id: 'ss-soc-17', items: ['Material culture', 'Non-material culture', 'Sociological imagination', 'Coercive power'], outlier: 3, explanation: '"Coercive power" belongs to social movements; the others are U3 culture concepts.' },
  { id: 'ss-soc-18', items: ['Stereotyping', 'Prejudice', 'Discrimination', 'Reconciliation'], outlier: 3, explanation: '"Reconciliation" repairs harm; the others can perpetuate it.' },

  // -- Unit 3 AOS 2: Ethnicity --
  { id: 'ss-soc-19', items: ['Ethnicity', 'Race', 'Hybridity', 'Multiculturalism'], outlier: 1, explanation: '"Race" is the category sociologists largely reject; the others are sociologically accepted concepts.' },
  { id: 'ss-soc-20', items: ['Voluntary participation', 'Informed consent', 'Privacy', 'Coercive participation'], outlier: 3, explanation: '"Coercive participation" violates ethical methodology; the others are its required elements.' },
  { id: 'ss-soc-21', items: ['Stuart Hall', 'Cultural hybridity', 'Diaspora', 'Stanley Cohen'], outlier: 3, explanation: '"Stanley Cohen" wrote on moral panic (Unit 2); the others connect to ethnicity / hybridity.' },
  { id: 'ss-soc-22', items: ['Othering', 'In-group', 'Out-group', 'Practical reconciliation'], outlier: 3, explanation: '"Practical reconciliation" is U3 AOS 1; the others connect to othering and ethnicity.' },
  { id: 'ss-soc-23', items: ['White Australia Policy', 'Assimilation policy', 'Integration policy', 'Multiculturalism'], outlier: 3, explanation: '"Multiculturalism" (1973+) replaced the exclusionary policies the others represent.' },
  { id: 'ss-soc-24', items: ['Whitlam government', '1973', 'Multiculturalism', '1788'], outlier: 3, explanation: '"1788" is European arrival; the others mark the introduction of multiculturalism.' },
  { id: 'ss-soc-25', items: ['Confidentiality of data', 'Privacy', 'Informed consent', 'Loud disclosure'], outlier: 3, explanation: 'There is no "loud disclosure" principle; the others are real ethical elements.' },
  { id: 'ss-soc-26', items: ['Diaspora', 'Migration', 'Hybridity', 'Coercive power'], outlier: 3, explanation: '"Coercive power" is from U4 social movements; the others connect to ethnicity.' },
  { id: 'ss-soc-27', items: ['Cultural practices', 'Media representations', 'Political factors', 'Geographical proximity'], outlier: 3, explanation: '"Geographical proximity" belongs to community theory; the others are factors influencing belonging in multicultural Australia.' },
  { id: 'ss-soc-28', items: ['Religion', 'Language', 'Cuisine', 'Census taxpayer ID'], outlier: 3, explanation: 'A "taxpayer ID" is administrative; the others are markers of cultural identity.' },
  { id: 'ss-soc-29', items: ['TASA guidelines', 'Voluntary participation', 'Informed consent', 'Astrological matching'], outlier: 3, explanation: 'Astrology is not a research methodology; the others are ethical methodology references.' },
  { id: 'ss-soc-30', items: ['Stereotype', 'Prejudice', 'Discrimination', 'Sociological imagination'], outlier: 3, explanation: 'The "sociological imagination" is an analytical tool; the others are forms of harm.' },
  { id: 'ss-soc-31', items: ['Chinese-Australian', 'Vietnamese-Australian', 'Greek-Australian', 'Wurundjeri'], outlier: 3, explanation: 'Wurundjeri is an Australian Indigenous nation, not a migrant ethnic group.' },
  { id: 'ss-soc-32', items: ['Hybridity', 'Diaspora', 'Identity', 'Bureaucratisation'], outlier: 3, explanation: '"Bureaucratisation" is a social-movement stage; the others connect to ethnicity / identity.' },
  { id: 'ss-soc-33', items: ['Ethnocentrism', 'Cultural relativism', 'Othering', 'Coalescence'], outlier: 3, explanation: '"Coalescence" is a social-movement stage; the others are culture / ethnicity concepts.' },
  { id: 'ss-soc-34', items: ['Stuart Hall', 'Cultural hybridity', 'Postmodern identity', 'Gemeinschaft'], outlier: 3, explanation: '"Gemeinschaft" is Tönnies\'s concept; the others connect to Hall\'s hybridity.' },
  { id: 'ss-soc-35', items: ['Withdrawal rights', 'Anonymity', 'Informed consent', 'Surveillance'], outlier: 3, explanation: '"Surveillance" violates ethical methodology; the others enable it.' },
  { id: 'ss-soc-36', items: ['Voluntary', 'Informed', 'Private', 'Public'], outlier: 3, explanation: 'Ethical methodology requires data NOT be public by default; the others are required elements.' },
  { id: 'ss-soc-37', items: ['Self-identification', 'Common heritage', 'Shared language', 'Visible skin colour'], outlier: 3, explanation: '"Visible skin colour" is part of the rejected concept of race; the others are ethnicity components.' },

  // -- Unit 4 AOS 1: Community --
  { id: 'ss-soc-38', items: ['Ferdinand Tönnies', 'Michel Maffesoli', 'Gemeinschaft', 'Stuart Hall'], outlier: 3, explanation: '"Stuart Hall" works on ethnicity / hybridity; the others connect to community theory.' },
  { id: 'ss-soc-39', items: ['Gemeinschaft', 'Gesellschaft', 'Neo-tribe', 'Diaspora'], outlier: 3, explanation: '"Diaspora" is an ethnicity concept; the others are community theory concepts.' },
  { id: 'ss-soc-40', items: ['Traditional', 'Rural', 'Kinship', 'Transactional'], outlier: 3, explanation: '"Transactional" describes Gesellschaft; the others describe Gemeinschaft.' },
  { id: 'ss-soc-41', items: ['Urban', 'Modern', 'Contractual', 'Kin-based'], outlier: 3, explanation: '"Kin-based" describes Gemeinschaft; the others describe Gesellschaft.' },
  { id: 'ss-soc-42', items: ['Fan club', 'Music festival crowd', 'Online community', 'Medieval village'], outlier: 3, explanation: 'A medieval village is Gemeinschaft; the others are Maffesoli neo-tribes.' },
  { id: 'ss-soc-43', items: ['Active participation', 'Emotional connection', 'Belonging', 'Coercive power'], outlier: 3, explanation: '"Coercive power" is U4 AOS 2; the others build sense of community.' },
  { id: 'ss-soc-44', items: ['Economic factors', 'Social factors', 'Political factors', 'Astrological factors'], outlier: 3, explanation: 'Astrology is not a factor in community; the others are explicit study-design influences.' },
  { id: 'ss-soc-45', items: ['Climate', 'Landforms', 'Proximity', 'Algorithm'], outlier: 3, explanation: '"Algorithm" is a digital concept; the others are geographical characteristics.' },
  { id: 'ss-soc-46', items: ['ICT', 'Social media', 'Online forum', 'Town square'], outlier: 3, explanation: '"Town square" is a physical third place; the others are ICT-enabled.' },
  { id: 'ss-soc-47', items: ['Community garden', 'Sports club', 'Men\'s shed', 'Parliament'], outlier: 3, explanation: 'Parliament is a formal political institution; the others are local communities of practice.' },
  { id: 'ss-soc-48', items: ['Maffesoli', 'Neo-tribe', 'Postmodernity', 'Symbolic reconciliation'], outlier: 3, explanation: '"Symbolic reconciliation" is U3 AOS 1; the others connect to Maffesoli\'s neo-tribes.' },
  { id: 'ss-soc-49', items: ['Tönnies', 'Gemeinschaft', 'Gesellschaft', 'Cultural hybridity'], outlier: 3, explanation: '"Cultural hybridity" is Hall\'s concept; the others belong to Tönnies.' },
  { id: 'ss-soc-50', items: ['Belonging', 'Trust', 'Participation', 'Bureaucratisation'], outlier: 3, explanation: '"Bureaucratisation" is a social-movement stage; the others underpin sense of community.' },
  { id: 'ss-soc-51', items: ['Online fandom', 'Sports supporter club', 'Music subculture', 'Medieval guild'], outlier: 3, explanation: 'A medieval guild is more Gemeinschaft; the others are clear examples of Maffesoli\'s neo-tribes.' },
  { id: 'ss-soc-52', items: ['Local newsletter', 'Community festival', 'Council policy', 'Stock-market trading'], outlier: 3, explanation: '"Stock-market trading" doesn\'t build community ties; the others do.' },
  { id: 'ss-soc-53', items: ['Geographical proximity', 'Shared interest', 'Mutual ideology', 'Coercive power'], outlier: 3, explanation: '"Coercive power" is U4 AOS 2; the others are bases for community formation.' },
  { id: 'ss-soc-54', items: ['Gemeinschaft', 'Gesellschaft', 'Neo-tribe', 'Othering'], outlier: 3, explanation: '"Othering" is U3 AOS 2; the others are community-theory categories.' },
  { id: 'ss-soc-55', items: ['Kinship', 'Tradition', 'Shared values', 'Hashtag'], outlier: 3, explanation: 'A "hashtag" is a modern digital tool; the others define traditional Gemeinschaft.' },

  // -- Unit 4 AOS 2: Social movements --
  { id: 'ss-soc-56', items: ['Alternative', 'Redemptive', 'Reformative', 'Bureaucratisation'], outlier: 3, explanation: '"Bureaucratisation" is a STAGE, not a TYPE. Types: alternative, redemptive, reformative, revolutionary.' },
  { id: 'ss-soc-57', items: ['Emergence', 'Coalescence', 'Bureaucratisation', 'Revolutionary'], outlier: 3, explanation: '"Revolutionary" is a TYPE, not a STAGE. Stages: emergence, coalescence, bureaucratisation, decline.' },
  { id: 'ss-soc-58', items: ['Reward', 'Coercive', 'Referent', 'Symbolic'], outlier: 3, explanation: '"Symbolic" is from U3 reconciliation; the others are forms of power per VCAA.' },
  { id: 'ss-soc-59', items: ['Reward', 'Coercive', 'Expert', 'Bureaucratisation'], outlier: 3, explanation: '"Bureaucratisation" is a stage; the others are forms of power.' },
  { id: 'ss-soc-60', items: ['Legitimate', 'Expert', 'Informational', 'Neo-tribe'], outlier: 3, explanation: '"Neo-tribe" is community theory; the others are forms of power.' },
  { id: 'ss-soc-61', items: ['Mothers Against Drunk Driving', 'Alcoholics Anonymous', 'Environmental movement', 'A symphony orchestra'], outlier: 3, explanation: 'A symphony orchestra is not a social movement; the others are textbook examples.' },
  { id: 'ss-soc-62', items: ['Civil Rights Movement', 'Suffrage Movement', 'Climate movement', 'Census collection'], outlier: 3, explanation: 'A census is a government activity; the others are social movements.' },
  { id: 'ss-soc-63', items: ['Petition', 'Lobbying', 'Public letter', 'Coercive force'], outlier: 3, explanation: 'Coercive force is associated with violent action; the others are non-violent reformative tactics.' },
  { id: 'ss-soc-64', items: ['Erica Chenoweth', 'Non-violent civil disobedience', 'Statistical analysis of movements', 'Stuart Hall'], outlier: 3, explanation: '"Stuart Hall" works on cultural hybridity; the others connect to Chenoweth\'s research on movement success.' },
  { id: 'ss-soc-65', items: ['Co-optation', 'Repression', 'Success', 'Coalescence'], outlier: 3, explanation: '"Coalescence" is a stage; the others are causes of decline.' },
  { id: 'ss-soc-66', items: ['Alternative', 'Limited change', 'Limited population', 'Whole society'], outlier: 3, explanation: 'Alternative movements target a limited population — NOT the whole society.' },
  { id: 'ss-soc-67', items: ['Revolutionary', 'Radical change', 'Whole society', 'Limited population'], outlier: 3, explanation: 'Revolutionary movements target the WHOLE society, not a limited population.' },
  { id: 'ss-soc-68', items: ['Redemptive', 'Radical change', 'Limited population', 'Whole society'], outlier: 3, explanation: 'Redemptive movements target a LIMITED population (individuals), not the whole society.' },
  { id: 'ss-soc-69', items: ['Reformative', 'Limited change', 'Whole society', 'Radical change'], outlier: 3, explanation: 'Reformative = LIMITED change across the whole society, not radical change.' },
  { id: 'ss-soc-70', items: ['Emergence', 'Coalescence', 'Bureaucratisation', 'Hybridity'], outlier: 3, explanation: '"Hybridity" is Hall\'s ethnicity concept; the others are movement stages.' },
  { id: 'ss-soc-71', items: ['Decline', 'Coalescence', 'Bureaucratisation', 'Gemeinschaft'], outlier: 3, explanation: '"Gemeinschaft" is community theory; the others are movement stages.' },
  { id: 'ss-soc-72', items: ['Non-violent civil disobedience', 'Mass protest', 'Boycotts', 'Armed insurrection'], outlier: 3, explanation: 'Armed insurrection is violent; the others are non-violent tactics Chenoweth highlights as more effective.' },
  { id: 'ss-soc-73', items: ['Reward power', 'Coercive power', 'Material culture', 'Expert power'], outlier: 2, explanation: '"Material culture" is U3; the others are forms of power.' },
  { id: 'ss-soc-74', items: ['Social movement', 'Social change', 'Civil disobedience', 'Ethnocentrism'], outlier: 3, explanation: '"Ethnocentrism" is U3; the others belong to U4 social movements.' },
  { id: 'ss-soc-75', items: ['Charisma', 'Referent power', 'Movement leader', 'Coercive force'], outlier: 3, explanation: 'Coercive force is the opposite of referent power, which is charisma-based.' },
];

export const ODD_BANK: Bank<OddItem> = {
  byStreamSubject: {
    lower_primary: {
      english: LOWER_ENGLISH,
      maths: LOWER_MATHS,
      history: LOWER_HISTORY,
      geography: LOWER_GEOGRAPHY,
      science: LOWER_SCIENCE,
    },
    upper_primary: {
      english: UPPER_ENGLISH,
      maths: UPPER_MATHS,
      history: UPPER_HISTORY,
      geography: UPPER_GEOGRAPHY,
      science: UPPER_SCIENCE,
    },
    middle_school: {
      english: MIDDLE_ENGLISH,
      maths: MIDDLE_MATHS,
      history: MIDDLE_HISTORY,
      geography: MIDDLE_GEOGRAPHY,
      science: MIDDLE_SCIENCE,
    },
    senior_school: {
      english: SENIOR_ENGLISH,
      maths: SENIOR_MATHS,
      history: SENIOR_HISTORY,
      geography: SENIOR_GEOGRAPHY,
      science: SENIOR_SCIENCE,
      // 'computing' deliberately omitted from byStreamSubject.
      // The 75 SD3-4 OOO items are class-anchored in byClass below.
    },
  },
  byClass: {
    'vce-software-development-3-4': SENIOR_COMPUTING,
    'vce-sociology-3-4': SENIOR_SOCIOLOGY,
  },
};
