<script setup lang="ts">
const account = useAccountStore();
const { isLogged } = storeToRefs(account);

onMounted(async () => {
  await nextTick();

  if (isLogged.value) {
    account.getProfile();
  }
});
</script>

<template>
  <div class="layout">
    <LazyHeader />

    <!-- 164px header + footer -->
    <div class="min-h-[calc(100vh-164px)]"><slot></slot></div>

    <LazyFooter />
  </div>
</template>
