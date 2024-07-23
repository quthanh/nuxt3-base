<script setup lang="ts">
import * as yup from 'yup';
import { useRouteQuery } from '@vueuse/router';

const { $toast, $globalConfig } = useNuxtApp();

const router = useRouter();
const token = useRouteQuery<string>('token');
const schema = yup.object({
  password: yup
    .string()
    .required('The field is required.')
    .min(6, 'Password must be at least 6 characters'),
  password_confirmation: yup
    .string()
    .required('The field is required.')
    .min(6, 'Password must be at least 6 characters')
    .oneOf([yup.ref('password'), ''], 'Confirm password same password'),
});

const errors = ref<{ [key: string]: string }>({});

const data = ref({
  password: '',
  password_confirmation: '',
});

const isLoading = ref<boolean>(false);

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

  const { error } = await useCustomFetch('reset-password', {
    method: 'POST',
    body: {
      ...data.value,
      token: token,
    },
  });

  const newError = getResponseError(error.value);

  if (newError) {
    return $toast.error(newError?.message || 'Reset password fails');
  }

  router.push({ name: 'login' });
  $toast.success('Reset password successful.');

  isLoading.value = false;
};

definePageMeta({
  layout: 'auth',
});

useSeoMeta({
  title: () => $globalConfig.title + ' | Reset password',
  ogTitle: () => $globalConfig.title + ' | Reset password',
  // description: 'This is my amazing site, let me tell you all about it.',
  // ogDescription: 'This is my amazing site, let me tell you all about it.',
  // twitterCard: 'summary_large_image',
});
</script>
<template>
  <div class="bg-white">
    <div class="flex justify-center reset-password-bg bg-no-repeat bg-top min-h-screen">
      <div class="flex items-center w-full mx-5 my-8 justify-center">
        <div class="flex-1 max-w-[446px] bg-transparent p-4 lg:p-10 rounded-2xl">
          <div class="text-center">
            <div class="flex items-center justify-center mb-5">
              <div
                class="w-[60px] h-[60px] flex items-center justify-center bg-gray-50 border border-gray-300 rounded-lg"
              >
                <Icon
                  width="36"
                  height="36"
                  :src="$icon.render('key')"
                  class="svg-line text-gray-700"
                ></Icon>
              </div>
            </div>
            <h2 class="text-gray-900 font-extrabold text-xl lg:text-3xl">Enter new password</h2>
            <p class="text-sm lg:text-base mt-2 text-gray-500">
              Time for a password makeover! Go wild!
            </p>
          </div>

          <div class="mt-4 lg:mt-8">
            <div class="space-y-5 lg:space-y-6">
              <div class="space-y-5">
                <div>
                  <FormField label="Password" id="password" :error="errors.password">
                    <InputPassword
                      id="password"
                      :variant="errors.password ? 'error' : 'primary'"
                      v-model="data.password"
                      class="w-full"
                      placeholder="Enter password at least 6 characters"
                    >
                    </InputPassword>
                  </FormField>
                </div>

                <div>
                  <FormField
                    label="Confirm password"
                    id="password_confirmation"
                    :error="errors.password_confirmation"
                  >
                    <InputPassword
                      id="password_confirmation"
                      :variant="errors.password_confirmation ? 'error' : 'primary'"
                      v-model="data.password_confirmation"
                      class="w-full"
                      placeholder="Re-enter the password accurately"
                    >
                    </InputPassword>
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
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reset-password-bg {
  background-image: url('@/assets/images/forgot-password-bg.webp');
}
</style>
