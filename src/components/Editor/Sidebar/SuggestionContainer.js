import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SuggestionAlert from "../../reusable/SuggestionAlert";
import { useEditor } from "../../../utils/EditorProvider";
import InfoBox from "./InfoBox";

const useStyles = makeStyles((theme) => ({
  suggestionAlert: {
    marginBottom: theme.spacing(1),
    fontSizeAdjust: 0.6,
    lineHeight: 1.8,
  },
}));

const SuggestionContainer = (props) => {
  const classes = useStyles();

  const [showInfo, setShowInfo] = useState(true);
  const { suggestions, suggestionsLoading } = useEditor();

  useEffect(() => {
    if (!suggestionsLoading) {
      setShowInfo(false);
    }
  }, [suggestionsLoading]);

  return (
    <React.Fragment>
      {suggestionsLoading ? (
        showInfo ? (
          <InfoBox />
        ) : (
          <CircularProgress />
        )
      ) : (
        <React.Fragment>
          {suggestions &&
            suggestions.map((suggestion, key) => {
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
