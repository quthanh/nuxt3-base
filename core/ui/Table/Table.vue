<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();

defineProps<{
  maxHeight?: number;
}>();

const id = makeid(8);

onMounted(async () => {
  await nextTick();

  if (width.value >= 1200 && document?.getElementById(id)) {
    let isDragging = false;
    let startX: any;
    let startScrollLeft: any;

    (document.getElementById(id) as any).addEventListener('mousedown', function (event: any) {
      isDragging = true;
      startX = event.pageX;
      startScrollLeft = document.getElementById(id)?.scrollLeft;
      document.body.style.cursor = 'grabbing'; // Change cursor style

      document.getElementById(id)?.classList.add('select-none');
    });

    document.addEventListener('mousemove', function (event) {
      if (!isDragging) return;

      const offsetX = event.pageX - startX;
      (document.getElementById(id) as any).scrollLeft = startScrollLeft - offsetX;
    });

    document.addEventListener('mouseup', function () {
      isDragging = false;
      document.body.style.cursor = 'default'; // Reset cursor style
      document.getElementById(id)?.classList.remove('select-none');
    });
  }
});
</script>
<template>
  <div
    :id="id"
    class="relative overflow-auto border border-gray-200 rounded-md shadow-sm"
    :style="{ 'max-height': maxHeight ? maxHeight + 'px' : 'auto' }"
  >
    <table class="w-full text-left text-gray-500">
      <slot></slot>
    </table>
  </div>
</template>
