<script setup>
/* One question with its answers: votes, accepting an answer, reporting, and posting an answer. */
import { ref, watch } from "vue";
import { CR, crApi, crWhen, crMd } from "../services/debugdesk.js";
import { toast } from "../services/feedback.js";
import { useDebugGate } from "../components/useDebugGate.js";
import DebugGateView from "../components/DebugGateView.vue";
import DbTags from "../components/DbTags.vue";
import CrAvatar from "../components/CrAvatar.vue";
import DbVote from "../components/DbVote.vue";
import ReportDialog from "../components/ReportDialog.vue";
import DbFiles from "../components/DbFiles.vue";

const props = defineProps({ id: String });
const gate = useDebugGate();
const d = ref(null), err = ref(""), answer = ref(""), aerr = ref(""), posting = ref(false), report = ref(null);

async function load() {
  try { d.value = await crApi("GET", "/debug/" + props.id); err.value = ""; }
  catch (e) { err.value = e.message; }
}
watch(gate, g => { if (g === "open") { CR.view = props.id; load(); } }, { immediate: true });
watch(() => CR.reloadQ, load);

async function post() {
  posting.value = true;
  try { await crApi("POST", "/debug/" + props.id + "/answer", { body: answer.value }); toast("Answer posted."); answer.value = ""; aerr.value = ""; await load(); }
  catch (e) { aerr.value = e.message; }
  posting.value = false;
}
async function accept(aid) { try { await crApi("POST", "/debug/" + props.id + "/accept", { answer: aid }); await load(); } catch (e) { toast(e.message); } }
async function sendReport(r) {
  const it = report.value;
  report.value = null;
  if (r === null) return;
  try { await crApi("POST", "/report", { kind: it.kind, id: it.id, reason: r, excerpt: it.excerpt }); toast("Thank you. A moderator will look at it."); }
  catch (e) { toast(e.message); }
}
</script>

<template>
  <DebugGateView v-if="gate !== 'open'" :state="gate" />
  <div v-else class="dbwrap"><p class="crumbs"><RouterLink to="/debug">Debug Desk</RouterLink></p><div id="dbbody">
    <p v-if="err" class="fb no">{{ err }}</p>
    <p v-else-if="!d" class="meta">Loading…</p>
    <template v-else>
      <h1 class="dbtitle">{{ d.question.title }}</h1><p class="meta">Asked {{ crWhen(d.question.at) }} by {{ d.question.user.name }}</p>
      <div class="dbpost"><DbVote kind="q" :item="d.question" /><div class="dbpb"><div class="dbtext" v-html="crMd(d.question.body)"></div><DbFiles v-if="d.question.files && d.question.files.length" :key="d.question.id" :qid="d.question.id" :files="d.question.files" /><div class="dbmeta"><DbTags :tags="d.question.tags" /><span><button v-if="d.question.user.id !== CR.me.id" class="linkbtn small" data-a="crreport" @click="report = { kind: 'debugq', id: d.question.id, excerpt: d.question.title }">Report</button></span></div></div></div>
      <h2 class="dbah">{{ d.answers.length }} {{ d.answers.length === 1 ? "answer" : "answers" }}</h2>
      <div v-for="a in d.answers" :key="a.id" :class="['dbpost', { accepted: a.id === d.question.accepted }]" :id="'dba-' + a.id"><DbVote kind="a" :item="a" /><div class="dbpb"><p v-if="a.id === d.question.accepted" class="dbacc">✓ Accepted answer</p><div class="dbtext" v-html="crMd(a.body)"></div>
        <div class="dbmeta"><span class="meta"><CrAvatar :name="a.user.name" :uid="a.user.id" sz="sm" /> {{ a.user.name }} answered {{ crWhen(a.at) }}</span><span><template v-if="d.question.user.id === CR.me.id"><button class="btn quiet small" data-a="dbaccept" @click="accept(a.id)">{{ a.id === d.question.accepted ? "Undo accept" : "✓ Accept this answer" }}</button> </template><button v-if="a.user.id !== CR.me.id" class="linkbtn small" data-a="crreport" @click="report = { kind: 'debuga', id: a.id, excerpt: a.body.slice(0, 120) }">Report</button></span></div></div></div>
      <div class="panel dbanswer"><h2 style="margin-top:0">Your answer</h2><label class="sr-only" for="dbabody">Your answer</label><textarea id="dbabody" rows="7" maxlength="15000" placeholder="Explain the fix. Put code between lines of three backticks: ```" v-model="answer"></textarea>
        <p class="meta">{{ CR.demo ? "In the preview, a simple stand-in check is used." : "Answers are checked by AI before they appear." }}</p><p class="err" id="dbaerr" role="alert">{{ aerr }}</p><button class="btn" data-a="dbanswer" :disabled="posting" @click="post">{{ posting ? "Checking…" : "Post your answer" }}</button></div>
    </template>
  </div></div>
  <ReportDialog v-if="report" title="Report this" label="What is wrong with it? (optional)" @done="sendReport" />
</template>
