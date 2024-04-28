import { createWithEqualityFn } from 'zustand/traditional';
import { Cookies } from 'react-cookie';
import { AuthState } from '@/interfaces/user/user.interface';

export const useAuthStore = createWithEqualityFn<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

  initializeLoginState: () => {
    const cookies = new Cookies();
    try {
      const accessToken = cookies.get('accessToken');
      const userJson = localStorage.getItem('user');
      if (accessToken && userJson) {
        const user = JSON.parse(userJson);
        set({
          isLoggedIn: true,
          user,
        });
      }
    } catch (error) {
      console.error('Failed to initialize login state:', error);
    }
  },

  login: () => {
    set({ isLoggedIn: true });
  },

  logout: () => {
    localStorage.clear();
    new Cookies().remove('accessToken');
    set({ isLoggedIn: false, user: null });
    alert('로그아웃 성공!');
  },

  setIsLoggedIn: (isLoggedIn: boolean) => {
    set({ isLoggedIn });
  },
}));

export default useAuthStore;
