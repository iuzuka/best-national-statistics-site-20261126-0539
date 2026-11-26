// Kalandra Statistics — the site's single source of truth.
// Every figure on every page comes from this file, so no two pages disagree.
// All figures are the National Statistics Office's published estimates for the
// fictional Republic of Kalandra. Currency: kalandra dollar (K$).

export const COUNTRY = {
  name: 'Republic of Kalandra',
  office: 'Kalandra Statistics',
  officeFull: 'National Statistics Office of the Republic of Kalandra',
  currency: 'K$',
  provinces: 8,
  medianAge: 34.2,
  lifeExpectancy: 76.8,
  lifeExpectancyWomen: 79.1,
  lifeExpectancyMen: 74.6,
  urbanShare: 68.4,
  literacy: 98.7,
  tertiaryAttainment: 34.2,
  hospitalBeds: 3.4,
  physicians: 2.8,
  renewablesShare: 41.2,
  visitors: 12.6,
  employment: 22.4,
  participation: 68.9,
  youthUnemployment: 13.2,
};

// Population, millions. Published census / estimate years only.
export const POPULATION = [
  { year: 2010, value: 41.85 },
  { year: 2015, value: 44.02 },
  { year: 2020, value: 46.10 },
  { year: 2025, value: 48.24 },
];

// Age structure 2025, share of population (%). The five-year bands below sum
// exactly to the published broad groups.
export const AGE_GROUPS = [
  { label: '0–14 years', share: 22.6 },
  { label: '15–64 years', share: 67.1 },
  { label: '65+ years', share: 10.3 },
];

// Five-year bands for the age pyramid; each band's share is half on each side
// of the centre line, so the pyramid shows the band's share of the population.
export const AGE_BANDS = [
  { band: '85+', share: 0.9 },
  { band: '75–84', share: 3.0 },
  { band: '65–74', share: 6.4 },
  { band: '55–64', share: 12.3 },
  { band: '45–54', share: 12.6 },
  { band: '35–44', share: 13.9 },
  { band: '25–34', share: 14.8 },
  { band: '15–24', share: 13.5 },
  { band: '10–14', share: 7.1 },
  { band: '5–9', share: 7.6 },
  { band: '0–4', share: 7.9 },
];

// GDP, K$ billion, and GDP per capita, K$.
export const GDP = [
  { year: 2020, gdp: 318.9, perCapita: 6917 },
  { year: 2021, gdp: 342.7, perCapita: 7365 },
  { year: 2022, gdp: 364.2, perCapita: 7756 },
  { year: 2023, gdp: 381.5, perCapita: 8050 },
  { year: 2024, gdp: 396.8, perCapita: 8299 },
  { year: 2025, gdp: 412.6, perCapita: 8553 },
];
// Per-capita for 2025 is the office's published K$8,553. For 2020–2024 it is
// GDP divided by the office's intercensal population estimates (46.10m in
// 2020, rising about 0.43m a year to 48.24m in 2025), rounded to the dollar.

// GDP by sector, 2025, share of GDP (%).
export const SECTORS = [
  { name: 'Services', share: 58.2, color: '#0e7c7b' },
  { name: 'Industry', share: 27.4, color: '#0b2a4a' },
  { name: 'Agriculture', share: 14.4, color: '#c98a2b' },
];

// Employment by sector, 2025, share of employment (%).
export const EMPLOYMENT_SECTORS = [
  { name: 'Services', share: 61.5 },
  { name: 'Industry', share: 24.8 },
  { name: 'Agriculture', share: 13.7 },
];

// Unemployment rate, %.
export const UNEMPLOYMENT = [
  { year: 2020, value: 7.8 },
  { year: 2021, value: 7.3 },
  { year: 2022, value: 6.9 },
  { year: 2023, value: 6.4 },
  { year: 2024, value: 6.1 },
  { year: 2025, value: 5.8 },
];

// CPI inflation, % year on year.
export const CPI = [
  { year: 2020, value: 2.7 },
  { year: 2021, value: 4.9 },
  { year: 2022, value: 6.8 },
  { year: 2023, value: 5.6 },
  { year: 2024, value: 4.2 },
  { year: 2025, value: 3.1 },
];

