/* Learner progress: what has been read, answered and ticked, plus points, badges and streaks.
   Saved in this browser under "ztp-progress-v1" (same key and format as the legacy site),
   and to the Catalyst Progress table when signed in (services/catalyst.js). */
import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { NODESC, NODES, NODES1, COURSES, CHECKS, CHECK, CHECK1, PROJECTS } from "../data/content.js";
import { toast, party } from "../services/feedback.js";
import * as Store from "../services/catalyst.js";

export const KEY = "ztp-progress-v1";
export const blank = () => ({ map: {}, read: {}, ex: {}, pred: {}, quiz: {}, task: {}, cp: {}, proj: { checks: [], hints: 0 }, cp1: {}, proj1: { checks: [], hints: 0 }, projc: { checks: [], hints: 0 }, days: [], badges: [], bm: {}, t: 0 });

/* ---------- content lookups (no saved state needed) ---------- */
export const ALL = () => NODESC.concat(NODES, NODES1);
export const NODE = {};
for (const n of ALL()) NODE[n.id] = n;
export const byKey = (k, ch) => ALL().find(x => k.startsWith(x.id + ch));
export const course = c => COURSES.find(x => x.id === c);
export const courseIds = c => course(c).sections.flatMap(s => s.ids);
export const courseSize = c => courseIds(c).length + (course(c).later || []).reduce((a, l) => a + l[3].length, 0);
export const courseOf = id => { const c = COURSES.find(x => x.sections.some(s => s.ids.includes(id))); return c ? c.id : null; };
export const cpItems = c => CHECKS[c].map(x => ({ st: x[0], k: x[1], q: (x[0] === "cp" ? CHECK : CHECK1)[+x[1].slice(1)] }));
export const isCp = id => id.startsWith("cp:"), isPj = id => id.startsWith("pj:"), bare = id => id.slice(3);
export const itemHref = id => NODE[id] ? "lesson-" + id : isCp(id) ? "checkpoint-" + bare(id) : "project-" + bare(id);
export const itemTitle = id => NODE[id] ? NODE[id].t : isCp(id) ? "Checkpoint quiz" : "Project: " + PROJECTS[bare(id)].data.name;
export const itemIcon = id => NODE[id] ? "doc" : isCp(id) ? "quiz" : "flag";
const dayKey = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");

