export interface Property {
  property_id: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  sqft: number;
  beds: number;
  baths: number;
  year_built: number;
  property_type: string;
  status: string;
  latitude: number;
  longitude: number;
  price_per_sqft: number;
  lot_sqft: number;
  estimated_monthly_rent: number;
  annual_gross_income: number;
  annual_expenses: number;
  net_operating_income: number;
  monthly_mortgage: number;
  annual_cash_flow: number;
  cash_on_cash_roi: number;
  cap_rate?: number;
  tax_history: TaxHistory[];
  down_payment: number;
  primary_photo: string;
  alt_photos: string[];
  neighborhoods: string[];
  county: string;
  stories: number;
  hoa_fee: number;
  description: string;
  nearby_schools: string[];
}

export interface PropertyStats extends BasePropertyStats {
  // Financial metrics
  averageCapRate: number;
  averageCashOnCashReturn: number;
  averageGrossRentMultiplier: number;
  averageNetOperatingIncome: number;
  bestPerformingProperties: Property[]; // Top properties by ROI
  worstPerformingProperties: Property[]; // Properties that may need attention
}

export interface BasePropertyStats {
  totalProperties: number;
  averagePrice: number;
  averageSqft: number;
  averagePricePerSqft: number;
  propertyTypes: { [key: string]: number };
}

export interface TaxHistory {
  year: number;
  tax: number;
  assessment: {
    building: number;
    land: number;
    total: number;
  };
}

export interface FilterCriteria {
  minCapRate: number;
  maxCapRate: number;
  minCashFlow: number;
  maxCashFlow: number;
  condition: string;
  strategy: string;
}