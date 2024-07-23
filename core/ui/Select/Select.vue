<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import Dropdown from './../Dropdown/Dropdown.vue';
import Tooltip from './../Tooltip/Tooltip.vue';
import Input from './../Input/Input.vue';
import { useVModel, useElementBounding } from '@vueuse/core';
import SelectItem from './SelectItem.vue';

const props = withDefaults(
  defineProps<{
    inputClasses?: string;
    options: any[];
    label?: string;
    trackBy?: string;
    modelValue?: any;
    placeholder?: string;
    isMultiple?: boolean;
    contentClasses?: string;
    hasError?: boolean;
    allowEmpty?: boolean;
    showSearch?: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    customLabel?: Function;
    isRefresh?: boolean;
    disabled?: boolean;
    maxLength?: number;
  }>(),
  {
    allowEmpty: true,
    inputClasses: 'min-h-[38px]',
    label: 'name',
    trackBy: 'id',
    placeholder: 'Select here',
    isMultiple: false,
    hasError: false,
    contentClasses: 'max-h-[300px]',
    showSearch: true,
    isRefresh: true,
    maxLength: 100,
  }
);

const emit = defineEmits(['onChange']);

const model = useVModel(props, 'modelValue');

const isShowDropdown = ref<boolean>(false);
const keyword = ref<string>();
const select = ref();
const { width } = useElementBounding(select);

const isObject = (item: any) => {
  return typeof item === 'object';
};

const removeHtmlTag = (val?: string) => {
  if (!val) return;
  return val.replace(/<\/?[^>]+>/gi, '');
};

const filterOptions = computed(() => {
  if (!props.options?.length) return [];

  if (!keyword?.value) {
    return props.options?.slice(0, props.maxLength);
  }

  return props.options
    .filter((option) => {
      const newOption = isObject(props.options[0]) ? option[props.label] : option;

      if (props.customLabel) {
        return (
          keyword.value &&
          props.customLabel(newOption).toLowerCase().indexOf(keyword.value.toLowerCase()) > -1
        );
      }

      return keyword.value && newOption.toLowerCase().indexOf(keyword.value.toLowerCase()) > -1;
    })
    ?.slice(0, props.maxLength);
});

const buildOptionName = (item: any) => {
  return isObject(item) ? item[props.label] : item;
};

const selectOption = (item: any) => {
  if (checkActiveOption(item) && props.allowEmpty) {
    if (props.isMultiple) {
      model.value.splice(
        model.value.findIndex((val: any) => {
          return isActive(item, val);
        }),
        1
      );

      return;
    }

    model.value = undefined;
    return;
  }

  model.value = props.isMultiple
    ? !Array.isArray(model.value)
      ? [item]
      : [...model.value, item]
    : item;
};

const checkActiveOption = (item: any) => {
  if (!model.value) return false;

  return props.isMultiple
    ? isObject(item)
      ? Boolean(model.value.find((val: any) => isActive(item, val)))
      : Boolean(model.value.includes(item))
    : isActive(item, model.value);
};

const isActive = (val: any, currentVal: any) => {
  return isObject(val)
    ? Boolean(JSON.stringify(val) === JSON.stringify(currentVal))
    : Boolean(val === currentVal);
};

const isOpen = (val: boolean) => {
  isShowDropdown.value = val;
};

watch(
  () => isShowDropdown.value,
  () => {
    searchFocus();

    if (isShowDropdown.value) return;

    keyword.value = '';
  }
);

watch(
  () => model.value,
  () => {
    emit('onChange', model.value);
  },
  { deep: true }
);

