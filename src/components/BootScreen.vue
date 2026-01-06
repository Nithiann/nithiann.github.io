<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits(['finished'])
const phase = ref(0) // 0: Blank, 1: Text, 2: Orbs, 3: Logo, 4: Finished

onMounted(() => {
  setTimeout(() => (phase.value = 1), 1000) // Show Text
  setTimeout(() => (phase.value = 2), 2000) // Start Orbs
  setTimeout(() => (phase.value = 3), 6000) // Merge into Logo
  setTimeout(() => (phase.value = 4), 8500) // Fade out
  setTimeout(() => emit('finished'), 9500)
})
</script>

<template>
  <div class="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center select-none overflow-hidden font-['Segoe_UI',_sans-serif]">

    <!-- Logo Container -->
    <div class="relative w-64 h-64 flex items-center justify-center">

      <!-- Orbs Phase -->
      <div v-if="phase === 2" class="orbs-container scale-75">
        <div class="orb red"></div>
        <div class="orb green"></div>
        <div class="orb blue"></div>
        <div class="orb yellow"></div>
      </div>

      <!-- Final Logo Phase -->
      <div v-if="phase >= 3" class="logo-container" :class="{ 'logo-fade-in': phase === 3, 'logo-fade-out': phase === 4 }">
        <svg viewBox="0 0 100 100" class="w-32 h-32 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
          <!-- Windows 7 Flag Logo -->
          <path d="M10,25 Q30,15 50,25 Q70,35 90,25 L90,75 Q70,85 50,75 Q30,65 10,75 Z" fill="none" />
          <g class="logo-parts">
             <!-- Red -->
            <path d="M12,28 Q30,19 48,27 L48,48 Q30,40 12,49 Z" fill="#ee3e31" />
            <!-- Green -->
            <path d="M52,27 Q70,36 88,28 L88,49 Q70,57 52,48 Z" fill="#8cc63f" />
            <!-- Blue -->
            <path d="M12,53 Q30,44 48,52 L48,73 Q30,65 12,74 Z" fill="#00aeef" />
            <!-- Yellow -->
            <path d="M52,52 Q70,61 88,53 L88,74 Q70,82 52,73 Z" fill="#f68e1e" />
          </g>
        </svg>
        <div class="glow-pulse"></div>
      </div>
    </div>

    <!-- Starting Windows Text -->
    <div
      class="absolute bottom-24 text-white text-2xl font-light tracking-wide transition-opacity duration-1000"
      :class="phase >= 1 && phase < 4 ? 'opacity-100' : 'opacity-0'"
    >
      Starting Windows
    </div>

    <!-- Copyright/Version tag (Subtle) -->
    <div
      class="absolute bottom-10 text-gray-600 text-xs transition-opacity duration-1000"
      :class="phase >= 1 && phase < 4 ? 'opacity-100' : 'opacity-0'"
    >
      © Microsoft Corporation
    </div>

  </div>
</template>

<style scoped>
/* Orbs Animation */
.orbs-container {
  position: relative;
  width: 100px;
  height: 100px;
  animation: container-rotate 4s linear infinite;
}

.orb {
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  filter: blur(4px);
  box-shadow: 0 0 10px currentColor;
}

.red { color: #ee3e31; background: #ee3e31; animation: orbit-red 4s ease-in-out infinite; }
.green { color: #8cc63f; background: #8cc63f; animation: orbit-green 4s ease-in-out infinite; }
.blue { color: #00aeef; background: #00aeef; animation: orbit-blue 4s ease-in-out infinite; }
.yellow { color: #f68e1e; background: #f68e1e; animation: orbit-yellow 4s ease-in-out infinite; }

@keyframes container-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes orbit-red {
  0% { transform: translate(50px, 0) scale(1); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translate(0, 0) scale(0.5); opacity: 0.5; }
}

@keyframes orbit-green {
  0% { transform: translate(-50px, 0) scale(1); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translate(0, 0) scale(0.5); opacity: 0.5; }
}

@keyframes orbit-blue {
  0% { transform: translate(0, 50px) scale(1); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translate(0, 0) scale(0.5); opacity: 0.5; }
}

@keyframes orbit-yellow {
  0% { transform: translate(0, -50px) scale(1); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translate(0, 0) scale(0.5); opacity: 0.5; }
}

/* Logo Animation */
.logo-fade-in {
  animation: logo-in 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes logo-in {
  0% { transform: scale(0.5); opacity: 0; filter: blur(10px); }
  100% { transform: scale(1); opacity: 1; filter: blur(0); }
}

.logo-fade-out {
  animation: logo-out 1s ease-in forwards;
}

@keyframes logo-out {
  to { opacity: 0; transform: scale(1.1); filter: blur(5px); }
}

.glow-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
  animation: pulse 3s infinite;
  pointer-events: none;
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.8); }
  50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
}

.logo-parts {
  transition: all 0.5s ease;
}
</style>
