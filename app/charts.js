// Charts — every chart is inline SVG built by this file's own code.
// No chart library, no network, no external font.

const NAVY = '#0b2a4a';
const TEAL = '#0e7c7b';
const GOLD = '#c98a2b';
const GREY = '#8a97a5';
const GRID = '#e3e8ed';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const start = Math.ceil(min / s) * s;
  const ticks = [];
  for (let v = start; v <= max + 1e-9; v += s) ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

// Line chart. points: [{x (label), y (number)}]. Returns SVG string.
export function lineChart(points, opts) {
  const w = opts.width || 560;
  const h = opts.height || 240;
  const padL = 52, padR = 14, padT = 22, padB = 30;
  const ys = points.map((p) => p.y);
  let min = Math.min(...ys);
  let max = Math.max(...ys);
  const pad = (max - min) * 0.15 || 1;
  min -= pad;
  max += pad;
  const ticks = niceTicks(min, max, 4);
  min = Math.min(min, ticks[0]);
  max = Math.max(max, ticks[ticks.length - 1]);
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const X = (i) => padL + (points.length === 1 ? iw / 2 : (i / (points.length - 1)) * iw);
  const Y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Line chart')}" xmlns="http://www.w3.org/2000/svg">`;
  for (const t of ticks) {
    s += `<line x1="${padL}" y1="${Y(t)}" x2="${w - padR}" y2="${Y(t)}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${Y(t) + 4}" text-anchor="end" font-size="11" fill="${GREY}">${esc(opts.format ? opts.format(t) : t)}</text>`;
  }
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${X(i).toFixed(1)},${Y(p.y).toFixed(1)}`).join(' ');
  s += `<path d="${line}" fill="none" stroke="${opts.color || TEAL}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    s += `<circle cx="${X(i)}" cy="${Y(p.y)}" r="4" fill="#fff" stroke="${opts.color || TEAL}" stroke-width="2.5"/>`;
    s += `<text x="${X(i)}" y="${Y(p.y) - 10}" text-anchor="middle" font-size="11" font-weight="600" fill="${NAVY}" stroke="#fff" stroke-width="3" paint-order="stroke">${esc(opts.valueLabel ? opts.valueLabel(p.y) : p.y)}</text>`;
    s += `<text x="${X(i)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${GREY}">${esc(p.x)}</text>`;
  });
  s += '</svg>';
  return s;
}

// Vertical bar chart. bars: [{label, value, color?}].
export function barChart(bars, opts) {
  const w = opts.width || 560;
  const h = opts.height || 240;
  const padL = 52, padR = 14, padT = 26, padB = 30;
  const max = Math.max(...bars.map((b) => b.value)) * 1.12;
  const ticks = niceTicks(0, max, 4);
  const top = ticks[ticks.length - 1];
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const slot = iw / bars.length;
  const bw = Math.min(56, slot * 0.62);
  const Y = (v) => padT + ih - (v / top) * ih;
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Bar chart')}" xmlns="http://www.w3.org/2000/svg">`;
  for (const t of ticks) {
    s += `<line x1="${padL}" y1="${Y(t)}" x2="${w - padR}" y2="${Y(t)}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${Y(t) + 4}" text-anchor="end" font-size="11" fill="${GREY}">${esc(opts.format ? opts.format(t) : t)}</text>`;
  }
  bars.forEach((b, i) => {
    const x = padL + i * slot + (slot - bw) / 2;
    s += `<rect x="${x.toFixed(1)}" y="${Y(b.value).toFixed(1)}" width="${bw.toFixed(1)}" height="${(padT + ih - Y(b.value)).toFixed(1)}" rx="3" fill="${b.color || TEAL}"/>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${(Y(b.value) - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${NAVY}" stroke="#fff" stroke-width="3" paint-order="stroke">${esc(opts.valueLabel ? opts.valueLabel(b.value) : b.value)}</text>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${GREY}">${esc(b.label)}</text>`;
  });
  s += '</svg>';
  return s;
}

