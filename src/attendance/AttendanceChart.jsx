// components/attendance/AttendanceChart.jsx
import { useMemo } from 'react';
import DonutChart from '../charts/DonutChart';
import BarChart from '../charts/BarChart';

const AttendanceChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;
    
    // Procesar datos para gráficos
    const summary = data.reduce((acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1;
      return acc;
    }, {});
    
    return {
      donut: [
        { label: 'Presente', value: summary.present || 0, color: '#4A90E2' },
        { label: 'Ausente', value: summary.absent || 0, color: '#E0E0E0' },
        { label: 'Tarde', value: summary.late || 0, color: '#F5A623' }
      ],
      trend: data.map(d => ({
        date: d.date,
        present: d.presentCount,
        absent: d.absentCount
      }))
    };
  }, [data]);

  if (!chartData) return <p>No hay datos disponibles</p>;

  return (
    <div className="attendance-charts">
      <div className="chart-card">
        <h3>Resumen de Asistencia</h3>
        <DonutChart data={chartData.donut} />
      </div>
      
      <div className="chart-card">
        <h3>Tendencia Semanal</h3>
        <BarChart data={chartData.trend} />
      </div>
    </div>
  );
};

export default AttendanceChart;