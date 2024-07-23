<script setup lang="ts">
import * as yup from 'yup';
import { useRouteQuery } from '@vueuse/router';
import logo from '@/assets/images/logo.webp';

const { $toast, $globalConfig } = useNuxtApp();

const email = useRouteQuery<string>('email');

const isLoading = ref<boolean>(false);

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Field is required.'),
});

const errors = ref<{ [key: string]: string }>({});

const data = ref({
  email: email.value,
});

watch(
  () => data.value,
  () => {
    errors.value = {};
  },
  { deep: true }
);

const onSubmit = async () => {
  errors.value = await validateForm(schema, data.value);

  if (Object.keys(errors.value).length) {
    return;
  }

  isLoading.value = true;

  const { error } = await useCustomFetch('resend-verify', {
    method: 'POST',
    body: { email: data.value.email },
  });

  const newError = getResponseError(error.value);

  if (newError) {
    return $toast.error(newError?.message || 'Resend Verify fails');
  }

  $toast.success(
    'Resend Verify successful. Please access your email to verify account information and start using the system.'
  );

  email.value = '';
  data.value.email = '';

  isLoading.value = false;
};

definePageMeta({
  layout: 'auth',
});

useSeoMeta({
  title: () => $globalConfig.title + ' | Resend',
  ogTitle: () => $globalConfig.title + ' | Resend',
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
            <h3 class="text-2xl lg:text-3xl font-extrabold text-gray-900">Unverified account</h3>
            <div class="text-gray-500">
              To use the features of the {{ $globalConfig.title }} system, you need to complete the
              verification process by clicking on the link from the email sent to you.
            </div>
          </div>
          <div class="space-y-5">
            <div>
              <FormField label="Email" id="email" :error="errors.email">
                <Input
                  id="email"
                  :variant="errors.email ? 'error' : 'primary'"
                  v-model.trim="data.email"
                  class="w-full"
                  placeholder="you@example.com"
                >
                </Input>
              </FormField>
            </div>
          </div>

          <div class="space-y-4">
            <Button
              :disabled="isLoading"
              class="w-full"
              type="submit"
              :isLoading="isLoading"
              variant="purple"
              @click="onSubmit"
            >
              Resend Verify
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div class="login-bg hidden lg:block flex-1 bg-cover bg-no-repeat bg-center"></div>
  </div>
</template>

<style lang="scss" scoped>
.login-bg {
  background-image: url('@/assets/images/login-bg.webp');
}
</style>
