// import { useRoutes } from 'react-router-dom';

// // routes
// import MainRoutes from './MainRoutes';
// import AuthenticationRoutes from './AuthenticationRoutes';

// // ==============================|| ROUTING RENDER ||============================== //

// export default function ThemeRoutes() {
//   return useRoutes([MainRoutes, AuthenticationRoutes]);
// }

import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import ProtectedRoute from 'routes/ProtectedRoute';
import MainRoutes from './MainRoutes';
import Loadable from 'component/Loadable';
import { lazy } from 'react';

// Lazy load the SignIn component
const SignIn = Loadable(lazy(() => import('component/Login/sign-in')));

export default function ThemeRoutes() {
  const routes = [
    {
      path: '/auth/login',
      element: <SignIn />
    },
    {
      path: '/',
      element: <ProtectedRoute>{MainRoutes.element}</ProtectedRoute>,
      children: MainRoutes.children
    },
    { path: '*', element: <Navigate to="/auth/login" /> }
  ];

  return useRoutes(routes);
}
