import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
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
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MainCard from '../../component/MainCard';
import axios from 'axios';

const RentMaster = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [childProperties, setChildProperties] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedChildProperty, setSelectedChildProperty] = useState('');
  const [rent, setRent] = useState('');
  const [filteredChildProps, setFilteredChildProps] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

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
    }
  };

  const handleOpenModal = () => {
    setIsEdit(false);
    setSelectedProperty('');
    setSelectedChildProperty('');
    setRent('');
    setOpenModal(true);
  };

  const handleOpenEditModal = (childProp) => {
    setIsEdit(true);
    setSelectedProperty(childProp.property_id);
    setSelectedChildProperty(childProp.id);
    setRent(childProp.rent);
    filterChildProperties(childProp.property_id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePropertyChange = (event) => {
    const propId = event.target.value;
    setSelectedProperty(propId);
    filterChildProperties(propId);
    setSelectedChildProperty('');
  };

  const filterChildProperties = (propertyId) => {
    const filtered = childProperties.filter(cp => cp.property_id === propertyId);
    setFilteredChildProps(filtered);
  };

  const handleChildPropertyChange = (event) => {
    const childPropId = event.target.value;
    setSelectedChildProperty(childPropId);
    
    // Pre-fill rent value if available
    const selectedChild = childProperties.find(cp => cp.id === childPropId);
    if (selectedChild) {
      setRent(selectedChild.rent || '');
    }
  };

  const handleRentChange = (event) => {
    setRent(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedChildProperty || !rent) {
      alert('Please select a property and enter rent amount');
      return;
    }

    setLoading(true);
    try {
      // Get current child property data
      const childProp = childProperties.find(cp => cp.id === selectedChildProperty);
      if (!childProp) {
        throw new Error('Child property not found');
      }

      // Update only the rent value
      const updatedData = {
        ...childProp,
        rent: parseFloat(rent)
      };

      // Format data as expected by the backend
      const formData = new FormData();
      formData.append('formData', JSON.stringify(updatedData));

      await axios.put(`${import.meta.env.VITE_API_URL}child_property/${selectedChildProperty}`, formData);
      
      alert('Rent updated successfully');
      handleCloseModal();
      fetchChildProperties(); // Refresh the data
    } catch (error) {
      console.error('Error updating rent:', error);
      alert('Failed to update rent. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const navigateToChildPropertyPage = () => {
    window.location.href = '/child-properties';
  };

  // Find property name by id
  const getPropertyName = (propertyId) => {
    const property = properties.find(p => p.id === propertyId);
    return property ? property.propertyName : 'Unknown';
  };

  return (
    <MainCard title="Rent Master">
      <Card>
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
                      {childProperties.length > 0 ? (
                        childProperties.map((childProp) => (
                          <TableRow key={childProp.id}>
                            <TableCell>{getPropertyName(childProp.property_id)}</TableCell>
                            <TableCell>{childProp.title}</TableCell>
                            <TableCell>{childProp.floor}</TableCell>
                            <TableCell>{childProp.rent || 'Not set'}</TableCell>
                            <TableCell>
                              <IconButton onClick={() => handleOpenEditModal(childProp)}>
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            No properties found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
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
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={navigateToChildPropertyPage}
                  >
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
                onChange={handleRentChange}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default RentMaster;
