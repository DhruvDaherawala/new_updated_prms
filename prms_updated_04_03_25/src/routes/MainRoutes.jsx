import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import AddPropertyForm from 'component/PropertyMaster/AddProperty';
import PropertyMasterForm1 from 'component/PropertyMaster1/PropertyMasterForm1';
import RenterMasterForm1 from 'component/RenterMaster1/RenterMasterForm1';
import RentalAllocation from 'component/RentalAllocation/RentalAllocation';

const DashboardDefault = Loadable(lazy(() => import('views/Dashboard/Default')));
const UtilsTypography = Loadable(lazy(() => import('views/Utils/Typography')));
const SamplePage = Loadable(lazy(() => import('views/SamplePage')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard/default',
      element: <DashboardDefault />
    },
    { path: '/utils/util-typography', element: <UtilsTypography /> },
    { path: '/property-page', element: <PropertyMasterForm1 /> },
    { path: '/renter-page', element: <RenterMasterForm1 /> },
    { path: '/rental-allocation-page', element: <RentalAllocation /> }
  ]
};

export default MainRoutes;
