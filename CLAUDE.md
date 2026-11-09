# HRS Teaching Tools

Offline PWA for Haileybury Rendall School: Brain Breaks games (`/`) and
Teacher Tools (`/tools`). React 18 + Vite + TypeScript; all state in the
browser. Jack owns it and isn't a developer: explain in plain language.

## Session start

1. Work in this folder (`OneDrive - Haileybury\Desktop\hrs_teaching_tools`).
   `C:\Users\jack.galbraith\Code\hrs_teaching_tools` is a stale backup.
2. `git fetch`, `git status`, `gh pr list`: work in flight sits on
   unmerged, possibly stacked, branches. Branch from the newest of them.
3. Read the newest entry under **Session handoffs** in `WORKLOG.md`.

## Pointers

- `WORKLOG.md`: conventions, decisions, lessons and open follow-ups
  (§1–7) — read the section covering code before changing it, and update
  §1–7 in place when the code changes. Session handoffs are append-only,
  newest first.
- `JACK-NOTES.md`: Jack's own guide. Keep it plain-language.
- `onboard-class` skill: whenever Jack names a class to anchor.

## Rules

- **Look:** clean and professional. Neutral greys; HRS burgundy
  (`--accent`) is the one accent; things that need telling apart use
  `--cat-1…10` via `categorical(i)` in `src/theme/palette.ts`. Every
  colour is a token from `src/styles/tokens.css`. Flat surfaces, thin
  borders. (WORKLOG §3.7)
- **Checks before every commit:** `npx tsc -b`, `npm test`,
  `npm run audit:content`; plus `npx vite build` and a look in the
  browser for UI changes.
- **Changes reach `main` by pull request.** Push the branch, open a PR
  into `main` (or onto the unmerged branch it builds on), give Jack a
  summary, and let Jack merge. (WORKLOG §3.6)
- **Handoff:** before ending a session that changed anything, add a
  dated entry to WORKLOG's Session handoffs: what changed, checks run,
  PRs open, what's next.
- **School material** (`source-material/`, `source-material.zip`) stays
  local: it's school IP, kept out of git.
- **Windows:** in PowerShell call `npm.cmd` / `npx.cmd` (execution
  policy blocks `npm.ps1`); Python is `py`. One dev server at a time on
  port 5174.
