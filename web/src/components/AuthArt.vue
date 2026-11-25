<script setup>
/* NoolStack's mascot, a friendly computer, for the Account page.
   "in"  (sign in): it peeks round the edge of the card, shading its eyes, looking for you.
   "up"  (create an account): it waves from inside a circle.
   "forgot" (the sign-in box's forgot-password steps): a padlock bobbing on a tile (public/css/forgot-lock.svg,
         the same picture Catalyst's own forgot-password page shows).
   "bye" (after deleting an account): a sad wave goodbye, with a tear and a drooping antenna.
   Drawn in the same cream-and-ink style as the badges. Decorative only (aria-hidden). */
defineProps({ mode: { type: String, default: "in" } });
</script>

<template>
  <Transition name="artswap" mode="out-in">
    <svg v-if="mode === 'in'" key="in" class="authsvg peek" viewBox="0 0 360 440" preserveAspectRatio="xMinYMid meet" aria-hidden="true" focusable="false">
      <defs><clipPath id="nsPeekClip"><rect x="14" y="-40" width="400" height="520"/></clipPath></defs>
      <g clip-path="url(#nsPeekClip)"><g class="mascot lean">
        <g transform="translate(-96 70) rotate(-7 150 200)">
          <!-- antenna -->
          <path d="M150 40V16" stroke="#FBFAF6" stroke-width="7" stroke-linecap="round"/>
          <circle cx="150" cy="12" r="10" fill="#F2B13C" stroke="#1C2230" stroke-width="5"/>
          <!-- head and screen face -->
          <rect x="60" y="40" width="180" height="140" rx="30" fill="#FBFAF6" stroke="#1C2230" stroke-width="6"/>
          <rect x="82" y="62" width="136" height="96" rx="18" fill="#1C2230"/>
          <g class="blink"><ellipse cx="150" cy="104" rx="9" ry="12" fill="#F2B13C"/><ellipse cx="192" cy="104" rx="9" ry="12" fill="#F2B13C"/></g>
          <path d="M146 132q24 16 48 0" stroke="#F2B13C" stroke-width="5" fill="none" stroke-linecap="round"/>
          <circle cx="128" cy="134" r="7" fill="#FF7B6B" opacity=".7"/><circle cx="210" cy="134" r="7" fill="#FF7B6B" opacity=".7"/>
          <!-- neck and body -->
          <rect x="133" y="180" width="34" height="16" fill="#1C2230"/>
          <rect x="78" y="196" width="144" height="128" rx="26" fill="#FBFAF6" stroke="#1C2230" stroke-width="6"/>
          <rect x="102" y="222" width="96" height="46" rx="12" fill="#F2B13C" opacity=".35"/>
          <path d="M122 234l-12 11 12 11M178 234l12 11-12 11M158 230l-16 30" stroke="#1C2230" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- arm up, hand shading the eyes -->
          <path d="M214 222c48-14 58-86 22-142" stroke="#1C2230" stroke-width="22" fill="none" stroke-linecap="round"/>
          <path d="M214 222c48-14 58-86 22-142" stroke="#FBFAF6" stroke-width="11" fill="none" stroke-linecap="round"/>
          <rect x="178" y="46" width="78" height="28" rx="14" transform="rotate(-12 217 60)" fill="#FBFAF6" stroke="#1C2230" stroke-width="5.5"/>
        </g>
      </g></g>
      <!-- the card edge it peeks round -->
      <rect x="0" y="0" width="16" height="440" rx="8" class="edge"/>
    </svg>
    <img v-else-if="mode === 'forgot'" key="forgot" class="authsvg lockimg" src="css/forgot-lock.svg" alt="">
    <svg v-else-if="mode === 'bye'" key="bye" class="authsvg bye" viewBox="0 0 360 440" aria-hidden="true" focusable="false">
      <circle cx="190" cy="250" r="150" class="halo"/>
      <path d="M68 326a150 150 0 0 0 268-26" class="ring" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 22"/>
      <g transform="translate(40 96)">
        <!-- drooping antenna -->
        <g class="droop"><path d="M150 40q2-16-14-26" stroke="#FBFAF6" stroke-width="7" fill="none" stroke-linecap="round"/>
        <circle cx="134" cy="13" r="10" fill="#F2B13C" stroke="#1C2230" stroke-width="5"/></g>
        <rect x="60" y="40" width="180" height="140" rx="30" fill="#FBFAF6" stroke="#1C2230" stroke-width="6"/>
        <rect x="82" y="62" width="136" height="96" rx="18" fill="#1C2230"/>
        <!-- sad brows, eyes, a tear and a small frown -->
        <path d="M108 90l26-9M192 90l-26-9" stroke="#F2B13C" stroke-width="5" fill="none" stroke-linecap="round"/>
        <g class="blink"><ellipse cx="124" cy="110" rx="8" ry="10" fill="#F2B13C"/><ellipse cx="176" cy="110" rx="8" ry="10" fill="#F2B13C"/></g>
        <path class="tear" d="M116 124q-7 11 0 16q7-5 0-16z" fill="#8FD3FF"/>
        <path d="M132 146q18-12 36 0" stroke="#F2B13C" stroke-width="5" fill="none" stroke-linecap="round"/>
        <rect x="133" y="180" width="34" height="16" fill="#1C2230"/>
        <rect x="78" y="196" width="144" height="128" rx="26" fill="#FBFAF6" stroke="#1C2230" stroke-width="6"/>
        <rect x="102" y="222" width="96" height="46" rx="12" fill="#F2B13C" opacity=".35"/>
        <path d="M122 234l-12 11 12 11M178 234l12 11-12 11M158 230l-16 30" stroke="#1C2230" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M218 230c30 10 40 40 34 70" stroke="#1C2230" stroke-width="22" fill="none" stroke-linecap="round"/>
        <path d="M218 230c30 10 40 40 34 70" stroke="#FBFAF6" stroke-width="11" fill="none" stroke-linecap="round"/>
        <circle cx="252" cy="304" r="15" fill="#FBFAF6" stroke="#1C2230" stroke-width="5.5"/>
        <!-- a slow goodbye wave -->
        <g class="waver slow">
          <path d="M84 228c-38-8-56-52-48-98" stroke="#1C2230" stroke-width="22" fill="none" stroke-linecap="round"/>
          <path d="M84 228c-38-8-56-52-48-98" stroke="#FBFAF6" stroke-width="11" fill="none" stroke-linecap="round"/>
          <circle cx="36" cy="118" r="19" fill="#FBFAF6" stroke="#1C2230" stroke-width="5.5"/>
        </g>
      </g>
    </svg>
    <svg v-else key="up" class="authsvg wave" viewBox="0 0 360 440" aria-hidden="true" focusable="false">
      <circle cx="190" cy="250" r="150" class="halo"/>
      <path d="M68 326a150 150 0 0 0 268-26" class="ring" fill="none" stroke-width="10" stroke-linecap="round"/>
      <g transform="translate(40 96)">
        <path d="M150 40V16" stroke="#FBFAF6" stroke-width="7" stroke-linecap="round"/>
        <circle cx="150" cy="12" r="10" fill="#F2B13C" stroke="#1C2230" stroke-width="5"/>
        <rect x="60" y="40" width="180" height="140" rx="30" fill="#FBFAF6" stroke="#1C2230" stroke-width="6"/>
        <rect x="82" y="62" width="136" height="96" rx="18" fill="#1C2230"/>
        <g class="blink"><path d="M114 104q11-12 22 0M164 104q11-12 22 0" stroke="#F2B13C" stroke-width="6" fill="none" stroke-linecap="round"/></g>
        <path d="M122 126q28 22 56 0" stroke="#F2B13C" stroke-width="5" fill="#F2B13C" fill-opacity=".25" stroke-linecap="round"/>
        <circle cx="104" cy="130" r="7" fill="#FF7B6B" opacity=".7"/><circle cx="196" cy="130" r="7" fill="#FF7B6B" opacity=".7"/>
        <rect x="133" y="180" width="34" height="16" fill="#1C2230"/>
        <rect x="78" y="196" width="144" height="128" rx="26" fill="#FBFAF6" stroke="#1C2230" stroke-width="6"/>
        <rect x="102" y="222" width="96" height="46" rx="12" fill="#F2B13C" opacity=".35"/>
        <path d="M122 234l-12 11 12 11M178 234l12 11-12 11M158 230l-16 30" stroke="#1C2230" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- resting arm, holding the ring -->
        <path d="M218 230c30 10 40 40 34 70" stroke="#1C2230" stroke-width="22" fill="none" stroke-linecap="round"/>
        <path d="M218 230c30 10 40 40 34 70" stroke="#FBFAF6" stroke-width="11" fill="none" stroke-linecap="round"/>
        <circle cx="252" cy="304" r="15" fill="#FBFAF6" stroke="#1C2230" stroke-width="5.5"/>
        <!-- waving arm -->
        <g class="waver">
          <path d="M84 228c-38-8-56-52-48-98" stroke="#1C2230" stroke-width="22" fill="none" stroke-linecap="round"/>
          <path d="M84 228c-38-8-56-52-48-98" stroke="#FBFAF6" stroke-width="11" fill="none" stroke-linecap="round"/>
          <circle cx="36" cy="118" r="19" fill="#FBFAF6" stroke="#1C2230" stroke-width="5.5"/>
          <path d="M4 92q-8 14-2 30M-10 84q-12 22-2 46" class="motion" fill="none" stroke-width="4.5" stroke-linecap="round"/>
        </g>
      </g>
    </svg>
  </Transition>
