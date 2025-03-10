import axios from 'axios';
import { useState, useEffect } from 'react';
import { ApiService } from './ApiService';
import AllocationForm from './AllocationForm';
import AllocationTable from './AllocationTable';
import AllocationDetailModal from './AllocationDetailModal';

export default function RentalAllocation() {
  // States
  const [allocations, setAllocations] = useState([]);
  const [properties, setProperties] = useState([]);
  const [renters, setRenters] = useState([]);
  const [childProperties, setChildProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [selectedAllocation, setSelectedAllocation] = useState(null);

  // Modal state for AllocationDetailModal (only for viewing details)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [allocationsData, propertiesData, rentersData, childPropertiesData] = await Promise.all([
        ApiService.fetchAllocations(),
        ApiService.fetchProperties(),
        ApiService.fetchRenters(),
        ApiService.fetchChildProperties()
      ]);

      setAllocations(allocationsData);
      setProperties(propertiesData);
      setRenters(rentersData);
      setChildProperties(childPropertiesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Allocation Details Modal (only for viewing details)
  const handleDetailsClick = async (allocation) => {
    try {
      const allocationData = await ApiService.getAllocationDetails(allocation.id || allocation.allocation_id);
      setSelectedAllocation(allocationData);
      setIsModalOpen(true);
    } catch (error) {
      alert('Failed to load allocation details.');
    }
  };

  // Edit function - opens AllocationForm in edit mode
  const handleEditClick = async (allocation) => {
    try {
      const allocationData = await ApiService.getAllocationDetails(allocation.id || allocation.allocation_id);
      setSelectedAllocation(allocationData);
      setFormMode('edit');
      setShowForm(true);
      console.log(allocationData);
    } catch (error) {
      alert('Failed to load allocation details.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAllocation(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormMode('add');
    setSelectedAllocation(null);
  };

  const handleDeleteClick = async (allocation) => {
    if (window.confirm('Are you sure you want to delete this allocation?')) {
      try {
        await axios.delete(`${API_URL}allocations/${allocation.id}`);
        alert('Allocation deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error Deleteing Allocation :', error);
        alert('Failed to Delete Allocation!');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Allocations Listing */}
      <div className="bg-white shadow rounded-md p-6 overflow-scroll">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Rental Allocations</h2>
          <button
            onClick={() => {
              setFormMode('add');
              setShowForm(!showForm);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            {showForm && formMode === 'add' ? 'Close Form' : 'Add Allocation'}
          </button>
        </div>
        {allocations.length === 0 ? (
          <p className="text-gray-600">No allocations found.</p>
        ) : (
          <AllocationTable
            allocations={allocations}
            renters={renters}
            properties={properties}
            childProperties={childProperties}
            onEdit={handleEditClick}
            onDetails={handleDetailsClick}
            apiUrl={ApiService.API_URL}
            handleDeleteClick={handleDeleteClick}
          />
        )}
      </div>

      {/* Allocation Form (for both adding and editing) */}
      {showForm && (
        <AllocationForm
          renters={renters}
          properties={properties}
          childProperties={childProperties}
          onAllocationAdded={fetchData}
          onClose={closeForm}
          mode={formMode}
          allocation={selectedAllocation}
        />
      )}

      {/* Modal for Allocation Details (only for viewing) */}
      {isModalOpen && selectedAllocation && (
        <AllocationDetailModal
          allocation={selectedAllocation}
          onClose={closeModal}
          refreshAllocations={fetchData}
          apiUrl={ApiService.API_URL}
          renters={renters}
          properties={properties}
          childProperties={childProperties}
        />
      )}
    </div>
  );
}
