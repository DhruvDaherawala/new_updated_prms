import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Card,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Paper,
  CardHeader,
  CardContent
} from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import Chart from 'react-apexcharts';

// Project imports
import ReportCard from './ReportCard';
import { gridSpacing } from 'config.js';
import RevenuChartCard from '../card/RevenuChartCard';
import SalesLineCard from '../card/SalesLineCard';
import PropertyDashboard from '../../PropertyDashboard';

// Icons
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import PeopleAltTwoTone from '@mui/icons-material/PeopleAltTwoTone';
import BusinessTwoTone from '@mui/icons-material/BusinessTwoTone';
import ApartmentTwoTone from '@mui/icons-material/ApartmentTwoTone';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const theme = useTheme();
  const [properties, setProperties] = useState([]);
  const [renters, setRenters] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [propertiesResponse, rentersResponse, allocationsResponse] = await Promise.all([
          axios.get(`${API_URL}property`),
          axios.get(`${API_URL}renter`),
          axios.get(`${API_URL}allocations`)
        ]);

        setProperties(propertiesResponse.data);
        setRenters(rentersResponse.data);
        setAllocations(allocationsResponse.data);

        // Generate recent activities from the allocations
        const activities = allocationsResponse.data
          .sort((a, b) => new Date(b.createdAt || b.updated_at) - new Date(a.createdAt || a.updated_at))
          .slice(0, 5)
          .map((allocation) => {
            const renter = rentersResponse.data.find((r) => r.id === allocation.renter_id);
            const property = propertiesResponse.data.find((p) => p.id === allocation.property_id);

            return {
              id: allocation.id,
              type: 'allocation',
              title: `Rental ${allocation.status}`,
              description: `${renter?.renterName || 'Unknown Renter'} allocated to ${property?.propertyName || 'Unknown Property'}`,
              amount: `₹${allocation.rent}`,
              date: allocation.createdAt || allocation.updated_at,
              status: allocation.status
            };
          });

        setRecentActivities(activities);
        setError(null);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate stats
  const totalProperties = properties.length;
  const allocatedProperties = allocations.length; // Properties currently allocated
  const availableProperties = totalProperties - allocatedProperties; // Properties not allocated
  const availableRenters = renters.length;
  const totalRent = allocations.reduce((sum, allocation) => sum + (parseFloat(allocation.rent) || 0), 0);

  // Prepare data for charts
  const montlyRentData = [
    { name: 'Jan', rent: 0 },
    { name: 'Feb', rent: 0 },
    { name: 'Mar', rent: 0 },
    { name: 'Apr', rent: 0 },
    { name: 'May', rent: 0 },
    { name: 'Jun', rent: 0 },
    { name: 'Jul', rent: 0 },
    { name: 'Aug', rent: 0 },
    { name: 'Sep', rent: 0 },
    { name: 'Oct', rent: 0 },
    { name: 'Nov', rent: 0 },
    { name: 'Dec', rent: 0 }
  ];

  // Fill in actual rent data from allocations
  allocations.forEach((allocation) => {
    const createdAt = new Date(allocation.createdAt || allocation.updated_at || new Date());
    const month = createdAt.getMonth();
    montlyRentData[month].rent += parseFloat(allocation.rent) || 0;
  });

  // Format chart data for RevenuChartCard
  const revenueChartData = {
    options: {
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        categories: montlyRentData.map((item) => item.name)
      },
      yaxis: {
        labels: {
          formatter: (value) => `₹${value.toFixed(0)}`
        }
      },
      tooltip: {
        y: {
          formatter: (value) => `₹${value.toFixed(0)}`
        }
      },
      grid: {
        padding: {
          left: 25,
          right: 25
        }
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right'
      },
      colors: [theme.palette.primary.main]
    },
    series: [
      {
        name: 'Monthly Rent',
        data: montlyRentData.map((item) => item.rent)
      }
    ]
  };

  // Format data for SalesLineCard
  const propertyChartData = {
    options: {
      chart: {
        type: 'bar',
        height: 100,
        sparkline: {
          enabled: true
        }
      },
      colors: ['#fff'],
      plotOptions: {
        bar: {
          columnWidth: '60%'
        }
      },
      xaxis: {
        categories: ['Available', 'Allocated']
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false
        },
        y: {
          formatter: (val) => val
        }
      }
    },
    series: [
      {
        name: 'Properties',
        data: [availableProperties, allocatedProperties]
      }
    ]
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading dashboard data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={gridSpacing}>
      {/* Stats Cards */}
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
              secondary="Total Renters"
              color={theme.palette.success.main}
              footerData="Renters in the system"
              iconPrimary={PeopleAltTwoTone}
              iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={`${allocatedProperties}`}
              secondary="Allocated Properties"
              color={theme.palette.warning.main}
              footerData="Properties currently rented"
              iconPrimary={BusinessTwoTone}
              iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={`₹${totalRent.toLocaleString()}`}
              secondary="Total Monthly Rent"
              color={theme.palette.error.main}
              footerData="Total rent collection"
              iconPrimary={MonetizationOnOutlinedIcon}
              iconFooter={TrendingUpIcon}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Property Dashboard */}
      <Grid item xs={12}>
        <Typography/>
        <PropertyDashboard />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
