import React, { useState, useEffect } from "react";
import { CircularProgress, List,} from "@material-ui/core";
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
            <InfoBox />
          </div>
        ) : (
          <CircularProgress />
        )
      ) : (
        <React.Fragment>
          <List className={classes.suggestionList}>
            {suggestions &&
              suggestions?.map((suggestion, key) => {
                if (filteredSubjects.includes(suggestion?.suggestionSubject)) {
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
          </List>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Suggestions;
