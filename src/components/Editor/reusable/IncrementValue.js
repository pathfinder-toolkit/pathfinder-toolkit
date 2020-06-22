import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    background: "#FFFFFF",
    border: "1px solid #C4C4C4",
    borderRadius: "4px",
    cursor: "pointer",
    height: "50px",
    width: "50px",
    margin: theme.spacing(0.5),
  },
  valueText: {
    border: "1px solid #C4C4C4",
    borderRadius: "4px",
    padding: theme.spacing(2),
    width: "50px",
    height: "50px",
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
  },
  formButton: {
    margin: theme.spacing(1),
  },
}));

const IncrementValue = (props) => {
  const [value, setValue] = useState(props.value ? props.value : 0);
  const classes = useStyles();


  const _increase = () => {
    setValue(value + 1);
  };

  const _decrease = () => {
    setValue(value - 1);
  };

  return (
    <React.Fragment>
      <Button className={classes.button} onClick={_increase}>
        +
      </Button>
      <Button className={classes.button} onClick={_decrease}>
        -
      </Button>
      <div>
        <p className={classes.valueText}>{value}</p>
      </div>
    </React.Fragment>
  );
};

export default IncrementValue;
