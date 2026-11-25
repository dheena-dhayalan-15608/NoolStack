# NoolStack: Education As A Service

A free learning site that teaches tech from absolute zero, one small step at a time. Each lesson has an animation, a hands-on activity, predictions, a quiz and practice tasks.

Two courses are ready:

- **Computer fundamentals**: what a computer is, why we need one, a short history, how it works inside, files and the terminal, and how data is stored.
- **Python**: getting set up, a first program, numbers, variables, types, text, input and conversion. More parts are listed as coming soon.

The home page also lists every course that is planned, marked as coming soon.

The site is a Vue 3 app (JavaScript, Vite, Vue Router with hash addresses, Pinia), hosted on Zoho Catalyst Web Client Hosting together with one Catalyst function for Debug Desk.

## What is in this repository

| Path | What it is |
|---|---|
| `web/` | The Vue app |
| `web/index.html` | The page: fonts, meta tags, the Catalyst Web SDK and the Zoho SalesIQ chat widget |
| `web/src/data/content.js` | The course content: lessons, quizzes, tasks, glossary, error help, planned courses, legal and social links |
| `web/src/data/animations.js` | The step-by-step animations |
| `web/src/data/snippets.js` | The snippets (short narrated videos) |
| `web/src/data/roadmaps.js` | The Mind Map roadmaps |
| `web/src/i18n/` | Language choice and on-screen translation (`index.js`), and the Tamil language pack (`ta.js`) |
| `web/src/stores/` | Progress, sign-in and theme (Pinia) |
| `web/src/services/catalyst.js` | Accounts and saving (guest mode, or Zoho Catalyst sign-in) |
| `web/src/services/debugdesk.js` | Debug Desk, and its preview stand-in |
| `web/src/services/python.js`, `tasks.js` | The in-browser Python runner, and the checks for "Your turn" tasks |
| `web/src/views/`, `web/src/components/` | The pages, and the pieces they are built from (lesson widgets in `components/widgets/`, task kinds in `components/tasks/`) |
| `web/src/styles/main.css` | All styling. Follows the browser's light or dark setting, with a theme switch |
| `web/public/` | Files copied as-is into the site: images, `vendor/` (Brython, Data Streams), `snippets/` (videos), `css/` (sign-in box styles) and `client-package.json` (settings Catalyst reads when it hosts the site) |
| `functions/community/` | The Debug Desk server function |
| `catalyst.json` | The Catalyst project: the website is `client/`, the function is in `functions/` |
| `client/` | The built website, made by `npm run build`. Not kept in git |

## Run it on your own computer

You need Node.js 22 or newer.

```
cd web
npm install
npm run dev
```

Then open the address it prints (usually `http://localhost:5173`). It runs in preview mode: progress is saved in that browser, and Debug Desk uses a stand-in with pretend members.

## Build it

```
cd web
npm run build
```

This writes the finished site to `client/` at the top of the repository. That folder is what Catalyst uploads. To try the built site, serve it as plain files, for example `npx serve client` from the top folder.

A smoke test opens every page and fails on any page error. Run it after a build:

```
cd web
npx playwright install chromium
npm run test:smoke
```

## Deploying to Catalyst

NoolStack is built for **Catalyst Web Client Hosting**: the site and the `community` function then share one web address, so sign-in, saving progress and Debug Desk work with no extra setup. (On Slate, the site would sit on a different address from the functions, which needs cross-domain sign-in.)

These steps follow the Catalyst documentation as of November 2026. They have not been tested against a live Catalyst project, so check each one against the console and the docs as you go.

1. Install the Catalyst CLI (needs Node.js): `npm install -g zcatalyst-cli`, then `catalyst login`.
2. In the top folder, link it to your project: `catalyst project:use` and choose your project. (If that command is not available in your CLI version, run `catalyst init`, choose the existing project, and keep the existing files when asked.)
3. Build the site: `cd web && npm install && npm run build && cd ..`
4. Install the function's packages: `cd functions/community && npm install && cd ../..`
5. Deploy everything: `catalyst deploy` (or one part at a time: `catalyst deploy --only client`, `catalyst deploy --only functions`).
6. In the console, finish the setup listed in "Debug Desk server and setup": the Data Store tables (plus `Progress` for saved lessons), the function's environment variables, the Data Streams channel, and Authentication (Embedded, with Public Signup on).
7. Open the web address the console shows for Web Client Hosting, check sign-in, and then use **Deploy to Production**.
8. Optional: under **Domain Mappings**, connect your own domain to the site.

