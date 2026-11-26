// Router — hash routes for every page, plus the interactive controls that
// live inside the rendered pages (year selector, regions table, data explorer).

import { PROVINCES, GDP, DATASETS } from './data.js';
import {
  viewHome, viewPopulation, viewEconomy, viewLabour, viewPrices,
  viewRegions, regionsTableRows, viewRegion, viewData, dataTableRows, dataCsv,
  viewAbout,
} from './views.js';

const NAV = [
  { href: '#/', label: 'Home' },
  { href: '#/population', label: 'Population' },
  { href: '#/economy', label: 'Economy' },
  { href: '#/labour', label: 'Labour' },
  { href: '#/prices', label: 'Prices' },
  { href: '#/regions', label: 'Regions' },
  { href: '#/data', label: 'Data' },
  { href: '#/about', label: 'About' },
];

let economyYear = 2025;
let regionSort = { key: 'population', dir: -1 };
let regionQuery = '';
let dataKey = 'population';
let dataFrom = 2010;
let dataTo = 2025;

function route() {
  const hash = window.location.hash || '#/';
  const parts = hash.replace(/^#\//, '').split('/').filter(Boolean);
  const app = document.getElementById('app');
  let html = '';
  let title = 'Kalandra Statistics';
  let init = null;
  if (parts.length === 0) {
    html = viewHome();
    title = 'Kalandra Statistics — Republic of Kalandra';
  } else if (parts[0] === 'population') {
    html = viewPopulation();
    title = 'Population — Kalandra Statistics';
  } else if (parts[0] === 'economy') {
    html = viewEconomy(economyYear);
    title = 'Economy — Kalandra Statistics';
    init = initEconomy;
  } else if (parts[0] === 'labour') {
    html = viewLabour();
    title = 'Labour — Kalandra Statistics';
  } else if (parts[0] === 'prices') {
    html = viewPrices();
    title = 'Prices — Kalandra Statistics';
  } else if (parts[0] === 'regions') {
    html = viewRegions();
    title = 'Regions — Kalandra Statistics';
    init = initRegions;
  } else if (parts[0] === 'region' && parts[1]) {
    html = viewRegion(parts[1]);
    title = 'Province — Kalandra Statistics';
  } else if (parts[0] === 'data') {
    html = viewData();
    title = 'Data explorer — Kalandra Statistics';
    init = initData;
  } else if (parts[0] === 'about') {
    html = viewAbout();
    title = 'About — Kalandra Statistics';
  } else {
    html = `<div class="page-head"><h1>Page not found</h1><p>That page does not exist on this site.</p></div>
    <section class="card"><p><a href="#/">Back to the home page &rarr;</a></p></section>`;
    title = 'Not found — Kalandra Statistics';
  }
  app.innerHTML = html;
  document.title = title;
  document.querySelectorAll('#site-nav a').forEach((a) => {
    const href = a.getAttribute('href');
    const active = href === '#/' ? parts.length === 0 : parts[0] && href === '#/' + parts[0];
    a.classList.toggle('active', Boolean(active));
  });
  document.getElementById('site-nav').classList.remove('open');
  window.scrollTo(0, 0);
  if (init) init();
}

function initEconomy() {
  const sel = document.querySelector('[data-year-select]');
  if (!sel) return;
  sel.addEventListener('change', () => {
    economyYear = Number(sel.value);
    route();
  });
}

function sortedRegions() {
  const q = regionQuery.trim().toLowerCase();
  const list = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q));
  const key = regionSort.key;
  const dir = regionSort.dir;
  const val = (p) => (key === 'name' ? p.name : key === 'perCapita' ? (p.gdp * 1000) / p.population : p[key]);
  list.sort((a, b) => {
    const va = val(a);
    const vb = val(b);
    if (va < vb) return -dir;
    if (va > vb) return dir;
    return 0;
  });
  return list;
}

function renderRegionsTable() {
  const list = sortedRegions();
  const body = document.getElementById('regions-body');
  if (!body) return;
  body.innerHTML = regionsTableRows(list);
  const count = document.getElementById('regions-count');
  if (count) {
    count.textContent = list.length === PROVINCES.length
      ? 'Showing all 8 provinces.'
      : `Showing ${list.length} of 8 provinces.`;
  }
  document.querySelectorAll('#regions-table th[data-sort]').forEach((th) => {
    const key = th.getAttribute('data-sort');
    th.textContent = th.textContent.replace(/ [▲▼]$/, '');
    if (regionSort.key === key) th.textContent += regionSort.dir === 1 ? ' ▲' : ' ▼';
  });
}

function initRegions() {
  const search = document.getElementById('region-search');
  if (search) {
    search.addEventListener('input', () => {
      regionQuery = search.value;
      renderRegionsTable();
    });
  }
  document.querySelectorAll('#regions-table th[data-sort]').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.getAttribute('data-sort');
      if (regionSort.key === key) {
        regionSort.dir = -regionSort.dir;
      } else {
        regionSort = { key, dir: 1 };
      }
      renderRegionsTable();
    });
  });
  renderRegionsTable();
}

function yearOptions(min, max, selected) {
  let out = '';
  for (let y = min; y <= max; y++) out += `<option value="${y}"${y === selected ? ' selected' : ''}>${y}</option>`;
  return out;
}

function renderDataTable() {
  const d = DATASETS[dataKey];
  const min = d.years[0].year;
  const max = d.years[d.years.length - 1].year;
  if (dataFrom < min) dataFrom = min;
  if (dataTo > max) dataTo = max;
  if (dataFrom > dataTo) dataFrom = dataTo;
  const fromSel = document.querySelector('[data-from-select]');
  const toSel = document.querySelector('[data-to-select]');
  if (fromSel) fromSel.innerHTML = yearOptions(min, max, dataFrom);
  if (toSel) toSel.innerHTML = yearOptions(min, max, dataTo);
  const head = document.getElementById('data-value-head');
  if (head) head.textContent = `${d.label} (${d.unit})`;
  const body = document.getElementById('data-body');
  if (body) body.innerHTML = dataTableRows(dataKey, dataFrom, dataTo);
  const note = document.getElementById('data-note');
  if (note) {
    const n = d.years.filter((r) => r.year >= dataFrom && r.year <= dataTo).length;
    note.textContent = `Showing ${n} year${n === 1 ? '' : 's'} of ${d.label}, ${dataFrom}–${dataTo}.`;
  }
}

function initData() {
  const ds = document.querySelector('[data-dataset-select]');
  const fromSel = document.querySelector('[data-from-select]');
  const toSel = document.querySelector('[data-to-select]');
  const btn = document.getElementById('csv-download');
  if (ds) {
    ds.addEventListener('change', () => {
      dataKey = ds.value;
      const d = DATASETS[dataKey];
      dataFrom = d.years[0].year;
      dataTo = d.years[d.years.length - 1].year;
      renderDataTable();
    });
  }
  if (fromSel) fromSel.addEventListener('change', () => { dataFrom = Number(fromSel.value); renderDataTable(); });
  if (toSel) toSel.addEventListener('change', () => { dataTo = Number(toSel.value); renderDataTable(); });
  if (btn) {
    btn.addEventListener('click', () => {
      const csv = dataCsv(dataKey, dataFrom, dataTo);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kalandra-${dataKey}-${dataFrom}-${dataTo}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  }
  renderDataTable();
}

export function initRouter() {
  const nav = document.getElementById('site-nav');
  NAV.forEach((item) => {
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    nav.appendChild(a);
  });
  const burger = document.getElementById('menu-toggle');
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
  });
  window.addEventListener('hashchange', route);
  route();
}
