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

const InfoBox = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.infoText}>
        {" "}
        Input information about your building to see suggestions and experiences
        of others with similar buildings.
      </Typography>
    </div>
  );
};

export default InfoBox;
