<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('');

const updateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

let timer: number;
onMounted(() => {
    updateTime();
    timer = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
    clearInterval(timer);
});

defineEmits(['openStartMenu']);
</script>

<template>
  <div class="taskbar">
    <button class="start-button" @click="$emit('openStartMenu')"></button>

    <div class="flex-1 flex items-center gap-1 px-2">
      <!-- Pinned / Open Apps -->
      <slot name="apps"></slot>
    </div>

    <div class="flex items-center gap-3 px-4 h-full border-l border-white/10 text-white text-xs">
      <div class="flex flex-col items-center">
        <span>{{ currentTime }}</span>
        <span>{{ new Date().toLocaleDateString() }}</span>
      </div>
      <div class="w-3 h-full bg-white/5 border-l border-white/10 hover:bg-white/20 transition-colors cursor-pointer" title="Show Desktop"></div>
    </div>
  </div>
</template>
