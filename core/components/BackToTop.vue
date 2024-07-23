<script setup lang="ts">
const isShow = ref(false);

const backToTop = () => {
  scrollToTop();
};

if (process.client) {
  const handleScroll = () => {
    const scrollTopPosition = window.pageYOffset || document.documentElement.scrollTop;
    isShow.value = false;

    if (scrollTopPosition > 500) {
      isShow.value = true;
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, false);
  });

  onUnmounted(() => {
    if ('getEventListeners' in window) {
      window.removeEventListener('scroll', handleScroll);
    }
  });
}
</script>
<template>
  <div
    v-if="isShow"
    class="text-white fixed z-[100] w-10 h-10 flex items-center justify-center rounded-md bg-purple-600 right-5 lg:right-10 bottom-5 lg:bottom-10 cursor-pointer hover:opacity-80 transition-opacity duration-250"
    @click="backToTop"
  >
    <Icon :src="$icon.render('down')" class="svg-line rotate-180" width="32" height="32"></Icon>
  </div>
</template>
