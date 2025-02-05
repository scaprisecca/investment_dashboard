const PropertyAnalysis: React.FC<{property: Property}> = ({property}) => {
  return (
    <Card>
      <Title>Property Analysis</Title>
      <Grid numItems={2} className="gap-4">
        <FinancialMetrics property={property} />
        <RenovationCalculator property={property} />
        <MortgageCalculator property={property} />
        <TaxHistory property={property} />
        <ComparableProperties property={property} />
        <RentalAnalysis property={property} />
      </Grid>
    </Card>
  );
}; 