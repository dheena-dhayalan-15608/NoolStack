<script setup>
import { LEGAL } from "../data/content.js";
import { who, mail, phone, phoneShown } from "../components/LegalBits.js";
import DraftNote from "../components/DraftNote.vue";
import LegalNav from "../components/LegalNav.vue";
</script>

<template>
  <h1>Privacy policy</h1><p class="meta" style="margin-top:.6rem">Last updated {{ LEGAL.updated }}</p><DraftNote />
  <div class="legal">
    <p>NoolStack (Education As A Service) is a free online learning website run by {{ who }}, an individual based in India.</p>
    <h2>What we collect</h2><ul class="deep"><li><b>Your account:</b> your name and email address, when you create an account.</li><li><b>Your progress:</b> which lessons you have finished, your answers and your points, so you can continue on any device.</li><li><b>In Debug Desk:</b> the display name you choose, and the questions, answers and votes you post. Other members see your display name and your posts, never your email address.</li><li><b>In your browser:</b> your chosen language and theme, and your progress while you are not signed in.</li></ul>
    <h2>Why</h2><p>Only to run your account, show your progress, and answer your questions. We do not sell your information or use it for advertising. NoolStack is free, so we never ask for payment details.</p>
    <h2>Where it is kept</h2><p>Accounts and progress are stored with Zoho Catalyst, in Zoho’s data centre for India. Passwords are handled by Zoho and are never seen by NoolStack.</p>
    <h2>Services we use</h2><p>Debug Desk questions and answers are sent to Anthropic’s Claude AI service, only to check that they are about learning before they are published.</p><h2>The chat box</h2><p>The chat box in the corner is provided by Zoho SalesIQ. It keeps its own record of your visits and conversations, and may use cookies.</p>
    <h2>Your choices</h2><p>You can delete your account yourself, at any time, on the <RouterLink to="/account">Account page</RouterLink>. That deletes your account, your name, your email address and all your progress. Questions and answers you posted in Debug Desk are kept for other learners, shown as written by “Deleted member”.</p><p>You can also ask to see, correct or delete your information by <template v-if="mail">email at <a :href="'mailto:' + mail">{{ mail }}</a></template><template v-if="mail && phone">, or </template><template v-if="phone">Arattai Business or phone at <a :href="'tel:+91' + phone">{{ phoneShown }}</a></template><template v-if="!mail && !phone">the chat on this site</template>.</p>
  </div>
  <LegalNav />
</template>