`catalyst serve` runs the Catalyst version locally, after a build.

### Deploying with Catalyst Slate instead

Slate builds from the top of the repository. The `package.json` there lets it do that with its default Vue settings: `npm install` installs nothing at the top level, and `npm run build` builds `web/` into `dist/`, which is the folder Slate publishes. On Slate the site sits on a different address from the `community` function and Catalyst sign-in, so it runs in preview mode: guest progress only, and the Debug Desk stand-in.

## Turn on accounts

Sign-in and sign-up only work when the site is running on Catalyst. Everywhere else the site stays in guest mode, and the Account page shows the forms switched off. (`web/index.html` loads the Catalyst Web SDK and `/__catalyst/sdk/init.js`; when either cannot load, the site knows it is not on Catalyst.)

How the two forms work:

- **Sign in** shows Catalyst's own sign-in box. According to the Catalyst docs it offers email and password, Zoho sign-in and Google sign-in, plus sign-up and forgotten-password links. The site never sees a password.
- **Create an account** is this site's own form. It sends the first name, last name and email address to Catalyst with `catalyst.auth.signUp()`. Catalyst then emails the learner a link to set a password. Catalyst requires the last name and the email address.

To switch it on:

1. In the console, open Authentication and set up embedded sign-in.
2. Turn on Public Signup. Without it, only people you invite can create accounts.
3. Choose which sign-in providers to allow, such as Zoho and Google.
4. In Data Store, create a table named `Progress` with three columns:

| Column | Type | Holds |
|---|---|---|
| `owner` | Var Char | The learner's user id |
| `part` | Int | The position of this piece, starting at 0 |
| `state` | Text | A piece of their progress, as JSON text |

Progress is saved as text and split across several rows when it is long, so each learner has one or more rows.

5. In the table's scopes and permissions, let the App User role select, insert and update, and restrict it to the user's own rows. This matters: the query in `web/src/services/catalyst.js` filters by owner, but only the table permission actually stops one learner reading another's row.

## Sign-in look

The sign-in box (Catalyst Embedded Authentication) uses NoolStack's colours and fonts, and "Forgot password" opens inside the same box instead of Zoho's page. `web/src/services/catalyst.js` passes these settings to `catalyst.auth.signIn`:

| Setting | Value |
|---|---|
| `service_url` | `#account`: where Catalyst sends the learner after signing in (without it, Catalyst goes to `/app/`, which is blank on Slate) |
| `css_url` | `css/embeddediframe.css` |
| `is_customize_forgot_password` | `true` |
| `forgot_password_id` | the same box as the sign-in (`login`) |
| `forgot_password_css_url` | `css/forgotpwd.css` |

The paths are worked out from where the site is hosted, so they work under `/app/` too. The two files are in `web/public/css/`.

Catalyst asks that its own stylesheet comes first, with custom styles after it. Each file starts by importing Catalyst's stylesheet from `api.catalyst.zoho.com` and then adds NoolStack's look. If the sign-in box ever shows unstyled or broken, replace the `@import` line with the full contents of Catalyst's file (download it from the "Styling Embedded Authentication" page in the Catalyst docs), keeping NoolStack's styles after it. The box follows the browser's light or dark setting.

## Live chat

`web/index.html` ends with the Zoho SalesIQ widget snippet. It loads the chat box from `salesiq.zohopublic.in` and shows it on every page of the hosted site.

- If the chat box does not show up on the hosted site, check in SalesIQ that the widget is enabled and that your site's address is allowed.
- To remove it, delete the two `<script>` lines under the "Zoho SalesIQ live chat" comment.

## Before opening it to the public

- **Privacy policy.** The site stores names, email addresses and progress. A public site that collects personal data needs a privacy policy, and the rules depend on where your learners live. Get this checked by someone qualified.
- **The chat box.** SalesIQ records visits and conversations, and may set cookies. Say so in the privacy policy, and check whether your learners' countries require a consent banner before it loads.
- **Fake sign-ups.** A public sign-up form attracts automated sign-ups. Check what protection Catalyst offers, and watch the user list after launch.
- **The sign-up email.** Check the wording and sender of the email Catalyst sends, since it is the first thing a new learner sees.
- **Test with a real account.** Create an account, set the password, sign in, complete a lesson, sign out, and sign in on another device to confirm the progress followed you.

