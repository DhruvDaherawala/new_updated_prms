import axios from 'axios';

// API service to handle all API calls
export const ApiService = {
  // Get API URL from environment
  API_URL: import.meta.env.VITE_API_URL,

  // Fetch allocations
  fetchAllocations: async () => {
    try {
      const response = await axios.get(`${ApiService.API_URL}allocations`);
      console.log('Rental Allocation', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching allocations:', error);
      throw error;
    }
  },

  // Fetch properties
  fetchProperties: async () => {
    try {
      const response = await axios.get(`${ApiService.API_URL}property`);
      console.log('properties', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },

  // Fetch renters
  fetchRenters: async () => {
    try {
      const response = await axios.get(`${ApiService.API_URL}renter`);
      console.log('Renters', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching renters:', error);
      throw error;
    }
  },

  // Fetch child properties
  fetchChildProperties: async () => {
    try {
      const response = await axios.get(`${ApiService.API_URL}child_property`);
      console.log('Child properties', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching child properties:', error);
      throw error;
    }
  },

  // Create allocation
  createAllocation: async (formData) => {
    try {
      const response = await axios.post(`${ApiService.API_URL}allocations`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error saving allocation data:', error);
      throw error;
    }
  },

  // Get allocation details
  getAllocationDetails: async (id) => {
    try {
      const response = await axios.get(`${ApiService.API_URL}allocations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching allocation details:', error);
      throw error;
    }
  },

  // Update allocation
  updateAllocation: async (id, formData) => {
    try {
      const response = await axios.put(`${ApiService.API_URL}allocations/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating allocation:', error);
      throw error;
    }
  }
};
