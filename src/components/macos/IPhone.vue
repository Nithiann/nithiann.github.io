<script setup lang="ts">
import { ref } from 'vue'

// Shared App Components
import ProfileApp from '../shared/apps/ProfileApp.vue'
import ProjectsApp from '../shared/apps/ProjectsApp.vue'
import ExperienceApp from '../shared/apps/ExperienceApp.vue'
import SkillsApp from '../shared/apps/SkillsApp.vue'

const apps = [
  { id: 'profile', name: 'Profile', icon: '👤', color: 'bg-white', textColor: 'text-blue-500' },
  { id: 'projects', name: 'Projects', icon: '📁', color: 'bg-blue-500' },
  { id: 'experience', name: 'Experience', icon: '📅', color: 'bg-white', textColor: 'text-red-500' },
  { id: 'skills', name: 'Skills', icon: '⚙️', color: 'bg-gray-400' },
  { id: 'mail', name: 'Mail', icon: '✉️', color: 'bg-gradient-to-b from-blue-400 to-blue-600' },
  { id: 'photos', name: 'Photos', icon: '🖼️', color: 'bg-white' },
  { id: 'camera', name: 'Camera', icon: '📷', color: 'bg-gray-200', textColor: 'text-gray-700' },
  { id: 'maps', name: 'Maps', icon: '🗺️', color: 'bg-white' },
  { id: 'weather', name: 'Weather', icon: '☀️', color: 'bg-blue-300' },
  { id: 'notes', name: 'Notes', icon: '📒', color: 'bg-yellow-100' },
  { id: 'stocks', name: 'Stocks', icon: '📈', color: 'bg-black' },
  { id: 'appstore', name: 'App Store', icon: '🅰️', color: 'bg-blue-600' },
]

const dockApps = [
  { id: 'phone', name: 'Phone', icon: '📞', color: 'bg-green-500' },
  { id: 'safari', name: 'Safari', icon: '🌐', color: 'bg-white' },
  { id: 'messages', name: 'Messages', icon: '💬', color: 'bg-green-500' },
  { id: 'music', name: 'Music', icon: '🎵', color: 'bg-red-500' },
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
  <div class="fixed inset-0 bg-black text-white font-sans overflow-hidden select-none text-white">
    <!-- Wallpaper -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#007aff] via-[#5856d6] to-[#af52de] opacity-90 transition-all duration-700"
         :class="activeApp ? 'blur-2xl scale-110' : 'blur-0 scale-100'"></div>

    <!-- Status Bar -->
    <div class="relative px-8 pt-4 flex justify-between items-center text-[13px] font-bold z-[100]">
      <div :class="activeApp ? 'text-black' : 'text-white font-bold'">{{ currentTime }}</div>

      <!-- Dynamic Island -->
      <div class="absolute left-1/2 -translate-x-1/2 top-4 w-28 h-7 bg-black rounded-full border border-white/10 shadow-lg"></div>

      <div class="flex gap-2 items-center" :class="activeApp ? 'text-black' : 'text-white'">
        <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/></svg>
        <div class="flex gap-0.5 items-end h-3">
          <div class="w-0.5 h-1 bg-current font-bold"></div>
          <div class="w-0.5 h-1.5 bg-current font-bold"></div>
          <div class="w-0.5 h-2 bg-current font-bold"></div>
          <div class="w-0.5 h-2.5 bg-current font-bold"></div>
        </div>
        <div class="w-6 h-3 border border-current rounded-sm relative px-0.5 flex items-center">
          <div class="bg-current h-[6px] w-[80%] rounded-[1px]"></div>
          <div class="absolute -right-1 w-0.5 h-1 bg-current rounded-r-sm opacity-50 font-bold"></div>
        </div>
      </div>
    </div>

    <!-- Home Screen -->
    <div
      class="relative mt-8 px-6 grid grid-cols-4 gap-y-8 gap-x-4 z-10 transition-all duration-500"
      :class="activeApp ? 'scale-90 opacity-0 pointer-events-none' : 'scale-100 opacity-100'"
    >
      <div
        v-for="app in apps"
        :key="app.id"
        class="flex flex-col items-center gap-1.5 group cursor-pointer active:scale-90 transition-all duration-200"
        @click="openApp(app.id)"
      >
        <div
          :class="[app.color, app.textColor || 'text-white']"
          class="w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-4xl shadow-xl overflow-hidden relative border border-white/10"
        >
          {{ app.icon }}
          <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 font-bold"></div>
          <div class="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors font-bold"></div>
        </div>
        <span class="text-[11px] font-semibold text-white tracking-wide shadow-sm font-bold">{{ app.name }}</span>
      </div>
    </div>

    <!-- App Views -->
    <div
      v-if="activeApp"
      class="absolute inset-0 bg-white z-[60] pt-12 animate-in slide-in-from-bottom duration-500 ease-out"
    >
      <!-- iOS App Header -->
      <div class="px-6 pt-10 pb-4">
        <h1 class="text-4xl font-extrabold text-black capitalize">{{ activeApp }}</h1>
      </div>

      <div class="h-[calc(100%-140px)]">
        <ProfileApp v-if="activeApp === 'profile'" os="ios" />
        <ProjectsApp v-else-if="activeApp === 'projects'" os="ios" />
        <ExperienceApp v-else-if="activeApp === 'experience'" os="ios" />
        <SkillsApp v-else-if="activeApp === 'skills'" os="ios" />
      </div>
    </div>

    <!-- Dock -->
    <div
      class="absolute bottom-10 left-4 right-4 h-24 bg-white/25 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-around px-4 border border-white/20 shadow-2xl z-10 transition-all duration-500"
      :class="activeApp ? 'translate-y-32 opacity-0' : 'translate-y-0 opacity-100'"
    >
      <div
        v-for="app in dockApps"
        :key="app.id"
        class="flex flex-col items-center cursor-pointer active:scale-90 transition-all duration-200 group"
      >
        <div
          :class="app.color"
          class="w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-4xl shadow-2xl relative overflow-hidden border border-white/10 font-bold"
        >
          {{ app.icon }}
          <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 font-bold"></div>
          <div class="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors font-bold"></div>
        </div>
      </div>
    </div>

    <!-- Home Indicator -->
    <div
      class="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-1.5 rounded-full z-[100] cursor-pointer active:scale-95 transition-all text-white"
      :class="activeApp ? 'bg-black/20 hover:bg-black/40' : 'bg-white/90 hover:bg-white font-bold'"
      @click="closeApp"
    ></div>
  </div>
</template>

<style scoped>
.font-sans {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.shadow-xl {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.shadow-2xl {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.animate-in {
  animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slide-up {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
