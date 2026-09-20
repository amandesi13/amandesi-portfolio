# Amandeep Singh — Portfolio

Personal site for Amandeep Singh: software engineer, M.Sc. Computer Science student
at TU Dresden, and former Nokia Mobile Networks R&D engineer.

The site is positioned for telecom and systems roles — it leads with mobile-network
work (4G/5G, O-RAN, RAN telemetry) and backs each claim with a concrete outcome.

## Live site

<https://amandesi13.github.io/amandesi-portfolio/>

## Structure

A single scrollable page, one section per idea:

| Section        | What it answers                                              |
| -------------- | ------------------------------------------------------------ |
| Hero           | Who I am, what I build, what I'm looking for                  |
| Proof          | Four numbers from real delivery, not adjectives               |
| Now            | Current O-RAN / xApp research at ComNets, TU Dresden          |
| Experience     | Nokia timeline — transport-layer C/C++ to data-plane ownership |
| Selected work  | Four public repositories with the systems problem stated      |
| Stack          | Grouped capabilities, scannable in one pass                   |
| About          | Education, publications, languages, availability              |
| Contact        | One primary action                                            |

## Tech

Plain HTML, CSS, and JavaScript — no build step, no framework, no dependencies
beyond one webfont. Deployed straight from `main` via GitHub Pages.

Behaviour worth knowing:

- Everything is readable with JavaScript disabled; reveal animations are added by
  script, never baked into the markup.
- `prefers-reduced-motion` disables reveals, counters, and smooth scrolling.
- Images carry intrinsic `width`/`height` to avoid layout shift.
- `Person` JSON-LD, Open Graph, and Twitter card metadata are in the `<head>`.

## Local preview

```powershell
python -m http.server 4173
```

Then open <http://127.0.0.1:4173>.
