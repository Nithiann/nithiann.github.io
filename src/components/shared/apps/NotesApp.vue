<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  os: 'win7' | 'macos' | 'linux' | 'ios' | 'android' | 'wp'
}>()

const noteContent = ref('')

const isWinStyle = computed(() => props.os === 'win7' || props.os === 'wp')
const isMacStyle = computed(() => props.os === 'macos' || props.os === 'ios')
const isAndroidStyle = computed(() => props.os === 'linux' || props.os === 'android')
</script>

<template>
  <div
    class="flex flex-col h-full transition-colors duration-300 overflow-hidden"
    :class="{
      'bg-white border border-[#919191] font-mono': isWinStyle,
      'bg-[#fef9c3] p-0 font-sans': isMacStyle,
      'bg-white p-0 font-sans': isAndroidStyle
    }"
  >
    <!-- Windows Notepad Menu Bar -->
    <div v-if="isWinStyle" class="bg-[#f0f0f0] border-b border-[#adadad] px-2 py-0.5 text-xs flex gap-3 text-black">
      <span class="hover:bg-[#e5f1fb] px-1 cursor-default">File</span>
      <span class="hover:bg-[#e5f1fb] px-1 cursor-default">Edit</span>
      <span class="hover:bg-[#e5f1fb] px-1 cursor-default">Format</span>
      <span class="hover:bg-[#e5f1fb] px-1 cursor-default">View</span>
      <span class="hover:bg-[#e5f1fb] px-1 cursor-default">Help</span>
    </div>

    <!-- iOS Notes Header -->
    <div v-if="isMacStyle" class="h-12 flex items-center justify-between px-4 border-b border-black/5 bg-[#fef9c3]/50 backdrop-blur-sm shrink-0">
      <span class="text-[#d97706] font-medium cursor-pointer">Notes</span>
      <div class="flex gap-4">
        <span class="text-[#d97706] text-xl cursor-pointer">⌗</span>
        <span class="text-[#d97706] text-xl cursor-pointer">✎</span>
      </div>
    </div>

    <!-- Android Notes Header -->
    <div v-if="isAndroidStyle" class="h-14 flex items-center px-4 mb-2 shrink-0">
      <div class="p-2 hover:bg-black/5 rounded-full cursor-pointer mr-2">
        <svg viewBox="0 0 24 24" class="w-6 h-6 fill-gray-600"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
      </div>
      <span class="text-xl font-medium text-gray-800">Note</span>
      <div class="ml-auto flex gap-2">
        <div class="p-2 hover:bg-black/5 rounded-full cursor-pointer">
          <svg viewBox="0 0 24 24" class="w-6 h-6 fill-gray-600"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </div>
      </div>
    </div>

    <textarea
      v-model="noteContent"
      class="flex-1 w-full p-4 resize-none outline-none leading-relaxed"
      :class="{
        'text-sm text-black': isWinStyle,
        'bg-[#fef9c3] text-[#422006] text-lg': isMacStyle,
        'bg-white text-gray-900 text-base': isAndroidStyle
      }"
      placeholder="Start typing..."
    ></textarea>

    <!-- macOS Yellow Line (aesthetic) -->
    <div v-if="isMacStyle" class="absolute top-12 bottom-0 left-10 w-[1px] bg-red-200 pointer-events-none"></div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');

textarea {
  scrollbar-width: thin;
  scrollbar-color: rgba(0,0,0,0.1) transparent;
}

textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.1);
  border-radius: 10px;
}
</style>
