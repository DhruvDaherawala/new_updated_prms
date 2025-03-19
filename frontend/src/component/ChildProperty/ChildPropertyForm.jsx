// import React from 'react';

// const formInputStyle = 'w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200';

// export default function ChildPropertyForm({ formData, onInputChange, onSubmit, onClose, parentProperties, floorError }) {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
//       <div className="bg-white w-[800px] max-h-[70vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
//         <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
//           ✕
//         </button>
//         <h2 className="text-2xl font-semibold text-indigo-600 mb-4">{formData.id ? 'Edit Child Property' : 'Add New Child Property'}</h2>

//         <form onSubmit={onSubmit} className="space-y-6">
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="">Property Name</label>
//               <select name="property_id" value={formData.property_id} onChange={onInputChange} className={formInputStyle} required>
//                 <option value="">Select Parent Property</option>
//                 {parentProperties.map((parent) => (
//                   <option key={parent.id} value={parent.id}>
//                     {parent.propertyName} - {parent.ownerName} (Max Floors: {parent.numberOfFloors})
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label htmlFor="">Floor Number</label>
//               <input
//                 type="number"
//                 name="floor"
//                 placeholder="Floor"
//                 value={formData.floor}
//                 onChange={onInputChange}
//                 className={formInputStyle}
//                 required
//               />

//               {floorError && <p className="text-red-600 text-sm mt-1">{floorError}</p>}
//             </div>
//           </div>
//           <label htmlFor="">Child Property Title</label>
//           <input
//             type="text"
//             name="title"
//             placeholder="Child Property Title"
//             value={formData.title}
//             onChange={onInputChange}
//             className={formInputStyle}
//             required
//           />

//           <label htmlFor="">Description</label>
//           <textarea
//             name="description"
//             placeholder="Child Property Description"
//             value={formData.description}
//             onChange={onInputChange}
//             className={`${formInputStyle} h-32`}
//             required
//           />

//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="">Number of Rooms</label>
//               <input
//                 type="number"
//                 name="rooms"
//                 placeholder="Number of Rooms"
//                 value={formData.rooms}
//                 onChange={onInputChange}
//                 className={formInputStyle}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="">Washroom</label>
//               <input
//                 type="number"
//                 name="washroom"
//                 placeholder="Number of Washrooms"
//                 value={formData.washroom}
//                 onChange={onInputChange}
//                 className={formInputStyle}
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="">Gas Availability</label>
//               <input
//                 type="text"
//                 name="gas"
//                 placeholder="Gas Availability"
//                 value={formData.gas}
//                 onChange={onInputChange}
//                 className={formInputStyle}
//               />
//             </div>
//             <div>
//               <label htmlFor="">Electricity Availability</label>
//               <input
//                 type="text"
//                 name="electricity"
//                 placeholder="Electricity Availability"
//                 value={formData.electricity}
//                 onChange={onInputChange}
//                 className={formInputStyle}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="">Deposit Amount</label>
//               <input
//                 type="number"
//                 name="deposit"
//                 placeholder="Deposit Amount"
//                 value={formData.deposit}
//                 onChange={onInputChange}
//                 className={formInputStyle}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="">Rent Amount</label>
//               <input
//                 type="number"
//                 name="rent"
//                 placeholder="Rent Amount"
//                 value={formData.rent}
//                 onChange={onInputChange}
//                 className={formInputStyle}
//                 required
//               />
//             </div>
//           </div>
//           <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition">
//             {formData.id ? 'Update Child Property' : 'Create Child Property'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// 18-03

// import React from 'react';
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

// export default function ChildPropertyForm({ open, formData, onInputChange, onSubmit, onClose, parentProperties, floorError }) {
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle>
//         <Typography variant="h6">{formData.id ? 'Edit Child Property' : 'Add Child Property'}</Typography>
//         <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent dividers>
//         <Grid container spacing={2}>
//           {/* Parent Property */}
//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Parent Property</InputLabel>
//               <Select label="Parent Property" name="property_id" value={formData.property_id} onChange={onInputChange} required>
//                 <MenuItem value="">
//                   <em>Select Parent Property</em>
//                 </MenuItem>
//                 {parentProperties.map((parent) => (
//                   <MenuItem key={parent.id} value={parent.id}>
//                     {parent.propertyName} - {parent.ownerName} (Max Floors: {parent.numberOfFloors})
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Floor Number */}
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Floor Number"
//               name="floor"
//               type="number"
//               value={formData.floor}
//               onChange={onInputChange}
//               fullWidth
//               variant="outlined"
//               error={!!floorError}
//               helperText={floorError}
//               required
//             />
//           </Grid>

//           {/* Title */}
//           <Grid item xs={12}>
//             <TextField
//               label="Child Property Title"
//               name="title"
//               value={formData.title}
//               onChange={onInputChange}
//               fullWidth
//               variant="outlined"
//               required
//             />
//           </Grid>

