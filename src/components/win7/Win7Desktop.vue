<script setup lang="ts">
import { ref } from 'vue'
import { useWindowManagement } from '../../composables/useWindowManagement'
import { portfolioData } from '../../data/portfolio'

// Shared Components
import DesktopIcon from '../shared/DesktopIcon.vue'
import ExplorerShell from '../shared/ExplorerShell.vue'
import Win7Taskbar from './Win7Taskbar.vue'
import AppWindow from '../shared/AppWindow.vue'
import StartMenu from './StartMenu.vue'

const {
  windows,
  topZIndex,
  focusWindow,
  openWindow,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  updateWindowPosition,
  updateWindowSize
} = useWindowManagement({
  profile: { isOpen: false, zIndex: 10, x: 100, y: 50, width: 800, height: 600 },
  projects: { isOpen: false, zIndex: 10, x: 150, y: 100, width: 700, height: 500 },
  experience: { isOpen: false, zIndex: 10, x: 200, y: 150, width: 600, height: 500 },
  skills: { isOpen: false, zIndex: 10, x: 250, y: 200, width: 600, height: 450 },
})

const isStartMenuOpen = ref(false)
const toggleStartMenu = () => { isStartMenuOpen.value = !isStartMenuOpen.value }
const toggleWindow = (id: string) => {
  const win = windows.value[id]
  if (win && win.isOpen) focusWindow(id)
  else if (win) openWindow(id)
}

const wallpaperUrl = "url('/wallpaper.png')"

// Icons for Windows 7
const win7Icons = {
  profile: '👤',
  projects: '📁',
  experience: '💼',
  skills: '💻'
}
</script>

