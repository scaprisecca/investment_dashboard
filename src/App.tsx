import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { parsePropertyData, calculateStats } from './utils/propertyData';
import { Property, PropertyStats } from './types';

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [stats, setStats] = useState<PropertyStats | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target?.result as string;
      const parsedProperties = parsePropertyData(csvData);
      const calculatedStats = calculateStats(parsedProperties);
      
      setProperties(parsedProperties);
      setStats(calculatedStats);
    };
    reader.readAsText(file);
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      {properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Property Dashboard</h1>
            <label 
              htmlFor="csvFile"
              className="block w-full text-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
            >
              <span className="text-gray-600">Select CSV File</span>
              <input
                type="file"
                id="csvFile"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        <Dashboard properties={properties} stats={stats!} />
      )}
    </div>
  );
}

export default App;