export const useProgress = defineStore("progress", () => {
  let first = blank();
  try { const r = localStorage.getItem(KEY); if (r) first = Object.assign(blank(), JSON.parse(r)); } catch (e) { /* storage blocked or bad data */ }
  const S = ref(first);

  /* sidebar state */
  const curCourse = ref(COURSES[0].id);
  const openSec = reactive(new Set());
  const sq = ref("");

  const writeLocal = () => { try { localStorage.setItem(KEY, JSON.stringify(S.value)); } catch (e) { /* storage blocked */ } };

  /* ---------- progress maths ---------- */
  const doneCount = (store, k, n) => { let c = 0; for (let i = 0; i < n; i++) { const e = store[k + i]; if (e && e.done) c++; } return c; };
  function nodePct(n) {
    const s = S.value;
    return Math.round(20 * (s.read[n.id] ? 1 : 0) + 10 * (s.ex[n.id] ? 1 : 0) + 25 * doneCount(s.pred, n.id + "p", n.P.length) / n.P.length
      + 30 * doneCount(s.quiz, n.id + "q", n.Q.length) / n.Q.length + 15 * doneCount(s.task, n.id + "t", n.T.length) / n.T.length);
  }
  const cpDone = c => cpItems(c).filter(x => (S.value[x.st][x.k] || {}).done).length;
  const cpPct = c => { const it = cpItems(c); return Math.round(10 * it.reduce((a, x) => a + ((S.value[x.st][x.k] || {}).pts || 0), 0) / it.length); };
  const cpPassed = c => cpDone(c) === CHECKS[c].length && cpPct(c) >= 70;
  const pjState = id => S.value[PROJECTS[id].store];
  const pjCount = id => pjState(id).checks.filter(Boolean).length;
  const projDone = id => pjCount(id) === PROJECTS[id].data.checks.length;
  const itemPct = id => NODE[id] ? nodePct(NODE[id]) : isCp(id) ? Math.round(100 * cpDone(bare(id)) / CHECKS[bare(id)].length) : Math.round(100 * pjCount(bare(id)) / PROJECTS[bare(id)].data.checks.length);
  const itemDone = id => NODE[id] ? nodePct(NODE[id]) === 100 : isCp(id) ? cpPassed(bare(id)) : projDone(bare(id));
  const coursePct = c => Math.round(courseIds(c).reduce((a, i) => a + itemPct(i), 0) / courseSize(c));
  function nextStop(c) {
    for (const co of COURSES) {
      if (c && co.id !== c) continue;
      const id = courseIds(co.id).find(i => !itemDone(i));
      if (id) return { h: itemHref(id), t: itemTitle(id) };
    }
    const f = courseIds(c || COURSES[0].id)[0];
    return { h: itemHref(f), t: itemTitle(f) };
  }
  function points() {
    const s = S.value;
    let p = 0;
    for (const st of [s.pred, s.quiz, s.task, s.cp, s.cp1]) for (const e of Object.values(st)) p += e.pts || 0;
    return p + 10 * Object.keys(PROJECTS).reduce((n, id) => n + pjCount(id), 0);
  }
  function stats() {
    const s = S.value;
    const all = Object.values(s.quiz).concat(Object.values(s.cp), Object.values(s.cp1));
    const qs = all.filter(e => e.done);
    const firstTry = qs.filter(e => e.ok && e.tries === 1).length;
    const pr = Object.values(s.pred);
    let hints = Object.keys(PROJECTS).reduce((n, id) => n + (pjState(id).hints || 0), 0);
    for (const e of all) hints += e.hint ? 1 : 0;
    for (const e of Object.values(s.task)) hints += e.hints || 0;
    return { acc: qs.length ? Math.round(100 * firstTry / qs.length) + "%" : "–", pred: pr.filter(e => e.ok).length + " of " + pr.length, hints };
  }
  function streak() {
    const has = d => S.value.days.includes(dayKey(d));
    const d = new Date();
    if (!has(d)) d.setDate(d.getDate() - 1);
    let n = 0;
    while (has(d)) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  const BADGES = [
    ["start", "First steps", "Finish reading your first lesson.", () => Object.keys(S.value.read).length >= 1],
    ["predict", "Sharp predictor", "Get five predictions right.", () => Object.values(S.value.pred).filter(p => p.ok).length >= 5],
    ["nohint", "Clean run", "Answer ten quiz questions correctly at the first try, with no hint.", () => Object.values(S.value.quiz).concat(Object.values(S.value.cp), Object.values(S.value.cp1)).filter(q => q.pts === 10).length >= 10],
    ["nav", "Pathfinder", "Complete the lesson on the four terminal commands.", () => nodePct(NODE.n6) === 100],
    ["check", "Fundamentals cleared", "Score 70 percent or more on the Computer fundamentals checkpoint.", () => cpPassed("cf")],
    ["machine", "Know your machine", "Tick every box on the Computer fundamentals project.", () => projDone("machine")],
    ["run", "First run", "Complete the lesson called Your first program.", () => nodePct(NODE.n8) === 100],
    ["prompt", "Prompt pro", "Complete the lesson on the Python prompt.", () => nodePct(NODE.n9) === 100],
    ["hello", "Hello, me", "Tick every box on the Hello, me project.", () => projDone("hello")],
    ["check1", "Python starter", "Score 70 percent or more on the Python checkpoint.", () => cpPassed("py")],
    ["tip", "Tip calculator", "Tick every box on the Tip calculator project.", () => projDone("tip")],
    ["streak3", "Three days running", "Study on three days in a row.", () => streak() >= 3]
  ];
  function checkBadges() {
    for (const [id, name, , test] of BADGES) {
      if (!S.value.badges.includes(id) && test()) {
        S.value.badges.push(id);
        toast("Badge earned: " + name, id);
        party(80);
        writeLocal();
      }
    }
  }

  /* ---------- saving ---------- */
  function save() {
    const s = S.value;
    s.t = Date.now();
    const day = dayKey(new Date());
    if (!s.days.includes(day)) s.days.push(day);
    writeLocal();
    Store.push(s);
    checkBadges();
  }
  /** "Start again": clears everything, here and in the account. */
  function reset() {
    S.value = blank();
    writeLocal();
    S.value.t = Date.now();
    Store.push(S.value);
  }
  /** A newer copy arrived from the learner's account. */
  function adopt(d) {
    if (d && (d.t || 0) > (S.value.t || 0)) { S.value = Object.assign(blank(), d); writeLocal(); return true; }
    return false;
  }
  /** The progress record for a task, created when first needed (like the legacy taskOf). */
  function taskEntry(k) { return S.value.task[k] || (S.value.task[k] = { hints: 0 }); }
  const mapDone = () => S.value.map || (S.value.map = {});

  return { S, curCourse, openSec, sq, save, reset, adopt, taskEntry, mapDone, nodePct, cpDone, cpPct, cpPassed, pjState, pjCount, projDone, itemPct, itemDone, coursePct, nextStop, points, stats, streak, BADGES };
});
