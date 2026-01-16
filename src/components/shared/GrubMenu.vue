<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['select'])

const options = [
  {
    id: 'win7',
    name: 'Windows 7',
    detail: '(loader on /dev/sda1)',
    icon: 'https://img.icons8.com/color/48/windows-10.png',
  },
  {
    id: 'macos',
    name: 'MacOS (Mojave)',
    detail: '(loader on /dev/sda2)',
    icon: 'https://img.icons8.com/color/48/mac-os.png',
  },
  {
    id: 'linux',
    name: 'Linux (GNOME)',
    detail: '(loader on /dev/sda3)',
    icon: 'https://img.icons8.com/color/48/linux.png',
  },
]

const selectedIndex = ref(0)
const countdown = ref(10)
let timer: number

const selectOS = (index: number) => {
  const option = options[index]
  if (option) {
    clearInterval(timer)
    emit('select', option.id)
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowUp') {
    selectedIndex.value = (selectedIndex.value - 1 + options.length) % options.length
    clearInterval(timer) // Stop countdown on interaction
  } else if (e.key === 'ArrowDown') {
    selectedIndex.value = (selectedIndex.value + 1) % options.length
    clearInterval(timer)
  } else if (e.key === 'Enter') {
    selectOS(selectedIndex.value)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  timer = window.setInterval(() => {
    countdown.value -= 1
    if (countdown.value <= 0) {
      selectOS(selectedIndex.value)
    }
  }, 1000)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  clearInterval(timer)
})
</script>

<template>
  <div
    class="fixed inset-0 bg-[#0000aa] text-white font-mono flex flex-col p-4 md:p-8 z-[20000] select-none"
  >
    <div
      class="max-w-4xl mx-auto w-full border-2 border-white p-4 md:p-4 flex-1 flex flex-col bg-black overflow-y-auto"
    >
      <h1
        class="text-center mb-6 md:mb-8 border-b border-white pb-4 md:pb-4 text-xs md:text-base opacity-80 uppercase tracking-widest"
      >
        GNU GRUB version 1.99-21BasVoss3.1
      </h1>

      <p
        class="mb-4 text-[11px] md:text-sm leading-relaxed text-center md:text-left opacity-90 hidden md:block"
      >
        Use the ↑ and ↓ keys to select which entry is highlighted.<br />
        Press enter to boot the selected OS, 'e' to edit the commands before booting or 'c' for a
        command-line.
      </p>

      <div class="flex-1 flex flex-col justify-center md:justify-start space-y-4 md:space-y-1">
        <div
          v-for="(opt, index) in options"
          :key="opt.id"
          class="group flex items-center px-4 py-6 md:py-1.5 cursor-pointer text-sm md:text-base border-2 md:border-0 border-transparent transition-all active:scale-[0.98] md:active:scale-100"
          :class="[
            selectedIndex === index
              ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] md:shadow-none font-bold'
              : 'hover:border-white/20',
          ]"
          @mouseenter="selectedIndex = index"
          @click="selectOS(index)"
        >
          <img :src="opt.icon" class="md:hidden mr-4 w-8 h-8 md:w-5 md:h-5 object-contain" />
          <div class="flex flex-col md:flex-row md:items-center">
            <span class="font-bold md:font-normal tracking-tight md:mr-2">{{ opt.name }}</span>
            <span class="text-[10px] md:text-sm opacity-60 md:opacity-100 font-normal">{{
              opt.detail
            }}</span>
          </div>
          <span v-if="selectedIndex === index" class="ml-auto text-xl md:hidden">⏎</span>
        </div>
      </div>

      <div
        class="mt-8 md:mt-8 text-[11px] md:text-sm text-center md:text-left border-t border-white/20 pt-4 md:border-0 md:pt-0"
      >
        <p class="opacity-80">
          The highlighted entry will be executed automatically in
          <span class="font-bold text-lg md:text-sm">{{ countdown }}s</span>.
        </p>
      </div>
    </div>

    <div
      class="max-w-4xl mx-auto w-full mt-4 md:mt-4 text-[11px] text-white/40 flex justify-between items-center"
    >
      <span>GRUB _</span>
      <span class="md:hidden text-[9px] uppercase tracking-tighter opacity-50">v2.06.release</span>
    </div>
  </div>
</template>

<style scoped>
.font-mono {
  font-family: 'Courier New', Courier, monospace;
}

/* Custom shadow for mobile active state to make it feel more tactile */
@media (max-width: 768px) {
  .bg-white {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }
}
</style>
