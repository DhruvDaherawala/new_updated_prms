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

// const RentMaster = () => {
//   const [loading, setLoading] = useState(false);
//   const [properties, setProperties] = useState([]);
//   const [childProperties, setChildProperties] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState('');
//   const [selectedChildProperty, setSelectedChildProperty] = useState('');
//   const [rent, setRent] = useState('');
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
//     }
//   };

//   const handleOpenModal = () => {
//     setIsEdit(false);
//     setSelectedProperty('');
//     setSelectedChildProperty('');
//     setRent('');
//     setOpenModal(true);
//   };

//   const handleOpenEditModal = (childProp) => {
//     setIsEdit(true);
//     setSelectedProperty(childProp.property_id);
//     setSelectedChildProperty(childProp.id);
//     setRent(childProp.rent);
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
//     const filtered = childProperties.filter(cp => cp.property_id === propertyId);
//     setFilteredChildProps(filtered);
//   };

//   const handleChildPropertyChange = (event) => {
//     const childPropId = event.target.value;
//     setSelectedChildProperty(childPropId);

//     // Pre-fill rent value if available
//     const selectedChild = childProperties.find(cp => cp.id === childPropId);
//     if (selectedChild) {
//       setRent(selectedChild.rent || '');
//     }
//   };

//   const handleRentChange = (event) => {
//     setRent(event.target.value);
//   };

//   const handleSubmit = async () => {
//     if (!selectedChildProperty || !rent) {
//       alert('Please select a property and enter rent amount');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Get current child property data
//       const childProp = childProperties.find(cp => cp.id === selectedChildProperty);
//       if (!childProp) {
//         throw new Error('Child property not found');
//       }

//       // Update only the rent value
//       const updatedData = {
//         ...childProp,
//         rent: parseFloat(rent)
//       };

//       // Format data as expected by the backend
//       const formData = new FormData();
//       formData.append('formData', JSON.stringify(updatedData));

//       await axios.put(`${import.meta.env.VITE_API_URL}child_property/${selectedChildProperty}`, formData);

//       alert('Rent updated successfully');
//       handleCloseModal();
//       fetchChildProperties(); // Refresh the data
//     } catch (error) {
//       console.error('Error updating rent:', error);
//       alert('Failed to update rent. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const navigateToChildPropertyPage = () => {
//     window.location.href = '/child-properties';
//   };

//   // Find property name by id
//   const getPropertyName = (propertyId) => {
//     const property = properties.find(p => p.id === propertyId);
//     return property ? property.propertyName : 'Unknown';
//   };

//   return (
//     <MainCard title="Rent Master">
//       <Card>
//         <CardContent>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//                 <Button variant="contained" color="primary" onClick={handleOpenModal}>
//                   Add New Rent
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
//                         <TableCell>Rent Amount</TableCell>
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
//                             <TableCell>{childProp.rent || 'Not set'}</TableCell>
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

//       {/* Add/Edit Rent Modal */}
//       <Dialog open={openModal} onClose={handleCloseModal}>
//         <DialogTitle>{isEdit ? 'Update Rent' : 'Add New Rent'}</DialogTitle>
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
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={navigateToChildPropertyPage}
//                   >
//                     Add Child Property
//                   </Button>
//                 </Box>
//               )}
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Rent Amount"
//                 type="number"
//                 value={rent}
//                 onChange={handleRentChange}
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
//     </MainCard>
//   );
// };

// export default RentMaster;

// 26-03

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  IconButton,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MainCard from '../../component/MainCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeleteConfirmationModal from 'component/DeleteModal/DeleteConfirmationModal';
import PaginatedList from '../../component/Pagination/Pagination'; // Add this import

const itemsPerPage = 5; // Set items per page, same as RenterList

