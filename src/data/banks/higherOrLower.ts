import type { Bank, HoLItem } from '../../games/types';

/**
 * Higher-or-lower bank. Items have a label + numeric value.
 * Each game pulls several items and the player guesses whether the next is higher or lower.
 */

const LOWER: HoLItem[] = [
  { id: 'days-week', label: 'Days in a week', value: 7 },
  { id: 'months-year', label: 'Months in a year', value: 12 },
  { id: 'sides-square', label: 'Sides of a square', value: 4 },
  { id: 'fingers-hand', label: 'Fingers on a hand', value: 5 },
  { id: 'legs-spider', label: 'Legs on a spider', value: 8 },
  { id: 'wheels-car', label: 'Wheels on a car', value: 4 },
  { id: 'wheels-bike', label: 'Wheels on a bike', value: 2 },
  { id: 'eyes-person', label: 'Eyes on a person', value: 2 },
  { id: 'days-month', label: 'Days in January', value: 31 },
  { id: 'players-soccer', label: 'Players on a soccer team', value: 11 },
];

const UPPER: HoLItem[] = [
  { id: 'population-darwin', label: 'Population of Darwin (approx.)', value: 150000, context: 'NT capital' },
  { id: 'population-sydney', label: 'Population of Sydney (approx.)', value: 5400000 },
  { id: 'population-australia', label: 'Population of Australia (approx.)', value: 26000000 },
  { id: 'states-aus', label: 'States in Australia', value: 6 },
  { id: 'territories-aus', label: 'Territories in Australia', value: 2 },
  { id: 'capitals-world', label: 'Capital cities of the world (approx.)', value: 195 },
  { id: 'oceans', label: 'Oceans on Earth', value: 5 },
  { id: 'continents', label: 'Continents on Earth', value: 7 },
  { id: 'planets', label: 'Planets in our solar system', value: 8 },
  { id: 'players-cricket', label: 'Players in a cricket team', value: 11 },
  { id: 'players-afl', label: 'Players on an AFL team (on field)', value: 18 },
  { id: 'players-rugby', label: 'Players in a rugby union team', value: 15 },
  { id: 'olympic-rings', label: 'Rings on the Olympic flag', value: 5 },
];

const MIDDLE: HoLItem[] = [
  { id: 'aus-year', label: 'Year of Australian Federation', value: 1901 },
  { id: 'cook-year', label: 'Year Cook landed at Botany Bay', value: 1770 },
  { id: 'fleet-year', label: 'Year the First Fleet arrived', value: 1788 },
  { id: 'ww1-start', label: 'Year WWI began', value: 1914 },
  { id: 'ww2-end', label: 'Year WWII ended', value: 1945 },
  { id: 'aus-area', label: 'Area of Australia (sq. km, millions)', value: 7.69, unit: 'M km²' },
  { id: 'aus-rivers', label: 'Length of the Murray River (km)', value: 2508, unit: 'km' },
  { id: 'mt-kosciuszko', label: 'Height of Mt Kosciuszko (m)', value: 2228, unit: 'm' },
  { id: 'mt-everest', label: 'Height of Mt Everest (m)', value: 8849, unit: 'm' },
  { id: 'speed-light', label: 'Speed of light (km/s, thousands)', value: 300, unit: 'k km/s' },
  { id: 'elements', label: 'Elements in the periodic table', value: 118 },
  { id: 'bones-adult', label: 'Bones in the adult human body', value: 206 },
  { id: 'g-force', label: 'Earth gravity (m/s²)', value: 9.8, unit: 'm/s²' },
];

const SENIOR: HoLItem[] = [
  { id: 'gdp-aus', label: 'Australia GDP (US$, trillions)', value: 1.7, unit: 'T USD' },
  { id: 'pop-china', label: 'China population (billions)', value: 1.41, unit: 'B' },
  { id: 'pop-india', label: 'India population (billions)', value: 1.43, unit: 'B' },
  { id: 'co2-ppm', label: 'Atmospheric CO₂ in 2024 (ppm)', value: 422, unit: 'ppm' },
  { id: 'co2-preindustrial', label: 'Pre-industrial atmospheric CO₂ (ppm)', value: 280, unit: 'ppm' },
  { id: 'earth-age', label: 'Age of the Earth (billion years)', value: 4.54, unit: 'Gyr' },
  { id: 'universe-age', label: 'Age of the universe (billion years)', value: 13.8, unit: 'Gyr' },
  { id: 'paris-target', label: 'Paris Agreement warming target (°C)', value: 1.5, unit: '°C' },
  { id: 'kyoto-year', label: 'Year of Kyoto Protocol', value: 1997 },
  { id: 'mabo-year', label: 'Year of the Mabo decision', value: 1992 },
  { id: 'berlin-fell', label: 'Year the Berlin Wall fell', value: 1989 },
  { id: 'cuban-missile', label: 'Year of the Cuban Missile Crisis', value: 1962 },
  { id: 'apollo-11', label: 'Year of Apollo 11 moon landing', value: 1969 },
  { id: 'megacity', label: 'Population threshold for a megacity (millions)', value: 10, unit: 'M' },
];

export const HOL_BANK: Bank<HoLItem> = {
  byStreamSubject: {
    lower_primary: { general: LOWER },
    upper_primary: { general: UPPER },
    middle_school: { general: MIDDLE },
    senior_school: { general: SENIOR },
  },
};
