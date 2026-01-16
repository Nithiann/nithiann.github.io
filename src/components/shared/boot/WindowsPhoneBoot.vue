<script setup lang="ts">
import { onMounted } from 'vue'

const emit = defineEmits(['finished'])

onMounted(() => {
  setTimeout(() => {
    emit('finished')
  }, 3000)
})
</script>

<template>
  <div class="fixed inset-0 bg-black flex flex-col items-center justify-center text-white font-sans select-none">
    <div class="flex flex-col items-center animate-pulse">
      <!-- Windows Logo -->
      <div class="grid grid-cols-2 gap-1 w-32 h-32 mb-16">
        <div class="bg-[#00a1f1]"></div>
        <div class="bg-[#00a1f1]"></div>
        <div class="bg-[#00a1f1]"></div>
        <div class="bg-[#00a1f1]"></div>
      </div>

      <!-- Loading Dots (WP Style) -->
      <div class="flex gap-2">
        <div class="w-1.5 h-1.5 bg-white rounded-full animate-[bounce_1s_infinite_0ms]"></div>
        <div class="w-1.5 h-1.5 bg-white rounded-full animate-[bounce_1s_infinite_200ms]"></div>
        <div class="w-1.5 h-1.5 bg-white rounded-full animate-[bounce_1s_infinite_400ms]"></div>
        <div class="w-1.5 h-1.5 bg-white rounded-full animate-[bounce_1s_infinite_600ms]"></div>
        <div class="w-1.5 h-1.5 bg-white rounded-full animate-[bounce_1s_infinite_800ms]"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.5); opacity: 1; }
}
</style>
