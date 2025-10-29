import React, { useState, useEffect } from 'react';
import './Dashboard.css';

// --- DATOS DE EJEMPLO ---
const MOCK_DATA = {
  totalEmployees: 120,
  present: 105,
  late: 8,
  absent: 7,
  recentLogs: [
    { id: 1, name: 'Ana Rodríguez', time: '08:00 AM', status: 'Ingreso', punctuality: 'A tiempo' },
    { id: 2, name: 'Carlos Pérez', time: '08:05 AM', status: 'Ingreso', punctuality: 'Tarde' },
    { id: 3, name: 'Elena García', time: '08:02 AM', status: 'Ingreso', punctuality: 'A tiempo' },
    { id: 4, name: 'Javier López', time: '05:00 PM', status: 'Salida', punctuality: 'Finalizado' },
    { id: 5, name: 'Laura Torres', time: '05:05 PM', status: 'Salida', punctuality: 'Finalizado' },
  ]
};
const Dashboard = () => {
const [data, setData] = useState(MOCK_DATA);

  // Calcula porcentajes para el indicador de asistencia
  const presentPercentage = Math.round((data.present / data.totalEmployees) * 100);
  const latePercentage = Math.round((data.late / data.totalEmployees) * 100);
  const absentPercentage = Math.round((data.absent / data.totalEmployees) * 100);

  // Función para obtener el color de estado
  const getStatusClass = (status) => {
    switch (status) {
      case 'Ingreso': return 'status-ingreso';
      case 'Salida': return 'status-salida';
      case 'A tiempo': return 'status-success';
      case 'Tarde': return 'status-warning';
      default: return 'status-info';
    }
  };

  // Renderiza el componente de la Tarjeta Resumen
  const SummaryCard = ({ title, value, icon, colorClass }) => (
    <div className={`card ${colorClass}`}>
      <div className="card-content">
        <span className="card-icon">{icon}</span>
        <div className="card-info">
          <p className="card-value">{value}</p>
          <h3 className="card-title">{title}</h3>
        </div>
      </div>
    </div>
  );
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard de Asistencia Diaria</h1>
        <p className="text-secondary">Información actualizada de {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </header>

      {/* Grid de Tarjetas Resumen */}
      <section className="summary-grid">
        <SummaryCard
          title="Total Empleados"
          value={data.totalEmployees}
          icon="👥"
          colorClass="card-primary"
        />
        <SummaryCard
          title="Personal Presente"
          value={data.present}
          icon="✅"
          colorClass="card-success"
        />
        <SummaryCard
          title="Llegadas Tarde"
          value={data.late}
          icon="⚠️"
          colorClass="card-warning"
        />
        <SummaryCard
          title="Ausentes Hoy"
          value={data.absent}
          icon="❌"
          colorClass="card-danger"
        />
      </section>

      {/* Contenido Principal: Tabla y Gráfico */}
      <section className="main-content">
        {/* Panel Izquierdo: Actividad Reciente */}
        <div className="main-panel recent-activity">
          <h2>Actividad Reciente (Últimos Registros)</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Empleado</th>
                  <th>Hora</th>
                  <th>Tipo</th>
                  <th>Puntualidad</th>
                </tr>
              </thead>
              <tbody>
                {data.recentLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.name}</td>
                    <td>{log.time}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusClass(log.punctuality)}`}>
                        {log.punctuality}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel Derecho: Indicador de Asistencia (Placeholder de Gráfico) */}
        <div className="main-panel attendance-indicator">
          <h2>Estado General de Asistencia</h2>
          
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '20px 0' }}>
            {presentPercentage}% Presentes
          </p>

          <div className="progress-bar-container">
            <div
              className="progress-segment progress-present"
              style={{ width: `${presentPercentage}%` }}
              title={`Presentes: ${data.present}`}
            >
              {presentPercentage > 10 && `${presentPercentage}%`}
            </div>
            <div
              className="progress-segment progress-late"
              style={{ width: `${latePercentage}%` }}
              title={`Tarde: ${data.late}`}
            >
              {latePercentage > 5 && `${latePercentage}%`}
            </div>
            <div
              className="progress-segment progress-absent"
              style={{ width: `${absentPercentage}%` }}
              title={`Ausentes: ${data.absent}`}
            >
              {absentPercentage > 5 && `${absentPercentage}%`}
            </div>
          </div>
          
          <div className="indicator-chart-area">
            {/* Leyenda */}
            <div className="legend-item">
                <span className="legend-color legend-present"></span>
                <span>Presentes ({data.present})</span>
            </div>
            <div className="legend-item">
                <span className="legend-color legend-late"></span>
                <span>Tarde ({data.late})</span>
            </div>
            <div className="legend-item">
                <span className="legend-color legend-absent"></span>
                <span>Ausentes ({data.absent})</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;