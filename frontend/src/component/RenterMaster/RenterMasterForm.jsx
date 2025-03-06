import { useState, useEffect } from 'react';
import axios from 'axios';
import RenterTable from './RenterTable';
import AddRenterForm from './AddRenterForm';
import RenterDetailModal from './RenterDetailModal';

const RenterMasterForm = () => {
  const [renters, setRenters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRenter, setSelectedRenter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch existing renters on mount
  useEffect(() => {
    fetchRenters();
  }, []);

  // GET request to fetch existing renters
  const fetchRenters = async () => {
    try {
      const response = await axios.get(`${API_URL}renter`);
      setRenters(response.data);
    } catch (error) {
      console.error('Error fetching renters:', error);
    }
  };

  const handleDetailsClick = (renter) => {
    setSelectedRenter(renter);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRenter(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <RenterTable renters={renters} showForm={showForm} setShowForm={setShowForm} onDetailsClick={handleDetailsClick} />

      {showForm && <AddRenterForm API_URL={API_URL} fetchRenters={fetchRenters} setShowForm={setShowForm} />}

      {isModalOpen && selectedRenter && (
        <RenterDetailModal renter={selectedRenter} onClose={closeModal} refreshRenters={fetchRenters} apiUrl={API_URL} />
      )}
    </div>
  );
};

export default RenterMasterForm;
