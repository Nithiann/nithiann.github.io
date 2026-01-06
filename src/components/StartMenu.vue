<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();

defineEmits(['close', 'openFolder']);

const rightItems = [
  { id: 'profile', label: 'My Profile', icon: '👤' },
  { id: 'projects', label: 'Projects', icon: '📁' },
  { id: 'experience', label: 'Work Experience', icon: '💼' },
  { id: 'skills', label: 'Programming Skills', icon: '💻' },
];
</script>

<template>
  <div v-if="isOpen" class="fixed bottom-10 left-0 w-[420px] h-[550px] flex flex-col rounded-t-lg overflow-hidden z-[10000] shadow-2xl border border-white/20">
    <!-- Top Glass Header -->
    <div class="h-5 aero-glass flex items-center px-4 border-b border-white/10">
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Side: Programs -->
      <div class="flex-1 p-2 bg-white border-l-[1.5px] border-white/40 overflow-y-auto">
        <div class="text-[11px] text-gray-500 mb-2 px-2 uppercase font-bold tracking-tight">Pinned</div>
        <div class="space-y-0.5">
          <div class="flex items-center gap-3 p-2 hover:bg-blue-100/50 rounded cursor-pointer group transition-colors">
            <img src="https://img.icons8.com/color/48/internet-explorer.png" class="w-8 h-8" />
            <span class="text-sm text-gray-800">Internet Explorer</span>
          </div>
          <div class="flex items-center gap-3 p-2 hover:bg-blue-100/50 rounded cursor-pointer group transition-colors">
            <img src="https://img.icons8.com/color/48/notepad.png" class="w-8 h-8" />
            <span class="text-sm text-gray-800">Notepad</span>
          </div>
          <div class="flex items-center gap-3 p-2 hover:bg-blue-100/50 rounded cursor-pointer group transition-colors">
             <img src="https://img.icons8.com/color/48/calculator.png" class="w-8 h-8" />
            <span class="text-sm text-gray-800">Calculator</span>
          </div>
           <div class="flex items-center gap-3 p-2 hover:bg-blue-100/50 rounded cursor-pointer group transition-colors">
             <img src="https://img.icons8.com/color/48/paint-palette.png" class="w-8 h-8" />
            <span class="text-sm text-gray-800">Paint</span>
          </div>
        </div>

        <div class="mt-4 border-t pt-2">
            <div class="flex items-center justify-between p-2 hover:bg-blue-100/50 rounded cursor-pointer group transition-colors">
                <span class="text-sm text-gray-800">All Programs</span>
                <span class="text-blue-500">▶</span>
            </div>
        </div>
      </div>

      <!-- Right Side: Folders -->
      <div class="w-[160px] aero-glass p-2 border-l border-white/20 shadow-inner">
        <div class="px-2 py-1 mb-2 font-bold text-white drop-shadow-md border-b border-white/10 text-[15px] tracking-wider">Bas Voss</div>
        <div class="space-y-1">
          <div
            v-for="item in rightItems"
            :key="item.id"
            @click="$emit('openFolder', item.id)"
            class="p-2 hover:bg-white/20 rounded cursor-pointer transition-colors text-sm text-white/90 drop-shadow-sm font-medium"
          >
            {{ item.label }}
          </div>
          <div class="my-2 border-t border-white/10"></div>
          <div class="p-2 hover:bg-white/20 rounded cursor-pointer transition-colors text-sm text-white/90">Control Panel</div>
          <div class="p-2 hover:bg-white/20 rounded cursor-pointer transition-colors text-sm text-white/90">Devices and Printers</div>
          <div class="p-2 hover:bg-white/20 rounded cursor-pointer transition-colors text-sm text-white/90">Help and Support</div>
        </div>
      </div>
    </div>

    <!-- Bottom Action Bar -->
    <div class="h-12 aero-glass flex items-center justify-end px-4 border-t border-white/10 gap-2">
      <div class="flex items-center bg-blue-700/80 hover:bg-blue-600 border border-blue-400/50 rounded shadow-sm text-white overflow-hidden">
        <button class="px-3 py-1 text-xs font-bold border-r border-white/20">Shut down</button>
        <button class="px-1.5 py-1 text-[10px] hover:bg-white/10">▶</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aero-glass {
  background: linear-gradient(
    to bottom,
    rgba(30, 60, 90, 0.4) 0%,
    rgba(10, 20, 40, 0.5) 100%
  );
  backdrop-filter: blur(20px) saturate(200%);
}
</style>
