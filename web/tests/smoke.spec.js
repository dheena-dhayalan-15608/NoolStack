/* Opens every route and fails on any page error. Old addresses (#lesson-m5) are used on purpose,
   to check that they still work. */
import { test, expect } from "@playwright/test";

const LESSONS = "c1,c2,c3,n1,n2,n3,n4,n5,n6,n7,n8,n9,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12".split(",");
const ANIMS = "history,ipo,cpu,ramssd,robot,path,terminal,prompts,script,bits,binary,ascii,unicode,share,variable,plus,fstring,input,convert,float,comment".split(",");
const PAGES = ["home", "syllabus", "glossary", "errors", "animations", "snippets", "snippet-computer", "mindmap", "mindmap-cf", "mindmap-py",
  "checkpoint-cf", "checkpoint-py", "project-hello", "project-tip", "project-machine",
  "debug", "debug-ask", "debug-q-41", "debug-tag-python", "debug-votes", "debug-unanswered", "debug-mod",
  "account", "privacy", "contact", "rules"]
  .concat(LESSONS.map(id => "lesson-" + id), ANIMS.map(id => "anim-" + id));
const REDIRECTS = [["learn", "/lesson-c1"], ["course-py", "/lesson-n7"], ["lesson-0-1", "/lesson-n1"], ["lesson-1-5", "/lesson-m5"],
  ["pricing", "/home"], ["admin", "/home"], ["terms", "/home"], ["refunds", "/home"], ["connect-room", "/home"], ["chatroom", "/home"]];

for (const lang of ["en", "ta"]) {
  test(`every page opens without errors (${lang})`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.addInitScript(l => { try { localStorage.setItem("eaas-lang", l); } catch (e) { /* ignore */ } }, lang);
    for (const r of PAGES) {
      await page.goto("/#" + r);
      await expect(page.locator("#main h1").first(), r).toBeVisible();
    }
    expect(errors).toEqual([]);
  });
}

test("old addresses redirect as before", async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem("eaas-lang", "en"); } catch (e) { /* ignore */ } });
  for (const [from, to] of REDIRECTS) {
    await page.goto("/#" + from);
    await expect(page, from).toHaveURL(new RegExp("#" + to + "$"));
  }
});
