import React from "react"; // , { lazy, Suspense }

import { Navigate, useRoutes } from "react-router-dom";

//auth
import SignIn from "../pages/signIn/SignIn";
import Register from "../pages/register/Register";
import AuthGuard from "../guards/AuthGuard";
import LoginGuard from "../guards/LoginGuard";
import SignInSide from "../pages/signIn/SignIn2";
import ImageReSizer from "../pages/Image/ImageReSizer";
import Home from "../pages/LandingPage/Home";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/home",
      element: (
        <AuthGuard>
          <Home />
        </AuthGuard>
      ),
    },
    {
      path: "/weather",
      element: (
        <AuthGuard>
          <SignInSide />
        </AuthGuard>
      ),
    },
    {
      path: "/image",
      element: (
        <AuthGuard>
          <ImageReSizer />
        </AuthGuard>
      ),
    },
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <LoginGuard>
              <SignIn />
            </LoginGuard>
          ),
        },
        {
          path: "register",
          element: (
            <LoginGuard>
              <Register />
            </LoginGuard>
          ),
        },
        { path: "login-unprotected", element: <SignIn /> },
        { path: "register-unprotected", element: <Register /> },
      ],
    },
    { path: "/", element: <Navigate to="/home" replace /> },
    { path: "*", element: <h1>Not Found</h1> },
  ]);
}
