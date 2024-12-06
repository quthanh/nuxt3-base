<script lang="ts" setup>
const nuxtApp = useNuxtApp();
const route = useRoute();
const { checkVersion } = useVersion();

nuxtApp.hook('page:finish', () => {
  scrollToTop();
});

// nuxtApp.hook('vue:error', (error: any, target: any, info: any) => {
//   console.log(error, 'error');
//   console.log(target, 'target');
//   console.log(info, 'info');
// });

watch(
  () => route.path,
  () => {
    checkVersion();
  }
);

onMounted(() => {
  document.addEventListener('visibilitychange', checkVersion);
});

onUnmounted(() => {
  document.removeEventListener('visibilitychange', checkVersion);
});
</script>

<template>
  <div id="layout">
    <NuxtLayout>
      <NuxtLoadingIndicator :color="'#DDD6FE'" />
      <NuxtPage />
    </NuxtLayout>
  </div>

  <LazyBackToTop />
</template>
