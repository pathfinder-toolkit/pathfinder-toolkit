import React, { useState, useEffect } from "react";
import { Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  filterRoot: {
    display: "flex",
    border: "1px solid black",
    flexDirection: "row",
    flexGrow: 1,
    flexWrap: "wrap",
  },
  filterItem: {
    marginRight: "10px",
    marginBottom: "5px",
    margin: 0,
  },
  filteredItem: { 
    backgroundColor: "red",
  }
}));

const SubjectFilter = (props) => {
  const classes = useStyles();

  const handleClick = (subject) => {
    if (props.handleClick) {
      props.handleClick(subject);
    }
  };

  return (
    <div className={classes.filterRoot}>
      {props.subjects.map((item, key) => {
        if (props.filtered.includes(item)) {
          return (
            <Chip
              onClick={() => handleClick(item)}
              clickable
              className={clsx(classes.filterItem,classes.filteredItem)}
              label={item}
            />
          );
        }
        return (
          <Chip
            onClick={() => handleClick(item)}
            clickable
            className={classes.filterItem}
            label={item}
          />
        );
      })}
    </div>
  );
};

export default SubjectFilter;
