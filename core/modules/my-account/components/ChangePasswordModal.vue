<script lang="ts" setup>
import * as yup from 'yup';

const emit = defineEmits(['onClose']);
const { $toast } = useNuxtApp();

const onClose = () => {
  emit('onClose');
};

const isLoading = ref<boolean>(false);

const schema = yup.object({
  current_password: yup.string().required('Field is required.'),
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
    current_password: '',
    password: '',
    password_confirmation: '',
  };
};

const form = ref(defaultData());

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

  const { error } = await useCustomFetch('change-password', {
    method: 'POST',
    body: form.value,
  });

  const newError = getResponseError(error.value);

  if (newError) {
    return $toast.error(newError?.message || 'Update password fails');
  }

  $toast.success('Update password successful');

  emit('onClose');

  isLoading.value = false;
};
</script>
<template>
  <Modal size="small">
    <template #body>
      <div class="space-y-5">
        <div class="text-center">
          <h3 class="text-lg text-gray-900 font-medium">Change password</h3>
        </div>
        <div class="space-y-5">
          <FormField
            label="Current Password"
            :error="errors.current_password"
            id="current_password"
          >
            <InputPassword
              :variant="errors.password ? 'error' : 'primary'"
              id="current_password"
              v-model="form.current_password"
              class="w-full"
              placeholder="Enter current password accurately"
            >
            </InputPassword>

            <NuxtLink class="text-purple-600 text-sm font-medium mt-2" to="/forgot-password">
              Don’t remember your password?
            </NuxtLink>
          </FormField>

          <FormField label="New password" :error="errors.password" id="password">
            <InputPassword
              :variant="errors.password ? 'error' : 'primary'"
              id="password"
              v-model="form.password"
              class="w-full"
              placeholder="Enter password at least 6 characters"
            >
            </InputPassword>
          </FormField>

          <FormField
            label="Confirm password"
            :error="errors.password_confirmation"
            id="password_confirmation"
          >
            <InputPassword
              :variant="errors.password ? 'error' : 'primary'"
              id="password_confirmation"
              v-model="form.password_confirmation"
              class="w-full"
              placeholder="Re-enter the password accurately"
            >
            </InputPassword>
          </FormField>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex space-x-3 justify-end">
        <Button variant="white" class="min-w-[120px]" @click="onClose"> Cancel </Button>
        <Button
          class="min-w-[120px]"
          variant="purple"
          @click="onSubmit"
          :disabled="isLoading"
          :isLoading="isLoading"
        >
          Save
        </Button>
      </div>
    </template>
  </Modal>
</template>
