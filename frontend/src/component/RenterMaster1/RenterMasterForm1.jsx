import { useState, useEffect } from 'react';
import axios from 'axios';
import RenterList from './RenterList';
import RenterForm from './RenterForm';
import RenterDetailModal from './RenterDetailModal';

export default function RenterMasterForm() {
  // Pull API URL from environment
  const API_URL = import.meta.env.VITE_API_URL;

  // States
  const [renters, setRenters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRenter, setSelectedRenter] = useState(null);

  // Fetch all renters on mount
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
    } finally {
      setIsLoading(false);
    }
  };

  // Filter renters based on search term
  const filteredRenters = renters.filter(
    (renter) =>
      renter.renterName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      renter.fullAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      renter.contact1?.includes(searchTerm) ||
      renter.contact2?.includes(searchTerm)
  );

  // Form Handlers for Creating a New Renter
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      // Append files if they exist
      if (formData.aadhaarCard) {
        form.append('aadhaarCard', formData.aadhaarCard);
      }
      if (formData.panCard) {
        form.append('panCard', formData.panCard);
      }
      if (formData.passportPhoto) {
        form.append('passportPhoto', formData.passportPhoto);
      }
      if (formData.otherDocument) {
        form.append('otherDocument', formData.otherDocument);
      }

      await axios.post(`${API_URL}renter`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Renter data saved successfully!');
      fetchRenters();
      setFormData({
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
      setShowForm(false);
    } catch (error) {
      console.error('Error saving renter data:', error);
      alert('Failed to save renter data!');
    }
  };

  // Renter Details Modal
  const handleDetailsClick = async (renter) => {
    try {
      const response = await axios.get(`${API_URL}renter/${renter.id}`);
      setSelectedRenter(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching renter details:', error);
      alert('Failed to load renter details.');
    }
  };

  // Edit function - opens modal directly in edit mode
  const handleEditClick = async (renter) => {
    setShowForm(true);
    setFormData(renter);
    setEditFlag(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRenter(null);
  };

  const handleDeleteClick = async (renter) => {
    if (window.confirm('Are you sure you want to delete this renter?')) {
      try {
        await axios.delete(`${API_URL}renter/${renter.id}`);
        alert('Renter deleted successfully!');
        fetchRenters();
      } catch (error) {
        console.error('Error deleting renter:', error);
        alert('Failed to delete renter!');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Renter Management</h1>
          <p className="text-gray-600 mt-1">Manage all your renters information in one place</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search renters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditFlag(false);
              setFormData({
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
            }}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md w-full sm:w-auto"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>{showForm ? "Close Form" : "Add Renter"}</span>
          </button>
        </div>
      </div>

      {/* Renters Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Total Renters</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{renters.length}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Active Renters</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">
                {renters.filter(r => r.status === 'Active').length}
              </h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Average Age</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">
                {renters.length ? Math.round(renters.reduce((acc, r) => acc + (parseInt(r.age) || 0), 0) / renters.length) : 0}
              </h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Renter Form */}
      {showForm && (
        <div className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-purple-100">
            <h2 className="text-xl font-semibold text-gray-800">{editFlag ? "Edit Renter" : "Add New Renter"}</h2>
            <p className="text-gray-500 mt-1">{editFlag ? "Update the renter's information" : "Enter details for the new renter"}</p>
          </div>
          <div className="p-6">
            <RenterForm
              editformData={formData}
              editFlag={editFlag}
              onSubmitSuccess={fetchRenters}
              onClose={() => {
                setShowForm(false);
                setEditFlag(false);
                setFormData({
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
              }}
            />
          </div>
        </div>
      )}

      {/* Renters Listing */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Renter Listings</h2>
          <p className="text-gray-500 mt-1">View and manage all your registered renters</p>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-10 w-10 text-purple-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading renters...</p>
            </div>
          </div>
        ) : filteredRenters.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <svg className="h-16 w-16 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {searchTerm ? (
              <>
                <h3 className="text-lg font-medium text-gray-800">No renters found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your search criteria</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-purple-600 hover:text-purple-800 font-medium"
                >
                  Clear search
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium text-gray-800">No renters added yet</h3>
                <p className="text-gray-500 mt-1">Click the "Add Renter" button to get started</p>
                <button 
                  onClick={() => {
                    setShowForm(true);
                    setEditFlag(false);
                  }}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Your First Renter
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="overflow-auto">
            <RenterList
              renters={filteredRenters}
              onAddClick={() => {
                setShowForm(!showForm);
                setFormData({});
              }}
              showForm={showForm}
              apiUrl={API_URL}
              onEditClick={handleEditClick}
              onDetailsClick={handleDetailsClick}
              setEditForm={setFormData}
              handleDeleteClick={handleDeleteClick}
            />
          </div>
        )}
      </div>

      {/* Modal for Renter Details */}
      {isModalOpen && selectedRenter && (
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
              <RenterDetailModal renter={selectedRenter} onClose={closeModal} refreshRenters={fetchRenters} apiUrl={API_URL} />
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
