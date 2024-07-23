<script setup lang="ts">
const route = useRoute();
const routeName = String(route.name);

const sidebarItems = [
  {
    label: 'My account',
    name: 'profile',
    query: {},
    allowRoutes: [],
    iconName: 'account',
    iconClass: 'svg-line',
  },

  {
    label: 'Menu Parent',
    name: 'index',
    allowRoutes: [],
    iconName: 'gallery',
    children: [
      {
        label: 'SubMenu',
        name: 'index',
        allowRoutes: [],
      },
    ],
  },
];

const items = computed(() => {
  return sidebarItems;
});
</script>

<template>
  <div class="space-y-4">
    <ul class="space-y-4">
      <li v-for="(item, index) in items">
        <NuxtLink
          :to="{ name: item.name, query: item?.query || {}, params: item?.params || {} }"
          :key="index"
          class="text-sm font-medium text-gray-500 py-2 px-3 rounded-md cursor-pointer flex justify-between group hover:text-purple-700"
          :class="{
            'bg-purple-100 text-purple-700':
              (item.name === routeName && !item?.children) ||
              (!item?.children &&
                item?.allowRoutes?.length &&
                item?.allowRoutes?.includes(routeName)),
          }"
        >
          <div class="flex items-center gap-2">
            <!-- setting -->
            <div v-if="item.iconName">
              <Icon
                :class="[
                  {
                    '!text-purple-700':
                      (item.name === routeName && !item?.children) ||
                      (!item?.children &&
                        item?.allowRoutes?.length &&
                        item?.allowRoutes?.includes(routeName)),
                  },
                  item.iconClass,
                ]"
                class="text-gray-500 group-hover:text-purple-700"
                :width="item?.size || 20"
                :height="item?.size || 20"
                :src="$icon.render(item.iconName)"
              ></Icon>
            </div>
            <div>
              {{ item.label }}
            </div>
          </div>

          <div v-if="item?.children">
            <Icon
              :src="$icon.render('down')"
              class="!text-icon-default svg-line"
              :class="{ '-rotate-180': item?.children?.map((c: any) => c.name)?.includes(routeName) }"
            ></Icon>
          </div>
        </NuxtLink>

        <ul
          v-if="
            (item?.children?.length && item?.children?.map((c: any) => c.name).includes(routeName)) ||
            (item?.children?.length &&
              item?.allowRoutes?.length &&
              item?.allowRoutes?.includes(routeName))
          "
          class="pl-3 pt-3 space-y-2"
        >
          <li v-for="(children, indexC) in item.children">
            <NuxtLink
              :to="{
                name: children.name,
                query: children?.query || {},
                params: children?.params || {},
              }"
              :key="indexC"
              class="text-sm font-medium text-gray-500 py-2 px-3 rounded-md cursor-pointer flex hover:text-purple-700"
              :class="{
                'bg-purple-100 text-purple-700':
                  children.name === routeName ||
                  (children?.allowRoutes?.length && children?.allowRoutes?.includes(routeName)),
              }"
            >
              {{ children.label }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
