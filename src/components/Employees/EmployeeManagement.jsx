import React, { useState, useMemo } from 'react';
import './Employees.css';

// --- DATOS DE EJEMPLO ---
const MOCK_EMPLOYEES = [
  { id: 'emp001', name: 'Ana García', position: 'Desarrollador Senior', department: 'Tecnología', email: 'ana.g@rh.com', phone: '555-1234', status: 'Activo', hireDate: '2018-05-15', salary: 55000, address: 'Calle Falsa 123' },
  { id: 'emp002', name: 'Beto Ruiz', position: 'Gerente de Ventas', department: 'Comercial', email: 'beto.r@rh.com', phone: '555-5678', status: 'Suspendido', hireDate: '2021-01-20', salary: 48000, address: 'Avenida Siempre Viva 742' },
  { id: 'emp003', name: 'Carla Soto', position: 'Asistente Administrativo', department: 'Administración', email: 'carla.s@rh.com', phone: '555-9012', status: 'Activo', hireDate: '2023-09-10', salary: 30000, address: 'Paseo de la Reforma 10' },
  { id: 'emp004', name: 'David Lira', position: 'Diseñador UX/UI', department: 'Tecnología', email: 'david.l@rh.com', phone: '555-3456', status: 'Retirado', hireDate: '2017-03-01', salary: 52000, address: 'Boulevard de los Sueños 50' },
  { id: 'emp005', name: 'Elena Polo', position: 'Especialista en RR. HH.', department: 'Recursos Humanos', email: 'elena.p@rh.com', phone: '555-7890', status: 'Activo', hireDate: '2022-11-25', salary: 40000, address: 'Plaza Central 8' },
];

