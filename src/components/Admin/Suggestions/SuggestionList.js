import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";

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

const SuggestionList = (props) => {
  const suggestions = props?.suggestions;

  return (
    <List>
      {suggestions?.length === 0 && (
        <ListItem>
          <ListItemText primary={"No suggestions found."} />
        </ListItem>
      )}
      {suggestions?.map((suggestion, index) => (
        <ListItem
          key={index}
          value={suggestion}
          style={{ borderBottom: "1px solid #E0E0E0" }}
        >
          <ListItemText primary={JSON.stringify(suggestion)} />
          <ListItemSecondaryAction>
            <IconButton onClick={() => props.handleSelection(suggestion)}>
              <EditIcon color="primary" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default SuggestionList;
