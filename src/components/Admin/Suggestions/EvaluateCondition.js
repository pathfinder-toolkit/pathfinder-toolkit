import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Select,
  Button,
  MenuItem,
} from "@material-ui/core";

const EvaluateCondition = (props) => {
  const valueType = props?.valueType;
  const options = props?.options;
  const classes = props.classes;

  const newCondition = (expression) => {
    const condition = {
      condition: expression,
      conditionedBy: valueType,
    };

    if (props.handler) {
      props.handler(condition);
    }
  };

  return (
    <Grid
      className={classes.bordered}
      alignItems="center"
      container
      item
      spacing={1}
      sm={4}
      md={4}
      lg={4}
    >
      <Grid item>
        {valueType === "string" && (
          <TextField label="Condition(s)" select defaultValue="Options">
            {options?.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        )}
        {valueType !== "string" && <TextField label="Condition(s)" />}
      </Grid>
      <Grid item>
        <Button
          className={classes.conditionButton}
          color="primary"
          variant="outlined"
        >
          {"<"}
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.conditionButton}
          color="primary"
          variant="outlined"
        >
          {">"}
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.conditionButton}
          color="primary"
          variant="contained"
          onClick={newCondition}
        >
          {"+"}
        </Button>
      </Grid>
      <p>value type: {valueType} </p>
      {options?.map((item, index) => (
        <p>{item}</p>
      ))}
    </Grid>
  );
};

export default EvaluateCondition;
