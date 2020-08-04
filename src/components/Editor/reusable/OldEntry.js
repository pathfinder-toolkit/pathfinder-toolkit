import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import DropdownSelect from "./DropdownSelect";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  entryRoot: {
    border: "1px solid #E0E0E0",
    borderRadius: "2px",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  inputs: {
    marginBottom: theme.spacing(4),
  },
}));

const OldEntry = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [year, setYear] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    if (props.data === undefined) {
      console.log("Options not found for property, show textbox");
    }
  }, []);

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
    if (year) {
      if (isNaN(year)) {
        setError("Please enter a year.");
      } else if (year < 0 || year > 3000) {
        setError("Please enter a valid year.");
      } else {
        setError("");
      }
    }
  }, [year]);

  return (
    <div className={classes.entryRoot}>
      <Typography>debug: {props.property}</Typography>
      <div className={classes.inputs}>
        {props.data === undefined && (
          <TextField
            label="Old value"
            type="number"
            onChange={handleValueChange}
            fullWidth
          />
        )}
        {props.data !== undefined && (
          <DropdownSelect
            label="Old value"
            data={props.data}
            handler={handleValueChange}
          />
        )}
        <TextField
          onChange={handleYearChange}
          value={year}
          label="Year"
          type="number"
          helperText={error}
          fullWidth
        ></TextField>
      </div>
      <Button
        disabled={!value}
        color="primary"
        variant="contained"
        onClick={addNewValue}
      >
        Add
      </Button>
    </div>
  );
};

export default OldEntry;
