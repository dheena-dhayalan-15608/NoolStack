<script setup>
/* One machine, many jobs: the phone stays the same, only the program changes. */
import { ref, computed } from "vue";
import { aBox } from "../../data/animations.js";
const J = [["Calculator", "Your taps on the number keys", "Add, subtract, multiply or divide", "A number on the screen"], ["Music player", "The song you choose", "Read the song and turn it into sound signals", "Music from the speaker"], ["Camera", "Light coming through the lens", "Turn the light into a picture", "A photo on the screen"]];
const k = ref(0);
const flow = computed(() => `${aBox("Input", J[k.value][1], false)}<span class="aarrow"></span>${aBox("The program says", J[k.value][2], true)}<span class="aarrow"></span>${aBox("Output", J[k.value][3], false)}`);
</script>

<template>
  <h3>One machine, many jobs</h3><p>Choose a program. The phone stays the same. Only its instructions change.</p>
  <div class="row" style="margin-top:0"><button v-for="(j, i) in J" :key="i" :class="['pick', { right: i === k }]" :data-j="i" :aria-pressed="String(i === k)" @click="k = i">{{ j[0] }}</button></div>
  <div class="aflow prose" style="margin-top:.9rem" v-html="flow"></div>
  <p class="meta" style="margin:.8rem 0 0">Hardware: the same phone every time.</p>
</template>
