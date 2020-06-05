import React, { useContext, useState, useEffect } from "react";

export const EditorContext = React.createContext();

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);

  const getSteps = () => {
    return [
      "Select area",
      "Building details",
      "Heating details",
      "More details",
      "Summary",
    ];
  };

  // Can be used later if we'd like to provide short descriptions about steps.
  const getStepContent = (step) => {
    return "";
    switch (step) {
      case 0:
        return ``;
      case 1:
        return "";
      case 2:
        return ``;
      default:
        return "Unknown step";
    }
  };
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
