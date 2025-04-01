// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import RenterList from './RenterList';
// import RenterForm from './RenterForm';
// import RenterDetailModal from './RenterDetailModal';
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   IconButton,
//   Typography,
//   TextField,
//   Paper,
//   CircularProgress,
//   Container,
//   Card,
//   CardContent,
//   Divider,
//   InputAdornment
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import SearchIcon from '@mui/icons-material/Search';
// import CloseIcon from '@mui/icons-material/Close';
// import PersonIcon from '@mui/icons-material/Person';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import PhoneIcon from '@mui/icons-material/Phone';

// export default function RenterMasterForm() {
//   // Pull API URL from environment
//   const API_URL = import.meta.env.VITE_API_URL;

//   // States
//   const [renters, setRenters] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editFlag, setEditFlag] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [formData, setFormData] = useState({
//     renterName: '',
//     fullAddress: '',
//     age: '',
//     numberOfStayers: '',
//     aadhaarCard: null,
//     panCard: null,
//     passportPhoto: null,
//     otherDocument: null,
//     contact1: '',
//     contact2: '',
//     remarks: '',
//     status: 'Active'
//   });

//   // Modal state
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRenter, setSelectedRenter] = useState(null);

//   // Fetch all renters on mount
//   useEffect(() => {
//     fetchRenters();
//   }, []);

//   const fetchRenters = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`${API_URL}renter`);
//       setRenters(response.data);
//     } catch (error) {
//       console.error('Error fetching renters:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Filter renters based on search term
//   const filteredRenters = renters.filter(
//     (renter) =>
//       renter.renterName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       renter.fullAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       renter.contact1?.includes(searchTerm) ||
//       renter.contact2?.includes(searchTerm)
//   );

//   // Form Handlers for Creating a New Renter
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

//       const textData = {
//         renterName: formData.renterName,
//         fullAddress: formData.fullAddress,
//         age: formData.age,
//         numberOfStayers: formData.numberOfStayers,
//         contact1: formData.contact1,
//         contact2: formData.contact2,
//         remarks: formData.remarks,
//         status: formData.status
//       };

//       form.append('formData', JSON.stringify(textData));

//       // Append files if they exist
//       if (formData.aadhaarCard) {
//         form.append('aadhaarCard', formData.aadhaarCard);
//       }
//       if (formData.panCard) {
//         form.append('panCard', formData.panCard);
//       }
//       if (formData.passportPhoto) {
//         form.append('passportPhoto', formData.passportPhoto);
//       }
//       if (formData.otherDocument) {
//         form.append('otherDocument', formData.otherDocument);
//       }

//       await axios.post(`${API_URL}renter`, form, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       alert('Renter data saved successfully!');
//       fetchRenters();
//       setFormData({
//         renterName: '',
//         fullAddress: '',
//         age: '',
//         numberOfStayers: '',
//         aadhaarCard: null,
//         panCard: null,
//         passportPhoto: null,
//         otherDocument: null,
//         contact1: '',
//         contact2: '',
//         remarks: '',
//         status: 'Active'
//       });
//       setShowForm(false);
//     } catch (error) {
//       console.error('Error saving renter data:', error);
//       alert('Failed to save renter data!');
//     }
//   };

//   // Renter Details Modal
//   const handleDetailsClick = async (renter) => {
//     try {
//       const response = await axios.get(`${API_URL}renter/${renter.id}`);
//       setSelectedRenter(response.data);
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error('Error fetching renter details:', error);
//       alert('Failed to load renter details.');
//     }
//   };

//   // Edit function - opens modal directly in edit mode
//   const handleEditClick = async (renter) => {
//     setShowForm(true);
//     setFormData(renter);
//     setEditFlag(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedRenter(null);
//   };

//   const handleDeleteClick = async (renter) => {
//     if (window.confirm('Are you sure you want to delete this renter?')) {
//       try {
//         await axios.delete(`${API_URL}renter/${renter.id}`);
//         alert('Renter deleted successfully!');
//         fetchRenters();
//       } catch (error) {
//         console.error('Error deleting renter:', error);
//         alert('Failed to delete renter!');
//       }
//     }
//   };

