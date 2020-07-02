import React, { useState, useEffect } from "react";
import { Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  filterRoot: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    display: "flex",
    borderBottom: "1px solid #E0E0E0",
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
  },
}));

const SubjectFilter = (props) => {
  const classes = useStyles();

  const filterSubject = (subject) => {
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
              onClick={() => filterSubject(item)}
              clickable
              color="default"
              className={classes.filterItem}
              label={item}
            />
          );
        }
        return (
          <Chip
            onClick={() => filterSubject(item)}
            clickable
            color="primary"
            className={classes.filterItem}
            label={item}
          />
        );
      })}
    </div>
  );
};

export default SubjectFilter;
