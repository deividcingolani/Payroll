import Dialog from "@material-ui/core/Dialog";

import React from "react";
import Button from "@material-ui/core/Button";

export const DeductionDialog = ({ onClose, open }) => {
  return (
    <Dialog onClose={onClose} open={open} fullWidth={true} maxWidth={"md"}>
      <div>Deduction List</div>
      <Button color="primary" variant="contained" type="button">
        Submit and Close
      </Button>
    </Dialog>
  );
};
