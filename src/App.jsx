import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Empleados from "./components/Employees/EmployeeManagement.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import AttendanceRegister from "./components/AttendanceRegister/AttendanceRegister.jsx";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/marcado" element={<AttendanceRegister />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
