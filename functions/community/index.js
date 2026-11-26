"use strict";
/* NoolStack Debug Desk: questions and answers about code, for signed-in community members.
   Catalyst Advanced I/O function, reached at /server/community. Every route needs a signed-in user
   who has joined the community. Email addresses are never sent to other members. */
const express = require("express");
const catalyst = require("zcatalyst-sdk-node");
const { ZCAuth } = require("@zcatalyst/auth-admin");
const { DataStreams } = require("@zcatalyst/datastreams");
const app = express();
const crypto = require("crypto");
/* Posting a question can carry up to 3 attachments (sent as base64), so that one route takes up to 8 MB;
   everything else stays small. */
const smallJson = express.json({ limit: "64kb" }), bigJson = express.json({ limit: "8mb" });
app.use((req, res, next) => (req.method === "POST" && req.path === "/debug" ? bigJson : smallJson)(req, res, next));

const env = k => process.env[k] || "";
const admins = () => env("ADMIN_EMAILS").split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
const now = () => Date.now();
const digits = v => String(v || "").replace(/\D/g, "");
const clean = (v, max) => String(v || "").replace(/\u0000/g, "").trim().slice(0, max);
const rows = (res, t) => (res || []).map(r => r[t]).filter(Boolean);

async function ctx(req) {
  const db = catalyst.initialize(req, { scope: "admin" });
  let user = null;
  try { user = await catalyst.initialize(req).userManagement().getCurrentUser(); } catch (e) { user = null; }
  return { db, user };
}
const q = (db, sql) => db.zcql().executeZCQLQuery(sql);
const table = (db, t) => db.datastore().table(t);
/* Every route needs the member row, so it is kept for 5 minutes in this function instance, which saves a
   Data Store read on most requests. Joining and deleting an account update it. */
const memberCache = new Map();
async function member(db, uid) {
  const hit = memberCache.get(uid);
  if (hit && now() - hit.at < 300e3) return hit.m;
  const m = rows(await q(db, `SELECT ROWID, user_id, name FROM Members WHERE user_id = '${uid}'`), "Members")[0] || null;
  memberCache.set(uid, { m, at: now() });
  return m;
}
/* ---------- real time, through Catalyst Data Streams ----------
   Events only say that a question has new activity; the browser then fetches it through its
   signed-in session, where the usual permission checks apply. */
const dsApp = (req, scope) => new DataStreams(new ZCAuth().init(req, scope ? { type: "advancedio", scope } : { type: "advancedio" }));
async function publish(req, ev) {
  if (!env("DS_CHANNEL_ID")) return;
  try { await dsApp(req, "admin").publishData(env("DS_CHANNEL_ID"), JSON.stringify(Object.assign({ at: Date.now() }, ev))); }
  catch (e) { console.error("publish failed", e && e.message); }
}

/* simple per-member rate limits, kept in memory for this function instance */
const hits = new Map();
function limited(key, max, perMs) {
  const t = now(), list = (hits.get(key) || []).filter(x => t - x < perMs);
  if (list.length >= max) return true;
  list.push(t); hits.set(key, list); return false;
}
const route = fn => async (req, res) => {
  try {
    const c = await ctx(req);
    if (!c.user) return res.status(401).json({ error: "Sign in to use Debug Desk." });
    c.uid = digits(c.user.user_id); c.admin = admins().includes(String(c.user.email_id || "").toLowerCase());
    c.me = await member(c.db, c.uid);
    await fn(req, res, c);
  } catch (e) { console.error(e); res.status(500).json({ error: "Something went wrong. Please try again." }); }
};
const memberOnly = fn => route(async (req, res, c) => {
  if (!c.me) return res.status(403).json({ error: "Join the community first." });
  await fn(req, res, c);
});

/* ---------- membership ---------- */
app.get("/me", route(async (req, res, c) => res.json({ member: c.me ? { id: c.me.user_id, name: c.me.name } : null, admin: c.admin })));
/* A WebSocket token for this member, so their browser can listen to the channel.
   When there is no token to give, the answer is always a calm 200 with demo: true. Copies of the site
   from before 26 November 2026 asked again at once after any other answer, in a loop; "demo" makes them
   stop. The current site ignores "demo" here and waits before asking again. */
