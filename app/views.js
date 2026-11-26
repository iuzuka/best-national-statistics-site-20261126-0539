// Views — one render function per page. Each returns HTML for <main id="app">.
// All figures come from data.js; charts from charts.js.

import {
  COUNTRY, POPULATION, AGE_GROUPS, AGE_BANDS, GDP, SECTORS, EMPLOYMENT_SECTORS,
  UNEMPLOYMENT, CPI, CPI_CATEGORIES, WAGES, AVERAGE_WAGE, TRADE, PROVINCES,
  provinceBySlug, provincePerCapita, gdpGrowth, RELEASES, CALENDAR, DATASETS,
  fmt, fmtInt,
} from './data.js';
import { lineChart, barChart, hBarChart, donutChart, pyramidChart } from './charts.js';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function pageHead(title, sub) {
  return `<div class="page-head"><h1>${esc(title)}</h1><p>${esc(sub)}</p></div>`;
}

function sourceNote(text) {
  return `<p class="source">Source: ${esc(text)}</p>`;
}

function kpiCard(label, value, compare, href) {
  return `<a class="kpi" href="${href}"><span class="kpi-label">${esc(label)}</span><span class="kpi-value">${esc(value)}</span><span class="kpi-compare">${esc(compare)}</span></a>`;
}

function provinceRows() {
  return PROVINCES.map((p) => `<tr>
    <td><a href="#/region/${p.slug}">${esc(p.name)}${p.capital ? ' (capital)' : ''}</a></td>
    <td class="num">${fmt(p.population, 2)}</td>
    <td class="num">K$${fmt(p.gdp, 1)}</td>
    <td class="num">${fmt(p.unemployment, 1)}%</td>
  </tr>`).join('');
}

// ---- Home -----------------------------------------------------------------
export function viewHome() {
  const popChart = lineChart(POPULATION.map((r) => ({ x: String(r.year), y: r.value })), {
    label: 'Population of Kalandra 2010 to 2025, millions',
    height: 180,
    valueLabel: (v) => v.toFixed(2) + 'm',
    format: (v) => v.toFixed(0),
  });
  const donut = donutChart(SECTORS, { label: 'GDP by sector 2025', size: 170, centerSize: 14, center: 'K$412.6bn', centerTop: 'GDP 2025' });
  const legend = SECTORS.map((s) => `<li><span class="swatch" style="background:${s.color}"></span>${esc(s.name)} — ${s.share.toFixed(1)}%</li>`).join('');
  const releases = RELEASES.map((r) => `<li><span class="rel-date">${esc(r.date)}</span><a href="${r.href}">${esc(r.title)}</a></li>`).join('');
  return `
  <section class="hero">
    <div>
      <p class="eyebrow">National Statistics Office &middot; Republic of Kalandra</p>
      <h1>Official statistics for the Republic of Kalandra</h1>
      <p class="lede">Population, economy, labour, prices and regions — the office&rsquo;s published
      figures, updated with every release, free for everyone to use.</p>
    </div>
    <div class="hero-side">
      <p><strong>8</strong> provinces</p>
      <p><strong>48.24m</strong> people in 2025</p>
      <p><strong>K$412.6bn</strong> GDP in 2025</p>
      <p><a href="#/data">Explore the data &rarr;</a></p>
    </div>
  </section>
  <section class="kpis" aria-label="Key indicators, 2025">
    ${kpiCard('Population', '48.24m', '2020: 46.10m', '#/population')}
    ${kpiCard('GDP', 'K$412.6bn', '2024: K$396.8bn', '#/economy')}
    ${kpiCard('Unemployment', '5.8%', '2024: 6.1%', '#/labour')}
    ${kpiCard('Inflation (CPI)', '3.1%', '2024: 4.2%', '#/prices')}
  </section>
  <section class="grid-2">
    <div class="card">
      <h2>Population, 2010–2025</h2>
      ${popChart}
      <p class="card-note">Population grew about 0.9% a year, from 41.85 million in 2010 to 48.24 million in 2025.</p>
      ${sourceNote('Kalandra Statistics, Population Estimates 2025.')}
    </div>
    <div class="card">
      <h2>GDP by sector, 2025</h2>
      <div class="donut-wrap">${donut}<ul class="legend">${legend}</ul></div>
      <p class="card-note">Services produce well over half of Kalandra&rsquo;s output; agriculture is 14.4%.</p>
      ${sourceNote('Kalandra Statistics, National Accounts 2025.')}
    </div>
  </section>
  <section class="grid-2">
    <div class="card">
      <h2>Latest releases</h2>
      <ul class="releases">${releases}</ul>
    </div>
    <div class="card">
      <h2>Province snapshot, 2025</h2>
      <table class="tbl">
        <thead><tr><th>Province</th><th class="num">Population (m)</th><th class="num">GDP (K$bn)</th><th class="num">Unemployment</th></tr></thead>
        <tbody>${provinceRows()}</tbody>
      </table>
      <p class="card-note"><a href="#/regions">All provinces, sortable &rarr;</a></p>
    </div>
  </section>`;
}

