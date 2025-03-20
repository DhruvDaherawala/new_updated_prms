// // 18-03
// import React, { useEffect } from 'react';

// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Typography,
//   Grid,
//   TextField,
//   Button,
//   IconButton,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Cancel';
// import AttachFileIcon from '@mui/icons-material/AttachFile';

// export default function AllocationForm({
//   open,
//   mode = 'add',
//   allocation,
//   onInputChange,
//   onFileChange,
//   onSubmit,
//   onClose,
//   renters,
//   properties,
//   childProperties,
//   apiUrl
// }) {
//   // const API_URL = import.meta.env.VITE_API_URL;
//   useEffect(() => {
//     if (mode === 'edit' && allocation) {
//       onInputChange({
//         target: {
//           name: 'renter_id',
//           value: allocation.renter_id || allocation.renterId || ''
//         }
//       });
//       onInputChange({
//         target: {
//           name: 'property_id',
//           value: allocation.property_id || allocation.propertyId || ''
//         }
//       });
//       onInputChange({
//         target: {
//           name: 'childproperty_id',
//           value: allocation.childproperty_id || ''
//         }
//       });
//       onInputChange({
//         target: {
//           name: 'allocation_date',
//           value: allocation.allocation_date || allocation.startDate || ''
//         }
//       });
//       onInputChange({
//         target: {
//           name: 'remarks',
//           value: allocation.remarks || ''
//         }
//       });
//       onInputChange({
//         target: {
//           name: 'status',
//           value: allocation.status || 'Active'
//         }
//       });
//     }
//   }, [mode, allocation, onInputChange]);

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle>
//         <Typography variant="h6">{mode === 'add' ? 'Add New Allocation' : 'Edit Allocation'}</Typography>
//         <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent dividers>
//         <Grid container spacing={2}>
//           {/* Renter */}
//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Renter</InputLabel>
//               <Select
//                 label="Renter"
//                 name="renter_id"
//                 value={allocation?.renter_id || allocation?.renterId || ''}
//                 onChange={onInputChange}
//                 required
//               >
//                 <MenuItem value="">
//                   <em>-- Select Renter --</em>
//                 </MenuItem>
//                 {renters.map((renter) => (
//                   <MenuItem key={renter.id || renter.renter_id} value={renter.id || renter.renter_id}>
//                     {renter.renterName || renter.renter_name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Property */}
//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Property</InputLabel>
//               <Select
//                 label="Property"
//                 name="property_id"
//                 value={allocation?.property_id || allocation?.propertyId || ''}
//                 onChange={onInputChange}
//                 required
//               >
//                 <MenuItem value="">
//                   <em>-- Select Property --</em>
//                 </MenuItem>
//                 {properties.map((property) => (
//                   <MenuItem key={property.id || property.property_id} value={property.id || property.property_id}>
//                     {property.propertyName || property.property_name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Unit/Floor */}
//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Unit/Floor</InputLabel>
//               <Select label="Unit/Floor" name="childproperty_id" value={allocation?.childproperty_id || ''} onChange={onInputChange}>
//                 <MenuItem value="">
//                   <em>-- Select Unit/Floor (Optional) --</em>
//                 </MenuItem>
//                 {childProperties.map((childProperty) => (
//                   <MenuItem
//                     key={childProperty.id || childProperty.childproperty_id}
//                     value={childProperty.id || childProperty.childproperty_id}
//                   >
//                     {childProperty.title || childProperty.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Allocation Date */}
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Allocation Date"
//               name="allocation_date"
//               type="date"
//               value={allocation?.allocation_date || allocation?.startDate || ''}
//               onChange={onInputChange}
//               fullWidth
//               variant="outlined"
//               InputLabelProps={{ shrink: true }}
//               required
//             />
//           </Grid>

//           {/* Status */}
//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Status</InputLabel>
//               <Select label="Status" name="status" value={allocation?.status || 'Active'} onChange={onInputChange} required>
//                 <MenuItem value="Active">Active</MenuItem>
//                 <MenuItem value="Inactive">Inactive</MenuItem>
//                 <MenuItem value="Terminated">Terminated</MenuItem>
//                 <MenuItem value="Pending">Pending</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Remarks */}
//           <Grid item xs={12}>
//             <TextField
//               label="Remarks"
//               name="remarks"
//               value={allocation?.remarks || ''}
//               onChange={onInputChange}
//               fullWidth
//               variant="outlined"
//               multiline
//               rows={3}
//             />
//           </Grid>

