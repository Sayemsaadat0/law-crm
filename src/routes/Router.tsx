import {createBrowserRouter} from "react-router-dom"; 
// import PublicMain from "../components/layout/PublicMain";
import DashboardLayout from "../components/layout/DashboardLayout";
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('../pages/Home'));
// const About = lazy(() => import('../pages/About'));
const Cases = lazy(() => import('../pages/Cases'));
const Members = lazy(() => import('../pages/Members'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/cases',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Cases />
          </Suspense>
        ),
      },
      {
        path: '/members',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Members />
          </Suspense>
        ),
      },
      {
        path: '/profile',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: '/settings',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
 
]);

export default router