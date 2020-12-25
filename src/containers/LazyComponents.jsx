// Lazy Load
import { lazy } from "react";

export const IncomeDeduction = lazy(() =>
  import("../components/IncomeDeductionDialog/IncomeDeductionDialog")
);

export const IncomeDialog = lazy(() =>
  import("../components/IncomeDialog/IncomeDialog")
);

export const DeductionDialog = lazy(() =>
  import("../components/DeductionDialog/DeductionDialog")
);
