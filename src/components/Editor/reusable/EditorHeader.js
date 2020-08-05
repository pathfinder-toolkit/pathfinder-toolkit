import React from "react";
import { Typography, Grid, Switch, FormControlLabel, Paper, Box, Button} from "@material-ui/core";
import LaunchIcon from '@material-ui/icons/Launch';
import { makeStyles } from "@material-ui/core/styles";
import { useEditor } from "../../../utils/EditorProvider";

import { useAuth0 } from "../../../utils/react-auth0-spa";

const EditorHeader = (props) => {
  const header = props?.header;
  const disableSwitch = props?.disableSwitch;
  const { showOldEntryButtons, setShowOldEntryButtons } = useEditor();

  const { isAuthenticated } = useAuth0();

  const useStyles = makeStyles((theme) => ({
    header: {
      padding: theme.spacing(1),
      borderBottom: "1px solid #E0E0E0",
      marginBottom: theme.spacing(1),
    },
    notification: {
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    notificationText: {
      padding: theme.spacing(0.5)
    }
  }));

  const classes = useStyles();

  return (
    <Grid container justify="space-between" direction="row" fullWidth className={classes.header}>
      <Grid container item direction="row" xs={8}>
        <Grid item>
        <Typography variant="h5">{header}</Typography>
        </Grid>
        {!isAuthenticated && (
          <Grid item>
          <Paper className={classes.notification}>
            <Typography className={classes.notificationText} variant="caption">{`Log in to store your information and give feedback.`}</Typography>
            <br />
            <Box display="flex" justifyContent="center">
              <Typography className={classes.notificationText} variant="caption">
                {`Your inputs will not be lost while you login.`}
              </Typography>
            <LaunchIcon fontSize="small"/>
            </Box>
          </Paper>
          </Grid>
        )}
      </Grid>

      {!disableSwitch && (
        <Grid item>
          <Button>Modal</Button>
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
