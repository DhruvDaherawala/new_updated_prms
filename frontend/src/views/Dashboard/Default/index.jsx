// import React, { useEffect, useState } from 'react';
// import { useTheme } from '@mui/material/styles';
// import { Grid } from '@mui/material';
// import axios from 'axios';

// // Project imports
// import ReportCard from './ReportCard';
// import { gridSpacing } from 'config.js';

// // Icons
// import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
// import PeopleAltTwoTone from '@mui/icons-material/PeopleAltTwoTone';
// import BusinessTwoTone from '@mui/icons-material/BusinessTwoTone';
// import ApartmentTwoTone from '@mui/icons-material/ApartmentTwoTone';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// const API_URL = import.meta.env.VITE_API_URL;

// const Dashboard = () => {
//   const theme = useTheme();
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     // Fetch all properties from your API
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get(`${API_URL}property`);
//         setProperties(response.data);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//       }
//     };
//     fetchProperties();
//   }, []);


//   // fetch the data from the API
//   const totalProperties = properties.length;
//   const allocatedProperties = 0
//   const availableProperties = 0
//   const availableRenters = renters.filter(renter => renter.status === 'Active').length;

  
//   return (
//     <Grid container spacing={gridSpacing}>
//       <Grid item xs={12}>
//         <Grid container spacing={gridSpacing}>
//           <Grid item lg={3} sm={6} xs={12}>
//             <ReportCard
//               primary={totalProperties}
//               secondary="Total Properties"
//               color={theme.palette.primary.main}
//               footerData="Total registered properties"
//               iconPrimary={HomeTwoTone}
//               iconFooter={TrendingUpIcon}
//             />
//           </Grid>
//           <Grid item lg={3} sm={6} xs={12}>
//             <ReportCard
//               primary={availableRenters}
//               secondary="Total Available Renters"
//               color={theme.palette.success.main}
//               footerData="Renters looking for properties"
//               iconPrimary={PeopleAltTwoTone}
//               iconFooter={TrendingUpIcon}
//             />
//           </Grid>
//           <Grid item lg={3} sm={6} xs={12}>
//             <ReportCard
//               primary={allocatedProperties}
//               secondary="Total Allocated Properties"
//               color={theme.palette.warning.main}
//               footerData="Properties currently rented"
//               iconPrimary={BusinessTwoTone}
//               iconFooter={TrendingUpIcon}
//             />
//           </Grid>
//           <Grid item lg={3} sm={6} xs={12}>
//             <ReportCard
//               primary={availableProperties}
//               secondary="Total Available Properties"
//               color={theme.palette.error.main}
//               footerData="Properties ready for rent"
//               iconPrimary={ApartmentTwoTone}
//               iconFooter={TrendingUpIcon}
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import axios from 'axios';

// Project imports
import ReportCard from './ReportCard';
import { gridSpacing } from 'config.js';

// Icons
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import PeopleAltTwoTone from '@mui/icons-material/PeopleAltTwoTone';
import BusinessTwoTone from '@mui/icons-material/BusinessTwoTone';
import ApartmentTwoTone from '@mui/icons-material/ApartmentTwoTone';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const theme = useTheme();
  const [properties, setProperties] = useState([]);
  const [renters, setRenters] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [propertiesResponse, rentersResponse] = await Promise.all([
          axios.get(`${API_URL}property`),
          axios.get(`${API_URL}renter`)
        ]);
        setProperties(propertiesResponse.data);
        setRenters(rentersResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchDashboardData();
  }, []);

  // Calculate stats
  const totalProperties = properties.length;
  const allocatedProperties = properties.filter(property => property.allocated).length;
  const availableProperties = properties.filter(property => !property.allocated).length;
  const availableRenters = renters.length;

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={`${totalProperties}`}
              secondary="Total Properties"
              color={theme.palette.primary.main}
              footerData="Total registered properties"
              iconPrimary={HomeTwoTone}
              iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={`${availableRenters}`}
              secondary="Total Available Renters"
              color={theme.palette.success.main}
              footerData="Renters looking for properties"
              iconPrimary={PeopleAltTwoTone}
              iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={`${allocatedProperties}`}
              secondary="Total Allocated Properties"
              color={theme.palette.warning.main}
              footerData="Properties currently rented"
              iconPrimary={BusinessTwoTone}
              iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={`${availableProperties}`}
              secondary="Total Available Properties"
              color={theme.palette.error.main}
              footerData="Properties ready for rent"
              iconPrimary={ApartmentTwoTone}
              iconFooter={TrendingUpIcon}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
