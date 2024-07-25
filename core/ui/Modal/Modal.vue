<script lang="ts" setup>
import type { ModalSize, ModalPosition } from './types';
import { SIZE, POSITION } from './const';

const props = withDefaults(
  defineProps<{
    size?: ModalSize;
    position?: ModalPosition;
    showClose?: boolean;
    isWidthFullMobile?: boolean;
    closeOnEsc?: boolean;
    closeOnClickOutside?: boolean;
  }>(),
  {
    size: 'default',
    position: 'top-center',
    showClose: false,
    isWidthFullMobile: false,
    closeOnEsc: true,
    closeOnClickOutside: true,
  }
);

const emit = defineEmits(['close']);
const closeModal = () => {
  emit('close');
};

const handleEscKey = (event: any) => {
  if (!props.closeOnEsc) return;

  if (event.key === 'Escape' || event.keyCode == 27) {
    closeModal();
  }
};
window.addEventListener('keydown', handleEscKey);
document.body.classList.add('overflow-hidden');
onUnmounted(() => {
  document.body.classList.remove('overflow-hidden');
  if ('getEventListeners' in window) {
    window.removeEventListener('keydown', handleEscKey);
  }
});
</script>
<template>
  <div @keydown.esc="closeModal">
    <div class="bg-gray-900 bg-opacity-50 fixed inset-0 z-[101]" />
    <div
      tabindex="-1"
      class="overflow-y-auto h-full overflow-x-hidden fixed top-0 right-0 left-0 z-[101] w-full md:inset-0 h-modal md:h-full flex"
      :class="[
        `${POSITION[position]}`,
        { 'p-6 pb-0': !$slots.header && !$slots.header },
        { 'px-0 lg:px-16 pt-[80px] xl:pt-6 ': isWidthFullMobile },
        { 'p-6': !isWidthFullMobile },
      ]"
      @click="closeOnClickOutside ? closeModal() : undefined"
    >
      <div @click.stop class="relative w-full h-auto" :class="`${SIZE[size]}`">
        <!-- Modal content -->
        <div
          v-if="showClose"
          class="cursor-pointer absolute z-[101] w-12 h-12 bg-[#000000] bg-opacity-20 flex items-center justify-center rounded-lg hover:bg-opacity-50"
          @click="closeModal"
          :class="[
            { 'right-0 -top-[60px] xl:-right-14 xl:top-0': isWidthFullMobile },
            { '-right-5 -top-5 xl:-right-14 xl:top-0': !isWidthFullMobile },
          ]"
        >
          <Icon
            class="svg-line !text-white w-6 h-6"
            :src="$icon.render('close')"
            name="close"
          ></Icon>
        </div>
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div
            class="pt-6 px-6 rounded-t-xl flex justify-between items-center"
            v-if="$slots.header"
          >
            <slot name="header" />
            <Button @click="closeModal" type="button" class="!text-gray-700 hover:!text-purple-600">
              <slot name="close-icon">
                <Icon
                  class="svg-line !text-gray-500 w-5 h-5"
                  :src="$icon.render('close')"
                  name="close"
                ></Icon>
              </slot>
            </Button>
          </div>
          <!-- Modal body -->
          <div class="p-6 break-word">
            <slot name="body" />
          </div>
          <!-- Modal footer -->
          <div v-if="$slots.footer" class="py-3 px-6 rounded-b-xl bg-gray-50">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
