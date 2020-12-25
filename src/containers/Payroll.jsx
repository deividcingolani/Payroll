import React, { Suspense } from "react";
import { incomesDeductions } from "../utils/data";
import { TablePayroll } from "../components";
import { IncomeDeduction } from "./LazyComponents";
import { payrolls } from "../utils/data";
import { format } from "date-fns";
const Payroll = () => {
  const [openIncomeDeductionDialog, setIncomeDeductionDialog] = React.useState(
    false
  );
  const [remarkValue, setRemarkValue] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(
    format(new Date(), "MM/dd/yyyy")
  );
  const [selectedDetails, setSelectedDetails] = React.useState(null);
  const [payrollsState, setPayrollsState] = React.useState(payrolls);
  const [
    incomesDeductionsSelected,
    setIncomesDeductionsSelected,
  ] = React.useState(null);

  const IncomeDeductionDialog = (payroll) => {
    setSelectedDetails({ ...payroll, incomesDeductions });
    setIncomeDeductionDialog(true);
    setIncomesDeductionsSelected(payroll.incomesDeductionsSelected);
  };

  const onSubmitHandler = () => {
    const PayrollLineList = payrollsState.map((payroll) => {
      return {
        DatacenterID: payroll.DatacenterID,
        DatacenterCode: payroll.DatacenterCode,
        CompleteName: payroll.CompleteName,
        TotalHours: payroll.Days,
        Gross: payroll.Gross,
        Net: payroll.Net,
      };
    });
    const PayrollSalaryList = [];
    payrollsState.map((payroll) => {
      payroll?.incomesDeductionsSelected?.selectedIncomes?.map(
        (selectedIncome) => {
          PayrollSalaryList.push({
            DatacenterID: selectedIncome.DatacenterID,
            DatacenterSalarySettingsLineID: selectedIncome.LineID,
            Description: selectedIncome.Description,
            Remarks: selectedIncome.Remarks,
            Amount: selectedIncome.Amount,
          });
        }
      );
    });

    const PayrollDeductionList = [];
    payrollsState.map((payroll) => {
      payroll?.incomesDeductionsSelected?.selectedDeductions?.map(
        (selectedIncome) => {
          PayrollDeductionList.push({
            DatacenterID: selectedIncome.DatacenterID,
            DatacenterSalarySettingsLineID: selectedIncome.LineID,
            Description: selectedIncome.Description,
            Remarks: selectedIncome.Remarks,
            Amount: selectedIncome.Amount,
          });
        }
      );
    });
    console.log({
      Remarks: remarkValue,
      Date: selectedDate,
      PayrollLineList,
      PayrollSalaryList,
      PayrollDeductionList,
    });
  };
  return (
    <div>
      <Suspense fallback={<h3>Loading...</h3>}>
        <IncomeDeduction
          open={openIncomeDeductionDialog}
          setSelectedDetails={setSelectedDetails}
          selectedDetails={selectedDetails}
          openDialog={() => setIncomeDeductionDialog(false)}
          onClose={() => setIncomeDeductionDialog(false)}
          setPayrollsState={setPayrollsState}
          payrollsState={payrollsState}
          incomesDeductionsSelected={incomesDeductionsSelected}
          setIncomesDeductionsSelected={setIncomesDeductionsSelected}
        />
      </Suspense>

      <TablePayroll
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        IncomeDeductionDialog={IncomeDeductionDialog}
        payrollsState={payrollsState}
        remarkValue={remarkValue}
        setRemarkValue={setRemarkValue}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default Payroll;
