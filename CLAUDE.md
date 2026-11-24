# NoolStack

Free tech education, "Education As A Service", in English and Tamil. Lessons start from absolute zero; every lesson has an animation, a hands-on widget, predictions, a quiz and tasks answered on the page.

## Layout

- `web/`: the Vue 3 app (JavaScript, `<script setup>`, Vite, Vue Router with hash history, Pinia).
  - `src/data/`: all course content (`content.js`), animations, snippets, roadmaps, badge art.
  - `src/i18n/`: the Tamil pack (`ta.js`) and the translation engine (translates rendered text by its exact English wording).
  - `src/stores/`: Pinia stores for progress, auth and settings.
  - `src/services/`: Catalyst sign-in and saving, Debug Desk API and preview stand-in, Python (Brython), task checks.
  - `src/views/` (one per page) and `src/components/` (`widgets/` for the lesson widgets, `tasks/` for the task kinds).
  - `public/`: copied as-is into the build (Brython and Data Streams in `vendor/`, videos in `snippets/`, sign-in box CSS in `css/`, images, `client-package.json`).
- `functions/community/`: the Debug Desk Catalyst function. It is finished; change it only when asked.
- `catalyst.json`: client source `client`, functions `functions`.
- `client/`: build output, not in git.

## Run, build, deploy

- Develop: `cd web && npm install && npm run dev`. Without Catalyst the site runs in preview mode (guest progress, Debug Desk stand-in).
- Build: `cd web && npm run build` writes `client/` at the repo root.
- Smoke test: after a build, `cd web && npx playwright install chromium && npm run test:smoke`.
- Deploy: `catalyst deploy` from the repo root (after `cd functions/community && npm install`).

## Rules

- Keep it free. No Connect, Code Lab, plans or payments.
- Keep the saved-data keys: `ztp-progress-v1`, `ztp-theme`, `eaas-lang`, `noolstack-demo-debugdesk`, and the `Progress` table format (owner, part, state, 9,000-character chunks).
- Hash routes only (`createWebHashHistory`). Old addresses such as `#lesson-m5` must keep working.
- Lesson ids never change: saved progress is keyed by them.
- Learner-facing text is plain, friendly English, with Tamil in `src/i18n/`. Changing an English phrase means updating its entry in `ta.js` too.
