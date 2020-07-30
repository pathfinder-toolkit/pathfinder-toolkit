import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsButton: {
    maxWidth: "75%",
    margin: "auto",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
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
  textField: {
    fontSizeAdjust: 0.5,
    margin: theme.spacing(1)
  }
}));

const ActionToolbar = (props) => {
  const classes = useStyles();

  const history = useHistory();

  const [showDeletion, setShowDeletion] = useState();

  const [ publicStatus, setPublicStatus ] = useState(props.public);

  const showDeletionConfirmation = () => {
    setShowDeletion(true);
  };

  const hideDeletionConfirmation = () => {
    setShowDeletion(false);
  };

  return (
    <Paper className={classes.actions}>
      <Typography className={classes.actionsText}>
        This page is currently {publicStatus ? "public" : "private"}
      </Typography>
      {publicStatus && (
        <React.Fragment>
          <Typography className={classes.actionsText} variant="p">
            Anyone can view the contents of this page at the following address:
          </Typography>
          <TextField
            disabled
            className={classes.textField}
            multiline
            value={`${window.location.host}/public/building/${props.slug}`}
          />
          <Button
            variant="contained"
            className={classes.actionsButton}
            onClick={() => history.push(`/public/building/${props.slug}`)}
          >
            <Typography className={classes.text}>
              Go to public page
            </Typography>
          </Button>
        </React.Fragment>
      )}
      <Button
        variant="contained"
        color="primary"
        className={classes.actionsButton}
      >
        <Typography className={classes.text}>
          Make {publicStatus ? "private" : "public"}
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
