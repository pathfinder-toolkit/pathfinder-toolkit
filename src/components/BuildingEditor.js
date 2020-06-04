import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const BuildingEditor = () => {
  const useStyles = makeStyles((theme) => ({
    editor: {
      background: "#dddce0",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
      <div className={classes.editor}>
        <Typography align="center">Designer / Area selection here</Typography>
      </div>
  );
};

export default BuildingEditor;
