export default defineNuxtRouteMiddleware((to, from) => {
  const accountStore = useAccountStore();
  const { isLogged } = storeToRefs(accountStore);

  if (!isLogged.value && process.client) {
    return (window.location.href = '/');
    // return navigateTo('/');
  }
});
