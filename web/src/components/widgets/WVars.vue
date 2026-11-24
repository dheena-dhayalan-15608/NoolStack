<script setup>
/* Watch the names: run a short program one line at a time and see what each name refers to. */
import { ref, computed } from "vue";
const prog = [["sweets = 17", { sweets: 17 }], ["friends = 5", { friends: 5 }], ["each = sweets // friends", { each: 3 }], ["sweets = sweets + 3", { sweets: 20 }]];
const notes = ["The name sweets now refers to 17.", "A second name, friends, refers to 5.", "Python works out 17 // 5 first, then each refers to the result, 3.", "The right side is worked out first: 17 + 3. Now sweets refers to 20. Notice that each is still 3. It was worked out earlier and does not change by itself."];
const pos = ref(0);
const state = computed(() => { const mem = {}; let changed = null; for (let k = 0; k < pos.value; k++) { Object.assign(mem, prog[k][1]); changed = Object.keys(prog[k][1])[0]; } return { mem, changed, names: Object.keys(mem) }; });
</script>

<template>
  <h3>Watch the names</h3><p>Run the program one line at a time and watch what each name refers to.</p>
  <div class="acode"><div v-for="(p, k) in prog" :key="k" :class="k === pos - 1 ? 'act' : ''">{{ p[0] }}</div></div>
  <div class="scroll" style="margin-top:.8rem"><table style="min-width:14rem"><thead><tr><th>Name</th><th>Refers to</th></tr></thead><tbody>
    <template v-if="state.names.length"><tr v-for="n in state.names" :key="n"><td><code>{{ n }}</code></td><td><b>{{ state.mem[n] }}</b>{{ n === state.changed ? " (just set)" : "" }}</td></tr></template>
    <tr v-else><td colspan="2">No names yet.</td></tr>
  </tbody></table></div>
  <div class="row"><button class="btn small" :disabled="pos >= prog.length" @click="pos < prog.length && pos++">Run the next line</button><button class="btn quiet small" @click="pos = 0">Start again</button></div>
  <p class="fb" role="status">{{ pos ? notes[pos - 1] : "Nothing has run yet. What will the first line do?" }}</p>
</template>
