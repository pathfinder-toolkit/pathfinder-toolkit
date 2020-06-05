import React, { useContext, useState, useEffect } from "react";
import AreaSelection from "../components/Editor/AreaSelection";
import BuildingDetails from "../components/Editor/BuildingDetails";

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

  // Can be used later if we'd like to provide short description about steps.
  const getStepDescription = (step) => {
    return "";
    switch (step) {
      case 0:
        return "Select area";
      case 1:
        return "Enter building details";
      case 2:
        return "Enter heating details";
      default:
        return "Unknown description";
    }
  };

  //Editor components are added here
  const getStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <AreaSelection />;
      case 1:
        return <BuildingDetails />;
      default:
        return <p>Unknow component</p>;
    }
  };

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
        getSteps,
        getStepDescription,
        getStepComponent,
        nextStep,
        previousStep,
        resetSteps,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
