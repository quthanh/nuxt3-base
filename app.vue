<script lang="ts" setup>
const nuxtApp = useNuxtApp();

nuxtApp.hook('page:finish', () => {
  scrollToTop();
});

// nuxtApp.hook('vue:error', (error: any, target: any, info: any) => {
//   console.log(error, 'error');
//   console.log(target, 'target');
//   console.log(info, 'info');
// });
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
