import Dialog from "@material-ui/core/Dialog";

import React from "react";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const DeductionDialog = ({ onClose, open, listOptions, AddDeduction }) => {
  return (
    <Dialog onClose={onClose} open={open} fullWidth={true} maxWidth={"md"}>
      <div>Deduction List</div>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>DatacenterID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>LineID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>SettingsType</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOptions.map((option, index) => (
              <TableRow key={index}>
                <TableCell>{option.DatacenterID}</TableCell>
                <TableCell>{option.Description}</TableCell>
                <TableCell>{option.LineID}</TableCell>
                <TableCell>{option.Amount}</TableCell>
                <TableCell>{option.Remarks}</TableCell>
                <TableCell>{option.SettingsType}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      onClose();
                      AddDeduction(option);
                    }}
                  >
                    Select
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        color="primary"
        variant="contained"
        type="button"
        onClick={() => onClose()}
      >
        close
      </Button>
    </Dialog>
  );
};

export default DeductionDialog;
