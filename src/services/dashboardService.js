// services/dashboardService.js
import api from './api';

export const dashboardService = {
  getDashboardData: async () => {
    try {
      const res = await fetch('/api/dashboard');
      if (!res.ok) throw new Error('Network response not ok');
      const data = await res.json();
      return data;
    } catch (err) {
      // Fallback: datos de ejemplo para desarrollo sin backend
      await new Promise((r) => setTimeout(r, 300)); // simula latencia
      return {
        stats: {
          totalEmployees: 42,
          onLeave: 3,
          presentToday: 35,
          openPositions: 2,
        },
        employees: [
          { id: 1, name: 'Ana Pérez', position: 'Developer' },
          { id: 2, name: 'Luis Gómez', position: 'Designer' },
          { id: 3, name: 'María Ruiz', position: 'HR' },
        ],
        branches: [
          { id: 'b1', name: 'Madrid' },
          { id: 'b2', name: 'Barcelona' },
        ],
        attendance: [
          { date: '2025-10-20', present: 34, absent: 8 },
          { date: '2025-10-21', present: 36, absent: 6 },
        ],
        recentReports: [
          { id: 'r1', title: 'Reporte de nómina', date: '2025-10-21' },
          { id: 'r2', title: 'Resumen mensual', date: '2025-10-15' },
        ],
      };
    }
  },
};

export default dashboardService;