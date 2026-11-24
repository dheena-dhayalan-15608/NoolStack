<script setup>
/* Binary to number: switch bits on and off and watch the total. */
import { ref, computed } from "vue";
const v = [128, 64, 32, 16, 8, 4, 2, 1];
const b = ref([0, 0, 0, 0, 1, 0, 1, 1]);
const on = computed(() => v.filter((x, j) => b.value[j]));
const tot = computed(() => on.value.reduce((s, x) => s + x, 0));
</script>

<template>
  <h3>Binary to number</h3><p>Each square is one bit, with its position value written underneath. Switch bits on and off and watch the total.</p>
  <div class="acells"><button v-for="(x, j) in b" :key="j" :class="['acell', { fill: x }]" :data-j="j" :aria-pressed="String(!!x)" :aria-label="'The ' + v[j] + ' position, ' + (x ? 'on' : 'off')" @click="b[j] ^= 1"><b>{{ x }}</b><small>{{ v[j] }}</small></button></div>
  <p class="fb" role="status"><code>{{ b.join("") }}</code> is {{ on.length > 1 ? on.join(" + ") + " = " : "" }}<b>{{ tot }}</b>.{{ tot === 255 ? " That is the largest number one byte can hold." : "" }}</p>
</template>
