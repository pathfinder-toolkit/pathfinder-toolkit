import React, { useContext, useState, useEffect } from "react";

import AreaSelection from "../components/Editor/AreaSelection";
import BuildingDetails from "../components/Editor/BuildingDetails";
import BuildingStructure from "../components/Editor/BuildingStructure";
import BuildingVentilation from "../components/Editor/BuildingVentilation";
import BuildingHeating from "../components/Editor/BuildingHeating";
import BuildingRenewable from "../components/Editor/BuildingRenewable";
import Summary from "../components/Editor/Summary";

import { useBackend } from "./BackendProvider";

import buildingDetailsModel from "../json/buildingDetailsModel.json";

export const EditorContext = React.createContext();
export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {

  const { requestBuildingModel, submitNewBuilding } = useBackend();

  const useStateWithSessionStorage = (sessionStorageKey) => {
    const [value, setValue] = useState(null);
  
    useEffect(() => {
      if (value) {
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(value));
      }
    }, [value, sessionStorageKey]);
  
    return [value, setValue];
  };

  const [
    buildingInformation,
    setBuildingInformation,
  ] = useStateWithSessionStorage("SavedBuildingDataInStorage");
  const [buildingOptions, setBuildingOptions] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [navigationEnabled, setNavigationEnabled] = useState(false);
  const [suggestions, setSuggestions] = useState();
  const [suggestionsLoading, setSuggestionsLoading] = useState(true);
  const [comments, setComments] = useState();
  const [commentsLoading, setCommentsLoading] = useState(true);

  const { requestSuggestions, requestComments } = useBackend();

  const getSteps = () => {
    return [
      "Area selection",
      "General information",
      "Structure",
      "Ventilation",
      "Heating",
      "Renewable",
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
        return <AreaSelection loadBuildingModel={setBuildingInformation} style={style} />;
      case 1:
        return <BuildingDetails style={style} />;
      case 2:
        return <BuildingStructure style={style} />;
      case 3:
        return <BuildingVentilation style={style} />;
      case 4:
        return <BuildingHeating style={style} />;
      case 5:
        return <BuildingRenewable style={style} />;
      case 6:
        return <Summary style={style} />;
      default:
        return <p>Unknow component</p>;
    }
  };

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //setNavigationEnabled(false);
  };

  const previousStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    //setNavigationEnabled(true);
  };

  const resetSteps = () => {
    setActiveStep(0);
  };

  const setSavedProperty = (category, propertyName, newValue) => {
    /*   if (!Object.keys(buildingInformation).includes(category)) {
      setBuildingInformation((buildingInformation) => ({
        ...buildingInformation,
        category: {
          ...buildingInformation[category],
          [propertyName]: {
            ...buildingInformation[category][propertyName],
            value: newValue,
    } */

    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      [category]: {
        ...buildingInformation[category],
        [propertyName]: {
          ...buildingInformation[category][propertyName],
          value: newValue,
        },
      },
    }));
  };

  const getSavedProperty = (category, subcategory) => {
    if (Object.keys(buildingInformation).includes(category)) {
      if (Object.keys(buildingInformation[category]).includes(subcategory)) {
        return buildingInformation[category][subcategory].value;
      }
    }

    return "";
  };

  const getSavedCategory = (category) => {
    if (Object.keys(buildingInformation).includes(category)) {
      return buildingInformation[category];
    }
    return "";
  };

  const setSavedCategory = (categoryName, data) => {
    setBuildingInformation((buildingInformation) => ({
      ...buildingInformation,
      [categoryName]: data,
    }));
  };

  const getSuggestions = async (subject, value) => {
    setSuggestionsLoading(true);
    if (subject === null || value === null) {
      return;
    }
    const data = await requestSuggestions(subject, value);
    setSuggestions(data);
    setSuggestionsLoading(false);
  };

  const getComments = async (subject) => {
    setCommentsLoading(true);
    if (subject === null) {
      return;
    }
    const data = await requestComments(subject);
    setComments(data);
    setCommentsLoading(false);
  };

  const PostBuilding = () => {
    submitNewBuilding(buildingInformation);
  }

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
        setSavedProperty,
        getSavedProperty,
        getSavedCategory,
        setSavedCategory,
        buildingOptions,
        setBuildingOptions,
        getSuggestions,
        suggestions,
        suggestionsLoading,
        getComments,
        comments,
        commentsLoading,
        subjects,
        PostBuilding
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
