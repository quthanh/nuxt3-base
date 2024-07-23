<script setup lang="ts">
import * as yup from 'yup';
import logo from '@/assets/images/logo.webp';

const { $toast, $globalConfig } = useNuxtApp();

const schema = yup.object({
  first_name: yup.string().required('Field is required.'),
  last_name: yup.string().required('Field is required.'),
  email: yup.string().email('Invalid email').required('Field is required.'),
  password: yup.string().required('Field is required.'),
  password_confirmation: yup
    .string()
    .required('The field is required.')
    .min(6, 'Password must be at least 6 characters')
    .oneOf([yup.ref('password'), ''], 'Confirm password same password'),
});

const errors = ref<{ [key: string]: string }>({});

const defaultData = () => {
  return {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };
};

const form = ref(defaultData());

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

  const { error } = await useCustomFetch('register', {
    method: 'POST',
    body: form.value,
  });

  const newError = getResponseError(error.value);

  if (newError) {
    return $toast.error(newError?.message || 'Register fails');
  }

  $toast.success(
    'Account registration successful. Please access your email to verify account information and start using the system.'
  );

  form.value = defaultData();

  isLoading.value = false;
};

definePageMeta({
  layout: 'auth',
  middleware: ['auth'],
});

useSeoMeta({
  title: () => $globalConfig.title + ' | Sign up',
  ogTitle: () => $globalConfig.title + ' | Sign up',
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
            <h3 class="text-2xl lg:text-3xl font-extrabold text-gray-900">Sign up</h3>
            <div class="text-gray-500">Let the journey begin</div>
          </div>
          <div class="space-y-5">
            <div>
              <FormField label="First name" id="first_name" :error="errors.first_name">
                <Input
                  id="first_name"
                  :variant="errors.first_name ? 'error' : 'primary'"
                  v-model.trim="form.first_name"
                  class="w-full"
                >
                </Input>
              </FormField>
            </div>

            <div>
              <FormField label="Last name" id="last_name" :error="errors.last_name">
                <Input
                  id="last_name"
                  :variant="errors.last_name ? 'error' : 'primary'"
                  v-model.trim="form.last_name"
                  class="w-full"
                >
                </Input>
              </FormField>
            </div>

            <div>
              <FormField label="Email" id="email" :error="errors.email">
                <Input
                  id="email"
                  :variant="errors.email ? 'error' : 'primary'"
                  v-model.trim="form.email"
                  class="w-full"
                >
                </Input>
              </FormField>
            </div>

            <div>
              <FormField label="Password" id="password" :error="errors.password">
                <InputPassword
                  id="password"
                  :variant="errors.password ? 'error' : 'primary'"
                  v-model="form.password"
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
                  v-model="form.password_confirmation"
                  class="w-full"
                  placeholder="Re-enter the password accurately"
                >
                </InputPassword>
              </FormField>
            </div>
          </div>

          <div class="space-y-4">
            <div class="text-sm text-gray-500">
              By sign up, you agree to our
              <NuxtLink
                to="/terms-and-conditions"
                class="text-purple-600 font-medium cursor-pointer"
                target="_blank"
              >
                Terms and conditions
              </NuxtLink>
            </div>

            <Button
              :disabled="isLoading"
              class="w-full"
              type="submit"
              :isLoading="isLoading"
              variant="purple"
              @click="onSubmit"
            >
              Signup
            </Button>

            <LoginWithGoogle class="w-full" />
          </div>

          <div class="text-sm text-gray-500 text-center lg:!mt-8">
            Already have an account?
            <NuxtLink to="/login" class="text-purple-600 font-medium cursor-pointer">
              Login
            </NuxtLink>
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
