<script setup>
/* Joining the community: members choose a display name and agree to the rules. */
import { ref } from "vue";
import { CR, CR_RULES, crApi } from "../services/debugdesk.js";
import { toast } from "../services/feedback.js";
const name = ref(""), agree = ref(false), err = ref("");
async function join() {
  if (!agree.value) { err.value = "Please agree to the community rules first."; return; }
  try { const d = await crApi("POST", "/join", { name: name.value }); CR.me = d.member; }
  catch (e) { toast(e.message); }
}
</script>

<template>
  <h1>Join the NoolStack community to use Debug Desk</h1><p class="lede" style="margin-top:.8rem">Choose the name other members will see. Your email address stays private.</p>
  <div class="panel" style="max-width:36rem"><div class="field"><label for="crname">Display name</label><input id="crname" maxlength="40" autocomplete="nickname" placeholder="For example: Deenu" v-model="name" @keydown.enter.prevent="join"></div>
    <h3 style="margin:1rem 0 .4rem">Community rules</h3><ul class="deep"><li v-for="x in CR_RULES" :key="x">{{ x }}</li></ul>
    <label class="check"><input type="checkbox" id="cragree" v-model="agree"> <span>I agree to follow the community rules.</span></label><p class="err" id="crjoinerr" role="alert">{{ err }}</p>
    <button class="btn" data-a="crjoin" @click="join">Join the community</button></div>
</template>
