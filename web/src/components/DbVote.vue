<script setup>
/* Up and down votes on a question or an answer. Pressing the same vote again takes it back. */
import { ref, watch } from "vue";
import { crApi } from "../services/debugdesk.js";
import { toast } from "../services/feedback.js";
const props = defineProps({ kind: String, item: Object });
const score = ref(props.item.score), mine = ref(props.item.myVote);
watch(() => props.item, i => { score.value = i.score; mine.value = i.myVote; });
async function vote(v) {
  try { const d = await crApi("POST", "/debug/vote", { kind: props.kind, id: props.item.id, value: v }); score.value = d.score; mine.value = d.myVote; }
  catch (e) { toast(e.message); }
}
</script>

<template>
  <div class="dbvote" :data-kind="kind" :data-id="item.id"><button :class="['dbv', { on: mine === 1 }]" data-a="dbvote" data-v="1" aria-label="This is useful" :aria-pressed="String(mine === 1)" @click="vote(1)">▲</button><b aria-live="polite">{{ score }}</b><button :class="['dbv', { on: mine === -1 }]" data-a="dbvote" data-v="-1" aria-label="This is not useful" :aria-pressed="String(mine === -1)" @click="vote(-1)">▼</button></div>
</template>
