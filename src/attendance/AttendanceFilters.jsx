// components/attendance/AttendanceFilters.jsx
import { useState, useEffect } from 'react';
import { employeeService } from '../../services/employeeService';

const AttendanceFilters = ({ filters, onFilterChange, onReset }) => {
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const [branchesData, deptData] = await Promise.all([
        employeeService.getBranches(),
        employeeService.getDepartments()
      ]);
      setBranches(branchesData);
      setDepartments(deptData);
    } catch (err) {
      console.error('Error loading filter options:', err);
    }
  };

  return (
    <div className="attendance-filters">
      <div className="filter-group">
        <label>Fecha Inicio</label>
        <input 
          type="date" 
          value={filters.startDate || ''} 
          onChange={(e) => onFilterChange('startDate', e.target.value)}
        />
      </div>
      
      <div className="filter-group">
        <label>Fecha Fin</label>
        <input 
          type="date" 
          value={filters.endDate || ''} 
          onChange={(e) => onFilterChange('endDate', e.target.value)}
        />
      </div>
      
      <div className="filter-group">
        <label>Sucursal</label>
        <select 
          value={filters.branchId || ''} 
          onChange={(e) => onFilterChange('branchId', e.target.value)}
        >
          <option value="">Todas</option>
          {branches.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Departamento</label>
        <select 
          value={filters.departmentId || ''} 
          onChange={(e) => onFilterChange('departmentId', e.target.value)}
        >
          <option value="">Todos</option>
          {departments.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Estado</label>
        <select 
          value={filters.status} 
          onChange={(e) => onFilterChange('status', e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="present">Presente</option>
          <option value="absent">Ausente</option>
          <option value="late">Tarde</option>
        </select>
      </div>
      
      <button onClick={onReset} className="btn-reset">
        Limpiar Filtros
      </button>
    </div>
  );
};

export default AttendanceFilters;