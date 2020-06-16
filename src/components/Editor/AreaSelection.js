import React, { useState } from "react";
import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";
import AreaMap from "./AreaMap";

const AreaSelection = () => {
  const {
    buildingInformation,
    setSavedProperty,
    getSavedProperty,
    setNavigationEnabled,
  } = useEditor();

  const { getCountries } = useBackend();
  const [selectedArea, setSelectedArea] = useState(
    getSavedProperty("details", "area")
  );

  const [allowedCountries] = useState(getCountries());

  const handleSelection = (selectedCountry) => {
    setSelectedArea(selectedCountry);
    setSavedProperty("details", "area", selectedCountry);
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
