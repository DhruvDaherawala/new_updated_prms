// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Grid,
//   Typography,
//   Paper,
//   Card,
//   Chip,
//   Divider,
//   Container,
//   Skeleton,
//   Button,
//   Badge,
//   Tooltip,
//   Avatar
// } from '@mui/material';
// import MainCard from '../../component/MainCard';
// import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
// import HomeIcon from '@mui/icons-material/Home';
// import BuildIcon from '@mui/icons-material/Build';
// import EventSeatIcon from '@mui/icons-material/EventSeat';
// import ApartmentIcon from '@mui/icons-material/Apartment';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import LockIcon from '@mui/icons-material/Lock';
// import ConstructionIcon from '@mui/icons-material/Construction';
// import axios from 'axios';

// const PropertyDashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [properties, setProperties] = useState([]);
//   const [childProperties, setChildProperties] = useState([]);
//   const [allocations, setAllocations] = useState([]);
//   const [propertyMap, setPropertyMap] = useState({});
//   const [propertyChildCountMap, setPropertyChildCountMap] = useState({});
//   const [stats, setStats] = useState({ available: 0, allocated: 0, maintenance: 0 });
//   const [selectedBuilding, setSelectedBuilding] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const API_URL = import.meta.env.VITE_API_URL;
      
//       const [propRes, childPropRes, allocRes] = await Promise.all([
//         axios.get(`${API_URL}property`),
//         axios.get(`${API_URL}child_property`),
//         axios.get(`${API_URL}allocations`)
//       ]);

//       const propertyData = propRes.data;
//       const childPropertyData = childPropRes.data;
//       setProperties(propertyData);
//       setChildProperties(childPropertyData);
//       setAllocations(allocRes.data);
      
//       // Create property lookup map
//       const propMap = {};
//       propertyData.forEach(property => {
//         propMap[property.id] = property;
//       });
//       setPropertyMap(propMap);

//       // Count child properties for each parent property
//       const childCountMap = {};
//       childPropertyData.forEach(childProp => {
//         const parentId = childProp.property_id;
//         if (!childCountMap[parentId]) {
//           childCountMap[parentId] = { 
//             total: 0,
//             available: 0,
//             allocated: 0,
//             maintenance: 0
//           };
//         }
//         childCountMap[parentId].total++;
        
//         // Calculate status for each child property
//         const status = getPropertyStatus(childProp, allocRes.data, propMap);
//         childCountMap[parentId][status]++;
//       });
//       setPropertyChildCountMap(childCountMap);

//       // Set initial selected building
//       if (propertyData.length > 0) {
//         setSelectedBuilding(propertyData[0].id);
//       }

//       // Calculate statistics
//       calculateStats(propertyData, childPropertyData, allocRes.data, propMap);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateStats = (props, childProps, allocs, propMap) => {
//     let available = 0;
//     let allocated = 0;
//     let maintenance = 0;

//     childProps.forEach(childProp => {
//       const status = getPropertyStatus(childProp, allocs, propMap);
//       if (status === 'available') available++;
//       else if (status === 'allocated') allocated++;
//       else if (status === 'maintenance') maintenance++;
//     });

//     setStats({ available, allocated, maintenance });
//   };

//   const isAllocated = (childPropertyId, allocs) => {
//     return allocs.some(
//       allocation => allocation.childproperty_id === childPropertyId && allocation.status === 'Active'
//     );
//   };

//   const getPropertyStatus = (childProperty, allocs, propMap) => {
//     if (isAllocated(childProperty.id, allocs)) {
//       return 'allocated';
//     }
    
//     const parentProperty = propMap[childProperty.property_id];
//     if (parentProperty && 
//         (parentProperty.status?.toLowerCase() === 'inactive' || 
//          parentProperty.status?.toLowerCase() === 'maintenance')) {
//       return 'maintenance';
//     }
    
//     return 'available';
//   };

