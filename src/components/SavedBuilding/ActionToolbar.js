import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import DeletionConfirmation from "./DeletionConfirmation";

const useStyles = makeStyles((theme) => ({
  actions: {
    margin: theme.spacing(2),
    backgroundColor: "#eceef8",
    display: "flex",
    flexDirection: "column",
  },
  actionsText: {
    margin: "auto",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  actionsButton: {
    maxWidth: "75%",
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  confirmationRoot: {
    minHeight: "40vh",
    minWidth: "40vw",
    alignItems: "center",
    justifyContent: "flex-end",
    cursor: "auto",
  },
  confirmationContent: {
    minHeight: "40vh",
    marginBottom: theme.spacing(2)
  },
  contentItem: {
    margin: theme.spacing(1),
  },
}));

const ActionToolbar = (props) => {
  const classes = useStyles();

  const history = useHistory();

  const [showDeletion, setShowDeletion] = useState();

  const showDeletionConfirmation = () => {
    setShowDeletion(true);
  };

  const hideDeletionConfirmation = () => {
    setShowDeletion(false);
  };

  return (
    <Paper className={classes.actions}>
      <Typography className={classes.actionsText}>
        This page is currently {props.privacyMode}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.actionsButton}
      >
        <Typography className={classes.text}>
          Make {props.privacyMode === "private" ? "public" : "private"}
        </Typography>
      </Button>
      <Button
        onClick={() => history.push("/design/" + props.slug)}
        variant="contained"
        color="primary"
        className={classes.actionsButton}
      >
        <Typography className={classes.text}>Edit Building</Typography>
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.actionsButton}
        onClick={showDeletionConfirmation}
      >
        <Typography className={classes.text}>Delete Building</Typography>
      </Button>
      {showDeletionConfirmation && (
        <DeletionConfirmation
          classes={classes}
          show={showDeletion}
          onHide={hideDeletionConfirmation}
          slug={props.slug}
        />
      )}
    </Paper>
  );
};

export default ActionToolbar;
