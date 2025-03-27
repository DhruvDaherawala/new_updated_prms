// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   CircularProgress,
//   IconButton
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import MainCard from '../../component/MainCard';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// const DepositMaster = () => {
//   const [loading, setLoading] = useState(false);
//   const [properties, setProperties] = useState([]);
//   const [childProperties, setChildProperties] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState('');
//   const [selectedChildProperty, setSelectedChildProperty] = useState('');
//   const [deposit, setDeposit] = useState('');
//   const [filteredChildProps, setFilteredChildProps] = useState([]);
//   const [isEdit, setIsEdit] = useState(false);

//   useEffect(() => {
//     fetchProperties();
//     fetchChildProperties();
//   }, []);

//   const fetchProperties = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_API_URL}property`);
//       setProperties(response.data);
//     } catch (error) {
//       console.error('Error fetching properties:', error);
//       toast.error('Error fetching properties');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchChildProperties = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_API_URL}child_property`);
//       setChildProperties(response.data);
//     } catch (error) {
//       console.error('Error fetching child properties:', error);
//       toast.error('Error fetching child properties');
//     }
//   };

//   const handleOpenModal = () => {
//     setIsEdit(false);
//     setSelectedProperty('');
//     setSelectedChildProperty('');
//     setDeposit('');
//     setOpenModal(true);
//   };

//   const handleOpenEditModal = (childProp) => {
//     setIsEdit(true);
//     setSelectedProperty(childProp.property_id);
//     setSelectedChildProperty(childProp.id);
//     setDeposit(childProp.deposit);
//     filterChildProperties(childProp.property_id);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   const handlePropertyChange = (event) => {
//     const propId = event.target.value;
//     setSelectedProperty(propId);
//     filterChildProperties(propId);
//     setSelectedChildProperty('');
//   };

//   const filterChildProperties = (propertyId) => {
//     const filtered = childProperties.filter((cp) => cp.property_id === propertyId);
//     setFilteredChildProps(filtered);
//   };

//   const handleChildPropertyChange = (event) => {
//     const childPropId = event.target.value;
//     setSelectedChildProperty(childPropId);

//     // Pre-fill deposit value if available
//     const selectedChild = childProperties.find((cp) => cp.id === childPropId);
//     if (selectedChild) {
//       setDeposit(selectedChild.deposit || '');
//     }
//   };

//   const handleDepositChange = (event) => {
//     setDeposit(event.target.value);
//   };

//   const handleSubmit = async () => {
//     if (!selectedChildProperty || !deposit) {
//       alert('Please select a property and enter deposit amount');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Get current child property data
//       const childProp = childProperties.find((cp) => cp.id === selectedChildProperty);
//       if (!childProp) {
//         throw new Error('Child property not found');
//       }

//       // Update only the deposit value
//       const updatedData = {
//         ...childProp,
//         deposit: parseFloat(deposit)
//       };

//       // Format data as expected by the backend
//       const formData = new FormData();
//       formData.append('formData', JSON.stringify(updatedData));

//       await axios.put(`${import.meta.env.VITE_API_URL}child_property/${selectedChildProperty}`, formData);

//       // alert('Deposit updated successfully');
//       toast.success('Deposit updated successfully');
//       handleCloseModal();
//       fetchChildProperties(); // Refresh the data
//     } catch (error) {
//       console.error('Error updating deposit:', error);
//       alert('Failed to update deposit. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const navigateToChildPropertyPage = () => {
//     window.location.href = '/child-properties';
//   };

//   // Find property name by id
//   const getPropertyName = (propertyId) => {
//     const property = properties.find((p) => p.id === propertyId);
//     return property ? property.propertyName : 'Unknown';
//   };

//   return (
//     <MainCard title="Deposit Master">
//       <Card>
//         <CardContent>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//                 <Button variant="contained" color="primary" onClick={handleOpenModal}>
//                   Add New Deposit
//                 </Button>
//               </Box>

