import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment,
  Divider,
  Box,
  Chip,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

export default function AllocationForm({
  open,
  mode = 'add',
  allocation,
  onInputChange,
  onFileChange,
  onSubmit,
  onClose,
  renters,
  properties,
  childProperties,
  apiUrl
}) {
  const [errors, setErrors] = useState({});
  const [filteredChildProperties, setFilteredChildProperties] = useState([]);
  const [currentRenter, setCurrentRenter] = useState(null);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState('');
  const [availableFloors, setAvailableFloors] = useState([]);

  useEffect(() => {
    if (mode === 'edit' && allocation) {
      onInputChange({ target: { name: 'renter_id', value: allocation.renter_id || allocation.renterId || '' } });
      onInputChange({ target: { name: 'property_id', value: allocation.property_id || allocation.propertyId || '' } });
      onInputChange({ target: { name: 'childproperty_id', value: allocation.childproperty_id || '' } });
      onInputChange({ target: { name: 'allocation_date', value: allocation.allocation_date || allocation.startDate || '' } });
      onInputChange({ target: { name: 'rent', value: allocation.rent || '' } });
      onInputChange({ target: { name: 'remarks', value: allocation.remarks || '' } });
      onInputChange({ target: { name: 'status', value: allocation.status || 'Active' } });
      
      // Set current renter and property for display
      setCurrentRenter(renters.find(r => r.id === (allocation.renter_id || allocation.renterId)));
      setCurrentProperty(properties.find(p => p.id === (allocation.property_id || allocation.propertyId)));
      
      // If in edit mode, set the floor value based on the selected child property
      if (allocation.childproperty_id) {
        const childProp = childProperties.find(cp => cp.id === allocation.childproperty_id);
        if (childProp && childProp.floor) {
          setSelectedFloor(childProp.floor);
        }
      }
    }
  }, [mode, allocation, onInputChange, renters, properties, childProperties]);

  useEffect(() => {
    // Filter child properties based on selected property
    if (allocation?.property_id || allocation?.propertyId) {
      const propertyId = allocation.property_id || allocation.propertyId;
      
      // Find all child properties for this property
      const allChildPropertiesForThisProperty = childProperties.filter(cp => cp.property_id === propertyId);
      
      // Extract unique floors for this property
      const uniqueFloors = [...new Set(allChildPropertiesForThisProperty.map(cp => cp.floor))].filter(Boolean);
      uniqueFloors.sort((a, b) => {
        const aNum = parseInt(a);
        const bNum = parseInt(b);
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return aNum - bNum;
        }
        return a.localeCompare(b);
      });
      setAvailableFloors(uniqueFloors);
      
      // Filter child properties based on both property and selected floor (if any)
      let filtered = allChildPropertiesForThisProperty;
      if (selectedFloor) {
        filtered = filtered.filter(cp => cp.floor === selectedFloor);
      }
      
      setFilteredChildProperties(filtered);
      
      // Find selected property
      const property = properties.find(p => p.id === propertyId);
      setCurrentProperty(property);
      
      // If there's only one floor available, auto-select it
      if (uniqueFloors.length === 1 && !selectedFloor) {
        setSelectedFloor(uniqueFloors[0]);
      }
    } else {
      setFilteredChildProperties([]);
      setAvailableFloors([]);
      setCurrentProperty(null);
    }
  }, [allocation?.property_id, allocation?.propertyId, childProperties, properties, selectedFloor]);

  useEffect(() => {
    // Set current renter for display
    if (allocation?.renter_id || allocation?.renterId) {
      const renterId = allocation.renter_id || allocation.renterId;
      const renter = renters.find(r => r.id === renterId);
      setCurrentRenter(renter);
    } else {
      setCurrentRenter(null);
    }
  }, [allocation?.renter_id, allocation?.renterId, renters]);

  const handleFloorChange = (event) => {
    const floorValue = event.target.value;
    setSelectedFloor(floorValue);
    
    // Clear child property selection since floor has changed
    onInputChange({ target: { name: 'childproperty_id', value: '' } });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!allocation?.renter_id && !allocation?.renterId) {
      newErrors.renter_id = 'Renter is required';
    }
    
    if (!allocation?.property_id && !allocation?.propertyId) {
      newErrors.property_id = 'Property is required';
    }
    
    if (!allocation?.allocation_date && !allocation?.startDate) {
      newErrors.allocation_date = 'Allocation date is required';
    }
    
    if (!allocation?.rent && allocation?.rent !== 0) {
      newErrors.rent = 'Rent amount is required';
    } else if (isNaN(allocation.rent) || Number(allocation.rent) < 0) {
      newErrors.rent = 'Rent must be a valid positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitWithValidation = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)', px: 3, py: 2 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          {mode === 'add' ? 'Add New Rental Allocation' : 'Edit Rental Allocation'}
        </Typography>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 3 }}>
        {mode === 'edit' && (
          <Alert severity="info" sx={{ mb: 3 }}>
            Editing allocation for{' '}
            {currentRenter ? currentRenter.renterName || currentRenter.renter_name : 'Unknown Renter'} at{' '}
            {currentProperty ? currentProperty.propertyName || currentProperty.property_name : 'Unknown Property'}
          </Alert>
        )}
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium', color: 'primary.main' }}>
            Allocation Details
          </Typography>
          <Divider />
        </Box>
        
        <Grid container spacing={3}>
          {/* Renter Selection */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" error={!!errors.renter_id}>
              <InputLabel>Renter</InputLabel>
              <Select
                label="Renter"
                name="renter_id"
                value={allocation?.renter_id || allocation?.renterId || ''}
                onChange={onInputChange}
                required
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                }
              >
                <MenuItem value="">
                  <em>-- Select Renter --</em>
                </MenuItem>
                {renters.map((renter) => (
                  <MenuItem key={renter.id || renter.renter_id} value={renter.id || renter.renter_id}>
                    {renter.renterName || renter.renter_name}
                  </MenuItem>
                ))}
              </Select>
              {errors.renter_id && <FormHelperText error>{errors.renter_id}</FormHelperText>}
            </FormControl>
          </Grid>

          {/* Property Selection */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" error={!!errors.property_id}>
              <InputLabel>Master Property</InputLabel>
              <Select
                label="Master Property"
                name="property_id"
                value={allocation?.property_id || allocation?.propertyId || ''}
                onChange={(e) => {
                  onInputChange(e);
                  setSelectedFloor('');
                  onInputChange({ target: { name: 'childproperty_id', value: '' } });
                }}
                required
                startAdornment={
                  <InputAdornment position="start">
                    <HomeIcon color="primary" />
                  </InputAdornment>
                }
              >
                <MenuItem value="">
                  <em>-- Select Master Property --</em>
                </MenuItem>
                {properties.map((property) => (
                  <MenuItem key={property.id || property.property_id} value={property.id || property.property_id}>
                    {property.propertyName || property.property_name}
                  </MenuItem>
                ))}
              </Select>
              {errors.property_id && <FormHelperText error>{errors.property_id}</FormHelperText>}
            </FormControl>
          </Grid>
          
          {/* Floor Selection - New Component */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" disabled={!allocation?.property_id && !allocation?.propertyId}>
              <InputLabel>Floor</InputLabel>
              <Select 
                label="Floor" 
                value={selectedFloor} 
                onChange={handleFloorChange}
                startAdornment={
                  <InputAdornment position="start">
                    <ViewInArIcon color="primary" />
                  </InputAdornment>
                }
              >
                <MenuItem value="">
                  <em>-- Select Floor --</em>
                </MenuItem>
                {availableFloors.length > 0 ? (
                  availableFloors.map((floor) => (
                    <MenuItem key={floor} value={floor}>
                      Floor {floor}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>
                    <em>No floors available</em>
                  </MenuItem>
                )}
              </Select>
              <FormHelperText>Select a floor from the property</FormHelperText>
            </FormControl>
          </Grid>

          {/* Unit/Room Selection */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Unit/Room</InputLabel>
              <Select 
                label="Unit/Room" 
                name="childproperty_id" 
                value={allocation?.childproperty_id || ''} 
                onChange={onInputChange}
                startAdornment={
                  <InputAdornment position="start">
                    <ApartmentIcon color="primary" />
                  </InputAdornment>
                }
                disabled={!selectedFloor || filteredChildProperties.length === 0}
              >
                <MenuItem value="">
                  <em>-- Select Unit/Room --</em>
                </MenuItem>
                {filteredChildProperties.length > 0 ? (
                  filteredChildProperties.map((childProperty) => (
                    <MenuItem
                      key={childProperty.id || childProperty.childproperty_id}
                      value={childProperty.id || childProperty.childproperty_id}
                    >
                      {childProperty.title || childProperty.name || `Room ${childProperty.floor || 'N/A'}`}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>
                    <em>No units available for this floor</em>
                  </MenuItem>
                )}
              </Select>
              <FormHelperText>Select a specific unit from the selected floor</FormHelperText>
            </FormControl>
          </Grid>

          {/* Allocation Date */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Allocation Date"
              name="allocation_date"
              type="date"
              value={allocation?.allocation_date || allocation?.startDate || ''}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              required
              error={!!errors.allocation_date}
              helperText={errors.allocation_date}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Rent Amount - New Field */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Monthly Rent"
              name="rent"
              type="number"
              value={allocation?.rent || ''}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              required
              error={!!errors.rent}
              helperText={errors.rent}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupeeIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select label="Status" name="status" value={allocation?.status || 'Active'} onChange={onInputChange} required>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              
              </Select>
              <FormHelperText>Current status of this rental allocation</FormHelperText>
            </FormControl>
          </Grid>

          {/* Remarks */}
          <Grid item xs={12}>
            <TextField
              label="Remarks"
              name="remarks"
              value={allocation?.remarks || ''}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              multiline
              rows={3}
            />
          </Grid>

          {/* Document Section Header */}
          <Grid item xs={12}>
            <Box sx={{ mt: 2, mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: 'primary.main' }}>
                Documents
              </Typography>
              <Divider />
            </Box>
          </Grid>

          {/* Document Uploads */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              border: '1px dashed rgba(0, 0, 0, 0.23)', 
              borderRadius: 1, 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '120px',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(0, 0, 0, 0.01)'
              }
            }}>
              <DescriptionIcon color="primary" sx={{ mb: 1, fontSize: 32 }} />
              <Typography variant="body1" sx={{ mb: 1 }}>Rent Agreement</Typography>
              <Button variant="outlined" component="label" startIcon={<AttachFileIcon />} sx={{ mb: 1 }}>
                Choose File
                <input type="file" name="rent_agreement" hidden onChange={onFileChange} />
              </Button>
              {allocation?.rent_agreement_file && (
                <Chip 
                  label={allocation.rent_agreement_file.name} 
                  variant="outlined" 
                  color="primary" 
                  size="small" 
                  sx={{ mt: 1 }}
                />
              )}
              {allocation?.rent_agreement && mode === 'edit' && (
                <Typography variant="caption" sx={{ mt: 1 }}>
                  <a
                    href={allocation.rent_agreement.startsWith('http') 
                      ? allocation.rent_agreement 
                      : `${apiUrl}uploads/${allocation.rent_agreement}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'blue' }}
                  >
                    View Current Document
                  </a>
                </Typography>
              )}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              border: '1px dashed rgba(0, 0, 0, 0.23)', 
              borderRadius: 1, 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '120px',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(0, 0, 0, 0.01)'
              }
            }}>
              <DescriptionIcon color="primary" sx={{ mb: 1, fontSize: 32 }} />
              <Typography variant="body1" sx={{ mb: 1 }}>Other Document</Typography>
              <Button variant="outlined" component="label" startIcon={<AttachFileIcon />} sx={{ mb: 1 }}>
                Choose File
                <input type="file" name="other_document" hidden onChange={onFileChange} />
              </Button>
              {allocation?.other_document_file && (
                <Chip 
                  label={allocation.other_document_file.name} 
                  variant="outlined" 
                  color="primary" 
                  size="small" 
                  sx={{ mt: 1 }}
                />
              )}
              {allocation?.other_document && mode === 'edit' && (
                <Typography variant="caption" sx={{ mt: 1 }}>
                  <a
                    href={allocation.other_document.startsWith('http') 
                      ? allocation.other_document 
                      : `${apiUrl}uploads/${allocation.other_document}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'blue' }}
                  >
                    View Current Document
                  </a>
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Button onClick={onClose} variant="outlined" startIcon={<CancelIcon />}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmitWithValidation} 
          variant="contained" 
          color="primary" 
          startIcon={<SaveIcon />}
        >
          {mode === 'add' ? 'Save Allocation' : 'Update Allocation'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
