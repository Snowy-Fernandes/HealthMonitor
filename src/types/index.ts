export interface PatientData {
  id?: string;
  age: number;
  gender: string;
  bloodPressure: number;
  cholesterol: number;
  glucose: number;
  bmi: number;
  smoking: boolean;
  alcoholConsumption: boolean;
  physicalActivity: number;
  familyHistory: boolean;
}

export interface RiskAssessment {
  score: number;
  level: 'Low' | 'Moderate' | 'High';
  insights: string[];
  contributingFactors: Array<{
    factor: string;
    impact: number;
  }>;
}

export interface FormField {
  name: keyof PatientData;
  label: string;
  type: 'number' | 'select' | 'checkbox' | 'range';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
}