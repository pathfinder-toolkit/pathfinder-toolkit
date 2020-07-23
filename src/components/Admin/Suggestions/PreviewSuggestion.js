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
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons/";
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
  const suggestionText = props.suggestionText
    ? props.suggestionText
    : "Suggestion text";
  const priority = props?.priority;
  const conditions = props?.conditions;

  const suggestionPreview = {
    suggestionText: suggestionText,
    priority: priority,
    suggestionSubject: subject,
    suggestionSecondarySubject: "temp",
  };

  const removeCondition = (condition) => {
    if (props.handleCondition) {
      props.handleCondition(condition);
    }
  };

  const removeArea = (area) => {
    if (props.handleArea) {
      props.handleArea(area);
    }
  };

  return (
    <div style={{ padding: "0.5em" }} className={classes.bordered}>
      <Typography align="center">
        <b> Preview</b>
      </Typography>
      <SuggestionAlert suggestion={suggestionPreview} classes={previewStyles} />
      <Typography>Subject: {subject?.subject}</Typography>
      <Typography variant="subtitle2">
        <List>
          <ListItem className={previewStyles.listHeader}>
            <ListItemText>
              <b>Conditions</b>
            </ListItemText>
          </ListItem>
          {conditions.length === 0 && (
            <ListItem>
              <ListItemText className={previewStyles.listItem}>
                None
              </ListItemText>
            </ListItem>
          )}
          {conditions?.map((condition, index) => (
            <ListItem className={previewStyles.listItem}>
              <ListItemText>
                {condition.conditionedBy} / {condition.condition}
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton onClick={() => removeCondition(condition)}>
                  <Clear />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Typography>
      <List>
        <ListItem className={previewStyles.listHeader}>
          <ListItemText>
            <b>Areas</b>
          </ListItemText>
        </ListItem>
        {areas.length === 0 && (
          <ListItem>
            <ListItemText className={previewStyles.listItem}>None</ListItemText>
          </ListItem>
        )}

        {areas?.map((area, index) => (
          <ListItem className={previewStyles.listItem}>
            <ListItemText primary={area.areaName}></ListItemText>
            <ListItemSecondaryAction>
              <IconButton onClick={() => removeArea(area)}>
                <Clear />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PreviewSuggestion;