//   // Get active renters count
//   const getActiveRenters = () => {
//     return renters.filter(r => r.status === 'Active').length;
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Header */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: 3,
//           mb: 4,
//           borderRadius: 2,
//           background: 'linear-gradient(to right, #e3f2fd, #bbdefb)'
//         }}
//       >
//         <Grid container spacing={2} alignItems="center" justifyContent="space-between">
//           <Grid item xs={12} md={6}>
//             <Typography variant="h4" component="h1" fontWeight="bold" color="primary.dark">
//               Renter Management
//             </Typography>
//             <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
//               Manage all your renters information in one place
//             </Typography>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <TextField
//                 placeholder="Search renters..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 variant="outlined"
//                 sx={{ flexGrow: 1 }}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <SearchIcon color="action" />
//                     </InputAdornment>
//                   )
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={showForm ? <CloseIcon /> : <AddIcon />}
//                 onClick={() => {
//                   setShowForm(!showForm);
//                   setEditFlag(false);
//                   setFormData({
//                     renterName: '',
//                     fullAddress: '',
//                     age: '',
//                     numberOfStayers: '',
//                     aadhaarCard: null,
//                     panCard: null,
//                     passportPhoto: null,
//                     otherDocument: null,
//                     contact1: '',
//                     contact2: '',
//                     remarks: '',
//                     status: 'Active'
//                   });
//                 }}
//               >
//                 {showForm ? "Close Form" : "Add Renter"}
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Dashboard Cards */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} md={4}>
//           <Card elevation={2} sx={{ borderLeft: '4px solid #2196f3', height: '100%' }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Box>
//                   <Typography variant="overline" color="text.secondary">
//                     Total Renters
//                   </Typography>
//                   <Typography variant="h4" fontWeight="bold">
//                     {renters.length}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ p: 1.5, bgcolor: '#e3f2fd', borderRadius: '50%' }}>
//                   <PersonIcon fontSize="large" color="primary" />
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card elevation={2} sx={{ borderLeft: '4px solid #4caf50', height: '100%' }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Box>
//                   <Typography variant="overline" color="text.secondary">
//                     Active Renters
//                   </Typography>
//                   <Typography variant="h4" fontWeight="bold">
//                     {getActiveRenters()}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ p: 1.5, bgcolor: '#e8f5e9', borderRadius: '50%' }}>
//                   <CheckCircleIcon fontSize="large" color="success" />
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card elevation={2} sx={{ borderLeft: '4px solid #ff9800', height: '100%' }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Box>
//                   <Typography variant="overline" color="text.secondary">
//                     Average Age
//                   </Typography>
//                   <Typography variant="h4" fontWeight="bold">
//                     {renters.length ? Math.round(renters.reduce((acc, r) => acc + (parseInt(r.age) || 0), 0) / renters.length) : 0}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ p: 1.5, bgcolor: '#fff3e0', borderRadius: '50%' }}>
//                   <PhoneIcon fontSize="large" color="warning" />
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Add/Edit Renter Form */}
//       {showForm && (
//         <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
//           <Typography variant="h5" sx={{ mb: 3 }}>
//             {editFlag ? 'Edit Renter' : 'Add New Renter'}
//           </Typography>
//           <RenterForm
//             formData={formData}
//             handleInputChange={handleInputChange}
//             handleFileChange={handleFileChange}
//             handleSubmit={handleSubmit}
//             editFlag={editFlag}
//           />
//         </Paper>
//       )}

//       {/* Renters Listing */}
//       <Paper sx={{ p: 3, borderRadius: 2 }}>
//         <Typography variant="h5" sx={{ mb: 2 }}>
//           Renter Listings
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//           View and manage all your renters
//         </Typography>

//         <Divider sx={{ mb: 3 }} />

//         {isLoading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
//             <CircularProgress />
//           </Box>
//         ) : filteredRenters.length > 0 ? (
//           <RenterList
//             renters={filteredRenters}
//             onDetailsClick={handleDetailsClick}
//             onEditClick={handleEditClick}
//             handleDeleteClick={handleDeleteClick}
//             apiUrl={API_URL}
//           />
//         ) : (
//           <Box sx={{ textAlign: 'center', py: 5 }}>
//             <Typography variant="h6">
//               {searchTerm ? 'No renters found matching your search' : 'No renters available'}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//               {searchTerm ? 'Try adjusting your search' : 'Click the "Add Renter" button to get started'}
//             </Typography>
//             {searchTerm && (
//               <Button
//                 sx={{ mt: 2 }}
//                 onClick={() => setSearchTerm('')}
//                 variant="outlined"
//               >
//                 Clear Search
//               </Button>
//             )}
//           </Box>
//         )}
//       </Paper>

//       {/* Renter Details Modal */}
//       {isModalOpen && selectedRenter && (
//         <Dialog
//           open={isModalOpen}
//           onClose={closeModal}
//           maxWidth="md"
//           fullWidth
//         >
//           <DialogTitle>
//             <Typography variant="h6">
//               Renter Details
//             </Typography>
//             <IconButton
//               onClick={closeModal}
//               sx={{ position: 'absolute', right: 8, top: 8 }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent dividers>
//             <RenterDetailModal renter={selectedRenter} apiUrl={API_URL} />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={closeModal}>Close</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Container>
//   );
// }

// 18-03
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RenterList from './RenterList';
import RenterForm from './RenterForm';
import RenterDetailModal from './RenterDetailModal';
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  CircularProgress,
  Container,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteConfirmationModal from 'component/DeleteModal/DeleteConfirmationModal';
export default function RenterMasterForm() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [renters, setRenters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    renterName: '',
    fullAddress: '',
    age: '',
    numberOfStayers: '',
    aadhaarCard: null,
    panCard: null,
    passportPhoto: null,
    otherDocument: null,
    contact1: '',
    contact2: '',
    remarks: '',
    status: 'Active'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRenter, setSelectedRenter] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [renterToDelete, setRenterToDelete] = useState(null);

  useEffect(() => {
    fetchRenters();
  }, []);

  const fetchRenters = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}renter`);
      setRenters(response.data);
    } catch (error) {
      console.error('Error fetching renters:', error);
      toast.error('Error fetching renters.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRenters = renters.filter(
    (renter) =>
      renter.renterName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      renter.fullAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      renter.contact1?.includes(searchTerm) ||
      renter.contact2?.includes(searchTerm)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  // const handleSubmit = async () => {
  //   try {
  //     const form = new FormData();

  //     const textData = {
  //       renterName: formData.renterName,
  //       fullAddress: formData.fullAddress,
  //       age: formData.age,
  //       numberOfStayers: formData.numberOfStayers,
  //       contact1: formData.contact1,
  //       contact2: formData.contact2,
  //       remarks: formData.remarks,
  //       status: formData.status
  //     };

  //     form.append('formData', JSON.stringify(textData));

  //     if (formData.aadhaarCard) form.append('aadhaarCard', formData.aadhaarCard);
  //     if (formData.panCard) form.append('panCard', formData.panCard);
  //     if (formData.passportPhoto) form.append('passportPhoto', formData.passportPhoto);
  //     if (formData.otherDocument) form.append('otherDocument', formData.otherDocument);

  //     if (editFlag && formData.id) {
  //       await axios.put(`${API_URL}renter/${formData.id}`, form, {
  //         headers: { 'Content-Type': 'multipart/form-data' }
  //       });
  //       // alert('Renter updated successfully!');
  //       toast.success('Renter updated successfully!');
  //     } else {
  //       await axios.post(`${API_URL}renter`, form, {
  //         headers: { 'Content-Type': 'multipart/form-data' }
  //       });
  //       // alert('Renter created successfully!');
  //       toast.success('Renter created successfully!');
  //     }

  //     fetchRenters();
  //     resetForm();
  //     setShowForm(false);
  //     setEditFlag(false);
  //   } catch (error) {
  //     console.error('Error saving renter data:', error);
  //     // alert('Failed to save renter data!');
  //     toast.error('Failed to save renter data!');
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const form = new FormData();

      const textData = {
        renterName: formData.renterName,
        fullAddress: formData.fullAddress,
        age: formData.age,
        numberOfStayers: formData.numberOfStayers,
        contact1: formData.contact1,
        contact2: formData.contact2,
        remarks: formData.remarks,
        status: formData.status
      };

      form.append('formData', JSON.stringify(textData));

      if (formData.aadhaarCard) form.append('aadhaarCard', formData.aadhaarCard);
      if (formData.panCard) form.append('panCard', formData.panCard);
      if (formData.passportPhoto) form.append('passportPhoto', formData.passportPhoto);
      if (formData.otherDocument) form.append('otherDocument', formData.otherDocument);

      if (editFlag && formData.id) {
        await axios.put(`${API_URL}renter/${formData.id}`, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        // **Update the state immediately instead of refetching**
        setRenters((prevRenters) =>
          prevRenters.map((r) =>
            r.id === formData.id ? { ...r, ...textData } : r
          )
        );

        toast.success('Renter updated successfully!');
      } else {
        const response = await axios.post(`${API_URL}renter`, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        // **Add the new renter to state immediately**
        setRenters((prevRenters) => [...prevRenters, response.data]);

        toast.success('Renter created successfully!');
      }

      resetForm();
      setShowForm(false);
      setEditFlag(false);
    } catch (error) {
      console.error('Error saving renter data:', error);
      toast.error('Failed to save renter data!');
    }
  };


  const resetForm = () => {
    setFormData({
      id: null,
      renterName: '',
      fullAddress: '',
      age: '',
      numberOfStayers: '',
      aadhaarCard: null,
      panCard: null,
      passportPhoto: null,
      otherDocument: null,
      contact1: '',
      contact2: '',
      remarks: '',
      status: 'Active'
    });
  };

  const handleEditClick = (renter) => {
    setFormData({
      id: renter.id,
      renterName: renter.renterName,
      fullAddress: renter.fullAddress,
      age: renter.age,
      numberOfStayers: renter.numberOfStayers,
      aadhaarCard: renter.aadhaarCard,
      panCard: renter.panCard,
      passportPhoto: renter.passportPhoto,
      otherDocument: renter.otherDocument,
      contact1: renter.contact1,
      contact2: renter.contact2,
      remarks: renter.remarks,
      status: renter.status || 'Active'
    });
    setEditFlag(true);
    setShowForm(true);
  };

  const handleDetailsClick = async (renter) => {
    try {
      const response = await axios.get(`${API_URL}renter/${renter.id}`);
      setSelectedRenter(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching renter details:', error);
      // alert('Failed to load renter details.');
      toast.error('Failed to load renter details.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRenter(null);
  };

  const handleDeleteConfirm = async (renter) => {
    if (renterToDelete) {
      try {
        await axios.delete(`${API_URL}renter/${renterToDelete.id}`);
        // alert('Renter deleted successfully!');
        toast.error('Renter deleted successfully!');
        fetchRenters();
      } catch (error) {
        console.error('Error deleting renter:', error);
        // alert('Failed to delete renter!');
        toast.error('Failed to delete renter!');
      } finally {
        setDeleteModalOpen(false);
        setRenterToDelete(null);
      }
    }
  };

  const handleDeleteClick = (renter) => {
    setRenterToDelete(renter);
    setDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setRenterToDelete(null);
  };

  const getActiveRenters = () => renters.filter((r) => r.status === 'Active').length;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: 'linear-gradient(to right, #e3f2fd, #bbdefb)'
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" fontWeight="bold" color="primary.dark">
              Renter Management
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Manage all your renters information in one place
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Search renters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                sx={{ flexGrow: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  )
                }}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                  setEditFlag(false);
                }}
              >
                Add Renter
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Dashboard Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card
            elevation={2}
            sx={{
              borderLeft: '4px solid #2196f3',
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 20px -10px rgba(33, 150, 243, 0.28)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Total Renters
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {renters.length}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, bgcolor: '#e3f2fd', borderRadius: '50%' }}>
                  <PersonIcon fontSize="large" color="primary" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            elevation={2}
            sx={{
              borderLeft: '4px solid #4caf50',
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 20px -10px rgba(76, 175, 80, 0.28)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Active Renters
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {getActiveRenters()}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, bgcolor: '#e8f5e9', borderRadius: '50%' }}>
                  <CheckCircleIcon fontSize="large" color="success" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            elevation={2}
            sx={{
              borderLeft: '4px solid #ff9800',
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 20px -10px rgba(255, 152, 0, 0.28)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Average Age
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {renters.length ? Math.round(renters.reduce((acc, r) => acc + (parseInt(r.age) || 0), 0) / renters.length) : 0}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, bgcolor: '#fff3e0', borderRadius: '50%' }}>
                  <PhoneIcon fontSize="large" color="warning" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add/Edit Renter Form Modal */}
      <RenterForm
        open={showForm}
        formData={formData}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        onClose={() => setShowForm(false)}
        editFlag={editFlag}
      />

      {/* Renters Listing */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Renter Listings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          View and manage all your renters
        </Typography>
        <Divider sx={{ mb: 3 }} />
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : filteredRenters.length > 0 ? (
          <RenterList
            renters={filteredRenters}
            onDetailsClick={handleDetailsClick}
            onEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            apiUrl={API_URL}
          />
        ) : (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6">{searchTerm ? 'No renters found matching your search' : 'No renters available'}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {searchTerm ? 'Try adjusting your search' : 'Click the "Add Renter" button to get started'}
            </Typography>
            {searchTerm && (
              <Button sx={{ mt: 2 }} onClick={() => setSearchTerm('')} variant="outlined">
                Clear Search
              </Button>
            )}
          </Box>
        )}
      </Paper>

      {/* Renter Details Modal */}
      {isModalOpen && selectedRenter && (
        <RenterDetailModal renter={selectedRenter} onClose={closeModal} refreshRenters={fetchRenters} apiUrl={API_URL} />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this renter?"
      />
    </Container>
  );
}