## Deleting an account

Signed-in learners can delete their own account at the bottom of the Account page (`#/account`). They type DELETE to confirm. The `community` function (`POST /server/community/account/delete`) then:

- deletes their rows in `Progress`, their votes in `DebugVotes` and their row in `Members`;
- keeps their Debug Desk questions and answers, so other learners' answers still make sense, but changes the author to "Deleted member" and unlinks them (`user_id` becomes `deleted`); their reports are unlinked the same way;
- deletes the Catalyst user, so the name, email address and sign-in are gone.

The browser then clears its own copy of the progress and signs out. Guests have no account; "Start again" on the home page clears their progress.

## Debug Desk

At `#/debug` (in the Resources menu), for members only, including for reading. Questions and answers about code and computers, like Stack Overflow:

- Ask with a title, the details (code goes between lines of three backticks), and up to 5 tags.
- Answers, up and down votes on questions and answers, and **✓ Accept** for the person who asked. Accepted answers are shown first, then the highest-voted.
- Search, filter by tag, and sort by Newest, Most votes or Unanswered.
- Every question and answer is checked by AI before it appears, with a version of the check that expects code and error messages. Members can report questions and answers, and moderators can remove them.
- Live updates: a "New activity" button on the list, and new answers appear on an open question.

Members first choose a display name and agree to the community rules; other members see that name, never an email address. Talking with the community happens on Arattai, so the site has no chat of its own.

### Debug Desk server and setup

Debug Desk runs on the `community` function (Node.js 22, Advanced I/O, reached at `/server/community`).

Data Store tables, with no direct access for app users (only the function reads and writes them):

| Table | Columns |
|---|---|
| `Members` | `user_id` (unique), `name` |
| `DebugQuestions` | `user_id`, `name`, `title`, `body` (Text), `tags`, `accepted_id`, `answer_count` (Int), `status` |
| `DebugAnswers` | `question_id`, `user_id`, `name`, `body` (Text), `status` |
| `DebugVotes` | `item_kind` (`q` or `a`), `item_id`, `user_id`, `value` (Int, 1 or -1) |
| `Reports` | `reporter_id`, `reporter_name`, `kind`, `item_id`, `reason`, `excerpt`, `status` |

The function's environment variables, set in the console under Serverless → Functions → `community` → Configuration. They are deliberately not listed in `functions/community/catalyst-config.json`, so `catalyst deploy` leaves the console values alone:

- `ADMIN_EMAILS`: the moderators' sign-in emails. They see a **Moderation** button on Debug Desk.
- `ANTHROPIC_API_KEY`: a Claude API key for the check that every question and answer is about learning. Each post costs a small amount. Without a key, posting is paused with a message saying so. `MODERATION_MODEL` is the model used (default `claude-haiku-5-5`).
- `DS_CHANNEL_ID`: the ID of a Data Streams channel, for live updates. The events only say that a question has new activity; the browser then fetches it through its signed-in session. Without it, Debug Desk still works; members refresh to see new activity.

Data Streams uses Zoho's `@zcatalyst/datastreams` browser client, bundled as `web/public/vendor/datastreams-ws.min.js` (Apache License 2.0).

## Addresses

Every page has a hash address, so links keep working however the site is hosted. The app writes them as `#/lesson-m5`; older links written as `#lesson-m5` open the same page.

- Pages: `#home`, `#lesson-<id>`, `#checkpoint-<course>`, `#project-<id>`, `#syllabus`, `#glossary`, `#errors`, `#animations`, `#anim-<id>`, `#snippets`, `#snippet-<id>`, `#mindmap`, `#mindmap-<course>`, `#debug`, `#debug-ask`, `#debug-q-<id>`, `#debug-tag-<tag>`, `#debug-votes`, `#debug-unanswered`, `#debug-mod`, `#account`, `#privacy`, `#contact`, `#rules`.
- `#learn` and `#course-<id>` go to the learner's next stop; `#lesson-0-<n>` and `#lesson-1-<n>` go to the matching lesson; `#pricing`, `#admin`, `#terms`, `#refunds`, `#connect…` and `#chatroom…` go to the home page.

