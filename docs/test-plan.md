Test Plan for RenovationCalculator
1. Component Rendering Tests
Test that the component renders without crashing
Verify all initial UI elements are present:
Title with wrench icon
All renovation items (8 checkboxes)
Summary section with costs and ARV

2. Renovation Items Tests -- In Progress
Verify initial state of renovation items:
All items should be unselected initially
Each item should display correct name and cost
Test checkbox interactions:
Selecting a single item
Selecting multiple items
Unselecting items
Verify correct styling changes when items are selected/unselected

3. Calculations Tests
Test total cost calculations:
Should be 0 when no items selected
Should sum correctly when one item is selected
Should sum correctly when multiple items are selected
Should update when items are unselected
Test ARV calculations:
Should equal property price when no renovations selected
Should calculate correctly (price + totalCost 1.5) when items are selected
Should update when selections change

4. Props and Integration Tests
Test with different property price values
Test property price updates
Test edge cases:
Very high property prices
Very low property prices
Zero property price

5. User Interaction Tests
Test checkbox click behavior
Test keyboard navigation and accessibility
Test that labels are clickable and toggle checkboxes

6. Formatting Tests
Verify currency formatting is correct
Test large numbers format correctly
Test zero values format correctly
Here's a suggested implementation approach:
Set up testing environment with Jest and React Testing Library
Create test files structure
Implement tests in order of priority:
Basic rendering
Core functionality (selections and calculations)
Edge cases and error handling
User interactions
Integration tests