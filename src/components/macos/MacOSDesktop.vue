<script setup lang="ts">
import { portfolioData } from '../../data/portfolio'
import { useWindowManagement } from '../../composables/useWindowManagement'

const {
  windows,
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
        <span class="font-extrabold px-1">Finder</span>
        <span class="px-1 hover:bg-black/5 rounded cursor-default">File</span>
        <span class="px-1 hover:bg-black/5 rounded cursor-default">Edit</span>
        <span class="px-1 hover:bg-black/5 rounded cursor-default">View</span>
        <span class="px-1 hover:bg-black/5 rounded cursor-default">Go</span>
        <span class="px-1 hover:bg-black/5 rounded cursor-default">Window</span>
        <span class="px-1 hover:bg-black/5 rounded cursor-default">Help</span>
      </div>
      <div class="flex items-center space-x-3 pr-2">
        <span class="opacity-80 scale-110">📶</span>
        <span class="opacity-80 scale-110">Bluetooth</span>
        <span class="opacity-80 font-bold">100%</span>
        <span class="font-bold tracking-tight">Tue 5:36 PM</span>
        <span class="opacity-80 font-bold">Bas Voss</span>
        <span class="text-sm opacity-60">🔍</span>
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
        v-if="win.isOpen"
        class="absolute bg-[#ececec] rounded-xl shadow-[0_35px_80px_-15px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden border border-white/50 glass-window-mac"
        :style="{ left: win.x + 'px', top: win.y + 'px', width: win.width + 'px', height: win.height + 'px', zIndex: win.zIndex, pointerEvents: 'auto' }"
        @mousedown="focusWindow(id)"
      >
        <!-- Resize Handles -->
        <div class="absolute inset-0 pointer-events-none z-[60]">
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
            <div class="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-black/15 flex items-center justify-center text-[8px] hover:after:content-['−'] cursor-pointer transition-colors shadow-inner font-bold text-black/50"></div>
            <div class="w-3.5 h-3.5 rounded-full bg-[#28c840] border border-black/15 flex items-center justify-center text-[8px] hover:after:content-['+'] cursor-pointer transition-colors shadow-inner font-bold text-black/50"></div>
          </div>
          <div class="flex-1 text-center text-black/90 font-bold capitalize tracking-tight select-none truncate px-4">{{ id }}</div>
        </div>
        <!-- Content -->
        <div class="flex-1 bg-white overflow-auto p-10 text-[#333] leading-relaxed relative">
          <div v-if="id === 'profile'">
            <h1 class="text-4xl font-extrabold mb-2 text-black tracking-tight">{{ portfolioData.personal.name }}</h1>
            <p class="text-blue-600 font-bold mb-10 text-xl">{{ portfolioData.personal.role }} • {{ portfolioData.personal.location }}</p>
            <div class="grid grid-cols-2 gap-12">
              <div class="space-y-4">
                <h2 class="font-bold text-gray-400 uppercase text-[11px] tracking-[0.2em] mb-4 border-b pb-2">Professional Summary</h2>
                <p class="text-sm leading-relaxed text-gray-700 font-medium">{{ portfolioData.personal.summary }}</p>
              </div>
              <div class="space-y-4">
                <h2 class="font-bold text-gray-400 uppercase text-[11px] tracking-[0.2em] mb-4 border-b pb-2">Academic Background</h2>
                <div v-for="edu in portfolioData.personal.education" :key="edu.degree" class="mb-6 p-4 bg-gray-50 border border-gray-100 rounded-xl shadow-sm">
                   <p class="font-extrabold text-sm text-black">{{ edu.degree }}</p>
                   <p class="text-[11px] text-blue-500 font-bold italic mt-1 uppercase">{{ edu.period }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="id === 'projects'" class="grid grid-cols-2 gap-8">
            <div v-for="p in portfolioData.projects" :key="p.title" class="bg-gradient-to-b from-white to-gray-50 border border-gray-100 p-8 rounded-3xl hover:shadow-2xl transition-all flex flex-col items-center text-center shadow-md cursor-pointer group">
              <div class="w-24 h-24 mb-6 transition-transform group-hover:scale-110">
                <img :src="p.icon" class="w-full h-full object-contain filter drop-shadow-lg" />
              </div>
              <h3 class="font-black text-xl mb-1 text-black tracking-tight">{{ p.title }}</h3>
              <p class="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-6">{{ p.tech }}</p>
              <a :href="p.url" target="_blank" class="mt-auto px-6 py-2 bg-gradient-to-b from-[#4a9eff] to-[#3284ff] hover:from-[#3284ff] hover:to-[#1a71ff] text-white text-xs font-bold rounded-full transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95">Open View</a>
            </div>
          </div>

          <div v-else-if="id === 'experience'" class="max-w-3xl mx-auto space-y-12 py-4">
            <div v-for="exp in portfolioData.experience" :key="exp.company" class="relative pl-12 group">
              <div class="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:scale-125 transition-transform z-10"></div>
              <div class="absolute left-2 top-6 bottom-[-48px] w-0.5 bg-gray-100 last:hidden"></div>
              <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm group-hover:bg-white group-hover:shadow-md transition-all">
                <h3 class="font-black text-2xl text-black tracking-tight mb-1">{{ exp.role }}</h3>
                <p class="text-sm font-bold text-blue-600 mb-6 flex items-center">
                  {{ exp.company }} <span class="mx-3 opacity-20">|</span>
                  <span class="text-gray-400">{{ exp.period }}</span>
                </p>
                <div class="space-y-3">
                  <div v-for="d in exp.description" :key="d" class="text-sm text-gray-600 flex items-start leading-relaxed font-medium">
                    <span class="mr-3 text-blue-500 mt-1">▹</span> {{ d }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="id === 'skills'" class="grid grid-cols-2 gap-10">
             <div class="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 shadow-sm">
               <h3 class="font-black mb-8 uppercase text-[11px] tracking-[0.3em] text-gray-400 border-b pb-3 flex items-center">
                 <span class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 shadow-lg shadow-blue-500/50"></span>
                 Expertise
               </h3>
               <div class="space-y-6">
                 <div v-for="s in portfolioData.skills.expertise" :key="s.name">
                    <div class="flex justify-between items-center text-xs mb-2.5">
                      <div class="flex items-center">
                        <img :src="`https://img.icons8.com/color/48/${s.icon}.png`" class="w-6 h-6 mr-4 transition-transform hover:rotate-12" />
                        <span class="font-black text-gray-800">{{ s.name }}</span>
                      </div>
                      <span class="text-blue-600 font-extrabold tracking-tighter">{{ s.level }}</span>
                    </div>
                    <div class="h-1.5 bg-gray-200/50 rounded-full overflow-hidden shadow-inner flex">
                      <div class="h-full bg-gradient-to-r from-[#4facfe] to-[#00f2fe] rounded-full shadow-lg" :style="{ width: s.level }"></div>
                    </div>
                 </div>
               </div>
             </div>
             <div class="space-y-8">
               <div class="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                 <h3 class="font-black mb-6 uppercase text-[11px] tracking-[0.3em] text-gray-400 border-b pb-2">Knowledge</h3>
                  <div class="flex flex-wrap gap-2.5">
                    <span v-for="s in portfolioData.skills.working" :key="s.name" class="px-4 py-1.5 bg-white text-gray-600 rounded-xl text-[11px] border border-gray-100 shadow-sm font-bold transition-all hover:scale-105 cursor-default">{{ s.name }}</span>
                  </div>
               </div>
               <div class="bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                  <div class="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  <h3 class="font-black mb-6 uppercase text-[11px] tracking-[0.3em] text-blue-100 border-b border-white/20 pb-2">Learning</h3>
                  <div class="flex flex-wrap gap-2.5">
                    <span v-for="s in portfolioData.skills.learning" :key="s.name" class="px-4 py-1.5 bg-white/15 backdrop-blur-md text-white rounded-xl text-[11px] font-black border border-white/10">{{ s.name }}</span>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dock -->
    <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-end space-x-2.5 px-5 py-2.5 bg-white/20 backdrop-blur-3xl border border-white/30 rounded-[28px] shadow-[0_25px_50px_rgba(0,0,0,0.4)] z-[10000]">
      <div v-for="item in ['profile', 'projects', 'experience', 'skills']"
           :key="item"
           class="group relative transition-all duration-300 hover:scale-140 hover:-translate-y-8 cursor-pointer flex flex-col items-center"
           @click="openWindow(item)"
      >
        <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl text-white px-4 py-2 rounded-2xl text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 capitalize shadow-2xl border border-white/15 translate-y-0 group-hover:translate-y-0">
          {{ item }}
        </div>
        <div class="w-16 h-16 p-1.5 flex items-center justify-center">
          <img v-if="item === 'profile'" src="https://img.icons8.com/color/96/mac-logo.png" class="w-full h-full drop-shadow-xl" />
          <img v-else-if="item === 'projects'" src="https://img.icons8.com/color/96/opened-folder.png" class="w-full h-full drop-shadow-xl" />
          <img v-else-if="item === 'experience'" src="https://img.icons8.com/color/96/briefcase.png" class="w-full h-full drop-shadow-xl" />
          <img v-else-if="item === 'skills'" src="https://img.icons8.com/color/96/code.png" class="w-full h-full drop-shadow-xl" />
        </div>

        <div v-if="windows[item]?.isOpen" class="w-1.5 h-1.5 bg-black/80 rounded-full shadow-inner mt-1.5"></div>
      </div>
      <div class="w-[1px] h-14 bg-white/20 mx-4 self-center shadow-sm"></div>
      <div class="transition-all duration-300 hover:scale-100 hover:-translate-y-8 cursor-pointer group flex flex-col items-center">
        <div class="w-16 h-16 p-1.5 flex items-center justify-center">
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

/* Custom scrollbar for MacOS */
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
