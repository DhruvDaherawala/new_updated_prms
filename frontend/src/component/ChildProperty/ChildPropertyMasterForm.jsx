// // ChildPropertyMasterForm.jsx
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import ChildPropertyList from './ChildPropertyList';
// import ChildPropertyForm from './ChildPropertyForm';
// import ChildPropertyDetailModal from './ChildPropertyDetailModal';

// export default function ChildPropertyMasterForm() {
//   // Ensure VITE_API_URL ends with "/api/"
//   const API_URL = import.meta.env.VITE_API_URL; // e.g., http://localhost:5000/api/

//   const [childProperties, setChildProperties] = useState([]);
//   const [parentProperties, setParentProperties] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [floorError, setFloorError] = useState('');
//   const [formData, setFormData] = useState({
//     id: null,
//     property_id: '',
//     floor: '',
//     title: '',
//     description: '',
//     rooms: '',
//     washroom: '',
//     gas: '',
//     electricity: '',
//     deposit: '',
//     rent: ''
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedChildProperty, setSelectedChildProperty] = useState(null);

//   useEffect(() => {
//     fetchChildProperties();
//     fetchParentProperties();
//   }, []);

//   const fetchChildProperties = async () => {
//     try {
//       const response = await axios.get(`${API_URL}child_property`);
//       setChildProperties(response.data);
//     } catch (error) {
//       console.error('Error fetching child properties:', error);
//     }
//   };

//   const fetchParentProperties = async () => {
//     try {
//       const response = await axios.get(`${API_URL}property`);
//       setParentProperties(response.data);
//     } catch (error) {
//       console.error('Error fetching parent properties:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'property_id') {
//       // Reset floor and floor error if the parent changes
//       setFormData((prev) => ({ ...prev, property_id: value, floor: '' }));
//       setFloorError('');
//     } else if (name === 'floor') {
//       // Validate floor input against parent's numberOfFloors
//       const selectedParent = parentProperties.find(
//         (p) => p.id === parseInt(formData.property_id)
//       );
//       const floorValue = parseInt(value);
//       if (selectedParent && floorValue > selectedParent.numberOfFloors) {
//         setFloorError(`Maximum floor for ${selectedParent.propertyName} is ${selectedParent.numberOfFloors}`);
//       } else {
//         setFloorError('');
//       }
//       setFormData((prev) => ({ ...prev, floor: value }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (floorError) {
//       alert('Please fix the errors before submitting.');
//       return;
//     }
//     try {
//       const form = new FormData();
//       const dataToSend = { ...formData };
//       form.append('formData', JSON.stringify(dataToSend));

//       if (formData.id) {
//         // Update existing child property
//         await axios.put(`${API_URL}child_property/${formData.id}`, form, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         alert('Child property updated successfully!');
//       } else {
//         // Create new child property
//         await axios.post(`${API_URL}child_property`, form, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         alert('Child property created successfully!');
//       }
//       fetchChildProperties();
//       setFormData({
//         id: null,
//         property_id: '',
//         floor: '',
//         title: '',
//         description: '',
//         rooms: '',
//         washroom: '',
//         gas: '',
//         electricity: '',
//         deposit: '',
//         rent: ''
//       });
//       setShowForm(false);
//     } catch (error) {
//       console.error('Error saving child property:', error);
//       alert('Failed to save child property!');
//     }
//   };

//   const handleEditClick = (childProperty) => {
//     setShowForm(true);
//     setFormData({
//       id: childProperty.id,
//       property_id: childProperty.property_id,
//       floor: childProperty.floor,
//       title: childProperty.title,
//       description: childProperty.description,
//       rooms: childProperty.rooms,
//       washroom: childProperty.washroom,
//       gas: childProperty.gas,
//       electricity: childProperty.electricity,
//       deposit: childProperty.deposit,
//       rent: childProperty.rent
//     });
//   };

//   const handleDetailsClick = async (childProperty) => {
//     try {
//       const response = await axios.get(`${API_URL}child_property/${childProperty.id}`);
//       setSelectedChildProperty(response.data);
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error('Error fetching child property details:', error);
//       alert('Failed to load child property details.');
//     }
//   };

//   const handleDeleteClick = async (childProperty) => {
//     if (window.confirm('Are you sure you want to delete this child property?')) {
//       try {
//         await axios.delete(`${API_URL}child_property/${childProperty.id}`);
//         alert('Child property deleted successfully!');
//         fetchChildProperties();
//       } catch (error) {
//         console.error('Error deleting child property:', error);
//         alert('Failed to delete child property!');
//       }
//     }
//   };

//   const closeModal = () => {
//     setShowForm(false);
//     setSelectedChildProperty(null);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4 space-y-6">
//       <ChildPropertyList
//         childProperties={childProperties}
//         parentProperties={parentProperties}
//         onAddClick={() => setShowForm(!showForm)}
//         showForm={showForm}
//         onEditClick={handleEditClick}
//         onDetailsClick={handleDetailsClick}
//         onDeleteClick={handleDeleteClick}
//       />

//       {showForm && (
//         <ChildPropertyForm
//           formData={formData}
//           onInputChange={handleInputChange}
//           onSubmit={handleSubmit}
//           onClose={closeModal}
//           parentProperties={parentProperties}
//           floorError={floorError}
//         />
//       )}

