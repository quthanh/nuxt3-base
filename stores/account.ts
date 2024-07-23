import { defineStore } from 'pinia';
import type { AuthParams } from '~/core/modules/auth/type';

export type Profile = {
  first_name?: string;
  last_name?: string;
  token?: string;
  email?: string;
  team_id?: number;
  phone?: string;
};

export type Account = {
  profile?: Profile;
};

const initAccount: Account = {
  profile: {
    token: undefined,
  },
};

export const useAccountStore = defineStore({
  id: 'account',
  state: () => initAccount,
  getters: {
    isLogged: (state) => Boolean(state.profile?.token),
  },
  actions: {
    async login(params: AuthParams) {
      const { $toast } = useNuxtApp();
      const router = useRouter();

      const newData = {
        token: 'token here',
      };

      // const { data, error } = await useCustomFetch('auth', {
      //   method: 'POST',
      //   body: params,
      // });

      // const newError = getResponseError(error.value);
      // const newData = getResponseData(data.value);

      // if (newError) {
      //   if ('is_active' in newError && !newError.is_active) {
      //     $toast.error(newError?.message ?? 'Unverified account');

      //     router.push(`resend?email=${encodeURIComponent(params.email)}`);

      //     return;
      //   }

      //   return $toast.error(newError?.message || 'Invalid Email or Password');
      // }

      this.setToken(newData?.token);

      await this.getProfile();

      router.push('/');
    },

    async getProfile() {
      const { $toast } = useNuxtApp();

      // const { data, error } = await useCustomFetch('me', {
      //   params: 'GET',
      //   lazy: true,
      // });

      // const newError = getResponseError(error.value);
      // const newData = getResponseData(data.value);

      // if (newError) {
      //   return $toast.error(newError?.message || 'Fetch me fails.');
      // }

      // if (!newData) return;

      const newData = {
        first_name: 'nuxt',
        last_name: 'base',
        phone: '1995',
        email: 'email@gmai.com',
      };

      this.setProfile(newData);
    },

    logout() {
      const router = useRouter();
      const route = useRoute();

      this.profile = undefined;

      if (route.name && !['login', 'forgot-password'].includes(String(route.name))) {
        router.push('/');
      }
    },

    setToken(token: string) {
      this.profile = {
        token: token,
      };
    },

    setProfile(profile: any) {
      this.profile = {
        ...this.profile,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        email: profile.email,
        team_id: profile?.team_id,
      };
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
