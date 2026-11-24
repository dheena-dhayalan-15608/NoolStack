<script setup>
/* Program the robot chef: put the steps in a workable order, then run them. */
import { ref } from "vue";
const steps = { bread: "Pick up two slices of bread", open: "Open the butter jar", knife: "Pick up the knife", scoop: "Scoop butter with the knife", spread: "Spread the butter on one slice", join: "Put the two slices together" };
const need = { scoop: [["open", "the jar is still closed"], ["knife", "it is not holding a knife"]], spread: [["scoop", "there is no butter on the knife"], ["bread", "it has no bread"]], join: [["spread", "the bread has no butter on it yet"]] };
const order = ref(["spread", "knife", "join", "bread", "scoop", "open"]);
const msg = ref("The robot follows your steps exactly, in order. Arrange them, then run.");
function run() {
  const done = [];
  msg.value = "";
  for (let j = 0; j < order.value.length; j++) {
    const k = order.value[j], miss = (need[k] || []).find(r => !done.includes(r[0]));
    if (miss) { msg.value = "Step " + (j + 1) + ", “" + steps[k] + "”: the robot cannot do it, because " + miss[1] + ". It stops here. Which step needs to come earlier?"; break; }
    done.push(k);
  }
  if (!msg.value) msg.value = "The robot made the sandwich. Every step was clear, in a workable order, and the list finished.";
}
function move(j, m) { const o = order.value, t = j + m; [o[j], o[t]] = [o[t], o[j]]; msg.value = "Order changed. Run it to see what the robot does."; }
</script>

<template>
  <h3>Program the robot chef</h3>
  <div class="w-grid"><div v-for="(k, j) in order" :key="j" class="w-item"><span>{{ j + 1 }}. {{ steps[k] }}</span><button class="pick" :aria-label="'Move step ' + (j + 1) + ' up'" :disabled="j === 0" @click="move(j, -1)">Up</button><button class="pick" :aria-label="'Move step ' + (j + 1) + ' down'" :disabled="j === order.length - 1" @click="move(j, 1)">Down</button></div></div>
  <div class="row"><button class="btn small" @click="run">Run the steps</button></div>
  <p class="fb" role="status">{{ msg }}</p>
</template>
