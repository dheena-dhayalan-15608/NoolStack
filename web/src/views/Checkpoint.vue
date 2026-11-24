<script setup>
/* A course's checkpoint quiz: score 70 percent or more to clear it. */
import { computed } from "vue";
import { useRoute } from "vue-router";
import { CHECKS } from "../data/content.js";
import { useProgress, NODE, course, courseIds, cpItems } from "../stores/progress.js";
import { party } from "../services/feedback.js";
import Home from "./Home.vue";
import QuizBlock from "../components/QuizBlock.vue";
import Pager from "../components/Pager.vue";

const route = useRoute();
const progress = useProgress();
const c = /^[a-z]+$/.test(route.params.c) && CHECKS[route.params.c] ? route.params.c : null;
const it = c ? cpItems(c) : [];
const open = c ? courseIds(c).filter(i => NODE[i] && progress.nodePct(NODE[i]) < 60).length : 0;
const n = c ? CHECKS[c].length : 0;
const d = computed(() => progress.cpDone(c));
const s = computed(() => progress.cpPct(c));
function answered(e) { if (e.done && progress.cpPassed(c)) party(90); }
function retake() { for (const x of CHECKS[c]) delete progress.S[x[0]][x[1]]; progress.save(); window.scrollTo(0, 0); }
</script>

<template>
  <Home v-if="!c" />
  <template v-else>
    <p class="crumbs"><RouterLink :to="'/course-' + c">{{ course(c).name }}</RouterLink></p><h1>Checkpoint quiz</h1><p class="lede" style="margin-top:.8rem">{{ it.length }} questions across the course so far. Score 70 percent or more to clear it.</p>
    <div v-if="open" class="note warn" style="margin-top:1.2rem">{{ open }} {{ open === 1 ? "lesson is" : "lessons are" }} not finished yet. The quiz is easier after them.</div>
    <section>
      <QuizBlock v-for="(x, j) in it" :key="x.st + x.k" :store="x.st" :k="x.k" :q="x.q" :label="'Question ' + (j + 1)" @answered="answered" />
      <p v-if="d < n" class="meta" id="cpsum" :data-c="c">{{ d }} of {{ n }} answered.</p>
      <div v-else-if="s >= 70" class="note" id="cpsum" :data-c="c"><b>You scored {{ s }} percent.</b> That clears the checkpoint for {{ course(c).name }}.</div>
      <div v-else class="note" id="cpsum" :data-c="c"><b>You scored {{ s }} percent.</b> You need 70 to clear it. Revisit the lessons behind the questions you missed, then retake the quiz.<div class="row"><button class="btn small" data-a="cpreset" @click="retake">Retake the checkpoint</button></div></div>
    </section>
    <Pager :id="'cp:' + c" />
  </template>
</template>
