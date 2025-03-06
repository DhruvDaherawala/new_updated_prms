'use client';

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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState(null);

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

  // Allocation Details Modal
  const handleDetailsClick = async (allocation) => {
    try {
      const allocationData = await ApiService.getAllocationDetails(allocation.id || allocation.allocation_id);
      setSelectedAllocation(allocationData);
      setIsModalOpen(true);
    } catch (error) {
      alert('Failed to load allocation details.');
    }
  };

  // Edit function - opens modal directly in edit mode
  const handleEditClick = async (allocation) => {
    try {
      const allocationData = await ApiService.getAllocationDetails(allocation.id || allocation.allocation_id);
      setSelectedAllocation({ ...allocationData, isEditing: true });
      setIsModalOpen(true);
      console.log(allocationData);
    } catch (error) {
      alert('Failed to load allocation details.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAllocation(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Allocations Listing */}
      <div className="bg-white shadow rounded-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Rental Allocations</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            {showForm ? 'Close Form' : 'Add Allocation'}
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
          />
        )}
      </div>

      {/* Add Allocation Form */}
      {showForm && (
        <AllocationForm
          renters={renters}
          properties={properties}
          childProperties={childProperties}
          onAllocationAdded={fetchData}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Modal for Allocation Details */}
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
