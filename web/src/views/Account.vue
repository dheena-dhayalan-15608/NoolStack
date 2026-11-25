<script setup>
/* Sign in (Catalyst's own sign-in box) or create an account (this site's form). Without Catalyst,
   the forms are shown switched off, as a preview. */
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { useAuth } from "../stores/auth.js";
import { useSettings } from "../stores/settings.js";
import { party } from "../services/feedback.js";
import DoneMsg from "../components/DoneMsg.vue";
import AuthArt from "../components/AuthArt.vue";
import { acct } from "../components/acctState.js";
import { LEGAL } from "../data/content.js";

const auth = useAuth();
const settings = useSettings();
const name = computed(() => { const u = auth.user; return u ? (((u.first_name || "") + " " + (u.last_name || "")).trim() || "a learner") : ""; });
const f = ref({ suF: "", suL: "", suE: "" }), errs = ref({ suF: "", suL: "", suE: "", suC: "" }), agreed = ref(false);
const note = ref({ show: false, cls: "fb", text: "" }), busy = ref(false), tried = ref(false);
const FIELDS = [["suF", "First name", "text", "given-name", ""], ["suL", "Last name", "text", "family-name", "If you use a single name, enter it here as well."], ["suE", "Email address", "email", "email", "We send a link to this address so you can set your password."]];

/* Catalyst's sign-in box is an iframe. Each page inside it (sign in, sign up, forgot password) starts
   as a blank white page until its styles load, so the box stays hidden behind a "Loading" line
   whenever one of its pages is loading. */
const loginLoading = ref(true);
let loginWatch = null, revealTimer = null;
function showWhenLoaded() { clearTimeout(revealTimer); requestAnimationFrame(() => { loginLoading.value = false; }); }
/* the box follows NoolStack's theme (the theme button), not only the browser's setting */
function themeFrame(f) {
  try { const d = f && f.contentDocument; if (d && d.documentElement) d.documentElement.setAttribute("data-theme", settings.shownTheme); } catch (e) { /* not reachable */ }
}
watch(() => settings.shownTheme, () => themeFrame(document.querySelector("#login iframe")));
/* while the box shows its "Forgot password" steps, the left panel shows a padlock instead of the mascot */
const frameForgot = ref(false);
function isForgotPage(f) {
  try { const d = f.contentDocument; return !!(d && d.querySelector(".recovery_container,.recovery_box")); } catch (e) { return false; }
}
/* "Contact administrator" (a forgot-password step): Zoho masks the administrator's address
   (no****ck@zoho****.i*). It is NoolStack's public contact address, shown in the footer anyway, so the
   box shows it in full, as an email link. The box is on NoolStack's own address, so this page can reach it. */
function showAdminEmail(f) {
  let d;
  try { d = f.contentDocument; } catch (e) { return; }
  if (!d || !d.body || !LEGAL.email) return;
  const fix = () => {
    const b = d.querySelector("#org_contact_support .head_info b:nth-of-type(2)");
    if (!b || !b.textContent.includes("*")) return;
    const a = d.createElement("a");
    a.href = "mailto:" + LEGAL.email;
    a.textContent = LEGAL.email;
    a.style.fontWeight = "700";
    b.replaceChildren(a);
  };
  fix();
  new MutationObserver(fix).observe(d.body, { childList: true, subtree: true, characterData: true });
}
const artMode = computed(() => (acct.tab === "in" && frameForgot.value ? "forgot" : acct.tab));
function hookFrame(f) {
  if (f.__nsHooked) return;
  f.__nsHooked = true;
  loginLoading.value = true;
  revealTimer = setTimeout(showWhenLoaded, 10000);
  f.addEventListener("load", () => {
    try { f.contentWindow.addEventListener("pagehide", () => { loginLoading.value = true; clearTimeout(revealTimer); revealTimer = setTimeout(showWhenLoaded, 10000); }); } catch (e) { /* not reachable */ }
    themeFrame(f);
    frameForgot.value = isForgotPage(f);
    showAdminEmail(f);
    showWhenLoaded();
  });
}
function mountSignIn() {
  if (!auth.user && auth.onCatalyst && acct.tab === "in") nextTick(() => {
    const box = document.getElementById("login");
    /* only once per box: asking Catalyst again would rebuild the iframe and flash */
    if (!box || box.querySelector("iframe") || box.dataset.started) return;
    box.dataset.started = "1";
    loginLoading.value = true;
    if (loginWatch) loginWatch.disconnect();
    loginWatch = new MutationObserver(() => { const f = box.querySelector("iframe"); if (f) hookFrame(f); });
    loginWatch.observe(box, { childList: true, subtree: true });
    auth.signIn("login");
  });
}
onBeforeUnmount(() => { if (loginWatch) loginWatch.disconnect(); clearTimeout(revealTimer); acct.farewell = false; });
const paneHead = ref(null);
/* switch between signing in and creating an account. The new form appears once the old one has slid
   out (onPaneIn). fromLink: the link that was pressed disappears, so focus moves to the new form. */
