<script setup>
/* A person against a computer: how long it takes to add up many numbers. */
import { ref, computed } from "vue";
const N = [["100", 100], ["10,000", 1e4], ["1 million", 1e6], ["1 billion", 1e9]];
const human = s => s < 60 ? Math.round(s) + " seconds" : s < 3600 ? Math.round(s / 60) + " minutes" : s < 86400 ? Math.round(s / 3600) + " hours" : s < 86400 * 365 ? Math.round(s / 86400) + " days" : Math.round(s / 86400 / 365) + " years";
const sel = ref("0");
const n = computed(() => N[+sel.value][1]);
</script>

<template>
  <h3>A person against a computer</h3><p><label for="spn">How many numbers need adding up?</label></p>
  <select id="spn" v-model="sel"><option v-for="(x, i) in N" :key="i" :value="String(i)">{{ x[0] }}</option></select>
  <div class="two"><div class="box"><b>A person</b><br><span id="sph">About {{ human(n * 2) }}</span></div><div class="box"><b>A computer</b><br><span id="spc">{{ n >= 1e9 ? "About 1 second" : "Far less than a second" }}</span></div></div>
  <p class="meta" style="margin:0">Rough figures: one sum every two seconds for the person, with no breaks, and about a billion a second for the computer.</p>
</template>
