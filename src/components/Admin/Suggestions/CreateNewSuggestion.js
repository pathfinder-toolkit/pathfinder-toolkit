import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import SuggestionEditor from "./SuggestionEditor";

const DeleteSuggestions = (props) => {
  const classes = props.style;
  const [suggestionCreated, setSuggestionCreated] = useState(false);

  return (
    <React.Fragment>
      <Typography variant="h4" component="h4" className={classes.header}>
        Create new suggestion
      </Typography>
      {!suggestionCreated && (
        <SuggestionEditor
          style={classes}
          callback={() => setSuggestionCreated(true)}
        />
      )}
      {suggestionCreated && (
        <div style={{ padding: "1em" }}>
          <Typography>Suggestion created.</Typography>
          <Button
            onClick={() => setSuggestionCreated(false)}
            variant="outlined"
            color="primary"
          >
            Create new
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default DeleteSuggestions;
