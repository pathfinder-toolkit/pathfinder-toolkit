import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { useEditor } from "../../utils/EditorProvider";


const BuildingEditor = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      background: "#dddce0",
      maxHeight: "100vh",
    },
    editorContainer: {
      padding: theme.spacing(0.5),
      minHeight: "91vh",
    },
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

  const {
    getSteps,
    activeStep,
    nextStep,
    previousStep,
    getStepComponent,
  } = useEditor();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <div className={classes.editorContainer}>
        <div className={classes.editorComponent}>
          <Paper>{getStepComponent()}</Paper>
        </div>
      </div>
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
              onClick={nextStep}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Paper>
        </Grid>
      </div>
    </div>
  );
};

export default BuildingEditor;
