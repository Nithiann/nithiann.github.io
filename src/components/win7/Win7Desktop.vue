<script setup lang="ts">
import { ref } from 'vue'
import { useWindowManagement } from '../../composables/useWindowManagement'

// Shared Components
import DesktopIcon from '../shared/DesktopIcon.vue'
import ExplorerShell from '../shared/ExplorerShell.vue'
import Win7Taskbar from './Win7Taskbar.vue'
import AppWindow from '../shared/AppWindow.vue'
import StartMenu from './StartMenu.vue'

// Shared App Components
import ProfileApp from '../shared/apps/ProfileApp.vue'
import ProjectsApp from '../shared/apps/ProjectsApp.vue'
import ExperienceApp from '../shared/apps/ExperienceApp.vue'
import SkillsApp from '../shared/apps/SkillsApp.vue'
import CalculatorApp from '../shared/apps/CalculatorApp.vue'
import NotesApp from '../shared/apps/NotesApp.vue'

const {
  windows,
  topZIndex,
  focusWindow,
  openWindow,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  updateWindowPosition,
  updateWindowSize,
} = useWindowManagement({
  profile: { isOpen: false, zIndex: 10, x: 100, y: 50, width: 800, height: 600 },
  projects: { isOpen: false, zIndex: 10, x: 150, y: 100, width: 700, height: 500 },
  experience: { isOpen: false, zIndex: 10, x: 200, y: 150, width: 600, height: 500 },
  skills: { isOpen: false, zIndex: 10, x: 250, y: 200, width: 600, height: 450 },
  calculator: { isOpen: false, zIndex: 10, x: 300, y: 100, width: 320, height: 480 },
  notes: { isOpen: false, zIndex: 10, x: 350, y: 150, width: 500, height: 400 },
})

const isStartMenuOpen = ref(false)
const toggleStartMenu = () => {
  isStartMenuOpen.value = !isStartMenuOpen.value
}
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
  skills: '💻',
  calculator: '🧮',
  notes: '📝',
}
</script>

<template>
  <div
    class="h-screen w-screen relative overflow-hidden bg-cover bg-center"
    :style="{ backgroundImage: wallpaperUrl }"
  >
    <!-- Desktop Icons -->
    <div class="p-4 grid grid-flow-col grid-rows-10 w-fit gap-2 font-bold">
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
      <DesktopIcon
        label="Calculator"
        icon="https://img.icons8.com/color/96/calculator.png"
        @open="openWindow('calculator')"
      />
      <DesktopIcon
        label="Notepad"
        icon="https://img.icons8.com/color/96/notepad.png"
        @open="openWindow('notes')"
      />
    </div>

    <!-- Windows -->
    <template v-for="(win, id) in windows" :key="id">
      <AppWindow
        v-if="win.isOpen && !win.isMinimized"
        :title="
          id === 'profile'
            ? 'My Profile'
            : id === 'projects'
              ? 'Projects'
              : id === 'experience'
                ? 'Work Experience'
              : id === 'skills'
                ? 'Programming Skills'
                : id === 'calculator'
                  ? 'Calculator'
                  : 'Notepad'
        "
        :isActive="win.zIndex === topZIndex"
        :isMaximized="win.isMaximized"
        :style="
          win.isMaximized
            ? {
                left: '0',
                top: '0',
                width: '100vw',
                height: 'calc(100vh - 40px)',
                zIndex: win.zIndex,
                position: 'absolute',
              }
            : {
                left: win.x + 'px',
                top: win.y + 'px',
                width: win.width + 'px',
                height: win.height + 'px',
                zIndex: win.zIndex,
                position: 'absolute',
              }
        "
        @close="closeWindow(id)"
        @minimize="minimizeWindow(id)"
        @maximize="maximizeWindow(id)"
        @focus="focusWindow(id)"
        @move="(e: any) => updateWindowPosition(id, e)"
        @resize="(e: any) => updateWindowSize(id, e)"
      >
        <template #icon
          ><span class="text-lg font-bold">{{ win7Icons[id as keyof typeof win7Icons] }}</span></template
        >

        <ExplorerShell
          v-if="id !== 'calculator' && id !== 'notes'"
          :title="id === 'profile' ? 'My Profile' : id === 'projects' ? 'Projects' : id === 'experience' ? 'Work Experience' : 'Programming Skills'"
          :path="id === 'profile' ? 'C:\\Users\\Bas\\Documents' : id === 'projects' ? 'C:\\Users\\Bas\\Projects' : id === 'experience' ? 'C:\\Users\\Bas\\Documents\\Career' : 'C:\\Windows\\System32'"
          class="h-full"
        >
          <ProfileApp v-if="id === 'profile'" os="win7" />
          <ProjectsApp v-else-if="id === 'projects'" os="win7" />
          <ExperienceApp v-else-if="id === 'experience'" os="win7" />
          <SkillsApp v-else-if="id === 'skills'" os="win7" />
        </ExplorerShell>
        <template v-else>
          <CalculatorApp v-if="id === 'calculator'" os="win7" />
          <NotesApp v-else-if="id === 'notes'" os="win7" />
        </template>
      </AppWindow>
    </template>

    <!-- Taskbar -->
    <Win7Taskbar @openStartMenu="toggleStartMenu">
      <template #apps>
        <div v-for="(win, id) in windows" :key="id">
          <div
            v-if="win.isOpen"
            class="h-8 px-3 rounded flex items-center bg-white/10 border border-white/20 hover:bg-white/20 cursor-pointer min-w-[120px] transition-all font-bold"
            :class="{ 'bg-white/30 border-white/40 shadow-inner': win.zIndex === topZIndex }"
            @click="toggleWindow(id)"
          >
            <span class="mr-2 font-bold">{{ win7Icons[id as keyof typeof win7Icons] }}</span>
            <span class="text-white text-xs truncate capitalize font-bold">{{ id }}</span>
          </div>
        </div>
      </template>
    </Win7Taskbar>

    <!-- Start Menu -->
    <StartMenu
      :isOpen="isStartMenuOpen"
      @close="isStartMenuOpen = false"
      @openFolder="
        (id) => {
          openWindow(id)
          isStartMenuOpen = false
        }
      "
    />
  </div>
</template>

<style scoped>
.shadow-inner {
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
}
</style>
