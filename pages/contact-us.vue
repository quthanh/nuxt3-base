<script setup lang="ts">
import * as yup from 'yup';

const { $toast, $globalConfig } = useNuxtApp();

const schema = yup.object({
  name: yup.string().required('Field is required.'),
  email: yup.string().email('Invalid email').required('Field is required.'),
  subject_id: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .required('Field is required.'),
  message: yup.string().required('Field is required.'),
  department_type: yup.string().required('Field is required.'),
});

const errors = ref<{ [key: string]: string }>({});
const isLoading = ref(false);

const departments = ref([
  { label: 'Licensing', val: 'licensing' },
  { label: 'Wholesale', val: 'wholesale' },
]);

const setDefaultForm = () => {
  return {
    name: '',
    email: '',
    subject_id: '',
    message: '',
    department_type: '',
  };
};

const form = ref(setDefaultForm());

watch(
  () => form.value,
  () => {
    errors.value = {};
  },
  { deep: true }
);

const { data } = await useCustomFetch('/contacts/subjects');

const subjects = computed(() => (data.value as any)?.data);

const subjectIds = computed(
  () => (subjects.value?.length && subjects.value?.map((item: any) => item.id)) || []
);

const onSubmit = async () => {
  errors.value = await validateForm(schema, form.value);

  if (Object.keys(errors.value).length) {
    return;
  }

  isLoading.value = true;

  const { error } = await useCustomFetch('/contacts/submit', {
    method: 'POST',
    body: form.value,
  });

  const newError = getResponseError(error.value);

  if (newError) {
    return $toast.error(newError?.message || 'Contact us fails');
  }

  $toast.success(`Thank you for reaching out. We'll respond as soon as possible.`);
  form.value = setDefaultForm();

  isLoading.value = false;
};

const customLabelSubject = (val: string) => {
  return subjects.value?.find((c: any) => c.id === val)?.title;
};

const customLabelDepartment = (val: string) => {
  return departments.value?.find((c: any) => c.val === val)?.label;
};

useSeoMeta({
  title: () => $globalConfig.title + ' | Contact us',
  ogTitle: () => $globalConfig.title + ' | Contact us',
  // description: 'This is my amazing site, let me tell you all about it.',
  // ogDescription: 'This is my amazing site, let me tell you all about it.',
  // twitterCard: 'summary_large_image',
});
</script>
<template>
  <div class="py-10 lg:py-[60px] relative md:min-h-[calc(100vh-490px)]">
    <div class="main-container">
      <div class="max-w-[800px] mx-auto">
        <div class="text-center">
          <h2 class="text-gray-900 text-4xl font-extrabold">Contact us</h2>
        </div>

        <div class="mt-6 lg:mt-10 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormField label="Name" id="name" :error="errors.name">
                <Input
                  id="name"
                  :variant="errors.name ? 'error' : 'primary'"
                  v-model.trim="form.name"
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
          </div>

          <div>
            <FormField label="Department" id="department_type" :error="errors.department_type">
              <Select
                placeholder="Select department"
                :options="departments?.map((item) => item.val)"
                :allowEmpty="false"
                :showSearch="false"
                :hasError="errors.department_type ? true : false"
                :customLabel="customLabelDepartment"
                :isRefresh="true"
                v-model="form.department_type"
              ></Select>
            </FormField>
          </div>

          <div>
            <FormField label="Subject" id="subject_id" :error="errors.subject_id">
              <Select
                placeholder="Select subject"
                :options="subjectIds"
                :allowEmpty="false"
                :showSearch="false"
                :hasError="errors.subject_id ? true : false"
                :customLabel="customLabelSubject"
                :isRefresh="true"
                v-model="form.subject_id"
              ></Select>
            </FormField>
          </div>

          <div>
            <FormField
              label="Message (You can leave your phone number and we'll call you back)"
              id="message"
              :error="errors.message"
            >
              <Textarea
                id="message"
                :variant="errors.message ? 'error' : 'primary'"
                :value="form.message"
                v-model.trim="form.message"
                class="w-full min-h-[120px]"
              >
              </Textarea>
            </FormField>
          </div>

          <div class="flex justify-end">
            <Button
              variant="purple"
              class="min-w-[120px]"
              :disabled="isLoading"
              :isLoading="isLoading"
              @click="onSubmit"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
