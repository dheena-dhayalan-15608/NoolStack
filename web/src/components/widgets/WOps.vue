<script setup>
/* Try all seven operators on two whole numbers from 0 to 30. */
import { ref, computed } from "vue";
const a = ref("17"), b = ref("5");
const num = s => { const v = parseInt(s, 10); return isNaN(v) ? null : Math.max(0, Math.min(30, v)); };
const rows = computed(() => {
  const x = num(a.value), y = num(b.value);
  if (x === null || y === null) return null;
  const zero = "ZeroDivisionError: division by zero", d = x / y;
  return { x, y, list: [["+", x + y], ["-", x - y], ["*", x * y], ["/", y ? (Number.isInteger(d) ? d + ".0" : String(d)) : zero], ["//", y ? Math.floor(d) : zero], ["%", y ? x % y : zero], ["**", (BigInt(x) ** BigInt(y)).toString()]] };
});
</script>

<template>
  <h3>Try all seven operators</h3><p>Pick two whole numbers from 0 to 30 and see what each operator gives.</p>
  <div class="row" style="margin-top:0"><label for="opa">First</label><input type="text" inputmode="numeric" id="opa" v-model="a" maxlength="2" style="width:4.5rem"><label for="opb">Second</label><input type="text" inputmode="numeric" id="opb" v-model="b" maxlength="2" style="width:4.5rem"></div>
  <div class="scroll" style="margin-top:.8rem"><table style="min-width:16rem"><thead><tr><th>You type</th><th>Python gives</th></tr></thead><tbody id="opt">
    <tr v-if="!rows"><td colspan="2">Type a whole number in both boxes.</td></tr>
    <template v-else><tr v-for="r in rows.list" :key="r[0]"><td><code>{{ rows.x }} {{ r[0] }} {{ rows.y }}</code></td><td><code>{{ r[1] }}</code></td></tr></template>
  </tbody></table></div>
</template>