</template>

<style scoped>
.authsvg{display:block;width:100%;height:100%;max-height:30rem;overflow:visible}
.lockimg{object-fit:contain;max-width:20rem;margin:0 auto}
.edge{fill:var(--accent)}
.halo{fill:var(--accent-soft)}
.ring{stroke:var(--accent)}
.motion{stroke:var(--accent)}
.lean{animation:lean 3.2s ease-in-out infinite;transform-origin:0 60%}
.blink{animation:blink 4.5s infinite;transform-box:fill-box;transform-origin:center}
.waver{animation:wave 1.4s ease-in-out infinite;transform-origin:84px 228px}
.waver.slow{animation-duration:2.6s}
.tear{animation:tear 2.4s ease-in infinite;transform-box:fill-box}
.droop{animation:droop 3s ease-in-out infinite;transform-origin:150px 40px}
@keyframes tear{0%{transform:translateY(-4px);opacity:0}15%{opacity:1}70%{opacity:1}100%{transform:translateY(30px);opacity:0}}
@keyframes droop{0%,100%{transform:rotate(0)}50%{transform:rotate(-8deg)}}
@keyframes lean{0%,100%{transform:translateX(0)}50%{transform:translateX(10px)}}
@keyframes blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
@keyframes wave{0%,100%{transform:rotate(0)}50%{transform:rotate(-16deg)}}
.artswap-enter-active,.artswap-leave-active{transition:opacity .28s ease,transform .28s ease}
.artswap-enter-from{opacity:0;transform:scale(.92)}
.artswap-leave-to{opacity:0;transform:scale(.92)}
@media (prefers-reduced-motion:reduce){
  .lean,.blink,.waver,.tear,.droop{animation:none}
  .artswap-enter-active,.artswap-leave-active{transition:opacity .15s linear}
  .artswap-enter-from,.artswap-leave-to{transform:none}
}
</style>
