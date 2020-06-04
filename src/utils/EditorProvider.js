import React, { useContext, useState, useEffect } from "react";

export const EditorContext = React.createContext();

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);

  function getSteps() {
    return ["Select area", "Enter building details", "Enter more details"];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return `1`;
      case 1:
        return "2";
      case 2:
        return `3`;
      default:
        return "Unknown step";
    }
  }
  const steps = getSteps();

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const previousStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const resetSteps = () => {
    setActiveStep(0);
  };

  return (
    <EditorContext.Provider
      value={{
        activeStep,
        setActiveStep,
        getSteps,
        getStepContent,
        nextStep,
        previousStep,
        resetSteps,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
