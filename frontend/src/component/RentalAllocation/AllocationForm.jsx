// import { useState, useEffect } from 'react';
// import { ApiService } from './ApiService';

// const formInputStyle = 'w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200';

// export default function AllocationForm({ renters, properties, childProperties, onAllocationAdded, onClose, mode = 'add', allocation }) {
//   const [formData, setFormData] = useState({
//     renter_id: '',
//     property_id: '',
//     childproperty_id: '',
//     allocation_date: '',
//     remarks: '',
//     rent_agreement: null,
//     other_document: null,
//     status: 'Active'
//   });

//   // Prefill form data if editing an existing allocation
//   useEffect(() => {
//     if (mode === 'edit' && allocation) {
//       setFormData({
//         renter_id: allocation.renter_id || allocation.renterId || '',
//         property_id: allocation.property_id || allocation.propertyId || '',
//         childproperty_id: allocation.childproperty_id || '',
//         allocation_date: allocation.allocation_date || allocation.startDate || '',
//         remarks: allocation.remarks || '',
//         rent_agreement: null, // Files are not prefilled; user must upload new ones if needed
//         other_document: null, // Files are not prefilled; user must upload new ones if needed
//         status: allocation.status || 'Active'
//       });
//     }
//   }, [mode, allocation]);

//   // Form Handlers
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const form = new FormData();
//       form.append('renter_id', formData.renter_id);
//       form.append('property_id', formData.property_id);
//       form.append('childproperty_id', formData.childproperty_id);
//       form.append('allocation_date', formData.allocation_date);
//       form.append('remarks', formData.remarks);
//       form.append('status', formData.status);

//       if (formData.rent_agreement) {
//         form.append('agreementDocument', formData.rent_agreement);
//       }
//       if (formData.other_document) {
//         form.append('idProof', formData.other_document);
//       }

//       // Debugging - Log FormData before sending
//       for (let pair of form.entries()) {
//         console.log(pair[0], pair[1]); // Should show all fields correctly
//       }

//       if (mode === 'add') {
//         await ApiService.createAllocation(form);
//         alert('Allocation data saved successfully!');
//       } else if (mode === 'edit') {
//         await ApiService.updateAllocation(allocation.id || allocation.allocation_id, form);
//         alert('Allocation updated successfully!');
//       }

//       onAllocationAdded(); // Refresh data
//       setFormData({
//         renter_id: '',
//         property_id: '',
//         childproperty_id: '',
//         allocation_date: '',
//         remarks: '',
//         rent_agreement: null,
//         other_document: null,
//         status: 'Active'
//       });
//       onClose(); // Close modal
//     } catch (error) {
//       alert(`Failed to ${mode === 'add' ? 'save' : 'update'} allocation data!`);
//       console.error(error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 p-6 mt-8">
//       <div className="bg-white w-[800px] max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
//         <button
//           type="button" // Prevent form submission
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10"
//           onClick={onClose} // Directly call onClose
//         >
//           ✕
//         </button>
//         <h2 className="text-2xl font-semibold text-indigo-600 mb-4">{mode === 'add' ? 'Add New Allocation' : 'Edit Allocation'}</h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block mb-1 text-sm font-medium">Renter</label>
//               <select name="renter_id" value={formData.renter_id} onChange={handleInputChange} className={formInputStyle} required>
//                 <option value="">-- Select Renter --</option>
//                 {renters.map((renter) => (
//                   <option key={renter.id || renter.renter_id} value={renter.id || renter.renter_id}>
//                     {renter.renterName || renter.renter_name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block mb-1 text-sm font-medium">Property</label>
//               <select name="property_id" value={formData.property_id} onChange={handleInputChange} className={formInputStyle} required>
//                 <option value="">-- Select Property --</option>
//                 {properties.map((property) => (
//                   <option key={property.id || property.property_id} value={property.id || property.property_id}>
//                     {property.propertyName || property.property_name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block mb-1 text-sm font-medium">Unit/Floor</label>
//               <select name="childproperty_id" value={formData.childproperty_id} onChange={handleInputChange} className={formInputStyle}>
//                 <option value="">-- Select Unit/Floor (Optional) --</option>
//                 {childProperties.map((childProperty) => (
//                   <option
//                     key={childProperty.id || childProperty.childproperty_id}
//                     value={childProperty.id || childProperty.childproperty_id}
//                   >
//                     {childProperty.title || childProperty.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block mb-1 text-sm font-medium">Allocation Date</label>
//               <input
//                 type="date"
//                 name="allocation_date"
//                 value={formData.allocation_date}
//                 onChange={handleInputChange}
//                 className={formInputStyle}
//                 required
//               />
//             </div>
//           </div>
//           <label htmlFor="">Additon Notes or Remarks</label>
//           <textarea
//             name="remarks"
//             placeholder="Additional notes or remarks"
//             value={formData.remarks}
//             onChange={handleInputChange}
//             className={`${formInputStyle} h-24`}
//           />

