import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Paper } from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";

const NavigationBar = () => {
  const [enabled, setEnabled] = useState(false);

  const useStyles = makeStyles((theme) => ({
    actionsContainer: {
      position: "fixed",
      bottom: 40,
      left: 40,
    },
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  const { getSteps, activeStep, nextStep, previousStep, navigationEnabled } = useEditor();
  const steps = getSteps();

  return (
    <div className={classes.actionsContainer}>
      <Grid direction="row" justify="center" sm={12} md={12} lg={12}>
        <Paper>
          <Button
            variant="contained"
            disabled={activeStep === 0}
            onClick={previousStep}
            className={classes.button}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!navigationEnabled}
            onClick={nextStep}
            className={classes.button}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default NavigationBar;
