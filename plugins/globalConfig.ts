export default defineNuxtPlugin(() => {
  return {
    provide: {
      globalConfig: {
        title: 'Nuxt Base',
      },
    },
  };
});
