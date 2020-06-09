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
  const [navigationEnabled, setNavigationEnabled] = useState(false);

  const [buildingInformation, setBuildingInformation] = useState({
    area: "",
    details: {
      name: "",
      material: "",
    },
    structure: {
      wallMaterial: "",
      roofType: "",
      windowCount: "",
    },
    ventilation: {
      system: "",
      airTightness: "",
    },
    heating: {
      system: "",
    },
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
  const getStepComponent = (style) => {
    switch (activeStep) {
      case 0:
        return <AreaSelection style={style} />;
      case 1:
        return <BuildingDetails style={style}/>;
      case 2:
        return <BuildingStructure style={style}/>;
      case 3:
        return <BuildingVentilation style={style}/>;
      case 4:
        return <BuildingHeating style={style}/>;
      case 5:
        return <Summary style={style}/>;
      default:
        return <p>Unknow component</p>;
    }
  };

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setNavigationEnabled(false);
  };

  const previousStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setNavigationEnabled(true);
  };

  const resetSteps = () => {
    setActiveStep(0);
  };

  const setSavedArea = (newArea) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      area: newArea,
    }));
  };

  const setSavedName = (newName) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      details: { ...buildingInformation.details, name: newName },
    }));
    console.log(buildingInformation);
  };

  const setSavedMaterial = (newMaterial) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      details: { ...buildingInformation.details, material: newMaterial },
    }));
  };

  const setSavedWallMaterial = (newWallMaterial) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      structure: {
        ...buildingInformation.structure,
        wallMaterial: newWallMaterial,
      },
    }));
  };

  const setSavedRoofType = (newRoofType) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      structure: { ...buildingInformation.structure, roofType: newRoofType },
    }));
  };

  const setSavedWindowCount = (newWindowCount) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      structure: {
        ...buildingInformation.structure,
        windowCount: newWindowCount,
      },
    }));
  };

  const setSavedVentilationType = (newVentilationType) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      ventilation: {
        ...buildingInformation.ventilation,
        system: newVentilationType,
      },
    }));
  };

  const setSavedHeatingType = (newHeatingType) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      heating: { ...buildingInformation.heating, system: newHeatingType },
    }));
  };

  return (
    <EditorContext.Provider
      value={{
        buildingInformation,
        activeStep,
        getSteps,
        getStepDescription,
        getStepComponent,
        navigationEnabled,
        setNavigationEnabled,
        nextStep,
        previousStep,
        resetSteps,
        setSavedArea,
        setSavedName,
        setSavedMaterial,
        setSavedWallMaterial,
        setSavedRoofType,
        setSavedWindowCount,
        setSavedVentilationType,
        setSavedHeatingType,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
