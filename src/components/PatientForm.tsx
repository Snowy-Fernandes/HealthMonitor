import React from 'react';
import { ClipboardList } from 'lucide-react';
import { PatientData, FormField } from '../types';

const formFields: FormField[] = [
  { name: 'age', label: 'Age', type: 'number', required: true, min: 0, max: 120 },
  { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
  { name: 'bloodPressure', label: 'Blood Pressure (systolic)', type: 'number', required: true, min: 70, max: 200 },
  { name: 'cholesterol', label: 'Cholesterol (mg/dL)', type: 'number', required: true, min: 100, max: 300 },
  { name: 'glucose', label: 'Blood Glucose (mg/dL)', type: 'number', required: true, min: 70, max: 200 },
  { name: 'bmi', label: 'BMI', type: 'number', required: true, min: 15, max: 50, step: 0.1 },
  { name: 'smoking', label: 'Current Smoker', type: 'checkbox' },
  { name: 'alcoholConsumption', label: 'Regular Alcohol Consumption', type: 'checkbox' },
  { name: 'physicalActivity', label: 'Physical Activity (hours/week)', type: 'range', min: 0, max: 10, step: 0.5 },
  { name: 'familyHistory', label: 'Family History of Disease', type: 'checkbox' },
];

interface Props {
  onSubmit: (data: PatientData) => void;
}

export default function PatientForm({ onSubmit }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data: Partial<PatientData> = {};
    formFields.forEach(field => {
      if (field.type === 'checkbox') {
        data[field.name] = formData.get(field.name as string) === 'on';
      } else if (field.type === 'number' || field.type === 'range') {
        data[field.name] = Number(formData.get(field.name as string));
      } else {
        data[field.name] = formData.get(field.name as string) as string;
      }
    });

    onSubmit(data as PatientData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <ClipboardList className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-900">Patient Information</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formFields.map((field) => (
            <div key={field.name} className={field.type === 'checkbox' ? 'col-span-2' : ''}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  required={field.required}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : field.type === 'checkbox' ? (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name={field.name}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">{field.label}</span>
                </div>
              ) : field.type === 'range' ? (
                <div className="space-y-2">
                  <input
                    type="range"
                    name={field.name}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{field.min}h</span>
                    <span>{field.max}h</span>
                  </div>
                </div>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Analyze Risk
          </button>
        </div>
      </form>
    </div>
  );
}