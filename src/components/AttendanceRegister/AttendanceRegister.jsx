import React, { useState } from 'react';
import './AttendanceRegister.css';
// Mock database to track in/out status for simulation. 
// En una aplicación real, esto se manejaría en el backend (Spring).
const MOCK_ATTENDANCE_DB = {}; // { id: 'emp001', status: 'IN' }

const AttendanceRegister = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  // Estado para la acción seleccionada manualmente: 'Entrada' (default) o 'Salida'
  const [actionType, setActionType] = useState('Entrada'); 

  // La lógica de verificación automática se elimina, ya que la acción es ahora manual.

  // Función para simular el registro de asistencia (Entrada/Salida)
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    
    const id = employeeId.trim();

    if (!id) {
      setMessage('Por favor, ingresa un número de empleado.');
      setMessageType('error');
      return;
    }
    
    // Usamos la acción seleccionada por el usuario
    const action = actionType; 
    const newStatus = action === 'Entrada' ? 'IN' : 'OUT';
    
    // --- Lógica de Simulación de Registro ---
    MOCK_ATTENDANCE_DB[id] = newStatus; // Actualiza el estado simulado

    const currentTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setMessage(`✅ ${action} registrada para ID ${id} a las ${currentTime}.`);
    setMessageType('success');
    setEmployeeId(''); // Limpiar el campo después del registro
    
    // Aquí iría la llamada fetch a tu API de Spring
    // fetch('/api/attendance/register', { method: 'POST', body: JSON.stringify({ employeeId: id, action: newStatus }) })
  };

  return (
    <div className="attendance-register-page">
     
      {/* Componente que muestra la hora actual en tiempo real */}
      <ClockDisplay />

      <div className="register-card">
        <header className="register-header">
          <h2>Registro de Asistencia</h2>
          <p>Selecciona la acción e ingresa tu número de empleado.</p>
        </header>

        <form onSubmit={handleRegister} className="register-form">
          
          {/* Nuevo Selector de Acción */}
          <div className="action-toggle">
            <input 
              type="radio" 
              id="action-in" 
              name="action-type" 
              value="Entrada" 
              checked={actionType === 'Entrada'}
              onChange={() => setActionType('Entrada')}
            />
            <label htmlFor="action-in">
              <span style={{marginRight: '8px'}}>➡️</span> Registrar Entrada
            </label>

            <input 
              type="radio" 
              id="action-out" 
              name="action-type" 
              value="Salida"
              checked={actionType === 'Salida'}
              onChange={() => setActionType('Salida')}
            />
            <label htmlFor="action-out">
              <span style={{marginRight: '8px'}}>⬅️</span> Registrar Salida
            </label>
          </div>
          
          {/* Input de ID de Empleado */}
          <input
            type="number"
            className="id-input"
            value={employeeId}
            onChange={(e) => {
                setEmployeeId(e.target.value);
                // Limpiar mensaje al escribir
                if (message) {
                    setMessage('');
                    setMessageType('');
                }
            }}
            placeholder="No. de Empleado"
            autoFocus 
            required
          />

          {/* Botón de Registro Dinámico */}
          <button 
            type="submit" 
            className={`register-button ${actionType === 'Entrada' ? 'register-button-in' : 'register-button-out'}`}
          >
            Registrar {actionType}
          </button>
        </form>
        
        {message && (
            <div className={`feedback-message ${messageType}`}>
                {message}
            </div>
        )}
        
      </div>
    </div>
  );
};

// Componente simple para mostrar la hora actual (reloj)
const ClockDisplay = () => {
    const [time, setTime] = useState(new Date());

    React.useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId); // Cleanup function
    }, []);

    const formattedTime = time.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    });

    return (
        <div className="clock-display">
            {formattedTime}
        </div>
    );
}


export default AttendanceRegister;
