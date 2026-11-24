<script setup>
/* Sort the items into input, processing or output. */
import { ref, computed } from "vue";
const items = [["A key press on the keyboard", "i"], ["Adding up a total", "p"], ["Sound from a speaker", "o"], ["A photo from a camera", "i"], ["Sorting songs by name", "p"], ["Text shown on a screen", "o"], ["A touchscreen", "io"]];
const names = { i: "Input", p: "Processing", o: "Output" };
const got = ref(items.map(() => ""));
const msg = ref("Sort each item into input, processing or output.");
const n = computed(() => got.value.filter((g, j) => g.length === items[j][1].length).length);
function pick(j, c) {
  if (items[j][1].includes(c)) { got.value[j] += c; msg.value = items[j][1].length > got.value[j].length ? "Yes, and it belongs in one more box. Which one?" : "Yes. " + items[j][0] + " is " + names[c].toLowerCase() + "."; }
  else msg.value = "Not " + names[c].toLowerCase() + ". Ask: is information going in, being worked on, or coming out?";
}
</script>

<template>
  <h3>Sort the items</h3><p>{{ msg }}</p>
  <div class="w-grid"><div v-for="(it, j) in items" :key="j" class="w-item"><span>{{ it[0] }}</span><button v-for="c in ['i', 'p', 'o']" :key="c" :class="['pick', { right: got[j].includes(c) }]" :disabled="got[j].includes(c)" @click="pick(j, c)">{{ names[c] }}</button></div></div>
  <p class="meta" style="margin:.7rem 0 0">{{ n }} of {{ items.length }} sorted.{{ n === items.length ? " All sorted. Notice that the touchscreen belongs in two boxes." : "" }}</p>
</template>
