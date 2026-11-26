<script setup>
/* "Active now": members with a Debug Desk page open in the last few minutes, and this member's
   "Show me as active" switch (remembered in this browser). */
import { computed } from "vue";
import { CR, crSetHidden } from "../services/debugdesk.js";
import CrAvatar from "./CrAvatar.vue";

const others = computed(() => (CR.online || []).filter(m => m.id !== (CR.me && CR.me.id)));
const shown = computed(() => others.value.slice(0, 12));
</script>

<template>
  <section class="dbonline" aria-labelledby="dbonh">
    <h2 id="dbonh"><span class="dbdot" aria-hidden="true"></span>Active now</h2>
    <p v-if="CR.online === null" class="meta">Checking who is here…</p>
    <template v-else>
      <ul v-if="others.length" class="dbonlist">
        <li v-for="m in shown" :key="m.id"><CrAvatar :name="m.name" :uid="m.id" sz="sm" />{{ " " }}<span>{{ m.name }}</span></li>
        <li v-if="others.length > shown.length" class="meta">and {{ others.length - shown.length }} more</li>
      </ul>
      <p v-else class="meta">No other members are on Debug Desk right now.</p>
    </template>
    <label class="dbonme"><input type="checkbox" :checked="!CR.hidden" data-a="dbshowme" @change="crSetHidden(!$event.target.checked)"> Show me as active</label>
  </section>
</template>
