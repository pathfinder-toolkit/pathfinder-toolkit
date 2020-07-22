import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";

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
        <ListItem key={index} value={suggestion}>
          <ListItemText primary={JSON.stringify(suggestion)} />
          <ListItemSecondaryAction>
            <IconButton onClick={() => props.handleSelection(suggestion)}>
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default SuggestionList;
