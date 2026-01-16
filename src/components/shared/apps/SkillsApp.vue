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
      <div v-if="os === 'win7'" class="space-y-8 text-black pb-10">
        <section v-for="(category, name) in portfolioData.skills" :key="name">
          <h3 class="text-sm font-bold border-b mb-4 uppercase text-gray-500">{{ name }}</h3>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="s in category" :key="s.name" class="p-3 border rounded bg-gray-50 flex items-center gap-3">
              <img :src="`https://img.icons8.com/color/48/${s.icon}.png`" class="w-8 h-8" />
              <div class="flex-1">
                <div class="font-bold text-xs">{{ s.name }}</div>
                <div class="w-full h-1.5 bg-gray-200 rounded mt-1 overflow-hidden border border-gray-300">
                  <div class="h-full" :class="name === 'expertise' ? 'bg-blue-500' : 'bg-green-500'" :style="{ width: s.level }"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div v-else class="wp-style text-white space-y-10 pb-20">
        <h2 class="text-xs font-bold uppercase tracking-[0.3em] mb-2 opacity-60">Portfolio</h2>
        <h1 class="text-6xl font-light mb-12">skills</h1>

        <section v-for="(category, name) in portfolioData.skills" :key="name">
          <h3 class="text-[#00a1f1] text-sm font-bold uppercase mb-4">{{ name }}</h3>
          <div v-if="name === 'expertise'" class="grid grid-cols-2 gap-4">
            <div v-for="skill in category" :key="skill.name">
              <p class="text-2xl font-light">{{ skill.name }}</p>
              <div class="w-full h-1 bg-white/20 mt-2">
                <div class="h-full bg-[#00a1f1]" :style="{ width: skill.level }"></div>
              </div>
            </div>
          </div>
          <div v-else class="flex flex-wrap gap-x-6 gap-y-2">
            <span v-for="skill in category" :key="skill.name" class="text-2xl font-light">{{ skill.name }}</span>
          </div>
        </section>
      </div>
    </div>

    <!-- iOS Style -->
    <div v-else-if="os === 'ios'" class="ios-style text-black space-y-6">
      <section v-for="(category, name) in portfolioData.skills" :key="name" :class="{ 'pb-10': name === 'learning' }">
        <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-3">{{ name === 'expertise' ? 'Top Expertise' : name }}</h2>
        <div v-if="name === 'expertise'" class="space-y-3">
          <div v-for="skill in category" :key="skill.name" class="bg-gray-50 p-4 rounded-3xl border border-gray-100">
             <div class="flex justify-between items-center mb-2">
                <span class="font-bold">{{ skill.name }}</span>
                <span class="text-xs font-bold text-blue-500">{{ skill.level }}</span>
             </div>
             <div class="w-full h-2 bg-gray-200 rounded-full">
                <div class="h-full bg-blue-500 rounded-full" :style="{ width: skill.level }"></div>
             </div>
          </div>
        </div>
        <div v-else class="flex flex-wrap gap-2">
          <span v-for="skill in category" :key="skill.name" class="px-4 py-2 bg-gray-50 rounded-2xl text-sm font-bold" :class="{ 'text-blue-500': name === 'learning' }">{{ skill.name }}</span>
        </div>
      </section>
    </div>

    <!-- Android Style -->
    <div v-else-if="os === 'android'" class="android-style text-[#1d1b16] space-y-6 pb-20">
      <div v-for="(category, name) in portfolioData.skills" :key="name"
           :class="['p-6 rounded-[2rem]', name === 'expertise' ? 'bg-[#d3e3fd]' : name === 'working' ? 'bg-[#fef7da]' : 'bg-[#e7e0eb]']">
        <h2 class="text-sm font-bold uppercase mb-4" :class="name === 'expertise' ? 'text-[#0b57d0]' : name === 'working' ? 'text-[#7a7500]' : 'text-[#49454f]'">{{ name }}</h2>
        <div v-if="name === 'expertise'" class="space-y-4">
           <div v-for="skill in category" :key="skill.name">
              <div class="flex justify-between text-xs font-bold mb-1 opacity-70">
                 <span>{{ skill.name }}</span>
                 <span>{{ skill.level }}</span>
              </div>
              <div class="h-2 bg-white/50 rounded-full overflow-hidden">
                 <div class="h-full bg-[#0b57d0] rounded-full" :style="{ width: skill.level }"></div>
              </div>
           </div>
        </div>
        <div v-else class="flex flex-wrap gap-3">
           <span v-for="skill in category" :key="skill.name"
                 class="px-4 py-2 bg-white/50 rounded-full text-sm font-bold text-[#1d1b16]">{{ skill.name }}</span>
        </div>
      </div>
      <div class="h-10 w-full"></div>
    </div>
  </div>
</template>

<style scoped>
.app-content::-webkit-scrollbar { display: none; }
.app-content { scrollbar-width: none; }
</style>