let focusNewPane = false;
function tab(k, fromLink) {
  if (acct.tab === k) return;
  focusNewPane = !!fromLink;
  acct.tab = k;
}
function onPaneIn() {
  mountSignIn();
  if (focusNewPane && paneHead.value) paneHead.value.focus({ preventScroll: true });
  focusNewPane = false;
}

onMounted(mountSignIn);
/* the sign-in check finishes after the page may already be open */
watch(() => auth.userVersion, mountSignIn);

/* deleting the account: a second step where the learner types DELETE */
const delOpen = ref(false), delText = ref(""), delErr = ref(""), delBusy = ref(false), delInput = ref(null);
function openDelete() { delOpen.value = true; delText.value = ""; delErr.value = ""; nextTick(() => { if (delInput.value) delInput.value.focus(); }); }
function closeDelete() { delOpen.value = false; nextTick(() => { const b = document.querySelector('[data-a="delstart"]'); if (b) b.focus(); }); }
/* after deleting the account (the reload that follows sign-out), the page says goodbye first */
const byeHead = ref(null);
onMounted(() => { if (acct.farewell && byeHead.value) byeHead.value.focus({ preventScroll: true }); });
function leaveFarewell(k) { acct.farewell = false; acct.tab = k; mountSignIn(); }
async function doDelete() {
  if (delBusy.value) return;
  if (delText.value.trim().toUpperCase() !== "DELETE") { delErr.value = "Type DELETE in capital letters to confirm."; if (delInput.value) delInput.value.focus(); return; }
  delErr.value = "";
  delBusy.value = true;
  try { await auth.deleteAccount(); }
  catch (e) { delErr.value = e.message; delBusy.value = false; }
}

function signup() {
  const v = k => f.value[k].trim();
  tried.value = true;
  const mark = (k, m) => { errs.value[k] = m; return !m; };
  let ok = true;
  ok = mark("suF", v("suF") ? "" : "Enter your first name.") && ok;
  ok = mark("suL", v("suL") ? "" : "Enter your last name. If you use a single name, enter it again here.") && ok;
  ok = mark("suE", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("suE")) ? "" : "Enter an email address in the form name@example.com.") && ok;
  errs.value.suC = agreed.value ? "" : "Tick the box to agree before you create an account.";
  ok = agreed.value && ok;
  note.value.show = false;
  if (!ok) { nextTick(() => { const bad = document.querySelector('#main [aria-invalid="true"]'); if (bad) bad.focus(); }); return; }
  if (!auth.onCatalyst) { note.value = { show: true, cls: "fb", text: "Your details look fine. This preview cannot create accounts. Sign-up works once the site is hosted on Zoho Catalyst." }; return; }
  busy.value = true;
  const email = v("suE");
  auth.signUp({ first: v("suF"), last: v("suL"), email }).then(() => { acct.signupDone = email; busy.value = false; window.scrollTo(0, 0); party(60); })
    .catch(() => { busy.value = false; note.value = { show: true, cls: "fb no", text: "The account could not be created. That email address may already have an account, so try signing in. If not, wait a minute and try again." }; });
}
</script>

