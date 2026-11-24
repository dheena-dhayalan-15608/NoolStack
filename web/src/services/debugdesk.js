/* ---------- Debug Desk: questions and answers about code, for NoolStack members ----------
   On the live site everything goes through the "community" function (/server/community).
   In the preview there is no server, so a stand-in keeps everything in this browser
   (under "noolstack-demo-debugdesk"). Moved from the legacy js/debugdesk.js. */
import { reactive } from "vue";

export const CR_RULES = ["Keep it about learning: questions, explanations, resources and projects.", "Be kind. No insults, harassment or hate.", "No adverts, spam or links to sell things.", "Never share passwords, phone numbers or other private details.", "Report anything that breaks these rules."];

/* view: what the open Debug Desk page shows ("list", "ask", "mod" or a question id), or "" when none is open.
   newActivity: the list's "New activity" button. reloadQ: bumped when the open question has new activity. */
export const CR = reactive({ me: null, admin: false, loaded: false, loading: false, demo: false, err: "", view: "", rt: null, rtOn: false, rtStarting: false, search: "", newActivity: false, reloadQ: 0 });

export const crWhen = t => { const d = new Date(isNaN(+t) ? String(t).replace(" ", "T") : +t); return isNaN(d) ? "" : d.toLocaleString(document.documentElement.lang === "ta" ? "ta-IN" : "en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }); };
export const crHue = (name, id) => [...String(id || name)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7) % 360;
export const crInitial = name => (String(name || "?").trim()[0] || "?").toUpperCase();

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
/** Posts are plain text; code goes between lines of three backticks, and `inline code` in single ones. */
export function crMd(src) {
  const parts = String(src || "").split(/```[a-z0-9]*\n?/i);
  return parts.map((p, i) => i % 2 ? `<pre class="dbcode"><code>${esc(p.replace(/\n$/, ""))}</code></pre>` : esc(p).replace(/`([^`\n]+)`/g, "<code>$1</code>").replace(/\n/g, "<br>")).join("");
}

/* the server, or the preview stand-in */
export async function crApi(method, path, body) {
  if (CR.demo) return crDemo(method, path, body || {});
  const headers = { "Content-Type": "application/json" }, m = document.cookie.match(/(?:^|;\s*)ZD_CSRF_TOKEN=([^;]+)/);
  if (m) headers["X-ZCSRF-TOKEN"] = "zd_csrparam=" + decodeURIComponent(m[1]);
  let r;
  try { r = await fetch("/server/community" + path, { method, credentials: "same-origin", headers, body: method === "GET" ? undefined : JSON.stringify(body || {}) }); }
  catch (e) { throw new Error("Could not reach Debug Desk. Check your connection."); }
  let d = {};
  try { d = await r.json(); } catch (e) { /* not JSON */ }
  if (!r.ok) throw new Error(d.error || "Something went wrong. Please try again.");
  return d;
}

/* ---- preview stand-in: the same answers as the server, kept in this browser ---- */
export const CRD_KEY = "noolstack-demo-debugdesk";
function crdGet() { let d = null; try { d = JSON.parse(localStorage.getItem(CRD_KEY)); } catch (e) { /* bad data */ } return d || { me: null, n: 100, reports: [] }; }
function crdSet(d) { try { localStorage.setItem(CRD_KEY, JSON.stringify(d)); } catch (e) { /* storage blocked */ } }
function crdCheck(title, body) {
  const s = (title + " " + body).toLowerCase();
  if (/https?:\/\/|www\.|\b(buy|sale|discount|offer|earn money|crypto|casino|loan)\b/.test(s)) return "It looks like an advert or a link to sell something.";
  if (/\d{10}/.test(s.replace(/\s/g, ""))) return "Please do not share phone numbers or other private details.";
  if (/\b(idiot|stupid|hate you|shut up)\b/.test(s)) return "Please keep the forum kind.";
  if (!/\b(typeerror|valueerror|nameerror|syntaxerror|crash|crashes|fix|works|wrong|python|code|coding|program|programming|computer|learn|learning|lesson|error|how|why|what|help|project|binary|bits?|bytes?|file|folder|terminal|shell|data|question|explain|understand|variable|function|loop|ram|cpu|input|output|print|int|float|str|string|number|text|convert|type|list|syntax|bug|debug|install|run|script|keyboard|memory|storage)\b/.test(s)) return "It does not seem to be about learning technology.";
  return "";
}
async function crDemo(method, path, b) {
  await new Promise(r => setTimeout(r, 120));
  const d = crdGet(), me = d.me, nid = () => String(++d.n), fail = m => { throw new Error(m); }, save = () => crdSet(d);
  let m;
  if (path === "/me") return { member: me, admin: true };
  if (path === "/rt") return { enabled: true, demo: true };
  if (path === "/join") { const name = String(b.name || "").trim().slice(0, 40); if (name.length < 2) fail("Choose a display name of at least 2 characters."); if (/@|https?:/i.test(name)) fail("A display name cannot contain an email address or link."); d.me = { id: "1", name }; save(); return { member: d.me }; }
  if (!me) fail("Join the community first.");
  if (path.startsWith("/debug")) {
    d.debug = d.debug || {
      q: [{ id: "41", user: { id: "3", name: "Ravi" }, title: "TypeError: can only concatenate str (not \"int\") to str", body: "I wrote this and it crashes:\n```\nage = input(\"Age: \")\nprint(age + 1)\n```\nWhy can I not add 1?", tags: ["python", "input", "types"], accepted: "42", at: Date.now() - 7200e3 }],
      a: [{ id: "42", q: "41", user: { id: "5", name: "Karthik" }, body: "input() always gives you text (a str). Convert it first:\n```\nage = int(input(\"Age: \"))\nprint(age + 1)\n```", at: Date.now() - 7000e3 }], v: { "q41": { "2": 1, "4": 1 }, "a42": { "2": 1, "3": 1, "4": 1 } }
    };
    const D = d.debug, sc = k => Object.values(D.v[k] || {}).reduce((a, x) => a + x, 0), my = k => (D.v[k] || {})["1"] || 0, ac = qid => D.a.filter(a => a.q === qid).length;
    const qo = x => Object.assign({}, x, { answers: ac(x.id), score: sc("q" + x.id), myVote: my("q" + x.id) });
    if (path.startsWith("/debug?") || path === "/debug" && method === "GET") {
      const u = new URLSearchParams(path.split("?")[1] || ""), t = (u.get("q") || "").toLowerCase(), tag = u.get("tag") || "", sort = u.get("sort") || "";
      let l = D.q.slice().sort((a, x) => x.at - a.at).filter(x => (!t || (x.title + " " + x.body).toLowerCase().includes(t)) && (!tag || x.tags.includes(tag))).map(qo);
      if (sort === "unanswered") l = l.filter(x => !x.answers);
      if (sort === "votes") l.sort((a, x) => x.score - a.score);
      return { questions: l };
    }
    if (path === "/debug/vote") {
      const k = (b.kind === "a" ? "a" : "q") + b.id, it = (b.kind === "a" ? D.a : D.q).find(x => x.id === String(b.id));
      if (!it) fail("Not found.");
      if (it.user.id === "1") fail("You cannot vote on your own post.");
      const v = D.v[k] || (D.v[k] = {}), val = Number(b.value) === -1 ? -1 : 1;
      if (v["1"] === val) delete v["1"]; else v["1"] = val;
      save();
      return { score: sc(k), myVote: v["1"] || 0 };
    }
    if ((m = path.match(/^\/debug\/(\d+)\/accept$/))) { const x = D.q.find(y => y.id === m[1]); if (!x) fail("Question not found."); if (x.user.id !== "1") fail("Only the person who asked can accept an answer."); x.accepted = x.accepted === String(b.answer) ? "" : String(b.answer); save(); return { accepted: x.accepted }; }
    if ((m = path.match(/^\/debug\/(\d+)\/answer$/))) {
      const x = D.q.find(y => y.id === m[1]); if (!x) fail("Question not found.");
      const body = String(b.body || "").trim(); if (body.length < 15) fail("Write a fuller answer: explain the fix, not just the code.");
      const why = crdCheck("", body); if (why) fail("This answer was not published. " + why);
      const id = nid(); D.a.push({ id, q: x.id, user: { id: "1", name: me.name }, body, at: Date.now() }); save(); crRt({ t: "debug", q: x.id, a: id }); return { id };
    }
    if ((m = path.match(/^\/debug\/(\d+)$/))) {
      const x = D.q.find(y => y.id === m[1]); if (!x) fail("Question not found.");
      return { question: qo(x), answers: D.a.filter(a => a.q === x.id).map(a => Object.assign({}, a, { score: sc("a" + a.id), myVote: my("a" + a.id) })).sort((p, r) => (r.id === x.accepted) - (p.id === x.accepted) || sc("a" + r.id) - sc("a" + p.id)) };
    }
    if (path === "/debug") {
      const title = String(b.title || "").trim(), body = String(b.body || "").trim(), tags = [...new Set(String(b.tags || "").toLowerCase().split(/[\s,]+/).map(t => t.replace(/^#/, "")).filter(t => /^[a-z0-9][a-z0-9+#.-]{0,23}$/.test(t)))].slice(0, 5);
      if (title.length < 10) fail("Write a title of at least 10 characters that sums up the problem.");
      if (body.length < 20) fail("Describe the problem: what you tried, and what happened.");
      if (!tags.length) fail("Add at least one tag, such as python.");
      const why = crdCheck(title, body); if (why) fail("This question was not published. " + why);
      const id = nid(); D.q.push({ id, user: { id: "1", name: me.name }, title, body, tags, accepted: "", at: Date.now() }); save();
      if (!d.debugReplied) {
        d.debugReplied = 1; save();
        setTimeout(() => { const e = crdGet(); const aid = String(++e.n); e.debug.a.push({ id: aid, q: id, user: { id: "5", name: "Karthik" }, body: "Good question! (Preview: an automatic answer, to show answers arriving live.) Try printing the value and its type:\n```\nprint(value, type(value))\n```", at: Date.now() }); crdSet(e); crRt({ t: "debug", q: id, a: aid }); }, 5000);
      }
      return { id };
    }
  }
  if (path === "/report") { d.reports.push({ id: nid(), by: me.name, kind: b.kind, item: b.id, reason: b.reason || "", excerpt: b.excerpt || "", at: Date.now() }); save(); return { ok: true }; }
  if (path === "/admin/reports") return { reports: d.reports };
  if ((m = path.match(/^\/admin\/reports\/(\d+)$/))) { d.reports = d.reports.filter(r => r.id !== m[1]); save(); return { ok: true }; }
  fail("Not found.");
}

/* ---------- live updates (new questions and answers), through Catalyst Data Streams ---------- */
const siteBase = () => location.href.split("#")[0].replace(/[^/]*$/, "");
export async function crRtStart() {
  if (CR.rtStarting || CR.rt || !CR.me) return;
  CR.rtStarting = true;
  try {
    const t = await crApi("GET", "/rt");
    if (t.demo) { CR.rt = { demo: true }; CR.rtOn = true; return; }
    if (!t.enabled) throw new Error("off");
    if (!window.NSDataStreams) await new Promise((ok, no) => { const s = document.createElement("script"); s.src = siteBase() + "vendor/datastreams-ws.min.js"; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
    const sock = new window.NSDataStreams.DataStreamsWebSocket({ url: t.url, zuid: t.wss, key: t.key, enableLogging: false });
    CR.rt = sock;
    sock.on("open", () => { sock.subscribe("0"); CR.rtOn = true; });
    sock.on("message", ev => { try { crRt(JSON.parse(ev.data)); } catch (e) { /* not an event */ } try { sock.sendAck(); } catch (e) { /* ignore */ } });
    sock.on("close", () => { CR.rtOn = false; });
    sock.on("error", () => {});
  } catch (e) { CR.rt = null; CR.rtOn = false; }
  finally { CR.rtStarting = false; }
}
export function crRtClose() { if (!CR.rt) return; try { if (CR.rt.close) CR.rt.close(); } catch (e) { /* ignore */ } CR.rt = null; CR.rtOn = false; }
export function crRt(ev) {
  if (!ev || !CR.me || !CR.view) return;
  if (ev.t === "debug") {
    if (CR.view === "list") CR.newActivity = true;
    else if (CR.view === ev.q) CR.reloadQ++;
  }
}

/* ---------- loading ---------- */
/** Find out whether the learner has joined. onCatalyst and signedIn come from the auth store. */
export async function crStart(onCatalyst, signedIn) {
  CR.demo = !onCatalyst;
  CR.err = "";
  if (!CR.demo && !signedIn) { CR.loaded = true; return; }
  try { const d = await crApi("GET", "/me"); CR.me = d.member; CR.admin = !!d.admin; } catch (e) { CR.err = e.message; }
  CR.loaded = true;
}
/** Forget who joined, for example after signing in or out. */
export function crForget() { crRtClose(); CR.loaded = false; CR.loading = false; CR.me = null; }