const EmployeeManagement = () => {
  // Estado principal para la lista de empleados
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  // Estado para la vista actual: 'list', 'detail', 'form'
  const [view, setView] = useState('list');
  // Estado para el empleado seleccionado (para detalle o edición)
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  // Estados para búsqueda y filtrado
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');

  // --- Lógica de Filtrado y Búsqueda ---
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            employee.position.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = filterStatus === 'Todos' || employee.status === filterStatus;

      return matchesSearch && matchesFilter;
    });
  }, [employees, searchTerm, filterStatus]);

  // --- Funciones de Navegación ---
  const navigateToList = () => {
    setView('list');
    setSelectedEmployee(null);
  };

  const navigateToDetail = (employee) => {
    setSelectedEmployee(employee);
    setView('detail');
  };

  const navigateToForm = (employee = null) => {
    setSelectedEmployee(employee);
    setView('form');
  };

  // --- Funciones de Gestión de Empleados ---
  const handleSaveEmployee = (formData) => {
    if (formData.id) {
      // Editar
      setEmployees(employees.map(emp => emp.id === formData.id ? formData : emp));
    } else {
      // Nuevo Registro
      const newId = 'emp' + (employees.length + 1).toString().padStart(3, '0');
      setEmployees([...employees, { ...formData, id: newId }]);
    }
    navigateToList();
  };
  
  // Función para obtener el color de estado
  const getStatusClass = (status) => {
    switch (status) {
      case 'Activo': return 'status-active';
      case 'Suspendido': return 'status-suspended';
      case 'Retirado': return 'status-retired';
      default: return 'status-info';
    }
  };

  // --- Vistas del Componente ---

  // 1. Vista de Lista
  const ListView = () => (
    <div className="list-view">
      <div className="list-controls">
        <input
          type="text"
          placeholder="Buscar por nombre o cargo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="Todos">Todos los Estados</option>
          <option value="Activo">Activo</option>
          <option value="Suspendido">Suspendido</option>
          <option value="Retirado">Retirado</option>
        </select>
        <button className="add-button" onClick={() => navigateToForm()}>
          + Nuevo Empleado
        </button>
      </div>

      <div className="employee-list-container">
        {filteredEmployees.length === 0 ? (
          <p className="no-results">No se encontraron empleados que coincidan con los criterios de búsqueda.</p>
        ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cargo</th>
                <th>Departamento</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id} onClick={() => navigateToDetail(emp)} style={{ cursor: 'pointer' }}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.position}</td>
                  <td>{emp.department}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="action-button edit-btn" 
                      onClick={(e) => { e.stopPropagation(); navigateToForm(emp); }}
                      title="Editar"
                    >
                      &#9998; {/* Icono de Lápiz */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  // 2. Vista de Formulario (Registro/Edición)
  const FormView = () => {
    const isEditing = selectedEmployee !== null;
    const initialFormState = selectedEmployee || {
      name: '', position: '', department: '', email: '', phone: '', status: 'Activo', hireDate: '', salary: '', address: ''
    };
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
      e.preventDefault();
      handleSaveEmployee(formData);
    };

    return (
      <div className="form-view">
        <h2>{isEditing ? 'Editar Empleado: ' + selectedEmployee.name : 'Registrar Nuevo Empleado'}</h2>
        <form onSubmit={handleFormSubmit} className="employee-form">
          {/* Fila 1: Nombre y Cargo */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nombre Completo</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="position">Cargo</label>
              <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} required />
            </div>
          </div>

          {/* Fila 2: Departamento y Estado */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">Departamento</label>
              <select id="department" name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Seleccione un departamento</option>
                <option value="RRHH">RRHH</option>
                <option value="SISTEMAS">SISTEMAS</option>
                <option value="SOPORTE">SOPORTE</option>
                <option value="ADMINISTRACION">ADMINISTRACIÓN</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status">Estado</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} required>
                <option value="Activo">Activo</option>
                <option value="Suspendido">Suspendido</option>
                <option value="Retirado">Retirado</option>
              </select>
            </div>
          </div>

          {/* Fila 3: Contacto (Email y Teléfono) */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
          </div>

          {/* Fila 4: Fecha Contratación y Salario */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hireDate">Fecha Contratación</label>
              <input type="date" id="hireDate" name="hireDate" value={formData.hireDate} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="salary">Salario (USD)</label>
              <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleChange} />
            </div>
          </div>
          
          {/* Fila 5: Dirección */}
          <div className="form-row">
             <div className="form-group full-width">
              <label htmlFor="address">Dirección</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
            </div>
          </div>


          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={navigateToList}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {isEditing ? 'Guardar Cambios' : 'Registrar Empleado'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  // 3. Vista de Detalle
  const DetailView = () => (
    <div className="detail-view">
      <div className="detail-header">
        <button className="btn-back" onClick={navigateToList}>
          &larr; Volver a la Lista
        </button>
        <div className="detail-actions">
            <button className="btn-secondary" onClick={() => navigateToForm(selectedEmployee)}>
                &#9998; Editar
            </button>
        </div>
      </div>
      
      <div className="detail-card">
        <div className="info-section profile-header">
            <h2 className="employee-name">{selectedEmployee.name}</h2>
            <p className="employee-position">{selectedEmployee.position} en {selectedEmployee.department}</p>
            <span className={`status-badge-lg ${getStatusClass(selectedEmployee.status)}`}>
                Estado: {selectedEmployee.status}
            </span>
        </div>
        
        <div className="info-section">
            <h3>Información Laboral</h3>
            <div className="info-grid">
                <div className="info-item"><strong>ID Empleado:</strong> <span>{selectedEmployee.id}</span></div>
                <div className="info-item"><strong>Departamento:</strong> <span>{selectedEmployee.department}</span></div>
                <div className="info-item"><strong>Fecha Contratación:</strong> <span>{selectedEmployee.hireDate}</span></div>
                <div className="info-item"><strong>Salario:</strong> <span>{new Intl.NumberFormat('es-US', { style: 'currency', currency: 'USD' }).format(selectedEmployee.salary)}</span></div>
            </div>
        </div>

        <div className="info-section">
            <h3>Información de Contacto</h3>
            <div className="info-grid">
                <div className="info-item"><strong>Email:</strong> <span>{selectedEmployee.email}</span></div>
                <div className="info-item"><strong>Teléfono:</strong> <span>{selectedEmployee.phone || 'N/A'}</span></div>
                <div className="info-item full-width"><strong>Dirección:</strong> <span>{selectedEmployee.address || 'N/A'}</span></div>
            </div>
        </div>
      </div>
    </div>
  );

  // --- Renderizado Principal (Switch de Vistas) ---
  const renderView = () => {
    switch (view) {
      case 'form':
        return <FormView />;
      case 'detail':
        return <DetailView />;
      case 'list':
      default:
        return <ListView />;
    }
  };


  return (
    <div className="management-container">
      <h1>Gestión de Empleados</h1>
      {renderView()}
    </div>
  );
};

export default EmployeeManagement;