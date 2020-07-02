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
}));

const SuggestionContainer = (props) => {
  const classes = useStyles();

  const [showInfo, setShowInfo] = useState(true);
  const { suggestions, suggestionsLoading, subjects } = useEditor();

  const [filteredSuggestions, setFilteredSuggestions] = useState([
    "test",
    "aaa",
  ]);

  const filterSuggestions = (subject) => {
    if (filteredSuggestions.includes(subject)) {
      setFilteredSuggestions(
        filteredSuggestions.filter((item) => item !== subject)
      );
      return;
    }
    console.log("filtering: " + subject);
    setFilteredSuggestions([...filteredSuggestions, subject]);
  };

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
          <SubjectFilter
            subjects={subjects}
            filtered={filteredSuggestions}
            handleClick={(subject) => filterSuggestions(subject)}
          />
          <div className={classes.suggestionsRoot}>
            {suggestions &&
              suggestions.map((suggestion, key) => {
                if (
                  filteredSuggestions.includes(suggestion.suggestionSubject)
                ) {
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

export default SuggestionContainer;
