<script setup>
import { who, mail, phone, phoneShown } from "../components/LegalBits.js";
import DraftNote from "../components/DraftNote.vue";
import LegalNav from "../components/LegalNav.vue";
</script>

<template>
  <h1>Contact</h1><DraftNote />
  <div class="legal"><p>NoolStack is run by {{ who }}.</p><ul class="deep"><li v-if="phone"><b>Arattai Business or phone:</b> <a :href="'tel:+91' + phone">{{ phoneShown }}</a></li><li v-if="mail"><b>Email:</b> <a :href="'mailto:' + mail">{{ mail }}</a></li><li><b>Chat:</b> use the chat button in the bottom corner of any page.</li></ul></div>
  <LegalNav />
</template>
