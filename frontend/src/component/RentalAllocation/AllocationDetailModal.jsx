import { useState } from 'react';
import { ApiService } from './ApiService';
import { Utils, Styles } from './Utils';
import { ToastContainer, toast } from 'react-toastify';
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
        status: localAllocation.status
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
      toast.success('Allocation updated successfully!');
      refreshAllocations();
      setIsEditing(false);
    } catch (error) {
      // alert('Failed to update allocation!');
      toast.error('Failed to update allocation!');
    } finally {
      setIsSaving(false);
    }
  };

  // Determine status color
  const getStatusColor = (status) => {
    if (!status) return 'primary';

    switch (status.toLowerCase()) {
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
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6" component="div">
          Allocation Details
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Renter ID"
              name="renter_id"
              value={localAllocation.renter_id || ''}
              onChange={(e) => handleAllocationChange('renter_id', e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Property ID"
              name="property_id"
              value={localAllocation.property_id || ''}
              onChange={(e) => handleAllocationChange('property_id', e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Child Property ID"
              name="childproperty_id"
              value={localAllocation.childproperty_id || ''}
              onChange={(e) => handleAllocationChange('childproperty_id', e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Allocation Date"
              name="allocation_date"
              value={localAllocation.allocation_date || ''}
              onChange={(e) => handleAllocationChange('allocation_date', e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Remarks"
              name="remarks"
              value={localAllocation.remarks || ''}
              onChange={(e) => handleAllocationChange('remarks', e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<CancelIcon />}>
          Cancel
        </Button>
        <Button onClick={saveAllocation} startIcon={<SaveIcon />} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
