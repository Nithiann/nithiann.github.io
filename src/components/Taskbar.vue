<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import StartOrb from './StartOrb.vue'

const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

let timer: number
onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

defineEmits(['openStartMenu'])
</script>

<template>
  <div class="taskbar">
    <button
      class="start-button flex items-center justify-center p-0"
      @click="$emit('openStartMenu')"
    >
      <div class="w-[48px] h-[48px] transition-transform hover:scale-110 active:scale-95">
        <StartOrb />
      </div>
    </button>

    <div class="flex-1 flex items-center gap-1 px-2">
      <!-- Pinned / Open Apps -->
      <slot name="apps"></slot>
    </div>

    <div class="flex items-center gap-3 px-4 h-full border-l border-white/10 text-white text-xs">
      <div class="flex flex-col items-center">
        <span>{{ currentTime }}</span>
        <span>{{ new Date().toLocaleDateString() }}</span>
      </div>
      <div
        class="w-3 h-full bg-white/5 border-l border-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        title="Show Desktop"
      ></div>
    </div>
  </div>
</template>
