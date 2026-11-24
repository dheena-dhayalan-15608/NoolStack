<script setup>
/* Flip the bits: each extra bit doubles the number of patterns. */
import { ref } from "vue";
const b = ref([0, 0, 0]);
function more() { if (b.value.length < 8) b.value.push(0); }
function less() { if (b.value.length > 1) b.value.pop(); }
</script>

<template>
  <h3>Flip the bits</h3><p>Each square is one bit. Press a square to switch it on or off. Add or remove bits and watch the number of possible patterns change.</p>
  <div class="acells" :style="{ maxWidth: b.length * 4.4 + 'rem' }"><button v-for="(x, j) in b" :key="j" :class="['acell', { fill: x }]" :data-j="j" :aria-pressed="String(!!x)" :aria-label="'Bit ' + (j + 1) + ', ' + (x ? 'on' : 'off')" @click="b[j] ^= 1"><b>{{ x }}</b><small>{{ x ? "on" : "off" }}</small></button></div>
  <div class="row"><button class="btn quiet small" :disabled="b.length <= 1" @click="less">Remove a bit</button><button class="btn quiet small" :disabled="b.length >= 8" @click="more">Add a bit</button></div>
  <p class="fb" role="status">This pattern: <code>{{ b.join("") }}</code>. With {{ b.length }} {{ b.length === 1 ? "bit" : "bits" }} there are <b>{{ 2 ** b.length }}</b> possible patterns.{{ b.length === 8 ? " Eight bits make one byte." : "" }}</p>
</template>
