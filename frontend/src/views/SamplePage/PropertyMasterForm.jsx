// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import PropertyList from '../../component/PropertyMaster/PropertyList';
// import AddPropertyForm from '../../component/PropertyMaster/AddProperty';
// import PropertyDetailModal from '../../component/PropertyMaster/PropertyDetailModal';

// export default function PropertyMasterForm() {
//   const API_URL = import.meta.env.VITE_API_URL;

//   // States
//   const [properties, setProperties] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [childCount, setChildCount] = useState(0);
//   const [formData, setFormData] = useState({
//     propertyName: '',
//     ownerName: '',
//     address: '',
//     documents: null,
//     childProperties: []
//   });

//   // Modal state
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);

//   // Fetch properties on mount
//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     try {
//       const response = await axios.get(`${API_URL}property`);
//       setProperties(response.data);
//     } catch (error) {
//       console.error('Error fetching properties:', error);
//     }
//   };

//   // Handlers for Add Property Form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, documents: e.target.files[0] }));
//   };

//   const handleChildCountChange = (e) => {
//     const count = parseInt(e.target.value, 10) || 0;
//     setChildCount(count);
//     setFormData((prev) => ({
//       ...prev,
//       childProperties: Array(count).fill({
//         floor: '',
//         title: '',
//         description: '',
//         rooms: '',
//         washroom: '',
//         gas: '',
//         electricity: '',
//         deposit: '',
//         rent: ''
//       })
//     }));
//   };

//   const handleChildChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedChildren = [...formData.childProperties];
//     updatedChildren[index] = { ...updatedChildren[index], [name]: value };
//     setFormData((prev) => ({ ...prev, childProperties: updatedChildren }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const form = new FormData();
//       const textData = {
//         propertyName: formData.propertyName,
//         ownerName: formData.ownerName,
//         address: formData.address,
//         childProperties: formData.childProperties
//       };
//       form.append('formData', JSON.stringify(textData));
//       if (formData.documents) {
//         form.append('documents', formData.documents);
//       }
//       await axios.post(`${API_URL}property`, form, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       alert('Property data saved successfully!');
//       fetchProperties();
//       setFormData({
//         propertyName: '',
//         ownerName: '',
//         address: '',
//         documents: null,
//         childProperties: []
//       });
//       setChildCount(0);
//       setShowForm(false);
//     } catch (error) {
//       console.error('Error saving property data:', error);
//       alert('Failed to save property data!');
//     }
//   };

//   // Handler for opening Property Detail Modal
//   const handleDetailsClick = async (prop) => {
//     try {
//       const response = await axios.get(`${API_URL}property/with-children/${prop.id}`);
//       setSelectedProperty(response.data);
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error('Error fetching property details:', error);
//       alert('Failed to load property details.');
//     }
//   };

//   const toggleForm = () => {
//     setShowForm((prev) => !prev);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedProperty(null);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4 space-y-6">
//       <PropertyList properties={properties} showForm={showForm} toggleForm={toggleForm} onDetailsClick={handleDetailsClick} />

//       {showForm && (
//         <AddPropertyForm
//           formData={formData}
//           childCount={childCount}
//           handleInputChange={handleInputChange}
//           handleFileChange={handleFileChange}
//           handleChildCountChange={handleChildCountChange}
//           handleChildChange={handleChildChange}
//           handleSubmit={handleSubmit}
//         />
//       )}

//       {isModalOpen && selectedProperty && (
//         <PropertyDetailModal property={selectedProperty} onClose={closeModal} refreshProperties={fetchProperties} apiUrl={API_URL} />
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import PropertyList from '../../component/PropertyMaster/PropertyList';
import AddPropertyForm from '../../component/PropertyMaster/AddProperty';
import PropertyDetailModal from '../../component/PropertyMaster/PropertyDetailModal';

const PropertyMasterPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [childCount, setChildCount] = useState(0);
  const [formData, setFormData] = useState({
    propertyName: '',
    ownerName: '',
    address: '',
    documents: null,
    childProperties: []
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${API_URL}property`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, documents: e.target.files[0] }));
  };

  const handleChildCountChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setChildCount(count);
    setFormData((prev) => ({
      ...prev,
      childProperties: Array(count).fill({
        floor: '',
        title: '',
        description: '',
        rooms: '',
        washroom: '',
        gas: '',
        electricity: '',
        deposit: '',
        rent: ''
      })
    }));
  };

  const handleChildChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChildren = [...formData.childProperties];
    updatedChildren[index] = { ...updatedChildren[index], [name]: value };
    setFormData((prev) => ({ ...prev, childProperties: updatedChildren }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('formData', JSON.stringify(formData));
      if (formData.documents) {
        form.append('documents', formData.documents);
      }
      await axios.post(`${API_URL}property`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Property data saved successfully!');
      fetchProperties();
      setFormData({ propertyName: '', ownerName: '', address: '', documents: null, childProperties: [] });
      setChildCount(0);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving property data:', error);
      alert('Failed to save property data!');
    }
  };

  const handleDetailsClick = async (prop) => {
    try {
      const response = await axios.get(`${API_URL}property/with-children/${prop.id}`);
      setSelectedProperty(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching property details:', error);
      alert('Failed to load property details.');
    }
  };

  const toggleForm = () => setShowForm((prev) => !prev);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  return (
    <>
      {/* <Breadcrumb title="Property Master">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Property Master
        </Typography>
      </Breadcrumb> */}
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header">
                  Property Management
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <PropertyList properties={properties} showForm={showForm} toggleForm={toggleForm} onDetailsClick={handleDetailsClick} />
              {showForm && (
                <AddPropertyForm
                  formData={formData}
                  childCount={childCount}
                  handleInputChange={handleInputChange}
                  handleFileChange={handleFileChange}
                  handleChildCountChange={handleChildCountChange}
                  handleChildChange={handleChildChange}
                  handleSubmit={handleSubmit}
                />
              )}
              {isModalOpen && selectedProperty && (
                <PropertyDetailModal
                  property={selectedProperty}
                  onClose={closeModal}
                  refreshProperties={fetchProperties}
                  apiUrl={API_URL}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PropertyMasterPage;