//       {isModalOpen && selectedChildProperty && (
//         <ChildPropertyDetailModal
//           childProperty={selectedChildProperty}
//           onClose={closeModal}
//           refreshChildProperties={fetchChildProperties}
//           apiUrl={API_URL}
//           parentProperties={parentProperties}
//         />
//       )}
//     </div>
//   );
// }



// ChildPropertyMasterForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ChildPropertyList from './ChildPropertyList';
import ChildPropertyForm from './ChildPropertyForm';
import ChildPropertyDetailModal from './ChildPropertyDetailModal';

export default function ChildPropertyMasterForm() {
  // VITE_API_URL should include the /api/ prefix
  const API_URL = import.meta.env.VITE_API_URL; // e.g., http://localhost:5000/api/

  const [childProperties, setChildProperties] = useState([]);
  const [parentProperties, setParentProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [floorError, setFloorError] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    property_id: '',
    floor: '',
    title: '',
    description: '',
    rooms: '',
    washroom: '',
    gas: '',
    electricity: '',
    deposit: '',
    rent: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChildProperty, setSelectedChildProperty] = useState(null);

  useEffect(() => {
    fetchChildProperties();
    fetchParentProperties();
  }, []);

  const fetchChildProperties = async () => {
    try {
      const response = await axios.get(`${API_URL}child_property`);
      setChildProperties(response.data);
    } catch (error) {
      console.error('Error fetching child properties:', error);
    }
  };

  const fetchParentProperties = async () => {
    try {
      const response = await axios.get(`${API_URL}property`);
      setParentProperties(response.data);
    } catch (error) {
      console.error('Error fetching parent properties:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'property_id') {
      // When parent changes, reset the floor value and error
      setFormData((prev) => ({ ...prev, property_id: value, floor: '' }));
      setFloorError('');
    } else if (name === 'floor') {
      // Validate floor against the parent's numberOfFloors
      const selectedParent = parentProperties.find(
        (p) => p.id === parseInt(formData.property_id)
      );
      const floorValue = parseInt(value);
      if (selectedParent && floorValue > selectedParent.numberOfFloors) {
        setFloorError(`Maximum floor for ${selectedParent.propertyName} is ${selectedParent.numberOfFloors}`);
      } else {
        setFloorError('');
      }
      setFormData((prev) => ({ ...prev, floor: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (floorError) {
      alert('Please fix the errors before submitting.');
      return;
    }
    try {
      const form = new FormData();
      form.append('formData', JSON.stringify(formData));

      if (formData.id) {
        // Update existing child property
        await axios.put(`${API_URL}child_property/${formData.id}`, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Child property updated successfully!');
      } else {
        // Create new child property
        await axios.post(`${API_URL}child_property`, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Child property created successfully!');
      }
      fetchChildProperties();
      setFormData({
        id: null,
        property_id: '',
        floor: '',
        title: '',
        description: '',
        rooms: '',
        washroom: '',
        gas: '',
        electricity: '',
        deposit: '',
        rent: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error saving child property:', error);
      alert('Failed to save child property!');
    }
  };

  const handleEditClick = (childProperty) => {
    setShowForm(true);
    setFormData({
      id: childProperty.id,
      property_id: childProperty.property_id,
      floor: childProperty.floor,
      title: childProperty.title,
      description: childProperty.description,
      rooms: childProperty.rooms,
      washroom: childProperty.washroom,
      gas: childProperty.gas,
      electricity: childProperty.electricity,
      deposit: childProperty.deposit,
      rent: childProperty.rent
    });
  };

  const handleDetailsClick = async (childProperty) => {
    try {
      const response = await axios.get(`${API_URL}child_property/${childProperty.id}`);
      setSelectedChildProperty(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching child property details:', error);
      alert('Failed to load child property details.');
    }
  };

  const handleDeleteClick = async (childProperty) => {
    if (window.confirm('Are you sure you want to delete this child property?')) {
      try {
        await axios.delete(`${API_URL}child_property/${childProperty.id}`);
        alert('Child property deleted successfully!');
        fetchChildProperties();
      } catch (error) {
        console.error('Error deleting child property:', error);
        alert('Failed to delete child property!');
      }
    }
  };

  const closeModal = () => {
    setShowForm(false);
    setSelectedChildProperty(null);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <ChildPropertyList
        childProperties={childProperties}
        parentProperties={parentProperties}
        onAddClick={() => setShowForm(!showForm)}
        showForm={showForm}
        onEditClick={handleEditClick}
        onDetailsClick={handleDetailsClick}
        onDeleteClick={handleDeleteClick}
      />

      {showForm && (
        <ChildPropertyForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
          parentProperties={parentProperties}
          floorError={floorError}
        />
      )}

      {isModalOpen && selectedChildProperty && (
        <ChildPropertyDetailModal
          childProperty={selectedChildProperty}
          onClose={closeModal}
          refreshChildProperties={fetchChildProperties}
          apiUrl={API_URL}
          parentProperties={parentProperties}
        />
      )}
    </div>
  );
}