## Saved in the browser

| Key | Holds |
|---|---|
| `ztp-progress-v1` | Guest progress (and a copy of signed-in progress) |
| `ztp-theme` | Theme choice |
| `eaas-lang` | Language choice |
| `noolstack-demo-debugdesk` | Debug Desk preview data |

These names and formats are the same as on the earlier version of the site, so learners keep their progress and settings.

## Menu and footer

The top menu is Courses, Mind Map, Syllabus, **Resources** (Animations, Snippets, Glossary, Error help, Debug Desk). Resources opens on hover with a mouse, and on tap or with the keyboard (Enter or ↓, arrow keys to move, Esc to close).

The footer has four columns (Resources, Community, NoolStack, Contact); the NoolStack column also links to NoolStack AI (https://noolstack-ai.onslate.in, opens in a new tab); the Community column links to Debug Desk, the community rules and Arattai. Below them are social links, policy links and a dark bottom strip with the logo. Social links are set in `SOCIAL` at the end of `web/src/data/content.js`; until a link is filled in, its button is shown faded and does nothing.

## Mind Map

At `#/mindmap`: every subject on NoolStack laid out as a top-to-bottom path, with a centre line and the subjects branching off each step, like roadmap.sh (the roadmaps themselves are NoolStack's own). The overview shows all 63 subjects in 8 groups. Computer fundamentals and Python have full roadmaps (`#/mindmap-cf`, `#/mindmap-py`) that include the lessons on the site today and the topics still to come.

Tapping a topic opens a panel with a short description, a link to its lesson when there is one, and "Mark as done". Ticked topics are saved with the learner's progress (in `map`), and each roadmap shows how many topics are done.

The roadmaps are in `web/src/data/roadmaps.js` (`ROADMAPS`). To add one, give it stages, give each stage topics, and link a topic to a page with `go` (for example `lesson-m5`). Mark stages that are not built yet with `soon: true`.

## Snippets

Short narrated videos, each one to three minutes long, at `#/snippets`. Each one plays in a normal video player with play and pause, a timeline, volume, full screen, 5-second back and forward buttons, keyboard keys (Space, ← and →), captions and chapters.

| File | What it is |
|---|---|
| `web/src/data/snippets.js` | The list of snippets, with each one's narration script, chapter start times and file names |
| `web/public/snippets/computer.mp4` | "How a computer works" (1 min 41 s), H.264 video with AAC audio |
| `web/public/snippets/computer.webm` | The same video as WebM, for browsers that cannot play MP4 |
| `web/public/snippets/computer.en.vtt` | English captions, timed to the voice |
| `web/public/snippets/computer-poster.jpg` | The picture shown before the video starts |

The narration voice is "Southern English Female" from the Piper text-to-speech project, trained on the OpenSLR 83 dataset and released under CC BY-SA 4.0. The video was made by rendering the animated scene drawings frame by frame and adding the spoken narration. Listed as coming soon: how Python runs code, paying by scanning a QR code, and end-to-end encryption.

## Free forever

NoolStack is free for everyone, with no plans and no payments. Every lesson, quiz, task, checkpoint and project is open to all learners, signed in or not. The privacy and contact pages are linked in the footer; fill in the owner's name in `LEGAL` in `web/src/data/content.js` to remove their "Draft" notice.

## Tasks answered on the page

Every "Your turn" task is answered on the site itself. Each task in `content.js` has a `kind` (set in `TASKX` at the end of the file):

| Kind | What the learner does | How it is checked |
|---|---|---|
| `text` | Writes an answer | Against the task's key points. Only answers under 4 words are refused as too short; anything longer gets the checklist. A sample answer is offered after 3 tries |
| `choice` | Picks one or several answers | Automatically |
| `sort` | Puts each item in a group | Automatically |
| `fill` | Types a short answer | Exact answers, or a named check |
| `order` | Drags items into order (arrow buttons for keyboard users) | Automatically |
| `term` | Types commands in a practice terminal | When the goal is reached |
| `py` | Writes and runs a Python program | Runs the program with test answers, then a named check |
| `repl` | Types lines at a practice Python prompt | When the goal is reached |

The named checks are in `web/src/services/tasks.js` (`CHECKS_FILL`, `CHECKS_PY`, `CHECKS_REPL`, `CHECKS_TERM`). Each kind's answer area is a component in `web/src/components/tasks/`.

Python runs in the browser with Brython 3.15.0, in `web/public/vendor/`. It loads only when a learner first runs Python. `brython_mini_stdlib.js` is a trimmed library with just the `sys` and `browser` modules the runner needs. Limits to know:

- Error messages can be worded a little differently from Python on a computer. The page says so.
- A program that never ends, such as `while True:` with no way out, will freeze the page. Before lessons on loops, add a guard.
- Only built-in functions work. Importing other modules needs more of Brython's library.

## Languages

The site asks each visitor to choose a language on their first visit, and the language button in the header lets them change it later. The choice is kept in their browser.

English is built in. Tamil is in progress, in `web/src/i18n/ta.js`, and is loaded only for learners who choose it:

- **Translated so far:** all menus, buttons and messages; course names and descriptions; badges; animation titles; the error help page; and three lessons (What a computer is, Why we need computers, A short history of computers).
- **Still in English:** every other lesson, both checkpoint quizzes and the three projects. These show a short Tamil note saying the lesson is not yet translated.
- **Kept in English on purpose:** code, commands, Python's own words and error messages, and technology names such as JavaScript or Docker, since that is what learners will see on their own computers.

The Tamil text was written by an AI model. Have a fluent Tamil speaker review it, especially the technical terms, before relying on it.

How a language pack works (see `web/src/i18n/index.js`):

- Lesson and course content is replaced by id before the page is drawn.
- Menus and messages are translated on screen by their exact English text, plus a list of patterns for text that contains numbers or names. If you change an English phrase in a component, update the matching entry in the language pack too, or that phrase will appear in English.
- To add another language, copy `ta.js`, translate it, add it to `PACKS` in `index.js`, and add it to the language chooser (`web/src/components/LanguageChooser.vue`).

## Adding or changing content

Everything a learner reads is in `web/src/data/content.js`.

- **Lessons** are objects in three lists: `NODESC`, `NODES` and `NODES1`. Each has an idea, an analogy, a worked example, predictions, a quiz, tasks, common mistakes and new words. A lesson's `id` must never change, because learners' saved progress is keyed by it. A lesson's widget is named by its `w` field, and the widgets are listed in `web/src/components/widgets/index.js`.
- **Courses** are in `COURSES`. Each course has sections, and each section lists lesson ids in order. An id starting with `cp:` is a checkpoint quiz, and one starting with `pj:` is a project. Moving a lesson between courses is just moving its id.
- **Checkpoint questions** are in `CHECK` and `CHECK1`. `CHECKS` says which questions belong to which course.
- **Projects** are in `PROJECTS`.
- **Planned courses** shown as coming soon are in `PLANNED`.
- **Extra common mistakes** are in `MORE`, and **"Going deeper" points** are in `DEEP`, both keyed by lesson id.
- **Animations** are in `web/src/data/animations.js`. Each has a caption per step and a `draw(step)` function.
- The site name appears in `web/index.html` (the title), in the header (`web/src/components/SiteHeader.vue`) and on the home page (`web/src/views/Home.vue`).
- The logo is `web/public/logo.png`, a round 256 by 256 pixel image. It is used in the header and as the browser tab icon.

To add a new course: write its lessons, add an entry to `COURSES`, give it a checkpoint in `CHECKS` if it has one, and remove its name from `PLANNED`.

## Things to know

- **Not yet tested on Catalyst.** The sign-in and saving code was tested against a stand-in for the Catalyst SDK, not the real service.
- **SDK version.** `web/index.html` loads the Catalyst Web SDK 4.6.2 with a script tag. Catalyst's docs mark this SDK as being replaced by their newer JavaScript SDK, so it may need migrating later.
- **Long progress is split into pieces.** `web/src/services/catalyst.js` cuts the saved text into pieces of 9,000 characters, one row each, on the assumption that a Text column holds at least that much. Check the real limit of the Text type in your Data Store, and lower `CHUNK` if it is smaller.
- **Guest progress.** If a guest has progress and then signs in, the newer of the two copies wins.
