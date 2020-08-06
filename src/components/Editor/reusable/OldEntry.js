import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import DropdownSelect from "./DropdownSelect";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  entryRoot: {
    border: "1px solid #E0E0E0",
    borderRadius: "2px",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(5),
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

  const addNewValue = () => {
    if (props.handler) {
      props.handler(value, year, props.propertyName);
      if (props.onEntry) {
        props.onEntry();
      }
    }
  };

  return (
    <div className={classes.entryRoot}>
      <div className={classes.inputs}>
        {props.data === undefined && (
          <TextField
            label="Old value"
            type="number"
            onChange={(e) => setValue(e.target.value)}
            fullWidth
          />
        )}
        {props.data !== undefined && (
          <DropdownSelect
            label="Old value"
            data={props.data}
            handler={(e) => setValue(e.target.value)}
          />
        )}
        <TextField
          onChange={(e) => setYear(e.target.value)}
          value={year}
          label="Year"
          type="number"
          fullWidth
        ></TextField>
      </div>
      <Button
        disabled={!value || !year}
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
