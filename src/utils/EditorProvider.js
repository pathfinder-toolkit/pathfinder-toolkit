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
  const {
    submitNewBuilding,
    updateBuildingData,
  } = useBackend();
  const [subjects, setSubjects] = useState();

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
  const [buildingNameEntered, setBuildingNameEntered] = useState(false);

  const [suggestions, setSuggestions] = useState();
  const [suggestionsLoading, setSuggestionsLoading] = useState(true);
  const [suggestionsAreaId, setSuggestionsAreaId] = useState();

  const [commentsLoading, setCommentsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const [showOldEntryButtons, setShowOldEntryButtons] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);

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

  // Utility function
  const onlyObjsWithUniqueProperty = (property) => (value, index, self) => {
    // Support both js object and immutable
    const getProp = (item, prop) =>
      typeof item.get === "function" ? item.get(prop) : item[prop];
    // Match only those items, which index is the first found item
    return (
      self
        .map((item) => getProp(item, property))
        .indexOf(getProp(value, property)) === index
    );
  };

  //Editor components are added here
  const getStepComponent = (style, slug) => {
    switch (activeStep) {
      case 0:
        return (
          <AreaSelection
            loadBuildingModel={setBuildingInformation}
            style={style}
            slug={slug}
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
        return <Summary style={style} slug={slug} />;
      default:
        return <p>Unknow component</p>;
    }
  };

  const nextStep = () => {
    // if (!buildingNameEntered && activeStep + 1 > 1) {
    //    return;
    // }
    clearSuggestions();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const previousStep = () => {
    clearSuggestions();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const setStep = (step) => {
    if (!buildingNameEntered && step > 1) {
      return;
    }
    if (navigationEnabled) {
      setActiveStep(step);
      clearSuggestions();
    }
  };

  useEffect(() => {
    if (!buildingNameEntered) {
      setNavigationEnabled(false);
    } else {
      setNavigationEnabled(true);
    }
  }, [buildingNameEntered]);

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

  const getSuggestions = async (subject, value, areaId) => {
    setSuggestionsLoading(true);

    if (subject === null || value === null || value.length === 0) {
      setSuggestionsLoading(false);
      return;
    }

    try {
      const data = await requestSuggestions(subject, value, areaId);

      const filteredSuggestions = suggestions.filter(
        (suggestion) => suggestion.identifier !== subject
      );
      const allSuggestions = [...filteredSuggestions, ...data];
      const noDuplicateSuggestions = allSuggestions.filter(
        onlyObjsWithUniqueProperty("idSuggestion")
      );
      setSuggestions(noDuplicateSuggestions);

      if (data.length > 0) {
        if (!subjects.includes(data[0].suggestionSubject)) {
          setSubjects([...subjects, data[0].suggestionSubject]);
        }
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
      const response = await requestComments(subject, 1, 3);
      const data = response.data.comments;
      if (data.length > 0) {
        const allComments = [...comments, ...data];
        const noDuplicateComments = allComments.filter(
          onlyObjsWithUniqueProperty("idComment")
        );
        setComments(noDuplicateComments);

        if (!subjects.includes(data[0].commentSubject)) {
          setSubjects([...subjects, data[0].commentSubject]);
        }
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

  const postBuilding = async () => {
    const response = submitNewBuilding(buildingInformation);
    return response;
  };

  const updateBuilding = async () => {
    const response = updateBuildingData(
      buildingInformation.slug,
      buildingInformation
    );
    return response;
  };

  return (
    <EditorContext.Provider
      value={{
        buildingInformation,
        activeStep,
        setActiveStep,
        getSteps,
        getStepComponent,
        navigationEnabled,
        setNavigationEnabled,
        nextStep,
        previousStep,
        setStep,
        showOldEntryButtons,
        setShowOldEntryButtons,
        showPropertyModal,
        setShowPropertyModal,
        setSavedProperty,
        getSavedProperty,
        getSavedCategory,
        setSavedCategory,
        buildingOptions,
        setBuildingOptions,
        getSuggestions,
        suggestions,
        suggestionsAreaId,
        setSuggestionsAreaId,
        suggestionsLoading,
        getComments,
        comments,
        commentsLoading,
        subjects,
        postBuilding,
        updateBuilding,
        buildingNameEntered,
        setBuildingNameEntered,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
