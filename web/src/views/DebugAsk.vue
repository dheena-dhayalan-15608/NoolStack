<script setup>
/* Ask a question: a title, the details (code between lines of three backticks) and up to 5 tags. */
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { CR, crApi } from "../services/debugdesk.js";
import { toast } from "../services/feedback.js";
import { useDebugGate } from "../components/useDebugGate.js";
import DebugGateView from "../components/DebugGateView.vue";

const router = useRouter();
const gate = useDebugGate();
watch(gate, g => { if (g === "open") CR.view = "ask"; }, { immediate: true });
const title = ref(""), body = ref(""), tags = ref(""), err = ref(""), posting = ref(false);
const SUGGEST = ["python", "terminal", "files", "binary", "types", "input", "errors", "pycharm"];
function addTag(t) { const list = tags.value.split(/[\s,]+/).filter(Boolean); if (!list.includes(t) && list.length < 5) tags.value = list.concat(t).join(", "); }
async function ask() {
  posting.value = true;
  try { const d = await crApi("POST", "/debug", { title: title.value, body: body.value, tags: tags.value }); toast("Question posted."); router.push("/debug-q-" + d.id); }
  catch (e) { err.value = e.message; posting.value = false; }
}
</script>

<template>
  <DebugGateView v-if="gate !== 'open'" :state="gate" />
  <div v-else class="dbwrap"><p class="crumbs"><RouterLink to="/debug">Debug Desk</RouterLink></p><h1>Ask a question</h1>
    <div class="panel"><div class="field"><label for="dbtitle">Title</label><p class="meta" style="margin:0 0 .3rem">Sum up the problem, for example: “TypeError when adding a number to input()”.</p><input id="dbtitle" maxlength="150" v-model="title"></div>
      <div class="field"><label for="dbbody">What are you trying to do, and what happens?</label><p class="meta" style="margin:0 0 .3rem">Include the code and the full error message. Put code between lines of three backticks: <code>```</code></p><textarea id="dbbody" rows="10" maxlength="15000" v-model="body"></textarea></div>
      <div class="field"><label for="dbtags">Tags (up to 5, separated by commas)</label><input id="dbtags" maxlength="120" placeholder="python, input, types" v-model="tags"></div>
      <p class="meta">Suggested: <template v-for="(t, k) in SUGGEST" :key="t"><template v-if="k">{{ " " }}</template><button class="dbtag" data-a="dbaddtag" @click="addTag(t)">{{ t }}</button></template></p>
      <p class="meta">{{ CR.demo ? "In the preview, a simple stand-in check is used." : "Questions are checked by AI before they appear, to keep Debug Desk about code and computers." }}</p><p class="err" id="dberr" role="alert">{{ err }}</p>
      <div class="row"><button class="btn" data-a="dbask" :disabled="posting" @click="ask">{{ posting ? "Checking…" : "Post your question" }}</button><RouterLink class="btn quiet" to="/debug">Cancel</RouterLink></div></div></div>
</template>