// ---- Population -------------------------------------------------------------
export function viewPopulation() {
  const pyramid = pyramidChart(AGE_BANDS, { label: 'Age pyramid of Kalandra, 2025' });
  const trend = lineChart(POPULATION.map((r) => ({ x: String(r.year), y: r.value })), {
    label: 'Population trend 2010 to 2025',
    valueLabel: (v) => v.toFixed(2) + 'm',
    format: (v) => v.toFixed(0),
  });
  const ageRows = AGE_GROUPS.map((g) => `<tr><td>${esc(g.label)}</td><td class="num">${g.share.toFixed(1)}%</td><td class="num">${(48.24 * g.share / 100).toFixed(2)}m</td></tr>`).join('');
  return `
  ${pageHead('Population', '48.24 million people in 2025 — who lives in Kalandra, and how the population is changing.')}
  <section class="grid-2">
    <div class="card">
      <h2>Age pyramid, 2025</h2>
      ${pyramid}
      ${sourceNote('Kalandra Statistics, Population Estimates 2025.')}
    </div>
    <div class="card">
      <h2>Population trend, 2010–2025</h2>
      ${trend}
      <p class="card-note">Growth of about 0.9% a year: 41.85m (2010), 44.02m (2015), 46.10m (2020), 48.24m (2025).</p>
      ${sourceNote('Kalandra Statistics, Population Estimates 2025.')}
    </div>
  </section>
  <section class="grid-2">
    <div class="card">
      <h2>Age groups, 2025</h2>
      <table class="tbl">
        <thead><tr><th>Age group</th><th class="num">Share</th><th class="num">People</th></tr></thead>
        <tbody>${ageRows}</tbody>
      </table>
      <p class="card-note">Median age 34.2 years. Life expectancy 76.8 years (women 79.1, men 74.6).</p>
    </div>
    <div class="card">
      <h2>Where people live</h2>
      <dl class="facts">
        <div><dt>Urban share</dt><dd>68.4%</dd></div>
        <div><dt>Rural share</dt><dd>31.6%</dd></div>
        <div><dt>Largest province</dt><dd>Alden — 9.84m people</dd></div>
        <div><dt>Smallest province</dt><dd>Torshavn — 4.09m people</dd></div>
      </dl>
      <p class="card-note">Alden, the capital province, holds about one in five Kalandrans.</p>
      ${sourceNote('Kalandra Statistics, Population Estimates 2025.')}
    </div>
  </section>`;
}