//   const getStatusInfo = (status) => {
//     switch (status) {
//       case 'available':
//         return { 
//           color: '#4caf50', 
//           bgColor: 'rgba(76, 175, 80, 0.15)', 
//           icon: <LockOpenIcon fontSize="small" />, 
//           label: 'Available',
//           seatIcon: <EventSeatIcon style={{ color: '#4caf50' }} />
//         };
//       case 'allocated':
//         return { 
//           color: '#9e9e9e', 
//           bgColor: 'rgba(158, 158, 158, 0.15)', 
//           icon: <LockIcon fontSize="small" />, 
//           label: 'Allocated',
//           seatIcon: <EventSeatIcon style={{ color: '#9e9e9e' }} />
//         };
//       case 'maintenance':
//         return { 
//           color: '#f44336', 
//           bgColor: 'rgba(244, 67, 54, 0.15)', 
//           icon: <ConstructionIcon fontSize="small" />, 
//           label: 'Maintenance',
//           seatIcon: <EventSeatIcon style={{ color: '#f44336' }} />
//         };
//       default:
//         return { 
//           color: '#e0e0e0', 
//           bgColor: 'rgba(224, 224, 224, 0.15)', 
//           icon: null, 
//           label: 'Unknown',
//           seatIcon: <EventSeatIcon style={{ color: '#e0e0e0' }} />
//         };
//     }
//   };

//   const handleBuildingChange = (buildingId) => {
//     setSelectedBuilding(buildingId);
//   };

//   const renderEnhancedPropertyView = () => {
//     if (!selectedBuilding) {
//       return (
//         <Box sx={{ textAlign: 'center', my: 5 }}>
//           <Typography variant="h6" color="textSecondary">
//             No building selected
//           </Typography>
//         </Box>
//       );
//     }

//     const filteredProperties = childProperties.filter(
//       childProp => childProp.property_id === selectedBuilding
//     );

//     if (filteredProperties.length === 0) {
//       return (
//         <Box sx={{ textAlign: 'center', my: 5 }}>
//           <Typography variant="h6" color="textSecondary">
//             No properties found in this building
//           </Typography>
//         </Box>
//       );
//     }

//     // Group by floor for better organization
//     const floorGroups = {};
//     filteredProperties.forEach(property => {
//       const floor = property.floor || 'Unspecified';
//       if (!floorGroups[floor]) {
//         floorGroups[floor] = [];
//       }
//       floorGroups[floor].push(property);
//     });

//     // Sort floors numerically or alphabetically
//     const sortedFloors = Object.keys(floorGroups).sort((a, b) => {
//       const aNum = parseInt(a);
//       const bNum = parseInt(b);
//       if (!isNaN(aNum) && !isNaN(bNum)) {
//         return aNum - bNum;
//       }
//       return a.localeCompare(b);
//     });

//     return (
//       <Box sx={{ mt: 3 }}>
//         {sortedFloors.map(floor => (
//           <Box key={floor} sx={{ mb: 4 }}>
//             <Box sx={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               mb: 1, 
//               pb: 1, 
//               borderBottom: '1px solid #e0e0e0' 
//             }}>
//               <Typography variant="h6" sx={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 background: 'linear-gradient(45deg, #f5f5f5, #e0e0e0)',
//                 px: 2,
//                 py: 0.5,
//                 borderRadius: 2,
//                 boxShadow: '0px 2px 4px rgba(0,0,0,0.05)'
//               }}>
//                 <HomeIcon sx={{ mr: 1, color: '#666' }} />
//                 Floor {floor}
//               </Typography>
//               <Typography variant="body2" sx={{ ml: 2, color: '#666' }}>
//                 {floorGroups[floor].length} Properties
//               </Typography>
//             </Box>
            
//             {/* Enhanced Property View */}
//             <Paper
//               elevation={3}
//               sx={{ 
//                 p: 3,
//                 borderRadius: 3,
//                 backgroundImage: 'linear-gradient(to bottom, #fbfbfb, #f5f5f5)',
//                 position: 'relative',
//                 overflow: 'hidden'
//               }}
//             >
//               <Box
//                 sx={{
//                   display: 'flex',
//                   flexWrap: 'wrap',
//                   gap: 2,
//                   alignItems: 'flex-start',
//                   justifyContent: 'flex-start'
//                 }}
//               >
//                 {floorGroups[floor].map(property => {
//                   const status = getPropertyStatus(property, allocations, propertyMap);
//                   const { color, bgColor, icon, label, seatIcon } = getStatusInfo(status);
                  
