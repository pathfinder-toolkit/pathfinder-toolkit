import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  suggestion: {
    marginBottom: theme.spacing(0.5),
  },
}));

const Suggestion = (props) => {
  const classes = useStyles();
  return (
    <Alert severity="info" className={classes.suggestion}>
      <AlertTitle>Title</AlertTitle>
      Suggestion text
    </Alert>
  );
};

export default Suggestion;
