<script setup>
/* Type short answers. Enter in a one-line box checks the answer. */
import { inject } from "vue";
const { key, t, e, entry, check } = inject("task");
const fid = j => "f-" + key.value + "-" + j;
function set(j, v) { const x = entry(); x.vals = x.vals || []; x.vals[j] = v; }
function onEnter(ev) { ev.preventDefault(); check(); }
</script>

<template>
  <div v-for="(f, j) in t.fields" :key="j" class="field"><label :for="fid(j)">{{ f.l }}</label>
    <textarea v-if="f.multi" class="tfill code" :id="fid(j)" :data-k="key" :data-j="j" rows="6" spellcheck="false" :readonly="!!e.done" :value="(e.vals || [])[j] || ''" @input="set(j, $event.target.value)"></textarea>
    <input v-else type="text" class="tfill" :id="fid(j)" :data-k="key" :data-j="j" :value="(e.vals || [])[j] || ''" :placeholder="f.ph || ''" autocomplete="off" autocapitalize="off" spellcheck="false" :readonly="!!e.done" @input="set(j, $event.target.value)" @keydown.enter="onEnter">
  </div>
</template>
