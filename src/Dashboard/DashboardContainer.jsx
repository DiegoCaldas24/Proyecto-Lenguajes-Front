// pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';
import DashboardStats from '../components/dashboard/DashboardStats';
import EmployeeList from '../components/dashboard/EmployeeList';
import BranchList from '../components/dashboard/BranchList';
import AttendanceOverview from '../components/dashboard/AttendanceOverview';
import RecentReportsTable from '../components/dashboard/RecentReportsTable';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getDashboardData();
      setDashboardData(data);
    } catch (err) {
      setError('Error al cargar datos del dashboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">HRM Dashboard</h1>
      
      <DashboardStats stats={dashboardData.stats} />
      
      <div className="dashboard-grid">
        <EmployeeList employees={dashboardData.employees} />
        <BranchList branches={dashboardData.branches} />
        <AttendanceOverview attendance={dashboardData.attendance} />
      </div>
      
      <RecentReportsTable reports={dashboardData.recentReports} />
    </div>
  );
};

export default Dashboard;