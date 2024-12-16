import type { User, LoginResponse, LoginCredentials } from '@/types';

export function useAuth() {
    const authModal = useAuthModal();
    const useAuthToken = () => useCookie<string | null>('auth_token');
    const useAuthUser = () => useState<User | null>('auth_user');
    // const useAuthLoading = () => useState('auth_loading', () => true);

    const setToken = (newToken: string | null) => {
        const authToken = useAuthToken();
        authToken.value = newToken;
    }

    const setUser = (newUser: User | null) => {
        const authUser = useAuthUser();
        authUser.value = newUser;
    }

    // const setLoading = (newLoading: boolean) => {
    //     const authLoading = useAuthLoading();
    //     authLoading.value = newLoading;
    // }

    async function fetchUser(id: number) {
        const token = useAuthToken().value;
        const user = await $fetch<User>(`/api/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return user;
    }
  
    async function login(credentials: LoginCredentials) {
      try {
        const response = await $fetch<LoginResponse>('/api/auth/login', {
          method: 'POST',
          body: credentials,
        });

        setToken(response.token);

        const userData = await fetchUser(response.user);

        setUser(userData);
        authModal.close();
        // await navigateTo('/');
      } catch (error) {
        console.error('useAuth login FAIL:', error);
        throw error;
      }
    }
  
    function logout() {
        setToken(null);
        setUser(null);
    }
  
    return { login, logout, useAuthUser };
  }
  