import React, { Fragment, lazy, Suspense } from "react";
import {payrolls,incomesDeductions } from "./utils/data"
// Material UI
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

// Date-FNS
// import { format as formatDate } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";

// Lazy Load
const IncomeDeduction = lazy(() => import("./IncomeDeduction"));

const Payroll = () => {


  const [openIncomeDeductionDialog, setIncomeDeductionDialog] = React.useState(
    false
  );
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
          details={selectedDetails}
          onAgree={() => setIncomeDeductionDialog(false)}
          onDisagree={() => setIncomeDeductionDialog(false)}
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
                values={selectedDate}
                onChange={(val) => {
                  setSelectedDate(val);
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {payrolls && payrolls.length > 0 ? (
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
                      {payrolls.map((payroll, index) => (
                        <TableRow key={index}>
                          <TableCell>{payroll.SubDept}</TableCell>
                          <TableCell>{payroll.DatacenterCode}</TableCell>
                          <TableCell>{payroll.CompleteName}</TableCell>
                          <TableCell align="right">{payroll.Days}</TableCell>
                          <TableCell align="right">{payroll.Gross}</TableCell>
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
                          {payrolls.reduce(
                            (totalGross, gross) =>
                              (totalGross += parseInt(gross.Gross)),
                            0
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {payrolls.reduce(
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
                    <TextField />
                  </Grid>
                </Grid>

                <Grid container justify="flex-end">
                  <Button color="primary" variant="contained">
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
