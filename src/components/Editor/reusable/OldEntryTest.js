import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import DropdownSelect from "./DropdownSelect";
import { makeStyles } from "@material-ui/core/styles";

import CommentCreation from "./Comments/CommentCreation";

const useStyles = makeStyles((theme) => ({
  entryRoot: {
    border: "1px solid #E0E0E0",
    borderRadius: "4px",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  inputs: {
    marginBottom: theme.spacing(1),
  },
  commentRoot: {
      marginTop: theme.spacing (1),
  }
}));

const OldEntryTest = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [year, setYear] = useState();
  const [error, setError] = useState("");

  const [show, setShow] = useState(false);

  const handleShow = (event) => {
    setShow(event.target.checked);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const addNewValue = () => {
    if (props.handler && error === "") {
      props.handler(value, year, props.propertyName);
      if (props.onEntry) {
        props.onEntry();
      }
    }
  };

  useEffect(() => {
    if (isNaN(year)) {
      setError("Please enter a year.");
    } else if (year < 0 || year > 3000) {
      setError("Please enter a valid year.");
    } else {
      setError("");
    }
  }, [year]);

  return (
    <Grid container className={classes.entryRoot}>
      <Grid container alignItems="center" className={classes.inputs}>
        <DropdownSelect
          label="Old system"
          data={props.data}
          handler={handleValueChange}
        />
        <TextField
          onChange={handleYearChange}
          value={year}
          label="Year"
          helperText={error}
          error={isNaN(year) || year < 0 || year > 3000}
        ></TextField>

        <FormControlLabel
          control={<Switch onChange={handleShow} checked={show} />}
          label="Comment"
        />

        {show && (
          <div className={classes.commentRoot}>
            <CommentCreation />
          </div>
        )}
      </Grid>
      <Button
        disabled={error && !value}
        color="primary"
        variant="contained"
        onClick={addNewValue}
      >
        Add
      </Button>
    </Grid>
  );
};

export default OldEntryTest;