app.get("/rt", async (req, res) => {
  const off = () => res.json({ enabled: false, demo: true });
  try {
    if (!env("DS_CHANNEL_ID")) return off();
    const c = await ctx(req);
    if (!c.user) return off();
    const uid = digits(c.user.user_id);
    if (!(await member(c.db, uid))) return off();
    const t = await dsApp(req).getTokenPair(env("DS_CHANNEL_ID"), { userId: uid });
    res.json({ enabled: true, url: t.url, wss: t["wss-id"], key: t.key });
  } catch (e) { console.error("token pair", e && e.message); off(); }
});
app.post("/join", route(async (req, res, c) => {
  const name = clean(req.body.name, 40);
  if (name.length < 2) return res.status(400).json({ error: "Choose a display name of at least 2 characters." });
  if (/@|https?:/i.test(name)) return res.status(400).json({ error: "A display name cannot contain an email address or link." });
  let row;
  if (c.me) { await table(c.db, "Members").updateRow({ ROWID: c.me.ROWID, name }); row = Object.assign({}, c.me, { name }); }
  else row = await table(c.db, "Members").insertRow({ user_id: c.uid, name });
  memberCache.set(c.uid, { m: { ROWID: row.ROWID, user_id: c.uid, name }, at: now() });
  res.json({ member: { id: c.uid, name } });
}));

/* ---------- "Active now": members with a Debug Desk page open ----------
   Kept in Catalyst Cache as one small map { user id: [display name, last seen] }. Each open page says
   "I am here" once a minute while it is showing; anyone not heard from for 3 minutes drops off. A
   member who switches off "Show me as active" sends visible: false and is left out. Two pages writing
   at the same moment can drop someone for a minute; their next "I am here" puts them back.
   When the list changes, it is sent to everyone on the live channel, so the lists update at once. */
const ONLINE_KEY = "debugdesk-online", ONLINE_FOR = 3 * 60e3;
const cacheSeg = req => catalyst.initialize(req, { scope: "admin" }).cache().segment();
const onlineList = map => Object.entries(map).map(([id, v]) => ({ id, name: v[0] })).sort((a, b) => a.name.localeCompare(b.name));
app.post("/presence", memberOnly(async (req, res, c) => {
  if (limited("presence:" + c.uid, 6, 60e3)) return res.status(429).json({ error: "Please slow down." });
  let map = {};
  try { map = JSON.parse((await cacheSeg(req).getValue(ONLINE_KEY)) || "{}") || {}; } catch (e) { map = {}; }
  const t = now(), before = onlineList(map).map(x => x.id + x.name).join();
  for (const [id, v] of Object.entries(map)) if (!Array.isArray(v) || t - Number(v[1]) > ONLINE_FOR) delete map[id];
  if (req.body.visible === false) delete map[c.uid]; else map[c.uid] = [c.me.name, t];
  try { await cacheSeg(req).put(ONLINE_KEY, JSON.stringify(map), 1); } catch (e) { console.error("presence put", e && e.message); }
  const list = onlineList(map);
  if (list.map(x => x.id + x.name).join() !== before) await publish(req, { t: "presence", list });
  res.json({ list });
}));

