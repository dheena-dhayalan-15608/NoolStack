<script setup>
import { toastState, hideToast } from "../services/feedback.js";
import BadgeArt from "./BadgeArt.vue";
</script>

<template>
  <div class="toast" :class="{ withart: !!toastState.badge, out: toastState.out }" id="toast" role="status" :hidden="toastState.hidden" @click="hideToast"><template v-if="toastState.badge"><BadgeArt :id="toastState.badge" /><span>{{ toastState.msg }}</span></template><template v-else>{{ toastState.msg }}</template></div>
</template>
