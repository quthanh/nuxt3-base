<script lang="ts" setup>
import { computed, watch, ref } from 'vue';
import Icon from '../Icon/Icon.vue';
const emit = defineEmits(['update:modelValue', 'change', 'changeLimit']);

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    totalItems: number;
    sliceLength?: number;
    perPage?: number;
    showCountTotal?: boolean;
  }>(),
  {
    modelValue: '1',
    totalPages: 1,
    sliceLength: 2,
    perPage: 10,
    showCountTotal: true,
  }
);

const newPerPage = ref<number>(props.perPage);

watch(
  () => props.perPage,
  () => {
    newPerPage.value = props.perPage;
  }
);

const setPage = (index: number) => {
  emit('update:modelValue', index);
};
const decreasePage = () => {
  emit('update:modelValue', Number(props.modelValue) - 1);
};
const increasePage = () => {
  emit('update:modelValue', Number(props.modelValue) + 1);
};
const computedTotalPages = computed(() => {
  if (!props.totalItems) return props.totalPages;
  if (!newPerPage.value) return props.totalPages;
  return Math.ceil(props.totalItems / newPerPage.value);
});
const isDecreaseDisabled = computed(() => Number(props.modelValue) <= 1);
const isIncreaseDisabled = computed(() => Number(props.modelValue) >= computedTotalPages.value);
const isSetPageDisabled = (index: number) => index === Number(props.modelValue);
const pagesToDisplay = computed(() => {
  if (!computedTotalPages.value) {
    return [1];
  }
  if (computedTotalPages.value <= props.sliceLength * 2 + 1) {
    const pages = [];
    for (let page = 1; page <= computedTotalPages.value; page++) {
      pages.push(page);
    }
    return pages;
  }
  if (Number(props.modelValue) <= props.sliceLength) {
    const pages = [];
    const slicedLength =
      Math.abs(Number(props.modelValue) - props.sliceLength) +
      Number(props.modelValue) +
      props.sliceLength +
      1;
    for (let page = 1; page <= slicedLength; page++) {
      pages.push(page);
    }
    return pages;
  }
  if (Number(props.modelValue) >= computedTotalPages.value - props.sliceLength) {
    const pages = [];
    for (
      let page = Math.abs(computedTotalPages.value - props.sliceLength * 2);
      page <= computedTotalPages.value;
      page++
    ) {
      pages.push(page);
    }
    return pages;
  }
  const pages = [];
  const startedPage =
    Number(props.modelValue) - props.sliceLength > 0
      ? Number(props.modelValue) - props.sliceLength
      : 1;
  for (let page = startedPage; page < Number(props.modelValue) + props.sliceLength + 1; page++) {
    if (page >= computedTotalPages.value) break;
    pages.push(page);
  }
  return pages;
});

watch(
  () => props.modelValue,
  () => {
    emit('change', Number(props.modelValue));
  }
);
</script>

<template>
  <div class="flex justify-between items-center flex-row">
    <div class="text-gray-700 text-sm" v-if="showCountTotal">
      Show {{ totalItems ? (Number(modelValue) - 1) * perPage + 1 : 0 }}-{{
        Number(modelValue) * perPage > totalItems ? totalItems : Number(modelValue) * perPage
      }}/{{ totalItems }}
    </div>
    <div class="flex items-center space-x-5">
      <nav aria-label="Page navigation">
        <ul class="inline-flex space-x-2">
          <li>
            <button
              :disabled="isDecreaseDisabled"
              @click="decreasePage"
              class="flex items-center justify-center w-[38px] h-[38px] ml-0 border border-gray-300 rounded-md text-gray-500 text-sm font-medium"
              :class="{
                'hover:text-purple-500 hover:bg-purple-50 hover:border-purple-500':
                  !isDecreaseDisabled,
              }"
            >
              <Icon name="down" class="rotate-90 svg-line"></Icon>
            </button>
          </li>

          <li v-for="index in pagesToDisplay" :key="index" class="hidden lg:block">
            <button
              :disabled="isSetPageDisabled(index)"
              @click="setPage(index)"
              class="flex items-center justify-center w-[38px] h-[38px] ml-0 border text-sm font-medium rounded-md"
              :class="{
                'text-purple-500 bg-purple-50 border-purple-500': index === Number(modelValue),
                'text-gray-500 border-gray-300 hover:text-purple-500 hover:bg-purple-50 hover:border-purple-500':
                  index !== Number(modelValue),
              }"
            >
              {{ index }}
            </button>
          </li>

          <li>
            <button
              :disabled="isIncreaseDisabled"
              @click="increasePage"
              class="flex items-center justify-center w-[38px] h-[38px] ml-0 border border-gray-300 rounded text-gray-500 text-sm font-medium"
              :class="{
                'hover:text-purple-500 hover:bg-purple-50 hover:border-purple-500':
                  !isIncreaseDisabled,
              }"
            >
              <Icon name="down" class="-rotate-90 svg-line"></Icon>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
