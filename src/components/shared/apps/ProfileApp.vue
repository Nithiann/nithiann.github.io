<script setup lang="ts">
import { portfolioData } from '../../../data/portfolio'

defineProps<{
  os: 'win7' | 'macos' | 'linux' | 'ios' | 'android' | 'wp'
}>()
</script>

<template>
  <div :class="['app-content h-full p-6 overflow-y-auto', os]">
    <!-- Windows 7 / Windows Phone Style -->
    <div v-if="os === 'win7' || os === 'wp'" class="win-style font-serif">
      <h1 class="text-3xl font-bold border-b-2 border-gray-800 pb-2 mb-6 uppercase tracking-tighter text-gray-900"
          :class="{ 'text-6xl font-light border-none text-white !mb-12 lowercase': os === 'wp' }">
        {{ os === 'wp' ? 'profile' : 'Curriculum Vitae' }}
      </h1>

      <section class="mb-6">
        <h2 class="text-xl font-bold uppercase tracking-widest text-blue-800 border-b mb-3"
            :class="{ 'text-[#00a1f1] text-sm !border-none !mb-2': os === 'wp' }">
          {{ os === 'wp' ? 'Who I am' : 'Personal Information' }}
        </h2>
        <div class="grid gap-4 text-sm" :class="{ 'grid-cols-2': os === 'win7', 'text-white': os === 'wp' }">
          <div><strong v-if="os === 'win7'">Name:</strong> <span :class="{ 'text-2xl font-light leading-snug block': os === 'wp', 'font-bold': os === 'win7' }">{{ portfolioData.personal.name }}</span></div>
          <div><strong v-if="os === 'win7'">Location:</strong> <span :class="{ 'text-xl font-light block': os === 'wp' }">{{ portfolioData.personal.location }}</span></div>
          <div><strong v-if="os === 'win7'">Role:</strong> <span :class="{ 'text-xl text-white/60 block': os === 'wp' }">{{ portfolioData.personal.role }}</span></div>
          <div v-if="os === 'win7'"><strong>Contact:</strong> {{ portfolioData.personal.contact }}</div>
        </div>
      </section>

      <section class="mb-6">
        <h2 class="text-xl font-bold uppercase tracking-widest text-blue-800 border-b mb-3"
            :class="{ 'text-[#00a1f1] text-sm !border-none !mb-2': os === 'wp' }">
          Summary
        </h2>
        <p class="text-sm leading-relaxed text-gray-800" :class="{ 'text-lg font-light text-white': os === 'wp' }">{{ portfolioData.personal.summary }}</p>
      </section>

      <section v-if="os === 'win7' || os === 'wp'">
        <h2 class="text-xl font-bold uppercase tracking-widest text-blue-800 border-b mb-3"
            :class="{ 'text-[#00a1f1] text-sm !border-none !mb-2': os === 'wp' }">
          Education
        </h2>
        <div v-for="edu in portfolioData.personal.education" :key="edu.degree" class="mb-2" :class="{ 'text-sm': os === 'win7', 'text-white': os === 'wp' }">
          <p class="font-bold" :class="{ 'text-xl font-light': os === 'wp' }">{{ edu.degree }}</p>
          <p class="text-gray-600 italic" :class="{ 'text-white/60 not-italic text-sm': os === 'wp' }">{{ edu.period }}</p>
        </div>
      </section>
    </div>

    <!-- iOS style -->
    <div v-else-if="os === 'ios'" class="ios-style text-black">
      <div class="space-y-6">
        <div class="bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h2 class="text-sm font-bold text-blue-500 uppercase tracking-tight mb-2">About</h2>
          <p class="text-lg font-medium leading-relaxed">{{ portfolioData.personal.summary }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 p-4 rounded-3xl border border-gray-100">
            <h2 class="text-xs font-bold text-blue-500 uppercase mb-1">Name</h2>
            <p class="font-bold">{{ portfolioData.personal.name }}</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-3xl border border-gray-100">
            <h2 class="text-xs font-bold text-blue-500 uppercase mb-1">Role</h2>
            <p class="font-bold">{{ portfolioData.personal.role }}</p>
          </div>
        </div>
        <div class="bg-gray-50 p-4 rounded-3xl border border-gray-100">
          <h2 class="text-xs font-bold text-blue-500 uppercase mb-1">Location</h2>
          <p class="font-bold">{{ portfolioData.personal.location }}</p>
        </div>
      </div>
    </div>

    <!-- Android style -->
    <div v-else-if="os === 'android'" class="android-style text-[#1d1b16]">
      <div class="space-y-6 pb-20">
        <div class="bg-[#f3f3f3] p-6 rounded-[2rem] border border-[#e3e3e3]">
          <p class="text-lg leading-relaxed text-[#444746]">{{ portfolioData.personal.summary }}</p>
        </div>
        <div class="space-y-3">
           <div class="bg-[#d3e3fd] p-5 rounded-[1.5rem] flex items-center gap-4">
              <div class="text-2xl opacity-80">👤</div>
              <div>
                 <p class="text-xs font-bold text-[#0b57d0] uppercase">Full Name</p>
                 <p class="text-xl font-medium text-[#1d1b16]">{{ portfolioData.personal.name }}</p>
              </div>
           </div>
           <div class="bg-[#fef7da] p-5 rounded-[1.5rem] flex items-center gap-4">
              <div class="text-2xl opacity-80">📍</div>
              <div>
                 <p class="text-xs font-bold text-[#7a7500] uppercase">Location</p>
                 <p class="text-xl font-medium text-[#1d1b16]">{{ portfolioData.personal.location }}</p>
              </div>
           </div>
        </div>
      </div>
    </div>

    <!-- MacOS / Linux Desktop versions (fallback/simple) -->
    <div v-else class="desktop-fallback text-black p-4">
      <h1 class="text-3xl font-bold mb-4">{{ portfolioData.personal.name }}</h1>
      <p class="text-xl mb-2">{{ portfolioData.personal.role }}</p>
      <p class="mb-4">{{ portfolioData.personal.location }}</p>
      <div class="prose max-w-none">
        <p>{{ portfolioData.personal.summary }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wp { background: black; }
.android { font-family: 'Google Sans', 'Outfit', sans-serif; }
.wp { font-family: 'Segoe UI', sans-serif; }
.ios { font-family: -apple-system, system-ui, sans-serif; }

.app-content::-webkit-scrollbar {
  display: none;
}
.app-content {
  scrollbar-width: none;
}
</style>
