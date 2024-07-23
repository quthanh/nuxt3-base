<script setup lang="ts">
withDefaults(
  defineProps<{
    hoverOnBackground?: boolean;
  }>(),
  {
    hoverOnBackground: true,
  }
);
</script>
<template>
  <tr
    class="border-b border-gray-300 last:border-none relative"
    :class="{
      'hover:bg-gray-50 group': hoverOnBackground,
    }"
  >
    <slot></slot>
  </tr>
</template>
