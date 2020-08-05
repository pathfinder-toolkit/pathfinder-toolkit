import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, Grid, Typography, Paper, Box } from "@material-ui/core";
import LaunchIcon from '@material-ui/icons/Launch';

import { useEditor } from "../../utils/EditorProvider";

import { useAuth0 } from "../../utils/react-auth0-spa";

import history from "../../utils/history";

import BuildingViewer from "../BuildingViewer/BuildingViewer";
import SubmitModal from "./reusable/SubmitModal";
import UpdateModal from "./reusable/UpdateModal";

const useStyles = makeStyles((theme) => ({
  submitRoot: {
    padding: theme.spacing(2),
    backgroundColor: "#eceef8",
    borderRadius: "4px",
  },
  previewHeader: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  notification: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: "#faf9c7",
    maxWidth: "500px",
    cursor: "pointer",
  },
  notificationText: {
    padding: theme.spacing(0.5)
  }
}));

const Summary = (props) => {
  const { buildingInformation, postBuilding, updateBuilding } = useEditor();

  const {
    isAuthenticated,
    loading,
    loginWithRedirect
  } = useAuth0();

  const classes = useStyles();

  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [buildingLoading, setBuildingLoading] = useState(false);

  const redirectTo = (addr) => {
    history.push(addr);
  };

  const submitBuilding = async () => {
    setOpen(true);
    setBuildingLoading(true);
    const message = await postBuilding();
    if (message === null) {
      setBuildingLoading(false);
      setOpen(false);
    } else {
      setBuildingLoading(false);
      setMessage(message.toString());
      const interval = setInterval(() => {
        clearInterval(interval);
        setMessage();
        setOpen(false);
      }, 2000);
    }
  };

  const submitUpdateBuilding = async () => {
    setOpen(true);
    console.log("submitUpdateBuilding");
    const message = await updateBuilding();
    if (message.status == "200") {
      setMessage("Building updated");
    }
  };

  return (
    <React.Fragment>
      {props.slug && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <UpdateModal message={message} slug={props.slug} />
        </Modal>
      )}
      {!props.slug && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <SubmitModal message={message} />
        </Modal>
      )}
      <Grid className={classes.submitRoot} container direction="column">
        <Paper>
          <Grid item>
            <Typography className={classes.previewHeader} variant="h4">
              Building summary
            </Typography>
          </Grid>
          {isAuthenticated ? (
            <React.Fragment>
              <Grid item>
                <Button
                  className={classes.submitButton}
                  onClick={() => {
                    if (props.slug) {
                      submitUpdateBuilding();
                    } else {
                      submitBuilding();
                    }
                  }}
                  variant="contained"
                  color="primary"
                >
                  {props.slug ? "Update building" : "Submit building"}
                </Button>
              </Grid>
              <Grid item>
                <Paper className={classes.notification} onClick={() => {redirectTo("/feedback")}}>
                  <Box display="flex" justifyContent="center">
                    <Typography className={classes.notificationText} variant="p">
                      {`Pathfinder is in development. Your feedback can help us make it better.`}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Typography className={classes.notificationText} variant="p">
                      {`Click here to submit your feedback.`}
                    </Typography>
                    <LaunchIcon fontSize="small"/>
                  </Box>
                </Paper>
              </Grid>
            </React.Fragment>
          ) : (
            <Grid item>
              <Paper className={classes.notification} onClick={() => {!loading && loginWithRedirect()}}>
                <Box display="flex" justifyContent="center">
                  <Typography className={classes.notificationText} variant="p">
                  {`Log in to store your information and give feedback.`}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                  <Typography className={classes.notificationText} variant="p">
                    {`Your information will not be lost while you login.`}
                  </Typography>
                  <LaunchIcon fontSize="small"/>
                </Box>
              </Paper>
            </Grid>
          )}
        </Paper>
      </Grid>

      <BuildingViewer building={buildingInformation} />
    </React.Fragment>
  );
};

export default Summary;
