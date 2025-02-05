import '@testing-library/jest-dom';

// Mock the formatCurrency utility
jest.mock('../utils/formatters', () => ({
  formatCurrency: (value: number) => `$${value.toLocaleString()}`,
})); 