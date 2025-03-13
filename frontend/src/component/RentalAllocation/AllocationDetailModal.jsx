import { useState } from 'react';
import { ApiService } from './ApiService';
import { Utils, Styles } from './Utils';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Divider,
  Chip,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import NoteIcon from '@mui/icons-material/Note';

export default function AllocationDetailModal({ allocation, onClose, refreshAllocations, apiUrl, renters, properties, childProperties }) {
  const [isEditing, setIsEditing] = useState(allocation.isEditing || false);
  const [localAllocation, setLocalAllocation] = useState(allocation);
  const [documents, setDocuments] = useState({
    rent_agreement: null,
    other_document: null
  });
  const [isSaving, setIsSaving] = useState(false);

  // Handle changes for allocation details
  const handleAllocationChange = (field, value) => {
    setLocalAllocation((prev) => ({ ...prev, [field]: value }));
  };

  // Handle document file change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDocuments((prev) => ({ ...prev, [name]: files[0] }));
  };

  // Save the allocation details
  const saveAllocation = async () => {
    try {
      setIsSaving(true);
      const form = new FormData();

      const dataToSend = {
        renter_id: localAllocation.renter_id || localAllocation.renterId,
        property_id: localAllocation.property_id || localAllocation.propertyId,
        childproperty_id: localAllocation.childproperty_id,
        allocation_date: localAllocation.allocation_date || localAllocation.startDate,
        remarks: localAllocation.remarks,
        status: localAllocation.status,
      };

      form.append('formData', JSON.stringify(dataToSend));

      // Add documents if new ones were selected
      if (documents.rent_agreement) {
        form.append('rent_agreement', documents.rent_agreement);
      }
      if (documents.other_document) {
        form.append('other_document', documents.other_document);
      }

      await ApiService.updateAllocation(localAllocation.id || localAllocation.allocation_id, form);

      alert('Allocation updated successfully!');
      refreshAllocations();
      setIsEditing(false);
    } catch (error) {
      alert('Failed to update allocation!');
    } finally {
      setIsSaving(false);
    }
  };

  // Determine status color
  const getStatusColor = (status) => {
    if (!status) return 'primary';
    
    switch(status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'terminated':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'primary';
    }
  };

  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        elevation: 5,
        sx: {
          borderRadius: 2,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        bgcolor: 'primary.light',
        color: 'primary.dark',
        p: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AttachFileIcon />
          <Typography variant="h6">
            Allocation Details
          </Typography>
          <Chip 
            label={localAllocation.status || 'Active'} 
            color={getStatusColor(localAllocation.status)} 
            size="small"
            sx={{ ml: 2 }}
          />
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Allocation ID */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Allocation ID
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                #{localAllocation.id || localAllocation.allocation_id}
              </Typography>
            </Paper>
          </Grid>

          {/* Renter Information */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%', bgcolor: 'background.paper', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                <PersonIcon color="primary" />
                <Typography variant="subtitle1" fontWeight="medium">
                  Renter
                </Typography>
              </Box>
              
              {isEditing ? (
                <FormControl fullWidth variant="outlined" size="small" sx={{ mt: 1 }}>
                  <InputLabel>Select Renter</InputLabel>
                  <Select
                    value={localAllocation.renter_id || localAllocation.renterId || ''}
                    onChange={(e) => handleAllocationChange(localAllocation.renter_id ? 'renter_id' : 'renterId', e.target.value)}
                    label="Select Renter"
                  >
                    {renters.map((renter) => (
                      <MenuItem key={renter.id || renter.renter_id} value={renter.id || renter.renter_id}>
                        {renter.renterName || renter.renter_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <Typography variant="body1">
                  {Utils.getRenterName(localAllocation.renter_id || localAllocation.renterId, renters)}
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Property Information */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%', bgcolor: 'background.paper', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                <HomeIcon color="primary" />
                <Typography variant="subtitle1" fontWeight="medium">
                  Property
                </Typography>
              </Box>
              
              {isEditing ? (
                <FormControl fullWidth variant="outlined" size="small" sx={{ mt: 1 }}>
                  <InputLabel>Select Property</InputLabel>
                  <Select
                    value={localAllocation.property_id || localAllocation.propertyId || ''}
                    onChange={(e) => handleAllocationChange(localAllocation.property_id ? 'property_id' : 'propertyId', e.target.value)}
                    label="Select Property"
                  >
                    {properties.map((property) => (
                      <MenuItem key={property.id || property.property_id} value={property.id || property.property_id}>
                        {property.propertyName || property.property_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <Typography variant="body1">
                  {Utils.getPropertyName(localAllocation.property_id || localAllocation.propertyId, properties)}
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Unit/Floor */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%', bgcolor: 'background.paper', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                <ApartmentIcon color="primary" />
                <Typography variant="subtitle1" fontWeight="medium">
                  Unit/Floor
                </Typography>
              </Box>
              
              {isEditing ? (
                <FormControl fullWidth variant="outlined" size="small" sx={{ mt: 1 }}>
                  <InputLabel>Select Unit/Floor</InputLabel>
                  <Select
                    value={localAllocation.childproperty_id || ''}
                    onChange={(e) => handleAllocationChange('childproperty_id', e.target.value)}
                    label="Select Unit/Floor"
                  >
                    <MenuItem value="">-- None --</MenuItem>
                    {childProperties.map((childProperty) => (
                      <MenuItem key={childProperty.id || childProperty.childproperty_id} value={childProperty.id || childProperty.childproperty_id}>
                        {childProperty.title || childProperty.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <Typography variant="body1">
                  {Utils.getChildPropertyName(localAllocation.childproperty_id, childProperties) || '-- None --'}
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Allocation Date */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%', bgcolor: 'background.paper', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                <EventIcon color="primary" />
                <Typography variant="subtitle1" fontWeight="medium">
                  Allocation Date
                </Typography>
              </Box>
              
              {isEditing ? (
                <TextField
                  type="date"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={localAllocation.allocation_date || localAllocation.startDate || ''}
                  onChange={(e) =>
                    handleAllocationChange(localAllocation.allocation_date ? 'allocation_date' : 'startDate', e.target.value)
                  }
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1">
                  {localAllocation.allocation_date || localAllocation.startDate || 'Not set'}
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Status */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%', bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
                Status
              </Typography>
              
              {isEditing ? (
                <FormControl fullWidth variant="outlined" size="small" sx={{ mt: 1 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={localAllocation.status || 'Active'}
                    onChange={(e) => handleAllocationChange('status', e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Terminated">Terminated</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <Chip 
                  label={localAllocation.status || 'Active'} 
                  color={getStatusColor(localAllocation.status)} 
                  variant="outlined"
                />
              )}
            </Paper>
          </Grid>

          {/* Remarks */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%', bgcolor: 'background.paper', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                <NoteIcon color="primary" />
                <Typography variant="subtitle1" fontWeight="medium">
                  Remarks
                </Typography>
              </Box>
              
              {isEditing ? (
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  variant="outlined"
                  placeholder="Add remarks here..."
                  value={localAllocation.remarks || ''}
                  onChange={(e) => handleAllocationChange('remarks', e.target.value)}
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body2" color={localAllocation.remarks ? 'textPrimary' : 'textSecondary'}>
                  {localAllocation.remarks || 'No remarks provided'}
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Documents */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
                <FileUploadIcon color="primary" />
                <Typography variant="subtitle1" fontWeight="medium">
                  Documents
                </Typography>
              </Box>

              <Grid container spacing={2}>
                {/* Rent Agreement Document */}
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Rent Agreement
                    </Typography>
                    
                    {isEditing ? (
                      <Box sx={{ mt: 2 }}>
                        {localAllocation.rent_agreement && (
                          <Button
                            href={`${apiUrl}uploads/${localAllocation.rent_agreement}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            startIcon={<AttachFileIcon />}
                            size="small"
                            sx={{ mb: 2 }}
                          >
                            Current Document
                          </Button>
                        )}

                        <Box sx={{ 
                          border: '1px dashed rgba(0, 0, 0, 0.23)', 
                          borderRadius: 1, 
                          p: 2,
                          textAlign: 'center',
                          bgcolor: 'rgba(0, 0, 0, 0.02)'
                        }}>
                          <input
                            accept="application/pdf,image/*"
                            style={{ display: 'none' }}
                            id="rent-agreement-file"
                            name="rent_agreement"
                            type="file"
                            onChange={handleFileChange}
                          />
                          <label htmlFor="rent-agreement-file">
                            <Button 
                              component="span" 
                              startIcon={<FileUploadIcon />}
                              variant="text"
                            >
                              {documents.rent_agreement ? documents.rent_agreement.name : 'Upload New Document'}
                            </Button>
                          </label>
                        </Box>
                      </Box>
                    ) : (
                      localAllocation.rent_agreement ? (
                        <Button
                          href={`${apiUrl}uploads/${localAllocation.rent_agreement}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="contained"
                          color="primary"
                          startIcon={<AttachFileIcon />}
                          size="small"
                          sx={{ mt: 1 }}
                        >
                          View Document
                        </Button>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          No document uploaded
                        </Typography>
                      )
                    )}
                  </Paper>
                </Grid>

                {/* Other Document */}
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Other Document
                    </Typography>
                    
                    {isEditing ? (
                      <Box sx={{ mt: 2 }}>
                        {localAllocation.other_document && (
                          <Button
                            href={`${apiUrl}uploads/${localAllocation.other_document}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            startIcon={<AttachFileIcon />}
                            size="small"
                            sx={{ mb: 2 }}
                          >
                            Current Document
                          </Button>
                        )}

                        <Box sx={{ 
                          border: '1px dashed rgba(0, 0, 0, 0.23)', 
                          borderRadius: 1, 
                          p: 2,
                          textAlign: 'center',
                          bgcolor: 'rgba(0, 0, 0, 0.02)'
                        }}>
                          <input
                            accept="application/pdf,image/*"
                            style={{ display: 'none' }}
                            id="other-document-file"
                            name="other_document"
                            type="file"
                            onChange={handleFileChange}
                          />
                          <label htmlFor="other-document-file">
                            <Button 
                              component="span" 
                              startIcon={<FileUploadIcon />}
                              variant="text"
                            >
                              {documents.other_document ? documents.other_document.name : 'Upload New Document'}
                            </Button>
                          </label>
                        </Box>
                      </Box>
                    ) : (
                      localAllocation.other_document ? (
                        <Button
                          href={`${apiUrl}uploads/${localAllocation.other_document}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="contained"
                          color="primary"
                          startIcon={<AttachFileIcon />}
                          size="small"
                          sx={{ mt: 1 }}
                        >
                          View Document
                        </Button>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          No document uploaded
                        </Typography>
                      )
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
        {isEditing ? (
          <>
            <Button 
              onClick={() => setIsEditing(false)}
              startIcon={<CancelIcon />}
              color="error"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button 
              onClick={saveAllocation}
              startIcon={isSaving ? <CircularProgress size={16} /> : <SaveIcon />}
              color="primary"
              variant="contained"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </>
        ) : (
          <>
            <Button onClick={onClose} color="inherit">
              Close
            </Button>
            <Button 
              onClick={() => setIsEditing(true)}
              startIcon={<EditIcon />}
              color="primary"
              variant="contained"
            >
              Edit
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
