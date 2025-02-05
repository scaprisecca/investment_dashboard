import React, { useState, useMemo } from 'react';
import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Select,
  SelectItem,
  Grid,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from '@tremor/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Property, PropertyStats } from '../types';
import { Home, DollarSign, Ruler, TrendingUp, Calculator } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface DashboardProps {
  properties: Property[];
  stats: PropertyStats;
}

export const Dashboard: React.FC<DashboardProps> = ({ properties, stats }) => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesType = selectedPropertyType === 'all' || 
        property.property_type === selectedPropertyType;
      
      const price = property.price;
      const matchesPrice = selectedPriceRange === 'all' ||
        (selectedPriceRange === '0-200k' && price <= 200000) ||
        (selectedPriceRange === '200k-300k' && price > 200000 && price <= 300000) ||
        (selectedPriceRange === '300k+' && price > 300000);

      return matchesType && matchesPrice;
    });
  }, [properties, selectedPropertyType, selectedPriceRange]);

  const priceRangeData = useMemo(() => {
    const ranges = {
      '0-150k': 0,
      '150k-200k': 0,
      '200k-250k': 0,
      '250k+': 0
    };

    filteredProperties.forEach(property => {
      if (property.price <= 150000) ranges['0-150k']++;
      else if (property.price <= 200000) ranges['150k-200k']++;
      else if (property.price <= 250000) ranges['200k-250k']++;
      else ranges['250k+']++;
    });

    return Object.entries(ranges).map(([range, count]) => ({
      range,
      count
    }));
  }, [filteredProperties]);

  const scatterData = useMemo(() => {
    return filteredProperties.map(property => ({
      sqft: property.sqft,
      price: property.price,
      address: property.address
    }));
  }, [filteredProperties]);

  const pieData = useMemo(() => {
    return Object.entries(stats.propertyTypes).map(([type, count]) => ({
      name: type,
      value: count
    }));
  }, [stats.propertyTypes]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Real Estate Analytics Dashboard
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card decoration="top" decorationColor="blue">
              <div className="flex items-center">
                <Home className="w-6 h-6 text-blue-500 mr-2" />
                <div>
                  <Text>Total Properties</Text>
                  <Title>{stats.totalProperties}</Title>
                </div>
              </div>
            </Card>

            <Card decoration="top" decorationColor="green">
              <div className="flex items-center">
                <DollarSign className="w-6 h-6 text-green-500 mr-2" />
                <div>
                  <Text>Average Price</Text>
                  <Title>
                    {formatCurrency(stats.averagePrice)}
                  </Title>
                </div>
              </div>
            </Card>

            <Card decoration="top" decorationColor="amber">
              <div className="flex items-center">
                <Ruler className="w-6 h-6 text-amber-500 mr-2" />
                <div>
                  <Text>Average Sqft</Text>
                  <Title>{Math.round(stats.averageSqft).toLocaleString()}</Title>
                </div>
              </div>
            </Card>

            <Card decoration="top" decorationColor="rose">
              <div className="flex items-center">
                <TrendingUp className="w-6 h-6 text-rose-500 mr-2" />
                <div>
                  <Text>Avg Price/Sqft</Text>
                  <Title>${Math.round(stats.averagePricePerSqft)}</Title>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Select
              value={selectedPropertyType}
              onValueChange={setSelectedPropertyType}
              placeholder="Select Property Type"
            >
              <SelectItem value="all">All Types</SelectItem>
              {Object.keys(stats.propertyTypes).map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </Select>

            <Select
              value={selectedPriceRange}
              onValueChange={setSelectedPriceRange}
              placeholder="Select Price Range"
            >
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-200k">$0 - $200k</SelectItem>
              <SelectItem value="200k-300k">$200k - $300k</SelectItem>
              <SelectItem value="300k+">$300k+</SelectItem>
            </Select>
          </div>

          <TabGroup>
            <TabList>
              <Tab>Price Distribution</Tab>
              <Tab>Property Types</Tab>
              <Tab>Price vs. Size</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Card>
                  <Title>Price Range Distribution</Title>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={priceRangeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#0088FE" name="Number of Properties" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </TabPanel>

              <TabPanel>
                <Card>
                  <Title>Property Types Distribution</Title>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </TabPanel>

              <TabPanel>
                <Card>
                  <Title>Price vs. Square Footage</Title>
                  <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart>
                      <CartesianGrid />
                      <XAxis type="number" dataKey="sqft" name="Square Feet" />
                      <YAxis type="number" dataKey="price" name="Price" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter name="Properties" data={scatterData} fill="#8884d8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </Card>
              </TabPanel>
            </TabPanels>
          </TabGroup>

          <InvestmentMetrics properties={properties} stats={stats} />
          <PropertyComparison properties={properties} />
        </div>
      </div>
    </div>
  );
};

const formatPercentage = (value: number): string => `${(value * 100).toFixed(1)}%`;

const InvestmentMetrics: React.FC<{properties: Property[]; stats: PropertyStats}> = ({properties, stats}) => {
  return (
    <Card>
      <Title>Key Investment Metrics</Title>
      <Grid numItems={3} className="gap-4">
        <Card decoration="top" decorationColor="blue">
          <div className="flex items-center">
            <TrendingUp className="w-6 h-6 text-blue-500 mr-2" />
            <div>
              <Text>Average Cap Rate</Text>
              <Title>{formatPercentage(stats.averageCapRate)}</Title>
            </div>
          </div>
        </Card>
        
        <Card decoration="top" decorationColor="green">
          <div className="flex items-center">
            <DollarSign className="w-6 h-6 text-green-500 mr-2" />
            <div>
              <Text>Average Cash on Cash ROI</Text>
              <Title>{formatPercentage(stats.averageCashOnCashReturn)}</Title>
            </div>
          </div>
        </Card>
        
        <Card decoration="top" decorationColor="amber">
          <div className="flex items-center">
            <Calculator className="w-6 h-6 text-amber-500 mr-2" />
            <div>
              <Text>Average NOI</Text>
              <Title>{formatCurrency(stats.averageNetOperatingIncome)}</Title>
            </div>
          </div>
        </Card>
      </Grid>
    </Card>
  );
};

const PropertyComparison: React.FC<{properties: Property[]}> = ({properties}) => {
  return (
    <Card>
      <Title>Property Comparison</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Address</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Cap Rate</TableHeaderCell>
            <TableHeaderCell>Cash Flow</TableHeaderCell>
            <TableHeaderCell>ROI</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.property_id}>
              <TableCell>
                {`${property.address}, ${property.city}, ${property.state} ${property.zip_code}`}
              </TableCell>
              <TableCell>{formatCurrency(property.price)}</TableCell>
              <TableCell>{formatPercentage(property.cap_rate || 0)}</TableCell>
              <TableCell>{formatCurrency(property.annual_cash_flow)}</TableCell>
              <TableCell>{formatPercentage(property.cash_on_cash_roi)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};