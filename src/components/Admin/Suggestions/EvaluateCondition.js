import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Select,
  Button,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";

const EvaluateCondition = (props) => {
  const valueType = props?.valueType;
  const options = props?.options;
  const classes = props.classes;

  const [expression, setExpression] = useState();
  const [operator, setOperator] = useState("=");

  useEffect(() => {
    if (expression) {
      console.log("expression changed: " + expression);
    }
  }, [expression]);

  const handleStringExpression = (e) => {
    setExpression(e.target.value);
  };

  const handleNumberExpression = (e) => {
    if (!isNaN(e.target.value)) {
      setExpression(e.target.value);
    }
  };

  const newCondition = () => {
    console.log("newCondition" + expression + " " + valueType);

    let condition;

    if (valueType === "string") {
      condition = expression;
    } else {
      condition = operator + expression;
    }

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
      <Grid item sm={8}>
        {valueType === "string" && (
          <TextField
            fullWidth
            label="Options"
            select
            defaultValue="Options"
            onChange={handleStringExpression}
          >
            {options?.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        )}
        {valueType !== "string" && (
          <TextField
            fullWidth
            label="Number"
            onChange={handleNumberExpression}
            value={expression}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{operator}</InputAdornment>
              ),
            }}
          />
        )}
      </Grid>
      <Grid item sm={4}>
        <Button
          disabled={!expression}
          fullWidth
          className={classes.conditionButton}
          color="primary"
          variant="contained"
          onClick={newCondition}
        >
          {"+"}
        </Button>
      </Grid>
      <Grid item>
        <Button
          disabled={valueType === "string"}
          className={classes.conditionButton}
          color="primary"
          variant="outlined"
          onClick={() => setOperator("<")}
        >
          {"<"}
        </Button>
      </Grid>
      <Grid item>
        <Button
          disabled={valueType === "string"}
          className={classes.conditionButton}
          color="primary"
          variant="outlined"
          onClick={() => setOperator(">")}
        >
          {">"}
        </Button>
      </Grid>
      <Grid item>
        <Button
          disabled={valueType === "string"}
          className={classes.conditionButton}
          color="primary"
          variant="outlined"
          onClick={() => setOperator("=")}
        >
          {"="}
        </Button>
      </Grid>
    </Grid>
  );
};

export default EvaluateCondition;
