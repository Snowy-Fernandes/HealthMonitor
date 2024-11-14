import { PatientData, RiskAssessment } from '../types';

export function calculateRiskScore(data: PatientData): RiskAssessment {
  // Initialize base score
  let score = 0;
  const factors: Array<{ factor: string; impact: number }> = [];

  // Age factor (0-25 points)
  const ageFactor = Math.min(25, (data.age / 80) * 25);
  score += ageFactor;
  factors.push({ factor: 'Age', impact: ageFactor });

  // Blood pressure factor (0-20 points)
  const bpFactor = Math.min(20, ((data.bloodPressure - 90) / 60) * 20);
  score += bpFactor;
  factors.push({ factor: 'Blood Pressure', impact: bpFactor });

  // Cholesterol factor (0-15 points)
  const cholesterolFactor = Math.min(15, ((data.cholesterol - 150) / 100) * 15);
  score += cholesterolFactor;
  factors.push({ factor: 'Cholesterol', impact: cholesterolFactor });

  // BMI factor (0-15 points)
  const bmiFactor = Math.min(15, ((data.bmi - 18.5) / 15) * 15);
  score += bmiFactor;
  factors.push({ factor: 'BMI', impact: bmiFactor });

  // Lifestyle factors (0-25 points)
  let lifestyleFactor = 0;
  if (data.smoking) lifestyleFactor += 10;
  if (data.alcoholConsumption) lifestyleFactor += 8;
  lifestyleFactor += Math.max(0, (5 - data.physicalActivity) * 1.4);
  score += lifestyleFactor;
  factors.push({ factor: 'Lifestyle', impact: lifestyleFactor });

  // Family history (0-10 points)
  if (data.familyHistory) {
    score += 10;
    factors.push({ factor: 'Family History', impact: 10 });
  }

  // Normalize score to 0-100
  score = Math.min(100, Math.max(0, score));

  // Generate insights
  const insights = generateInsights(data, score);

  return {
    score,
    level: score < 30 ? 'Low' : score < 70 ? 'Moderate' : 'High',
    insights,
    contributingFactors: factors.sort((a, b) => b.impact - a.impact),
  };
}

function generateInsights(data: PatientData, score: number): string[] {
  const insights: string[] = [];

  if (data.bloodPressure > 140) {
    insights.push('Blood pressure is above recommended levels. Consider lifestyle changes and medication review.');
  }

  if (data.bmi > 25) {
    insights.push('BMI indicates overweight status. Regular exercise and dietary modifications recommended.');
  }

  if (data.smoking) {
    insights.push('Smoking significantly increases health risks. Smoking cessation programs are available.');
  }

  if (data.physicalActivity < 3) {
    insights.push('Increased physical activity could help reduce health risks. Aim for at least 150 minutes per week.');
  }

  if (score > 70) {
    insights.push('High risk score detected. Immediate consultation with healthcare provider is recommended.');
  }

  return insights;
}