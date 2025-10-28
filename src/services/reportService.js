// services/reportService.js
import api from './api';

export const reportService = {
  getReports: async (page = 0, size = 10) => {
    const response = await api.get('/reports', {
      params: { page, size }
    });
    return response.data;
  },
  
  generateReport: async (reportConfig) => {
    const response = await api.post('/reports/generate', reportConfig);
    return response.data;
  },
  
  getReportById: async (reportId) => {
    const response = await api.get(`/reports/${reportId}`);
    return response.data;
  },
  
  downloadReport: async (reportId, format = 'pdf') => {
    const response = await api.get(`/reports/${reportId}/download`, {
      params: { format },
      responseType: 'blob'
    });
    return response.data;
  },
  
  getReportTypes: async () => {
    const response = await api.get('/reports/types');
    return response.data;
  }
};