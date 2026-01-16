<script setup lang="ts">
import { portfolioData } from '../../../data/portfolio'

defineProps<{
  os: 'win7' | 'macos' | 'linux' | 'ios' | 'android' | 'wp'
}>()
</script>

<template>
  <div :class="['app-content h-full p-6 overflow-y-auto', os]">
    <!-- Windows 7 / Windows Phone Style -->
    <div v-if="os === 'win7' || os === 'wp'" class="win-style">
      <div v-if="os === 'win7'" class="grid grid-cols-3 gap-6 text-black">
        <a v-for="p in portfolioData.projects" :key="p.title" :href="p.url" target="_blank"
           class="flex flex-col items-center p-4 rounded hover:bg-blue-50 border border-transparent hover:border-blue-200 cursor-pointer transition-all">
          <img :src="p.icon" class="w-16 h-16 mb-2" />
          <span class="text-sm font-semibold text-center">{{ p.title }}</span>
          <span class="text-xs text-center text-gray-500">{{ p.tech }}</span>
        </a>
      </div>
      <div v-else class="wp-style text-white space-y-8">
        <h2 class="text-xs font-bold uppercase tracking-[0.3em] mb-2 opacity-60">Portfolio</h2>
        <h1 class="text-6xl font-light mb-12">projects</h1>
        <div v-for="project in portfolioData.projects" :key="project.title" class="group">
          <h3 class="text-3xl font-light group-hover:text-[#00a1f1] transition-colors">{{ project.title }}</h3>
          <p class="text-white/60 mt-1">{{ project.description }}</p>
          <div class="mt-2 text-xs font-bold text-[#00a1f1]">{{ project.tech }}</div>
        </div>
      </div>
    </div>

    <!-- iOS Style -->
    <div v-else-if="os === 'ios'" class="ios-style text-black space-y-4">
      <div v-for="project in portfolioData.projects" :key="project.title"
           class="bg-gray-50 p-5 rounded-3xl border border-gray-100 shadow-sm flex gap-4 items-center">
        <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">📁</div>
        <div class="flex-1">
          <h3 class="font-bold text-lg">{{ project.title }}</h3>
          <p class="text-sm text-gray-500">{{ project.description }}</p>
        </div>
        <div class="text-gray-300">→</div>
      </div>
    </div>

    <!-- Android Style -->
    <div v-else-if="os === 'android'" class="android-style text-[#1d1b16] space-y-4 pb-20">
      <div v-for="project in portfolioData.projects" :key="project.title"
           class="bg-[#f3f3f3] p-5 rounded-[2rem] border border-[#e3e3e3] hover:bg-[#e3e3e3] transition-colors cursor-pointer group">
        <div class="flex items-center gap-4">
           <div class="w-12 h-12 bg-[#d3e3fd] rounded-2xl flex items-center justify-center text-2xl group-active:scale-90 transition-transform">📁</div>
           <div class="flex-1">
              <h3 class="font-bold text-[#1d1b16]">{{ project.title }}</h3>
              <p class="text-sm text-[#444746]">{{ project.description }}</p>
           </div>
        </div>
        <div class="mt-4 flex flex-wrap gap-2 text-[10px] font-bold text-[#0b57d0] uppercase tracking-widest">{{ project.tech }}</div>
      </div>
    </div>

    <!-- Fallback -->
    <div v-else class="text-black space-y-4">
      <div v-for="p in portfolioData.projects" :key="p.title" class="border p-4 rounded shadow-sm">
        <h3 class="font-bold text-lg">{{ p.title }}</h3>
        <p>{{ p.description }}</p>
        <p class="text-sm text-gray-500 mt-2">{{ p.tech }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-content::-webkit-scrollbar { display: none; }
.app-content { scrollbar-width: none; }
</style>
