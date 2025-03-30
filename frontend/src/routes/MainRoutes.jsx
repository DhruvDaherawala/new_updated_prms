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
const RentMaster = Loadable(lazy(() => import('views/RentMaster')));
const DepositMaster = Loadable(lazy(() => import('views/DepositMaster')));
const PropertyDashboard = Loadable(lazy(() => import('views/PropertyDashboard')));

const MainRoutes = {
  // MainLayout will be shown for all authenticated routes
  element: <MainLayout />,
  children: [
    { path: '/', element: <Navigate to="/dashboard/default" /> },
    { path: '/dashboard/default', element: <DashboardDefault /> },
    { path: '/property-page', element: <PropertyMasterForm1 /> },
    { path: '/renter-page', element: <RenterMasterForm1 /> },
    { path: '/rental-allocation-page', element: <RentalAllocation /> },
    { path: '/childproperty-page', element: <ChildPropertyMasterForm /> },
    { path: '/rent-master', element: <RentMaster /> },
    { path: '/deposit-master', element: <DepositMaster /> },
    // { path: '/property-dashboard', element: <PropertyDashboard /> }
  ]
};

export default MainRoutes;
