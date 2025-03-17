import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Divider,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PropertyDetailModal({ property, onClose, refreshProperties, apiUrl }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(property.isEditing || false);
  const [localProperty, setLocalProperty] = useState(property);
  const [documents, setDocuments] = useState(null);
  const [childProperties, setChildProperties] = useState(property.childProperties || []);
  const [isChildEditing, setIsChildEditing] = useState(property.isChildEditing || false);
  const [selectedChildIndex, setSelectedChildIndex] = useState(null);
  const [newChildProperty, setNewChildProperty] = useState({
    title: '',
    floor: '',
    description: '',
    status: 'Active',
    rooms: '',
    washroom: '',
    gas: '',
    electricity: '',
    deposit: '',
    rent: ''
  });

  // Load child properties when component mounts or when property changes
  useEffect(() => {
    // Set initial property state
    setLocalProperty(property);
    setChildProperties(property.childProperties || []);
    
    // If we need to fetch fresh child properties data
    if (property.id && !property.childProperties) {
      fetchChildProperties(property.id);
    }
  }, [property, apiUrl]);

  // Function to fetch child properties for a specific property
  const fetchChildProperties = async (propertyId) => {
    try {
      // Fetch all child properties
      const response = await axios.get(`${apiUrl}child_property`);
      
      // Filter to only include those belonging to this property
      const filteredChildren = response.data.filter(
        child => child.property_id === propertyId
      );
      
      setChildProperties(filteredChildren);
    } catch (error) {
      console.error('Error fetching child properties:', error);
    }
  };

  // Handle changes for property details
  const handlePropertyChange = (field, value) => {
    setLocalProperty((prev) => ({ ...prev, [field]: value }));
  };

  // Handle document file change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(e.target.files[0]);
    }
  };

  // Handle changes for child properties
  const handleChildChange = (index, field, value) => {
    const updatedChildren = [...childProperties];
    
    // If we're not explicitly updating property_id and this might be a new update
    if (field !== 'property_id' && !updatedChildren[index].property_id) {
      // Make sure property_id is set
      updatedChildren[index] = { 
        ...updatedChildren[index], 
        [field]: value,
        property_id: localProperty.id
      };
    } else {
      // Regular update
      updatedChildren[index] = { ...updatedChildren[index], [field]: value };
    }
    
    setChildProperties(updatedChildren);
  };

  // Handle child property document change
  const handleChildFileChange = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const updatedChildren = [...childProperties];
      updatedChildren[index] = {
        ...updatedChildren[index],
        newDocument: e.target.files[0]
      };
      setChildProperties(updatedChildren);
    }
  };

  // Save the property details
  const saveProperty = async () => {
    try {
      const form = new FormData();
      const dataToSend = {
        propertyName: localProperty.propertyName,
        ownerName: localProperty.ownerName,
        address: localProperty.address,
        numberOfFloors: localProperty.numberOfFloors,
        status: localProperty.status || 'Active'
      };

      form.append('formData', JSON.stringify(dataToSend));

      // Add document if a new one was selected
      if (documents) {
        form.append('documents', documents);
      }

      await axios.put(`${apiUrl}property/${localProperty.id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Property updated successfully!');
      refreshProperties();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property!');
    }
  };

  // Save child properties
  const saveChildProperties = async () => {
    try {
      // Create promises array for all update operations
      const updatePromises = childProperties.map(async (child) => {
        // Skip newly added children without IDs - they'll be handled by creation
        if (!child.id && !child.newlyAdded) {
          return;
        }

        // Prepare data for update
        const form = new FormData();
        const { newDocument, ...childData } = child;
        
        // Ensure property_id is not null and is set correctly
        if (!childData.property_id) {
          childData.property_id = localProperty.id;
        }
        
        form.append('formData', JSON.stringify(childData));
        
        // Add document if a new one was selected
        if (newDocument) {
          form.append('documents', newDocument);
        }
        
        if (child.id) {
          // Update existing child property
          return axios.put(`${apiUrl}child_property/${child.id}`, form, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } else {
          // Create new child property
          return axios.post(`${apiUrl}child_property`, form, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }
      });
      
      // Execute all update/create operations
      await Promise.all(updatePromises.filter(p => p)); // Filter out undefined promises

      alert('Child properties updated successfully!');
      refreshProperties();
      setIsChildEditing(false);
    } catch (error) {
      console.error('Error updating child properties:', error);
      alert('Failed to update child properties!');
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleNewChildChange = (field, value) => {
    setNewChildProperty(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddChildProperty = () => {
    if (isChildEditing) {
      setChildProperties([
        ...childProperties,
        {
          title: '',
          floor: '',
          description: '',
          status: 'Active',
          property_id: localProperty.id,
          rooms: '',
          washroom: '',
          gas: '',
          electricity: '',
          deposit: '',
          rent: '',
          newlyAdded: true  // Add a flag to identify newly added properties
        }
      ]);
    } else {
      // Enable editing mode for child properties first
      setIsChildEditing(true);
      // Then add the new child property
      setTimeout(() => {
        setChildProperties([
          ...childProperties,
          {
            title: '',
            floor: '',
            description: '',
            status: 'Active',
            property_id: localProperty.id,
            rooms: '',
            washroom: '',
            gas: '',
            electricity: '',
            deposit: '',
            rent: '',
            newlyAdded: true  // Add a flag to identify newly added properties
          }
        ]);
      }, 0);
    }
  };

  const handleCreateChildProperty = async () => {
    try {
      // Validate that required fields are filled
      if (!newChildProperty.title || !newChildProperty.floor) {
        alert('Please fill in at least the title and floor fields.');
        return;
      }

      const childPropertyData = {
        ...newChildProperty,
        property_id: localProperty.id
      };

      // Create a FormData object to handle file uploads if needed
      const form = new FormData();
      form.append('formData', JSON.stringify(childPropertyData));

      // Make the API call to create the child property
      await axios.post(`${apiUrl}child_property`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Child property created successfully!');
      refreshProperties();
      
      // Reset the new child property form
      setNewChildProperty({
        title: '',
        floor: '',
        description: '',
        status: 'Active',
        rooms: '',
        washroom: '',
        gas: '',
        electricity: '',
        deposit: '',
        rent: ''
      });
      
    } catch (error) {
      console.error('Error creating child property:', error);
      alert('Failed to create child property!');
    }
  };

  const handleDeleteChildProperty = async (childId, index) => {
    if (!childId) {
      // If the child property was just added and doesn't have an ID yet, just remove it from the array
      const updatedChildren = [...childProperties];
      updatedChildren.splice(index, 1);
      setChildProperties(updatedChildren);
      return;
    }

    if (window.confirm('Are you sure you want to delete this child property?')) {
      try {
        // Use direct endpoint to child_property instead of nested property path
        await axios.delete(`${apiUrl}child_property/${childId}`);
        const updatedChildren = childProperties.filter((_, i) => i !== index);
        setChildProperties(updatedChildren);
        alert('Child property deleted successfully!');
      } catch (error) {
        console.error('Error deleting child property:', error);
        alert('Failed to delete child property!');
      }
    }
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Property Details" />
          <Tab label="Child Properties" />
        </Tabs>
      </Box>

      {/* Property Details Tab */}
      {activeTab === 0 && (
        <Box>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: 'background.paper',
              position: 'relative'
            }}
          >
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              {isEditing ? (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={saveProperty}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
            </Box>

            <Typography variant="h5" fontWeight="bold" color="primary.dark" gutterBottom>
              Property Details
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Property Name
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={localProperty.propertyName || ''}
                    onChange={(e) => handlePropertyChange('propertyName', e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                ) : (
                  <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                    {localProperty.propertyName}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Owner Name
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={localProperty.ownerName || ''}
                    onChange={(e) => handlePropertyChange('ownerName', e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                ) : (
                  <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                    {localProperty.ownerName}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Address
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={localProperty.address || ''}
                    onChange={(e) => handlePropertyChange('address', e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                ) : (
                  <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                    {localProperty.address}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Number of Floors
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    type="number"
                    value={localProperty.numberOfFloors || ''}
                    onChange={(e) => handlePropertyChange('numberOfFloors', e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                ) : (
                  <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                    {localProperty.numberOfFloors}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                {isEditing ? (
                  <FormControl fullWidth margin="dense">
                    <Select
                      value={localProperty.status || 'Active'}
                      onChange={(e) => handlePropertyChange('status', e.target.value)}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                      <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
                      <MenuItem value="Sold">Sold</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 1,
                      fontWeight: 'medium',
                      color:
                        localProperty.status === 'Active'
                          ? 'success.main'
                          : localProperty.status === 'Inactive'
                          ? 'error.main'
                          : 'text.primary'
                    }}
                  >
                    {localProperty.status || 'Active'}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Documents
                </Typography>
                {isEditing ? (
                  <Box sx={{ mt: 1 }}>
                    {localProperty.documents ? (
                      <Box sx={{ mb: 2 }}>
                        <a
                          href={`${apiUrl}uploads/${localProperty.documents}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#1976d2', textDecoration: 'underline' }}
                        >
                          Current Document
                        </a>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        No document uploaded
                      </Typography>
                    )}
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<AttachFileIcon />}
                    >
                      {documents ? 'Change Document' : 'Upload Document'}
                      <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {documents && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        New file: {documents.name}
                      </Typography>
                    )}
                  </Box>
                ) : (
                  <Box sx={{ mt: 1 }}>
                    {localProperty.documents ? (
                      <Button
                        href={`${apiUrl}uploads/${localProperty.documents}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        size="small"
                      >
                        View Document
                      </Button>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No document uploaded
                      </Typography>
                    )}
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}

      {/* Child Properties Tab */}
      {activeTab === 1 && (
        <Box>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: 'background.paper',
              position: 'relative'
            }}
          >
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              {isChildEditing ? (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={saveChildProperties}
                  >
                    Save All
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={() => setIsChildEditing(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => setIsChildEditing(true)}
                  >
                    Edit All
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleAddChildProperty}
                  >
                    Add Unit
                  </Button>
                </Box>
              )}
            </Box>

            <Typography variant="h5" fontWeight="bold" color="primary.dark" gutterBottom>
              Property Units
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* New Child Property Form */}
            <Paper elevation={2} sx={{ p: 3, mb: 4, borderLeft: '4px solid #4caf50' }}>
              <Typography variant="h6" color="primary.dark" gutterBottom>
                Add New Unit
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Title/Unit Name"
                    value={newChildProperty.title}
                    onChange={(e) => handleNewChildChange('title', e.target.value)}
                    variant="outlined"
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Floor"
                    type="number"
                    value={newChildProperty.floor}
                    onChange={(e) => handleNewChildChange('floor', e.target.value)}
                    variant="outlined"
                    size="small"
                    required
                    inputProps={{ min: 0, max: localProperty.numberOfFloors }}
                    helperText={`Maximum floors: ${localProperty.numberOfFloors}`}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={2}
                    value={newChildProperty.description}
                    onChange={(e) => handleNewChildChange('description', e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Rooms"
                    type="number"
                    value={newChildProperty.rooms}
                    onChange={(e) => handleNewChildChange('rooms', e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Washrooms"
                    type="number"
                    value={newChildProperty.washroom}
                    onChange={(e) => handleNewChildChange('washroom', e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Gas Connection</InputLabel>
                    <Select
                      value={newChildProperty.gas}
                      label="Gas Connection"
                      onChange={(e) => handleNewChildChange('gas', e.target.value)}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Electricity Connection</InputLabel>
                    <Select
                      value={newChildProperty.electricity}
                      label="Electricity Connection"
                      onChange={(e) => handleNewChildChange('electricity', e.target.value)}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Deposit Amount"
                    type="number"
                    value={newChildProperty.deposit}
                    onChange={(e) => handleNewChildChange('deposit', e.target.value)}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: <span>₹</span>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Monthly Rent"
                    type="number"
                    value={newChildProperty.rent}
                    onChange={(e) => handleNewChildChange('rent', e.target.value)}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: <span>₹</span>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleCreateChildProperty}
                    fullWidth
                  >
                    Create Unit
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {childProperties.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No units added to this property
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleAddChildProperty}
                >
                  Add First Unit
                </Button>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {childProperties.map((child, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper
                      elevation={2}
                      sx={{ p: 2, position: 'relative', borderLeft: '4px solid #2196f3' }}
                    >
                      {isChildEditing && (
                        <IconButton
                          size="small"
                          color="error"
                          sx={{ position: 'absolute', top: 5, right: 5 }}
                          onClick={() => handleDeleteChildProperty(child.id, index)}
                        >
                          ✕
                        </IconButton>
                      )}

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Title/Unit Name
                          </Typography>
                          {isChildEditing ? (
                            <TextField
                              fullWidth
                              size="small"
                              value={child.title || ''}
                              onChange={(e) => handleChildChange(index, 'title', e.target.value)}
                              variant="outlined"
                              margin="dense"
                            />
                          ) : (
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {child.title}
                            </Typography>
                          )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Floor
                          </Typography>
                          {isChildEditing ? (
                            <TextField
                              fullWidth
                              size="small"
                              value={child.floor || ''}
                              onChange={(e) => handleChildChange(index, 'floor', e.target.value)}
                              variant="outlined"
                              margin="dense"
                            />
                          ) : (
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {child.floor}
                            </Typography>
                          )}
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Description
                          </Typography>
                          {isChildEditing ? (
                            <TextField
                              fullWidth
                              multiline
                              rows={2}
                              size="small"
                              value={child.description || ''}
                              onChange={(e) =>
                                handleChildChange(index, 'description', e.target.value)
                              }
                              variant="outlined"
                              margin="dense"
                            />
                          ) : (
                            <Typography variant="body2">
                              {child.description || 'No description'}
                            </Typography>
                          )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Status
                          </Typography>
                          {isChildEditing ? (
                            <FormControl fullWidth margin="dense" size="small">
                              <Select
                                value={child.status || 'Active'}
                                onChange={(e) =>
                                  handleChildChange(index, 'status', e.target.value)
                                }
                              >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                                <MenuItem value="Rented">Rented</MenuItem>
                              </Select>
                            </FormControl>
                          ) : (
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 'medium',
                                color:
                                  child.status === 'Active'
                                    ? 'success.main'
                                    : child.status === 'Inactive'
                                    ? 'text.secondary'
                                    : 'primary.main',
                              }}
                            >
                              {child.status}
                            </Typography>
                          )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Rooms
                          </Typography>
                          {isChildEditing ? (
                            <TextField
                              fullWidth
                              size="small"
                              type="number"
                              value={child.rooms || ''}
                              onChange={(e) => handleChildChange(index, 'rooms', e.target.value)}
                              variant="outlined"
                              margin="dense"
                            />
                          ) : (
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {child.rooms || 'Not specified'}
                            </Typography>
                          )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Washrooms
                          </Typography>
                          {isChildEditing ? (
                            <TextField
                              fullWidth
                              size="small"
                              type="number"
                              value={child.washroom || ''}
                              onChange={(e) => handleChildChange(index, 'washroom', e.target.value)}
                              variant="outlined"
                              margin="dense"
                            />
                          ) : (
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {child.washroom || 'Not specified'}
                            </Typography>
                          )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Gas Connection
                          </Typography>
                          {isChildEditing ? (
                            <FormControl fullWidth margin="dense" size="small">
                              <Select
                                value={child.gas || ''}
                                onChange={(e) =>
                                  handleChildChange(index, 'gas', e.target.value)
                                }
                              >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                              </Select>
                            </FormControl>
                          ) : (
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {child.gas || 'Not specified'}
                            </Typography>
                          )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Electricity Connection
                          </Typography>
                          {isChildEditing ? (
                            <FormControl fullWidth margin="dense" size="small">
                              <Select
                                value={child.electricity || ''}
                                onChange={(e) =>
                                  handleChildChange(index, 'electricity', e.target.value)
                                }
                              >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                              </Select>
                            </FormControl>
                          ) : (
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {child.electricity || 'Not specified'}
                            </Typography>
                          )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Deposit Amount
                          </Typography>
                          {isChildEditing ? (
                            <TextField
                              fullWidth
                              size="small"
                              type="number"
                              value={child.deposit || ''}
                              onChange={(e) => handleChildChange(index, 'deposit', e.target.value)}
                              variant="outlined"
                              margin="dense"
                              InputProps={{
                                startAdornment: <span>₹</span>,
                              }}
                            />
                          ) : (
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {child.deposit ? `₹${child.deposit}` : 'Not specified'}
                            </Typography>
                          )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Monthly Rent
                          </Typography>
                          {isChildEditing ? (
                            <TextField
                              fullWidth
                              size="small"
                              type="number"
                              value={child.rent || ''}
                              onChange={(e) => handleChildChange(index, 'rent', e.target.value)}
                              variant="outlined"
                              margin="dense"
                              InputProps={{
                                startAdornment: <span>₹</span>,
                              }}
                            />
                          ) : (
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {child.rent ? `₹${child.rent}` : 'Not specified'}
                            </Typography>
                          )}
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Documents
                          </Typography>
                          {isChildEditing ? (
                            <Box sx={{ mt: 1 }}>
                              {child.document ? (
                                <Box sx={{ mb: 1 }}>
                                  <a
                                    href={`${apiUrl}uploads/${child.document}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#1976d2', textDecoration: 'underline' }}
                                  >
                                    Current Document
                                  </a>
                                </Box>
                              ) : null}
                              <Button
                                variant="outlined"
                                component="label"
                                size="small"
                                startIcon={<AttachFileIcon />}
                              >
                                {child.newDocument || child.document
                                  ? 'Change Document'
                                  : 'Upload Document'}
                                <input
                                  type="file"
                                  hidden
                                  onChange={(e) => handleChildFileChange(index, e)}
                                />
                              </Button>
                              {child.newDocument && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                  New file: {child.newDocument.name}
                                </Typography>
                              )}
                            </Box>
                          ) : (
                            <Box sx={{ mt: 1 }}>
                              {child.document ? (
                                <Button
                                  href={`${apiUrl}uploads/${child.document}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  variant="outlined"
                                  size="small"
                                >
                                  View Document
                                </Button>
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  No document
                                </Typography>
                              )}
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}

                {isChildEditing && (
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleAddChildProperty}
                      sx={{ py: 2, borderStyle: 'dashed' }}
                    >
                      + Add Another Unit
                    </Button>
                  </Grid>
                )}
              </Grid>
            )}
          </Paper>
        </Box>
      )}
    </div>
  );
}
