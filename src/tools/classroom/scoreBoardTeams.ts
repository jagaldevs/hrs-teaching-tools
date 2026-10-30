import { newId } from '../classes/rosters';

/** Score Board team as saved under `hrs:scoreboard.teams`. */
export interface Team {
  id: string;
  name: string;
  /** Legacy: older saves stored a hex colour. Teams are now coloured by position. */
  colour?: string;
  score: number;
  /** Who's in the team, when it came from Group Maker. */
  members?: string[];
}

export const SCOREBOARD_KEY = 'scoreboard.teams';
export const MAX_TEAMS = 8;

/**
 * Replace the Score Board's teams with these groups. Asks first if the
 * current board has points on it. Returns false if the teacher cancels.
 */
export function sendTeamsToScoreBoard(groups: { name: string; members: string[] }[]): boolean {
  const key = `hrs:${SCOREBOARD_KEY}`;
  let existing: Team[] = [];
  try {
    existing = JSON.parse(localStorage.getItem(key) ?? '[]') as Team[];
  } catch {
    existing = [];
  }
  if (
    Array.isArray(existing) &&
    existing.some((t) => t.score > 0) &&
    !window.confirm('Replace the teams on the Score Board? Their current points will be cleared.')
  ) {
    return false;
  }
  const teams: Team[] = groups.slice(0, MAX_TEAMS).map((g) => ({ id: newId(), name: g.name, members: g.members, score: 0 }));
  try {
    localStorage.setItem(key, JSON.stringify(teams));
  } catch {
    return false;
  }
  return true;
}
