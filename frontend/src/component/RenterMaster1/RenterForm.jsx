// import { useState } from 'react';
// import axios from 'axios';
// const formInputStyle = 'w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200';

// export default function AddRenterModal({ onClose, onSubmitSuccess, editFlag, editformData }) {
//   const [formData, setFormData] = useState(
//     editformData
//       ? editformData
//       : {
//           renterName: '',
//           age: '',
//           fullAddress: '',
//           numberOfStayers: '',
//           contact1: '',
//           contact2: '',
//           remarks: '',
//           aadhaarCard: null,
//           panCard: null,
//           passportPhoto: null,
//           otherDocument: null
//         }
//   );

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setFormData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
//     }
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   alert('Renter data submitted successfully!');
//   //   onSubmitSuccess();
//   //   onClose();
//   // };
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const form = new FormData();

//   //     // Extract text data
//   //     const textData = {
//   //       renterName: formData.renterName,
//   //       fullAddress: formData.fullAddress,
//   //       age: formData.age,
//   //       numberOfStayers: formData.numberOfStayers,
//   //       contact1: formData.contact1,
//   //       contact2: formData.contact2,
//   //       remarks: formData.remarks,
//   //       status: formData.status || 'Active'
//   //     };

//   //     form.append('formData', JSON.stringify(textData));

//   //     // Append files if they exist and are File objects
//   //     if (formData.aadhaarCard instanceof File) {
//   //       form.append('aadhaarCard', formData.aadhaarCard);
//   //     }
//   //     if (formData.panCard instanceof File) {
//   //       form.append('panCard', formData.panCard);
//   //     }
//   //     if (formData.passportPhoto instanceof File) {
//   //       form.append('passportPhoto', formData.passportPhoto);
//   //     }
//   //     if (formData.otherDocument instanceof File) {
//   //       form.append('otherDocument', formData.otherDocument);
//   //     }

//   //     // If we're editing, use PUT request with the renter ID
//   //     if (editFlag && formData.id) {
//   //       await axios.put(`${import.meta.env.VITE_API_URL}renter/${formData.id}`, form, {
//   //         headers: { 'Content-Type': 'multipart/form-data' }
//   //       });
//   //     } else {
//   //       // For new renter, use POST
//   //       await axios.post(`${import.meta.env.VITE_API_URL}renter`, form, {
//   //         headers: { 'Content-Type': 'multipart/form-data' }
//   //       });
//   //     }

//   //     alert('Renter data submitted successfully!');
//   //     onSubmitSuccess(); // This should refresh the renters list
//   //     onClose(); // This should close the modal
//   //   } catch (error) {
//   //     console.error('Error saving renter data:', error);
//   //     alert('Failed to save renter data!');
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const form = new FormData();

//       // Extract text data
//       const textData = {
//         renterName: formData.renterName,
//         fullAddress: formData.fullAddress,
//         age: formData.age,
//         numberOfStayers: formData.numberOfStayers,
//         contact1: formData.contact1,
//         contact2: formData.contact2,
//         remarks: formData.remarks,
//         status: formData.status || 'Active'
//       };

//       // Serialize the form data to JSON
//       form.append('formData', JSON.stringify(textData));

//       // Append files if they exist and are File objects
//       if (formData.aadhaarCard instanceof File) {
//         form.append('aadhaarCard', formData.aadhaarCard);
//       }
//       if (formData.panCard instanceof File) {
//         form.append('panCard', formData.panCard);
//       }
//       if (formData.passportPhoto instanceof File) {
//         form.append('passportPhoto', formData.passportPhoto);
//       }
//       if (formData.otherDocument instanceof File) {
//         form.append('otherDocument', formData.otherDocument);
//       }

//       // Determine if we're editing or creating
//       const apiUrl = import.meta.env.VITE_API_URL;
//       if (Object.keys(editformData).length > 0 && editformData.id) {
//         // For editing, use PUT with the ID
//         await axios.put(`${apiUrl}renter/${editformData.id}`, form, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//       } else {
//         // For new entries, use POST
//         await axios.post(`${apiUrl}renter`, form, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//       }

