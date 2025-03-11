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
    try {
      const response = await axios.get(`${API_URL}renter`);
      setRenters(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching renters:', error);
    }
  };

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
    console.log(renter, 'EDIT RENTER DATA HERE NOW.............');
    setShowForm(true);
    setFormData(renter);
    setEditFlag(true);
  };

  const closeModal = () => {
    setShowForm(false);
    setSelectedRenter(null);
  };
  const handleDeleteClick = async (renter) => {
    if (window.confirm('Are you sure you want to delete this renter property?')) {
      try {
        await axios.delete(`${API_URL}renter/${renter.id}`);
        alert('Renter deleted successfully!');
        fetchRenters();
      } catch (error) {
        console.error('Error deleting renter property:', error);
        alert('Failed to delete renter property!');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Renters Listing */}
      <RenterList
        renters={renters}
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
      {/* Add Renter Form */}
      {/* {showForm && (
        <RenterForm
          editformData={formData}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
          editFlag={editFlag}
        />
      )} */}
      {/* // In RenterMasterForm1.jsx, update the showForm condition */}
      {showForm && (
        <RenterForm
          editformData={formData}
          editFlag={editFlag}
          onSubmitSuccess={fetchRenters} // Pass the function to refresh data
          onClose={() => {
            setShowForm(false);
            setEditFlag(false);
            setFormData = { setFormData };
          }}
        />
      )}
      {/* Modal for Renter Details */}
      {isModalOpen && selectedRenter && (
        <RenterDetailModal renter={selectedRenter} onClose={closeModal} refreshRenters={fetchRenters} apiUrl={API_URL} />
      )}
    </div>
  );
}
