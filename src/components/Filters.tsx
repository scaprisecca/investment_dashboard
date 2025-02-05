import React, { useState } from 'react';
import { FilterCriteria } from '../types';
import { Card } from './ui/Card';
import { Title } from './ui/Title';
import { RangeSlider } from './ui/RangeSlider';
import { Select } from './ui/Select';

interface FilterProps {
  onFilterChange: (filters: FilterCriteria) => void;
}

const AdvancedFilters: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [minCapRate, setMinCapRate] = useState(0);
  const [maxCapRate, setMaxCapRate] = useState(20);
  const [minCashFlow, setMinCashFlow] = useState(0);
  const [maxCashFlow, setMaxCashFlow] = useState(5000);
  const [condition, setCondition] = useState('All');
  const [strategy, setStrategy] = useState('All');

  const handleCapRateChange = (values: [number, number]) => {
    setMinCapRate(values[0]);
    setMaxCapRate(values[1]);
    updateFilters();
  };

  const handleCashFlowChange = (values: [number, number]) => {
    setMinCashFlow(values[0]);
    setMaxCashFlow(values[1]);
    updateFilters();
  };

  const handleConditionChange = (value: string) => {
    setCondition(value);
    updateFilters();
  };

  const handleStrategyChange = (value: string) => {
    setStrategy(value);
    updateFilters();
  };

  const updateFilters = () => {
    // Implementation of updateFilters
  };

  return (
    <Card>
      <Title>Investment Criteria</Title>
      <div className="grid grid-cols-2 gap-4">
        <RangeSlider
          label="Cap Rate Range"
          min={0}
          max={20}
          step={0.5}
          value={[minCapRate, maxCapRate]}
          onChange={handleCapRateChange}
        />
        <RangeSlider
          label="Cash Flow Range"
          min={0}
          max={5000}
          step={100}
          value={[minCashFlow, maxCashFlow]}
          onChange={handleCashFlowChange}
        />
        <Select
          label="Property Condition"
          options={['All', 'Turn-key', 'Needs Work', 'Fixer-Upper']}
          value={condition}
          onChange={handleConditionChange}
        />
        <Select
          label="Investment Strategy"
          options={['All', 'Cash Flow', 'Appreciation', 'Value-Add']}
          value={strategy}
          onChange={handleStrategyChange}
        />
      </div>
    </Card>
  );
}; 