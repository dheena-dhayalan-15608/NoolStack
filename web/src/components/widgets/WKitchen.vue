<script setup>
/* Open, type, save, lose power: RAM is the countertop, storage is the pantry. */
import { ref } from "vue";
const store = ref("My essay, first draft"), ram = ref(null), msg = ref("Press Open to bring the essay onto the countertop.");
let n = 1;
function act(x) {
  if (x === "open") { ram.value = store.value; msg.value = "A copy of the essay is now in RAM. The original stays in storage."; }
  else if (x === "type") { if (ram.value === null) msg.value = "Nothing is open. What has to happen before you can type?"; else { ram.value += " + sentence " + (n++); msg.value = "Only the copy in RAM changed. Look at storage: it is the same as before."; } }
  else if (x === "save") { if (ram.value === null) msg.value = "There is nothing in RAM to save."; else { store.value = ram.value; msg.value = "Saved. Storage now matches RAM."; } }
  else { const lost = ram.value !== null && ram.value !== store.value; ram.value = null; msg.value = lost ? "The power went off and RAM was wiped. Your unsaved sentences are gone. Storage kept the last saved version." : "The power went off and RAM was wiped. Nothing was lost, because storage already had everything."; }
}
</script>

<template>
  <h3>Open, type, save, lose power</h3>
  <div class="two"><div class="box"><b>Storage (the pantry)</b><br>{{ store }}</div><div :class="['box', { empty: ram === null }]"><b>RAM (the countertop)</b><br>{{ ram === null ? "Empty" : ram }}</div></div>
  <div class="row"><button class="btn small" @click="act('open')">Open the essay</button><button class="btn small" @click="act('type')">Type a sentence</button><button class="btn small" @click="act('save')">Save</button><button class="btn quiet small" @click="act('cut')">Power cut</button></div>
  <p class="fb" role="status">{{ msg }}</p>
</template>
