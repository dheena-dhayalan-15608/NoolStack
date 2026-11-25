/* The Account page's open tab, and the address a sign-up link was sent to (kept while the site is open, as before).
   farewell: the learner has just deleted their account, so the Account page says goodbye instead of
   showing the sign-in box. Deleting ends with Catalyst's sign-out, which reloads the site, so the
   goodbye is remembered for that one reload in sessionStorage. */
import { reactive } from "vue";

const KEY = "noolstack-farewell";
export function rememberFarewell() { try { sessionStorage.setItem(KEY, "1"); } catch (e) { /* storage blocked */ } }
function takeFarewell() {
  try { const on = sessionStorage.getItem(KEY) === "1"; sessionStorage.removeItem(KEY); return on; } catch (e) { return false; }
}

export const acct = reactive({ tab: "in", signupDone: "", farewell: takeFarewell() });
