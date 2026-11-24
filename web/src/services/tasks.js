/* "Your turn" tasks, answered on the page.
   Kinds: text (write, then compare with a sample), choice, sort, fill (typed answers),
   order (drag), term (practice terminal), py (write and run Python), repl (Python prompt).
   The checks and the practice terminal are moved unchanged from the legacy js/app.js. */
import { reactive } from "vue";
import { pythonReady, runLine, loadPython } from "./python.js";

/* Practice terminals, Python prompts and program output, kept per task while the page is open. */
export const TERMS = reactive({});
export const REPLS = reactive({});
export const PYOUT = reactive({});

export const outLines = s => s.split("\n").map(x => x.trim()).filter(Boolean);

/* checkers: return true, or a message saying what to fix */
export const CHECKS_FILL = {
  accept(v, t) { const norm = s => s.trim().replace(/\s+/g, " ").replace(/(.)\/$/, "$1"); return t.accept.map(norm).includes(norm(v[0] || "")) || "Not quite. Read the hints if you are stuck."; },
  bits16(v) { const ls = outLines(v[0] || ""); if (ls.some(x => !/^[01]{4}$/.test(x))) return "Each line must be exactly four characters, each 0 or 1."; const n = new Set(ls).size; return n === 16 || ("You have " + n + " different patterns. There are 16."); },
  agebin(v) { const age = parseInt(v[0], 10), b = (v[1] || "").trim(); if (!(age > 0 && age < 130)) return "Type your age as a whole number first."; if (!/^[01]+$/.test(b)) return "Binary uses only 0 and 1."; const got = parseInt(b, 2); return got === age || (b + " is " + got + " in decimal, not " + age + "."); },
  count16(v) { const ls = outLines(v[0] || ""); if (ls.length !== 16) return "You need 16 lines, from 0 to 15. You have " + ls.length + "."; for (let i = 0; i < 16; i++) { if (!/^[01]+$/.test(ls[i]) || parseInt(ls[i], 2) !== i) return "Line " + (i + 1) + " should be " + i + " in binary."; } return true; }
};
export const CHECKS_PY = {
  lines3(r) { return outLines(r.out).length >= 3 || "Your program needs to print at least three lines."; },
  age10(r, code) { const m = code.match(/^\s*(\w+)\s*=\s*(\d+)\s*$/m); if (!m) return "Store your age as a whole number in a variable first."; if ((code.match(/^\s*\w+\s*=/gm) || []).length < 2) return "Work out the new age in a second variable."; return outLines(r.out).includes(String(+m[2] + 10)) || ("The output should include " + (+m[2] + 10) + "."); },
  reassign(r, code) { const names = {}; (code.match(/^\s*(\w+)\s*=/gm) || []).forEach(x => { const k = x.trim().split(/\s|=/)[0]; names[k] = (names[k] || 0) + 1; }); if (!Object.values(names).some(c => c >= 2)) return "Give the quantity a new value on a later line."; return /\d/.test(r.out) || "Print the new total."; },
  t30_255(r, code) { if (!/int\(/.test(code) || !/str\(/.test(code)) return "Use int for one line and str for the other."; const ls = outLines(r.out); return (ls.includes("30") && ls.includes("255")) || "One line should print 30 and the other 255."; },
  fname(r, code) { if (!/\bf["']/.test(code)) return "Use an f-string: put f just before the opening quote."; if (/[{}]/.test(r.out)) return "Curly brackets appeared in the output. Is the f missing?"; return (code.match(/^\s*\w+\s*=/gm) || []).length >= 2 || "Store the name and the number in two variables."; },
  two_dp(r) { return outLines(r.out).some(x => /(^|\D)3\.33$/.test(x)) || "The output should end with 3.33 exactly."; },
  food(r, code) { if (!/input\(/.test(code)) return "Ask the question with input."; return /dosa/.test(r.out) || "Print a sentence that includes the answer. (The check types dosa as the answer.)"; },
  empty(r) { return /\[\]/.test(r.out) || "When nothing is typed, the output should show two square brackets with nothing between them."; },
  sum7(r, code) { if (!/int\(/.test(code)) return "Convert each answer with int before adding."; return outLines(r.out).some(x => /(^|\D)7$/.test(x)) || "With the answers 3 and 4, the output should show 7."; },
  price3(r, code) { if (!/float\(/.test(code)) return "Convert the price with float."; return /37\.5/.test(r.out) || "With the price 12.50, the output should show 37.5."; },
  paise(r, code) { if (/\d\.\d/.test(code)) return "Use whole numbers only: work in paise."; return (/37/.test(r.out) && /50/.test(r.out)) || "The output should show 37 rupees and 50 paise."; },
  comments2(r, code) { return (code.split("\n").filter(x => /^\s*#/.test(x)).length >= 2) || "Add at least two comment lines, each starting with #."; },
  commentout(r, code) { if (!code.split("\n").some(x => /^\s*#\s*print/.test(x))) return "Put # in front of one of the print lines."; return outLines(r.out).length === 2 || "With one line switched off, two lines should be printed."; }
};
const replOuts = h => h.map(x => x.out.trim());
export const CHECKS_REPL = {
  r8760(h) { return h.some(x => /\*/.test(x.line) && x.out.trim() === "8760") || "Type the sum with * and press Enter."; },
  ordName(h) { return h.filter(x => /ord\(/.test(x.line) && /^\d+$/.test(x.out.trim())).length >= 2 || "Use ord on at least two letters."; },
  chr72105(h) { const o = replOuts(h).join(" "); return (/'H'|'Hi'/.test(o) && (/'i'|'Hi'/.test(o))) || "Try chr(72), then chr(105)."; },
  ordBig(h) { return h.some(x => /ord\(/.test(x.line) && +x.out.trim() > 127) || "Choose a character that is not an English letter or digit."; },
  rupee(h) { return replOuts(h).some(x => x.includes("₹")) || "Try chr(8377)."; },
  pens(h) { return (h.some(x => /\/\//.test(x.line) && x.out.trim() === "4") && h.some(x => /%/.test(x.line) && x.out.trim() === "2")) || "Use // for the pens and % for the money left."; },
  week(h) { return h.some(x => /\*/.test(x.line) && x.out.trim() === "10080") || "Multiply the days, hours and minutes in one line."; },
  types4(h) { const o = replOuts(h).join(" "); return ["int", "float", "str", "bool"].every(k => o.includes("<class '" + k + "'>")) || "Check at least one int, one float, one str and one bool."; },
  floats2(h) { return new Set(replOuts(h).filter(x => /\d\.\d{10,}/.test(x))).size >= 2 || "Find two sums whose answers have a long tail of digits."; }
};
export const CHECKS_TERM = {
  unknown(s) { return !!s.unknown; },
  level0(s) { return s.cwd === "/Users/ana/python_course/level0"; },
  home1(s) { return s.home1 === true; },
  ranhello(s) { return !!s.ranHello; },
  py3x(s) { return (s.pyExits || 0) >= 3; }
};

/* written answers: checked against the task's key points */
export function checkText(t, ans) {
  const r = t.rubric || {}, words = (ans.match(/[\p{L}\p{N}]+/gu) || []);
  const uniq = new Set(words.map(w => w.toLowerCase())).size;
  /* only a real non-answer is stopped here; anything sentence-like goes on to the key-point checklist, which says exactly what is missing */
  if (words.length < (r.count ? 1 : Math.min(4, r.min_words || 4))) return { pass: false, note: "That is too short to be an answer yet. Write a full sentence in your own words." };
  if (/(.)\1{5,}/u.test(ans) || (words.length > 6 && uniq / words.length < .4)) return { pass: false, note: "That does not look like a real answer yet. Write it in your own words." };
  const items = [];
  let pass = true;
  if (r.count) {
    const got = r.count.groups.filter(g => new RegExp(g[1], "iu").test(ans)).map(g => g[0]);
    items.push({ label: "Name at least " + r.count.need + " different things", ok: got.length >= r.count.need, info: got.length ? "So far: " + got.join(", ") : "" });
    if (got.length < r.count.need) pass = false;
    if (r.count.common) { const other = got.some(g => !r.count.common.includes(g)); items.push({ label: "Include one that is not a phone, tablet or laptop", ok: other }); if (!other) pass = false; }
  }
  if (r.steps) {
    const n = ans.split(/\n+|(?:^|\s)\d+[.)]\s|\.\s+/).map(x => x.trim()).filter(x => /\p{L}/u.test(x)).length;
    const ok = n >= r.steps.min && n <= r.steps.max;
    items.push({ label: "Write between " + r.steps.min + " and " + r.steps.max + " steps", ok, info: "You have " + n + "." });
    if (!ok) pass = false;
  }
  (r.ideas || []).forEach(d => { const ok = new RegExp(d.re, "iu").test(ans); items.push({ label: d.label, ok, opt: !d.req }); if (d.req && !ok) pass = false; });
  return { pass, items };
}

/* practice terminal for tasks */
export function termNew(t) {
  const fs = { Users: { ana: { Desktop: {}, Documents: {} } } };
  (t.dirs || []).forEach(p => { let n = fs; p.split("/").filter(Boolean).forEach(k => { n[k] = n[k] || {}; n = n[k]; }); });
  const files = t.files || {};
  Object.keys(files).forEach(p => { const parts = p.split("/").filter(Boolean), f = parts.pop(); let n = fs; parts.forEach(k => { n[k] = n[k] || {}; n = n[k]; }); n[f] = null; });
  return { fs, files, cwd: t.cwd || "/Users/ana", log: [], hist: [], py: false, count: 0 };
}
function termGet(s, path) { let n = s.fs; for (const k of path.split("/").filter(Boolean)) { if (!n || typeof n !== "object" || !(k in n)) return undefined; n = n[k]; } return n; }
function termRes(s, p) {
  const home = "/Users/ana";
  let parts = (p.startsWith("/") ? "" : p.startsWith("~") ? home : s.cwd).split("/").filter(Boolean);
  for (const k of p.replace(/^~/, "").split("/")) { if (!k || k === ".") continue; if (k === "..") parts.pop(); else parts.push(k); }
  return "/" + parts.join("/");
}
export function termPrompt(s) { if (s.py) return ">>>"; const c = s.cwd === "/Users/ana" ? "~" : s.cwd.split("/").pop() || "/"; return "ana " + c + " %"; }
export function termRun(s, line) {
  s.log.push({ p: termPrompt(s), c: line });
  const out = t => s.log.push({ o: t });
  if (s.py) {
    const l = line.trim();
    if (["exit", "exit()", "quit", "quit()"].includes(l)) { s.py = false; s.pyExits = (s.pyExits || 0) + 1; return; }
    if (!l) return;
    if (pythonReady()) { const r = runLine(l); if (r.all) out(r.all.replace(/\n$/, "")); }
    else out("(The Python runner is still loading. Type exit to leave.)");
    return;
  }
  const a = (line.match(/"[^"]*"|\S+/g) || []).map(x => x.replace(/^"|"$/g, ""));
  const c = a.shift();
  if (!c) return;
  s.count++;
  const before = s.cwd;
  if (c === "pwd") out(s.cwd);
  else if (c === "ls") { const n = termGet(s, termRes(s, a[0] || ".")); if (n === undefined) out("ls: " + a[0] + ": No such file or directory"); else if (n === null) out(a[0]); else { const k = Object.keys(n).sort().map(x => n[x] === null ? x : x + "/"); if (k.length) out(k.join("    ")); } }
  else if (c === "cd") { const r = termRes(s, a[0] || "~"), n = termGet(s, r); if (n === undefined) out("cd: no such file or directory: " + a[0]); else if (n === null) out("cd: not a directory: " + a[0]); else s.cwd = r; }
  else if (c === "mkdir") {
    if (!a.length) out("usage: mkdir folder_name");
    a.forEach(p => {
      const r = termRes(s, p), parent = termGet(s, r.split("/").slice(0, -1).join("/") || "/"), nm = r.split("/").pop();
      if (!parent || parent === null) out("mkdir: " + p + ": No such file or directory");
      else if (nm in parent) out("mkdir: " + p + ": File exists");
      else parent[nm] = {};
    });
  }
  else if (c === "python3" || c === "python") {
    if (!a.length) { s.py = true; loadPython(() => {}); out("Python 3.15.2\nType \"help\" for more information."); }
    else { const r = termRes(s, a[0]); if (s.files[r] !== undefined) { out(s.files[r]); if (/hello\.py$/.test(r)) s.ranHello = true; } else out(c + ": can't open file '" + r + "': [Errno 2] No such file or directory"); }
  }
  else if (c === "clear") s.log = [];
  else if (c === "help") out("Commands here: pwd, ls, cd, mkdir, python3, clear");
  else { out("zsh: command not found: " + c); s.unknown = true; }
  if (s.count === 1 && s.cwd === "/Users/ana" && before !== "/Users/ana") s.home1 = true;
}

/* The order a drag task starts in: shifted by two, so it is never already right. */
export const startOrder = len => Array.from({ length: len }, (_, i) => (i + 2) % len);
/** Points for a task: automatic kinds lose points only for hints; checked kinds also for extra tries. */
export const taskPoints = (e, auto) => auto ? [10, 7, 4, 2][e.hints] : Math.max(2, [10, 7, 4, 2][e.hints] - ((e.tries || 1) - 1) * 2);
export const kindOf = t => t.kind || (t.order ? "order" : "self");
