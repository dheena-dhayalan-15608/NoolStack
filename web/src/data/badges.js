/* Badge artwork: a rosette with ribbons and one icon per badge. */
export const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

export const BADGE_ART = {
  start: ["#2744CF", '<path d="M38 48q11-6 22 0q11-6 22 0v26q-11-6-22 0q-11-6-22 0z" fill="#FBFAF6"/><path d="M38 48q11-6 22 0v26q-11-6-22 0z" fill="A"/><path d="M38 48q11-6 22 0q11-6 22 0v26q-11-6-22 0q-11-6-22 0zM60 48v26"/>'],
  predict: ["#63C7E6", '<circle cx="60" cy="58" r="19"/><circle cx="60" cy="58" r="11" fill="A"/><circle cx="60" cy="58" r="3.5" fill="K" stroke="none"/><path d="M60 58l17-17M72 41h5v5"/>'],
  nohint: ["#4FD08B", '<circle cx="60" cy="58" r="20" fill="A"/><path d="M50 58l7 7 14-15"/><path d="M80 34l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="K" stroke="none"/>'],
  nav: ["#C0C04A", '<path d="M38 46h13l4 5h27v25H38z" fill="A"/><path d="M48 58l6 5-6 5M59 68h9"/>'],
  check: ["#2744CF", '<path d="M52 38v6M60 38v6M68 38v6M52 72v6M60 72v6M68 72v6M40 50h6M40 58h6M40 66h6M74 50h6M74 58h6M74 66h6"/><rect x="46" y="44" width="28" height="28" rx="4" fill="#FBFAF6"/><rect x="53" y="51" width="14" height="14" rx="2" fill="A"/>'],
  machine: ["#F2B13C", '<rect x="43" y="41" width="34" height="24" rx="3" fill="A"/><path d="M50 50l5 4-5 4M58 59h7"/><path d="M36 69h48l-4 7H40z" fill="#FBFAF6"/>'],
  run: ["#4FD08B", '<circle cx="60" cy="58" r="20"/><path d="M54 48l15 10-15 10z" fill="A"/>'],
  prompt: ["#63C7E6", '<rect x="37" y="42" width="46" height="32" rx="5" fill="A"/><path d="M44 52l6 6-6 6M54 52l6 6-6 6M64 52l6 6-6 6"/>'],
  hello: ["#FF7B6B", '<path d="M42 42h36a5 5 0 015 5v20a5 5 0 01-5 5H58l-9 8v-8h-7a5 5 0 01-5-5V47a5 5 0 015-5z" fill="A"/><circle cx="50" cy="57" r="2.5" fill="K" stroke="none"/><circle cx="60" cy="57" r="2.5" fill="K" stroke="none"/><circle cx="70" cy="57" r="2.5" fill="K" stroke="none"/>'],
  check1: ["#F2B13C", '<path d="M52 40q-7 0-7 7v6q0 5-5 5q5 0 5 5v6q0 7 7 7M68 40q7 0 7 7v6q0 5 5 5q-5 0-5 5v6q0 7-7 7"/><circle cx="60" cy="58" r="5" fill="A"/>'],
  tip: ["#C0C04A", '<rect x="45" y="39" width="30" height="38" rx="5" fill="#FBFAF6"/><rect x="50" y="44" width="20" height="9" rx="2" fill="A"/><circle cx="53" cy="61" r="2.2" fill="K" stroke="none"/><circle cx="60" cy="61" r="2.2" fill="K" stroke="none"/><circle cx="67" cy="61" r="2.2" fill="K" stroke="none"/><circle cx="53" cy="69" r="2.2" fill="K" stroke="none"/><circle cx="60" cy="69" r="2.2" fill="K" stroke="none"/><circle cx="67" cy="69" r="2.2" fill="K" stroke="none"/>'],
  streak3: ["#FF7B6B", '<path d="M60 38c9 10 16 17 15 27-1 9-8 14-15 14s-14-5-15-14c-1-8 5-12 8-18 2 5 4 7 7 8 1-6-1-11 0-17z" fill="A"/><path d="M60 79c-4 0-7-3-7-7 0-4 4-6 5-10 3 3 9 6 9 11 0 4-3 6-7 6z" fill="#FBFAF6"/>']
};
const shade = (h, f) => "#" + [1, 3, 5].map(i => Math.round(parseInt(h.slice(i, i + 2), 16) * f).toString(16).padStart(2, "0")).join("");
const ROSETTE = (() => {
  const N = 14, ri = 44, ro = 53, cx = 60, cy = 58;
  let d = "";
  for (let k = 0; k <= N; k++) {
    const a = 2 * Math.PI * k / N - Math.PI / 2, x = (cx + ri * Math.cos(a)).toFixed(1), y = (cy + ri * Math.sin(a)).toFixed(1);
    if (k === 0) d += "M" + x + " " + y;
    else { const m = a - Math.PI / N; d += "Q" + (cx + ro * Math.cos(m)).toFixed(1) + " " + (cy + ro * Math.sin(m)).toFixed(1) + " " + x + " " + y; }
  }
  return d + "Z";
})();
/** The colours, rosette outline and icon markup for a badge, or null. */
export function badgeParts(id) {
  const b = BADGE_ART[id];
  if (!b) return null;
  const c = b[0], K = "#1C2230";
  return { c, dk: shade(c, .72), K, rosette: ROSETTE, icon: b[1].replace(/fill="A"/g, 'fill="' + c + '"').replace(/fill="K"/g, 'fill="' + K + '"') };
}
/** The badge picture as SVG markup. label is read out by screen readers. */
export function badgeSVG(id, label) {
  const b = BADGE_ART[id];
  if (!b) return "";
  const c = b[0], dk = shade(c, .72), K = "#1C2230";
  const icon = b[1].replace(/fill="A"/g, 'fill="' + c + '"').replace(/fill="K"/g, 'fill="' + K + '"');
  return `<svg class="bart" viewBox="0 0 120 142" role="img" aria-label="${esc(label)}"><path d="M42 88l17 8-8 44-8-8-10 6z" fill="${dk}"/><path d="M78 88l-17 8 8 44 8-8 10 6z" fill="${dk}"/><path d="M47 92l12 5-7 34-6-6z" fill="${c}" opacity=".55"/><path d="M73 92l-12 5 7 34 6-6z" fill="${c}" opacity=".55"/><path d="${ROSETTE}" fill="${c}"/><circle cx="60" cy="58" r="37" fill="${dk}" opacity=".35"/><circle cx="60" cy="58" r="35" fill="#FBFAF6"/><g fill="none" stroke="${K}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round">${icon}</g></svg>`;
}

/* Small line icons used across the site. */
export const ICONS = { doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>', check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.8 2.8L16 9.5"/>', lock: '<rect x="6" y="11" width="12" height="9" rx="2"/><path d="M9 11V8a3 3 0 016 0v3"/>', chev: '<path d="M6 9l6 6 6-6"/>', back: '<path d="M15 6l-6 6 6 6"/>', mark: '<path d="M7 4h10v16l-5-4-5 4z"/>', quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 114 2c-.9.6-1.5 1.1-1.5 2M12 17h.01"/>', flag: '<path d="M6 21V4M6 5h11l-2 4 2 4H6"/>', book: '<path d="M5 5a2 2 0 012-2h11v16H7a2 2 0 00-2 2zM5 21V5"/>', search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>' };
