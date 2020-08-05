import React from "react";
import {
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  Paper,
  Box,
  Button,
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import { makeStyles } from "@material-ui/core/styles";

import { useEditor } from "../../../utils/EditorProvider";
import { useAuth0 } from "../../../utils/react-auth0-spa";

const EditorHeader = (props) => {
  const header = props?.header;
  const disableSwitch = props?.disableSwitch;
  const {
    showOldEntryButtons,
    setShowOldEntryButtons,
    setShowPropertyModal,
  } = useEditor();

  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  const useStyles = makeStyles((theme) => ({
    header: {
      padding: theme.spacing(1),
      borderBottom: "1px solid #E0E0E0",
      marginBottom: theme.spacing(1),
    },
    notification: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      backgroundColor: "#faf9c7",
      cursor: "pointer"
    },
    notificationText: {
      padding: theme.spacing(0.5),
    },
    notificationIcon: {
      padding: theme.spacing(0.5)
    }
  }));

  const classes = useStyles();

  return (
    <Grid
      container
      justify="space-between"
      direction="row"
      fullWidth
      className={classes.header}
    >
      <Grid container item direction="row" xs={8}>
        <Grid item>
          <Typography variant="h5">{header}</Typography>
        </Grid>
        {!isAuthenticated && (
          <Grid item>
            <Paper className={classes.notification} onClick={() => {!loading && loginWithRedirect()}}>
              <Typography className={classes.notificationText} variant="caption">{`Log in to store your information and give feedback.`}</Typography>
              <br />
              <Box display="flex" justifyContent="center">
                <Typography className={classes.notificationText} variant="caption">
                  {`Your information will not be lost while you login.`}
                </Typography>
                <LaunchIcon className={classes.notificationIcon}/>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>

      {!disableSwitch && (
        <Grid item>
          {showOldEntryButtons && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowPropertyModal(true)}
            >
              View
            </Button>
          )}
          <FormControlLabel
            label="Old information"
            labelPlacement="start"
            control={
              <Switch
                checked={showOldEntryButtons}
                onChange={() => setShowOldEntryButtons(!showOldEntryButtons)}
              />
            }
          />
        </Grid>
      )}
    </Grid>
  );
};

export default EditorHeader;
