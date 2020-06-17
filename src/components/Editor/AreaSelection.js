import React, { useState, useEffect } from "react";
import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";
import AreaMap from "./AreaMap";

const AreaSelection = () => {
  const {
    buildingInformation,
    setSavedProperty,
    getSavedProperty,
    setNavigationEnabled,
    optionsLoading,
  } = useEditor();

  const { getCountries, requestAreaOptions } = useBackend();
  const [selectedArea, setSelectedArea] = useState(
    getSavedProperty("details", "area")
  );

  const [allowedCountries] = useState(getCountries());

  const handleSelection = (selectedCountry) => {
    setNavigationEnabled(false);
    setSelectedArea(selectedCountry);
    requestAreaOptions(selectedCountry);
    setSavedProperty("details", "area", selectedCountry);
  };

  useEffect(() => {
    if (selectedArea !== null || selectedArea !== '') {
      requestAreaOptions(selectedArea);
    }
  }, []);

  useEffect(() => {

    
  }, []);

  useEffect(() => {
    if (!optionsLoading) {
      setNavigationEnabled(true);
    }
  }, [optionsLoading]);

  return (
    <React.Fragment>
      <AreaMap
        allowedCountries={allowedCountries}
        selectedCountry={selectedArea}
        handleSelection={handleSelection}
      ></AreaMap>
    </React.Fragment>
  );
};

export default AreaSelection;