const RentMaster = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [childProperties, setChildProperties] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedChildProperty, setSelectedChildProperty] = useState('');
  const [rent, setRent] = useState('');
  const [filteredChildProps, setFilteredChildProps] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state

  useEffect(() => {
    fetchProperties();
    fetchChildProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}property`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Error fetching properties');
    } finally {
      setLoading(false);
    }
  };

  const fetchChildProperties = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}child_property`);
      setChildProperties(response.data);
    } catch (error) {
      console.error('Error fetching child properties:', error);
      toast.error('Error fetching child properties');
    }
  };

  // Modal and Form Management
  const handleOpenModal = () => {
    resetModalState(false);
  };

  const handleOpenEditModal = (childProp) => {
    setIsEdit(true);
    setSelectedProperty(childProp.property_id);
    setSelectedChildProperty(childProp.id);
    setRent(childProp.rent);
    filterChildProperties(childProp.property_id);
    setOpenModal(true);
  };

  const resetModalState = (isEditMode = false) => {
    setIsEdit(isEditMode);
    setSelectedProperty('');
    setSelectedChildProperty('');
    setRent('');
    setFilteredChildProps([]);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Property and Child Property Handling
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
    if (selectedChild) {
      setRent(selectedChild.rent || '');
    }
  };

  // CRUD Operations
  const handleSubmit = async () => {
    if (!selectedProperty || !selectedChildProperty || !rent) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const childProp = childProperties.find((cp) => cp.id === selectedChildProperty);

      const updatedData = {
        ...childProp,
        rent: parseFloat(rent)
      };

      const formData = new FormData();
      formData.append('formData', JSON.stringify(updatedData));

      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_API_URL}child_property/${selectedChildProperty}`, formData);
        toast.success('Rent updated successfully');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}child_property`, formData);
        toast.success('Rent added successfully');
      }

      handleCloseModal();
      fetchChildProperties();
    } catch (error) {
      console.error('Error saving rent:', error);
      toast.error('Failed to save rent. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete Functionality
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}child_property/${deleteId}`);
      toast.success('Child property rent deleted successfully');
      fetchChildProperties();
      setOpenDeleteConfirm(false);
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting child property rent:', error);
      toast.error('Failed to delete child property rent');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteConfirm(false);
    setDeleteId(null);
  };

  // Utility Functions
  const getPropertyName = (propertyId) => {
    const property = properties.find((p) => p.id === propertyId);
    return property ? property.propertyName : 'Unknown';
  };

  const navigateToChildPropertyPage = () => {
    window.location.href = '/child-properties';
  };

  // Pagination Logic
  const totalPages = Math.ceil(childProperties.length / itemsPerPage);
  const paginatedChildProperties = childProperties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <MainCard title="Rent Master">
      <Card
        sx={{
          p: 3,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
          },
          transition: 'box-shadow 0.3s ease-in-out'
        }}
      >
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                  Add New Rent
                </Button>
              </Box>

              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="property table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Property Name</TableCell>
                        <TableCell>Unit Title</TableCell>
                        <TableCell>Floor</TableCell>
                        <TableCell>Rent Amount</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedChildProperties.length > 0 ? (
                        paginatedChildProperties.map((childProp) => (
                          <TableRow key={childProp.id} hover>
                            <TableCell>{getPropertyName(childProp.property_id)}</TableCell>
                            <TableCell>{childProp.title}</TableCell>
                            <TableCell>{childProp.floor}</TableCell>
                            <TableCell>{childProp.rent || 'Not set'}</TableCell>
                            <TableCell>
                              <IconButton onClick={() => handleOpenEditModal(childProp)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton onClick={() => handleDeleteClick(childProp.id)}>
                                <DeleteIcon color="error" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            <Typography variant="body1" color="textSecondary">
                              No properties found
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {/* Pagination */}
              {childProperties.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <PaginatedList
                    renters={childProperties} // Pass childProperties as renters
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Add/Edit Rent Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{isEdit ? 'Update Rent' : 'Add New Rent'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="property-select-label">Parent Property</InputLabel>
                <Select
                  labelId="property-select-label"
                  id="property-select"
                  value={selectedProperty}
                  label="Parent Property"
                  onChange={handlePropertyChange}
                >
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
                <InputLabel id="child-property-select-label">Child Property</InputLabel>
                <Select
                  labelId="child-property-select-label"
                  id="child-property-select"
                  value={selectedChildProperty}
                  label="Child Property"
                  onChange={handleChildPropertyChange}
                >
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
              {selectedProperty && filteredChildProps.length === 0 && (
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" color="primary" onClick={navigateToChildPropertyPage}>
                    Add Child Property
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Rent Amount"
                type="number"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading || !selectedProperty || !selectedChildProperty || !rent}
          >
            {loading ? <CircularProgress size={24} /> : isEdit ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={openDeleteConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this rent entry?"
      />
    </MainCard>
  );
};

export default RentMaster;
