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
      <div v-if="os === 'win7'" class="space-y-8 text-black">
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
      <div v-else class="wp-style text-white space-y-12">
        <h2 class="text-xs font-bold uppercase tracking-[0.3em] mb-2 opacity-60">Portfolio</h2>
        <h1 class="text-6xl font-light mb-12">experience</h1>
        <div v-for="exp in portfolioData.experience" :key="exp.company + exp.role">
          <h3 class="text-xl font-bold uppercase text-[#00a1f1] mb-1">{{ exp.company }}</h3>
          <p class="text-3xl font-light">{{ exp.role }}</p>
          <p class="text-sm text-white/40 mt-1">{{ exp.period }} • {{ exp.location }}</p>
          <ul class="mt-4 space-y-2">
            <li v-for="desc in exp.description" :key="desc" class="text-lg font-light leading-snug">• {{ desc }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- iOS Style -->
    <div v-else-if="os === 'ios'" class="ios-style text-black space-y-6">
      <div v-for="exp in portfolioData.experience" :key="exp.company" class="relative pl-6 border-l-2 border-blue-100">
        <div class="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-sm"></div>
        <div class="bg-gray-50 p-5 rounded-3xl border border-gray-100">
          <h3 class="font-bold text-lg text-black">{{ exp.role }}</h3>
          <span class="text-sm font-bold text-blue-500 uppercase">{{ exp.company }}</span>
          <p class="text-xs text-gray-400 mt-1">{{ exp.period }}</p>
          <ul class="mt-4 space-y-2">
            <li v-for="desc in exp.description" :key="desc" class="text-sm text-gray-600 leading-snug">• {{ desc }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Android Style -->
    <div v-else-if="os === 'android'" class="android-style text-[#1d1b16] space-y-4 pb-20">
      <div v-for="exp in portfolioData.experience" :key="exp.company" class="bg-[#f3f3f3] p-6 rounded-[2rem] border border-[#e3e3e3]">
        <span class="text-xs font-bold text-[#0b57d0] uppercase tracking-tighter">{{ exp.period }}</span>
        <h3 class="text-xl font-bold text-[#1d1b16] mt-1">{{ exp.role }}</h3>
        <p class="text-[#444746] font-medium">{{ exp.company }}</p>
        <div class="mt-4 space-y-2 opacity-80">
           <p v-for="desc in exp.description" :key="desc" class="text-sm leading-snug">• {{ desc }}</p>
        </div>
      </div>
    </div>

    <!-- Fallback -->
    <div v-else class="text-black space-y-4">
      <div v-for="exp in portfolioData.experience" :key="exp.period" class="border p-4 rounded">
        <h3 class="font-bold">{{ exp.role }} at {{ exp.company }}</h3>
        <p class="text-sm text-gray-600">{{ exp.period }}</p>
        <ul class="mt-2 list-disc ml-4">
          <li v-for="d in exp.description" :key="d" class="text-sm">{{ d }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-content::-webkit-scrollbar { display: none; }
.app-content { scrollbar-width: none; }
</style>
