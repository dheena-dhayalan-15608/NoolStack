<script setup>
/* Sign in (Catalyst's own sign-in box) or create an account (this site's form). Without Catalyst,
   the forms are shown switched off, as a preview. */
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { useAuth } from "../stores/auth.js";
import { party } from "../services/feedback.js";
import DoneMsg from "../components/DoneMsg.vue";
import { acct } from "../components/acctState.js";

const auth = useAuth();
const name = computed(() => { const u = auth.user; return u ? (((u.first_name || "") + " " + (u.last_name || "")).trim() || "a learner") : ""; });
const f = ref({ suF: "", suL: "", suE: "" }), errs = ref({ suF: "", suL: "", suE: "", suC: "" }), agreed = ref(false);
const note = ref({ show: false, cls: "fb", text: "" }), busy = ref(false), tried = ref(false);
const FIELDS = [["suF", "First name", "text", "given-name", ""], ["suL", "Last name", "text", "family-name", "If you use a single name, enter it here as well."], ["suE", "Email address", "email", "email", "We send a link to this address so you can set your password."]];

function mountSignIn() { if (!auth.user && auth.onCatalyst && acct.tab === "in") nextTick(() => { if (document.getElementById("login")) auth.signIn("login"); }); }
function tab(k) { acct.tab = k; window.scrollTo(0, 0); mountSignIn(); }
onMounted(mountSignIn);
/* the sign-in check finishes after the page may already be open */
watch(() => auth.userVersion, mountSignIn);

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
  </template>
  <template v-else>
    <h1>Your account</h1><p class="lede" style="margin-top:.8rem">An account keeps your progress and lets you pick it up on any device. The course is free, and it works without an account too.</p>
    <div v-if="!auth.onCatalyst" class="note" style="margin-top:1.4rem"><b>This is a preview, so accounts are switched off here.</b> The forms are shown so you can see how they look. They start working once the site is hosted on Zoho Catalyst. Until then, your progress is saved in this browser.</div>
    <div class="tabs" role="tablist"><button :class="['tab', { on: acct.tab === 'in' }]" role="tab" :aria-selected="String(acct.tab === 'in')" data-a="atab" @click="tab('in')">Sign in</button><button :class="['tab', { on: acct.tab === 'up' }]" role="tab" :aria-selected="String(acct.tab === 'up')" data-a="atab" @click="tab('up')">Create an account</button></div>
    <div v-if="acct.tab === 'in' && auth.onCatalyst" class="panel formbox"><div id="login" style="min-height:26rem"></div></div>
    <div v-else-if="acct.tab === 'in'" class="panel formbox"><p class="meta">On the live site, Zoho’s secure sign-in box appears here. You can sign in with an email address and password, or with a Zoho or Google account. It also has a link for a forgotten password.</p>
      <div class="field"><label for="pvE">Email address</label><input type="email" id="pvE" disabled></div><div class="field"><label for="pvP">Password</label><input type="password" id="pvP" disabled></div><button class="btn" disabled>Sign in</button></div>
    <div v-else-if="acct.signupDone" class="panel formbox"><DoneMsg text="Check your email." fresh /><p>We sent a message to <b>{{ acct.signupDone }}</b> with a link to set your password. Open it, then come back here and sign in.</p><button class="btn quiet" data-a="atab" @click="tab('in')">Go to sign in</button></div>
    <div v-else class="panel formbox">
      <div v-for="[id, label, type, auto, help] in FIELDS" :key="id" class="field"><label :for="id">{{ label }}</label><span v-if="help" class="meta" :id="id + 'h'">{{ help }}</span><input :type="type" :id="id" :autocomplete="auto" :aria-describedby="(help ? id + 'h ' : '') + id + 'e'" :aria-invalid="tried ? (errs[id] ? 'true' : 'false') : null" v-model="f[id]" @keydown.enter="signup"><p class="err" :id="id + 'e'" role="alert">{{ errs[id] }}</p></div>
      <label class="check"><input type="checkbox" id="suC" v-model="agreed"> <span>I agree to my name, email address and course progress being stored so that my account works.</span></label><p class="err" id="suCe" role="alert">{{ errs.suC }}</p>
      <button class="btn" data-a="signup" :disabled="busy" @click="signup">{{ busy ? "Creating your account" : "Create my account" }}</button><p :class="note.cls" id="suX" role="status" :hidden="!note.show">{{ note.text }}</p>
    </div>
    <p class="meta" style="margin-top:1.2rem;max-width:34rem">What your account stores: your name, your email address and your course progress. Your password is handled by Zoho and is never seen by this site. The live site also has a chat box provided by Zoho SalesIQ, which keeps its own record of visits and conversations.</p>
  </template>
</template>
