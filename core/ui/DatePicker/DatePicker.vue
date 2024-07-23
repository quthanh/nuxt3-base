<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
</script>
<template><VueDatePicker /></template>
<style lang="scss">
.dp__theme_light {
  --dp-primary-color: #7c3aed;
  --dp-background-color: #ffffff;
  --dp-text-color: #111827;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #111827;
  --dp-hover-icon-color: #6b7280;
  --dp-blue-600-color: #7c3aed;
  --dp-blue-600-text-color: #f8f5f5;
  --dp-secondary-color: #515961;
  --dp-border-color: #d1d5db;
  --dp-menu-border-color: #d1d5db;
  --dp-border-color-hover: #d1d5db;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #6b7280;
  --dp-success-color: #7c3aed;
  --dp-success-color-disabled: #7c3aed;
  --dp-primary-disabled-color: #A78BFA; //
  --dp-icon-color: #6b7280;
  --dp-danger-color: #ef4444;
  --dp-highlight-color: rgba(25, 118, 210, 0.1);
}
.dp__input {
  height: 38px;
  @apply rounded-md border border-gray-300 text-sm text-gray-900;
}

.dp__action_button {
  @apply h-7 px-4 py-3;
}

.dp__arrow_bottom,
.dp__arrow_top {
  @apply hidden;
}
</style>
