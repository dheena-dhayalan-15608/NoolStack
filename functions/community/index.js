"use strict";
/* NoolStack Debug Desk: questions and answers about code, for signed-in community members.
   Catalyst Advanced I/O function, reached at /server/community. Every route needs a signed-in user
   who has joined the community. Email addresses are never sent to other members. */
const express = require("express");
const catalyst = require("zcatalyst-sdk-node");
const { ZCAuth } = require("@zcatalyst/auth-admin");
const { DataStreams } = require("@zcatalyst/datastreams");
const app = express();
app.use(express.json({ limit: "64kb" }));

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
async function member(db, uid) { return rows(await q(db, `SELECT ROWID, user_id, name FROM Members WHERE user_id = '${uid}'`), "Members")[0] || null; }
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
/* a WebSocket token for this member, so their browser can listen to the channel */
app.get("/rt", memberOnly(async (req, res, c) => {
  if (!env("DS_CHANNEL_ID")) return res.json({ enabled: false });
  try { const t = await dsApp(req).getTokenPair(env("DS_CHANNEL_ID"), { userId: c.uid }); res.json({ enabled: true, url: t.url, wss: t["wss-id"], key: t.key }); }
  catch (e) { console.error("token pair", e && e.message); res.json({ enabled: false }); }
}));
/* "I am here": keeps the online list fresh */
/* "I am typing": sent at most once every 2 seconds */
app.post("/join", route(async (req, res, c) => {
  const name = clean(req.body.name, 40);
  if (name.length < 2) return res.status(400).json({ error: "Choose a display name of at least 2 characters." });
  if (/@|https?:/i.test(name)) return res.status(400).json({ error: "A display name cannot contain an email address or link." });
  if (c.me) await table(c.db, "Members").updateRow({ ROWID: c.me.ROWID, name });
  else await table(c.db, "Members").insertRow({ user_id: c.uid, name });
  res.json({ member: { id: c.uid, name } });
}));

/* ---------- the AI check: posts must be about learning ---------- */
async function aiCheck(title, body, kind) {
  if (!env("ANTHROPIC_API_KEY")) return { ok: false, reason: "Posting is paused: the content check is not set up yet." };
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": env("ANTHROPIC_API_KEY"), "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: env("MODERATION_MODEL") || "claude-haiku-5-5", max_tokens: 200,
      system: "You review posts for NoolStack, a free learning community for computing and programming. Allow a post only if it is educational: a question, explanation, learning experience, resource, project or discussion about learning technology. Reject spam, adverts, personal attacks, harassment, adult or violent content, politics, religion, personal contact details, and anything unrelated to learning. Reply with JSON only, no other text: {\"allow\": true or false, \"reason\": \"one short sentence for the author\"}.",
      messages: [{ role: "user", content: `${kind === "debug" ? "This is for Debug Desk, a question-and-answer board for programming and computing problems. Code, error messages and stack traces are expected and fine.\n\n" : ""}Title: ${title}\n\nPost:\n${body}` }]
    })
  });
  if (!r.ok) return { ok: false, reason: "The content check is busy. Please try again in a minute." };
  const d = await r.json(), text = (d.content || []).filter(x => x.type === "text").map(x => x.text).join("").replace(/```json|```/g, "").trim();
  try { const v = JSON.parse(text); return { ok: !!v.allow, reason: String(v.reason || "").slice(0, 300) }; }
  catch (e) { return { ok: false, reason: "The content check could not read this post. Please try rewording it." }; }
}

/* ---------- Debug Desk: questions, answers, votes and accepted answers (members only) ---------- */
const TAG_RE = /^[a-z0-9][a-z0-9+#.-]{0,23}$/;
const cleanTags = v => [...new Set(String(v || "").toLowerCase().split(/[\s,]+/).map(t => t.replace(/^#/, "")).filter(t => TAG_RE.test(t)))].slice(0, 5);
async function scores(db, kind, ids, uid) {
  if (!ids.length) return { score: {}, mine: {} };
  const vs = rows(await q(db, `SELECT item_id, user_id, value FROM DebugVotes WHERE item_kind = '${kind}' AND item_id IN (${ids.map(i => `'${i}'`).join(",")})`), "DebugVotes");
  const score = {}, mine = {}; vs.forEach(v => { score[v.item_id] = (score[v.item_id] || 0) + Number(v.value); if (v.user_id === uid) mine[v.item_id] = Number(v.value); }); return { score, mine };
}
const qOut = (x, s, m) => ({ id: x.ROWID, user: { id: x.user_id, name: x.name }, title: x.title, body: x.body, tags: String(x.tags || "").split(",").filter(Boolean), accepted: x.accepted_id || "", answers: Number(x.answer_count || 0), score: s || 0, myVote: m || 0, at: x.CREATEDTIME });
app.get("/debug", memberOnly(async (req, res, c) => {
  let list = rows(await q(c.db, "SELECT ROWID, user_id, name, title, body, tags, accepted_id, answer_count, CREATEDTIME FROM DebugQuestions WHERE status = 'published' ORDER BY ROWID DESC"), "DebugQuestions");
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
  const x = rows(await q(c.db, `SELECT ROWID, user_id, name, title, body, tags, accepted_id, answer_count, CREATEDTIME FROM DebugQuestions WHERE ROWID = '${id}' AND status = 'published'`), "DebugQuestions")[0];
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
  if (limited("debugq:" + c.uid, 10, 864e5)) return res.status(429).json({ error: "You have asked a lot today. Please try again tomorrow." });
  const check = await aiCheck(title, body, "debug");
  if (!check.ok) return res.status(422).json({ error: "This question was not published. " + check.reason });
  const row = await table(c.db, "DebugQuestions").insertRow({ user_id: c.uid, name: c.me.name, title, body, tags: tags.join(","), accepted_id: "", answer_count: 0, status: "published" });
  await publish(req, { t: "debug", q: row.ROWID });
  res.json({ id: row.ROWID });
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
  try { await c.db.userManagement().deleteUser(c.user.user_id); }
  catch (e) {
    console.error("delete user", e && e.message);
    return res.status(500).json({ error: "Your progress and posts were cleared, but the account itself could not be deleted. Please contact us and we will finish it." });
  }
  res.json({ ok: true });
}));

module.exports = app;
