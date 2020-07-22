import React from "react";
import Typography from "@material-ui/core/Typography";
import SuggestionEditor from "./SuggestionEditor";

const DeleteSuggestions = (props) => {
  const classes = props.style;

  return (
    <React.Fragment>
      <Typography variant="h4" component="h4" className={classes.header}>
        Create new suggestion
      </Typography>
      <SuggestionEditor style={classes} />
    </React.Fragment>
  );
};

export default DeleteSuggestions;
