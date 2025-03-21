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

const DepositMaster = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [childProperties, setChildProperties] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedChildProperty, setSelectedChildProperty] = useState('');
  const [deposit, setDeposit] = useState('');
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
    setDeposit('');
    setOpenModal(true);
  };

  const handleOpenEditModal = (childProp) => {
    setIsEdit(true);
    setSelectedProperty(childProp.property_id);
    setSelectedChildProperty(childProp.id);
    setDeposit(childProp.deposit);
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
    
    // Pre-fill deposit value if available
    const selectedChild = childProperties.find(cp => cp.id === childPropId);
    if (selectedChild) {
      setDeposit(selectedChild.deposit || '');
    }
  };

  const handleDepositChange = (event) => {
    setDeposit(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedChildProperty || !deposit) {
      alert('Please select a property and enter deposit amount');
      return;
    }

    setLoading(true);
    try {
      // Get current child property data
      const childProp = childProperties.find(cp => cp.id === selectedChildProperty);
      if (!childProp) {
        throw new Error('Child property not found');
      }

      // Update only the deposit value
      const updatedData = {
        ...childProp,
        deposit: parseFloat(deposit)
      };

      // Format data as expected by the backend
      const formData = new FormData();
      formData.append('formData', JSON.stringify(updatedData));

      await axios.put(`${import.meta.env.VITE_API_URL}child_property/${selectedChildProperty}`, formData);
      
      alert('Deposit updated successfully');
      handleCloseModal();
      fetchChildProperties(); // Refresh the data
    } catch (error) {
      console.error('Error updating deposit:', error);
      alert('Failed to update deposit. Please try again.');
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
    <MainCard title="Deposit Master">
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                  Add New Deposit
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
                        <TableCell>Deposit Amount</TableCell>
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
                            <TableCell>{childProp.deposit || 'Not set'}</TableCell>
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

      {/* Add/Edit Deposit Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{isEdit ? 'Update Deposit' : 'Add New Deposit'}</DialogTitle>
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
                label="Deposit Amount"
                type="number"
                value={deposit}
                onChange={handleDepositChange}
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

export default DepositMaster;
