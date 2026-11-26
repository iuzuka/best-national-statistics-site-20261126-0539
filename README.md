# Kalandra National Statistics

[![make.fun bounty](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![make.fun rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/iuzuka/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![make.fun reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/iuzuka/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

A national statistics portal for the fictional **Republic of Kalandra**, published by its
(fictional) National Statistics Office, **Kalandra Statistics**. It looks and works like a real
official statistics office site: sober, trustworthy, dense with real figures, every page reachable
by a link, every control doing what it says, nothing empty, broken or placeholder.

Built for the make.fun bounty [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539).
Try make.fun yourself with my referral link: https://make.fun/r/9p6337rb

## The country in numbers (2025)

- **Population:** 48.24 million (46.10m in 2020), median age 34.2, life expectancy 76.8 years
- **GDP:** K$412.6 billion, K$8,553 per capita — services 58.2%, industry 27.4%, agriculture 14.4%
- **Unemployment:** 5.8% (down from 7.8% in 2020); youth unemployment 13.2%
- **Inflation (CPI):** 3.1% (down from a 6.8% peak in 2022)
- **Trade:** exports K$96.4bn, imports K$88.1bn, surplus K$8.3bn
- **Provinces:** 8 — Alden (capital) is the largest at 9.84m people and K$118.2bn GDP

## Pages

- **Home** — key indicators, population trend, GDP-by-sector donut, latest releases, province snapshot
- **Population** — age pyramid, 2010–2025 trend, age-group table, urban/rural split
- **Economy** — GDP bars 2020–2025, sector donut, trade, and a year selector that updates the figures
- **Labour** — unemployment trend, employment-by-sector bars, youth unemployment, wages by sector
- **Prices** — CPI trend, inflation by category, the CPI basket table
- **Regions** — sortable, searchable table of all 8 provinces, each linking to its detail page
- **Data explorer** — dataset and year-range selectors with a working CSV download
- **About** — the office, methodology, release calendar and contact details

## How it is built

Static files under `app/` only — no build step, no network requests, no chart library.
Every chart is inline SVG drawn by the site's own JavaScript (`app/charts.js`).
The figures live in one place, `app/data.js`, so no two pages disagree.

- `app/index.html` — page shell, header, navigation, footer
- `app/style.css` — the official statistics-office look (deep navy, white cards, teal accent)
- `app/data.js` — every figure on the site
- `app/charts.js` — line, bar, donut and age-pyramid charts as inline SVG
- `app/views.js` — one render function per page
- `app/router.js` — hash routes and the interactive controls
- `app/main.js` — boots the site

## Run it

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and writes
`dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts`.

## License

MIT — see [LICENSE](LICENSE).
