import Dialog from '@material-ui/core/Dialog';

import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  dialogPaper: {
    height: '400px',
  },
  field: {
    width: '20rem',
  },
  autocomplete: {
    width: '20rem',
    marginBottom: '3rem',
  },
  buttons: {
    marginTop: '4rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '15rem',
    justifyContent: 'space-between',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontSize: '20px',
    marginBottom: '3rem',
  },
}));

const AddIncome = ({ onClose, open, listOptions, AddItems, name }) => {
  const styles = useStyles();
  const initialValues = {
    optionSelected: '',
    amount: '',
  };

  const handleSubmit = values => {
    const newItem = { ...values.optionSelected, Amount: values.amount };
    AddItems(newItem);
    onClose();
  };

  const Schema = Yup.object().shape({
    optionSelected: Yup.object().required('Required'),
    amount: Yup.number().required('Required'),
  });
  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth={true}
      maxWidth={'md'}
      classes={{ paper: styles.dialogPaper }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Schema}
      >
        {({ dirty, isValid, setFieldValue }) => {
          return (
            <Form className={styles.form}>
              <div className={styles.header}>Add {name} </div>

              <Autocomplete
                options={listOptions}
                getOptionLabel={option => option.Description}
                onChange={(_, value) => {
                  setFieldValue('optionSelected', value);
                }}
                className={styles.autocomplete}
                getOptionSelected={(option, val) =>
                  option.Description === val.Description
                }
                renderInput={params => (
                  <TextField label={'Description'} {...params} />
                )}
              />
              <Field
                required={true}
                autoComplete="off"
                as={TextField}
                label={'Amount'}
                name="amount"
                className={styles.field}
                type={'text'}
                renderInput={_ => <TextField label={'Amount'} />}
                helperText={<ErrorMessage name={'amount'} />}
              />
              <div className={styles.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.button}
                  disabled={!dirty || !isValid}
                  type="submit"
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.button}
                  onClick={() => onClose()}
                >
                  Close
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AddIncome;
