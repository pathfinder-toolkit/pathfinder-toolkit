import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listRoot: {
    border: "1px solid #E0E0E0",
    borderRadius: "4px",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    "& li": {
      borderBottom: "1px solid #E0E0E0",
    },
    "& li:last-child": {
      borderBottom: "none",
    },
  },
}));

const PropertyList = (props) => {
  const data = props.data;
  data.sort((a, b) => (a.year < b.year ? 1 : -1));

  const handleDeletion = (index) => {
    if (index === 0) {
      return;
    }
    if (props.handleDeletion) {
      props.handleDeletion(props.propertyName, index);
    }
  };

  const classes = useStyles();
  return (
    <List dense className={classes.listRoot}>
      {props.data.map((item, index) => {
        return (
          <ListItem className={classes.listItem}>
            <ListItemText
              primary={item.value}
              secondary={item.isCurrent ? "Current" : item.usageStartYear}
            />
            {index > 0 && (
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleDeletion(index)} edge="end">
                  <Clear />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

export default PropertyList;