// Horizontal bar chart (for comparisons). bars: [{label, value, color?}].
export function hBarChart(bars, opts) {
  const w = opts.width || 560;
  const rowH = opts.rowHeight || 44;
  const h = opts.height || bars.length * rowH + 34;
  const padL = 120, padR = 70, padT = 10, padB = 14;
  const max = Math.max(...bars.map((b) => b.value)) * 1.15;
  const iw = w - padL - padR;
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Horizontal bar chart')}" xmlns="http://www.w3.org/2000/svg">`;
  bars.forEach((b, i) => {
    const y = padT + i * rowH;
    const bw = (b.value / max) * iw;
    s += `<text x="${padL - 10}" y="${y + 22}" text-anchor="end" font-size="12" fill="${NAVY}">${esc(b.label)}</text>`;
    s += `<rect x="${padL}" y="${y + 6}" width="${bw.toFixed(1)}" height="22" rx="3" fill="${b.color || TEAL}"/>`;
    s += `<text x="${(padL + bw + 8).toFixed(1)}" y="${y + 22}" font-size="12" font-weight="600" fill="${NAVY}">${esc(opts.valueLabel ? opts.valueLabel(b.value) : b.value)}</text>`;
  });
  s += '</svg>';
  return s;
}

// Donut chart. parts: [{name, share, color}].
export function donutChart(parts, opts) {
  const size = opts.size || 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r * 0.62;
  const total = parts.reduce((a, p) => a + p.share, 0);
  let s = `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.label || 'Donut chart')}" xmlns="http://www.w3.org/2000/svg">`;
  let angle = -Math.PI / 2;
  for (const p of parts) {
    const a0 = angle;
    const a1 = angle + (p.share / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    s += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${p.color}"/>`;
    angle = a1;
  }
  s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="13" fill="${GREY}">${esc(opts.centerTop || '')}</text>`;
  s += `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="${opts.centerSize || 17}" font-weight="700" fill="${NAVY}">${esc(opts.center || '')}</text>`;
  s += '</svg>';
  return s;
}

// Age pyramid. bands: [{band, share}] oldest first. Each band's share is
// split evenly across the centre line.
export function pyramidChart(bands, opts) {
  const w = opts.width || 560;
  const rowH = 26;
  const h = bands.length * rowH + 46;
  const cx = w / 2;
  const gap = 24;
  const max = Math.max(...bands.map((b) => b.share / 2));
  const half = (w - 130) / 2 - gap;
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Age pyramid')}" xmlns="http://www.w3.org/2000/svg">`;
  s += `<text x="${cx - gap - half / 2}" y="16" text-anchor="middle" font-size="11" fill="${GREY}">Share of population, %</text>`;
  s += `<text x="${cx + gap + half / 2}" y="16" text-anchor="middle" font-size="11" fill="${GREY}">Share of population, %</text>`;
  bands.forEach((b, i) => {
    const y = 24 + i * rowH;
    const bw = (b.share / 2 / max) * half;
    s += `<rect x="${(cx - gap - bw).toFixed(1)}" y="${y}" width="${bw.toFixed(1)}" height="20" fill="${TEAL}"/>`;
    s += `<rect x="${cx + gap}" y="${y}" width="${bw.toFixed(1)}" height="20" fill="${NAVY}"/>`;
    s += `<text x="${cx}" y="${y + 14}" text-anchor="middle" font-size="11" font-weight="600" fill="${NAVY}">${esc(b.band)}</text>`;
    s += `<text x="${(cx - gap - bw - 6).toFixed(1)}" y="${y + 14}" text-anchor="end" font-size="11" fill="${NAVY}">${b.share.toFixed(1)}%</text>`;
    s += `<text x="${(cx + gap + bw + 6).toFixed(1)}" y="${y + 14}" font-size="11" fill="${NAVY}">${b.share.toFixed(1)}%</text>`;
  });
  s += `<line x1="${cx}" y1="20" x2="${cx}" y2="${24 + bands.length * rowH}" stroke="${GRID}" stroke-width="1"/>`;
  s += `<text x="${cx}" y="${h - 6}" text-anchor="middle" font-size="11" fill="${GREY}">Age group — each bar is that group's share of the total population, 2025</text>`;
  s += '</svg>';
  return s;
}
