<script lang="ts" setup>
defineProps<{
  stickyFirstColumn?: boolean;
  stickyLastColumn?: boolean;
}>();
</script>
<template>
  <th
    scope="col"
    class="px-6 py-3 font-medium whitespace-nowrap text-xs text-gray-500"
    :class="{
      'first:sticky first:bg-gray-50 first:z-10 first:-left-[1px]': stickyFirstColumn,
      'last:sticky last:bg-gray-50 last:z-10 last:-right-[1px]': stickyLastColumn,
    }"
  >
    <slot></slot>
  </th>
</template>
