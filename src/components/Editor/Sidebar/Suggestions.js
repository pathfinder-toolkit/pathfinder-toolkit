import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SuggestionAlert from "../../reusable/SuggestionAlert";
import { useEditor } from "../../../utils/EditorProvider";
import InfoBox from "./InfoBox";
import SubjectFilter from "./SubjectFilter";

const useStyles = makeStyles((theme) => ({
  suggestionAlert: {
    marginBottom: theme.spacing(1),
    fontSizeAdjust: 0.6,
    lineHeight: 1.8,
  },
  suggestionsRoot: {
    padding: theme.spacing(1),
  },
  infoBox: {
    marginTop: theme.spacing(5),
  },
}));

const Suggestions = (props) => {
  const classes = useStyles();
  const filteredSubjects = props.filteredSubjects;

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
          <div className={classes.infoBox}>
            <InfoBox />
          </div>
        ) : (
          <CircularProgress />
        )
      ) : (
        <React.Fragment>
          <div className={classes.suggestionsRoot}>
            {suggestions &&
              suggestions.map((suggestion, key) => {
                if (filteredSubjects.includes(suggestion.suggestionSubject)) {
                  return;
                }

                return (
                  <SuggestionAlert
                    suggestion={suggestion}
                    classes={classes}
                    key={key}
                  />
                );
              })}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Suggestions;
