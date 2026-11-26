/* Hash routes. createWebHashHistory reads an old address such as "#lesson-m5" as "/lesson-m5",
   so every address the legacy site used keeps working; links the app makes look like "#/lesson-m5". */
import { createRouter, createWebHashHistory } from "vue-router";
import { NODES, NODES1, CHECKS, PROJECTS } from "./data/content.js";
import { NODE, course, useProgress } from "./stores/progress.js";
import { CR, crRtClose, crPresenceStop } from "./services/debugdesk.js";
import { acct } from "./components/acctState.js";

import Home from "./views/Home.vue";
import Lesson from "./views/Lesson.vue";
import Checkpoint from "./views/Checkpoint.vue";
import Project from "./views/Project.vue";
import Syllabus from "./views/Syllabus.vue";
import Glossary from "./views/Glossary.vue";
import ErrorHelp from "./views/ErrorHelp.vue";
import Animations from "./views/Animations.vue";
import Anim from "./views/Anim.vue";
import Snippets from "./views/Snippets.vue";
import Snippet from "./views/Snippet.vue";
import MindMap from "./views/MindMap.vue";
import Roadmap from "./views/Roadmap.vue";
import DebugDesk from "./views/DebugDesk.vue";
import DebugQuestion from "./views/DebugQuestion.vue";
import DebugAsk from "./views/DebugAsk.vue";
import DebugModeration from "./views/DebugModeration.vue";
import Account from "./views/Account.vue";
import Privacy from "./views/Privacy.vue";
import Contact from "./views/Contact.vue";
import Rules from "./views/Rules.vue";

const next = c => "/" + useProgress().nextStop(c).h;
const toHome = { path: "/home" };

const routes = [
  { path: "/", component: Home },
  { path: "/home", component: Home },
  /* redirects */
  { path: "/learn", redirect: () => next() },
  { path: "/course-:id", redirect: to => course(to.params.id) && /^[a-z]+$/.test(to.params.id) ? next(to.params.id) : toHome },
  { path: "/lesson-:lv([01])-:n(\\d+)", component: Home, beforeEnter: to => { const o = (to.params.lv === "0" ? NODES : NODES1)[+to.params.n - 1]; return o ? { path: "/lesson-" + o.id, replace: true } : true; } },
  ...["pricing", "admin", "terms", "refunds", "connect", "chatroom"].map(p => ({ path: "/" + p, redirect: toHome })),
  { path: "/connect-:rest(.*)", redirect: toHome },
  { path: "/chatroom-:rest(.*)", redirect: toHome },
  /* pages: a lesson, checkpoint or project id that does not exist shows the home page, as before */
  { path: "/lesson-:id", component: Lesson, meta: { item: p => /^[a-z][0-9]+$/.test(p.id) && NODE[p.id] ? p.id : null } },
  { path: "/checkpoint-:c", component: Checkpoint, meta: { item: p => /^[a-z]+$/.test(p.c) && CHECKS[p.c] ? "cp:" + p.c : null } },
  { path: "/project-:id", component: Project, meta: { item: p => /^[a-z]+$/.test(p.id) && PROJECTS[p.id] ? "pj:" + p.id : null } },
  { path: "/syllabus", component: Syllabus },
  { path: "/glossary", component: Glossary },
  { path: "/errors", component: ErrorHelp },
  { path: "/animations", component: Animations },
  { path: "/anim-:id", component: Anim },
  { path: "/snippets", component: Snippets },
  { path: "/snippet-:id", component: Snippet },
  { path: "/mindmap", component: MindMap },
  { path: "/mindmap-:id", component: Roadmap },
  { path: "/debug", component: DebugDesk, props: { sort: "newest" } },
  { path: "/debug-votes", component: DebugDesk, props: { sort: "votes" } },
  { path: "/debug-unanswered", component: DebugDesk, props: { sort: "unanswered" } },
  { path: "/debug-tag-:tag(.*)", component: DebugDesk, props: to => ({ sort: "newest", tag: to.params.tag }) },
  { path: "/debug-ask", component: DebugAsk },
  { path: "/debug-mod", component: DebugModeration },
  { path: "/debug-q-:id(.+)", component: DebugQuestion, props: true },
  { path: "/debug-:rest(.*)", component: DebugDesk, props: { sort: "newest" } },
  { path: "/account", component: Account },
  { path: "/privacy", component: Privacy },
  { path: "/contact", component: Contact },
  { path: "/rules", component: Rules },
  { path: "/:pathMatch(.*)*", component: Home }
];

/* After deleting an account, Catalyst's sign-out reloads the site; the goodbye is on the Account page.
   (Set before the router is made, because the router reads the address when it is made.) */
if (acct.farewell && !/^#\/?account/.test(location.hash)) history.replaceState(history.state, "", location.pathname + location.search + "#/account");

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
});

/** The course item (lesson id, "cp:<course>" or "pj:<project>") a route shows, or null. */
export function routeItem(route) {
  const f = route.meta && route.meta.item;
  return f ? f(route.params) : null;
}

router.afterEach(to => {
  /* live Debug Desk updates only run while a Debug Desk page is open */
  if (!to.path.startsWith("/debug")) { crPresenceStop(); crRtClose(); CR.view = ""; }
});
