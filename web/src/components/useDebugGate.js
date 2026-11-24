/* Debug Desk is for members only. This works out what a Debug Desk page should show first:
   "sign in", "loading", "error", "join", or "open" once the learner has joined.
   It also starts the check of who has joined, and the live updates. */
import { computed, watchEffect } from "vue";
import { useAuth } from "../stores/auth.js";
import { CR, crStart, crRtStart } from "../services/debugdesk.js";

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
  watchEffect(() => { if (state.value === "open") crRtStart(); });
  return state;
}
