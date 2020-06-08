import React, { useContext, useState, useEffect } from "react";

import AreaSelection from "../components/Editor/AreaSelection";
import BuildingDetails from "../components/Editor/BuildingDetails";
import BuildingStructure from "../components/Editor/BuildingStructure";
import BuildingVentilation from "../components/Editor/BuildingVentilation";
import BuildingHeating from "../components/Editor/BuildingHeating";
import Summary from "../components/Editor/Summary";

export const EditorContext = React.createContext();
export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [buildingInformation, setBuildingInformation] = useState({
    area: "",
    details: {
      name: "",
      material: ""
    }
  });

  const getSteps = () => {
    return [
      "Select area",
      "General information",
      "Structure",
      "Ventilation",
      "Heating",
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
        return <AreaSelection  />;
      case 1:
        return <BuildingDetails  />;
      case 2:
        return <BuildingStructure  />;
      case 3:
        return <BuildingVentilation />;
      case 4:
        return <BuildingHeating />;
      case 5:
        return <Summary />; 
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

  const setSavedArea = (newArea) => {
    setBuildingInformation(buildingInformation => ({
      ...buildingInformation,
      area: newArea
    }));
  }

  const setSavedName = (newName) => {
    setBuildingInformation(buildingInformation => ({
      ...buildingInformation,
      details: {...buildingInformation.details, name: newName}
    }));
  }

  const setSavedMaterial = (newMaterial) => {
    setBuildingInformation(buildingInformation => ({
      ...buildingInformation,
      details: {...buildingInformation.details, material: newMaterial}
    }));
  }

  return (
    <EditorContext.Provider
      value={{
        buildingInformation,
        activeStep,
        getSteps,
        getStepDescription,
        getStepComponent,
        nextStep,
        previousStep,
        resetSteps,
        setSavedArea,
        setSavedName,
        setSavedMaterial
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
