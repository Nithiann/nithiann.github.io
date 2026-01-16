<script setup lang="ts">
import { useWindowManagement } from '../../composables/useWindowManagement'

// Shared App Components
import ProfileApp from '../shared/apps/ProfileApp.vue'
import ProjectsApp from '../shared/apps/ProjectsApp.vue'
import ExperienceApp from '../shared/apps/ExperienceApp.vue'
import SkillsApp from '../shared/apps/SkillsApp.vue'
import CalculatorApp from '../shared/apps/CalculatorApp.vue'
import NotesApp from '../shared/apps/NotesApp.vue'

const {
  windows,
  focusWindow,
  openWindow,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  handleDrag,
  handleResize
} = useWindowManagement({
  profile: { isOpen: false, zIndex: 10, x: 100, y: 80, width: 800, height: 600 },
  projects: { isOpen: false, zIndex: 10, x: 150, y: 120, width: 800, height: 600 },
  experience: { isOpen: false, zIndex: 10, x: 200, y: 160, width: 800, height: 600 },
  skills: { isOpen: false, zIndex: 10, x: 250, y: 200, width: 800, height: 600 },
  calculator: { isOpen: false, zIndex: 10, x: 300, y: 100, width: 320, height: 480 },
  notes: { isOpen: false, zIndex: 10, x: 350, y: 150, width: 600, height: 500 },
})

const wallpaper = "https://eshop.macsales.com/blog/wp-content/uploads/2018/06/Mojave.jpg"
</script>

