<script setup>
/* A written answer, checked against the task's key points. A sample answer is offered after 3 tries. */
import { inject, computed } from "vue";
import TextFeedback from "./TextFeedback.vue";
const { key, t, e, entry } = inject("task");
const tid = computed(() => "ta-" + key.value);
</script>

<template>
  <template v-if="e.done">
    <div class="myans"><span class="meta">Your answer</span><p>{{ e.ans || "" }}</p></div>
    <TextFeedback :fb="e.fb" />
    <div class="note"><b>A sample answer to compare with:</b> {{ t.sample }}</div>
  </template>
  <template v-else>
    <label class="sr-only" :for="tid">Your answer</label><textarea class="tans" :id="tid" :data-k="key" rows="4" placeholder="Type your answer here" :value="e.ans || ''" @input="entry().ans = $event.target.value"></textarea>
    <TextFeedback :fb="e.fb" />
  </template>
</template>
