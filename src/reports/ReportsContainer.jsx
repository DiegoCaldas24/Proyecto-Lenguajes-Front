// pages/Reports.jsx
import { useState } from 'react';
import ReportGenerator from '../components/reports/ReportGenerator';
import ReportsList from '../components/reports/ReportsList';
import ReportPreview from '../components/reports/ReportPreview';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReportGenerated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="reports-container">
      <h1>Reportes y Analítica</h1>
      
      <div className="reports-layout">
        <div className="reports-sidebar">
          <ReportGenerator onReportGenerated={handleReportGenerated} />
        </div>
        
        <div className="reports-main">
          <ReportsList 
            key={refreshKey}
            onSelectReport={setSelectedReport}
          />
          
          {selectedReport && (
            <ReportPreview report={selectedReport} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;