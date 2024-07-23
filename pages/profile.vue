<script setup lang="ts">
import ChangePasswordModal from '~/core/modules/my-account/components/ChangePasswordModal.vue';
import * as yup from 'yup';
import { equals } from 'ramda';

const accountStore = useAccountStore();

const { $toast } = useNuxtApp();

const schema = yup.object({
  first_name: yup.string().required('Field is required.'),
  last_name: yup.string().required('Field is required.'),
  phone: yup
    .string()
    // .test('is-phone', 'Phone invalid.', (val) => {
    //   if (val) {
    //     return /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i.test(val.toString());
    //   }
    //   return true;
    // })
    .nullable(),
  email: yup.string().email('Invalid email').required('Field is required.'),
});

const errors = ref<{ [key: string]: string }>({});
const isLoading = ref(false);
const isShowChangePasswordModal = ref(false);

const form = ref({
  first_name: accountStore?.profile?.first_name,
  last_name: accountStore?.profile?.last_name,
  phone: accountStore?.profile?.phone,
  email: accountStore?.profile?.email,
});

const isChange = computed(() => {
  const cacheData = {
    first_name: accountStore?.profile?.first_name,
    last_name: accountStore?.profile?.last_name,
    phone: accountStore?.profile?.phone,
    email: accountStore?.profile?.email,
  };

  return !equals(cacheData, form.value);
});

watch(
  () => form.value,
  () => {
    errors.value = {};
  },
  { deep: true }
);

const updateProfile = async () => {
  errors.value = await validateForm(schema, form.value);

  if (Object.keys(errors.value).length) {
    return;
  }

  isLoading.value = true;

  const { error } = await useCustomFetch('update-profile', {
    method: 'POST',
    body: form.value,
  });

  const newError = getResponseError(error.value);

  if (newError) {
    return $toast.error(newError?.message || 'Update profile fails');
  }

  $toast.success('Update profile successful');

  accountStore.getProfile();

  isLoading.value = false;
};

definePageMeta({
  layout: 'user',
  middleware: ['has-login'],
});
</script>
<template>
  <UserLayout>
    <div class="flex flex-col justify-end gap-6">
      <div class="shadow-sm border border-gray-300 rounded-2xl p-6">
        <div class="space-y-5">
          <h3 class="text-lg font-semibold text-gray-900">Account data</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField label="Phone number" id="phone" :error="errors.phone" :optional="true">
              <Input
                id="phone"
                v-model="form.phone"
                class="w-full"
                placeholder="+1 (555) 987-6543"
                :variant="errors.phone ? 'error' : 'primary'"
              >
              </Input>
            </FormField>

            <FormField label="Email" :error="errors.email">
              <Input id="email" v-model.trim="form.email" class="w-full" disabled> </Input>
            </FormField>
          </div>
        </div>

        <div class="space-y-5 mt-6 pt-6 border-t border-gray-300">
          <h3 class="text-lg font-semibold text-gray-900">Password</h3>
          <Button variant="white" @click="isShowChangePasswordModal = true"> Change </Button>
        </div>
      </div>

      <div class="flex justify-end">
        <Button
          class="min-w-[100px]"
          variant="purple"
          @click="updateProfile"
          :disabled="isLoading || !isChange"
          :isLoading="isLoading"
        >
          Save
        </Button>
      </div>
    </div>
  </UserLayout>

  <ChangePasswordModal
    v-if="isShowChangePasswordModal"
    @onClose="isShowChangePasswordModal = false"
  />
</template>