/* ---------- the AI check: posts must be about learning ---------- */
async function aiCheck(title, body, kind, files) {
  if (!env("ANTHROPIC_API_KEY")) return { ok: false, reason: "Posting is paused: the content check is not set up yet." };
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": env("ANTHROPIC_API_KEY"), "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: env("MODERATION_MODEL") || "claude-haiku-5-5", max_tokens: 200,
      system: "You review posts for NoolStack, a free learning community for computing and programming. Allow a post only if it is educational: a question, explanation, learning experience, resource, project or discussion about learning technology. Reject spam, adverts, personal attacks, harassment, adult or violent content, politics, religion, personal contact details, and anything unrelated to learning. Reply with JSON only, no other text: {\"allow\": true or false, \"reason\": \"one short sentence for the author\"}.",
      messages: [{ role: "user", content: aiContent(`${kind === "debug" ? "This is for Debug Desk, a question-and-answer board for programming and computing problems. Code, error messages, stack traces and screenshots of code, terminals, error dialogs or software are expected and fine. Reject an attached picture that is not about computing, or that shows personal details such as passwords, keys, phone numbers or ID cards.\n\n" : ""}Title: ${title}\n\nPost:\n${body}`, files) }]
    })
  });
  if (!r.ok) return { ok: false, reason: "The content check is busy. Please try again in a minute." };
  const d = await r.json(), text = (d.content || []).filter(x => x.type === "text").map(x => x.text).join("").replace(/```json|```/g, "").trim();
  try { const v = JSON.parse(text); return { ok: !!v.allow, reason: String(v.reason || "").slice(0, 300) }; }
  catch (e) { return { ok: false, reason: "The content check could not read this post. Please try rewording it." }; }
}

/* the post, then each attachment: pictures as images, text files as text (trimmed) */
function aiContent(text, files) {
  if (!files || !files.length) return text;
  const parts = [{ type: "text", text }];
  files.forEach((f, i) => {
    if (f.image) parts.push({ type: "text", text: `Attachment ${i + 1}: picture "${f.name}"` }, { type: "image", source: { type: "base64", media_type: f.type, data: f.buf.toString("base64") } });
    else parts.push({ type: "text", text: `Attachment ${i + 1}: text file "${f.name}"\n${f.buf.toString("utf8").slice(0, 6000)}` });
  });
  return parts;
}

/* ---------- Debug Desk attachments: screenshots and text files, kept in the private Stratus bucket ----------
   Objects get random names (f/<24 hex characters>), and are only handed out through this function,
   to members, for published questions. Pictures are checked by their first bytes, not only their type;
   text files are always served as plain text, so a file can never run as a web page. */
const bucket = req => catalyst.initialize(req, { scope: "admin" }).stratus().bucket(env("DEBUG_BUCKET") || "debugdesk");
const MAX_FILES = 3, MAX_IMAGE = 2.5 * 1024 * 1024, MAX_TEXT = 100 * 1024;
const TEXT_EXT = /\.(txt|log|py|js|mjs|ts|json|md|csv|html|css|java|c|h|cpp|cs|go|rs|rb|php|sh|sql|xml|yml|yaml|ini|toml)$/i;
const MAGIC = { "image/png": b => b.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])), "image/jpeg": b => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  "image/gif": b => b.slice(0, 4).toString("latin1") === "GIF8", "image/webp": b => b.slice(0, 4).toString("latin1") === "RIFF" && b.slice(8, 12).toString("latin1") === "WEBP" };
const safeName = n => clean(n, 80).replace(/[^\w.\- ()]/g, "_") || "file";
/** Check the attachments sent with a question. Returns { files } or { error }. */
function readFiles(list) {
  if (!Array.isArray(list) || !list.length) return { files: [] };
  if (list.length > MAX_FILES) return { error: `Attach up to ${MAX_FILES} files.` };
  const files = [];
  for (const f of list) {
    const name = safeName(f && f.name), type = String((f && f.type) || "");
    let buf;
    try { buf = Buffer.from(String((f && f.data) || ""), "base64"); } catch (e) { return { error: `“${name}” could not be read.` }; }
    if (!buf.length) return { error: `“${name}” is empty.` };
    if (MAGIC[type]) {
      if (!MAGIC[type](buf)) return { error: `“${name}” is not the picture it says it is.` };
      if (buf.length > MAX_IMAGE) return { error: `“${name}” is too big. Pictures can be up to 2.5 MB.` };
      files.push({ name, type, buf, image: true });
    } else if (TEXT_EXT.test(name)) {
      if (buf.length > MAX_TEXT) return { error: `“${name}” is too big. Text files can be up to 100 KB.` };
      if (buf.includes(0)) return { error: `“${name}” does not look like a text file.` };
      files.push({ name, type: "text/plain", buf, image: false });
    } else return { error: `“${name}” cannot be attached. Attach a screenshot (PNG, JPEG, WebP or GIF) or a text file such as .txt, .log or .py.` };
  }
  return { files };
}
async function storeFiles(req, files) {
  const out = [], b = bucket(req);
  for (const f of files) {
    const k = crypto.randomBytes(12).toString("hex");
    await b.putObject("f/" + k, f.buf, { contentType: f.type });
    out.push({ k, n: f.name, t: f.type, s: f.buf.length });
  }
  return out;
}
async function dropFiles(req, list) {
  for (const f of list) { try { await bucket(req).deleteObject("f/" + f.k); } catch (e) { console.error("drop file", e && e.message); } }
}
const fileList = v => { try { const l = JSON.parse(v || "[]"); return Array.isArray(l) ? l : []; } catch (e) { return []; } };

