import React from 'react';
import { Property } from '../types';
import { Card } from './ui/Card';

interface RentalAnalysisProps {
  property: Property;
}

export const RentalAnalysis: React.FC<RentalAnalysisProps> = ({ property }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Rental Analysis</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Estimated Monthly Rent</span>
          <span>${property.estimated_monthly_rent.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Annual Gross Income</span>
          <span>${property.annual_gross_income.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Net Operating Income</span>
          <span>${property.net_operating_income.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Cap Rate</span>
          <span>{(property.cap_rate || 0).toFixed(2)}%</span>
        </div>
      </div>
    </Card>
  );
}; 