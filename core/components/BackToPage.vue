<script setup lang="ts">
defineProps<{
  to: any;
  label: String;
}>();
</script>

<template>
  <div>
    <NuxtLink
      :to="to"
      class="inline-flex gap-2 items-center text-sm text-gray-700 font-medium hover:text-purple-600 back-to-page"
    >
      <Icon name="arrow-left" class="w-6 h-6"></Icon>
      {{ label }}
    </NuxtLink>
  </div>
</template>
