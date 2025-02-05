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