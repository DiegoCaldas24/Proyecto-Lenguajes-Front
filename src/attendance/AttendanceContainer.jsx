// pages/Attendance.jsx
import { useState, useEffect } from 'react';
import { attendanceService } from '../services/attendanceService';
import AttendanceFilters from '../components/attendance/AttendanceFilters';
import AttendanceChart from '../components/attendance/AttendanceChart';
import AttendanceTable from '../components/attendance/AttendanceTable';
import useFilter from '../hooks/useFilter';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { filters, updateFilter, resetFilters } = useFilter({
    startDate: null,
    endDate: null,
    branchId: null,
    departmentId: null,
    employeeId: null,
    status: 'all' // present, absent, late, all
  });

  useEffect(() => {
    fetchAttendance();
  }, [filters]);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const data = await attendanceService.getAttendance(filters);
      setAttendanceData(data);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendance-container">
      <h1>Asistencia y Puntualidad</h1>
      
      <AttendanceFilters 
        filters={filters}
        onFilterChange={updateFilter}
        onReset={resetFilters}
      />
      
      <div className="attendance-content">
        <AttendanceChart data={attendanceData} />
        <AttendanceTable 
          data={attendanceData} 
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Attendance;