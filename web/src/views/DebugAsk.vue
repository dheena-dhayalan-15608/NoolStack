<script setup>
/* Ask a question: a title, what is going on, the error message and the code (each optional, in their own
   boxes), up to 3 attachments (screenshots or text files: choose, drop or paste them) and up to 5 tags.
   The error message and the code are added to the question as code blocks, so they show as code. */
import { ref, computed, watch, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { CR, crApi, crPrepareFile, crSize, CR_MAX_FILES } from "../services/debugdesk.js";
import { toast } from "../services/feedback.js";
import { useDebugGate } from "../components/useDebugGate.js";
import DebugGateView from "../components/DebugGateView.vue";

const router = useRouter();
const gate = useDebugGate();
watch(gate, g => { if (g === "open") CR.view = "ask"; }, { immediate: true });
const title = ref(""), body = ref(""), errorText = ref(""), code = ref(""), lang = ref("python"), tags = ref(""), err = ref(""), posting = ref(false);
const files = ref([]), fileErr = ref(""), dragging = ref(false), picker = ref(null);
const SUGGEST = ["python", "terminal", "files", "binary", "types", "input", "errors", "pycharm"];
const LANGS = [["python", "Python"], ["javascript", "JavaScript"], ["html", "HTML"], ["css", "CSS"], ["java", "Java"], ["c", "C"], ["cpp", "C++"], ["sql", "SQL"], ["shell", "Terminal / shell"], ["text", "Other"]];
function addTag(t) { const list = tags.value.split(/[\s,]+/).filter(Boolean); if (!list.includes(t) && list.length < 5) tags.value = list.concat(t).join(", "); }

async function addFiles(list) {
  fileErr.value = "";
  for (const f of list) {
    if (files.value.length >= CR_MAX_FILES) { fileErr.value = "You can attach up to 3 files."; break; }
    try { files.value.push(await crPrepareFile(f)); } catch (e) { fileErr.value = e.message; }
  }
}
function removeFile(k) { const f = files.value[k]; if (f.url) URL.revokeObjectURL(f.url); files.value.splice(k, 1); }
onBeforeUnmount(() => files.value.forEach(f => f.url && URL.revokeObjectURL(f.url)));
function onPick(e) { addFiles([...e.target.files]); e.target.value = ""; }
function onDrop(e) { dragging.value = false; addFiles([...(e.dataTransfer?.files || [])]); }
/* a screenshot pasted anywhere in the form (text pastes go into the box as usual) */
function onPaste(e) {
  const list = [...(e.clipboardData?.files || [])];
  if (!list.length) return;
  e.preventDefault();
  addFiles(list.map((f, k) => (f.name && f.name !== "image.png" ? f : new File([f], "screenshot-" + (files.value.length + k + 1) + "." + (f.type.split("/")[1] || "png"), { type: f.type }))));
}

/* the question as posted: what is going on, then the error message and the code as code blocks */
const fence = s => s.replace(/```/g, "ˋˋˋ");
const fullBody = computed(() => {
  let s = body.value.trim();
  if (errorText.value.trim()) s += "\n\nError message:\n```text\n" + fence(errorText.value.trim()) + "\n```";
  if (code.value.trim()) s += "\n\nCode:\n```" + lang.value + "\n" + fence(code.value.replace(/\s+$/, "")) + "\n```";
  return s;
});
async function ask() {
  if (body.value.trim().length < 10) { err.value = "Describe the problem: what you tried, and what happened."; return; }
  posting.value = true; err.value = "";
  try {
    const d = await crApi("POST", "/debug", { title: title.value, body: fullBody.value, tags: tags.value, files: files.value.map(f => ({ name: f.name, type: f.type, size: f.size, data: f.data })) });
    toast("Question posted."); router.push("/debug-q-" + d.id);
  } catch (e) { err.value = e.message; posting.value = false; }
}
</script>

<template>
  <DebugGateView v-if="gate !== 'open'" :state="gate" />
  <div v-else class="dbwrap"><p class="crumbs"><RouterLink to="/debug">Debug Desk</RouterLink></p><h1>Ask a question</h1>
    <div class="panel dbaskform" @paste="onPaste">
      <div class="field"><label for="dbtitle">Title</label><p class="meta" style="margin:0 0 .3rem">Sum up the problem, for example: “TypeError when adding a number to input()”.</p><input id="dbtitle" maxlength="150" v-model="title"></div>
      <div class="field"><label for="dbbody">What are you trying to do, and what happens?</label><p class="meta" style="margin:0 0 .3rem">Say what you expected, what happened instead, and what you have tried.</p><textarea id="dbbody" class="prose" rows="5" maxlength="6000" v-model="body"></textarea></div>
      <div class="field"><label for="dberrmsg">Error message <span class="meta">(optional)</span></label><p class="meta" style="margin:0 0 .3rem">Paste the whole message, including the lines above it.</p><textarea id="dberrmsg" rows="4" maxlength="4000" spellcheck="false" placeholder='Traceback (most recent call last): …' v-model="errorText"></textarea></div>
      <div class="field"><div class="dbcodehead"><label for="dbcode">Code <span class="meta">(optional)</span></label><label class="sr-only" for="dblang">Language</label><select id="dblang" v-model="lang"><option v-for="[k, t] in LANGS" :key="k" :value="k">{{ t }}</option></select></div><p class="meta" style="margin:0 0 .3rem">The smallest piece of code that shows the problem.</p><textarea id="dbcode" rows="8" maxlength="4800" spellcheck="false" v-model="code"></textarea></div>
      <div class="field"><span class="dblabel" id="dbfilesh">Screenshots and files <span class="meta">(optional)</span></span>
        <div :class="['dbdrop', { on: dragging }]" role="group" aria-labelledby="dbfilesh" @dragover.prevent="dragging = true" @dragleave="dragging = false" @drop.prevent="onDrop">
          <p>Drop screenshots or text files here, paste a screenshot, or <button type="button" class="linkbtn" data-a="dbpick" :disabled="files.length >= 3" @click="picker.click()">choose files</button>.</p>
          <p class="meta">Up to 3: screenshots (PNG, JPEG, WebP or GIF, up to 2.5 MB) or text files (.txt, .log, .py and similar, up to 100 KB).</p>
          <input ref="picker" type="file" multiple hidden accept="image/png,image/jpeg,image/webp,image/gif,.txt,.log,.py,.js,.mjs,.ts,.json,.md,.csv,.html,.css,.java,.c,.h,.cpp,.cs,.go,.rs,.rb,.php,.sh,.sql,.xml,.yml,.yaml,.ini,.toml" @change="onPick">
        </div>
        <ul v-if="files.length" class="dbfiles">
          <li v-for="(f, k) in files" :key="k"><img v-if="f.image" :src="f.url" alt=""><span v-else class="dbfileicon" aria-hidden="true">TXT</span><span class="dbfilename">{{ f.name }}<span class="meta">{{ crSize(f.size) }}</span></span><button type="button" class="linkbtn small" data-a="dbunfile" :aria-label="'Remove ' + f.name" @click="removeFile(k)">Remove</button></li>
        </ul>
        <p class="err" role="alert">{{ fileErr }}</p>
      </div>
      <div class="field"><label for="dbtags">Tags (up to 5, separated by commas)</label><input id="dbtags" maxlength="120" placeholder="python, input, types" v-model="tags"></div>
      <p class="meta">Suggested: <template v-for="(t, k) in SUGGEST" :key="t"><template v-if="k">{{ " " }}</template><button class="dbtag" data-a="dbaddtag" @click="addTag(t)">{{ t }}</button></template></p>
      <p class="meta">{{ CR.demo ? "In the preview, a simple stand-in check is used." : "Questions, screenshots and files are checked by AI before they appear, to keep Debug Desk about code and computers." }}</p><p class="err" id="dberr" role="alert">{{ err }}</p>
      <div class="row"><button class="btn" data-a="dbask" :disabled="posting" @click="ask">{{ posting ? "Checking…" : "Post your question" }}</button><RouterLink class="btn quiet" to="/debug">Cancel</RouterLink></div></div></div>
</template>