// CPI by category, 2025, %.
export const CPI_CATEGORIES = [
  { name: 'Food', value: 4.0 },
  { name: 'Housing', value: 2.8 },
  { name: 'Transport', value: 2.2 },
  { name: 'Health', value: 3.5 },
  { name: 'Education', value: 2.9 },
  { name: 'Clothing', value: 1.8 },
];

// Average monthly wage, K$, 2025.
export const WAGES = [
  { sector: 'Services', wage: 1412 },
  { sector: 'Industry', wage: 1356 },
  { sector: 'Agriculture', wage: 812 },
];
export const AVERAGE_WAGE = 1284;

// Trade, 2025, K$ billion.
export const TRADE = {
  exports: 96.4,
  imports: 88.1,
  surplus: 8.3,
  partners: [
    { name: 'Meridia Union', share: 31 },
    { name: 'Ostara', share: 14 },
    { name: 'Dunmore', share: 9 },
  ],
};

// Provinces: population 2025 (millions), GDP 2025 (K$ bn), unemployment 2025 (%).
// GDP per capita is GDP divided by population, rounded to the dollar.
export const PROVINCES = [
  { slug: 'alden', name: 'Alden', capital: true, population: 9.84, gdp: 118.2, unemployment: 5.1 },
  { slug: 'meridia', name: 'Meridia', capital: false, population: 7.62, gdp: 74.6, unemployment: 5.4 },
  { slug: 'ostara', name: 'Ostara', capital: false, population: 6.41, gdp: 58.3, unemployment: 6.2 },
  { slug: 'velmara', name: 'Velmara', capital: false, population: 5.87, gdp: 47.9, unemployment: 6.0 },
  { slug: 'kestrel', name: 'Kestrel', capital: false, population: 5.12, gdp: 38.4, unemployment: 6.6 },
  { slug: 'dunmore', name: 'Dunmore', capital: false, population: 4.96, gdp: 33.1, unemployment: 6.9 },
  { slug: 'halcyon', name: 'Halcyon', capital: false, population: 4.33, gdp: 24.7, unemployment: 7.1 },
  { slug: 'torshavn', name: 'Torshavn', capital: false, population: 4.09, gdp: 17.4, unemployment: 7.4 },
];

export function provinceBySlug(slug) {
  return PROVINCES.find((p) => p.slug === slug) || null;
}

export function provincePerCapita(p) {
  return Math.round((p.gdp * 1000) / p.population);
}

export function gdpGrowth(year) {
  const i = GDP.findIndex((r) => r.year === year);
  if (i <= 0) return null;
  return ((GDP[i].gdp / GDP[i - 1].gdp - 1) * 100).toFixed(1);
}

// Latest releases, newest first.
export const RELEASES = [
  { date: '14 Nov 2026', title: 'Labour Force Survey, Q3 2026 — unemployment 5.8%', href: '#/labour' },
  { date: '6 Nov 2026', title: 'Consumer Price Index, October 2026 — inflation 3.1%', href: '#/prices' },
  { date: '30 Oct 2026', title: 'National Accounts, Q3 2026 — GDP K$412.6 billion', href: '#/economy' },
  { date: '21 Oct 2026', title: 'Population Estimates 2025 — 48.24 million people', href: '#/population' },
  { date: '9 Oct 2026', title: 'Regional Statistics 2025 — all eight provinces', href: '#/regions' },
];

// Release calendar for the About page.
export const CALENDAR = [
  { date: '9 Dec 2026', title: 'Consumer Price Index, November 2026' },
  { date: '18 Dec 2026', title: 'Labour Force Survey, Q4 2026' },
  { date: '22 Jan 2027', title: 'National Accounts, Q4 2026' },
  { date: '12 Feb 2027', title: 'Population Estimates 2026' },
  { date: '5 Mar 2027', title: 'Regional Statistics 2026' },
];

export const DATASETS = {
  population: { label: 'Population', unit: 'million people', years: POPULATION, valueKey: 'value' },
  gdp: { label: 'GDP', unit: 'K$ billion', years: GDP, valueKey: 'gdp' },
  cpi: { label: 'CPI inflation', unit: '% year on year', years: CPI, valueKey: 'value' },
  unemployment: { label: 'Unemployment rate', unit: '% of labour force', years: UNEMPLOYMENT, valueKey: 'value' },
};

export function fmt(n, decimals = 1) {
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function fmtInt(n) {
  return n.toLocaleString('en-US');
}
