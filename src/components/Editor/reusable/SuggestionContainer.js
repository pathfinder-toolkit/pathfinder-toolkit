import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Suggestion from "./Suggestion"

const useStyles = makeStyles((theme) => ({
  suggestionContainer: {
    marginTop: theme.spacing(0),
    padding: theme.spacing(0.5),
    border: "1px solid black", //debug
  },
  suggestionHeader: {
      borderBottom: "1px solid #E0E0E0",
      marginBottom: theme.spacing(1)
  },
}));

const SuggestionContainer = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h5" align="center" className={classes.suggestionHeader}>Suggestions</Typography>
      <Suggestion/>
      <Suggestion/>
    </React.Fragment>
  );
};

export default SuggestionContainer;
