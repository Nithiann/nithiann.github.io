<script setup lang="ts">
defineProps<{
  title: string;
  icon?: string;
  path: string;
}>();
</script>

<template>
  <div class="flex flex-col h-full bg-[#f0f0f0]">
    <!-- Command Bar -->
    <div class="h-10 bg-white border-b border-gray-300 flex items-center px-2 gap-2 shadow-sm">
      <div class="flex items-center gap-1 mr-4">
        <button class="w-8 h-8 rounded hover:bg-blue-100 flex items-center justify-center border border-transparent hover:border-blue-300 transition-all">
          <span class="text-blue-600 font-bold">←</span>
        </button>
        <button class="w-8 h-8 rounded hover:bg-blue-100 flex items-center justify-center border border-transparent hover:border-blue-300 transition-all">
          <span class="text-blue-400 font-bold">→</span>
        </button>
      </div>

      <!-- Address Bar -->
      <div class="flex-1 h-7 bg-white border border-gray-300 rounded-sm flex items-center px-2 gap-2 text-xs text-gray-600 shadow-inner">
        <img src="https://img.icons8.com/color/48/folder-invoices.png" class="w-4 h-4" />
        <div class="flex items-center gap-1">
          <span class="hover:bg-blue-50 px-1 rounded cursor-pointer">{{ title }}</span>
          <span>▸</span>
          <span class="text-gray-400">{{ path }}</span>
        </div>
      </div>

      <!-- Search Box -->
      <div class="w-48 h-7 bg-white border border-gray-300 rounded-sm flex items-center px-2 gap-2 text-xs text-gray-400 shadow-inner">
        <span>🔍</span>
        <span>Search {{ title }}</span>
      </div>
    </div>

    <!-- Main Explorer Layout -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Sidebar (Navigation Pane) -->
      <div class="w-48 bg-white border-r border-gray-200 p-4 space-y-4 overflow-y-auto">
        <div>
          <div class="text-[11px] font-bold text-blue-800 uppercase tracking-tight mb-2">Favorites</div>
          <div class="space-y-1">
            <div class="flex items-center gap-2 p-1 hover:bg-blue-50 rounded cursor-pointer text-xs">
              <span>⭐</span> Desktop
            </div>
            <div class="flex items-center gap-2 p-1 hover:bg-blue-50 rounded cursor-pointer text-xs">
              <span>⬇️</span> Downloads
            </div>
            <div class="flex items-center gap-2 p-1 hover:bg-blue-50 rounded cursor-pointer text-xs">
              <span>🕒</span> Recent Places
            </div>
          </div>
        </div>
        <div>
          <div class="text-[11px] font-bold text-blue-800 uppercase tracking-tight mb-2">Libraries</div>
          <div class="space-y-1">
            <div class="flex items-center gap-2 p-1 hover:bg-blue-100 rounded cursor-pointer text-xs bg-blue-50/50">
              <span>📁</span> Documents
            </div>
            <div class="flex items-center gap-2 p-1 hover:bg-blue-50 rounded cursor-pointer text-xs">
              <span>🖼️</span> Pictures
            </div>
            <div class="flex items-center gap-2 p-1 hover:bg-blue-50 rounded cursor-pointer text-xs">
              <span>🎵</span> Music
            </div>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 bg-white p-6 overflow-y-auto">
        <slot></slot>
      </div>
    </div>

    <!-- Details Pane -->
    <div class="h-10 border-t border-gray-300 bg-gradient-to-b from-blue-50 to-blue-100 flex items-center px-4 gap-4 text-xs text-blue-900 font-medium">
      <div class="flex items-center gap-2">
        <img src="https://img.icons8.com/color/48/folder-invoices.png" class="w-5 h-5 opacity-70" />
        <span>{{ title }}</span>
      </div>
      <div class="border-l border-blue-200 h-4 mx-2"></div>
      <span class="text-gray-500">Items: 5</span>
    </div>
  </div>
</template>
