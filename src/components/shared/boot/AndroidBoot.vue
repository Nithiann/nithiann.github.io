<script setup lang="ts">
import { onMounted } from 'vue'

const emit = defineEmits(['finished'])

onMounted(() => {
  setTimeout(() => {
    emit('finished')
  }, 4000)
})
</script>

<template>
  <div class="fixed inset-0 bg-[#fffbff] flex flex-col items-center justify-center select-none font-sans overflow-hidden">
    <!-- Google "G" animation -->
    <div class="relative flex items-center justify-center mb-24">
      <div class="text-6xl font-medium tracking-tighter flex gap-0.5">
        <span class="text-[#4285F4] animate-[slide-in_0.5s_ease-out_0s_both]">G</span>
        <span class="text-[#EA4335] animate-[slide-in_0.5s_ease-out_0.1s_both]">o</span>
        <span class="text-[#FBBC05] animate-[slide-in_0.5s_ease-out_0.2s_both]">o</span>
        <span class="text-[#4285F4] animate-[slide-in_0.5s_ease-out_0.3s_both]">g</span>
        <span class="text-[#34A853] animate-[slide-in_0.5s_ease-out_0.4s_both]">l</span>
        <span class="text-[#EA4335] animate-[slide-in_0.5s_ease-out_0.5s_both]">e</span>
      </div>
      <!-- Animated loading bar -->
      <div class="absolute -bottom-8 left-0 right-0 h-1 bg-[#e3e3e3] rounded-full overflow-hidden">
        <div class="h-full bg-[#4285F4] loading-bar"></div>
      </div>
    </div>

    <!-- Powered by Android logo -->
    <div class="absolute bottom-12 flex flex-col items-center opacity-40">
      <span class="text-[10px] font-bold uppercase tracking-widest text-[#444746] mb-1">Powered by</span>
      <div class="flex items-center gap-1.5">
        <svg viewBox="0 0 24 24" class="w-5 h-5 fill-[#34A853]">
          <path d="M17.523 15.3414C17.0601 15.3414 16.6853 14.9666 16.6853 14.5037C16.6853 14.0408 17.0601 13.666 17.523 13.666C17.9859 13.666 18.3607 14.0408 18.3607 14.5037C18.3607 14.9666 17.9859 15.3414 17.523 15.3414ZM6.47703 15.3414C6.01413 15.3414 5.63933 14.9666 5.63933 14.5037C5.63933 14.0408 6.01413 13.666 6.47703 13.666C6.93993 13.666 7.31473 14.0408 7.31473 14.5037C7.31473 14.9666 6.93993 15.3414 6.47703 15.3414ZM17.9427 11.4727L19.7915 8.27014C19.9284 8.03295 19.847 7.72895 19.6098 7.59214C19.3727 7.45533 19.0687 7.53673 18.9319 7.77382L17.0505 11.0329C15.5898 10.3644 13.9213 10.0016 12.1648 10.0016C10.4084 10.0016 8.73981 10.3644 7.27911 11.0329L5.40543 7.78162C5.26852 7.54453 4.96462 7.46313 4.72743 7.59994C4.49023 7.73675 4.40884 8.04075 4.54574 8.27794L6.38681 11.4727C3.12053 13.2435 1.10983 16.5913 1.10983 20.3546H23.2198C23.2198 16.5913 21.2091 13.2435 17.9427 11.4727Z"/>
        </svg>
        <span class="text-lg font-medium tracking-tighter text-[#1d1b16]">android</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500&display=swap');

.font-sans { font-family: 'Google Sans', 'Outfit', sans-serif; }

@keyframes slide-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.loading-bar {
  width: 40%;
  animation: loading 2s infinite linear;
}

@keyframes loading {
  0% { transform: translateX(-150%); }
  100% { transform: translateX(250%); }
}
</style>
