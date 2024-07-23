<script setup lang="ts">
import banner1 from '@/assets/images/banner1.webp';
import banner2 from '@/assets/images/banner2.webp';

const banner = ref([
  {
    src: banner1,
    path: '/',
  },
  {
    src: banner2,
    path: '/',
  },
]);
</script>

<template>
  <div>
    <NuxtErrorBoundary @error="() => {}">
      <div class="w-full">
        <Swiper
          class="section-banner"
          :modules="[SwiperEffectFade, SwiperPagination, SwiperAutoplay]"
          :slidesPerView="1"
          :autoplay="{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }"
          effect="fade"
          :fadeEffect="{
            crossFade: true,
          }"
          :pagination="{ clickable: true }"
          :speed="600"
          :loop="true"
          :autoHeight="true"
        >
          <SwiperSlide v-for="(item, index) in banner" :key="index">
            <NuxtLink
              :to="item.path || undefined"
              class="flex w-full relative bg-no-repeat bg-center bg-cover"
              :style="[
                {
                  backgroundImage: 'url(\'' + item.src + '\')',
                },
              ]"
            >
              <img :src="item.src" :alt="$globalConfig.title" class="opacity-0" />
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
      </div>
    </NuxtErrorBoundary>
  </div>
</template>

<style lang="scss">
.section-banner {
  .swiper-pagination {
    @apply items-center justify-center gap-3 bottom-3 flex lg:bottom-6;

    .swiper-pagination-bullet {
      @apply w-2 h-2 bg-white opacity-100 mx-0 px-0;

      &.swiper-pagination-bullet-active {
        @apply w-6 h-6 p-2 border border-white rounded-full bg-transparent relative shadow-sm;

        &:after {
          content: '';
          @apply w-3 h-3 bg-white absolute top-1/2 left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2;
        }
      }
    }
  }
}
</style>
