<script setup>
/* Exact, or slightly off? Adding two decimals. */
import { ref, computed } from "vue";
const vals = ["0.1", "0.2", "0.3", "0.5", "0.25", "0.7"];
const x = ref("0.1"), y = ref("0.2");
const r = computed(() => { const sum = Number(x.value) + Number(y.value), want = Number(sum.toFixed(2)); return { sum, want, ok: sum === want }; });
</script>

<template>
  <h3>Exact, or slightly off?</h3><p>Add two decimals and see whether the result is exactly what you expect.</p>
  <div class="row" style="margin-top:0"><select id="fla" aria-label="First number" v-model="x"><option v-for="v in vals" :key="v">{{ v }}</option></select><span>+</span><select id="flb" aria-label="Second number" v-model="y"><option v-for="v in vals" :key="v">{{ v }}</option></select></div>
  <p :class="['fb', r.ok ? 'ok' : 'no']" id="flr" role="status"><code>{{ x }} + {{ y }}</code> gives <code>{{ r.sum }}</code>. <template v-if="r.ok">That is exactly {{ r.want }}, so comparing with two equals signs works here.</template><template v-else>You would expect {{ r.want }}, but <code>{{ x }} + {{ y }} == {{ r.want }}</code> is <b>False</b>. Rounding fixes it: <code>round({{ x }} + {{ y }}, 2) == {{ r.want }}</code> is True.</template></p>
</template>
