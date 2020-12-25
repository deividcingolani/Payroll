import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React, { Fragment } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";

export const TablePayroll = ({
  selectedDate,
  setSelectedDate,
  IncomeDeductionDialog,
  payrollsState,
  setRemarkValue,
  remarkValue,
  onSubmit,
}) => {
  return (
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
                    {payrollsState
                      .sort((a, b) => {
                        return a.CompleteName > b.CompleteName;
                      })
                      .map((payroll, index) => (
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
                  onClick={() => onSubmit()}
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
  );
};
