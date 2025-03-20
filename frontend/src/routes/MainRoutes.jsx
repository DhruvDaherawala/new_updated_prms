// import React, { lazy } from 'react';

// // project import
// import MainLayout from 'layout/MainLayout';
// import Loadable from 'component/Loadable';
// import PropertyMasterForm1 from 'component/PropertyMaster1/PropertyMasterForm1';
// import RenterMasterForm1 from 'component/RenterMaster1/RenterMasterForm1';
// import RentalAllocation from 'component/RentalAllocation/RentalAllocation';
// import ChildPropertyMasterForm from 'component/ChildProperty/ChildPropertyMasterForm';
// import SignIn from 'component/Login/sign-in';

// const DashboardDefault = Loadable(lazy(() => import('views/Dashboard/Default')));

// // ==============================|| MAIN ROUTES ||============================== //

// const MainRoutes = {
//   path: '/',
//   element: <MainLayout />,
//   children: [
//     {
//       path: '/',
//       element: <DashboardDefault />
//     },
//     {
//       path: '/dashboard/default',
//       element: <DashboardDefault />
//     },
//     // { path: '/utils/util-typography', element: <UtilsTypography /> },
//     { path: '/property-page', element: <PropertyMasterForm1 /> },
//     { path: '/renter-page', element: <RenterMasterForm1 /> },
//     { path: '/rental-allocation-page', element: <RentalAllocation /> },
//     { path: '/childproperty-page', element: <ChildPropertyMasterForm /> },
//     { path : '/auth/login', element: <SignIn />}
//   ]
// };

// export default MainRoutes;

import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';

// Lazy loaded pages for protected routes
const DashboardDefault = Loadable(lazy(() => import('views/Dashboard/Default')));
const PropertyMasterForm1 = Loadable(lazy(() => import('component/PropertyMaster1/PropertyMasterForm1')));
const RenterMasterForm1 = Loadable(lazy(() => import('component/RenterMaster1/RenterMasterForm1')));
const RentalAllocation = Loadable(lazy(() => import('component/RentalAllocation/RentalAllocation')));
const ChildPropertyMasterForm = Loadable(lazy(() => import('component/ChildProperty/ChildPropertyMasterForm')));

const MainRoutes = {
  // MainLayout will be shown for all authenticated routes
  element: <MainLayout />,
  children: [
    { path: '/', element: <Navigate to="/dashboard/default" /> },
    { path: '/dashboard/default', element: <DashboardDefault /> },
    { path: '/property-page', element: <PropertyMasterForm1 /> },
    { path: '/renter-page', element: <RenterMasterForm1 /> },
    { path: '/rental-allocation-page', element: <RentalAllocation /> },
    { path: '/childproperty-page', element: <ChildPropertyMasterForm /> }
  ]
};

export default MainRoutes;
