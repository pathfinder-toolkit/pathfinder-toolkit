import React, { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SuggestionAlert from "../../reusable/SuggestionAlert";
import { useEditor } from "../../../utils/EditorProvider";

const useStyles = makeStyles((theme) => ({
  suggestionAlert: {
    marginBottom: theme.spacing(1),
    fontSizeAdjust: 0.6,
    lineHeight: 1.8,
  },
}));

const SuggestionContainer = (props) => {
  const classes = useStyles();

  const { suggestions, suggestionsLoading } = useEditor();

  return (
    <React.Fragment>
      {suggestionsLoading ? (
        <CircularProgress />
      ) : (
        <React.Fragment> 
          {suggestions && suggestions.map((suggestion, key) => {
            return (
              <SuggestionAlert
                suggestion={suggestion}
                classes={classes}
                key={key}
              />
            );
          })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default SuggestionContainer;
