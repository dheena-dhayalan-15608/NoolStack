<script setup>
import { CR_RULES } from "../services/debugdesk.js";
import LegalNav from "../components/LegalNav.vue";
</script>

<template>
  <h1>Community rules</h1><p class="lede" style="margin-top:.8rem">For everyone who posts in Debug Desk.</p><ul class="deep"><li v-for="x in CR_RULES" :key="x">{{ x }}</li></ul><p>Anything that breaks these rules can be reported with the <b>Report</b> button, and may be removed.</p>
  <LegalNav />
</template>