//       alert('Renter data submitted successfully!');
//       onSubmitSuccess(); // Refresh the renters list
//       onClose(); // Close the modal
//     } catch (error) {
//       console.error('Error saving renter data:', error);
//       // alert(`Failed to save renter data: ${error.message}`);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50 p-6 mt-8">
//       <div className="bg-white w-[800px] max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
//         <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10" onClick={onClose}>
//           ✕
//         </button>
//         <h2 className="text-2xl font-semibold text-indigo-600 mb-4">{Object.keys(editformData)?.length > 0 ? 'Edit' : 'Add New'} Renter</h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="">Renter Name</label>
//               <input
//                 type="text"
//                 name="renterName"
//                 placeholder="Renter Name"
//                 value={formData.renterName}
//                 onChange={handleInputChange}
//                 className={formInputStyle}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="">Age</label>
//               <input
//                 type="text"
//                 name="age"
//                 placeholder="Age"
//                 value={formData.age}
//                 onChange={handleInputChange}
//                 className={formInputStyle}
//                 required
//               />
//             </div>
//           </div>
//           <label htmlFor="">Full Address</label>
//           <textarea
//             name="fullAddress"
//             placeholder="Full Address"
//             value={formData.fullAddress}
//             onChange={handleInputChange}
//             className={`${formInputStyle} h-32`}
//             required
//           />

//           <div className="grid grid-cols-3 gap-6">
//             <div>
//               <label htmlFor="">Number Of Stayers</label>
//               <input
//                 type="text"
//                 name="numberOfStayers"
//                 placeholder="Number of Stayers"
//                 value={formData.numberOfStayers}
//                 onChange={handleInputChange}
//                 className={formInputStyle}
//               />
//             </div>
//             <div>
//               <label htmlFor="">Contact 1</label>
//               <input
//                 type="text"
//                 name="contact1"
//                 placeholder="Contact Number 1"
//                 value={formData.contact1}
//                 onChange={handleInputChange}
//                 className={formInputStyle}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="">Contact 2</label>
//               <input
//                 type="text"
//                 name="contact2"
//                 placeholder="Contact Number 2"
//                 value={formData.contact2}
//                 onChange={handleInputChange}
//                 className={formInputStyle}
//               />
//             </div>
//           </div>
//           <label htmlFor="">Remarks</label>
//           <textarea
//             name="remarks"
//             placeholder="Remarks"
//             value={formData.remarks}
//             onChange={handleInputChange}
//             className={`${formInputStyle} h-24`}
//           />

//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block mb-1 text-sm font-medium">Aadhaar Card</label>
//               <input type="file" name="aadhaarCard" onChange={handleFileChange} className={formInputStyle} />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm font-medium">PAN Card</label>
//               <input type="file" name="panCard" onChange={handleFileChange} className={formInputStyle} />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block mb-1 text-sm font-medium">Passport Photo</label>
//               <input type="file" name="passportPhoto" onChange={handleFileChange} className={formInputStyle} />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm font-medium">Other Document</label>
//               <input type="file" name="otherDocument" onChange={handleFileChange} className={formInputStyle} />
//             </div>
//           </div>

//           <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';
// import axios from 'axios';
// const formInputStyle = 'w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200';

// export default function AddRenterModal({ onClose, onSubmitSuccess, editFlag, editformData }) {
//   const [formData, setFormData] = useState(
//     editformData
//       ? editformData
//       : {
//           renterName: '',
//           age: '',
//           fullAddress: '',
//           numberOfStayers: '',
//           contact1: '',
//           contact2: '',
//           remarks: '',
//           aadhaarCard: null,
//           panCard: null,
//           passportPhoto: null,
//           otherDocument: null
//         }
//   );

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setFormData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const form = new FormData();

//       // IMPORTANT CHANGE: Append each field directly to FormData instead of nesting in JSON
//       // Add text fields directly to FormData
//       form.append('renterName', formData.renterName);
//       form.append('fullAddress', formData.fullAddress);
//       form.append('age', formData.age);
//       form.append('numberOfStayers', formData.numberOfStayers);
//       form.append('contact1', formData.contact1);
//       form.append('contact2', formData.contact2 || '');
//       form.append('remarks', formData.remarks || '');
//       form.append('status', formData.status || 'Active');

