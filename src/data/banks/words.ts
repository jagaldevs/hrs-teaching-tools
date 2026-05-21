import type { Stream } from '../../data/games';

/**
 * Word bank for word-based games (Anagram Race, Word Chain, Define It, etc.).
 * Words are categorised by stream and complexity grows with stream.
 */

export interface WordEntry {
  word: string;
  /** A child-friendly definition for Define It / hint usage. */
  hint?: string;
}

export const WORDS: Record<Stream, WordEntry[]> = {
  lower_primary: [
    { word: 'cat', hint: 'A small furry pet that purrs.' },
    { word: 'dog', hint: 'A pet that barks.' },
    { word: 'sun', hint: 'It gives us light and is hot.' },
    { word: 'moon', hint: 'It shines at night.' },
    { word: 'tree', hint: 'It grows tall and has leaves.' },
    { word: 'fish', hint: 'It lives in water.' },
    { word: 'bird', hint: 'It can fly.' },
    { word: 'frog', hint: 'It is green and hops.' },
    { word: 'milk', hint: 'White drink from a cow.' },
    { word: 'cake', hint: 'A sweet treat for parties.' },
    { word: 'star', hint: 'It twinkles in the sky.' },
    { word: 'rain', hint: 'Water falling from clouds.' },
    { word: 'book', hint: 'You read it.' },
    { word: 'ball', hint: 'Round and you throw it.' },
    { word: 'shoe', hint: 'You wear it on your foot.' },
    { word: 'farm', hint: 'Place with cows and chickens.' },
    { word: 'fire', hint: 'Hot and orange.' },
    { word: 'lamp', hint: 'It gives off light at night.' },
    { word: 'kite', hint: 'It flies in the wind.' },
    { word: 'rock', hint: 'Hard and grey, found on the ground.' },
    { word: 'leaf', hint: 'It grows on a tree.' },
    { word: 'sand', hint: 'You find it at the beach.' },
    { word: 'duck', hint: 'A water bird that quacks.' },
    { word: 'door', hint: 'You open it to go in.' },
    { word: 'fork', hint: 'You eat with it.' },
  ],

  upper_primary: [
    { word: 'planet', hint: 'A world like Earth that orbits a star.' },
    { word: 'forest', hint: 'A large area covered in trees.' },
    { word: 'desert', hint: 'A dry place with sand and few plants.' },
    { word: 'jungle', hint: 'A thick tropical forest.' },
    { word: 'island', hint: 'Land surrounded by water.' },
    { word: 'volcano', hint: 'A mountain that erupts.' },
    { word: 'kangaroo', hint: 'A bouncing Australian animal.' },
    { word: 'echidna', hint: 'A spiny Australian mammal that lays eggs.' },
    { word: 'rainbow', hint: 'Colours arching across the sky after rain.' },
    { word: 'fraction', hint: 'Part of a whole, like 1/2.' },
    { word: 'pyramid', hint: 'An ancient triangular Egyptian structure.' },
    { word: 'galaxy', hint: 'A huge group of stars.' },
    { word: 'compass', hint: 'It points north.' },
    { word: 'pirate', hint: 'A sailor who steals treasure.' },
    { word: 'castle', hint: 'A large fortress with towers.' },
    { word: 'dragon', hint: 'A mythical fire-breathing creature.' },
    { word: 'gravity', hint: 'The force pulling things down.' },
    { word: 'rocket', hint: 'A vehicle that flies into space.' },
    { word: 'penguin', hint: 'A flightless bird that lives in cold places.' },
    { word: 'koala', hint: 'A grey marsupial that eats gum leaves.' },
    { word: 'mountain', hint: 'Tall rocky landform.' },
    { word: 'orchestra', hint: 'A large group of musicians playing together.' },
    { word: 'magnet', hint: 'It attracts iron.' },
    { word: 'glacier', hint: 'A huge moving river of ice.' },
    { word: 'helmet', hint: 'A hard hat for protection.' },
    { word: 'parrot', hint: 'A colourful bird that can mimic speech.' },
    { word: 'history', hint: 'The study of past events.' },
    { word: 'pencil', hint: 'You write or draw with it.' },
  ],

  middle_school: [
    { word: 'metaphor', hint: 'A figure of speech where one thing is called another.' },
    { word: 'algebra', hint: 'Maths using letters for unknown numbers.' },
    { word: 'democracy', hint: 'Government by the people.' },
    { word: 'photosynthesis', hint: 'How plants make food from sunlight.' },
    { word: 'parliament', hint: 'A group that makes laws.' },
    { word: 'biosphere', hint: 'The layer of Earth where life exists.' },
    { word: 'pythagoras', hint: 'A famous Greek mathematician (and a triangle theorem).' },
    { word: 'colonial', hint: 'To do with colonies set up by another country.' },
    { word: 'eruption', hint: 'A volcano blowing its top.' },
    { word: 'monsoon', hint: 'A seasonal wind bringing heavy rain.' },
    { word: 'gallipoli', hint: 'A WWI campaign Australians fought in.' },
    { word: 'industry', hint: 'Producing goods, often in factories.' },
    { word: 'pollution', hint: 'Harmful substances released into the environment.' },
    { word: 'shakespeare', hint: 'English playwright of the 1500s–1600s.' },
    { word: 'tectonic', hint: 'To do with Earth’s shifting plates.' },
    { word: 'glaciation', hint: 'A period of widespread ice cover.' },
    { word: 'medieval', hint: 'Of the Middle Ages.' },
    { word: 'equation', hint: 'A mathematical statement that two things are equal.' },
    { word: 'pendulum', hint: 'A swinging weight.' },
    { word: 'persuasive', hint: 'Designed to convince someone.' },
    { word: 'rainforest', hint: 'Lush, dense forest with high rainfall.' },
    { word: 'parallel', hint: 'Lines that never meet.' },
    { word: 'irrigation', hint: 'Supplying water to crops.' },
    { word: 'sustainable', hint: 'Able to keep going without harming the planet.' },
  ],

  senior_school: [
    { word: 'metamorphosis', hint: 'A complete change of form.' },
    { word: 'paradigm', hint: 'A pattern or model of thought.' },
    { word: 'rhetoric', hint: 'The art of persuasive speaking or writing.' },
    { word: 'quadratic', hint: 'An equation with an x² term.' },
    { word: 'photosynthesis', hint: 'How plants convert light into chemical energy.' },
    { word: 'colonialism', hint: 'Policy of acquiring control over another country.' },
    { word: 'differentiation', hint: 'Finding the rate of change in calculus.' },
    { word: 'archaeology', hint: 'Studying the past through physical remains.' },
    { word: 'sustainability', hint: 'Meeting today’s needs without compromising the future.' },
    { word: 'antagonist', hint: 'The character opposing the protagonist.' },
    { word: 'hyperbole', hint: 'Deliberate exaggeration for effect.' },
    { word: 'synecdoche', hint: 'A part standing for the whole.' },
    { word: 'globalisation', hint: 'The integration of world economies and cultures.' },
    { word: 'enlightenment', hint: 'An 18th-century intellectual movement.' },
    { word: 'biodiversity', hint: 'The variety of life in an ecosystem.' },
    { word: 'demographic', hint: 'To do with population statistics.' },
    { word: 'industrialisation', hint: 'Large-scale development of industries.' },
    { word: 'utilitarian', hint: 'Designed for use rather than beauty.' },
    { word: 'cartography', hint: 'The science of making maps.' },
    { word: 'philosophy', hint: 'The love and study of wisdom.' },
    { word: 'epistemology', hint: 'The study of knowledge.' },
    { word: 'totalitarian', hint: 'A regime that demands total state control.' },
    { word: 'reconciliation', hint: 'Restoring friendly relations between groups.' },
    { word: 'urbanisation', hint: 'Population shifting from rural to urban areas.' },
  ],
};

export function pickWords(stream: Stream, count: number): WordEntry[] {
  const list = WORDS[stream] ?? [];
  // Shuffle then take count
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out.slice(0, count);
}
