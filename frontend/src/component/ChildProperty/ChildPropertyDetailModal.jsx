import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Divider,
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

export default function ChildPropertyDetailModal({ childProperty, onClose, refreshChildProperties, apiUrl, parentProperties }) {
  const [isEditing, setIsEditing] = useState(childProperty.isEditing || false);
  const [localChild, setLocalChild] = useState(childProperty);
  const [floorError, setFloorError] = useState('');
  const [documents, setDocuments] = useState(null);

  // Handle changes for child property details
  const handlePropertyChange = (field, value) => {
    if (field === 'floor') {
      const selectedParent = parentProperties.find((p) => p.id === parseInt(localChild.property_id));
      const floorValue = parseInt(value);
      if (selectedParent && floorValue > selectedParent.numberOfFloors) {
        setFloorError(`Maximum floor for ${selectedParent.propertyName} is ${selectedParent.numberOfFloors}`);
      } else {
        setFloorError('');
      }
    }

    setLocalChild((prev) => ({ ...prev, [field]: value }));
  };

  // Handle document file change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(e.target.files[0]);
    }
  };

  const saveChildProperty = async () => {
    if (floorError) {
      alert('Please fix the errors before saving.');
      return;
    }
    
    try {
      const form = new FormData();
      const dataToSend = {
        property_id: localChild.property_id,
        floor: localChild.floor,
        title: localChild.title,
        description: localChild.description,
        rooms: localChild.rooms,
        washroom: localChild.washroom,
        gas: localChild.gas,
        electricity: localChild.electricity,
        deposit: localChild.deposit,
        rent: localChild.rent,
        status: localChild.status || 'Active'
      };

      form.append('formData', JSON.stringify(dataToSend));

      // Add document if a new one was selected
      if (documents) {
        form.append('documents', documents);
      }

      await axios.put(`${apiUrl}child_property/${localChild.id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Child property updated successfully!');
      if (refreshChildProperties) {
        refreshChildProperties();
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating child property:', error);
      alert('Failed to update child property!');
    }
  };

  return (
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
                onClick={saveChildProperty}
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
          Child Property Details
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Parent Property
            </Typography>
            {isEditing ? (
              <FormControl fullWidth margin="dense" error={Boolean(floorError)}>
                <Select
                  value={localChild.property_id || ''}
                  onChange={(e) => handlePropertyChange('property_id', e.target.value)}
                >
                  {parentProperties.map((parent) => (
                    <MenuItem key={parent.id} value={parent.id}>
                      {parent.propertyName} - {parent.ownerName} (Max Floors: {parent.numberOfFloors})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                {parentProperties.find((p) => p.id === parseInt(localChild.property_id))?.propertyName || 'N/A'}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Floor
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                type="number"
                value={localChild.floor || ''}
                onChange={(e) => handlePropertyChange('floor', e.target.value)}
                variant="outlined"
                margin="dense"
                error={Boolean(floorError)}
                helperText={floorError}
              />
            ) : (
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                {localChild.floor}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Title/Unit Name
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={localChild.title || ''}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                variant="outlined"
                margin="dense"
              />
            ) : (
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                {localChild.title}
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
                  value={localChild.status || 'Active'}
                  onChange={(e) => handlePropertyChange('status', e.target.value)}
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
                  mt: 1,
                  fontWeight: 'medium',
                  color:
                    localChild.status === 'Active'
                      ? 'success.main'
                      : localChild.status === 'Inactive'
                      ? 'error.main'
                      : localChild.status === 'Rented'
                      ? 'warning.main'
                      : 'text.primary'
                }}
              >
                {localChild.status || 'Active'}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Description
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                rows={3}
                value={localChild.description || ''}
                onChange={(e) => handlePropertyChange('description', e.target.value)}
                variant="outlined"
                margin="dense"
              />
            ) : (
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                {localChild.description || 'No description provided'}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Number of Rooms
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                type="number"
                value={localChild.rooms || ''}
                onChange={(e) => handlePropertyChange('rooms', e.target.value)}
                variant="outlined"
                margin="dense"
              />
            ) : (
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                {localChild.rooms || 'Not specified'}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Number of Washrooms
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                type="number"
                value={localChild.washroom || ''}
                onChange={(e) => handlePropertyChange('washroom', e.target.value)}
                variant="outlined"
                margin="dense"
              />
            ) : (
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                {localChild.washroom || 'Not specified'}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Gas Availability
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={localChild.gas || ''}
                onChange={(e) => handlePropertyChange('gas', e.target.value)}
                variant="outlined"
                margin="dense"
              />
            ) : (
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                {localChild.gas || 'Not specified'}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Electricity Availability
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={localChild.electricity || ''}
                onChange={(e) => handlePropertyChange('electricity', e.target.value)}
                variant="outlined"
                margin="dense"
              />
            ) : (
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                {localChild.electricity || 'Not specified'}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Deposit Amount
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                type="number"
                value={localChild.deposit || ''}
                onChange={(e) => handlePropertyChange('deposit', e.target.value)}
                variant="outlined"
                margin="dense"
              />
            ) : (
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                {localChild.deposit ? `₹${localChild.deposit}` : 'Not specified'}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Rent Amount
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                type="number"
                value={localChild.rent || ''}
                onChange={(e) => handlePropertyChange('rent', e.target.value)}
                variant="outlined"
                margin="dense"
              />
            ) : (
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                {localChild.rent ? `₹${localChild.rent}` : 'Not specified'}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Documents
            </Typography>
            {isEditing ? (
              <Box sx={{ mt: 1 }}>
                {localChild.document ? (
                  <Box sx={{ mb: 2 }}>
                    <a
                      href={`${apiUrl}uploads/${localChild.document}`}
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
                {localChild.document ? (
                  <Button
                    href={`${apiUrl}uploads/${localChild.document}`}
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
  );
}
