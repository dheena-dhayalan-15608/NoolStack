<script setup>
/* What a Debug Desk page shows before the learner can use it. */
import { CR, crForget } from "../services/debugdesk.js";
import DebugJoin from "./DebugJoin.vue";
defineProps({ state: String });
function retry() { crForget(); }
</script>

<template>
  <template v-if="state === 'signin'"><h1>Debug Desk</h1><p class="lede" style="margin-top:.8rem">Ask and answer questions about code and computers, with other NoolStack learners. Debug Desk is for members only, so you need a NoolStack account.</p><div class="row"><RouterLink class="btn" to="/account">Sign in or create an account</RouterLink></div></template>
  <template v-else-if="state === 'loading'"><h1>Debug Desk</h1><p class="meta" style="margin-top:1rem">Loading…</p></template>
  <template v-else-if="state === 'error'"><h1>Debug Desk</h1><p class="fb no">{{ CR.err }}</p><button class="btn small" data-a="crretry" @click="retry">Try again</button></template>
  <DebugJoin v-else-if="state === 'join'" />
</template>
