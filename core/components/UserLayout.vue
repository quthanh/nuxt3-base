<script lang="ts" setup>
const isShowModal = ref(false);

const getIsShowModal = (isShow: boolean) => {
  isShowModal.value = isShow;
};

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
  <div class="main-container p-6 py-8 lg:py-[60px] lg:px-0">
    <div class="flex gap-6 lg:gap-12 flex-col lg:flex-row items-start z-10">
      <div
        class="w-full lg:w-[200px] lg:flex-[0_0_200px] space-y-6 lg:sticky lg:top-2"
        :class="{ 'lg:z-[100]': isShowModal, 'lg:z-[89]': !isShowModal }"
      >
        <LazyUserSidebar @isShowModal="getIsShowModal" />
      </div>
      <div class="flex-1 w-full overflow-auto">
        <ClientOnly>
          <template #fallback>
            <div class="space-y-6">
              <div class="h-8 bg-gray-100 rounded-md w-32"></div>

              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="h-8 bg-gray-100 rounded-md w-full"></div>
                <div class="h-8 bg-gray-100 rounded-md w-full"></div>
                <div class="h-8 bg-gray-100 rounded-md w-full"></div>
              </div>

              <div class="h-24 bg-gray-100 rounded-md"></div>
            </div>
          </template>
          <slot></slot>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
