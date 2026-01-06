<script setup lang="ts">
import { ref } from 'vue'
import { portfolioData } from '../../data/portfolio'
import { useWindowManagement } from '../../composables/useWindowManagement'

const {
  windows,
  topZIndex,
  focusWindow,
  openWindow,
  closeWindow,
  handleDrag,
  handleResize
} = useWindowManagement({
  profile: { isOpen: false, zIndex: 10, x: 100, y: 80, width: 700, height: 500 },
  projects: { isOpen: false, zIndex: 10, x: 150, y: 120, width: 650, height: 450 },
  experience: { isOpen: false, zIndex: 10, x: 200, y: 160, width: 600, height: 500 },
  skills: { isOpen: false, zIndex: 10, x: 250, y: 200, width: 550, height: 450 },
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
    <div class="h-7 bg-black flex items-center px-4 justify-between text-xs font-semibold z-[10000] relative">
      <div class="flex items-center space-x-6 h-full">
        <span class="hover:bg-white/10 px-3 h-full flex items-center cursor-pointer transition-colors" :class="{ 'bg-white/10': showActivities }" @click="toggleActivities">Activities</span>
        <span v-if="activeWindow && !showActivities" class="font-bold cursor-default px-2">{{ activeWindow.charAt(0).toUpperCase() + activeWindow.slice(1) }}</span>
      </div>
      <div class="absolute left-1/2 -translate-x-1/2 flex items-center h-full hover:bg-white/10 px-3 cursor-pointer">
        Jan 6 17:20
      </div>
      <div class="flex items-center space-x-4 h-full">
        <span class="hover:bg-white/10 px-2 h-full flex items-center opacity-80">📶</span>
        <span class="hover:bg-white/10 px-2 h-full flex items-center opacity-80">🔊</span>
        <span class="hover:bg-white/10 px-2 h-full flex items-center opacity-80">🔋</span>
        <span class="hover:bg-white/10 px-2 h-full flex items-center opacity-80 font-bold">▼</span>
      </div>
    </div>

    <!-- Activities Overlay -->
    <Transition name="fade">
      <div v-if="showActivities" class="absolute inset-0 bg-[#242424]/90 backdrop-blur-md z-[9000] flex items-center justify-center pt-7">
         <div class="grid grid-cols-4 gap-12 max-w-5xl">
            <div v-for="item in ['profile', 'projects', 'experience', 'skills']" :key="item" class="flex flex-col items-center hover:bg-white/5 p-6 rounded-2xl cursor-pointer transition-all hover:scale-105 active:scale-95" @click="selectWindow(item)">
              <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 p-2 shadow-xl border border-white/5">
                <img v-if="item === 'profile'" src="https://img.icons8.com/color/96/user-male-circle.png" class="w-full h-full" />
                <img v-else-if="item === 'projects'" src="https://img.icons8.com/color/96/folder-invoices.png" class="w-full h-full" />
                <img v-else-if="item === 'experience'" src="https://img.icons8.com/color/96/briefcase.png" class="w-full h-full" />
                <img v-else-if="item === 'skills'" src="https://img.icons8.com/color/96/code.png" class="w-full h-full" />
              </div>
              <span class="text-xs font-semibold capitalize tracking-wide">{{ item }}</span>
            </div>
         </div>

         <!-- Dock -->
         <div class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-xl p-3 rounded-[24px] flex flex-col space-y-4 shadow-2xl border border-white/10 transition-transform duration-300 translate-x-0">
            <div v-for="item in ['profile', 'projects', 'experience', 'skills']" :key="item" class="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-xl cursor-pointer group relative transition-colors" @click="selectWindow(item)">
               <img v-if="item === 'profile'" src="https://img.icons8.com/color/48/user-male-circle.png" class="w-8 h-8 opacity-80 group-hover:opacity-100" />
               <img v-else-if="item === 'projects'" src="https://img.icons8.com/color/48/folder-invoices.png" class="w-8 h-8 opacity-80 group-hover:opacity-100" />
               <img v-else-if="item === 'experience'" src="https://img.icons8.com/color/48/briefcase.png" class="w-8 h-8 opacity-80 group-hover:opacity-100" />
               <img v-else-if="item === 'skills'" src="https://img.icons8.com/color/48/code.png" class="w-8 h-8 opacity-80 group-hover:opacity-100" />
               <div v-if="windows[item].isOpen" class="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1 h-3 bg-white rounded-r-[1px] shadow-sm"></div>
            </div>
         </div>
      </div>
    </Transition>

    <!-- Windows (GNOME Adwaita Style) -->
    <div v-for="(win, id) in windows" :key="id">
      <div
        v-if="win.isOpen"
        class="absolute bg-[#fafafa] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden border border-black/10 text-gray-900 adwaita-window"
        :style="{ left: win.x + 'px', top: win.y + 'px', width: win.width + 'px', height: win.height + 'px', zIndex: win.zIndex }"
        @mousedown="focusWindow(id)"
      >
        <!-- Resize Handles -->
        <div class="absolute inset-0 pointer-events-none z-50">
          <div class="absolute top-0 left-0 w-2 h-2 cursor-nw-resize pointer-events-auto" @mousedown="handleResize(id, $event, 'nw')"></div>
          <div class="absolute top-0 right-0 w-2 h-2 cursor-ne-resize pointer-events-auto" @mousedown="handleResize(id, $event, 'ne')"></div>
          <div class="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize pointer-events-auto" @mousedown="handleResize(id, $event, 'sw')"></div>
          <div class="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize pointer-events-auto" @mousedown="handleResize(id, $event, 'se')"></div>
          <div class="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize pointer-events-auto" @mousedown="handleResize(id, $event, 'w')"></div>
          <div class="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize pointer-events-auto" @mousedown="handleResize(id, $event, 'e')"></div>
          <div class="absolute top-0 left-2 right-2 h-1 cursor-n-resize pointer-events-auto" @mousedown="handleResize(id, $event, 'n')"></div>
          <div class="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize pointer-events-auto" @mousedown="handleResize(id, $event, 's')"></div>
        </div>

        <!-- Header Bar -->
        <div
          class="h-11 bg-[#ebebeb] flex items-center px-4 border-b border-gray-300 cursor-default"
          @mousedown="handleDrag(id, $event)"
        >
          <div class="flex-1 text-center font-bold text-gray-700 capitalize flex items-center justify-center space-x-2 select-none tracking-tight">
            <span>{{ id }}</span>
          </div>
          <div class="flex items-center space-x-1">
             <div class="w-6 h-6 flex items-center justify-center hover:bg-black/5 rounded-full cursor-pointer transition-colors text-xl font-light text-gray-600 active:bg-black/10" @click.stop="closeWindow(id)">×</div>
          </div>
        </div>
        <!-- Content Area -->
        <div class="flex-1 overflow-auto p-10 bg-white">
          <div v-if="id === 'profile'">
            <h1 class="text-4xl font-black mb-1 text-gray-900 tracking-tighter">{{ portfolioData.personal.name }}</h1>
            <p class="text-gray-400 font-medium mb-10 text-sm uppercase tracking-widest">{{ portfolioData.personal.role }} • {{ portfolioData.personal.location }}</p>

            <div class="grid grid-cols-1 gap-8">
              <div class="border border-gray-100 p-8 rounded-2xl bg-gray-50/30 shadow-sm relative overflow-hidden group">
                <div class="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-20"></div>
                <h2 class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Professional Summary
                </h2>
                <p class="leading-relaxed text-gray-700 text-base">{{ portfolioData.personal.summary }}</p>
              </div>

              <div class="grid grid-cols-2 gap-8">
                <div v-for="edu in portfolioData.personal.education" class="border border-gray-100 p-6 rounded-2xl bg-white shadow-sm hover:border-gray-200 transition-colors">
                  <h3 class="text-sm font-black text-gray-900 mb-1">{{ edu.degree }}</h3>
                  <p class="text-xs text-gray-400 font-bold uppercase tracking-wider">{{ edu.period }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="id === 'projects'" class="space-y-4">
            <div v-for="p in portfolioData.projects" class="group flex items-center p-6 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 transition-all cursor-pointer shadow-sm hover:shadow-md">
              <div class="w-16 h-16 mr-6 p-3 bg-gray-100 rounded-xl group-hover:scale-110 transition-transform">
                <img :src="p.icon" class="w-full h-full object-contain" />
              </div>
              <div>
                <h3 class="font-black text-xl text-gray-900 mb-0.5 tracking-tight">{{ p.title }}</h3>
                <p class="text-sm text-gray-400 font-medium">{{ p.description }}</p>
                <div class="flex gap-2 mt-3">
                  <span class="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{{ p.tech }}</span>
                </div>
              </div>
              <div class="ml-auto text-gray-200 group-hover:text-blue-500 group-hover:translate-x-1 transition-all text-2xl font-light">→</div>
            </div>
          </div>

          <div v-else-if="id === 'experience'" class="space-y-6">
            <div v-for="exp in portfolioData.experience" class="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-blue-100 transition-colors group">
              <div class="flex justify-between items-start mb-6">
                <div>
                  <h3 class="font-black text-2xl text-gray-900 mb-1 tracking-tight group-hover:text-blue-600 transition-colors">{{ exp.role }}</h3>
                  <p class="text-sm text-gray-400 font-bold uppercase tracking-widest">{{ exp.company }}</p>
                </div>
                <span class="text-[10px] bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-black tracking-wider uppercase">{{ exp.period }}</span>
              </div>
              <div class="space-y-3">
                <div v-for="d in exp.description" class="text-gray-600 text-sm flex items-start leading-relaxed">
                  <span class="mr-4 mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0 group-hover:scale-125 transition-transform"></span>
                  {{ d }}
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="id === 'skills'" class="space-y-10">
            <div v-for="(list, category) in {Expertise: portfolioData.skills.expertise, Working: portfolioData.skills.working}" :key="category" class="space-y-6">
              <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center">
                {{ category }}
                <div class="flex-1 h-[1px] bg-gray-100 ml-4"></div>
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <div v-for="s in list" :key="s.name" class="flex items-center p-4 bg-gray-50/50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm transition-all group">
                  <div class="w-10 h-10 bg-white rounded-lg p-2 mr-4 shadow-sm group-hover:scale-110 transition-transform">
                    <img :src="`https://img.icons8.com/color/48/${s.icon}.png`" class="w-full h-full" />
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between items-center mb-1.5">
                      <span class="text-sm font-black text-gray-800">{{ s.name }}</span>
                      <span class="text-[10px] text-blue-500 font-black tracking-widest uppercase">{{ s.level }}</span>
                    </div>
                    <div class="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full bg-blue-600 rounded-full" :style="{ width: s.level }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
