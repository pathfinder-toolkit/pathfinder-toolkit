import React from "react";
import { Typography, CircularProgress, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const UpdateModal = (props) => {
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
  const history = useHistory();

  return (
    <div className={classes.root}>
      {!props.message && (
        <Typography align="center">Updating building</Typography>
      )}
      <Typography align="center">{props?.message}</Typography>
      {!props?.message && <CircularProgress />}
      {props.message && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.push("/buildings/" + props.slug)}
        >
          Ok
        </Button>
      )}
    </div>
  );
};

export default UpdateModal;
