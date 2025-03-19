// 18-03
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect, useMemo } from 'react';
import { ApiService } from './ApiService';
import AllocationTable from './AllocationTable';
import AllocationForm from './AllocationForm';
import AllocationDetailModal from './AllocationDetailModal';
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
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function RentalAllocation() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [allocations, setAllocations] = useState([]);
  const [properties, setProperties] = useState([]);
  const [renters, setRenters] = useState([]);
  const [childProperties, setChildProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [formData, setFormData] = useState({
    renter_id: '',
    property_id: '',
    childproperty_id: '',
    allocation_date: '',
    remarks: '',
    rent_agreement: null,
    other_document: null,
    status: 'Active'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [alertMessage, setAlertMessage] = useState({ open: false, message: '', severity: 'info' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const {
        allocations: allocationsData,
        properties: propertiesData,
        renters: rentersData,
        childProperties: childPropertiesData
      } = await ApiService.refreshAllData();
      setAllocations(allocationsData);
      setProperties(propertiesData);
      setRenters(rentersData);
      setChildProperties(childPropertiesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // showAlert('Failed to load data. Please try again.', 'error');
      toast.error('Failed to load data. Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAllocations = useMemo(() => {
    if (!searchTerm.trim()) return allocations;
    return allocations.filter((allocation) => {
      const renter = renters.find((r) => r.id === allocation.renter_id);
      const property = properties.find((p) => p.id === allocation.property_id);
      const childProperty = childProperties.find((cp) => cp.id === allocation.childproperty_id);
      const searchValue = searchTerm.toLowerCase();
      return (
        renter?.renterName?.toLowerCase().includes(searchValue) ||
        property?.propertyName?.toLowerCase().includes(searchValue) ||
        childProperty?.title?.toLowerCase().includes(searchValue) ||
        allocation?.rent?.toString().includes(searchValue) ||
        allocation?.status?.toLowerCase().includes(searchValue)
      );
    });
  }, [allocations, renters, properties, childProperties, searchTerm]);

  const showAlert = (message, severity = 'info') => {
    setAlertMessage({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlertMessage({ ...alertMessage, open: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append('renter_id', formData.renter_id);
      form.append('property_id', formData.property_id);
      form.append('childproperty_id', formData.childproperty_id);
      form.append('allocation_date', formData.allocation_date);
      form.append('remarks', formData.remarks);
      form.append('status', formData.status);

      if (formData.rent_agreement) form.append('agreementDocument', formData.rent_agreement);
      if (formData.other_document) form.append('idProof', formData.other_document);

      if (formMode === 'add') {
        await ApiService.createAllocation(form);
        // showAlert('Allocation created successfully!', 'success');
        toast.success('Allocation created successfully!');
      } else if (formMode === 'edit' && selectedAllocation) {
        await ApiService.updateAllocation(selectedAllocation.id || selectedAllocation.allocation_id, form);
        // showAlert('Allocation updated successfully!', 'success');
        toast.success('Allocation updated successfully!');
      }

      fetchData();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving allocation:', error);
      toast.error('Error saving allocation.');
      // showAlert(`Failed to ${formMode === 'add' ? 'save' : 'update'} allocation!`, 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      renter_id: '',
      property_id: '',
      childproperty_id: '',
      allocation_date: '',
      remarks: '',
      rent_agreement: null,
      other_document: null,
      status: 'Active'
    });
    setFormMode('add');
    setSelectedAllocation(null);
  };

  const handleEditClick = async (allocation) => {
    try {
      const allocationData = await ApiService.getAllocationDetails(allocation.id || allocation.allocation_id);
      setSelectedAllocation(allocationData);
      setFormData({
        renter_id: allocationData.renter_id || allocationData.renterId || '',
        property_id: allocationData.property_id || allocationData.propertyId || '',
        childproperty_id: allocationData.childproperty_id || '',
        allocation_date: allocationData.allocation_date || allocationData.startDate || '',
        remarks: allocationData.remarks || '',
        rent_agreement: null,
        other_document: null,
        status: allocationData.status || 'Active'
      });
      setFormMode('edit');
      setShowForm(true);
    } catch (error) {
      // showAlert('Failed to load allocation details.', 'error');
      toast.error('Failed to load allocation details.');
    }
  };

  const handleDetailsClick = async (allocation) => {
    try {
      const allocationData = await ApiService.getAllocationDetails(allocation.id || allocation.allocation_id);
      setSelectedAllocation(allocationData);
      setIsModalOpen(true);
    } catch (error) {
      // showAlert('Failed to load allocation details.', 'error');
      toast.error('Failed to load allocation details.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAllocation(null);
  };

  const handleDeleteClick = async (allocation) => {
    if (window.confirm('Are you sure you want to delete this allocation?')) {
      try {
        await ApiService.deleteAllocation(allocation.id);
        // showAlert('Allocation deleted successfully!', 'success');
        toast.error('Allocation deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error Deleting Allocation:', error);
        // showAlert('Failed to delete allocation!', 'error');
        toast.error('Failed to delete allocation!');
      }
    }
  };

  const getTotalRent = () => allocations.reduce((sum, allocation) => sum + (parseFloat(allocation.rent) || 0), 0);
  const getActiveAllocations = () => allocations.filter((a) => a.status === 'Active').length;

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
              Rental Allocation Management
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Manage property rentals and allocations in one place
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Search allocations..."
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
                startIcon={<AddIcon />}
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
              >
                Add Allocation
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
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 20px -10px rgba(76, 175, 80, 0.28)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Total Allocations
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {allocations.length}
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
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 20px -10px rgba(33, 150, 243, 0.28)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Active Allocations
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {getActiveAllocations()}
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
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 20px -10px rgba(255, 152, 0, 0.28)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Total Rent
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

      {/* Allocation Form Modal */}
      {/* <AllocationForm
        open={showForm}
        mode={formMode}
        allocation={selectedAllocation}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        onClose={() => setShowForm(false)}
        renters={renters}
        properties={properties}
        childProperties={childProperties}
        apiUrl={API_URL}
      /> */}

      <AllocationForm
        open={showForm}
        mode={formMode}
        allocation={formData} // This is an object
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        onClose={() => {
          resetForm();
          setShowForm(false);
        }}
        renters={renters}
        properties={properties}
        childProperties={childProperties}
        apiUrl={API_URL}
      />

      {/* Allocations Listing */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Allocation Listings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          View and manage all property rentals and allocations
        </Typography>
        <Divider sx={{ mb: 3 }} />
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : filteredAllocations.length > 0 ? (
          <AllocationTable
            allocations={filteredAllocations}
            renters={renters}
            properties={properties}
            childProperties={childProperties}
            onEdit={handleEditClick}
            onDetails={handleDetailsClick}
            apiUrl={API_URL}
            handleDeleteClick={handleDeleteClick}
          />
        ) : (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6">{searchTerm ? 'No allocations found matching your search' : 'No allocations available'}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {searchTerm ? 'Try adjusting your search' : 'Click the "Add Allocation" button to get started'}
            </Typography>
            {searchTerm && (
              <Button sx={{ mt: 2 }} onClick={() => setSearchTerm('')} variant="outlined">
                Clear Search
              </Button>
            )}
          </Box>
        )}
      </Paper>

      {/* Allocation Details Modal */}
      {isModalOpen && selectedAllocation && (
        <AllocationDetailModal
          allocation={selectedAllocation}
          onClose={closeModal}
          refreshAllocations={fetchData}
          apiUrl={API_URL}
          renters={renters}
          properties={properties}
          childProperties={childProperties}
        />
      )}

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
    </Container>
  );
}
