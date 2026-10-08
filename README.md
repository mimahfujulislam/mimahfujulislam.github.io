# Mahfujul Islam — Portfolio

Personal portfolio for **Mahfujul Islam** — CSE undergraduate at AIUB, focused on AI/ML, data science and research.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion · Lucide**, exported as a fully static site.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Editing content

All text lives in `src/content/` — components only render it. Change these files, not the components:

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, headline, intro, email, social links, nav items, SEO title/description, site URL |
| `about.ts` | About paragraphs and “current focus” list |
| `skills.ts` | Skill groups and badges |
| `research.ts` | Featured research, interest areas, status labels |
| `repositories.ts` | GitHub username and fallback languages for “Code & Open Source” |
| `experience.ts` | Experience cards (add a `period` to show dates) |
| `education.ts` | BSc details, expected graduation, optional GPA, HSC and SSC |

Fields marked optional (`period`, `gpa`, school `year` and `result`) are hidden until you fill them in.

### Resume

Add your resume as `public/resume.pdf` — every “Resume” / “Download Resume” button links to `/resume.pdf` and downloads it as `Mahfujul-Islam-Resume.pdf`.

## Contact form

There is no backend, so by default the form **opens the visitor’s email app** with the message pre-filled (the page says so). To deliver messages directly, create a free form endpoint (e.g. [Formspree](https://formspree.io)) and set:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/your-id
```

## GitHub data

“Code & Open Source” shows your GitHub profile (avatar, public repository count, languages) from the public GitHub API and your contribution calendar from `github-contributions-api.jogruber.de`, fetched in the visitor’s browser and cached for an hour per session. If either request fails, the section falls back to saved languages from `repositories.ts` and a friendly message — nothing breaks.

## Deployment

### GitHub Pages (workflow included)

1. Push this project to GitHub.
2. In the repository: **Settings → Pages → Source: GitHub Actions**.
3. Push to `main` — `.github/workflows/deploy.yml` builds and publishes `./out`.

Where it’s served determines two environment variables (set them as repository **Variables** under *Settings → Secrets and variables → Actions*):

| Hosting | `NEXT_PUBLIC_SITE_URL` | `NEXT_PUBLIC_BASE_PATH` |
| --- | --- | --- |
| User site — repo named `mimahfujulislam.github.io` | `https://mimahfujulislam.github.io` | *(empty)* |
| Project site — e.g. repo `portfolio` | `https://mimahfujulislam.github.io/portfolio` | `/portfolio` |
| Custom domain / Vercel / Netlify | `https://your-domain.com` | *(empty)* |

`NEXT_PUBLIC_SITE_URL` is used for canonical URLs, Open Graph images and the sitemap.

### Vercel / Netlify

Import the repo; build command `npm run build`, output directory `out`.

## Project structure

```
src/
  app/            layout (SEO metadata, theme script), page, sitemap, robots, 404
    og.png/       build-time social card (artwork in src/lib/og-image.tsx)
    favicon.svg/, favicon.ico/, apple-touch-icon.png/   “MI” icons (artwork in src/lib/brand-icon.ts)
  components/
    hero/         hero + interactive Dataset → Model → Prediction → Insight visual
    layout/       navbar (scroll-spy, mobile menu), footer
    sections/     about, skills, research, open source, experience, education, resume CTA, contact
    ui/           primitives — Section, Button, Tag/StatusPill, Reveal, brand icons
  content/        all editable text and data
  lib/            utilities, GitHub client, reduced-motion hook
public/
  resume.pdf      your resume (add it here)
```

## Accessibility & motion

Semantic landmarks and heading order, skip link, visible focus rings, keyboard-operable menu and controls, labelled icon links, and form errors announced via `aria-describedby`. Animations honour `prefers-reduced-motion`; the hero animation can be paused and stops when off-screen.
