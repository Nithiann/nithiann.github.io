<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['finished'])

const bootLogs = [
  "[  OK  ] Started GNOME Display Manager.",
  "[  OK  ] Started Network Manager.",
  "[  OK  ] Started LSB: VirtualBox Linux Additions.",
  "[  OK  ] Started Login Service.",
  "Starting Realtime Kit Scheduling Service...",
  "[  OK  ] Started Realtime Kit Scheduling Service.",
  "Starting Accounts Service...",
  "[  OK  ] Started Accounts Service.",
  "Starting Modem Manager...",
  "[  OK  ] Started Modem Manager.",
  "Starting User Manager for UID 1000...",
  "[  OK  ] Started User Manager for UID 1000.",
  "Starting Session c1 of user bas.",
  "[  OK  ] Started Session c1 of user bas.",
  "Starting Hostname Service...",
  "[  OK  ] Started Hostname Service.",
  "Starting Disk Manager...",
  "[  OK  ] Started Disk Manager.",
  "Starting Desktop Manager...",
]

const visibleLogs = ref<string[]>([])
let logIndex = 0

onMounted(() => {
  const interval = setInterval(() => {
    if (logIndex < bootLogs.length) {
      visibleLogs.value.push(bootLogs[logIndex])
      logIndex++
      // Keep scroll at bottom
      window.scrollTo(0, document.body.scrollHeight)
    } else {
      clearInterval(interval)
      setTimeout(() => emit('finished'), 1000)
    }
  }, 100 + Math.random() * 200)
})
</script>

<template>
  <div class="fixed inset-0 bg-black text-[#ccc] font-mono text-sm p-4 overflow-hidden z-[15000] select-none">
    <div class="max-w-4xl">
      <div v-for="(log, i) in visibleLogs" :key="i" class="mb-0.5 animate-in">
        <span v-if="log.startsWith('[  OK  ]')" class="text-green-500 font-bold mr-2">{{ log.substring(0, 8) }}</span>
        <span v-else class="text-white mr-2"> [  ..  ] </span>
        <span :class="{ 'text-white': !log.startsWith('[  OK  ]') }">{{ log.startsWith('[  OK  ]') ? log.substring(9) : log }}</span>
      </div>
      <div v-if="visibleLogs.length > 0" class="mt-2 text-white/50 animate-pulse">_</div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-in {
  animation: fade-in 0.1s ease-out forwards;
}

.font-mono {
  font-family: 'DejaVu Sans Mono', 'Ubuntu Mono', monospace;
}
</style>
