<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { onClickOutside, useElementBounding, useWindowSize } from '@vueuse/core';
import Icon from './../Icon/Icon.vue';

const { height: windowHeight } = useWindowSize();

const emit = defineEmits(['isOpen']);

type DropdownPlacement = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

const props = withDefaults(
  defineProps<{
    placement?: DropdownPlacement;
    widthClass?: string;
    widthValue?: number;
    showIcon?: boolean;
    contentClasses?: string;
    isShow?: boolean;
    isSwiperSlide?: boolean;
    iconClass?: any;
    isRefresh?: boolean;
    disabled?: boolean;
    iconTriggerClick?: any;
  }>(),
  {
    placement: 'bottom-left',
    widthClass: 'w-48',
    showIcon: true,
    contentClasses: '',
    isShow: false,
    iconClass: 'text-gray-400',
    isRefresh: true,
  }
);

const show = ref(false);
const dropdown = ref(null);
const dropdownContent = ref(null);
const defaultSpace = ref(8);
const randomKey = ref(makeid(8));

onClickOutside(dropdown, () => onClose());

const { x, y, width, height } = useElementBounding(dropdown);
const { width: widthDropdownContent, height: heightDropdownContent } =
  useElementBounding(dropdownContent);

const positionLeft = computed(() => {
  let positionLeft = 'auto';
  switch (props.placement) {
    case 'bottom-right':
    case 'top-right':
      positionLeft = x.value + width.value - widthDropdownContent.value + 'px';
      break;
  }
  return positionLeft;
});

const positionTop = computed(() => {
  const placementBottom = y.value + height.value + defaultSpace.value;
  const placementTop = y.value - heightDropdownContent.value - defaultSpace.value;

  let positionTop = placementBottom + 'px';
  switch (props.placement) {
    case 'top-left':
    case 'top-right':
      positionTop = placementTop + 'px';
      break;
    case 'bottom-left':
    case 'bottom-right':
      if (placementBottom + heightDropdownContent.value > windowHeight.value) {
        positionTop = placementTop + 'px';
      }
      break;
  }

  return positionTop;
});

const buildStyleContent = computed(() => {
  let style: { [index: string]: string } = {
    left: positionLeft.value,
    top: positionTop.value,
  };

  if (props.widthValue) {
    style = {
      ...style,
      width: `${props.widthValue.toString()}px`,
    };
  }

  if (props.isSwiperSlide) {
    // Hotfix: swiper slider
    style = {
      ...style,
      position: 'absolute !important',
      transform: `translateY(-${
        Number(positionTop.value?.replace('px', '')) - height.value - defaultSpace.value
      }px)`,
    };
  }

  return style;
});

const onClose = () => {
  show.value = false;
};

watch(
  () => show.value,
  () => {
    emit('isOpen', show.value);

    if (props.isRefresh) {
      randomKey.value = makeid(8);
    }
  }
);

watch(
  () => props.isShow,
  () => {
    show.value = props.isShow;
  }
);
</script>

<template>
  <div class="relative" ref="dropdown" :key="randomKey">
    <div
      @click.stop="show = !show"
      class="cursor-pointer"
      :class="{ 'pointer-events-none ': disabled }"
    >
      <div class="flex items-center">
        <slot name="title"> </slot>
        <div
          v-if="showIcon"
          class="w-5 h-5 flex items-center justify-center"
          :class="{ 'rotate-180': show }"
          @click="iconTriggerClick"
        >
          <Icon :src="$icon.render('down')" class="svg-line" :class="iconClass"></Icon>
        </div>
      </div>
    </div>
    <!-- Dropdown menu -->
    <div
      ref="dropdownContent"
      class="fixed z-20 bg-white rounded-lg overflow-hidden p-3 shadow-[0_0.6px_1.8px_rgba(0,0,0,0.1),0_3.2px_7.2px_rgba(0,0,0,0.13)]"
      :style="buildStyleContent"
      :class="[widthClass, contentClasses]"
      v-if="show"
    >
      <slot name="content" :onClose="onClose"> </slot>
    </div>
  </div>
</template>
