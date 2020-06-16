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
        name: {
          propertyName: "Name",
          value: "",
        },
        area: {
          propertyName: "Area",
          value: "",
        },
        year: {
          propertyName: "Construction year",
          value: "",
        },
        floorArea: {
          propertyName: "Floor area(in square meters)",
          value: "",
        },
        heatedFloorArea: {
          propertyName: "Heated floor area(in square meters)",
          value: "",
        },
        floorsAmount: {
          propertyName: "Amount of floors",
          value: "",
        },
        description: {
          propertyName: "Description of building",
          value: "",
        },
        image: {
          propertyName: "Image",
          value: "",
        },
      },
      heating: {
        heatingSystem: {
          propertyName: "Heating System",
          value: "",
          suggestions: [],
        },
        heatingSource: {
          propertyName: "Heating source",
          value: "",
        },
        annualCost: {
          propertyName: "Annual cost",
          value: "",
        },
      },
      electricity: {
        annualUse: {
          propertyName: "Annual use",
          value: "",
        },
        annualCost: {
          propertyName: "Annual cost",
          value: "",
        },
      },
      structure: {
        wallMaterial: {
          propertyName: "Wall material",
          value: "",
          suggestions: [],
        },
        wallThickness: {
          propertyName: "Wall Thickness",
          value: "",
        },
        windowAmount: {
          propertyName: "Amount of windows",
          value: "",
        },
        doorMaterial: {
          propertyName: "Amount of doors",
          value: "",
        },
        roofInsulation: {
          propertyName: "Roof insulation",
          value: "",
        },
      },
      ventilation: {
        ventilationSystem: {
          propertyName: "Ventilation system",
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

  const setSavedProperty = (category, propertyName, newValue) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      [category]: {
        ...buildingInformation[category],
        [propertyName]: { ...buildingInformation[category][propertyName], value: newValue },
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
        setSavedProperty,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
