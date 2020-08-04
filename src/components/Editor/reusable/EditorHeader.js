import React from "react";
import { Typography, Grid, Switch, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEditor } from "../../../utils/EditorProvider";

const EditorHeader = (props) => {
  const header = props?.header;
  const disableSwitch = props?.disableSwitch;
  const { showOldEntryButtons, setShowOldEntryButtons } = useEditor();

  const useStyles = makeStyles((theme) => ({
    header: {
      borderBottom: "1px solid #E0E0E0",
      marginBottom: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <Grid container justify="space-between" className={classes.header}>
      <Grid item>
        <Typography variant="h5">{header}</Typography>
      </Grid>
      {!disableSwitch && (
        <Grid item>
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
