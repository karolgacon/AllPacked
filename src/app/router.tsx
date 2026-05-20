import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/shared/layout/AppShell'
import { AuthShell } from '@/shared/layout/AuthShell'
import { PageViewTracker } from '@/shared/analytics/PageViewTracker'
import { PrivateRoute, PublicOnlyRoute } from '@/shared/routing/RouteGuards'
import {
  DashboardPage,
  ForgotPasswordPage,
  LoginPage,
  NewTripActivitiesPage,
  NewTripDatesPage,
  NewTripDestinationPage,
  NewTripOverviewPage,
  NewTripTransportPage,
  NotFoundPage,
  PackingListsPage,
  ProfilePage,
  RegisterPage,
  StatsPage,
} from '@/pages'

export const appRouter = createBrowserRouter([
  {
    element: (
      <>
        <PageViewTracker />
        <Outlet />
      </>
    ),
    children: [
      {
        element: (
          <>
            <PublicOnlyRoute />
          </>
        ),
        children: [
          {
            element: <AuthShell />,
            children: [
              { path: '/login', element: <LoginPage /> },
              { path: '/register', element: <RegisterPage /> },
              { path: '/forgot-password', element: <ForgotPasswordPage /> },
            ],
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <AppShell />,
            children: [
              { path: '/', element: <Navigate to="/dashboard" replace /> },
              { path: '/dashboard', element: <DashboardPage /> },
              { path: '/new-trip/destination', element: <NewTripDestinationPage /> },
              { path: '/new-trip/dates', element: <NewTripDatesPage /> },
              { path: '/new-trip/transport', element: <NewTripTransportPage /> },
              { path: '/new-trip/activities', element: <NewTripActivitiesPage /> },
              { path: '/new-trip/overview', element: <NewTripOverviewPage /> },
              { path: '/packing-lists', element: <PackingListsPage /> },
              { path: '/stats', element: <StatsPage /> },
              { path: '/profile', element: <ProfilePage /> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
