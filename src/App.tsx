import React, { useState } from 'react';
import Header from './components/Header';
import PatientForm from './components/PatientForm';
import RiskAnalysis from './components/RiskAnalysis';
import { PatientData, RiskAssessment } from './types';
import { calculateRiskScore } from './utils/riskCalculator';

function App() {
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);

  const handleSubmit = (data: PatientData) => {
    const riskAssessment = calculateRiskScore(data);
    setAssessment(riskAssessment);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PatientForm onSubmit={handleSubmit} />
          </div>
          <div>
            {assessment && <RiskAnalysis assessment={assessment} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;