//           {/* Description */}
//           <Grid item xs={12}>
//             <TextField
//               label="Description"
//               name="description"
//               value={formData.description}
//               onChange={onInputChange}
//               fullWidth
//               variant="outlined"
//               multiline
//               rows={3}
//               required
//             />
//           </Grid>

//           {/* Rooms and Washrooms */}
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Number of Rooms"
//               name="rooms"
//               type="number"
//               value={formData.rooms}
//               onChange={onInputChange}
//               fullWidth
//               variant="outlined"
//               required
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Number of Washrooms"
//               name="washroom"
//               type="number"
//               value={formData.washroom}
//               onChange={onInputChange}
//               fullWidth
//               variant="outlined"
//               required
//             />
//           </Grid>

//           {/* Gas and Electricity */}
//           <Grid item xs={12} md={6}>
//             <TextField label="Gas Availability" name="gas" value={formData.gas} onChange={onInputChange} fullWidth variant="outlined" />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Electricity Availability"
//               name="electricity"
//               value={formData.electricity}
//               onChange={onInputChange}
//               fullWidth
//               variant="outlined"
//             />
//           </Grid>

//           {/* Deposit and Rent */}
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Deposit Amount"
//               name="deposit"
//               type="number"
//               value={formData.deposit}
//               onChange={onInputChange}
//               fullWidth
//               variant="outlined"
//               required
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Rent Amount"
//               name="rent"
//               type="number"
//               value={formData.rent}
//               onChange={onInputChange}
//               fullWidth
//               variant="outlined"
//               required
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} startIcon={<CancelIcon />}>
//           Cancel
//         </Button>
//         <Button onClick={onSubmit} startIcon={<SaveIcon />} variant="contained" color="primary">
//           {formData.id ? 'Update' : 'Save'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }
//=====================19/3/25============================

import React, { useState, useEffect } from 'react';
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

export default function ChildPropertyForm({ open, formData, onInputChange, onSubmit, onClose, parentProperties, floorError }) {
  const [maxFloors, setMaxFloors] = useState([]);

  useEffect(() => {
    if (formData.property_id) {
      const selectedProperty = parentProperties.find((parent) => parent.id === formData.property_id);
      if (selectedProperty) {
        setMaxFloors(Array.from({ length: selectedProperty.numberOfFloors }, (_, i) => i + 1));
      } else {
        setMaxFloors([]);
      }
    }
  }, [formData.property_id, parentProperties]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6">{formData.id ? 'Edit Child Property' : 'Add Child Property'}</Typography>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Parent Property */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Parent Property</InputLabel>
              <Select
                label="Parent Property"
                name="property_id"
                value={formData.property_id || ''}
                onChange={onInputChange}
                required
              >
                <MenuItem value="">
                  <em>Select Parent Property</em>
                </MenuItem>
                {parentProperties.map((parent) => (
                  <MenuItem key={parent.id} value={parent.id}>
                    {parent.propertyName} - {parent.ownerName} (Max Floors: {parent.numberOfFloors})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Floor Number */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" error={!!floorError} required>
              <InputLabel>Floor Number</InputLabel>
              <Select
                label="Floor Number"
                name="floor"
                value={formData.floor || ''}
                onChange={onInputChange}
              >
                {maxFloors.length === 0 ? (
                  <MenuItem value="">
                    <em>Select Parent Property First</em>
                  </MenuItem>
                ) : (
                  maxFloors.map((floor) => (
                    <MenuItem key={floor} value={floor}>{floor}</MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* Title */}
          <Grid item xs={12}>
            <TextField
              label="Child Property Title"
              name="title"
              value={formData.title || ''}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description || ''}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              required
            />
          </Grid>

          {/* Rooms and Washrooms */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Number of Rooms"
              name="rooms"
              type="number"
              value={formData.rooms || ''}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Number of Washrooms"
              name="washroom"
              type="number"
              value={formData.washroom || ''}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>

          {/* Gas Availability */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Gas Availability</InputLabel>
              <Select
                label="Gas Availability"
                name="gas"
                value={formData.gas || ''}
                onChange={onInputChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          {/* Electricity Availability */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Electricity Availability</InputLabel>
              <Select
                label="Electricity Availability"
                name="electricity"
                value={formData.electricity || ''}
                onChange={onInputChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Deposit and Rent */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Deposit Amount"
              name="deposit"
              type="number"
              value={formData.deposit || ''}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Rent Amount"
              name="rent"
              type="number"
              value={formData.rent || ''}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<CancelIcon />}>
          Cancel
        </Button>
        <Button onClick={onSubmit} startIcon={<SaveIcon />} variant="contained" color="primary">
          {formData.id ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
