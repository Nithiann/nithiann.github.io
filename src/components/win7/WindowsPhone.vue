<script setup lang="ts">
import { ref } from 'vue'

// Shared App Components
import ProfileApp from '../shared/apps/ProfileApp.vue'
import ProjectsApp from '../shared/apps/ProjectsApp.vue'
import ExperienceApp from '../shared/apps/ExperienceApp.vue'
import SkillsApp from '../shared/apps/SkillsApp.vue'

const tiles = [
  { id: 'profile', name: 'Profile', color: 'bg-[#00a1f1]', icon: '👤', size: 'medium' },
  { id: 'projects', name: 'Projects', color: 'bg-[#00a1f1]', icon: '💼', size: 'medium' },
  { id: 'experience', name: 'Experience', color: 'bg-[#00a1f1]', icon: '⏳', size: 'small' },
  { id: 'skills', name: 'Skills', color: 'bg-[#00a1f1]', icon: '🛠️', size: 'small' },
  { id: 'phone', name: 'Phone', color: 'bg-[#00a1f1]', icon: '📞', size: 'small' },
  { id: 'messages', name: 'Messages', color: 'bg-[#00a1f1]', icon: '✉️', size: 'small' },
  { id: 'photos', name: 'Photos', color: 'bg-[#00a1f1]', icon: '🖼️', size: 'medium' },
  { id: 'store', name: 'Store', color: 'bg-[#00a1f1]', icon: '🛍️', size: 'small' },
  { id: 'settings', name: 'Settings', color: 'bg-[#00a1f1]', icon: '⚙️', size: 'small' },
]

const activeApp = ref<string | null>(null)

const openApp = (id: string) => {
  if (['profile', 'projects', 'experience', 'skills'].includes(id)) {
    activeApp.value = id
  }
}

const closeApp = () => {
  activeApp.value = null
}

const currentTime = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
setInterval(() => {
  currentTime.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}, 1000)
</script>

<template>
  <div class="fixed inset-0 bg-black text-white font-sans overflow-hidden select-none">
    <!-- Status Bar -->
    <div class="px-6 py-4 flex justify-between items-center text-xs sticky top-0 bg-black z-[100] font-bold text-white">
      <div class="flex gap-2 items-center">
        <span>📶</span>
        <span>LTE</span>
      </div>
      <div>{{ currentTime }}</div>
      <div class="flex gap-2 items-center">
        <span>🌙</span>
        <span>100%</span>
        <span>🔋</span>
      </div>
    </div>

    <!-- Start Screen -->
    <div
      class="absolute inset-x-0 top-12 bottom-20 overflow-y-auto px-6 pt-2 transition-transform duration-500"
      :class="activeApp ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'"
    >
      <h1 class="text-5xl font-light mb-10 text-white/90">Start</h1>

      <div class="grid grid-cols-4 gap-3 max-w-md mx-auto h-fit">
        <template v-for="tile in tiles" :key="tile.id">
          <div
            v-if="tile.size === 'medium'"
            class="col-span-2 aspect-square p-4 flex flex-col items-center justify-center relative hover:scale-[0.97] transition-transform cursor-pointer shadow-lg active:opacity-80"
            :class="tile.color"
            @click="openApp(tile.id)"
          >
            <div class="text-6xl mb-2">{{ tile.icon }}</div>
            <div class="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest text-[#ffffff]">{{ tile.name }}</div>
          </div>
          <div
            v-else
            class="col-span-1 aspect-square p-2 flex flex-col items-center justify-center relative hover:scale-[0.97] transition-transform cursor-pointer shadow-lg active:opacity-80"
            :class="tile.color"
            @click="openApp(tile.id)"
          >
            <div class="text-4xl">{{ tile.icon }}</div>
          </div>
        </template>
      </div>
    </div>

    <!-- App Views -->
    <div
      v-if="activeApp"
      class="absolute inset-x-0 top-12 bottom-20 bg-black z-50 transition-all duration-500 overflow-y-auto"
      :class="activeApp ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'"
    >
      <ProfileApp v-if="activeApp === 'profile'" os="wp" />
      <ProjectsApp v-else-if="activeApp === 'projects'" os="wp" />
      <ExperienceApp v-else-if="activeApp === 'experience'" os="wp" />
      <SkillsApp v-else-if="activeApp === 'skills'" os="wp" />
    </div>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 left-0 right-0 h-20 bg-black flex justify-around items-center px-10 pb-4 z-[200]">
      <button
        class="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition-opacity text-white"
        @click="closeApp"
      >
        <div class="text-3xl">←</div>
      </button>
      <button
        class="w-14 h-14 border-[3px] border-white rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
        @click="closeApp"
      >
        <svg viewBox="0 0 24 24" class="w-10 h-10 fill-white">
          <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
        </svg>
      </button>
      <button class="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition-opacity text-3xl">
        🔍
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Segoe+UI:wght@300;400;600;700&display=swap');

.font-sans {
  font-family: 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

::-webkit-scrollbar {
  display: none;
}

.active\:opacity-80:active {
  transform: scale(0.95);
}

.overflow-y-auto {
  scrollbar-width: none;
}
</style>
