<script setup lang="ts">
import { ref, reactive } from 'vue';
import DesktopIcon from './components/DesktopIcon.vue';
import Window from './components/Window.vue';
import Taskbar from './components/Taskbar.vue';

// Window state management
interface AppWindow {
  id: string;
  title: string;
  isOpen: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  icon: string;
}

const windows = reactive<Record<string, AppWindow>>({
  profile: {
    id: 'profile',
    title: 'My Profile',
    isOpen: false,
    zIndex: 10,
    x: 100,
    y: 50,
    width: 600,
    height: 400,
    icon: '👤'
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    isOpen: false,
    zIndex: 10,
    x: 150,
    y: 100,
    width: 700,
    height: 500,
    icon: '📁'
  },
  experience: {
    id: 'experience',
    title: 'Work Experience',
    isOpen: false,
    zIndex: 10,
    x: 200,
    y: 150,
    width: 500,
    height: 600,
    icon: '💼'
  },
  skills: {
    id: 'skills',
    title: 'Programming Skills',
    isOpen: false,
    zIndex: 10,
    x: 250,
    y: 200,
    width: 600,
    height: 450,
    icon: '💻'
  }
});

const topZIndex = ref(100);

const openWindow = (id: string) => {
  windows[id].isOpen = true;
  focusWindow(id);
};

const closeWindow = (id: string) => {
  windows[id].isOpen = false;
};

const focusWindow = (id: string) => {
  topZIndex.value += 1;
  windows[id].zIndex = topZIndex.value;
};

// Start Menu state
const isStartMenuOpen = ref(false);
const toggleStartMenu = () => {
  isStartMenuOpen.value = !isStartMenuOpen.value;
};

const moveWindow = (id: string, delta: { dx: number, dy: number }) => {
  windows[id].x += delta.dx;
  windows[id].y += delta.dy;
};

const wallpaperUrl = "url('/home/voss/.gemini/antigravity/brain/187ec2d8-b507-461a-a8d0-d70c85153c22/windows_7_wallpaper_1767697790346.png')";
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
        @open="openWindow('skills')"
      />
      <DesktopIcon
        label="Programming Skills"
        icon="https://img.icons8.com/color/96/code.png"
        @open="openWindow('experience')"
      />
    </div>

    <!-- Windows -->
    <template v-for="win in windows" :key="win.id">
      <Window
        v-if="win.isOpen"
        :title="win.title"
        :isActive="win.zIndex === topZIndex"
        :style="{
          left: win.x + 'px',
          top: win.y + 'px',
          width: win.width + 'px',
          height: win.height + 'px',
          zIndex: win.zIndex
        }"
        @close="closeWindow(win.id)"
        @focus="focusWindow(win.id)"
        @move="(delta: { dx: number, dy: number }) => moveWindow(win.id, delta)"
      >
        <template #icon>
            <span class="text-lg">{{ win.icon }}</span>
        </template>

        <!-- Window Content based on ID -->
        <div v-if="win.id === 'profile'" class="prose max-w-none">
          <h1>About Me</h1>
          <p>Hi, I'm Bas. I build clean, performant web experiences.</p>
          <p>I'm a developer focused on modern frontend stacks and thoughtful UX.</p>
        </div>

        <div v-else-if="win.id === 'projects'" class="grid grid-cols-2 gap-4">
          <div class="border p-3 rounded hover:bg-gray-100 cursor-pointer">
            <h3 class="font-bold">Project One</h3>
            <p class="text-sm">A cool project I built with Vue and Vite.</p>
          </div>
          <div class="border p-3 rounded hover:bg-gray-100 cursor-pointer">
             <h3 class="font-bold">Project Two</h3>
             <p class="text-sm">Another awesome project showcasing my skills.</p>
          </div>
        </div>

        <div v-else-if="win.id === 'experience'" class="space-y-4">
            <div class="border-l-4 border-blue-500 pl-4">
                <h3 class="font-bold">Senior Developer @ Tech Corp</h3>
                <p class="text-sm text-gray-600">2022 - Present</p>
                <p>Leading frontend development initiatives.</p>
            </div>
             <div class="border-l-4 border-gray-300 pl-4">
                <h3 class="font-bold">Web Developer @ Design Studio</h3>
                <p class="text-sm text-gray-600">2020 - 2022</p>
                <p>Creating interactive user interfaces.</p>
            </div>
        </div>

        <div v-else-if="win.id === 'skills'" class="flex flex-wrap gap-2">
            <span class="win7-button">JavaScript</span>
            <span class="win7-button">TypeScript</span>
            <span class="win7-button">Vue.js</span>
            <span class="win7-button">React</span>
            <span class="win7-button">Node.js</span>
            <span class="win7-button">Tailwind CSS</span>
            <span class="win7-button">Vite</span>
        </div>
      </Window>
    </template>

    <!-- Taskbar -->
    <Taskbar @openStartMenu="toggleStartMenu">
        <template #apps>
            <div
                v-for="win in Object.values(windows).filter(w => w.isOpen)"
                :key="win.id"
                class="h-8 px-3 rounded flex items-center bg-white/10 border border-white/20 hover:bg-white/20 cursor-pointer min-w-[120px]"
                :class="{ 'bg-white/30 border-white/40': win.zIndex === topZIndex }"
                @click="focusWindow(win.id)"
            >
                <span class="mr-2">{{ win.icon }}</span>
                <span class="text-white text-xs truncate">{{ win.title }}</span>
            </div>
        </template>
    </Taskbar>

    <!-- Start Menu (Aero Overlay) -->
    <div v-if="isStartMenuOpen" class="fixed bottom-10 left-0 w-80 h-96 aero-glass rounded-tr-lg border-t border-r border-white/30 z-[10000] p-4">
        <div class="flex items-center gap-3 mb-4 p-2 border-b border-white/10">
            <div class="w-10 h-10 rounded bg-blue-500 flex items-center justify-center text-white text-xl">👤</div>
            <span class="text-white font-bold">Bas</span>
        </div>
        <div class="space-y-1">
            <div class="text-white text-sm p-2 hover:bg-white/10 rounded cursor-pointer">Internet Explorer</div>
            <div class="text-white text-sm p-2 hover:bg-white/10 rounded cursor-pointer">Notepad</div>
            <div class="text-white text-sm p-2 hover:bg-white/10 rounded cursor-pointer">Calculator</div>
            <div class="text-white text-sm p-2 hover:bg-white/10 rounded cursor-pointer">Paint</div>
        </div>
        <div class="absolute bottom-4 right-4 flex gap-2">
             <button class="win7-button" @click="isStartMenuOpen = false">Shut down</button>
        </div>
    </div>

  </div>
</template>

<style>
/* Global resets for the desktop environment */
html, body, #app {
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
