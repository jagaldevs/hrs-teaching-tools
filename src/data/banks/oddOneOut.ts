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
//  YEAR 10 — MATHEMATICS (HRS)
//  75 OOO items aligned with the topic breakdown in mcq.ts.
//  Distribution mirrors Jack's overview:
//    1. Surds & Measurement (1–10)
//    2. Algebra & Linear (11–20)
//    3. Quadratics (21–30)
//    4. Probability (31–37)
//    5. Parabolas & Rates (38–45)
//    6. Statistics (46–53)
//    7. Indices/Exp/Log (54–61)
//    8. Polynomials & Functions (62–68)
//    9. Trigonometry (69–75)
// ============================================================
const Y10_MATHS: OddItem[] = [
  // -- Topic 1: Surds and Measurement --
  { id: 'y10-math-1', items: ['√2', '√3', '√5', '√9'], outlier: 3, explanation: '√9 = 3 is rational; the others are irrational surds.' },
  { id: 'y10-math-2', items: ['√50', '√72', '√48', '√23'], outlier: 3, explanation: '√23 cannot be simplified (23 is prime); the others have perfect-square factors.' },
  { id: 'y10-math-3', items: ['Pythagoras', 'sine ratio', 'square root', 'circle area'], outlier: 1, explanation: 'Sine is a trig ratio; the others connect to right-triangle geometry or surds.' },
  { id: 'y10-math-4', items: ['cm', 'm', 'cm²', 'km'], outlier: 2, explanation: 'cm² is a unit of area; the others are units of length.' },
  { id: 'y10-math-5', items: ['radius', 'diameter', 'circumference', 'area'], outlier: 3, explanation: 'Area is 2D; the others are 1D length measurements of a circle.' },
  { id: 'y10-math-6', items: ['prism', 'cylinder', 'cone', 'circle'], outlier: 3, explanation: 'A circle is a 2D shape; the others are 3D solids.' },
  { id: 'y10-math-7', items: ['volume of sphere', 'volume of prism', 'volume of cylinder', 'surface area of cube'], outlier: 3, explanation: 'Surface area of cube is the odd measurement type; the others are volumes.' },
  { id: 'y10-math-8', items: ['πr²', 'l × w', '½ × b × h', '4πr²'], outlier: 3, explanation: '4πr² is the surface area of a sphere; the others are 2D area formulas.' },
  { id: 'y10-math-9', items: ['vertical height', 'slant height', 'base radius', 'apex angle'], outlier: 3, explanation: 'Apex angle is an angle; the others are lengths used in cone/pyramid calculations.' },
  { id: 'y10-math-10', items: ['√4', '√16', '√25', '√10'], outlier: 3, explanation: '√10 is irrational; the others are square roots of perfect squares.' },

  // -- Topic 2: Algebra and Linear Relationships --
  { id: 'y10-math-11', items: ['x', 'y', 'z', '5'], outlier: 3, explanation: '5 is a constant; the others are variables.' },
  { id: 'y10-math-12', items: ['+', '−', '×', 'x'], outlier: 3, explanation: 'x is a variable; the others are arithmetic operators.' },
  { id: 'y10-math-13', items: ['equation', 'expression', 'formula', 'angle'], outlier: 3, explanation: 'An angle is a geometric measure; the others are algebraic objects.' },
  { id: 'y10-math-14', items: ['substitution', 'elimination', 'graphing', 'differentiation'], outlier: 3, explanation: 'Differentiation is calculus; the others are simultaneous-equation methods.' },
  { id: 'y10-math-15', items: ['<', '>', '≤', '='], outlier: 3, explanation: '= is equality; the others are inequality symbols.' },
  { id: 'y10-math-16', items: ['y-intercept', 'gradient', 'midpoint', 'parabola'], outlier: 3, explanation: 'Parabola is a quadratic curve; the others are features of linear graphs.' },
  { id: 'y10-math-17', items: ['y = 3x', 'y = 3', 'y = x + 3', 'x = 3'], outlier: 3, explanation: 'x = 3 is a vertical line; the others are non-vertical lines.' },
  { id: 'y10-math-18', items: ['parallel', 'perpendicular', 'collinear', 'congruent'], outlier: 3, explanation: 'Congruent describes equal shapes; the others describe line relationships.' },
  { id: 'y10-math-19', items: ['(2, 3)', '(−1, 5)', '(4, −2)', '3x + y'], outlier: 3, explanation: '3x + y is an expression; the others are coordinate pairs.' },
  { id: 'y10-math-20', items: ['gradient = rise/run', 'm = Δy/Δx', 'slope = rise/run', 'gradient = run/rise'], outlier: 3, explanation: '"run/rise" inverts the formula; the others state gradient correctly.' },

  // -- Topic 3: Quadratics --
  { id: 'y10-math-21', items: ['x²', 'x² + 1', '2x²', 'x'], outlier: 3, explanation: 'x is linear (degree 1); the others are quadratic (degree 2).' },
  { id: 'y10-math-22', items: ['(x − 1)(x − 2)', '(x + 3)(x − 4)', 'x²', '3x + 5'], outlier: 3, explanation: '3x + 5 is linear; the others are quadratic in factored or pure form.' },
  { id: 'y10-math-23', items: ['discriminant', 'quadratic formula', 'completing the square', 'midpoint formula'], outlier: 3, explanation: 'Midpoint formula belongs to coordinate geometry; the others are quadratic-equation tools.' },
  { id: 'y10-math-24', items: ['(x + 1)²', '(x − 5)²', '(x + 3)²', '(x − 1)(x + 1)'], outlier: 3, explanation: 'The last is a difference of two squares; the others are perfect-square binomials.' },
  { id: 'y10-math-25', items: ['x² − 9', '4x² − 25', 'x² + 16', 'x² − 1'], outlier: 2, explanation: 'x² + 16 is a SUM of squares (not factorable over reals); the others are difference of two squares.' },
  { id: 'y10-math-26', items: ['perfect square', 'difference of two squares', 'common factor', 'sum of cubes'], outlier: 3, explanation: 'Sum of cubes is degree 3; the others are quadratic-factorisation patterns covered in Y10.' },
  { id: 'y10-math-27', items: ['Null Factor Law', 'quadratic formula', 'completing the square', 'limits and derivatives'], outlier: 3, explanation: 'Limits and derivatives are calculus; the others are quadratic-equation methods.' },
  { id: 'y10-math-28', items: ['monic', 'non-monic', 'binomial', 'isosceles'], outlier: 3, explanation: 'Isosceles describes triangles; the others describe quadratic expressions.' },
  { id: 'y10-math-29', items: ['x² − 6x + 9', 'x² + 4x + 4', '(x + 2)²', 'x² + 2x − 3'], outlier: 3, explanation: 'x² + 2x − 3 = (x + 3)(x − 1) is not a perfect square; the others are.' },
  { id: 'y10-math-30', items: ['Δ > 0', 'Δ = 0', 'Δ < 0', 'Δ = b²'], outlier: 3, explanation: 'Δ = b² is incorrect (Δ = b² − 4ac); the others are valid discriminant cases.' },

  // -- Topic 4: Probability --
  { id: 'y10-math-31', items: ['heads', 'tails', 'edge landing', 'sample space'], outlier: 3, explanation: 'Sample space is a concept; the others are individual coin-toss outcomes.' },
  { id: 'y10-math-32', items: ['Venn diagram', 'two-way table', 'tree diagram', 'box plot'], outlier: 3, explanation: 'Box plot is a statistics tool; the others represent probability events.' },
  { id: 'y10-math-33', items: ['mutually exclusive', 'independent', 'conditional', 'congruent'], outlier: 3, explanation: 'Congruent is a geometry term; the others describe probability event relationships.' },
  { id: 'y10-math-34', items: ['P(A ∩ B)', 'P(A ∪ B)', 'P(A | B)', 'P(A → B)'], outlier: 3, explanation: 'P(A → B) is implication notation, not probability; the others are standard probability expressions.' },
  { id: 'y10-math-35', items: ['1/2', '1/6', '0.25', '1.5'], outlier: 3, explanation: '1.5 > 1, which is invalid for a probability; the others are valid.' },
  { id: 'y10-math-36', items: ['independent', 'dependent', 'with replacement', 'arithmetic mean'], outlier: 3, explanation: 'Arithmetic mean is a statistics term; the others describe probability event relationships.' },
  { id: 'y10-math-37', items: ['without replacement', 'with replacement', 'tree diagram', 'lowest common multiple'], outlier: 3, explanation: 'LCM is a number topic; the others are probability terms.' },

  // -- Topic 5: Parabolas and Rates of Change --
  { id: 'y10-math-38', items: ['vertex', 'axis of symmetry', 'x-intercept', 'diagonal'], outlier: 3, explanation: 'Diagonal is from polygons; the others are parabola features.' },
  { id: 'y10-math-39', items: ['translation', 'reflection', 'dilation', 'iteration'], outlier: 3, explanation: 'Iteration is programming/algebra; the others are graph transformations.' },
  { id: 'y10-math-40', items: ['y = x²', 'y = (x − 1)²', 'y = x² + 5', 'y = mx + c'], outlier: 3, explanation: 'y = mx + c is a line; the others are parabolas.' },
  { id: 'y10-math-41', items: ['parabola', 'hyperbola', 'circle', 'rectangle'], outlier: 3, explanation: 'Rectangle is a polygon; the others are conic sections.' },
  { id: 'y10-math-42', items: ['Δ > 0 (2 x-int)', 'Δ = 0 (1 x-int)', 'Δ < 0 (no x-int)', 'Δ ≥ 0 (always 2 x-int)'], outlier: 3, explanation: 'The fourth conflates two cases incorrectly — Δ = 0 gives 1 root, not 2.' },
  { id: 'y10-math-43', items: ['rate of change', 'gradient', 'slope', 'volume of a prism'], outlier: 3, explanation: 'Volume is a 3D measurement; the others all describe slope.' },
  { id: 'y10-math-44', items: ['distance-time graph', 'velocity-time graph', 'parabolic trajectory', 'cumulative-frequency graph'], outlier: 3, explanation: 'Cumulative frequency is statistics; the others involve motion or rate of change.' },
  { id: 'y10-math-45', items: ['turning point', 'vertex', 'apex of parabola', 'asymptote'], outlier: 3, explanation: 'Asymptotes belong to hyperbolas / exponentials; the others describe parabola peaks.' },

  // -- Topic 6: Statistics --
  { id: 'y10-math-46', items: ['mean', 'median', 'mode', 'range'], outlier: 3, explanation: 'Range measures spread; the others measure central tendency.' },
  { id: 'y10-math-47', items: ['Q1', 'Q3', 'median', 'standard deviation'], outlier: 3, explanation: 'Standard deviation describes variability; the others are quartile values.' },
  { id: 'y10-math-48', items: ['box plot', 'histogram', 'scatter plot', 'tree diagram'], outlier: 3, explanation: 'Tree diagram is for probability; the others display data distributions.' },
  { id: 'y10-math-49', items: ['range', 'IQR', 'standard deviation', 'mean'], outlier: 3, explanation: 'Mean is central tendency; the others measure spread.' },
  { id: 'y10-math-50', items: ['interpolation', 'extrapolation', 'correlation', 'differentiation'], outlier: 3, explanation: 'Differentiation is calculus; the others are statistical / bivariate terms.' },
  { id: 'y10-math-51', items: ['positive correlation', 'negative correlation', 'no correlation', 'irrational correlation'], outlier: 3, explanation: '"Irrational correlation" is not a real category; the others are standard descriptions.' },
  { id: 'y10-math-52', items: ['categorical data', 'numerical data', 'continuous data', 'parallel data'], outlier: 3, explanation: '"Parallel" refers to lines, not data types.' },
  { id: 'y10-math-53', items: ['outlier', 'maximum value', 'minimum value', 'asymptote'], outlier: 3, explanation: 'Asymptote is a graph feature; the others describe specific data points.' },

  // -- Topic 7: Indices, Exponentials and Logarithms --
  { id: 'y10-math-54', items: ['2³', '5²', '7⁴', 'x/3'], outlier: 3, explanation: 'x/3 is a fraction; the others are powers.' },
  { id: 'y10-math-55', items: ['aᵐ × aⁿ = aᵐ⁺ⁿ', 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', '(aᵐ)ⁿ = aᵐⁿ', 'aᵐ + aⁿ = aᵐ⁺ⁿ'], outlier: 3, explanation: 'Addition is NOT an index law; the others are valid laws.' },
  { id: 'y10-math-56', items: ['exponential growth', 'exponential decay', 'compound interest', 'simple interest'], outlier: 3, explanation: 'Simple interest is linear; the others are exponential.' },
  { id: 'y10-math-57', items: ['log_a x', 'aˣ', 'ln x', '√x'], outlier: 3, explanation: '√x is a radical; the others are log/exponential functions.' },
  { id: 'y10-math-58', items: ['log_a(xy) = log_a x + log_a y', 'log_a(x/y) = log_a x − log_a y', 'log_a(xⁿ) = n log_a x', 'log_a x ÷ log_a y = log_a(x/y)'], outlier: 3, explanation: 'The quotient rule does NOT work that way; the others are valid log laws.' },
  { id: 'y10-math-59', items: ['base 10', 'base 2', 'base e', 'base 0'], outlier: 3, explanation: 'Log base 0 is undefined; the others are common log bases.' },
  { id: 'y10-math-60', items: ['Richter scale', 'pH scale', 'decibel scale', 'kilogram'], outlier: 3, explanation: 'Kilogram is a linear mass unit; the others are logarithmic scales.' },
  { id: 'y10-math-61', items: ['2⁰ = 1', '5⁰ = 1', 'π⁰ = 1', '0⁰ = 1'], outlier: 3, explanation: '0⁰ is indeterminate (typically undefined); the others are valid.' },

  // -- Topic 8: Polynomials, Functions and Graphs --
  { id: 'y10-math-62', items: ['linear', 'quadratic', 'cubic', 'logarithmic'], outlier: 3, explanation: 'Logarithmic is NOT a polynomial; the others are polynomial degrees.' },
  { id: 'y10-math-63', items: ['x', 'x²', 'x³', 'sin x'], outlier: 3, explanation: 'sin x is trigonometric, not polynomial.' },
  { id: 'y10-math-64', items: ['degree', 'leading coefficient', 'constant term', 'asymptote'], outlier: 3, explanation: 'Asymptotes belong to hyperbolas / exponentials; the others are polynomial features.' },
  { id: 'y10-math-65', items: ['f(x)', 'g(x)', 'h(x)', '3 + x'], outlier: 3, explanation: '3 + x is an expression; the others are function-notation forms.' },
  { id: 'y10-math-66', items: ['root', 'zero', 'x-intercept', 'tangent line'], outlier: 3, explanation: 'Tangent line touches a curve; the others are equivalent terms for solutions of p(x) = 0.' },
  { id: 'y10-math-67', items: ['y = x³', 'y = x² + 1', 'y = 1/x', 'y = 2ˣ'], outlier: 3, explanation: 'y = 2ˣ is exponential; the others are polynomial or rational.' },
  { id: 'y10-math-68', items: ['remainder theorem', 'factor theorem', 'binomial theorem', 'Pythagorean theorem'], outlier: 3, explanation: 'Pythagorean theorem is about triangles; the others apply to polynomials.' },

  // -- Topic 9: Trigonometry --
  { id: 'y10-math-69', items: ['sin', 'cos', 'tan', 'log'], outlier: 3, explanation: 'log is a logarithm; the others are trig ratios.' },
  { id: 'y10-math-70', items: ['hypotenuse', 'opposite', 'adjacent', 'mean'], outlier: 3, explanation: 'Mean is statistical; the others are sides of a right triangle.' },
  { id: 'y10-math-71', items: ['SOH', 'CAH', 'TOA', 'PEMDAS'], outlier: 3, explanation: 'PEMDAS is order of operations; the others are trig-ratio mnemonics.' },
  { id: 'y10-math-72', items: ['sin 30° = 0.5', 'cos 60° = 0.5', 'tan 45° = 1', 'sin 0° = 1'], outlier: 3, explanation: 'sin 0° = 0, not 1; the others are correct exact values.' },
  { id: 'y10-math-73', items: ['bearing N30°E', 'bearing 030°', 'angle 30° from north', 'angle of elevation 30°'], outlier: 3, explanation: 'Angle of elevation is from horizontal; the others all describe a bearing 30° from North.' },
  { id: 'y10-math-74', items: ['Pythagoras', 'sine ratio', 'cosine ratio', 'distance formula'], outlier: 3, explanation: 'Distance formula belongs to coordinate geometry; the others are right-triangle tools.' },
  { id: 'y10-math-75', items: ['angle of elevation', 'angle of depression', 'bearing', 'gradient'], outlier: 3, explanation: 'Gradient = slope of a line; the others are directional angles in trigonometry.' },
];

// Year 7 Humanities (HRS-anchored) — Deep Time History checkpoint batch.
const Y7_HUMANITIES: OddItem[] = [
  { id: 'y7-hum-1', items: ['hieroglyphics', 'radiocarbon dating', 'stratigraphy', 'luminescence dating'], outlier: 0, explanation: 'Hieroglyphics is a writing system; the others are scientific dating methods.' },
  { id: 'y7-hum-2', items: ['moiety', 'papyrus', 'totem', 'kinship'], outlier: 1, explanation: 'Papyrus is an Egyptian writing material; the others are First Nations social organisation terms.' },
  { id: 'y7-hum-3', items: ['kilo annum', 'mega annum', 'afterlife', 'before present'], outlier: 2, explanation: 'Afterlife is a belief; the others are Deep Time units for measuring the past.' },
  { id: 'y7-hum-4', items: ['Lake Mungo', 'Budj Bim', 'Willandra Lakes', 'Giza'], outlier: 3, explanation: 'Giza is in Egypt; the others are significant Deep Time sites in Australia.' },
  { id: 'y7-hum-5', items: ['a 2024 textbook', 'rock art', 'a stone tool', 'an ancient bone'], outlier: 0, explanation: 'A modern textbook is a secondary source; the others are primary sources from the past.' },
  { id: 'y7-hum-6', items: ['megafauna', 'Colosseum', 'Pleistocene', 'Holocene'], outlier: 1, explanation: 'The Colosseum is Roman; the others relate to Deep Time environments and eras.' },
  { id: 'y7-hum-7', items: ['bipedalism', 'large brain', 'mummification', 'tool-making'], outlier: 2, explanation: 'Mummification is an Egyptian custom; the others are human evolution traits.' },
  { id: 'y7-hum-8', items: ['the Dreaming', 'Country', 'Elders', 'pharaoh'], outlier: 3, explanation: 'Pharaoh is an Egyptian ruler; the others are First Nations cultural concepts.' },
  { id: 'y7-hum-9', items: ['Antarctica', 'Sahul', 'Tasmania', 'New Guinea'], outlier: 0, explanation: 'Antarctica was never part of Sahul; the others joined together as that ancient landmass.' },
  { id: 'y7-hum-10', items: ['oral history', 'a TV show', 'rock art', 'an artefact'], outlier: 1, explanation: 'A modern TV show is a secondary source; the others are primary evidence of the past.' },
  { id: 'y7-hum-11', items: ['relative dating', 'absolute dating', 'kinship', 'stratigraphy'], outlier: 2, explanation: 'Kinship is a social system; the others are ways of dating the past.' },
  { id: 'y7-hum-12', items: ['Pleistocene', 'Holocene', 'Deep Time', 'Federation'], outlier: 3, explanation: 'Federation (1901) is recent Australian history; the others describe the ancient past.' },
  // History Skills + Ancient Worlds + Geography
  { id: 'y7-hum-13', items: ['precipitation', 'primary source', 'secondary source', 'chronology'], outlier: 0, explanation: 'Precipitation is a geography term; the others are history skills.' },
  { id: 'y7-hum-14', items: ['continuity and change', 'desalination', 'cause and consequence', 'significance'], outlier: 1, explanation: 'Desalination is a water strategy; the others are historical concepts.' },
  { id: 'y7-hum-15', items: ['COMA', 'TEEAL', 'phalanx', 'timeline'], outlier: 2, explanation: 'A phalanx is a Greek battle formation; the others are history skills or tools.' },
  { id: 'y7-hum-16', items: ['origin', 'purpose', 'reliability', 'delta'], outlier: 3, explanation: 'A delta is a landform; the others are things to check when analysing a source.' },
  { id: 'y7-hum-17', items: ['hoplite', 'pharaoh', 'scribe', 'vizier'], outlier: 0, explanation: 'A hoplite is a Greek soldier; the others are roles in ancient Egypt.' },
  { id: 'y7-hum-18', items: ['Nile', 'Colosseum', 'delta', 'cataract'], outlier: 1, explanation: 'The Colosseum is Roman; the others relate to the Egyptian Nile.' },
  { id: 'y7-hum-19', items: ['mummification', 'canopic jars', 'Mandate of Heaven', 'Book of the Dead'], outlier: 2, explanation: 'The Mandate of Heaven is Chinese; the others relate to Egyptian afterlife beliefs.' },
  { id: 'y7-hum-20', items: ['Ramses II', 'Hatshepsut', 'Tutankhamun', 'Julius Caesar'], outlier: 3, explanation: 'Julius Caesar was Roman; the others were Egyptian pharaohs.' },
  { id: 'y7-hum-21', items: ['trireme', 'pyramid', 'temple', 'tomb'], outlier: 0, explanation: 'A trireme is a Greek warship; the others are Egyptian structures.' },
  { id: 'y7-hum-22', items: ['Old Kingdom', 'Republic', 'Middle Kingdom', 'New Kingdom'], outlier: 1, explanation: 'The Republic is a Roman period; the others are Egyptian kingdoms.' },
  { id: 'y7-hum-23', items: ['papyrus', 'hieroglyphics', 'phalanx', 'cartouche'], outlier: 2, explanation: 'A phalanx is Greek; the others relate to Egyptian writing.' },
  { id: 'y7-hum-24', items: ['Horus', 'Isis', 'Osiris', 'Zeus'], outlier: 3, explanation: 'Zeus is a Greek god; the others are Egyptian deities.' },
  { id: 'y7-hum-25', items: ['Mandate of Heaven', 'chariot', 'khopesh', 'Treaty of Kadesh'], outlier: 0, explanation: 'The Mandate of Heaven is Chinese; the others relate to Egyptian warfare.' },
  { id: 'y7-hum-26', items: ['Athens', 'Rome', 'Sparta', 'city-state'], outlier: 1, explanation: 'Rome is Italian; the others are part of ancient Greece.' },
  { id: 'y7-hum-27', items: ['hoplite', 'phalanx', 'pharaoh', 'trireme'], outlier: 2, explanation: 'A pharaoh is Egyptian; the others are Greek warfare terms.' },
  { id: 'y7-hum-28', items: ['aristocrats', 'citizens', 'non-citizens', 'dynasty'], outlier: 3, explanation: 'A dynasty is a Chinese ruling family; the others are Greek social groups.' },
  { id: 'y7-hum-29', items: ['the Nile', 'Leonidas', 'Pericles', 'the Iliad'], outlier: 0, explanation: 'The Nile is Egyptian; the others relate to ancient Greece.' },
  { id: 'y7-hum-30', items: ['democracy', 'mummification', 'philosophy', 'mathematics'], outlier: 1, explanation: 'Mummification is Egyptian; the others are Greek achievements.' },
  { id: 'y7-hum-31', items: ['Aegean Sea', 'Mediterranean Sea', 'Sahara Desert', 'Greek mountains'], outlier: 2, explanation: 'The Sahara is in Africa; the others shaped ancient Greece.' },
  { id: 'y7-hum-32', items: ['patricians', 'plebeians', 'legions', 'moiety'], outlier: 3, explanation: 'A moiety is a First Nations social division; the others are Roman.' },
  { id: 'y7-hum-33', items: ['Confucius', 'Julius Caesar', 'Augustus', 'Marcus Aurelius'], outlier: 0, explanation: 'Confucius was Chinese; the others were significant Romans.' },
  { id: 'y7-hum-34', items: ['Tiber', 'Yellow River', 'Po', 'Mediterranean'], outlier: 1, explanation: 'The Yellow River is in China; the others relate to ancient Rome.' },
  { id: 'y7-hum-35', items: ['regal', 'republican', 'Holocene', 'imperial'], outlier: 2, explanation: 'The Holocene is a geological epoch; the others are Roman periods.' },
  { id: 'y7-hum-36', items: ['Via Romana', 'legion', 'siege warfare', 'papyrus'], outlier: 3, explanation: 'Papyrus is Egyptian; the others relate to ancient Rome.' },
  { id: 'y7-hum-37', items: ['democracy', 'Confucianism', 'Daoism', 'Buddhism'], outlier: 0, explanation: 'Democracy is a Greek idea; the others are belief systems of ancient China.' },
  { id: 'y7-hum-38', items: ['Qin Shi Huang', 'Ramses II', 'Wu Zetian', 'Confucius'], outlier: 1, explanation: 'Ramses II was Egyptian; the others are from ancient China.' },
  { id: 'y7-hum-39', items: ['Himalayas', 'Yellow River', 'Tiber', 'dynasty'], outlier: 2, explanation: 'The Tiber is a Roman river; the others relate to ancient China.' },
  { id: 'y7-hum-40', items: ['Mandate of Heaven', 'dynasty', 'Confucius', 'Colosseum'], outlier: 3, explanation: 'The Colosseum is Roman; the others relate to ancient China.' },
  { id: 'y7-hum-41', items: ['the Dreaming', 'Buddhism', 'Daoism', 'Confucianism'], outlier: 0, explanation: 'The Dreaming is a First Nations belief; the others are Chinese belief systems.' },
  { id: 'y7-hum-42', items: ['Border', 'Pattern', 'Legend', 'Scale'], outlier: 1, explanation: 'Pattern belongs to PQE; the others are parts of a map (BOLTSS).' },
  { id: 'y7-hum-43', items: ['Pattern', 'Quantification', 'Legend', 'Exception'], outlier: 2, explanation: 'Legend is a map feature; the others are parts of the PQE method.' },
  { id: 'y7-hum-44', items: ['BOLTSS', 'PQE', 'SPICESS', 'TEEAL'], outlier: 3, explanation: 'TEEAL is a history writing structure; the others are geography skills.' },
  { id: 'y7-hum-45', items: ['canopic jar', 'compass', 'grid reference', 'map scale'], outlier: 0, explanation: 'A canopic jar is Egyptian; the others are mapping tools.' },
  { id: 'y7-hum-46', items: ['evaporation', 'chronology', 'condensation', 'precipitation'], outlier: 1, explanation: 'Chronology is a history skill; the others are stages of the water cycle.' },
  { id: 'y7-hum-47', items: ['renewable', 'non-renewable', 'patrician', 'continuous'], outlier: 2, explanation: 'Patrician is a Roman class; the others are types of resource.' },
  { id: 'y7-hum-48', items: ['desalination', 'water recycling', 'water scarcity', 'hieroglyphics'], outlier: 3, explanation: 'Hieroglyphics is Egyptian writing; the others relate to managing water.' },
  { id: 'y7-hum-49', items: ['legion', 'runoff', 'groundwater', 'precipitation'], outlier: 0, explanation: 'A legion is a Roman army unit; the others are parts of the water cycle.' },
  { id: 'y7-hum-50', items: ['Port Phillip Bay', 'Mount Everest', 'Suez Canal', 'Three Gorges Dam'], outlier: 1, explanation: 'Mount Everest is a mountain; the others are studied as water-use sites.' },
  { id: 'y7-hum-51', items: ['river flooding', 'river pollution', 'phalanx', 'water hazard'], outlier: 2, explanation: 'A phalanx is Greek warfare; the others relate to water hazards.' },
  { id: 'y7-hum-52', items: ['health', 'recreation', 'transport', 'mummification'], outlier: 3, explanation: 'Mummification is Egyptian; the others are uses of water.' },
  { id: 'y7-hum-53', items: ['Mandate of Heaven', 'objective criteria', 'subjective criteria', 'infrastructure'], outlier: 0, explanation: 'The Mandate of Heaven is Chinese; the others relate to liveability.' },
  { id: 'y7-hum-54', items: ['urban', 'dynasty', 'rural', 'remote'], outlier: 1, explanation: 'A dynasty is Chinese; the others describe types of area.' },
  { id: 'y7-hum-55', items: ['climate', 'safety', 'mummification', 'healthcare'], outlier: 2, explanation: 'Mummification is Egyptian; the others are liveability factors.' },
  { id: 'y7-hum-56', items: ['traffic congestion', 'social inequality', 'environmental issues', 'papyrus'], outlier: 3, explanation: 'Papyrus is Egyptian; the others are problems that lower liveability.' },
  { id: 'y7-hum-57', items: ['Rosetta Stone', 'Melbourne', '20-minute neighbourhood', 'liveability index'], outlier: 0, explanation: 'The Rosetta Stone is Egyptian; the others relate to liveability.' },
  { id: 'y7-hum-58', items: ['sustainability', 'khopesh', 'environment', 'community needs'], outlier: 1, explanation: 'A khopesh is an Egyptian sword; the others relate to liveable, sustainable places.' },
  { id: 'y7-hum-59', items: ['Pleistocene', 'Holocene', 'imperial period', 'Deep Time'], outlier: 2, explanation: 'The imperial period is Roman; the others describe Deep Time history.' },
  { id: 'y7-hum-60', items: ['kinship', 'moiety', 'totem', 'legion'], outlier: 3, explanation: 'A legion is Roman; the others are First Nations social terms.' },
  { id: 'y7-hum-61', items: ['democracy', 'radiocarbon dating', 'luminescence dating', 'stratigraphy'], outlier: 0, explanation: 'Democracy is a Greek idea; the others are scientific dating methods.' },
  { id: 'y7-hum-62', items: ['Lake Mungo', 'the Parthenon', 'Willandra Lakes', 'Budj Bim'], outlier: 1, explanation: 'The Parthenon is Greek; the others are significant Australian sites.' },
  { id: 'y7-hum-63', items: ['scribe', 'artisan', 'senator', 'labourer'], outlier: 2, explanation: 'A senator is Roman; the others are groups in Egyptian society.' },
  { id: 'y7-hum-64', items: ['Sparta', 'Athens', 'Corinth', 'Memphis'], outlier: 3, explanation: 'Memphis was an Egyptian city; the others were Greek city-states.' },
  { id: 'y7-hum-65', items: ['phalanx', 'Tigris', 'Tiber', 'Nile'], outlier: 0, explanation: 'A phalanx is a battle formation; the others are ancient rivers.' },
  { id: 'y7-hum-66', items: ['spear', 'papyrus', 'shield', 'chariot'], outlier: 1, explanation: 'Papyrus is a writing material; the others are used in ancient warfare.' },
  { id: 'y7-hum-67', items: ['precipitation', 'evaporation', 'legion', 'runoff'], outlier: 2, explanation: 'A legion is a Roman army unit; the others are water-cycle stages.' },
  { id: 'y7-hum-68', items: ['aristocrat', 'citizen', 'slave', 'pharaoh'], outlier: 3, explanation: 'A pharaoh is an Egyptian ruler; the others are Greek social groups.' },
  { id: 'y7-hum-69', items: ['Herodotus', 'Confucius', 'Laozi', 'Buddha'], outlier: 0, explanation: 'Herodotus was a Greek historian; the others are linked to Eastern belief systems.' },
  { id: 'y7-hum-70', items: ['map', 'timeline', 'legend', 'scale'], outlier: 1, explanation: 'A timeline is a history tool; the others are parts of a map.' },
  { id: 'y7-hum-71', items: ['desalination', 'recycling', 'mummification', 'irrigation'], outlier: 2, explanation: 'Mummification is Egyptian; the others relate to managing water.' },
  { id: 'y7-hum-72', items: ['objective', 'subjective', 'liveable', 'imperial'], outlier: 3, explanation: 'Imperial describes a Roman period; the others relate to liveability.' },
  { id: 'y7-hum-73', items: ['Pericles', 'Ramses II', 'Thutmose III', 'Hatshepsut'], outlier: 0, explanation: 'Pericles was Greek; the others were Egyptian rulers.' },
  { id: 'y7-hum-74', items: ['bipedalism', 'the phalanx', 'large brain', 'tool-making'], outlier: 1, explanation: 'The phalanx is a Greek formation; the others are human evolution traits.' },
  { id: 'y7-hum-75', items: ['Buddhism', 'Confucianism', 'the Via Romana', 'Daoism'], outlier: 2, explanation: 'The Via Romana is Roman; the others are belief systems of ancient China.' },
];

// Year 8 Humanities (HRS-anchored) — Medieval Europe, Japan under the
// Shoguns, history skills, landscapes/coasts, cities, geo skills.
const Y8_HUMANITIES: OddItem[] = [
  // -- Medieval Europe (1–16) --
  { id: 'y8-hum-1', items: ['shoen', 'fief', 'vassal', 'manor'], outlier: 0, explanation: 'Shoen were Japanese noble estates; the others are European feudal terms.' },
  { id: 'y8-hum-2', items: ['monarch', 'shogun', 'noble', 'knight'], outlier: 1, explanation: 'The shogun ruled Japan; the others are ranks in Europe’s feudal hierarchy.' },
  { id: 'y8-hum-3', items: ['tithe', 'stocks', 'pillory', 'flogging'], outlier: 0, explanation: 'The tithe was a church payment; the others are medieval punishments.' },
  { id: 'y8-hum-4', items: ['treason', 'heresy', 'chivalry', 'witchcraft'], outlier: 2, explanation: 'Chivalry is the knights’ code of conduct; the others are medieval crimes.' },
  { id: 'y8-hum-5', items: ['page', 'squire', 'knight', 'serf'], outlier: 3, explanation: 'A serf worked the land; the others are stages on the path to knighthood.' },
  { id: 'y8-hum-6', items: ['excommunication', 'moat', 'drawbridge', 'battlements'], outlier: 0, explanation: 'Excommunication is a Church punishment; the others are castle defences.' },
  { id: 'y8-hum-7', items: ['Tokugawa Ieyasu', 'Pope Urban II', 'Minamoto no Yoritomo', 'Emperor Go-Toba'], outlier: 1, explanation: 'Pope Urban II belongs to medieval Europe; the others shaped shogunate Japan.' },
  { id: 'y8-hum-8', items: ['trial by ordeal', 'banishment', 'sanctuary', 'the stocks'], outlier: 2, explanation: 'Sanctuary protected people inside a church; the others punished or tested the accused.' },
  { id: 'y8-hum-9', items: ['bubonic plague', 'pneumonic plague', 'septicemic plague', 'malaria'], outlier: 3, explanation: 'Malaria is unrelated; the others are the three forms of the Black Death.' },
  { id: 'y8-hum-10', items: ['doctors', 'herbalists', 'flagellants', 'apothecaries'], outlier: 2, explanation: 'Flagellants whipped themselves for God’s forgiveness; the others treated the sick.' },
  { id: 'y8-hum-11', items: ['Yersinia pestis', 'bad air', 'God’s punishment', 'a curse'], outlier: 0, explanation: 'Yersinia pestis is the plague’s real cause; the others are medieval explanations.' },
  { id: 'y8-hum-12', items: ['Nara', 'Jerusalem', 'Kyoto', 'Edo'], outlier: 1, explanation: 'Jerusalem is the Holy Land city of the Crusades; the others are Japanese cities.' },
  { id: 'y8-hum-13', items: ['lord', 'vassal', 'fief', 'pharaoh'], outlier: 3, explanation: 'Pharaoh is an ancient Egyptian ruler; the others are feudal terms.' },
  { id: 'y8-hum-14', items: ['monastery', 'castle', 'manor house', 'peasant hut'], outlier: 0, explanation: 'A monastery housed a religious community; the others are homes of feudal ranks.' },
  { id: 'y8-hum-15', items: ['Genpei War', 'Battle of Sekigahara', 'First Crusade', 'Battle of Dan-no-ura'], outlier: 2, explanation: 'The First Crusade was fought in the Holy Land; the others are Japanese conflicts.' },
  { id: 'y8-hum-16', items: ['king’s law', 'canon law', 'guild rules', 'village custom'], outlier: 1, explanation: 'Canon law came from the Church via papal pronouncements; the others are secular rules.' },
  // -- Japan under the Shoguns (17–34) --
  { id: 'y8-hum-17', items: ['Honshu', 'Shikoku', 'Okinawa', 'Kyushu'], outlier: 2, explanation: 'Okinawa is not one of Japan’s four main islands; Hokkaido completes that set.' },
  { id: 'y8-hum-18', items: ['Amaterasu', 'Izanagi', 'Izanami', 'Murasaki Shikibu'], outlier: 3, explanation: 'Murasaki Shikibu wrote The Tale of Genji; the others are Shinto deities.' },
  { id: 'y8-hum-19', items: ['Nara', 'Heian-kyo', 'Edo', 'Beijing'], outlier: 3, explanation: 'Beijing is China’s capital; the others were centres of power in Japan.' },
  { id: 'y8-hum-20', items: ['samurai', 'serf', 'daimyo', 'shogun'], outlier: 1, explanation: 'A serf is a European peasant; the others are ranks in Japan’s feudal order.' },
  { id: 'y8-hum-21', items: ['bushido', 'seppuku', 'chivalry', 'ronin'], outlier: 2, explanation: 'Chivalry is the European knights’ code; the others belong to the samurai world.' },
  { id: 'y8-hum-22', items: ['Taira', 'Minamoto', 'Fujiwara', 'Tudor'], outlier: 3, explanation: 'The Tudors are an English dynasty; the others are powerful Japanese clans.' },
  { id: 'y8-hum-23', items: ['fresco', 'kabuki', 'ukiyo-e', 'haiku'], outlier: 0, explanation: 'Fresco is a European art form; the others flourished in Edo-period Japan.' },
  { id: 'y8-hum-24', items: ['sakoku', 'tithe', 'sankin-kotai', 'edicts'], outlier: 1, explanation: 'The tithe was a European church payment; the others are Tokugawa controls.' },
  { id: 'y8-hum-25', items: ['Domesday Book', 'Kojiki', 'Nihon Shoki', 'Tale of Genji'], outlier: 0, explanation: 'The Domesday Book is an English record; the others are early Japanese texts.' },
  { id: 'y8-hum-26', items: ['Battle of Sekigahara', 'Genpei War', 'Battle of Hastings', 'Battle of Dan-no-ura'], outlier: 2, explanation: 'Hastings was fought in England in 1066; the others are Japanese conflicts.' },
  { id: 'y8-hum-27', items: ['Shinto', 'kami', 'Amaterasu', 'Daibutsu'], outlier: 3, explanation: 'The Daibutsu is the great Buddha statue at Todai-ji; the others are Shinto concepts.' },
  { id: 'y8-hum-28', items: ['emperor', 'shogun', 'daimyo', 'samurai'], outlier: 0, explanation: 'Under the shogunate the emperor held only symbolic power; the others held real military power.' },
  { id: 'y8-hum-29', items: ['earthquakes', 'monsoons', 'tsunamis', 'volcanic eruptions'], outlier: 1, explanation: 'Monsoons are seasonal winds; the others are Ring of Fire hazards Japan faces.' },
  { id: 'y8-hum-30', items: ['Tokugawa Ieyasu', 'Minamoto no Yoritomo', 'William the Conqueror', 'Emperor Shomu'], outlier: 2, explanation: 'William the Conqueror ruled England; the others shaped Japanese history.' },
  { id: 'y8-hum-31', items: ['Sekigahara', 'Edo', 'Heian-kyo', 'Nara'], outlier: 0, explanation: 'Sekigahara was a battlefield; the others served as Japanese capitals or seats of power.' },
  { id: 'y8-hum-32', items: ['kabuki', 'wet-rice farming', 'iron tools', 'Buddhism'], outlier: 0, explanation: 'Kabuki developed in Edo-period Japan; the others arrived from China and Korea.' },
  { id: 'y8-hum-33', items: ['managing the household', 'working the fields', 'overseeing servants', 'ruling as shogun'], outlier: 3, explanation: 'Women’s roles varied by class, but no woman ruled as shogun.' },
  { id: 'y8-hum-34', items: ['Genpei War', 'French Revolution', 'Meiji Restoration', 'Battle of Sekigahara'], outlier: 1, explanation: 'The French Revolution is European; the others are turning points in Japanese history.' },
  // -- History skills (35–38) --
  { id: 'y8-hum-35', items: ['cause and effect', 'continuity and change', 'significance', 'longshore drift'], outlier: 3, explanation: 'Longshore drift is a coastal process; the others are historical concepts.' },
  { id: 'y8-hum-36', items: ['seppuku', 'COMA', 'TEEAL', 'PQE'], outlier: 0, explanation: 'Seppuku is a samurai ritual; the others are analysis and writing scaffolds.' },
  { id: 'y8-hum-37', items: ['a medieval chronicle', 'a modern documentary', 'a Muromachi screen', 'a plague doctor’s letter'], outlier: 1, explanation: 'A modern documentary is a secondary source; the others are primary sources.' },
  { id: 'y8-hum-38', items: ['empathy', 'perspectives', 'gentrification', 'contestability'], outlier: 2, explanation: 'Gentrification is an urban geography term; the others are historical concepts.' },
  // -- Landscapes and processes (39–46) --
  { id: 'y8-hum-39', items: ['mountain', 'urban sprawl', 'coastal', 'karst'], outlier: 1, explanation: 'Urban sprawl is a city-growth term; the others are landscape types.' },
  { id: 'y8-hum-40', items: ['weathering', 'erosion', 'deposition', 'gentrification'], outlier: 3, explanation: 'Gentrification changes suburbs; the others are processes that shape landscapes.' },
  { id: 'y8-hum-41', items: ['acid rain on limestone', 'freeze-thaw in cracks', 'heating and cooling', 'rocks rubbing together'], outlier: 0, explanation: 'Acidic water dissolving rock is chemical weathering; the others are physical.' },
  { id: 'y8-hum-42', items: ['tree roots', 'burrowing animals', 'moss', 'rainwater on limestone'], outlier: 3, explanation: 'Slightly acidic rainwater is chemical weathering; the others are biological.' },
  { id: 'y8-hum-43', items: ['caves', 'stalactites', 'sand dunes', 'sinkholes'], outlier: 2, explanation: 'Sand dunes are coastal depositional landforms; the others belong to karst landscapes.' },
  { id: 'y8-hum-44', items: ['desert', 'breakwater', 'tropical rainforest', 'riverine'], outlier: 1, explanation: 'A breakwater is a coastal management structure; the others are landscape types.' },
  { id: 'y8-hum-45', items: ['the Himalayas', 'the Sahara', 'the Genpei War', 'the Amazon'], outlier: 2, explanation: 'The Genpei War is a Japanese conflict; the others are famous example landscapes.' },
  { id: 'y8-hum-46', items: ['quantification', 'erosion', 'transportation', 'deposition'], outlier: 0, explanation: 'Quantification is part of PQE data analysis; the others describe sediment movement.' },
  // -- Coasts (47–60) --
  { id: 'y8-hum-47', items: ['swash', 'backwash', 'longshore drift', 'sankin-kotai'], outlier: 3, explanation: 'Sankin-kotai was a Tokugawa control policy; the others are coastal water movements.' },
  { id: 'y8-hum-48', items: ['cliff', 'spit', 'headland', 'cave'], outlier: 1, explanation: 'A spit is built by deposition; the others are carved by erosion.' },
  { id: 'y8-hum-49', items: ['beach', 'dune', 'stack', 'tombolo'], outlier: 2, explanation: 'A stack is an erosional landform; the others are built by deposition.' },
  { id: 'y8-hum-50', items: ['beach nourishment', 'groyne', 'sea wall', 'rip rap'], outlier: 0, explanation: 'Beach nourishment is soft engineering; the others are hard structures.' },
  { id: 'y8-hum-51', items: ['beach nourishment', 'dune revegetation', 'training wall', 'managed retreat'], outlier: 2, explanation: 'A training wall is hard engineering; the others work with natural processes.' },
  { id: 'y8-hum-52', items: ['constructive waves', 'storm conditions', 'calm weather', 'strong swash'], outlier: 1, explanation: 'Storm conditions produce destructive waves; the others describe constructive ones.' },
  { id: 'y8-hum-53', items: ['Gold Coast sea walls', 'Byron Bay rip rap', 'Kingscliff groynes', 'Middle Park nourishment'], outlier: 3, explanation: 'Middle Park used soft engineering; the other case studies are hard structures.' },
  { id: 'y8-hum-54', items: ['erosional', 'aesthetic', 'spiritual', 'economic'], outlier: 0, explanation: 'Erosional describes landform processes; the others are ways of valuing landscapes.' },
  { id: 'y8-hum-55', items: ['Larrakia people', 'Dreaming stories', 'connection to Country', 'Multiple Nuclei Model'], outlier: 3, explanation: 'The Multiple Nuclei Model explains city shapes; the others relate to First Nations connection to Darwin Harbour.' },
  { id: 'y8-hum-56', items: ['arch', 'lagoon', 'stack', 'stump'], outlier: 1, explanation: 'A lagoon forms behind depositional bars and spits; the others are the headland erosion sequence.' },
  { id: 'y8-hum-57', items: ['wave refraction', 'hydraulic pressure', 'kana script', 'wave scouring'], outlier: 2, explanation: 'Kana is a Japanese writing system; the others are wave processes at the coast.' },
  { id: 'y8-hum-58', items: ['concrete sea wall', 'Spinifex grass', 'dune fencing', 'planting vegetation'], outlier: 0, explanation: 'A sea wall is hard engineering; the others stabilise dunes naturally.' },
  { id: 'y8-hum-59', items: ['shopping strips', 'mangroves', 'seagrass meadows', 'mudflats'], outlier: 0, explanation: 'Shopping strips are urban; the others are Darwin Harbour ecosystems.' },
  { id: 'y8-hum-60', items: ['wind', 'waves', 'excommunication', 'gravity'], outlier: 2, explanation: 'Excommunication is a Church punishment; the others are forces that shape coasts.' },
  // -- Cities and urbanisation (61–69) --
  { id: 'y8-hum-61', items: ['wave-cut platform', 'CBD', 'residential zone', 'industrial zone'], outlier: 0, explanation: 'A wave-cut platform is a coastal landform; the others are city zones.' },
  { id: 'y8-hum-62', items: ['urban sprawl', 'gentrification', 'urban decay', 'longshore drift'], outlier: 3, explanation: 'Longshore drift moves beach sand; the others are urban dynamics.' },
  { id: 'y8-hum-63', items: ['push factor', 'tombolo', 'pull factor', 'migration'], outlier: 1, explanation: 'A tombolo is a coastal landform; the others describe why and how people move.' },
  { id: 'y8-hum-64', items: ['war', 'persecution', 'better education', 'lack of jobs'], outlier: 2, explanation: 'Access to education pulls people toward cities; the others push them from home.' },
  { id: 'y8-hum-65', items: ['Tokyo', 'New York', 'Detroit', 'Uluru'], outlier: 3, explanation: 'Uluru is a natural landform; the others are cities from the unit’s examples.' },
  { id: 'y8-hum-66', items: ['emigrate', 'immigrate', 'international migration', 'sakoku'], outlier: 3, explanation: 'Sakoku was Japan’s isolation policy; the others describe people moving between countries.' },
  { id: 'y8-hum-67', items: ['slums', 'flagellant', 'suburb', 'urban renewal'], outlier: 1, explanation: 'Flagellants belong to the Black Death; the others are urban geography terms.' },
  { id: 'y8-hum-68', items: ['Harris and Ullman', 'Multiple Nuclei Model', 'Yersinia pestis', 'urban models'], outlier: 2, explanation: 'Yersinia pestis is the plague bacterium; the others relate to explaining city shapes.' },
  { id: 'y8-hum-69', items: ['megacity', 'chivalry', 'urbanisation', 'urban explosion'], outlier: 1, explanation: 'Chivalry is the medieval knights’ code; the others describe growing cities.' },
  // -- Geography skills (70–75) --
  { id: 'y8-hum-70', items: ['Pattern', 'Quantification', 'Legend', 'Exception'], outlier: 2, explanation: 'A legend belongs on maps and graphs; the others are the PQE steps.' },
  { id: 'y8-hum-71', items: ['Empathy', 'Scale', 'Axis', 'Legend'], outlier: 0, explanation: 'Empathy is a historical concept; the others are parts of SALTS for graphs.' },
  { id: 'y8-hum-72', items: ['ground photo', 'oblique aerial photo', 'vertical aerial photo', 'field sketch'], outlier: 3, explanation: 'A field sketch is drawn by hand; the others are photographs.' },
  { id: 'y8-hum-73', items: ['column graph', 'choropleth map', 'pie chart', 'climate graph'], outlier: 1, explanation: 'A choropleth is a map; the others are types of graphs.' },
  { id: 'y8-hum-74', items: ['Equator', 'Tropic of Cancer', 'Prime Meridian', 'Tropic of Capricorn'], outlier: 2, explanation: 'The Prime Meridian is a line of longitude; the others are lines of latitude.' },
  { id: 'y8-hum-75', items: ['Pacific', 'Atlantic', 'Indian', 'Mediterranean'], outlier: 3, explanation: 'The Mediterranean is a sea; the others are among Earth’s five oceans.' },
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
    },
  },
  byClass: {
    'y10-maths': Y10_MATHS,
    'y7-humanities': Y7_HUMANITIES,
    'y8-humanities': Y8_HUMANITIES,
  },
};
