import React, { Fragment } from "react";

// Material UI
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TableRow from "@material-ui/core/TableRow";
const IncomeDeduction = ({ open, details, onAgree, onDisagree }) => {
  return (
    <div>
      <Dialog onClose={onDisagree} open={open} fullWidth={true} maxWidth={"md"}>
        <div>Income & Deduction</div>

        <div>
          <Grid container>
            <Grid item lg={12} md={12} xs={12}>
              <Typography variant="h6">
                <span>Employee Name</span>
                <span>{details?.CompleteName}</span>
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

              <Button color="primary" variant="contained" type="button">
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
                  <TableBody></TableBody>
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

              <Button color="primary" variant="contained" type="button">
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
                  <TableBody></TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Fragment>
          <Button color="primary" variant="contained" type="button">
            Submit and Close
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default IncomeDeduction;
