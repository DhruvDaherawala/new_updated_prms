import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Card,
  Chip,
  Divider,
  Container,
  Skeleton,
  Button,
  Tabs,
  Tab,
  Tooltip
} from '@mui/material';
import MainCard from '../../component/MainCard';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import ConstructionIcon from '@mui/icons-material/Construction';
import GridViewIcon from '@mui/icons-material/GridView';
import axios from 'axios';

const PropertyDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [childProperties, setChildProperties] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [propertyMap, setPropertyMap] = useState({});
  const [stats, setStats] = useState({ available: 0, allocated: 0, maintenance: 0 });
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      
      const [propRes, childPropRes, allocRes] = await Promise.all([
        axios.get(`${API_URL}property`),
        axios.get(`${API_URL}child_property`),
        axios.get(`${API_URL}allocations`)
      ]);

      const propertyData = propRes.data;
      setProperties(propertyData);
      setChildProperties(childPropRes.data);
      setAllocations(allocRes.data);
      
      // Create property lookup map
      const propMap = {};
      propertyData.forEach(property => {
        propMap[property.id] = property;
      });
      setPropertyMap(propMap);

      // Set initial selected building
      if (propertyData.length > 0) {
        setSelectedBuilding(propertyData[0].id);
      }

      // Calculate statistics
      calculateStats(propertyData, childPropRes.data, allocRes.data, propMap);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (props, childProps, allocs, propMap) => {
    let available = 0;
    let allocated = 0;
    let maintenance = 0;

    childProps.forEach(childProp => {
      const status = getPropertyStatus(childProp, allocs, propMap);
      if (status === 'available') available++;
      else if (status === 'allocated') allocated++;
      else if (status === 'maintenance') maintenance++;
    });

    setStats({ available, allocated, maintenance });
  };

  const isAllocated = (childPropertyId, allocs) => {
    return allocs.some(
      allocation => allocation.childproperty_id === childPropertyId && allocation.status === 'Active'
    );
  };

  const getPropertyStatus = (childProperty, allocs, propMap) => {
    if (isAllocated(childProperty.id, allocs)) {
      return 'allocated';
    }
    
    const parentProperty = propMap[childProperty.property_id];
    if (parentProperty && 
        (parentProperty.status?.toLowerCase() === 'inactive' || 
         parentProperty.status?.toLowerCase() === 'maintenance')) {
      return 'maintenance';
    }
    
    return 'available';
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'available':
        return { 
          color: '#4caf50', 
          bgColor: 'rgba(76, 175, 80, 0.15)', 
          icon: <LockOpenIcon fontSize="small" />, 
          label: 'Available',
          seatIcon: <EventSeatIcon style={{ color: '#4caf50' }} />
        };
      case 'allocated':
        return { 
          color: '#9e9e9e', 
          bgColor: 'rgba(158, 158, 158, 0.15)', 
          icon: <LockIcon fontSize="small" />, 
          label: 'Allocated',
          seatIcon: <EventSeatIcon style={{ color: '#9e9e9e' }} />
        };
      case 'maintenance':
        return { 
          color: '#f44336', 
          bgColor: 'rgba(244, 67, 54, 0.15)', 
          icon: <ConstructionIcon fontSize="small" />, 
          label: 'Maintenance',
          seatIcon: <EventSeatIcon style={{ color: '#f44336' }} />
        };
      default:
        return { 
          color: '#e0e0e0', 
          bgColor: 'rgba(224, 224, 224, 0.15)', 
          icon: null, 
          label: 'Unknown',
          seatIcon: <EventSeatIcon style={{ color: '#e0e0e0' }} />
        };
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleBuildingChange = (buildingId) => {
    setSelectedBuilding(buildingId);
  };

  const renderPropertySeats = () => {
    if (!selectedBuilding) {
      return (
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Typography variant="h6" color="textSecondary">
            No building selected
          </Typography>
        </Box>
      );
    }

    const filteredProperties = childProperties.filter(
      childProp => childProp.property_id === selectedBuilding
    );

    if (filteredProperties.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Typography variant="h6" color="textSecondary">
            No properties found in this building
          </Typography>
        </Box>
      );
    }

    // Group by floor for better organization
    const floorGroups = {};
    filteredProperties.forEach(property => {
      const floor = property.floor || 'Unspecified';
      if (!floorGroups[floor]) {
        floorGroups[floor] = [];
      }
      floorGroups[floor].push(property);
    });

    // Sort floors numerically or alphabetically
    const sortedFloors = Object.keys(floorGroups).sort((a, b) => {
      const aNum = parseInt(a);
      const bNum = parseInt(b);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return aNum - bNum;
      }
      return a.localeCompare(b);
    });

    return (
      <Box>
        {sortedFloors.map(floor => (
          <Box key={floor} sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 1, 
              pb: 1, 
              borderBottom: '1px dashed #e0e0e0' 
            }}>
              <Typography variant="h6">Floor {floor}</Typography>
            </Box>
            
            {/* Bus-style seat layout */}
            <Box 
              sx={{ 
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                p: 2,
                border: '2px solid #e0e0e0',
                borderRadius: 2,
                position: 'relative',
                backgroundImage: 'linear-gradient(to bottom, #f5f5f5, #ffffff)'
              }}
            >
              <Typography 
                variant="caption" 
                sx={{ 
                  position: 'absolute', 
                  top: -10, 
                  left: 'calc(50% - 40px)',
                  bgcolor: '#fff',
                  px: 1,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1
                }}
              >
                FRONT
              </Typography>

              {floorGroups[floor].map(property => {
                const status = getPropertyStatus(property, allocations, propertyMap);
                const { color, bgColor, icon, label, seatIcon } = getStatusInfo(status);
                
                return (
                  <Tooltip
                    key={property.id}
                    title={
                      <Box>
                        <Typography variant="body2"><strong>{property.title}</strong></Typography>
                        <Typography variant="caption">Status: {label}</Typography>
                        <Typography variant="caption" display="block">Floor: {property.floor}</Typography>
                        {property.rooms && (
                          <Typography variant="caption" display="block">Rooms: {property.rooms}</Typography>
                        )}
                        {property.rent && (
                          <Typography variant="caption" display="block">Rent: ₹{property.rent}</Typography>
                        )}
                      </Box>
                    }
                    arrow
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '55px',
                        height: '55px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: bgColor,
                        border: `2px solid ${color}`,
                        borderRadius: '5px',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: `0 4px 8px rgba(0,0,0,0.15)`
                        }
                      }}
                    >
                      {seatIcon}
                      <Typography
                        variant="caption"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          width: '100%',
                          textAlign: 'center',
                          fontWeight: 'medium',
                          fontSize: '0.65rem'
                        }}
                      >
                        {property.title}
                      </Typography>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -5,
                          right: -5,
                          bgcolor: color,
                          color: 'white',
                          borderRadius: '50%',
                          width: '18px',
                          height: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px'
                        }}
                      >
                        {icon}
                      </Box>
                    </Box>
                  </Tooltip>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  // Render all properties as a grid - alternative view
  const renderPropertyGrid = () => {
    if (!selectedBuilding) {
      return (
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Typography variant="h6" color="textSecondary">
            No building selected
          </Typography>
        </Box>
      );
    }

    const filteredProperties = childProperties.filter(
      childProp => childProp.property_id === selectedBuilding
    );

    if (filteredProperties.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Typography variant="h6" color="textSecondary">
            No properties found in this building
          </Typography>
        </Box>
      );
    }

    return (
      <Grid container spacing={2}>
        {filteredProperties.map(property => {
          const status = getPropertyStatus(property, allocations, propertyMap);
          const { color, bgColor, icon, label } = getStatusInfo(status);
          
          return (
            <Grid item xs={6} sm={4} md={3} lg={2} key={property.id}>
              <Paper
                sx={{
                  height: '100%',
                  bgcolor: bgColor,
                  border: `2px solid ${color}`,
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 5px 15px rgba(0,0,0,0.1)`
                  }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 1,
                    bgcolor: color,
                    color: 'white'
                  }}
                >
                  {icon}
                  <Typography
                    variant="caption"
                    sx={{
                      ml: 0.5,
                      fontWeight: 'medium'
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5 }}>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {property.title}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" display="block">
                    Floor: {property.floor}
                  </Typography>
                  {property.rooms && (
                    <Typography variant="caption" color="textSecondary" display="block">
                      Rooms: {property.rooms}
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <MainCard title="Property Dashboard">
      <Container maxWidth="lg">
        {loading ? (
          <>
            {/* Skeleton loading state */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <Skeleton variant="rectangular" height={100} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Skeleton variant="rectangular" height={100} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Skeleton variant="rectangular" height={100} />
              </Grid>
            </Grid>
            <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={300} />
          </>
        ) : (
          <>
            {/* Status Legend */}
            <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              <Chip 
                icon={<EventSeatIcon style={{ color: '#4caf50' }} />} 
                label={`Available (${stats.available})`}
                sx={{ 
                  bgcolor: 'rgba(76, 175, 80, 0.15)', 
                  border: '1px solid #4caf50',
                  '& .MuiChip-icon': { color: '#4caf50' } 
                }} 
              />
              <Chip 
                icon={<EventSeatIcon style={{ color: '#9e9e9e' }} />}
                label={`Allocated (${stats.allocated})`}
                sx={{ 
                  bgcolor: 'rgba(158, 158, 158, 0.15)', 
                  border: '1px solid #9e9e9e',
                  '& .MuiChip-icon': { color: '#9e9e9e' } 
                }} 
              />
              <Chip 
                icon={<EventSeatIcon style={{ color: '#f44336' }} />}
                label={`Maintenance (${stats.maintenance})`}
                sx={{ 
                  bgcolor: 'rgba(244, 67, 54, 0.15)', 
                  border: '1px solid #f44336',
                  '& .MuiChip-icon': { color: '#f44336' } 
                }} 
              />
            </Box>

            {/* Building Selector */}
            <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1, pb: 2, borderBottom: '1px solid #e0e0e0' }}>
              <Typography variant="body1" sx={{ fontWeight: 'medium', mr: 2, display: 'flex', alignItems: 'center' }}>
                <ApartmentIcon sx={{ mr: 0.5 }} /> Select Building:
              </Typography>
              {properties.map(property => (
                <Button
                  key={property.id}
                  variant={selectedBuilding === property.id ? "contained" : "outlined"}
                  size="small"
                  onClick={() => handleBuildingChange(property.id)}
                  sx={{ mb: 1 }}
                >
                  {property.propertyName}
                </Button>
              ))}
            </Box>

            {/* View Selector */}
            <Box sx={{ mb: 3 }}>
              <Tabs 
                value={selectedTab} 
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab label="Bus Seat View" icon={<EventSeatIcon />} />
                <Tab label="Grid View" icon={<GridViewIcon />} />
              </Tabs>
            </Box>

            {/* Property Views */}
            <Box>
              {selectedTab === 0 ? renderPropertySeats() : renderPropertyGrid()}
            </Box>
          </>
        )}
      </Container>
    </MainCard>
  );
};

export default PropertyDashboard; 