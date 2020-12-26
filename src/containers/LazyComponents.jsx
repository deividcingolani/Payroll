// Lazy Load
import { lazy } from 'react';

export const IncomeDeduction = lazy(() =>
  import('../components/IncomeDeductionDialog/IncomeDeductionDialog')
);

export const IncomeDialog = lazy(() =>
  import('../components/DialogItems/DialogItems')
);

export const DeductionDialog = lazy(() =>
  import('../components/DialogItems/DialogItems')
);
