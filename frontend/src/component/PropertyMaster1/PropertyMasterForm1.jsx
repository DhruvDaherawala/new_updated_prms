// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import PropertyList from './PropertyList1';
// import AddPropertyForm from './AddProperty1';
// import PropertyDetailModal from './PropertyDetailModal1';
// import AddPropertyModal from './AddProperty1';

// export default function PropertyMasterForm() {
//   // Pull API URL from Vite environment
//   const API_URL = import.meta.env.VITE_API_URL;

//   // States
//   const [properties, setProperties] = useState([]);
//   const [showForm, setShowForm] = useState(false);

//   // Modal state
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);

//   // Fetch all properties on mount
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

//   // Edit function - opens modal directly in edit mode
//   const handleEditClick = async (prop) => {
//     try {
//       const response = await axios.get(`${API_URL}property/with-children/${prop.id}`);
//       setSelectedProperty({ ...response.data, isEditing: true, isChildEditing: true });
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error('Error fetching property details:', error);
//       alert('Failed to load property details.');
//     }
//   };

//   // Property Details Modal
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

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedProperty(null);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4 space-y-6">
//       {/* Properties Listing */}
//       <div className="bg-white shadow rounded-md p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-gray-800">Registered Properties</h2>
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
//           >
//             {showForm ? 'Close Form' : 'Add Property'}
//           </button>
//         </div>
//         <div className="overflow-scroll">
//           <PropertyList properties={properties} onEdit={handleEditClick} onDetails={handleDetailsClick} apiUrl={API_URL} />
//         </div>
//       </div>

//       {/* Add Property Form */}
//       {/* {showForm && (
//         <AddPropertyForm
//           apiUrl={API_URL}
//           onSubmitSuccess={() => {
//             fetchProperties();
//             setShowForm(false);
//           }}
//         />
//       )} */}
//       {showAddPropertyModal && (
//         <AddPropertyModal apiUrl={apiUrl} onClose={() => setShowAddPropertyModal(false)} onSubmitSuccess={refreshProperties} />
//       )}
//       {/* Modal for Property Details */}
//       {isModalOpen && selectedProperty && (
//         <PropertyDetailModal property={selectedProperty} onClose={closeModal} refreshProperties={fetchProperties} apiUrl={API_URL} />
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyList from './PropertyList1';
import AddPropertyForm from './AddProperty1';
import PropertyDetailModal from './PropertyDetailModal1';
import AddPropertyModal from './AddProperty1'; // Make sure this points to your new AddPropertyModal component

export default function PropertyMasterForm() {
  // Pull API URL from Vite environment
  const API_URL = import.meta.env.VITE_API_URL;

  // States
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  // Add state for the AddPropertyModal
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Fetch all properties on mount
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

  // Edit function - opens modal directly in edit mode
  const handleEditClick = async (prop) => {
    try {
      const response = await axios.get(`${API_URL}property/with-children/${prop.id}`);
      setSelectedProperty({ ...response.data, isEditing: true, isChildEditing: true });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching property details:', error);
      alert('Failed to load property details.');
    }
  };

  // Property Details Modal
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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const handleDeleteClick = async (property) => {
    if (window.confirm('Are you sure you want to delete this child property?')) {
      try {
        await axios.delete(`${API_URL}property/${property.id}`);
        alert('Property deleted successfully!');
        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Failed to delete property!');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Properties Listing */}
      <div className="bg-white shadow rounded-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Registered Properties</h2>
          <button
            onClick={() => setShowAddPropertyModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Add Property
          </button>
        </div>
        <div className="overflow-scroll">
          <PropertyList
            properties={properties}
            onEdit={handleEditClick}
            onDetails={handleDetailsClick}
            handleDeleteClick={handleDeleteClick}
            apiUrl={API_URL}
          />
        </div>
      </div>

      {/* Add Property Modal */}
      {showAddPropertyModal && (
        <AddPropertyModal apiUrl={API_URL} onClose={() => setShowAddPropertyModal(false)} onSubmitSuccess={fetchProperties} />
      )}

      {/* Modal for Property Details */}
      {isModalOpen && selectedProperty && (
        <PropertyDetailModal property={selectedProperty} onClose={closeModal} refreshProperties={fetchProperties} apiUrl={API_URL} />
      )}
    </div>
  );
}
