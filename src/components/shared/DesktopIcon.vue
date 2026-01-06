<script setup lang="ts">
defineProps<{
  label: string;
  icon: string;
}>();

defineEmits(['open']);
</script>

<template>
  <div class="desktop-icon" @dblclick="$emit('open')">
    <img :src="icon" :alt="label" draggable="false" />
    <span>{{ label }}</span>
  </div>
</template>
