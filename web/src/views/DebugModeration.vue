<script setup>
/* Moderation: reported questions and answers, to remove or dismiss. For moderators only. */
import { ref, watch } from "vue";
import { CR, crApi, crWhen } from "../services/debugdesk.js";
import { toast } from "../services/feedback.js";
import { useDebugGate } from "../components/useDebugGate.js";
import DebugGateView from "../components/DebugGateView.vue";

const gate = useDebugGate();
const list = ref(null), err = ref("");
async function load() { try { list.value = (await crApi("GET", "/admin/reports")).reports; } catch (e) { err.value = e.message; } }
watch(gate, g => { if (g === "open") { CR.view = "mod"; if (CR.admin) load(); } }, { immediate: true });
async function act(r, remove) {
  try { await crApi("POST", "/admin/reports/" + r.id, { remove }); list.value = list.value.filter(x => x !== r); toast(remove ? "Removed." : "Dismissed."); }
  catch (e) { toast(e.message); }
}
</script>

<template>
  <DebugGateView v-if="gate !== 'open'" :state="gate" />
  <div v-else class="dbwrap"><p class="crumbs"><RouterLink to="/debug">Debug Desk</RouterLink></p>
    <p v-if="!CR.admin" class="meta crpad">This page is for moderators.</p>
    <template v-else><h1>Moderation</h1><p class="meta">Reported questions and answers.</p><div id="crbody">
      <p v-if="err" class="fb no">{{ err }}</p>
      <p v-else-if="!list" class="meta">Loading…</p>
      <template v-else-if="list.length"><article v-for="r in list" :key="r.id" class="panel"><p><b>{{ r.kind }}</b> reported by {{ r.by }} · {{ crWhen(r.at) }}</p><p class="meta">“{{ r.excerpt }}”</p><p v-if="r.reason">Reason: {{ r.reason }}</p><div class="row"><button class="btn small" data-a="crmod" @click="act(r, true)">Remove it</button><button class="btn quiet small" data-a="crmod" @click="act(r, false)">Dismiss</button></div></article></template>
      <p v-else class="meta">No open reports.</p>
    </div></template>
  </div>
</template>
