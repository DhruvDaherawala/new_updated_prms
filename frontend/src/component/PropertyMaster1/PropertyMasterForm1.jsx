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
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Fetch all properties on mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}property`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter properties based on search term
  const filteredProperties = properties.filter(
    (property) =>
      property.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    if (window.confirm('Are you sure you want to delete this property?')) {
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
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-xl shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Property Management</h1>
          <p className="text-gray-600 mt-1">Manage all your registered properties in one place</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            onClick={() => setShowAddPropertyModal(true)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md w-full sm:w-auto"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Property</span>
          </button>
        </div>
      </div>

      {/* Properties Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Total Properties</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{properties.length}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Active Properties</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">
                {properties.filter(p => p.status === 'Active').length}
              </h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Cities</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">
                {new Set(properties.map(p => p.city)).size}
              </h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Listing */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Property Listings</h2>
          <p className="text-gray-500 mt-1">View and manage all your registered properties</p>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-10 w-10 text-indigo-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading properties...</p>
            </div>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <svg className="h-16 w-16 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            {searchTerm ? (
              <>
                <h3 className="text-lg font-medium text-gray-800">No properties found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your search criteria</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Clear search
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium text-gray-800">No properties added yet</h3>
                <p className="text-gray-500 mt-1">Click the "Add Property" button to get started</p>
                <button 
                  onClick={() => setShowAddPropertyModal(true)}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Your First Property
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="overflow-auto">
            <PropertyList
              properties={filteredProperties}
              onEdit={handleEditClick}
              onDetails={handleDetailsClick}
              handleDeleteClick={handleDeleteClick}
              apiUrl={API_URL}
            />
          </div>
        )}
      </div>

      {/* Add Property Modal */}
      {showAddPropertyModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300">
          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 transform animate-modal-in">
            <button
              onClick={() => setShowAddPropertyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Property</h2>
              <AddPropertyModal apiUrl={API_URL} onClose={() => setShowAddPropertyModal(false)} onSubmitSuccess={fetchProperties} />
            </div>
          </div>
        </div>
      )}

      {/* Modal for Property Details */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300">
          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 transform animate-modal-in">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-6">
              <PropertyDetailModal property={selectedProperty} onClose={closeModal} refreshProperties={fetchProperties} apiUrl={API_URL} />
            </div>
          </div>
        </div>
      )}
      
      {/* Add these CSS animations to your global CSS */}
      <style jsx>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-in {
          animation: modalIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
