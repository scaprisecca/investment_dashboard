import { TaxHistory } from '../types';

// Need to add this new file for financial calculations
export const calculateCapRate = (noi: number, price: number): number => {
  return price > 0 ? (noi / price) : 0;
};

export const calculateCashOnCashReturn = (
  annualCashFlow: number, 
  downPayment: number
): number => {
  return downPayment > 0 ? (annualCashFlow / downPayment) : 0;
};

export const parseTaxHistory = (taxHistoryStr: string): TaxHistory[] => {
  if (!taxHistoryStr) return [];
  
  try {
    const parsed = JSON.parse(taxHistoryStr);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}; 