import { createBrowserRouter } from 'react-router';
import { Suspense, lazy } from 'react';
import App from '@/app/app';
import RequestSuspense from '@/components/request-suspense/request-suspense';

const HomePage = lazy(() => import('@/pages/home/home'));
const EditPage = lazy(() => import('@/pages/edit/edit'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RequestSuspense />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <Suspense fallback={<RequestSuspense />}>
            <EditPage />
          </Suspense>
        ),
      },
    ],
  },
]);
