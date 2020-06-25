import React, { useState, useEffect } from "react";
import { CircularProgress, ServerStyleSheets } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SuggestionAlert from "../../reusable/SuggestionAlert";
import { useBackend } from "../../../utils/FakeBackend";

const useStyles = makeStyles((theme) => ({
  suggestionAlert: {
    marginBottom: theme.spacing(1),
    fontSizeAdjust: 0.6,
    lineHeight: 1.8,
  },
}));

const SuggestionContainer = (props) => {
  const { getSuggestions } = useBackend();
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState();

  useEffect(() => {
    async function fetchData() {
      const data = await getSuggestions();
      setSuggestions(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          {suggestions.map((suggestion, key) => {
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
