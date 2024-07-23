<script setup lang="ts">
defineProps<{
  error: any;
}>();

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center not-found-bg p-6 space-y-6 lg:space-y-8"
  >
    <div
      v-if="error?.statusCode === 404"
      class="text-3xl lg:text-5xl font-extrabold text-white text-center"
    >
      Look like you’re lost in space
    </div>
    <div class="text-white" v-if="error?.statusCode === 500">
      {{ error }}
    </div>
    <h2
      class="text-9xl lg:text-[310px] lg:leading-[310px] line text-white text-center font-semibold relative"
    >
      {{ error?.statusCode }}
    </h2>
    <Button @click="handleError" pills variant="white">Go back</Button>
  </div>
</template>

<style lang="scss" scoped>
.not-found-bg {
  background-image: url('@/assets/images/404-bg.webp');
}
</style>
