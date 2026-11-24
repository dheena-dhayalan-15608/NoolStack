<script setup>
/* Footer: four columns, social buttons (faded until links are set in SOCIAL), policy links and the bottom strip. */
import { SOCIAL } from "../data/content.js";
const SOC = [["arattai", "Arattai", true], ["instagram", "Instagram", false], ["x", "X", false]];
</script>

<template>
  <footer class="sitefoot">
    <div class="footcols">
      <nav class="footcol" aria-labelledby="fc2"><h2 id="fc2">Resources</h2><RouterLink to="/animations">Animations</RouterLink><RouterLink to="/snippets">Snippets</RouterLink><RouterLink to="/glossary">Glossary</RouterLink><RouterLink to="/errors">Error help</RouterLink><RouterLink to="/debug">Debug Desk</RouterLink></nav>
      <nav class="footcol" aria-labelledby="fc3"><h2 id="fc3">Community</h2><RouterLink to="/debug">Debug Desk</RouterLink><RouterLink to="/rules">Community rules</RouterLink><RouterLink to="/contact">Talk to us on Arattai</RouterLink></nav>
      <nav class="footcol" aria-labelledby="fc4"><h2 id="fc4">NoolStack</h2><RouterLink to="/home">About NoolStack</RouterLink><a href="https://noolstack-ai.onslate.in" target="_blank" rel="noopener">NoolStack AI <span class="extlink" aria-label="(opens in a new tab)">↗</span></a><RouterLink to="/privacy">Privacy policy</RouterLink><RouterLink to="/contact">Contact us</RouterLink></nav>
      <section class="footcol footcontact" aria-labelledby="fc5"><h2 id="fc5">Contact</h2>
        <h3>Arattai Business or phone</h3><a class="fcitem" href="tel:+918925502706"><img src="arattai-business.png" alt="Arattai Business" width="104" height="32"><span>89255 02706</span></a>
        <h3>Email</h3><a class="fcitem" href="mailto:noolstack@zohomail.in"><img src="zoho-mail.png" alt="Zoho Mail" width="32" height="32"><span>noolstack@zohomail.in</span></a>
      </section>
    </div>
    <div class="footsocial" id="footsocial" aria-label="NoolStack on social media">
      <template v-for="[k, n, icon] in SOC" :key="k">
        <a v-if="SOCIAL[k]" class="fsoc" :href="SOCIAL[k]" target="_blank" rel="noopener"><img v-if="icon" src="arattai-icon.png" alt="" width="28" height="28"><span>{{ n }}</span></a>
        <span v-else class="fsoc off" title="Link coming soon"><img v-if="icon" src="arattai-icon.png" alt="" width="28" height="28"><span>{{ n }}</span></span>
      </template>
    </div>
    <nav class="footlegal" aria-label="Policies"><RouterLink to="/contact">Contact us</RouterLink><RouterLink to="/privacy">Privacy policy</RouterLink><RouterLink to="/rules">Community rules</RouterLink></nav>
    <div class="footbase"><img src="logo.png" alt="" width="56" height="56"><p><b>NoolStack</b> · Education As A Service</p><p class="meta">© 2026 NoolStack. All rights reserved.</p></div>
  </footer>
</template>
