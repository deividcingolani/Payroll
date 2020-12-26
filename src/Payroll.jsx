import React, { Fragment, lazy, Suspense } from "react";
import { format } from "date-fns";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const IncomeDeduction = lazy(() => import("./IncomeDeduction"));

const Payroll = () => {
  const payrolls = [
    {
      SubDeptID: 0,
      SubDept: "",
      DatacenterID: 1,
      DatacenterCode: "10001",
      CompleteName: "Robert Williams",
      Days: 0,
      Gross: 0,
      Net: 0,
    },
    {
      SubDeptID: 0,
      SubDept: "",
      DatacenterID: 3,
      DatacenterCode: "10003",
      CompleteName: "John Jones",
      Days: 0,
      Gross: 0,
      Net: 0,
    },
  ];
  const incomesDeductions = [
    {
      Salary: [
        {
          DatacenterID: 2012,
          Description: "Allowance",
          LineID: 14,
          Amount: 10000,
          Remarks: "",
          SettingsType: "Salary",
        },
        {
          DatacenterID: 2012,
          Description: "Adjustment",
          LineID: 15,
          Amount: 10000,
          Remarks: "",
          SettingsType: "Salary",
        },
      ],
      Deduction: [
        {
          DatacenterID: 2012,
          Description: "SSS",
          LineID: 13,
          Amount: 200,
          Remarks: "",
          SettingsType: "Deduction",
        },
        {
          DatacenterID: 2012,
          Description: "PAGIBIG",
          LineID: 14,
          Amount: 200,
          Remarks: "",
          SettingsType: "Deduction",
        },
        {
          DatacenterID: 2012,
          Description: "HMO",
          LineID: 15,
          Amount: 200,
          Remarks: "",
          SettingsType: "Deduction",
        },
      ],
    },
  ];
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
    payrollsState.forEach((payroll) => {
      payroll?.incomesDeductionsSelected?.selectedIncomes?.forEach(
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
    payrollsState.forEach((payroll) => {
      payroll?.incomesDeductionsSelected?.selectedDeductions?.forEach(
        (selectedDeduction) => {
          PayrollDeductionList.push({
            DatacenterID: selectedDeduction.DatacenterID,
            DatacenterSalaryDeductionLineID: selectedDeduction.LineID,
            Description: selectedDeduction.Description,
            Remarks: selectedDeduction.Remarks,
            Amount: selectedDeduction.Amount,
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
          incomesDeductions={incomesDeductions}
        />
      </Suspense>
      <Fragment>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="body1">Date</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                fullWidth
                format="MM/dd/yyyy"
                inputVariant="outlined"
                variant="outlined"
                size="small"
                style={{
                  background: "#fff",
                }}
                value={selectedDate}
                onChange={(val) => {
                  setSelectedDate(val);
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {payrollsState && payrollsState.length > 0 ? (
              <Fragment>
                <TableContainer component={Paper}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Subdepartment</TableCell>
                        <TableCell>Employee Code</TableCell>
                        <TableCell>Employee Name</TableCell>
                        <TableCell align="right">Days/Hours</TableCell>
                        <TableCell align="right">Gross</TableCell>
                        <TableCell align="right">Net</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {payrollsState.map((payroll, index) => (
                        <TableRow key={index}>
                          <TableCell>{payroll.SubDept}</TableCell>
                          <TableCell>{payroll.DatacenterCode}</TableCell>
                          <TableCell>{payroll.CompleteName}</TableCell>
                          <TableCell align="right">{payroll.Days}</TableCell>
                          <TableCell align="right" data-cy="Gross" name="Gross">
                            {payroll.Gross}
                          </TableCell>
                          <TableCell align="right">{payroll.Net}</TableCell>
                          <TableCell>
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={() => IncomeDeductionDialog(payroll)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={3}></TableCell>
                        <TableCell variant="head" align="right">
                          Total
                        </TableCell>
                        <TableCell align="right">
                          {payrollsState.reduce(
                            (totalGross, gross) =>
                              (totalGross += parseInt(gross.Gross)),
                            0
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {payrollsState.reduce(
                            (totalNet, net) => (totalNet += parseInt(net.Net)),
                            0
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Grid container>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography variant="body1">Remarks</Typography>
                    <TextField
                      defaultValue={remarkValue}
                      onChange={(e) => setRemarkValue(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid container justify="flex-end">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => onSubmitHandler()}
                  >
                    FINAL SAVE
                  </Button>
                </Grid>
              </Fragment>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Fragment>
    </div>
  );
};

export default Payroll;
