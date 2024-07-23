<script lang="ts" setup>
defineProps<{
  maxWidthClass?: string;
  stickyFirstColumn?: boolean;
  stickyLastColumn?: boolean;
}>();
</script>

<template>
  <td
    class="py-4 px-6 whitespace-nowrap first:group-hover:bg-gray-50 last:group-hover:bg-gray-50 text-sm"
    :class="{
      'first:sticky first:-left-[1px] first:bg-white first:z-10': stickyFirstColumn,
      'last:sticky last:-right-[1px] last:bg-white last:z-10': stickyLastColumn,
    }"
  >
    <div :class="[maxWidthClass, { 'line-clamp-1': maxWidthClass }]">
      <slot></slot>
    </div>
  </td>
</template>
