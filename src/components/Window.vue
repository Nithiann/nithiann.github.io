<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const props = defineProps<{
  title: string;
  isActive?: boolean;
  isMaximized?: boolean;
}>();

const emit = defineEmits(['close', 'minimize', 'maximize', 'focus', 'move']);

const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);

const onMouseDown = (e: MouseEvent) => {
    emit('focus');

    // Don't drag if maximized
    if (props.isMaximized) return;

    const dragHandle = (e.target as HTMLElement).closest('.cursor-grab');
    const controlButton = (e.target as HTMLElement).closest('button');

    if (dragHandle && !controlButton) {
        isDragging.value = true;
        startX.value = e.clientX;
        startY.value = e.clientY;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.preventDefault();
    }
};

const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return;
    const dx = e.clientX - startX.value;
    const dy = e.clientY - startY.value;
    startX.value = e.clientX;
    startY.value = e.clientY;
    emit('move', { dx, dy });
};

const onMouseUp = () => {
    isDragging.value = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
};

onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
});
</script>

<template>
  <div
    class="fixed"
    :class="{
      'window-active': isActive,
      'rounded-t-lg shadow-2xl': !isMaximized,
      'z-[1000]': isActive,
      'transition-[width,height,top,left] duration-200': !isDragging
    }"
    @mousedown="onMouseDown"
  >
    <div
        class="aero-glass flex flex-col h-full overflow-hidden border border-white/30"
        :class="{ 'rounded-t-lg': !isMaximized }"
    >
      <!-- Title Bar -->
      <div
        class="flex items-center justify-between px-3 py-2 select-none cursor-grab active:cursor-grabbing"
      >
        <div class="flex items-center gap-2">
          <slot name="icon"></slot>
          <span class="text-white text-sm font-semibold drop-shadow-md truncate max-w-[200px]">{{ title }}</span>
        </div>

        <div class="flex items-center gap-1">
          <button @click.stop="$emit('minimize')" class="w-6 h-5 flex items-center justify-center rounded-sm hover:bg-white/20 transition-colors">
            <div class="w-2.5 h-0.5 bg-white shadow-sm"></div>
          </button>
          <button @click.stop="$emit('maximize')" class="w-6 h-5 flex items-center justify-center rounded-sm hover:bg-white/20 transition-colors">
            <div class="w-2.5 h-2 border border-white shadow-sm"></div>
          </button>
          <button @click.stop="$emit('close')" class="w-10 h-5 flex items-center justify-center rounded-sm bg-red-500/80 hover:bg-red-500 shadow-inner group">
            <span class="text-white text-xs font-bold transition-transform group-hover:scale-110">✕</span>
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 bg-white overflow-auto p-0 text-gray-800 relative h-full">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.window-active {
  z-index: 1000;
}
.aero-glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.3) 100%
  );
  backdrop-filter: blur(20px) saturate(180%);
}
</style>
