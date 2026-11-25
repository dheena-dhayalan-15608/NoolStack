/* Accounts and saving.
   Guest mode: progress is kept in this browser (the progress store writes it to localStorage).
   Signed in: when the site is hosted on Zoho Catalyst, progress is also saved to a
   Data Store table named Progress with three columns: owner, part and state.
   Progress is saved as text, split across several rows when it is long, so it can
   keep growing as more courses are added. part is the position of each piece.
   If anything about Catalyst is unavailable, the site quietly stays in guest mode.

   The Catalyst Web SDK (4.6.2) and /__catalyst/sdk/init.js are loaded by script tags in
   index.html. If either fails to load, index.html sets window.__nsNoCatalyst. */
const TABLE = "Progress", CHUNK = 9000;
let user = null, onCatalyst = false, rowIds = [], writing = false, pending = null, timer = null, hooks = {};
const status = c => { if (hooks.onStatus) hooks.onStatus(c); };
const owner = () => String(user.user_id).replace(/[^0-9A-Za-z_-]/g, "");

/** The folder the site is served from, such as "/" or "/app/". */
const basePath = () => location.pathname.replace(/[^/]*$/, "");

export async function start(h) {
  hooks = h || {};
  if (window.ZTP_PREVIEW || location.protocol === "file:") { status("guest"); if (hooks.onUser) hooks.onUser(null); return; }
  onCatalyst = !window.__nsNoCatalyst && !!(window.catalyst && window.catalyst.auth);
  if (!onCatalyst) { status("guest"); if (hooks.onUser) hooks.onUser(null); return; }
  try { const res = await window.catalyst.auth.isUserAuthenticated(); user = res && res.content ? res.content : null; } catch (e) { user = null; }
  if (hooks.onUser) hooks.onUser(user);
  if (!user) { status("signedout"); return; }
  try {
    const res = await window.catalyst.ZCatalystQL.executeQuery("SELECT ROWID, part, state FROM " + TABLE + " WHERE owner = '" + owner() + "'");
    const rows = (res && res.content ? res.content : []).map(x => x[TABLE]).filter(Boolean).sort((a, b) => Number(a.part) - Number(b.part));
    rowIds = rows.map(x => x.ROWID);
    let cloud = null;
    if (rows.length) { try { cloud = JSON.parse(rows.map(x => x.state || "").join("")); } catch (e) { cloud = null; } }
    if (cloud && hooks.onState) hooks.onState(cloud);
    status("cloud");
    const cur = hooks.getState ? hooks.getState() : null;
    if (cur && cur.t && (!cloud || cur.t > (cloud.t || 0))) push(cur);
  } catch (e) { status("clouderror"); }
}

export function push(state) {
  if (!user || !onCatalyst) return;
  pending = JSON.stringify(state);
  clearTimeout(timer);
  timer = setTimeout(flush, 1200);
}
async function flush() {
  if (writing || pending === null) return;
  const body = pending;
  pending = null;
  writing = true;
  try {
    const table = window.catalyst.table.tableId(TABLE), parts = [];
    for (let p = 0; p < body.length; p += CHUNK) parts.push(body.slice(p, p + CHUNK));
    const n = Math.max(parts.length, rowIds.length);
    for (let p = 0; p < n; p++) {
      const text = parts[p] || "";
      if (rowIds[p]) { await table.updateRow([{ ROWID: rowIds[p], part: p, state: text }]); }
      else { const res = await table.addRow([{ owner: owner(), part: p, state: text }]); if (res && res.content && res.content[0]) rowIds[p] = res.content[0].ROWID; }
    }
    status("cloud");
  } catch (e) { status("clouderror"); }
  writing = false;
  if (pending !== null) flush();
}

/* The sign-in box uses NoolStack's look (css/embeddediframe.css), and "Forgot password" opens inside
   the same box with a matching look (css/forgotpwd.css). After signing in, Catalyst returns the learner
   to the Account page (service_url); without it, Catalyst sends them to /app/, which is blank on Slate.
   Paths are worked out from where the site is hosted. */
export function signIn(elementId) {
  if (!onCatalyst) return;
  const base = basePath();
  window.catalyst.auth.signIn(elementId, {
    service_url: base + "#account",
    css_url: base + "css/embeddediframe.css",
    is_customize_forgot_password: true,
    forgot_password_id: elementId,
    forgot_password_css_url: base + "css/forgotpwd.css"
  });
}
export function signOut() { if (onCatalyst) window.catalyst.auth.signOut(location.origin + location.pathname); }
export function signUp(d) {
  if (!onCatalyst) return Promise.reject(new Error("Accounts are not available here"));
  return window.catalyst.auth.signUp({ first_name: d.first, last_name: d.last, email_id: d.email, platform_type: "web", redirect_url: location.origin + location.pathname });
}
export function info() { return { user, onCatalyst }; }

/** Delete the signed-in learner's account on the server (the community function deletes their saved
    progress, votes and member name, anonymises their posts, and deletes the Catalyst user).
    Saving to the account stops first, so nothing is written back afterwards. */
export async function deleteAccount() {
  if (!onCatalyst || !user) throw new Error("You need to be signed in to delete your account.");
  clearTimeout(timer);
  pending = null;
  const headers = { "Content-Type": "application/json" }, m = document.cookie.match(/(?:^|;\s*)ZD_CSRF_TOKEN=([^;]+)/);
  if (m) headers["X-ZCSRF-TOKEN"] = "zd_csrparam=" + decodeURIComponent(m[1]);
  let r;
  try { r = await fetch("/server/community/account/delete", { method: "POST", credentials: "same-origin", headers, body: JSON.stringify({ confirm: "DELETE" }) }); }
  catch (e) { throw new Error("Could not reach NoolStack. Check your connection and try again."); }
  let d = {};
  try { d = await r.json(); } catch (e) { /* not JSON */ }
  if (!r.ok) throw new Error(d.error || "Your account could not be deleted. Please try again.");
  user = null;
  rowIds = [];
}
