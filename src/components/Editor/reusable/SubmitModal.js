import React from "react";
import { Typography, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const SubmitModal = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      position: "absolute",
      background: theme.palette.background.default,
      width: 400,
      left: "50%",
      top: "50%",
      border: "2px solid black",
      textAlign: "center",
      transform: "translate(-50%,-50%)",
      padding: theme.spacing(5),
    },
    center: {
      textAlign: "center",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography align="center">Submitting building...</Typography>
      <Typography style={{ marginTop: "1em" }} align="center">
        {props?.message}
      </Typography>
      {!props?.message && <CircularProgress />}
    </div>
  );
};

export default SubmitModal;
