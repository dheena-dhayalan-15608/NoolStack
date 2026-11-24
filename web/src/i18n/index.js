/* Languages. The learner picks a language on the first visit, and can change it with the
   button in the header. English is built in. For another language, a language pack
   (such as ta.js) is applied in two ways:
   1. Course content (lessons, courses, animations) is replaced by id when the page loads.
   2. Menus, buttons and messages are translated on screen by their exact English text,
      and kept translated as the page changes.
   Anything a pack does not cover stays in English.

   This is the legacy engine (js/i18n.js) moved into a module and a Vue plugin, so the
   behaviour is identical: it watches the rendered page and translates text nodes and the
   placeholder, aria-label and title attributes. Moving to vue-i18n can come later. */
import { reactive } from "vue";
import { NODESC, NODES, NODES1, MORE, DEEP, ERAS, COURSES, ERRORS } from "../data/content.js";
import { ANIMS } from "../data/animations.js";

/* Language packs, loaded only when that language is chosen. */
const PACKS = { ta: () => import("./ta.js").then(m => m.TA) };
export const LANG_KEY = "eaas-lang";

let stored = "";
try { stored = localStorage.getItem(LANG_KEY) || ""; } catch (e) { /* storage blocked */ }
const chosen = stored === "en" || !!PACKS[stored];
/** The language in use: "en" or "ta". */
export const lang = chosen ? stored : "en";
let PACK = null, D = {}, PAT = [];
window.LANG = lang;
document.documentElement.lang = lang;

/** Shared state for the language chooser dialog. */
export const langUI = reactive({ open: !chosen });
export function openChooser() { langUI.open = true; }
export function chooseLanguage(l) {
  try { localStorage.setItem(LANG_KEY, l); } catch (e) { /* storage blocked */ }
  langUI.open = false;
  if (l !== lang) location.reload();
}

function mergeLessons(map) {
  const all = NODESC.concat(NODES, NODES1);
  for (const id in map) {
    const n = all.find(x => x.id === id), t = map[id];
    if (!n) continue;
    for (const k of ["t", "why", "an", "L", "M", "G"]) if (t[k]) n[k] = t[k];
    if (t.ex) for (const k of ["t", "walk", "code", "out"]) if (t.ex[k]) n.ex[k] = t.ex[k];
    for (const k of ["P", "Q", "T"]) if (t[k] && n[k]) t[k].forEach((x, i) => { if (n[k][i]) Object.assign(n[k][i], x); });
    if (t.t) n.translated = true;
  }
}

/** Load the chosen language pack and replace course content by id. Call before anything is drawn. */
export async function setupLanguage() {
  if (!PACKS[lang]) return;
  try { PACK = await PACKS[lang](); } catch (e) { PACK = null; return; }
  D = PACK.ui || {};
  PAT = PACK.patterns || [];
  mergeLessons(PACK.lessons || {});
  for (const id in PACK.more || {}) MORE[id] = PACK.more[id];
  for (const id in PACK.deep || {}) DEEP[id] = PACK.deep[id];
  (PACK.eras || []).forEach((e, i) => { if (ERAS[i]) e.forEach((v, j) => { ERAS[i][j] = v; }); });
  for (const c of COURSES) {
    const t = (PACK.courses || {})[c.id];
    if (!t) continue;
    if (t.name) c.name = t.name;
    if (t.blurb) c.blurb = t.blurb;
    (t.sections || []).forEach((s, i) => { if (c.sections[i]) c.sections[i].t = s; });
  }
  (PACK.errors || []).forEach((e, i) => { if (ERRORS[i]) { ERRORS[i][1] = e[0]; ERRORS[i][2] = e[1]; } });
  for (const a of ANIMS) {
    const t = (PACK.anims || {})[a.id];
    if (t) { a.t = t[0]; a.d = t[1]; }
    const c = (PACK.caps || {})[a.id];
    if (c) a.cap = c;
  }
  const h = ANIMS.find(a => a.id === "history");
  if (h) h.cap = ERAS.map(e => e[2]);
  document.title = "NoolStack: Education As A Service";
}

/** Translate one piece of English text, keeping its surrounding spaces. */
export function T(s) {
  if (!PACK || !s) return s;
  const t = s.trim();
  if (!t) return s;
  let r = Object.prototype.hasOwnProperty.call(D, t) ? D[t] : undefined;
  if (r === undefined) for (const p of PAT) { const m = t.match(p[0]); if (m) { r = p[1](m, T); break; } }
  if (r === undefined) return s;
  const i = s.indexOf(t);
  return s.slice(0, i) + r + s.slice(i + t.length);
}

const SKIP = "code,pre,.no-tr,script,style,textarea,.termbox";
function doText(n) {
  const p = n.parentElement;
  if (!p || p.closest(SKIP)) return;
  const v = T(n.nodeValue);
  if (v !== n.nodeValue) n.nodeValue = v;
}
function doAttrs(el) {
  if (!el.getAttribute || el.closest(".no-tr")) return;
  for (const a of ["placeholder", "aria-label", "title"]) {
    const v = el.getAttribute(a);
    if (v) { const w = T(v); if (w !== v) el.setAttribute(a, w); }
  }
}
function walk(root) {
  if (root.nodeType === 3) { doText(root); return; }
  if (root.nodeType !== 1 || root.closest(".no-tr")) return;
  doAttrs(root);
  root.querySelectorAll("[placeholder],[aria-label],[title]").forEach(doAttrs);
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), list = [];
  let n;
  while ((n = tw.nextNode())) list.push(n);
  list.forEach(doText);
}

let observing = false;
/** Start translating the page on screen (only when a language pack is in use). */
export function startTranslating() {
  if (!PACK || observing) return;
  observing = true;
  walk(document.body);
  new MutationObserver(ms => {
    for (const m of ms) {
      if (m.type === "characterData") doText(m.target);
      else if (m.type === "attributes") doAttrs(m.target);
      else m.addedNodes.forEach(walk);
    }
  }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "aria-label", "title"] });
}

/** Merge extra translated lessons (kept for parity with the legacy I18N.merge). */
export function merge(m) { if (PACK) mergeLessons(m); }

export const i18nPlugin = {
  install(app) {
    app.config.globalProperties.$T = T;
    app.provide("i18n", { T, lang, openChooser });
    startTranslating();
  }
};
