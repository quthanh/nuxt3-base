<script setup lang="ts">
const limit = ref(48);
const route = useRoute();
const query = route.query;
const page = ref<string>(query?.page ? String(query?.page) : '1');

const { data, pending: isLoading } = await useCustomFetch(`products`, {
  method: 'GET',
  params: {
    limit: limit,
    page: page,
  },
  watch: [page],
  lazy: true,
});

const products = computed(() => getResponseData(data.value)?.data);
const total = computed(() => getResponseData(data.value)?.total);

const buildQuery = () => {
  return {
    page: page.value && page.value !== '1' ? page.value : undefined,
  };
};

const changePage = (currentPage: number) => {
  page.value = String(currentPage);
  useRouteQueryUrl(buildQuery());

  scrollToTop();
};

const { $globalConfig } = useNuxtApp();

useSeoMeta({
  title: () => $globalConfig.title + ' | Products',
  ogTitle: () => $globalConfig.title + ' | Products',
  // description: 'This is my amazing site, let me tell you all about it.',
  // ogDescription: 'This is my amazing site, let me tell you all about it.',
  // twitterCard: 'summary_large_image',
});
</script>
<template>
  <div class="py-10 lg:py-[60px]">
    <div class="mb-6 lg:mb-10 text-center">
      <h3 class="text-2xl lg:text-4xl font-extrabold text-gray-900 mb-4">Products</h3>
    </div>
    <div class="p-6 lg:px-8">
      <div>
        <div
          class="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6"
        >
          <div v-if="isLoading" v-for="i in 6" class="bg-gray-100 animate-pulse p-6 rounded-md">
            <h3
              class="text-gray-900 text-2xl font-semibold text-center mb-3 lg:mb-6 line-clamp-1 h-8"
            ></h3>
            <div class="h-[180px] 2xl:h-[200px]"></div>
          </div>
          <template v-else>
            <div v-for="(item, index) in products" :key="index">
              <div class="">
                <NuxtLink :to="'/products/' + item.id">
                  <div
                    class="p-6 bg-white border border-gray-300 cursor-pointer rounded-md overflow-hidden"
                  >
                    <h3
                      class="text-gray-900 text-2xl font-semibold text-center mb-3 lg:mb-6 line-clamp-1"
                    >
                      {{ item?.name }}
                    </h3>
                    <div class="h-[180px] 2xl:h-[200px] flex items-center justify-center">
                      <img
                        :src="item.full_thumbnail_url"
                        class="max-h-full max-w-full"
                        :alt="item?.name || $globalConfig.title"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>

        <div class="mt-6 lg:mt-7 py-3 border-t border-gray-200" v-if="total">
          <Pagination v-model="page" :totalItems="total || 0" :perPage="limit" @change="changePage">
          </Pagination>
        </div>
      </div>
    </div>
  </div>
</template>
