import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
  listHeader: {
    marginBottom: theme.spacing(2),
  },
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
  const [selectedProperty, setSelectedProperty] = useState();
  const data = props.data;
  //data.sort((a, b) => (a.year < b.year ? 1 : -1));

  useEffect(() => {
    setSelectedProperty(Object.keys(data)[0]);
  }, []);

  const handleDeletion = (index) => {
    if (index === 0) {
      return;
    }
    if (props.handleDeletion) {
      props.handleDeletion(selectedProperty, index);
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.listHeader} variant="h5" align="center">
        Changelog
      </Typography>
      <List dense className={classes.listRoot}>
        <ListItem className={classes.listItem}>
          <TextField
            onChange={(e) => setSelectedProperty(e.target.value)}
            select
            label="Property"
            defaultValue={Object.keys(data)[0]}
            fullWidth
          >
            {Object.keys(data).map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </TextField>
        </ListItem>
        {selectedProperty &&
          data[selectedProperty].length > 1 &&
          data[selectedProperty]
            .sort((a, b) => (a.year > b.year ? 1 : -1))
            .map((item, index) => {
              return (
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary={item.value}
                    secondary={item.isCurrent ? "Current" : item.usageStartYear}
                  />
                  {index > 0 && (
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => handleDeletion(index)}
                        edge="end"
                      >
                        <Clear />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              );
            })}
        {selectedProperty && data[selectedProperty].length === 1 && (
          <ListItem>
            <ListItemText primary={"No history found."} />
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default PropertyList;