//                   return (
//                     <Tooltip
//                       key={property.id}
//                       title={
//                         <Box>
//                           <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: color }}>
//                             {property.title}
//                           </Typography>
//                           <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
//                             {icon}
//                             <Typography variant="body2" sx={{ ml: 1 }}>Status: {label}</Typography>
//                           </Box>
//                           <Typography variant="body2" sx={{ mb: 0.5 }}>Floor: {property.floor}</Typography>
//                           {property.rooms && (
//                             <Typography variant="body2" sx={{ mb: 0.5 }}>Rooms: {property.rooms}</Typography>
//                           )}
//                           {property.rent && (
//                             <Typography variant="body2" sx={{ mb: 0.5 }}>Rent: ₹{property.rent.toLocaleString()}</Typography>
//                           )}
//                           {property.size && (
//                             <Typography variant="body2" sx={{ mb: 0.5 }}>Size: {property.size} sq.ft</Typography>
//                           )}
//                         </Box>
//                       }
//                       arrow
//                       placement="top"
//                     >
//                       <Box
//                         sx={{
//                           position: 'relative',
//                           width: '70px',
//                           height: '70px',
//                           display: 'flex',
//                           flexDirection: 'column',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           bgcolor: bgColor,
//                           border: `2px solid ${color}`,
//                           borderRadius: '8px',
//                           transition: 'all 0.3s ease',
//                           cursor: 'pointer',
//                           '&:hover': {
//                             transform: 'translateY(-5px)',
//                             boxShadow: `0 8px 15px rgba(0,0,0,0.1)`,
//                             borderWidth: '3px'
//                           }
//                         }}
//                       >
//                         <Box sx={{ mb: 1 }}>{seatIcon}</Box>
//                         <Typography
//                           variant="caption"
//                           sx={{
//                             overflow: 'hidden',
//                             textOverflow: 'ellipsis',
//                             whiteSpace: 'nowrap',
//                             width: '90%',
//                             textAlign: 'center',
//                             fontWeight: 'bold',
//                             fontSize: '0.7rem'
//                           }}
//                         >
//                           {property.title}
//                         </Typography>
//                         <Box
//                           sx={{
//                             position: 'absolute',
//                             top: -7,
//                             right: -7,
//                             bgcolor: color,
//                             color: 'white',
//                             borderRadius: '50%',
//                             width: '22px',
//                             height: '22px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
//                             zIndex: 1
//                           }}
//                         >
//                           {icon}
//                         </Box>
//                       </Box>
//                     </Tooltip>
//                   );
//                 })}
//               </Box>
//             </Paper>
//           </Box>
//         ))}
//       </Box>
//     );
//   };

//   return (
//     <MainCard contentSX={{ p: { xs: 2, md: 3 } }}>
//       <Container maxWidth="lg">
//         {loading ? (
//           <>
//             {/* Skeleton loading state */}
//             <Grid container spacing={3} sx={{ mb: 3 }}>
//               <Grid item xs={12} sm={4}>
//                 <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
//               </Grid>
//             </Grid>
//             <Skeleton variant="rectangular" height={60} sx={{ mb: 2, borderRadius: 1 }} />
//             <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
//           </>
//         ) : (
//           <>
//             {/* Status Legend */}
//             <Paper 
//               elevation={3} 
//               sx={{ 
//                 p: 2, 
//                 mb: 4, 
//                 borderRadius: 3, 
//                 background: 'linear-gradient(45deg, #f9f9f9, #ffffff)'
//               }}
//             >
//               <Typography variant="h5" sx={{ mb: 2, color: '#424242', fontWeight: 'medium' }}>
//                 Property Overview
//               </Typography>
//               <Divider sx={{ mb: 2 }} />
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
//                 <Chip 
//                   icon={<EventSeatIcon style={{ color: '#4caf50' }} />} 
//                   label={`Available (${stats.available})`}
//                   sx={{ 
//                     bgcolor: 'rgba(76, 175, 80, 0.15)', 
//                     border: '1px solid #4caf50',
//                     '& .MuiChip-icon': { color: '#4caf50' },
//                     fontWeight: 'medium',
//                     px: 1
//                   }} 
//                 />
//                 <Chip 
//                   icon={<EventSeatIcon style={{ color: '#9e9e9e' }} />}
//                   label={`Allocated (${stats.allocated})`}
//                   sx={{ 
//                     bgcolor: 'rgba(158, 158, 158, 0.15)', 
//                     border: '1px solid #9e9e9e',
//                     '& .MuiChip-icon': { color: '#9e9e9e' },
//                     fontWeight: 'medium',
//                     px: 1
//                   }} 
//                 />
//                 <Chip 
//                   icon={<EventSeatIcon style={{ color: '#f44336' }} />}
//                   label={`Maintenance (${stats.maintenance})`}
//                   sx={{ 
//                     bgcolor: 'rgba(244, 67, 54, 0.15)', 
//                     border: '1px solid #f44336',
//                     '& .MuiChip-icon': { color: '#f44336' },
//                     fontWeight: 'medium',
//                     px: 1
//                   }} 
//                 />
//               </Box>
//             </Paper>

