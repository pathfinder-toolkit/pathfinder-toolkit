import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";

import Suggestion from "./Suggestion";

const priorities = [
  {
    text: "High",
    value: 100,
    color: "rgb(253, 236, 234)",
  },
  {
    text: "Medium",
    value: 49,
    color: "rgb(255, 244, 229)",
  },
  {
    text: "Low",
    value: 19,
    color: "rgb(232, 244, 253)",
  },
  {
    text: "No priority",
    value: 0,
    color: "rgb(237, 247, 237)",
  },
];

const getPriorityColor = (priority) => {
  //High
  if (priority === 100) {
    return "rgb(253, 236, 234)";
  }
  // Medium
  if (priority === 49) {
    return "rgb(255, 244, 229)";
  }
  // Low
  if (priority === 19) {
    return "rgb(232, 244, 253)";
  }

  // No priority
  return "rgb(237, 247, 237)";
};

const SuggestionList = (props) => {
  const suggestions = props?.suggestions;

  return (
    <List style={{ width: "100%" }}>
      {suggestions?.length === 0 && (
        <ListItem>
          <ListItemText primary={"No suggestions found."} />
        </ListItem>
      )}
      {suggestions?.map((suggestion, index) => (
        <ListItem
          key={index}
          value={suggestion}
          style={{
            borderBottom: "1px solid #E0E0E0",
            backgroundColor: getPriorityColor(suggestion.priority),
          }}
        >
          {/*<ListItemText primary={JSON.stringify(suggestion)} />*/}
          <Suggestion suggestion={suggestion} />
          <ListItemSecondaryAction
            onClick={() => props.handleAction(suggestion)}
          >
            {props.secondaryAction}
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default SuggestionList;
