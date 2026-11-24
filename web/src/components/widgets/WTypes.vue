<script setup>
/* Mix the types: a value, an operator and another value, and what Python does with them. */
import { ref, computed } from "vue";
const L = [['12', 'int', 12], ['3.5', 'float', 3.5], ['"12"', 'str', '12'], ['True', 'bool', 1]], R = [['3', 'int', 3], ['3.0', 'float', 3], ['"3"', 'str', '3']];
const l = ref("0"), op = ref("+"), r = ref("0");
const fmt = (v, isf) => isf ? (Number.isInteger(v) ? v + ".0" : String(v)) : String(v);
const result = computed(() => {
  const a = L[+l.value], b = R[+r.value], as = a[1] === "str", bs = b[1] === "str";
  let res, ty, err = null;
  if (op.value === "+") {
    if (as && bs) { res = "'" + a[2] + b[2] + "'"; ty = "str"; }
    else if (as) err = 'can only concatenate str (not "' + b[1] + '") to str';
    else if (bs) err = "unsupported operand type(s) for +: '" + a[1] + "' and 'str'";
    else { ty = a[1] === "float" || b[1] === "float" ? "float" : "int"; res = fmt(a[2] + b[2], ty === "float"); }
  } else {
    if (as && bs) err = "can't multiply sequence by non-int of type 'str'";
    else if (as || bs) { const s = as ? a : b, n = as ? b : a; if (n[1] === "float") err = "can't multiply sequence by non-int of type 'float'"; else { res = "'" + s[2].repeat(n[2]) + "'"; ty = "str"; } }
    else { ty = a[1] === "float" || b[1] === "float" ? "float" : "int"; res = fmt(a[2] * b[2], ty === "float"); }
  }
  return { a, b, res, ty, err };
});
</script>

<template>
  <h3>Mix the types</h3><p>Choose a value, an operator and another value, and see what Python does with them.</p>
  <div class="row" style="margin-top:0"><select id="tyl" aria-label="Left value" v-model="l"><option v-for="(x, j) in L" :key="j" :value="String(j)">{{ x[0] }}</option></select><select id="tyo" aria-label="Operator" v-model="op"><option>+</option><option>*</option></select><select id="tyr" aria-label="Right value" v-model="r"><option v-for="(x, j) in R" :key="j" :value="String(j)">{{ x[0] }}</option></select></div>
  <p :class="['fb', result.err ? 'no' : 'ok']" id="tyres" role="status"><code>{{ result.a[0] }} {{ op }} {{ result.b[0] }}</code> is {{ result.a[1] }} {{ op }} {{ result.b[1] }}. <template v-if="result.err">Python raises <b>TypeError</b>: {{ result.err }}</template><template v-else>Python gives <code>{{ result.res }}</code>, which is {{ result.ty === "int" ? "an" : "a" }} {{ result.ty }}.</template></p>
</template>