<template>
  <div class="h-screen w-screen relative overflow-hidden bg-cover bg-center" :style="{ backgroundImage: wallpaperUrl }">
    <!-- Desktop Icons -->
    <div class="p-4 grid grid-flow-col grid-rows-10 w-fit gap-2">
      <DesktopIcon
        label="My Profile"
        icon="https://img.icons8.com/color/96/my-computer.png"
        @open="openWindow('profile')"
      />
      <DesktopIcon
        label="Projects"
        icon="https://img.icons8.com/color/96/folder-invoices.png"
        @open="openWindow('projects')"
      />
      <DesktopIcon
        label="Work Experience"
        icon="https://img.icons8.com/color/96/briefcase.png"
        @open="openWindow('experience')"
      />
      <DesktopIcon
        label="Programming Skills"
        icon="https://img.icons8.com/color/96/code.png"
        @open="openWindow('skills')"
      />
    </div>

    <!-- Windows -->
    <template v-for="(win, id) in windows" :key="id">
      <AppWindow
        v-if="win.isOpen && !win.isMinimized"
        :title="id === 'profile' ? 'My Profile' : id === 'projects' ? 'Projects' : id === 'experience' ? 'Work Experience' : 'Programming Skills'"
        :isActive="win.zIndex === topZIndex"
        :isMaximized="win.isMaximized"
        :style="win.isMaximized ? {
          left: '0',
          top: '0',
          width: '100vw',
          height: 'calc(100vh - 40px)',
          zIndex: win.zIndex,
          position: 'absolute'
        } : {
          left: win.x + 'px',
          top: win.y + 'px',
          width: win.width + 'px',
          height: win.height + 'px',
          zIndex: win.zIndex,
          position: 'absolute'
        }"
        @close="closeWindow(id)"
        @minimize="minimizeWindow(id)"
        @maximize="maximizeWindow(id)"
        @focus="focusWindow(id)"
        @move="(e: any) => updateWindowPosition(id, e)"
        @resize="(e: any) => updateWindowSize(id, e)"
      >
        <template #icon><span class="text-lg">{{ win7Icons[id as keyof typeof win7Icons] }}</span></template>

        <!-- Profile Content -->
        <div v-if="id === 'profile'" class="h-full">
          <ExplorerShell title="My Profile" path="C:\Users\Bas\Documents" class="h-full">
            <div class="max-w-3xl mx-auto border shadow-sm p-8 bg-white font-serif text-gray-900 overflow-auto h-full">
              <h1 class="text-3xl font-bold border-b-2 border-gray-800 pb-2 mb-6 uppercase tracking-tighter">Curriculum Vitae</h1>

              <section class="mb-6">
                <h2 class="text-xl font-bold uppercase tracking-widest text-blue-800 border-b mb-3">Personal Information</h2>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Name:</strong> {{ portfolioData.personal.name }}</div>
                  <div><strong>Location:</strong> {{ portfolioData.personal.location }}</div>
                  <div><strong>Role:</strong> {{ portfolioData.personal.role }}</div>
                  <div><strong>Contact:</strong> {{ portfolioData.personal.contact }}</div>
                </div>
              </section>

              <section class="mb-6">
                <h2 class="text-xl font-bold uppercase tracking-widest text-blue-800 border-b mb-3">Summary</h2>
                <p class="text-sm leading-relaxed">{{ portfolioData.personal.summary }}</p>
              </section>

              <section>
                <h2 class="text-xl font-bold uppercase tracking-widest text-blue-800 border-b mb-3">Education</h2>
                <div v-for="edu in portfolioData.personal.education" :key="edu.degree" class="text-sm mb-2">
                  <p class="font-bold">{{ edu.degree }}</p>
                  <p class="text-gray-600 italic">{{ edu.period }}</p>
                </div>
              </section>
            </div>
          </ExplorerShell>
        </div>

        <!-- Projects Content -->
        <div v-else-if="id === 'projects'" class="h-full">
          <ExplorerShell title="Projects" path="C:\Users\Bas\Projects" class="h-full">
            <div class="grid grid-cols-3 gap-6 p-6 overflow-auto h-full text-black">
              <a
                v-for="p in portfolioData.projects"
                :key="p.title"
                :href="p.url"
                target="_blank"
                class="flex flex-col items-center p-4 rounded hover:bg-blue-50 border border-transparent hover:border-blue-200 cursor-pointer transition-all"
              >
                <img :src="p.icon" class="w-16 h-16 mb-2" />
                <span class="text-sm font-semibold">{{ p.title }}</span>
                <span class="text-xs text-gray-500">{{ p.tech }}</span>
              </a>
            </div>
          </ExplorerShell>
        </div>

        <!-- Experience Content -->
        <div v-else-if="id === 'experience'" class="h-full">
          <ExplorerShell title="Work Experience" path="C:\Users\Bas\Documents\Career" class="h-full">
            <div class="space-y-8 p-8 overflow-auto h-full text-black">
              <div v-for="exp in portfolioData.experience" :key="exp.period" class="relative pl-6 border-l-2 border-blue-500">
                <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                <div class="bg-gray-50 p-4 rounded shadow-sm">
                  <h3 class="font-bold text-blue-700">{{ exp.role }} @ {{ exp.company }}</h3>
                  <p class="text-xs text-gray-500 mb-2">{{ exp.period }} | {{ exp.location }}</p>
                  <ul class="text-sm space-y-2 list-disc ml-4 text-gray-700">
                    <li v-for="desc in exp.description" :key="desc">{{ desc }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </ExplorerShell>
        </div>

        <!-- Skills Content -->
        <div v-else-if="id === 'skills'" class="h-full">
          <ExplorerShell title="Programming Skills" path="C:\Windows\System32" class="h-full">
            <div class="p-8 overflow-auto h-full text-black">
              <div class="mb-8">
                <h3 class="text-sm font-bold border-b mb-4 uppercase text-gray-500">Expertise</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div v-for="s in portfolioData.skills.expertise" :key="s.name" class="p-3 border rounded bg-gray-50 flex items-center gap-3">
                    <img :src="`https://img.icons8.com/color/48/${s.icon}.png`" class="w-8 h-8" />
                    <div class="flex-1">
                      <div class="font-bold text-xs">{{ s.name }}</div>
                      <div class="w-full h-1.5 bg-gray-200 rounded mt-1 overflow-hidden border border-gray-300">
                        <div class="h-full bg-blue-500" :style="{ width: s.level }"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

               <div class="mb-8">
                <h3 class="text-sm font-bold border-b mb-4 uppercase text-gray-500">Working Knowledge</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div v-for="s in portfolioData.skills.working" :key="s.name" class="p-3 border rounded bg-gray-50 flex items-center gap-3">
                    <img :src="`https://img.icons8.com/color/48/${s.icon}.png`" class="w-8 h-8" />
                    <div class="flex-1">
                      <div class="font-bold text-xs">{{ s.name }}</div>
                      <div class="w-full h-1.5 bg-gray-200 rounded mt-1 overflow-hidden border border-gray-300">
                        <div class="h-full bg-green-500" :style="{ width: s.level }"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ExplorerShell>
        </div>
      </AppWindow>
    </template>

    <!-- Taskbar -->
    <Win7Taskbar @openStartMenu="toggleStartMenu">
      <template #apps>
        <div v-for="(win, id) in windows" :key="id">
          <div v-if="win.isOpen" class="h-8 px-3 rounded flex items-center bg-white/10 border border-white/20 hover:bg-white/20 cursor-pointer min-w-[120px] transition-all" :class="{'bg-white/30 border-white/40 shadow-inner': win.zIndex === topZIndex}" @click="toggleWindow(id)">
            <span class="mr-2">{{ win7Icons[id as keyof typeof win7Icons] }}</span>
            <span class="text-white text-xs truncate capitalize">{{ id }}</span>
          </div>
        </div>
      </template>
    </Win7Taskbar>

    <!-- Start Menu -->
    <StartMenu
      :isOpen="isStartMenuOpen"
      @close="isStartMenuOpen = false"
      @openFolder="(id) => { openWindow(id); isStartMenuOpen = false }"
    />
  </div>
</template>

<style scoped>
.shadow-inner {
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
}
</style>