// ---- Economy ----------------------------------------------------------------
export function viewEconomy(year) {
  const y = GDP.find((r) => r.year === year) || GDP[GDP.length - 1];
  const growth = gdpGrowth(y.year);
  const bars = barChart(GDP.map((r) => ({ label: String(r.year), value: r.gdp })), {
    label: 'GDP of Kalandra 2020 to 2025, K$ billion',
    valueLabel: (v) => v.toFixed(1),
    format: (v) => 'K$' + v.toFixed(0),
  });
  const donut = donutChart(SECTORS, { label: 'GDP by sector 2025', center: 'K$412.6bn', centerTop: 'GDP 2025' });
  const legend = SECTORS.map((s) => `<li><span class="swatch" style="background:${s.color}"></span>${esc(s.name)} — ${s.share.toFixed(1)}% (K$${(y.gdp * s.share / 100).toFixed(1)}bn in ${y.year} at 2025 shares)</li>`).join('');
  const options = GDP.map((r) => `<option value="${r.year}"${r.year === y.year ? ' selected' : ''}>${r.year}</option>`).join('');
  return `
  ${pageHead('Economy', 'GDP, trade and the shape of the economy — K$412.6 billion in 2025.')}
  <section class="card toolbar-card">
    <label for="year-select"><strong>Year:</strong></label>
    <select id="year-select" data-year-select>${options}</select>
    <span class="toolbar-note">Figures below update for the year you pick.</span>
  </section>
  <section class="kpis" aria-label="Economy indicators">
    ${kpiCard('GDP, ' + y.year, 'K$' + y.gdp.toFixed(1) + 'bn', growth === null ? 'First year in the series' : 'Growth: +' + growth + '% on ' + (y.year - 1), '#/economy')}
    ${kpiCard('GDP per capita, ' + y.year, 'K$' + fmtInt(y.perCapita), '2025: K$8,553', '#/economy')}
    ${kpiCard('Exports, 2025', 'K$96.4bn', 'Imports K$88.1bn — surplus K$8.3bn', '#/economy')}
    ${kpiCard('Services share, 2025', '58.2%', 'Industry 27.4%, agriculture 14.4%', '#/economy')}
  </section>
  <section class="grid-2">
    <div class="card">
      <h2>GDP, 2020–2025 (K$ billion)</h2>
      ${bars}
      ${sourceNote('Kalandra Statistics, National Accounts. GDP per capita for 2020–2024 uses intercensal population estimates.')}
    </div>
    <div class="card">
      <h2>GDP by sector, 2025</h2>
      <div class="donut-wrap">${donut}<ul class="legend">${legend}</ul></div>
      <p class="card-note">Sector amounts for earlier years apply the 2025 sector shares; the office publishes the full sector split for 2025.</p>
    </div>
  </section>
  <section class="card">
    <h2>Trade, 2025</h2>
    <dl class="facts">
      <div><dt>Exports</dt><dd>K$96.4 billion</dd></div>
      <div><dt>Imports</dt><dd>K$88.1 billion</dd></div>
      <div><dt>Trade surplus</dt><dd>K$8.3 billion</dd></div>
      <div><dt>Top export partner</dt><dd>Meridia Union — 31% of exports</dd></div>
      <div><dt>Second partner</dt><dd>Ostara — 14%</dd></div>
      <div><dt>Third partner</dt><dd>Dunmore — 9%</dd></div>
    </dl>
    ${sourceNote('Kalandra Statistics, Trade Statistics 2025.')}
  </section>`;
}

// ---- Labour -----------------------------------------------------------------
export function viewLabour() {
  const trend = lineChart(UNEMPLOYMENT.map((r) => ({ x: String(r.year), y: r.value })), {
    label: 'Unemployment rate 2020 to 2025, percent',
    valueLabel: (v) => v.toFixed(1) + '%',
    format: (v) => v.toFixed(1) + '%',
  });
  const bars = barChart(EMPLOYMENT_SECTORS.map((s) => ({ label: s.name, value: s.share })), {
    label: 'Employment by sector 2025, percent',
    valueLabel: (v) => v.toFixed(1) + '%',
    format: (v) => v.toFixed(0) + '%',
  });
  const wageRows = WAGES.map((w) => `<tr><td>${esc(w.sector)}</td><td class="num">K$${fmtInt(w.wage)}</td></tr>`).join('');
  return `
  ${pageHead('Labour', '22.4 million people in work — unemployment 5.8% in 2025, down from 7.8% in 2020.')}
  <section class="kpis" aria-label="Labour indicators">
    ${kpiCard('Unemployment, 2025', '5.8%', '2020: 7.8% — falling every year since', '#/labour')}
    ${kpiCard('Youth unemployment (15–24)', '13.2%', '2025 — more than double the overall rate', '#/labour')}
    ${kpiCard('Employment', '22.4m', 'Labour-force participation 68.9%', '#/labour')}
    ${kpiCard('Average monthly wage', 'K$1,284', '2025 — services K$1,412, industry K$1,356, agriculture K$812', '#/labour')}
  </section>
  <section class="grid-2">
    <div class="card">
      <h2>Unemployment rate, 2020–2025</h2>
      ${trend}
      ${sourceNote('Kalandra Statistics, Labour Force Survey.')}
    </div>
    <div class="card">
      <h2>Employment by sector, 2025</h2>
      ${bars}
      <p class="card-note">Services employ 61.5% of workers, industry 24.8%, agriculture 13.7%.</p>
    </div>
  </section>
  <section class="card">
    <h2>Average monthly wage by sector, 2025</h2>
    <table class="tbl">
      <thead><tr><th>Sector</th><th class="num">Average monthly wage</th></tr></thead>
      <tbody>${wageRows}<tr><td><strong>All sectors</strong></td><td class="num"><strong>K$${fmtInt(AVERAGE_WAGE)}</strong></td></tr></tbody>
    </table>
    ${sourceNote('Kalandra Statistics, Labour Force Survey 2025.')}
  </section>`;
}

