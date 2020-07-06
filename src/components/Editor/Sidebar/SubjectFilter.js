import React from "react";
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  filterRoot: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    flexWrap: "wrap",
    padding: theme.spacing(1),
    borderTop: "1px solid #E0E0E0",
    borderBottom: "1px solid #E0E0E0",
    minHeight: "60px",
  },
  filterItem: {
    marginRight: "10px",
    marginBottom: "5px",
    margin: 0,
  },
}));

const SubjectFilter = (props) => {
  const classes = useStyles();

  const filterSubject = (subject) => {
    if (props.handleClick) {
      props.handleClick(subject);
    }
  };

  if (!props.subjects) {
    return <div>Empty</div>;
  }

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
