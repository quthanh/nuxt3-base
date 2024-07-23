<script lang="ts" setup>
import { ref, watch } from 'vue';

const SIZE: Record<string, string> = {
  default: 'w-20 h-20',
  small: 'w-6 h-6',
  large: 'w-20 h-20',
};

const SIZE_ICON: Record<string, string> = {
  default: '48',
  small: '24',
  large: '48',
};

const props = withDefaults(
  defineProps<{
    src: string;
    alt?: string;
    size?: 'small' | 'default' | 'large';
    loadingClass?: string;
    imgClass?: string;
  }>(),
  {
    size: 'default',
  }
);

const image = ref();
const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);

const onLoad = () => {
  isLoading.value = true;

  if (!props.src) return;

  isLoading.value = true;
  image.value = new Image();
  image.value.src = props.src;
  isError.value = false;

  image.value.onload = () => {
    isLoading.value = false;
    isError.value = false;
  };

  image.value.onerror = () => {
    isLoading.value = false;
    isError.value = true;
  };
};

watch(
  () => props.src,
  () => {
    onLoad();
  }
);

onLoad();
</script>
<template>
  <div class="flex items-center justify-center">
    <div v-if="isLoading" :class="loadingClass">
      <div class="flex relative flex-col items-center">
        <div
          class="rounded-full animate-spin border border-solid border-purple-600 border-t-transparent"
          :class="SIZE[size]"
        ></div>
        <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <!-- <img :class="SIZE_IMAGE[size]" src="@/assets/images/logo.png" alt="Logo" loading="lazy" /> -->
        </div>
      </div>
    </div>

    <div v-else-if="!isLoading && isError">
      <Icon
        :src="$icon.render('gallery')"
        :width="SIZE_ICON[size]"
        :height="SIZE_ICON[size]"
        class="!text-gray-500"
      ></Icon>
    </div>

    <img
      v-else
      :src="src"
      loading="lazy"
      :alt="alt || $globalConfig.title"
      class="max-w-full pointer-events-none max-h-full"
      :class="imgClass"
    />
  </div>
</template>