// ---- Prices -----------------------------------------------------------------
export function viewPrices() {
  const trend = lineChart(CPI.map((r) => ({ x: String(r.year), y: r.value })), {
    label: 'CPI inflation 2020 to 2025, percent',
    valueLabel: (v) => v.toFixed(1) + '%',
    format: (v) => v.toFixed(1) + '%',
  });
  const bars = barChart(CPI_CATEGORIES.map((c) => ({ label: c.name, value: c.value })), {
    label: 'CPI inflation by category 2025, percent',
    valueLabel: (v) => v.toFixed(1) + '%',
    format: (v) => v.toFixed(1) + '%',
  });
  const rows = CPI_CATEGORIES.map((c) => `<tr><td>${esc(c.name)}</td><td class="num">${c.value.toFixed(1)}%</td></tr>`).join('');
  return `
  ${pageHead('Prices', 'Consumer prices rose 3.1% in 2025 — down from a 6.8% peak in 2022.')}
  <section class="kpis" aria-label="Price indicators">
    ${kpiCard('CPI inflation, 2025', '3.1%', '2024: 4.2% — falling for three years', '#/prices')}
    ${kpiCard('Highest category, 2025', 'Food 4.0%', 'Housing 2.8%, health 3.5%', '#/prices')}
    ${kpiCard('Lowest category, 2025', 'Clothing 1.8%', 'Transport 2.2%, education 2.9%', '#/prices')}
    ${kpiCard('Peak inflation', '6.8% in 2022', 'Lowest since then: 2.7% in 2020', '#/prices')}
  </section>
  <section class="grid-2">
    <div class="card">
      <h2>CPI inflation, 2020–2025</h2>
      ${trend}
      ${sourceNote('Kalandra Statistics, Consumer Price Index.')}
    </div>
    <div class="card">
      <h2>Inflation by category, 2025</h2>
      ${bars}
    </div>
  </section>
  <section class="card">
    <h2>The CPI basket, 2025</h2>
    <table class="tbl">
      <thead><tr><th>Category</th><th class="num">Price change on a year earlier</th></tr></thead>
      <tbody>${rows}<tr><td><strong>All items (CPI)</strong></td><td class="num"><strong>3.1%</strong></td></tr></tbody>
    </table>
    <p class="card-note">Food prices rose fastest in 2025, at 4.0%; clothing rose slowest, at 1.8%.</p>
    ${sourceNote('Kalandra Statistics, Consumer Price Index, October 2026 release.')}
  </section>`;
}

// ---- Regions ----------------------------------------------------------------
export function viewRegions() {
  return `
  ${pageHead('Regions', 'Eight provinces, one country — compare population, output and unemployment.')}
  <section class="card">
    <div class="toolbar">
      <label for="region-search"><strong>Search provinces:</strong></label>
      <input id="region-search" type="search" placeholder="Type a province name…" autocomplete="off">
      <span class="toolbar-note">Click a column heading to sort. Click a province name for its detail page.</span>
    </div>
    <table class="tbl sortable" id="regions-table">
      <thead><tr>
        <th data-sort="name">Province</th>
        <th class="num" data-sort="population">Population (m)</th>
        <th class="num" data-sort="gdp">GDP (K$bn)</th>
        <th class="num" data-sort="perCapita">GDP per capita (K$)</th>
        <th class="num" data-sort="unemployment">Unemployment</th>
      </tr></thead>
      <tbody id="regions-body"></tbody>
    </table>
    <p class="card-note" id="regions-count"></p>
    ${sourceNote('Kalandra Statistics, Regional Statistics 2025. GDP per capita is GDP divided by population.')}
  </section>
  <section class="card">
    <h2>Reading the table</h2>
    <p>Alden, the capital province, is the largest on every measure: 9.84 million people, K$118.2 billion of GDP,
    and the lowest unemployment at 5.1%. Torshavn is the smallest economy (K$17.4 billion) and has the highest
    unemployment, 7.4%, against a national rate of 5.8%.</p>
  </section>`;
}

