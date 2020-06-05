import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { useEditor } from "../../utils/EditorProvider";

const EditorStepper = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      minHeight: "91vh",
    },
  }));

  const {
    activeStep,
    getSteps,
    getStepDescription,
  } = useEditor();

  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepDescription(index)}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <Typography>debug: active step {activeStep}</Typography>
    </div>
  );
};

export default EditorStepper;
