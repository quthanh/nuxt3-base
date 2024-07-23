<script setup lang="ts">
const route = useRoute();

const slug = route.params.slug;

const { data, pending: isLoading } = await useCustomFetch(`home/pages/${slug}`);

const pageData = computed(() => {
  return (data?.value as any)?.data;
});

const { $globalConfig } = useNuxtApp();

useSeoMeta({
  title: () =>
    pageData.value?.title
      ? $globalConfig.title + ' | ' + pageData.value?.title
      : $globalConfig.title,
  ogTitle: () =>
    pageData.value?.title
      ? $globalConfig.title + ' | ' + pageData.value?.title
      : $globalConfig.title,
  // description: 'This is my amazing site, let me tell you all about it.',
  // ogDescription: 'This is my amazing site, let me tell you all about it.',
  // twitterCard: 'summary_large_image',
});
</script>
<template>
  <div class="main-container px-6 py-8 lg:px-0 lg:py-[80px]">
    <template v-if="isLoading">
      <div class="text-center mb-10 animate-pulse">
        <div class="h-10 w-40 rounded-md bg-gray-100 mx-auto"></div>
      </div>

      <div class="page-content max-w-[800px] mx-auto animate-pulse">
        <div class="space-y-5">
          <div v-for="i in 3" class="space-y-2" :key="i">
            <div class="h-8 w-40 bg-gray-100 rounded-md"></div>
            <div class="w-full h-6 bg-gray-100 rounded-md"></div>
            <div class="w-full h-12 bg-gray-100 rounded-md"></div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="text-center mb-10" v-if="pageData?.title">
        <h2 class="text-2xl lg:text-4xl font-extrabold text-gray-900">{{ pageData?.title }}</h2>
      </div>

      <div
        class="page-content max-w-[800px] mx-auto whitespace-break-spaces"
        v-if="pageData?.description"
      >
        <div v-html="pageData?.description"></div>
      </div>
    </template>
  </div>
</template>
<style lang="scss">
.page-content {
  @apply text-base;
  strong,
  b {
    @apply font-bold;
  }

  .ql-align-center {
    @apply text-center;
  }

  .ql-align-right {
    @apply text-right;
  }

  .ql-align-justify {
    @apply text-justify;
  }
  ul,
  ol {
    @apply pl-4;
  }

  ul {
    @apply list-disc;
  }

  ol {
    @apply list-decimal;
  }

  h1 {
    // font-size: 2em;
    @apply text-4xl;
  }

  h2 {
    @apply text-2xl;
  }

  a {
    @apply text-purple-600;

    &:hover {
      @apply text-purple-500;
    }
  }
}
</style>
