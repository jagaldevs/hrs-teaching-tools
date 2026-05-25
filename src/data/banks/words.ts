import type { Stream } from '../../data/games';
import type { Subject } from '../../games/types';

/**
 * Word bank — Australian Curriculum V9 informed.
 *
 * Powers the word-based games (Anagram Race, Word Chain, Define It, Spelling
 * Bee) and the Word Builder tool. Each entry is tagged with one or more
 * subjects so games can offer "Year 7 Science words", "Senior English words"
 * etc. Untagged entries are general vocabulary.
 *
 * Coverage target: ~60+ entries per stream with all five subjects represented
 * (English, Maths, History, Geography, Science) plus general vocabulary.
 *
 * Hints are written as child-friendly definitions for Define It and to act as
 * "Show meaning" prompts in Word Builder.
 */

export interface WordEntry {
  word: string;
  /** A child-friendly definition for Define It / hint usage. */
  hint?: string;
  /** Optional AC V9 subjects this word relates to. Untagged = general vocab. */
  subjects?: Subject[];
}

export const WORDS: Record<Stream, WordEntry[]> = {
  // ====================================================
  //  LOWER PRIMARY  (F – Year 2)
  // ====================================================
  lower_primary: [
    // -- General vocabulary --
    { word: 'cat', hint: 'A small furry pet that purrs.', subjects: ['science'] },
    { word: 'dog', hint: 'A pet that barks.', subjects: ['science'] },
    { word: 'milk', hint: 'White drink from a cow.' },
    { word: 'cake', hint: 'A sweet treat for parties.' },
    { word: 'ball', hint: 'Round and you throw it.' },
    { word: 'shoe', hint: 'You wear it on your foot.' },
    { word: 'lamp', hint: 'It gives off light at night.' },
    { word: 'kite', hint: 'It flies in the wind.' },
    { word: 'door', hint: 'You open it to go in.' },
    { word: 'fork', hint: 'You eat with it.' },
    { word: 'bus', hint: 'A big vehicle that carries many people.' },
    { word: 'bed', hint: 'You sleep in it.' },
    { word: 'park', hint: 'A grassy place to play.' },

    // -- English --
    { word: 'book', hint: 'You read it.', subjects: ['english'] },
    { word: 'word', hint: 'A group of letters that means something.', subjects: ['english'] },
    { word: 'story', hint: 'A tale you read or tell.', subjects: ['english'] },
    { word: 'rhyme', hint: 'Two words that sound the same at the end.', subjects: ['english'] },
    { word: 'verb', hint: 'A doing word.', subjects: ['english'] },
    { word: 'noun', hint: 'A naming word for a thing or place.', subjects: ['english'] },
    { word: 'letter', hint: 'One of the 26 symbols of the alphabet.', subjects: ['english'] },
    { word: 'name', hint: 'What you are called.', subjects: ['english'] },
    { word: 'read', hint: 'To look at and understand words.', subjects: ['english'] },
    { word: 'write', hint: 'To put letters on a page.', subjects: ['english'] },
    { word: 'page', hint: 'One side of paper in a book.', subjects: ['english'] },

    // -- Maths --
    { word: 'ten', hint: 'The number after nine.', subjects: ['maths'] },
    { word: 'add', hint: 'To put numbers together.', subjects: ['maths'] },
    { word: 'half', hint: 'One of two equal parts.', subjects: ['maths'] },
    { word: 'circle', hint: 'A perfectly round shape.', subjects: ['maths'] },
    { word: 'square', hint: 'A shape with four equal sides.', subjects: ['maths'] },
    { word: 'count', hint: 'To say numbers in order.', subjects: ['maths'] },
    { word: 'pair', hint: 'A set of two.', subjects: ['maths'] },
    { word: 'cube', hint: 'A solid shape with six square faces.', subjects: ['maths'] },
    { word: 'clock', hint: 'It tells us the time.', subjects: ['maths'] },
    { word: 'coin', hint: 'A round piece of money.', subjects: ['maths'] },

    // -- History --
    { word: 'past', hint: 'A long time ago.', subjects: ['history'] },
    { word: 'now', hint: 'At this very moment.', subjects: ['history'] },
    { word: 'family', hint: 'The people you live with.', subjects: ['history'] },
    { word: 'old', hint: 'Has been around for a long time.', subjects: ['history'] },
    { word: 'memory', hint: 'Something we remember from before.', subjects: ['history'] },
    { word: 'photo', hint: 'A picture taken with a camera.', subjects: ['history'] },
    { word: 'museum', hint: 'A place that shows things from the past.', subjects: ['history'] },

    // -- Geography --
    { word: 'farm', hint: 'Place with cows and chickens.', subjects: ['geography'] },
    { word: 'sand', hint: 'You find it at the beach.', subjects: ['geography', 'science'] },
    { word: 'map', hint: 'A picture that shows where places are.', subjects: ['geography'] },
    { word: 'north', hint: 'The direction at the top of a map.', subjects: ['geography'] },
    { word: 'beach', hint: 'Sandy place next to the sea.', subjects: ['geography'] },
    { word: 'hill', hint: 'A small mountain.', subjects: ['geography'] },
    { word: 'city', hint: 'A very large town.', subjects: ['geography'] },
    { word: 'town', hint: 'A place where many people live and shop.', subjects: ['geography'] },

    // -- Science --
    { word: 'sun', hint: 'It gives us light and is hot.', subjects: ['science'] },
    { word: 'moon', hint: 'It shines at night.', subjects: ['science'] },
    { word: 'tree', hint: 'It grows tall and has leaves.', subjects: ['science'] },
    { word: 'fish', hint: 'It lives in water.', subjects: ['science'] },
    { word: 'bird', hint: 'It can fly.', subjects: ['science'] },
    { word: 'frog', hint: 'It is green and hops.', subjects: ['science'] },
    { word: 'star', hint: 'It twinkles in the sky.', subjects: ['science'] },
    { word: 'rain', hint: 'Water falling from clouds.', subjects: ['science'] },
    { word: 'fire', hint: 'Hot and orange.', subjects: ['science'] },
    { word: 'rock', hint: 'Hard and grey, found on the ground.', subjects: ['science'] },
    { word: 'leaf', hint: 'It grows on a tree.', subjects: ['science'] },
    { word: 'duck', hint: 'A water bird that quacks.', subjects: ['science'] },
    { word: 'wind', hint: 'Moving air you can feel.', subjects: ['science'] },
    { word: 'snow', hint: 'White cold flakes from the sky.', subjects: ['science'] },
    { word: 'bee', hint: 'An insect that makes honey.', subjects: ['science'] },
    { word: 'seed', hint: 'A tiny thing that can grow into a plant.', subjects: ['science'] },
    { word: 'ice', hint: 'Frozen water.', subjects: ['science'] },
    { word: 'egg', hint: 'A bird lays it.', subjects: ['science'] },
  ],

  // ====================================================
  //  UPPER PRIMARY  (Year 3 – Year 6)
  // ====================================================
  upper_primary: [
    // -- General vocabulary --
    { word: 'helmet', hint: 'A hard hat for protection.' },
    { word: 'orchestra', hint: 'A large group of musicians playing together.' },
    { word: 'pencil', hint: 'You write or draw with it.' },
    { word: 'dragon', hint: 'A mythical fire-breathing creature.' },
    { word: 'pirate', hint: 'A sailor who steals treasure.', subjects: ['history'] },
    { word: 'bicycle', hint: 'A vehicle with two wheels you pedal.' },
    { word: 'kitchen', hint: 'A room where food is prepared.' },
    { word: 'pattern', hint: 'A repeating design or sequence.', subjects: ['maths'] },

    // -- English --
    { word: 'simile', hint: 'A comparison using "like" or "as".', subjects: ['english'] },
    { word: 'metaphor', hint: 'A direct comparison saying one thing is another.', subjects: ['english'] },
    { word: 'adjective', hint: 'A word that describes a noun.', subjects: ['english'] },
    { word: 'paragraph', hint: 'A group of sentences about one idea.', subjects: ['english'] },
    { word: 'adverb', hint: 'A word that modifies a verb or adjective.', subjects: ['english'] },
    { word: 'pronoun', hint: 'A word that replaces a noun, like "she" or "it".', subjects: ['english'] },
    { word: 'syllable', hint: 'A unit of sound in a word.', subjects: ['english'] },
    { word: 'prefix', hint: 'Letters added to the start of a word.', subjects: ['english'] },
    { word: 'suffix', hint: 'Letters added to the end of a word.', subjects: ['english'] },
    { word: 'stanza', hint: 'A group of lines in a poem.', subjects: ['english'] },
    { word: 'fiction', hint: 'A made-up story.', subjects: ['english'] },
    { word: 'character', hint: 'A person or animal in a story.', subjects: ['english'] },
    { word: 'narrator', hint: 'The voice that tells a story.', subjects: ['english'] },

    // -- Maths --
    { word: 'fraction', hint: 'Part of a whole, like 1/2.', subjects: ['maths'] },
    { word: 'decimal', hint: 'A number with a dot, like 0.5.', subjects: ['maths'] },
    { word: 'percent', hint: 'Out of one hundred.', subjects: ['maths'] },
    { word: 'angle', hint: 'The space where two lines meet.', subjects: ['maths'] },
    { word: 'triangle', hint: 'A shape with three sides.', subjects: ['maths'] },
    { word: 'multiply', hint: 'To add a number to itself several times.', subjects: ['maths'] },
    { word: 'divide', hint: 'To share into equal groups.', subjects: ['maths'] },
    { word: 'perimeter', hint: 'The distance around the outside of a shape.', subjects: ['maths'] },
    { word: 'volume', hint: 'How much space something takes up.', subjects: ['maths'] },
    { word: 'symmetry', hint: 'A shape balanced around a line or point.', subjects: ['maths'] },
    { word: 'remainder', hint: 'What is left over after dividing.', subjects: ['maths'] },
    { word: 'parallel', hint: 'Lines that stay the same distance apart.', subjects: ['maths'] },
    { word: 'average', hint: 'The middle or typical value of a group.', subjects: ['maths'] },

    // -- History --
    { word: 'pyramid', hint: 'An ancient triangular Egyptian structure.', subjects: ['history', 'maths'] },
    { word: 'castle', hint: 'A large fortress with towers.', subjects: ['history'] },
    { word: 'history', hint: 'The study of past events.', subjects: ['history'] },
    { word: 'federation', hint: 'When several states join to form one country.', subjects: ['history'] },
    { word: 'aboriginal', hint: 'The first peoples of Australia.', subjects: ['history', 'geography'] },
    { word: 'gallipoli', hint: 'A WWI campaign Australian soldiers fought in.', subjects: ['history'] },
    { word: 'colony', hint: 'A place ruled by another country.', subjects: ['history'] },
    { word: 'eureka', hint: 'A famous Australian goldfields rebellion.', subjects: ['history'] },
    { word: 'convict', hint: 'A prisoner sent to a colony.', subjects: ['history'] },
    { word: 'ancient', hint: 'Belonging to the very distant past.', subjects: ['history'] },

    // -- Geography --
    { word: 'desert', hint: 'A dry place with sand and few plants.', subjects: ['geography'] },
    { word: 'jungle', hint: 'A thick tropical forest.', subjects: ['geography'] },
    { word: 'island', hint: 'Land surrounded by water.', subjects: ['geography'] },
    { word: 'mountain', hint: 'Tall rocky landform.', subjects: ['geography'] },
    { word: 'territory', hint: 'A region with its own boundary.', subjects: ['geography'] },
    { word: 'continent', hint: 'One of seven huge landmasses on Earth.', subjects: ['geography'] },
    { word: 'equator', hint: 'The imaginary line around the middle of Earth.', subjects: ['geography'] },
    { word: 'capital', hint: 'The main city where a government meets.', subjects: ['geography'] },
    { word: 'reef', hint: 'A ridge of coral or rocks underwater.', subjects: ['geography', 'science'] },
    { word: 'outback', hint: 'The remote inland of Australia.', subjects: ['geography'] },

    // -- Science --
    { word: 'planet', hint: 'A world like Earth that orbits a star.', subjects: ['science'] },
    { word: 'volcano', hint: 'A mountain that erupts.', subjects: ['geography', 'science'] },
    { word: 'forest', hint: 'A large area covered in trees.', subjects: ['geography', 'science'] },
    { word: 'kangaroo', hint: 'A bouncing Australian animal.', subjects: ['science', 'geography'] },
    { word: 'echidna', hint: 'A spiny Australian mammal that lays eggs.', subjects: ['science'] },
    { word: 'rainbow', hint: 'Colours arching across the sky after rain.', subjects: ['science'] },
    { word: 'galaxy', hint: 'A huge group of stars.', subjects: ['science'] },
    { word: 'compass', hint: 'It points north.', subjects: ['geography', 'science'] },
    { word: 'gravity', hint: 'The force pulling things down.', subjects: ['science'] },
    { word: 'rocket', hint: 'A vehicle that flies into space.', subjects: ['science'] },
    { word: 'penguin', hint: 'A flightless bird that lives in cold places.', subjects: ['science'] },
    { word: 'koala', hint: 'A grey marsupial that eats gum leaves.', subjects: ['science', 'geography'] },
    { word: 'magnet', hint: 'It attracts iron.', subjects: ['science'] },
    { word: 'glacier', hint: 'A huge moving river of ice.', subjects: ['geography', 'science'] },
    { word: 'parrot', hint: 'A colourful bird that can mimic speech.', subjects: ['science'] },
    { word: 'climate', hint: 'The usual weather of a place.', subjects: ['geography', 'science'] },
    { word: 'electricity', hint: 'A type of energy that powers lights.', subjects: ['science'] },
    { word: 'skeleton', hint: 'All the bones in a body.', subjects: ['science'] },
    { word: 'fossil', hint: 'Ancient remains preserved in rock.', subjects: ['science'] },
    { word: 'orbit', hint: 'The path one object takes around another in space.', subjects: ['science'] },
    { word: 'mammal', hint: 'An animal that has fur and feeds milk to its young.', subjects: ['science'] },
  ],

  // ====================================================
  //  MIDDLE SCHOOL  (Year 7 – Year 9)
  // ====================================================
  middle_school: [
    // -- General vocabulary --
    { word: 'tournament', hint: 'A series of competitive matches.' },
    { word: 'symphony', hint: 'A large orchestral musical work.' },
    { word: 'voyage', hint: 'A long journey, often by sea.', subjects: ['history'] },

    // -- English --
    { word: 'metaphor', hint: 'A direct comparison.', subjects: ['english'] },
    { word: 'sonnet', hint: 'A 14-line poem.', subjects: ['english'] },
    { word: 'protagonist', hint: 'The main character in a story.', subjects: ['english'] },
    { word: 'persuasive', hint: 'Designed to convince someone.', subjects: ['english'] },
    { word: 'shakespeare', hint: 'English playwright of the 1500s–1600s.', subjects: ['english', 'history'] },
    { word: 'imagery', hint: 'Descriptive language that paints a picture.', subjects: ['english'] },
    { word: 'symbolism', hint: 'Using objects to represent ideas.', subjects: ['english'] },
    { word: 'antagonist', hint: 'The character opposing the protagonist.', subjects: ['english'] },
    { word: 'alliteration', hint: 'Repeating the same sound at the start of nearby words.', subjects: ['english'] },
    { word: 'foreshadow', hint: 'To hint at events to come.', subjects: ['english'] },
    { word: 'dialogue', hint: 'Conversation between characters.', subjects: ['english'] },
    { word: 'theme', hint: 'The central idea of a text.', subjects: ['english'] },

    // -- Maths --
    { word: 'algebra', hint: 'Maths using letters for unknown numbers.', subjects: ['maths'] },
    { word: 'pythagoras', hint: 'A Greek mathematician famous for a triangle theorem.', subjects: ['maths', 'history'] },
    { word: 'equation', hint: 'A mathematical statement that two things are equal.', subjects: ['maths'] },
    { word: 'parallel', hint: 'Lines that never meet.', subjects: ['maths'] },
    { word: 'integer', hint: 'A whole number, positive or negative.', subjects: ['maths'] },
    { word: 'quadratic', hint: 'An equation with an x² term.', subjects: ['maths'] },
    { word: 'probability', hint: 'How likely something is to happen.', subjects: ['maths'] },
    { word: 'hypotenuse', hint: 'The longest side of a right-angled triangle.', subjects: ['maths'] },
    { word: 'congruent', hint: 'Identical in shape and size.', subjects: ['maths'] },
    { word: 'gradient', hint: 'The steepness of a line.', subjects: ['maths'] },
    { word: 'coefficient', hint: 'A number that multiplies a variable.', subjects: ['maths'] },
    { word: 'simultaneous', hint: 'Equations solved at the same time.', subjects: ['maths'] },

    // -- History --
    { word: 'democracy', hint: 'Government by the people.', subjects: ['history'] },
    { word: 'parliament', hint: 'A group that makes laws.', subjects: ['history'] },
    { word: 'colonial', hint: 'To do with colonies set up by another country.', subjects: ['history'] },
    { word: 'gallipoli', hint: 'A WWI campaign Australians fought in.', subjects: ['history'] },
    { word: 'industry', hint: 'Producing goods, often in factories.', subjects: ['history', 'geography'] },
    { word: 'medieval', hint: 'Of the Middle Ages.', subjects: ['history'] },
    { word: 'renaissance', hint: 'A European cultural rebirth in the 1400s–1600s.', subjects: ['history'] },
    { word: 'revolution', hint: 'A sudden major political change.', subjects: ['history'] },
    { word: 'crusade', hint: 'A medieval religious military expedition.', subjects: ['history'] },
    { word: 'feudal', hint: 'A medieval system of lords and serfs.', subjects: ['history'] },
    { word: 'dynasty', hint: 'A sequence of rulers from the same family.', subjects: ['history'] },

    // -- Geography --
    { word: 'biosphere', hint: 'The layer of Earth where life exists.', subjects: ['geography', 'science'] },
    { word: 'eruption', hint: 'A volcano blowing its top.', subjects: ['geography', 'science'] },
    { word: 'monsoon', hint: 'A seasonal wind bringing heavy rain.', subjects: ['geography'] },
    { word: 'tectonic', hint: 'To do with Earth’s shifting plates.', subjects: ['geography', 'science'] },
    { word: 'glaciation', hint: 'A period of widespread ice cover.', subjects: ['geography'] },
    { word: 'rainforest', hint: 'Lush, dense forest with high rainfall.', subjects: ['geography', 'science'] },
    { word: 'irrigation', hint: 'Supplying water to crops.', subjects: ['geography'] },
    { word: 'sustainable', hint: 'Able to keep going without harming the planet.', subjects: ['geography', 'science'] },
    { word: 'catchment', hint: 'An area that drains water into a single river.', subjects: ['geography'] },
    { word: 'delta', hint: 'The flat fan-shaped land where a river meets the sea.', subjects: ['geography'] },
    { word: 'tropics', hint: 'Hot regions near the equator.', subjects: ['geography'] },
    { word: 'migration', hint: 'Movement of people from one place to another.', subjects: ['geography'] },

    // -- Science --
    { word: 'photosynthesis', hint: 'How plants make food from sunlight.', subjects: ['science'] },
    { word: 'pendulum', hint: 'A swinging weight.', subjects: ['science'] },
    { word: 'pollution', hint: 'Harmful substances released into the environment.', subjects: ['science', 'geography'] },
    { word: 'ecosystem', hint: 'A community of living things and their environment.', subjects: ['science', 'geography'] },
    { word: 'molecule', hint: 'Two or more atoms joined together.', subjects: ['science'] },
    { word: 'mitosis', hint: 'Cell division that makes identical copies.', subjects: ['science'] },
    { word: 'velocity', hint: 'Speed in a particular direction.', subjects: ['science'] },
    { word: 'frequency', hint: 'How often a wave repeats per second.', subjects: ['science'] },
    { word: 'compound', hint: 'A substance made of two or more elements bonded.', subjects: ['science'] },
    { word: 'organism', hint: 'A single living thing.', subjects: ['science'] },
    { word: 'genome', hint: 'All the genetic information in an organism.', subjects: ['science'] },
    { word: 'circuit', hint: 'A complete path for electricity to flow.', subjects: ['science'] },
  ],

  // ====================================================
  //  SENIOR SCHOOL  (Year 10 – Year 12)
  // ====================================================
  senior_school: [
    // -- General / vocabulary --
    { word: 'paradigm', hint: 'A pattern or model of thought.' },
    { word: 'utilitarian', hint: 'Designed for use rather than beauty.' },
    { word: 'philosophy', hint: 'The love and study of wisdom.' },
    { word: 'epistemology', hint: 'The study of knowledge.' },
    { word: 'metamorphosis', hint: 'A complete change of form.', subjects: ['science', 'english'] },

    // -- English --
    { word: 'rhetoric', hint: 'The art of persuasive speaking or writing.', subjects: ['english'] },
    { word: 'antagonist', hint: 'The character opposing the protagonist.', subjects: ['english'] },
    { word: 'hyperbole', hint: 'Deliberate exaggeration for effect.', subjects: ['english'] },
    { word: 'synecdoche', hint: 'A part standing for the whole.', subjects: ['english'] },
    { word: 'bildungsroman', hint: 'A coming-of-age story.', subjects: ['english'] },
    { word: 'allegory', hint: 'A story with a hidden symbolic meaning.', subjects: ['english'] },
    { word: 'denouement', hint: 'The resolution at the end of a story.', subjects: ['english'] },
    { word: 'catharsis', hint: 'Emotional release through tragedy.', subjects: ['english'] },
    { word: 'hamartia', hint: 'A tragic flaw in a character.', subjects: ['english'] },
    { word: 'modernism', hint: 'Early 20th-century literary and artistic movement.', subjects: ['english'] },
    { word: 'postmodernism', hint: 'Late 20th-century movement playing with form and meaning.', subjects: ['english'] },
    { word: 'intertextuality', hint: 'How texts reference other texts.', subjects: ['english'] },

    // -- Maths --
    { word: 'quadratic', hint: 'An equation with an x² term.', subjects: ['maths'] },
    { word: 'differentiation', hint: 'Finding the rate of change in calculus.', subjects: ['maths'] },
    { word: 'trigonometry', hint: 'The maths of triangles and angles.', subjects: ['maths'] },
    { word: 'logarithm', hint: 'The inverse of exponentiation.', subjects: ['maths'] },
    { word: 'integration', hint: 'Finding the area under a curve in calculus.', subjects: ['maths'] },
    { word: 'asymptote', hint: 'A line that a curve approaches but never touches.', subjects: ['maths'] },
    { word: 'matrix', hint: 'A rectangular array of numbers used in linear algebra.', subjects: ['maths'] },
    { word: 'vector', hint: 'A quantity with both magnitude and direction.', subjects: ['maths'] },
    { word: 'binomial', hint: 'An algebraic expression with two terms.', subjects: ['maths'] },
    { word: 'derivative', hint: 'The instantaneous rate of change of a function.', subjects: ['maths'] },

    // -- History --
    { word: 'colonialism', hint: 'Policy of acquiring control over another country.', subjects: ['history'] },
    { word: 'archaeology', hint: 'Studying the past through physical remains.', subjects: ['history'] },
    { word: 'globalisation', hint: 'The integration of world economies and cultures.', subjects: ['history', 'geography'] },
    { word: 'enlightenment', hint: 'An 18th-century intellectual movement.', subjects: ['history'] },
    { word: 'industrialisation', hint: 'Large-scale development of industries.', subjects: ['history', 'geography'] },
    { word: 'totalitarian', hint: 'A regime that demands total state control.', subjects: ['history'] },
    { word: 'reconciliation', hint: 'Restoring friendly relations between groups.', subjects: ['history'] },
    { word: 'mabo', hint: 'The 1992 Australian land-rights case.', subjects: ['history'] },
    { word: 'apartheid', hint: 'A system of racial segregation in South Africa.', subjects: ['history'] },
    { word: 'imperialism', hint: 'Extending power through colonisation or force.', subjects: ['history'] },
    { word: 'detente', hint: 'A relaxing of tension between states.', subjects: ['history'] },
    { word: 'propaganda', hint: 'Biased information used to promote a viewpoint.', subjects: ['history'] },

    // -- Geography --
    { word: 'sustainability', hint: 'Meeting today’s needs without compromising the future.', subjects: ['geography', 'science'] },
    { word: 'demographic', hint: 'To do with population statistics.', subjects: ['geography'] },
    { word: 'cartography', hint: 'The science of making maps.', subjects: ['geography'] },
    { word: 'urbanisation', hint: 'Population shifting from rural to urban areas.', subjects: ['geography'] },
    { word: 'desertification', hint: 'The process by which land becomes desert.', subjects: ['geography', 'science'] },
    { word: 'geopolitics', hint: 'The politics of geography on a world scale.', subjects: ['geography', 'history'] },
    { word: 'anthropocene', hint: 'The proposed epoch of significant human impact.', subjects: ['geography', 'science'] },
    { word: 'biodiversity', hint: 'The variety of life in an ecosystem.', subjects: ['science', 'geography'] },
    { word: 'eutrophication', hint: 'Nutrient overload that depletes oxygen in water.', subjects: ['geography', 'science'] },
    { word: 'salinity', hint: 'The salt content of soil or water.', subjects: ['geography', 'science'] },

    // -- Science --
    { word: 'photosynthesis', hint: 'How plants convert light into chemical energy.', subjects: ['science'] },
    { word: 'mitochondria', hint: 'The powerhouse of the cell.', subjects: ['science'] },
    { word: 'electromagnetism', hint: 'The force linking electricity and magnetism.', subjects: ['science'] },
    { word: 'thermodynamics', hint: 'The physics of heat and energy transfer.', subjects: ['science'] },
    { word: 'oscillation', hint: 'A repeated back-and-forth motion.', subjects: ['science'] },
    { word: 'catalyst', hint: 'A substance that speeds up a reaction without being consumed.', subjects: ['science'] },
    { word: 'cosmology', hint: 'The study of the origin and structure of the universe.', subjects: ['science'] },
    { word: 'evolution', hint: 'Change in heritable traits over generations.', subjects: ['science'] },
    { word: 'enzyme', hint: 'A protein that speeds up biological reactions.', subjects: ['science'] },
    { word: 'isotope', hint: 'Atoms of the same element with different neutron counts.', subjects: ['science'] },
    { word: 'redox', hint: 'A chemical reaction involving electron transfer.', subjects: ['science'] },
    { word: 'genome', hint: 'The complete set of an organism’s DNA.', subjects: ['science'] },
  ],
};

/** Pick a random subset (any subject). Used by games that need general words. */
export function pickWords(stream: Stream, count: number): WordEntry[] {
  const list = WORDS[stream] ?? [];
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out.slice(0, count);
}

/** Pick filtered to one or more subjects. Empty `subjects` = no filter. */
export function pickWordsFiltered(
  stream: Stream,
  subjects: Subject[],
  count: number,
): WordEntry[] {
  const list = WORDS[stream] ?? [];
  const filtered =
    subjects.length === 0
      ? list
      : list.filter((w) => w.subjects?.some((s) => subjects.includes(s)));
  const out = filtered.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out.slice(0, count);
}
