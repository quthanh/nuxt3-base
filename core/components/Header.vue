<script setup lang="ts">
import logo from '@/assets/images/logo.webp';

const accountStore = useAccountStore();
const route = useRoute();
const showMenu = ref(false);

const { isLogged } = storeToRefs(accountStore);

const closeModal = () => {
  showMenu.value = false;
  document.body.classList.remove('overflow-hidden');
};

const showModal = () => {
  document.body.classList.add('overflow-hidden');
};

const menuWhenLogin = ref([
  {
    label: 'My account',
    path: '/profile',
  },
]);
</script>

<template>
  <!-- Menu mobile -->
  <div class="lg:hidden h-[58px] px-5 sticky top-0 bg-white z-[100] border-b border-gray-200">
    <div class="flex items-center justify-between h-full w-full">
      <NuxtLink to="/" class="flex items-center flex-col">
        <div class="w-6 h-6 flex items-center justify-center">
          <Icon
            width="24"
            height="24"
            :src="$icon.render('house')"
            class="text-gray-600 svg-line"
            :class="{
              '!text-purple-700': route.name === 'index',
            }"
          ></Icon>
        </div>

        <div
          class="text-xs text-gray-700 font-medium"
          :class="{
            'text-purple-700': route.name === 'index',
          }"
        >
          Home
        </div>
      </NuxtLink>

      <div
        class="flex items-center flex-col cursor-pointer"
        @click="
          showMenu = true;
          showModal();
        "
      >
        <div class="w-6 h-6 flex items-center justify-center">
          <Icon width="24" height="24" :src="$icon.render('menu')" class="text-gray-700"></Icon>
        </div>

        <div class="text-xs text-gray-700 font-medium">Menu</div>
      </div>
    </div>
  </div>

  <div
    class="fixed top-0 right-0 w-full z-[101] bg-white h-full transition-all duration-300 ease-in-out delay-200 transform"
    :class="{
      '-translate-x-0': showMenu,
      'translate-x-full': !showMenu,
    }"
  >
    <div class="h-[58px] px-5 border-b border-gray-200 flex items-center justify-between bg-black">
      <NuxtLink to="/" @click="closeModal">
        <img alt="Logo" :src="logo" loading="lazy" class="max-h-[46px]" />
      </NuxtLink>
      <div class="cursor-pointer" @click="closeModal">
        <Icon
          width="24"
          height="24"
          class="svg-line !text-gray-500"
          :src="$icon.render('close')"
        ></Icon>
      </div>
    </div>
    <div class="h-[calc(100%-58px)] relative">
      <div class="h-full">
        <div class="space-y-6 h-[calc(100%-85px)] overflow-y-auto px-5 py-6">
          <ClientOnly>
            <div v-if="isLogged">
              <div class="space-x-3 flex items-center">
                <div
                  class="w-12 h-12 rounded-full"
                  style="
                    background: linear-gradient(
                      180deg,
                      #faf743 12.5%,
                      #88f026 44.79%,
                      #84eaa0 70.31%,
                      #7de2ee 100%
                    );
                  "
                ></div>
                <div class="text-base text-gray-900 font-medium max-w-[120px] line-clamp-1">
                  {{ accountStore?.profile?.first_name }} {{ accountStore?.profile?.last_name }}
                </div>
              </div>
            </div>
          </ClientOnly>

          <div>
            <ul class="space-y-5">
              <ClientOnly>
                <template v-if="isLogged">
                  <template v-for="menuItem in menuWhenLogin">
                    <li>
                      <div class="border-t border-gray-200"></div>
                    </li>
                    <li class="flex w-full">
                      <NuxtLink
                        @click="closeModal"
                        :to="menuItem.path"
                        class="text-base text-gray-700 font-medium cursor-pointer"
                      >
                        {{ menuItem.label }}
                      </NuxtLink>
                    </li>
                  </template>
                </template>
              </ClientOnly>
            </ul>
          </div>
        </div>

        <ClientOnly>
          <div class="fixed w-full bottom-6 px-5">
            <div v-if="isLogged">
              <Button
                variant="danger-outline"
                class="!text-red-700 !bg-white !border-gray-300 font-medium w-full"
                @click="
                  closeModal();
                  accountStore.logout();
                "
              >
                Logout
              </Button>
            </div>
            <div class="grid grid-cols-2 items-center gap-3 w-full" v-else>
              <NuxtLink to="/register" @click="closeModal()">
                <Button class="w-full" variant="purple">Sign up </Button>
              </NuxtLink>
              <NuxtLink to="/login" class="" @click="closeModal()">
                <Button class="w-full" variant="white">Sign in</Button>
              </NuxtLink>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>

  <!-- Menu Desktop -->
  <div
    class="px-6 xl:px-8 items-center justify-between hidden lg:flex z-[100] gap-8 relative w-full overflow-hidden h-[92px] border-b border-gray-200"
  >
    <NuxtLink to="/">
      <img class="max-h-[60px]" :alt="$globalConfig.title" :src="logo" loading="lazy" />
    </NuxtLink>

    <div class="flex items-center space-x-4 2xl:space-x-8">
      <ClientOnly>
        <template v-if="isLogged">
          <div class="">
            <Dropdown
              contentClasses="!p-0 w-[224px]"
              placement="bottom-right"
              :iconClass="'text-gray-400'"
            >
              <template v-slot:content="{ onClose }">
                <div class="">
                  <NuxtLink
                    :to="menuItem.path"
                    @click="onClose"
                    v-for="(menuItem, index) in menuWhenLogin"
                    :key="index"
                  >
                    <div
                      class="text-sm text-gray-700 cursor-pointer px-4 py-3 border-t border-gray-100 hover:text-purple-600"
                    >
                      {{ menuItem.label }}
                    </div>
                  </NuxtLink>

                  <div
                    class="text-sm text-red-700 cursor-pointer px-4 py-3 border-t border-gray-100 hover:text-red-500"
                    @click="accountStore.logout()"
                  >
                    Log out
                  </div>
                </div>
              </template>
              <template #title>
                <div class="space-x-2 flex items-center">
                  <div
                    class="w-8 h-8 rounded-full"
                    style="
                      background: linear-gradient(
                        180deg,
                        #faf743 12.5%,
                        #88f026 44.79%,
                        #84eaa0 70.31%,
                        #7de2ee 100%
                      );
                    "
                  ></div>
                  <div class="text-base font-medium max-w-[120px] line-clamp-1">
                    {{ accountStore?.profile?.first_name }} {{ accountStore?.profile?.last_name }}
                  </div>
                </div>
              </template>
            </Dropdown>
          </div>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="font-medium text-base text-gray-700 hover:text-purple-700">
            Sign in
          </NuxtLink>
          <NuxtLink to="/register">
            <Button :variant="'purple'">Sign up </Button>
          </NuxtLink>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>