//               {loading ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
//                   <CircularProgress />
//                 </Box>
//               ) : (
//                 <TableContainer component={Paper}>
//                   <Table sx={{ minWidth: 650 }} aria-label="property table">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Property Name</TableCell>
//                         <TableCell>Unit Title</TableCell>
//                         <TableCell>Floor</TableCell>
//                         <TableCell>Deposit Amount</TableCell>
//                         <TableCell>Actions</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {childProperties.length > 0 ? (
//                         childProperties.map((childProp) => (
//                           <TableRow key={childProp.id}>
//                             <TableCell>{getPropertyName(childProp.property_id)}</TableCell>
//                             <TableCell>{childProp.title}</TableCell>
//                             <TableCell>{childProp.floor}</TableCell>
//                             <TableCell>{childProp.deposit || 'Not set'}</TableCell>
//                             <TableCell>
//                               <IconButton onClick={() => handleOpenEditModal(childProp)}>
//                                 <EditIcon />
//                               </IconButton>
//                             </TableCell>
//                           </TableRow>
//                         ))
//                       ) : (
//                         <TableRow>
//                           <TableCell colSpan={5} align="center">
//                             No properties found
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Add/Edit Deposit Modal */}
//       <Dialog open={openModal} onClose={handleCloseModal}>
//         <DialogTitle>{isEdit ? 'Update Deposit' : 'Add New Deposit'}</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel id="property-select-label">Parent Property</InputLabel>
//                 <Select
//                   labelId="property-select-label"
//                   id="property-select"
//                   value={selectedProperty}
//                   label="Parent Property"
//                   onChange={handlePropertyChange}
//                 >
//                   {properties.map((property) => (
//                     <MenuItem key={property.id} value={property.id}>
//                       {property.propertyName}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth disabled={!selectedProperty}>
//                 <InputLabel id="child-property-select-label">Child Property</InputLabel>
//                 <Select
//                   labelId="child-property-select-label"
//                   id="child-property-select"
//                   value={selectedChildProperty}
//                   label="Child Property"
//                   onChange={handleChildPropertyChange}
//                 >
//                   {filteredChildProps.length > 0 ? (
//                     filteredChildProps.map((childProp) => (
//                       <MenuItem key={childProp.id} value={childProp.id}>
//                         {childProp.title} (Floor: {childProp.floor})
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem disabled value="">
//                       No child properties found
//                     </MenuItem>
//                   )}
//                 </Select>
//               </FormControl>
//               {selectedProperty && filteredChildProps.length === 0 && (
//                 <Box sx={{ mt: 2 }}>
//                   <Button variant="contained" color="primary" onClick={navigateToChildPropertyPage}>
//                     Add Child Property
//                   </Button>
//                 </Box>
//               )}
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Deposit Amount"
//                 type="number"
//                 value={deposit}
//                 onChange={handleDepositChange}
//                 InputProps={{ inputProps: { min: 0 } }}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseModal}>Cancel</Button>
//           <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
//             {loading ? <CircularProgress size={24} /> : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* New Delete Confirmation Dialog */}
//     </MainCard>
//   );
// };

// export default DepositMaster;

// 27-03

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Divider,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeleteConfirmationModal from 'component/DeleteModal/DeleteConfirmationModal';
import PaginatedList from '../../component/Pagination/Pagination';

const itemsPerPage = 5;

