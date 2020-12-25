import React, { lazy, Suspense } from "react";
import { incomesDeductions } from "../utils/data";
import { TablePayroll } from "../components";

// Lazy Load
const IncomeDeduction = lazy(() =>
  import("../components/IncomeDeductionDialog/IncomeDeductionDialog")
);

const IncomeDialog = lazy(() =>
  import("../components/IncomeDialog/IncomeDialog")
);

const DeductionDialog = lazy(() =>
  import("../components/DeductionDialog/DeductionDialog")
);

const Payroll = () => {
  const [openIncomeDeductionDialog, setIncomeDeductionDialog] = React.useState(
    false
  );
  const [openIncomeDialog, setOpenIncomeDialog] = React.useState(false);
  const [openDeductionDialog, setOpenDeductionDialog] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedDetails, setSelectedDetails] = React.useState(null);

  const IncomeDeductionDialog = (payroll) => {
    setSelectedDetails({ ...payroll, incomesDeductions });
    setIncomeDeductionDialog(true);
  };

  return (
    <div>
      <Suspense fallback={<h3>Loading...</h3>}>
        <IncomeDeduction
          open={openIncomeDeductionDialog}
          completeName={selectedDetails?.name}
          openDialog={() => setIncomeDeductionDialog(false)}
          onClose={() => setIncomeDeductionDialog(false)}
          openIncomeDialog={() => setOpenIncomeDialog(true)}
          openDeductionDialog={() => setOpenDeductionDialog(true)}
        />
      </Suspense>
      <Suspense fallback={<h3>Loading...</h3>}>
        <IncomeDialog
          open={openIncomeDialog}
          onClose={() => setOpenIncomeDialog(false)}
          openIncomeDeductionDialog={() => setIncomeDeductionDialog(true)}
        />
      </Suspense>
      <Suspense fallback={<h3>Loading...</h3>}>
        <DeductionDialog
          open={openDeductionDialog}
          onClose={() => setOpenDeductionDialog(false)}
          openIncomeDeductionDialog={() => setIncomeDeductionDialog(true)}
        />
      </Suspense>

      <TablePayroll
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        IncomeDeductionDialog={IncomeDeductionDialog}
      />
    </div>
  );
};

export default Payroll;
