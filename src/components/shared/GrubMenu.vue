<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['select'])

const options = [
  { id: 'win7', name: 'Windows 7', detail: '(loader on /dev/sda1)' },
  { id: 'macos', name: 'MacOS (Mojave)', detail: '(loader on /dev/sda2)' },
  { id: 'linux', name: 'Linux (GNOME)', detail: '(loader on /dev/sda3)' },
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
      class="max-w-4xl mx-auto w-full border-2 border-white p-2 md:p-4 flex-1 flex flex-col bg-black overflow-y-auto"
    >
      <h1 class="text-center mb-4 md:mb-8 border-b border-white pb-2 md:pb-4 text-sm md:text-base">
        GNU GRUB version 1.99-21BasVoss3.1
      </h1>

      <p class="mb-4 text-[10px] md:text-sm">
        Use the ↑ and ↓ keys to select which entry is highlighted.<br />
        Press enter to boot the selected OS, 'e' to edit the commands before booting or 'c' for a
        command-line.
      </p>

      <div class="border-2 border-white flex-1 p-1 md:p-2 space-y-1">
        <div
          v-for="(opt, index) in options"
          :key="opt.id"
          class="px-2 py-2 md:py-1 cursor-pointer text-xs md:text-base active:bg-white active:text-black transition-colors"
          :class="{ 'bg-white text-black': selectedIndex === index }"
          @mouseenter="selectedIndex = index"
          @click="selectOS(index)"
        >
          {{ opt.name }} {{ opt.detail }}
        </div>
      </div>

      <div class="mt-4 md:mt-8 text-[10px] md:text-sm">
        <p>The highlighted entry will be executed automatically in {{ countdown }}s.</p>
      </div>
    </div>

    <div class="max-w-4xl mx-auto w-full mt-2 md:mt-4 text-[10px] text-gray-400">GRUB _</div>
  </div>
</template>

<style scoped>
.font-mono {
  font-family: 'Courier New', Courier, monospace;
}
</style>
