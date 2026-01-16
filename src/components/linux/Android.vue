<script setup lang="ts">
import { ref } from 'vue'

// Shared App Components
import ProfileApp from '../shared/apps/ProfileApp.vue'
import ProjectsApp from '../shared/apps/ProjectsApp.vue'
import ExperienceApp from '../shared/apps/ExperienceApp.vue'
import SkillsApp from '../shared/apps/SkillsApp.vue'
import CalculatorApp from '../shared/apps/CalculatorApp.vue'
import NotesApp from '../shared/apps/NotesApp.vue'

const apps = [
  { id: 'profile', name: 'Profile', icon: '👤', color: 'bg-[#d3e3fd]' },
  { id: 'projects', name: 'Projects', icon: '📁', color: 'bg-[#fef7da]' },
  { id: 'experience', name: 'Experience', icon: '💼', color: 'bg-[#c2e7ff]' },
  { id: 'skills', name: 'Skills', icon: '🛠️', color: 'bg-[#e7e0eb]' },
  { id: 'gmail', name: 'Gmail', icon: '📧', color: 'bg-[#f2f2f2]' },
  { id: 'calculator', name: 'Calculator', icon: '🧮', color: 'bg-[#fef7da]' },
  { id: 'notes', name: 'Keep Notes', icon: '📝', color: 'bg-[#eaddff]' },
  { id: 'maps', name: 'Maps', icon: '📍', color: 'bg-[#f2f2f2]' },
  { id: 'photos', name: 'Photos', icon: '🎡', color: 'bg-[#f2f2f2]' },
  { id: 'chrome', name: 'Chrome', icon: '🌐', color: 'bg-[#f2f2f2]' },
  { id: 'youtube', name: 'YouTube', icon: '🎬', color: 'bg-[#f2f2f2]' },
  { id: 'settings', name: 'Settings', icon: '⚙️', color: 'bg-[#e3e3e3]' },
]

const activeApp = ref<string | null>(null)

const openApp = (id: string) => {
  if (['profile', 'projects', 'experience', 'skills', 'calculator', 'notes'].includes(id)) {
    activeApp.value = id
  }
}

const closeApp = () => {
  activeApp.value = null
}

const currentTime = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
setInterval(() => {
  currentTime.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}, 1000)
</script>

<template>
  <div class="fixed inset-0 bg-[#f7f2ea] text-[#1d1b16] font-sans overflow-hidden select-none text-[#1d1b16]">
    <!-- Status Bar -->
    <div class="px-8 py-3 flex justify-between items-center text-[13px] font-medium z-[100] transition-colors font-bold">
      <div :class="activeApp ? 'text-[#1d1b16]' : 'text-[#1d1b16] font-bold'">{{ currentTime }}</div>
      <div class="flex gap-2.5 items-center">
        <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/></svg>
        <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current font-bold"><path d="M2 22h20V2z"/></svg>
        <div class="flex items-center gap-0.5">
          <span class="text-[10px] mr-1 font-bold">100%</span>
          <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current font-bold"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
        </div>
      </div>
    </div>

    <!-- Home Screen -->
    <div
      class="transition-all duration-500"
      :class="activeApp ? 'scale-95 opacity-0 blur-lg pointer-events-none' : 'scale-100 opacity-100 blur-0'"
    >
      <!-- Pixel Launcher Style -->
      <div class="mt-12 flex flex-col items-center">
         <div class="text-7xl font-light tracking-tight text-[#1d1b16] font-bold">{{ currentTime }}</div>
         <div class="text-base mt-3 font-medium text-[#444746] font-bold">Friday, Jan 16</div>
      </div>

      <!-- Search Bar -->
      <div class="mx-6 mt-14 h-14 bg-[#f3f3f3] rounded-full flex items-center px-6 gap-4 border border-[#e3e3e3] shadow-sm active:scale-[0.98] transition-transform cursor-pointer group text-black">
        <svg viewBox="0 0 24 24" class="w-5 h-5 fill-[#444746]"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        <span class="text-[#444746] font-medium text-sm flex-1 font-bold">Search phone and more</span>
      </div>

      <!-- App Grid -->
      <div class="mt-12 px-6 grid grid-cols-4 gap-y-12 h-[calc(100vh-450px)] overflow-y-auto pb-4">
        <div
          v-for="app in apps"
          :key="app.id"
          class="flex flex-col items-center gap-2.5 cursor-pointer group transition-transform active:scale-95"
          @click="openApp(app.id)"
        >
          <div
            :class="app.color"
            class="w-16 h-16 rounded-[2rem] flex items-center justify-center text-3xl shadow-sm border border-black/5 relative overflow-hidden transition-all group-hover:shadow-md group-active:brightness-90 text-white"
          >
            {{ app.icon }}
            <div class="absolute inset-0 bg-black/0 group-active:bg-black/5 transition-colors font-bold"></div>
          </div>
          <span class="text-[11px] font-medium tracking-tight text-[#1d1b16] w-20 text-center overflow-hidden text-ellipsis whitespace-nowrap font-bold">{{ app.name }}</span>
        </div>
      </div>
    </div>

    <!-- App Views -->
    <div
      v-if="activeApp"
      class="absolute inset-0 bg-[#fffbff] z-[60] pt-14 pb-20 animate-in fade-in zoom-in duration-300 ease-out"
    >
      <!-- Material 3 Header -->
      <div class="px-6 py-4 flex items-center gap-4">
        <button @click="closeApp" class="p-2 -ml-2 rounded-full active:bg-black/5 font-bold">
          <svg viewBox="0 0 24 24" class="w-6 h-6 fill-[#1d1b16]"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        </button>
        <h1 class="text-2xl font-medium text-[#1d1b16] capitalize font-bold">{{ activeApp }}</h1>
      </div>

      <div class="h-full">
        <ProfileApp v-if="activeApp === 'profile'" os="android" />
        <ProjectsApp v-else-if="activeApp === 'projects'" os="android" />
        <ExperienceApp v-else-if="activeApp === 'experience'" os="android" />
        <SkillsApp v-else-if="activeApp === 'skills'" os="android" />
        <CalculatorApp v-else-if="activeApp === 'calculator'" os="android" />
        <NotesApp v-else-if="activeApp === 'notes'" os="android" />
      </div>
    </div>

    <!-- Android 3-Button Navigation -->
    <div class="absolute bottom-6 left-0 right-0 h-12 flex justify-around items-center px-12 z-[200]">
       <button @click="closeApp" class="w-10 h-10 flex items-center justify-center active:bg-black/5 rounded-full transition-colors text-white">
          <svg viewBox="0 0 24 24" class="w-5 h-5 fill-[#1d1b16] opacity-80"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
       </button>
       <button @click="closeApp" class="w-12 h-12 flex items-center justify-center active:bg-black/5 rounded-full transition-colors font-bold">
          <div class="w-4 h-4 rounded-full border-2 border-[#1d1b16] opacity-80 font-bold"></div>
       </button>
       <button class="w-10 h-10 flex items-center justify-center active:bg-black/5 rounded-full transition-colors font-bold">
          <div class="w-3.5 h-3.5 border-2 border-[#1d1b16] rounded-sm opacity-80 font-bold"></div>
       </button>
    </div>

    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-black/10 rounded-full z-[200] font-bold"></div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

.font-sans {
  font-family: 'Google Sans', 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.animate-in {
  animation: material-zoom 0.3s cubic-bezier(0.05, 0.7, 0.1, 1);
}

@keyframes material-zoom {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.overflow-y-auto {
  scrollbar-width: none;
}
</style>
