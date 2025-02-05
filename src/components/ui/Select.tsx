import React from 'react';

interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ label, options, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}; 