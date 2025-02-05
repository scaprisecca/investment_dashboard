import { Property, PropertyStats } from '../types';
import { calculateCapRate, calculateCashOnCashReturn, parseTaxHistory } from './calculations';

// Helper to clean formatted numbers (removes currency symbols, commas, etc.)
const cleanNumber = (str: string): number => parseFloat(str.replace(/[^0-9.-]+/g, ""));

// Parse the CSV data into Property objects
export const parsePropertyData = (csvData: string): Property[] => {
  const lines = csvData.split('\n');
  const [header, ...dataRows] = lines;

  const properties = dataRows
    .filter(line => line.trim() !== '')
    .map(line => {
      // Use regex to properly split CSV while handling quoted fields
      const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      if (!matches) return null;

      // Remove quotes from fields if present
      const fields = matches.map(field => field.replace(/^"|"$/g, ''));

      // Update field mappings to match CSV structure
      const property_id = fields[1];
      const address = fields[8]; // Use full_street_line instead of combining street fields
      const city = fields[11];
      const state = fields[12];
      const zip_code = fields[13];
      const list_price = cleanNumber(fields[20]) || 0;
      const sqft = cleanNumber(fields[17]) || 0;
      const beds = parseFloat(fields[14]) || 0;
      const full_baths = parseFloat(fields[15]) || 0;
      const half_baths = parseFloat(fields[16]) || 0;
      const year_built = parseFloat(fields[18]) || 0;
      const property_type = fields[7]; // style field
      const status = fields[5];
      const latitude = parseFloat(fields[33]) || 0;
      const longitude = parseFloat(fields[34]) || 0;
      const lot_sqft = parseFloat(fields[31]) || 0; // Add lot_sqft
      const price_per_sqft = cleanNumber(fields[32]) || 0; // Use provided price_per_sqft
      const estimated_monthly_rent = parseFloat(fields[66]) || 0;
      const annual_gross_income = parseFloat(fields[67]) || 0;
      const annual_expenses = parseFloat(fields[68]) || 0;
      const net_operating_income = parseFloat(fields[69]) || 0;
      const monthly_mortgage = parseFloat(fields[70]) || 0;
      const annual_cash_flow = parseFloat(fields[71]) || 0;
      const cash_on_cash_roi = parseFloat(fields[72]) || 0;
      const down_payment = parseFloat(fields[73]) || 0; // Add down_payment
      const primary_photo = fields[64]; // Add primary photo URL
      const alt_photos = fields[65] ? fields[65].split(', ') : []; // Add additional photos
      const neighborhoods = fields[35] ? fields[35].split(', ') : []; // Add neighborhoods
      const county = fields[36]; // Add county
      const stories = parseFloat(fields[38]) || 0; // Add stories
      const hoa_fee = parseFloat(fields[39]) || 0; // Add HOA fee
      const description = fields[6]; // Add property description
      const nearby_schools = fields[63] ? fields[63].split(', ') : []; // Add schools
      const cap_rate = calculateCapRate(net_operating_income, list_price);
      const tax_history = parseTaxHistory(fields[29]);

      return {
        property_id,
        address,
        city,
        state,
        zip_code,
        price: list_price,
        sqft,
        beds,
        baths: full_baths + (half_baths * 0.5),
        year_built,
        property_type,
        status,
        latitude,
        longitude,
        price_per_sqft,
        lot_sqft,
        estimated_monthly_rent,
        annual_gross_income,
        annual_expenses,
        net_operating_income,
        monthly_mortgage,
        annual_cash_flow,
        cash_on_cash_roi,
        cap_rate,
        tax_history,
        down_payment,
        primary_photo,
        alt_photos,
        neighborhoods,
        county,
        stories,
        hoa_fee,
        description,
        nearby_schools
      };
    })
    .filter((prop): prop is Property => {
      return prop !== null && 
             typeof prop === 'object' && 
             typeof prop.property_id === 'string' &&
             typeof prop.price === 'number';
    });

  return properties;
};

// Calculate statistics from property data
export const calculateStats = (properties: Property[]): PropertyStats => {
  const validProperties = properties.filter(prop => prop.price > 0 && prop.sqft > 0);
  const totalProperties = validProperties.length;

  if (totalProperties === 0) {
    return {
      totalProperties: 0,
      averagePrice: 0,
      averageSqft: 0,
      averagePricePerSqft: 0,
      propertyTypes: {},
      averageCapRate: 0,
      averageCashOnCashReturn: 0,
      averageGrossRentMultiplier: 0,
      averageNetOperatingIncome: 0,
      bestPerformingProperties: [],
      worstPerformingProperties: []
    };
  }

  const totalPrice = validProperties.reduce((sum, prop) => sum + prop.price, 0);
  const totalSqft = validProperties.reduce((sum, prop) => sum + prop.sqft, 0);
  const totalNOI = validProperties.reduce((sum, prop) => sum + prop.net_operating_income, 0);
  
  // Calculate average price per square foot using weighted total
  const averagePricePerSqft = totalPrice / totalSqft;

  // Calculate averages
  const avgCapRate = validProperties.reduce((sum, prop) => sum + (prop.cap_rate || 0), 0) / totalProperties;
  const avgCashOnCash = validProperties.reduce((sum, prop) => sum + prop.cash_on_cash_roi, 0) / totalProperties;

  // Calculate property types distribution
  const propertyTypes = properties.reduce((acc, prop) => {
    const type = prop.property_type || 'Unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  // Sort properties by ROI for best/worst performing
  const sortedProperties = [...validProperties].sort((a, b) => b.cash_on_cash_roi - a.cash_on_cash_roi);
  const bestPerforming = sortedProperties.slice(0, 5);
  const worstPerforming = sortedProperties.slice(-5).reverse();

  return {
    totalProperties,
    averagePrice: totalPrice / totalProperties,
    averageSqft: totalSqft / totalProperties,
    averagePricePerSqft,
    propertyTypes,
    averageCapRate: avgCapRate,
    averageCashOnCashReturn: avgCashOnCash,
    averageGrossRentMultiplier: totalPrice / (validProperties.reduce((sum, prop) => sum + prop.estimated_monthly_rent * 12, 0) / totalProperties),
    averageNetOperatingIncome: totalNOI / totalProperties,
    bestPerformingProperties: bestPerforming,
    worstPerformingProperties: worstPerforming
  };
};