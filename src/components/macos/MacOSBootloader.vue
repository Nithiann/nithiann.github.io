<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits(['finished'])
const progress = ref(0)
const showBar = ref(false)

onMounted(() => {
  setTimeout(() => (showBar.value = true), 800)
  const interval = setInterval(() => {
    if (showBar.value) {
      progress.value += 1.2
      if (progress.value >= 100) {
        clearInterval(interval)
        setTimeout(() => emit('finished'), 600)
      }
    }
  }, 50)
})
</script>

<template>
  <div class="fixed inset-0 bg-[#ebebeb] flex items-center justify-center z-[15000]">
    <div class="flex flex-col items-center w-full max-w-[200px]">
      <!-- Apple Logo -->
      <div class="w-20 h-24 mb-16 opacity-80 transition-opacity duration-1000">
        <svg viewBox="0 0 100 100" fill="#555555" class="w-full h-full">
          <path d="M82.2,46.1c-0.1-8.2,6.7-12.1,7-12.3c-3.8-5.6-9.7-6.3-11.8-6.4c-5-0.5-9.8,3-12.3,3c-2.5,0-6.4-2.9-10.5-2.8 c-5.4,0.1-10.4,3.2-13.2,8.1c-5.7,9.9-1.5,24.6,4,32.6c2.7,3.9,5.9,8.3,10.2,8.2c4.1-0.2,5.7-2.6,10.6-2.6c5,0,6.4,2.6,10.7,2.5 c4.4-0.1,7.1-4,9.8-7.9c3.1-4.5,4.4-8.9,4.4-9.1C91.1,59.3,82.3,55.9,82.2,46.1z M71.3,21.8c2.3-2.7,3.8-6.5,3.4-10.3 c-3.2,0.1-7.2,2.2-9.4,4.9c-2,2.3-3.8,6.2-3.3,10C65.4,26.6,69.1,24.5,71.3,21.8z" />
        </svg>
      </div>

      <!-- Progress Bar -->
      <div class="w-full h-1 bg-gray-300/50 rounded-full overflow-hidden border border-gray-400/10 backdrop-blur-sm transition-opacity duration-500" :class="{ 'opacity-100': showBar, 'opacity-0': !showBar }">
        <div class="h-full bg-gray-600 transition-all duration-100 ease-linear rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>
