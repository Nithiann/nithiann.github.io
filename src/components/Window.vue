<script setup lang="ts">
defineProps<{
  title: string;
  isActive?: boolean;
}>();

defineEmits(['close', 'minimize', 'maximize', 'focus']);
</script>

<template>
  <div
    class="fixed window-active"
    :class="{ 'window-active': isActive }"
    @mousedown="$emit('focus')"
  >
    <div class="aero-glass flex flex-col h-full overflow-hidden rounded-t-lg border border-white/30 shadow-2xl">
      <!-- Title Bar -->
      <div class="flex items-center justify-between px-3 py-2 cursor-grab active:cursor-grabbing select-none">
        <div class="flex items-center gap-2">
          <slot name="icon"></slot>
          <span class="text-white text-sm font-semibold drop-shadow-md">{{ title }}</span>
        </div>

        <div class="flex items-center gap-1">
          <button @click="$emit('minimize')" class="w-6 h-5 flex items-center justify-center rounded-sm hover:bg-white/20 transition-colors">
            <div class="w-2.5 h-0.5 bg-white shadow-sm"></div>
          </button>
          <button @click="$emit('maximize')" class="w-6 h-5 flex items-center justify-center rounded-sm hover:bg-white/20 transition-colors">
            <div class="w-2.5 h-2 border border-white shadow-sm"></div>
          </button>
          <button @click="$emit('close')" class="w-10 h-5 flex items-center justify-center rounded-sm bg-red-500/80 hover:bg-red-500 shadow-inner group">
            <span class="text-white text-xs font-bold transition-transform group-hover:scale-110">✕</span>
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 bg-white overflow-auto p-4 text-gray-800">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.window-active {
  z-index: 1000;
}
</style>
