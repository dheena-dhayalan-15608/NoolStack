<script setup>
/* The error messages learners are most likely to meet, and what they mean. */
import { ERRORS } from "../data/content.js";
</script>

<template>
  <h1>Error help</h1><p class="lede" style="margin-top:.8rem">The messages you are most likely to meet when you start out. An error is a clue, and reading it is a skill.</p>
  <section><h2>The four-step routine</h2><ol class="walk"><li>Read the message out loud.</li><li>Say what you think it means.</li><li>Find the line or the word it points to.</li><li>Still stuck after a real try? Ask for a hint.</li></ol></section>
  <section><h2>Common messages</h2><div class="scroll"><table><thead><tr><th>The message</th><th>What it means</th><th>Ask yourself</th></tr></thead><tbody><tr v-for="(e, k) in ERRORS" :key="k"><td><code>{{ e[0] }}</code></td><td>{{ e[1] }}</td><td>{{ e[2] }}</td></tr></tbody></table></div></section>
</template>
