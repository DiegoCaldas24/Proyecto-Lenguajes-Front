// routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';
import Attendance from '../pages/Attendance';
import Reports from '../pages/Reports';
import ProtectedRoute from '../components/common/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta principal */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Dashboard Principal */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute roles={['ADMIN', 'RRHH', 'JEFE', 'EMPLEADO']}>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Gestión de Empleados */}
      <Route 
        path="/employees" 
        element={
          <ProtectedRoute roles={['ADMIN', 'RRHH']}>
            <Employees />
          </ProtectedRoute>
        } 
      />
      
      {/* Módulo de Asistencia */}
      <Route 
        path="/attendance" 
        element={
          <ProtectedRoute roles={['ADMIN', 'RRHH', 'JEFE']}>
            <Attendance />
          </ProtectedRoute>
        } 
      />
      
      {/* Reportes y Analítica */}
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute roles={['ADMIN', 'RRHH', 'JEFE']}>
            <Reports />
          </ProtectedRoute>
        } 
      />
      
      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;