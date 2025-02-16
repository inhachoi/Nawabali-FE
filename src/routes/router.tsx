import GlobalStyles from '@/styles/GlobalStyle';
import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import React, { Suspense } from 'react';

// React.lazy로 컴포넌트를 동적 import
const EditUser = React.lazy(() => import('@/components/mypage/EditUser'));
const Mypage = React.lazy(() => import('@/pages/Mypage'));
const ListPage = React.lazy(() => import('@/pages/ListPage'));
const MapPage = React.lazy(() => import('@/pages/MapPage'));
const NewsPage = React.lazy(() => import('@/pages/NewsPage'));
const ScorePage = React.lazy(() => import('@/pages/ScorePage'));
const ChatMain = React.lazy(() => import('@/pages/ChatPage'));
const OtherUserPage = React.lazy(() => import('@/pages/OtherUserPage'));
const SearchResponsePage = React.lazy(
  () => import('@/pages/SearchResponsePage'),
);

export const router = createBrowserRouter([
  {
    element: (
      <>
        <Suspense fallback={<div>로딩중...</div>}>
          <GlobalStyles />
          <App />
        </Suspense>
      </>
    ),
    children: [
      {
        path: '/',
        element: <MapPage />,
      },
      {
        path: '/listpage',
        element: <ListPage />,
      },
      {
        path: '/newspage',
        element: <NewsPage />,
      },
      {
        path: '/scorepage',
        element: <ScorePage />,
      },
      {
        path: '/mypage/edit',
        element: <EditUser />,
      },
      {
        path: '/mypage',
        element: <Mypage />,
      },
      {
        path: '/chat',
        element: <ChatMain />,
      },
      // {
      //   path: '/*',
      //   element: <MapPage />,
      // },
      {
        path: '/userProfile/:nickname',
        element: <OtherUserPage />,
      },
      {
        path: '/search/:keyword',
        element: <SearchResponsePage />,
      },
    ],
  },
]);
export default router;
