<script setup>
/* One animation, playing by itself, with a link to its lesson. */
import { useRoute } from "vue-router";
import { ANIMS } from "../data/animations.js";
import { NODES, NODES1 } from "../data/content.js";
import { NODE, courseOf, course } from "../stores/progress.js";
import Home from "./Home.vue";
import AnimStage from "../components/AnimStage.vue";
import Ic from "../components/Ic.vue";

const route = useRoute();
const a = /^[a-z]+$/.test(route.params.id) ? ANIMS.find(x => x.id === route.params.id) : null;
const node = a ? (a.nid ? NODE[a.nid] : (a.lv === 0 ? NODES : NODES1)[a.lesson - 1]) : null;
</script>

<template>
  <Home v-if="!a" />
  <template v-else>
    <RouterLink class="back" to="/animations"><Ic name="back" />All animations</RouterLink><h1 style="margin-top:.8rem">{{ a.t }}</h1>
    <div class="chips"><span class="chip">{{ course(courseOf(node.id)).name }}</span><span class="chip">{{ a.cat }}</span><span class="chip">{{ a.cap.length }} steps</span></div>
    <p class="lede" style="margin-top:1rem">{{ a.d }}</p>
    <section style="margin-top:1.5rem"><div class="panel" id="animstage"><AnimStage :id="a.id" auto /></div>
      <p class="meta">This animation belongs to the lesson <RouterLink :to="'/lesson-' + node.id">{{ node.t }}</RouterLink>.</p></section>
  </template>
</template>
