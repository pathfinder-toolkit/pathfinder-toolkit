import React, { useState, useEffect } from "react";
import { Typography, Modal, CircularProgress, Grid } from "@material-ui/core";
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
    },
    center: {
      textAlign: "center",
    },
  }));

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  return (
    <div className={classes.root}>
      <Typography align="center">Submitting building...</Typography>
      <Typography align="center">{props?.message}</Typography>
      {!props?.message && <CircularProgress  />}
    </div>
  );
};

export default SubmitModal;
