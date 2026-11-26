/* Debug Desk is for members only. This works out what a Debug Desk page should show first:
   "sign in", "loading", "error", "join", or "open" once the learner has joined.
   It also starts the check of who has joined, and the live updates. */
import { computed, watch, watchEffect } from "vue";
import { useAuth } from "../stores/auth.js";
import { CR, crStart, crRtStart, crPresenceStart } from "../services/debugdesk.js";

export function useDebugGate() {
  const auth = useAuth();
  watchEffect(() => {
    if (!auth.ready || CR.loaded || CR.loading) return;
    CR.loading = true;
    crStart(auth.onCatalyst, !!auth.user).then(() => { CR.loading = false; });
  });
  const state = computed(() => {
    if (!auth.ready) return "loading";
    if (auth.onCatalyst && !auth.user) return "signin";
    if (!CR.loaded) return "loading";
    if (CR.err) return "error";
    if (!CR.me) return "join";
    return "open";
  });
  /* only when the page first becomes "open": crRtStart changes CR itself, so a watchEffect here would
     run it again after every failed try, calling the server in a loop */
  watch(state, s => { if (s === "open") { crRtStart(); crPresenceStart(); } }, { immediate: true });
  return state;
}
