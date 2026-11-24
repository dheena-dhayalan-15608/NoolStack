<script setup>
/* "Report this": asks for an optional reason. Enter or OK sends it; Esc, Cancel or a click outside closes it. */
import { ref, onMounted, onBeforeUnmount } from "vue";
defineProps({ title: String, label: String });
const emit = defineEmits(["done"]);
const inp = ref(null), val = ref("");
const prev = document.activeElement;
function close(v) { emit("done", v); }
onMounted(() => inp.value.focus());
onBeforeUnmount(() => { if (prev && prev.focus) prev.focus(); });
function onKey(e) { if (e.key === "Escape") close(null); else if (e.key === "Enter") close(val.value); }
</script>

<template>
  <div class="rmoverlay" style="justify-content:center;align-items:center" @click.self="close(null)" @keydown="onKey">
    <div class="panel lmbox" role="dialog" aria-modal="true" aria-labelledby="crph"><h2 id="crph">{{ title }}</h2><div class="field" style="text-align:left"><label for="crpin">{{ label }}</label><input id="crpin" ref="inp" maxlength="300" v-model="val"></div><div class="row" style="justify-content:center"><button class="btn" data-p="ok" @click="close(val)">OK</button><button class="btn quiet" data-p="no" @click="close(null)">Cancel</button></div></div>
  </div>
</template>