// {/* Document Uploads */}
// <Grid item xs={12} md={6}>
//   <Button variant="contained" component="label" startIcon={<AttachFileIcon />}>
//     Upload Rent Agreement
//     <input type="file" name="rent_agreement" hidden onChange={onFileChange} />
//   </Button>
//   {allocation?.rent_agreement && mode === 'edit' && (
//     <Typography variant="body2" sx={{ mt: 1 }}>
//       Current:{' '}
//       <a
//         href={`${apiUrl}uploads/${allocation.rent_agreement}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-600 underline"
//       >
//         View
//       </a>
//     </Typography>
//   )}
// </Grid>
// <Grid item xs={12} md={6}>
//   <Button variant="contained" component="label" startIcon={<AttachFileIcon />}>
//     Upload Other Document
//     <input type="file" name="other_document" hidden onChange={onFileChange} />
//   </Button>
//   {allocation?.other_document && mode === 'edit' && (
//     <Typography variant="body2" sx={{ mt: 1 }}>
//       Current:{' '}
//       <a
//         href={`${apiUrl}uploads/${allocation.other_document}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-600 underline"
//       >
//         View
//       </a>
//     </Typography>
//   )}
// </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} startIcon={<CancelIcon />}>
//           Cancel
//         </Button>
//         <Button onClick={onSubmit} startIcon={<SaveIcon />} variant="contained" color="primary">
//           {mode === 'add' ? 'Save' : 'Update'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }
//=================19/3/25=========================

import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (mode === 'edit' && allocation) {
      onInputChange({ target: { name: 'renter_id', value: allocation.renter_id || allocation.renterId || '' } });
      onInputChange({ target: { name: 'property_id', value: allocation.property_id || allocation.propertyId || '' } });
      onInputChange({ target: { name: 'childproperty_id', value: allocation.childproperty_id || '' } });
      onInputChange({ target: { name: 'allocation_date', value: allocation.allocation_date || allocation.startDate || '' } });
      onInputChange({ target: { name: 'remarks', value: allocation.remarks || '' } });
      onInputChange({ target: { name: 'status', value: allocation.status || 'Active' } });
    }
  }, [mode, allocation, onInputChange]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6">{mode === 'add' ? 'Add New Allocation' : 'Edit Allocation'}</Typography>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Renter</InputLabel>
              <Select
                label="Renter"
                name="renter_id"
                value={allocation?.renter_id || allocation?.renterId || ''}
                onChange={onInputChange}
                required
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
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Property</InputLabel>
              <Select
                label="Property"
                name="property_id"
                value={allocation?.property_id || allocation?.propertyId || ''}
                onChange={onInputChange}
                required
              >
                <MenuItem value="">
                  <em>-- Select Property --</em>
                </MenuItem>
                {properties.map((property) => (
                  <MenuItem key={property.id || property.property_id} value={property.id || property.property_id}>
                    {property.propertyName || property.property_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Floor</InputLabel>
              <Select label="Floor" name="childproperty_id" value={allocation?.childproperty_id || ''} onChange={onInputChange}>
                <MenuItem value="">
                  <em>-- Select Floor (Optional) --</em>
                </MenuItem>
                {childProperties.map((childProperty) => (
                  <MenuItem
                    key={childProperty.id || childProperty.childproperty_id}
                    value={childProperty.id || childProperty.childproperty_id}
                  >
                    {childProperty.floor || 'N/A'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
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
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select label="Status" name="status" value={allocation?.status || 'Active'} onChange={onInputChange} required>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Terminated">Terminated</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
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
        </Grid>
        {/* Document Uploads */}
        <Grid item xs={12} md={6}>
          <Button variant="contained" component="label" startIcon={<AttachFileIcon />}>
            Upload Rent Agreement
            <input type="file" name="rent_agreement" hidden onChange={onFileChange} />
          </Button>
          {allocation?.rent_agreement && mode === 'edit' && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Current:{' '}
              <a
                href={`${apiUrl}uploads/${allocation.rent_agreement}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View
              </a>
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" component="label" startIcon={<AttachFileIcon />}>
            Upload Other Document
            <input type="file" name="other_document" hidden onChange={onFileChange} />
          </Button>
          {allocation?.other_document && mode === 'edit' && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Current:{' '}
              <a
                href={`${apiUrl}uploads/${allocation.other_document}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View
              </a>
            </Typography>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<CancelIcon />}>
          Cancel
        </Button>
        <Button onClick={onSubmit} startIcon={<SaveIcon />} variant="contained" color="primary">
          {mode === 'add' ? 'Save' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
