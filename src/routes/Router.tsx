import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Courts from "@/pages/Courts";
import AddCasePage from "@/pages/AddCasePage";
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const Home = lazy(() => import("../pages/Home"));
const Cases = lazy(() => import("../pages/Cases"));
const Members = lazy(() => import("../pages/Members"));
const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard/home" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // redirect /dashboard → /dashboard/home
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "cases",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Cases />
          </Suspense>
        ),
      },
      {
        path: "cases/create",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <AddCasePage />
          </Suspense>
        ),
      },
      {
        path: "members",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Members />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Settings />
          </Suspense>
        ),
      },
      {
        path: "courts",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Courts />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
