// ChildPropertyMasterForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ChildPropertyList from './ChildPropertyList';
import ChildPropertyForm from './ChildPropertyForm';
import ChildPropertyDetailModal from './ChildPropertyDetailModal';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  TextField,
  Paper,
  CircularProgress,
  Container,
  Card,
  CardContent,
  Divider,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function ChildPropertyMasterForm() {
  // VITE_API_URL should include the /api/ prefix
  const API_URL = import.meta.env.VITE_API_URL; // e.g., http://localhost:5000/api/

  const [childProperties, setChildProperties] = useState([]);
  const [parentProperties, setParentProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [floorError, setFloorError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: null,
    property_id: '',
    floor: '',
    title: '',
    description: '',
    rooms: '',
    washroom: '',
    gas: '',
    electricity: '',
    deposit: '',
    rent: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChildProperty, setSelectedChildProperty] = useState(null);

  useEffect(() => {
    fetchChildProperties();
    fetchParentProperties();
  }, []);

  const fetchChildProperties = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}child_property`);
      setChildProperties(response.data);
    } catch (error) {
      console.error('Error fetching child properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchParentProperties = async () => {
    try {
      const response = await axios.get(`${API_URL}property`);
      setParentProperties(response.data);
    } catch (error) {
      console.error('Error fetching parent properties:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'property_id') {
      // When parent changes, reset the floor value and error
      setFormData((prev) => ({ ...prev, property_id: value, floor: '' }));
      setFloorError('');
    } else if (name === 'floor') {
      // Validate floor against the parent's numberOfFloors
      const selectedParent = parentProperties.find((p) => p.id === parseInt(formData.property_id));
      const floorValue = parseInt(value);
      if (selectedParent && floorValue > selectedParent.numberOfFloors) {
        setFloorError(`Maximum floor for ${selectedParent.propertyName} is ${selectedParent.numberOfFloors}`);
      } else {
        setFloorError('');
      }
      setFormData((prev) => ({ ...prev, floor: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (floorError) {
      alert('Please fix the errors before submitting.');
      return;
    }
    try {
      const form = new FormData();
      form.append('formData', JSON.stringify(formData));

      if (formData.id) {
        // Update existing child property
        await axios.put(`${API_URL}child_property/${formData.id}`, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Child property updated successfully!');
      } else {
        // Create new child property
        await axios.post(`${API_URL}child_property`, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Child property created successfully!');
      }
      fetchChildProperties();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving child property:', error);
      alert('Failed to save child property!');
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      property_id: '',
      floor: '',
      title: '',
      description: '',
      rooms: '',
      washroom: '',
      gas: '',
      electricity: '',
      deposit: '',
      rent: ''
    });
    setFloorError('');
  };

  const handleEditClick = (childProperty) => {
    try {
      setFormData({
        id: childProperty.id,
        property_id: childProperty.property_id.toString(),
        floor: childProperty.floor,
        title: childProperty.title,
        description: childProperty.description,
        rooms: childProperty.rooms,
        washroom: childProperty.washroom,
        gas: childProperty.gas,
        electricity: childProperty.electricity,
        deposit: childProperty.deposit,
        rent: childProperty.rent
      });
      setShowForm(true);
    } catch (error) {
      console.error('Error setting form data:', error);
      alert('Failed to load child property details for editing.');
    }
  };

  const handleDetailsClick = async (childProperty) => {
    try {
      setSelectedChildProperty(childProperty);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error showing details:', error);
      alert('Failed to load child property details.');
    }
  };

  const handleDeleteClick = async (childProperty) => {
    if (window.confirm('Are you sure you want to delete this child property?')) {
      try {
        await axios.delete(`${API_URL}child_property/${childProperty.id}`);
        alert('Child property deleted successfully!');
        fetchChildProperties();
      } catch (error) {
        console.error('Error deleting child property:', error);
        alert('Failed to delete child property!');
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChildProperty(null);
  };

  // Filter child properties based on search term
  const filteredChildProperties = childProperties.filter(
    (childProperty) => {
      const parentProperty = parentProperties.find(p => p.id === childProperty.property_id);
      const searchValue = searchTerm.toLowerCase();
      
      return (
        childProperty.title?.toLowerCase().includes(searchValue) ||
        childProperty.description?.toLowerCase().includes(searchValue) ||
        parentProperty?.propertyName?.toLowerCase().includes(searchValue) ||
        childProperty.floor?.toString().toLowerCase().includes(searchValue) ||
        childProperty.rent?.toString().includes(searchValue)
      );
    }
  );

  // Calculate statistics for dashboard
  const getTotalRent = () => {
    return childProperties.reduce((sum, cp) => sum + (parseFloat(cp.rent) || 0), 0);
  };

  const getActiveCount = () => {
    return childProperties.filter(cp => cp.status === 'Active').length;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: 'linear-gradient(to right, #e0f7fa, #b2ebf2)'
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" fontWeight="bold" color="primary.dark">
              Child Property Management
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Manage all your property units and floors in one place
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                placeholder="Search child properties..."
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
              <Button
                variant="contained"
                color="primary"
                startIcon={showForm ? <CloseIcon /> : <AddIcon />}
                onClick={() => {
                  if (showForm) {
                    setShowForm(false);
                    resetForm();
                  } else {
                    setShowForm(true);
                  }
                }}
              >
                {showForm ? "Close Form" : "Add Child Property"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Dashboard Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderLeft: '4px solid #00acc1', height: '100%' }}>
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
                <Box sx={{ p: 1.5, bgcolor: '#e0f7fa', borderRadius: '50%' }}>
                  <ApartmentIcon fontSize="large" color="primary" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderLeft: '4px solid #4caf50', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Active Units
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {getActiveCount()}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, bgcolor: '#e8f5e9', borderRadius: '50%' }}>
                  <CheckCircleIcon fontSize="large" color="success" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderLeft: '4px solid #ff9800', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Total Rent Value
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    ₹{getTotalRent().toLocaleString()}
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

      {/* Add/Edit Child Property Form */}
      {showForm && (
        <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            {formData.id ? 'Edit Child Property' : 'Add New Child Property'}
          </Typography>
          <ChildPropertyForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            parentProperties={parentProperties}
            floorError={floorError}
          />
        </Paper>
      )}

      {/* Child Properties Listing */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Child Property Listings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          View and manage all your property units
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : filteredChildProperties.length > 0 ? (
          <ChildPropertyList
            childProperties={filteredChildProperties}
            parentProperties={parentProperties}
            onDetailsClick={handleDetailsClick}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ) : (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6">
              {searchTerm ? 'No child properties found matching your search' : 'No child properties available'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {searchTerm ? 'Try adjusting your search' : 'Click the "Add Child Property" button to get started'}
            </Typography>
            {searchTerm && (
              <Button
                sx={{ mt: 2 }}
                onClick={() => setSearchTerm('')}
                variant="outlined"
              >
                Clear Search
              </Button>
            )}
          </Box>
        )}
      </Paper>

      {/* Child Property Details Modal */}
      {isModalOpen && selectedChildProperty && (
        <Dialog 
          open={isModalOpen} 
          onClose={closeModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h6">
              Child Property Details
            </Typography>
            <IconButton
              onClick={closeModal}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <ChildPropertyDetailModal 
              childProperty={selectedChildProperty} 
              parentProperties={parentProperties} 
              onClose={closeModal}
              refreshChildProperties={fetchChildProperties}
              apiUrl={API_URL}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
