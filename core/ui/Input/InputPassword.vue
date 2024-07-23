<script lang="ts" setup>
import { ref } from 'vue';
import Input from './Input.vue';
import Icon from './../Icon/Icon.vue';

const type = ref<string>('password');
const changeType = () => {
  if (type.value === 'password') {
    type.value = 'text';
    return;
  }
  type.value = 'password';
};
</script>
<template>
  <Input :type="type" :hasAppend="true">
    <template #append>
      <Icon
        :src="$icon.render(type === 'password' ? 'eye-slash' : 'eye')"
        width="20"
        height="20"
        class="!text-gray-500 cursor-pointer"
        @click.prevent="changeType"
      ></Icon>
    </template>
  </Input>
</template>
