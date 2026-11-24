<script setup>
import { ref, computed } from "vue";
import { COURSES, PLANNED } from "../data/content.js";
import { ANIMS } from "../data/animations.js";
import { useProgress, courseIds, courseSize } from "../stores/progress.js";
import { useAuth } from "../stores/auth.js";
import { toast } from "../services/feedback.js";
import { lang } from "../i18n/index.js";
import AnimStage from "../components/AnimStage.vue";
import BadgeArt from "../components/BadgeArt.vue";

const progress = useProgress();
const auth = useAuth();
const st = computed(() => progress.stats());
const ns = computed(() => progress.nextStop());
const lessons = COURSES.reduce((n, co) => n + courseSize(co.id), 0), planned = PLANNED.reduce((n, p) => n + p[1].length, 0);
const why = [["globe", "Learn in your own language", "Tamil is in progress, with more languages planned.", 0],
  ["chat", "Get unstuck in Debug Desk", "Ask coding questions and help other learners.", 0],
  ["play", "Watch it, then try it", "Animations and hands-on practice in every lesson.", 0],
  ["tag", "Free for everyone, forever", "Every lesson, quiz, task and project is free. No plans and no payments.", 0]];
const WI = { globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>', code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12"/>', chat: '<path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2h-7l-4 3v-3H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>', play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5l5.5 3.5-5.5 3.5z"/>', tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.4"/>' };
const courseCards = computed(() => COURSES.map(co => { const ids = courseIds(co.id); return { co, pc: progress.coursePct(co.id), done: ids.filter(progress.itemDone).length, size: courseSize(co.id), started: ids.some(i => progress.itemPct(i) > 0) }; }));

/* "Start again": the first press asks, the second clears */
const sure = ref(false);
function resetAll() {
  if (!sure.value) { sure.value = true; return; }
  progress.reset();
  sure.value = false;
  window.scrollTo(0, 0);
  toast("Progress cleared.");
}
</script>

<template>
  <section class="banner" aria-labelledby="bannerh"><div class="btext">
    <h1 id="bannerh"><span class="bname">NoolStack</span><span class="bsep">: </span><span class="bfull">Education As A Service</span></h1>
    <p class="bsub">Free tech education, for everyone, forever.</p>
    <h2 class="bwhyh">Why learn with NoolStack</h2>
    <ul class="bwhy"><li v-for="w in why" :key="w[0]"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true" v-html="WI[w[0]]"></svg><span><b>{{ w[1] }}</b><template v-if="w[3]">{{ " " }}<span class="soon-tag">Coming soon</span></template><br><span class="meta">{{ w[2] }}</span></span></li></ul>
    <div class="row"><RouterLink class="btn" to="/learn">Start learning</RouterLink><RouterLink class="btn quiet" to="/syllabus">See the syllabus</RouterLink></div>
  </div>
  <figure class="bauthor"><img src="author.jpg" alt="Illustrated portrait of Dheenadhayalan Prem at a desk with two code monitors" width="540" height="741"><figcaption><span class="chip">Author</span><a class="bauthorlink" href="https://get-to-know-about-deenu.onslate.in" target="_blank" rel="noopener" aria-label="Dheenadhayalan Prem (opens in a new tab)"><b>Dheenadhayalan Prem</b></a><span>Software Developer</span></figcaption></figure></section>
  <div class="hero"><div><h2 class="h1like">Learn tech from absolute zero.</h2>
    <p class="lede">Free courses that start with “what is a computer?” and build up one small step at a time. Every lesson has an animation to watch, something to try with your own hands, and a quiz.</p>
    <div class="row"><RouterLink class="btn" :to="'/' + ns.h">{{ progress.points() ? "Continue" : "Start" }}: {{ ns.t }}</RouterLink><RouterLink class="btn quiet" to="/syllabus">See the syllabus</RouterLink></div>
    <p class="meta" style="margin:.9rem 0 0">Free to use, and no account is needed to start.<template v-if="!auth.user">{{ " " }}<RouterLink to="/account">Create an account</RouterLink> to keep your progress on every device.</template></p>
    <p v-if="lang === 'ta'" class="note no-tr" style="margin:1rem 0 0">தமிழ் மொழிபெயர்ப்பு உருவாக்கத்தில் உள்ளது. இன்னும் மொழிபெயர்க்கப்படாத பாடங்கள் ஆங்கிலத்தில் காட்டப்படும்.</p>
    <ul class="facts"><li><b>{{ COURSES.length }}</b>courses ready</li><li><b>{{ lessons }}</b>lessons</li><li><b>{{ ANIMS.length }}</b>animations</li><li><b>{{ planned }}</b>courses planned</li></ul></div>
    <div class="card" id="heroanim"><AnimStage id="cpu" auto /></div></div>
  <section><h2>Courses</h2><div class="courses">
    <article v-for="c in courseCards" :key="c.co.id" class="panel ccard"><h3>{{ c.co.name }}</h3><p class="meta">{{ c.co.blurb }}</p><div class="nbar" style="margin:0"><div class="bar" role="progressbar" :aria-label="c.co.name + ' progress'" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="c.pc"><i :style="{ width: c.pc + '%' }"></i></div><b>{{ c.pc }}%</b></div><p class="meta">{{ c.done }} of {{ c.size }} done{{ c.co.later ? ". More parts are being written." : "" }}</p><RouterLink class="btn small" :to="'/course-' + c.co.id">{{ c.started ? "Continue" : "Start" }} {{ c.co.name }}</RouterLink></article>
  </div></section>
  <section><h2>Coming soon</h2><p class="meta">Every course below is planned. They will be added one at a time, in an order that builds on what came before.</p><template v-for="p in PLANNED" :key="p[0]"><h3 class="plancat">{{ p[0] }}</h3><ul class="plan"><li v-for="x in p[1]" :key="x">{{ x }}</li></ul></template></section>
  <section><h2>Your progress</h2><div class="cards">
    <div v-for="co in COURSES" :key="co.id" class="card"><b>{{ progress.coursePct(co.id) }}%</b><span>of {{ co.name }}</span></div>
    <div class="card"><b>{{ progress.points() }}</b><span>points</span></div>
    <div class="card"><b>{{ st.acc }}</b><span>quiz answers right first time</span></div>
    <div class="card"><b>{{ st.pred }}</b><span>predictions correct</span></div>
    <div class="card"><b>{{ st.hints }}</b><span>hints used</span></div>
    <div class="card"><b>{{ progress.streak() }}</b><span>day streak</span></div>
  </div></section>
  <section><h2>Badges</h2><p class="meta">{{ progress.S.badges.length }} of {{ progress.BADGES.length }} earned.</p><ul class="bgrid">
    <li v-for="b in progress.BADGES" :key="b[0]" :class="['bcard', { got: progress.S.badges.includes(b[0]) }]"><BadgeArt :id="b[0]" :label="b[1] + ' badge, ' + (progress.S.badges.includes(b[0]) ? 'earned' : 'not earned yet')" /><b>{{ b[1] }}</b><span class="meta">{{ b[2] }}</span><span :class="['chip', { ok: progress.S.badges.includes(b[0]) }]">{{ progress.S.badges.includes(b[0]) ? "Earned" : "Not earned yet" }}</span></li>
  </ul></section>
  <section><h2>How each lesson works</h2>
    <ol class="walk"><li>Watch the animation, then read the idea in plain words. Code comes second.</li><li>Try it with your hands in the small interactive.</li><li>Predict what will happen before you look. A wrong prediction still teaches you.</li><li>Answer the quiz. A first-try answer earns 10 points, an answer after a hint earns 7, a second try earns 4.</li><li>Do the tasks on your own computer. Hints are there, one at a time, when you need them.</li></ol>
    <div class="note"><b>When you are stuck:</b> read the error message out loud, say what you think it means, find the line it points to, and only then ask for a hint. The Error help page lists the messages you are most likely to meet.</div>
  </section>
  <section><h2>Start again</h2><p class="meta">This clears all your progress, points and badges.</p><button class="btn quiet small" data-a="reset" @click="resetAll">{{ sure ? "Press again to clear everything" : "Clear my progress" }}</button></section>
</template>
