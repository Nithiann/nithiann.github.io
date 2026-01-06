<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="start-orb-svg">
    <defs>
      <!-- Deep Glassy Orb Background -->
      <radialGradient id="orbMain" cx="50%" cy="50%" r="50%" fx="50%" fy="35%">
        <stop offset="0%" style="stop-color:#3fb6fe;stop-opacity:1" />
        <stop offset="60%" style="stop-color:#0078d7;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#00427e;stop-opacity:1" />
      </radialGradient>

      <!-- Glossy Reflection Top -->
      <linearGradient id="glossRef" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:white;stop-opacity:0.85" />
        <stop offset="50%" style="stop-color:white;stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:white;stop-opacity:0" />
      </linearGradient>

      <!-- Bottom Highlight -->
      <radialGradient id="glassBottom" cx="50%" cy="100%" r="50%" fx="50%" fy="100%">
        <stop offset="0%" style="stop-color:white;stop-opacity:0.4" />
        <stop offset="100%" style="stop-color:white;stop-opacity:0" />
      </radialGradient>

      <!-- Logo Gradients for Authentic Look -->
      <linearGradient id="winRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f83603" />
        <stop offset="100%" style="stop-color:#bc1b00" />
      </linearGradient>
      <linearGradient id="winGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#a6e22e" />
        <stop offset="100%" style="stop-color:#72a605" />
      </linearGradient>
      <linearGradient id="winBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#48c6ff" />
        <stop offset="100%" style="stop-color:#0586c4" />
      </linearGradient>
      <linearGradient id="winYellow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ffd94a" />
        <stop offset="100%" style="stop-color:#e5a707" />
      </linearGradient>

      <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.3"/>
      </filter>
    </defs>

    <!-- Main Sphere -->
    <circle cx="50" cy="50" r="47" fill="url(#orbMain)" />

    <!-- Inner Glow Ring -->
    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />

    <!-- Highly Accurate Logo Path Group -->
    <g transform="translate(18, 18) scale(1.18)" filter="url(#logoShadow)">
      <!-- Top Left Pane (Red) -->
      <path d="M4,15.5 C4.5,10.5 12,8.5 24,14.5 L24,28.5 C12,22.5 4.5,23.5 4,28.5 Z" fill="url(#winRed)" />
      <!-- Top Right Pane (Green) -->
      <path d="M26,15 C38,9.5 46,11.5 49.5,15.5 L49.5,29.5 C46,25.5 38,24 26,29 Z" fill="url(#winGreen)" />
      <!-- Bottom Left Pane (Blue) -->
      <path d="M4,31.5 C4.5,26.5 12,24.5 24,30.5 L24,44.5 C12,38.5 4.5,39.5 4,44.5 Z" fill="url(#winBlue)" />
      <!-- Bottom Right Pane (Yellow) -->
      <path d="M26,32 C38,26.5 46,28.5 49.5,32.5 L49.5,46.5 C46,42.5 38,41 26,46 Z" fill="url(#winYellow)" />
    </g>

    <!-- Essential Glass Highlight (Top) -->
    <ellipse cx="50" cy="30" rx="38" ry="24" fill="url(#glossRef)" />

    <!-- Secondary Glow (Bottom Center) -->
    <circle cx="50" cy="50" r="47" fill="url(#glassBottom)" pointer-events="none" />

    <!-- Thin Rim Specular Highlight -->
    <circle cx="50" cy="50" r="46.5" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="0.3" />
  </svg>
</template>

<style scoped>
.start-orb-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 4px rgba(79, 178, 254, 0.5));
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.start-orb-svg:hover {
  filter: drop-shadow(0 0 12px rgba(79, 178, 254, 0.9)) brightness(1.1);
  transform: scale(1.08);
}

.start-orb-svg:active {
  transform: scale(0.92);
  filter: brightness(0.85) contrast(1.1);
}
</style>
