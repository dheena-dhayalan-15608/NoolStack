/* ---------- Debug Desk: questions and answers about code, for NoolStack members ----------
   On the live site everything goes through the "community" function (/server/community).
   In the preview there is no server, so a stand-in keeps everything in this browser
   (under "noolstack-demo-debugdesk"). Moved from the legacy js/debugdesk.js. */
import { reactive } from "vue";
import { callServer } from "./server.js";

export const CR_RULES = ["Keep it about learning: questions, explanations, resources and projects.", "Be kind. No insults, harassment or hate.", "No adverts, spam or links to sell things.", "Never share passwords, phone numbers or other private details.", "Report anything that breaks these rules."];

/* view: what the open Debug Desk page shows ("list", "ask", "mod" or a question id), or "" when none is open.
   newActivity: the list's "New activity" button. reloadQ: bumped when the open question has new activity. */
export const CR = reactive({ me: null, admin: false, loaded: false, loading: false, demo: false, err: "", view: "", rt: null, rtOn: false, rtStarting: false, search: "", newActivity: false, reloadQ: 0,
  /* "Active now": members with a Debug Desk page open (null until known); hidden: this member chose not to be shown */
  online: null, hidden: false });

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
  return callServer(method, path, body);
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
  if (path === "/presence") {
    const list = [{ id: "5", name: "Karthik" }, { id: "3", name: "Ravi" }];
    if (b.visible !== false) list.push({ id: "1", name: me.name });
    return { list: list.sort((x, y) => x.name.localeCompare(y.name)) };
  }
  if (path.startsWith("/debug")) {
    d.debug = d.debug || {
      q: [{ id: "41", user: { id: "3", name: "Ravi" }, title: "TypeError: can only concatenate str (not \"int\") to str", body: "I wrote this and it crashes:\n```\nage = input(\"Age: \")\nprint(age + 1)\n```\nWhy can I not add 1?", tags: ["python", "input", "types"], accepted: "42", at: Date.now() - 7200e3 }],
      a: [{ id: "42", q: "41", user: { id: "5", name: "Karthik" }, body: "input() always gives you text (a str). Convert it first:\n```\nage = int(input(\"Age: \"))\nprint(age + 1)\n```", at: Date.now() - 7000e3 }], v: { "q41": { "2": 1, "4": 1 }, "a42": { "2": 1, "3": 1, "4": 1 } }
    };
    const D = d.debug, sc = k => Object.values(D.v[k] || {}).reduce((a, x) => a + x, 0), my = k => (D.v[k] || {})["1"] || 0, ac = qid => D.a.filter(a => a.q === qid).length;
    const qo = x => Object.assign({}, x, { answers: ac(x.id), score: sc("q" + x.id), myVote: my("q" + x.id), files: (x.files || []).map((f, i) => ({ i, name: f.name, type: f.type, size: f.size, demoUrl: f.url })) });
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
      const files = (b.files || []).slice(0, 3).map(f => ({ name: f.name, type: f.type, size: f.size, url: "data:" + f.type + ";base64," + f.data }));
      const id = nid(); D.q.push({ id, user: { id: "1", name: me.name }, title, body, tags, accepted: "", at: Date.now(), files });
      if (JSON.stringify(d).length > 4e6) { D.q.pop(); fail("The preview keeps questions in this browser, which has no room for attachments this big. Try smaller ones."); }
      save();
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
/* After a failed try, wait before trying again (1 minute, doubling up to 30), so a server problem never
   turns into a stream of calls. */
let rtWait = 0, rtNext = 0;
export async function crRtStart() {
  if (CR.rtStarting || CR.rt || !CR.me || Date.now() < rtNext) return;
  CR.rtStarting = true;
  try {
    const t = await crApi("GET", "/rt");
    if (CR.demo && t.demo) { CR.rt = { demo: true }; CR.rtOn = true; return; }
    if (!t.enabled) throw new Error("off");
    if (!window.NSDataStreams) await new Promise((ok, no) => { const s = document.createElement("script"); s.src = siteBase() + "vendor/datastreams-ws.min.js"; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
    const sock = new window.NSDataStreams.DataStreamsWebSocket({ url: t.url, zuid: t.wss, key: t.key, enableLogging: false });
    CR.rt = sock;
    sock.on("open", () => { sock.subscribe("0"); CR.rtOn = true; });
    sock.on("message", ev => { try { crRt(JSON.parse(ev.data)); } catch (e) { /* not an event */ } try { sock.sendAck(); } catch (e) { /* ignore */ } });
    sock.on("close", () => { CR.rtOn = false; });
    sock.on("error", () => {});
    rtWait = 0;
  } catch (e) { CR.rt = null; CR.rtOn = false; rtWait = Math.min(rtWait ? rtWait * 2 : 60e3, 30 * 60e3); rtNext = Date.now() + rtWait; }
  finally { CR.rtStarting = false; }
}
export function crRtClose() { if (!CR.rt) return; try { if (CR.rt.close) CR.rt.close(); } catch (e) { /* ignore */ } CR.rt = null; CR.rtOn = false; }
export function crRt(ev) {
  if (!ev || !CR.me || !CR.view) return;
  if (ev.t === "presence" && Array.isArray(ev.list)) { CR.online = ev.list; return; }
  if (ev.t === "debug") {
    if (CR.view === "list") CR.newActivity = true;
    else if (CR.view === ev.q) CR.reloadQ++;
  }
}

/* ---------- "Active now" ----------
   While a Debug Desk page is open and showing, it tells the server "I am here" once a minute (the server
   forgets anyone not heard from for 3 minutes). The list comes back with each answer, and changes arrive
   on the live channel too. "Show me as active" is remembered in this browser. */
const HIDE_KEY = "noolstack-debugdesk-hidden";
try { CR.hidden = localStorage.getItem(HIDE_KEY) === "1"; } catch (e) { /* storage blocked */ }
let beatTimer = null, beating = false;
async function beat() {
  if (beating || !CR.me || document.visibilityState !== "visible") return;
  beating = true;
  try { CR.online = (await crApi("POST", "/presence", { visible: !CR.hidden })).list; } catch (e) { /* try again next minute */ }
  beating = false;
}
function onVisible() { if (document.visibilityState === "visible") beat(); }
export function crPresenceStart() {
  if (beatTimer) return;
  beat();
  beatTimer = setInterval(beat, 60e3);
  document.addEventListener("visibilitychange", onVisible);
}
/** Leaving Debug Desk: stop, and drop off the list straight away. */
export function crPresenceStop() {
  if (!beatTimer) return;
  clearInterval(beatTimer); beatTimer = null;
  document.removeEventListener("visibilitychange", onVisible);
  if (CR.me && !CR.hidden) crApi("POST", "/presence", { visible: false }).catch(() => {});
  CR.online = null;
}
export function crSetHidden(h) {
  CR.hidden = !!h;
  try { if (h) localStorage.setItem(HIDE_KEY, "1"); else localStorage.removeItem(HIDE_KEY); } catch (e) { /* storage blocked */ }
  beating = false; beat();
}

/* ---------- attachments ----------
   Up to 3 per question: screenshots (PNG, JPEG, WebP or GIF) and text files such as .txt, .log or .py.
   Big screenshots are shrunk in the browser first (longest side 1600 pixels, WebP), so they upload quickly. */
export const CR_MAX_FILES = 3;
const TEXT_EXT = /\.(txt|log|py|js|mjs|ts|json|md|csv|html|css|java|c|h|cpp|cs|go|rs|rb|php|sh|sql|xml|yml|yaml|ini|toml)$/i;
const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const toBase64 = blob => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(",")[1] || ""); r.onerror = no; r.readAsDataURL(blob); });
async function shrink(file) {
  if (file.type === "image/gif" || file.size < 350e3) return file;
  const img = await createImageBitmap(file).catch(() => null);
  if (!img) return file;
  const k = Math.min(1, 1600 / Math.max(img.width, img.height)), c = document.createElement("canvas");
  c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
  c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
  const out = await new Promise(ok => c.toBlob(ok, "image/webp", 0.85));
  return out && out.size < file.size ? new File([out], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" }) : file;
}
/** Turn a chosen or pasted file into an attachment, or throw an Error with a message for the learner. */
export async function crPrepareFile(file) {
  const name = file.name || "screenshot.png";
  if (IMAGE_TYPES.includes(file.type)) {
    const f = await shrink(file);
    if (f.size > 2.5 * 1024 * 1024) throw new Error(`“${name}” is too big. Pictures can be up to 2.5 MB.`);
    return { name: f.name || name, type: f.type, size: f.size, data: await toBase64(f), url: URL.createObjectURL(f), image: true };
  }
  if (TEXT_EXT.test(name) || file.type.startsWith("text/")) {
    if (!TEXT_EXT.test(name)) throw new Error(`“${name}” cannot be attached. Text files need a name ending in .txt, .log, .py or similar.`);
    if (file.size > 100 * 1024) throw new Error(`“${name}” is too big. Text files can be up to 100 KB.`);
    return { name, type: "text/plain", size: file.size, data: await toBase64(file), text: await file.text(), image: false };
  }
  throw new Error(`“${name}” cannot be attached. Attach a screenshot (PNG, JPEG, WebP or GIF) or a text file such as .txt, .log or .py.`);
}
/** Where an attachment of a question can be loaded from. */
export const crFileUrl = (qid, f) => (f.demoUrl ? f.demoUrl : "/server/community/debug/" + qid + "/file/" + f.i);
export const crSize = n => (n < 1024 ? n + " B" : n < 1048576 ? Math.round(n / 1024) + " KB" : (n / 1048576).toFixed(1) + " MB");

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
export function crForget() { crPresenceStop(); crRtClose(); CR.loaded = false; CR.loading = false; CR.me = null; }
