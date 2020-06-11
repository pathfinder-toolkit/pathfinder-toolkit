import React, { useState, useEffect } from "react";
import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";
import AreaMap from "./AreaMap";

const AreaSelection = () => {
  const {
    buildingInformation,
    setSavedArea,
    setNavigationEnabled,
  } = useEditor();

  const { getCountries } = useBackend();
  const [selectedArea, setSelectedArea] = useState()

  const [allowedCountries] = useState(getCountries());

  const handleSelection = (selectedCountry) => {
    setSelectedArea(selectedCountry);
    setSavedArea(selectedCountry);
    setNavigationEnabled(true);
  };

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
