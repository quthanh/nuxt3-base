<script lang="ts" setup>
import { useVModel } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    error?: string;
    acceptFile?: string;
    parentClass?: string;
    itemClass?: string;
    modelValue: any[];
    hasRemove?: true;
  }>(),
  {
    acceptFile: 'image/png, image/gif, image/jpeg, image/webp',
    itemClass: 'h-[150px]',
    parentClass: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6',
    hasRemove: true,
  }
);

const newFiles = useVModel(props, 'modelValue');

const changeFile = ($event: Event) => {
  const files = ($event.target as HTMLInputElement)?.files;
  if (!files) {
    return;
  }

  const URL = window.webkitURL || window.URL;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    newFiles.value.push({
      is_new: true,
      url: URL.createObjectURL(file),
    });
  }

  ($event.target as HTMLInputElement).value = '';
};

const removeFile = (index: number) => {
  newFiles.value.splice(index, 1);
};
</script>
<template>
  <div :class="parentClass">
    <div
      class="relative border border-blue-600 border-dashed rounded-lg"
      :class="[
        {
          'border-red-500': error,
        },
        itemClass,
      ]"
    >
      <InputFile
        class="absolute w-full border-none opacity-0 !p-0 z-10 cursor-pointer"
        :class="itemClass"
        :accept="acceptFile"
        @change=" ($event: Event) => {
          changeFile($event);
        }"
        multiple
      ></InputFile>

      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 w-full flex items-center justify-center px-2"
      >
        <Icon
          :class="{
            '!text-red-500': error,
            '!text-blue-600': !error,
          }"
          class="w-6 h-6"
          name="plus"
        ></Icon>
      </div>
    </div>

    <div
      v-for="(item, index) in newFiles"
      :key="index"
      :class="itemClass"
      class="p-1 border border-gray-300 rounded-md flex items-center justify-center relative"
    >
      <div
        class="w-6 h-6 cursor-pointer absolute top-2 right-2 z-[12] text-gray-500 hover:text-red-500 bg-white border border-gray-300 rounded-md flex items-center justify-center shadow-sm"
        @click="removeFile(index)"
      >
        <Icon name="close"></Icon>
      </div>

      <ImageLoading :class="itemClass" class="p-1 max-h-full" alt="" :src="item.url" />
    </div>
  </div>
</template>
