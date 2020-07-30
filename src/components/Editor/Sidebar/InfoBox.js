import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#E8F4FD",
    borderRadius: "4px",
    padding: "20px",
  },
  infoText: {},
}));

const InfoBox = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.infoText}>
        {props?.text}
      </Typography>
    </div>
  );
};

export default InfoBox;
