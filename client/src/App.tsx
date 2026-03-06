import "./i18n";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { Toaster } from "@/shared/ui/sonner";

import {
  CreateProjectPage,
  DashboardPage,
  NotFoundPage,
  HomePage,
  LoginPage,
  TrashPage,
  AdminLayout,
  protectedLoader,
} from "@/features";

import { setupAxiosInterceptor } from "@/shared/config";

import "./App.css";
import { useEffect } from "react";

setupAxiosInterceptor();

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "login", element: <LoginPage /> },
  {
    id: "admin",
    path: "admin",
    element: <AdminLayout />,
    loader: protectedLoader,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "trash", element: <TrashPage /> },
      { path: "projects/add", element: <CreateProjectPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" expand={true} richColors theme="light" />
    </>
  );
}

export default App;
