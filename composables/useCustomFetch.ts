export const useCustomFetch = async (url: string, opts?: any) => {
  const API_BASE_URL = useRuntimeConfig()?.public?.apiBaseUrl;
  const account = useAccountStore();
  const token = account?.profile?.token || '';
  const router = useRouter();
  const route = useRoute();
  const { $toast } = useNuxtApp();

  return await useFetch(url, {
    ...opts,
    baseURL: API_BASE_URL,
    key: makeid(16),
    watch: opts?.watch || false,
    lazy: opts && 'lazy' in opts ? opts.lazy : true,
    headers: {
      authorization: 'Bearer ' + token,
      accept: 'application/json',
    },
    onResponseError({ response }) {
      if (response.status === 404) {
        throw showError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
      }

      if (response.status === 401) {
        account.logout();
        if (route.name && !['login', 'forgot-password'].includes(String(route.name))) {
          router.push('/');
        }
        return;
      }

      if (response.status === 500 && response?._data?.error?.message) {
        $toast.error(response?._data?.error?.message);
        return;
      }
    },
  });
};
