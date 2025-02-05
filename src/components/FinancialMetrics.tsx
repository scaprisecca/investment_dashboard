import React from 'react';
import { Property } from '../types';
import { Card } from './ui/Card';
import { DollarSign, TrendingUp, PiggyBank, Building } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface FinancialMetricsProps {
  property: Property;
}

export const FinancialMetrics: React.FC<FinancialMetricsProps> = ({ property }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Financial Analysis</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Monthly Cash Flow</span>
          </div>
          <span className="text-lg font-bold text-blue-700">
            {formatCurrency(property.annual_cash_flow / 12)}
          </span>
        </div>

        <div className="p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-900">Cap Rate</span>
          </div>
          <span className="text-lg font-bold text-green-700">
            {((property.cap_rate || 0) * 100).toFixed(2)}%
          </span>
        </div>

        <div className="p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <PiggyBank className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">Cash on Cash ROI</span>
          </div>
          <span className="text-lg font-bold text-purple-700">
            {(property.cash_on_cash_roi * 100).toFixed(2)}%
          </span>
        </div>

        <div className="p-3 bg-amber-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Building className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-900">Price per Sqft</span>
          </div>
          <span className="text-lg font-bold text-amber-700">
            {formatCurrency(property.price_per_sqft)}
          </span>
        </div>
      </div>
    </Card>
  );
}; 