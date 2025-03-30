import { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyList from './PropertyList1';
import PropertyDetailModal from './PropertyDetailModal1';
import { toast } from 'react-toastify';
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
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DeleteConfirmationModal from '../DeleteModal/DeleteConfirmationModal';

export default function PropertyMasterForm() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [properties, setProperties] = useState([]);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    propertyName: '',
    ownerName: '',
    address: '',
    numberOfFloors: '',
    document: null
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Added states for delete confirmation
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get(`${API_URL}property`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Error fetching properties');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProperties = properties.filter((property) => {
    if (searchTerm === 'Active' || searchTerm === 'Inactive' || searchTerm === 'Available') {
      if (searchTerm === 'Available') {
        return !property.hasRenters;
      } else {
        return property.status?.toLowerCase() === searchTerm.toLowerCase();
      }
    }
    return (
      property.propertyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleEditClick = async (prop) => {
    try {
      const response = await axios.get(`${API_URL}property/with-children/${prop.id}`);
      setSelectedProperty({ ...response.data, isEditing: true, isChildEditing: true });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching property details:', error);
      toast.error('Failed to load property details.');
    }
  };

  const handleDetailsClick = async (prop) => {
    try {
      const response = await axios.get(`${API_URL}property/with-children/${prop.id}`);
      setSelectedProperty(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching property details:', error);
      toast.error('Failed to load property details.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (propertyToDelete) {
      try {
        await axios.delete(`${API_URL}property/${propertyToDelete.id}`);
        toast.error('Property deleted successfully!');
        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
        toast.error('Failed to delete property!');
      } finally {
        setDeleteModalOpen(false);
        setPropertyToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setPropertyToDelete(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFormData({ ...formData, document: event.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const form = new FormData();
      const textData = {
        propertyName: formData.propertyName,
        ownerName: formData.ownerName,
        address: formData.address,
        numberOfFloors: formData.numberOfFloors,
        status: 'Active'
      };
      form.append('formData', JSON.stringify(textData));
      if (formData.document) {
        form.append('documents', formData.document);
      }
      await axios.post(`${API_URL}property`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Property saved successfully');
      fetchProperties();
      setShowAddPropertyModal(false);
      setFormData({
        propertyName: '',
        ownerName: '',
        address: '',
        numberOfFloors: '',
        document: null
      });
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error('Failed to save property!');
    }
  };

  const getActiveProperties = () => {
    return properties.filter((p) => p.status === 'active' || p.status === 'Active').length;
  };

  const getAvailableProperties = () => {
    return properties.filter((p) => !p.hasRenters).length;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2, background: 'linear-gradient(to right, #e1f5fe, #b3e5fc)' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" fontWeight="bold" color="primary.dark">
              Property Management
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Manage all your properties in one place
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                sx={{ flexGrow: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  )
                }}
              />
              <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setShowAddPropertyModal(true)}>
                Add Property
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
              borderLeft: '4px solid #2196f3',
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 20px -10px rgba(33, 150, 243, 0.28)' }
            }}
            onClick={() => setSearchTerm('')}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Total Properties
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {properties.length}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, bgcolor: '#e3f2fd', borderRadius: '50%' }}>
                  <ApartmentIcon fontSize="large" color="primary" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            elevation={2}
            sx={{
              borderLeft: '4px solid #4caf50',
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 20px -10px rgba(76, 175, 80, 0.28)' }
            }}
            onClick={() => setSearchTerm('Active')}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Active Properties
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {getActiveProperties()}
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
          <Card
            elevation={2}
            sx={{
              borderLeft: '4px solid #ff9800',
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 20px -10px rgba(255, 152, 0, 0.28)' }
            }}
            onClick={() => setSearchTerm('Available')}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Available Properties
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {getAvailableProperties()}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, bgcolor: '#fff3e0', borderRadius: '50%' }}>
                  <HomeIcon fontSize="large" color="warning" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Properties Listing */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Property Listings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          View and manage all your properties
        </Typography>
        <Divider sx={{ mb: 3 }} />
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : filteredProperties.length > 0 ? (
          <PropertyList
            properties={filteredProperties}
            onEdit={handleEditClick}
            onDetails={handleDetailsClick}
            handleDeleteClick={handleDeleteClick}
            apiUrl={API_URL}
            onAddClick={() => setShowAddPropertyModal(true)}
          />
        ) : (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6">{searchTerm ? 'No properties found matching your search' : 'No properties available'}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {searchTerm ? 'Try adjusting your search' : 'Click the "Add Property" button to get started'}
            </Typography>
            {searchTerm && (
              <Button sx={{ mt: 2 }} onClick={() => setSearchTerm('')} variant="outlined">
                Clear Search
              </Button>
            )}
          </Box>
        )}
      </Paper>

      {/* Add Property Modal */}
      <Dialog open={showAddPropertyModal} onClose={() => setShowAddPropertyModal(false)} fullWidth maxWidth="md">
        <DialogTitle>
          <Typography variant="h6">Add Property</Typography>
          <IconButton onClick={() => setShowAddPropertyModal(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Property Name"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Owner Name"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Number of Floors"
                name="numberOfFloors"
                value={formData.numberOfFloors}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label" startIcon={<AttachFileIcon />}>
                Upload Document
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              {formData.document && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  File: {formData.document.name}
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddPropertyModal(false)} startIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} startIcon={<SaveIcon />} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Property Details Modal */}
      {isModalOpen && selectedProperty && (
        <Dialog open={isModalOpen} onClose={closeModal} maxWidth="md" fullWidth>
          <DialogTitle>
            <Typography variant="h6">Property Details</Typography>
            <IconButton onClick={closeModal} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <PropertyDetailModal property={selectedProperty} onClose={closeModal} refreshProperties={fetchProperties} apiUrl={API_URL} />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this property?"
      />
    </Container>
  );
}
