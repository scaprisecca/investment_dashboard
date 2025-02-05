import { render, screen } from '@testing-library/react';
import { RenovationCalculator } from '../RenovationCalculator';
import userEvent from '@testing-library/user-event';
import type { Property } from '../../types';

describe('RenovationCalculator', () => {
  const mockProperty: Property = {
    property_id: '123',
    address: '123 Test St',
    city: 'Test City',
    state: 'TS',
    zip_code: '12345',
    price: 300000,
    beds: 3,
    baths: 2,
    sqft: 2000,
    year_built: 2000,
    property_type: 'Single Family',
    lot_sqft: 5000,
    estimated_monthly_rent: 2500,
    annual_gross_income: 30000,
    annual_expenses: 5000,
    net_operating_income: 25000,
    cap_rate: 0.08,
    cash_on_cash_roi: 0.12,
    tax_history: [],
    description: 'Test property',
    status: 'Active',
    latitude: 0,
    longitude: 0,
    neighborhoods: ['Test Neighborhood'],
    county: 'Test County',
    stories: 2,
    hoa_fee: 100,
    nearby_schools: ['Test School'],
    primary_photo: 'test.jpg',
    alt_photos: [],
    price_per_sqft: 150,
    monthly_mortgage: 1500,
    annual_cash_flow: 12000,
    down_payment: 60000
  };

  beforeEach(() => {
    render(<RenovationCalculator property={mockProperty} />);
  });

  describe('Initial Rendering', () => {
    it('renders the calculator title', () => {
      expect(screen.getByText('Renovation Calculator')).toBeInTheDocument();
    });

    it('renders all renovation items', () => {
      expect(screen.getByText('Kitchen Remodel')).toBeInTheDocument();
      expect(screen.getByText('Bathroom Remodel')).toBeInTheDocument();
      expect(screen.getByText('New Flooring')).toBeInTheDocument();
      // ... check other items
    });

    it('renders summary section with initial values', () => {
      expect(screen.getByText('Total Renovation Cost:')).toBeInTheDocument();
      expect(screen.getByText('Purchase Price:')).toBeInTheDocument();
      expect(screen.getByText('Estimated ARV:')).toBeInTheDocument();
    });
  });

  describe('Renovation Item Selection', () => {
    it('updates total cost when selecting an item', async () => {
      const kitchenCheckbox = screen.getByRole('checkbox', { name: /Kitchen Remodel/i });
      
      await userEvent.click(kitchenCheckbox);
      
      expect(screen.getByText('$25,000')).toBeInTheDocument();
      expect(kitchenCheckbox).toBeChecked();
    });

    it('updates total cost when selecting multiple items', async () => {
      const kitchenCheckbox = screen.getByRole('checkbox', { name: /Kitchen Remodel/i });
      const bathroomCheckbox = screen.getByRole('checkbox', { name: /Bathroom Remodel/i });
      
      await userEvent.click(kitchenCheckbox);
      await userEvent.click(bathroomCheckbox);
      
      // Total should be $35,000 (Kitchen: $25,000 + Bathroom: $10,000)
      expect(screen.getByText('$35,000')).toBeInTheDocument();
    });
  });

  describe('ARV Calculations', () => {
    it('calculates correct ARV when selecting renovations', async () => {
      const kitchenCheckbox = screen.getByRole('checkbox', { name: /Kitchen Remodel/i });
      
      await userEvent.click(kitchenCheckbox);
      
      // ARV = Property Price + (Renovation Cost * 1.5)
      // 300000 + (25000 * 1.5) = 337500
      expect(screen.getByText('$337,500')).toBeInTheDocument();
    });
  });
}); 