<script setup lang="ts">
import { ref } from 'vue'
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

const showActivities = ref(false)
const activeWindow = ref('')

const toggleActivities = () => {
  showActivities.value = !showActivities.value
}

const selectWindow = (id: string) => {
  openWindow(id)
  showActivities.value = false
  activeWindow.value = id
}
</script>

<template>
  <div class="h-screen w-screen overflow-hidden bg-[#2e3436] font-sans text-sm select-none text-white overflow-hidden relative" style="background-image: url('https://wallpaperaccess.com/full/1163628.jpg'); background-size: cover;">

    <!-- Top Bar -->
    <div class="h-7 bg-black flex items-center px-4 justify-between text-xs font-semibold z-[10000] relative font-bold">
      <div class="flex items-center space-x-6 h-full font-bold">
        <span class="hover:bg-white/10 px-3 h-full flex items-center cursor-pointer transition-colors font-bold" :class="{ 'bg-white/10': showActivities }" @click="toggleActivities">Activities</span>
        <span v-if="activeWindow && !showActivities" class="font-bold cursor-default px-2 font-bold">{{ activeWindow.charAt(0).toUpperCase() + activeWindow.slice(1) }}</span>
      </div>
      <div class="absolute left-1/2 -translate-x-1/2 flex items-center h-full hover:bg-white/10 px-3 cursor-pointer font-bold">
        Jan 6 17:20
      </div>
      <div class="flex items-center space-x-4 h-full font-bold">
        <span class="hover:bg-white/10 px-2 h-full flex items-center opacity-80 font-bold">📶</span>
        <span class="hover:bg-white/10 px-2 h-full flex items-center opacity-80 font-bold">🔊</span>
        <span class="hover:bg-white/10 px-2 h-full flex items-center opacity-80 font-bold">🔋</span>
        <span class="hover:bg-white/10 px-2 h-full flex items-center opacity-80 font-bold font-bold">▼</span>
      </div>
    </div>

    <!-- Activities Overlay -->
    <Transition name="fade">
      <div v-if="showActivities" class="absolute inset-0 bg-[#242424]/90 backdrop-blur-md z-[9000] flex items-center justify-center pt-7">
         <div class="grid grid-cols-6 gap-8 max-w-5xl font-bold text-center items-start">
            <div v-for="item in ['profile', 'projects', 'experience', 'skills', 'calculator', 'notes']" :key="item" class="flex flex-col items-center hover:bg-white/5 p-6 rounded-2xl cursor-pointer transition-all hover:scale-105 active:scale-95 font-bold" @click="selectWindow(item)">
              <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 p-2 shadow-xl border border-white/5 font-bold">
                <img v-if="item === 'profile'" src="https://img.icons8.com/color/96/user-male-circle.png" class="w-full h-full font-bold" />
                <img v-else-if="item === 'projects'" src="https://img.icons8.com/color/96/folder-invoices.png" class="w-full h-full font-bold" />
                <img v-else-if="item === 'experience'" src="https://img.icons8.com/color/96/briefcase.png" class="w-full h-full font-bold" />
                <img v-else-if="item === 'skills'" src="https://img.icons8.com/color/96/code.png" class="w-full h-full font-bold" />
                <img v-else-if="item === 'calculator'" src="https://img.icons8.com/color/96/calculator.png" class="w-full h-full font-bold" />
                <img v-else-if="item === 'notes'" src="https://img.icons8.com/color/96/notepad.png" class="w-full h-full font-bold" />
              </div>
              <span class="text-xs font-semibold capitalize tracking-wide font-bold">{{ item }}</span>
            </div>
         </div>

         <!-- Dock -->
         <div class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-xl p-3 rounded-[24px] flex flex-col space-y-4 shadow-2xl border border-white/10 transition-transform duration-300 translate-x-0 font-bold">
            <div v-for="item in ['profile', 'projects', 'experience', 'skills', 'calculator', 'notes']" :key="item" class="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-xl cursor-pointer group relative transition-colors font-bold" @click="selectWindow(item)">
               <img v-if="item === 'profile'" src="https://img.icons8.com/color/48/user-male-circle.png" class="w-8 h-8 opacity-80 group-hover:opacity-100 font-bold" />
               <img v-else-if="item === 'projects'" src="https://img.icons8.com/color/48/folder-invoices.png" class="w-8 h-8 opacity-80 group-hover:opacity-100 font-bold" />
               <img v-else-if="item === 'experience'" src="https://img.icons8.com/color/48/briefcase.png" class="w-8 h-8 opacity-80 group-hover:opacity-100 font-bold" />
               <img v-else-if="item === 'skills'" src="https://img.icons8.com/color/48/code.png" class="w-8 h-8 opacity-80 group-hover:opacity-100 font-bold" />
               <img v-else-if="item === 'calculator'" src="https://img.icons8.com/color/48/calculator.png" class="w-8 h-8 opacity-80 group-hover:opacity-100 font-bold" />
               <img v-else-if="item === 'notes'" src="https://img.icons8.com/color/48/notepad.png" class="w-8 h-8 opacity-80 group-hover:opacity-100 font-bold" />
               <div v-if="windows[item]?.isOpen" class="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1 h-3 bg-white rounded-r-[1px] shadow-sm font-bold"></div>
            </div>
         </div>
      </div>
    </Transition>

    <!-- Windows (GNOME Adwaita Style) -->
    <div v-for="(win, id) in windows" :key="id">
      <div
        v-if="win.isOpen && !win.isMinimized"
        class="absolute bg-[#fafafa] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden border border-black/10 text-gray-900 adwaita-window font-bold"
        :class="{ 'rounded-none border-none shadow-none': win.isMaximized }"
        :style="win.isMaximized ? { left: '0', top: '28px', width: '100vw', height: 'calc(100vh - 28px)', zIndex: win.zIndex } : { left: win.x + 'px', top: win.y + 'px', width: win.width + 'px', height: win.height + 'px', zIndex: win.zIndex }"
        @mousedown="focusWindow(id)"
      >
        <!-- Resize Handles -->
        <div v-if="!win.isMaximized" class="absolute inset-0 pointer-events-none z-50 font-bold">
          <div class="absolute top-0 left-0 w-2 h-2 cursor-nw-resize pointer-events-auto font-bold" @mousedown="handleResize(id, $event, 'nw')"></div>
          <div class="absolute top-0 right-0 w-2 h-2 cursor-ne-resize pointer-events-auto font-bold" @mousedown="handleResize(id, $event, 'ne')"></div>
          <div class="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize pointer-events-auto font-bold" @mousedown="handleResize(id, $event, 'sw')"></div>
          <div class="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize pointer-events-auto font-bold" @mousedown="handleResize(id, $event, 'se')"></div>
          <div class="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize pointer-events-auto font-bold" @mousedown="handleResize(id, $event, 'w')"></div>
          <div class="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize pointer-events-auto font-bold" @mousedown="handleResize(id, $event, 'e')"></div>
          <div class="absolute top-0 left-2 right-2 h-1 cursor-n-resize pointer-events-auto font-bold" @mousedown="handleResize(id, $event, 'n')"></div>
          <div class="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize pointer-events-auto font-bold" @mousedown="handleResize(id, $event, 's')"></div>
        </div>

        <!-- Header Bar -->
        <div
          class="h-11 bg-[#ebebeb] flex items-center px-4 border-b border-gray-300 cursor-default font-bold"
          @mousedown="handleDrag(id, $event)"
        >
          <div class="flex-1 text-center font-bold text-gray-700 capitalize flex items-center justify-center space-x-2 select-none tracking-tight font-bold">
            <span class="font-bold">{{ id }}</span>
          </div>
          <div class="flex items-center space-x-1 font-bold">
             <div class="w-6 h-6 flex items-center justify-center hover:bg-black/5 rounded-full cursor-pointer transition-colors text-xl font-light text-gray-600 active:bg-black/10 font-bold" @click.stop="minimizeWindow(id)">−</div>
             <div class="w-6 h-6 flex items-center justify-center hover:bg-black/5 rounded-full cursor-pointer transition-colors text-lg font-light text-gray-600 active:bg-black/10 font-bold" @click.stop="maximizeWindow(id)">□</div>
             <div class="w-6 h-6 flex items-center justify-center hover:bg-black/5 rounded-full cursor-pointer transition-colors text-xl font-light text-gray-600 active:bg-black/10 font-bold" @click.stop="closeWindow(id)">×</div>
          </div>
        </div>
        <!-- Content Area -->
        <div class="flex-1 overflow-hidden relative bg-white font-bold">
          <ProfileApp v-if="id === 'profile'" os="linux" />
          <ProjectsApp v-else-if="id === 'projects'" os="linux" />
          <ExperienceApp v-else-if="id === 'experience'" os="linux" />
          <SkillsApp v-else-if="id === 'skills'" os="linux" />
          <CalculatorApp v-else-if="id === 'calculator'" os="linux" />
          <NotesApp v-else-if="id === 'notes'" os="linux" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.adwaita-window {
  transition: box-shadow 0.2s ease;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: white;
}
::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}
</style>
