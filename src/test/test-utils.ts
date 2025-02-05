import { render as rtlRender } from '@testing-library/react';
import { ReactElement } from 'react';

function render(ui: ReactElement, options = {}) {
  return rtlRender(ui, {
    ...options,
  });
}

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { render }; 