<template>
  <div class="h-screen w-screen overflow-hidden bg-cover bg-center font-sans text-sm select-none" :style="{ backgroundImage: `url(${wallpaper})` }">
    <!-- Menu Bar -->
    <div class="h-6 bg-white/70 backdrop-blur-3xl border-b border-black/10 flex items-center px-4 justify-between text-[11px] font-semibold text-black/90 shadow-[0_1px_5px_rgba(0,0,0,0.1)] z-[10000] relative">
      <div class="flex items-center space-x-4">
        <div class="px-2 hover:bg-black/5 rounded cursor-default flex items-center">
            <svg viewBox="0 0 100 100" fill="currentColor" class="w-5 h-5">
                <path d="M82.2,46.1c-0.1-8.2,6.7-12.1,7-12.3c-3.8-5.6-9.7-6.3-11.8-6.4c-5-0.5-9.8,3-12.3,3c-2.5,0-6.4-2.9-10.5-2.8 c-5.4,0.1-10.4,3.2-13.2,8.1c-5.7,9.9-1.5,24.6,4,32.6c2.7,3.9,5.9,8.3,10.2,8.2c4.1-0.2,5.7-2.6,10.6-2.6c5,0,6.4,2.6,10.7,2.5 c4.4-0.1,7.1-4,9.8-7.9c3.1-4.5,4.4-8.9,4.4-9.1C91.1,59.3,82.3,55.9,82.2,46.1z M71.3,21.8c2.3-2.7,3.8-6.5,3.4-10.3 c-3.2,0.1-7.2,2.2-9.4,4.9c-2,2.3-3.8,6.2-3.3,10C65.4,26.6,69.1,24.5,71.3,21.8z" />
            </svg>
        </div>
        <span class="font-extrabold px-1 font-bold">Finder</span>
        <span class="px-1 hover:bg-black/5 rounded cursor-default font-bold">File</span>
        <span class="px-1 hover:bg-black/5 rounded cursor-default font-bold">Edit</span>
        <span class="px-1 hover:bg-black/5 rounded cursor-default font-bold">View</span>
        <span class="px-1 hover:bg-black/5 rounded cursor-default font-bold">Go</span>
        <span class="px-1 hover:bg-black/5 rounded cursor-default font-bold">Window</span>
        <span class="px-1 hover:bg-black/5 rounded cursor-default font-bold">Help</span>
      </div>
      <div class="flex items-center space-x-3 pr-2 font-bold">
        <span class="opacity-80 scale-110 font-bold">📶</span>
        <span class="opacity-80 scale-110 font-bold">Bluetooth</span>
        <span class="opacity-80 font-bold">100%</span>
        <span class="font-bold tracking-tight">Tue 5:36 PM</span>
        <span class="opacity-80 font-bold">Bas Voss</span>
        <span class="text-sm opacity-60 font-bold">🔍</span>
      </div>
    </div>

    <!-- Desktop Icons -->
    <div class="absolute right-4 top-10 flex flex-col items-center space-y-6">
      <div class="flex flex-col items-center group cursor-pointer" @dblclick="openWindow('profile')">
        <div class="w-16 h-16 flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors">
          <img src="https://img.icons8.com/color/96/hdd.png" class="w-full h-full drop-shadow-md" />
        </div>
        <span class="text-white text-[11px] font-bold mt-1 bg-blue-600/50 backdrop-blur-sm px-2 py-0.5 rounded shadow-xl">Macintosh HD</span>
      </div>
    </div>

    <!-- Windows -->
    <div v-for="(win, id) in windows" :key="id">
      <div
        v-if="win.isOpen && !win.isMinimized"
        class="absolute bg-[#ececec] rounded-xl shadow-[0_35px_80px_-15px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden border border-white/50 glass-window-mac"
        :class="{ 'rounded-none border-none shadow-none': win.isMaximized }"
        :style="win.isMaximized ? { left: '0', top: '24px', width: '100vw', height: 'calc(100vh - 24px)', zIndex: win.zIndex, pointerEvents: 'auto' } : { left: win.x + 'px', top: win.y + 'px', width: win.width + 'px', height: win.height + 'px', zIndex: win.zIndex, pointerEvents: 'auto' }"
        @mousedown="focusWindow(id)"
      >
        <!-- Resize Handles -->
        <div v-if="!win.isMaximized" class="absolute inset-0 pointer-events-none z-[60]">
          <div class="absolute top-0 left-0 w-2 h-2 cursor-nw-resize pointer-events-auto" @mousedown="handleResize(id, $event, 'nw')"></div>
          <div class="absolute top-0 right-0 w-2 h-2 cursor-ne-resize pointer-events-auto" @mousedown="handleResize(id, $event, 'ne')"></div>
          <div class="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize pointer-events-auto" @mousedown="handleResize(id, $event, 'sw')"></div>
          <div class="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize pointer-events-auto z-50 bg-gradient-to-br from-transparent to-black/5 rounded-br-xl" @mousedown="handleResize(id, $event, 'se')"></div>
          <div class="absolute left-0 top-2 bottom-2 w-1.5 cursor-w-resize pointer-events-auto" @mousedown="handleResize(id, $event, 'w')"></div>
          <div class="absolute right-0 top-2 bottom-2 w-1.5 cursor-e-resize pointer-events-auto" @mousedown="handleResize(id, $event, 'e')"></div>
          <div class="absolute top-0 left-2 right-2 h-1.5 cursor-n-resize pointer-events-auto" @mousedown="handleResize(id, $event, 'n')"></div>
          <div class="absolute bottom-0 left-2 right-2 h-1.5 cursor-s-resize pointer-events-auto" @mousedown="handleResize(id, $event, 's')"></div>
        </div>

        <!-- Title Bar -->
        <div
          class="h-8 bg-gradient-to-b from-[#f6f6f6] to-[#d6d6d6] flex items-center px-4 border-b border-black/15 shadow-sm relative cursor-default shrink-0"
          @mousedown="handleDrag(id, $event)"
        >
          <div class="flex space-x-2.5 z-10 shrink-0">
            <div @click.stop="closeWindow(id)" class="w-3.5 h-3.5 rounded-full bg-[#ff5f57] border border-black/15 flex items-center justify-center text-[8px] hover:after:content-['×'] cursor-pointer transition-colors shadow-inner font-bold text-black/50"></div>
            <div @click.stop="minimizeWindow(id)" class="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-black/15 flex items-center justify-center text-[8px] hover:after:content-['−'] cursor-pointer transition-colors shadow-inner font-bold text-black/50"></div>
            <div @click.stop="maximizeWindow(id)" class="w-3.5 h-3.5 rounded-full bg-[#28c840] border border-black/15 flex items-center justify-center text-[8px] hover:after:content-['+'] cursor-pointer transition-colors shadow-inner font-bold text-black/50"></div>
          </div>
          <div class="flex-1 text-center text-black/90 font-bold capitalize tracking-tight select-none truncate px-4 font-bold">{{ id }}</div>
        </div>
        <!-- Content -->
        <div class="flex-1 bg-white overflow-hidden relative">
          <ProfileApp v-if="id === 'profile'" os="macos" />
          <ProjectsApp v-else-if="id === 'projects'" os="macos" />
          <ExperienceApp v-else-if="id === 'experience'" os="macos" />
          <SkillsApp v-else-if="id === 'skills'" os="macos" />
          <CalculatorApp v-else-if="id === 'calculator'" os="macos" />
          <NotesApp v-else-if="id === 'notes'" os="macos" />
        </div>
      </div>
    </div>

    <!-- Dock -->
    <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-end space-x-2.5 px-5 py-2.5 bg-white/20 backdrop-blur-3xl border border-white/30 rounded-[28px] shadow-[0_25px_50px_rgba(0,0,0,0.4)] z-[10000]">
      <div v-for="item in ['profile', 'projects', 'experience', 'skills', 'calculator', 'notes']"
           :key="item"
           class="group relative transition-all duration-300 hover:scale-140 hover:-translate-y-8 cursor-pointer flex flex-col items-center"
           @click="openWindow(item)"
      >
        <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl text-white px-4 py-2 rounded-2xl text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 capitalize shadow-2xl border border-white/15 translate-y-0 group-hover:translate-y-0 font-bold">
          {{ item }}
        </div>
        <div class="w-16 h-16 p-1.5 flex items-center justify-center">
          <img v-if="item === 'profile'" src="https://img.icons8.com/color/96/mac-logo.png" class="w-full h-full drop-shadow-xl" />
          <img v-else-if="item === 'projects'" src="https://img.icons8.com/color/96/opened-folder.png" class="w-full h-full drop-shadow-xl" />
          <img v-else-if="item === 'experience'" src="https://img.icons8.com/color/96/briefcase.png" class="w-full h-full drop-shadow-xl" />
          <img v-else-if="item === 'skills'" src="https://img.icons8.com/color/96/code.png" class="w-full h-full drop-shadow-xl" />
          <img v-else-if="item === 'calculator'" src="https://img.icons8.com/color/96/calculator.png" class="w-full h-full drop-shadow-xl" />
          <img v-else-if="item === 'notes'" src="https://img.icons8.com/color/96/notepad.png" class="w-full h-full drop-shadow-xl" />
        </div>

        <div v-if="windows[item]?.isOpen" class="w-1.5 h-1.5 bg-black/80 rounded-full shadow-inner mt-1.5 font-bold"></div>
      </div>
      <div class="w-[1px] h-14 bg-white/20 mx-4 self-center shadow-sm font-bold"></div>
      <div class="transition-all duration-300 hover:scale-100 hover:-translate-y-8 cursor-pointer group flex flex-col items-center font-bold">
        <div class="w-16 h-16 p-1.5 flex items-center justify-center font-bold">
          <img src="https://img.icons8.com/color/96/trash.png" class="w-full h-full drop-shadow-xl" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-window-mac {
  backdrop-filter: blur(30px) saturate(150%);
}

.hover\:scale-100:hover {
  transform: scale(1.0);
}

@keyframes window-in-mac {
  from { transform: scale(0.9) translateY(40px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}

/* Custom scrollbar for MacOS style in shared components is handled there if needed,
   but we can keep the desktop specific one here if we want it to affect all windows. */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #fbfbfb;
}
::-webkit-scrollbar-thumb {
  background: #bababa;
  border: 3px solid #fbfbfb;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
