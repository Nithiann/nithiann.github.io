<template>
  <div class="start-orb-wrapper">
    <div class="start-orb-image" :class="stateClass"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const stateClass = ref('')
</script>

<style scoped>
.start-orb-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: visible;
}

.start-orb-image {
  width: 54px; /* Scaled slightly for better fit */
  height: 54px;
  background-image: url('/start-sprite.png');
  background-size: 54px 162px; /* Sprite is 66x198, scaled to 54 width */
  background-repeat: no-repeat;
  background-position: 0 0;
  transition: transform 0.1s ease-out;
}

.start-orb-wrapper:hover .start-orb-image {
  background-position: 0 -54px; /* Middle state */
  transform: scale(1.05);
}

.start-orb-wrapper:active .start-orb-image {
  background-position: 0 -108px; /* Bottom state */
  transform: scale(0.95);
  transition: none;
}
</style>
