import React, { Suspense } from 'react'
import { Outlet, createBrowserRouter } from 'react-router-dom'

// Pages
import Root from '@/pages/Root'
import Error from '@/pages/Errors/Error'
import LoadingProgress from '@/components/LoadingProgress'
import { SocketProvider } from '@/context/SocketContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/auth',
    element: (
      <Suspense fallback={<LoadingProgress />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: 'login',
        Component: React.lazy(() => import('@/pages/Login'))
      }
    ]
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingProgress />}>
        <SocketProvider>
          <Outlet />
        </SocketProvider>
      </Suspense>
    ),
    children: [
      {
        path: 'coding',
        Component: React.lazy(() => import('@/pages/Coding'))
      },
      {
        path: 'create',
        Component: React.lazy(() => import('@/pages/Create'))
      },
      {
        path: 'join',
        Component: React.lazy(() => import('@/pages/Join'))
      },
      {
        path: 'results',
        Component: React.lazy(() => import('@/pages/Results'))
      },
      {
        path: 'start',
        Component: React.lazy(() => import('@/pages/Start'))
      }
    ]
  },
  {
    path: '*',
    element: <Error />
  }
])

export default router