<template>
  <template v-if="auth.user">
    <h1>Your account</h1><p class="lede" style="margin-top:.8rem">Signed in as {{ name }}{{ auth.user.email_id ? " (" + auth.user.email_id + ")" : "" }}.</p>
    <section><p>Your progress is saved to your account, so it follows you to any device where you sign in.</p><button class="btn quiet" data-a="signout" @click="auth.signOut()">Sign out</button></section>
    <section aria-labelledby="delh"><h2 id="delh">Delete your account</h2>
      <p>This deletes your account, your name and email address, and all your progress, points and badges. It cannot be undone. Any questions and answers you posted in Debug Desk stay, so other learners can still use them, but they are shown as written by “Deleted member”.</p>
      <div v-if="!delOpen" class="row"><button class="btn quiet" data-a="delstart" @click="openDelete">Delete my account</button></div>
      <div v-else class="panel formbox">
        <div class="field"><label for="delc">Type DELETE to confirm</label><input type="text" id="delc" ref="delInput" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-describedby="dele" :aria-invalid="delErr ? 'true' : null" v-model="delText" @keydown.enter="doDelete"><p class="err" id="dele" role="alert">{{ delErr }}</p></div>
        <div class="row"><button class="btn" data-a="delconfirm" :disabled="delBusy" @click="doDelete">{{ delBusy ? "Deleting your account" : "Delete my account permanently" }}</button><button class="btn quiet" data-a="delcancel" :disabled="delBusy" @click="closeDelete">Cancel</button></div>
      </div>
    </section>
  </template>
  <section v-else-if="acct.farewell" class="farewell" aria-labelledby="byeh">
    <div class="byeart"><AuthArt mode="bye" /></div>
    <div class="byetext">
      <h1 id="byeh" tabindex="-1" ref="byeHead">We are sad to see you go</h1>
      <p class="lede">Your account has been deleted, along with your progress, points and badges.</p>
      <p class="meta">Any questions and answers you posted in Debug Desk stay, shown as written by “Deleted member”. You can keep learning without an account, and you are welcome back any time.</p>
      <div class="row"><RouterLink class="btn" to="/">Back to the courses</RouterLink><button class="btn quiet" data-a="atab" @click="leaveFarewell('up')">Create a new account</button></div>
    </div>
  </section>
  <template v-else>
    <h1>Your account</h1><p class="lede" style="margin-top:.8rem">An account keeps your progress and lets you pick it up on any device. The course is free, and it works without an account too.</p>
    <div v-if="!auth.onCatalyst" class="note" style="margin-top:1.4rem"><b>This is a preview, so accounts are switched off here.</b> The forms are shown so you can see how they look. They start working once the site is hosted on Zoho Catalyst. Until then, your progress is saved in this browser.</div>
    <div class="tabs" role="tablist"><button :class="['tab', { on: acct.tab === 'in' }]" role="tab" :aria-selected="String(acct.tab === 'in')" data-a="atab" @click="tab('in')">Sign in</button><button :class="['tab', { on: acct.tab === 'up' }]" role="tab" :aria-selected="String(acct.tab === 'up')" data-a="atab" @click="tab('up')">Create an account</button></div>
    <div :class="['authcard', 'is-' + acct.tab]">
      <div class="authart">
        <AuthArt :mode="artMode" />
        <Transition name="hello" mode="out-in">
          <div v-if="artMode === 'forgot'" key="forgot" class="authhello"><b>Forgot your password?</b><span>Enter the email address you signed up with. We will email you a code to set a new password.</span></div>
          <div v-else-if="acct.tab === 'in'" key="in" class="authhello"><b>Welcome back!</b><span>Sign in to pick up where you left off.</span></div>
          <div v-else key="up" class="authhello"><b>Nice to meet you!</b><span>A free account keeps your progress on every device.</span></div>
        </Transition>
      </div>
      <div class="authform">
        <Transition name="formswap" mode="out-in" @after-enter="onPaneIn">
          <div :key="acct.tab" class="authpane">
            <h2 class="sr-only" tabindex="-1" ref="paneHead">{{ acct.tab === 'in' ? 'Sign in' : 'Create an account' }}</h2>
          <div v-if="acct.tab === 'in' && auth.onCatalyst" class="formbox"><div :class="['loginwrap', { loading: loginLoading }]"><div v-if="loginLoading" class="loginwait" role="status"><span class="spinner" aria-hidden="true"></span><span class="meta">Loading the sign-in box…</span></div><div id="login" style="min-height:26rem"></div></div></div>
          <div v-else-if="acct.tab === 'in'" class="formbox"><p class="meta">On the live site, Zoho’s secure sign-in box appears here. You can sign in with an email address and password, or with a Zoho or Google account. It also has a link for a forgotten password.</p>
            <div class="field"><label for="pvE">Email address</label><input type="email" id="pvE" disabled></div><div class="field"><label for="pvP">Password</label><input type="password" id="pvP" disabled></div><button class="btn" disabled>Sign in</button></div>
          <div v-else-if="acct.signupDone" class="formbox"><DoneMsg text="Check your email." fresh /><p>We sent a message to <b>{{ acct.signupDone }}</b> with a link to set your password. Open it, then come back here and sign in.</p><button class="btn quiet" data-a="atab" @click="tab('in')">Go to sign in</button></div>
          <div v-else class="formbox">
            <div v-for="[id, label, type, auto, help] in FIELDS" :key="id" class="field"><label :for="id">{{ label }}</label><span v-if="help" class="meta" :id="id + 'h'">{{ help }}</span><input :type="type" :id="id" :autocomplete="auto" :aria-describedby="(help ? id + 'h ' : '') + id + 'e'" :aria-invalid="tried ? (errs[id] ? 'true' : 'false') : null" v-model="f[id]" @keydown.enter="signup"><p class="err" :id="id + 'e'" role="alert">{{ errs[id] }}</p></div>
            <label class="check"><input type="checkbox" id="suC" v-model="agreed"> <span>I agree to my name, email address and course progress being stored so that my account works.</span></label><p class="err" id="suCe" role="alert">{{ errs.suC }}</p>
            <button class="btn" data-a="signup" :disabled="busy" @click="signup">{{ busy ? "Creating your account" : "Create my account" }}</button><p :class="note.cls" id="suX" role="status" :hidden="!note.show">{{ note.text }}</p>
          </div>
            <p v-if="acct.tab === 'in'" class="authswitch">New to NoolStack? <button class="linkbtn" data-a="atab" @click="tab('up', true)">Create an account</button></p>
            <p v-else-if="!acct.signupDone" class="authswitch">Already have an account? <button class="linkbtn" data-a="atab" @click="tab('in', true)">Sign in</button></p>
          </div>
        </Transition>
      </div>
    </div>
    <p class="meta" style="margin-top:1.2rem;max-width:34rem">What your account stores: your name, your email address and your course progress. Your password is handled by Zoho and is never seen by this site. The live site also has a chat box provided by Zoho SalesIQ, which keeps its own record of visits and conversations.</p>
  </template>
</template>
