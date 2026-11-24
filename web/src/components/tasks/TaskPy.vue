<script setup>
/* Write and run a Python program. Answers for input() are typed in a second box, one per line.
   Tab in the code box adds four spaces. */
import { computed, inject } from "vue";
import { PYOUT } from "../../services/tasks.js";
import PythonRunner from "../PythonRunner.vue";
const { key, t, e, entry } = inject("task");
const code = computed(() => e.value.code !== undefined ? e.value.code : (t.value.code || ""));
const needsInput = computed(() => /input\(/.test(code.value) || !!t.value.tin);
</script>

<template>
  <PythonRunner :id-base="key" :code="code" :inp="e.inp || ''" :needs-input="needsInput" :readonly="!!e.done" :output="PYOUT[key]" @update:code="v => entry().code = v" @update:inp="v => entry().inp = v" />
</template>