export function regionsTableRows(list) {
  return list.map((p) => `<tr>
    <td><a href="#/region/${p.slug}">${esc(p.name)}${p.capital ? ' (capital)' : ''}</a></td>
    <td class="num">${fmt(p.population, 2)}</td>
    <td class="num">${fmt(p.gdp, 1)}</td>
    <td class="num">${fmtInt(provincePerCapita(p))}</td>
    <td class="num">${fmt(p.unemployment, 1)}%</td>
  </tr>`).join('');
}

// ---- Region detail ----------------------------------------------------------
export function viewRegion(slug) {
  const p = provinceBySlug(slug);
  if (!p) {
    return `${pageHead('Province not found', 'There is no province with that name in Kalandra.')}
    <section class="card"><p><a href="#/regions">Back to all provinces &rarr;</a></p></section>`;
  }
  const compare = hBarChart([
    { label: p.name, value: p.unemployment, color: '#0e7c7b' },
    { label: 'Kalandra', value: 5.8, color: '#0b2a4a' },
  ], { label: `Unemployment in ${p.name} against the national rate`, valueLabel: (v) => v.toFixed(1) + '%' });
  const sharePop = (p.population / 48.24 * 100).toFixed(1);
  const shareGdp = (p.gdp / 412.6 * 100).toFixed(1);
  return `
  ${pageHead(p.name + (p.capital ? ' — capital province' : ''), `One of Kalandra's eight provinces — ${fmt(p.population, 2)} million people and K$${fmt(p.gdp, 1)} billion of GDP in 2025.`)}
  <section class="kpis" aria-label="${esc(p.name)} indicators">
    ${kpiCard('Population, 2025', fmt(p.population, 2) + 'm', sharePop + '% of Kalandra', '#/regions')}
    ${kpiCard('GDP, 2025', 'K$' + fmt(p.gdp, 1) + 'bn', shareGdp + '% of Kalandra', '#/regions')}
    ${kpiCard('GDP per capita', 'K$' + fmtInt(provincePerCapita(p)), 'National: K$8,553', '#/regions')}
    ${kpiCard('Unemployment, 2025', fmt(p.unemployment, 1) + '%', 'National: 5.8%', '#/regions')}
  </section>
  <section class="grid-2">
    <div class="card">
      <h2>Unemployment against the national rate, 2025</h2>
      ${compare}
      <p class="card-note">${p.unemployment < 5.8
        ? `${esc(p.name)}'s unemployment is ${fmt(5.8 - p.unemployment, 1)} points below the national rate of 5.8%.`
        : `${esc(p.name)}'s unemployment is ${fmt(p.unemployment - 5.8, 1)} points above the national rate of 5.8%.`}</p>
    </div>
    <div class="card">
      <h2>About ${esc(p.name)}</h2>
      <dl class="facts">
        <div><dt>Share of population</dt><dd>${sharePop}%</dd></div>
        <div><dt>Share of GDP</dt><dd>${shareGdp}%</dd></div>
        <div><dt>GDP per capita</dt><dd>K$${fmtInt(provincePerCapita(p))}</dd></div>
        <div><dt>Rank by population</dt><dd>${PROVINCES.indexOf(p) + 1} of 8</dd></div>
      </dl>
      <p class="card-note"><a href="#/regions">Back to all provinces &rarr;</a></p>
      ${sourceNote('Kalandra Statistics, Regional Statistics 2025.')}
    </div>
  </section>`;
}

// ---- Data explorer ----------------------------------------------------------
export function viewData() {
  const options = Object.entries(DATASETS).map(([key, d]) => `<option value="${key}">${esc(d.label)} — ${esc(d.unit)}</option>`).join('');
  return `
  ${pageHead('Data explorer', 'Every series behind this site, in one table — pick a dataset and a year range, then download it as CSV.')}
  <section class="card">
    <div class="toolbar">
      <label for="dataset-select"><strong>Dataset:</strong></label>
      <select id="dataset-select" data-dataset-select>${options}</select>
      <label for="from-select"><strong>From:</strong></label>
      <select id="from-select" data-from-select></select>
      <label for="to-select"><strong>To:</strong></label>
      <select id="to-select" data-to-select></select>
      <button id="csv-download" type="button">Download CSV</button>
    </div>
    <table class="tbl" id="data-table">
      <thead><tr><th>Year</th><th class="num" id="data-value-head">Value</th></tr></thead>
      <tbody id="data-body"></tbody>
    </table>
    <p class="card-note" id="data-note"></p>
    ${sourceNote('Kalandra Statistics. Population: Population Estimates; GDP: National Accounts; CPI: Consumer Price Index; unemployment: Labour Force Survey.')}
  </section>`;
}

export function dataTableRows(key, fromYear, toYear) {
  const d = DATASETS[key];
  const rows = d.years.filter((r) => r.year >= fromYear && r.year <= toYear);
  return rows.map((r) => `<tr><td>${r.year}</td><td class="num">${key === 'gdp' ? 'K$' + r[d.valueKey].toFixed(1) + 'bn' : key === 'population' ? r[d.valueKey].toFixed(2) + 'm' : r[d.valueKey].toFixed(1) + '%'}</td></tr>`).join('');
}

export function dataCsv(key, fromYear, toYear) {
  const d = DATASETS[key];
  const rows = d.years.filter((r) => r.year >= fromYear && r.year <= toYear);
  const lines = [`Year,${d.label} (${d.unit})`];
  for (const r of rows) lines.push(`${r.year},${r[d.valueKey]}`);
  return lines.join('\n') + '\n';
}

// ---- About ------------------------------------------------------------------
export function viewAbout() {
  const cal = CALENDAR.map((c) => `<tr><td>${esc(c.date)}</td><td>${esc(c.title)}</td></tr>`).join('');
  return `
  ${pageHead('About Kalandra Statistics', 'The National Statistics Office of the Republic of Kalandra — independent, impartial, and free for everyone.')}
  <section class="grid-2">
    <div class="card">
      <h2>What we do</h2>
      <p>Kalandra Statistics is the National Statistics Office of the Republic of Kalandra. We collect, analyse and
      publish the country&rsquo;s official statistics: how many people live here, what the economy produces, who is in
      work, what prices do, and how each of the eight provinces is faring.</p>
      <p>Our figures are published free of charge, on the day they are released, for journalists, researchers,
      businesses, schools and anyone who wants to know how Kalandra is doing.</p>
      <h2>Methodology</h2>
      <p>Figures on this site are the office&rsquo;s published estimates. Population figures come from the census and
      annual estimates; GDP from the national accounts; prices from the monthly consumer price survey; unemployment
      from the quarterly labour force survey.</p>
      <p>Estimates are revised once a year, when more complete administrative data arrives. A revision is always
      flagged on the release page, and the previous value stays visible in the archive.</p>
    </div>
    <div class="card">
      <h2>Release calendar</h2>
      <table class="tbl">
        <thead><tr><th>Date</th><th>Release</th></tr></thead>
        <tbody>${cal}</tbody>
      </table>
      <h2>Contact</h2>
      <dl class="facts">
        <div><dt>Office</dt><dd>1 Statistics Square, Alden, Kalandra</dd></div>
        <div><dt>Enquiries</dt><dd>hello@kalandra-statistics.example</dd></div>
        <div><dt>Press office</dt><dd>press@kalandra-statistics.example</dd></div>
        <div><dt>Phone</dt><dd>+00 1 555 010 2026</dd></div>
      </dl>
    </div>
  </section>
  <section class="card">
    <h2>Other facts about Kalandra</h2>
    <dl class="facts">
      <div><dt>Literacy rate</dt><dd>98.7%</dd></div>
      <div><dt>Tertiary attainment (25–34)</dt><dd>34.2%</dd></div>
      <div><dt>Hospital beds</dt><dd>3.4 per 1,000 people</dd></div>
      <div><dt>Physicians</dt><dd>2.8 per 1,000 people</dd></div>
      <div><dt>Renewables share of electricity</dt><dd>41.2% (2025)</dd></div>
      <div><dt>Visitors in 2025</dt><dd>12.6 million</dd></div>
    </dl>
    ${sourceNote('Kalandra Statistics, 2025.')}
  </section>`;
}
