import React, { useState, useEffect } from "react";
import { CircularProgress, List, Typography } from "@material-ui/core";
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
  suggestionsRoot: {
    padding: theme.spacing(1),
  },
  infoBox: {
    marginTop: theme.spacing(5),
  },
  suggestionList: {
    overflow: "auto",
    position: "relative",
    height: "75vh",
    padding: "5px",
  },
}));

const Suggestions = (props) => {
  const classes = useStyles();

  const { suggestionsLoading } = useEditor();
  const [showInfo, setShowInfo] = useState(true);

  const filteredSubjects = props.filteredSubjects;
  const suggestions = props.suggestions;

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
            <InfoBox
              text={
                "Input information about your building to see suggestions and experiences of others with similar buildings."
              }
            />
          </div>
        ) : (
          <CircularProgress />
        )
      ) : (
        <React.Fragment>
          <List className={classes.suggestionList}>
            {suggestions.length === 0 && (
              <div className={classes.infoBox}>
                <InfoBox text={"No suggestions found."}/>
              </div>
            )}
            {suggestions.length > 0 &&
              suggestions?.map((suggestion, key) => {
                if (filteredSubjects.includes(suggestion?.suggestionSubject)) {
                  return;
                }

                return (
                  <SuggestionAlert
                    suggestion={suggestion}
                    classes={classes}
                    key={key}
                    priority={100}
                  />
                );
              })}
          </List>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Suggestions;
