<script setup lang="ts">
import * as yup from 'yup';

const accountStore = useAccountStore();

const { $toast, $globalConfig } = useNuxtApp();
const { isLogged } = storeToRefs(accountStore);

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Field is required.'),
});

const errors = ref<{ [key: string]: string }>({});

const data = ref({
  email: '',
});

if (isLogged.value) {
  data.value.email = accountStore?.profile?.email || '';
}

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

  const { error } = await useCustomFetch('forgot-password', {
    method: 'POST',
    body: {
      email: data.value.email,
    },
  });

  const newError = getResponseError(error.value);

  if (newError) {
    return $toast.error(newError?.message || 'Forgot password fails');
  }

  $toast.success(
    'Forgot password successful. Please access your email to verify account information and start using the system.'
  );

  if (!isLogged.value) {
    data.value.email = '';
  }

  isLoading.value = false;
};

definePageMeta({
  layout: 'auth',
});

useSeoMeta({
  title: () => $globalConfig.title + ' | Forgot password',
  ogTitle: () => $globalConfig.title + ' | Forgot password',
  // description: 'This is my amazing site, let me tell you all about it.',
  // ogDescription: 'This is my amazing site, let me tell you all about it.',
  // twitterCard: 'summary_large_image',
});
</script>
<template>
  <div class="bg-white">
    <div class="flex justify-center forgot-password-bg bg-no-repeat bg-top min-h-screen">
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
                  :src="$icon.render('lock-close')"
                  class="svg-line text-gray-700"
                ></Icon>
              </div>
            </div>
            <h2 class="text-gray-900 font-extrabold text-xl lg:text-3xl">Forgot password?</h2>
            <p class="text-sm lg:text-base mt-2 text-gray-500">
              No worries, just follow our process
            </p>
          </div>

          <div class="mt-4 lg:mt-8">
            <div class="space-y-5 lg:space-y-6">
              <div class="space-y-5">
                <ClientOnly>
                  <FormField label="Email" id="email" :error="errors.email">
                    <Input
                      :variant="errors.email ? 'error' : 'primary'"
                      id="email"
                      v-model.trim="data.email"
                      class="w-full"
                      placeholder="Enter your email"
                      :disabled="isLogged"
                    >
                    </Input>
                  </FormField>
                </ClientOnly>
              </div>

              <div class="space-y-4">
                <Button
                  :disabled="isLoading"
                  :isLoading="isLoading"
                  class="w-full"
                  type="submit"
                  variant="purple"
                  @click="onSubmit"
                >
                  Reset password
                </Button>
              </div>

              <div
                class="text-sm text-gray-700 font-medium flex items-center justify-center lg:!mt-8"
                v-if="!isLogged"
              >
                <NuxtLink to="/login" class="flex items-center">
                  <Icon
                    width="24"
                    height="24"
                    :src="$icon.render('arrow-left')"
                    class="svg-line text-gray-700 mr-2"
                  ></Icon>
                  Back to login
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.forgot-password-bg {
  background-image: url('@/assets/images/forgot-password-bg.webp');
}
</style>
