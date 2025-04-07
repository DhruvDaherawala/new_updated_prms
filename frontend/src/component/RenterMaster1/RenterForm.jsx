// 18-03
import React from 'react';
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
  InputLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function RenterForm({ open, formData, onInputChange, onFileChange, onSubmit, onClose, editFlag }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6">{editFlag ? 'Edit Renter' : 'Add New Renter'}</Typography>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Renter Name */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Renter Name"
              name="renterName"
              value={formData.renterName}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>

          {/* Age */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>

          {/* Full Address */}
          <Grid item xs={12}>
            <TextField
              label="Full Address"
              name="fullAddress"
              value={formData.fullAddress}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              required
            />
          </Grid>

          {/* Number of Stayers */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Number of Stayers"
              name="numberOfStayers"
              type="number"
              value={formData.numberOfStayers}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select label="Status" name="status" value={formData.status || 'Active'} onChange={onInputChange} required>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Blacklisted">Deactivated</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Contact 1 */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Contact 1"
              name="contact1"
              value={formData.contact1}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>

          {/* Contact 2 */}
          <Grid item xs={12} md={6}>
            <TextField label="Contact 2" name="contact2" value={formData.contact2} onChange={onInputChange} fullWidth variant="outlined" />
          </Grid>

          {/* Remarks */}
          <Grid item xs={12}>
            <TextField
              label="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              multiline
              rows={3}
            />
          </Grid>

          {/* Document Uploads */}
          <Grid item xs={12} md={6}>
            <Button variant="contained" component="label" startIcon={<AttachFileIcon />}>
              Upload Aadhaar Card
              <input type="file" name="aadhaarCard" hidden onChange={onFileChange} />
            </Button>
            {formData.aadhaarCard && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                File: {formData.aadhaarCard.name || formData.aadhaarCard}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" component="label" startIcon={<AttachFileIcon />}>
              Upload PAN Card
              <input type="file" name="panCard" hidden onChange={onFileChange} />
            </Button>
            {formData.panCard && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                File: {formData.panCard.name || formData.panCard}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" component="label" startIcon={<AttachFileIcon />}>
              Upload Passport Photo
              <input type="file" name="passportPhoto" hidden onChange={onFileChange} />
            </Button>
            {formData.passportPhoto && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                File: {formData.passportPhoto.name || formData.passportPhoto}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" component="label" startIcon={<AttachFileIcon />}>
              Upload Other Document
              <input type="file" name="otherDocument" hidden onChange={onFileChange} />
            </Button>
            {formData.otherDocument && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                File: {formData.otherDocument.name || formData.otherDocument}
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<CancelIcon />}>
          Cancel
        </Button>
        <Button onClick={onSubmit} startIcon={<SaveIcon />} variant="contained" color="primary">
          {editFlag ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
