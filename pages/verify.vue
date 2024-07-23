<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router';
import logo from '@/assets/images/logo.webp';

definePageMeta({
  layout: 'auth',
});
const { $toast, $globalConfig } = useNuxtApp();

const router = useRouter();

const token = useRouteQuery<string>('token');

const registerVerify = async () => {
  try {
    const { error } = await useCustomFetch(`verify`, {
      method: 'GET',
      params: {
        token: token.value,
      },
    });

    const newError = getResponseError(error.value);

    if (newError) {
      $toast.error(newError?.message || 'Verify register fails');
      return;
    }

    $toast.success('Account Verify Successful.');

    router.push('/login');
  } catch (e: any) {
    $toast.error(e?.response?.data?.error?.message ?? 'Verify register fails');
  }
};

if (token.value) {
  registerVerify();
}

useSeoMeta({
  title: () => $globalConfig.title + ' | Verify',
  ogTitle: () => $globalConfig.title + ' | Verify',
  // description: 'This is my amazing site, let me tell you all about it.',
  // ogDescription: 'This is my amazing site, let me tell you all about it.',
  // twitterCard: 'summary_large_image',
});
</script>

<template>
  <div class="flex flex-col lg:flex-row bg-white h-screen gap-6 lg:gap-0">
    <div
      class="flex items-center space-x-2 py-4 px-4 lg:absolute lg:top-0 lg:left-0 lg:z-10 justify-center lg:w-[590px]"
    >
      <NuxtLink to="/">
        <img alt="Logo" :src="logo" loading="lazy" class="max-h-[72px]" />
      </NuxtLink>
    </div>
    <div
      class="lg:flex-[0_0_590px] px-6 lg:px-8 relative flex flex-col justify-center gap-6 pb-6 lg:pb-0"
    >
      <div
        class="max-w-[350px] mx-auto space-y-6 flex flex-col justify-center lg:space-y-8 lg:max-h-[calc(100vh-220px)]"
      >
        <div class="space-y-6 w-full lg:overflow-y-auto">
          <div class="space-y-2">
            <h3 class="text-2xl lg:text-3xl font-extrabold text-gray-900">Account Verify</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="register-bg hidden lg:block flex-1 bg-cover bg-no-repeat bg-center"></div>
  </div>
</template>

<style lang="scss" scoped>
.register-bg {
  background-image: url('@/assets/images/register-bg.webp');
}
</style>
