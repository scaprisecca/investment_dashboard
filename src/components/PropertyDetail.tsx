import { Card } from './ui/Card';
import { Title } from './ui/Title';
import { Grid } from './ui/Grid';
import { FinancialMetrics } from './FinancialMetrics';
import { RenovationCalculator } from './RenovationCalculator';
import { MortgageCalculator } from './MortgageCalculator';
import { TaxHistory } from './TaxHistory';
import { ComparableProperties } from './ComparableProperties';
import { RentalAnalysis } from './RentalAnalysis';
import { Property } from '../types';

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