//       // Append files if they exist and are File objects
//       if (formData.aadhaarCard instanceof File) {
//         form.append('aadhaarCard', formData.aadhaarCard);
//       }
//       if (formData.panCard instanceof File) {
//         form.append('panCard', formData.panCard);
//       }
//       if (formData.passportPhoto instanceof File) {
//         form.append('passportPhoto', formData.passportPhoto);
//       }
//       if (formData.otherDocument instanceof File) {
//         form.append('otherDocument', formData.otherDocument);
//       }

//       // Determine if we're editing or creating
//       const apiUrl = import.meta.env.VITE_API_URL;
//       if (editFlag && editformData && editformData.id) {
//         // For editing, use PUT with the ID
//         await axios.put(`${apiUrl}renter/${editformData.id}`, form, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//       } else {
//         // For new entries, use POST
//         await axios.post(`${apiUrl}renter`, form, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//       }

//       alert('Renter data submitted successfully!');
//       onSubmitSuccess(); // Refresh the renters list
//       onClose(); // Close the modal
//     } catch (error) {
//       console.error('Error saving renter data:', error);
//       // alert(`Failed to save renter data: ${error.message}`);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 p-6 mt-8">
//       <div className="bg-white w-[800px] max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
//         <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10" onClick={onClose}>
//           ✕
//         </button>
//         <h2 className="text-2xl font-semibold text-indigo-600 mb-4">{editFlag ? 'Edit' : 'Add New'} Renter</h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="renterName">Renter Name</label>
//               <input
//                 type="text"
//                 id="renterName"
//                 name="renterName"
//                 placeholder="Renter Name"
//                 value={formData.renterName}
//                 onChange={handleInputChange}
//                 className={formInputStyle}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="age">Age</label>
//               <input
//                 type="text"
//                 id="age"
//                 name="age"
//                 placeholder="Age"
//                 value={formData.age}
//                 onChange={handleInputChange}
//                 className={formInputStyle}
//                 required
//               />
//             </div>
//           </div>
//           <label htmlFor="fullAddress">Full Address</label>
//           <textarea
//             id="fullAddress"
//             name="fullAddress"
//             placeholder="Full Address"
//             value={formData.fullAddress}
//             onChange={handleInputChange}
//             className={`${formInputStyle} h-32`}
//             required
//           />

//           <div className="grid grid-cols-3 gap-6">
//             <div>
//               <label htmlFor="numberOfStayers">Number Of Stayers</label>
//               <input
//                 type="text"
//                 id="numberOfStayers"
//                 name="numberOfStayers"
//                 placeholder="Number of Stayers"
//                 value={formData.numberOfStayers}
//                 onChange={handleInputChange}
//                 className={formInputStyle}
//               />
//             </div>
//             <div>
//               <label htmlFor="contact1">Contact 1</label>
//               <input
//                 type="text"
//                 id="contact1"
//                 name="contact1"
//                 placeholder="Contact Number 1"
//                 value={formData.contact1}
//                 onChange={handleInputChange}
//                 className={formInputStyle}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="contact2">Contact 2</label>
//               <input
//                 type="text"
//                 id="contact2"
//                 name="contact2"
//                 placeholder="Contact Number 2"
//                 value={formData.contact2}
//                 onChange={handleInputChange}
//                 className={formInputStyle}
//               />
//             </div>
//           </div>
//           <label htmlFor="remarks">Remarks</label>
//           <textarea
//             id="remarks"
//             name="remarks"
//             placeholder="Remarks"
//             value={formData.remarks}
//             onChange={handleInputChange}
//             className={`${formInputStyle} h-24`}
//           />

//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block mb-1 text-sm font-medium">Aadhaar Card</label>
//               <input type="file" name="aadhaarCard" onChange={handleFileChange} className={formInputStyle} />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm font-medium">PAN Card</label>
//               <input type="file" name="panCard" onChange={handleFileChange} className={formInputStyle} />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block mb-1 text-sm font-medium">Passport Photo</label>
//               <input type="file" name="passportPhoto" onChange={handleFileChange} className={formInputStyle} />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm font-medium">Other Document</label>
//               <input type="file" name="otherDocument" onChange={handleFileChange} className={formInputStyle} />
//             </div>
//           </div>

//           <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

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
