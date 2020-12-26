import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { Fragment, lazy, Suspense, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import * as PropTypes from "prop-types";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const IncomeDialog = lazy(() => import("./AddIncome"));

const DeductionDialog = lazy(() => import("./AddDeduction"));

const IncomeDeduction = ({
  onClose,
  open,
  selectedDetails,
  setSelectedDetails,
  setPayrollsState,
  payrollsState,
  incomesDeductionsSelected,
  incomesDeductions,
}) => {
  const [openIncomeDialog, setOpenIncomeDialog] = React.useState(false);
  const [openDeductionDialog, setOpenDeductionDialog] = React.useState(false);
  const [initialIncomes, setInitialIncomes] = React.useState(
    incomesDeductions[0]["Salary"]
  );
  const [initialDeductions, setInitialDeductions] = React.useState(
    incomesDeductions[0]["Deduction"]
  );
  const [selectedIncomes, setSelectedIncomes] = React.useState([]);
  const [selectedDeductions, setSelectedDeductions] = React.useState([]);

  const AddIncome = (income) => {
    const newSelectedIncome = [...selectedIncomes, income];
    setSelectedIncomes(newSelectedIncome);
    const newInitialIncome = initialIncomes.filter(
      (initialIncome) => initialIncome.LineID !== income.LineID
    );
    setInitialIncomes(newInitialIncome);
  };

  const DeleteIncome = (income) => {
    const filterSelectedIncomes = selectedIncomes.filter(
      (incomeFilter) => income.Description !== incomeFilter.Description
    );
    setSelectedIncomes(filterSelectedIncomes);

    const newInitialIncome = [...initialIncomes, income];
    setInitialIncomes(newInitialIncome);
  };

  const AddDeduction = (deduction) => {
    const newSelectedDeduction = [...selectedDeductions, deduction];
    setSelectedDeductions(newSelectedDeduction);
    const newInitialDeduction = initialDeductions.filter(
      (initialDeduction) => initialDeduction.LineID !== deduction.LineID
    );
    setInitialDeductions(newInitialDeduction);
  };

  const DeleteDeduction = (deduction) => {
    const filterSelectedDeduction = selectedDeductions.filter(
      (deductionFilter) => deduction.Description !== deductionFilter.Description
    );
    setSelectedDeductions(filterSelectedDeduction);

    const newInitialDeduction = [...initialDeductions, deduction];
    setInitialDeductions(newInitialDeduction);
  };
  const handlerSave = () => {
    const sumGross = selectedIncomes.reduce(
      (gross, income) => parseInt(income.Amount) + gross,
      0
    );
    const sumNet = selectedDeductions.reduce(
      (net, deduction) => parseInt(deduction.Amount) + net,
      0
    );

    const payrollSelected = payrollsState.filter(
      (payroll) => payroll.CompleteName === selectedDetails.CompleteName
    );
    const payrolls = payrollsState.filter(
      (payroll) => payroll.CompleteName !== selectedDetails.CompleteName
    );
    const newPayroll = {
      ...payrollSelected[0],
      Gross: sumGross,
      Net: sumNet,
      incomesDeductionsSelected: {
        selectedIncomes,
        selectedDeductions,
      },
    };
    const newStatePayroll = [...payrolls, { ...newPayroll }].sort((a, b) => {
      const nameA = a.CompleteName.toUpperCase(); // ignore upper and lowercase
      const nameB = b.CompleteName.toUpperCase(); // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    console.log(newStatePayroll);
    setPayrollsState(newStatePayroll);
    setSelectedDetails(null);
    onClose();
  };

  useEffect(() => {
    if (selectedDetails?.CompleteName && incomesDeductionsSelected) {
      setSelectedIncomes(incomesDeductionsSelected.selectedIncomes);
      setSelectedDeductions(incomesDeductionsSelected.selectedDeductions);
    } else {
      setSelectedIncomes([]);
      setSelectedDeductions([]);
    }
  }, [selectedDetails, incomesDeductionsSelected]);
  return (
    <>
      <Suspense fallback={<h3>Loading...</h3>}>
        <IncomeDialog
          open={openIncomeDialog}
          onClose={() => setOpenIncomeDialog(false)}
          listOptions={initialIncomes}
          AddItems={AddIncome}
          name={"Income"}
        />
      </Suspense>

      <Suspense fallback={<h3>Loading...</h3>}>
        <DeductionDialog
          open={openDeductionDialog}
          onClose={() => setOpenDeductionDialog(false)}
          listOptions={initialDeductions}
          AddItems={AddDeduction}
          name={"Deduction"}
        />
      </Suspense>

      <Dialog
        onClose={onClose}
        open={
          open && openDeductionDialog === false && openIncomeDialog === false
        }
        fullWidth={true}
        maxWidth={"md"}
      >
        <div>Income & Deduction</div>
        <div>
          <Grid container>
            <Grid item lg={12} md={12} xs={12}>
              <Typography variant="h6">
                <span>Employee Name </span>
                <span>{selectedDetails?.CompleteName}</span>
              </Typography>
            </Grid>
          </Grid>
          <Fragment>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Income</Typography>

              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={() => setOpenIncomeDialog(true)}
              >
                Add Income
              </Button>
            </Grid>
            <Paper>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedIncomes?.map((option, index) => (
                      <TableRow key={index}>
                        <TableCell>{option.Description}</TableCell>
                        <TableCell>{option.Amount}</TableCell>
                        <TableCell>
                          <HighlightOffIcon
                            onClick={() => DeleteIncome(option)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Deduction</Typography>

              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={() => setOpenDeductionDialog(true)}
              >
                Add Deduction
              </Button>
            </Grid>
            <Paper>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedDeductions?.map((option, index) => (
                      <TableRow key={index}>
                        <TableCell>{option.Description}</TableCell>
                        <TableCell>{option.Amount}</TableCell>
                        <TableCell>
                          <HighlightOffIcon
                            onClick={() => DeleteDeduction(option)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Fragment>
          <Button
            color="primary"
            variant="contained"
            type="button"
            onClick={() => handlerSave()}
          >
            Submit and Close
          </Button>
        </div>
      </Dialog>
    </>
  );
};

IncomeDeduction.propTypes = {
  onClose: PropTypes.any,
  open: PropTypes.any,
  completeName: PropTypes.any,
};
export default IncomeDeduction;
