<script setup lang="ts">
import * as yup from 'yup';
import logo from '@/assets/images/logo.webp';

const account = useAccountStore();

const { $globalConfig } = useNuxtApp();

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Field is required.'),
  password: yup
    .string()
    .required('Field is required.')
    .min(6, 'Password must be at least 6 characters'),
});

const errors = ref<{ [key: string]: string }>({});
const rememberMe = ref<boolean>(false);

const form = ref({
  email: '',
  password: '',
});

const isLoading = ref<boolean>(false);

watch(
  () => form.value,
  () => {
    errors.value = {};
  },
  { deep: true }
);

const onSubmit = async () => {
  errors.value = await validateForm(schema, form.value);

  if (Object.keys(errors.value).length) {
    return;
  }

  isLoading.value = true;

  await account.login({ ...form.value, remember_me: rememberMe.value });

  isLoading.value = false;
};

definePageMeta({
  layout: 'auth',
  middleware: ['auth'],
});

useSeoMeta({
  title: () => $globalConfig.title + ' | Login',
  ogTitle: () => $globalConfig.title + ' | Login',
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
      <form
        @submit.prevent="onSubmit"
        class="max-w-[350px] mx-auto space-y-6 flex flex-col justify-center lg:space-y-8 lg:max-h-[calc(100vh-220px)]"
      >
        <div class="space-y-6 w-full lg:overflow-y-auto">
          <div class="space-y-2">
            <h3 class="text-2xl lg:text-3xl font-extrabold text-gray-900">Login to your account</h3>
            <div class="text-gray-500">Welcome back to the hub</div>
          </div>
          <div class="space-y-5">
            <div>
              <FormField label="Email" id="email" :error="errors.email">
                <Input
                  id="email"
                  :variant="errors.email ? 'error' : 'primary'"
                  v-model.trim="form.email"
                  class="w-full"
                  placeholder="you@example.com"
                >
                </Input>
              </FormField>
            </div>

            <div>
              <FormField label="Password" id="password" :error="errors.password">
                <InputPassword
                  id="password"
                  :variant="errors.password ? 'error' : 'primary'"
                  v-model.trim="form.password"
                  class="w-full"
                  placeholder="Enter password at least 6 characters"
                >
                </InputPassword>
              </FormField>

              <div class="flex mt-2 flex-col lg:flex-row lg:justify-between lg:items-center">
                <div class="flex mb-1 lg:mb-0 lg:items-center lg:justify-center">
                  <Checkbox id="remember_me" v-model="rememberMe"> Remember me </Checkbox>
                </div>
                <NuxtLink
                  to="/forgot-password"
                  class="text-sm font-medium text-purple-600 cursor-pointer"
                >
                  Forgot password
                </NuxtLink>
              </div>
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
              Get started
            </Button>

            <LoginWithGoogle class="w-full" />
          </div>

          <div class="text-sm text-gray-500 text-center lg:!mt-8">
            Don't have an account?
            <NuxtLink to="/register" class="text-purple-600 font-medium cursor-pointer">
              Sign up
            </NuxtLink>
          </div>
        </div>
      </form>
    </div>
    <div class="login-bg hidden lg:block flex-1 bg-cover bg-no-repeat bg-center"></div>
  </div>
</template>

<style lang="scss" scoped>
.login-bg {
  background-image: url('@/assets/images/login-bg.webp');
}
</style>
