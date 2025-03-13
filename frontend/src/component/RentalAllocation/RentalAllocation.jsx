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
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal state for AllocationDetailModal (only for viewing details)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  
  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  // Filter allocations based on search term
  const filteredAllocations = allocations.filter(
    (allocation) => {
      const renter = renters.find(r => r.id === allocation.renter_id);
      const property = properties.find(p => p.id === allocation.property_id);
      const childProperty = childProperties.find(cp => cp.id === allocation.child_property_id);
      
      const searchValue = searchTerm.toLowerCase();
      
      return (
        renter?.renterName?.toLowerCase().includes(searchValue) ||
        property?.name?.toLowerCase().includes(searchValue) ||
        childProperty?.name?.toLowerCase().includes(searchValue) ||
        allocation?.rent?.toString().includes(searchValue) ||
        allocation?.status?.toLowerCase().includes(searchValue)
      );
    }
  );

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
        console.error('Error Deleting Allocation:', error);
        alert('Failed to Delete Allocation!');
      }
    }
  };

  // Calculate statistics for dashboard
  const getTotalRent = () => {
    return allocations.reduce((sum, allocation) => sum + (parseFloat(allocation.rent) || 0), 0);
  };

  const getActiveAllocations = () => {
    return allocations.filter(a => a.status === 'Active').length;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-xl shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Rental Allocation Management</h1>
          <p className="text-gray-600 mt-1">Manage property rentals and allocations in one place</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search allocations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            onClick={() => {
              setFormMode('add');
              setShowForm(!showForm);
            }}
            className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md w-full sm:w-auto"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>{showForm && formMode === 'add' ? 'Close Form' : 'Add Allocation'}</span>
          </button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-500 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Total Allocations</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{allocations.length}</h3>
            </div>
            <div className="bg-teal-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Active Allocations</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{getActiveAllocations()}</h3>
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
              <p className="text-sm text-gray-500 uppercase tracking-wider">Total Rent</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">₹{getTotalRent().toLocaleString()}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Allocation Form (for both adding and editing) */}
      {showForm && (
        <div className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-teal-100">
            <h2 className="text-xl font-semibold text-gray-800">{formMode === 'edit' ? 'Edit Allocation' : 'Create New Allocation'}</h2>
            <p className="text-gray-500 mt-1">{formMode === 'edit' ? 'Update rental allocation details' : 'Assign a property to a renter'}</p>
          </div>
          <div className="p-6">
            <AllocationForm
              renters={renters}
              properties={properties}
              childProperties={childProperties}
              onAllocationAdded={fetchData}
              onClose={closeForm}
              mode={formMode}
              allocation={selectedAllocation}
            />
          </div>
        </div>
      )}

      {/* Allocations Listing */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Rental Allocations</h2>
          <p className="text-gray-500 mt-1">View and manage all property rental allocations</p>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-10 w-10 text-teal-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading allocations...</p>
            </div>
          </div>
        ) : filteredAllocations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <svg className="h-16 w-16 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {searchTerm ? (
              <>
                <h3 className="text-lg font-medium text-gray-800">No allocations found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your search criteria</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-teal-600 hover:text-teal-800 font-medium"
                >
                  Clear search
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium text-gray-800">No allocations created yet</h3>
                <p className="text-gray-500 mt-1">Assign properties to renters by creating a new allocation</p>
                <button 
                  onClick={() => {
                    setFormMode('add');
                    setShowForm(true);
                  }}
                  className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Create Your First Allocation
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="overflow-auto">
            <AllocationTable
              allocations={filteredAllocations}
              renters={renters}
              properties={properties}
              childProperties={childProperties}
              onEdit={handleEditClick}
              onDetails={handleDetailsClick}
              apiUrl={ApiService.API_URL}
              handleDeleteClick={handleDeleteClick}
            />
          </div>
        )}
      </div>

      {/* Modal for Allocation Details (only for viewing) */}
      {isModalOpen && selectedAllocation && (
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
              <AllocationDetailModal
                allocation={selectedAllocation}
                onClose={closeModal}
                refreshAllocations={fetchData}
                apiUrl={ApiService.API_URL}
                renters={renters}
                properties={properties}
                childProperties={childProperties}
              />
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
