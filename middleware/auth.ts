export default defineNuxtRouteMiddleware(async (to) => {
  const accountStore = useAccountStore();
  const { isLogged } = storeToRefs(accountStore);

  if (isLogged.value && to.name && ['login', 'register'].includes(String(to.name))) {
    return (window.location.href = '/');
    // return navigateTo('/');
  }
});
