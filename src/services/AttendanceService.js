// services/attendanceService.js
import api from './api';

export const attendanceService = {
  getAttendance: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.branchId) params.append('branchId', filters.branchId);
    if (filters.departmentId) params.append('departmentId', filters.departmentId);
    if (filters.employeeId) params.append('employeeId', filters.employeeId);
    if (filters.status && filters.status !== 'all') {
      params.append('status', filters.status);
    }
    
    const response = await api.get(`/attendance?${params.toString()}`);
    return response.data;
  },
  
  getAttendanceSummary: async (startDate, endDate) => {
    const response = await api.get('/attendance/summary', {
      params: { startDate, endDate }
    });
    return response.data;
  },
  
  registerAttendance: async (data) => {
    const response = await api.post('/attendance', data);
    return response.data;
  },
  
  exportAttendance: async (filters, format = 'xlsx') => {
    const response = await api.get('/attendance/export', {
      params: { ...filters, format },
      responseType: 'blob'
    });
    return response.data;
  }
};