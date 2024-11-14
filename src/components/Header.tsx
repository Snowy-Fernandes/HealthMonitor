import React from 'react';
import { Activity, Heart, AlertCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">HealthPredict AI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-rose-500" />
              <span className="text-sm text-gray-600">Risk Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span className="text-sm text-gray-600">Early Detection</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}