<script setup lang="ts">
import { ref, reactive } from 'vue'
import DesktopIcon from './components/DesktopIcon.vue'
import Window from './components/Window.vue'
import Taskbar from './components/Taskbar.vue'
import StartMenu from './components/StartMenu.vue'
import ExplorerShell from './components/ExplorerShell.vue'

// Window state management
interface AppWindow {
  id: string
  title: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  x: number
  y: number
  width: number
  height: number
  icon: string
}

const windows = reactive<Record<string, AppWindow>>({
  profile: {
    id: 'profile',
    title: 'My Profile',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    x: 100,
    y: 50,
    width: 800,
    height: 600,
    icon: '👤',
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    x: 150,
    y: 100,
    width: 700,
    height: 500,
    icon: '📁',
  },
  experience: {
    id: 'experience',
    title: 'Work Experience',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    x: 200,
    y: 150,
    width: 600,
    height: 500,
    icon: '💼',
  },
  skills: {
    id: 'skills',
    title: 'Programming Skills',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    x: 250,
    y: 200,
    width: 600,
    height: 450,
    icon: '💻',
  },
})

const topZIndex = ref(100)

const openWindow = (id: string) => {
  if (windows[id]) {
    windows[id].isOpen = true
    windows[id].isMinimized = false
    focusWindow(id)
  }
}

const toggleWindow = (id: string) => {
  const win = windows[id]
  if (!win) return
  if (win.isOpen && !win.isMinimized) {
    if (win.zIndex === topZIndex.value) {
      win.isMinimized = true
    } else {
      focusWindow(id)
    }
  } else {
    openWindow(id)
  }
}

const closeWindow = (id: string) => {
  if (windows[id]) windows[id].isOpen = false
}

const minimizeWindow = (id: string) => {
  if (windows[id]) windows[id].isMinimized = true
}

const maximizeWindow = (id: string) => {
  if (windows[id]) windows[id].isMaximized = !windows[id].isMaximized
}

const focusWindow = (id: string) => {
  if (windows[id]) {
    topZIndex.value += 1
    windows[id].zIndex = topZIndex.value
    windows[id].isMinimized = false
  }
}

// Start Menu state
const isStartMenuOpen = ref(false)
const toggleStartMenu = () => {
  isStartMenuOpen.value = !isStartMenuOpen.value
}

const moveWindow = (id: string, delta: { dx: number; dy: number }) => {
  if (windows[id]) {
    windows[id].x += delta.dx
    windows[id].y += delta.dy
  }
}

const wallpaperUrl = "url('/wallpaper.png')"
</script>

