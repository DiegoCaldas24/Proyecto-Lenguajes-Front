import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-brand">
        RH-System
      </a>

      <div className="navbar-links">
        <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/empleados">Empleados</Link></li>
            <li><Link to="/marcado">Marcado de Entrada|Salida</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;