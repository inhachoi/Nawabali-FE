import { createWithEqualityFn } from 'zustand/traditional';
import { Cookies } from 'react-cookie';
import { AuthState, AuthUser } from '@/interfaces/user/user.interface';
import { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export const useAuthStore = createWithEqualityFn<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  messages: [],
  hasNotifications: false,

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

  login: (user: AuthUser) => {
    localStorage.setItem('district', JSON.stringify(user.district));
    localStorage.setItem(
      'profileImageUrl: ',
      JSON.stringify(user.profileImageUrl),
    );
    localStorage.setItem('rankName: ', JSON.stringify(user.rankName));
    localStorage.setItem(
      'totalLikesCount: ',
      JSON.stringify(user.totalLikesCount),
    );
    localStorage.setItem(
      'totalLocalLikesCount: ',
      JSON.stringify(user.totalLocalLikesCount),
    );
    localStorage.setItem('nickname: ', JSON.stringify(user.nickname));
    set({ isLoggedIn: true, user });
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

  addMessage: (message: any) =>
    set((state) => ({
      messages: [...state.messages, message],
      hasNotifications: true,
    })),

  setHasNotifications: (hasNotifications: boolean) => {
    set({ hasNotifications });
  },
}));

export default useAuthStore;

function SSEListener() {
  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_APP_BASE_URL}/sub/notification/subscibe`,
    );
    console.log('알림구독 완료!');

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      useAuthStore.getState().addMessage(newMessage);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return null;
}

function initializeUser(navigate: NavigateFunction) {
  const cookie = new Cookies();

  const accessToken = cookie.get('accessToken');
  console.log('쿠키에서 읽은 토큰:', accessToken);

  const storedUser = localStorage.getItem('user');
  if (accessToken && storedUser) {
    const user: AuthUser = JSON.parse(storedUser);
    useAuthStore.getState().login(user);
    navigate('/');
  } else {
    useAuthStore.getState().logout();
  }
}

function AppInitializer() {
  const navigate = useNavigate();

  console.log('AppInitializer 실행');
  initializeUser(navigate);

  return <SSEListener />;
}

export { AppInitializer };
