<template>
  <div v-html="icon"></div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    class?: string;
  }>(),
  { class: 'w-5 h-5 text-gray-700' }
);

const icon = ref();

const getIcon = async () => {
  try {
    if (!props.name || !process.client) return;

    const iconsImport = import.meta.glob(`assets/svg-icon/**/**.svg`, {
      query: '?raw',
      import: 'default',
      eager: false,
    });

    const rawIcon = await iconsImport[`/assets/svg-icon/${props.name}.svg`]();

    if (!rawIcon) return;

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(rawIcon as string, 'image/svg+xml');
    const svgElement = svgDoc.querySelector('svg');

    if (!svgElement) {
      return console.error('Invalid SVG');
    }

    if (props.class) svgElement.setAttribute('class', props.class);

    icon.value = svgDoc.documentElement.outerHTML;
  } catch (e) {
    console.error(`Icon '${props.name}' doesn't exist in 'assets/svg-icon'`);
  }
};

getIcon();

watchEffect(async () => {
  getIcon();
});
</script>
