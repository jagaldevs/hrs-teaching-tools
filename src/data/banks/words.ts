import type { Stream } from '../../data/games';
import type { Subject } from '../../games/types';

/**
 * Word bank for word-based games (Anagram Race, Word Chain, Define It, etc.)
 * and for the Word Builder tool.
 *
 * Words are categorised by stream (complexity scales up) and optionally tagged
 * with one or more AC V9 subjects. Words with no subject tag are treated as
 * general vocabulary and appear when no subject filter is active.
 */

export interface WordEntry {
  word: string;
  /** A child-friendly definition for Define It / hint usage. */
  hint?: string;
  /** Optional AC V9 subjects this word relates to. Untagged = general vocab. */
  subjects?: Subject[];
}

export const WORDS: Record<Stream, WordEntry[]> = {
  // ---------------- Foundation – Year 2 ----------------
  lower_primary: [
    { word: 'cat', hint: 'A small furry pet that purrs.', subjects: ['science'] },
    { word: 'dog', hint: 'A pet that barks.', subjects: ['science'] },
    { word: 'sun', hint: 'It gives us light and is hot.', subjects: ['science'] },
    { word: 'moon', hint: 'It shines at night.', subjects: ['science'] },
    { word: 'tree', hint: 'It grows tall and has leaves.', subjects: ['science'] },
    { word: 'fish', hint: 'It lives in water.', subjects: ['science'] },
    { word: 'bird', hint: 'It can fly.', subjects: ['science'] },
    { word: 'frog', hint: 'It is green and hops.', subjects: ['science'] },
    { word: 'milk', hint: 'White drink from a cow.' },
    { word: 'cake', hint: 'A sweet treat for parties.' },
    { word: 'star', hint: 'It twinkles in the sky.', subjects: ['science'] },
    { word: 'rain', hint: 'Water falling from clouds.', subjects: ['science'] },
    { word: 'book', hint: 'You read it.', subjects: ['english'] },
    { word: 'ball', hint: 'Round and you throw it.' },
    { word: 'shoe', hint: 'You wear it on your foot.' },
    { word: 'farm', hint: 'Place with cows and chickens.', subjects: ['geography'] },
    { word: 'fire', hint: 'Hot and orange.', subjects: ['science'] },
    { word: 'lamp', hint: 'It gives off light at night.' },
    { word: 'kite', hint: 'It flies in the wind.' },
    { word: 'rock', hint: 'Hard and grey, found on the ground.', subjects: ['science'] },
    { word: 'leaf', hint: 'It grows on a tree.', subjects: ['science'] },
    { word: 'sand', hint: 'You find it at the beach.', subjects: ['geography', 'science'] },
    { word: 'duck', hint: 'A water bird that quacks.', subjects: ['science'] },
    { word: 'door', hint: 'You open it to go in.' },
    { word: 'fork', hint: 'You eat with it.' },

    // Subject-specific additions for filter usefulness
    { word: 'word', hint: 'A group of letters that means something.', subjects: ['english'] },
    { word: 'story', hint: 'A tale you read or tell.', subjects: ['english'] },
    { word: 'rhyme', hint: 'Two words that sound the same at the end.', subjects: ['english'] },
    { word: 'verb', hint: 'A doing word.', subjects: ['english'] },
    { word: 'noun', hint: 'A naming word for a thing or place.', subjects: ['english'] },

    { word: 'ten', hint: 'The number after nine.', subjects: ['maths'] },
    { word: 'add', hint: 'To put numbers together.', subjects: ['maths'] },
    { word: 'half', hint: 'One of two equal parts.', subjects: ['maths'] },
    { word: 'circle', hint: 'A perfectly round shape.', subjects: ['maths'] },
    { word: 'square', hint: 'A shape with four equal sides.', subjects: ['maths'] },

    { word: 'past', hint: 'A long time ago.', subjects: ['history'] },
    { word: 'now', hint: 'At this very moment.', subjects: ['history'] },
    { word: 'family', hint: 'The people you live with.', subjects: ['history'] },

    { word: 'map', hint: 'A picture that shows where places are.', subjects: ['geography'] },
    { word: 'north', hint: 'The direction at the top of a map.', subjects: ['geography'] },
    { word: 'beach', hint: 'Sandy place next to the sea.', subjects: ['geography'] },

    { word: 'wind', hint: 'Moving air you can feel.', subjects: ['science'] },
    { word: 'snow', hint: 'White cold flakes from the sky.', subjects: ['science'] },
    { word: 'bee', hint: 'An insect that makes honey.', subjects: ['science'] },
  ],

  // ---------------- Year 3 – Year 6 ----------------
  upper_primary: [
    { word: 'planet', hint: 'A world like Earth that orbits a star.', subjects: ['science'] },
    { word: 'forest', hint: 'A large area covered in trees.', subjects: ['geography', 'science'] },
    { word: 'desert', hint: 'A dry place with sand and few plants.', subjects: ['geography'] },
    { word: 'jungle', hint: 'A thick tropical forest.', subjects: ['geography'] },
    { word: 'island', hint: 'Land surrounded by water.', subjects: ['geography'] },
    { word: 'volcano', hint: 'A mountain that erupts.', subjects: ['geography', 'science'] },
    { word: 'kangaroo', hint: 'A bouncing Australian animal.', subjects: ['science', 'geography'] },
    { word: 'echidna', hint: 'A spiny Australian mammal that lays eggs.', subjects: ['science'] },
    { word: 'rainbow', hint: 'Colours arching across the sky after rain.', subjects: ['science'] },
    { word: 'fraction', hint: 'Part of a whole, like 1/2.', subjects: ['maths'] },
    { word: 'pyramid', hint: 'An ancient triangular Egyptian structure.', subjects: ['history', 'maths'] },
    { word: 'galaxy', hint: 'A huge group of stars.', subjects: ['science'] },
    { word: 'compass', hint: 'It points north.', subjects: ['geography', 'science'] },
    { word: 'pirate', hint: 'A sailor who steals treasure.', subjects: ['history'] },
    { word: 'castle', hint: 'A large fortress with towers.', subjects: ['history'] },
    { word: 'dragon', hint: 'A mythical fire-breathing creature.' },
    { word: 'gravity', hint: 'The force pulling things down.', subjects: ['science'] },
    { word: 'rocket', hint: 'A vehicle that flies into space.', subjects: ['science'] },
    { word: 'penguin', hint: 'A flightless bird that lives in cold places.', subjects: ['science'] },
    { word: 'koala', hint: 'A grey marsupial that eats gum leaves.', subjects: ['science', 'geography'] },
    { word: 'mountain', hint: 'Tall rocky landform.', subjects: ['geography'] },
    { word: 'orchestra', hint: 'A large group of musicians playing together.' },
    { word: 'magnet', hint: 'It attracts iron.', subjects: ['science'] },
    { word: 'glacier', hint: 'A huge moving river of ice.', subjects: ['geography', 'science'] },
    { word: 'helmet', hint: 'A hard hat for protection.' },
    { word: 'parrot', hint: 'A colourful bird that can mimic speech.', subjects: ['science'] },
    { word: 'history', hint: 'The study of past events.', subjects: ['history'] },
    { word: 'pencil', hint: 'You write or draw with it.' },

    // Additional subject-specific vocab
    { word: 'simile', hint: 'A comparison using "like" or "as".', subjects: ['english'] },
    { word: 'metaphor', hint: 'A direct comparison saying one thing is another.', subjects: ['english'] },
    { word: 'adjective', hint: 'A word that describes a noun.', subjects: ['english'] },
    { word: 'paragraph', hint: 'A group of sentences about one idea.', subjects: ['english'] },

    { word: 'decimal', hint: 'A number with a dot, like 0.5.', subjects: ['maths'] },
    { word: 'percent', hint: 'Out of one hundred.', subjects: ['maths'] },
    { word: 'angle', hint: 'The space where two lines meet.', subjects: ['maths'] },
    { word: 'triangle', hint: 'A shape with three sides.', subjects: ['maths'] },

    { word: 'federation', hint: 'When several states join to form one country.', subjects: ['history'] },
    { word: 'aboriginal', hint: 'The first peoples of Australia.', subjects: ['history', 'geography'] },
    { word: 'gallipoli', hint: 'A WWI campaign Australian soldiers fought in.', subjects: ['history'] },

    { word: 'climate', hint: 'The usual weather of a place.', subjects: ['geography', 'science'] },
    { word: 'territory', hint: 'A region with its own boundary.', subjects: ['geography'] },

    { word: 'electricity', hint: 'A type of energy that powers lights.', subjects: ['science'] },
    { word: 'skeleton', hint: 'All the bones in a body.', subjects: ['science'] },
  ],

  // ---------------- Year 7 – Year 9 ----------------
  middle_school: [
    { word: 'algebra', hint: 'Maths using letters for unknown numbers.', subjects: ['maths'] },
    { word: 'democracy', hint: 'Government by the people.', subjects: ['history'] },
    { word: 'photosynthesis', hint: 'How plants make food from sunlight.', subjects: ['science'] },
    { word: 'parliament', hint: 'A group that makes laws.', subjects: ['history'] },
    { word: 'biosphere', hint: 'The layer of Earth where life exists.', subjects: ['geography', 'science'] },
    { word: 'pythagoras', hint: 'A famous Greek mathematician (and a triangle theorem).', subjects: ['maths', 'history'] },
    { word: 'colonial', hint: 'To do with colonies set up by another country.', subjects: ['history'] },
    { word: 'eruption', hint: 'A volcano blowing its top.', subjects: ['geography', 'science'] },
    { word: 'monsoon', hint: 'A seasonal wind bringing heavy rain.', subjects: ['geography'] },
    { word: 'gallipoli', hint: 'A WWI campaign Australians fought in.', subjects: ['history'] },
    { word: 'industry', hint: 'Producing goods, often in factories.', subjects: ['history', 'geography'] },
    { word: 'pollution', hint: 'Harmful substances released into the environment.', subjects: ['science', 'geography'] },
    { word: 'shakespeare', hint: 'English playwright of the 1500s–1600s.', subjects: ['english', 'history'] },
    { word: 'tectonic', hint: 'To do with Earth’s shifting plates.', subjects: ['geography', 'science'] },
    { word: 'glaciation', hint: 'A period of widespread ice cover.', subjects: ['geography'] },
    { word: 'medieval', hint: 'Of the Middle Ages.', subjects: ['history'] },
    { word: 'equation', hint: 'A mathematical statement that two things are equal.', subjects: ['maths'] },
    { word: 'pendulum', hint: 'A swinging weight.', subjects: ['science'] },
    { word: 'persuasive', hint: 'Designed to convince someone.', subjects: ['english'] },
    { word: 'rainforest', hint: 'Lush, dense forest with high rainfall.', subjects: ['geography', 'science'] },
    { word: 'parallel', hint: 'Lines that never meet.', subjects: ['maths'] },
    { word: 'irrigation', hint: 'Supplying water to crops.', subjects: ['geography'] },
    { word: 'sustainable', hint: 'Able to keep going without harming the planet.', subjects: ['geography', 'science'] },

    { word: 'metaphor', hint: 'A direct comparison.', subjects: ['english'] },
    { word: 'sonnet', hint: 'A 14-line poem.', subjects: ['english'] },
    { word: 'protagonist', hint: 'The main character in a story.', subjects: ['english'] },

    { word: 'integer', hint: 'A whole number, positive or negative.', subjects: ['maths'] },
    { word: 'quadratic', hint: 'An equation with an x² term.', subjects: ['maths'] },
    { word: 'probability', hint: 'How likely something is to happen.', subjects: ['maths'] },

    { word: 'renaissance', hint: 'A European cultural rebirth in the 1400s–1600s.', subjects: ['history'] },
    { word: 'revolution', hint: 'A sudden major political change.', subjects: ['history'] },

    { word: 'ecosystem', hint: 'A community of living things and their environment.', subjects: ['science', 'geography'] },
    { word: 'molecule', hint: 'Two or more atoms joined together.', subjects: ['science'] },
  ],

  // ---------------- Year 10 – Year 12 ----------------
  senior_school: [
    { word: 'metamorphosis', hint: 'A complete change of form.', subjects: ['science', 'english'] },
    { word: 'paradigm', hint: 'A pattern or model of thought.' },
    { word: 'rhetoric', hint: 'The art of persuasive speaking or writing.', subjects: ['english'] },
    { word: 'quadratic', hint: 'An equation with an x² term.', subjects: ['maths'] },
    { word: 'photosynthesis', hint: 'How plants convert light into chemical energy.', subjects: ['science'] },
    { word: 'colonialism', hint: 'Policy of acquiring control over another country.', subjects: ['history'] },
    { word: 'differentiation', hint: 'Finding the rate of change in calculus.', subjects: ['maths'] },
    { word: 'archaeology', hint: 'Studying the past through physical remains.', subjects: ['history'] },
    { word: 'sustainability', hint: 'Meeting today’s needs without compromising the future.', subjects: ['geography', 'science'] },
    { word: 'antagonist', hint: 'The character opposing the protagonist.', subjects: ['english'] },
    { word: 'hyperbole', hint: 'Deliberate exaggeration for effect.', subjects: ['english'] },
    { word: 'synecdoche', hint: 'A part standing for the whole.', subjects: ['english'] },
    { word: 'globalisation', hint: 'The integration of world economies and cultures.', subjects: ['history', 'geography'] },
    { word: 'enlightenment', hint: 'An 18th-century intellectual movement.', subjects: ['history'] },
    { word: 'biodiversity', hint: 'The variety of life in an ecosystem.', subjects: ['science', 'geography'] },
    { word: 'demographic', hint: 'To do with population statistics.', subjects: ['geography'] },
    { word: 'industrialisation', hint: 'Large-scale development of industries.', subjects: ['history', 'geography'] },
    { word: 'utilitarian', hint: 'Designed for use rather than beauty.' },
    { word: 'cartography', hint: 'The science of making maps.', subjects: ['geography'] },
    { word: 'philosophy', hint: 'The love and study of wisdom.' },
    { word: 'epistemology', hint: 'The study of knowledge.' },
    { word: 'totalitarian', hint: 'A regime that demands total state control.', subjects: ['history'] },
    { word: 'reconciliation', hint: 'Restoring friendly relations between groups.', subjects: ['history'] },
    { word: 'urbanisation', hint: 'Population shifting from rural to urban areas.', subjects: ['geography'] },

    { word: 'bildungsroman', hint: 'A coming-of-age story.', subjects: ['english'] },
    { word: 'allegory', hint: 'A story with a hidden symbolic meaning.', subjects: ['english'] },

    { word: 'trigonometry', hint: 'The maths of triangles and angles.', subjects: ['maths'] },
    { word: 'logarithm', hint: 'The inverse of exponentiation.', subjects: ['maths'] },

    { word: 'mabo', hint: 'The 1992 Australian land-rights case.', subjects: ['history'] },
    { word: 'apartheid', hint: 'A system of racial segregation in South Africa.', subjects: ['history'] },

    { word: 'geopolitics', hint: 'The politics of geography on a world scale.', subjects: ['geography', 'history'] },
    { word: 'desertification', hint: 'The process by which land becomes desert.', subjects: ['geography', 'science'] },

    { word: 'mitochondria', hint: 'The powerhouse of the cell.', subjects: ['science'] },
    { word: 'electromagnetism', hint: 'The force linking electricity and magnetism.', subjects: ['science'] },
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
