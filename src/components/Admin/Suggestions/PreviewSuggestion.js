import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Select,
  Button,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SuggestionAlert from "../../reusable/SuggestionAlert";

const useStyles = makeStyles((theme) => ({
  suggestionAlert: {
    marginBottom: theme.spacing(1),
    fontSizeAdjust: 0.6,
    lineHeight: 1.8,
  },
  listItem: {
    paddingLeft: "2em",
    borderBottom: "1px solid #E0E0E0",
  },
  listHeader: {
    paddingLeft: "1em",
    borderBottom: "1px solid #E0E0E0",
  },
}));

const PreviewSuggestion = (props) => {
  const previewStyles = useStyles();
  const classes = props.classes;

  const subject = props?.subject;
  const areas = props?.areas;
  const suggestionText = props.suggestionText ? props.suggestionText : "Suggestion text";
  const priority = props?.priority;
  const conditions = props?.conditions;

  const suggestionPreview = {
    suggestionText: suggestionText,
    priority: priority,
    suggestionSubject: subject,
    suggestionSecondarySubject: "temp",
  };

  return (
    <div style={{ padding: "0.5em" }} className={classes.bordered}>
      <Typography align="center" variant="subtitle2">
        Preview
      </Typography>
      <SuggestionAlert suggestion={suggestionPreview} classes={previewStyles} />
      <Typography>Subject: {subject?.subject}</Typography>
      <Typography variant="subtitle2">
        <List>
          <ListItemText className={previewStyles.listHeader}>
            <b>Conditions</b>
          </ListItemText>
          {conditions.length === 0 && (
            <ListItemText className={previewStyles.listItem}>None</ListItemText>
          )}
          {conditions?.map((item, index) => (
            <ListItemText className={previewStyles.listItem}>
              {item.condition} | {item.conditionedBy}
            </ListItemText>
          ))}
        </List>
      </Typography>
      <List>
        <ListItemText className={previewStyles.listHeader}>
          <b>Areas</b>
        </ListItemText>
        {areas.length === 0 && (
          <ListItemText className={previewStyles.listItem}>None</ListItemText>
        )}

        {areas?.map((item, index) => (
          <ListItemText className={previewStyles.listItem}>
            {item.areaName}
          </ListItemText>
        ))}
      </List>
    </div>
  );
};

export default PreviewSuggestion;