//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block mb-1 text-sm font-medium">Status</label>
//               <select name="status" value={formData.status} onChange={handleInputChange} className={formInputStyle} required>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//                 <option value="Terminated">Terminated</option>
//                 <option value="Pending">Pending</option>
//               </select>
//             </div>
//             <div>
//               <label className="block mb-1 text-sm font-medium">Rent Agreement</label>
//               {mode === 'edit' && allocation.rent_agreement && (
//                 <a
//                   href={`${ApiService.API_URL}uploads/${allocation.rent_agreement}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block text-blue-600 underline mb-2"
//                 >
//                   Current Document
//                 </a>
//               )}
//               <input type="file" name="rent_agreement" onChange={handleFileChange} className={formInputStyle} />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block mb-1 text-sm font-medium">Other Document</label>
//               {mode === 'edit' && allocation.other_document && (
//                 <a
//                   href={`${ApiService.API_URL}uploads/${allocation.other_document}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block text-blue-600 underline mb-2"
//                 >
//                   Current Document
//                 </a>
//               )}
//               <input type="file" name="other_document" onChange={handleFileChange} className={formInputStyle} />
//             </div>
//           </div>
//           <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition">
//             {mode === 'add' ? 'Submit' : 'Save'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// 18-03
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
  // const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (mode === 'edit' && allocation) {
      onInputChange({
        target: {
          name: 'renter_id',
          value: allocation.renter_id || allocation.renterId || ''
        }
      });
      onInputChange({
        target: {
          name: 'property_id',
          value: allocation.property_id || allocation.propertyId || ''
        }
      });
      onInputChange({
        target: {
          name: 'childproperty_id',
          value: allocation.childproperty_id || ''
        }
      });
      onInputChange({
        target: {
          name: 'allocation_date',
          value: allocation.allocation_date || allocation.startDate || ''
        }
      });
      onInputChange({
        target: {
          name: 'remarks',
          value: allocation.remarks || ''
        }
      });
      onInputChange({
        target: {
          name: 'status',
          value: allocation.status || 'Active'
        }
      });
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
          {/* Renter */}
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

          {/* Property */}
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

          {/* Unit/Floor */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Unit/Floor</InputLabel>
              <Select label="Unit/Floor" name="childproperty_id" value={allocation?.childproperty_id || ''} onChange={onInputChange}>
                <MenuItem value="">
                  <em>-- Select Unit/Floor (Optional) --</em>
                </MenuItem>
                {childProperties.map((childProperty) => (
                  <MenuItem
                    key={childProperty.id || childProperty.childproperty_id}
                    value={childProperty.id || childProperty.childproperty_id}
                  >
                    {childProperty.title || childProperty.name}
                  </MenuItem>
                ))}
              </Select>
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
            />
          </Grid>

          {/* Status */}
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
