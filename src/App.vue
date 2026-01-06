<script setup lang="ts">
import { ref } from 'vue'

// Shared Components
import GrubMenu from './components/shared/GrubMenu.vue'

// Win7 Components
import BootScreen from './components/win7/BootScreen.vue'
import Win7Desktop from './components/win7/Win7Desktop.vue'

// MacOS Components
import MacOSBootloader from './components/macos/MacOSBootloader.vue'
import MacOSDesktop from './components/macos/MacOSDesktop.vue'

// Linux Components
import GnomeBootloader from './components/linux/GnomeBootloader.vue'
import GnomeDesktop from './components/linux/GnomeDesktop.vue'

// Global State
type Stage = 'GRUB' | 'BOOTING' | 'DESKTOP'
type OSType = 'win7' | 'macos' | 'linux'

const stage = ref<Stage>('GRUB')
const selectedOS = ref<OSType>('win7')

const handleOSSelect = (os: OSType) => {
  selectedOS.value = os
  stage.value = 'BOOTING'
}

const handleBootFinished = () => {
  stage.value = 'DESKTOP'
}
</script>

<template>
  <div class="h-full w-full bg-black select-none">
    <GrubMenu v-if="stage === 'GRUB'" @select="handleOSSelect" />

    <template v-else-if="stage === 'BOOTING'">
      <BootScreen v-if="selectedOS === 'win7'" @finished="handleBootFinished" />
      <MacOSBootloader v-else-if="selectedOS === 'macos'" @finished="handleBootFinished" />
      <GnomeBootloader v-else-if="selectedOS === 'linux'" @finished="handleBootFinished" />
    </template>

    <template v-else-if="stage === 'DESKTOP'">
      <Transition name="fade-desktop">
        <div v-if="selectedOS === 'win7'">
          <Win7Desktop />
        </div>
        <div v-else-if="selectedOS === 'macos'">
          <MacOSDesktop />
        </div>
        <div v-else-if="selectedOS === 'linux'">
          <GnomeDesktop />
        </div>
      </Transition>
    </template>
  </div>
</template>

<style>
@import "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap";

html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: black;
  font-family: 'Inter', sans-serif;
}

.fade-desktop-enter-active { transition: opacity 1s ease-out; }
.fade-desktop-enter-from { opacity: 0; }

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
</style>
