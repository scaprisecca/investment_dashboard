import { Card } from './ui/Card';
import { Title } from './ui/Title';
import { Tabs } from './ui/Tabs';
import { TabPanel } from './ui/TabPanel';
import { PriceHistoryChart } from './PriceHistoryChart';
import { RentTrendsChart } from './RentTrendsChart';
import { PropertyHeatMap } from './PropertyHeatMap';
import { NeighborhoodDemographics } from './NeighborhoodDemographics';
import { Property } from '../types';

const MarketAnalysis: React.FC<{properties: Property[]}> = ({properties}) => {
  return (
    <Card>
      <Title>Market Analysis</Title>
      <Tabs>
        <TabPanel value="trends">
          <PriceHistoryChart properties={properties} />
          <RentTrendsChart properties={properties} />
        </TabPanel>
        <TabPanel value="heatmap">
          <PropertyHeatMap 
            properties={properties}
            metric="price_per_sqft"
          />
        </TabPanel>
        <TabPanel value="demographics">
          <NeighborhoodDemographics properties={properties} />
        </TabPanel>
      </Tabs>
    </Card>
  );
}; 