import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// Cache storage for API responses
const cache = {
  allocations: { data: null, timestamp: 0 },
  properties: { data: null, timestamp: 0 },
  renters: { data: null, timestamp: 0 },
  childProperties: { data: null, timestamp: 0 }
};

// Cache expiration time in milliseconds (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

// Create axios instance with timeout and base URL
const api = axios.create({
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API service to handle all API calls
export const ApiService = {
  // Get API URL from environment
  API_URL: import.meta.env.VITE_API_URL,

  // Fetch allocations with caching
  fetchAllocations: async (forceRefresh = false) => {
    const now = Date.now();
    const { data, timestamp } = cache.allocations;

    // Return cached data if valid and not forcing refresh
    if (data && !forceRefresh && now - timestamp < CACHE_EXPIRATION) {
      console.log('Using cached allocations data');
      return data;
    }

    try {
      const response = await api.get(`${ApiService.API_URL}allocations`);
      // Cache the response
      cache.allocations = { data: response.data, timestamp: now };
      return response.data;
    } catch (error) {
      console.error('Error fetching allocations:', error);
      toast.error('Error fetching allocations!');
      throw error;
    }
  },

  // Fetch properties with caching
  fetchProperties: async (forceRefresh = false) => {
    const now = Date.now();
    const { data, timestamp } = cache.properties;

    // Return cached data if valid and not forcing refresh
    if (data && !forceRefresh && now - timestamp < CACHE_EXPIRATION) {
      console.log('Using cached properties data');
      return data;
    }

    try {
      const response = await api.get(`${ApiService.API_URL}property`);
      // Cache the response
      cache.properties = { data: response.data, timestamp: now };
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Error fetching properties!');
      throw error;
    }
  },

  // Fetch renters with caching
  fetchRenters: async (forceRefresh = false) => {
    const now = Date.now();
    const { data, timestamp } = cache.renters;

    // Return cached data if valid and not forcing refresh
    if (data && !forceRefresh && now - timestamp < CACHE_EXPIRATION) {
      console.log('Using cached renters data');
      return data;
    }

    try {
      const response = await api.get(`${ApiService.API_URL}renter`);
      // Cache the response
      cache.renters = { data: response.data, timestamp: now };
      return response.data;
    } catch (error) {
      console.error('Error fetching renters:', error);
      toast.error('Error fetching renters!');
      throw error;
    }
  },

  // Fetch child properties with caching
  fetchChildProperties: async (forceRefresh = false) => {
    const now = Date.now();
    const { data, timestamp } = cache.childProperties;

    // Return cached data if valid and not forcing refresh
    if (data && !forceRefresh && now - timestamp < CACHE_EXPIRATION) {
      console.log('Using cached child properties data');
      return data;
    }

    try {
      const response = await api.get(`${ApiService.API_URL}child_property`);
      // Cache the response
      cache.childProperties = { data: response.data, timestamp: now };
      return response.data;
    } catch (error) {
      console.error('Error fetching child properties:', error);
      toast.error('Error fetching child properties!');
      throw error;
    }
  },

  // Create allocation
  createAllocation: async (formData) => {
    try {
      const response = await api.post(`${ApiService.API_URL}allocations`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Invalidate the allocations cache
      cache.allocations.data = null;
      // toast.success('Allocation data saved!');
      return response.data;
    } catch (error) {
      console.error('Error saving allocation data:', error);
      throw error;
    }
  },

  // Get allocation details
  getAllocationDetails: async (id) => {
    try {
      // First check if we already have the allocation in the cache
      if (cache.allocations.data) {
        const cachedAllocation = cache.allocations.data.find((a) => a.id === id || a.allocation_id === id);
        if (cachedAllocation) {
          console.log('Using cached allocation details');
          return cachedAllocation;
        }
      }

      const response = await api.get(`${ApiService.API_URL}allocations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching allocation details:', error);
      // toast.error('Error fetching allocation details');
      throw error;
    }
  },

  // Update allocation
  updateAllocation: async (id, formData) => {
    try {
      const response = await api.put(`${ApiService.API_URL}allocations/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Invalidate the allocations cache
      cache.allocations.data = null;
      // toast.success('Allocation Updated Successfully!');
      return response.data;
    } catch (error) {
      console.error('Error updating allocation:', error);
      // toast.error('Error updating allocation');
      throw error;
    }
  },

  // Delete allocation
  deleteAllocation: async (id) => {
    try {
      const response = await api.delete(`${ApiService.API_URL}allocations/${id}`);
      // Invalidate the allocations cache
      cache.allocations.data = null;
      // toast.error('Allocation Deleted Successfully!');
      return response.data;
    } catch (error) {
      console.error('Error deleting allocation:', error);
      // toast.error('Error deleting allocation');
      throw error;
    }
  },

  // Refresh all caches
  refreshAllData: async () => {
    try {
      const [allocationsData, propertiesData, rentersData, childPropertiesData] = await Promise.all([
        ApiService.fetchAllocations(true),
        ApiService.fetchProperties(true),
        ApiService.fetchRenters(true),
        ApiService.fetchChildProperties(true)
      ]);

      return {
        allocations: allocationsData,
        properties: propertiesData,
        renters: rentersData,
        childProperties: childPropertiesData
      };
    } catch (error) {
      console.error('Error refreshing all data:', error);
      toast.error('Error refreshing all data');
      throw error;
    }
  }
};
