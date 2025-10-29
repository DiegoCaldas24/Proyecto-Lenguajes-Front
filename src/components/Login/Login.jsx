import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    // --- Authentication Logic (Placeholder) ---
    if (!username || !password) {
      setError('Por favor, ingresa tu usuario y contraseña.');
      return;
    }

    console.log('Attempting to log in with:', { username, password });
    
    // This is where you would make the actual fetch call to your Spring backend:
    // fetch('/api/login', { 
    //   method: 'POST', 
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password }) 
    // })
    // .then(response => { 
    //   if (response.ok) {
    //     // Handle successful login
    //   } else {
    //     setError('Credenciales inválidas. Inténtalo de nuevo.');
    //   }
    // })
    // .catch(err => {
    //   setError('Error de conexión. Inténtalo más tarde.');
    // });
    
    // Temporary success message (replace with navigation)
    // alert('¡Inicio de sesión exitoso! (Simulación)'); 
  };

  return (
    <div className="login-page">

      <div className="login-card">
        <header className="login-header">
          <h1>Acceso RR. HH.</h1>
          <p>Sistema de Gestión de Recursos Humanos</p>
        </header>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario o Correo Electrónico</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej: jlopez"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
