import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";

const EditorStepper = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxHeight: "100vh",
    },
  }));

  const { activeStep, getSteps, setStep } = useEditor();

  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step
            style={{ cursor: "pointer" }}
            key={label}
            onClick={() => setStep(index)}
          >
            <StepLabel>{label}</StepLabel>
            <StepContent></StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default EditorStepper;
