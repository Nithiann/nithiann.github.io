<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const props = defineProps<{
  title: string;
  isActive?: boolean;
  isMaximized?: boolean;
}>();

const emit = defineEmits(['close', 'minimize', 'maximize', 'focus', 'move', 'resize']);

const isDragging = ref(false);
const isResizing = ref(false);
const resizeDirection = ref('');
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
    if (isDragging.value) {
        const dx = e.clientX - startX.value;
        const dy = e.clientY - startY.value;
        startX.value = e.clientX;
        startY.value = e.clientY;
        emit('move', { dx, dy });
    } else if (isResizing.value) {
        const dx = e.clientX - startX.value;
        const dy = e.clientY - startY.value;
        startX.value = e.clientX;
        startY.value = e.clientY;

        let dw = 0, dh = 0, offX = 0, offY = 0;

        if (resizeDirection.value.includes('e')) dw = dx;
        if (resizeDirection.value.includes('w')) { dw = -dx; offX = dx; }
        if (resizeDirection.value.includes('s')) dh = dy;
        if (resizeDirection.value.includes('n')) { dh = -dy; offY = dy; }

        emit('resize', { dx: offX, dy: offY, dw, dh });
    }
};

const onResizeStart = (direction: string, e: MouseEvent) => {
    if (props.isMaximized) return;
    isResizing.value = true;
    resizeDirection.value = direction;
    startX.value = e.clientX;
    startY.value = e.clientY;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    e.preventDefault();
    e.stopPropagation();
};

const onMouseUp = () => {
    isDragging.value = false;
    isResizing.value = false;
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
        class="aero-glass flex flex-col h-full overflow-hidden border border-white/30 relative"
        :class="{ 'rounded-t-lg': !isMaximized }"
    >
      <!-- Resize Handles (only when not maximized) -->
      <template v-if="!isMaximized">
        <!-- Edges -->
        <div class="absolute top-0 left-2 right-2 h-1 cursor-n-resize z-10" @mousedown="onResizeStart('n', $event)"></div>
        <div class="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize z-10" @mousedown="onResizeStart('s', $event)"></div>
        <div class="absolute top-2 bottom-2 right-0 w-1 cursor-e-resize z-10" @mousedown="onResizeStart('e', $event)"></div>
        <div class="absolute top-2 bottom-2 left-0 w-1 cursor-w-resize z-10" @mousedown="onResizeStart('w', $event)"></div>
        <!-- Corners -->
        <div class="absolute top-0 left-0 w-2 h-2 cursor-nw-resize z-20" @mousedown="onResizeStart('nw', $event)"></div>
        <div class="absolute top-0 right-0 w-2 h-2 cursor-ne-resize z-20" @mousedown="onResizeStart('ne', $event)"></div>
        <div class="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize z-20" @mousedown="onResizeStart('sw', $event)"></div>
        <div class="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize z-20" @mousedown="onResizeStart('se', $event)"></div>
      </template>

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