const DepositMaster = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [properties, setProperties] = useState([]);
  const [childProperties, setChildProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [alertMessage, setAlertMessage] = useState({ open: false, message: '', severity: 'info' });
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedChildProperty, setSelectedChildProperty] = useState('');
  const [deposit, setDeposit] = useState('');
  const [filteredChildProps, setFilteredChildProps] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [childPropToDelete, setChildPropToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [propertiesRes, childPropertiesRes] = await Promise.all([
        axios.get(`${API_URL}property`),
        axios.get(`${API_URL}child_property`)
      ]);
      setProperties(propertiesRes.data);
      setChildProperties(childPropertiesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data. Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredChildProperties = useMemo(() => {
    if (!searchTerm.trim()) return childProperties;
    return childProperties.filter((childProp) => {
      const property = properties.find((p) => p.id === childProp.property_id);
      const searchValue = searchTerm.toLowerCase();
      return (
        property?.propertyName?.toLowerCase().includes(searchValue) ||
        childProp?.title?.toLowerCase().includes(searchValue) ||
        childProp?.floor?.toLowerCase().includes(searchValue) ||
        childProp?.deposit?.toString().includes(searchValue)
      );
    });
  }, [childProperties, properties, searchTerm]);

  const paginatedChildProperties = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredChildProperties.slice(start, end);
  }, [filteredChildProperties, currentPage]);

  const totalPages = Math.ceil(filteredChildProperties.length / itemsPerPage);

  const showAlert = (message, severity = 'info') => {
    setAlertMessage({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlertMessage({ ...alertMessage, open: false });
  };

  const handlePropertyChange = (event) => {
    const propId = event.target.value;
    setSelectedProperty(propId);
    filterChildProperties(propId);
    setSelectedChildProperty('');
  };

  const filterChildProperties = (propertyId) => {
    const filtered = childProperties.filter((cp) => cp.property_id === propertyId);
    setFilteredChildProps(filtered);
  };

  const handleChildPropertyChange = (event) => {
    const childPropId = event.target.value;
    setSelectedChildProperty(childPropId);
    const selectedChild = childProperties.find((cp) => cp.id === childPropId);
    if (selectedChild) setDeposit(selectedChild.deposit || '');
  };

  const handleSubmit = async () => {
    if (!selectedProperty || !selectedChildProperty || !deposit) {
      toast.error('Please fill all required fields');
      return;
    }
    try {
      const childProp = childProperties.find((cp) => cp.id === selectedChildProperty);
      const updatedData = { ...childProp, deposit: parseFloat(deposit) };
      const formData = new FormData();
      formData.append('formData', JSON.stringify(updatedData));

      if (isEdit) {
        await axios.put(`${API_URL}child_property/${selectedChildProperty}`, formData);
        toast.success('Deposit updated successfully!');
      } else {
        await axios.post(`${API_URL}child_property`, formData);
        toast.success('Deposit added successfully!');
      }
      fetchData();
      resetForm();
    } catch (error) {
      console.error('Error saving deposit:', error);
      toast.error('Failed to save deposit.');
    }
  };

  const resetForm = () => {
    setIsEdit(false);
    setSelectedProperty('');
    setSelectedChildProperty('');
    setDeposit('');
    setFilteredChildProps([]);
    setOpenModal(false);
  };

  const handleEditClick = (childProp) => {
    setIsEdit(true);
    setSelectedProperty(childProp.property_id);
    setSelectedChildProperty(childProp.id);
    setDeposit(childProp.deposit);
    filterChildProperties(childProp.property_id);
    setOpenModal(true);
  };

  const handleDeleteClick = (childProp) => {
    setChildPropToDelete(childProp);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (childPropToDelete) {
      try {
        await axios.delete(`${API_URL}child_property/${childPropToDelete.id}`);
        toast.success('Deposit deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting deposit:', error);
        toast.error('Failed to delete deposit!');
      } finally {
        setDeleteModalOpen(false);
        setChildPropToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setChildPropToDelete(null);
  };

  const getTotalDeposit = () => childProperties.reduce((sum, cp) => sum + (parseFloat(cp.deposit) || 0), 0);
  const getPropertyCount = () => new Set(childProperties.map((cp) => cp.property_id)).size;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: 'linear-gradient(to right, #e8f5e9, #c8e6c9)'
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" fontWeight="bold" color="primary.dark">
              Deposit Master
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Manage deposit amounts for properties and units
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Search deposits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  )
                }}
              />
              <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
                Add Deposit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Dashboard Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card
            elevation={2}
            sx={{
              borderLeft: '4px solid #4caf50',
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 20px -10px rgba(76, 175, 80, 0.28)' }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Total Units
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {childProperties.length}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, bgcolor: '#e8f5e9', borderRadius: '50%' }}>
                  <AssignmentIcon fontSize="large" color="success" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            elevation={2}
            sx={{
              borderLeft: '4px solid #2196f3',
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 20px -10px rgba(33, 150, 243, 0.28)' }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Properties
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {getPropertyCount()}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, bgcolor: '#e3f2fd', borderRadius: '50%' }}>
                  <CheckCircleIcon fontSize="large" color="primary" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            elevation={2}
            sx={{
              borderLeft: '4px solid #ff9800',
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 20px -10px rgba(255, 152, 0, 0.28)' }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Total Deposit
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    ₹{getTotalDeposit().toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, bgcolor: '#fff3e0', borderRadius: '50%' }}>
                  <AttachMoneyIcon fontSize="large" color="warning" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Deposit Listings */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Deposit Listings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          View and manage all deposit amounts
        </Typography>
        <Divider sx={{ mb: 3 }} />
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : filteredChildProperties.length > 0 ? (
          <>
            <TableContainer>
              <Table sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Property Name</TableCell>
                    <TableCell>Unit Title</TableCell>
                    <TableCell>Floor</TableCell>
                    <TableCell>Deposit Amount</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedChildProperties.map((childProp) => (
                    <TableRow key={childProp.id} hover>
                      <TableCell>{properties.find((p) => p.id === childProp.property_id)?.propertyName || 'Unknown'}</TableCell>
                      <TableCell>{childProp.title}</TableCell>
                      <TableCell>{childProp.floor}</TableCell>
                      <TableCell>₹{childProp.deposit?.toLocaleString() || 'Not set'}</TableCell>

                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Button
                            sx={{
                              color: '#2563eb', // text-blue-600
                              bgcolor: '#dbeafe', // bg-blue-100
                              px: 1.5, // px-3
                              py: 0.5, // py-1
                              borderRadius: '4px', // rounded
                              fontSize: '14px',
                              textTransform: 'none',
                              '&:hover': {
                                color: '#1e40af', // hover:text-blue-900
                                bgcolor: '#dbeafe'
                              }
                            }}
                            onClick={() => handleEditClick(childProp)}
                          >
                            Edit
                          </Button>
                          <Button
                            sx={{
                              color: '#dc2626', // text-red-600
                              bgcolor: '#fee2e2', // bg-red-100
                              px: 1.5, // px-3
                              py: 0.5, // py-1
                              borderRadius: '4px', // rounded
                              fontSize: '14px',
                              textTransform: 'none',
                              '&:hover': {
                                bgcolor: '#fecaca' // hover:bg-red-200
                              }
                            }}
                            onClick={() => handleDeleteClick(childProp)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 3 }}>
              <PaginatedList
                renters={filteredChildProperties}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6">{searchTerm ? 'No deposits found matching your search' : 'No deposits available'}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {searchTerm ? 'Try adjusting your search' : 'Click the "Add Deposit" button to get started'}
            </Typography>
            {searchTerm && (
              <Button sx={{ mt: 2 }} onClick={() => setSearchTerm('')} variant="outlined">
                Clear Search
              </Button>
            )}
          </Box>
        )}
      </Paper>

      {/* Add/Edit Deposit Modal */}
      <Dialog open={openModal} onClose={resetForm}>
        <DialogTitle>{isEdit ? 'Update Deposit' : 'Add New Deposit'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Parent Property</InputLabel>
                <Select value={selectedProperty} label="Parent Property" onChange={handlePropertyChange}>
                  {properties.map((property) => (
                    <MenuItem key={property.id} value={property.id}>
                      {property.propertyName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth disabled={!selectedProperty}>
                <InputLabel>Child Property</InputLabel>
                <Select value={selectedChildProperty} label="Child Property" onChange={handleChildPropertyChange}>
                  {filteredChildProps.length > 0 ? (
                    filteredChildProps.map((childProp) => (
                      <MenuItem key={childProp.id} value={childProp.id}>
                        {childProp.title} (Floor: {childProp.floor})
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled value="">
                      No child properties found
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Deposit Amount"
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetForm}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={isLoading || !selectedProperty || !selectedChildProperty || !deposit}
          >
            {isLoading ? <CircularProgress size={24} /> : isEdit ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert Snackbar */}
      <Snackbar
        open={alertMessage.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alertMessage.severity} sx={{ width: '100%' }}>
          {alertMessage.message}
        </Alert>
      </Snackbar>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this deposit entry?"
      />
    </Container>
  );
};

export default DepositMaster;