<template>
  <div
    class="h-screen w-screen relative overflow-hidden bg-cover bg-center"
    :style="{ backgroundImage: wallpaperUrl }"
  >
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
    <template v-for="win in windows" :key="win.id">
      <Window
        v-if="win.isOpen && !win.isMinimized"
        :title="win.title"
        :isActive="win.zIndex === topZIndex"
        :isMaximized="win.isMaximized"
        :style="{
          left: win.isMaximized ? '0' : win.x + 'px',
          top: win.isMaximized ? '0' : win.y + 'px',
          width: win.isMaximized ? '100%' : win.width + 'px',
          height: win.isMaximized ? 'calc(100% - 40px)' : win.height + 'px',
          zIndex: win.zIndex,
        }"
        @close="closeWindow(win.id)"
        @minimize="minimizeWindow(win.id)"
        @maximize="maximizeWindow(win.id)"
        @focus="focusWindow(win.id)"
        @move="(delta: { dx: number; dy: number }) => moveWindow(win.id, delta)"
      >
        <template #icon>
          <span class="text-lg">{{ win.icon }}</span>
        </template>

        <!-- Window Content based on ID -->
        <div v-if="win.id === 'profile'" class="h-full">
          <ExplorerShell title="My Profile" path="C:\Users\Bas\Documents" class="h-full">
            <div class="max-w-3xl mx-auto border shadow-sm p-8 bg-gray-50 font-serif text-gray-900">
              <h1 class="text-3xl font-bold border-b-2 border-gray-800 pb-2 mb-6">
                CURRICULUM VITAE
              </h1>

              <section class="mb-6">
                <h2 class="text-xl font-bold uppercase tracking-widest text-blue-800 border-b mb-3">
                  Personal Information
                </h2>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Name:</strong> Bas</div>
                  <div><strong>Location:</strong> The Internet</div>
                  <div><strong>Role:</strong> Senior Web Developer</div>
                  <div><strong>Contact:</strong> bas@example.com</div>
                </div>
              </section>

              <section class="mb-6">
                <h2 class="text-xl font-bold uppercase tracking-widest text-blue-800 border-b mb-3">
                  Summary
                </h2>
                <p class="text-sm leading-relaxed">
                  Experienced developer focused on building clean, performant web experiences.
                  Specialized in modern frontend stacks and thoughtful UX. Turning ideas into products
                  with maintainable code.
                </p>
              </section>

              <section>
                <h2 class="text-xl font-bold uppercase tracking-widest text-blue-800 border-b mb-3">
                  Education
                </h2>
                <div class="text-sm">
                  <p class="font-bold">Masters in Software Engineering</p>
                  <p class="text-gray-600 italic">2018 - 2020</p>
                </div>
              </section>
            </div>
          </ExplorerShell>
        </div>

        <div v-else-if="win.id === 'projects'" class="h-full">
          <ExplorerShell title="Projects" path="C:\Users\Bas\Projects" class="h-full">
            <div class="grid grid-cols-3 gap-6 p-4">
              <a
                href="https://github.com/Nithiann/portfolio"
                target="_blank"
                class="group flex flex-col items-center p-4 rounded hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all"
              >
                <img
                  src="https://img.icons8.com/color/96/github.png"
                  alt="GitHub"
                  class="w-16 h-16 mb-2"
                />
                <span class="text-sm font-semibold text-center group-hover:text-blue-600"
                  >Portfolio Design</span
                >
                <span class="text-xs text-gray-500 mt-1">Windows 7 Look</span>
              </a>
              <a
                href="#"
                target="_blank"
                class="group flex flex-col items-center p-4 rounded hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all"
              >
                <img
                  src="https://img.icons8.com/color/96/code.png"
                  alt="App"
                  class="w-16 h-16 mb-2"
                />
                <span class="text-sm font-semibold text-center group-hover:text-blue-600"
                  >AI Dashboard</span
                >
                <span class="text-xs text-gray-500 mt-1">Real-time Analytics</span>
              </a>
              <a
                href="#"
                target="_blank"
                class="group flex flex-col items-center p-4 rounded hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all"
              >
                <img
                  src="https://img.icons8.com/color/96/server.png"
                  alt="Server"
                  class="w-16 h-16 mb-2"
                />
                <span class="text-sm font-semibold text-center group-hover:text-blue-600"
                  >Microservices API</span
                >
                <span class="text-xs text-gray-500 mt-1">Node.js / Docker</span>
              </a>
            </div>
          </ExplorerShell>
        </div>

        <div v-else-if="win.id === 'experience'" class="h-full">
          <ExplorerShell title="Work Experience" path="C:\Users\Bas\Documents\Career" class="h-full">
            <div class="space-y-8 p-6">
              <div class="relative pl-6 border-l-2 border-blue-500">
                <div
                  class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"
                ></div>
                <div class="bg-gray-50 p-4 rounded shadow-sm">
                  <h3 class="font-bold text-blue-700">Senior Web Developer @ Tech Solutions</h3>
                  <p class="text-xs text-gray-500 mb-2">2022 - PRESENT | Remote</p>
                  <ul class="text-sm space-y-2 list-disc ml-4 text-gray-700">
                    <li>Leading the migration of legacy apps to Vue 3 and TypeScript.</li>
                    <li>Architecting design systems for consistent UI across 10+ projects.</li>
                    <li>Mentoring junior developers and conducting code reviews.</li>
                  </ul>
                </div>
              </div>

              <div class="relative pl-6 border-l-2 border-gray-300">
                <div
                  class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 border-2 border-white"
                ></div>
                <div class="bg-gray-50 p-4 rounded shadow-sm">
                  <h3 class="font-bold text-gray-700">Frontend Developer @ Creative Agency</h3>
                  <p class="text-xs text-gray-500 mb-2">2020 - 2022 | Amsterdam</p>
                  <p class="text-sm text-gray-700">
                    Implemented complex user interfaces with a focus on pixel-perfect designs and
                    smooth animations.
                  </p>
                </div>
              </div>

              <div class="relative pl-6 border-l-2 border-gray-300">
                <div
                  class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 border-2 border-white"
                ></div>
                <div class="bg-gray-50 p-4 rounded shadow-sm">
                  <h3 class="font-bold text-gray-700">Junior Developer @ Startup Hub</h3>
                  <p class="text-xs text-gray-500 mb-2">2018 - 2020 | Berlin</p>
                  <p class="text-sm text-gray-700">
                    Developed initial MVPs using modern web technologies and responded to early user
                    feedback.
                  </p>
                </div>
              </div>
            </div>
          </ExplorerShell>
        </div>

        <div v-else-if="win.id === 'skills'" class="h-full">
          <ExplorerShell title="Programming Skills" path="C:\Windows\System32" class="h-full">
            <div class="p-6">
              <h2 class="text-lg font-bold mb-4 border-b flex items-center gap-2">
                <img src="https://img.icons8.com/color/48/settings.png" class="w-5 h-5" />
                System Capabilities
              </h2>
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="p-4 border rounded bg-gray-50 flex items-center gap-3">
                  <img src="https://img.icons8.com/color/48/vue-js.png" class="w-10 h-10" />
                  <div>
                    <div class="font-bold">Vue.js / Vite</div>
                    <div class="w-32 h-2 bg-gray-200 rounded overflow-hidden">
                      <div class="w-[95%] h-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
                <div class="p-4 border rounded bg-gray-50 flex items-center gap-3">
                  <img src="https://img.icons8.com/color/48/typescript.png" class="w-10 h-10" />
                  <div>
                    <div class="font-bold">TypeScript</div>
                    <div class="w-32 h-2 bg-gray-200 rounded overflow-hidden">
                      <div class="w-[90%] h-full bg-blue-500"></div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 class="text-lg font-bold mb-4 border-b flex items-center gap-2">
                <img src="https://img.icons8.com/color/48/certificate.png" class="w-5 h-5" />
                Certificates
              </h2>
              <div class="space-y-2">
                <div
                  class="flex items-center justify-between p-3 border-b hover:bg-gray-50 cursor-pointer"
                >
                  <span class="text-sm">AWS Certified Solutions Architect</span>
                  <span class="text-blue-600 text-xs">View PDF</span>
                </div>
                <div
                  class="flex items-center justify-between p-3 border-b hover:bg-gray-50 cursor-pointer"
                >
                  <span class="text-sm">Google Professional Cloud Developer</span>
                  <span class="text-blue-600 text-xs">View PDF</span>
                </div>
              </div>
            </div>
          </ExplorerShell>
        </div>
      </Window>
    </template>

    <!-- Taskbar -->
    <Taskbar @openStartMenu="toggleStartMenu">
      <template #apps>
        <div
          v-for="win in Object.values(windows).filter((w) => w.isOpen)"
          :key="win.id"
          class="h-8 px-3 rounded flex items-center bg-white/10 border border-white/20 hover:bg-white/20 cursor-pointer min-w-[120px] transition-all"
          :class="{
            'bg-white/30 border-white/40 shadow-inner': win.zIndex === topZIndex && !win.isMinimized,
            'opacity-60': win.isMinimized
          }"
          @click="toggleWindow(win.id)"
        >
          <span class="mr-2">{{ win.icon }}</span>
          <span class="text-white text-xs truncate">{{ win.title }}</span>
        </div>
      </template>
    </Taskbar>

    <!-- Start Menu -->
    <StartMenu
      :isOpen="isStartMenuOpen"
      @close="isStartMenuOpen = false"
      @openFolder="(id) => { openWindow(id); isStartMenuOpen = false; }"
    />
  </div>
</template>

<style>
/* Global resets for the desktop environment */
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.prose h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>
