<script setup lang="ts">
import Banner from '~/core/modules/home/Banner.vue';

preloadComponents(['Banner']);

definePageMeta({
  layout: 'default',
});

const { $globalConfig } = useNuxtApp();

useSeoMeta({
  title: () => $globalConfig.title,
  ogTitle: () => $globalConfig.title,
  // description: 'This is my amazing site, let me tell you all about it.',
  // ogDescription: 'This is my amazing site, let me tell you all about it.',
  // twitterCard: 'summary_large_image',
});
</script>

<template>
  <div>
    <Banner />
  </div>
</template>
