<script setup>
/* The panel that opens over a roadmap: a topic's description, "Open it" and "Mark as done",
   or a note that a roadmap is coming soon. Esc closes it; Tab stays inside it. */
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
const emit = defineEmits(["close"]);
const box = ref(null);
const prev = document.activeElement;
function close() { emit("close"); }
function onKey(e) {
  if (e.key === "Escape") { e.preventDefault(); close(); }
  else if (e.key === "Tab") { const f = [...box.value.querySelectorAll("button,a[href]")], i = f.indexOf(document.activeElement); e.preventDefault(); f[(i + (e.shiftKey ? f.length - 1 : 1) + f.length) % f.length].focus(); }
}
onMounted(() => {
  document.addEventListener("keydown", onKey, true);
  nextTick(() => { const f = box.value.querySelector("[data-rm=toggle]") || box.value.querySelector("[data-rm]"); if (f) f.focus(); });
});
onBeforeUnmount(() => { document.removeEventListener("keydown", onKey, true); if (prev && document.contains(prev)) prev.focus(); });
</script>

<template>
  <div id="rmdrawer" class="rmoverlay" @click.self="close">
    <div class="panel rmdrawer" role="dialog" aria-modal="true" aria-labelledby="rmdh" ref="box"><button class="iconbtn payx" data-rm="close" aria-label="Close" @click="close">✕</button><slot /></div>
  </div>
</template>
