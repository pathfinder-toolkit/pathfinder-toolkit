import React, { useContext, useState, useEffect } from "react";

import AreaSelection from "../components/Editor/AreaSelection";
import BuildingDetails from "../components/Editor/BuildingDetails";
import BuildingStructure from "../components/Editor/BuildingStructure";
import BuildingVentilation from "../components/Editor/BuildingVentilation";
import BuildingHeating from "../components/Editor/BuildingHeating";
import Summary from "../components/Editor/Summary";

export const EditorContext = React.createContext();
export const useEditor = () => useContext(EditorContext);

const useStateWithSessionStorage = (sessionStorageKey) => {
  const [value, setValue] = useState(
    JSON.parse(sessionStorage.getItem(sessionStorageKey)) || {
      details: {
        name: "",
        area: {
          value: "",
          suggestions: [],
        },
        year: {
          value: "",
          suggestions: [],
        },
        material: {
          value: "",
          suggestions: [],
        },
        floors: {
          value: "",
          suggestions: [],
        },
      },
      structure: {
        wallMaterial: {
          value: "",
          suggestions: [],
        },
        roofType: {
          value: "",
          suggestions: [],
        },
        windowCount: {
          value: "",
          suggestions: [],
        },
      },
      ventilation: {
        system: {
          value: "",
          suggestions: [],
        },
        airTightness: {
          value: "",
          suggestions: [],
        },
      },
      heating: {
        system: {
          value: "",
          suggestions: [],
        },
      },
    }
  );

  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export const EditorProvider = ({ children }) => {
  const [
    buildingInformation,
    setBuildingInformation,
  ] = useStateWithSessionStorage("SavedBuildingDataInStorage");
  const [activeStep, setActiveStep] = useState(0);
  const [navigationEnabled, setNavigationEnabled] = useState(
    buildingInformation.area ? true : false
  );

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
        return <BuildingDetails style={style} />;
      case 2:
        return <BuildingStructure style={style} />;
      case 3:
        return <BuildingVentilation style={style} />;
      case 4:
        return <BuildingHeating style={style} />;
      case 5:
        return <Summary style={style} />;
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

  const setSavedName = (newName) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      details: { ...buildingInformation.details, name: newName },
    }));
    console.log(buildingInformation);
  };

  const setSavedArea = (newArea) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      details: {
        ...buildingInformation.details,
        area: { ...buildingInformation.details.area, value: newArea },
      },
    }));
    console.log(buildingInformation);
  };

  const setSavedYear = (newYear) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      details: {
        ...buildingInformation.details,
        year: { ...buildingInformation.details.year, value: newYear },
      },
    }));
    console.log(buildingInformation);
  };

  const setSavedFloors = (newFloors) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      details: {
        ...buildingInformation.details,
        floors: { ...buildingInformation.details.floors, value: newFloors },
      },
    }));
    console.log(buildingInformation);
  };

  const setSavedMaterial = (newMaterial) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      details: {
        ...buildingInformation.details,
        material: {
          ...buildingInformation.details.material,
          value: newMaterial,
        },
      },
    }));
    console.log(buildingInformation);
  };

  const setSavedWallMaterial = (newWallMaterial) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      structure: {
        ...buildingInformation.structure,
        wallMaterial: {
          ...buildingInformation.structure.wallMaterial,
          value: newWallMaterial,
        },
      },
    }));
    console.log(buildingInformation);
  };

  const setSavedRoofType = (newRoofType) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      structure: {
        ...buildingInformation.structure,
        roofType: {
          ...buildingInformation.structure.roofType,
          value: newRoofType,
        },
      },
    }));
    console.log(buildingInformation);
  };

  const setSavedWindowCount = (newWindowCount) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      structure: {
        ...buildingInformation.structure,
        windowCount: {
          ...buildingInformation.structure.windowCount,
          value: newWindowCount,
        },
      },
    }));
    console.log(buildingInformation);
  };

  const setSavedVentilationType = (newVentilationType) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      ventilation: {
        ...buildingInformation.ventilation,
        system: {
          ...buildingInformation.ventilation.system,
          value: newVentilationType,
        },
      },
    }));
    console.log(buildingInformation);
  };


  const setSavedHeatingType = (newHeatingType) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      heating: {
        ...buildingInformation.heating,
        system: {
          ...buildingInformation.heating.system,
          value: newHeatingType,
        },
      },
    }));
    console.log(buildingInformation);
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
        setSavedYear,
        setSavedMaterial,
        setSavedWallMaterial,
        setSavedRoofType,
        setSavedWindowCount,
        setSavedVentilationType,
        setSavedHeatingType,
        setSavedFloors,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
