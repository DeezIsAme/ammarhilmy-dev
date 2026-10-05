# Ammar Hilmy Ramzy — Portfolio

The source for my portfolio site — where I keep my work, my credentials, and the case studies behind both.

**[ammarhilmy-dev.vercel.app](https://ammarhilmy-dev.vercel.app)**

---

## What this is

A single portfolio, not a template or a demo. Every project, certification, and date on it belongs to a real record, and the site is built to be read by people *and* by hiring software — the kind that scans a page before a human ever opens it.

Three things shaped the build:

- **It has to load fast.** Under a second, on a normal connection, with no waiting on third-party scripts.
- **It has to work without JavaScript.** The content is generated at build time, so the page reads fine even if nothing downloads.
- **It has to be honest.** More on that below — it's the part I care most about.

## Tech

| | |
|---|---|
| Framework | Next.js 16 (App Router, static generation) |
| UI | React 19, Tailwind CSS v4, TypeScript |
| Content | Markdown case studies, parsed at build time |
| Hosting | Vercel |

No UI component library. No animation library. No icon package. Next.js, React, and two small Markdown parsers are the whole runtime dependency list — everything visual is written by hand.

## Getting it running

```bash
npm install
npm run dev
```

Then open [localhost:3000](http://localhost:3000).

To produce a real build:

```bash
npm run build
```

## The checks

This repo has a few scripts that guard the site. They're quick and worth knowing about:

```bash
npm run check          # colour contrast across every palette + content rules
npm run build && node scripts/audit-assets.mjs   # confirms no image is missing
```

| Script | What it does |
|---|---|
| `check-contrast.mjs` | Verifies text is readable on every colour palette — 72 checks |
| `guard-content.mjs` | Scans the built HTML and exits with an error if a claim that shouldn't be published appears |
| `audit-assets.mjs` | Lists every image the site references and whether the file actually exists |
| `measure-payload.mjs` | Reports the real (compressed) size of what a visitor downloads |

## Where things live

```
src/
  data/          all site content — profile, projects, skills, experience, certifications
  content/       case studies, one Markdown file per project
  components/    UI pieces, grouped by page area
  app/           routes and pages
  styles/        colour palettes
public/          images, logos, and the downloadable CV
scripts/         the guards listed above
```

## Changing content

Almost everything editable lives in `src/data/`, each file a single source of truth:

| File | Controls |
|---|---|
| `profile.ts` | Name, headline, summary, contact links, the "At a glance" intro |
| `projects.ts` | Project cards and their tech tags |
| `skills.ts` | The tech stack groups |
| `experience.ts` | Work history |
| `certifications.ts` | Credentials |
| `stats.ts` | The four numbers in the glance section |
| `site.ts` | Canonical URL, page title, description, navigation |

Case studies are plain Markdown in `src/content/case-studies/`. The filename has to match the project's `slug`, and the file's front matter must include a title, period, category, and role — a missing field stops the build rather than rendering an empty page.

## Colours

The whole site runs on one accent colour and a handful of surface tokens. Four palettes ship with it — sage, lime, cyan, and amber — and switching is a single attribute:

```html
<html data-palette="sage">
```

Each palette also carries a light variant that's authored but not active, so contrast is verified on both before any theme toggle ever gets added.

## On accuracy

This matters more than the design, so it gets its own section.

A portfolio invites you to round up. I'd rather not. Two rules shaped what's on the site:

- Credentials are described as what they actually are. A course is called a course. A completion certificate is not dressed up as a professional certification.
- A few things I could have included aren't here, because I couldn't stand behind them. One attendance figure came from a social media post and a conversation; that's not a source, so the number isn't published.

Keeping rules like that in a document doesn't work — they get forgotten. So thirteen of them are also written as patterns in `scripts/guard-content.mjs`. It reads the built HTML and fails if any of them show up again. If a line of copy can't survive that check, it doesn't ship.

## Logos and trademarks

Product logos in `public/logos/` belong to their owners and appear here only to identify the tools used. Sources and licences are documented in [`public/logos/README.md`](public/logos/README.md).

## Contact

- Email — ammarhilmy35@gmail.com
- LinkedIn — [ammar-hilmy-ramzy](https://linkedin.com/in/ammar-hilmy-ramzy-ab984424a/)
- GitHub — [DeezIsAme](https://github.com/DeezIsAme)

Site content, images, and case studies are mine. Code is available to read and learn from; please don't republish the content or the writing as your own.
