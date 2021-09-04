import React from 'react';
import './App.css';
import { AdmissionFeeCalculator } from "src/compornents/admission-fee-calculator";

/**
 * アプリケーション。
 */
const App: React.FC = () => {
  return (
    <div className="main">
      <AdmissionFeeCalculator />
    </div>
  );
}

export default App;