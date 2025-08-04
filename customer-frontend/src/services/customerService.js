import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const customerService = {
  // Get all customers with pagination
  async getCustomers(page = 0, size = 20) {
    try {
      const response = await apiClient.get(`/customers?page=${page}&size=${size}`);
      console.log('API Response:', response.data); // For debugging
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw this.handleError(error);
    }
  },

  // Get customer by ID
  async getCustomerById(customerId) {
    try {
      const response = await apiClient.get(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Error handling
  handleError(error) {
    if (error.response) {
      // Server responded with error
      return {
        message: error.response.data.message || `Server Error: ${error.response.status}`,
        type: 'server_error',
        status: error.response.status
      };
    } else if (error.request) {
      // Network error
      return {
        message: 'Cannot connect to server. Make sure your Spring Boot API is running on http://localhost:8080',
        type: 'network_error'
      };
    } else {
      // Other error
      return {
        message: error.message || 'An unexpected error occurred',
        type: 'unknown_error'
      };
    }
  }
};

export default customerService;