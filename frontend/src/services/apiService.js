import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiService = {
  // Student endpoints
  students: {
    getAll: async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/student`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    
    getById: async (id) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/student/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    
    create: async (studentData) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/student`, studentData);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    
    update: async (id, studentData) => {
      try {
        const response = await axios.put(`${API_BASE_URL}/student/${id}`, studentData);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    
    delete: async (id) => {
      try {
        const response = await axios.delete(`${API_BASE_URL}/student/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  }
};

export default apiService;
