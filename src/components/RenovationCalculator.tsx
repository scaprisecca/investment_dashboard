import React, { useState } from 'react';
import { Property } from '../types';
import { Card } from './ui/Card';
import { formatCurrency } from '../utils/formatters';
import { Wrench } from 'lucide-react';
interface RenovationCalculatorProps {
  property: Property;
}

interface RenovationItem {
  name: string;
  cost: number;
  selected: boolean;
}

export const RenovationCalculator: React.FC<RenovationCalculatorProps> = ({ property }) => {
  const [renovationItems, setRenovationItems] = useState<RenovationItem[]>([
    { name: 'Kitchen Remodel', cost: 25000, selected: false },
    { name: 'Bathroom Remodel', cost: 10000, selected: false },
    { name: 'New Flooring', cost: 8000, selected: false },
    { name: 'Paint (Interior)', cost: 3000, selected: false },
    { name: 'Paint (Exterior)', cost: 4000, selected: false },
    { name: 'HVAC Replacement', cost: 7000, selected: false },
    { name: 'Roof Repair', cost: 8000, selected: false },
    { name: 'Windows Replacement', cost: 12000, selected: false },
  ]);

  const totalCost = renovationItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.cost, 0);

  const estimatedArv = property.price + (totalCost * 1.5); // Estimated After Repair Value

  const toggleItem = (index: number) => {
    setRenovationItems(items =>
      items.map((item, i) =>
        i === index ? { ...item, selected: !item.selected } : item
      )
    );
  };

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <Wrench className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold">Renovation Calculator</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {renovationItems.map((item, index) => (
            <label
              key={item.name}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors
                ${item.selected ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'} border`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleItem(index)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium">{item.name}</span>
              </div>
              <span className="text-sm text-gray-600">{formatCurrency(item.cost)}</span>
            </label>
          ))}
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Total Renovation Cost:</span>
            <span className="font-bold text-blue-600">{formatCurrency(totalCost)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Purchase Price:</span>
            <span>{formatCurrency(property.price)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-medium">Estimated ARV:</span>
            <span className="font-bold text-green-600">{formatCurrency(estimatedArv)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}; 