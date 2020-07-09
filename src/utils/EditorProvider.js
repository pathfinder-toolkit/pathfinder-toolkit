import React, { useContext, useState, useEffect } from "react";

import AreaSelection from "../components/Editor/Categories/AreaSelection";
import BuildingDetails from "../components/Editor/Categories/BuildingDetails";
import BuildingStructure from "../components/Editor/Categories/BuildingStructure";
import BuildingVentilation from "../components/Editor/Categories/BuildingVentilation";
import BuildingHeating from "../components/Editor/Categories/BuildingHeating";
import BuildingRenewable from "../components/Editor/Categories/BuildingRenewable";
import Summary from "../components/Editor/Summary";

import { useBackend } from "./BackendProvider";

export const EditorContext = React.createContext();
export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const { requestBuildingModel } = useBackend();

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

  const [suggestionsLoading, setSuggestionsLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [subjects, setSubjects] = useState([]);

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

  //Editor components are added here
  const getStepComponent = (style) => {
    switch (activeStep) {
      case 0:
        return (
          <AreaSelection
            loadBuildingModel={setBuildingInformation}
            style={style}
          />
        );
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

  const nextStep = () => {
    clearSuggestions();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const previousStep = () => {
    clearSuggestions();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const setSavedProperty = (category, propertyName, newValue) => {
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

    try {
      const data = await requestSuggestions(subject, value);
      console.log(data);

      if (!suggestions.includes(subject)) {
        setSuggestions([...suggestions, data[0]]);
        console.log(suggestions);
      }

      if (!subjects.includes(data[0].suggestionSubject)) {
        setSubjects([...subjects, data[0].suggestionSubject]);
      }
    } catch (error) {
      console.log(error);
    }

    setSuggestionsLoading(false);
  };

  const getComments = async (subject) => {
    setCommentsLoading(true);
    if (subject === null) {
      return;
    }

    try {
      const data = await requestComments(subject,1);

      console.log(data);
      if (!suggestions.includes(subject)) {
        setComments([...comments, data[0]]);
      }
    } catch (error) {
      console.log(error);
    }

    setCommentsLoading(false);
  };

  const clearSuggestions = () => {
    setSubjects([]);
    setComments([]);
    setSuggestions([]);
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
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
