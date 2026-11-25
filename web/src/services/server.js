/* Calls to the community function (/server/community), shared by Debug Desk and the Account page.
   Requests other than GET carry Catalyst's anti-forgery header, built exactly as the Catalyst Web SDK
   builds it: X-ZCSRF-TOKEN: zd_csrparam=<value of the ZD_CSRF_TOKEN cookie>. */

function csrfToken() {
  for (const part of document.cookie.split(";")) {
    const kv = part.split("=");
    if (kv.length === 2 && kv[0].trim() === "ZD_CSRF_TOKEN" && kv[1].trim()) return kv[1].trim();
  }
  return "";
}

/** Call the community function. Throws an Error with a message fit to show the learner. */
export async function callServer(method, path, body, fallback) {
  const headers = { "Content-Type": "application/json" };
  if (method !== "GET") { const t = csrfToken(); if (t) headers["X-ZCSRF-TOKEN"] = "zd_csrparam=" + t; }
  let r;
  try { r = await fetch("/server/community" + path, { method, credentials: "same-origin", headers, body: method === "GET" ? undefined : JSON.stringify(body || {}) }); }
  catch (e) { throw new Error("Could not reach NoolStack. Check your connection and try again."); }
  let d = {};
  try { d = await r.json(); } catch (e) { /* not JSON */ }
  if (!r.ok) {
    /* the function's own errors have "error"; Catalyst's gateway errors look like {status:"failure", data:{message, error_code}} */
    const platform = d && d.data && (d.data.message || d.data.error_code);
    if (platform) console.warn("Catalyst refused " + method + " " + path + " (" + r.status + "): " + JSON.stringify(d.data));
    throw new Error(d.error || (platform ? (fallback || "Something went wrong.") + " (" + platform + ")" : (fallback || "Something went wrong. Please try again.") + " (error " + r.status + ")"));
  }
  return d;
}
