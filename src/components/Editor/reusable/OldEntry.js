import React, { useState, useEffect } from "react";
import { Typography, TextField, Grid, Button } from "@material-ui/core";
import DropdownSelect from "./DropdownSelect";

const OldEntry = (props) => {
  const [value, setValue] = useState();
  const [year, setYear] = useState();
  const [error, setError] = useState("Please enter year.");

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const addNewValue = () => {
    if (props.handler && error === "") {
      props.handler(value, year, props.propertyName);
    }
  };

  useEffect(() => {
    if (isNaN(year)) {
      setError("Please enter a year.");
    } else {
      setError("");
    }
  }, [year]);

  return (
    <React.Fragment>
      <DropdownSelect
        label="Old data"
        data={props.data}
        handler={handleValueChange}
      />
      <TextField
        onChange={handleYearChange}
        value={year}
        label="Year"
        helperText={error}
        error={isNaN(year)}
      ></TextField>
      <Button
        disabled={!isNaN(year) && !value}
        color="primary"
        variant="contained"
        onClick={addNewValue}
      >
        Add
      </Button>
    </React.Fragment>
  );
};

export default OldEntry;