const searchFocus = () => {
  if (!props.showSearch || !filterOptions.value?.length) return;

  setTimeout(() => {
    const search = document.getElementById('select_search');
    if (!search) return;
    search.focus();
  });
};
</script>
<template>
  <div class="w-full" ref="select" :class="{ 'pointer-events-none': disabled }">
    <Dropdown
      :isRefresh="isRefresh"
      :widthValue="width"
      placement="bottom-right"
      :showIcon="false"
      contentClasses="p-4"
      @isOpen="isOpen"
    >
      <template #title>
        <div
          class="p-2 border border-gray-300 rounded-md pr-8 relative w-full shadow-sm"
          :class="[
            inputClasses,
            {
              'border-purple-600': isShowDropdown,
              '!border-red-500 is-error': hasError,
              '!bg-gray-100': disabled,
            },
          ]"
        >
          <div v-if="isMultiple && Array.isArray(model) && model?.length" class="space-y-1">
            <Tooltip placement="top" v-if="model">
              <template #content>
                <div class="text-sm text-gray-700 max-w-xs">
                  {{
                    model
                      ?.map((item) =>
                        customLabel ? removeHtmlTag(customLabel(item)) : buildOptionName(item)
                      )
                      .join(', ')
                  }}
                </div>
              </template>
              <div class="text-sm line-clamp-1">
                <div>
                  {{
                    model
                      ?.map((item) =>
                        customLabel ? removeHtmlTag(customLabel(item)) : buildOptionName(item)
                      )
                      .join(', ')
                  }}
                </div>
              </div>
            </Tooltip>

            <!-- <template v-if="model">
              <div
                :key="indexModel"
                v-for="(item, indexModel) in model"
                class="typo-small py-1 px-2 inline-block border border-gray-300 rounded-md bg-background-link mr-1"
              >
                <div class="flex items-center">
                  <div class="line-clamp-1">
                    {{ customLabel ? customLabel(item) : buildOptionName(item) }}
                  </div>
                  <div class="ml-1">
                    <Icon
                      @click.stop="model.splice(indexModel, 1)"
                      width="16"
                      height="16"
                      class="!text-gray-500 svg-line hover:!text-purple-600 cursor-pointer"
                      :src="$icon.render('close')"
                    ></Icon>
                  </div>
                </div>
              </div>
            </template> -->
          </div>

          <div class="flex items-center" v-else-if="!isMultiple && model">
            <Tooltip placement="top">
              <template #content>
                <div class="text-sm text-gray-700 max-w-xs">
                  {{ customLabel ? removeHtmlTag(customLabel(model)) : buildOptionName(model) }}
                </div>
              </template>
              <div class="flex-1 text-sm line-clamp-1">
                {{ customLabel ? removeHtmlTag(customLabel(model)) : buildOptionName(model) }}
              </div>
            </Tooltip>

            <div
              class="flex-[0_0_20px] cursor-pointer"
              v-if="model && allowEmpty"
              @click.stop="model = undefined"
            >
              <Icon
                width="20"
                height="20"
                class="!text-gray-500 svg-line hover:!text-purple-600"
                :src="$icon.render('close')"
              ></Icon>
            </div>
          </div>

          <div v-else class="text-secondary text-sm flex justify-between">
            {{ placeholder }}
          </div>

          <div class="w-6 absolute right-2 top-1/2 -translate-y-1/2">
            <Icon
              :src="$icon.render('down')"
              width="24"
              height="24"
              class="!text-gray-500 svg-line"
              :class="{ '-rotate-180': isShowDropdown }"
            ></Icon>
          </div>
        </div>
      </template>

      <template v-slot:content="{ onClose }">
        <div>
          <div class="mb-3" v-if="showSearch">
            <Input
              id="select_search"
              class="pr-8 text-sm"
              type="text"
              placeholder="Type to search ..."
              v-model="keyword"
            >
              <template #append v-if="keyword">
                <Icon
                  @click.stop="keyword = ''"
                  width="20"
                  height="20"
                  class="!text-gray-500 svg-line hover:!text-purple-600 cursor-pointer"
                  :src="$icon.render('close')"
                ></Icon>
              </template>
            </Input>
          </div>

          <div v-if="!options.length">No items.</div>
          <div v-else-if="!filterOptions.length">No item any.</div>

          <div class="space-y-2 overflow-y-auto" v-else :class="contentClasses">
            <SelectItem
              v-for="(option, index) in filterOptions"
              @click="
                selectOption(option);
                onClose();
              "
              :key="index"
              class="text-sm flex items-center gap-1 justify-between"
              :class="{ 'text-purple-600': checkActiveOption(option) }"
            >
              <div
                class="line-clamp-1"
                v-html="customLabel ? customLabel(option) : buildOptionName(option)"
              ></div>
              <div v-if="isMultiple">
                <Checkbox
                  :modelValue="checkActiveOption(option)"
                  @change="
                    selectOption(option);
                    onClose();
                  "
                ></Checkbox>
              </div>
            </SelectItem>
          </div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>