//             {/* Building Selector with Child Property Count */}
//             <Paper 
//               elevation={3} 
//               sx={{ 
//                 p: 3, 
//                 mb: 4, 
//                 borderRadius: 3, 
//                 background: 'linear-gradient(45deg, #f5f7fa, #ffffff)'
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <ApartmentIcon sx={{ fontSize: 28, mr: 1, color: '#5c6bc0' }} />
//                 <Typography variant="h5" sx={{ color: '#424242', fontWeight: 'medium' }}>
//                   Properties
//                 </Typography>
//               </Box>
//               <Divider sx={{ mb: 3 }} />
              
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//                 {properties.map(property => {
//                   const childCount = propertyChildCountMap[property.id] || { total: 0, available: 0, allocated: 0, maintenance: 0 };
                  
//                   return (
//                     <Tooltip
//                       key={property.id}
//                       title={
//                         <Box>
//                           <Typography variant="subtitle2" sx={{ mb: 1 }}>Property Units</Typography>
//                           <Typography variant="body2" sx={{ color: '#4caf50', mb: 0.5 }}>
//                             Available: {childCount.available}
//                           </Typography>
//                           <Typography variant="body2" sx={{ color: '#9e9e9e', mb: 0.5 }}>
//                             Allocated: {childCount.allocated}
//                           </Typography>
//                           <Typography variant="body2" sx={{ color: '#f44336', mb: 0.5 }}>
//                             Maintenance: {childCount.maintenance}
//                           </Typography>
//                         </Box>
//                       }
//                       arrow
//                     >
//                       <Button
//                         variant={selectedBuilding === property.id ? "contained" : "outlined"}
//                         color={selectedBuilding === property.id ? "primary" : "secondary"}
//                         onClick={() => handleBuildingChange(property.id)}
//                         sx={{ 
//                           borderRadius: 2, 
//                           py: 1, 
//                           textTransform: 'none',
//                           position: 'relative',
//                           pl: 2,
//                           pr: 3
//                         }}
//                       >
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <Badge
//                             badgeContent={childCount.total}
//                             color="error"
//                             sx={{ mr: 1 }}
//                           >
//                             <Avatar 
//                               sx={{ 
//                                 bgcolor: selectedBuilding === property.id ? 'primary.light' : 'background.paper',
//                                 width: 28,
//                                 height: 28
//                               }}
//                             >
//                               <HomeIcon fontSize="small" />
//                             </Avatar>
//                           </Badge>
//                           {property.propertyName}
//                         </Box>
//                       </Button>
//                     </Tooltip>
//                   );
//                 })}
//               </Box>
//             </Paper>

//             {/* Property View (Enhanced from the former Bus Seat view) */}
//             {renderEnhancedPropertyView()}
//           </>
//         )}
//       </Container>
//     </MainCard>
//   );
// };

// export default PropertyDashboard; 

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
  Badge,
  Tooltip,
  Avatar
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
import axios from 'axios';

const PropertyDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [childProperties, setChildProperties] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [propertyMap, setPropertyMap] = useState({});
  const [propertyChildCountMap, setPropertyChildCountMap] = useState({});
  const [stats, setStats] = useState({ available: 0, allocated: 0, maintenance: 0 });
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
      const childPropertyData = childPropRes.data;
      setProperties(propertyData);
      setChildProperties(childPropertyData);
      setAllocations(allocRes.data);
      
      // Create property lookup map
      const propMap = {};
      propertyData.forEach(property => {
        propMap[property.id] = property;
      });
      setPropertyMap(propMap);

      // Count child properties for each parent property
      const childCountMap = {};
      childPropertyData.forEach(childProp => {
        const parentId = childProp.property_id;
        if (!childCountMap[parentId]) {
          childCountMap[parentId] = { 
            total: 0,
            available: 0,
            allocated: 0,
            maintenance: 0
          };
        }
        childCountMap[parentId].total++;
        
        // Calculate status for each child property
        const status = getPropertyStatus(childProp, allocRes.data, propMap);
        childCountMap[parentId][status]++;
      });
      setPropertyChildCountMap(childCountMap);

      // Set initial selected building
      if (propertyData.length > 0) {
        setSelectedBuilding(propertyData[0].id);
      }

      // Calculate statistics
      calculateStats(propertyData, childPropertyData, allocRes.data, propMap);
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

  const handleBuildingChange = (buildingId) => {
    setSelectedBuilding(buildingId);
  };

  const renderEnhancedPropertyView = () => {
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
      <Box sx={{ mt: 3 }}>
        {sortedFloors.map(floor => (
          <Box key={floor} sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 1, 
              pb: 1, 
              borderBottom: '1px solid #e0e0e0' 
            }}>
              <Typography variant="h6" sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                background: 'linear-gradient(45deg, #f5f5f5, #e0e0e0)',
                px: 2,
                py: 0.5,
                borderRadius: 2,
                boxShadow: '0px 2px 4px rgba(0,0,0,0.05)'
              }}>
                <HomeIcon sx={{ mr: 1, color: '#666' }} />
                Floor {floor}
              </Typography>
              <Typography variant="body2" sx={{ ml: 2, color: '#666' }}>
                {floorGroups[floor].length} Properties
              </Typography>
            </Box>
            
            {/* Enhanced Property View */}
            <Paper
              elevation={3}
              sx={{ 
                p: 3,
                borderRadius: 3,
                backgroundImage: 'linear-gradient(to bottom, #fbfbfb, #f5f5f5)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start'
                }}
              >
                {floorGroups[floor].map(property => {
                  const status = getPropertyStatus(property, allocations, propertyMap);
                  const { color, bgColor, icon, label, seatIcon } = getStatusInfo(status);
                  
                  return (
                    <Tooltip
                      key={property.id}
                      title={
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: color }}>
                            {property.title}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            {icon}
                            <Typography variant="body2" sx={{ ml: 1 }}>Status: {label}</Typography>
                          </Box>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>Floor: {property.floor}</Typography>
                          {property.rooms && (
                            <Typography variant="body2" sx={{ mb: 0.5 }}>Rooms: {property.rooms}</Typography>
                          )}
                          {property.rent && (
                            <Typography variant="body2" sx={{ mb: 0.5 }}>Rent: ₹{property.rent.toLocaleString()}</Typography>
                          )}
                          {property.size && (
                            <Typography variant="body2" sx={{ mb: 0.5 }}>Size: {property.size} sq.ft</Typography>
                          )}
                        </Box>
                      }
                      arrow
                      placement="top"
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          width: '70px',
                          height: '70px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: bgColor,
                          border: `2px solid ${color}`,
                          borderRadius: '8px',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: `0 8px 15px rgba(0,0,0,0.1)`,
                            borderWidth: '3px'
                          }
                        }}
                      >
                        <Box sx={{ mb: 1 }}>{seatIcon}</Box>
                        <Typography
                          variant="caption"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '90%',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '0.7rem'
                          }}
                        >
                          {property.title}
                        </Typography>
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -7,
                            right: -7,
                            bgcolor: color,
                            color: 'white',
                            borderRadius: '50%',
                            width: '22px',
                            height: '22px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                            zIndex: 1
                          }}
                        >
                          {icon}
                        </Box>
                      </Box>
                    </Tooltip>
                  );
                })}
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <MainCard contentSX={{ p: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        {loading ? (
          <>
            {/* Skeleton loading state */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
              </Grid>
            </Grid>
            <Skeleton variant="rectangular" height={60} sx={{ mb: 2, borderRadius: 1 }} />
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          </>
        ) : (
          <>
            {/* Status Legend */}
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                mb: 4, 
                borderRadius: 3, 
                background: 'linear-gradient(45deg, #f9f9f9, #ffffff)'
              }}
            >
              <Typography variant="h5" sx={{ mb: 2, color: '#424242', fontWeight: 'medium' }}>
                Property Overview
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                <Chip 
                  icon={<EventSeatIcon style={{ color: '#4caf50' }} />} 
                  label={`Available (${stats.available})`}
                  sx={{ 
                    bgcolor: 'rgba(76, 175, 80, 0.15)', 
                    border: '1px solid #4caf50',
                    '& .MuiChip-icon': { color: '#4caf50' },
                    fontWeight: 'medium',
                    px: 1
                  }} 
                />
                <Chip 
                  icon={<EventSeatIcon style={{ color: '#9e9e9e' }} />}
                  label={`Allocated (${stats.allocated})`}
                  sx={{ 
                    bgcolor: 'rgba(158, 158, 158, 0.15)', 
                    border: '1px solid #9e9e9e',
                    '& .MuiChip-icon': { color: '#9e9e9e' },
                    fontWeight: 'medium',
                    px: 1
                  }} 
                />
                <Chip 
                  icon={<EventSeatIcon style={{ color: '#f44336' }} />}
                  label={`Maintenance (${stats.maintenance})`}
                  sx={{ 
                    bgcolor: 'rgba(244, 67, 54, 0.15)', 
                    border: '1px solid #f44336',
                    '& .MuiChip-icon': { color: '#f44336' },
                    fontWeight: 'medium',
                    px: 1
                  }} 
                />
              </Box>
            </Paper>

            {/* Building Selector with Child Property Count */}
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                mb: 4, 
                borderRadius: 3, 
                background: 'linear-gradient(45deg, #f5f7fa, #ffffff)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ApartmentIcon sx={{ fontSize: 28, mr: 1, color: '#5c6bc0' }} />
                <Typography variant="h5" sx={{ color: '#424242', fontWeight: 'medium' }}>
                  Properties
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {properties.map(property => {
                  const childCount = propertyChildCountMap[property.id] || { total: 0, available: 0, allocated: 0, maintenance: 0 };
                  
                  return (
                    <Tooltip
                      key={property.id}
                      title={
                        <Box>
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>Property Units</Typography>
                          <Typography variant="body2" sx={{ color: '#4caf50', mb: 0.5 }}>
                            Available: {childCount.available}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#9e9e9e', mb: 0.5 }}>
                            Allocated: {childCount.allocated}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#f44336', mb: 0.5 }}>
                            Maintenance: {childCount.maintenance}
                          </Typography>
                        </Box>
                      }
                      arrow
                    >
                      {/* <Button
                        variant={selectedBuilding === property.id ? "contained" : "outlined"}
                        color={selectedBuilding === property.id ? "primary" : "secondary"}
                        onClick={() => handleBuildingChange(property.id)}
                        sx={{ 
                          borderRadius: 2, 
                          py: 1, 
                          textTransform: 'none',
                          position: 'relative',
                          pl: 2,
                          pr: 3
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Badge
                            badgeContent={childCount.total}
                            color="error"
                            sx={{ mr: 1 }}
                          >
                            <Avatar 
                              sx={{ 
                                bgcolor: selectedBuilding === property.id ? 'primary.light' : 'background.paper',
                                width: 28,
                                height: 28
                              }}
                            >
                              <HomeIcon fontSize="small" />
                            </Avatar>
                          </Badge>
                          {property.propertyName}
                        </Box>
                      </Button> */}
                       <Button
      variant="contained"
      onClick={() => handleBuildingChange(property.id)}
      sx={{
        borderRadius: "50px",
        py: 1.2,
        px: 2.5,
        textTransform: 'none',
        position: 'relative',
        background: selectedBuilding === property.id
          ? "linear-gradient(135deg, #1E3A8A, #3B82F6)"
          : "#F3F4F6",
        color: selectedBuilding === property.id ? "#fff" : "#1F2937",
        boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
        border: selectedBuilding === property.id ? "none" : "1.5px solid #E5E7EB",
        transition: "all 0.3s ease-in-out",
        '&:hover': {
          background: selectedBuilding === property.id
            ? "linear-gradient(135deg, #1E40AF, #2563EB)"
            : "#E5E7EB",
          boxShadow: "0px 5px 14px rgba(0, 0, 0, 0.15)",
          transform: "translateY(-2px)",
        },
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        minWidth: 180,
        justifyContent: "flex-start",
        borderRadius: "50px",
      }}
    >
      <Badge badgeContent={childCount.total} color="error">
        <Avatar
          sx={{
            bgcolor: "#000000", // Black color for the circle
            width: 36,
            height: 36,
            transition: "all 0.3s ease-in-out",
          }}
        >
          <HomeIcon fontSize="small" style={{ color: "#fff" }} />
        </Avatar>
      </Badge>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "600",
          flexGrow: 1,
          textAlign: "left",
          color: selectedBuilding === property.id ? "#fff" : "#1F2937",
        }}
      >
        {property.propertyName}
      </Typography>
    </Button>
                    </Tooltip>
                  );
                })}
              </Box>
            </Paper>

            {/* Property View (Enhanced from the former Bus Seat view) */}
            {renderEnhancedPropertyView()}
          </>
        )}
      </Container>
    </MainCard>
  );
};

export default PropertyDashboard; 