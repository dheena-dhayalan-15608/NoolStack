/* Who is signed in, and where progress is being saved. Wraps services/catalyst.js. */
import { defineStore } from "pinia";
import { ref, shallowRef, computed } from "vue";
import * as Store from "../services/catalyst.js";
import { useProgress } from "./progress.js";

const SYNC = {
  guest: "Guest mode. Progress is saved in this browser.",
  signedout: "Not signed in. Progress is saved in this browser.",
  cloud: "Signed in. Progress is saved to your account.",
  clouderror: "Signed in, but account storage could not be reached. Progress is saved in this browser."
};

export const useAuth = defineStore("auth", () => {
  const user = shallowRef(null);
  const onCatalyst = ref(false);
  /** Bumped each time the signed-in user is (re)checked, so pages can react. */
  const userVersion = ref(0);
  const syncText = ref("Progress is saved in this browser.");
  const ready = ref(false);

  function start() {
    const progress = useProgress();
    return Store.start({
      getState: () => progress.S,
      onState(d) { progress.adopt(d); },
      onStatus(code) { syncText.value = SYNC[code] || ""; },
      onUser(u) {
        user.value = u;
        onCatalyst.value = Store.info().onCatalyst;
        ready.value = true;
        userVersion.value++;
      }
    });
  }
  const accountLabel = computed(() => user.value ? (user.value.first_name || "Account") : "Sign in");
  /** Delete the account, clear this browser's copy of the progress, then sign out. */
  async function deleteAccount() {
    await Store.deleteAccount();
    useProgress().forgetLocal();
    try { localStorage.removeItem("noolstack-demo-debugdesk"); } catch (e) { /* storage blocked */ }
    user.value = null;
    userVersion.value++;
    Store.signOut();
  }
  return { user, onCatalyst, userVersion, syncText, ready, accountLabel, start, deleteAccount, signIn: Store.signIn, signUp: Store.signUp, signOut: Store.signOut };
});