/* ---------- Debug Desk: questions, answers, votes and accepted answers (members only) ---------- */
const TAG_RE = /^[a-z0-9][a-z0-9+#.-]{0,23}$/;
const cleanTags = v => [...new Set(String(v || "").toLowerCase().split(/[\s,]+/).map(t => t.replace(/^#/, "")).filter(t => TAG_RE.test(t)))].slice(0, 5);
async function scores(db, kind, ids, uid) {
  if (!ids.length) return { score: {}, mine: {} };
  const vs = rows(await q(db, `SELECT item_id, user_id, value FROM DebugVotes WHERE item_kind = '${kind}' AND item_id IN (${ids.map(i => `'${i}'`).join(",")})`), "DebugVotes");
  const score = {}, mine = {}; vs.forEach(v => { score[v.item_id] = (score[v.item_id] || 0) + Number(v.value); if (v.user_id === uid) mine[v.item_id] = Number(v.value); }); return { score, mine };
}
const qOut = (x, s, m) => ({ id: x.ROWID, user: { id: x.user_id, name: x.name }, title: x.title, body: x.body, tags: String(x.tags || "").split(",").filter(Boolean), accepted: x.accepted_id || "", answers: Number(x.answer_count || 0), score: s || 0, myVote: m || 0, at: x.CREATEDTIME,
  files: fileList(x.files).map((f, i) => ({ i, name: f.n, type: f.t, size: f.s })) });
app.get("/debug", memberOnly(async (req, res, c) => {
  let list = rows(await q(c.db, "SELECT ROWID, user_id, name, title, body, tags, accepted_id, answer_count, files, CREATEDTIME FROM DebugQuestions WHERE status = 'published' ORDER BY ROWID DESC"), "DebugQuestions");
  const term = clean(req.query.q, 100).toLowerCase(), tag = clean(req.query.tag, 24).toLowerCase();
  if (term) list = list.filter(x => (x.title + " " + x.body).toLowerCase().includes(term));
  if (tag) list = list.filter(x => String(x.tags || "").split(",").includes(tag));
  if (req.query.sort === "unanswered") list = list.filter(x => !Number(x.answer_count));
  list = list.slice(0, 200);
  const sc = await scores(c.db, "q", list.map(x => x.ROWID), c.uid);
  let out = list.map(x => qOut(x, sc.score[x.ROWID], sc.mine[x.ROWID]));
  if (req.query.sort === "votes") out.sort((a, b) => b.score - a.score);
  res.json({ questions: out.slice(0, 100).map(x => Object.assign(x, { body: x.body.slice(0, 300) })) });
}));
app.get("/debug/:id", memberOnly(async (req, res, c) => {
  const id = digits(req.params.id);
  const x = rows(await q(c.db, `SELECT ROWID, user_id, name, title, body, tags, accepted_id, answer_count, files, CREATEDTIME FROM DebugQuestions WHERE ROWID = '${id}' AND status = 'published'`), "DebugQuestions")[0];
  if (!x) return res.status(404).json({ error: "Question not found." });
  const ans = rows(await q(c.db, `SELECT ROWID, user_id, name, body, CREATEDTIME FROM DebugAnswers WHERE question_id = '${id}' AND status = 'published'`), "DebugAnswers");
  const qs = await scores(c.db, "q", [id], c.uid), as = await scores(c.db, "a", ans.map(a => a.ROWID), c.uid);
  const answers = ans.map(a => ({ id: a.ROWID, user: { id: a.user_id, name: a.name }, body: a.body, score: as.score[a.ROWID] || 0, myVote: as.mine[a.ROWID] || 0, at: a.CREATEDTIME }))
    .sort((a, b) => (b.id === x.accepted_id) - (a.id === x.accepted_id) || b.score - a.score);
  res.json({ question: qOut(x, qs.score[id], qs.mine[id]), answers });
}));
app.post("/debug", memberOnly(async (req, res, c) => {
  const title = clean(req.body.title, 150), body = clean(req.body.body, 15000), tags = cleanTags(req.body.tags);
  if (title.length < 10) return res.status(400).json({ error: "Write a title of at least 10 characters that sums up the problem." });
  if (body.length < 20) return res.status(400).json({ error: "Describe the problem: what you tried, and what happened." });
  if (!tags.length) return res.status(400).json({ error: "Add at least one tag, such as python." });
  const att = readFiles(req.body.files);
  if (att.error) return res.status(400).json({ error: att.error });
  if (limited("debugq:" + c.uid, 10, 864e5)) return res.status(429).json({ error: "You have asked a lot today. Please try again tomorrow." });
  const check = await aiCheck(title, body, "debug", att.files);
  if (!check.ok) return res.status(422).json({ error: "This question was not published. " + check.reason });
  let files = [];
  try { files = await storeFiles(req, att.files); }
  catch (e) { console.error("store files", e && e.message); return res.status(500).json({ error: "The attachments could not be saved. Please try again, or post without them." }); }
  let row;
  try { row = await table(c.db, "DebugQuestions").insertRow({ user_id: c.uid, name: c.me.name, title, body, tags: tags.join(","), accepted_id: "", answer_count: 0, status: "published", files: JSON.stringify(files) }); }
  catch (e) { await dropFiles(req, files); throw e; }
  await publish(req, { t: "debug", q: row.ROWID });
  res.json({ id: row.ROWID });
}));
/* one attachment of a published question, for members */
app.get("/debug/:id/file/:i", memberOnly(async (req, res, c) => {
  const id = digits(req.params.id), i = Number(digits(req.params.i));
  const x = rows(await q(c.db, `SELECT ROWID, files FROM DebugQuestions WHERE ROWID = '${id}' AND status = 'published'`), "DebugQuestions")[0];
  const f = x && fileList(x.files)[i];
  if (!f || !/^[0-9a-f]{24}$/.test(f.k)) return res.status(404).json({ error: "File not found." });
  const stream = await bucket(req).getObject("f/" + f.k);
  res.set({ "Content-Type": MAGIC[f.t] ? f.t : "text/plain; charset=utf-8", "X-Content-Type-Options": "nosniff", "Content-Security-Policy": "default-src 'none'; sandbox",
    "Cache-Control": "private, max-age=86400", "Content-Disposition": `inline; filename="${String(f.n).replace(/"/g, "")}"` });
  stream.on("error", e => { console.error("file stream", e && e.message); res.end(); });
  stream.pipe(res);
}));
app.post("/debug/:id/answer", memberOnly(async (req, res, c) => {
  const id = digits(req.params.id), body = clean(req.body.body, 15000);
  const x = rows(await q(c.db, `SELECT ROWID, title, answer_count FROM DebugQuestions WHERE ROWID = '${id}' AND status = 'published'`), "DebugQuestions")[0];
  if (!x) return res.status(404).json({ error: "Question not found." });
  if (body.length < 15) return res.status(400).json({ error: "Write a fuller answer: explain the fix, not just the code." });
  if (limited("debuga:" + c.uid, 30, 864e5)) return res.status(429).json({ error: "You have answered a lot today. Please try again tomorrow." });
  const check = await aiCheck("Answer to: " + x.title, body, "debug");
  if (!check.ok) return res.status(422).json({ error: "This answer was not published. " + check.reason });
  const row = await table(c.db, "DebugAnswers").insertRow({ question_id: id, user_id: c.uid, name: c.me.name, body, status: "published" });
  await table(c.db, "DebugQuestions").updateRow({ ROWID: id, answer_count: Number(x.answer_count || 0) + 1 });
  await publish(req, { t: "debug", q: id, a: row.ROWID });
  res.json({ id: row.ROWID });
}));
app.post("/debug/vote", memberOnly(async (req, res, c) => {
  const kind = req.body.kind === "a" ? "a" : "q", id = digits(req.body.id), value = Number(req.body.value) === -1 ? -1 : 1;
  const t = kind === "q" ? "DebugQuestions" : "DebugAnswers";
  const item = rows(await q(c.db, `SELECT ROWID, user_id FROM ${t} WHERE ROWID = '${id}'`), t)[0];
  if (!item) return res.status(404).json({ error: "Not found." });
  if (item.user_id === c.uid) return res.status(400).json({ error: "You cannot vote on your own post." });
  const mine = rows(await q(c.db, `SELECT ROWID, value FROM DebugVotes WHERE item_kind = '${kind}' AND item_id = '${id}' AND user_id = '${c.uid}'`), "DebugVotes")[0];
  let now = value;
  if (mine && Number(mine.value) === value) { await table(c.db, "DebugVotes").deleteRow(mine.ROWID); now = 0; }
  else if (mine) await table(c.db, "DebugVotes").updateRow({ ROWID: mine.ROWID, value });
  else await table(c.db, "DebugVotes").insertRow({ item_kind: kind, item_id: id, user_id: c.uid, value });
  const sc = await scores(c.db, kind, [id], c.uid);
  res.json({ score: sc.score[id] || 0, myVote: now });
}));
app.post("/debug/:id/accept", memberOnly(async (req, res, c) => {
  const id = digits(req.params.id), answer = digits(req.body.answer);
  const x = rows(await q(c.db, `SELECT ROWID, user_id, accepted_id FROM DebugQuestions WHERE ROWID = '${id}'`), "DebugQuestions")[0];
  if (!x) return res.status(404).json({ error: "Question not found." });
  if (x.user_id !== c.uid) return res.status(403).json({ error: "Only the person who asked can accept an answer." });
  const accepted = x.accepted_id === answer ? "" : answer;
  await table(c.db, "DebugQuestions").updateRow({ ROWID: id, accepted_id: accepted });
  await publish(req, { t: "debug", q: id });
  res.json({ accepted });
}));

/* ---------- safety: reports, and the moderator view ---------- */
app.post("/report", memberOnly(async (req, res, c) => {
  const kind = ["debugq", "debuga"].includes(req.body.kind) ? req.body.kind : null;
  if (!kind) return res.status(400).json({ error: "Unknown report." });
  if (limited("report:" + c.uid, 20, 864e5)) return res.status(429).json({ error: "Please try again later." });
  await table(c.db, "Reports").insertRow({ reporter_id: c.uid, reporter_name: c.me.name, kind, item_id: digits(req.body.id), reason: clean(req.body.reason, 500), excerpt: clean(req.body.excerpt, 300), status: "open" });
  res.json({ ok: true });
}));
app.get("/admin/reports", route(async (req, res, c) => {
  if (!c.admin) return res.status(403).json({ error: "Moderators only." });
  const list = rows(await q(c.db, "SELECT ROWID, reporter_name, kind, item_id, reason, excerpt, status, CREATEDTIME FROM Reports WHERE status = 'open' ORDER BY ROWID DESC"), "Reports");
  res.json({ reports: list.map(r => ({ id: r.ROWID, by: r.reporter_name, kind: r.kind, item: r.item_id, reason: r.reason, excerpt: r.excerpt, at: r.CREATEDTIME })) });
}));
app.post("/admin/reports/:id", route(async (req, res, c) => {
  if (!c.admin) return res.status(403).json({ error: "Moderators only." });
  const r = rows(await q(c.db, `SELECT ROWID, kind, item_id FROM Reports WHERE ROWID = '${digits(req.params.id)}'`), "Reports")[0];
  if (!r) return res.status(404).json({ error: "Not found." });
  if (req.body.remove) {
    const t = { debugq: "DebugQuestions", debuga: "DebugAnswers" }[r.kind];
    if (t) await table(c.db, t).updateRow({ ROWID: r.item_id, status: "removed" });
    if (r.kind === "debugq") {
      const x = rows(await q(c.db, `SELECT ROWID, files FROM DebugQuestions WHERE ROWID = '${digits(r.item_id)}'`), "DebugQuestions")[0];
      if (x) await dropFiles(req, fileList(x.files));
    }
  }
  await table(c.db, "Reports").updateRow({ ROWID: r.ROWID, status: req.body.remove ? "removed" : "dismissed" });
  res.json({ ok: true });
}));

/* ---------- deleting an account ----------
   Any signed-in learner can delete their own account. Their saved progress, votes and member name
   are deleted. Their Debug Desk questions and answers stay, so other members' answers still make
   sense, but are shown as written by "Deleted member" and no longer linked to them. Finally the
   Catalyst user itself is deleted, so the email address and sign-in are gone too. */
const DELETED = "Deleted member";
/* Run sql (which must select ROWID) and hand each page of rows to fn, until no rows match.
   fn has to make the rows stop matching (delete or change them), or the loop stops after 50 pages. */
async function eachPage(db, sql, t, fn) {
  for (let i = 0; i < 50; i++) {
    const list = rows(await q(db, sql + " LIMIT 100"), t);
    if (!list.length) return;
    await fn(list);
  }
}
app.post("/account/delete", route(async (req, res, c) => {
  if (String(req.body.confirm || "") !== "DELETE") return res.status(400).json({ error: "Type DELETE to confirm." });
  const uid = c.uid, owner = String(c.user.user_id).replace(/[^0-9A-Za-z_-]/g, "");
  const wipe = t => list => table(c.db, t).deleteRows(list.map(r => r.ROWID));
  const anon = (t, idCol, nameCol) => list => table(c.db, t).updateRows(list.map(r => ({ ROWID: r.ROWID, [idCol]: "deleted", [nameCol]: DELETED })));
  await eachPage(c.db, `SELECT ROWID FROM Progress WHERE owner = '${owner}'`, "Progress", wipe("Progress"));
  await eachPage(c.db, `SELECT ROWID FROM DebugVotes WHERE user_id = '${uid}'`, "DebugVotes", wipe("DebugVotes"));
  await eachPage(c.db, `SELECT ROWID FROM DebugQuestions WHERE user_id = '${uid}'`, "DebugQuestions", anon("DebugQuestions", "user_id", "name"));
  await eachPage(c.db, `SELECT ROWID FROM DebugAnswers WHERE user_id = '${uid}'`, "DebugAnswers", anon("DebugAnswers", "user_id", "name"));
  await eachPage(c.db, `SELECT ROWID FROM Reports WHERE reporter_id = '${uid}'`, "Reports", anon("Reports", "reporter_id", "reporter_name"));
  if (c.me) await table(c.db, "Members").deleteRow(c.me.ROWID);
  memberCache.delete(uid);
  try { await c.db.userManagement().deleteUser(c.user.user_id); }
  catch (e) {
    console.error("delete user", e && e.message);
    return res.status(500).json({ error: "Your progress and posts were cleared, but the account itself could not be deleted. Please contact us and we will finish it." });
  }
  res.json({ ok: true });
}));

module.exports = app;
