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
        :name="type === 'password' ? 'eye-slash' : 'eye'"
        class="!text-gray-500 cursor-pointer w-5 h-5"
        @click.prevent="changeType"
      ></Icon>
    </template>
  </Input>
</template>
