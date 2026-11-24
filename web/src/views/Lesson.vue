<script setup>
/* A lesson: why, animation, idea, widget, worked example, predictions, quiz, tasks,
   common mistakes, going deeper, new words, and the pager. */
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { MORE, DEEP } from "../data/content.js";
import { useProgress, NODE, courseOf, course, courseIds } from "../stores/progress.js";
import { toast, party } from "../services/feedback.js";
import { lang } from "../i18n/index.js";
import Home from "./Home.vue";
import AnimStage from "../components/AnimStage.vue";
import DoneMsg from "../components/DoneMsg.vue";
import PredictBlock from "../components/PredictBlock.vue";
import QuizBlock from "../components/QuizBlock.vue";
import TaskBlock from "../components/TaskBlock.vue";
import Pager from "../components/Pager.vue";
import { WIDGETS } from "../components/widgets/index.js";

/* the animation shown in each lesson */
const LANIM = { c3: "history", m1: "bits", m2: "binary", m3: "ascii", m4: "unicode", m5: "share", m6: "variable", m7: "plus", m8: "fstring", m9: "input", m10: "convert", m11: "float", m12: "comment", n1: "ipo", n2: "cpu", n3: "robot", n4: "path", n5: "terminal", n8: "script", n9: "prompts" };

const route = useRoute();
const progress = useProgress();
const id = route.params.id;
const n = /^[a-z][0-9]+$/.test(id) ? NODE[id] : null;

let c, co, lessons, i, prev, an, widget;
if (n) {
  c = courseOf(n.id); co = course(c); lessons = courseIds(c).filter(x => NODE[x]); i = lessons.indexOf(n.id);
  prev = i > 0 && progress.nodePct(NODE[lessons[i - 1]]) < 60 ? NODE[lessons[i - 1]] : null;
  an = LANIM[n.id];
  widget = WIDGETS[n.w] || null;
}
const p = computed(() => n ? progress.nodePct(n) : 0);
/* "Lesson complete" is cheered once, and only if the lesson was not already complete when it opened */
const was = p.value;
let cheered = false;
watch(p, v => { if (v === 100 && !cheered) { cheered = true; if (was !== 100) { toast("Lesson complete: " + n.t + ". Well done."); party(80); } } });

const freshRead = ref(false), freshEx = ref(false);
function markRead() { progress.S.read[n.id] = 1; progress.save(); party(36); freshRead.value = true; }
function markEx() { progress.S.ex[n.id] = 1; progress.save(); freshEx.value = true; }
</script>

<template>
  <Home v-if="!n" />
  <template v-else>
    <p class="crumbs"><RouterLink :to="'/course-' + c">{{ co.name }}</RouterLink>, lesson {{ i + 1 }} of {{ lessons.length }}</p><h1>{{ n.t }}</h1>
    <div class="chips"><span class="chip">{{ n.m }} min</span><span class="chip">{{ co.name }}</span><span class="chip">Updated November 2026</span></div>
    <div class="nbar" id="nbar" :data-id="n.id" :data-was="was"><div class="bar"><i :style="{ width: p + '%' }"></i></div><b>{{ p }}% of this lesson</b></div>
    <div v-if="lang !== 'en' && !n.translated" class="note no-tr" style="margin-top:1.2rem">இந்தப் பாடம் இன்னும் தமிழில் மொழிபெயர்க்கப்படவில்லை, எனவே ஆங்கிலத்தில் காட்டப்படுகிறது.</div>
    <div v-if="prev" class="note warn" style="margin-top:1.2rem">This lesson builds on <RouterLink :to="'/lesson-' + prev.id">{{ prev.t }}</RouterLink>, which you have not finished yet. It is easier in order.</div>
    <section><h2>Why this matters</h2><p class="lede">{{ n.why }}</p></section>
    <section v-if="an"><h2>Watch it happen</h2><div class="panel" id="lessonanim"><AnimStage :id="an" /></div><p v-if="n.id === 'n2'" class="meta">This lesson has a second animation: <RouterLink to="/anim-ramssd">Open, type, save, power cut</RouterLink>.</p></section>
    <section><h2>The idea</h2><p v-for="(x, k) in n.L" :key="k" v-html="x"></p><div class="note"><b>Picture it like this.</b> {{ n.an }}</div>
      <div :id="'read-' + n.id"><DoneMsg v-if="progress.S.read[n.id]" text="Marked as read." :fresh="freshRead" /><button v-else class="btn" data-a="read" @click="markRead">I have read this</button></div></section>
    <section><h2>Try it with your hands</h2><div class="panel" id="widget"><component :is="widget" v-if="widget" /></div></section>
    <section><h2>Worked example</h2><h3 style="margin-bottom:.6rem">{{ n.ex.t }}</h3><pre v-if="n.ex.code">{{ n.ex.code }}</pre><template v-if="n.ex.out"><p class="meta">What it shows</p><pre>{{ n.ex.out }}</pre></template>
      <ol class="walk"><li v-for="(x, k) in n.ex.walk" :key="k">{{ x }}</li></ol>
      <div :id="'ex-' + n.id"><DoneMsg v-if="progress.S.ex[n.id]" text="Followed step by step." :fresh="freshEx" /><button v-else class="btn" data-a="ex" @click="markEx">I followed each step</button></div></section>
    <section><h2>Predict first</h2><p>Commit to an answer before you see the result. You get one go at each, and being wrong here is useful.</p><PredictBlock v-for="(_, j) in n.P" :key="j" :n="n" :i="j" /></section>
    <section><h2>Quiz</h2><QuizBlock v-for="(q, j) in n.Q" :key="j" store="quiz" :k="n.id + 'q' + j" :q="q" :label="'Question ' + (j + 1)" /></section>
    <section><h2>Your turn</h2><p>Answer each task here. Try on your own before you open a hint.</p><TaskBlock v-for="(_, j) in n.T" :key="j" :n="n" :i="j" /></section>
    <section><h2>Watch out for</h2><p class="meta">Mistakes that learners often make on this lesson.</p><div v-for="(m, k) in n.M.concat(MORE[n.id] || [])" :key="k" class="note warn"><b>{{ m[0] }}</b> {{ m[1] }}</div></section>
    <section v-if="DEEP[n.id]"><h2>Going deeper</h2><p class="meta">Rules, limits and odd cases worth knowing once the basics are clear.</p><ul class="deep"><li v-for="(x, k) in DEEP[n.id]" :key="k">{{ x }}</li></ul></section>
    <section><h2>New words</h2><dl><template v-for="(g, k) in n.G" :key="k"><dt>{{ g[0] }}</dt><dd>{{ g[1] }}</dd></template></dl></section>
    <Pager :id="n.id" />
  </template>
</template>
