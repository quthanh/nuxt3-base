<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const query = route.query;

onMounted(() => {
  if (query) {
    window.opener.postMessage(query);
    window.close();
  }
});
</script>

<template>
  <div>OAuth</div>
</template>
