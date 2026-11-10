# Jack's Notes — HRS Brain Breaks

Your quick reference for driving the project. The engineering detail is
in `WORKLOG.md`; the class-onboarding workflow Claude follows is
`.claude/skills/onboard-class/SKILL.md`.

_Last updated: 2026-10-30 (repo moved to the OneDrive Desktop folder,
which is now the main copy; Teacher Tools restyle + fixes)._

---

## What this is

A React 18 + Vite + TypeScript PWA for Haileybury Rendall School. It's
dark-first, works offline, and keeps everything in the browser (no
accounts, no student data leaves the device).

- **Brain Breaks** (`/`): 14 projector-ready games. The three Quick &
  Energetic games (Quick Quiz, Odd One Out, Two Truths and a Lie) serve
  **class-anchored** content.
- **Teacher Tools** (`/tools`): 25 classroom utilities. The Question
  Generator uses the same year-level + class picker as the games.

**Anchored classes (3 / 20):** Year 10 Maths, Year 7 Humanities, Year 8
Humanities, each with 452 items (302 MCQ + 75 Odd One Out + 75 Two
Truths). The other classes use generic AC V9 questions. Health & PE
classes stay hidden until they're anchored, because there's no generic
Health & PE content. Live tracker: `source-material/PROGRESS-LOG.md`.

**Scope:** content work targets **Year 7–10** (English, Maths, Science,
Humanities, Health & PE = 20 classes). Foundation–Year 6 stays in the app
with generic content by design. **VCE is reference material only.** Use
study designs to keep Year 10 pitched right, never as app content.

---

## Where things live

| Path | What |
|---|---|
| `C:\Users\jack.galbraith\OneDrive - Haileybury\Desktop\hrs_teaching_tools` | **The repo** — the main copy on this PC since 2026-10-30. (The old `C:\Users\jack.galbraith\Code\hrs_teaching_tools` checkout is a backup only; don't work in it.) |
| `src/data/classes.ts` | Class registry: year bands, 28 classes, `anchored` flags |
| `src/data/banks/mcq.ts` · `oddOneOut.ts` · `misc.ts` | Quick Quiz · Odd One Out · Two Truths (plus Estimate It, Synonym Sprint, Would You Rather) |
| `src/games/ClassPicker.tsx` | The year-level + class picker shared by games and the Question Generator |
| `src/games/bankUtils.ts` | How a class's questions are chosen, and the option shuffle |
| `src/test/` | `npm test`: bank integrity + "every class gets on-subject content" |
| `scripts/audit-content.ts` | `npm run audit:content`: rigour checks |
| `source-material/<subject>/year-<n>/` | Class materials + `_overview.md` (gitignored) |
| `source-material/_reference/` | AC V9, VCE study designs, HRS scope & sequences (gitignored) |

**Source material isn't in git.** Since the move it sits in the OneDrive
Desktop folder, so OneDrive syncs it to the school's OneDrive; that's its
only backup. (The old Y7/Y8 Humanities materials stayed on the Mac.)
OneDrive also syncs `node_modules`; if installs hit file-lock errors,
exclude that folder from sync.

---

## Starting a session

Open Claude Code in
`C:\Users\jack.galbraith\OneDrive - Haileybury\Desktop\hrs_teaching_tools`
and paste:

### A. Resume / general work

```
Read @JACK-NOTES.md and the latest handoff at the top of @WORKLOG.md's
"Session handoffs" section. The repo is
C:\Users\jack.galbraith\OneDrive - Haileybury\Desktop\hrs_teaching_tools
on my Windows PC — git pull first. Tell me the anchored-class count and what's queued,
then wait.
```

### B. Onboard a class

```
Read @JACK-NOTES.md, @WORKLOG.md (latest handoff) and
@.claude/skills/onboard-class/SKILL.md.

Today we're onboarding [CLASS NAME]. Materials are in
source-material/[subject]/year-[n]/ and reference docs are in
source-material/_reference/.

Run the onboard-class workflow. Stop after drafting _overview.md so I
can review the misconceptions list. Pacing: [mega-batch] OR
[checkpoint after the first unit].
```

---

## Your prep checklist for a new class

- [ ] Drop the class's materials into its folder (unit plans, tests with
      solutions, slides, key-terms lists, textbook chapters). Bulk is fine.
- [ ] Drop anything cross-year into `_reference/`: AC V9 for the learning
      area, the HRS scope & sequence, and the matching VCE study design
      if it's a Year 9–10 class.
- [ ] Save equation-heavy Word documents as PDF.
- [ ] Start a session with message B. Review the overview's
      **misconceptions list**, because it's the biggest quality lever.

---

## Checking quality yourself

```bash
npm test
```

```bash
npm run audit:content -- --class y10-maths
```

`npm test` must pass. The audit is heuristic: each finding needs a look,
and some are legitimate (e.g. a long numeric answer). As of 2026-10-14:

all three anchored classes are clean. Year 10 Maths shows one length
finding (y10-math-210, a decimal median "8.5" beside "7"/"8"/"9"), which
is fine.

Answer position no longer matters: the games shuffle options every round.

---

## Pitfalls

- **Stale app after changes:** the PWA caches the old version.
  Hard-refresh (Ctrl+Shift+R), or DevTools → Application → Service
  Workers → Unregister.
- **Git Bash on this PC:** `npm`/`npx` can fail silently there. Use
  PowerShell. If PowerShell says `npm.ps1 cannot be loaded` (execution
  policy), type `npm.cmd` / `npx.cmd` instead.
- **Don't re-add removed games** (Buzzer Round, Memory Sequence, Flag
  Flash, Higher or Lower, Spelling Bee, Categories, Equation Match, Map
  Pin, Landmark Snap, Heads Up, 20 Questions) without deciding to.

---

## GitHub

`jagaldevs/hrs-teaching-tools` is **private**. This PC pushes with the
login stored by Git Credential Manager (`gh` isn't logged in, and
doesn't need to be). The README was removed on purpose on 2026-07-30.
Old WORKLOG entries mention your Windows username in paths, which is
harmless while the repo stays private.
