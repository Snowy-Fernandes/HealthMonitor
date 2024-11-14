import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { RiskAssessment } from '../types';

interface Props {
  assessment: RiskAssessment;
}

export default function RiskAnalysis({ assessment }: Props) {
  const { score, level, insights, contributingFactors } = assessment;

  const getRiskLevelStyles = () => {
    switch (level) {
      case 'Low':
        return { color: 'text-green-500', bg: 'bg-green-50', icon: CheckCircle };
      case 'Moderate':
        return { color: 'text-yellow-500', bg: 'bg-yellow-50', icon: AlertTriangle };
      case 'High':
        return { color: 'text-red-500', bg: 'bg-red-50', icon: XCircle };
    }
  };

  const styles = getRiskLevelStyles();
  const Icon = styles.icon;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Risk Analysis Results</h2>
      
      <div className={`${styles.bg} rounded-lg p-4 mb-6`}>
        <div className="flex items-center space-x-4">
          <Icon className={`h-8 w-8 ${styles.color}`} />
          <div>
            <p className="text-lg font-medium text-gray-900">Risk Level: {level}</p>
            <p className="text-sm text-gray-500">Score: {score.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Contributing Factors</h3>
          <div className="space-y-3">
            {contributingFactors.map((factor, index) => (
              <div key={index} className="flex items-center">
                <TrendingUp className="h-5 w-5 text-indigo-500 mr-2" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{factor.factor}</span>
                    <span className="text-sm text-gray-500">{factor.impact.toFixed(1)} points</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${(factor.impact / 25) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Key Insights</h3>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span className="text-gray-700">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}