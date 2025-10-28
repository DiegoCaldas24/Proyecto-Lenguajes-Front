// services/dashboardService.js
import api from './api';

export const dashboardService = {
  getDashboardData: async () => {
    const response = await api.get('/dashboard');
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  }
};