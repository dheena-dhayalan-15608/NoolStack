<script setup>
/* Debug Desk: the list of questions, with search, tags, sorting and the "New activity" button. */
import { ref, watch } from "vue";
import { CR, crApi, crWhen } from "../services/debugdesk.js";
import { useDebugGate } from "../components/useDebugGate.js";
import DebugGateView from "../components/DebugGateView.vue";
import DbTags from "../components/DbTags.vue";
import CrAvatar from "../components/CrAvatar.vue";
import DbOnline from "../components/DbOnline.vue";

const props = defineProps({ sort: { type: String, default: "newest" }, tag: { type: String, default: "" } });
const gate = useDebugGate();
const list = ref(null), err = ref("");
const SORTS = [["newest", "Newest", "/debug"], ["votes", "Most votes", "/debug-votes"], ["unanswered", "Unanswered", "/debug-unanswered"]];

async function load() {
  try {
    const qs = new URLSearchParams();
    if (CR.search) qs.set("q", CR.search);
    if (props.tag) qs.set("tag", props.tag);
    if (props.sort !== "newest") qs.set("sort", props.sort);
    list.value = (await crApi("GET", "/debug" + (qs.toString() ? "?" + qs : ""))).questions;
    err.value = "";
  } catch (e) { err.value = e.message; }
}
watch(gate, g => { if (g === "open") { CR.view = "list"; CR.newActivity = false; load(); } }, { immediate: true });
function search(v) { CR.search = v.trim(); load(); }
function fresh() { CR.newActivity = false; load(); }
const preview = b => b.replace(/```[\s\S]*?```/g, " [code] ").slice(0, 160);
</script>

<template>
  <DebugGateView v-if="gate !== 'open'" :state="gate" />
  <div v-else class="dbwrap">
    <div class="dbhead"><div><h1>Debug Desk</h1><p class="meta">Stuck on an error? Ask the community. Help others by answering, and vote up the answers that work.</p></div><div class="row" style="margin:0"><RouterLink v-if="CR.admin" class="btn quiet" to="/debug-mod">Moderation</RouterLink><RouterLink class="btn" to="/debug-ask">Ask a question</RouterLink></div></div>
    <DbOnline />
    <div v-if="CR.demo" class="note" style="margin:0 0 1rem"><b>Preview.</b> Questions and answers here are kept in your browser, with pretend members. On the live site, Debug Desk is shared by real members.</div>
    <div class="dbbar"><label class="sr-only" for="dbsearch">Search questions</label><input id="dbsearch" type="search" placeholder="Search questions, for example: TypeError" :value="CR.search" @keydown.enter.prevent="search($event.target.value)" @search="search($event.target.value)">
      <div class="dbsort" role="group" aria-label="Sort"><RouterLink v-for="[k, t, h] in SORTS" :key="k" :to="h" :class="sort === k && !tag ? 'on' : ''" active-class="" exact-active-class="">{{ t }}</RouterLink></div></div>
    <p v-if="tag">Showing questions tagged <DbTags :tags="[tag]" /> <RouterLink class="linkbtn small" to="/debug">Clear</RouterLink></p>
    <p class="cnew" id="dbnew" :hidden="!CR.newActivity"><button class="btn small" data-a="dbfresh" @click="fresh">New activity: refresh</button></p>
    <div id="dblist">
      <p v-if="err" class="fb no">{{ err }}</p>
      <p v-else-if="!list" class="meta">Loading…</p>
      <template v-else-if="list.length">
        <p class="meta">{{ list.length }} {{ list.length === 1 ? "question" : "questions" }}</p>
        <article v-for="x in list" :key="x.id" class="dbq"><div class="dbstats"><span><b>{{ x.score }}</b> {{ Math.abs(x.score) === 1 ? "vote" : "votes" }}</span><span :class="x.accepted ? 'acc' : x.answers ? 'has' : ''"><b>{{ x.answers }}</b> {{ x.answers === 1 ? "answer" : "answers" }}</span><span v-if="x.files && x.files.length" class="dbclip" :title="x.files.length === 1 ? '1 attachment' : x.files.length + ' attachments'"><span aria-hidden="true">📎</span><b>{{ x.files.length }}</b><span class="sr-only">{{ x.files.length === 1 ? "attachment" : "attachments" }}</span></span></div>
          <div class="dbqb"><h3><RouterLink :to="'/debug-q-' + x.id">{{ x.title }}</RouterLink></h3><p class="meta">{{ preview(x.body) }}</p><div class="dbmeta"><DbTags :tags="x.tags" /><span class="meta"><CrAvatar :name="x.user.name" :uid="x.user.id" sz="sm" /> {{ x.user.name }} asked {{ crWhen(x.at) }}</span></div></div></article>
      </template>
      <p v-else class="meta crpad">No questions found. {{ CR.search || tag ? "Try another search, or ask it yourself." : "Be the first to ask." }}</p>
    </div>
  </div>
</template>
