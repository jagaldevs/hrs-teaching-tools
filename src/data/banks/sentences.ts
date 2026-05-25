import type { Stream } from '../../data/games';
import type { Subject } from '../../games/types';

/**
 * Sentence-building bank — Australian Curriculum V9 informed.
 *
 * Each sentence is stream-scaled (length, complexity, vocabulary) and
 * optionally tagged with one AC V9 subject. The Sentence Builder tool
 * tokenises sentences on whitespace, so word count = number of cards a
 * student must arrange.
 *
 * Sentences without a `subject` tag are treated as general and appear when
 * no subject filter is active.
 *
 * Coverage target: ~25 sentences per stream with a balanced spread across
 * English, Maths, History, Geography, Science and general usage.
 */

export interface SentenceEntry {
  text: string;
  subject?: Subject;
}

export const SENTENCES: Record<Stream, SentenceEntry[]> = {
  // ====================================================
  //  LOWER PRIMARY  (F – Year 2)
  // ====================================================
  lower_primary: [
    // -- General (everyday) --
    { text: 'The cat sat on the mat.' },
    { text: 'My dog likes to run.' },
    { text: 'We play in the park.' },
    { text: 'She has a red ball.' },
    { text: 'He went to school.' },
    { text: 'My mum is at home.' },
    { text: 'We eat lunch at noon.' },
    { text: 'The baby is fast asleep.' },

    // -- English --
    { text: 'I like to read books.', subject: 'english' },
    { text: 'A noun is a naming word.', subject: 'english' },
    { text: 'Every sentence starts with a capital letter.', subject: 'english' },
    { text: 'A question mark goes at the end of a question.', subject: 'english' },

    // -- Maths --
    { text: 'A circle has no corners.', subject: 'maths' },
    { text: 'Two plus three is five.', subject: 'maths' },
    { text: 'A square has four equal sides.', subject: 'maths' },
    { text: 'There are seven days in a week.', subject: 'maths' },

    // -- History --
    { text: 'Long ago people lived in caves.', subject: 'history' },
    { text: 'My family came from far away.', subject: 'history' },
    { text: 'Anzac Day is on the twenty-fifth of April.', subject: 'history' },

    // -- Geography --
    { text: 'The map shows where we live.', subject: 'geography' },
    { text: 'North is the way the arrow points.', subject: 'geography' },
    { text: 'Australia is a very large country.', subject: 'geography' },

    // -- Science --
    { text: 'I can see a bird.', subject: 'science' },
    { text: 'The sun is hot today.', subject: 'science' },
    { text: 'The fish swims in water.', subject: 'science' },
    { text: 'Birds can fly high.', subject: 'science' },
    { text: 'Caterpillars become butterflies.', subject: 'science' },
    { text: 'Plants need sunlight and water.', subject: 'science' },
  ],

  // ====================================================
  //  UPPER PRIMARY  (Year 3 – Year 6)
  // ====================================================
  upper_primary: [
    // -- General --
    { text: 'My brother and I went to the beach yesterday.' },
    { text: 'After dinner we played a board game together.' },
    { text: 'The team practised every Tuesday after school.' },
    { text: 'On Saturday morning we cycled all the way to the river.' },

    // -- English --
    { text: 'A simile compares two things using "like" or "as".', subject: 'english' },
    { text: 'The author used vivid adjectives to describe the storm.', subject: 'english' },
    { text: 'Adverbs often end in the letters l and y.', subject: 'english' },
    { text: 'Every paragraph should start with a clear topic sentence.', subject: 'english' },
    { text: 'The narrator told the story from her own point of view.', subject: 'english' },

    // -- Maths --
    { text: 'Three quarters is the same as seventy-five percent.', subject: 'maths' },
    { text: 'A right angle measures exactly ninety degrees.', subject: 'maths' },
    { text: 'The area of a rectangle equals its length times its width.', subject: 'maths' },
    { text: 'Prime numbers have exactly two factors.', subject: 'maths' },

    // -- History --
    { text: 'Our class is learning about Aboriginal Dreaming stories.', subject: 'history' },
    { text: 'Captain Cook landed at Botany Bay in seventeen seventy.', subject: 'history' },
    { text: 'Australia became a federation on the first of January nineteen oh one.', subject: 'history' },
    { text: 'The Eureka Stockade was a miners rebellion in eighteen fifty four.', subject: 'history' },

    // -- Geography --
    { text: 'Australian kangaroos are found in many parts of the country.', subject: 'geography' },
    { text: 'The Murray River is the longest river in Australia.', subject: 'geography' },
    { text: 'The Great Barrier Reef lies off the coast of Queensland.', subject: 'geography' },
    { text: 'Indonesia is the closest country to the north of Australia.', subject: 'geography' },

    // -- Science --
    { text: 'The tall tree behind our house is over a hundred years old.', subject: 'science' },
    { text: 'I enjoy reading books about space and astronauts.', subject: 'science' },
    { text: 'The rainforest is home to many unique creatures.', subject: 'science' },
    { text: 'Photosynthesis helps plants make their own food.', subject: 'science' },
    { text: 'Magnets attract objects made of iron and steel.', subject: 'science' },
    { text: 'The water cycle moves water between the oceans and the sky.', subject: 'science' },
  ],

  // ====================================================
  //  MIDDLE SCHOOL  (Year 7 – Year 9)
  // ====================================================
  middle_school: [
    // -- General --
    { text: 'Despite the heavy rain, the students completed their cross-country run.' },
    { text: 'After weeks of preparation, the school production opened to a sold-out audience.' },

    // -- English --
    { text: 'Shakespeare wrote many of his famous plays during the late sixteenth century.', subject: 'english' },
    { text: 'Although she was nervous, Maya delivered her speech with confidence.', subject: 'english' },
    { text: 'A persuasive essay relies on a strong thesis statement.', subject: 'english' },
    { text: 'The novelist used vivid imagery to make the setting feel real.', subject: 'english' },
    { text: 'A sonnet is a fourteen-line poem written in iambic pentameter.', subject: 'english' },

    // -- Maths --
    { text: 'Pythagoras discovered that the square of the hypotenuse equals the sum of the other two sides.', subject: 'maths' },
    { text: 'Solving a linear equation requires isolating the variable on one side.', subject: 'maths' },
    { text: 'Algebraic expressions use letters to represent unknown numbers.', subject: 'maths' },
    { text: 'The probability of rolling a six on a fair die is one in six.', subject: 'maths' },
    { text: 'Negative numbers multiplied together always give a positive result.', subject: 'maths' },

    // -- History --
    { text: 'The Industrial Revolution transformed European societies during the seventeen and eighteen hundreds.', subject: 'history' },
    { text: 'Indigenous Australians have been custodians of this land for over sixty thousand years.', subject: 'history' },
    { text: 'World War One began in nineteen fourteen after the assassination of Archduke Ferdinand.', subject: 'history' },
    { text: 'Ancient Athens developed the first known form of direct democracy.', subject: 'history' },
    { text: 'The Black Death killed roughly a third of the population of medieval Europe.', subject: 'history' },

    // -- Geography --
    { text: 'The Great Barrier Reef supports thousands of marine species along the Queensland coast.', subject: 'geography' },
    { text: 'The tropics lie between the Tropic of Cancer and the Tropic of Capricorn.', subject: 'geography' },
    { text: 'Tectonic plates collide and slide along boundaries deep beneath the surface.', subject: 'geography' },
    { text: 'Urbanisation describes the movement of people from rural areas to cities.', subject: 'geography' },

    // -- Science --
    { text: 'Photosynthesis converts sunlight into chemical energy stored in glucose molecules.', subject: 'science' },
    { text: 'Ecosystems balance producers, consumers and decomposers.', subject: 'science' },
    { text: 'Speed is calculated by dividing the distance travelled by the time taken.', subject: 'science' },
    { text: 'Acids have a pH below seven while alkalis sit above seven on the scale.', subject: 'science' },
    { text: 'Sound travels faster through solids than through liquids or gases.', subject: 'science' },
  ],

  // ====================================================
  //  SENIOR SCHOOL  (Year 10 – Year 12)
  // ====================================================
  senior_school: [
    // -- General / philosophical --
    { text: 'Existentialist philosophers argued that meaning is something each individual must construct for themselves.' },
    { text: 'Critical thinking requires distinguishing evidence from assumption and argument from opinion.' },

    // -- English --
    { text: 'Although the protagonist initially resists change, his transformation forms the heart of the narrative.', subject: 'english' },
    { text: 'A bildungsroman traces the protagonist’s moral and psychological growth from youth to maturity.', subject: 'english' },
    { text: 'Modernist writers fragmented narrative form to reflect the disorientation of the early twentieth century.', subject: 'english' },
    { text: 'Postcolonial criticism examines how literature has represented and resisted colonial power.', subject: 'english' },
    { text: 'Aristotle identified pity and fear as the emotions essential to tragic catharsis.', subject: 'english' },

    // -- Maths --
    { text: 'The derivative of a function measures the instantaneous rate of change at a given point.', subject: 'maths' },
    { text: 'Definite integrals can be interpreted as the signed area under a curve.', subject: 'maths' },
    { text: 'A normal distribution is symmetric about its mean and characterised by its standard deviation.', subject: 'maths' },
    { text: 'Complex numbers extend the real number system by introducing the imaginary unit i.', subject: 'maths' },
    { text: 'Logarithms allow us to convert multiplicative relationships into additive ones.', subject: 'maths' },

    // -- History --
    { text: 'The Treaty of Versailles, signed in nineteen nineteen, imposed harsh penalties on Germany after the First World War.', subject: 'history' },
    { text: 'The Mabo decision overturned the legal fiction of terra nullius and reshaped Australian property law.', subject: 'history' },
    { text: 'The Cold War shaped global politics from the late nineteen forties through to nineteen ninety one.', subject: 'history' },
    { text: 'The Russian Revolution of nineteen seventeen ended three centuries of Romanov rule.', subject: 'history' },
    { text: 'Decolonisation across Africa accelerated rapidly during the nineteen sixties.', subject: 'history' },

    // -- Geography --
    { text: 'Economic globalisation has fundamentally reshaped the way nations trade, communicate and compete.', subject: 'geography' },
    { text: 'Climate change is driving shifts in ecosystems and ocean currents around the world.', subject: 'geography' },
    { text: 'Demographic transition theory links economic development to changes in birth and death rates.', subject: 'geography' },
    { text: 'Sustainable yield requires harvesting at or below the rate of natural regeneration.', subject: 'geography' },
    { text: 'The Paris Agreement sets a target of limiting warming to one point five degrees above pre-industrial levels.', subject: 'geography' },

    // -- Science --
    { text: 'Quantum mechanics challenges our intuitive understanding of how particles behave at subatomic scales.', subject: 'science' },
    { text: 'Natural selection acts on heritable variation to drive evolutionary change over generations.', subject: 'science' },
    { text: 'Conservation of energy states that energy can change form but cannot be created or destroyed.', subject: 'science' },
    { text: 'Genetic recombination during meiosis generates the diversity natural selection acts upon.', subject: 'science' },
    { text: 'Greenhouse gases absorb infrared radiation and warm the lower atmosphere.', subject: 'science' },
  ],
};

/** Filter sentences by stream and optional subject filter. */
export function pickSentences(
  stream: Stream,
  subjects: Subject[],
): SentenceEntry[] {
  const list = SENTENCES[stream] ?? [];
  if (subjects.length === 0) return list;
  return list.filter((s) => s.subject && subjects.includes(s.subject));
}
